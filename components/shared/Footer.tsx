import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-[#1F1613] text-[#FAF6F0] border-t border-[#2C221E] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl tracking-widest text-[#D4AF37] uppercase leading-none">
            Chandani Kumari
          </h3>
          <p className="font-serif italic text-[#C5A880] text-xs tracking-wider">
            Luxury Makeup Artist & Hair Styling
          </p>
          <p className="text-gray-400 text-sm max-w-sm mt-3">
            Redefining elegance and celebrating natural beauty. Specializing in premium bridal cosmetics, engagement styling, and high-fashion makeovers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-bold">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Chandani</Link></li>
            <li><Link href="/services" className="hover:text-[#D4AF37] transition-colors">Makeup Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-[#D4AF37] transition-colors">Bridal Portfolio</Link></li>
            <li><Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">Photo Gallery</Link></li>
            <li><Link href="/reviews" className="hover:text-[#D4AF37] transition-colors">Client Reviews</Link></li>
          </ul>
        </div>

        {/* Studio Info */}
        <div className="space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-[#D4AF37] uppercase font-bold">
            Contact Info
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <MapPin className="w-4.5 h-4.5 text-[#D4AF37] mr-3 mt-0.5 shrink-0" />
              <span>{settings?.address || 'Bengaluru - 560097, Karnataka, India'}</span>
            </li>
            <li className="flex items-start flex-col space-y-1">
              <div className="flex items-center">
                <Phone className="w-4.5 h-4.5 text-[#D4AF37] mr-3 shrink-0" />
                <a href={`tel:${settings?.phoneNumbers?.[0] || '+919155331272'}`} className="hover:text-[#D4AF37] transition-colors">
                  {settings?.phoneNumbers?.[0] || '+91 91553 31272'}
                </a>
              </div>
              {settings?.phoneNumbers?.[1] && (
                <div className="flex items-center pl-7.5">
                  <a href={`tel:${settings.phoneNumbers[1]}`} className="hover:text-[#D4AF37] transition-colors text-xs text-gray-400">
                    {settings.phoneNumbers[1]}
                  </a>
                </div>
              )}
            </li>
            <li className="flex items-center">
              <Mail className="w-4.5 h-4.5 text-[#D4AF37] mr-3 shrink-0" />
              <a href={`mailto:${settings?.email || 'chandkreh@gmail.com'}`} className="hover:text-[#D4AF37] transition-colors">
                {settings?.email || 'chandkreh@gmail.com'}
              </a>
            </li>
          </ul>
          
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://facebook.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-[#2C221E] py-6 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Chandani Kumari Makeup Artist. All Rights Reserved.</p>
        <p className="mt-1 font-serif italic text-gray-600">Created with luxury standards</p>
      </div>
    </footer>
  );
}
