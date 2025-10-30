/**
 * fetchWithAuth.ts
 *
 * Wrapper centralizado para fetch autenticado.
 * - Añade automáticamente CSRF Token para métodos sensibles (POST, PUT, PATCH, DELETE).
 * - Reintenta una vez si el token ha expirado (401), intentando renovar con /auth/refresh.
 * - Si la renovación falla, devuelve error "SessionExpired" para manejo controlado.
 */

/**
 * Extrae el CSRF token desde las cookies del navegador.
 * Usa el token adecuado según la ruta.
 */
const getCSRFToken = (url: string): string => {
    const isRefresh = url.includes("/auth/refresh");
    const cookieName = isRefresh ? "csrf_refresh_token=" : "csrf_access_token=";
    const cookies = document.cookie.split(";");

    for (const c of cookies) {
        const cookie = c.trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }

    return "";
};

/**
 * Obtiene una cookie específica del navegador.
 */
const getCookie = (name: string): string => {
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
        const cookie = c.trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
};

import { buildApiUrl } from "@/lib/api/baseUrl";

interface FetchWithAuthOptions extends RequestInit {
    retry?: boolean;
}

/**
 * fetchWithAuth
 * Intercepta errores 401 y reintenta con /auth/refresh una vez.
 * Devuelve errores controlados para manejo por componentes llamantes.
 */
export const fetchWithAuth = async (
    input: RequestInfo | URL,
    init: FetchWithAuthOptions = {}
): Promise<Response> => {
    const method = init.method?.toUpperCase() || "GET";
    const needsCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const url = input.toString();

    // Validar CSRF token antes de hacer la petición
    // Primero intentar desde localStorage, luego desde cookies
    let csrfToken = localStorage.getItem("csrf_token");
    if (!csrfToken) {
        csrfToken = getCSRFToken(url);
    }
    
    if (!csrfToken && needsCSRF) {
        console.warn("CSRF token missing. User session may have expired.");
        throw new Error("SessionExpired");
    }

    // Logging para depuración
    console.debug("fetchWithAuth:", { 
        url, 
        method, 
        needsCSRF, 
        hasCSRF: !!csrfToken 
    });

    const headers = {
        ...(init.headers || {}),
        ...(needsCSRF && { "X-CSRF-TOKEN": csrfToken }),
        "Content-Type": "application/json",
    };

    const config: RequestInit = {
        ...init,
        credentials: "include",
        headers,
    };

    try {
        const response = await fetch(input, config);

        if (response.status !== 401 || init.retry) {
            return response;
        }

        console.warn("Token expirado. Intentando renovar...");

        // Obtener CSRF token para refresh
        let refreshCSRF = localStorage.getItem("csrf_token");
        if (!refreshCSRF) {
            refreshCSRF = getCSRFToken(buildApiUrl("/api/auth/refresh"));
        }

        const refreshResponse = await fetch(
            buildApiUrl("/api/auth/refresh"),
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRF-TOKEN": refreshCSRF,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!refreshResponse.ok) {
            console.error("Fallo al renovar token. Sesión expirada.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("csrf_token");
            
            // Redirigir a login
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const { default: router } = require("next/router");
            router.push("/login");
            
            throw new Error("SessionExpired");
        }

        // Reintento una sola vez con retry=true
        return await fetchWithAuth(input, { ...init, retry: true });
    } catch (err) {
        console.error("Error en fetchWithAuth:", err);
        throw err;
    }
};
