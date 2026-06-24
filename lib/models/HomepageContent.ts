import mongoose, { Schema } from 'mongoose';

const HomepageContentSchema = new Schema({
  hero: {
    title: { type: String, default: 'Unveil Your Eternal Glow' },
    subtitle: { type: String, default: 'Premium Bridal & Celebrity Makeover Specialist' },
    tagline: { type: String, default: 'Redefining elegance, celebrating natural beauty.' },
    bannerImage: { type: String, default: '' },
    makeupArtistPhoto: { type: String, default: '' }
  },
  statistics: {
    happyClients: { type: Number, default: 500 },
    bridalMakeovers: { type: Number, default: 350 },
    yearsOfExperience: { type: Number, default: 8 },
    reviewsCount: { type: Number, default: 240 }
  },
  servicesPreviewTitle: { type: String, default: 'Signature Makeover Services' },
  portfolioPreviewTitle: { type: String, default: 'Bridal & Event Portfolios' }
}, { timestamps: true });

export default mongoose.models.HomepageContent || mongoose.model('HomepageContent', HomepageContentSchema);
