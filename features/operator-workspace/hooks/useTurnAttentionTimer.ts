"use client";

import { useEffect, useMemo, useState } from "react";

export type TurnAttentionStatus = "ok" | "warning" | "danger";

interface UseTurnAttentionTimerParams {
  startedAt: Date | string;
  maxMinutes: number;
}

interface UseTurnAttentionTimerResult {
  elapsedSeconds: number;
  elapsedMinutes: number;
  percentage: number;
  status: TurnAttentionStatus;
}

export function useTurnAttentionTimer({
  startedAt,
  maxMinutes,
}: UseTurnAttentionTimerParams): UseTurnAttentionTimerResult {
  const startTimestamp = useMemo(() => {
    return typeof startedAt === "string"
      ? new Date(startedAt).getTime()
      : startedAt.getTime();
  }, [startedAt]);

  const maxSeconds = maxMinutes * 60;

  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    return Math.floor((Date.now() - startTimestamp) / 1000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - startTimestamp) / 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimestamp]);

  const percentage = Math.min(
    Math.round((elapsedSeconds / maxSeconds) * 100),
    100
  );

  const status: TurnAttentionStatus = useMemo(() => {
    if (percentage < 60) return "ok";
    if (percentage < 85) return "warning";
    return "danger";
  }, [percentage]);

  return {
    elapsedSeconds,
    elapsedMinutes: Math.floor(elapsedSeconds / 60),
    percentage,
    status,
  };
}