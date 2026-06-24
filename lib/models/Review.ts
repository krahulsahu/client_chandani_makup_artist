import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  clientName: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  eventType: { type: String, required: true }, // e.g., 'Bridal', 'Reception', 'Engagement'
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewMessage: { type: String, required: true },
  clientPhoto: { type: String }, // Optional image URL
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
