import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function CartDropdown({ onClose }: { onClose: () => void }) {
  const { cartItems, removeCartItem, updateQuantity, cartSubtotal, cartCashback } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div ref={dropdownRef} className="absolute right-0 top-[52px] w-[380px] bg-[#5825cc] border border-white/20 shadow-2xl rounded-sm text-left z-50 before:content-[''] before:absolute before:-top-2 before:right-4 before:w-4 before:h-4 before:bg-[#5825cc] before:border-l before:border-t before:border-white/20 before:rotate-45">
      
      <div className="flex justify-between items-center p-5 border-b border-white/10">
        <h3 className="font-bold text-lg">My shopping cart</h3>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={20} /></button>
      </div>

      <div className="max-h-[350px] overflow-y-auto no-scrollbar">
        {cartItems.length === 0 ? (
          <div className="p-8 text-center text-white/60">Your cart is empty.</div>
        ) : (
          cartItems.map(item => {
            const singlePrice = item.priceValue || parseFloat(item.price.replace('€', '')) || 0;
            
            return (
              <div key={item.id} className="flex gap-4 p-5 border-b border-white/10">
                <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-sm shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-[11px] text-white/60 mb-1">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-black font-bold text-[9px]">X</div>
                    XG_Distribution
                  </div>
                  <h4 className="text-sm font-bold leading-tight line-clamp-2 mb-1">{item.title}</h4>
                  
                  <div className="flex justify-between items-center mt-3">
                    
                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-white/60 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold">€{(singlePrice * item.quantity).toFixed(2)}</div>
                      <div className="text-[10px] text-[#4ade80]">Cashback: €{(singlePrice * item.quantity * 0.14).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeCartItem(item.id)} className="text-white/40 hover:text-red-500 self-start"><Trash2 size={16} /></button>
              </div>
            )
          })
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-5">
          <div className="flex justify-between text-sm text-white/70 mb-1">
            <span>Service fee:</span>
            <span>-</span>
          </div>
          <div className="flex justify-between items-end mb-4">
            <span className="font-bold text-lg">Total</span>
            <div className="text-right">
              <div className="text-2xl font-extrabold">€{cartSubtotal.toFixed(2)}</div>
              <div className="text-xs text-[#4ade80] font-bold">Cashback: €{cartCashback.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/cart" onClick={onClose} className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm py-2.5 text-center transition-colors rounded-sm">View cart</Link>
            <Link to="/checkout" onClick={onClose} className="w-full bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm py-2.5 text-center transition-colors rounded-sm">Checkout now</Link>
          </div>
        </div>
      )}
    </div>
  )
}