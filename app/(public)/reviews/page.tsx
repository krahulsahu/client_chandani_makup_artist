import { getReviews } from '@/lib/actions/reviewActions';
import ReviewsList from '@/components/public/ReviewsList';

export const revalidate = 0; // Prevent caching so approved reviews appear instantly

export default async function PublicReviewsPage() {
  const reviews = await getReviews(true); // Fetch approved reviews only

  return (
    <main className="pb-24">
      {/* Page Header */}
      <section className="relative bg-[#FAF6F0] py-20 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-4">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-sm uppercase">
            Testimonials
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2C221E] tracking-wide">
            Client Reviews
          </h1>
          <p className="font-sans text-gray-500 text-sm max-w-lg mx-auto">
            Read stories and feedback from brides and clients who experienced luxury makeup services curated by Chandani Kumari.
          </p>
        </div>
      </section>

      {/* Reviews List Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <ReviewsList reviews={reviews} />
      </section>
    </main>
  );
}
