import Link from "next/link";
import { Card } from "@/components/ui/card";
import { OperatorServiceCard } from "../types/operator";

interface ServiceCardProps {
  service: OperatorServiceCard;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const serviceIcons: Record<string, string> = {
    AC: "🩺",
    PF: "💳",
    // ST: "🛠️",
    AF: "🧾",
    AP: "⭐️",
    FM: "💊",
    FG: "🧴",
  };

  return (
    <Link href={service.href} className="group">
      <Card
        className="
      h-64
      rounded-2xl
      border
      bg-white
      shadow-md
      transition-all
      duration-200
      hover:shadow-lg
    "
      >
        <div
          className="
        flex
        h-full
        flex-col
        items-center
        justify-center
        gap-6
        p-6
        text-center
      "
        >
          {/* Grupo compacto: icono + nombre */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl leading-none" aria-hidden="true">
              {serviceIcons[service.code] ?? "🟦"}
            </div>

            <p className="text-2xl font-semibold leading-tight">
              {service.serviceName}
            </p>
          </div>

          {/* Descripción (separada por gap del contenedor padre) */}
          {service.description && (
            <p className="text-sm text-muted-foreground max-w-xs">
              {service.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
