import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-that-is-very-long-and-secure'
);

const COOKIE_NAME = 'admin_token';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin paths, except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify JWT
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      const loginUrl = new URL('/admin/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // If visiting login while already authenticated, redirect to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        const dashboardUrl = new URL('/admin/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
      } catch (error) {
        // Continue to login page if token is invalid
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
