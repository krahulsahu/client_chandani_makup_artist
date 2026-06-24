import { NextRequest, NextResponse } from 'next/server';
import { generateQRCode } from '@/lib/qrcode';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const dataUrl = await generateQRCode(url);
    
    // Strip header to retrieve raw base64 payload
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="review_qrcode.png"',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error: any) {
    console.error('QR Code API route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
