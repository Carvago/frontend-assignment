import {NextRequest, NextResponse} from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];
const DEFAULT_AUTHENTICATED_ROUTE = '/todos';
const DEFAULT_UNAUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const {pathname} = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_ROUTE, request.url));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_UNAUTHENTICATED_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icons|logo.svg).*)'],
};
