import mongoose, { Schema } from 'mongoose';

const PortfolioSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., 'Bridal', 'Reception', 'Engagement', 'Party', 'Haldi', 'Mehndi', 'Hair Styling', 'Saree Draping'
  description: { type: String },
  eventDate: { type: Date, required: true },
  images: [{ type: String, required: true }],  // Array of image links
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
