import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero({ banners }: { banners: any[] }) {
  const [activeId, setActiveId] = useState(banners?.[0]?.id || 1)
  const navigate = useNavigate()

  if (!banners || banners.length === 0) return null

  const handleBannerClick = (banner: any) => {
    // On mobile devices, clicking the banner navigates directly without expanding
    if (window.innerWidth < 768) {
      navigate(banner.link || '/store')
      return
    }

    // On desktop, first click expands, second click navigates
    if (activeId === banner.id) {
      navigate(banner.link || '/store')
    } else {
      setActiveId(banner.id)
    }
  }

  return (
    /* 
      Mobile: No scroll, all banners flex equally (minimized state)
      Desktop: Normal accordion behavior with expanded active banner
    */
    <section className="w-full h-[200px] md:h-[400px] flex overflow-hidden border-b border-white/10">
      {banners.map((banner) => {
        const isActive = activeId === banner.id
        return (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner)}
            /* 
              Fix: Removed `md:flex-none`. 
              `flex-1` handles mobile (all equal).
              `md:flex-[4]` and `md:flex-[0.5]` handle desktop perfectly.
            */
            className={`relative h-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex-1 min-w-0 ${
              isActive ? 'md:flex-[4]' : 'md:flex-[0.5]'
            }`}
          >
            {/* BACKGROUND IMAGE */}
            <img
              src={banner.image}
              alt="Promo Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* OVERLAY: Darker when inactive, only visible on desktop */}
            <div 
              className={`absolute inset-0 transition-colors duration-500 hidden md:block ${
                isActive ? 'bg-black/0' : 'bg-black/60 hover:bg-black/30'
              }`} 
            />
          </div>
        )
      })}
    </section>
  )
}