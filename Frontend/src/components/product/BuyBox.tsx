import { useNavigate } from 'react-router-dom'
import { Heart, ShieldCheck, Globe, ShoppingCart, Star } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

interface BuyBoxProps {
  product: any
  offersCount?: number
}

export default function BuyBox({ product, offersCount = 18 }: BuyBoxProps) {
  const navigate = useNavigate()
  const { user, toggleCart } = useAuth()

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    const isAlreadyInCart = user.cart?.includes(product.id)
    if (!isAlreadyInCart) {
      toggleCart(product, false) 
    }
    navigate('/cart')
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* DESKTOP ONLY TRUSTPILOT */}
      <div className="hidden lg:flex items-center justify-end gap-2 mb-2 text-white">
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

      {/* FEATURED OFFER BOX - Full width on mobile, no rounded corners */}
      <div className="bg-[#5825cc] lg:bg-[#5825cc] p-4 lg:p-5 lg:rounded-sm shadow-none lg:shadow-xl border-y lg:border border-white/10">
        <div className="flex justify-between items-center mb-3 lg:mb-4">
          <span className="text-[10px] font-bold text-[#FFCC00] tracking-wider uppercase">Featured offer</span>
          <button className="text-white hover:text-[#FFCC00] transition-colors lg:hidden"><Heart size={18} /></button>
        </div>
        
        <div className="flex items-center gap-2 mb-1 text-white/60 text-sm">
          {product.oldPrice && <span className="line-through">{product.oldPrice}</span>}
          {product.discount && <span className="text-[#4ade80] font-bold">{product.discount}</span>}
        </div>
        
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl lg:text-4xl font-extrabold">{product.price}</span>
          <span className="text-[11px] text-white/60 flex items-center gap-1">Price is not final <span className="border border-white/30 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">i</span></span>
        </div>
        
        <div className="text-[#4ade80] text-[13px] lg:text-sm font-bold mb-1 flex flex-wrap items-center gap-1">
          <ShieldCheck size={14} /> 14% Cashback <span className="bg-[#4ade80] text-[#1b0f36] text-[10px] px-1 rounded-sm ml-1">Best cashback</span>
        </div>
        
        <p className="text-xs text-white/60 mb-4 lg:mb-4 mt-2">Promotion ends in 15 days!</p>
        
        <div className="bg-white rounded-sm p-2 mb-3 flex justify-center">
          <span className="text-[#003087] font-extrabold italic text-xl tracking-tighter">PayPal</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-lg py-2.5 transition-colors rounded-sm"
          >
            Buy now
          </button>
          
          <button 
            onClick={handleBuyNow}
            className="w-12 bg-transparent lg:bg-[#4618ac] border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm shrink-0"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-[#FFCC00] hover:underline cursor-pointer">
          +{offersCount} offers from {product.price}
        </div>
      </div>

      {/* DESKTOP ONLY SAFE CHECKOUT BOX */}
      <div className="hidden lg:block bg-[#5825cc] p-5 rounded-sm shadow-xl border border-white/10">
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

      {/* DESKTOP ONLY NEWSLETTER BOX */}
      <div className="hidden lg:flex bg-[#5825cc] p-5 rounded-sm shadow-xl border border-white/10 flex-col items-start">
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