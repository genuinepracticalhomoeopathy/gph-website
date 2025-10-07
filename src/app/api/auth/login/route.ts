import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user is authorized (you can add email whitelist here)
    const authorizedEmails = [
      'admin@gph.com',
      'admin@genuinepracticalhomoeopathy.com',
      'msm@example.com', // Add your email here
      'your-email@gmail.com' // Replace with your actual email
    ];

    // Temporarily allow any email for testing - REMOVE THIS IN PRODUCTION
    const allowAnyEmail = true;

    if (!allowAnyEmail && !authorizedEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Set simple authentication cookies
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          email: email
        }
      },
      { status: 200 }
    );

    // Production-friendly cookie settings
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax' as const, // 'lax' works for both production and development
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/', // Ensure cookies are available site-wide
    };

    response.cookies.set('admin-authenticated', 'true', cookieOptions);
    response.cookies.set('admin-email', email, cookieOptions);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}