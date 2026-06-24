import { getPortfolios } from '@/lib/actions/portfolioActions';
import GalleryShowcase from '@/components/public/GalleryShowcase';

export const revalidate = 3600; // Cache page for 1 hour (ISR)

export default async function PublicGalleryPage() {
  const items = await getPortfolios();

  return (
    <main className="pb-24">
      {/* Page Header */}
      <section className="relative bg-[#FAF6F0] py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase">
            Image Photostream
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide">
            Studio Gallery Showcase
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            A beautiful, high-resolution feed of individual makeover details, hairstyling close-ups, and luxury beauty captures.
          </p>
        </div>
      </section>

      {/* Gallery Showcase Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <GalleryShowcase portfolioItems={items} />
      </section>
    </main>
  );
}
