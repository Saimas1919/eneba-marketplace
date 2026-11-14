package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

type CreateOrderRequest struct {
	Items         []models.OrderItem `json:"items"`
	Total         float64            `json:"total"`
	PaymentMethod string             `json:"paymentMethod"`
}

// POST /api/v1/orders
func CreateOrder(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	var req CreateOrderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	order := database.CreateOrder(userID, req.Items, req.Total, req.PaymentMethod)

	// Clear cart after successful order
	user, _ := database.FindUserByID(userID)
	user.CartIDs = []string{}

	json.NewEncoder(w).Encode(order)
}

// GET /api/v1/orders
func GetOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	userID := extractUserID(r)
	if userID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	orders := database.GetOrdersByUserID(userID)
	if orders == nil {
		orders = make([]models.Order, 0)
	}
	json.NewEncoder(w).Encode(orders)
}
