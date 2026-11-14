import { useState } from 'react'

export interface GiftCardProps {
  image: string
  alt: string
}

export default function GiftCard({ image, alt }: GiftCardProps) {
  const [imgSrc, setImgSrc] = useState(image)

  return (
    /* Restored aspect-[3/4] to make it vertical like the old card */
    <div className="relative w-full aspect-[3/4] overflow-hidden group cursor-pointer border border-[#4ade80]/70 hover:border-[#4ade80] transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] bg-[#1b0f36]">
      <img
        src={imgSrc}
        onError={() => setImgSrc('https://placehold.co/400x533/222222/ffffff?text=Gift+Card')}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  )
}