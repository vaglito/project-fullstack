"use client"
import Link from "next/link"
import { LayoutDashboard, Settings, Users, FolderPlus } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40 p-4">
      <div className="flex h-14 items-center border-b px-2 mb-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Mi Aplicación</span>
        </Link>
      </div>
      <nav className="grid gap-2 text-sm font-medium">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link href="/dashboard/project" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <FolderPlus className="h-4 w-4" />
          Crear Proyecto
        </Link>
        <Link href="/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Users className="h-4 w-4" />
          Usuarios
        </Link>
        <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Settings className="h-4 w-4" />
          Configuración
        </Link>
      </nav>
    </aside>
  )
}