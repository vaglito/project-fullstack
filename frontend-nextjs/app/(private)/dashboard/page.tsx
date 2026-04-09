import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { auth } from "@/auth";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Folder } from "lucide-react";

async function getProjects(accessToken: string) {
  try {
    const res = await fetch("http://localhost:8000/api/projects/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store", // Evita cachear para siempre mostrar los proyectos más recientes
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return [];
  }
}

export default async function DashboardPage() {
  // Protección de ruta a nivel de página (aunque es recomendable usar Middleware)
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const isAdmin = session.user.groups.includes("admin");
  const projects = await getProjects(session.accessToken as string);

  return (
    <main className="container py-10 px-4 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bienvenido, {session.user.email}
        </h1>
        <p className="text-muted-foreground">
          Aquí tienes el resumen de tu cuenta según tu rol de{" "}
          {isAdmin ? "administrador" : "usuario"}.
        </p>
      </div>

      {/* Renderizado condicional basado en el rol */}
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}

      {/* Listado de proyectos común para todos los roles */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Mis Proyectos</h2>
        
        {projects.length === 0 ? (
          <p className="text-muted-foreground">
            No tienes proyectos creados aún.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
