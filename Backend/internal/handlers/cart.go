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
		return
	}

	user, _ := database.FindUserByID(userID)
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
		return
	}

	var req models.ToggleItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	newList, err := database.ToggleCart(userID, req.ProductID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
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
		return
	}

	var req models.ToggleItemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	user, _ := database.FindUserByID(userID)
	newList := make([]string, 0)
	for _, id := range user.CartIDs {
		if id != req.ProductID {
			newList = append(newList, id)
		}
	}
	user.CartIDs = newList
	json.NewEncoder(w).Encode(map[string]interface{}{"cart": user.CartIDs})
}
