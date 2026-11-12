const tags = [
  "Steam Games", "Steam Gift Cards", "Xbox Live Gift Cards", "PSN Gift Cards", 
  "Valorant Points (Riot)", "DLCs", "Software", "Games", "Game Points", 
  "Fortnite V-Bucks", "Xbox Game Pass Essential", "Robux | Roblox Gift Cards", 
  "GTA Online Cash", "NBA VC", "Razer Gold Gift Cards", "Discord Gift Cards", 
  "Gaming eCards", "eGift Cards", "Mobile recharges", "Popular eGift Cards", 
  "TikTok Coins", "Fortnite Skins"
];

export default function StoreSEO() {
  return (
    // Updated main background to #5825cc to match the Filter Sidebar
    <div className="bg-[#5825cc] p-8 md:p-12 rounded-sm shadow-lg mb-12">
      
      {/* Tags */}
      <p className="text-white text-sm mb-4 font-medium">You may also be interested in:</p>
      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((tag) => (
          <a 
            key={tag} 
            href="#" 
            // Updated tag background to #4618ac so they contrast nicely with the new #5825cc bg
            className="bg-[#4618ac] text-white text-[11px] px-3 py-1.5 rounded-full hover:bg-[#5c3fd1] transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>

      {/* Text Content */}
      <div className="text-white/80 text-[15px] leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Buy games, gift cards, and top-ups on Eneba</h2>
        <p>Games, gift cards, top-ups, e-money, and software: find whatever you need in one place. Marketplace prices and instant delivery, guaranteed.</p>
        
        <h3 className="text-lg font-bold text-white mt-8 mb-2">Games and DLCs</h3>
        <p>
          From new releases to timeless classics, along with top DLCs and expansion packs – find your next gaming fix right here. Browse <a href="#" className="text-[#FFCC00] hover:underline">cheap games under €10</a>, experience <a href="#" className="text-[#FFCC00] hover:underline">Xbox games</a> that redefined console gaming, or get swept up in cinematic blockbuster action with <a href="#" className="text-[#FFCC00] hover:underline">PlayStation games</a>. Planning a game night? You can't go wrong with <a href="#" className="text-[#FFCC00] hover:underline">Nintendo Switch games</a> the whole family can enjoy!
        </p>
        <p>
          Got your eye on <a href="#" className="text-[#FFCC00] hover:underline">upcoming pre-orders</a>? Lock it in now to guarantee a lower price before launch-day hype pushes it up.
        </p>

        <h3 className="text-lg font-bold text-white mt-8 mb-2">Gift cards and eGift cards</h3>
        <p>
          Top up your favourite platforms and stores with gift cards. Indulge in retail therapy with <a href="#" className="text-[#FFCC00] hover:underline">Amazon gift cards</a>, and curate your digital ecosystem with <a href="#" className="text-[#FFCC00] hover:underline">Apple gift cards</a>. Tired of ads and limited features? Go premium on your favourite Android apps and games with <a href="#" className="text-[#FFCC00] hover:underline">Google Play gift cards</a>, and give your gaming wallet a boost with <a href="#" className="text-[#FFCC00] hover:underline">Nintendo eShop cards</a>, along with digital credit for all your favourite gaming hubs!
        </p>

        <h3 className="text-lg font-bold text-white mt-8 mb-2">Game points and mobile top-ups</h3>
        <p>
          Never run out of game points and in-game currency! Build your Ultimate Team with <a href="#" className="text-[#FFCC00] hover:underline">FIFA / FC Points</a>, pick up <a href="#" className="text-[#FFCC00] hover:underline">Apex Coins</a> for cosmetics and battle passes, or be the first to get all the latest Call of Duty content drops with <a href="#" className="text-[#FFCC00] hover:underline">CoD Points</a>. Playing on the go? Browse <a href="#" className="text-[#FFCC00] hover:underline">mobile game top-ups</a> for all your favorite mobile games.
        </p>
        <p>
          Players can also explore <a href="#" className="text-[#FFCC00] hover:underline">Nexon Cash gift cards</a> for use in Nexon games.
        </p>

        <h3 className="text-lg font-bold text-white mt-8 mb-2">E-money and software</h3>
        <p>
          There's more on Eneba than gaming. Give your wallet a quick boost with <a href="#" className="text-[#FFCC00] hover:underline">PayPal top-ups</a>, get your PC ready for gaming with <a href="#" className="text-[#FFCC00] hover:underline">Windows 11 keys</a> and <a href="#" className="text-[#FFCC00] hover:underline">Steam software</a>, and add a layer of online security with <a href="#" className="text-[#FFCC00] hover:underline">NordVPN</a>, all in one place!
        </p>

        <h3 className="text-lg font-bold text-white mt-8 mb-2">Why buy on Eneba</h3>
        <p>
          Because gaming should be fun, affordable, and stress-free. That's why we offer prices below RRP, thoroughly vetted sellers, near-instant delivery, and a massive catalogue packed with something for everyone.
        </p>
      </div>
    </div>
  )
}