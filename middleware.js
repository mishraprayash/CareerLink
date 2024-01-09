import { NextResponse } from 'next/server'


const publicRoutes = ['/', '/explore', '/login', '/register', '/api/admin/login', '/api/admin/register','/api/common/companies','/api/common/explore','/api/company/login','/api/company/register','/api/company/forgotpassword','/api/company/resetpassword'];

// const adminRoutes = ['/admin/:path*']
// const companyRoutes = ['/company/:path*']
// const studentRoutes = ['/student/:path*']



/*handled only for JWT token for admin and company
havenot actually authenticated as which user is admin or company or student*/

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.json({ msg: "Unauthenticated User from middleware" }, { status: 400 });
  }
  return NextResponse.next();

}


// export const config = {
//   matcher: ['/']
// }