import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const isStaticAsset = url.pathname.match(/\.(css|js|jpg|png|gif|svg|woff|woff2)$/);
  const userSession = request.cookies.get('userSession');
  const noRedirection = url.pathname.includes('/login') || url.pathname.includes('/signup');
  // If it's a static asset, allow the request to continue
  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Don't redirect if already on the login page
  if (noRedirection) {
    const res = NextResponse.next();
    res.cookies.set({
        name: 'userSession',
        value: "xxxxxxxxxxxx",
        httpOnly: true,
        maxAge: 36000,  // expires in 10 seconds
    })
    return res;
  }

  // Redirect to login if the user is not authenticated
  // if (!userSession) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}
