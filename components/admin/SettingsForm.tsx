'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { 
  updateWebsiteSettings, 
  updateHomepageContent, 
  updateAboutContent 
} from '@/lib/actions/settingsActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SettingsFormProps {
  initialSettings: any;
  initialHomepage: any;
  initialAbout: any;
}

type TabType = 'branding' | 'homepage' | 'about' | 'seo';

export default function SettingsForm({ initialSettings, initialHomepage, initialAbout }: SettingsFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('branding');
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Branding & Contact State
  const [websiteName, setWebsiteName] = useState(initialSettings.websiteName || '');
  const [logo, setLogo] = useState(initialSettings.logo || '');
  const [email, setEmail] = useState(initialSettings.email || '');
  const [phoneNumbers, setPhoneNumbers] = useState((initialSettings.phoneNumbers || []).join(', '));
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsappNumber || '');
  const [address, setAddress] = useState(initialSettings.address || '');
  const [facebook, setFacebook] = useState(initialSettings.socialMediaLinks?.facebook || '');
  const [instagram, setInstagram] = useState(initialSettings.socialMediaLinks?.instagram || '');
  const [youtube, setYoutube] = useState(initialSettings.socialMediaLinks?.youtube || '');
  const [pinterest, setPinterest] = useState(initialSettings.socialMediaLinks?.pinterest || '');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(initialSettings.googleAnalyticsId || '');

  // 2. Homepage Content State
  const [heroTitle, setHeroTitle] = useState(initialHomepage.hero?.title || '');
  const [heroSubtitle, setHeroSubtitle] = useState(initialHomepage.hero?.subtitle || '');
  const [heroTagline, setHeroTagline] = useState(initialHomepage.hero?.tagline || '');
  const [bannerImage, setBannerImage] = useState(initialHomepage.hero?.bannerImage || '');
  const [makeupArtistPhoto, setMakeupArtistPhoto] = useState(initialHomepage.hero?.makeupArtistPhoto || '');
  
  const [happyClients, setHappyClients] = useState(initialHomepage.statistics?.happyClients || 0);
  const [bridalMakeovers, setBridalMakeovers] = useState(initialHomepage.statistics?.bridalMakeovers || 0);
  const [yearsOfExperience, setYearsOfExperience] = useState(initialHomepage.statistics?.yearsOfExperience || 0);
  const [reviewsCount, setReviewsCount] = useState(initialHomepage.statistics?.reviewsCount || 0);
  
  const [servicesPreviewTitle, setServicesPreviewTitle] = useState(initialHomepage.servicesPreviewTitle || '');
  const [portfolioPreviewTitle, setPortfolioPreviewTitle] = useState(initialHomepage.portfolioPreviewTitle || '');

  // 3. About Page Content State
  const [biography, setBiography] = useState(initialAbout.biography || '');
  const [training, setTraining] = useState(initialAbout.training || '');
  const [certifications, setCertifications] = useState((initialAbout.certifications || []).join('\n'));
  const [experience, setExperience] = useState(initialAbout.experience || '');
  const [philosophy, setPhilosophy] = useState(initialAbout.philosophy || '');

  // 4. SEO State
  const [metaTitle, setMetaTitle] = useState(initialSettings.seoSettings?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialSettings.seoSettings?.metaDescription || '');
  const [keywords, setKeywords] = useState((initialSettings.seoSettings?.keywords || []).join(', '));
  const [ogImage, setOgImage] = useState(initialSettings.seoSettings?.ogImage || '');

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSave = () => {
    setMessage({ type: '', text: '' });
    
    startTransition(async () => {
      try {
        if (activeTab === 'branding') {
          const res = await updateWebsiteSettings({
            websiteName,
            logo,
            email,
            phoneNumbers: phoneNumbers.split(',').map((p: string) => p.trim()).filter(Boolean),
            whatsappNumber,
            address,
            socialMediaLinks: { facebook, instagram, youtube, pinterest },
            seoSettings: { metaTitle, metaDescription, ogImage, keywords: keywords.split(',').map((k: string) => k.trim()).filter(Boolean) },
            googleAnalyticsId
          });
          if (res.success) showFeedback('success', 'Branding & Contact settings updated successfully!');
        } else if (activeTab === 'homepage') {
          const res = await updateHomepageContent({
            hero: { title: heroTitle, subtitle: heroSubtitle, tagline: heroTagline, bannerImage, makeupArtistPhoto },
            statistics: { happyClients, bridalMakeovers, yearsOfExperience, reviewsCount },
            servicesPreviewTitle,
            portfolioPreviewTitle
          });
          if (res.success) showFeedback('success', 'Homepage content updated successfully!');
        } else if (activeTab === 'about') {
          const res = await updateAboutContent({
            biography,
            training,
            certifications: certifications.split('\n').map((c: string) => c.trim()).filter(Boolean),
            experience,
            philosophy,
            whyChooseMe: initialAbout.whyChooseMe // preserve this field
          });
          if (res.success) showFeedback('success', 'Biography & credentials updated successfully!');
        } else if (activeTab === 'seo') {
          const res = await updateWebsiteSettings({
            websiteName,
            logo,
            email,
            phoneNumbers: phoneNumbers.split(',').map((p: string) => p.trim()).filter(Boolean),
            whatsappNumber,
            address,
            socialMediaLinks: { facebook, instagram, youtube, pinterest },
            seoSettings: { metaTitle, metaDescription, ogImage, keywords: keywords.split(',').map((k: string) => k.trim()).filter(Boolean) },
            googleAnalyticsId
          });
          if (res.success) showFeedback('success', 'SEO settings updated successfully!');
        }
        router.refresh();
      } catch (err: any) {
        showFeedback('error', err.message || 'Failed to update settings.');
      }
    });
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'branding', label: 'Branding & Contact' },
    { id: 'homepage', label: 'Homepage Content' },
    { id: 'about', label: 'About & Credentials' },
    { id: 'seo', label: 'SEO Settings' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs list */}
      <div className="flex border-b border-[#EAE5DA] space-x-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setMessage({ type: '', text: '' }); }}
            className={cn(
              "pb-4 text-sm font-sans tracking-wide transition-all border-b-2 font-medium whitespace-nowrap",
              activeTab === tab.id
                ? "border-[#D4AF37] text-[#2C221E]"
                : "border-transparent text-gray-500 hover:text-[#2C221E]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Message feedback alerts */}
      {message.text && (
        <div className={cn(
          "p-4 rounded-lg border text-sm font-sans",
          message.type === 'success' 
            ? "bg-green-50 text-green-800 border-green-200" 
            : "bg-red-50 text-red-800 border-red-200"
        )}>
          {message.text}
        </div>
      )}

      {/* Active Form Card */}
      <Card className="border-[#EAE5DA] bg-[#FDFBF7] shadow-sm">
        <CardContent className="pt-6 space-y-6">
          {activeTab === 'branding' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="websiteName">Website Name</Label>
                <Input id="websiteName" value={websiteName} onChange={e => setWebsiteName(e.target.value)} className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" value={logo} onChange={e => setLogo(e.target.value)} placeholder="Link to logo file" className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Public Business Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumbers">Phone Numbers (comma separated)</Label>
                <Input id="phoneNumbers" value={phoneNumbers} onChange={e => setPhoneNumbers(e.target.value)} className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Link/Number</Label>
                <Input id="whatsappNumber" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} placeholder="+919999999999" className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input id="googleAnalyticsId" value={googleAnalyticsId} onChange={e => setGoogleAnalyticsId(e.target.value)} placeholder="G-XXXXXX" className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Studio Address</Label>
                <Textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="bg-white border-[#EAE5DA]" />
              </div>
              
              <div className="md:col-span-2 border-t border-[#F5F2EB] pt-4 mt-2">
                <h3 className="font-serif font-semibold text-[#2C221E] mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input id="instagram" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/profile" className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input id="facebook" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/page" className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input id="youtube" value={youtube} onChange={e => setYoutube(e.target.value)} placeholder="https://youtube.com/channel" className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pinterest">Pinterest URL</Label>
                    <Input id="pinterest" value={pinterest} onChange={e => setPinterest(e.target.value)} placeholder="https://pinterest.com/profile" className="bg-white border-[#EAE5DA]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="border-b border-[#F5F2EB] pb-4">
                <h3 className="font-serif font-semibold text-[#2C221E] mb-4">Hero Section Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input id="heroTitle" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input id="heroSubtitle" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroTagline">Hero Tagline</Label>
                    <Input id="heroTagline" value={heroTagline} onChange={e => setHeroTagline(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bannerImage">Background Banner Image URL</Label>
                    <Input id="bannerImage" value={bannerImage} onChange={e => setBannerImage(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="makeupArtistPhoto">Artist Profile Image URL</Label>
                    <Input id="makeupArtistPhoto" value={makeupArtistPhoto} onChange={e => setMakeupArtistPhoto(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                </div>
              </div>

              <div className="border-b border-[#F5F2EB] pb-4">
                <h3 className="font-serif font-semibold text-[#2C221E] mb-4">Statistics Counters</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="happyClients">Happy Clients</Label>
                    <Input id="happyClients" type="number" value={happyClients} onChange={e => setHappyClients(Number(e.target.value))} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bridalMakeovers">Bridal Makeovers</Label>
                    <Input id="bridalMakeovers" type="number" value={bridalMakeovers} onChange={e => setBridalMakeovers(Number(e.target.value))} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input id="yearsOfExperience" type="number" value={yearsOfExperience} onChange={e => setYearsOfExperience(Number(e.target.value))} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewsCount">Reviews Counter</Label>
                    <Input id="reviewsCount" type="number" value={reviewsCount} onChange={e => setReviewsCount(Number(e.target.value))} className="bg-white border-[#EAE5DA]" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif font-semibold text-[#2C221E] mb-4">Page Headers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="servicesPreviewTitle">Services Preview Heading</Label>
                    <Input id="servicesPreviewTitle" value={servicesPreviewTitle} onChange={e => setServicesPreviewTitle(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolioPreviewTitle">Portfolio Preview Heading</Label>
                    <Input id="portfolioPreviewTitle" value={portfolioPreviewTitle} onChange={e => setPortfolioPreviewTitle(e.target.value)} className="bg-white border-[#EAE5DA]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="biography">Biography (About Section Summary)</Label>
                <Textarea id="biography" value={biography} onChange={e => setBiography(e.target.value)} rows={5} className="bg-white border-[#EAE5DA]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="training">Training Information</Label>
                  <Textarea id="training" value={training} onChange={e => setTraining(e.target.value)} rows={4} className="bg-white border-[#EAE5DA]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Summary</Label>
                  <Textarea id="experience" value={experience} onChange={e => setExperience(e.target.value)} rows={4} className="bg-white border-[#EAE5DA]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="philosophy">Philosophy Statement</Label>
                <Textarea id="philosophy" value={philosophy} onChange={e => setPhilosophy(e.target.value)} rows={3} className="bg-white border-[#EAE5DA]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (one certification per line)</Label>
                <Textarea 
                  id="certifications" 
                  value={certifications} 
                  onChange={e => setCertifications(e.target.value)} 
                  rows={5} 
                  placeholder="e.g. Masterclass by Charlotte Tilbury" 
                  className="bg-white border-[#EAE5DA]" 
                />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="metaTitle">SEO Meta Title</Label>
                <Input id="metaTitle" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="metaDescription">SEO Meta Description</Label>
                <Textarea id="metaDescription" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input id="keywords" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="makeup, bridal, hairstyling" className="bg-white border-[#EAE5DA]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="ogImage">Open Graph Share Image URL</Label>
                <Input id="ogImage" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="Link to share preview image" className="bg-white border-[#EAE5DA]" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-[#F5F2EB] pt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="bg-[#2C221E] hover:bg-[#AF8F58] text-[#FFFDD0] font-sans tracking-wide px-6"
          >
            {isPending ? 'Saving Changes...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
