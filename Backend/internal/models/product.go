package models

type Offer struct {
	Seller     string `json:"seller"`
	Price      string `json:"price"`
	OldPrice   string `json:"oldPrice"`
	Discount   string `json:"discount"`
	Rating     string `json:"rating,omitempty"`
	Cashback   string `json:"cashback"`
	IsFeatured bool   `json:"isFeatured"`
	HasPayPal  bool   `json:"hasPayPal"`
	HasCart    bool   `json:"hasCart"`
	IsPrimary  bool   `json:"isPrimaryBuyButton"`
	Verified   bool   `json:"verified"`
}

type Review struct {
	Rating       int    `json:"rating"`
	User         string `json:"user"`
	Avatar       string `json:"avatar"`
	Date         string `json:"date"`
	Text         string `json:"text"`
	IsTranslated bool   `json:"isTranslated"`
	Upvotes      int    `json:"upvotes"`
	Downvotes    int    `json:"downvotes"`
}

type SystemReq struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type OtherDetail struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type Product struct {
	ID           string  `json:"id"`
	Title        string  `json:"title"`
	Image        string  `json:"image"`
	Platform     string  `json:"platform"`
	Region       string  `json:"region"`
	Price        string  `json:"price"`
	PriceValue   float64 `json:"priceValue"`
	OldPrice     string  `json:"oldPrice,omitempty"`
	Discount     string  `json:"discount,omitempty"`
	CashbackText string  `json:"cashbackText"`

	Category string   `json:"category"`
	OS       []string `json:"os"`
	Genres   []string `json:"genres"`

	Images      []string `json:"images"`
	Tags        []string `json:"tags"`
	Description string   `json:"description"`

	RecommendedOffers []Offer `json:"recommendedOffers,omitempty"`
	OtherOffers       []Offer `json:"otherOffers,omitempty"`

	OverallRatings     map[string]int         `json:"overallRatings,omitempty"`
	Reviews            []Review               `json:"reviews,omitempty"`
	SystemRequirements map[string][]SystemReq `json:"systemRequirements,omitempty"`
	OtherDetails       []OtherDetail          `json:"otherDetails,omitempty"`
	GamersAlsoViewed   []Product              `json:"gamersAlsoViewed,omitempty"`
}
