export const mockSettings = {
  websiteName: 'Chandani Kumari - Luxury Makeup Artist & Beauty Specialist',
  logo: '',
  email: 'chandkreh@gmail.com',
  phoneNumbers: ['+91 91553 31272', '+91 98444 56045'],
  whatsappNumber: '+919155331272',
  address: 'Bengaluru - 560097, Karnataka, India',
  socialMediaLinks: {
    facebook: '',
    instagram: '',
    youtube: '',
    pinterest: ''
  },
  seoSettings: {
    metaTitle: 'Chandani Kumari | Luxury Makeup Artist & Beauty Specialist',
    metaDescription: 'VLCC trained makeup artist based in Bengaluru. Specializing in bridal, traditional, and contemporary Indian makeup styling.',
    keywords: ['makeup artist Bengaluru', 'bridal makeup Bengaluru', 'VLCC beauty specialist', 'Chandani Kumari makeup'],
    ogImage: ''
  },
  googleAnalyticsId: ''
};

export const mockHomepage = {
  hero: {
    title: 'Transforming Beauty with Elegance',
    subtitle: 'Chandani Kumari - Makeup Artist & Beauty Specialist',
    tagline: 'Transforming Beauty with Elegance and Confidence.',
    bannerImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200',
    makeupArtistPhoto: 'https://drive.google.com/file/d/1lx-Vc726so_n5014MRd1Zu1iyh9zeXGc/view?usp=sharing'
  },
  statistics: {
    happyClients: 120,
    bridalMakeovers: 85,
    yearsOfExperience: 2,
    reviewsCount: 45
  },
  servicesPreviewTitle: 'Signature Makeover Services',
  portfolioPreviewTitle: 'Bridal & Event Portfolios'
};

export const mockAbout = {
  biography: 'Passionate and creative Makeup Artist currently training at VLCC School of Beauty, Bengaluru. Specializes in bridal, traditional, and contemporary Indian makeup looks. Experienced in bridal transformations, saree draping, hair styling, client consultations, and beauty services. Known for attention to detail, client satisfaction, professionalism, and elegant beauty solutions.',
  training: 'Cosmetology & Beauty Course at VLCC School of Beauty, Rajajinagar, Bengaluru (2026)',
  certifications: [
    'VLCC Cosmetology & Beauty Practitioner Certificate',
    'Bridal Transformation & Styling Specialization',
    'Contemporary Indian Makeup Diploma'
  ],
  experience: 'Makeup Artist & Beauty Trainee at VLCC School of Beauty, Bengaluru (2025 - Present)',
  philosophy: 'Beauty is about celebrating your unique features, boosting confidence, and creating a flawless, long-lasting transformation that looks elegant in any light.',
  whyChooseMe: [
    { title: 'VLCC Trained Expertise', description: 'Certified beauty practitioner utilizing standard industry methods and techniques.' },
    { title: 'Personalized Makeovers', description: 'Every makeup session is tailored specifically to the client\'s preferences, outfit, and event style.' },
    { title: 'Complete Bridal Solutions', description: 'Providing makeup, hair styling, Marwari/South Indian saree draping, dupatta pinning, and forehead bindi styling.' }
  ],
  education: [
    {
      instituteName: 'VLCC School of Beauty',
      location: 'Rajajinagar, Bengaluru',
      course: 'Cosmetology & Beauty',
      year: '2026',
      status: 'Trainee & Practitioner'
    }
  ],
  workExperience: [
    {
      organization: 'VLCC School of Beauty',
      position: 'Makeup Artist & Beauty Trainee',
      duration: '2025 - Present',
      responsibilities: [
        'Delivered complete bridal and party makeup services.',
        'Executed traditional Indian bridal looks.',
        'Performed South Indian bridal makeup.',
        'Created Royal Bridal looks.',
        'Managed Marwari bridal styling.',
        'Saree draping for brides.',
        'Dupatta styling.',
        'Groom grooming and makeup.',
        'Hair styling services.',
        'Bridal Bindi design.',
        'Haldi makeup looks.',
        'Mehndi makeup looks.',
        'Client consultation and beauty planning.',
        'Product recommendations.',
        'Personalized beauty services.'
      ]
    }
  ],
  skills: [
    { name: 'Day Makeup', rating: 4, outOf: 5, category: 'Makeup' },
    { name: 'Party Makeup', rating: 4, outOf: 5, category: 'Makeup' },
    { name: 'No Makeup Look', rating: 4, outOf: 5, category: 'Makeup' },
    { name: 'Evening Makeup', rating: 4, outOf: 5, category: 'Makeup' },
    { name: 'Engagement Makeup', rating: 5, outOf: 5, category: 'Bridal' },
    { name: 'Cocktail Makeup', rating: 4, outOf: 5, category: 'Makeup' },
    { name: 'Royal Bridal Makeup', rating: 5, outOf: 5, category: 'Bridal' },
    { name: 'Reception Makeup', rating: 5, outOf: 5, category: 'Bridal' },
    { name: 'Groom Makeup', rating: 4, outOf: 5, category: 'Groom' },
    { name: 'Haldi Mehndi Look', rating: 5, outOf: 5, category: 'Bridal' },
    { name: 'Bridal Bindi Design', rating: 5, outOf: 5, category: 'Bridal' },
    { name: 'Trending Hair Styling', rating: 4, outOf: 5, category: 'Hair Styling' },
    { name: 'Dupatta Styling', rating: 5, outOf: 5, category: 'Styling' },
    { name: 'Marwari Saree Draping', rating: 5, outOf: 5, category: 'Saree Draping' },
    { name: 'South Indian Saree Draping', rating: 5, outOf: 5, category: 'Saree Draping' }
  ],
  languages: [
    { name: 'Hindi', proficiency: 'Native / Fluent' },
    { name: 'English', proficiency: 'Conversational' }
  ]
};

