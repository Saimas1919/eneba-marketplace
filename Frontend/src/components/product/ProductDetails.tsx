import { useState } from 'react'
import { Star } from 'lucide-react'

interface SystemReq { label: string; value: string; }
interface OtherDetail { label: string; value: string; }

interface ProductDetailsProps {
  tags?: string[] | null
  description?: string | null
  systemRequirements?: Record<string, SystemReq[]> | null
  otherDetails?: OtherDetail[] | null
}

export default function ProductDetails({ 
  tags, 
  description, 
  systemRequirements,
  otherDetails
}: ProductDetailsProps) {
  const safeTags = tags || []
  const safeDesc = description || "No description yet"
  const safeSysReqs = systemRequirements || {}
  const safeOtherDetails = otherDetails || []

  const osKeys = Object.keys(safeSysReqs)
  const [activeOs, setActiveOs] = useState(osKeys[0] || 'windows')
  const [descTab, setDescTab] = useState<'description' | 'activation'>('description')

  return (
    <div className="w-full flex flex-col gap-8 mt-4 mb-12">
      
      {/* 1. PRODUCT DETAILS SECTION */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4">Product Details</h2>
        
        <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
          {safeTags.map(tag => (
            <span key={tag} className="bg-[#3a1390] text-white/90 text-xs lg:text-[13px] font-semibold px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="bg-[#3a1390] rounded-sm overflow-hidden">
          <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
            <button onClick={() => setDescTab('description')} className={`px-4 lg:px-6 py-3 text-[13px] font-bold whitespace-nowrap transition-colors ${descTab === 'description' ? 'bg-[#2d0e75] text-white' : 'text-white/50 hover:text-white'}`}>Description</button>
            <button onClick={() => setDescTab('activation')} className={`px-4 lg:px-6 py-3 text-[13px] font-bold whitespace-nowrap transition-colors ${descTab === 'activation' ? 'bg-[#2d0e75] text-white' : 'text-white/50 hover:text-white'}`}>Activation guide</button>
          </div>

          <div className="p-4 lg:p-6 min-h-[150px]">
            {descTab === 'description' ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={14} className="fill-[#FFCC00] text-[#FFCC00] lg:w-4 lg:h-4" />)}
                    <Star size={14} className="fill-transparent text-white/20 lg:w-4 lg:h-4" />
                  </div>
                  <span className="text-[#FFCC00] font-bold text-sm">4.70</span>
                  <span className="text-white/60 text-xs lg:text-sm">/ 5 from 94 ratings</span>
                </div>
                <p className="text-white/80 text-xs lg:text-sm leading-relaxed">{safeDesc}</p>
              </div>
            ) : (
              <div className="text-white/80 text-xs lg:text-sm space-y-2 leading-relaxed">
                <p>1. Download and install the client.</p>
                <p>2. Create a new account or log in to an existing one.</p>
                <p>3. Go to the "Games" tab and select "Activate a Product".</p>
                <p>4. Enter the key you received from Eneba and follow the prompts.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. SYSTEM REQUIREMENTS SECTION */}
      {osKeys.length > 0 && (
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4">System requirements</h2>
          
          <div className="bg-[#3a1390] rounded-sm overflow-hidden">
            <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar">
              {osKeys.map(os => (
                <button 
                  key={os}
                  onClick={() => setActiveOs(os)}
                  className={`px-4 lg:px-6 py-3 text-[13px] font-bold whitespace-nowrap transition-colors uppercase ${activeOs === os ? 'bg-[#2d0e75] text-white' : 'text-white/50 hover:text-white'}`}
                >
                  {os}
                </button>
              ))}
            </div>

            <div className="p-4 lg:p-6">
              <h3 className="font-bold text-[15px] text-white mb-4">Minimum system requirements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-3 text-xs lg:text-sm text-white/80">
                {safeSysReqs[activeOs]?.map((req, i) => (
                  <div key={i} className="contents">
                    <div className="text-white/50">{req.label}</div>
                    <div>{req.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. OTHER DETAILS SECTION */}
      {safeOtherDetails.length > 0 && (
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4">Other details</h2>
          
          <div className="bg-[#3a1390] p-4 lg:p-6 rounded-sm relative">
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-y-4 text-xs lg:text-sm text-white/80">
              {safeOtherDetails.map((detail, i) => (
                <div key={i} className="contents">
                  <div className="text-white/50">{detail.label}</div>
                  <div>
                    {detail.value.split(', ').map((val, j) => (
                      <div key={j} className={j > 0 ? 'mt-1' : ''}>{val}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6">
              <div className="bg-[#FFCC00] text-black font-extrabold text-lg lg:text-xl px-2 py-1 rounded-sm">12</div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}