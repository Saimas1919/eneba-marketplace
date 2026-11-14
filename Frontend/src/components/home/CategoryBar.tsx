import { Link } from 'react-router-dom'
import { 
  Gamepad2, CreditCard, Gift, Smartphone, Disc3, Play, 
  ChevronLeft, ChevronRight, Tag, Monitor, PlayCircle, Box, Film, Music 
} from 'lucide-react'

const IconMap: Record<string, any> = { 
  Gamepad2, CreditCard, Gift, Smartphone, Disc3, Play, Tag, Monitor, PlayCircle, Box, Film, Music 
}

export default function CategoryBar({ categories }: { categories: any[] }) {
  if (!categories || categories.length === 0) return null

  return (
    <section className="w-full text-white">
      <div className="relative w-full h-[134px] flex items-center px-8 max-w-[1440px] mx-auto">
        
        <button className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors">
          <ChevronLeft size={22} />
        </button>

        <div className="flex-1 flex items-center justify-center gap-8 overflow-x-auto no-scrollbar px-6">
          {categories.map((cat) => {
            const Icon = IconMap[cat.icon] || Tag
            
            // Generates /store?category=Games or /store?platform=Steam
            const storeUrl = `/store?${cat.type}=${encodeURIComponent(cat.value)}`
            
            return (
              <Link 
                key={cat.name} 
                to={storeUrl}
                className="group min-w-[78px] h-[90px] flex flex-col items-center justify-center gap-3 shrink-0 hover:text-[#FFCC00] transition-colors"
              >
                <Icon size={30} strokeWidth={1.8} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
              </Link>
            )
          })}
        </div>

        <button className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors">
          <ChevronRight size={22} />
        </button>

      </div>
    </section>
  )
}