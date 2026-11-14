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
    <div className="mb-8 w-full">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3 lg:mb-4">
        <h2 className={`text-[17px] lg:text-xl font-bold ${titleColor}`}>{title}</h2>
        <Info size={16} className="text-white/50" />
      </div>
      
      {/* OFFERS LIST */}
      <div className="flex flex-col gap-2 mb-4">
        {offers.map((offer, idx) => (
          <div key={idx} className="bg-[#5825cc] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 rounded-none lg:rounded-sm border border-white/10 p-0 overflow-hidden">
            
            {/* MOBILE: Seller info on top, price below. DESKTOP: Flex row */}
            <div className="flex flex-col lg:flex-row w-full items-start lg:items-center justify-between p-3 lg:p-4 pb-0 lg:pb-4">
                
                {/* LEFT SIDE: SELLER INFO */}
                <div className="flex items-center gap-3 w-full lg:w-auto mb-3 lg:mb-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center font-bold text-black overflow-hidden shrink-0">
                    <img src={`https://placehold.co/100x100/ffffff/000000?text=${offer.seller[0]}`} alt="" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm lg:text-[15px]">{offer.seller}</span>
                      {offer.verified && <ShieldCheck size={14} className="text-[#4ade80]" />}
                    </div>
                    
                    {offer.rating ? (
                      <div className="text-[11px] lg:text-xs text-white/80 flex items-center gap-1 mt-0.5">
                        <span className="text-[#FFCC00]">★</span> {offer.rating} Superb rating <Info size={12} className="text-white/40" />
                      </div>
                    ) : (
                      <div className="text-[11px] lg:text-xs text-white/60 flex items-center gap-1 mt-0.5">
                        Verified by Eneba <Info size={12} className="text-white/40" />
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE: PRICE */}
                <div className="text-left lg:text-right w-full lg:w-auto">
                  <div className="flex items-center gap-2 justify-start lg:justify-end mb-0.5 text-white/60 text-xs lg:text-sm">
                    <span className="line-through">{offer.oldPrice}</span>
                    <span className="text-[#4ade80] font-bold">{offer.discount}</span>
                    <Info size={12} className="text-white/40 hidden lg:block" />
                  </div>
                  <div className="flex items-center gap-2 justify-start lg:justify-end mb-1">
                    <span className="text-[20px] lg:text-2xl font-extrabold">{offer.price}</span>
                    <Info size={14} className="text-white/40" />
                  </div>
                  
                  <div className={`text-[11px] lg:text-xs font-bold flex flex-wrap items-center justify-start lg:justify-end gap-1 ${offer.cashback.includes('Cashback') ? 'text-[#4ade80]' : 'text-white/60'}`}>
                    {useRotateIcon ? <RotateCcw size={12} /> : <ShieldCheck size={12} />} 
                    {offer.cashback}
                    {offer.isFeatured && (
                      <span className="bg-transparent border border-[#4ade80] text-[#4ade80] text-[9px] px-1.5 py-0.5 rounded-full ml-1">
                        Best cashback
                      </span>
                    )}
                  </div>
                </div>
            </div>

            {/* BUTTONS ROW */}
            <div className="flex items-center gap-2 w-full lg:w-auto px-3 lg:px-0 pb-3 lg:pb-0 lg:pr-4 mt-3 lg:mt-0 border-t border-white/10 lg:border-0 pt-3 lg:pt-0">
              {offer.hasPayPal && (
                <div className="bg-white rounded-sm px-3 py-1.5 flex items-center justify-center shrink-0">
                  <span className="text-[#003087] font-extrabold italic text-base lg:text-lg tracking-tighter">PayPal</span>
                </div>
              )}
              {offer.hasCart && (
                <button className="w-9 h-9 lg:w-10 lg:h-10 bg-transparent border border-white hover:bg-white/10 flex items-center justify-center rounded-sm transition-colors shrink-0">
                  <ShoppingCart size={16} className="lg:w-[18px] lg:h-[18px]" />
                </button>
              )}
              <button 
                className={`${offer.isPrimaryBuyButton ? 'bg-[#FFCC00] hover:bg-[#ffdc4d] text-black' : 'bg-transparent border border-white hover:bg-white/10 text-white'} font-bold text-sm px-4 lg:px-6 py-2 transition-colors rounded-sm whitespace-nowrap h-9 lg:h-10 flex items-center justify-center flex-1 lg:flex-none`}
              >
                Buy now
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {showLoadMore && (
        <div className="flex justify-center mt-6">
          <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm px-8 py-2.5 transition-colors rounded-sm w-full lg:w-auto">
            {loadMoreText}
          </button>
        </div>
      )}
    </div>
  )
}