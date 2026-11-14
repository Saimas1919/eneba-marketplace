package models

type HeroBanner struct {
	ID    int    `json:"id"`
	Image string `json:"image"`
	Link  string `json:"link"`
}

type CategoryIcon struct {
	Name  string `json:"name"`
	Icon  string `json:"icon"`
	Type  string `json:"type"`
	Value string `json:"value"`
}

type GenreCategory struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
	Icon  string `json:"icon"`
}

type HomeResponse struct {
	HeroBanners       []HeroBanner    `json:"heroBanners"`
	CategoriesBar     []CategoryIcon  `json:"categoriesBar"`
	Recommended       []Product       `json:"recommended"`
	TopGames          []Product       `json:"topGames"`
	BestSellingEGifts []Product       `json:"bestSellingEGifts"`
	BestSellingGifts  []Product       `json:"bestSellingGifts"`
	UpcomingGames     []Product       `json:"upcomingGames"`
	Categories        []GenreCategory `json:"categories"`
}

type HomeConfig struct {
	HeroBanners         []HeroBanner
	RecommendedIDs      []string
	TopGameIDs          []string
	BestSellingEGiftIDs []string
	BestSellingGiftIDs  []string
	UpcomingGameIDs     []string
}
