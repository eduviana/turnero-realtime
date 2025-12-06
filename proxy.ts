import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  // "/sign-in(.*)",       // login para las cuentas de la organización
  // "/api/users/sync",    // webhook de Clerk (MUST be PUBLIC)

  //  // Rutas públicas del tótem de turnos:
  // "/ingreso-afiliado(.*)",         // Page para ingresar DNI
  // "/servicios(.*)",                // Page de selección de servicio
  // "/api/affiliate(.*)",            // Validación DNI
  // "/api/services(.*)",             // Listado de servicios
  // "/api/tickets/create",           // Crear ticket


  "/sign-in(.*)",
  "/api/users/sync",
  "/ingreso-afiliado(.*)", // Incluye /servicios
  "/api/affiliate(.*)",
  "/api/services(.*)",
  "/api/tickets/create", // O /api/tickets(.*) si habrá más
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
