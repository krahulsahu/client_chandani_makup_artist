import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import WebsiteSettings from '../models/WebsiteSettings';
import HomepageContent from '../models/HomepageContent';
import AboutContent from '../models/AboutContent';

export async function seedDatabase() {
  try {
    // 1. Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUser = process.env.ADMIN_DEFAULT_USER || 'admin';
      const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || 'password123';
      const hashedPassword = await bcrypt.hash(defaultPass, 10);

      await Admin.create({
        username: defaultUser,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Database Seeding: Admin user created successfully.');
    }

    // 2. Seed Website Settings
    const settingsCount = await WebsiteSettings.countDocuments();
    if (settingsCount === 0) {
      await WebsiteSettings.create({
        websiteName: 'Chandani Kumari - Luxury Makeup Artist & Beauty Specialist',
        phoneNumbers: ['+919999999999'],
        whatsappNumber: '+919999999999',
        address: 'Chandani Beauty Studio, Main Road, Patna, Bihar, India',
        socialMediaLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          youtube: 'https://youtube.com',
          pinterest: 'https://pinterest.com'
        },
        seoSettings: {
          metaTitle: 'Chandani Kumari | Professional Makeup Artist & Hair Stylist',
          metaDescription: 'Expert bridal makeup, hairstyling, and makeover services for your special day. Book a luxury makeover with Chandani Kumari.',
          keywords: ['makeup artist', 'bridal makeup Patna', 'wedding stylist', 'Chandani Kumari makeup', 'beauty specialist'],
          ogImage: ''
        }
      });
      console.log('Database Seeding: Default Website Settings created.');
    }

    // 3. Seed Homepage Content
    const homepageCount = await HomepageContent.countDocuments();
    if (homepageCount === 0) {
      await HomepageContent.create({
        hero: {
          title: 'Unveil Your Eternal Glow',
          subtitle: 'Premium Bridal & Celebrity Makeover Specialist',
          tagline: 'Redefining elegance, celebrating natural beauty.',
          bannerImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200', // Premium default banner
          makeupArtistPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600' // Placeholder artist photo
        },
        statistics: {
          happyClients: 500,
          bridalMakeovers: 350,
          yearsOfExperience: 8,
          reviewsCount: 240
        },
        servicesPreviewTitle: 'Signature Makeover Services',
        portfolioPreviewTitle: 'Bridal & Event Portfolios'
      });
      console.log('Database Seeding: Default Homepage Content created.');
    }

    // 4. Seed About Content
    const aboutCount = await AboutContent.countDocuments();
    if (aboutCount === 0) {
      await AboutContent.create({
        biography: 'Chandani Kumari is an acclaimed Makeup Artist and Beauty Consultant. With a passion for enhancing natural features, she has spent over 8 years curating stunning looks for brides, wedding parties, fashion portfolios, and grand celebrations.',
        training: 'Certified by renowned cosmetics academics and trained directly under top celebrity makeup experts in the beauty industry.',
        certifications: [
          'Professional Makeup Masterclass Certificate',
          'International Bridal Hairstyling Academy Diploma',
          'Advanced Airbrush Cosmetics Specialization'
        ],
        experience: 'Over 8 years of styling experience across weddings, fashion shoots, editorial campaigns, and commercial film sets.',
        philosophy: 'Real beauty is about magnifying the gorgeous, unique features that each person already possesses, creating confidence that shines from within.',
        whyChooseMe: [
          { title: 'Luxury Products Only', description: 'We use high-end brands (MAC, Huda Beauty, Bobbi Brown, Charlotte Tilbury) to ensure standard skincare protection and long-lasting makeovers.' },
          { title: 'Tailored Looks', description: 'Every look is carefully customized to suit the client’s skin tone, structural features, attire, and personal preferences.' },
          { title: 'Punctuality & Professionalism', description: 'We prioritize our clients’ wedding day schedules, ensuring prompt and stress-free service on location.' }
        ]
      });
      console.log('Database Seeding: Default About Page Content created.');
    }
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}
