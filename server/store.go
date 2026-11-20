package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	Role         string    `json:"role"`
	PasswordHash string    `json:"password_hash"`
	CreatedAt    time.Time `json:"created_at"`
}

type PublicUser struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"createdAt"`
}

type Store struct {
	mu    sync.RWMutex
	path  string
	users map[string]User
}

func OpenStore(path string) (*Store, error) {
	store := &Store{path: path, users: make(map[string]User)}

	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return store, nil
	}
	if err != nil {
		return nil, fmt.Errorf("read user store: %w", err)
	}

	var users []User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, fmt.Errorf("parse user store: %w", err)
	}
	for _, user := range users {
		store.users[user.ID] = user
	}
	return store, nil
}

func (s *Store) CreateUser(email, password string) (PublicUser, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	if email == "" {
		return PublicUser{}, errors.New("email is required")
	}
	if len(password) < 8 {
		return PublicUser{}, errors.New("password must be at least 8 characters")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	for _, user := range s.users {
		if strings.EqualFold(user.Email, email) {
			return PublicUser{}, errors.New("user already exists")
		}
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return PublicUser{}, fmt.Errorf("hash password: %w", err)
	}
	id, err := newID()
	if err != nil {
		return PublicUser{}, err
	}

	user := User{
		ID:           id,
		Email:        email,
		Role:         "admin",
		PasswordHash: string(hash),
		CreatedAt:    time.Now().UTC(),
	}
	s.users[id] = user
	if err := s.saveLocked(); err != nil {
		delete(s.users, id)
		return PublicUser{}, err
	}
	return toPublic(user), nil
}

func (s *Store) FindByEmail(email string) (User, bool) {
	email = strings.ToLower(strings.TrimSpace(email))

	s.mu.RLock()
	defer s.mu.RUnlock()

	for _, user := range s.users {
		if strings.EqualFold(user.Email, email) {
			return user, true
		}
	}
	return User{}, false
}

func (s *Store) ByID(id string) (User, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	user, ok := s.users[id]
	return user, ok
}

func (s *Store) List() []PublicUser {
	s.mu.RLock()
	defer s.mu.RUnlock()

	users := make([]PublicUser, 0, len(s.users))
	for _, user := range s.users {
		users = append(users, toPublic(user))
	}
	sort.Slice(users, func(i, j int) bool {
		return users[i].Email < users[j].Email
	})
	return users
}

func (s *Store) saveLocked() error {
	users := make([]User, 0, len(s.users))
	for _, user := range s.users {
		users = append(users, user)
	}
	sort.Slice(users, func(i, j int) bool {
		return users[i].Email < users[j].Email
	})

	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return fmt.Errorf("encode user store: %w", err)
	}
	if err := os.MkdirAll(filepath.Dir(s.path), 0o700); err != nil {
		return fmt.Errorf("create user store directory: %w", err)
	}

	tempPath := s.path + ".tmp"
	if err := os.WriteFile(tempPath, data, 0o600); err != nil {
		return fmt.Errorf("write user store: %w", err)
	}
	if err := os.Rename(tempPath, s.path); err != nil {
		return fmt.Errorf("replace user store: %w", err)
	}
	return nil
}

func toPublic(user User) PublicUser {
	return PublicUser{
		ID:        user.ID,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
	}
}

func newID() (string, error) {
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", fmt.Errorf("generate id: %w", err)
	}
	return hex.EncodeToString(bytes), nil
}
