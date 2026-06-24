import { getServices } from '@/lib/actions/serviceActions';
import ServicesManager from '@/components/admin/ServicesManager';

export const revalidate = 0; // Disable cache so administrative edits show up instantly

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Manage Services
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Add new beauty packages, edit current descriptions, price ranges, check inclusions, or remove service offers.
        </p>
      </div>

      <ServicesManager services={services} />
    </div>
  );
}
