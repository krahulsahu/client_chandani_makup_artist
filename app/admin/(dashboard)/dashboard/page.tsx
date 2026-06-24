import dbConnect, { isMockMode } from '@/lib/db/mongoose';
import Review from '@/lib/models/Review';
import Service from '@/lib/models/Service';
import Portfolio from '@/lib/models/Portfolio';
import Contact from '@/lib/models/Contact';
import { generateQRCode } from '@/lib/qrcode';
import QRWidget from '@/components/admin/QRWidget';
import Link from 'next/link';
import { 
  Sparkles, 
  MessageSquare, 
  ImageIcon, 
  Inbox, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import { mockReviews, mockServices, mockPortfolio, mockContacts } from '@/lib/db/mockData';

export const revalidate = 0; // Disable caching for the admin dashboard

export default async function AdminDashboardPage() {
  await dbConnect();

  let totalReviews = 0;
  let pendingReviews = 0;
  let totalServices = 0;
  let totalPortfolio = 0;
  let totalContacts = 0;
  let latestContacts: any[] = [];
  let latestReviews: any[] = [];

  if (isMockMode()) {
    totalReviews = mockReviews.length;
    pendingReviews = mockReviews.filter((r: any) => r.status === 'pending').length;
    totalServices = mockServices.length;
    totalPortfolio = mockPortfolio.length;
    totalContacts = mockContacts.length;
    
    // Add default timestamps if missing to prevent formatting errors
    latestContacts = mockContacts.slice(0, 4).map((c: any) => ({ ...c, createdAt: c.createdAt || new Date().toISOString() }));
    latestReviews = mockReviews.slice(0, 4).map((r: any) => ({ ...r, createdAt: r.createdAt || new Date().toISOString() }));
  } else {
    const [
      tr,
      pr,
      ts,
      tp,
      tc,
      lc,
      lr
    ] = await Promise.all([
      Review.countDocuments(),
      Review.countDocuments({ status: 'pending' }),
      Service.countDocuments(),
      Portfolio.countDocuments(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(4).lean(),
      Review.find().sort({ createdAt: -1 }).limit(4).lean()
    ]);
    totalReviews = tr;
    pendingReviews = pr;
    totalServices = ts;
    totalPortfolio = tp;
    totalContacts = tc;
    latestContacts = JSON.parse(JSON.stringify(lc));
    latestReviews = JSON.parse(JSON.stringify(lr));
  }

  // Generate Review QR Code
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const reviewUrl = `${siteUrl}/review`;
  const qrDataUrl = await generateQRCode(reviewUrl);

  const kpis = [
    { name: 'Total Reviews', value: totalReviews, icon: MessageSquare, href: '/admin/reviews', color: 'text-blue-600' },
    { name: 'Pending Approvals', value: pendingReviews, icon: AlertCircle, href: '/admin/reviews', color: pendingReviews > 0 ? 'text-[#D4AF37] animate-pulse font-bold' : 'text-gray-600' },
    { name: 'Portfolio Items', value: totalPortfolio, icon: ImageIcon, href: '/admin/portfolio', color: 'text-purple-600' },
    { name: 'Contact Inquiries', value: totalContacts, icon: Inbox, href: '/admin/inquiries', color: 'text-emerald-600' },
    { name: 'Total Services', value: totalServices, icon: Sparkles, href: '/admin/services', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2C221E] tracking-wide">
          Dashboard Overview
        </h1>
        <p className="text-[#AF8F58] font-sans text-sm mt-1">
          Welcome back, Admin. Here is the latest performance summary for Chandani Kumari.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.name}
              href={kpi.href}
              className="bg-white p-5 rounded-xl border border-[#EAE5DA] shadow-sm hover:shadow-md transition-shadow duration-300 block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-sans tracking-wider uppercase font-semibold">
                  {kpi.name}
                </span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className="text-3xl font-serif text-[#2C221E] mt-3 font-semibold">
                {kpi.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Primary Workspaces Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Activity Logs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Inquiries */}
          <div className="bg-white border border-[#EAE5DA] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
              <h2 className="font-serif text-lg text-[#2C221E] tracking-wide flex items-center">
                <Inbox className="w-4 h-4 mr-2 text-[#AF8F58]" />
                Recent Inquiries
              </h2>
              <Link 
                href="/admin/inquiries" 
                className="text-xs text-[#AF8F58] hover:text-[#2C221E] flex items-center font-semibold"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
            
            <div className="divide-y divide-[#F5F2EB] mt-2">
              {latestContacts.length === 0 ? (
                <p className="text-xs text-gray-500 py-6 text-center">No recent contact requests.</p>
              ) : (
                latestContacts.map((contact: any) => (
                  <div key={contact._id} className="py-4 flex items-center justify-between hover:bg-[#FAF6F0] px-2 rounded-lg transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#2C221E]">{contact.name}</p>
                      <p className="text-xs text-gray-500 font-sans">{contact.eventType} • {contact.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold font-sans ${
                        contact.status === 'new' 
                          ? 'bg-amber-100 text-amber-800' 
                          : contact.status === 'contacted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.status}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1 font-mono">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Review Feed */}
          <div className="bg-white border border-[#EAE5DA] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F2EB]">
              <h2 className="font-serif text-lg text-[#2C221E] tracking-wide flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#AF8F58]" />
                Recent Reviews
              </h2>
              <Link 
                href="/admin/reviews" 
                className="text-xs text-[#AF8F58] hover:text-[#2C221E] flex items-center font-semibold"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="divide-y divide-[#F5F2EB] mt-2">
              {latestReviews.length === 0 ? (
                <p className="text-xs text-gray-500 py-6 text-center">No recent reviews submitted.</p>
              ) : (
                latestReviews.map((review: any) => (
                  <div key={review._id} className="py-4 flex items-center justify-between hover:bg-[#FAF6F0] px-2 rounded-lg transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-[#2C221E]">{review.clientName}</p>
                        <div className="flex text-amber-400 text-xs">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate max-w-md italic font-serif">
                        "{review.reviewMessage}"
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold font-sans ${
                        review.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : review.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {review.status}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1 font-mono">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Side: QR Code Generator Card */}
        <div>
          <QRWidget qrDataUrl={qrDataUrl} reviewUrl={reviewUrl} />
        </div>
      </div>
    </div>
  );
}
