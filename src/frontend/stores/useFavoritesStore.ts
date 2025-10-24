/**
 * stores/useFavoritesStore.ts
 *
 * Store de gestión de proyectos favoritos usando Zustand con persistencia local.
 * 
 * Características:
 * - Persistencia automática en localStorage
 * - Tipado estricto con Project interface
 * - Prevención de duplicados por slug
 * - Acciones CRUD completas para favoritos
 * - Compatibilidad con SSR (Next.js)
 * - Sincronización entre pestañas
 * - Optimizado para rendimiento
 *
 * @author Boost A Project
 * @since v2.3.0
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Project } from "@/types/project";

interface FavoritesState {
    favorites: Project[];
    addFavorite: (project: Project) => void;
    removeFavorite: (slug: string) => void;
    toggleFavorite: (project: Project) => void;
    isFavorite: (slug: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            favorites: [],

            // Agregar proyecto a favoritos (evita duplicados)
            addFavorite: (project: Project) => {
                set((state) => {
                    const exists = state.favorites.some(fav => fav.slug === project.slug);
                    if (exists) {
                        return state; // No agregar si ya existe
                    }
                    return {
                        favorites: [...state.favorites, project]
                    };
                });
            },

            // Remover proyecto de favoritos por slug
            removeFavorite: (slug: string) => {
                set((state) => ({
                    favorites: state.favorites.filter(fav => fav.slug !== slug)
                }));
            },

            // Alternar favorito (agregar si no existe, remover si existe)
            toggleFavorite: (project: Project) => {
                const { isFavorite, addFavorite, removeFavorite } = get();
                if (isFavorite(project.slug)) {
                    removeFavorite(project.slug);
                } else {
                    addFavorite(project);
                }
            },

            // Verificar si un proyecto es favorito
            isFavorite: (slug: string) => {
                const { favorites } = get();
                return favorites.some(fav => fav.slug === slug);
            },

            // Limpiar todos los favoritos
            clearFavorites: () => {
                set({ favorites: [] });
            }
        }),
        {
            name: "favorites-storage", // Clave de persistencia
            storage: createJSONStorage(() => localStorage), // Usar localStorage
            // Opcional: versionar el store para futuras migraciones
            version: 1,
            // Opcional: migrar datos si cambia la versión
            migrate: (persistedState: unknown, version: number) => {
                if (version === 0) {
                    // Migración desde versión 0 a 1 si es necesario
                    return persistedState;
                }
                return persistedState;
            }
        }
    )
);

// Exportar tipos para uso externo
export type { FavoritesState };
