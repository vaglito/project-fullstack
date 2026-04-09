"use client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginAction } from "@/app/actions/login";

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

// 1. Definimos el esquema de validación seguro
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, ingresa un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
});

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 2. Inicializamos el formulario
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Manejador del envío (submit)
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(""); // Limpiamos errores previos

    // Usamos startTransition para marcar el estado como pendiente mientras la Server Action se ejecuta
    startTransition(() => {
      loginAction(values).then((data) => {
        if (data?.error) {
          form.reset(); // Opcional: limpiar la contraseña
          setError(data.error);
        }
      });
      // No necesitamos manejar el "éxito" aquí porque Auth.js hará un redirect automático
    });
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo y contraseña para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="ejemplo@correo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="p-3 text-sm font-medium bg-destructive/15 text-destructive rounded-md">
                {error}
              </div>
            )}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/registro"
            className="text-primary hover:underline font-medium"
          >
            Registrate
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
