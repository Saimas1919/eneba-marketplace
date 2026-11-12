import { ShieldCheck, Info, ShoppingCart, RotateCcw } from 'lucide-react'

export interface OfferItem {
  seller: string
  verified?: boolean
  rating?: string | null
  price: string
  oldPrice: string
  discount: string
  cashback: string
  isFeatured?: boolean
  hasPayPal?: boolean
  hasCart?: boolean
  isPrimaryBuyButton?: boolean
}

interface OffersProps {
  title: string
  titleColor?: string
  offers: OfferItem[]
  showLoadMore?: boolean
  loadMoreText?: string
  useRotateIcon?: boolean
}

export default function Offers({ 
  title, 
  titleColor = "text-white", 
  offers, 
  showLoadMore = false, 
  loadMoreText = "Load more offers",
  useRotateIcon = false
}: OffersProps) {
  return (
    <div className="mb-12 w-full">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className={`text-xl font-bold ${titleColor}`}>{title}</h2>
        <Info size={16} className="text-white/50" />
      </div>
      
      {/* OFFERS LIST */}
      <div className="flex flex-col gap-2 mb-6">
        {offers.map((offer, idx) => (
          <div key={idx} className="bg-[#5825cc] p-4 flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm border border-white/10">
            
            {/* LEFT SIDE: SELLER INFO */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-black overflow-hidden shrink-0">
                <img src={`https://placehold.co/100x100/ffffff/000000?text=${offer.seller[0]}`} alt="" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px]">{offer.seller}</span>
                  {offer.verified && <ShieldCheck size={16} className="text-[#4ade80]" />}
                </div>
                
                {offer.rating ? (
                  <div className="text-xs text-white/80 flex items-center gap-1 mt-1">
                    <span className="text-[#FFCC00]">★</span> {offer.rating} <Info size={12} className="text-white/40" />
                  </div>
                ) : (
                  <div className="text-xs text-white/60 flex items-center gap-1 mt-1">
                    Verified by Eneba <Info size={12} className="text-white/40" />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: PRICE & BUTTONS */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-0.5 text-white/60 text-sm">
                  <span className="line-through">{offer.oldPrice}</span>
                  <span className="text-[#4ade80] font-bold">{offer.discount}</span>
                  <Info size={12} className="text-white/40" />
                </div>
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-2xl font-extrabold">{offer.price}</span>
                  <Info size={14} className="text-white/40" />
                </div>
                
                <div className={`text-xs font-bold flex items-center justify-end gap-1 ${offer.cashback.includes('Cashback') ? 'text-[#4ade80]' : 'text-white/60'}`}>
                  {useRotateIcon ? <RotateCcw size={12} /> : <ShieldCheck size={12} />} 
                  {offer.cashback}
                  {offer.isFeatured && (
                    <span className="bg-transparent border border-[#4ade80] text-[#4ade80] text-[9px] px-1.5 py-0.5 rounded-full ml-1">
                      Best cashback
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {offer.hasPayPal && (
                  <div className="bg-white rounded-sm px-3 py-1.5 flex items-center justify-center">
                    <span className="text-[#003087] font-extrabold italic text-lg tracking-tighter">PayPal</span>
                  </div>
                )}
                {offer.hasCart && (
                  <button className="w-10 h-10 bg-transparent border border-white hover:bg-white/10 flex items-center justify-center rounded-sm transition-colors">
                    <ShoppingCart size={18} />
                  </button>
                )}
                <button 
                  className={`${offer.isPrimaryBuyButton ? 'bg-[#FFCC00] hover:bg-[#ffdc4d] text-black' : 'bg-transparent border border-white hover:bg-white/10 text-white'} font-bold text-sm px-6 py-2 transition-colors rounded-sm whitespace-nowrap h-10 flex items-center`}
                >
                  Buy now
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {showLoadMore && (
        <div className="flex justify-center mt-6">
          <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm px-8 py-2.5 transition-colors rounded-sm">
            {loadMoreText}
          </button>
        </div>
      )}
    </div>
  )
}