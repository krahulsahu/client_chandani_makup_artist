import { getServices } from '@/lib/actions/serviceActions';
import { Sparkles, Clock, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600; // Cache page for 1 hour (ISR)

export default async function PublicServicesPage() {
  const services = await getServices(true); // Fetch only active services

  return (
    <main className="pb-24">
      {/* Page Header */}
      <section className="relative bg-[#FAF6F0] py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase">
            Signature Services
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide">
            Luxurious Styling Packages
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            Explore our curated menu of luxury makeup services, bridal makeovers, hairstyling, and draping techniques customized to amplify your radiance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        {services.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-serif italic">
            Services catalog is currently being updated. Please contact us directly for inquiries.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <div 
                key={service._id} 
                className="bg-[#FDFBF7] border border-[#EAE5DA] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Tag */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#FAF6F0]">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#AF8F58] bg-[#F5F2EB] px-3 py-1 rounded-full font-bold border border-[#EAE5DA]/50">
                      {service.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center font-sans">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#AF8F58]" />
                      {service.duration} Mins
                    </span>
                  </div>

                  {/* Name and Price */}
                  <h3 className="font-serif text-xl text-[#2C221E] mt-4 tracking-wide font-semibold">
                    {service.name}
                  </h3>
                  <p className="font-sans text-[#D4AF37] font-semibold mt-2 text-lg">
                    ₹{service.priceRange.min.toLocaleString()} - ₹{service.priceRange.max.toLocaleString()}
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 text-xs mt-3 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  {/* Included Features Checklist */}
                  {service.includedFeatures && service.includedFeatures.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[#FAF6F0] space-y-2">
                      <p className="text-[11px] text-[#2C221E] tracking-wider uppercase font-semibold">
                        What's Included
                      </p>
                      <ul className="space-y-1.5 pt-1">
                        {service.includedFeatures.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start text-xs text-gray-600 font-sans">
                            <Check className="w-4 h-4 text-[#D4AF37] mr-2.5 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Book Now trigger */}
                <div className="mt-8">
                  <Link 
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="w-full py-2.5 text-center border border-[#C5A880] text-[#2C221E] hover:bg-[#2C221E] hover:text-[#FFFDD0] hover:border-[#2C221E] rounded-full transition-colors duration-300 font-sans text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5"
                  >
                    Inquire Package <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
