package handlers

import (
	"net/http"
	"strings"
)

// Shared utility to extract user ID from the Authorization header
func extractUserID(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if strings.HasPrefix(authHeader, "Bearer fake-jwt-token-for-") {
		return strings.TrimPrefix(authHeader, "Bearer fake-jwt-token-for-")
	}
	return ""
}
