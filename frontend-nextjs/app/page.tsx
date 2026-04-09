import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Layout, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Bienvenido a tu <br className="hidden sm:inline" />
                  <span className="text-primary">Nueva Plataforma</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                  Gestiona tus proyectos, colabora con tu equipo y alcanza tus metas con nuestra herramienta integral diseñada para potenciar tu productividad.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/registro"
                  className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto gap-2")}
                >
                  Comenzar ahora <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="w-full py-12 md:py-24 bg-background flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Rápido y Eficiente</h3>
                <p className="text-muted-foreground text-sm">
                  Diseñado para ofrecer un rendimiento excepcional en todas tus tareas diarias.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Interfaz Intuitiva</h3>
                <p className="text-muted-foreground text-sm">
                  Una experiencia de usuario limpia y moderna que facilita la gestión.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seguro y Confiable</h3>
                <p className="text-muted-foreground text-sm">
                  Tus datos están protegidos con los más altos estándares de seguridad y encriptación.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
