import { useRef, useState, useEffect } from 'react'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import type { ProductCardProps } from '../ui/ProductCard'

const topGames: ProductCardProps[] = [
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2w.webp',
    title: 'Minecraft: Java & Bedrock Edition (PC) Official website Key',
    platform: 'Windows',
    region: 'GLOBAL',
    price: '€15.49',
    oldPrice: '€29.99',
    discount: '-48%',
    cashbackText: 'Cashback: €1.70',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2w.webp',
    title: 'Minecraft: Java & Bedrock Edition (PC) Windows Store Key',
    platform: 'Windows',
    region: 'GLOBAL',
    price: '€15.47',
    cashbackText: 'Cashback: €1.70',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4m2p.webp',
    title: 'over the hill Steam Key (PC) EUROPE',
    platform: 'Steam',
    region: 'EUROPE',
    price: '€13.69',
    oldPrice: '€24.99',
    discount: '-45%',
    cashbackText: 'Cashback: €1.51',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp',
    title: 'Probably Stolen - Cyberpunk Shopkeeper Simulator',
    platform: 'Steam',
    region: 'GLOBAL',
    price: '€8.53',
    cashbackText: '11% Cashback',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2t2q.webp',
    title: 'WARDogs Steam Key (PC) GLOBAL',
    platform: 'Steam',
    region: 'GLOBAL',
    price: '€29.38',
    cashbackText: 'Cashback: €3.23',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2x7p.webp',
    title: 'Farming Simulator 22 Steam Key GLOBAL',
    platform: 'Steam',
    region: 'REST OF THE WORLD',
    price: '€13.98',
    oldPrice: '€29.99',
    discount: '-53%',
    cashbackText: 'Cashback: €1.31',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2w.webp',
    title: 'Minecraft: Java & Bedrock Edition (PC) Official website Key',
    platform: 'Windows',
    region: 'GLOBAL',
    price: '€15.49',
    oldPrice: '€29.99',
    discount: '-48%',
    cashbackText: 'Cashback: €1.70',
    showAddToCart: true,
    showViewOffers: true,
  },
]

export default function TopGames() {
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
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="w-full bg-[#311178] py-12 px-6">
      <div className="max-w-[1200px] mx-auto relative group/carousel">
        
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Top games
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
          {topGames.map((game, index) => (
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