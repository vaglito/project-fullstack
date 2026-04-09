import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      <Sidebar />

      {/* Área Principal */}
      <div className="flex flex-1 flex-col">
        <Header />

        {/* Contenido de la Página */}
        <MainContent>{children}</MainContent>
      </div>
    </div>
  )
}