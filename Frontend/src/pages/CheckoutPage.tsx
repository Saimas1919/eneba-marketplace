import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Info, Trash2, Loader2, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, cartSubtotal, cartCashback, removeCartItem, updateQuantity, clearCart } = useAuth()
  
  const [selectedMethod, setSelectedMethod] = useState('Luminor')
  const [loading, setLoading] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#4618ac] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/store" className="bg-[#FFCC00] text-black font-bold px-8 py-3 rounded-sm hover:bg-[#ffdc4d]">Go to Store</Link>
      </div>
    )
  }

  const handleContinue = async () => {
    setLoading(true)
    const token = localStorage.getItem('token') || ''
    
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1
      }))

      const paymentMethodObj = paymentMethods.find(m => m.name === selectedMethod)
      const methodName = paymentMethodObj ? paymentMethodObj.name : 'Card'

      const order = await api.createOrder({ 
        items: orderItems, 
        total: cartSubtotal,
        paymentMethod: methodName 
      }, token)
      
      clearCart()
      navigate('/order-success', { state: { order } })
      
    } catch (err) {
      console.error(err)
      alert("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    { id: 'wallet', name: 'Eneba Wallet', desc: 'Total available balance: €0.00', logo: <span className="text-[#5c3fd1] font-extrabold text-sm tracking-tighter">eneba <span className="text-[9px] text-gray-500 font-normal block leading-none">wallet</span></span> },
    { id: 'card', name: 'Credit or debit card', desc: 'Pay via Visa, Mastercard, or Maestro debit or credit card', logo: <div className="flex gap-1 items-center"><span className="text-[#1a1f71] font-extrabold italic text-lg tracking-tighter">VISA</span><div className="flex"><div className="w-4 h-4 rounded-full bg-red-500"></div><div className="w-4 h-4 rounded-full bg-yellow-500 -ml-2"></div></div></div> },
    { id: 'paypal', name: 'PayPal', desc: '', logo: <span className="text-[#003087] font-extrabold italic text-lg tracking-tighter">PayPal</span> },
    { id: 'swedbank', name: 'Swedbank', desc: '', logo: <span className="text-[#ff5c00] font-bold text-sm">Swedbank <span className="text-white bg-[#ff5c00] rounded-full px-1 text-[9px]">e</span></span> },
    { id: 'seb', name: 'SEB', desc: '', logo: <span className="text-black font-extrabold text-lg tracking-widest">SEB</span> },
    { id: 'luminor', name: 'Luminor', desc: '', logo: <span className="text-black font-bold text-sm tracking-tight">Luminor</span> },
    { id: 'revolut', name: 'Revolut', desc: '', logo: <span className="text-black font-extrabold text-sm tracking-tighter">Revolut</span> },
    { id: 'artea', name: 'Artea', desc: '', logo: <span className="text-black font-bold text-sm tracking-tight flex items-center gap-1"><div className="w-3 h-3 bg-black rounded-full"></div> Artea</span> },
    { id: 'lku', name: 'LKU', desc: '', logo: <span className="text-green-700 font-extrabold text-sm flex items-center gap-1"><div className="w-4 h-4 bg-green-500"></div> LKU</span> },
  ]

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
            <Link to="/cart" className="flex items-center gap-2 text-white hover:text-[#4ade80] transition-colors shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#4ade80] text-[#311178] flex items-center justify-center text-[10px] md:text-xs">✓</span> Cart
            </Link>
            <div className="w-8 md:w-24 h-[1px] bg-[#4ade80] shrink-0"></div>
            
            <Link to="/checkout" className="flex items-center gap-2 text-[#4ade80] hover:text-[#86efac] transition-colors shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#4ade80] text-[#311178] flex items-center justify-center text-[10px] md:text-xs font-extrabold">2</span> Payment
            </Link>
            <div className="w-8 md:w-24 h-[1px] bg-white/20 shrink-0"></div>
            
            <div className="flex items-center gap-2 text-white/50 opacity-60 cursor-not-allowed shrink-0">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] md:text-xs">3</span> Get product
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 font-bold text-sm">
            🇪🇺 English EU | EUR
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-4 lg:px-6 flex-1 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          
          {/* PAYMENT METHODS */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.name)}
                className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-sm border text-left transition-colors ${
                  selectedMethod === method.name 
                    ? 'bg-[#311178] border-[#311178]' 
                    : 'bg-[#311178]/40 border-transparent hover:bg-[#311178]/70'
                }`}
              >
                <div className="w-20 md:w-24 h-12 md:h-14 bg-white rounded-sm flex items-center justify-center shrink-0">
                  {method.logo}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-sm md:text-[15px] text-white mb-0.5">{method.name}</h3>
                  {method.desc && <p className="text-[10px] md:text-[11px] text-white/60 leading-tight hidden md:block">{method.desc}</p>}
                </div>

                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedMethod === method.name ? 'border-[#FFCC00]' : 'border-white/40'
                }`}>
                  {selectedMethod === method.name && <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#FFCC00] rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-[#311178] rounded-sm p-4 md:p-6 order-1 lg:order-2 lg:sticky lg:top-6">
            
            <div className="flex flex-col gap-4 mb-6">
              {cartItems.map(item => {
                const singlePrice = item.priceValue || parseFloat(item.price.replace('€', '')) || 0;
                const qty = item.quantity || 1;

                return (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-sm shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-[10px] text-white/60 mb-1">
                        Sold by <div className="bg-[#4ade80] rounded-full w-3 h-3 inline-flex items-center justify-center text-[#311178] font-bold text-[8px] ml-0.5">F</div> FlashDeals
                      </div>
                      <h4 className="text-sm font-bold leading-tight mb-1 line-clamp-2">{item.title}</h4>
                      <div className="text-[10px] text-white/60 uppercase font-bold mb-2">{item.region}</div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} disabled={qty <= 1} className="text-white/60 hover:text-white disabled:opacity-30">-</button>
                          <span>{qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/60 hover:text-white">+</button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">{item.price}</span>
                          <button onClick={() => removeCartItem(item.id)} className="text-white/40 hover:text-red-500"><Trash2 size={16}/></button>
                        </div>
                      </div>
                      <div className="text-[#4ade80] text-[10px] font-bold text-right mt-1">Cashback: €{(singlePrice * qty * 0.14).toFixed(2)}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Sub-total</span>
              <span className="font-bold text-white">€{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70 mb-4">
              <span className="flex items-center gap-1">Service fee <Info size={12}/></span>
              <span className="flex items-center gap-1 font-bold text-white">-- <Info size={12}/></span>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-4 mb-4">
              <span className="font-bold text-lg">Total:</span>
              <div className="text-right">
                <div className="text-2xl font-extrabold">€{cartSubtotal.toFixed(2)}</div>
                <div className="text-xs text-[#4ade80] font-bold">Cashback: €{cartCashback.toFixed(2)}</div>
              </div>
            </div>

            <div className="text-[11px] text-white/60 mb-4">
              Payment collected on behalf of FlashDeals
            </div>

            <button 
              onClick={handleContinue}
              disabled={loading}
              className="w-full bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-base md:text-[15px] py-3 rounded-[2px] mb-4 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Continue"}
            </button>

            <p className="text-[10px] text-white/50 leading-relaxed mb-6 text-center lg:text-left">
              By clicking "Continue" I acknowledge I have read and accepted the <a href="#" className="text-[#FFCC00] hover:underline">Terms and Conditions</a> including the Privacy Notice and Cookies.
            </p>

          </div>

        </div>
      </div>
    </div>
  )
}