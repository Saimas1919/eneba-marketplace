import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Globe, Key, RotateCcw, Monitor, ThumbsUp, PlayCircle, Heart, Star, Info } from 'lucide-react'

import BuyBox from '../components/product/BuyBox'
import Offers from '../components/product/Offers'
import GamersAlsoViewed from '../components/product/GamersAlsoViewed'
import Reviews from '../components/product/Reviews'
import ProductDetails from '../components/product/ProductDetails'
import { api } from '../lib/api'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState('')

  useDocumentTitle(product ? `${product.title} | Eneba` : 'Loading... | Eneba');

  useEffect(() => {
    if (id) {
      setLoading(true)
      api.getProduct(id)
        .then(data => {
          setProduct(data)
          setActiveImage(data.images?.[0] || data.image)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [id])

  if (loading) return <div className="min-h-screen bg-[#4618ac] text-white flex items-center justify-center text-xl">Loading...</div>
  if (!product) return <div className="min-h-screen bg-[#4618ac] text-white flex items-center justify-center text-xl">Product not found</div>

  const category = product.category || "Games"
  const platform = product.platform || "Other"

  return (
    <div className="min-h-screen bg-[#4618ac] text-white py-0 lg:py-8 px-0 lg:px-6">
      <div className="max-w-[1440px] mx-auto">
        
        {/* DESKTOP BREADCRUMBS */}
        <div className="hidden lg:flex items-center gap-2 text-[13px] text-white/60 mb-6 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to="/store" className="hover:text-white transition-colors">Store</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to={`/store?category=${encodeURIComponent(category)}`} className="hover:text-white transition-colors">{category}</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-white truncate max-w-[200px] md:max-w-xs">{product.title}</span>
        </div>

        {/* ==================== MOBILE LAYOUT ==================== */}
        <div className="flex flex-col lg:hidden w-full">
          {/* 1. Trustpilot Bar */}
          <div className="flex items-center justify-center gap-2 py-3 bg-[#3a1390] text-white">
            <span className="text-sm font-medium underline decoration-dotted decoration-white/50 underline-offset-4">Excellent</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-5 h-5 flex items-center justify-center ${i === 5 ? 'bg-[#4ade80]/40' : 'bg-[#4ade80]'}`}>
                  <Star size={12} className="text-white fill-white" />
                </div>
              ))}
            </div>
            <span className="text-sm font-medium flex items-center gap-1">
              <Star size={12} className="text-[#4ade80] fill-[#4ade80]" /> Trustpilot
            </span>
          </div>

          {/* 2. Top Title Section (Image Left, Title Right) */}
          <div className="flex items-start gap-4 p-4 border-b border-white/10 relative">
            <div className="w-[100px] h-[133px] shrink-0 bg-[#1b0f36] border border-white/10">
              <img src={activeImage} alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pt-1 pr-8">
              <span className="bg-transparent border border-[#4ade80] text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max mb-2">
                <ThumbsUp size={10} /> Cashback deal
              </span>
              <h1 className="text-[17px] font-bold tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>
            <button className="absolute top-4 right-4 text-white hover:text-[#FFCC00]">
              <Heart size={20} />
            </button>
          </div>

          {/* 3. Buy Box (Featured Offer) */}
          <div className="p-4 border-b border-white/10 bg-[#5825cc]/30">
             <BuyBox product={product} offersCount={17} />
          </div>

          {/* 4. Newsletter Box */}
          <div className="p-4 border-b border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="border border-[#4ade80] text-[#4ade80] p-1 rounded-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <span className="font-bold text-[15px]">Looking for good deals?</span>
            </div>
            <p className="text-[13px] text-white/80">Get them delivered to your inbox</p>
            <button className="bg-[#FFCC00] text-black font-bold text-sm px-6 py-2 rounded-sm w-max mt-1">
              Subscribe
            </button>
          </div>

          {/* 5. Features List */}
          <div className="p-4 flex flex-col gap-5 border-b border-white/10">
            <div className="flex gap-3">
              <Globe className="text-[#4ade80] shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-[15px] mb-0.5">Global</h3>
                <p className="text-[12px] text-white/60">Can be activated in Lithuania</p>
                <p className="text-[12px] underline text-white/80 mt-1">Check region restrictions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <PlayCircle className="text-[#4ade80] shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-[15px] mb-0.5">{platform}</h3>
                <p className="text-[12px] text-white/60">Activate/redeem on {platform}</p>
                <p className="text-[12px] underline text-white/80 mt-1">Check activation guide</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Key className="text-[#4ade80] shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-[15px] mb-0.5">Digital key</h3>
                <p className="text-[12px] text-white/60">This is a digital edition of the product (CD-KEY)</p>
                <p className="text-[12px] text-[#4ade80] mt-1">Instant delivery</p>
              </div>
            </div>
            <div className="flex gap-3">
              <RotateCcw className="text-[#4ade80] shrink-0 mt-0.5" size={22} />
              <div>
                <h3 className="font-bold text-[15px] mb-0.5">Instant refunds</h3>
                <p className="text-[12px] text-white/60 leading-snug">Unlike other marketplaces, Eneba allows you to get an instant refund for unviewed keys.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white/60 mt-2">
              Works on: <Monitor size={14} /> <span className="text-white underline">Check requirements</span>
            </div>
          </div>

          {/* 6. Trailer/Gallery Grid */}
          <div className="grid grid-cols-2 gap-2 p-4">
             <div className="aspect-video bg-[#1b0f36] border border-white/10 overflow-hidden relative">
                <img src={activeImage} alt="Trailer" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                     <PlayCircle size={20} className="text-white" />
                  </div>
                </div>
             </div>
             <div className="aspect-video bg-[#1b0f36] border border-white/10 overflow-hidden relative">
                <img src={product.images?.[1] || activeImage} alt="Screenshot" className="w-full h-full object-cover" />
             </div>
          </div>

          {/* 7. Important Notice Box */}
          <div className="mx-4 mb-6 border border-[#FFCC00] p-3 flex gap-3 bg-[#FFCC00]/5">
             <div className="text-[#FFCC00] mt-0.5"><Info size={18} /></div>
             <div>
               <h4 className="font-bold text-[#FFCC00] text-sm mb-1">Important Notice:</h4>
               <p className="text-xs text-white/80 leading-relaxed">Includes Grand Theft Auto V and Criminal Enterprise Starter Pack. Activate the code using the Rockstar Games Launcher.</p>
             </div>
          </div>

          {/* 8. Main Content Sections Below */}
          <div className="px-4 flex flex-col gap-8">
            {product.recommendedOffers && product.recommendedOffers.length > 0 && (
              <Offers title="Recommended offers" titleColor="text-white" offers={product.recommendedOffers} />
            )}
            {product.otherOffers && product.otherOffers.length > 0 && (
              <Offers 
                title={`${product.otherOffers.length} other offers`} 
                titleColor="text-white"
                offers={product.otherOffers} 
                showLoadMore={product.otherOffers.length > 3}
                loadMoreText="Load more offers"
                useRotateIcon={true}
              />
            )}
            {product.gamersAlsoViewed && product.gamersAlsoViewed.length > 0 && (
              <GamersAlsoViewed products={product.gamersAlsoViewed} />
            )}
            {product.reviews && product.reviews.length > 0 && (
              <Reviews reviews={product.reviews} overallRatings={product.overallRatings} />
            )}
            <ProductDetails 
              tags={product.tags} 
              description={product.description} 
              systemRequirements={product.systemRequirements}
              otherDetails={product.otherDetails}
            />
          </div>
        </div>

        {/* ==================== DESKTOP LAYOUT ==================== */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
              <div className="flex flex-col gap-4">
                <div className="w-full aspect-[3/4] bg-[#1b0f36] border border-white/10 overflow-hidden relative">
                  <img src={activeImage} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {(product.images || [product.image]).map((img: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 shrink-0 border-2 transition-colors ${activeImage === img ? 'border-[#FFCC00]' : 'border-transparent hover:border-white/40'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-transparent border border-[#4ade80] text-[#4ade80] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp size={12} /> Cashback deal
                  </span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-8 leading-tight">
                  {product.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex gap-3">
                    <Globe className="text-[#4ade80] shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-sm mb-1">{product.region}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">Can be activated in your region<br/><span className="underline cursor-pointer">Check region restrictions</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <PlayCircle className="text-[#4ade80] shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-sm mb-1">{platform}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">Activate/redeem on <span className="underline cursor-pointer">{platform}</span><br/><span className="underline cursor-pointer">Check activation guide</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Key className="text-[#4ade80] shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-sm mb-1">Digital key</h3>
                      <p className="text-xs text-white/60 leading-relaxed">This is a digital edition of the product (CD-KEY)<br/><span className="text-[#4ade80]">Instant delivery</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <RotateCcw className="text-[#4ade80] shrink-0" size={24} />
                    <div>
                      <h3 className="font-bold text-sm mb-1">Instant refunds</h3>
                      <p className="text-xs text-white/60 leading-relaxed">Unlike other marketplaces, Eneba allows you to get an instant refund for unviewed keys.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-white/60 mt-auto">
                  Works on: <Monitor size={16} /> <span className="font-semibold text-white">Windows, Mac</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              {product.recommendedOffers && product.recommendedOffers.length > 0 && (
                <Offers title="Recommended offers" offers={product.recommendedOffers} />
              )}
              {product.otherOffers && product.otherOffers.length > 0 && (
                <Offers 
                  title={`${product.otherOffers.length} other offers`} 
                  titleColor="text-[#4ade80]"
                  offers={product.otherOffers} 
                  showLoadMore={product.otherOffers.length > 3}
                  loadMoreText="Load more offers"
                  useRotateIcon={true}
                />
              )}
            </div>

            {product.gamersAlsoViewed && product.gamersAlsoViewed.length > 0 && (
              <GamersAlsoViewed products={product.gamersAlsoViewed} />
            )}
            
            {product.reviews && product.reviews.length > 0 && (
              <Reviews reviews={product.reviews} overallRatings={product.overallRatings} />
            )}
            
            <ProductDetails 
              tags={product.tags} 
              description={product.description} 
              systemRequirements={product.systemRequirements}
              otherDetails={product.otherDetails}
            />
          </div>

          <div className="w-full lg:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-[116px]">
              <BuyBox product={product} offersCount={17} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}