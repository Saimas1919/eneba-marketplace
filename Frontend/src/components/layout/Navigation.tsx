import { Menu } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="hidden lg:block w-full bg-[#36118a] text-white border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 h-12 flex items-center justify-center gap-6 text-[14px] font-semibold">
        <button className="flex items-center gap-2 hover:text-[#FFCC00] transition-colors h-full shrink-0">
          <Menu size={20} />
          <span>Categories</span>
        </button>
        <div className="flex items-center gap-6 h-full overflow-x-auto no-scrollbar">
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">Cheap Games</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">Software</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">eGift Cards</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">Eneba Gift Cards</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">Probably Stolen</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">FM27</a>
          <a href="#" className="hover:text-[#FFCC00] transition-colors whitespace-nowrap">GTA 6</a>
        </div>
        <div className="h-full flex items-center shrink-0">
          <a href="#" className="bg-[#cc0000] text-white px-3 py-1.5 font-bold text-xs uppercase hover:bg-[#e60000] transition-colors">
            24H SALE
          </a>
        </div>
      </div>
    </nav>
  )
}