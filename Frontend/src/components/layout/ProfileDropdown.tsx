import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Bot, ChevronRight, Heart, User, Wallet, 
  Diamond, Headphones, Receipt, Gamepad2, LogOut 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/')
  }

  // Generate fake username (e.g., enebian_6af6ec9f3fd0e)
  const username = user?.email ? `${user.email.split('@')[0]}_${user.id}` : 'enebian_user'

  return (
    <div 
      ref={dropdownRef} 
      className="absolute right-0 top-[52px] w-[320px] bg-[#5825cc] border border-white/20 shadow-2xl rounded-sm text-left z-50 before:content-[''] before:absolute before:-top-2 before:right-2.5 before:w-4 before:h-4 before:bg-[#5825cc] before:border-l before:border-t before:border-white/20 before:rotate-45"
    >
      {/* User Info Header */}
      <div className="flex items-center gap-3 p-5 border-b border-white/10">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFCC00] text-[#202020] shrink-0">
          <Bot size={24} />
        </div>
        <div className="overflow-hidden">
          <div className="font-bold text-[15px] truncate">{username}</div>
          <div className="text-[12px] text-white/60 truncate">{user?.email}</div>
        </div>
      </div>

      {/* Progress Box - Updated to 0% */}
      <div className="p-5 border-b border-white/10">
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
      <div className="flex flex-col py-2">
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
        
        <div className="border-t border-white/10 mt-2 pt-2">
          <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 hover:bg-[#4618ac] transition-colors text-left w-full">
            <LogOut size={18} className="text-white/70" /> <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}