import { getReviews } from '@/lib/actions/reviewActions';
import ReviewsManager from '@/components/admin/ReviewsManager';

export const revalidate = 0; // Disable cache so approvals update instantly

export default async function AdminReviewsPage() {
  const reviews = await getReviews(); // Retrieve all reviews (approved + pending + rejected)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Manage Reviews
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Approve pending client submissions, reject reviews that don't match credentials, toggle home featured highlights, or delete records.
        </p>
      </div>

      <ReviewsManager reviews={reviews} />
    </div>
  );
}
