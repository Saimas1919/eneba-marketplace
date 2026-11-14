package database

import "github.com/saimas1919/eneba-marketplace/backend/internal/models"

var Home = models.HomeConfig{
	HeroBanners: []models.HeroBanner{
		{ID: 1, Image: "https://images.igdb.com/igdb/image/upload/t_1080p/ar5l8.jpg", Link: "/store?category=Game"},
		{ID: 2, Image: "https://images.igdb.com/igdb/image/upload/t_1080p/co4p3c.jpg", Link: "/store?platform=PSN"},
		{ID: 3, Image: "https://images.igdb.com/igdb/image/upload/t_1080p/co2mly.jpg", Link: "/store?platform=Steam"},
		{ID: 4, Image: "https://images.igdb.com/igdb/image/upload/t_1080p/co2r2w.jpg", Link: "/store?category=eGift Cards"},
	},

	// A massive mix of top sellers, games, and cards for the first carousel
	RecommendedIDs: []string{
		"cyberpunk-2077",
		"elden-ring",
		"gta-v",
		"roblox-200",
		"xbox-gamepass-1m",
		"netflix-50-eur",
		"hogwarts-legacy",
		"valorant-points",
		"god-of-war",
		"windows-11-pro",
	},

	// The heaviest hitters in the gaming industry
	TopGameIDs: []string{
		"gta-v",
		"elden-ring",
		"red-dead-redemption-2",
		"god-of-war",
		"cyberpunk-2077",
		"hogwarts-legacy",
		"spider-man-remastered",
		"the-witcher-3",
		"baldurs-gate-3",
		"resident-evil-4",
	},

	// Best Selling eGift Cards (Entertainment, Retail, & Services)
	BestSellingEGiftIDs: []string{
		"netflix-50-eur",
		"spotify-30-eur",
		"apple-itunes-25",
		"amazon-50-eur",
		"google-play-15",
		"razer-gold-20",
		"airalo-esim-50",
	},

	// Best Selling Gaming Gift Cards & Subscriptions
	BestSellingGiftIDs: []string{
		"psn-100-gbp",
		"roblox-200",
		"steam-20-eur",
		"xbox-gamepass-1m",
		"discord-nitro-1m",
		"fortnite-2800-vbucks",
	},

	// Upcoming / Recently Released Titles
	UpcomingGameIDs: []string{
		"starfield",
		"call-of-duty-mw3",
		"ea-fc-24",
		"baldurs-gate-3",
		"resident-evil-4",
		"it-takes-two",
		"hades",
		"stardew-valley",
	},
}
