import { getAboutContent, getWebsiteSettings } from '@/lib/actions/settingsActions';
import { Award, GraduationCap, Clock, Sparkles, ShieldCheck } from 'lucide-react';

export const revalidate = 3600; // Cache about page for 1 hour (ISR)

export default async function PublicAboutPage() {
  const [aboutContent, settings] = await Promise.all([
    getAboutContent(),
    getWebsiteSettings()
  ]);

  const whyChooseMe = aboutContent?.whyChooseMe || [
    { title: 'Premium Products Only', description: 'We use high-end brands like MAC, Huda Beauty, Bobbi Brown, and Charlotte Tilbury to ensure skin safety and long-lasting makeovers.' },
    { title: 'Tailored Makeovers', description: 'Every look is carefully customized to suit the client’s skin tone, face shape, wedding attire, and styling preferences.' },
    { title: 'Punctuality & Care', description: 'We prioritize our clients’ schedules, ensuring prompt and stress-free styling services on location.' }
  ];

  return (
    <main className="pb-24 bg-[#FAF6F0]">
      {/* Page Header */}
      <section className="relative py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase">
            Meet the Artist
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide">
            About Chandani Kumari
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            A peak into the journey, trainings, and philosophy of Bihar's premier bridal makeup specialist.
          </p>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Photo Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-80 h-[450px] border-[3px] double border-[#D4AF37] p-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
              alt="Chandani Kumari Portrait" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Side: Bio text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2C221E] tracking-wide">
              Crafting Elegance, Celebrating You
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
          </div>
          
          <p className="text-gray-600 text-sm font-sans leading-relaxed">
            {aboutContent?.biography || 'Chandani Kumari is a premier makeup artist and styling professional with over 8 years of glaming up hundreds of brides. She believes beauty is not about altering your appearance, but amplifying the gorgeous features you already possess.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            {/* Experience Block */}
            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DA]/60">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider font-sans text-[#2C221E]">Experience</span>
              </div>
              <p className="text-xs text-gray-500 font-sans leading-relaxed pt-1.5">
                {aboutContent?.experience || 'Over 8 years of professional beauty styling.'}
              </p>
            </div>

            {/* Training Block */}
            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DA]/60">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <GraduationCap className="w-4.5 h-4.5" />
                <span className="text-xs uppercase font-bold tracking-wider font-sans text-[#2C221E]">Training</span>
              </div>
              <p className="text-xs text-gray-500 font-sans leading-relaxed pt-1.5">
                {aboutContent?.training || 'Certified by top international beauty schools.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications and Philosophy split */}
      <section className="bg-[#FDFBF7] border-y border-[#EAE5DA] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Philosophy */}
          <div className="space-y-4 flex flex-col justify-center">
            <span className="font-serif italic text-[#AF8F58] text-xs uppercase tracking-wider">Beauty Philosophy</span>
            <h3 className="font-serif text-2xl text-[#2C221E] font-semibold leading-snug">
              "Beauty is confidence reflecting from within."
            </h3>
            <p className="text-gray-500 text-xs font-sans leading-relaxed">
              {aboutContent?.philosophy || 'Real makeup should feel like a second skin, giving you the security and grace to carry yourself confidently through your life-defining milestones.'}
            </p>
          </div>

          {/* Certifications list */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#2C221E] tracking-wider uppercase font-semibold">
              Accreditions & Certifications
            </h3>
            <ul className="space-y-3 pt-2">
              {aboutContent?.certifications && aboutContent?.certifications.length > 0 ? (
                aboutContent.certifications.map((cert: string, idx: number) => (
                  <li key={idx} className="flex items-start text-xs font-sans text-gray-600">
                    <Award className="w-4.5 h-4.5 text-[#D4AF37] mr-3 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">No certifications listed.</p>
              )}
            </ul>
          </div>

        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 space-y-12">
        <div className="text-center space-y-2">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block">Our Philosophy</span>
          <h2 className="font-serif text-3xl text-[#2C221E] tracking-wide">
            Why Clients Choose Chandani
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseMe.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-white border border-[#EAE5DA] p-6 rounded-2xl shadow-sm text-center space-y-3"
            >
              <div className="flex justify-center text-[#D4AF37]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-base text-[#2C221E] font-semibold tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
