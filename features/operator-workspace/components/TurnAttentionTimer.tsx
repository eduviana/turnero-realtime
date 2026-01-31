"use client";

import { useTurnAttentionTimer } from "../hooks/useTurnAttentionTimer";

interface Props {
  startedAt: Date | string;
  maxMinutes: number;
}

export function TurnAttentionTimer({ startedAt, maxMinutes }: Props) {
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
