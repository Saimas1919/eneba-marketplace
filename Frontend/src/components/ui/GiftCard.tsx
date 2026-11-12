import { useState } from 'react'

export interface GiftCardProps {
  image: string
  alt: string
}

export default function GiftCard({ image, alt }: GiftCardProps) {
  const [imgSrc, setImgSrc] = useState(image)

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-[#1b0f36]">
      <img
        src={imgSrc}
        onError={() => setImgSrc('https://placehold.co/400x533/222222/ffffff?text=Gift+Card')}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  )
}