import { useState } from 'react'

const banners = [
  {
    id: 1,
    title: "SINGLE'S DAY CASHBACK",
    subtitle: "GET UP TO 11%!",
    buttonText: "SHOP NOW",
    bgColor: "bg-[#2b1b4d]",
    textColor: "text-white",
    btnBg: "bg-[#FFCC00]",
    btnText: "text-black"
  },
  {
    id: 2,
    title: "It's happening!",
    subtitle: "GRAND THEFT AUTO",
    buttonText: "SHOP CARDS",
    bgColor: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600",
    textColor: "text-white",
    btnBg: "bg-[#4618ac]",
    btnText: "text-white"
  },
  {
    id: 3,
    title: "GAMES -90% OFF!",
    subtitle: "Cheaper!",
    buttonText: "SHOP NOW",
    bgColor: "bg-[#1f1f2e]",
    textColor: "text-white",
    btnBg: "bg-[#FFCC00]",
    btnText: "text-black"
  },
  {
    id: 4,
    title: "DEFY DEATH",
    subtitle: "PHANTOM BLADE",
    buttonText: "BUY NOW",
    bgColor: "bg-[#3a0c0c]",
    textColor: "text-[#FFCC00]",
    btnBg: "bg-white",
    btnText: "text-black"
  }
]

export default function Hero() {
  const [activeId, setActiveId] = useState(1)

  return (
    <section className="w-full h-[360px] flex overflow-hidden border-b border-white/10">
      {banners.map((banner) => {
        const isActive = activeId === banner.id

        return (
          <div
            key={banner.id}
            onClick={() => setActiveId(banner.id)}
            className={`
              relative h-full cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex flex-col justify-center items-center
              ${banner.bgColor}
              ${isActive ? 'flex-[4]' : 'flex-[0.5]'}
            `}
          >
            {/* Expanded View */}
            {isActive ? (
              <div className="relative z-10 text-center px-6 animate-fade-in">
                <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-2 ${banner.textColor} uppercase`}>
                  {banner.title}
                </h2>
                <p className={`text-lg md:text-xl font-bold mb-6 ${banner.textColor} opacity-80 uppercase tracking-widest`}>
                  {banner.subtitle}
                </p>
                <button className={`${banner.btnBg} ${banner.btnText} font-bold px-8 py-3 text-sm hover:opacity-90 transition-opacity`}>
                  {banner.buttonText}
                </button>
              </div>
            ) : (
              // Collapsed View (Just the title, rotated vertically or faded)
              <div className="relative z-10 text-center opacity-50 hover:opacity-100 transition-opacity">
                <span className={`text-sm font-bold tracking-widest uppercase whitespace-nowrap ${banner.textColor}`}>
                  {banner.title.split(' ')[0]}
                </span>
              </div>
            )}
            
            {/* Subtle separator line between banners */}
            {!isActive && <div className="absolute right-0 top-0 w-[1px] h-full bg-white/10" />}
          </div>
        )
      })}
    </section>
  )
}