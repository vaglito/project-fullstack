import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 italic">Welcome to the App</h1>
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Ir al Login
        </Link>
      </div>
    </main>
  );
}
