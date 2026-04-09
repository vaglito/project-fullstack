import { LoginForm } from "@/components/auth/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Gestor de Proyectos",
  description: "Ingresa a tu cuenta para gestionar tus proyectos de manera profesional.",
}

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center py-10 transition-opacity duration-1000 animate-in fade-in">
      <LoginForm />
    </div>
  )
}
