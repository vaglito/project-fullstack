"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerAction } from "@/app/actions/register";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

// Definimos el esquema de validación mapeado a tu backend
const registerSchema = z.object({
  first_name: z.string().min(1, { message: "El nombre es obligatorio." }),
  last_name: z.string().min(1, { message: "El apellido es obligatorio." }),
  username: z.string().min(3, { message: "El usuario debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, ingresa un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerAction(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          setSuccess("Registro exitoso. Redirigiendo al login...");
          // Redirigir al login después de un breve momento
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-lg shadow-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Crear una Cuenta</CardTitle>
        <CardDescription>
          Ingresa tus datos para registrarte en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder="Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField control={form.control} name="username" render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl><Input disabled={isPending} placeholder="juanperez123" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl><Input disabled={isPending} type="email" placeholder="ejemplo@correo.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl><Input disabled={isPending} type="password" placeholder="******" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            {error && <div className="p-3 text-sm font-medium bg-destructive/15 text-destructive rounded-md">{error}</div>}
            {success && <div className="p-3 text-sm font-medium bg-emerald-500/15 text-emerald-500 rounded-md">{success}</div>}
            
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Inicia sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}