package models

// ==========================================
// USER MODELS
// ==========================================

type User struct {
	ID            string   `json:"id"`
	Email         string   `json:"email"`
	Password      string   `json:"-"`
	ReceiveOffers bool     `json:"receiveOffers"`
	WishlistIDs   []string `json:"wishlist"`
	CartIDs       []string `json:"cart"`
}

type AuthRequest struct {
	Email         string `json:"email"`
	Password      string `json:"password"`
	ReceiveOffers bool   `json:"receiveOffers,omitempty"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type ToggleItemRequest struct {
	ProductID string `json:"productId"`
}

// ==========================================
// ORDER MODELS
// ==========================================

type OrderItem struct {
	ProductID string `json:"productId"`
	Title     string `json:"title"`
	Image     string `json:"image"`
	Price     string `json:"price"`
	Quantity  int    `json:"quantity"`
	Key       string `json:"key"`
}

type Order struct {
	ID            string      `json:"id"`
	UserID        string      `json:"userId"`
	Date          string      `json:"date"`
	Items         []OrderItem `json:"items"`
	Total         float64     `json:"total"`
	Status        string      `json:"status"`
	PaymentMethod string      `json:"paymentMethod"`
}

// ==========================================
// UNIFIED PROFILE
// ==========================================

// UserProfile is the unified object sent to the frontend on login
type UserProfile struct {
	User   User      `json:"user"`
	Cart   []Product `json:"cart"`
	Orders []Order   `json:"orders"`
}
