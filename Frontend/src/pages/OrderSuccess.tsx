import { useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle, Copy, Download, Home } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function OrderSuccess() {
  useDocumentTitle("Order Successful | Eneba");

  const location = useLocation()
  const order = location.state?.order

  if (!order) {
    return <Navigate to="/" replace />
  }

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    alert("Key copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-[#4618ac] text-white py-12 px-6 flex flex-col items-center">
      
      <div className="max-w-[800px] w-full">
        
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4 text-[#4ade80]">
            <CheckCircle size={64} />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Payment Successful!</h1>
          <p className="text-white/70">Thank you for your purchase. Your digital keys are ready.</p>
          <div className="mt-4 text-sm text-white/50">Order ID: {order.id} | Date: {order.date}</div>
        </div>

        {/* Keys Container */}
        <div className="bg-[#311178] rounded-sm shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Your Keys</h2>
          
          <div className="flex flex-col gap-6">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-[#4618ac] p-4 rounded-sm border border-white/5">
                <img src={item.image} alt="" className="w-20 h-28 object-cover rounded-sm shrink-0" />
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-[15px] leading-tight mb-1">{item.title}</h3>
                  <div className="text-xs text-white/60">Quantity: {item.quantity}</div>
                </div>

                <div className="w-full md:w-auto bg-[#1b0f36] border border-[#4ade80] rounded-sm p-4 text-center">
                  <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Activation Key</div>
                  <div className="text-xl font-mono font-bold text-[#4ade80] tracking-wider mb-3">{item.key}</div>
                  <button 
                    onClick={() => handleCopy(item.key)}
                    className="flex items-center justify-center gap-2 w-full bg-white text-black font-bold text-xs py-1.5 rounded-sm hover:bg-gray-200 transition-colors"
                  >
                    <Copy size={14} /> Copy Key
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders" className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm px-8 py-3 transition-colors rounded-sm text-center flex items-center justify-center gap-2">
            <Download size={18} /> View Order History
          </Link>
          <Link to="/" className="bg-[#FFCC00] hover:bg-[#ffdc4d] text-black font-bold text-sm px-8 py-3 transition-colors rounded-sm text-center flex items-center justify-center gap-2">
            <Home size={18} /> Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}