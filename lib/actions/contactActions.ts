'use server';

import dbConnect, { isMockMode } from '../db/mongoose';
import Contact from '../models/Contact';
import { getAdminSession } from '../auth';
import { mockContacts } from '../db/mockData';
import nodemailer from 'nodemailer';

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

  // Send email notification in the background
  try {
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT) || 465;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const receiver = process.env.EMAIL_RECEIVER || 'chandkreh@gmail.com';

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const mailOptions = {
        from: `"Chandani Makeup Studio" <${user}>`,
        to: receiver,
        subject: `New Booking Inquiry from ${data.name} - ${data.eventType}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eae5da; border-radius: 12px; background-color: #fdfbf7;">
            <h2 style="color: #2c221e; font-family: serif; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">
              New Makeover Booking Inquiry
            </h2>
            <p style="color: #666; font-size: 14px;">A client has submitted a booking request on your portfolio site.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #faf6f0;">
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da; width: 150px;">Client Name</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Phone Number</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da;">
                  <a href="tel:${data.phone}" style="color: #d4af37; text-decoration: none; font-weight: bold;">${data.phone}</a>
                </td>
              </tr>
              <tr style="background-color: #faf6f0;">
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Email Address</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da;">
                  <a href="mailto:${data.email}" style="color: #d4af37; text-decoration: none;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Styling Service</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da; font-weight: bold; color: #2c221e;">${data.eventType}</td>
              </tr>
              <tr style="background-color: #faf6f0;">
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Event Date</td>
                <td style="padding: 10px; color: #b45309; border-bottom: 1px solid #eae5da; font-weight: bold;">${data.eventDate || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Event Location</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da;">${data.eventLocation || 'Not specified'}</td>
              </tr>
              <tr style="background-color: #faf6f0;">
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da;">Estimated Budget</td>
                <td style="padding: 10px; color: #af8f58; border-bottom: 1px solid #eae5da; font-weight: bold;">${data.budget || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #2c221e; border-bottom: 1px solid #eae5da; vertical-align: top;">Additional Notes</td>
                <td style="padding: 10px; color: #444; border-bottom: 1px solid #eae5da; font-style: italic; white-space: pre-wrap;">
                  "${data.message || 'No additional notes provided.'}"
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 25px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/inquiries" 
                 style="background-color: #2c221e; color: #fffdd0; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: bold; display: inline-block;">
                Open Admin Dashboard
              </a>
            </div>
            
            <p style="color: #999; font-size: 11px; text-align: center; margin-top: 25px; border-top: 1px solid #eae5da; padding-top: 15px;">
              This notification was generated automatically by your portfolio website.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email Notification: Successfully sent booking inquiry notification to', receiver);
    } else {
      console.log('Email Notification: Skipped. Email server settings (EMAIL_HOST, EMAIL_USER, EMAIL_PASS) are not configured in .env.local.');
    }
  } catch (emailError: any) {
    console.error('Email Notification: Failed to send email notification:', emailError.message);
  }

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
