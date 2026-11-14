package handlers

import (
	"encoding/json"
	"net/http"
	"sort"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

type FilterOption struct {
	Label string `json:"label"`
	Value string `json:"value"`
	Count int    `json:"count"`
}

func GetProducts(w http.ResponseWriter, r *http.Request) {
	// ... (Keep your existing GetProducts logic exactly as it is) ...
	w.Header().Set("Content-Type", "application/json")
	query := r.URL.Query()
	section := query.Get("section")
	if section != "" {
		var ids []string
		switch section {
		case "recommended":
			ids = database.Home.RecommendedIDs
		case "topgames":
			ids = database.Home.TopGameIDs
		case "egifts":
			ids = database.Home.BestSellingEGiftIDs
		case "gifts":
			ids = database.Home.BestSellingGiftIDs
		case "upcoming":
			ids = database.Home.UpcomingGameIDs
		default:
			ids = database.Home.RecommendedIDs
		}
		resolved := make([]models.Product, 0)
		for _, id := range ids {
			for _, p := range database.Products {
				if p.ID == id {
					resolved = append(resolved, p)
					break
				}
			}
		}
		json.NewEncoder(w).Encode(resolved)
		return
	}

	categories := query["category"]
	platforms := query["platform"]
	regions := query["region"]
	oses := query["os"]
	genres := query["genre"]
	minPrice, _ := strconv.ParseFloat(query.Get("minPrice"), 64)
	maxPrice, _ := strconv.ParseFloat(query.Get("maxPrice"), 64)
	if maxPrice == 0 {
		maxPrice = 999999
	}
	sortBy := query.Get("sort")

	filtered := make([]models.Product, 0)
	for _, p := range database.Products {
		if len(categories) > 0 && !contains(categories, p.Category) {
			continue
		}
		if len(platforms) > 0 && !contains(platforms, p.Platform) {
			continue
		}
		if len(regions) > 0 && !contains(regions, p.Region) {
			continue
		}
		if len(oses) > 0 && !intersects(oses, p.OS) {
			continue
		}
		if len(genres) > 0 && !intersects(genres, p.Genres) {
			continue
		}
		if p.PriceValue < minPrice || p.PriceValue > maxPrice {
			continue
		}
		filtered = append(filtered, p)
	}

	if sortBy == "price_asc" {
		sort.Slice(filtered, func(i, j int) bool { return filtered[i].PriceValue < filtered[j].PriceValue })
	}
	if sortBy == "price_desc" {
		sort.Slice(filtered, func(i, j int) bool { return filtered[i].PriceValue > filtered[j].PriceValue })
	}
	if sortBy == "title_asc" {
		sort.Slice(filtered, func(i, j int) bool { return filtered[i].Title < filtered[j].Title })
	}

	json.NewEncoder(w).Encode(filtered)
}

// GET /api/v1/products/{id}
func GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := chi.URLParam(r, "id")

	for _, product := range database.Products {
		if product.ID == id {
			// DYNAMIC: Populate "Gamers also viewed" if it's empty
			if len(product.GamersAlsoViewed) == 0 {
				related := make([]models.Product, 0)

				// 1. Try to find products in the same category
				for _, p := range database.Products {
					if p.ID != product.ID && p.Category == product.Category {
						related = append(related, p)
					}
					if len(related) >= 5 {
						break
					}
				}

				// 2. If not enough, fill with random other products
				if len(related) < 5 {
					for _, p := range database.Products {
						if p.ID != product.ID && !containsProduct(related, p.ID) {
							related = append(related, p)
						}
						if len(related) >= 5 {
							break
						}
					}
				}
				product.GamersAlsoViewed = related
			}

			json.NewEncoder(w).Encode(product)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

// Helper to check if a product is already in the related list
func containsProduct(list []models.Product, id string) bool {
	for _, p := range list {
		if p.ID == id {
			return true
		}
	}
	return false
}

// ... (Keep your existing GetFilters, contains, and intersects functions) ...
func GetFilters(w http.ResponseWriter, r *http.Request) {
	// ... (Keep existing) ...
	w.Header().Set("Content-Type", "application/json")
	staticCategories := []string{"Game", "DLC", "eGift Cards", "Gaming eCards", "Game points", "E-money Prepaid", "Software", "Subscription", "Mobile Recharge", "Direct Top-up", "eSIM"}
	staticPlatforms := []string{"Steam", "Xbox Live", "Epic Games", "Other", "PSN", "Riot Games", "Nintendo", "Steam Gift Card"}
	staticOS := []string{"Windows", "Mac", "Linux", "Android", "iOS"}
	staticGenres := []string{"Single Player", "Action", "Adventure", "Simulation", "Strategy", "Indie", "Multiplayer", "RPG"}
	staticRegions := []string{"Global", "Europe", "United States", "Argentina", "Latin America", "United Kingdom", "Turkey", "Canada"}

	categories := make(map[string]int)
	for _, c := range staticCategories {
		categories[c] = 0
	}
	platforms := make(map[string]int)
	for _, p := range staticPlatforms {
		platforms[p] = 0
	}
	oses := make(map[string]int)
	for _, o := range staticOS {
		oses[o] = 0
	}
	genres := make(map[string]int)
	for _, g := range staticGenres {
		genres[g] = 0
	}
	regions := make(map[string]int)
	for _, r := range staticRegions {
		regions[r] = 0
	}

	for _, p := range database.Products {
		if _, exists := categories[p.Category]; exists {
			categories[p.Category]++
		}
		if _, exists := platforms[p.Platform]; exists {
			platforms[p.Platform]++
		}
		if _, exists := regions[p.Region]; exists {
			regions[p.Region]++
		}
		for _, o := range p.OS {
			if _, exists := oses[o]; exists {
				oses[o]++
			}
		}
		for _, g := range p.Genres {
			if _, exists := genres[g]; exists {
				genres[g]++
			}
		}
	}

	toSlice := func(m map[string]int) []FilterOption {
		res := make([]FilterOption, 0)
		for k, v := range m {
			res = append(res, FilterOption{Label: k, Value: k, Count: v})
		}
		sort.Slice(res, func(i, j int) bool {
			if res[i].Count == res[j].Count {
				return res[i].Label < res[j].Label
			}
			return res[i].Count > res[j].Count
		})
		return res
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"categories": toSlice(categories), "platforms": toSlice(platforms),
		"regions": toSlice(regions), "os": toSlice(oses), "genres": toSlice(genres),
	})
}

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
