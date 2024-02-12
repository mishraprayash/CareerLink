

import { NextResponse } from 'next/server';
import { decodeJWTCompany, decodeJWTAdmin } from './helpers/validateToken';

// import { rateLimiter } from './helpers/rateLimiter';

// const publicRoutes = ['/', '/explore', '/login', '/register', '/api/admin/', '/api/admin/register', '/api/company/login', '/api/company/login'];


// we can add the remaining routes on the client side here to apply middleware. 

const adminLoggedInRoutes = [
  '/api/admin/new/accept',
  '/api/admin/new/reject',
  '/api/admin/pendingadmins',
  '/api/admin/pendingcompanies',
  '/api/admin/pendinginternships',
  '/api/admin/changepassword',
  '/api/admin/sendverificationlink'
]

const adminLoggedOutRoutes = [
  '/api/admin/forgotpassword',
  '/api/admin/login',
  '/api/admin/register',
  '/api/admin/resetpassword',
  '/api/admin/verifyemail'
]

const companyLoggedInRoutes = [
  '/api/company/createinternships',  // email verification needed for this
  '/api/company/runninginternships',
  '/api/company/pendinginternships',
  '/api/company/sendverificationlink',
  '/api/company/updateprofile',
  '/api/company/changepassword',
       // email verification needed for this
]

const companyLoggedOutRoutes = [
  '/api/company/forgotpassword',
  '/api/company/login',
  '/api/company/register',
  '/api/company/resetpassword',
  '/api/company/verifyemail'
]

// remaining for handling student route
const studentRoutes = ['/student/:path*', '/api/student/:path*','/profile']

export async function middleware(request) {

  const { pathname } = request.nextUrl;
  // console.log("Pathname:", pathname);

  // const rateLimiterResponse = await rateLimiter(request);
  // if (typeof rateLimiterResponse !== Boolean && rateLimiterResponse !== true) {
  //   return rateLimiterResponse;
  // }



  // validating the routing path
  if (!adminLoggedInRoutes.includes(pathname) && !studentRoutes.includes(pathname) && !companyLoggedInRoutes.includes(pathname)) {
    return NextResponse.next();
  }


  if (adminLoggedInRoutes.includes(pathname)) {
    // decoding the token from the cookies
    const decodedToken = await decodeJWTAdmin(request);
    
    if (!decodedToken ||  decodedToken.role!=="Admin") {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    return NextResponse.next();
  }


  if (companyLoggedInRoutes.includes(pathname)) {

    const decodedToken = await decodeJWTCompany(request);

    if (!decodedToken || decodedToken.role !== "Company") {
      return NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
    }
    return NextResponse.next();

  }
  if (studentRoutes.includes(pathname)) {

    const nextAuthToken = request.cookies.get('next-auth.session-token');
    if (!nextAuthToken) {
      // Send JSON response for unauthenticated user
      const jsonResponse = NextResponse.json({ msg: "Unauthenticated User" }, { status: 403 });
  
      // Redirect after the delay
      return NextResponse.redirect(new URL('/loginCompany', request.url));
    }
    return NextResponse.next();
  }
}



