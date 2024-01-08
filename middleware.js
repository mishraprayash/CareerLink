import { NextResponse } from 'next/server'


// const publicRoutes = ['/', '/explore', '/login', '/register'];

// const adminRoutes = ['/admin/:path*']
// const companyRoutes = ['/company/:path*']
// const studentRoutes = ['/student/:path*']


export async function middleware(request) {
  // const { pathname } = request.nextUrl;
  // const nexttoken = request.cookies.get('next-auth.session-token') || "";
  // const token = request.cookies.get('token') || "";
  return NextResponse.next();

}
export const config = {
  matcher: ['/']
}