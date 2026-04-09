"use server"

export async function registerAction(values: {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  try {
    const res = await fetch("http://localhost:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { error: errorData?.detail || "Ocurrió un error al registrar el usuario. Verifica los datos o intenta con otro correo/usuario." };
    }

    return { success: true };
  } catch (error) {
    return { error: "No se pudo conectar con el servidor." };
  }
}