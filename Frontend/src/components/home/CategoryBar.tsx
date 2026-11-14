import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Gamepad2, CreditCard, Gift, Smartphone, Disc3, Play, 
  ChevronLeft, ChevronRight, Tag, Monitor, PlayCircle, Box, Film, Music 
} from 'lucide-react'

const IconMap: Record<string, any> = { 
  Gamepad2, CreditCard, Gift, Smartphone, Disc3, Play, Tag, Monitor, PlayCircle, Box, Film, Music 
}

export default function CategoryBar({ categories }: { categories: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!categories || categories.length === 0) return null

  // Function to scroll the container left or right
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300 // Adjust this value to scroll more/less
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="w-full text-white">
      {/* Reduced height on mobile (h-[100px]) and standard on desktop (md:h-[134px]) */}
      <div className="relative w-full h-[100px] md:h-[134px] flex items-center px-2 md:px-8 max-w-[1440px] mx-auto">
        
        {/* Left Arrow - Now visible on mobile */}
        <button 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors p-1"
        >
          <ChevronLeft size={20} className="md:w-[22px] md:h-[22px]" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex-1 flex items-center justify-start md:justify-center gap-3 md:gap-6 overflow-x-auto no-scrollbar px-2 md:px-6 scroll-smooth"
        >
          {categories.map((cat) => {
            const Icon = IconMap[cat.icon] || Tag
            
            const storeUrl = `/store?${cat.type}=${encodeURIComponent(cat.value)}`
            
            return (
              <Link 
                key={cat.name} 
                to={storeUrl}
                className="group min-w-[64px] md:min-w-[78px] h-[80px] md:h-[90px] flex flex-col items-center justify-center gap-2 md:gap-3 shrink-0 hover:text-[#FFCC00] transition-colors"
              >
                <Icon className="w-6 h-6 md:w-[30px] md:h-[30px] group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                <span className="text-[11px] md:text-xs font-bold whitespace-nowrap">{cat.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Right Arrow - Now visible on mobile */}
        <button 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors p-1"
        >
          <ChevronRight size={20} className="md:w-[22px] md:h-[22px]" />
        </button>

      </div>
    </section>
  )
}