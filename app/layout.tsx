import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chandani Kumari | Luxury Makeup Artist & Beauty Specialist',
  description: 'Professional luxury makeup artist specializing in premium bridal cosmetics, reception styling, and event makeovers by Chandani Kumari.',
  keywords: ['makeup artist', 'bridal makeup Bengaluru', 'wedding stylist', 'Chandani Kumari makeup', 'beauty specialist'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased text-[#2C221E] bg-[#FAF6F0]">
        {children}
      </body>
    </html>
  );
}
