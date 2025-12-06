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
import { NumericKeypad } from "./NumericKeypad";

export function AffiliateLoginForm() {
  const router = useRouter();

  const form = useForm<AffiliateLoginSchema>({
    resolver: zodResolver(affiliateLoginSchema),
    defaultValues: { dni: "" },
    mode: "onSubmit", // validar SOLO al enviar
    reValidateMode: "onSubmit", // no revalidar mientras se escribe
    shouldUnregister: false,
  });

  const dniValue = form.watch("dni");

  const onSubmit = async (values: AffiliateLoginSchema) => {
    try {
      const result = await findByDni(values.dni);

      sessionStorage.setItem("affiliate_dni", values.dni);

      router.push("/ingreso-afiliado/servicios");
    } catch (error: any) {
      form.setError("dni", { message: error.message });

      // Luego de 2s limpiamos todo y dejamos el form como nuevo
      setTimeout(() => {
        form.clearErrors();
        form.reset({ dni: "" }); // resetea el form COMPLETO
      }, 2000);
    }
  };

  /** Maneja los cambios del keypad (solo actualiza el valor, sin validar) */
  const handleKeypadChange = (newValue: string) => {
    form.setValue("dni", newValue, {
      shouldValidate: false,
      shouldTouch: false,
      shouldDirty: true,
    });
  };

  return (
    <div className="max-w-lg w-full rounded-xl border p-6 shadow-sm bg-white">
      <h1 className="text-4xl font-semibold mb-12 text-center">
        Ingreso de Afiliados
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">DNI</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="Ingresa tu DNI"
                    className=" text-4xl! placeholder:text-xl h-20 px-6"
                  />
                </FormControl>
                <div className="min-h-5">
                  <FormMessage  className="text-xl"/>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-18 text-2xl">
            Ingresar
          </Button>
        </form>
      </Form>

      <NumericKeypad value={dniValue} onChange={handleKeypadChange} />
    </div>
  );
}
