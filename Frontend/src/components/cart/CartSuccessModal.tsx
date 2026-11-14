import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function CartSuccessModal() {
  const { toastItem, setToastItem } = useAuth()
  const navigate = useNavigate()

  if (!toastItem) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 animate-fade-in">
      <div className="bg-[#4618ac] w-full max-w-[700px] rounded-sm shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-white">Item was successfully added to cart</h2>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img src={toastItem.image} alt="" className="w-20 h-28 object-cover rounded-sm" />
            <div>
              <span className="bg-transparent border border-[#4ade80] text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-2">Digital</span>
              <h3 className="text-[#FFCC00] font-bold text-lg leading-tight mb-1">{toastItem.title}</h3>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white shrink-0 mt-4 md:mt-0">{toastItem.price}</div>
        </div>
        
        {/* Updated Buttons */}
        <div className="p-6 flex flex-col md:flex-row gap-4">
          <button 
            onClick={() => setToastItem(null)} 
            className="flex-1 bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-lg py-3 transition-colors rounded-sm"
          >
            Continue shopping
          </button>
          <button 
            onClick={() => { setToastItem(null); navigate('/cart') }} 
            className="flex-1 bg-transparent border border-white hover:bg-white/10 text-white font-bold text-lg py-3 transition-colors rounded-sm"
          >
            View cart
          </button>
        </div>

      </div>
    </div>
  )
}