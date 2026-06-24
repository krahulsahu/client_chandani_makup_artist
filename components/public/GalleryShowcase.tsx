'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/shared/Lightbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GalleryShowcaseProps {
  portfolioItems: any[];
}

interface GalleryImageItem {
  url: string;
  title: string;
  category: string;
  itemIndex: number;
}

export default function GalleryShowcase({ portfolioItems }: GalleryShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12); // Infinite loading increment
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    'All', 'Bridal', 'Reception', 'Engagement', 'Party', 
    'Haldi', 'Mehndi', 'Hair Styling', 'Saree Draping'
  ];

  // Extract all individual images with metadata
  const allImages: GalleryImageItem[] = [];
  portfolioItems.forEach((item, itemIdx) => {
    if (item.images && item.images.length > 0) {
      item.images.forEach((imgUrl: string) => {
        allImages.push({
          url: imgUrl,
          title: item.title,
          category: item.category,
          itemIndex: itemIdx
        });
      });
    }
  });

  // Filter images by category
  const filteredImages = activeCategory === 'All'
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  // Visible subset
  const visibleImages = filteredImages.slice(0, visibleCount);

  // Simple handle to load more images
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleImageClick = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  // Flatten urls for lightbox navigation
  const lightboxUrls = filteredImages.map(img => img.url);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2 md:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(12); // reset counter on category change
            }}
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

      {/* Grid Showcase */}
      {visibleImages.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-serif italic">
          No images found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visibleImages.map((img, idx) => (
              <motion.div
                layout
                key={img.url + idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(idx)}
                className="aspect-square relative group overflow-hidden bg-gray-100 rounded-xl cursor-pointer border border-[#EAE5DA] shadow-sm"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
                
                {/* Gold luxury overlay on hover */}
                <div className="absolute inset-0 bg-[#2C221E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                    {img.category}
                  </span>
                  <p className="font-serif text-sm text-[#FFFDD0] tracking-wide mt-1 truncate">
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load More Button */}
      {filteredImages.length > visibleCount && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="border-[#C5A880] text-[#2C221E] hover:bg-[#2C221E] hover:text-[#FFFDD0] hover:border-[#2C221E] font-sans text-xs tracking-widest uppercase px-8 py-5 rounded-full transition-all duration-300"
          >
            Load More Images
          </Button>
        </div>
      )}

      {/* Lightbox view */}
      <Lightbox
        images={lightboxUrls}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
