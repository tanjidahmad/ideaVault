import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // LOGIN NA THAKLE
  if (!session) {

    // current path save korbe
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "redirect",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/add-idea",
    "/my-ideas",
    "/my-interactions",
    "/profile",
    "/ideas/:path",
  ],
};