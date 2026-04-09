import { RegisterForm } from "@/components/auth/register-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registro | Gestor de Proyectos",
  description: "Ingresa a tu cuenta para gestionar tus proyectos de manera profesional.",
}


export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </div>
  )
}