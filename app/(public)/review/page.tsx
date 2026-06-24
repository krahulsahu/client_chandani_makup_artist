import ReviewForm from '@/components/public/ReviewForm';

export default function PublicReviewPage() {
  return (
    <main className="pb-24">
      {/* Header Accent */}
      <section className="relative bg-[#FAF6F0] py-16 border-b border-[#EAE5DA] text-center overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAE5DA] opacity-30 blur-3xl" />
        <div className="relative z-10 max-w-xl mx-auto px-6 space-y-3">
          <span className="font-serif italic text-[#AF8F58] tracking-widest text-xs uppercase">
            Makeover Feedback
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
            Submit Your Review
          </h1>
          <p className="font-sans text-gray-500 text-xs">
            We value your experience and look forward to your honest testimonial!
          </p>
        </div>
      </section>

      {/* Review Form Wrapper */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <ReviewForm />
      </section>
    </main>
  );
}
