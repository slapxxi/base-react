package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}

func run(args []string) error {
	if len(args) == 0 {
		return errors.New("usage: server <serve|create-user> [email] [password|-]")
	}

	cfg, err := LoadConfig()
	if err != nil {
		return err
	}
	store, err := OpenStore(cfg.DBPath)
	if err != nil {
		return err
	}

	switch args[0] {

	case "serve":
		if len(args) != 1 {
			return errors.New("usage: server serve")
		}
		return serve(cfg, store)

	case "create-user":
		if len(args) != 3 {
			return errors.New("usage: server create-user <email> <password|->")
		}

		password := args[2]
		if password == "-" {
			data, err := io.ReadAll(os.Stdin)
			if err != nil {
				return fmt.Errorf("read password: %w", err)
			}
			password = strings.TrimRight(string(data), "\r\n")
		}

		user, err := store.CreateUser(args[1], password)
		if err != nil {
			return err
		}

		fmt.Printf("created admin %s (%s)\n", user.Email, user.ID)
		return nil

	default:
		return fmt.Errorf("unknown command %q", args[0])
	}
}

func serve(cfg Config, store *Store) error {
	server := &http.Server{
		Addr:              cfg.Addr,
		Handler:           NewServer(cfg, store).Handler(),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	errorsCh := make(chan error, 1)
	go func() {
		log.Printf("auth service listening on %s", cfg.Addr)
		errorsCh <- server.ListenAndServe()
	}()

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt, syscall.SIGTERM)

	select {
	case err := <-errorsCh:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-signals:
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return server.Shutdown(ctx)
}
