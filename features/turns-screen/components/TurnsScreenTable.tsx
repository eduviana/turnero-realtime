"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TurnScreenState } from "../types/TurnScreenState";

interface TurnsScreenTableProps {
  state: TurnScreenState;
}

export function TurnsScreenTable({ state }: TurnsScreenTableProps) {
  const { current, history } = state;

  const hasTickets = Boolean(current) || history.length > 0;

  // 👇 más antiguo → más nuevo
  const orderedHistory = [...history].reverse();

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="bg-blue-950">
          <TableRow>
            <TableHead className="text-center text-white text-4xl font-bold py-6">
              Afiliado
            </TableHead>
            <TableHead className="text-right text-white text-4xl font-bold py-6 pr-30">
              Turno
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!hasTickets && (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-2xl py-12">
                No hay turnos en pantalla
              </TableCell>
            </TableRow>
          )}

          {/* Historial (arriba) */}
          {orderedHistory.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <TableCell className="text-center text-4xl font-semibold py-10">
                {ticket.affiliateName}
              </TableCell>

              <TableCell className="text-right pr-30 py-4 text-4xl font-bold text-gray-700">
                {ticket.code}
              </TableCell>
            </TableRow>
          ))}

          {/* Turno actual (abajo, destacado y animado) */}
          {current && (
            <TableRow className="bg-emerald-100 border-b border-gray-200 last:border-b-0 shadow-lg animate-pulse transition-all duration-500">
              <TableCell className="text-center text-5xl font-semibold py-10">
                {current.affiliateName}
              </TableCell>

              <TableCell className="text-right pr-28 py-6 text-emerald-950 text-6xl font-extrabold">
                {current.code}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
