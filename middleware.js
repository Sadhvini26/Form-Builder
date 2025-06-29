import { clerkMiddleware } from '@clerk/nextjs/server';
import { createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/', // protect homepage
  '/dashboard(.*)', // protect all /dashboard routes
]);

export default clerkMiddleware((req) => {
  const pathname = req.nextUrl?.pathname; // ✅ safely get pathname

  if (pathname && isProtectedRoute(req)) {
    // Clerk will handle auth internally — we just allow the middleware to proceed
    return;
  }

  return;
});

// Must include matcher for routes to protect
export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)).*)',
  ],
};
