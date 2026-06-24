import mongoose, { Schema } from 'mongoose';

const ServiceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  duration: { type: Number, required: true }, // in minutes
  includedFeatures: [{ type: String }],
  galleryImages: [{ type: String }],          // Image URLs
  category: { type: String, required: true }, // e.g., 'Bridal', 'Reception', 'Engagement'
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
