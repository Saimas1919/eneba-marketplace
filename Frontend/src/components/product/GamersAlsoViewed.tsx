import ProductCard from '../ui/ProductCard'
import type { ProductCardProps } from '../ui/ProductCard'

interface GamersAlsoViewedProps {
  products?: ProductCardProps[] | null
}

export default function GamersAlsoViewed({ products }: GamersAlsoViewedProps) {
  const safeProducts = products || []

  if (safeProducts.length === 0) return null

  return (
    <div className="w-full mt-8 mb-16">
      <h2 className="text-xl font-bold text-white mb-6">Gamers also viewed</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {safeProducts.map((game, index) => (
          <ProductCard key={index} {...game} />
        ))}
      </div>
    </div>
  )
}