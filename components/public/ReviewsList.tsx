'use client';

import { useState } from 'react';
import { Star, Calendar, MessageSquare, Tag } from 'lucide-react';
import { cn, optimizeImageUrl } from '@/lib/utils';

interface ReviewsListProps {
  reviews: any[];
}

type SortType = 'newest' | 'highest' | 'lowest';

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const [ratingFilter, setRatingFilter] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortType>('newest');

  // 1. Calculations
  const totalCount = reviews.length;
  const averageRating = totalCount > 0
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1))
    : 0;

  // Star breakdown counts
  const starBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const star = r.rating as 1 | 2 | 3 | 4 | 5;
    if (starBreakdown[star] !== undefined) {
      starBreakdown[star]++;
    }
  });

  // 2. Filter & Sort reviews
  const filteredReviews = ratingFilter === 'All'
    ? reviews
    : reviews.filter(r => r.rating === ratingFilter);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'highest') {
      return b.rating - a.rating;
    }
    if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="space-y-12">
      
      {/* Review Aggregates Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FDFBF7] border border-[#EAE5DA] p-6 md:p-8 rounded-2xl shadow-sm">
        
        {/* Metric Average Rating */}
        <div className="flex flex-col justify-center items-center text-center space-y-2 border-b md:border-b-0 md:border-r border-[#EAE5DA] pb-6 md:pb-0">
          <p className="text-sm font-sans tracking-wider uppercase font-semibold text-gray-500">
            Average Rating
          </p>
          <p className="text-5xl font-serif text-[#2C221E] font-bold">
            {averageRating}
          </p>
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={cn(
                  "w-5 h-5",
                  star <= Math.round(averageRating) ? "fill-current" : "text-gray-200"
                )} 
              />
            ))}
          </div>
          <p className="text-xs font-sans text-gray-400">
            Based on {totalCount} reviews
          </p>
        </div>

        {/* Rating Progress Bars */}
        <div className="col-span-1 md:col-span-2 space-y-2.5 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = (starBreakdown as any)[stars] || 0;
            const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
            return (
              <div key={stars} className="flex items-center text-xs text-gray-600 font-sans">
                <button 
                  onClick={() => setRatingFilter(stars)}
                  className="w-12 text-left hover:text-[#D4AF37] hover:underline font-medium shrink-0 cursor-pointer"
                >
                  {stars} Stars
                </button>
                <div className="flex-1 bg-gray-100 h-2.5 mx-3 rounded-full overflow-hidden border border-gray-200/50">
                  <div 
                    className="bg-[#D4AF37] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-gray-400">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Control Panel: Filters & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE5DA] pb-6">
        
        {/* Rating Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {['All', 5, 4, 3, 2, 1].map((val) => (
            <button
              key={val}
              onClick={() => setRatingFilter(val as any)}
              className={cn(
                "px-4 py-1.5 rounded-full font-sans text-xs tracking-wider uppercase transition-all border font-medium cursor-pointer",
                ratingFilter === val
                  ? "bg-[#2C221E] text-[#FFFDD0] border-[#2C221E]"
                  : "bg-white text-gray-600 border-[#EAE5DA] hover:border-[#D4AF37]"
              )}
            >
              {val === 'All' ? 'All Reviews' : `${val} ★`}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2 shrink-0">
          <label htmlFor="sortReviews" className="text-xs text-gray-500 font-sans">Sort By:</label>
          <select
            id="sortReviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="h-9 rounded-md border border-[#EAE5DA] bg-white px-3 py-1 text-xs focus-visible:ring-1 focus-visible:ring-[#D4AF37] outline-none font-sans"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

      </div>

      {/* Reviews Display Grid */}
      {sortedReviews.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-serif italic">
          No reviews matched the current filter conditions.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedReviews.map((review) => (
            <div 
              key={review._id} 
              className="bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Client Metadata & Stars */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {review.clientPhoto ? (
                      <img 
                        src={optimizeImageUrl(review.clientPhoto)} 
                        alt={review.clientName} 
                        className="w-10 h-10 object-cover rounded-full border border-[#C5A880]" 
                      />
                    ) : (
                      <div className="w-10 h-10 bg-[#FAF6F0] rounded-full border border-[#EAE5DA] flex items-center justify-center font-serif text-[#AF8F58] font-bold">
                        {review.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-sans font-semibold text-[#2C221E] text-sm">
                        {review.clientName}
                      </h4>
                      <p className="text-[10px] text-gray-400 flex items-center font-sans">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="flex text-amber-400">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>

                {/* Review Copy */}
                <p className="text-gray-600 text-xs italic font-serif leading-relaxed">
                  "{review.reviewMessage}"
                </p>
              </div>

              {/* Event Type Meta */}
              <div className="mt-4 pt-3 border-t border-[#FAF6F0] flex items-center justify-between text-[9px] uppercase font-sans tracking-widest text-[#AF8F58] font-bold">
                <span className="flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {review.eventType}
                </span>
                {review.isFeatured && (
                  <span className="text-[9px] font-semibold text-[#D4AF37] tracking-widest">
                    ★ Featured
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
