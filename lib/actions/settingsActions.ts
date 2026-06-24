'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import WebsiteSettings from '../models/WebsiteSettings';
import HomepageContent from '../models/HomepageContent';
import AboutContent from '../models/AboutContent';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '../auth';
import { mockSettings, mockHomepage, mockAbout } from '../db/mockData';

// Helper to check auth inside actions
async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
}

// Website Settings Actions
export async function getWebsiteSettings() {
  await dbConnect();
  if (isMockMode()) {
    return JSON.parse(JSON.stringify(mockSettings));
  }
  
  let settings = await WebsiteSettings.findOne().lean();
  if (!settings) {
    settings = await WebsiteSettings.create({});
  }
  return JSON.parse(JSON.stringify(settings));
}

export async function updateWebsiteSettings(data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating website settings update.', data);
    return { success: true, data: JSON.parse(JSON.stringify(mockSettings)) };
  }

  await requireAuth();
  
  let settings = await WebsiteSettings.findOne();
  if (!settings) {
    settings = new WebsiteSettings();
  }

  settings.websiteName = data.websiteName;
  settings.logo = data.logo;
  settings.email = data.email;
  settings.phoneNumbers = data.phoneNumbers;
  settings.whatsappNumber = data.whatsappNumber;
  settings.address = data.address;
  settings.socialMediaLinks = {
    facebook: data.socialMediaLinks?.facebook || '',
    instagram: data.socialMediaLinks?.instagram || '',
    youtube: data.socialMediaLinks?.youtube || '',
    pinterest: data.socialMediaLinks?.pinterest || ''
  };
  settings.seoSettings = {
    metaTitle: data.seoSettings?.metaTitle || '',
    metaDescription: data.seoSettings?.metaDescription || '',
    keywords: data.seoSettings?.keywords || [],
    ogImage: data.seoSettings?.ogImage || ''
  };
  settings.googleAnalyticsId = data.googleAnalyticsId || '';

  await settings.save();
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(settings)) };
}

// Homepage Content Actions
export async function getHomepageContent() {
  await dbConnect();
  if (isMockMode()) {
    return JSON.parse(JSON.stringify(mockHomepage));
  }

  let content = await HomepageContent.findOne().lean();
  if (!content) {
    content = await HomepageContent.create({});
  }
  return JSON.parse(JSON.stringify(content));
}

export async function updateHomepageContent(data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating homepage content update.', data);
    return { success: true, data: JSON.parse(JSON.stringify(mockHomepage)) };
  }

  await requireAuth();

  let content = await HomepageContent.findOne();
  if (!content) {
    content = new HomepageContent();
  }

  content.hero = {
    title: data.hero?.title || '',
    subtitle: data.hero?.subtitle || '',
    tagline: data.hero?.tagline || '',
    bannerImage: data.hero?.bannerImage || '',
    makeupArtistPhoto: data.hero?.makeupArtistPhoto || ''
  };

  content.statistics = {
    happyClients: Number(data.statistics?.happyClients) || 0,
    bridalMakeovers: Number(data.statistics?.bridalMakeovers) || 0,
    yearsOfExperience: Number(data.statistics?.yearsOfExperience) || 0,
    reviewsCount: Number(data.statistics?.reviewsCount) || 0
  };

  content.servicesPreviewTitle = data.servicesPreviewTitle || '';
  content.portfolioPreviewTitle = data.portfolioPreviewTitle || '';

  await content.save();
  revalidatePath('/');
  return { success: true, data: JSON.parse(JSON.stringify(content)) };
}

// About Content Actions
export async function getAboutContent() {
  await dbConnect();
  if (isMockMode()) {
    return JSON.parse(JSON.stringify(mockAbout));
  }

  let content = await AboutContent.findOne().lean();
  if (!content) {
    content = await AboutContent.create({});
  }
  return JSON.parse(JSON.stringify(content));
}

export async function updateAboutContent(data: any) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating About page content update.', data);
    return { success: true, data: JSON.parse(JSON.stringify(mockAbout)) };
  }

  await requireAuth();

  let content = await AboutContent.findOne();
  if (!content) {
    content = new AboutContent();
  }

  content.biography = data.biography;
  content.training = data.training;
  content.certifications = data.certifications || [];
  content.experience = data.experience;
  content.philosophy = data.philosophy;
  content.whyChooseMe = data.whyChooseMe || [];

  await content.save();
  revalidatePath('/about');
  return { success: true, data: JSON.parse(JSON.stringify(content)) };
}
