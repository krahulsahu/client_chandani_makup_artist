'use server';

import bcrypt from 'bcryptjs';
import dbConnect, { isMockMode } from '../db/mongoose';
import Admin from '../models/Admin';
import { signJWT, setAdminCookie, deleteAdminCookie } from '../auth';

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { success: false, error: 'Please fill in all fields.' };
  }

  try {
    await dbConnect();

    // Fallback authentication for Mock Mode
    if (isMockMode()) {
      const defaultUser = process.env.ADMIN_DEFAULT_USER || 'admin';
      const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || 'password123';
      
      if (username === defaultUser && password === defaultPass) {
        const token = await signJWT({ id: 'mock-admin-id', username: defaultUser });
        await setAdminCookie(token);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials. Use admin / password123 in mock mode.' };
      }
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return { success: false, error: 'Invalid username or password.' };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid username or password.' };
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    // Sign JWT and set http-only cookie
    const token = await signJWT({ id: admin._id.toString(), username: admin.username });
    await setAdminCookie(token);

    return { success: true };
  } catch (error: any) {
    console.error('Login Server Action error:', error);
    return { success: false, error: 'Server error. Please try again.' };
  }
}

export async function logoutAdmin() {
  await deleteAdminCookie();
}

export async function checkSession() {
  try {
    await dbConnect();
    if (isMockMode()) {
      return true; // Auto-bypass session validations in mock mode
    }
    const admin = await Admin.findOne();
    return !!admin;
  } catch {
    return false;
  }
}
