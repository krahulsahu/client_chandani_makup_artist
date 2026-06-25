'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import Contact from '../models/Contact';
import { getAdminSession } from '../auth';
import { mockContacts } from '../db/mockData';

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function getContacts() {
  await requireAuth();
  await dbConnect();
  if (isMockMode()) {
    return JSON.parse(JSON.stringify(mockContacts));
  }

  const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(contacts));
}

export async function submitContact(data: {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate?: string;
  eventLocation?: string;
  budget?: string;
  message?: string;
}) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating contact submission.', data);
    return { success: true };
  }

  if (!data.name || !data.phone || !data.email || !data.eventType) {
    throw new Error('Please fill in all required fields.');
  }

  const contact = new Contact({
    name: data.name,
    phone: data.phone,
    email: data.email,
    eventType: data.eventType,
    eventDate: data.eventDate || '',
    eventLocation: data.eventLocation || '',
    budget: data.budget || '',
    message: data.message || '',
    status: 'new',
    notes: ''
  });

  await contact.save();
  return { success: true, data: JSON.parse(JSON.stringify(contact)) };
}

export async function updateContactStatus(id: string, status: 'new' | 'contacted' | 'archived', notes?: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating contact status update.', id, status, notes);
    return { success: true };
  }

  await requireAuth();

  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error('Contact inquiry not found');
  }

  contact.status = status;
  if (notes !== undefined) {
    contact.notes = notes;
  }

  await contact.save();
  return { success: true, data: JSON.parse(JSON.stringify(contact)) };
}

export async function deleteContact(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating contact deletion.', id);
    return { success: true };
  }

  await requireAuth();

  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new Error('Contact inquiry not found');
  }

  return { success: true };
}