export const mockServices = [
  {
    _id: 'mock-s1',
    name: 'Bridal Makeup',
    slug: 'bridal-makeup',
    description: 'Flawless high-definition bridal makeup application customized for your wedding day. Includes detailed skin prep, lash extensions, and complete styling.',
    priceRange: { min: 15000, max: 25000, currency: 'INR' },
    duration: 150,
    includedFeatures: ['HD / Airbrush Cosmetics', 'Premium Lash Extensions', 'Hairstyling & Accessories setting', 'Dupatta & Jewelry styling'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s2',
    name: 'Reception Makeup',
    slug: 'reception-makeup',
    description: 'Elegant and glamorous reception makeover styled to complement your bridal reception outfit and theme.',
    priceRange: { min: 12000, max: 18000, currency: 'INR' },
    duration: 120,
    includedFeatures: ['Long-wear Airbrush/HD finish', 'Hollywood Waves or Updo styling', 'Lehenga/Saree Draping', 'Shimmer highlight finish'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s3',
    name: 'Engagement Makeup',
    slug: 'engagement-makeup',
    description: 'Soft, dewy, and elegant makeup look customized for engagement and ring ceremonies.',
    priceRange: { min: 10000, max: 15000, currency: 'INR' },
    duration: 120,
    includedFeatures: ['Premium Dewy Base', 'Soft Braids or Floral hair styling', 'Saree/Gown Draping', 'Hydrating Skin Prep'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s4',
    name: 'Party Makeup',
    slug: 'party-makeup',
    description: 'Perfect makeover for bridesmaids, guests, cocktail parties, or grand social events.',
    priceRange: { min: 5000, max: 8000, currency: 'INR' },
    duration: 90,
    includedFeatures: ['Premium Party Cosmetics', 'Blow-dry or Soft Curl styling', 'Dupatta/Saree Pinning', 'Matte or Dewy Finish'],
    category: 'Makeup',
    isActive: true
  },
  {
    _id: 'mock-s5',
    name: 'Haldi Makeup',
    slug: 'haldi-makeup',
    description: 'Vibrant, smudge-proof, and glowing makeup designed to hold up perfectly for the Haldi ceremony.',
    priceRange: { min: 4000, max: 6000, currency: 'INR' },
    duration: 90,
    includedFeatures: ['Water-resistant Base', 'Floral Hair styling accents', 'Smudge-proof Makeup', 'Outfit Draping'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s6',
    name: 'Mehndi Makeup',
    slug: 'mehndi-makeup',
    description: 'Fresh and radiant makeup styling designed to highlight your features for the Mehndi celebrations.',
    priceRange: { min: 4000, max: 6000, currency: 'INR' },
    duration: 90,
    includedFeatures: ['Radiant Glow finish', 'Boho braid or Half-up hair styling', 'Lash highlights', 'Draping assistance'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s7',
    name: 'Groom Makeup',
    slug: 'groom-makeup',
    description: 'Subtle, camera-ready grooming, matte skin prep, contouring, and hairstyling services for the groom.',
    priceRange: { min: 3000, max: 5000, currency: 'INR' },
    duration: 60,
    includedFeatures: ['Matte HD skin prep', 'Anti-shine base', 'Hair styling & setting', 'Beard grooming definition'],
    category: 'Groom',
    isActive: true
  },
  {
    _id: 'mock-s8',
    name: 'Hair Styling',
    slug: 'hair-styling',
    description: 'Trending and customized hair styling services, including traditional buns, Hollywood waves, braids, and extensions settings.',
    priceRange: { min: 2000, max: 4000, currency: 'INR' },
    duration: 60,
    includedFeatures: ['Thermal Styling & Setting', 'Hair extension placement', 'Accessory & Flower pinning', 'Volume styling'],
    category: 'Hair Styling',
    isActive: true
  },
  {
    _id: 'mock-s9',
    name: 'Saree Draping',
    slug: 'saree-draping',
    description: 'Expert saree pleating, safety pinning, and elegant draping in traditional styles.',
    priceRange: { min: 1500, max: 3000, currency: 'INR' },
    duration: 45,
    includedFeatures: ['Saree pleating & setting', 'Security pinning', 'Custom drape style adjustment', 'Comfort fit setting'],
    category: 'Saree Draping',
    isActive: true
  },
  {
    _id: 'mock-s10',
    name: 'Dupatta Styling',
    slug: 'dupatta-styling',
    description: 'Perfect double-veil or single-veil dupatta pinning and crown settings for the bride.',
    priceRange: { min: 1000, max: 2000, currency: 'INR' },
    duration: 30,
    includedFeatures: ['Double-veil pinning', 'Crown weight distribution pinning', 'Border setting', 'Security pinning'],
    category: 'Styling',
    isActive: true
  },
  {
    _id: 'mock-s11',
    name: 'Bridal Bindi Design',
    slug: 'bridal-bindi-design',
    description: 'Exquisite, hand-painted traditional forehead bindi designs customizing bridal aesthetics.',
    priceRange: { min: 1000, max: 1500, currency: 'INR' },
    duration: 45,
    includedFeatures: ['Hand-painted artistic design', 'Forehead symmetry alignment', 'Water-resistant paint', 'Stone embellishment'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s12',
    name: 'Royal Bridal Package',
    slug: 'royal-bridal-package',
    description: 'Ultra-luxury bridal transformation including Airbrush makeup, extensions, heavy Marwari/traditional draping, and forehead bindi art.',
    priceRange: { min: 25000, max: 40000, currency: 'INR' },
    duration: 180,
    includedFeatures: ['Premium Airbrush Makeup', 'Specialized Hair Extensions', 'Forehead Bindi Art', 'Royal Saree/Lehenga draping'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s13',
    name: 'South Indian Bridal Makeup',
    slug: 'south-indian-bridal-makeup',
    description: 'Traditional South Indian bridal styling, including long braid styling, temple jewelry placement, and fresh flower settings.',
    priceRange: { min: 18000, max: 28000, currency: 'INR' },
    duration: 180,
    includedFeatures: ['Traditional Matte/HD makeup', 'Jada (braid) decoration styling', 'Kanjeevaram Saree draping', 'Temple jewelry pinning'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s14',
    name: 'Marwari Bridal Styling',
    slug: 'marwari-bridal-styling',
    description: 'Luxury Marwari bridal look including high-definition cosmetics, heavy jewelry setting, and traditional double-dupatta draping.',
    priceRange: { min: 18000, max: 28000, currency: 'INR' },
    duration: 180,
    includedFeatures: ['High-def Royal Makeup', 'Heavy jewelry pinning & safety support', 'Double dupatta draping', 'Forehead bindi paint'],
    category: 'Bridal',
    isActive: true
  },
  {
    _id: 'mock-s15',
    name: 'Traditional Bridal Makeup',
    slug: 'traditional-bridal-makeup',
    description: 'Classic matte base makeup with traditional red lip and golden eyes styling.',
    priceRange: { min: 15000, max: 22000, currency: 'INR' },
    duration: 150,
    includedFeatures: ['Traditional Matte finish', 'Lash extensions', 'Gold eyeshadow definition', 'Draping & Hairstyling'],
    category: 'Bridal',
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
    phone: '+91 95555 55555',
    email: 'sneha.gupta@example.com',
    eventType: 'Bridal Makeup',
    eventDate: '2026-12-15',
    eventLocation: 'Whitefield, Bengaluru',
    budget: '₹20,000 - ₹25,000',
    message: 'Looking to book premium bridal HD makeup and double-veil dupatta draping. Please call me.',
    status: 'new',
    createdAt: '2026-06-24T10:00:00.000Z'
  },
  {
    _id: 'mock-c2',
    name: 'Priya Narayanan',
    phone: '+91 91234 56789',
    email: 'priya.n@example.com',
    eventType: 'South Indian Bridal Makeup',
    eventDate: '2026-11-20',
    eventLocation: 'Indiranagar, Bengaluru',
    budget: '₹18,000',
    message: 'Need traditional South Indian wedding styling, braid extensions setting, and temple jewelry placement.',
    status: 'contacted',
    notes: 'Called on June 24. Trial scheduled for next week.',
    createdAt: '2026-06-23T14:30:00.000Z'
  },
  {
    _id: 'mock-c3',
    name: 'Anjali Marwah',
    phone: '+91 98765 43210',
    email: 'anjali.m@example.com',
    eventType: 'Marwari Saree Draping',
    eventDate: '2026-10-05',
    eventLocation: 'Rajajinagar, Bengaluru',
    budget: '₹3,000',
    message: 'Need elegant Marwari style saree pleating and setting for a reception event.',
    status: 'archived',
    notes: 'Booking confirmed and slot blocked.',
    createdAt: '2026-06-20T09:15:00.000Z'
  }
];
