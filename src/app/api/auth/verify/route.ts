import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true';
    const email = request.cookies.get('admin-email')?.value;

    if (!isAuthenticated || !email) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email,
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Auth verification failed:', err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}