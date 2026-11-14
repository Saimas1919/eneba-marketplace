import { Link } from 'react-router-dom'
import { TrendingUp, Search, X, ChevronLeft } from 'lucide-react'

interface SearchDropdownProps {
  query: string
  setQuery: (q: string) => void
  data: { trending?: string[], suggestions?: string[], products: any[] }
  onClose: () => void
  onSelectSuggestion: (suggestion: string) => void
}

export default function SearchDropdown({ query, setQuery, data, onClose, onSelectSuggestion }: SearchDropdownProps) {
  const trending = data?.trending || []
  const suggestions = data?.suggestions || []
  const products = data?.products || []

  const hasResults = suggestions.length > 0 || products.length > 0

  return (
    <div className="w-full h-full lg:h-auto lg:max-h-[80vh] bg-[#5825cc] lg:border lg:border-white/20 shadow-2xl lg:rounded-sm overflow-hidden flex flex-col">
      
      {/* MOBILE HEADER WITH INPUT */}
      <div className="flex lg:hidden items-center gap-3 p-4 border-b border-white/10 shrink-0">
        <button onClick={onClose} className="text-white/60 hover:text-white shrink-0">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 bg-[#3a1390] border-2 border-white/60 px-3 py-1.5 rounded-sm flex items-center gap-2">
          <Search size={18} className="text-white/70 shrink-0" />
          <input
            type="text"
            placeholder="Search for games, top-ups and more"
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/70"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white shrink-0">
          <X size={24} />
        </button>
      </div>

      {/* DESKTOP CLEAR BUTTON */}
      {query && (
        <button 
          onClick={onClose} 
          className="hidden lg:block absolute right-4 top-4 text-white/60 hover:text-white z-10"
        >
          <X size={20} />
        </button>
      )}

      <div className="overflow-y-auto no-scrollbar flex-1">
        
        {/* 1. TRENDING SEARCHES */}
        {!query && trending.length > 0 && (
          <div className="p-4">
            <h3 className="text-xs font-bold text-white/50 mb-3 ml-2 uppercase tracking-wider">Trending searches</h3>
            <ul>
              {trending.map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => {
                      onSelectSuggestion(item)
                      onClose()
                    }}
                    className="w-full text-left flex items-center gap-3 px-2 py-3 text-[15px] font-bold text-white hover:bg-[#4618ac] transition-colors"
                  >
                    <TrendingUp size={18} className="text-white/70" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. SUGGESTIONS & PRODUCTS */}
        {query && (
          <div>
            {suggestions.length > 0 && (
              <div className="border-b border-white/10 pb-1 mb-1">
                {suggestions.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      onSelectSuggestion(item)
                      onClose()
                    }}
                    className="w-full text-left flex items-center gap-4 px-6 py-4 border-b border-white/10 last:border-0 text-[15px] font-bold text-white hover:bg-[#4618ac] transition-colors"
                  >
                    <Search size={20} className="text-white/70" />
                    {item}
                  </button>
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="p-2">
                {products.map((product: any) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex gap-4 p-3 hover:bg-[#4618ac] transition-colors rounded-sm group"
                  >
                    <img src={product.image} alt="" className="w-14 h-20 object-cover rounded-sm shrink-0" />
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[10px] border border-[#4ade80] text-[#4ade80] px-2 py-0.5 rounded-full w-max mb-1.5 font-bold tracking-wider">
                        Digital good
                      </span>
                      <h4 className="text-[15px] font-bold text-white leading-tight line-clamp-2">
                        {product.title}
                      </h4>
                    </div>
                    <div className="text-right flex flex-col justify-center shrink-0">
                      <span className="text-[11px] text-white/70 font-medium">From</span>
                      <span className="text-[17px] font-bold text-white">{product.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!hasResults && (
              <div className="p-10 text-center text-white/70 font-bold text-[15px]">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}