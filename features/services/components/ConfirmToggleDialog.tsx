"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  serviceName?: string;
  newValue: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmToggleDialog({
  open,
  serviceName,
  newValue,
  onConfirm,
  onCancel
}: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {newValue
              ? "¿Quieres habilitar este servicio?"
              : "¿Quieres deshabilitar este servicio?"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {newValue
              ? `El servicio "${serviceName}" será habilitado inmediatamente.`
              : `El servicio "${serviceName}" será deshabilitado y dejará de recibir nuevos tickets.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}