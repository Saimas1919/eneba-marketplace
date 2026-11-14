import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Crosshair, Compass, Car, Shield, Gem, Swords, Gamepad2, Users, User, Crown, Box, Tent } from 'lucide-react'

const IconMap: Record<string, any> = {
  Swords, Compass, Car, Shield, Gem, Crosshair, Gamepad2, Users, User, ChessKnight: Crown, Box, Tent
}

export default function Categories({ 
  categories, 
  title = "Categories" 
}: { 
  categories: any[], 
  title?: string | null 
}) {
  const [visibleCount, setVisibleCount] = useState(7)
  
  if (!categories || categories.length === 0) return null

  const hasMore = categories.length > visibleCount
  const displayedCategories = categories.slice(0, visibleCount)

  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {title && (
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{title}</h2>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {displayedCategories.map((category, index) => {
            const Icon = IconMap[category.icon] || Gamepad2
            
            return (
              <Link 
                key={index} 
                to={`/store?genre=${encodeURIComponent(category.name)}`}
                className="group flex flex-col items-center justify-center bg-[#3a1390] hover:bg-[#4e1a9e] border border-white/5 hover:border-white/20 p-4 transition-all duration-200"
              >
                <span className="text-white/50 text-[11px] font-bold mb-3 group-hover:text-white/80 transition-colors">
                  {category.count}
                </span>
                <Icon size={28} className="text-white mb-3 group-hover:text-[#FFCC00] group-hover:scale-110 transition-all duration-200" />
                <span className="text-white text-[13px] font-bold">{category.name}</span>
              </Link>
            )
          })}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 7)}
              className="border border-white text-white font-bold text-sm px-12 py-3 hover:bg-white/10 transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  )
}