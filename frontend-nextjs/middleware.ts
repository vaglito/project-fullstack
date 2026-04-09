import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Definimos las rutas que serán públicas y no requieren autenticación
const publicRoutes = ["/login", "/registro", "/"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);

  // 1. Si el usuario NO está logueado y la ruta NO es pública -> Redirigir al login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. Si el usuario SÍ está logueado e intenta acceder al login o registro -> Redirigir al dashboard
  if (isLoggedIn && (pathname === "/login" || pathname === "/registro")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  // El matcher define en qué rutas se ejecutará este Middleware.
  // La expresión regular ignora las rutas de la API, archivos estáticos e imágenes.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
