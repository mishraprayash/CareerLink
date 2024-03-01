

import { NextResponse } from 'next/server';
import { decodeJWTCompany, decodeJWTAdmin } from './helpers/validateToken';

// import { rateLimiter } from './helpers/rateLimiter';
import {
  loggedOutOnlyClientRoutes,
  adminLoggedInAPIRoutes,
  adminLoggedInClientRoutes,
  adminLoggedOutAPIRoutes,
  adminLoggedOutClientRoutes,
  companyLoggedInAPIRoutes,
  companyLoggedInClientRoutes,
  companyLoggedOutAPIRoutes,
  studentLoggedInAPIRoutes,
} from './routes'


export async function middleware(request) {

  const { pathname } = request.nextUrl;
  console.log("Pathname:", pathname);

  // const rateLimiterResponse = await rateLimiter(request);
  // if (typeof rateLimiterResponse !== Boolean && rateLimiterResponse !== true) {
  //   return rateLimiterResponse;
  // }


  const adminToken = !!request.cookies.get('token') && !!request.cookies.get('admin');
  const companyToken = !!request.cookies.get('token') && !!request.cookies.get('company');
  const nextAuthToken = !!request.cookies.get('next-auth.session-token');

  console.log(adminToken, companyToken, nextAuthToken);

  if (!adminToken && !companyToken && !nextAuthToken) {

    // handling for client loggedIn routes in case no any cookies is there.
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    }
    // if no any token no any loggedIn API routes/endpoints are allowed to accessed.
    if (adminLoggedInAPIRoutes.includes(pathname) ||
      companyLoggedInAPIRoutes.includes(pathname) ||
      studentLoggedInAPIRoutes.includes(pathname)) {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (nextAuthToken) {

    // handling unauthorized api routes
    if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/company')) {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    // handling client side routes
    if (loggedOutOnlyClientRoutes.includes(pathname) || pathname.startsWith('/admin') || pathname.startsWith('/dashboard/company')) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
    }
    else {
      NextResponse.next();
    }
  }
  else if (companyToken) {
    const decodedToken = await decodeJWTCompany(request);
    if (decodedToken === null) {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    if (loggedOutOnlyClientRoutes.includes(pathname) || pathname.startsWith('/admin') || pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
    }
    if (companyLoggedOutAPIRoutes.includes(pathname)) {
      return NextResponse.json({ msg: "Not Allowed while logged In" }, { status: 403 });
    }
    return NextResponse.next();
  }
  else if (adminToken) {
    const decodedToken = await decodeJWTAdmin(request);
    if (decodedToken === null) {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    // not allowed routes while logged in
    if (loggedOutOnlyClientRoutes.includes(pathname) || pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl.origin));
    }
  }
  else {
    return NextResponse.next();
  }
}




