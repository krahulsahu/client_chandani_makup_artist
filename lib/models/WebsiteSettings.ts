import mongoose, { Schema } from 'mongoose';

const WebsiteSettingsSchema = new Schema({
  websiteName: { type: String, default: 'Chandani Kumari - Luxury Makeup Artist' },
  logo: { type: String },
  email: { type: String, default: 'info@chandanikumari.com' },
  phoneNumbers: [{ type: String }],
  whatsappNumber: { type: String, default: '+919999999999' },
  address: { type: String },
  socialMediaLinks: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    pinterest: { type: String, default: '' }
  },
  seoSettings: {
    metaTitle: { type: String, default: 'Chandani Kumari | Luxury Makeup Artist & Beauty Specialist' },
    metaDescription: { type: String, default: 'Professional luxury makeup artist specializing in bridal, reception, party, and event makeovers.' },
    keywords: [{ type: String }],
    ogImage: { type: String, default: '' }
  },
  googleAnalyticsId: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.WebsiteSettings || mongoose.model('WebsiteSettings', WebsiteSettingsSchema);
