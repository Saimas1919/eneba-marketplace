import { useRef, useState, useEffect } from 'react'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import type { ProductCardProps } from '../ui/ProductCard'

const products: ProductCardProps[] = [
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2q7p.webp',
    title: 'Roblox - 200 Robux Key',
    platform: 'Roblox',
    region: 'GLOBAL',
    price: '€2.58',
    cashbackText: '6% Cashback',
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
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p3b.webp',
    title: 'PlayStation Network Card 100 GBP (UK) PSN Key',
    platform: 'PSN',
    region: 'UNITED KINGDOM',
    price: '€108.23',
    oldPrice: '€115.00',
    discount: '-6%',
    cashbackText: 'Cashback: €5.41',
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
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p3b.webp',
    title: 'PlayStation Network Card 10 USD (USA) PSN Key',
    platform: 'PSN',
    region: 'UNITED STATES',
    price: '€8.78',
    oldPrice: '€9.80',
    discount: '-10%',
    cashbackText: '5% Cashback',
    showAddToCart: true,
    showViewOffers: true,
  },
  {
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2q7p.webp',
    title: 'Roblox - 200 Robux Key',
    platform: 'Roblox',
    region: 'GLOBAL',
    price: '€2.58',
    cashbackText: '6% Cashback',
    showAddToCart: true,
    showViewOffers: true,
  },
]

export default function Recommended() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      // -1 is for rounding errors
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
    <section className="w-full bg-[#4618ac] py-12 px-6">
      <div className="max-w-[1200px] mx-auto relative group/carousel">
        
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Recommended for you
          </h2>
          <Info size={20} className="text-white/50" />
        </div>

        {/* LEFT ARROW - Only shows on hover AND if canScrollLeft */}
        <button 
          onClick={() => scroll('left')}
          className={`absolute left-[-20px] top-[55%] -translate-y-1/2 z-10 bg-[#4618ac] text-white p-2 rounded-full border border-white/20 hover:bg-[#5c3fd1] transition-all shadow-lg 
            ${canScrollLeft ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-container scroll-smooth pb-4"
        >
          {products.map((product, index) => (
            <div key={index} className="w-[calc(20%_-_12.8px)] shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* RIGHT ARROW - Only shows on hover AND if canScrollRight */}
        <button 
          onClick={() => scroll('right')}
          className={`absolute right-[-20px] top-[55%] -translate-y-1/2 z-10 bg-[#4618ac] text-white p-2 rounded-full border border-white/20 hover:bg-[#5c3fd1] transition-all shadow-lg 
            ${canScrollRight ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight size={24} />
        </button>

        <div className="mt-8 flex justify-center">
          <button className="border border-white text-white font-bold text-sm px-12 py-3 hover:bg-white/10 transition-colors">
            See all
          </button>
        </div>

      </div>
    </section>
  )
}