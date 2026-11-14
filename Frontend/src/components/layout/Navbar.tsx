import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, ShoppingCart, User, Bot } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../lib/api'
import CartDropdown from './CartDropdown'
import ProfileDropdown from './ProfileDropdown'
import SearchDropdown from './SearchDropdown'

export default function Navbar() {
  const { user, cartItems } = useAuth()
  
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
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
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsSearchOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
  }

  // Ensure onClose just closes the dropdown, doesn't clear the text
  const closeSearch = () => setIsSearchOpen(false)

  return (
    <header className="w-full bg-eneba-purple text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1440px] mx-auto px-6 h-[100px] flex items-center justify-center gap-10">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-3 h-full shrink-0">
          <Link to="/" className="shrink-0 flex items-center h-full">
            <img src="/logo.png" alt="Eneba" style={{ width: "180px", height: "90px", objectFit: "contain" }} />
          </Link>
          
          {/* SEARCH BAR */}
          <div className="w-[600px] relative" ref={searchRef}>
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
            
            {isSearchOpen && (
              <SearchDropdown 
                query={searchQuery} 
                data={searchData} 
                onClose={closeSearch} 
                onSelectSuggestion={handleSuggestionClick}
              />
            )}
          </div>

          <button className="flex items-center gap-2 hover:bg-white/10 hover:text-[#FFCC00] px-2 py-2 transition-colors h-10 text-[14px] font-semibold shrink-0">
            <span className="text-lg leading-none">🇪🇺</span>
            <span>English EU | EUR</span>
          </button>
        </div>

        {/* RIGHT GROUP */}
        <nav className="flex items-center h-full shrink-0 text-[14px] font-semibold gap-1">
          
          <Link to="/wishlist" aria-label="Wishlist" className="relative flex items-center justify-center hover:bg-white/10 hover:text-[#FFCC00] transition-colors h-10 w-10">
            <Heart size={22} />
            {user?.wishlist?.length > 0 && (
              <span className="absolute top-1 right-0 bg-[#FFCC00] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {user.wishlist.length}
              </span>
            )}
          </Link>

          <div className="relative" ref={cartRef}>
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
            {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
          </div>

          <div className="w-[1px] h-6 bg-white/30 mx-2"></div>

          {!user ? (
            <div className="flex items-center gap-1">
              <Link to="/login" className="flex items-center gap-2 hover:bg-white/10 hover:text-[#FFCC00] px-3 py-2 transition-colors h-10">
                <User size={20} /> <span>Log in</span>
              </Link>
              <Link to="/register" className="flex items-center justify-center bg-white text-[#4618ac] hover:bg-[#FFCC00] hover:text-[#202020] px-4 py-2 transition-colors h-10 font-bold">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center justify-center h-10 w-10 rounded-full bg-[#FFCC00] text-[#202020] transition-transform ${isProfileOpen ? 'scale-105' : 'hover:scale-105'}`}
              >
                <Bot size={24} />
              </button>
              {isProfileOpen && <ProfileDropdown onClose={() => setIsProfileOpen(false)} />}
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}