'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/shared/Lightbox';
import { Calendar, Tag } from 'lucide-react';
import { cn, optimizeImageUrl } from '@/lib/utils';

interface PortfolioGridProps {
  portfolioItems: any[];
}

export default function PortfolioGrid({ portfolioItems }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const categories = [
    'All', 'Bridal', 'Reception', 'Engagement', 'Party', 
    'Haldi', 'Mehndi', 'Hair Styling', 'Saree Draping'
  ];

  // Filter items based on active category
  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  // Flatten all images from filtered items for the lightbox
  const lightboxImages = filteredItems.reduce((acc: string[], item) => {
    if (item.images && item.images.length > 0) {
      acc.push(...item.images);
    }
    return acc;
  }, []);

  // Map absolute index of clicked image back to flattened array
  const handleImageClick = (itemIndex: number, imgIndex: number) => {
    // Find the offset of the current item's images in the flattened array
    let offset = 0;
    for (let i = 0; i < itemIndex; i++) {
      offset += filteredItems[i].images?.length || 0;
    }
    setLightboxIndex(offset + imgIndex);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-12">
      {/* Category Navigation Tabs */}
      <div className="flex justify-center flex-wrap gap-2 md:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 border font-medium cursor-pointer",
              activeCategory === cat
                ? "bg-[#2C221E] text-[#FFFDD0] border-[#2C221E] shadow-sm"
                : "bg-white text-[#2C221E] border-[#EAE5DA] hover:border-[#D4AF37]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-serif italic">
          No items found in this category.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, itemIdx) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid bg-[#FDFBF7] border border-[#EAE5DA] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-6 flex flex-col"
              >
                {/* Images grid for this item */}
                <div className="relative group cursor-pointer overflow-hidden bg-gray-100">
                  {item.images && item.images.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      <img
                        src={optimizeImageUrl(item.images[0])}
                        alt={item.title}
                        onClick={() => handleImageClick(itemIdx, 0)}
                        className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 rounded-t-xl"
                      />
                      
                      {/* Thumbnail strip if multiple images */}
                      {item.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-1 p-1 bg-white/70 backdrop-blur-sm border-t border-[#EAE5DA]">
                          {item.images.slice(1, 5).map((imgUrl: string, imgIdx: number) => (
                            <img
                              key={imgIdx}
                              src={optimizeImageUrl(imgUrl)}
                              alt={`${item.title} secondary`}
                              onClick={() => handleImageClick(itemIdx, imgIdx + 1)}
                              className="w-full h-10 object-cover rounded hover:opacity-80 transition-opacity border border-gray-100"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-gray-400">
                      No Images Available
                    </div>
                  )}
                </div>

                {/* Card Content Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase font-sans tracking-widest text-[#AF8F58] font-bold">
                    <span className="flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {item.category}
                    </span>
                    <span className="flex items-center font-normal text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.eventDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#2C221E] font-semibold leading-snug">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-gray-500 text-xs font-sans leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Fullscreen Lightbox Overlay */}
      <Lightbox
        images={lightboxImages.map(img => optimizeImageUrl(img))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
