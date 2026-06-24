export const mockSettings = {
  websiteName: 'Chandani Kumari - Luxury Makeup Artist & Beauty Specialist (Mock Mode)',
  logo: '',
  email: 'info@chandanikumari.com',
  phoneNumbers: ['+91 99999 99999'],
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
    metaDescription: 'Expert bridal makeup, hairstyling, and makeover services for your special day.',
    keywords: ['makeup artist', 'bridal makeup Patna', 'wedding stylist'],
    ogImage: ''
  },
  googleAnalyticsId: ''
};

export const mockHomepage = {
  hero: {
    title: 'Unveil Your Eternal Glow (Mock)',
    subtitle: 'Premium Bridal & Celebrity Makeover Specialist',
    tagline: 'Redefining elegance, celebrating natural beauty.',
    bannerImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200',
    makeupArtistPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600'
  },
  statistics: {
    happyClients: 500,
    bridalMakeovers: 350,
    yearsOfExperience: 8,
    reviewsCount: 240
  },
  servicesPreviewTitle: 'Signature Makeover Services',
  portfolioPreviewTitle: 'Bridal & Event Portfolios'
};

export const mockAbout = {
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
    { title: 'Luxury Products Only', description: 'We use high-end brands (MAC, Huda Beauty, Bobbi Brown, Charlotte Tilbury) to ensure standard skincare protection.' },
    { title: 'Tailored Looks', description: 'Every look is carefully customized to suit the client’s skin tone, structural features, attire, and personal preferences.' },
    { title: 'Punctuality & Professionalism', description: 'We prioritize our clients’ wedding day schedules, ensuring prompt and stress-free service on location.' }
  ]
};

export const mockServices = [
  {
    _id: 'mock-s1',
    name: 'Premium HD Bridal Makeup',
    slug: 'premium-hd-bridal-makeup',
    description: 'Flawless high-definition makeup application customized for your wedding day. Includes skin prep, lash extensions, and complete styling.',
    priceRange: { min: 15000, max: 25000, currency: 'INR' },
    duration: 150,
    includedFeatures: ['HD Cosmetics', 'Premium Mink Eyelashes', 'Dupatta & Jewellery Draping', 'Hairstyling'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s2',
    name: 'Airbrush Reception Makeover',
    slug: 'airbrush-reception-makeover',
    description: 'Long-lasting airbrush cosmetics application for high-fashion elegance during your wedding reception ceremony.',
    priceRange: { min: 12000, max: 18000, currency: 'INR' },
    duration: 120,
    includedFeatures: ['Airbrush Application', 'Hair Accessories styling', 'Saree Draping', 'Hydrating Skin Prep'],
    category: 'Reception',
    isActive: true
  },
  {
    _id: 'mock-s3',
    name: 'Celebrity Guest Party Makeup',
    slug: 'celebrity-guest-party-makeup',
    description: 'Stunning party makeup for guests, bridesmaids, or social events. Natural glow, contoured definition, and sleek hairstyle.',
    priceRange: { min: 6000, max: 10000, currency: 'INR' },
    duration: 90,
    includedFeatures: ['Party cosmetics', 'Hair blowdry / soft curls', 'Dupatta setting', 'Lash highlights'],
    category: 'Party',
    isActive: true
  }
];

export const mockPortfolio = [
  {
    _id: 'mock-p1',
    title: 'Traditional Gold Royal Bride',
    slug: 'traditional-gold-royal-bride',
    category: 'Bridal',
    description: 'Classic red lehenga look with detailed gold eyeshadow and bold matte lips.',
    eventDate: '2026-06-15T00:00:00.000Z',
    images: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=600',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400'
    ],
    isFeatured: true
  },
  {
    _id: 'mock-p2',
    title: 'Minimalist Dewy Engagement Look',
    slug: 'minimalist-dewy-engagement-look',
    category: 'Engagement',
    description: 'Clean glass-skin makeup with soft pastel pink shades and customized braids.',
    eventDate: '2026-05-20T00:00:00.000Z',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600'
    ],
    isFeatured: true
  },
  {
    _id: 'mock-p3',
    title: 'Glamorous Smokey Reception Glow',
    slug: 'glamorous-smokey-reception-glow',
    category: 'Reception',
    description: 'Dramatic black smokey eyes paired with a nude lip and high-volume Hollywood waves.',
    eventDate: '2026-06-01T00:00:00.000Z',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600'
    ],
    isFeatured: true
  }
];

export const mockReviews = [
  {
    _id: 'mock-r1',
    clientName: 'Priya Sharma',
    phoneNumber: '+919876543210',
    eventType: 'Bridal Makeup',
    rating: 5,
    reviewMessage: 'Chandani did my bridal makeup and it was absolutely stunning! The finish was extremely natural and lasted throughout the night without any cakey feeling. Recommend her to every bride!',
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-06-20T00:00:00.000Z'
  },
  {
    _id: 'mock-r2',
    clientName: 'Ananya Verma',
    phoneNumber: '+919988776655',
    eventType: 'Reception Makeup',
    rating: 5,
    reviewMessage: 'Excellent hair styling and airbrush makeup. She customized the look perfectly for my lehenga. Everyone loved my look. Thank you Chandani!',
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-06-18T00:00:00.000Z'
  }
];

export const mockContacts = [
  {
    _id: 'mock-c1',
    name: 'Sneha Gupta',
    phone: '+919555555555',
    email: 'sneha@example.com',
    eventType: 'Bridal Makeup',
    message: 'Looking to book bridal makeup for December 15, 2026. Please let me know slot availability.',
    status: 'new',
    createdAt: '2026-06-24T00:00:00.000Z'
  }
];
