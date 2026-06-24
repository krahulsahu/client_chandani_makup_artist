import mongoose from 'mongoose';
import { seedDatabase } from './seed';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Timeout fast if MongoDB is not running locally
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then(async (mongooseInstance) => {
        console.log('MongoDB successfully connected.');
        (global as any).isMockDB = false;
        await seedDatabase();
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('MongoDB connection failed. Switching to Local Mock Database mode:', err.message);
        (global as any).isMockDB = true;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn) {
      (global as any).isMockDB = true;
    }
  } catch (e) {
    cached.promise = null;
    (global as any).isMockDB = true;
  }

  return cached.conn;
}

export function isMockMode(): boolean {
  return !mongoose.connection || mongoose.connection.readyState !== 1;
}

export default dbConnect;
