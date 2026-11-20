package main

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const (
	colorReset   = "\x1b[0m"
	colorWhite   = "37"
	colorRed     = "31"
	colorGreen   = "32"
	colorYellow  = "33"
	colorCyan    = "36"
	colorMagenta = "35"

	maxRequestIDLength = 64
)

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(status int) {
	r.status = status
	r.ResponseWriter.WriteHeader(status)
}

func (s *Server) withRequestLogging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		recorder := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
		requestID := requestIDFor(r.Header.Get("X-Request-ID"))
		w.Header().Set("X-Request-ID", requestID)

		colored := colorEnabled()
		paint := func(code, value string) string {
			if !colored {
				return value
			}
			return "\x1b[" + code + "m" + value + colorReset
		}

		next.ServeHTTP(recorder, r)

		elapsed := time.Since(start).Round(time.Millisecond)
		query := r.URL.RawQuery
		if query == "" {
			query = "-"
		}

		log.Printf(
			"method=%s path=%s status=%s duration=%s remote=%s request_id=%s query=%s",
			paint(methodColor(r.Method), r.Method),
			r.URL.Path,
			paint(statusColor(recorder.status), strconv.Itoa(recorder.status)),
			paint(durationColor(elapsed), elapsed.String()),
			r.RemoteAddr,
			requestID,
			query,
		)
	})
}

func requestIDFor(value string) string {
	id := sanitizeRequestID(value)
	if id != "" {
		return id
	}
	return newRequestID()
}

func sanitizeRequestID(value string) string {
	value = strings.TrimSpace(value)
	if value == "" {
		return ""
	}
	value = strings.Map(func(r rune) rune {
		if r <= 0x20 || r == 0x7f {
			return '-'
		}
		return r
	}, value)
	runes := []rune(value)
	if len(runes) > maxRequestIDLength {
		return string(runes[:maxRequestIDLength])
	}
	return string(runes)
}

func newRequestID() string {
	bytes := make([]byte, 8)
	if _, err := rand.Read(bytes); err != nil {
		return strconv.FormatInt(time.Now().UnixNano(), 36)
	}
	return hex.EncodeToString(bytes)
}

func colorEnabled() bool {
	if os.Getenv("NO_COLOR") != "" {
		return false
	}
	if force := os.Getenv("CLICOLOR_FORCE"); force != "" && force != "0" {
		return true
	}

	file, ok := log.Writer().(*os.File)
	if !ok {
		return false
	}
	info, err := file.Stat()
	if err != nil {
		return false
	}
	return info.Mode()&os.ModeCharDevice != 0
}

func methodColor(method string) string {
	switch method {
	case http.MethodGet:
		return colorCyan
	case http.MethodPost:
		return colorGreen
	default:
		return colorMagenta
	}
}

func statusColor(status int) string {
	switch {
	case status >= 200 && status < 300:
		return colorGreen
	case status >= 300 && status < 400:
		return colorCyan
	case status >= 400 && status < 500:
		return colorYellow
	case status >= 500:
		return colorRed
	default:
		return colorWhite
	}
}

func durationColor(duration time.Duration) string {
	switch {
	case duration < 100*time.Millisecond:
		return colorGreen
	case duration < 500*time.Millisecond:
		return colorYellow
	default:
		return colorRed
	}
}
