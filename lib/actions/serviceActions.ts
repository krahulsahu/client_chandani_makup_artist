'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import Service from '../models/Service';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '../auth';
import { mockServices } from '../db/mockData';

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function getServices(onlyActive = false) {
  await dbConnect();
  if (isMockMode()) {
    const list = onlyActive ? mockServices.filter(s => s.isActive) : mockServices;
    return JSON.parse(JSON.stringify(list));
  }

  const query = onlyActive ? { isActive: true } : {};
  const services = await Service.find(query).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(services));
}

export async function createService(data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating service creation.', data);
    const mockNewService = {
      _id: 'mock-' + Date.now(),
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: data.description,
      priceRange: {
        min: Number(data.priceRange?.min),
        max: Number(data.priceRange?.max),
        currency: data.priceRange?.currency || 'INR'
      },
      duration: Number(data.duration),
      includedFeatures: data.includedFeatures || [],
      galleryImages: data.galleryImages || [],
      category: data.category,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    mockServices.unshift(mockNewService as any);
    return { success: true, data: mockNewService };
  }

  await requireAuth();

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const service = new Service({
    name: data.name,
    slug,
    description: data.description,
    priceRange: {
      min: Number(data.priceRange?.min),
      max: Number(data.priceRange?.max),
      currency: data.priceRange?.currency || 'INR'
    },
    duration: Number(data.duration),
    includedFeatures: data.includedFeatures || [],
    galleryImages: data.galleryImages || [],
    category: data.category,
    isActive: data.isActive !== undefined ? data.isActive : true
  });

  await service.save();
  revalidatePath('/services');
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(service)) };
}

export async function updateService(id: string, data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating service update.', id, data);
    const service = mockServices.find(s => s._id === id) as any;
    if (service) {
      service.name = data.name;
      service.description = data.description;
      service.priceRange = {
        min: Number(data.priceRange?.min),
        max: Number(data.priceRange?.max),
        currency: data.priceRange?.currency || 'INR'
      };
      service.duration = Number(data.duration);
      service.includedFeatures = data.includedFeatures || [];
      service.galleryImages = data.galleryImages || [];
      service.category = data.category;
      service.isActive = data.isActive !== undefined ? data.isActive : true;
    }
    return { success: true };
  }

  await requireAuth();

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const service = await Service.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }

  service.name = data.name;
  service.slug = slug;
  service.description = data.description;
  service.priceRange = {
    min: Number(data.priceRange?.min),
    max: Number(data.priceRange?.max),
    currency: data.priceRange?.currency || 'INR'
  };
  service.duration = Number(data.duration);
  service.includedFeatures = data.includedFeatures || [];
  service.galleryImages = data.galleryImages || [];
  service.category = data.category;
  service.isActive = data.isActive !== undefined ? data.isActive : true;

  await service.save();
  revalidatePath('/services');
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(service)) };
}

export async function deleteService(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating service deletion.', id);
    const index = mockServices.findIndex(s => s._id === id);
    if (index !== -1) {
      mockServices.splice(index, 1);
    }
    return { success: true };
  }

  await requireAuth();

  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    throw new Error('Service not found');
  }

  revalidatePath('/services');
  revalidatePath('/');
  return { success: true };
}
