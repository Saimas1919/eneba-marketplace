import { useRef, useState, useEffect } from 'react'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'

export default function UpcomingGames({ products, title = "Upcoming games" }: { products: any[], title?: string | null }) {
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
  }, [products])

  if (!products || products.length === 0) return null

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto relative group/carousel">
        {title && (
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h2>
            <Info size={20} className="text-white/50" />
          </div>
        )}
        
        <button onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className={`hidden md:block absolute left-[-20px] top-[55%] -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full border border-white/20 hover:bg-black/50 transition-all shadow-lg ${canScrollLeft ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}><ChevronLeft size={24} /></button>
        
        <div ref={scrollRef} onScroll={checkScroll} className="flex flex-col md:flex-row gap-4 md:gap-2 md:overflow-x-auto scroll-container scroll-smooth pb-4">
          {products.map((product, index) => (
            <div key={index} className="w-full md:w-[calc(20%_-_6.4px)] md:shrink-0">
              <ProductCard {...product} showAddToCart={true} showViewOffers={true} />
            </div>
          ))}
        </div>
        
        <button onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className={`hidden md:block absolute right-[-20px] top-[55%] -translate-y-1/2 z-10 bg-black/30 text-white p-2 rounded-full border border-white/20 hover:bg-black/50 transition-all shadow-lg ${canScrollRight ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}><ChevronRight size={24} /></button>

        <div className="flex justify-center mt-6 md:mt-8">
          <Link to="/store?hideFilters=true&section=upcoming" className="border border-white text-white font-bold text-sm px-12 py-3 hover:bg-white/10 transition-colors rounded-sm w-full md:w-auto text-center">
            See all
          </Link>
        </div>
      </div>
    </section>
  )
}