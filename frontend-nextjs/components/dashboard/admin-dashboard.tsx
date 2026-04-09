import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Panel de Administración</CardTitle>
          <CardDescription>Visión global del sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Tienes 5 nuevos usuarios pendientes de aprobación y 2 reportes de sistema.
          </p>
          <Button variant="default">Gestionar Usuarios</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Métricas</CardTitle>
          <CardDescription>Tráfico de los últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Aquí podrías incluir un gráfico de Recharts (también soportado por shadcn) */}
          <div className="text-2xl font-bold">+23.5%</div>
        </CardContent>
      </Card>
    </div>
  )
}
