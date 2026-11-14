package database

import (
	"errors"
	"fmt"
	"math/rand"
	"time"

	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// ==========================================
// USER CACHE & LOGIC
// ==========================================

var Users = []models.User{
	{ID: "1", Email: "test@eneba.com", Password: "password123", ReceiveOffers: true, WishlistIDs: []string{}, CartIDs: []string{}},
}

func FindUserByEmail(email string) (*models.User, error) {
	for i, u := range Users {
		if u.Email == email {
			return &Users[i], nil
		}
	}
	return nil, errors.New("user not found")
}

func FindUserByID(id string) (*models.User, error) {
	for i, u := range Users {
		if u.ID == id {
			return &Users[i], nil
		}
	}
	return nil, errors.New("user not found")
}

func CreateUser(email, password string, receiveOffers bool) (*models.User, error) {
	if _, err := FindUserByEmail(email); err == nil {
		return nil, errors.New("user already exists")
	}
	newUser := models.User{
		ID:            string(rune(48 + len(Users) + 1)),
		Email:         email,
		Password:      password,
		ReceiveOffers: receiveOffers,
		WishlistIDs:   []string{},
		CartIDs:       []string{},
	}
	Users = append(Users, newUser)
	return &newUser, nil
}

func ToggleWishlist(userID, productID string) ([]string, error) {
	user, err := FindUserByID(userID)
	if err != nil {
		return nil, err
	}
	for i, id := range user.WishlistIDs {
		if id == productID {
			user.WishlistIDs = append(user.WishlistIDs[:i], user.WishlistIDs[i+1:]...)
			return user.WishlistIDs, nil
		}
	}
	user.WishlistIDs = append(user.WishlistIDs, productID)
	return user.WishlistIDs, nil
}

func ToggleCart(userID, productID string) ([]string, error) {
	user, err := FindUserByID(userID)
	if err != nil {
		return nil, err
	}
	for i, id := range user.CartIDs {
		if id == productID {
			user.CartIDs = append(user.CartIDs[:i], user.CartIDs[i+1:]...)
			return user.CartIDs, nil
		}
	}
	user.CartIDs = append(user.CartIDs, productID)
	return user.CartIDs, nil
}

// ==========================================
// ORDER CACHE & LOGIC
// ==========================================

var Orders = []models.Order{}

func generateKey() string {
	return fmt.Sprintf("%04X-%04X-%04X-%04X", rand.Intn(65535), rand.Intn(65535), rand.Intn(65535), rand.Intn(65535))
}

func generateOrderID() string {
	const letters = "abcdefghijklmnopqrstuvwxyz"
	b := make([]byte, 8)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return "o-" + string(b)
}

func CreateOrder(userID string, items []models.OrderItem, total float64, paymentMethod string) models.Order {
	for i := range items {
		items[i].Key = generateKey()
	}
	order := models.Order{
		ID:            generateOrderID(),
		UserID:        userID,
		Date:          time.Now().Format("01/02/2006, 3:04 PM"),
		Items:         items,
		Total:         total,
		Status:        "COMPLETED",
		PaymentMethod: paymentMethod,
	}
	Orders = append(Orders, order)
	return order
}

func GetOrdersByUserID(userID string) []models.Order {
	var userOrders []models.Order
	for _, o := range Orders {
		if o.UserID == userID {
			userOrders = append(userOrders, o)
		}
	}
	return userOrders
}
