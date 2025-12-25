export function formatLastActivity(date: Date | null): string {
  if (!date) return "Sin actividad";

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Hace instantes";

  if (diffMin < 60) {
    return diffMin === 1
      ? "Hace 1 minuto"
      : `Hace ${diffMin} minutos`;
  }

  const diffHr = Math.floor(diffMin / 60);

  return diffHr === 1
    ? "Hace 1 hora"
    : `Hace ${diffHr} horas`;
}