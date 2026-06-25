'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import Portfolio from '../models/Portfolio';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '../auth';
import { mockPortfolio } from '../db/mockData';

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function getPortfolios(category?: string) {
  await dbConnect();
  if (isMockMode()) {
    const list = category && category !== 'All' 
      ? mockPortfolio.filter(p => p.category === category)
      : mockPortfolio;
    return JSON.parse(JSON.stringify(list));
  }

  const query = category && category !== 'All' ? { category } : {};
  const items = await Portfolio.find(query).sort({ eventDate: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function createPortfolioItem(data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating portfolio creation.', data);
    const mockNewItem = {
      _id: 'mock-' + Date.now(),
      title: data.title,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: data.category,
      description: data.description || '',
      eventDate: data.eventDate || new Date().toISOString(),
      images: data.images || [],
      isFeatured: data.isFeatured || false
    };
    mockPortfolio.unshift(mockNewItem);
    return { success: true, data: mockNewItem };
  }

  await requireAuth();

  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const item = new Portfolio({
    title: data.title,
    slug,
    category: data.category,
    description: data.description || '',
    eventDate: new Date(data.eventDate),
    images: data.images || [],
    isFeatured: data.isFeatured || false
  });

  await item.save();
  revalidatePath('/portfolio');
  revalidatePath('/gallery');
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(item)) };
}

export async function updatePortfolioItem(id: string, data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating portfolio update.', id, data);
    const item = mockPortfolio.find(p => p._id === id);
    if (item) {
      item.title = data.title;
      item.category = data.category;
      item.description = data.description || '';
      item.eventDate = data.eventDate || item.eventDate;
      item.images = data.images || [];
      item.isFeatured = data.isFeatured || false;
    }
    return { success: true };
  }

  await requireAuth();

  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const item = await Portfolio.findById(id);
  if (!item) {
    throw new Error('Portfolio item not found');
  }

  item.title = data.title;
  item.slug = slug;
  item.category = data.category;
  item.description = data.description || '';
  item.eventDate = new Date(data.eventDate);
  item.images = data.images || [];
  item.isFeatured = data.isFeatured || false;

  await item.save();
  revalidatePath('/portfolio');
  revalidatePath('/gallery');
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(item)) };
}

export async function deletePortfolioItem(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating portfolio deletion.', id);
    const index = mockPortfolio.findIndex(p => p._id === id);
    if (index !== -1) {
      mockPortfolio.splice(index, 1);
    }
    return { success: true };
  }

  await requireAuth();

  const item = await Portfolio.findByIdAndDelete(id);
  if (!item) {
    throw new Error('Portfolio item not found');
  }

  revalidatePath('/portfolio');
  revalidatePath('/gallery');
  revalidatePath('/');
  return { success: true };
}
