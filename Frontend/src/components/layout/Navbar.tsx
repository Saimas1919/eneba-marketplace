import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart, User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="w-full bg-eneba-purple text-white sticky top-0 z-50 shadow-md">
      
      {/* MAIN CONTAINER - Centered */}
      <div className="max-w-[1440px] mx-auto px-6 h-[100px] flex items-center justify-center gap-10">

        {/* LEFT GROUP: LOGO, SEARCH, LANGUAGE */}
        <div className="flex items-center gap-3 h-full shrink-0">
          
          <Link to="/" className="shrink-0 flex items-center h-full">
            <img
              src="/logo.png"
              alt="Eneba"
              style={{
                width: "180px",
                height: "90px",
                objectFit: "contain",
              }}
            />
          </Link>

          <div className="w-[600px] relative">
            <div className="flex items-center bg-[#3a1390] border-2 border-white/60 h-14 px-4 gap-3 focus-within:border-[#FFCC00] focus-within:bg-[#4e1a9e] transition-all duration-200">
              <Search size={22} className="text-white shrink-0" />
              <input
                type="text"
                placeholder="Search for games, top-ups and more"
                className="w-full bg-transparent outline-none text-base text-white placeholder:text-white/70"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 hover:bg-white/10 hover:text-[#FFCC00] px-2 py-2 transition-colors h-10 text-[14px] font-semibold shrink-0">
            <span className="text-lg leading-none">🇪🇺</span>
            <span>English EU | EUR</span>
          </button>

        </div>

        {/* RIGHT GROUP: WISHLIST, CART, AUTH */}
        <nav className="flex items-center h-full shrink-0 text-[14px] font-semibold gap-1">
          
          <button aria-label="Wishlist" className="flex items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10">
            <Heart size={22} />
          </button>

          <button aria-label="Cart" className="flex items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10">
            <ShoppingCart size={22} />
          </button>

          <div className="w-[1px] h-6 bg-white/30 mx-2"></div>

          {/* AUTH GROUP */}
          <div className="flex items-center gap-1">
            <Link 
              to="/login" 
              className="flex items-center gap-2 hover:bg-white/10 hover:text-[#FFCC00] px-3 py-2 transition-colors h-10"
            >
              <User size={20} />
              <span>Log in</span>
            </Link>

            <Link 
              to="/register" 
              className="flex items-center justify-center bg-white text-[#4618ac] hover:bg-[#FFCC00] hover:text-[#202020] px-4 py-2 transition-colors h-10 font-bold"
            >
              Register
            </Link>
          </div>

        </nav>
      </div>
    </header>
  )
}