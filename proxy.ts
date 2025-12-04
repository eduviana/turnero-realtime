import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",       // login público
  "/api/users/sync",    // webhook de Clerk (MUST be PUBLIC)
]);

export default clerkMiddleware(async (auth, req) => {
  // Si NO es pública, protegemos la ruta
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run Clerk middleware for API routes
    "/(api|trpc)(.*)",
  ],
};