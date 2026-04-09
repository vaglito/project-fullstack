import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function UserDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Mi Actividad</CardTitle>
          <CardDescription>Resumen de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Has completado 3 tareas esta semana. ¡Sigue así!
          </p>
          <Button variant="outline">Ver mis tareas</Button>
        </CardContent>
      </Card>
    </div>
  )
}
