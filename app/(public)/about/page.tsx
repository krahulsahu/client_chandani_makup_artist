import { getAboutContent, getWebsiteSettings } from '@/lib/actions/settingsActions';
import { Award, GraduationCap, Clock, Sparkles, ShieldCheck, Briefcase, Languages, Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // Group skills by category
  const skills = aboutContent?.skills || [];
  const skillCategories = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || 'Styling';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <main className="pb-24 bg-[#FAF6F0]">
      {/* Page Header */}
      <section className="relative py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase block font-semibold animate-fade-in">
            Meet the Artist
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide leading-tight">
            About Chandani Kumari
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            A peek into the journey, training, and philosophy of Bengaluru's premier bridal makeup & beauty specialist.
          </p>
        </div>
      </section>

      {/* Biography & Languages Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Photo Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-80 h-[450px] border-[3px] double border-[#D4AF37] p-2 bg-white rounded-2xl shadow-xl overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
              alt="Chandani Kumari Portrait" 
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1613]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Bio & Quick Facts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2C221E] tracking-wide">
              Crafting Elegance, Celebrating You
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
          </div>
          
          <p className="text-gray-600 text-sm font-sans leading-relaxed whitespace-pre-line">
            {aboutContent?.biography || 'Chandani Kumari is a premier makeup artist currently training at VLCC School of Beauty, Bengaluru. She believes beauty is not about altering your appearance, but amplifying the gorgeous features you already possess.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* Experience Summary */}
            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DA]/60 shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <Clock className="w-4.5 h-4.5" />
                <span className="text-xs uppercase font-bold tracking-wider font-sans text-[#2C221E]">Experience</span>
              </div>
              <p className="text-xs text-gray-500 font-sans leading-relaxed pt-1.5">
                {aboutContent?.experience || 'Makeup Artist & Beauty Trainee at VLCC School of Beauty (2025 - Present).'}
              </p>
            </div>

            {/* Training Summary */}
            <div className="space-y-1 bg-[#FDFBF7] p-4 rounded-xl border border-[#EAE5DA]/60 shadow-sm hover:border-[#D4AF37] transition-all">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <GraduationCap className="w-4.5 h-4.5" />
                <span className="text-xs uppercase font-bold tracking-wider font-sans text-[#2C221E]">Training & Course</span>
              </div>
              <p className="text-xs text-gray-500 font-sans leading-relaxed pt-1.5">
                {aboutContent?.training || 'Cosmetology & Beauty Course at VLCC School of Beauty, Rajajinagar, Bengaluru (2026).'}
              </p>
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="pt-4">
            <h4 className="font-serif text-sm text-[#2C221E] font-bold tracking-wider uppercase flex items-center gap-2 mb-3">
              <Languages className="w-4 h-4 text-[#D4AF37]" /> Spoken Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {aboutContent?.languages && aboutContent.languages.length > 0 ? (
                aboutContent.languages.map((lang: any, idx: number) => (
                  <span key={idx} className="bg-white border border-[#EAE5DA] px-4 py-2 rounded-full text-xs font-sans text-gray-700 shadow-sm">
                    <span className="font-semibold text-[#2C221E]">{lang.name}</span>
                    <span className="text-[#AF8F58] mx-1.5">•</span>
                    <span className="text-gray-500 font-medium">{lang.proficiency}</span>
                  </span>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">No languages listed.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience Timelines */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Education & Accreditations */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-[#2C221E]">
                <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-serif text-2xl font-semibold tracking-wide">
                  Education & Training
                </h3>
              </div>
              <div className="relative border-l border-[#EAE5DA]/80 pl-6 ml-3 space-y-8">
                {aboutContent?.education && aboutContent.education.length > 0 ? (
                  aboutContent.education.map((edu: any, idx: number) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute left-[-31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all" />
                      <div className="bg-white p-5 rounded-2xl border border-[#EAE5DA] shadow-sm hover:border-[#D4AF37] transition-all space-y-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                          {edu.status}
                        </span>
                        <h4 className="font-serif text-base text-[#2C221E] font-bold">
                          {edu.course}
                        </h4>
                        <p className="text-xs font-semibold font-sans text-[#AF8F58]">
                          {edu.instituteName}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans pt-1 border-t border-[#FAF6F0]">
                          <span>{edu.location}</span>
                          <span className="font-bold text-[#2C221E]">{edu.year}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No education history details listed.</p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-[#2C221E]">
                <Award className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="font-serif text-xl font-semibold tracking-wide uppercase">
                  Accreditions
                </h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#EAE5DA] shadow-sm space-y-4">
                <ul className="space-y-3.5">
                  {aboutContent?.certifications && aboutContent.certifications.length > 0 ? (
                    aboutContent.certifications.map((cert: string, idx: number) => (
                      <li key={idx} className="flex items-start text-xs font-sans text-gray-600">
                        <Check className="w-4.5 h-4.5 text-[#D4AF37] mr-3.5 shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No certifications listed.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Work Experience & Trainee Responsibilities */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3 text-[#2C221E]">
              <Briefcase className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-serif text-2xl font-semibold tracking-wide">
                Work Experience & Practice
              </h3>
            </div>

            <div className="relative border-l border-[#EAE5DA]/80 pl-6 ml-3">
              {aboutContent?.workExperience && aboutContent.workExperience.length > 0 ? (
                aboutContent.workExperience.map((work: any, idx: number) => (
                  <div key={idx} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute left-[-31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all" />
                    
                    <div className="bg-white p-6 rounded-2xl border border-[#EAE5DA] shadow-sm hover:border-[#D4AF37] transition-all space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-serif text-lg text-[#2C221E] font-bold">
                            {work.position}
                          </h4>
                          <span className="font-sans text-xs bg-[#2C221E] text-[#FFFDD0] px-3 py-1 rounded-full font-semibold">
                            {work.duration}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#AF8F58] font-sans mt-1">
                          {work.organization}
                        </p>
                      </div>

                      {/* Responsibilities bullet points */}
                      <div className="border-t border-[#FAF6F0] pt-4">
                        <p className="text-xs uppercase tracking-wider font-semibold text-[#2C221E] mb-3">
                          Core Responsibilities & Delivered Services:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {work.responsibilities && work.responsibilities.length > 0 ? (
                            work.responsibilities.map((resp: string, rIdx: number) => (
                              <li key={rIdx} className="flex items-start text-xs text-gray-600 font-sans leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-[#D4AF37] mr-2 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 italic">No responsibilities listed.</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">No work experience history details listed.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Star Ratings Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24 space-y-10">
        <div className="text-center space-y-2">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block font-semibold">
            Expertise Catalog
          </span>
          <h2 className="font-serif text-3xl text-[#2C221E] tracking-wide">
            Professional Skills & Ratings
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(skillCategories).map((category, catIdx) => (
            <div 
              key={catIdx}
              className="bg-white border border-[#EAE5DA] rounded-2xl shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-lg font-bold text-[#AF8F58] border-b border-[#FAF6F0] pb-2 uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-4 pt-1">
                {skillCategories[category].map((skill: any, sIdx: number) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-sans">
                      <span className="font-semibold text-gray-700">{skill.name}</span>
                      <span className="text-gray-400 text-[10px] font-bold">{skill.rating} / {skill.outOf}</span>
                    </div>
                    {/* Visual Gold Star Rating */}
                    <div className="flex items-center gap-1.5 text-[#D4AF37]">
                      {Array.from({ length: skill.outOf || 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-4 h-4 transition-transform hover:scale-110", 
                            i < skill.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-200"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beauty Philosophy Section */}
      <section className="bg-[#1F1613] text-[#FAF6F0] border-y border-[#2C221E] py-20 mt-24 overflow-hidden relative">
        <div className="absolute right-[-10%] bottom-[-20%] w-[40%] h-[60%] rounded-full bg-[#D4AF37]/10 opacity-30 blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="font-serif italic text-[#D4AF37] text-sm uppercase tracking-widest block font-semibold">
            Beauty Philosophy
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#FFFDD0] font-light leading-snug tracking-wide italic">
            "Beauty is about celebrating your unique features, boosting confidence, and creating a flawless, long-lasting transformation that looks elegant in any light."
          </h3>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
          <p className="text-gray-400 text-xs font-sans max-w-md mx-auto leading-relaxed uppercase tracking-widest">
            — Chandani Kumari, Makeup Trainee & Cosmetology Practitioner
          </p>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24 space-y-12">
        <div className="text-center space-y-2">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase block font-semibold">
            Our Guarantee
          </span>
          <h2 className="font-serif text-3xl text-[#2C221E] tracking-wide">
            Why Clients Choose Chandani
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyChooseMe.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className="bg-white border border-[#EAE5DA] p-6 rounded-2xl shadow-sm text-center space-y-3 hover:border-[#D4AF37] transition-all hover:shadow-md"
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
