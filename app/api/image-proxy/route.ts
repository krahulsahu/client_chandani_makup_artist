import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    // Fetch the target URL using a standard desktop browser user agent
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache results for 1 hour to prevent redundant external fetches
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the target sharing page' }, { status: response.status });
    }

    const html = await response.text();

    // 1. Search for og:image meta tag (most standard and returns the direct image url)
    const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i;
    const ogMatch = html.match(ogImageRegex);
    if (ogMatch && ogMatch[1]) {
      const decodedUrl = ogMatch[1].replace(/&amp;/g, '&');
      return NextResponse.redirect(decodedUrl);
    }

    // 2. Search for twitter:image meta tag
    const twitterImageRegex = /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i;
    const twitterMatch = html.match(twitterImageRegex);
    if (twitterMatch && twitterMatch[1]) {
      const decodedUrl = twitterMatch[1].replace(/&amp;/g, '&');
      return NextResponse.redirect(decodedUrl);
    }

    // 3. Fallback: Search for any googleusercontent link inside the body
    const googleUserContentRegex = /(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_=]+)/i;
    const fallbackMatch = html.match(googleUserContentRegex);
    if (fallbackMatch && fallbackMatch[1]) {
      return NextResponse.redirect(fallbackMatch[1]);
    }

    // If no image could be extracted, redirect to the default image URL directly
    const DEFAULT_OPTIMIZED_IMAGE = 'https://lh3.googleusercontent.com/d/1lx-Vc726so_n5014MRd1Zu1iyh9zeXGc';
    return NextResponse.redirect(DEFAULT_OPTIMIZED_IMAGE);

  } catch (error: any) {
    console.error('Error in image-proxy Route Handler:', error);
    // On error, fall back to the default image URL to prevent broken images in UI
    const DEFAULT_OPTIMIZED_IMAGE = 'https://lh3.googleusercontent.com/d/1lx-Vc726so_n5014MRd1Zu1iyh9zeXGc';
    return NextResponse.redirect(DEFAULT_OPTIMIZED_IMAGE);
  }
}
