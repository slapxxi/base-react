package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestAdminAuthFlow(t *testing.T) {
	cfg := Config{
		Addr:          ":0",
		DBPath:        filepath.Join(t.TempDir(), "users.json"),
		JWTSecret:     []byte("a-test-secret-that-is-at-least-32-bytes-long"),
		AllowedOrigin: "http://localhost:5173",
		CookieSecure:  false,
		TokenTTL:      time.Hour,
	}

	store, err := OpenStore(cfg.DBPath)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	if _, err := store.CreateUser("admin@example.com", "correct-horse-battery"); err != nil {
		t.Fatalf("create user: %v", err)
	}

	server := httptest.NewServer(NewServer(cfg, store).Handler())
	defer server.Close()

	jar, err := cookiejar.New(nil)
	if err != nil {
		t.Fatalf("create cookie jar: %v", err)
	}
	client := &http.Client{Jar: jar}

	login := request(t, client, http.MethodPost, server.URL+"/api/auth/login", map[string]string{
		"email":    "admin@example.com",
		"password": "correct-horse-battery",
	})
	if login.StatusCode != http.StatusOK {
		t.Fatalf("login status = %d, want %d", login.StatusCode, http.StatusOK)
	}

	for _, path := range []string{"/api/auth/me", "/api/admin/overview", "/api/admin/users"} {
		response := request(t, client, http.MethodGet, server.URL+path, nil)
		if response.StatusCode != http.StatusOK {
			t.Fatalf("%s status = %d, want %d", path, response.StatusCode, http.StatusOK)
		}
		response.Body.Close()
	}

	logout := request(t, client, http.MethodPost, server.URL+"/api/auth/logout", nil)
	if logout.StatusCode != http.StatusOK {
		t.Fatalf("logout status = %d, want %d", logout.StatusCode, http.StatusOK)
	}
	logout.Body.Close()

	unauthorized := request(t, client, http.MethodGet, server.URL+"/api/auth/me", nil)
	if unauthorized.StatusCode != http.StatusUnauthorized {
		t.Fatalf("me after logout status = %d, want %d", unauthorized.StatusCode, http.StatusUnauthorized)
	}
	unauthorized.Body.Close()
}

func TestRequestLogging(t *testing.T) {
	cfg := Config{
		DBPath:        filepath.Join(t.TempDir(), "users.json"),
		JWTSecret:     []byte("a-test-secret-that-is-at-least-32-bytes-long"),
		AllowedOrigin: "http://localhost:5173",
		TokenTTL:      time.Hour,
	}
	store, err := OpenStore(cfg.DBPath)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}

	var output bytes.Buffer
	original := log.Writer()
	log.SetOutput(&output)
	defer log.SetOutput(original)

	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/health?debug=true", nil)
	request.Header.Set("Origin", cfg.AllowedOrigin)
	NewServer(cfg, store).Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	requestID := recorder.Header().Get("X-Request-ID")
	if requestID == "" {
		t.Fatal("missing X-Request-ID response header")
	}
	if exposed := recorder.Header().Get("Access-Control-Expose-Headers"); !strings.Contains(exposed, "X-Request-ID") {
		t.Errorf("Access-Control-Expose-Headers = %q, want X-Request-ID", exposed)
	}

	logged := output.String()
	for _, fragment := range []string{
		"method=GET",
		"path=/api/health",
		"status=200",
		"duration=",
		"query=debug=true",
		"request_id=" + requestID,
	} {
		if !strings.Contains(logged, fragment) {
			t.Errorf("log output %q does not contain %q", logged, fragment)
		}
	}
}

func TestRequestLoggingReusesRequestID(t *testing.T) {
	cfg := Config{
		DBPath:        filepath.Join(t.TempDir(), "users.json"),
		JWTSecret:     []byte("a-test-secret-that-is-at-least-32-bytes-long"),
		AllowedOrigin: "http://localhost:5173",
		TokenTTL:      time.Hour,
	}
	store, err := OpenStore(cfg.DBPath)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}

	var output bytes.Buffer
	original := log.Writer()
	log.SetOutput(&output)
	defer log.SetOutput(original)

	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	request.Header.Set("X-Request-ID", "test-request-123")
	NewServer(cfg, store).Handler().ServeHTTP(recorder, request)

	if got := recorder.Header().Get("X-Request-ID"); got != "test-request-123" {
		t.Errorf("X-Request-ID = %q, want %q", got, "test-request-123")
	}
	if logged := output.String(); !strings.Contains(logged, "request_id=test-request-123") {
		t.Errorf("log output %q does not contain reused request ID", logged)
	}
}

func TestRequestIDFor(t *testing.T) {
	if got, want := requestIDFor("  abc\n123  "), "abc-123"; got != want {
		t.Errorf("requestIDFor() = %q, want %q", got, want)
	}
	if got := requestIDFor(""); len(got) != 16 {
		t.Errorf("generated request ID length = %d, want 16", len(got))
	}
	long := strings.Repeat("a", 100)
	if got := requestIDFor(long); len([]rune(got)) != maxRequestIDLength {
		t.Errorf("capped request ID length = %d, want %d", len([]rune(got)), maxRequestIDLength)
	}
}

func TestColorEnabled(t *testing.T) {
	original := log.Writer()
	defer log.SetOutput(original)

	var output bytes.Buffer
	log.SetOutput(&output)

	t.Setenv("CLICOLOR_FORCE", "")
	t.Setenv("NO_COLOR", "1")
	if colorEnabled() {
		t.Error("colorEnabled() = true with NO_COLOR, want false")
	}

	t.Setenv("NO_COLOR", "")
	if colorEnabled() {
		t.Error("colorEnabled() = true with non-file log writer, want false")
	}

	t.Setenv("CLICOLOR_FORCE", "1")
	if !colorEnabled() {
		t.Error("colorEnabled() = false with CLICOLOR_FORCE, want true")
	}
}

func request(t *testing.T, client *http.Client, method, url string, body any) *http.Response {
	t.Helper()

	var reader *bytes.Reader
	if body != nil {
		data, err := json.Marshal(body)
		if err != nil {
			t.Fatalf("marshal request: %v", err)
		}
		reader = bytes.NewReader(data)
	} else {
		reader = bytes.NewReader(nil)
	}

	req, err := http.NewRequest(method, url, reader)
	if err != nil {
		t.Fatalf("create request: %v", err)
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	response, err := client.Do(req)
	if err != nil {
		t.Fatalf("send request: %v", err)
	}
	return response
}
