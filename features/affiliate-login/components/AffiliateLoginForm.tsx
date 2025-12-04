"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  affiliateLoginSchema,
  type AffiliateLoginSchema,
} from "@/features/affiliate-login/schemas/affiliateLoginSchema";

import { findByDni } from "@/features/affiliate-login/services/findByDni";

export function AffiliateLoginForm() {
  const router = useRouter();

  const form = useForm<AffiliateLoginSchema>({
    resolver: zodResolver(affiliateLoginSchema),
    defaultValues: { dni: "" },
  });

  const onSubmit = async (values: AffiliateLoginSchema) => {
    try {
      const result = await findByDni(values.dni);

      console.log("Afiliado encontrado y activo", result.affiliateId);
      router.push("/ingreso-afiliado/servicios");
    } catch (error: any) {
      form.setError("dni", { message: error.message });
    }
  };

  return (
    <div className="max-w-md w-full rounded-xl border p-6 shadow-sm bg-white">
      <h1 className="text-xl font-semibold mb-4">Ingreso de Afiliados</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa tu DNI"
                    {...field}
                    inputMode="numeric"
                    maxLength={9}
                  />
                </FormControl>
                <div className="min-h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
}
