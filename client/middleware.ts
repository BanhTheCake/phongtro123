import { NextRequest, NextResponse } from 'next/server';
import { CHECK_AUTH } from './constants/api';

export async function middleware(req: NextRequest) {
    console.log('ran: ', req.nextUrl.pathname);
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const data = await fetch(CHECK_AUTH, {
        headers: {
            cookie: `refreshToken=${refreshToken}`,
        },
        credentials: 'include',
    });

    if (req.nextUrl.pathname.startsWith('/login') && data.status !== 200) {
        return;
    }

    if (req.nextUrl.pathname.startsWith('/login') && data.status === 200) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (data.status !== 200) {
        const url = ['/login', `prevRoute=${req.nextUrl.pathname}`].join('?');
        return NextResponse.redirect(new URL(url, req.url));
    }

    const response = NextResponse.next();
    return response;
}

export const config = {
    matcher: ['/system/:path*', '/login'],
};
