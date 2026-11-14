import { Link } from 'react-router-dom'
import { Trash2, Info, ChevronDown, Check, Tag, Star } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Recommended from '../components/home/Recommended'

export default function CartPage() {
  useDocumentTitle("My Cart | Eneba");
  
  const { cartItems, removeCartItem, updateQuantity, cartSubtotal, cartCashback } = useAuth()

  const inspiredProducts = [
    { id: "age-of-empires", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2r2w.webp", title: "Age of Empires II: Definitive Edition", platform: "Windows", region: "EUROPE", price: "€8.52", cashbackText: "11% Cashback", hasCashbackBadge: true },
    { id: "dollar-dash", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2q7p.webp", title: "Dollar Dash Steam Key", platform: "Steam", region: "GLOBAL", price: "€0.94", cashbackText: "11% Cashback", hasCashbackBadge: true },
    { id: "google-play-15", image: "https://placehold.co/400x533/000000/ffffff?text=Google+Play", title: "Google Play Gift Card 15 EUR Key", platform: "Google Play", region: "GREECE", price: "€14.91", cashbackText: "", hasCashbackBadge: false },
    { id: "minecraft-uk", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4p3c.webp", title: "Minecraft: Java & Bedrock Edition", platform: "Windows", region: "UNITED KINGDOM", price: "€15.96", cashbackText: "Cashback: €1.76", hasCashbackBadge: true },
    { id: "minecraft-jp", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3p3b.webp", title: "Minecraft: Java & Bedrock Edition", platform: "Windows", region: "JAPAN", price: "€16.00", cashbackText: "Cashback: €1.76", hasCashbackBadge: true }
  ]

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
      <div className="bg-[#311178] py-6 px-6 mb-8">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="shrink-0 flex items-center">
            <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain" />
          </Link>
          
          <div className="flex items-center gap-4 text-sm font-bold">
            
            {/* Step 1: Cart (Active) - Clickable */}
            <Link to="/cart" className="flex items-center gap-2 text-[#4ade80] hover:text-[#86efac] transition-colors">
              <span className="w-6 h-6 rounded-full bg-[#4ade80] text-black flex items-center justify-center text-xs">1</span> Cart
            </Link>
            <div className="w-20 h-[1px] bg-white/20"></div>
            
            {/* Step 2: Payment - Clickable */}
            <Link to="/checkout" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
              <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">2</span> Payment
            </Link>
            <div className="w-20 h-[1px] bg-white/20"></div>
            
            {/* Step 3: Get Product - Not clickable (Future step) */}
            <div className="flex items-center gap-2 text-white/50 opacity-60 cursor-not-allowed">
              <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">3</span> Get your product
            </div>

          </div>

          <div className="flex items-center gap-2 font-bold text-sm">
            🇪🇺 English EU | EUR
          </div>
        </div>
      </div>

      {/* MAIN CART CONTENT */}
      <div className="max-w-[1200px] w-full mx-auto px-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mb-12">
          
          {/* LEFT: CART ITEMS */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#311178] rounded-sm p-6">
              <h2 className="text-xl font-bold mb-6">My cart</h2>
              
              <div className="flex flex-col gap-6">
                {cartItems.map(item => {
                  const singlePrice = item.priceValue || parseFloat(item.price.replace('€', '')) || 0;
                  const qty = item.quantity || 1;
                  const rowTotal = (singlePrice * qty).toFixed(2);
                  const rowCashback = (singlePrice * qty * 0.14).toFixed(2);

                  return (
                    <div key={item.id} className="flex gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <img src={item.image} alt="" className="w-24 h-32 object-cover rounded-sm shrink-0" />
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1 text-[11px] text-white/60 mb-1">
                              Sold by <div className="bg-white rounded-full w-4 h-4 inline-flex items-center justify-center text-black font-bold text-[9px] ml-1">X</div> XG_Distribution
                            </div>
                            <h3 className="font-bold text-[15px] leading-tight mb-1">{item.title}</h3>
                            <div className="text-xs text-white/60 flex items-center gap-1">Digital product <Info size={12} /></div>
                          </div>
                          
                          <div className="flex gap-3 text-white/60">
                            <button className="hover:text-white" onClick={() => removeCartItem(item.id)}><Trash2 size={18} /></button>
                          </div>
                        </div>

                        <div className="text-[#4ade80] text-xs font-bold mt-2">Cashback: €{rowCashback}</div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div className="flex items-center gap-4 bg-[#4618ac] px-3 py-1.5 rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={qty <= 1}
                              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-white/60 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-bold text-lg">€{rowTotal}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Support Ukraine Box */}
            <div className="bg-[#311178] rounded-sm p-6 flex items-start gap-4 cursor-pointer hover:bg-[#311178]/80 transition-colors">
              <div className="bg-[#FFCC00] w-6 h-6 rounded-sm shrink-0 flex items-center justify-center text-black"><Check size={16} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">Let's support freedom</h3>
                  <Info size={14} className="text-white/50" />
                </div>
                <p className="text-sm text-white/70">Add a donation and express your support to Ukraine. We'll add 100% of your contribution to our initial pledge.</p>
              </div>
              <ChevronDown size={20} className="text-white/50" />
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#311178] rounded-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Summary</h2>
              
              <Link 
                to="/checkout"
                className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-[15px] py-3 rounded-[2px] mb-6 transition-colors text-center block"
              >
                Proceed to checkout
              </Link>

              <div className="flex justify-between text-[15px] mb-3 text-white/90">
                <span>{totalItemsCount} products</span>
                <span className="font-bold">€{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[15px] mb-6 text-white/90">
                <span className="flex items-center gap-1.5">Service fee <Info size={16} className="text-white/50" /></span>
                <span className="flex items-center gap-1.5">-- <Info size={16} className="text-white/50" /></span>
              </div>

              <div className="border-t border-white/10 pt-5 mb-5">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-bold text-xl">Total:</span>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold">€{cartSubtotal.toFixed(2)}</div>
                    <div className="text-sm text-[#4ade80] font-bold">Cashback: €{cartCashback.toFixed(2)}</div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="w-[22px] h-[22px] bg-[#FFCC00] rounded-[2px] flex items-center justify-center shrink-0">
                      <Check size={16} className="text-black" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-[13px] text-white/80 leading-tight group-hover:text-white transition-colors">
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
                    <div key={i} className="bg-[#00b67a] w-[30px] h-[30px] flex items-center justify-center border-r border-white/20 last:border-0">
                      <Star size={18} fill="white" className="text-white" />
                    </div>
                  ))}
                  <div className="relative w-[30px] h-[30px] bg-[#dcdce6] flex items-center justify-center">
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-[#00b67a] overflow-hidden flex items-center justify-center">
                      <Star size={18} fill="white" className="text-white absolute left-0 ml-[6px]" />
                    </div>
                  </div>
                </div>
                <span className="text-[15px] font-medium text-white">See our reviews</span>
              </div>
            </div>
          </div>

        </div>

        {/* INSPIRED BY YOUR PICKS */}
        <div className="bg-[#311178] rounded-sm p-8 mb-16">
          <Recommended products={inspiredProducts} title="Inspired by your picks" />
        </div>
      </div>

      {/* CUSTOM FOOTER */}
      <div className="w-full mt-auto">
        <div className="w-full bg-white py-3 md:py-4 flex items-center justify-center gap-6 md:gap-8 overflow-x-auto border-t-[3px] border-b-[3px] border-gray-200">
          <span className="text-[#5c3fd1] font-extrabold text-2xl tracking-tighter shrink-0">
            eneba <span className="text-[11px] text-gray-500 font-normal block leading-none">wallet</span>
          </span>
          <span className="text-[#1a1f71] font-extrabold text-3xl italic tracking-tighter shrink-0">VISA</span>
          <div className="flex shrink-0">
            <div className="w-8 h-8 rounded-full bg-red-500 opacity-90"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-90 -ml-3"></div>
          </div>
          <span className="text-[#003087] font-extrabold text-3xl italic tracking-tighter shrink-0">PayPal</span>
          <span className="text-[#003087] font-extrabold text-lg shrink-0">Pay Later</span>
          <span className="text-black font-extrabold text-lg shrink-0 flex items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Pay
          </span>
          <span className="text-gray-600 font-extrabold text-lg shrink-0 flex items-center gap-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Pay
          </span>
          <span className="text-[#ffb3c7] font-extrabold text-2xl shrink-0 tracking-tight">Klarna.</span>
          <span className="text-[#0079c1] font-extrabold text-3xl shrink-0">venmo</span>
          <span className="text-black font-extrabold text-lg shrink-0 flex items-center gap-2">
            <div className="w-7 h-7 bg-[#003087] rounded-md flex items-center justify-center text-white text-[12px] font-bold">C</div> Crypto
          </span>
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