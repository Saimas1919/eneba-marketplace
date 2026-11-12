import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Languages } from 'lucide-react'

interface Review {
  rating: number
  user: string
  avatar: string
  date: string
  text: string
  isTranslated: boolean
  upvotes: number
  downvotes: number
}

interface ReviewsProps {
  reviews?: Review[] | null
  overallRatings?: Record<string, number> | null
}

const renderStars = (rating: number, size = 14) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={size} className={star <= rating ? 'fill-[#FFCC00] text-[#FFCC00]' : 'fill-transparent text-white/20'} />
    ))}
  </div>
)

export default function Reviews({ reviews, overallRatings }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false)
  const limit = 3

  const safeReviews = reviews || []
  const safeRatings = overallRatings || {}

  if (safeReviews.length === 0) return null

  const displayedReviews = showAll ? safeReviews : safeReviews.slice(0, limit)
  const hasMore = safeReviews.length > limit

  return (
    <div className="w-full mt-8 mb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Reviews: {safeReviews.length}</h2>
          
          <div className="flex flex-wrap gap-6">
            {Object.entries(safeRatings).map(([key, val]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-[13px] text-white/70 font-medium capitalize">{key}</span>
                {renderStars(val)}
              </div>
            ))}
          </div>
        </div>

        <button className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm px-6 py-2 transition-colors rounded-sm whitespace-nowrap">
          Review now
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        {displayedReviews.map((review, idx) => (
          <div key={idx} className="bg-[#3a1390] p-5 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {renderStars(review.rating, 12)}
                <div className="flex items-center gap-2">
                  <img src={review.avatar} alt={review.user} className="w-6 h-6 rounded-full" />
                  <span className="font-bold text-sm">{review.user}</span>
                </div>
                <span className="text-xs text-white/50">{review.date}</span>
              </div>

              <div className="flex items-center gap-4 ml-auto md:ml-0">
                {review.isTranslated && (
                  <button className="text-white/60 hover:text-white transition-colors"><Languages size={18} /></button>
                )}
                <div className="flex items-center gap-1 cursor-pointer hover:text-white text-white/60 transition-colors">
                  <ThumbsUp size={16} /> 
                  <span className={`text-sm font-bold ${review.upvotes > 0 ? 'text-[#4ade80]' : 'text-white/60'}`}>
                    {review.upvotes > 0 ? `+${review.upvotes}` : '0'}
                  </span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-white text-white/60 transition-colors">
                  <ThumbsDown size={16} /> 
                  <span className="text-sm font-bold">{review.downvotes}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-2">
              {review.isTranslated && (
                <span className="bg-transparent border border-white/20 text-white/70 text-[10px] px-2 py-0.5 rounded-full shrink-0 mt-0.5">Auto-translated</span>
              )}
              <p className="text-sm text-white/80 leading-relaxed">
                {review.text}{' '}
                <span className="text-[#FFCC00] cursor-pointer hover:underline font-semibold">Read more</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !showAll && (
        <div className="flex justify-center mt-8">
          <button onClick={() => setShowAll(true)} className="bg-transparent border border-white hover:bg-white/10 text-white font-bold text-sm px-8 py-2.5 transition-colors rounded-sm">
            Load more reviews
          </button>
        </div>
      )}
    </div>
  )
}