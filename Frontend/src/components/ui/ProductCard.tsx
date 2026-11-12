import { Link } from 'react-router-dom'
import { Heart, Info, Monitor, Gamepad2, Play } from 'lucide-react'

export interface ProductCardProps {
  id: string
  image: string
  title: string
  platform: string
  region: string
  price: string
  oldPrice?: string
  discount?: string
  cashbackText: string
  hasCashbackBadge?: boolean
  showAddToCart?: boolean
  showViewOffers?: boolean
}

export default function ProductCard({
  id,
  image,
  title,
  platform,
  region,
  price,
  oldPrice,
  discount,
  cashbackText,
  hasCashbackBadge = true,
  showAddToCart = false,
  showViewOffers = true,
}: ProductCardProps) {
  const hasButtons = showAddToCart || showViewOffers
  const translateClass = (showAddToCart && showViewOffers) 
    ? "translate-y-[86px] group-hover:translate-y-0" 
    : hasButtons 
    ? "translate-y-[50px] group-hover:translate-y-0" 
    : "translate-y-0"

  return (
    <Link to={`/product/${id}`} className="block w-full max-w-[227px] mx-auto">
      <div className="relative w-full aspect-[1/2] overflow-hidden group cursor-pointer border-2 border-[#4ade80] hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all duration-300 bg-[#1b0f36]">
        
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        
        <button className="absolute top-3 right-3 text-white hover:text-[#FFCC00] transition-colors z-10">
          <Heart size={18} />
        </button>

        <div className={`absolute bottom-0 left-0 w-full flex flex-col transition-transform duration-300 ease-out bg-[#1b0f36] ${translateClass}`}>
          
          {hasCashbackBadge && (
            <div className="absolute bottom-full left-0 bg-[#4ade80] text-[#1b0f36] text-[10px] font-extrabold px-2 py-1 flex items-center gap-1 uppercase tracking-wider z-20">
              <span className="text-sm">◎</span> CASHBACK
            </div>
          )}

          <div className="bg-[#0d071a] text-white/90 text-[10px] py-1 flex items-center justify-center gap-1.5 font-semibold">
            {platform === 'Windows' ? <Monitor size={10} /> : platform === 'PSN' ? <Play size={10} /> : <Gamepad2 size={10} />}
            {platform}
          </div>

          <div className="px-3 pt-3 pb-6 flex flex-col">
            <h3 className="text-white text-[12px] font-bold leading-tight line-clamp-2 mb-1 min-h-[30px]">{title}</h3>
            <div className="text-[#4ade80] text-[10px] font-bold uppercase tracking-wider mb-2">{region}</div>

            <div className="mt-auto">
              <div className="text-white/60 text-[10px] mb-0.5">From</div>
              <div className="flex items-end gap-1.5 mb-0.5">
                {oldPrice && <span className="text-white/50 text-[11px] line-through mb-0.5">{oldPrice}</span>}
                {discount && <span className="text-[#4ade80] text-[11px] font-bold mb-0.5">{discount}</span>}
              </div>
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-white text-lg font-extrabold tracking-tight">{price}</span>
                <Info size={12} className="text-white/40" />
              </div>
              <div className="text-[#4ade80] text-[10px] font-bold">{cashbackText}</div>
            </div>
          </div>

          {hasButtons && (
            <div className="px-3 pb-3 flex flex-col gap-1.5">
              {showAddToCart && (
                <button className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-[12px] py-1.5 transition-colors">Add to cart</button>
              )}
              {showViewOffers && (
                <button className="w-full bg-transparent border border-white text-white hover:bg-white/10 font-bold text-[12px] py-1.5 transition-colors">View offers</button>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}