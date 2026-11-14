package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/saimas1919/eneba-marketplace/backend/internal/database"
	"github.com/saimas1919/eneba-marketplace/backend/internal/models"
)

// Basic typo-tolerant fuzzy match: checks if query characters appear in order in the text
func fuzzyMatch(text, query string) bool {
	text = strings.ToLower(text)
	query = strings.ToLower(query)
	textIdx, queryIdx := 0, 0
	for textIdx < len(text) && queryIdx < len(query) {
		if text[textIdx] == query[queryIdx] {
			queryIdx++
		}
		textIdx++
	}
	return queryIdx == len(query)
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	query := strings.TrimSpace(r.URL.Query().Get("q"))

	// 1. Initialize slices so they encode as [] instead of null
	matchedProducts := make([]models.Product, 0)
	suggestions := make([]string, 0)
	suggestionSet := make(map[string]bool)

	// 2. If query is empty, return trending searches
	if query == "" {
		trending := []string{
			"minecraft", "robux", "roblox", "call of duty", "cyberpunk",
			"fortnite", "grand theft auto vi", "call of duty modern warfare 4",
			"nba 2k27", "gta6",
		}
		json.NewEncoder(w).Encode(map[string]interface{}{
			"trending":    trending,
			"products":    matchedProducts,
			"suggestions": suggestions,
		})
		return
	}

	// 3. If query exists, find matching products and generate suggestions
	for _, p := range database.Products {
		if strings.Contains(strings.ToLower(p.Title), strings.ToLower(query)) || fuzzyMatch(p.Title, query) {
			matchedProducts = append(matchedProducts, p)

			// Generate a simple suggestion based on the product title (e.g., first 2 words)
			words := strings.Fields(p.Title)
			if len(words) >= 2 {
				sugg := strings.Join(words[:2], " ")
				if !suggestionSet[sugg] {
					suggestionSet[sugg] = true
					suggestions = append(suggestions, sugg)
				}
			}
		}
	}

	// Limit products to 10 and suggestions to 5
	if len(matchedProducts) > 10 {
		matchedProducts = matchedProducts[:10]
	}
	if len(suggestions) > 5 {
		suggestions = suggestions[:5]
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"suggestions": suggestions,
		"products":    matchedProducts,
	})
}
