

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

  if (nextAuthToken) {
    if (loggedOutOnlyClientRoutes.includes(pathname) || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
    }
    else {
      NextResponse.next();
    }
  }
  else if (companyToken) {

    const decodedToken = await decodeJWTCompany(request);
    if (decodedToken != null) {
      if (loggedOutOnlyClientRoutes.includes(pathname) || pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin));
      }
      if (companyLoggedOutAPIRoutes.includes(pathname)) {
        return NextResponse.json({ msg: "Not Allowed while logged In" }, { status: 403 });
      }
      return NextResponse.next();
    }
    else {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
  }

  else if (adminToken) {

    const decodedToken = await decodeJWTAdmin(request);
    if (decodedToken != null) {
      // if (loggedOutOnlyClientRoutes.includes(pathname) || !pathname.startsWith('/admin')) {
      //   return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl.origin));
      // }
      if (adminLoggedOutAPIRoutes.includes(pathname)) {
        return NextResponse.json({ msg: "Not allowed while logged in" }, { status: 403 });
      }
      return NextResponse.next();
    }
    else {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
  }
  else {
    return NextResponse.next();
  }

}



