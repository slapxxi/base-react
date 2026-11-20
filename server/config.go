package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Addr          string
	DBPath        string
	JWTSecret     []byte
	AllowedOrigin string
	CookieSecure  bool
	TokenTTL      time.Duration
}

func LoadConfig() (Config, error) {
	secret := os.Getenv("AUTH_JWT_SECRET")
	if len(secret) < 32 {
		return Config{}, errors.New("AUTH_JWT_SECRET must be set to at least 32 characters")
	}

	dbPath := os.Getenv("AUTH_DB_PATH")
	if dbPath == "" {
		return Config{}, errors.New("AUTH_DB_PATH must be set")
	}

	secure, err := strconv.ParseBool(getEnv("AUTH_COOKIE_SECURE", "false"))
	if err != nil {
		return Config{}, fmt.Errorf("AUTH_COOKIE_SECURE: %w", err)
	}

	return Config{
		Addr:          getEnv("AUTH_ADDR", ":8080"),
		DBPath:        dbPath,
		JWTSecret:     []byte(secret),
		AllowedOrigin: getEnv("AUTH_ALLOWED_ORIGIN", "http://localhost:5173"),
		CookieSecure:  secure,
		TokenTTL:      12 * time.Hour,
	}, nil
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
