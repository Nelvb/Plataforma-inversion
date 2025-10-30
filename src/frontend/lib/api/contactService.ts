/**
 * contactService.ts
 *
 * Servicio para enviar mensajes desde el formulario de contacto.
 * - Si el usuario está autenticado, usa fetchWithAuth con protección CSRF y renovación automática.
 * - Si no está autenticado, usa fetch normal sin cabeceras CSRF.
 */

import { buildApiUrl } from "@/lib/api/baseUrl";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";

export interface ContactPayload {
  name: string;
  last_name?: string;
  email?: string;
  subject: string;
  message: string;
}

export async function sendContact(data: ContactPayload) {
  const res = await fetch(buildApiUrl("/api/account/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    // Envío anónimo: no enviar cookies para evitar requisito de CSRF cuando no hay sesión
    credentials: "omit",
  });

  if (!res.ok) throw new Error("Error al enviar el mensaje de contacto");
  return await res.json();
}

export const contactService = {
  send: sendContact,
  // Compatibilidad hacia atrás: si está autenticado, usar fetchWithAuth para aportar X-CSRF-TOKEN automáticamente
  sendMessage: async (data: ContactPayload, isAuthenticated?: boolean) => {
    if (isAuthenticated) {
      const res = await fetchWithAuth(buildApiUrl("/api/account/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al enviar el mensaje de contacto");
      return await res.json();
    }
    return sendContact(data);
  },
};
