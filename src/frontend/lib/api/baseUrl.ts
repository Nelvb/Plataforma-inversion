export function buildApiUrl(path: string): string {
  const rawBase = process.env.NEXT_PUBLIC_API_URL || "";
  const base = rawBase.replace(/\/+$/, ""); // sin barra final
  const ensuredPath = path.startsWith("/") ? path : `/${path}`;

  // Si la base ya termina en /api y el path empieza por /api, evitar doble /api
  if (base.endsWith("/api") && ensuredPath.startsWith("/api")) {
    return `${base}${ensuredPath.replace(/^\/api/, "")}`;
  }

  return `${base}${ensuredPath}`;
}
