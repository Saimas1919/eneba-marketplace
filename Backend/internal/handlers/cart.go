package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// GET /api/v1/user/cart
func GetCartItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
		return
	}

	user, err := database.FindUserByID(userID)
	if err != nil || user == nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User not found, please log in again"})
		return
	}

	cartItems := make([]models.Product, 0)
	for _, id := range user.CartIDs {
		for _, p := range database.Products {
			if p.ID == id {
				cartItems = append(cartItems, p)
				break
			}
		}
	}
	json.NewEncoder(w).Encode(cartItems)
}

// POST /api/v1/user/cart
func ToggleCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
		return
	}

	var req models.ToggleItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	if req.ProductID == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Product ID is required"})
		return
	}

	newList, err := database.ToggleCart(userID, req.ProductID)
	if err != nil {
		// CHANGE: If user is not found (e.g. server restarted), return 401 instead of 500
		if err.Error() == "user not found" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"error": "User session expired. Please log in again."})
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Failed to update cart"})
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"cart": newList})
}

// POST /api/v1/user/cart/remove
func RemoveFromCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
		return
	}

	var req models.ToggleItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	// FIX: Check for error and user == nil to prevent panic
	user, err := database.FindUserByID(userID)
	if err != nil || user == nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "User session expired. Please log in again."})
		return
	}

	newList := make([]string, 0)
	for _, id := range user.CartIDs {
		if id != req.ProductID {
			newList = append(newList, id)
		}
	}
	user.CartIDs = newList
	json.NewEncoder(w).Encode(map[string]interface{}{"cart": user.CartIDs})
}
