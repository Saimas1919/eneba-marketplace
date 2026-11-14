package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// GET /api/v1/user/me
func GetMe(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	user, err := database.FindUserByID(userID)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// Resolve Cart
	cartProducts := make([]models.Product, 0)
	for _, id := range user.CartIDs {
		for _, p := range database.Products {
			if p.ID == id {
				cartProducts = append(cartProducts, p)
				break
			}
		}
	}

	// Get Orders
	orders := database.GetOrdersByUserID(userID)

	json.NewEncoder(w).Encode(models.UserProfile{
		User:   *user,
		Cart:   cartProducts,
		Orders: orders,
	})
}
