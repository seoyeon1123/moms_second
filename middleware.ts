import getSession from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrl: IRoutes = {
  '/': true,
  '/login': true,
  '/account/signup': true,
  '/account/find-password': true,
  '/account/find-username': true,
};

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  const isPublicOnly = publicOnlyUrl[pathname];

  // 세션이 없는 경우
  if (!session?.id) {
    if (!isPublicOnly) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  // 세션이 있는 경우
  else {
    if (isPublicOnly) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // 기본적으로 요청을 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
