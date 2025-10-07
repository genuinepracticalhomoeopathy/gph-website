import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const cookies = request.cookies.getAll();
    const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true';

    return NextResponse.json({
        environment: process.env.NODE_ENV,
        url: request.url,
        host: request.headers.get('host'),
        protocol: request.headers.get('x-forwarded-proto') || 'http',
        isAuthenticated,
        cookies: cookies.map(c => ({
            name: c.name,
            value: c.value
        })),
        headers: {
            userAgent: request.headers.get('user-agent'),
            referer: request.headers.get('referer'),
            cookie: request.headers.get('cookie')
        }
    });
}
