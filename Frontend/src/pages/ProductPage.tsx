import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Globe, Key, RotateCcw, Monitor, ThumbsUp, PlayCircle } from 'lucide-react'

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

  // Dynamic Title
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
    <div className="min-h-screen bg-[#4618ac] text-white py-8 px-6">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="flex items-center gap-2 text-[13px] text-white/60 mb-6 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to="/store" className="hover:text-white transition-colors">Store</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link to={`/store?category=${encodeURIComponent(category)}`} className="hover:text-white transition-colors">{category}</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-white truncate max-w-[200px] md:max-w-xs">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
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
              <BuyBox 
                product={product} 
                offersCount={product.otherOffers ? product.otherOffers.length + (product.recommendedOffers?.length || 0) : 18} 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}