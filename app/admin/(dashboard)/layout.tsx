import AdminSidebar from '@/components/admin/AdminSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF6F0] flex">
      {/* Sidebar for admin navigation */}
      <AdminSidebar />

      {/* Main workspace container */}
      <main className="flex-1 pl-64 min-h-screen flex flex-col">
        <div className="flex-1 p-8 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
