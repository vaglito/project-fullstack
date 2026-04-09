import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="bg-muted p-6 rounded-full mb-4">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
      </div>
      <h2 className="text-4xl font-bold tracking-tight">404</h2>
      <h3 className="text-2xl font-semibold tracking-tight text-primary">
        Página no encontrada
      </h3>
      <p className="max-w-md text-muted-foreground">
        Lo sentimos, la página que buscas no existe, ha sido eliminada o no tienes
        permisos para acceder a ella.
      </p>
      <Button className="mt-6">
        <Link href="/dashboard">Volver al Inicio</Link>
      </Button>
    </div>
  );
}