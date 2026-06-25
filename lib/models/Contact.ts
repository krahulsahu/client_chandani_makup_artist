import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: String },
  eventLocation: { type: String },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'archived'], default: 'new' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
