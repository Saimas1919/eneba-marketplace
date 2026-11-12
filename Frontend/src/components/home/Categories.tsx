import { Crosshair, Compass, Car, ChessKnight, Shield, Gem, Swords } from 'lucide-react'

const categories = [
  { name: 'Action', count: 20376, icon: Swords },
  { name: 'Adventure', count: 19512, icon: Compass },
  { name: 'Simulation', count: 15588, icon: Car },
  { name: 'Strategy', count: 16829, icon: ChessKnight },
  { name: 'RPG', count: 5582, icon: Shield },
  { name: 'Indie', count: 6377, icon: Gem },
  { name: 'FPS / TPS', count: 2754, icon: Crosshair },
]

export default function Categories() {
  return (
    <section className="w-full bg-[#4618ac] py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <button
                key={index}
                className="group flex flex-col items-center justify-center bg-[#3a1390] hover:bg-[#4e1a9e] border border-white/5 hover:border-white/20 p-4 transition-all duration-200"
              >
                <span className="text-white/50 text-[11px] font-bold mb-3 group-hover:text-white/80 transition-colors">
                  {category.count}
                </span>
                <Icon size={28} className="text-white mb-3 group-hover:text-[#FFCC00] group-hover:scale-110 transition-all duration-200" />
                <span className="text-white text-[13px] font-bold">
                  {category.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="border border-white text-white font-bold text-sm px-12 py-3 hover:bg-white/10 transition-colors">
            Load more
          </button>
        </div>

      </div>
    </section>
  )
}