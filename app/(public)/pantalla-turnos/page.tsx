import { getTurnScreenState } from "@/features/turns-screen/services/getTurnScreenState";
import { TurnScreenRealtime } from "@/features/turns-screen/components/TurnScreenRealtime";

export default async function TurnosScreenPage() {
  const state = await getTurnScreenState();

  return (
    <main className="p-8">
      <TurnScreenRealtime initialState={state} />
    </main>
  );
}