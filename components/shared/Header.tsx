'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans border-b",
      scrolled 
        ? "bg-[#FAF6F0]/90 backdrop-blur-md py-4 border-[#EAE5DA]" 
        : "bg-transparent py-6 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Name */}
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-xl md:text-2xl tracking-widest text-[#2C221E] uppercase font-bold leading-none">
            Chandani Kumari
          </span>
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-[9px] uppercase mt-1">
            Luxury Makeup & Hair Specialist
          </span>
        </Link>

        {/* Desktop Nav links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm tracking-widest uppercase hover:text-[#D4AF37] transition-colors duration-300",
                  isActive ? "text-[#D4AF37] font-semibold" : "text-[#2C221E]/80"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link 
            href="/contact"
            className="flex items-center bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-colors duration-300 font-medium"
          >
            Book Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#2C221E] focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile drawer panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bg-[#FAF6F0] border-b border-[#EAE5DA] p-6 shadow-xl animate-fade-in flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm tracking-widest uppercase font-semibold py-2 transition-colors",
                  isActive ? "text-[#D4AF37]" : "text-[#2C221E]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#EAE5DA] flex flex-col gap-3">
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] text-xs tracking-widest uppercase py-3 rounded-full transition-colors font-medium"
            >
              Book Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
