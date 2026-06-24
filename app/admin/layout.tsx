import '@/app/globals.css';

export const metadata = {
  title: 'Chandani Kumari - Admin Panel',
  description: 'Control center for makeup artist business platform',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
