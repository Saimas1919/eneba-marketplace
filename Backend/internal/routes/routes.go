package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/saimas1919/eneba-marketplace/backend/internal/handlers"
)

func Setup() http.Handler {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
			"https://eneba-marketplace-tan.vercel.app", // <-- Add your Vercel URL here
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/health", handlers.Health)

		// Catalog & Content
		r.Get("/products", handlers.GetProducts)
		r.Get("/products/{id}", handlers.GetProductByID)
		r.Get("/filters", handlers.GetFilters)
		r.Get("/home", handlers.GetHomeData)
		r.Get("/search", handlers.SearchHandler)

		// Auth (Pure)
		r.Post("/auth/register", handlers.Register)
		r.Post("/auth/login", handlers.Login)

		// User Profile (Unified)
		r.Get("/user/me", handlers.GetMe)

		// Cart
		r.Get("/user/cart", handlers.GetCartItems)
		r.Post("/user/cart", handlers.ToggleCart)
		r.Post("/user/cart/remove", handlers.RemoveFromCart)

		// Wishlist
		r.Get("/user/wishlist", handlers.GetWishlist)
		r.Post("/user/wishlist", handlers.ToggleWishlist)

		// Orders
		r.Post("/orders", handlers.CreateOrder)
		r.Get("/orders", handlers.GetOrders)
	})

	return r
}
