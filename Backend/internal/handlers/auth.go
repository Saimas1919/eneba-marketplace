package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// POST /api/v1/auth/register
func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var req models.AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	user, err := database.CreateUser(req.Email, req.Password, req.ReceiveOffers)
	if err != nil {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	json.NewEncoder(w).Encode(models.AuthResponse{
		Token: "fake-jwt-token-for-" + user.ID,
		User:  *user,
	})
}

// POST /api/v1/auth/login
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var req models.AuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request payload"})
		return
	}

	user, err := database.FindUserByEmail(req.Email)
	if err != nil || user.Password != req.Password {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid email or password"})
		return
	}

	json.NewEncoder(w).Encode(models.AuthResponse{
		Token: "fake-jwt-token-for-" + user.ID,
		User:  *user,
	})
}
