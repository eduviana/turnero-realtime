import Link from "next/link";
import { OperatorServiceCard } from "../types/operator";

interface ServiceCardProps {
  service: OperatorServiceCard;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const serviceIcons: Record<string, string> = {
    AC: "🩺",
    PF: "💳",
    AF: "🧾",
    AP: "⭐️",
    FM: "💊",
    FG: "🧴",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg group h-full">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-3xl leading-none" aria-hidden="true">
            {serviceIcons[service.code] ?? "🟦"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3">
          {service.serviceName}
        </h3>

        {service.description && (
          <p className="text-sm text-slate-500">
            {service.description}
          </p>
        )}
      </div>

      <Link
        href={service.href}
        className="w-full py-3 px-6 bg-[#1e293b] text-white font-semibold text-sm rounded-lg hover:bg-[#1e293b]/90 transition-all active:scale-[0.98] shadow-sm text-center"
      >
        Acceder
      </Link>
    </div>
  );
}
