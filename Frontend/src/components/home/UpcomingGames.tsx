import { useRef, useState, useEffect } from 'react'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import type { ProductCardProps } from '../ui/ProductCard'

const upcomingGames: ProductCardProps[] = [
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) Xbox Series X|S Key',
    platform: 'Xbox',
    region: 'UNITED KINGDOM',
    price: '€87.99',
    cashbackText: 'Cashback: €4.40',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) PS5 Key',
    platform: 'PSN',
    region: 'INDIA',
    price: '€65.00',
    cashbackText: 'Cashback: €3.25',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) PS5 Key',
    platform: 'PSN',
    region: 'LATIN AMERICA',
    price: '€69.99',
    cashbackText: 'Cashback: €3.50',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) PS5 Key',
    platform: 'PSN',
    region: 'BRAZIL',
    price: '€70.48',
    cashbackText: 'Cashback: €3.52',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) Xbox Series X|S Key',
    platform: 'Xbox',
    region: 'ARGENTINA',
    price: '€87.68',
    cashbackText: 'Cashback: €4.38',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Grand Theft Auto VI (GTA 6) PS5 Key',
    platform: 'PSN',
    region: 'INDIA',
    price: '€85.69',
    cashbackText: 'Cashback: €4.28',
    showAddToCart: true,
    showViewOffers: true,
  },
]

export default function UpcomingGames() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' })
    }
  }

  return (
    <section className="w-full bg-[#311178] py-12 px-6">
      <div className="max-w-[1200px] mx-auto relative group/carousel">
        
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Upcoming games
          </h2>
          <Info size={20} className="text-white/50" />
        </div>

        <button 
          onClick={() => scroll('left')}
          className={`absolute left-[-20px] top-[55%] -translate-y-1/2 z-10 bg-[#311178] text-white p-2 rounded-full border border-white/20 hover:bg-[#4618ac] transition-all shadow-lg 
            ${canScrollLeft ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-container scroll-smooth pb-4"
        >
          {upcomingGames.map((game, index) => (
            <div key={index} className="w-[calc(20%_-_12.8px)] shrink-0">
              <ProductCard {...game} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className={`absolute right-[-20px] top-[55%] -translate-y-1/2 z-10 bg-[#311178] text-white p-2 rounded-full border border-white/20 hover:bg-[#4618ac] transition-all shadow-lg 
            ${canScrollRight ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight size={24} />
        </button>

        <div className="mt-8 flex justify-center">
          <button className="border border-white text-white font-bold text-sm px-12 py-3 hover:bg-white/10 transition-colors">
            Show all
          </button>
        </div>

      </div>
    </section>
  )
}