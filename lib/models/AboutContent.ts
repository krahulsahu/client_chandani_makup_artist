import mongoose, { Schema } from 'mongoose';

const AboutContentSchema = new Schema({
  biography: { type: String, default: 'Chandani Kumari is a premier makeup artist and beauty consultant based in India. With years of practice glaming up hundreds of brides, she brings out the natural radiance of every individual.' },
  training: { type: String, default: 'Certified by top international beauty schools and trained under industry leading celebrity makeup professionals.' },
  certifications: [{ type: String }],
  experience: { type: String, default: 'Over 8 years of styling experience across weddings, fashion shoots, reception events, and commercial film productions.' },
  philosophy: { type: String, default: 'Beauty is not about changing how you look, but amplifying the gorgeous features you already possess.' },
  whyChooseMe: [{
    title: { type: String },
    description: { type: String }
  }]
}, { timestamps: true });

export default mongoose.models.AboutContent || mongoose.model('AboutContent', AboutContentSchema);
