import { getWebsiteSettings, getHomepageContent, getAboutContent } from '@/lib/actions/settingsActions';
import SettingsForm from '@/components/admin/SettingsForm';

export const revalidate = 0; // Prevent cache to reflect updates instantly

export default async function AdminSettingsPage() {
  const [settings, homepage, about] = await Promise.all([
    getWebsiteSettings(),
    getHomepageContent(),
    getAboutContent(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Website Settings
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Customize website copywriting, contact listings, social media integrations, and search configurations.
        </p>
      </div>

      <SettingsForm 
        initialSettings={settings}
        initialHomepage={homepage}
        initialAbout={about}
      />
    </div>
  );
}
