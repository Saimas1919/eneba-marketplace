import { Heart, ShieldCheck, Globe, ShoppingCart, Star } from 'lucide-react'

interface BuyBoxProps {
  price: string
  oldPrice: string
  discount: string
  cashback: string
  offersCount: number
}

export default function BuyBox({ price, oldPrice, discount, cashback, offersCount }: BuyBoxProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* TRUSTPILOT HEADER */}
      <div className="flex items-center justify-end gap-2 mb-2 text-white">
        <span className="text-[15px] font-medium">Excellent</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-6 h-6 flex items-center justify-center ${i === 5 ? 'bg-[#4ade80]/40' : 'bg-[#4ade80]'}`}>
              <Star size={14} className="text-white fill-white" />
            </div>
          ))}
        </div>
        <span className="text-[15px] font-medium ml-1">Trustpilot</span>
      </div>

      {/* FEATURED OFFER BOX */}
      <div className="bg-[#5825cc] p-5 rounded-sm shadow-xl border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-[#FFCC00] tracking-wider uppercase">Featured offer</span>
          <button className="text-white hover:text-[#FFCC00] transition-colors"><Heart size={18} /></button>
        </div>
        
        <div className="flex items-center gap-2 mb-1 text-white/60 text-sm">
          <span className="line-through">{oldPrice}</span>
          <span className="text-[#4ade80] font-bold">{discount}</span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-extrabold">{price}</span>
          <span className="text-[11px] text-white/60">Price is not final</span>
        </div>
        <div className="text-[#4ade80] text-sm font-bold mb-4 flex items-center gap-1">
          <ShieldCheck size={14} /> {cashback} <span className="bg-[#4ade80] text-[#1b0f36] text-[10px] px-1 rounded-sm ml-1">Best cashback</span>
        </div>
        
        <p className="text-xs text-white/60 mb-4">Promotion ends in 17 days!</p>
        
        <div className="bg-white rounded-sm p-2 mb-3 flex justify-center">
          <span className="text-[#003087] font-extrabold italic text-xl tracking-tighter">PayPal</span>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-lg py-2.5 transition-colors rounded-sm">
            Buy now
          </button>
          <button className="w-12 bg-[#4618ac] border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm">
            <ShoppingCart size={20} />
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-[#FFCC00] hover:underline cursor-pointer">
          +{offersCount} offers from €3.20
        </div>
      </div>

      {/* SAFE CHECKOUT BOX */}
      <div className="bg-[#5825cc] p-5 rounded-sm shadow-xl border border-white/10">
        <h3 className="font-bold text-sm mb-3">Safe Checkout Guaranteed</h3>
        <p className="text-[11px] text-white/60 mb-2">Trusted Payment Methods</p>
        <div className="flex flex-wrap gap-1 mb-6">
          {['eneba', 'VISA', 'PayPal', 'Payoneer', 'SEB', 'Luminor', 'Revolut', 'Artea', 'LKU', 'Apple Pay', 'G Pay', 'Citadele'].map(method => (
            <div key={method} className="bg-white text-black text-[9px] font-bold px-2 py-1 rounded-sm border border-gray-200">
              {method}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-white/60 mb-2">Data Encryption & Protection</p>
        <div className="bg-white rounded-sm p-3 flex items-center gap-2 mb-6">
          <ShieldCheck className="text-red-500" size={24} />
          <div>
            <div className="text-black font-extrabold italic text-sm leading-none">SCAMADVISER</div>
            <div className="text-[10px] text-gray-500">Trust score 100/100</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[10px] font-bold">
            <Globe size={16} /> SAFE CHECKOUT<br/>GUARANTEED
          </div>
          <div className="bg-red-600 text-white text-[9px] font-bold px-2 py-1 text-center leading-tight">
            PC<br/>EDITOR'S<br/>CHOICE
          </div>
        </div>
      </div>

      {/* NEWSLETTER BOX */}
      <div className="bg-[#5825cc] p-5 rounded-sm shadow-xl border border-white/10 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-1">
          <div className="border-2 border-[#4ade80] text-[#4ade80] p-1 rounded-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <span className="font-bold text-sm">Looking for good deals?</span>
        </div>
        <p className="text-sm text-white/80 mb-4">Get them delivered to your inbox</p>
        <button className="bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm px-6 py-2 transition-colors rounded-sm w-full max-w-[150px]">
          Subscribe
        </button>
      </div>

    </div>
  )
}