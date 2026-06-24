import { getPortfolios } from '@/lib/actions/portfolioActions';
import PortfolioManager from '@/components/admin/PortfolioManager';

export const revalidate = 0; // Disable caching for instant updates

export default async function AdminPortfolioPage() {
  const items = await getPortfolios();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Manage Portfolio
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Upload and describe makeover styles, link high-resolution image sets, select showcase events, and toggle homepage highlight statuses.
        </p>
      </div>

      <PortfolioManager portfolioItems={items} />
    </div>
  );
}
