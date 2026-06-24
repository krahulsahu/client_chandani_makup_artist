import dbConnect from '@/lib/db/mongoose';
import { getWebsiteSettings, getHomepageContent } from '@/lib/actions/settingsActions';
import { getServices } from '@/lib/actions/serviceActions';
import { getPortfolios } from '@/lib/actions/portfolioActions';
import { getReviews } from '@/lib/actions/reviewActions';
import Link from 'next/link';
import { 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Check, 
  Star, 
  Award, 
  Heart, 
  Users 
} from 'lucide-react';

export const revalidate = 1800; // Cache homepage for 30 minutes (ISR)

export default async function PublicHomePage() {
  await dbConnect();

  const [
    settings,
    homeContent,
    services,
    portfolioItems,
    reviews
  ] = await Promise.all([
    getWebsiteSettings(),
    getHomepageContent(),
    getServices(true), // active services
    getPortfolios(), // all portfolio items
    getReviews(true) // approved reviews
  ]);

  // Extract variables
  const phone = settings?.phoneNumbers?.[0] || '+91 99999 99999';
  const whatsapp = settings?.whatsappNumber || '+919999999999';
  
  const hero = homeContent?.hero || {};
  const stats = homeContent?.statistics || { happyClients: 500, bridalMakeovers: 350, yearsOfExperience: 8, reviewsCount: 240 };

  const servicesPreview = services.slice(0, 3);
  const featuredPortfolio = portfolioItems.filter((item: any) => item.isFeatured).slice(0, 4);
  
  // If no items are flagged as featured, take the latest 4
  const portfolioDisplay = featuredPortfolio.length > 0 ? featuredPortfolio : portfolioItems.slice(0, 4);

  const featuredReviews = reviews.filter((r: any) => r.isFeatured || r.rating === 5).slice(0, 3);
  const reviewsDisplay = featuredReviews.length > 0 ? featuredReviews : reviews.slice(0, 3);

  return (
    <main className="overflow-hidden bg-[#FAF6F0]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-black/40 py-20 px-6 overflow-hidden">
        {/* Background Banner */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ 
            backgroundImage: `url(${hero.bannerImage || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1600'})` 
          }}
        />
        {/* Luxury Gold/Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1613]/90 via-[#1F1613]/60 to-[#1F1613]/90 z-10" />

        <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-serif italic text-[#D4AF37] tracking-widest text-sm uppercase block font-semibold">
              {hero.subtitle || 'Premium Bridal & Celebrity Specialist'}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-[#FFFDD0] tracking-wide leading-tight">
              {hero.title || 'Unveil Your Eternal Glow'}
            </h1>
            <p className="font-sans text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
              {hero.tagline || 'Experience personalized luxury cosmetics and styling services by Chandani Kumari. Redefining elegance for your special days.'}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/contact"
                className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#1F1613] text-xs tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 font-sans font-bold flex items-center shadow-lg hover:shadow-xl"
              >
                Book Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a 
                href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 text-white border border-white/50 hover:border-white text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 font-sans font-semibold flex items-center"
              >
                <MessageCircle className="w-4.5 h-4.5 mr-2 fill-current text-[#25D366]" />
                WhatsApp
              </a>
              <a 
                href={`tel:${phone}`}
                className="bg-transparent hover:bg-white/10 text-white border border-white/50 hover:border-white text-xs tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-300 font-sans font-semibold flex items-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Studio
              </a>
            </div>
          </div>

          {/* Hero Profile Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-96 md:w-80 md:h-[450px] border-[3px] double border-[#D4AF37] p-2 bg-[#FAF6F0]/10 backdrop-blur-sm rounded-t-[100px] overflow-hidden shadow-2xl">
              <img 
                src={hero.makeupArtistPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800'} 
                alt="Makeup Artist Chandani Kumari" 
                className="w-full h-full object-cover rounded-t-[90px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="relative z-20 mt-[-50px] max-w-5xl mx-auto px-6">
        <div className="bg-[#1F1613] border border-[#2C221E] text-white rounded-2xl p-6 md:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <div className="flex justify-center"><Users className="w-5 h-5 text-[#D4AF37] mb-1" /></div>
            <p className="text-3xl font-serif text-[#FFFDD0] font-bold">{stats.happyClients}+</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Happy Clients</p>
          </div>

          <div className="space-y-1 border-l border-[#2C221E]/60">
            <div className="flex justify-center"><Heart className="w-5 h-5 text-[#D4AF37] mb-1" /></div>
            <p className="text-3xl font-serif text-[#FFFDD0] font-bold">{stats.bridalMakeovers}+</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Bridal Makeovers</p>
          </div>

          <div className="space-y-1 border-l border-[#2C221E]/60">
            <div className="flex justify-center"><Award className="w-5 h-5 text-[#D4AF37] mb-1" /></div>
            <p className="text-3xl font-serif text-[#FFFDD0] font-bold">{stats.yearsOfExperience}+</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Years of Experience</p>
          </div>

          <div className="space-y-1 border-l border-[#2C221E]/60">
            <div className="flex justify-center"><Star className="w-5 h-5 text-[#D4AF37] mb-1" /></div>
            <p className="text-3xl font-serif text-[#FFFDD0] font-bold">{stats.reviewsCount}+</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Verified Reviews</p>
          </div>

        </div>
      </section>

      {/* 3. Services Preview */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block">Our Highlights</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
            {homeContent?.servicesPreviewTitle || 'Signature Makeover Services'}
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
        </div>

        {servicesPreview.length === 0 ? (
          <p className="text-center text-gray-500 italic font-serif">No services listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesPreview.map((service: any) => (
              <div 
                key={service._id} 
                className="bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#FAF6F0]">
                    <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#AF8F58]">
                      {service.category}
                    </span>
                    <span className="text-xs text-gray-400 font-sans flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#AF8F58]" />
                      {service.duration} mins
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-[#2C221E] font-semibold tracking-wide">
                    {service.name}
                  </h3>
                  <p className="font-sans text-[#D4AF37] font-semibold text-base">
                    ₹{service.priceRange.min.toLocaleString()} - ₹{service.priceRange.max.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed truncate-2-lines">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FAF6F0]">
                  <Link 
                    href="/services" 
                    className="text-xs font-semibold font-sans uppercase tracking-widest text-[#2C221E] hover:text-[#D4AF37] flex items-center"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Link 
            href="/services"
            className="border border-[#C5A880] hover:bg-[#2C221E] hover:text-[#FFFDD0] hover:border-[#2C221E] text-[#2C221E] text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full transition-colors duration-300 font-sans"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* 4. Featured Portfolio */}
      <section className="py-20 bg-[#FDFBF7] border-y border-[#EAE5DA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block">Recent Makeovers</span>
              <h2 className="font-serif text-3xl text-[#2C221E] tracking-wide">
                {homeContent?.portfolioPreviewTitle || 'Bridal & Event Portfolios'}
              </h2>
            </div>
            <Link 
              href="/portfolio"
              className="text-xs font-semibold font-sans uppercase tracking-widest text-[#AF8F58] hover:text-[#2C221E] flex items-center"
            >
              Browse Gallery <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {portfolioDisplay.length === 0 ? (
            <p className="text-center text-gray-500 italic font-serif py-10">No portfolios listed yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolioDisplay.map((item: any) => (
                <Link 
                  key={item._id}
                  href="/portfolio"
                  className="group relative bg-[#FAF6F0] rounded-xl overflow-hidden shadow-sm border border-[#EAE5DA] aspect-[3/4] block"
                >
                  <img 
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400'} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1613] via-transparent to-transparent opacity-80 z-10" />
                  
                  <div className="absolute bottom-0 inset-x-0 p-5 z-20 space-y-1">
                    <span className="text-[8px] uppercase tracking-widest font-bold text-[#D4AF37] font-sans">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-[#FFFDD0] font-semibold text-sm tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block">Client Words</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
            Kind Testimonials
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
        </div>

        {reviewsDisplay.length === 0 ? (
          <p className="text-center text-gray-500 italic font-serif">No reviews submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsDisplay.map((review: any) => (
              <div 
                key={review._id} 
                className="bg-[#FDFBF7] border border-[#EAE5DA] p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="text-gray-600 text-xs italic font-serif leading-relaxed">
                    "{review.reviewMessage}"
                  </p>
                </div>
                
                <div className="pt-3 border-t border-[#FAF6F0] flex items-center justify-between text-[9px] uppercase font-sans tracking-widest text-[#AF8F58] font-bold">
                  <span>{review.clientName}</span>
                  <span className="font-normal text-gray-400">{review.eventType}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4 pt-4">
          <Link 
            href="/reviews"
            className="border border-[#C5A880] hover:bg-[#2C221E] hover:text-[#FFFDD0] hover:border-[#2C221E] text-[#2C221E] text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full transition-colors duration-300 font-sans"
          >
            Read All Reviews
          </Link>
          <Link 
            href="/review"
            className="bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full transition-colors duration-300 font-sans"
          >
            Leave A Review
          </Link>
        </div>
      </section>

      {/* 6. Contact CTA Section */}
      <section className="bg-[#1F1613] text-[#FAF6F0] py-16 px-6 border-t border-[#2C221E] text-center relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/10 opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-[#FFFDD0]">
            Let's Customize Your Bridal Glow
          </h2>
          <p className="font-sans text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Reserve your wedding dates or schedule a makeup master trial. Click below to submit your details or message us instantly.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link 
              href="/contact"
              className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#1F1613] text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-colors duration-300 font-sans"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
