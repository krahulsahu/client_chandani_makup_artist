import { getContacts } from '@/lib/actions/contactActions';
import InquiriesManager from '@/components/admin/InquiriesManager';

export const revalidate = 0; // Disable caching so new bookings show up instantly

export default async function AdminInquiriesPage() {
  const inquiries = await getContacts(); // Fetches all booking inquiries

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Booking Inquiries
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Manage client leads, review wedding dates and booking requirements, record custom call notes, or archive records.
        </p>
      </div>

      <InquiriesManager inquiries={inquiries} />
    </div>
  );
}
