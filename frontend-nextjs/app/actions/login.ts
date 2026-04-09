"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function loginAction(values: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/dashboard", // Redirige aquí si es exitoso
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas. Por favor, intenta de nuevo." }
        default:
          return { error: "Ocurrió un error inesperado." }
      }
    }
    // Es obligatorio hacer throw del error si no es un AuthError, 
    // ya que Next.js usa errores lanzados para ejecutar el `redirect()`.
    throw error
  }
}