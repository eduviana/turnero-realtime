import { X, Eye, Calendar, User, Globe, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuditLogRow } from "../types/audit";

interface AuditDetailModalProps {
  open: boolean;
  onClose: () => void;
  audit: AuditLogRow | null;
}

/**
 * Estilos por tipo de evento
 */
const EVENT_TYPE_BADGE_CLASS: Record<AuditLogRow["eventType"], string> = {
  SECURITY: "bg-red-100 text-red-700 border-red-200",
  SYSTEM: "bg-blue-100 text-blue-700 border-blue-200",
  FUNCTIONAL: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function AuditDetailModal({
  open,
  onClose,
  audit,
}: AuditDetailModalProps) {
  if (!open || !audit) return null;

  const formattedDate = audit.createdAt;

  const metadataJson = audit.metadata
    ? JSON.stringify(audit.metadata, null, 2)
    : null;

  const handleCopyMetadata = async () => {
    if (!metadataJson) return;
    await navigator.clipboard.writeText(metadataJson);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border-0 bg-foreground shadow-2xl outline outline-1 outline-slate-900 ml-32 animate-in fade-in zoom-in duration-300">
        {/* ================= Header ================= */}
        <div className="relative flex items-center justify-between bg-foreground px-6 py-6">
          <div className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Detalle de auditoría
            </h2>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-white transition-opacity hover:opacity-70"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ================= Content ================= */}
        <div className="bg-white space-y-8 p-6">
          {/* Grid principal */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Fecha */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                Fecha y hora
              </span>
              <div className="flex items-center gap-2 font-medium text-slate-700 ">
                <Calendar className="h-4 w-4 text-primary" />
                {formattedDate}
              </div>
            </div>

            {/* Usuario */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                Usuario
              </span>
              <div className="flex items-center gap-2 font-medium text-slate-700 ">
                <User className="h-4 w-4 text-primary" />
                {audit.actorEmail ?? "—"}
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-1 flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                Tipo de evento
              </span>
              <Badge
                variant="outline"
                className={`w-fit text-xs font-bold ${EVENT_TYPE_BADGE_CLASS[audit.eventType]}`}
              >
                {audit.eventType}
              </Badge>
            </div>

            {/* Acción */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                Acción
              </span>
              <div className="font-mono text-sm font-bold text-slate-700 ">
                {audit.action}
              </div>
            </div>

            {/* IP */}
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                Dirección IP
              </span>
              <div className="flex items-center gap-2 font-mono text-sm text-slate-700 ">
                <Globe className="h-4 w-4 text-slate-400" />
                {audit.ip ?? "—"}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 ">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400 ">
              Detalle del mensaje
            </span>
            <p className="text-lg font-medium leading-relaxed text-slate-800 ">
              {audit.summary}
            </p>
          </div>

          {/* Metadata */}
          {metadataJson && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Metadatos estructurados
                </span>
                <button
                  onClick={handleCopyMetadata}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary transition hover:text-blue-600"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copiar JSON
                </button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm leading-relaxed">
                <code className="font-mono text-indigo-300">
                  {metadataJson}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
