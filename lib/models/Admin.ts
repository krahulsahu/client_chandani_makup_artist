import mongoose, { Schema } from 'mongoose';

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }, // BCrypt hashed password
  role: { type: String, default: 'admin' },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
