import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, Wallet, ShoppingBag, Gamepad2, Headphones, Settings, ChevronDown, Bot, X, Copy, Menu } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function OrderHistory() {
  useDocumentTitle("Order History | Eneba");

  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  // State for Mobile Sidebar and Modal
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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
    <div className="flex min-h-screen bg-[#f3f4f8] text-gray-800 font-sans relative overflow-x-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-[260px] bg-[#2d1b69] text-white flex flex-col shrink-0 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/">
            <img src="/logo.png" alt="Eneba" className="h-8 w-auto object-contain brightness-0 invert" />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={24} />
          </button>
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
      <div className="flex-1 flex flex-col min-h-screen relative w-full overflow-hidden">
        
        {/* MOBILE TOP HEADER */}
        <header className="lg:hidden bg-[#4618ac] h-[60px] px-4 flex items-center justify-between text-white shadow-sm shrink-0 sticky top-0 z-50">
          <button onClick={() => setIsSidebarOpen(true)} className="p-1">
            <Menu size={26} />
          </button>
          <Link to="/">
            <img src="/logo.png" alt="Eneba" className="h-6 w-auto object-contain" />
          </Link>
          <button onClick={logout} className="flex items-center justify-center h-8 w-8 rounded-full bg-[#FFCC00] text-[#202020]">
            <Bot size={18} />
          </button>
        </header>

        {/* DESKTOP TOP HEADER */}
        <header className="hidden lg:flex bg-[#4618ac] h-[72px] px-8 items-center justify-between text-white shadow-sm shrink-0">
          <div></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">{user?.email}</span>
            <button onClick={logout} className="flex items-center justify-center h-9 w-9 rounded-full bg-[#FFCC00] text-[#202020] hover:scale-105 transition-transform">
              <Bot size={20} />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 lg:p-10">
          <h1 className="text-lg lg:text-xl font-extrabold text-[#2d1b69] uppercase tracking-wide mb-6">Orders</h1>

          {/* SEARCH & FILTERS */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-8">
            <div className="relative w-full lg:w-[300px]">
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

          {/* ORDERS LIST */}
          <div className="bg-transparent lg:bg-white lg:rounded-sm lg:shadow-sm lg:overflow-hidden">
            
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden lg:block overflow-x-auto">
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

            {/* MOBILE CARD VIEW */}
            <div className="flex flex-col gap-4 lg:hidden">
              {loading ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-sm shadow-sm">Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-white rounded-sm shadow-sm">No orders found.</div>
              ) : (
                filteredOrders.map((order, idx) => (
                  <div key={idx} className="bg-white rounded-sm shadow-sm border border-gray-100 p-4">
                    {/* Grid layout for details */}
                    <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm mb-4">
                      <div className="text-gray-400 font-medium text-xs uppercase">Date</div>
                      <div className="text-gray-900 font-medium text-xs">{order.date}</div>
                      
                      <div className="text-gray-400 font-medium text-xs uppercase">Status</div>
                      <div className={`font-bold text-xs uppercase ${order.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.status}
                      </div>
                      
                      <div className="text-gray-400 font-medium text-xs uppercase">Order Title</div>
                      <div className="text-gray-900 font-bold text-xs leading-snug">
                        {order.items?.map((item: any, i: number) => (
                          <span key={i} className="block mb-1">{item.title}</span>
                        ))}
                      </div>

                      <div className="text-gray-400 font-medium text-xs uppercase">Order ID</div>
                      <div className="text-gray-900 font-medium text-xs">{order.id}</div>

                      <div className="text-gray-400 font-medium text-xs uppercase">Payment Method</div>
                      <div className="text-gray-900 font-medium text-xs">{order.paymentMethod}</div>

                      <div className="text-gray-400 font-medium text-xs uppercase">Total Amount</div>
                      <div className="text-gray-900 font-bold text-sm">€{order.total.toFixed(2)}</div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex justify-end">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#4618ac] text-sm font-bold hover:underline"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </main>

        {/* MOBILE APP BANNER & FOOTER */}
        <div className="lg:hidden mt-auto">
          {/* App Banner */}
          <div className="bg-[#e5e7f0] py-6 px-4 text-center">
            <p className="text-xs font-semibold text-gray-700 mb-3">For the best experience, download the Eneba App</p>
            <div className="flex justify-center gap-2">
              <a href="#" className="bg-black text-white px-3 py-1.5 rounded-md flex items-center gap-2 w-[130px]">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/></svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] uppercase">Get it on</span>
                  <span className="text-xs font-bold">Google Play</span>
                </div>
              </a>
              <a href="#" className="bg-black text-white px-3 py-1.5 rounded-md flex items-center gap-2 w-[130px]">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.88 8.82 6.86C10.13 6.84 11.33 7.73 12.13 7.73C12.93 7.73 14.39 6.65 15.96 6.83C16.63 6.86 18.38 7.11 19.45 8.73C19.36 8.79 17.16 10.12 17.19 13.37C17.22 17.2 19.93 18.27 19.97 18.29C19.94 18.42 19.42 20.04 18.71 19.5ZM13 3.5C13.73 2.67 14.22 1.5 14.09 0.33C13 0.37 11.69 1.06 10.92 1.89C10.24 2.62 9.73 3.81 9.89 4.96C11.11 4.96 12.27 4.26 13 3.5Z"/></svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] uppercase">Download on the</span>
                  <span className="text-xs font-bold">App Store</span>
                </div>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <footer className="bg-[#f3f4f8] border-t border-gray-200 py-8 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-3">About Eneba</h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">About us</a></li>
                  <li><a href="#" className="hover:text-gray-900">Contact us</a></li>
                  <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-3">Buy</h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li><a href="#" className="hover:text-gray-900">How to buy</a></li>
                  <li><a href="#" className="hover:text-gray-900">Collections</a></li>
                  <li><a href="#" className="hover:text-gray-900">Discounts</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-[10px] text-gray-500 text-center leading-relaxed">
              Copyright © 2026 Eneba. All Rights Reserved. JSC "Helis play", Gyneju St. 4-333, Vilnius, the Republic of Lithuania. 
              <a href="#" className="underline ml-1">Terms and Conditions</a>, 
              <a href="#" className="underline ml-1">Privacy notice</a>.
            </div>
          </footer>
        </div>

        {/* DESKTOP FOOTER */}
        <footer className="hidden lg:block bg-[#f3f4f8] border-t border-gray-200 pt-12 pb-8 px-10">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-8">
            <div className="text-xs text-gray-500">
              Copyright © 2026 Eneba. All Rights Reserved. JSC "Helis play", Gyneju St. 4-333, Vilnius, the Republic of Lithuania. 
              <a href="#" className="underline ml-1 hover:text-gray-800">Terms and Conditions</a>, 
              <a href="#" className="underline ml-1 hover:text-gray-800">Privacy notice</a>.
            </div>
          </div>
        </footer>

        {/* DETAILS MODAL (Responsive) */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white w-full max-w-[700px] rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="bg-[#f3f4f8] px-4 lg:px-6 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
                <h3 className="text-base lg:text-lg font-bold text-[#2d1b69] truncate pr-4">Order Details ({selectedOrder.id})</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-700 shrink-0"><X size={20} /></button>
              </div>

              <div className="p-4 lg:p-6 overflow-y-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
                  <div><span className="text-gray-500">Date:</span> <span className="font-bold">{selectedOrder.date}</span></div>
                  <div><span className="text-gray-500">Total:</span> <span className="font-bold">€{selectedOrder.total.toFixed(2)}</span></div>
                </div>

                <div className="flex flex-col gap-4">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-200 p-4 rounded-sm">
                      <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-sm shrink-0 hidden sm:block" />
                      <div className="flex-1 w-full">
                        <div className="font-bold text-gray-900 text-sm leading-tight mb-1">{item.title}</div>
                        <div className="text-xs text-gray-500 mb-2">Quantity: {item.quantity}</div>
                        <div className="bg-gray-100 border border-gray-300 text-gray-800 font-mono text-xs sm:text-sm px-3 py-1.5 rounded-sm flex items-center justify-between gap-2 overflow-hidden">
                          <span className="truncate">{item.key}</span>
                          <button onClick={() => handleCopy(item.key)} className="text-[#4618ac] hover:text-[#311178] shrink-0"><Copy size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f3f4f8] px-4 lg:px-6 py-4 border-t border-gray-200 flex justify-end shrink-0">
                <button onClick={() => setSelectedOrder(null)} className="bg-[#4618ac] hover:bg-[#311178] text-white font-bold text-sm px-6 py-2 rounded-sm transition-colors w-full sm:w-auto">
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}