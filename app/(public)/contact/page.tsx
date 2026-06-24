import ContactForm from '@/components/public/ContactForm';
import { getWebsiteSettings } from '@/lib/actions/settingsActions';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export const revalidate = 3600; // Cache page for 1 hour (ISR)

export default async function PublicContactPage() {
  const settings = await getWebsiteSettings();
  const phone = settings?.phoneNumbers?.[0] || '+91 99999 99999';
  const email = settings?.email || 'info@chandanikumari.com';
  const address = settings?.address || 'Patna, Bihar, India';
  const whatsapp = settings?.whatsappNumber || '+919999999999';

  return (
    <main className="pb-24">
      {/* Header Accent */}
      <section className="relative bg-[#FAF6F0] py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase">
            Let's Connect
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide">
            Book Your Makeover Session
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            Ready to unveil your eternal glow? Send us an inquiry or reach out directly via call or WhatsApp. We look forward to styling you.
          </p>
        </div>
      </section>

      {/* Main split grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Contact details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Contact Card */}
          <div className="bg-[#FDFBF7] border border-[#EAE5DA] p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-[#2C221E] font-semibold tracking-wide">
              Direct Contact
            </h3>
            
            <div className="space-y-4 font-sans text-sm text-gray-600">
              {/* Phone */}
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-[#D4AF37] mr-4 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">Call Us</p>
                  <a href={`tel:${phone}`} className="hover:text-[#D4AF37] hover:underline font-semibold text-[#2C221E] mt-0.5 inline-block">
                    {phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start">
                <MessageCircle className="w-5 h-5 text-[#D4AF37] mr-4 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">WhatsApp Message</p>
                  <a 
                    href={`https://wa.me/${whatsapp.replace(/\+/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#D4AF37] hover:underline font-semibold text-[#2C221E] mt-0.5 inline-block"
                  >
                    Chat directly on WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-[#D4AF37] mr-4 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">Email Us</p>
                  <a href={`mailto:${email}`} className="hover:text-[#D4AF37] hover:underline font-semibold text-[#2C221E] mt-0.5 inline-block">
                    {email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-[#D4AF37] mr-4 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">Studio Address</p>
                  <p className="mt-0.5 font-medium text-[#2C221E]">{address}</p>
                </div>
              </div>

              {/* Working hours */}
              <div className="flex items-start pt-2 border-t border-[#FAF6F0]">
                <Clock className="w-5 h-5 text-[#D4AF37] mr-4 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase font-semibold text-[#2C221E] tracking-wider">Studio Timing</p>
                  <p className="mt-0.5">Mon - Sun: 09:00 AM - 07:00 PM</p>
                  <p className="text-[10px] text-[#AF8F58] mt-0.5">Prior appointments only.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Frame Embed */}
          <div className="bg-[#FDFBF7] border border-[#EAE5DA] p-2 rounded-2xl shadow-sm h-64 overflow-hidden">
            <iframe 
              title="Studio Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115136.19794508493!2d85.07300188981615!3d25.608175571167733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d43df%3A0x8311a062447b6851!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1719273600000!5m2!1sen!2sin" 
              className="w-full h-full rounded-xl border-0"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </section>
    </main>
  );
}
