"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceQueueState } from "../types/ServiceQueueState";
import { TurnQueueAction } from "../types/TurnQueueAction";
import { pusherClient } from "@/lib/pusher/client";

interface UseTurnQueueResult {
  state: ServiceQueueState | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  callNext: () => Promise<void>;
  actOnCurrent: (action: TurnQueueAction) => Promise<void>;
}

export function useTurnQueue(serviceId: string): UseTurnQueueResult {

  const [state, setState] = useState<ServiceQueueState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const channelRef = useRef<ReturnType<typeof pusherClient.subscribe> | null>(
    null
  );

  const fetchState = useCallback(async () => {
    if (!serviceId) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/turn-queue/${serviceId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Error fetching queue state");
      }

      const data: ServiceQueueState = await res.json();
      setState(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      console.error("[useTurnQueue] fetchState error", message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId]);

  const callNext = useCallback(async () => {
    if (!serviceId) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `/api/turn-queue/${serviceId}/call-next`,
        { method: "POST" }
      );

      if (!res.ok) {
        throw new Error("No se pudo llamar al siguiente turno");
      }

      await fetchState();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      console.error("[useTurnQueue] callNext error", message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [serviceId, fetchState]);

  const actOnCurrent = useCallback(
    async (action: TurnQueueAction) => {
      if (!serviceId) return;

      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `/api/turn-queue/${serviceId}/current`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
          }
        );

        if (!res.ok) {
          throw new Error("No se pudo actualizar el turno");
        }

        await fetchState();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";
        console.error("[useTurnQueue] actOnCurrent error", message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [serviceId, fetchState]
  );

  // 🔔 Pusher
  useEffect(() => {
    if (!serviceId) return;

    const channelName = `turn-queue-${serviceId}`;
    const channel = pusherClient.subscribe(channelName);
    channelRef.current = channel;

    channel.bind("updated", fetchState);

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        pusherClient.unsubscribe(channelName);
        channelRef.current = null;
      }
    };
  }, [serviceId, fetchState]);

  // Carga inicial
  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return {
    state,
    isLoading,
    error,
    refresh: fetchState,
    callNext,
    actOnCurrent,
  };
}