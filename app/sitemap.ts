import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chandanikumari.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/gallery',
    '/reviews',
    '/review',
    '/contact',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
