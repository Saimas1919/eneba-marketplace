package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

type FilterOption struct {
	Label string `json:"label"`
	Value string `json:"value"`
	Count int    `json:"count"`
}

// GetProducts handles fetching products with optional filters
func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Parse Query Params
	query := r.URL.Query()
	categories := query["category"]
	platforms := query["platform"]
	regions := query["region"]
	oses := query["os"]
	genres := query["genre"]
	minPriceStr := query.Get("minPrice")
	maxPriceStr := query.Get("maxPrice")
	searchStr := strings.ToLower(query.Get("search"))

	minPrice, _ := strconv.ParseFloat(minPriceStr, 64)
	maxPrice, _ := strconv.ParseFloat(maxPriceStr, 64)
	if maxPrice == 0 {
		maxPrice = 999999 // Default high max price
	}

	// Initialize as an empty slice so we never return null (which breaks React)
	filtered := make([]models.Product, 0)

	for _, p := range database.Products {
		// Filter by Category
		if len(categories) > 0 && !contains(categories, p.Category) {
			continue
		}
		// Filter by Platform
		if len(platforms) > 0 && !contains(platforms, p.Platform) {
			continue
		}
		// Filter by Region
		if len(regions) > 0 && !contains(regions, p.Region) {
			continue
		}
		// Filter by OS (if ANY of the selected OS match the product's OS)
		if len(oses) > 0 && !intersects(oses, p.OS) {
			continue
		}
		// Filter by Genre
		if len(genres) > 0 && !intersects(genres, p.Genres) {
			continue
		}
		// Filter by Price
		if p.PriceValue < minPrice || p.PriceValue > maxPrice {
			continue
		}
		// Filter by Search Text
		if searchStr != "" && !strings.Contains(strings.ToLower(p.Title), searchStr) {
			continue
		}

		filtered = append(filtered, p)
	}

	// If absolutely no filters are applied, return all
	if len(filtered) == 0 && len(categories) == 0 && len(platforms) == 0 && len(regions) == 0 && len(oses) == 0 && len(genres) == 0 && searchStr == "" && minPrice == 0 && maxPrice == 999999 {
		filtered = database.Products
	}

	json.NewEncoder(w).Encode(filtered)
}

// GetProductByID handles fetching a single product by its ID
func GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := chi.URLParam(r, "id")

	for _, product := range database.Products {
		if product.ID == id {
			json.NewEncoder(w).Encode(product)
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

// GetFilters calculates the real counts of all categories, platforms, etc.
func GetFilters(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	categories := make(map[string]int)
	platforms := make(map[string]int)
	regions := make(map[string]int)
	oses := make(map[string]int)
	genres := make(map[string]int)

	// Calculate counts from the actual database
	for _, p := range database.Products {
		if p.Category != "" {
			categories[p.Category]++
		}
		if p.Platform != "" {
			platforms[p.Platform]++
		}
		if p.Region != "" {
			regions[p.Region]++
		}
		for _, o := range p.OS {
			oses[o]++
		}
		for _, g := range p.Genres {
			genres[g]++
		}
	}

	// Helper to convert map to slice of FilterOptions
	toSlice := func(m map[string]int) []FilterOption {
		res := make([]FilterOption, 0)
		for k, v := range m {
			res = append(res, FilterOption{Label: k, Value: k, Count: v})
		}
		return res
	}

	response := map[string]interface{}{
		"categories": toSlice(categories),
		"platforms":  toSlice(platforms),
		"regions":    toSlice(regions),
		"os":         toSlice(oses),
		"genres":     toSlice(genres),
	}

	json.NewEncoder(w).Encode(response)
}

// --- Helper Functions ---

func contains(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func intersects(slice1, slice2 []string) bool {
	for _, item1 := range slice1 {
		for _, item2 := range slice2 {
			if item1 == item2 {
				return true
			}
		}
	}
	return false
}
