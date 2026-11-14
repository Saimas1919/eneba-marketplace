import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Bot, ChevronRight, Heart, User, Wallet, 
  Diamond, Headphones, Receipt, Gamepad2, LogOut, X 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside (for desktop)
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // GUEST VIEW (Only appears on mobile)
  if (!user) {
    return (
      <>
        <div className={`fixed inset-0 bg-black/60 z-[90] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
        <div className={`fixed inset-y-0 right-0 w-[85%] max-w-[320px] bg-[#5825cc] z-[100] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-5">
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="px-5 flex flex-col gap-4 mt-2">
            <Link to="/login" onClick={onClose} className="w-full text-center border border-white text-white font-bold py-3 hover:bg-white/10 transition-colors">
              Log in
            </Link>
            <Link to="/register" onClick={onClose} className="w-full text-center bg-[#FFCC00] text-black font-bold py-3 hover:bg-[#ffdc4d] transition-colors">
              Register
            </Link>
          </div>
        </div>
      </>
    )
  }

  // LOGGED-IN USER VIEW
  const handleLogout = () => {
    logout()
    onClose()
    navigate('/')
  }

  const username = user?.email ? `${user.email.split('@')[0]}_${user.id}` : 'enebian_user'

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-[90] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />

      <div 
        ref={dropdownRef} 
        className={`fixed inset-y-0 right-0 w-[85%] max-w-[320px] bg-[#5825cc] z-[100] flex flex-col shadow-2xl overflow-y-auto transition-all duration-300 ease-in-out lg:absolute lg:inset-auto lg:top-[52px] lg:right-0 lg:w-[320px] lg:h-auto lg:rounded-sm lg:border lg:border-white/20 lg:shadow-2xl lg:overflow-visible lg:origin-top-right lg:before:content-[''] lg:before:absolute lg:before:-top-2 lg:before:right-2.5 lg:before:w-4 lg:before:h-4 lg:before:bg-[#5825cc] lg:before:border-l lg:before:border-t lg:before:border-white/20 lg:before:rotate-45 ${isOpen ? 'translate-x-0 lg:opacity-100 lg:scale-100 lg:pointer-events-auto' : 'translate-x-full lg:opacity-0 lg:scale-95 lg:pointer-events-none'}`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden shrink-0">
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* User Info Header */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFCC00] text-[#202020] shrink-0">
            <Bot size={24} />
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-[15px] truncate">{username}</div>
            <div className="text-[12px] text-white/60 truncate">{user?.email}</div>
          </div>
        </div>

        {/* Progress Box */}
        <div className="p-5 border-b border-white/10 shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm">Complete your profile (0%)</span>
            <ChevronRight size={16} className="text-white/60" />
          </div>
          <div className="w-full bg-white/20 h-2 mb-2">
            <div className="bg-[#FFCC00] h-2" style={{ width: '0%' }}></div>
          </div>
          <span className="text-[11px] text-white/60">0 of 6 tasks completed</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col py-2 flex-1">
          <Link to="/favorites" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <Heart size={18} className="text-white/70" /> <span>Favorites</span>
          </Link>
          <Link to="/account" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <User size={18} className="text-white/70" /> <span>My account</span>
          </Link>
          <Link to="/balance" onClick={onClose} className="flex items-center justify-between px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <div className="flex items-center gap-3">
              <Wallet size={18} className="text-white/70" /> <span>Balance</span>
            </div>
            <span className="text-[#4ade80] font-bold text-sm">€0.00</span>
          </Link>
          <Link to="/enebium" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <Diamond size={18} className="text-white/70" /> <span>Eneblum</span>
          </Link>
          <Link to="/cashback" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <Headphones size={18} className="text-white/70" /> <span>Cashback</span>
          </Link>
          <Link to="/orders" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <Receipt size={18} className="text-white/70" /> <span>Orders</span>
          </Link>
          <Link to="/keys" onClick={onClose} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors">
            <Gamepad2 size={18} className="text-white/70" /> <span>Keys library</span>
          </Link>
          
          <div className="border-t border-white/10 mt-2 pt-2 pb-4">
            <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors text-left w-full">
              <LogOut size={18} className="text-white/70" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}