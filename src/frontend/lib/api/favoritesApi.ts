/**
 * favoritesApi.ts
 * ------------------------------------------------------------
 * Servicio de comunicación con la API para gestión de favoritos.
 * 
 * Proporciona funciones CRUD:
 * - Obtener favoritos del usuario autenticado
 * - Añadir un proyecto a favoritos
 * - Eliminar un proyecto de favoritos
 *
 * Todas las operaciones requieren autenticación JWT (cookies HttpOnly).
 * Usa fetchWithAuth para renovar automáticamente el token si expira.
 * 
 * @author Boost A Project
 * @since v2.4.0
 * ------------------------------------------------------------
 */

import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import type { Project } from "@/types/project";
import { buildApiUrl } from "@/lib/api/baseUrl";

export interface FavoriteResponse {
    id: number;
    user_id: number;
    project_id: number;
    created_at: string;
    project: Project;
}

export const favoritesApi = {
    /**
     * Obtiene todos los favoritos del usuario autenticado.
     * Devuelve array de favoritos con información completa del proyecto.
     */
    getFavorites: async (): Promise<FavoriteResponse[]> => {
        const response = await fetchWithAuth(buildApiUrl("/api/favorites/"));
        
        if (!response.ok) {
            throw new Error("Error al obtener favoritos");
        }
        
        return await response.json();
    },

    /**
     * Añade un proyecto a favoritos del usuario autenticado.
     * @param projectId - ID del proyecto a añadir
     */
    addFavorite: async (projectId: number): Promise<FavoriteResponse> => {
        const response = await fetchWithAuth(buildApiUrl("/api/favorites/"), {
            method: "POST",
            body: JSON.stringify({ project_id: projectId }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result?.error || "Error al añadir favorito");
        }
        
        return result;
    },

    /**
     * Elimina un proyecto de favoritos del usuario autenticado.
     * @param projectId - ID del proyecto a eliminar
     */
    removeFavorite: async (projectId: number): Promise<void> => {
        const response = await fetchWithAuth(buildApiUrl(`/api/favorites/${projectId}`), {
            method: "DELETE",
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result?.error || "Error al eliminar favorito");
        }
    },
};