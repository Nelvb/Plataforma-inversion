/**
 * contactService.ts
 *
 * Servicio para enviar mensajes desde el formulario de contacto.
 * - Si el usuario está autenticado, usa fetchWithAuth con protección CSRF y renovación automática.
 * - Si no está autenticado, usa fetch normal sin cabeceras CSRF.
 */

import { buildApiUrl } from "@/lib/api/baseUrl";

const API_URL = buildApiUrl("/api/account/contact");

export async function sendContact(data: unknown) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error enviando contacto");
  return await res.json();
}
