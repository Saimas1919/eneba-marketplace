package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// POST /api/v1/user/wishlist
func ToggleWishlist(w http.ResponseWriter, r *http.Request) {
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

	newList, err := database.ToggleWishlist(userID, req.ProductID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"wishlist": newList})
}

// GET /api/v1/user/wishlist
func GetWishlist(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	user, _ := database.FindUserByID(userID)
	wishlistItems := make([]models.Product, 0)
	for _, id := range user.WishlistIDs {
		for _, p := range database.Products {
			if p.ID == id {
				wishlistItems = append(wishlistItems, p)
				break
			}
		}
	}
	json.NewEncoder(w).Encode(wishlistItems)
}
