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

  if (diffHr < 24) {
    return diffHr === 1
      ? "Hace 1 hora"
      : `Hace ${diffHr} horas`;
  }

  const diffDays = Math.floor(diffHr / 24);

  if (diffDays < 7) {
    const remainingHr = diffHr % 24;
    if (remainingHr === 0) {
      return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
    }
    const hrLabel = remainingHr === 1 ? "1 hora" : `${remainingHr} horas`;
    return `Hace ${diffDays === 1 ? "1 día" : `${diffDays} días`} y ${hrLabel}`;
  }

  if (diffDays < 30) {
    return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return diffMonths === 1 ? "Hace 1 mes" : `Hace ${diffMonths} meses`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "Hace 1 año" : `Hace ${diffYears} años`;
}