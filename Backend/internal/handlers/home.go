package handlers

import (
	"encoding/json"
	"net/http"
	"sort"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

func resolveProducts(ids []string) []models.Product {
	resolved := make([]models.Product, 0)
	for _, id := range ids {
		for _, p := range database.Products {
			if p.ID == id {
				resolved = append(resolved, p)
				break
			}
		}
	}
	return resolved
}

// DYNAMIC: Extracts unique categories and platforms from the Products database
func getDynamicCategoriesBar() []models.CategoryIcon {
	var bar []models.CategoryIcon
	seenCategories := make(map[string]bool)
	seenPlatforms := make(map[string]bool)

	// Define icons for known names, fallback to "Tag" if not found
	iconMap := map[string]string{
		"Games":         "Gamepad2",
		"Gaming eCards": "CreditCard",
		"eGift Cards":   "Gift",
		"Software":      "Monitor",
		"Subscription":  "PlayCircle",
		"Steam":         "Disc3",
		"PSN":           "Play",
		"Xbox Live":     "Gamepad2",
		"Roblox":        "Box",
		"Windows":       "Monitor",
		"Netflix":       "Film",
		"Spotify":       "Music",
	}

	// 1. Get top 4 unique Categories
	for _, p := range database.Products {
		if p.Category != "" && !seenCategories[p.Category] {
			seenCategories[p.Category] = true
			icon := iconMap[p.Category]
			if icon == "" {
				icon = "Tag" // Fallback icon
			}
			bar = append(bar, models.CategoryIcon{
				Name:  p.Category,
				Icon:  icon,
				Type:  "category",
				Value: p.Category,
			})
			if len(bar) >= 4 {
				break
			}
		}
	}

	// 2. Get top 4 unique Platforms
	for _, p := range database.Products {
		if p.Platform != "" && !seenPlatforms[p.Platform] {
			seenPlatforms[p.Platform] = true
			icon := iconMap[p.Platform]
			if icon == "" {
				icon = "Tag"
			}
			bar = append(bar, models.CategoryIcon{
				Name:  p.Platform,
				Icon:  icon,
				Type:  "platform",
				Value: p.Platform,
			})
			if len(bar) >= 8 { // Total 8 icons in the bar
				break
			}
		}
	}

	return bar
}

func getDynamicGenres() []models.GenreCategory {
	counts := make(map[string]int)
	for _, p := range database.Products {
		for _, g := range p.Genres {
			counts[g]++
		}
	}

	iconMap := map[string]string{
		"Action": "Swords", "Adventure": "Compass", "Simulation": "Car", "Strategy": "ChessKnight",
		"RPG": "Shield", "Indie": "Gem", "Multiplayer": "Users", "Single Player": "User",
		"FPS / TPS": "Crosshair", "Sandbox": "Box", "Survival": "Tent",
	}

	var result []models.GenreCategory
	for name, count := range counts {
		icon := iconMap[name]
		if icon == "" {
			icon = "Gamepad2"
		}
		result = append(result, models.GenreCategory{Name: name, Count: count, Icon: icon})
	}

	sort.Slice(result, func(i, j int) bool {
		return result[i].Count > result[j].Count
	})
	return result
}

func GetHomeData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := models.HomeResponse{
		HeroBanners:       database.Home.HeroBanners,
		CategoriesBar:     getDynamicCategoriesBar(), // <-- GENERATED DYNAMICALLY
		Categories:        getDynamicGenres(),
		Recommended:       resolveProducts(database.Home.RecommendedIDs),
		TopGames:          resolveProducts(database.Home.TopGameIDs),
		BestSellingEGifts: resolveProducts(database.Home.BestSellingEGiftIDs),
		BestSellingGifts:  resolveProducts(database.Home.BestSellingGiftIDs),
		UpcomingGames:     resolveProducts(database.Home.UpcomingGameIDs),
	}
	json.NewEncoder(w).Encode(response)
}
