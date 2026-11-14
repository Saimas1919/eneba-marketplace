import ProductCard from '../ui/ProductCard'
import type { ProductCardProps } from '../ui/ProductCard'

export default function GamersAlsoViewed({ products }: { products?: ProductCardProps[] | null }) {
  const safeProducts = products || []
  
  if (safeProducts.length === 0) return null

  return (
    <div className="w-full mt-6 mb-12">
      <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Gamers also viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 justify-items-center">
        {safeProducts.map((game, index) => (
          <ProductCard key={index} {...game} />
        ))}
      </div>
    </div>
  )
}