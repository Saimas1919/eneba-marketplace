import {
  Gamepad2,
  CreditCard,
  Gift,
  Smartphone,
  Wallet,
  Disc3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const categories = [
  { name: 'Games', icon: Gamepad2 },
  { name: 'Gaming eCards', icon: CreditCard },
  { name: 'eGift Cards', icon: Gift },
  { name: 'E-money', icon: Smartphone },
  { name: 'Steam', icon: Disc3 },
  { name: 'Steam Gift Cards', icon: CreditCard },
  { name: 'PSN', icon: Gamepad2 },
  { name: 'Xbox', icon: Gamepad2 },
  { name: 'FIFA', icon: Gamepad2 },
  { name: 'Fortnite', icon: Gamepad2 },
  { name: 'Amazon', icon: Gift },
]

export default function CategoryBar() {
  return (
    <section className="w-full bg-eneba-purple text-white">
      
      {/* MAIN CONTAINER */}
      <div className="relative w-full h-[134px] flex items-center px-8 max-w-[1440px] mx-auto">

        {/* LEFT ARROW */}
        <button
          aria-label="Scroll categories left"
          className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors"
        >
          <ChevronLeft size={22} />
        </button>

        {/* SCROLLABLE LIST */}
        <div className="flex-1 flex items-center justify-center gap-8 overflow-x-auto no-scrollbar px-6">

          {categories.map((category) => {
            const Icon = category.icon

            return (
              <button
                key={category.name}
                className="group min-w-[78px] h-[90px] flex flex-col items-center justify-center gap-3 shrink-0 hover:text-[#FFCC00] transition-colors"
              >
                <Icon
                  size={30}
                  strokeWidth={1.8}
                  className="group-hover:scale-110 transition-transform"
                />

                <span className="text-xs font-bold whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            )
          })}

        </div>

        {/* RIGHT ARROW */}
        <button
          aria-label="Scroll categories right"
          className="shrink-0 text-white/50 hover:text-[#FFCC00] transition-colors"
        >
          <ChevronRight size={22} />
        </button>

      </div>
    </section>
  )
}