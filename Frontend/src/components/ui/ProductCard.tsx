import { Link } from 'react-router-dom'
import { Heart, Info, Monitor, Gamepad2, Play, ShoppingCart, Plus } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export interface ProductCardProps {
  id: string
  image: string
  title: string
  platform: string
  region: string
  price: string
  priceValue?: number
  oldPrice?: string
  discount?: string
  cashbackText: string
  hasCashbackBadge?: boolean
  showAddToCart?: boolean
  showViewOffers?: boolean
}

export default function ProductCard({
  id, image, title, platform, region, price, priceValue, oldPrice, discount, cashbackText,
  hasCashbackBadge = true, showAddToCart = false, showViewOffers = true,
}: ProductCardProps) {
  const { user, toggleWishlist, toggleCart } = useAuth()
  
  const hasButtons = showAddToCart || showViewOffers
  
  const translateClass = (showAddToCart && showViewOffers) 
    ? "md:translate-y-[86px] md:group-hover:translate-y-0" 
    : hasButtons ? "md:translate-y-[50px] md:group-hover:translate-y-0" : "translate-y-0"

  const isWishlisted = user?.wishlist?.includes(id)
  const isInCart = user?.cart?.includes(id)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(id)
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const product = { id, image, title, platform, region, price, priceValue, oldPrice, discount, cashbackText }
    toggleCart(product)
  }

  return (
    <Link to={`/product/${id}`} className="block w-full group">
      {/* REMOVED: rounded-md md:rounded-none -> Now sharp corners always */}
      <div className="relative w-full flex flex-row md:block md:aspect-[1/2] overflow-hidden cursor-pointer border border-[#4ade80]/70 hover:border-[#4ade80] md:hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all duration-300 bg-[#1b0f36]">
        
        {/* IMAGE */}
        <div className="relative w-[110px] md:w-full md:absolute md:inset-0 h-auto md:h-full shrink-0 flex items-center justify-center bg-black/20 md:bg-transparent">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        
        {/* WISHLIST */}
        <button 
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 md:top-3 md:right-3 transition-colors z-20 ${isWishlisted ? 'text-[#4ade80]' : 'text-white hover:text-[#FFCC00]'}`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* DESKTOP CASHBACK BADGE */}
        {hasCashbackBadge && (
          <div className={`hidden md:flex absolute bottom-full left-0 bg-[#4ade80] text-[#1b0f36] text-[10px] font-extrabold px-2 py-1 items-center gap-1 uppercase tracking-wider z-20 ${translateClass}`}>
            <span className="text-sm">◎</span> CASHBACK
          </div>
        )}

        {/* CONTENT WRAPPER */}
        <div className={`flex flex-col flex-1 p-3 md:p-0 md:absolute md:bottom-0 md:left-0 md:w-full md:transition-transform md:duration-300 md:ease-out md:bg-[#1b0f36] ${translateClass}`}>
          
          <div className="hidden md:flex bg-[#0d071a] text-white/90 text-[10px] py-1 items-center justify-center gap-1.5 font-semibold">
            {platform === 'Windows' ? <Monitor size={10} /> : platform === 'PSN' ? <Play size={10} /> : <Gamepad2 size={10} />}
            {platform}
          </div>

          <div className="md:px-3 md:pt-3 md:pb-6 flex flex-col h-full">
            <h3 className="text-white text-[12px] md:text-[12px] font-bold leading-tight line-clamp-2 mb-1 md:min-h-[30px] pr-6 md:pr-0">{title}</h3>
            <div className="text-[#4ade80] text-[10px] font-bold uppercase tracking-wider mb-1.5 md:mb-2">{region}</div>

            <div className="mt-auto">
              <div className="text-white/60 text-[10px] mb-0.5">From</div>
              <div className="flex items-end gap-1.5 mb-0.5">
                {oldPrice && <span className="text-white/50 text-[11px] line-through mb-0.5">{oldPrice}</span>}
                {discount && <span className="text-[#4ade80] text-[11px] font-bold mb-0.5">{discount}</span>}
              </div>
              <div className="flex items-center gap-1 md:mb-1.5">
                <span className="text-white text-[17px] md:text-lg font-extrabold tracking-tight">{price}</span>
                <Info size={12} className="text-white/40" />
              </div>
              <div className="text-[#4ade80] text-[10px] font-bold">{cashbackText}</div>
            </div>
          </div>

          {/* DESKTOP BUTTONS */}
          {hasButtons && (
            <div className="hidden md:flex px-3 pb-3 flex-col gap-1.5">
              {showAddToCart && (
                <button 
                  onClick={handleCartClick}
                  className={`w-full font-bold text-[12px] py-1.5 transition-colors ${isInCart ? 'bg-[#4ade80] text-[#1b0f36] hover:bg-[#3bce70]' : 'bg-[#FFCC00] hover:bg-[#ffdc4d] text-black'}`}
                >
                  {isInCart ? "In Cart" : "Add to cart"}
                </button>
              )}
              {showViewOffers && (
                <button className="w-full bg-transparent border border-white text-white hover:bg-white/10 font-bold text-[12px] py-1.5 transition-colors">View offers</button>
              )}
            </div>
          )}
        </div>

        {/* MOBILE ADD TO CART BUTTON - REMOVED: rounded-sm -> Now sharp */}
        {showAddToCart && (
          <button 
            onClick={handleCartClick}
            className="md:hidden absolute bottom-2 right-2 border border-[#4ade80]/50 bg-white/5 hover:bg-white/10 p-1.5 text-white flex items-center justify-center z-20"
          >
            {isInCart ? (
              <ShoppingCart size={16} className="text-[#4ade80]" />
            ) : (
              <div className="relative">
                <ShoppingCart size={16} />
                <Plus size={10} className="absolute -top-1 -right-1" />
              </div>
            )}
          </button>
        )}

      </div>
    </Link>
  )
}