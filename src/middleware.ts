import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page from the check
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for Firebase authentication cookies
    const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true';

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};