"use server"

import { auth } from "@/auth"

export async function createProjectAction(values: { name: string; description: string }) {
  const session = await auth()

  // Verificamos que exista el usuario y que tengamos su token de acceso
  if (!session?.user || !session.accessToken) {
    return { error: "No autorizado. Debes iniciar sesión." }
  }

  try {
    const res = await fetch("http://localhost:8000/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(values),
    });

    // Si la respuesta no es 2xx, manejamos el error
    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      console.error("Error al crear proyecto en DRF:", errorData)
      return { error: "Ocurrió un error al crear el proyecto en el servidor." }
    }

    return { success: "Proyecto creado exitosamente." }
  } catch (error) {
    console.error("Error de conexión:", error)
    return { error: "No se pudo conectar con el servidor." }
  }
}