"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fingerprint, LogIn } from "lucide-react";

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
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUnregister: false,
  });

  const dniValue = form.watch("dni");
  const error = form.formState.errors.dni;

  const onSubmit = async (values: AffiliateLoginSchema) => {
    try {
      await findByDni(values.dni);

      sessionStorage.setItem("affiliate_dni", values.dni);

      router.push("/ingreso-afiliado/servicios");
    } catch (error: any) {
      form.setError("dni", { message: error.message });

      setTimeout(() => {
        form.clearErrors();
        form.reset({ dni: "" });
      }, 2000);
    }
  };

  const handleKeypadChange = (newValue: string) => {
    form.setValue("dni", newValue, {
      shouldValidate: false,
      shouldTouch: false,
      shouldDirty: true,
    });
  };

  return (
    <>
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-xl p-8 flex flex-col gap-8 z-10 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Ingreso de Afiliados
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingrese su número de documento para continuar
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
            DNI
          </label>
          <div className="relative group">
            <input
              value={dniValue}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 9);
                form.setValue("dni", val, { shouldValidate: false });
              }}
              placeholder=""
              className="w-full bg-background border border-border rounded-lg px-6 py-5 text-3xl font-bold text-foreground text-center focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <Fingerprint className="w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            </div>
          </div>
          {error && (
            <p className="text-sm text-destructive text-center">{error.message}</p>
          )}
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold text-base py-4 rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Ingresar</span>
            <LogIn className="w-5 h-5" />
          </button>
        </form>

        <NumericKeypad value={dniValue} onChange={handleKeypadChange} />

        <p className="text-center text-xs text-muted-foreground/70 italic">
          ¿Problemas con su ingreso?{" "}
          <a className="text-primary font-bold underline" href="#">
            Contacte a soporte
          </a>
        </p>
      </div>
    </>
  );
}
