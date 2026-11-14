import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart, User, Bot, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../lib/api'
import CartDropdown from './CartDropdown'
import ProfileDropdown from './ProfileDropdown'
import SearchDropdown from './SearchDropdown'

export default function Navbar() {
  const { user, cartItems } = useAuth()
  
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState<any>({ trending: [], suggestions: [], products: [] })
  
  const profileRef = useRef<HTMLDivElement>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounce search
  useEffect(() => {
    if (!isSearchOpen) return

    const delayDebounceFn = setTimeout(() => {
      api.search(searchQuery)
        .then(data => setSearchData(data))
        .catch(err => {
          console.error("Search error:", err)
          setSearchData({ trending: [], suggestions: [], products: [] })
        })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, isSearchOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false)
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) setIsCartOpen(false)
      if (window.innerWidth >= 1024) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
  }

  const closeSearch = () => setIsSearchOpen(false)

  return (
    <header className="w-full bg-eneba-purple text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 lg:h-[100px] flex items-center justify-between gap-4 lg:gap-10">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-3 h-full shrink-0">
          
          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-1" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={26} />
          </button>

          <Link to="/" className="shrink-0 flex items-center h-full">
            <img src="/logo.png" alt="Eneba" className="w-[110px] lg:w-[180px] h-[50px] lg:h-[90px] object-contain" />
          </Link>
          
          {/* SEARCH BAR (Desktop) */}
          <div className="hidden lg:block w-[600px] relative" ref={searchRef}>
            <div className={`flex items-center bg-[#3a1390] border-2 h-14 px-4 gap-3 transition-all duration-200 ${isSearchOpen ? 'border-white bg-[#3a1390]' : 'border-white/60 focus-within:border-[#FFCC00] focus-within:bg-[#4e1a9e]'}`}>
              <Search size={22} className="text-white shrink-0" />
              <input 
                type="text" 
                placeholder="Search for games, top-ups and more" 
                className="w-full bg-transparent outline-none text-base text-white placeholder:text-white/70"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
            
            {/* Desktop Search Dropdown with smooth fade */}
            <div className={`absolute top-[56px] left-0 w-full transition-all duration-200 origin-top z-50 ${isSearchOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
              <SearchDropdown 
                query={searchQuery} 
                setQuery={setSearchQuery}
                data={searchData} 
                onClose={closeSearch} 
                onSelectSuggestion={handleSuggestionClick}
              />
            </div>
          </div>
        </div>

        {/* RIGHT GROUP */}
        <nav className="flex items-center h-full shrink-0 text-[14px] font-semibold gap-1 lg:gap-2">
          
          {/* Mobile Search Icon */}
          <button className="lg:hidden flex items-center justify-center h-10 w-10" onClick={() => setIsSearchOpen(true)}>
            <Search size={22} />
          </button>

          <Link to="/wishlist" aria-label="Wishlist" className="relative hidden md:flex items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10">
            <Heart size={22} />
            {user?.wishlist?.length > 0 && (
              <span className="absolute top-1 right-0 bg-[#FFCC00] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {user.wishlist.length}
              </span>
            )}
          </Link>

          {/* CART - Mobile Link */}
          <Link 
            to="/cart" 
            aria-label="Cart" 
            className="relative flex lg:hidden items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-0 bg-[#FFCC00] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* CART - Desktop Button & Dropdown */}
          <div className="relative hidden lg:block" ref={cartRef}>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Cart" 
              className={`relative flex items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10 ${isCartOpen ? 'bg-white/10 text-[#FFCC00]' : ''}`}
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-0 bg-[#FFCC00] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>

          <div className="hidden lg:block w-[1px] h-6 bg-white/30 mx-2"></div>

          {!user ? (
            <div className="flex items-center gap-1">
              {/* Mobile User Icon (Guest) */}
              <button 
                onClick={() => setIsProfileOpen(true)}
                aria-label="Profile"
                className="flex lg:hidden items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10"
              >
                <User size={22} />
              </button>

              {/* Desktop Links */}
              <Link to="/login" className="hidden lg:flex items-center gap-2 hover:bg-white/10 hover:text-[#FFCC00] px-3 py-2 transition-colors h-10">
                <User size={20} /> <span>Log in</span>
              </Link>
              <Link to="/register" className="hidden lg:flex items-center justify-center bg-white text-[#4618ac] hover:bg-[#FFCC00] hover:text-[#202020] px-4 py-2 transition-colors h-10 font-bold">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center justify-center h-10 w-10 rounded-full bg-[#FFCC00] text-[#202020] transition-transform ${isProfileOpen ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Bot size={22} />
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* PROFILE DROPDOWN / DRAWER (Kept mounted for smooth animation) */}
      <ProfileDropdown isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* MOBILE SEARCH OVERLAY (Smooth slide down) */}
      <div className={`lg:hidden fixed inset-0 z-[100] bg-[#5825cc] transition-all duration-300 ease-out ${isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <SearchDropdown 
          query={searchQuery} 
          setQuery={setSearchQuery}
          data={searchData} 
          onClose={closeSearch} 
          onSelectSuggestion={handleSuggestionClick}
        />
      </div>

      {/* MOBILE SIDE MENU DRAWER (Smooth slide from left) */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
        <div 
          className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#5825cc] shadow-2xl overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-[#5825cc] z-10">
            <img src="/logo.png" alt="Eneba" className="h-8 object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="p-5">
            <ul className="space-y-4 text-[15px] font-semibold">
              <li className="flex justify-between items-center text-white/90 pb-2 border-b border-white/10">
                Categories <ChevronRight size={18} />
              </li>
              <li><Link to="/cheap-games" onClick={() => setIsMobileMenuOpen(false)}>Cheap Games</Link></li>
              <li><Link to="/software" onClick={() => setIsMobileMenuOpen(false)}>Software</Link></li>
              <li><Link to="/egift-cards" onClick={() => setIsMobileMenuOpen(false)}>eGift Cards</Link></li>
              <li><Link to="/eneba-gift-cards" onClick={() => setIsMobileMenuOpen(false)}>Eneba Gift Cards</Link></li>
              <li><Link to="/probably-stolen" onClick={() => setIsMobileMenuOpen(false)}>PROBABLY STOLEN</Link></li>
              <li><Link to="/fm27" onClick={() => setIsMobileMenuOpen(false)}>FM27</Link></li>
              <li><Link to="/gta6" onClick={() => setIsMobileMenuOpen(false)}>GTA 6</Link></li>
            </ul>
            {/* 24H SALE - Matches Desktop Navigation exactly */}
            <div className="mt-6">
              <a href="#" className="inline-block bg-[#cc0000] text-white px-3 py-1.5 font-bold text-xs uppercase hover:bg-[#e60000] transition-colors">
                24H SALE
              </a>
            </div>
            <hr className="my-6 border-white/10" />
            <button className="flex items-center gap-2 text-[14px] font-semibold mb-6">
              <span className="text-lg">🇪🇺</span> English EU | EUR
            </button>
            <hr className="my-6 border-white/10" />
            <h4 className="font-bold text-sm mb-4">Download the Eneba App</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors w-max">
                <span className="text-xs font-bold leading-tight text-white">GET IT ON<br/><span className="text-sm">Google Play</span></span>
              </a>
              <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors w-max">
                <span className="text-xs font-bold leading-tight text-white">Download on the<br/><span className="text-sm">App Store</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}