'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Active Image with Framer Motion animation */}
        <div className="relative max-w-5xl max-h-[85vh] w-full px-12 flex justify-center items-center">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Showcase ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl select-none"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Counter Indicator */}
        <div className="absolute bottom-6 text-white/60 font-sans text-sm tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </AnimatePresence>
  );
}
