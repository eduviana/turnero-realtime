"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, UserX, X } from "lucide-react";
import { TicketStatus } from "@/generated/prisma/enums";
import { useTurnAttentionTimer } from "@/features/operator-workspace/hooks/useTurnAttentionTimer";

interface OperatorTurnSidebarProps {
  serviceCode: string;
  currentTicketCode: string | null;
  currentTicketStatus: TicketStatus | null;
  currentTicketStartedAt: string | null;
  pendingCount: number;
  isLoading: boolean;
  error: string | null;
  onCallNext: () => void;
  onStart: () => void;
  onComplete: () => void;
  onNoShow: () => void;
  onCancel: () => void;
  canComplete?: boolean;
}

function TimerBar({
  startedAt,
  maxMinutes,
}: {
  startedAt: string;
  maxMinutes: number;
}) {
  const { elapsedMinutes, elapsedSeconds, percentage, status } =
    useTurnAttentionTimer({ startedAt, maxMinutes });

  const colorClass =
    status === "ok"
      ? "bg-emerald-500"
      : status === "warning"
        ? "bg-yellow-400"
        : "bg-red-500";

  const textClass =
    status === "ok"
      ? "text-emerald-700"
      : status === "warning"
        ? "text-yellow-700"
        : "text-red-700";

  const minutes = elapsedMinutes;
  const seconds = elapsedSeconds % 60;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          Tiempo de atención
        </span>
        <span className={`text-xs font-semibold ${textClass}`}>
          {minutes}:{seconds.toString().padStart(2, "0")} / {maxMinutes}:00
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function OperatorTurnSidebar({
  serviceCode,
  currentTicketCode,
  currentTicketStatus,
  currentTicketStartedAt,
  pendingCount,
  isLoading,
  error,
  onCallNext,
  onStart,
  onComplete,
  onNoShow,
  onCancel,
  canComplete = true,
}: OperatorTurnSidebarProps) {
  const isIdle = !currentTicketCode;
  const isInProgress = currentTicketStatus === TicketStatus.IN_PROGRESS;
  const canStart = currentTicketStatus === TicketStatus.CALLED;

  return (
    <aside className="w-80 flex flex-col gap-8 border-r border-slate-200 bg-white px-8 py-6 shrink-0">
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          TURNOS &middot; {serviceCode}
        </span>
        <div className={isInProgress ? "" : "invisible"}>
          <Badge className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            EN ATENCIÓN
          </Badge>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-slate-500">Turno actual</p>
        <p className="text-4xl font-bold tracking-tight">
          {currentTicketCode ?? "—"}
        </p>
      </div>

      {isIdle ? (
        <Button
          className="w-full"
          disabled={isLoading || pendingCount === 0}
          onClick={onCallNext}
        >
          Llamar siguiente
        </Button>
      ) : (
        <div className="space-y-4">
          {canStart && (
            <Button className="w-full" disabled={isLoading} onClick={onStart}>
              Iniciar atención
            </Button>
          )}

          <div className={isInProgress ? "" : "invisible pointer-events-none"}>
            <Button
              className="w-full py-6 font-bold flex gap-2"
              disabled={isLoading || !canComplete}
              onClick={onComplete}
            >
              <CheckCircle2 className="h-5 w-5" />
              Finalizar turno
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              disabled={isLoading || isIdle}
              onClick={onNoShow}
              variant="outline"
            >
              <UserX className="h-4 w-4 mr-1" />
              Ausente
            </Button>
            <Button
              disabled={isLoading || isIdle}
              onClick={onCancel}
              variant="destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className={isInProgress && currentTicketStartedAt ? "" : "invisible"}>
        <TimerBar
          startedAt={currentTicketStartedAt ?? new Date().toISOString()}
          maxMinutes={12}
        />
      </div>
    </aside>
  );
}
