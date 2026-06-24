'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutAdmin } from '@/lib/actions/adminActions';
import { 
  LayoutDashboard, 
  Sparkles, 
  Image as ImageIcon, 
  MessageSquare, 
  Inbox, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Sparkles },
    { name: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#1F1613] text-[#F5F2EB] flex flex-col h-screen fixed left-0 top-0 border-r border-[#2C221E] z-30">
      <div className="p-6 border-b border-[#2C221E] text-center">
        <h2 className="font-serif text-xl tracking-wider text-[#D4AF37] uppercase">
          Chandani K.
        </h2>
        <p className="font-sans text-[10px] text-[#C5A880] tracking-widest uppercase mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 font-sans",
                isActive 
                  ? "bg-[#D4AF37] text-[#1F1613] font-semibold" 
                  : "text-[#EAE5DA] hover:bg-[#2C221E] hover:text-[#D4AF37]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#2C221E]">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-[#2C221E] hover:text-red-300 transition-all duration-300 font-sans"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
