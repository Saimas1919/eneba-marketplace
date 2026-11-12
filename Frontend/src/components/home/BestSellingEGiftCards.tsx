import { useRef, useState, useEffect } from 'react'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import GiftCard from '../ui/GiftCard'
import type { GiftCardProps } from '../ui/GiftCard'

const giftCards: GiftCardProps[] = [
  { image: 'https://placehold.co/400x533/ffffff/000000?text=Apple+iTunes', alt: 'iTunes' },
  { image: 'https://placehold.co/400x533/1a1a1a/00ff00?text=Razer+Gold', alt: 'Razer Gold' },
  { image: 'https://placehold.co/400x533/141414/e50914?text=NETFLIX', alt: 'Netflix' },
  { image: 'https://placehold.co/400x533/232f3e/ff9900?text=amazon', alt: 'Amazon' },
  { image: 'https://placehold.co/400x533/1db954/ffffff?text=Spotify', alt: 'Spotify' },
  { image: 'https://placehold.co/400x533/ffd700/000000?text=Google+Play', alt: 'Google Play' },
  { image: 'https://placehold.co/400x533/171a21/ffffff?text=STEAM', alt: 'Steam' },
]

export default function BestSellingEGiftCards() {
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
            Best selling eGift Cards
          </h2>
          <Info size={20} className="text-white/50" />
        </div>

        <button 
          onClick={() => scroll('left')}
          className={`absolute left-[-20px] top-[50%] -translate-y-1/2 z-10 bg-[#311178] text-white p-2 rounded-full border border-white/20 hover:bg-[#4618ac] transition-all shadow-lg 
            ${canScrollLeft ? 'opacity-0 group-hover/carousel:opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scroll-container scroll-smooth pb-4"
        >
          {giftCards.map((card, index) => (
            <div key={index} className="w-[calc(16.666%_-_13.33px)] shrink-0">
              <GiftCard {...card} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className={`absolute right-[-20px] top-[50%] -translate-y-1/2 z-10 bg-[#311178] text-white p-2 rounded-full border border-white/20 hover:bg-[#4618ac] transition-all shadow-lg 
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