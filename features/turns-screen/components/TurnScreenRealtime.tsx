"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/client";

import { TurnScreenState } from "../types/TurnScreenState";
import { TurnsScreenTable } from "./TurnsScreenTable";

interface TurnScreenRealtimeProps {
  initialState: TurnScreenState;
}

export function TurnScreenRealtime({
  initialState,
}: TurnScreenRealtimeProps) {
  const [state, setState] = useState<TurnScreenState>(initialState);

  useEffect(() => {
    const channel = pusherClient.subscribe("turn-screen");

    const handleUpdate = async () => {
      try {
        const res = await fetch("/api/turn-screen", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const nextState: TurnScreenState = await res.json();
        setState(nextState);
      } catch (err) {
        console.error("[TurnScreenRealtime] update failed", err);
      }
    };

    channel.bind("updated", handleUpdate);

    return () => {
      channel.unbind("updated", handleUpdate);
      pusherClient.unsubscribe("turn-screen");
    };
  }, []);

  return <TurnsScreenTable state={state} />;
}