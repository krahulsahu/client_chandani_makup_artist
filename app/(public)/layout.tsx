import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { getWebsiteSettings } from '@/lib/actions/settingsActions';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();
  const whatsappNumber = settings?.whatsappNumber || '+919999999999';

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6F0]">
      {/* Translucent glass navigation */}
      <Header />
      
      {/* Content wrapper with margin offset for fixed header */}
      <div className="flex-grow pt-[80px]">
        {children}
      </div>

      {/* Shared Footer block */}
      <Footer />

      {/* Floating interactive WhatsApp widget */}
      <WhatsAppButton number={whatsappNumber} />
    </div>
  );
}
