import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [
    /^\/newsfeed(\/[a-zA-Z0-9-_]+)?$/, // Allows access to /newsfeed and /newsfeed/* (e.g., /newsfeed/user-profile/123)
    /^\/dashboard\/user(\/[a-zA-Z0-9-_]+)?$/, // Allows access to /dashboard/user and nested routes like /dashboard/user/manage-post
    /^\/newsfeed\/posts(\/[a-zA-Z0-9-_]+)?$/, // Allows access to /newsfeed/posts/:id
    /^\/newsfeed\/userprofile(\/[a-zA-Z0-9-_]+)?$/,
  ],
  admin: [
    /^\/newsfeed(\/[a-zA-Z0-9-_]+)?$/,
    /^\/dashboard\/admin(\/[a-zA-Z0-9-_]+)?$/,
    /^\/dashboard\/admin\/manage-all-post(?:\/[a-zA-Z0-9-_]*)?(?:\?.*)?$/,
    /^\/newsfeed\/posts(\/[a-zA-Z0-9-_]+)?$/,
    /^\/newsfeed\/userprofile(\/[a-zA-Z0-9-_]+)?$/,
  ],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  // console.log("user:", user);

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // authroutes pele sei route a redirect korbe. this condition is necessary otherwise it always redirect to '/' homepage
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url) //if user try to access protected route then redirect to login page also includes the routes pathename that he is trying to access after login it will redirect that path.
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    // Check if the user's role matches the role-based routes.
    const routes = roleBasedRoutes[user?.role as Role]; // Get the routes for that role.

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next(); // Allow access if the user’s role matches the route.
    }
  }

  return NextResponse.redirect(new URL("/", request.url)); // If none of the conditions match, redirect to the home page.
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/newsfeed",
    "/newsfeed/:page*",
    "/dashboard/:page*",
    "/login",
    "/register",
  ],
};
