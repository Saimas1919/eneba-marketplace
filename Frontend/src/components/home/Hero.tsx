import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero({ banners }: { banners: any[] }) {
  const [activeId, setActiveId] = useState(banners?.[0]?.id || 1)
  const navigate = useNavigate()

  if (!banners || banners.length === 0) return null

  const handleBannerClick = (banner: any) => {
    if (activeId === banner.id) {
      // If it's already active/expanded, navigate to the link
      navigate(banner.link || '/store')
    } else {
      // If it's not active, expand it
      setActiveId(banner.id)
    }
  }

  return (
    <section className="w-full h-[400px] flex overflow-hidden border-b border-white/10">
      {banners.map((banner) => {
        const isActive = activeId === banner.id
        return (
          <div
            key={banner.id}
            onClick={() => handleBannerClick(banner)}
            className={`relative h-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'flex-[4]' : 'flex-[0.5]'}`}
          >
            {/* BACKGROUND IMAGE */}
            <img
              src={banner.image}
              alt="Promo Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* OVERLAY: Darker when inactive to highlight the active image */}
            <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-black/0' : 'bg-black/60 hover:bg-black/30'}`} />
          </div>
        )
      })}
    </section>
  )
}