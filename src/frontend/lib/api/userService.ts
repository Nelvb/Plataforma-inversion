/**
 * userService.ts
 *
 * Servicio de usuario para frontend.
 * Todas las llamadas se autentican usando cookies HttpOnly.
 * Usa fetchWithAuth para renovar automáticamente el token JWT si ha expirado.
 * Añade automáticamente el token CSRF desde cookies para métodos sensibles.
 */

import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import { buildApiUrl } from "@/lib/api/baseUrl";

// Cambiado para usar helper central
const API_URL = {
    profile: buildApiUrl("/api/auth/profile"),
    users: (id?: number | string) => buildApiUrl(id ? `/api/users/${id}` : "/api/users"),
};

export { API_URL };

export const userService = {
    /**
     * Actualiza nombre y opcionalmente el email del usuario.
     * Requiere contraseña actual como confirmación.
     */
    updateNameAndEmail: async (data: {
        username: string;
        last_name: string;
        email?: string;
        current_password: string;
    }) => {
        const response = await fetchWithAuth(`${API_URL.profile}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al actualizar perfil");
        return result;
    },

    /**
     * Cambia la contraseña del usuario actual.
     * Requiere contraseña actual y nueva contraseña.
     */
    changePassword: async (data: { current_password: string; new_password: string }) => {
        const response = await fetchWithAuth(`${API_URL.profile}/change-password`, {
            method: "PUT",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al cambiar contraseña");
        return result;
    },

    /**
     * Solicita el envío de un email para restablecer la contraseña.
     * Solo requiere el correo electrónico del usuario.
     */
    requestPasswordReset: async (email: string) => {
        const response = await fetch(`${API_URL.profile}/request-password-reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const text = await response.text();
        let result;

        try {
            result = text ? JSON.parse(text) : {};
        } catch (e) {
            console.error("Error parsing response:", text);
            result = { msg: "Error de formato en la respuesta" };
        }

        if (!response.ok) {
            throw new Error(result?.msg || `Error ${response.status}: ${response.statusText}`);
        }

        return result;
    },

    /**
     * Restablece la contraseña con un token válido.
     * El token lo proporciona el backend por email.
     */
    resetPassword: async (data: { token: string; new_password: string }) => {
        const response = await fetch(`${API_URL.profile}/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al restablecer la contraseña");
        return result;
    },

    /**
     * Elimina la cuenta del usuario autenticado.
     * Requiere CSRF y sesión activa.
     */
    deleteAccount: async (): Promise<void> => {
        const response = await fetchWithAuth(`${API_URL.users()}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || "No se pudo eliminar la cuenta.");
        }
    },
};
