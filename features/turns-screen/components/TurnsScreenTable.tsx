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

  const orderedHistory = [...history].reverse();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Table>
          <TableHeader className="bg-blue-950">
            <TableRow>
              <TableHead className="w-1/2 text-center text-white text-4xl font-bold py-4">
                Afiliado
              </TableHead>
              <TableHead className="w-1/2 text-center text-white text-4xl font-bold py-4">
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

            {orderedHistory.map((ticket) => (
              <TableRow
                key={ticket.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <TableCell className="text-center text-4xl font-semibold py-9 w-1/2">
                  {ticket.affiliateName}
                </TableCell>

                <TableCell className="text-center text-4xl font-bold text-gray-700 py-9 w-1/2">
                  {ticket.code}
                </TableCell>
              </TableRow>
            ))}

            {current && (
              <TableRow className="bg-emerald-100 border-b border-gray-200 last:border-b-0 shadow-lg animate-pulse transition-all duration-500">
                <TableCell className="text-center text-5xl font-semibold py-9 w-1/2">
                  {current.affiliateName}
                </TableCell>

                <TableCell className="text-center text-emerald-950 text-6xl font-extrabold py-9 w-1/2">
                  {current.code}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
