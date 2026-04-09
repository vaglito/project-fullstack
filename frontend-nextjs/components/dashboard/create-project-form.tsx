"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createProjectAction } from "@/app/actions/create-project"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projectSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres." }),
})

export function CreateProjectForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    setError("")
    setSuccess("")
    
    startTransition(() => {
      createProjectAction(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data?.success) {
            setSuccess(data.success)
            form.reset() // Limpia el formulario tras el éxito
          }
        })
    })
  }

  return (
    <Card className="w-full max-w-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crear Nuevo Proyecto</CardTitle>
        <CardDescription>
          Completa los detalles a continuación para registrar un proyecto en el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Proyecto</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Ej. Rediseño del sitio web" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      disabled={isPending} 
                      placeholder="Describe los objetivos y alcance del proyecto..." 
                      className="resize-none h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="p-3 text-sm font-medium bg-destructive/15 text-destructive rounded-md">{error}</div>}
            {success && <div className="p-3 text-sm font-medium bg-emerald-500/15 text-emerald-500 rounded-md">{success}</div>}
            <Button disabled={isPending} type="submit">
              {isPending ? "Creando..." : "Crear Proyecto"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}