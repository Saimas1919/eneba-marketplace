import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // <-- No longer need useNavigate for the back button
import { Trash2, Info, ChevronDown, Check, Tag, Star, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Recommended from '../components/home/Recommended'
import { api } from '../lib/api'
import type { ProductCardProps } from '../components/ui/ProductCard'

export default function CartPage() {
  useDocumentTitle("My Cart | Eneba");
  
  const { cartItems, removeCartItem, updateQuantity, cartSubtotal, cartCashback } = useAuth()
  const [inspiredProducts, setInspiredProducts] = useState<ProductCardProps[]>([])
  const [isLoadingInspiration, setIsLoadingInspiration] = useState(true)

  useEffect(() => {
    api.getProducts({ sort: 'popular' })
      .then(data => {
        setInspiredProducts((data || []).slice(0, 5))
        setIsLoadingInspiration(false)
      })
      .catch(err => {
        console.error("Failed to load inspired products", err)
        setIsLoadingInspiration(false)
      })
  }, [])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#4618ac] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/store" className="bg-[#FFCC00] text-black font-bold px-8 py-3 rounded-sm hover:bg-[#ffdc4d]">Go to Store</Link>
      </div>
    )
  }

  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)

  return (
    <div className="min-h-screen bg-[#4618ac] text-white flex flex-col">
      
      {/* HEADER / STEPS */}
      <div className="bg-[#311178] py-6 px-4 lg:px-6 mb-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LOGO & BACK BUTTON */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Changed to Link to="/" */}
            <Link 
              to="/" 
              className="lg:hidden p-1 -ml-1 text-white hover:text-[#FFCC00] transition-colors"
            >
              <ChevronLeft size={28} />
            </Link>
            <Link to="/" className="shrink-0 flex items-center">
              <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain" />
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-bold overflow-x-auto no-scrollbar w-full md:w-auto justify-center">
            <Link to="/cart" className="flex items-center gap-2 text-[#4ade80] hover:text-[#86efac] transition-colors shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#4ade80] text-black flex items-center justify-center text-[10px] md:text-xs">1</span> Cart
            </Link>
            <div className="w-8 md:w-20 h-[1px] bg-white/20 shrink-0"></div>
            
            <Link to="/checkout" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] md:text-xs">2</span> Payment
            </Link>
            <div className="w-8 md:w-20 h-[1px] bg-white/20 shrink-0"></div>
            
            <div className="flex items-center gap-2 text-white/50 opacity-60 cursor-not-allowed shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] md:text-xs">3</span> Get product
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 font-bold text-sm">
            🇪🇺 English EU | EUR
          </div>
        </div>
      </div>

      {/* MAIN CART CONTENT */}
      <div className="max-w-[1200px] w-full mx-auto px-4 lg:px-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mb-12">
          
          {/* LEFT: CART ITEMS */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#311178] rounded-sm p-4 lg:p-6">
              <h2 className="text-xl font-bold mb-6">My cart</h2>
              
              <div className="flex flex-col gap-6">
                {cartItems.map(item => {
                  const singlePrice = item.priceValue || parseFloat(item.price.replace('€', '')) || 0;
                  const qty = item.quantity || 1;
                  const rowTotal = (singlePrice * qty).toFixed(2);
                  const rowCashback = (singlePrice * qty * 0.14).toFixed(2);

                  return (
                    <div key={item.id} className="flex gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <img src={item.image} alt="" className="w-20 h-28 lg:w-24 lg:h-32 object-cover rounded-sm shrink-0" />
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1 text-[10px] lg:text-[11px] text-white/60 mb-1">
                              Sold by <div className="bg-white rounded-full w-4 h-4 inline-flex items-center justify-center text-black font-bold text-[9px] ml-1">X</div> XG_Distribution
                            </div>
                            <h3 className="font-bold text-sm lg:text-[15px] leading-tight mb-1 line-clamp-2">{item.title}</h3>
                            <div className="text-[10px] lg:text-xs text-white/60 flex items-center gap-1">Digital product <Info size={12} /></div>
                          </div>
                          
                          <div className="flex gap-3 text-white/60">
                            <button className="hover:text-white" onClick={() => removeCartItem(item.id)}><Trash2 size={18} /></button>
                          </div>
                        </div>

                        <div className="text-[#4ade80] text-[10px] lg:text-xs font-bold mt-2">Cashback: €{rowCashback}</div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center gap-3 lg:gap-4 bg-[#4618ac] px-2 lg:px-3 py-1 lg:py-1.5 rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={qty <= 1}
                              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-lg"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-white/60 hover:text-white text-lg"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-bold text-base lg:text-lg">€{rowTotal}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Support Ukraine Box */}
            <div className="bg-[#311178] rounded-sm p-4 lg:p-6 flex items-start gap-4 cursor-pointer hover:bg-[#311178]/80 transition-colors">
              <div className="bg-[#FFCC00] w-6 h-6 rounded-sm shrink-0 flex items-center justify-center text-black"><Check size={16} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm lg:text-base">Let's support freedom</h3>
                  <Info size={14} className="text-white/50" />
                </div>
                <p className="text-xs lg:text-sm text-white/70">Add a donation and express your support to Ukraine.</p>
              </div>
              <ChevronDown size={20} className="text-white/50" />
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#311178] rounded-sm p-4 lg:p-6">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">Summary</h2>
              
              <Link 
                to="/checkout"
                className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm lg:text-[15px] py-3 rounded-[2px] mb-6 transition-colors text-center block"
              >
                Proceed to checkout
              </Link>

              <div className="flex justify-between text-sm lg:text-[15px] mb-3 text-white/90">
                <span>{totalItemsCount} products</span>
                <span className="font-bold">€{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm lg:text-[15px] mb-6 text-white/90">
                <span className="flex items-center gap-1.5">Service fee <Info size={16} className="text-white/50" /></span>
                <span className="flex items-center gap-1.5">-- <Info size={16} className="text-white/50" /></span>
              </div>

              <div className="border-t border-white/10 pt-5 mb-5">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-bold text-lg lg:text-xl">Total:</span>
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-extrabold">€{cartSubtotal.toFixed(2)}</div>
                    <div className="text-xs lg:text-sm text-[#4ade80] font-bold">Cashback: €{cartCashback.toFixed(2)}</div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] bg-[#FFCC00] rounded-[2px] flex items-center justify-center shrink-0">
                      <Check size={16} className="text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-xs lg:text-[13px] text-white/80 leading-tight group-hover:text-white transition-colors">
                    I agree to receive an email invitation to review the service on Trustpilot
                  </span>
                </label>
              </div>

              <div className="border-t border-white/10 py-4 flex items-center justify-between cursor-pointer group mb-4">
                <div className="flex items-center gap-3 text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                  <Tag size={18} /> Got discount code?
                </div>
                <ChevronDown size={20} className="text-white/50 group-hover:text-white transition-colors" />
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#00b67a] w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] flex items-center justify-center border-r border-white/20 last:border-0">
                      <Star size={16} fill="white" className="text-white" />
                    </div>
                  ))}
                  <div className="relative w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] bg-[#dcdce6] flex items-center justify-center">
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-[#00b67a] overflow-hidden flex items-center justify-center">
                      <Star size={16} fill="white" className="text-white absolute left-0 ml-[4px]" />
                    </div>
                  </div>
                </div>
                <span className="text-sm lg:text-[15px] font-medium text-white">See our reviews</span>
              </div>
            </div>
          </div>

        </div>

        {/* DYNAMIC INSPIRED BY YOUR PICKS */}
        {!isLoadingInspiration && inspiredProducts.length > 0 && (
          <div className="bg-[#311178] rounded-sm p-4 lg:p-8 mb-16">
            <Recommended products={inspiredProducts} title="Inspired by your picks" />
          </div>
        )}
      </div>

      {/* CUSTOM FOOTER - Wraps on Mobile */}
      <div className="w-full mt-auto">
        <div className="w-full bg-white py-4 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t-[3px] border-b-[3px] border-gray-200">
          <span className="text-[#5c3fd1] font-extrabold text-xl tracking-tighter shrink-0">
            eneba <span className="text-[10px] text-gray-500 font-normal block leading-none">wallet</span>
          </span>
          <span className="text-[#1a1f71] font-extrabold text-2xl italic tracking-tighter shrink-0">VISA</span>
          <div className="flex shrink-0">
            <div className="w-7 h-7 rounded-full bg-red-500 opacity-90"></div>
            <div className="w-7 h-7 rounded-full bg-yellow-500 opacity-90 -ml-3"></div>
          </div>
          <span className="text-[#003087] font-extrabold text-2xl italic tracking-tighter shrink-0">PayPal</span>
          <span className="text-black font-extrabold text-base shrink-0 flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Pay
          </span>
          <span className="text-[#ffb3c7] font-extrabold text-xl shrink-0 tracking-tight">Klarna.</span>
          <span className="text-[#0079c1] font-extrabold text-2xl shrink-0">venmo</span>
        </div>
        <div className="bg-[#1f0a4e] py-8 text-center text-white/60 px-6">
          <h3 className="text-white font-bold text-sm mb-1.5">Shopping on Eneba is risk-free & easy!</h3>
          <p className="text-xs mb-5">
            If you may experience any inconvenience, our Support Team is happy to help. <a href="#" className="text-[#FFCC00] hover:underline">Create a ticket</a> and we'll contact you as soon as possible.
          </p>
          <div className="border-t border-white/10 pt-4 max-w-[1200px] mx-auto">
            <p className="text-[10px]">
              Copyright © 2026 Eneba. All Rights Reserved. JSC “Helis play”, Gyneju St. 4-333, Vilnius, the Republic of Lithuania. 
              <a href="#" className="underline ml-1 hover:text-white">Terms and Conditions</a>, 
              <a href="#" className="underline ml-1 hover:text-white">Privacy notice</a>, 
              <a href="#" className="underline ml-1 hover:text-white">Cookie preferences</a>.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}