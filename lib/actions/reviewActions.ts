'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import Review from '../models/Review';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '../auth';
import { mockReviews } from '../db/mockData';

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function getReviews(onlyApproved = false) {
  await dbConnect();
  if (isMockMode()) {
    const list = onlyApproved ? mockReviews.filter(r => r.status === 'approved') : mockReviews;
    return JSON.parse(JSON.stringify(list));
  }

  const query = onlyApproved ? { status: 'approved' } : {};
  const reviews = await Review.find(query).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(reviews));
}

export async function submitReview(data: {
  clientName: string;
  phoneNumber: string;
  email?: string;
  eventType: string;
  rating: number;
  reviewMessage: string;
  clientPhoto?: string;
}) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating client review submission.', data);
    const mockNewReview = {
      _id: 'mock-' + Date.now(),
      clientName: data.clientName,
      phoneNumber: data.phoneNumber,
      email: data.email || '',
      eventType: data.eventType,
      rating: Number(data.rating),
      reviewMessage: data.reviewMessage,
      clientPhoto: data.clientPhoto || '',
      status: 'pending',
      isFeatured: false,
      createdAt: new Date().toISOString()
    };
    mockReviews.unshift(mockNewReview);
    return { success: true, data: mockNewReview };
  }

  if (!data.clientName || !data.phoneNumber || !data.eventType || !data.rating || !data.reviewMessage) {
    throw new Error('Please fill in all required fields.');
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  const review = new Review({
    clientName: data.clientName,
    phoneNumber: data.phoneNumber,
    email: data.email || '',
    eventType: data.eventType,
    rating: Number(data.rating),
    reviewMessage: data.reviewMessage,
    clientPhoto: data.clientPhoto || '',
    status: 'pending',
    isFeatured: false
  });

  await review.save();
  return { success: true, data: JSON.parse(JSON.stringify(review)) };
}

export async function approveReview(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating review approval.', id);
    const review = mockReviews.find(r => r._id === id);
    if (review) {
      review.status = 'approved';
    }
    return { success: true };
  }

  await requireAuth();

  const review = await Review.findById(id);
  if (!review) {
    throw new Error('Review not found');
  }

  review.status = 'approved';
  await review.save();

  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}

export async function rejectReview(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating review rejection.', id);
    const review = mockReviews.find(r => r._id === id);
    if (review) {
      review.status = 'rejected';
    }
    return { success: true };
  }

  await requireAuth();

  const review = await Review.findById(id);
  if (!review) {
    throw new Error('Review not found');
  }

  review.status = 'rejected';
  await review.save();

  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}

export async function toggleFeaturedReview(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating review featured toggle.', id);
    const review = mockReviews.find(r => r._id === id);
    if (review) {
      review.isFeatured = !review.isFeatured;
      return { success: true, isFeatured: review.isFeatured };
    }
    return { success: true, isFeatured: false };
  }

  await requireAuth();

  const review = await Review.findById(id);
  if (!review) {
    throw new Error('Review not found');
  }

  review.isFeatured = !review.isFeatured;
  await review.save();

  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true, isFeatured: review.isFeatured };
}

export async function deleteReview(id: string) {
  await dbConnect();
  if (isMockMode()) {
    console.log('Mock Mode: Simulating review deletion.', id);
    const index = mockReviews.findIndex(r => r._id === id);
    if (index !== -1) {
      mockReviews.splice(index, 1);
    }
    return { success: true };
  }

  await requireAuth();

  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    throw new Error('Review not found');
  }

  revalidatePath('/reviews');
  revalidatePath('/');
  return { success: true };
}
