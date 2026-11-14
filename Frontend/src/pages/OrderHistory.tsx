
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Wallet, ShoppingBag, Gamepad2, Headphones, Settings, ChevronDown, Bot, X, Copy } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function OrderHistory() {
  useDocumentTitle("Order History | Eneba");

  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // State for the Details Modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token') || ''
    api.getOrders(token)
      .then(data => {
        setOrders(data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    alert("Key copied to clipboard!")
  }

  return (
    <div className="flex min-h-screen bg-[#f3f4f8] text-gray-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#2d1b69] text-white flex flex-col shrink-0 min-h-screen">
        <div className="p-6">
          <Link to="/">
            <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain brightness-0 invert" />
          </Link>
        </div>

        <nav className="flex flex-col mt-4">
          <button className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-white/80">
            <div className="flex items-center gap-3"><User size={20} /> <span className="font-semibold text-sm">My account</span></div>
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-white/80">
            <div className="flex items-center gap-3"><Wallet size={20} /> <span className="font-semibold text-sm">Balance</span></div>
            <ChevronDown size={16} />
          </button>
          
          <button className="flex items-center gap-3 px-6 py-4 bg-[#1f1049] border-l-4 border-[#FFCC00] transition-colors text-white">
            <ShoppingBag size={20} /> <span className="font-semibold text-sm">Orders</span>
          </button>

          <button className="flex items-center gap-3 px-6 py-4 hover:bg-white/5 transition-colors text-white/80">
            <Gamepad2 size={20} /> <span className="font-semibold text-sm">Keys library</span>
          </button>
          <button className="flex items-center gap-3 px-6 py-4 hover:bg-white/5 transition-colors text-white/80">
            <Headphones size={20} /> <span className="font-semibold text-sm">Tickets</span>
          </button>
          <button className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-white/80">
            <div className="flex items-center gap-3"><Settings size={20} /> <span className="font-semibold text-sm">Settings</span></div>
            <ChevronDown size={16} />
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        
        {/* TOP HEADER */}
        <header className="bg-[#4618ac] h-[72px] px-8 flex items-center justify-between text-white shadow-sm shrink-0">
          <div></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">{user?.email}</span>
            <button onClick={logout} className="flex items-center justify-center h-9 w-9 rounded-full bg-[#FFCC00] text-[#202020] hover:scale-105 transition-transform">
              <Bot size={20} />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-10">
          <h1 className="text-xl font-extrabold text-[#2d1b69] uppercase tracking-wide mb-8">Orders</h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-[300px]">
              <input 
                type="text" 
                placeholder="Search by order ID" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-sm text-sm outline-none focus:border-[#4618ac] transition-colors bg-white text-gray-800"
              />
            </div>
            <button onClick={() => setSearchQuery('')} className="text-[#4618ac] text-sm font-semibold hover:underline">
              Reset filters
            </button>
          </div>

          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-[#f9fafb]">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 w-1/3">Items</th>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4 text-right">Total Amount</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="text-center py-10 text-gray-500">Loading orders...</td></tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-10 text-gray-500">No orders found.</td></tr>
                  ) : (
                    filteredOrders.map((order, idx) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 text-sm text-gray-700 font-medium whitespace-nowrap">{order.date}</td>
                        <td className={`px-6 py-5 text-sm font-bold uppercase ${order.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                          {order.status}
                        </td>
                        <td className="px-6 py-5">
                          {/* List ALL items in the order */}
                          <div className="flex flex-col gap-2">
                            {order.items?.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <img src={item.image} alt="" className="w-8 h-10 object-cover rounded-sm shrink-0" />
                                <div className="text-sm font-bold text-gray-900 leading-tight line-clamp-1">{item.title}</div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600 font-medium">{order.id}</td>
                        <td className="px-6 py-5 text-sm text-gray-700">{order.paymentMethod}</td>
                        <td className="px-6 py-5 text-right text-[15px] font-bold text-gray-800">€{order.total.toFixed(2)}</td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="text-[#4618ac] text-sm font-semibold hover:underline"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* DETAILS MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
            <div className="bg-white w-full max-w-[700px] rounded-md shadow-2xl overflow-hidden flex flex-col">
              
              <div className="bg-[#f3f4f8] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#2d1b69]">Order Details ({selectedOrder.id})</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-700"><X size={24} /></button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="mb-6 flex justify-between text-sm">
                  <div><span className="text-gray-500">Date:</span> <span className="font-bold">{selectedOrder.date}</span></div>
                  <div><span className="text-gray-500">Total:</span> <span className="font-bold">€{selectedOrder.total.toFixed(2)}</span></div>
                </div>

                <div className="flex flex-col gap-4">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 border border-gray-200 p-4 rounded-sm">
                      <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-sm shrink-0" />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-sm leading-tight mb-1">{item.title}</div>
                        <div className="text-xs text-gray-500 mb-2">Quantity: {item.quantity}</div>
                        <div className="bg-gray-100 border border-gray-300 text-gray-800 font-mono text-sm px-3 py-1.5 rounded-sm flex items-center justify-between">
                          <span>{item.key}</span>
                          <button onClick={() => handleCopy(item.key)} className="text-[#4618ac] hover:text-[#311178]"><Copy size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f3f4f8] px-6 py-4 border-t border-gray-200 flex justify-end">
                <button onClick={() => setSelectedOrder(null)} className="bg-[#4618ac] hover:bg-[#311178] text-white font-bold text-sm px-6 py-2 rounded-sm transition-colors">
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="bg-[#f3f4f8] border-t border-gray-200 pt-12 pb-8 px-10">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8">
            <div className="text-xs text-gray-500">
              Copyright © 2026 Eneba. All Rights Reserved. JSC "Helis play", Gyneju St. 4-333, Vilnius, the Republic of Lithuania. 
              <a href="#" className="underline ml-1 hover:text-gray-800">Terms and Conditions</a>, 
              <a href="#" className="underline ml-1 hover:text-gray-800">Privacy notice</a>.
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}