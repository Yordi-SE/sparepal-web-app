import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token: ", req.nextauth.token);

    if (
      (req.nextUrl.pathname == "/suppliers_form" ||
        req.nextUrl.pathname == "/company_detail_form" ||
        req.nextUrl.pathname == "/company_manager_form") &&
      req.nextauth.token?.userData?.user.is_supplier == false
    )
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: [
    "/company_detail_form",
    "/company_manager_form",
    "/suppliers_form",
    "/home",
  ],
};
