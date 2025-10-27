/**
 * stores/useFavoritesStore.ts
 *
 * Store de gestión de proyectos favoritos usando Zustand con persistencia local + sincronización backend.
 *
 * Características:
 * - Persistencia automática en localStorage (fallback)
 * - Sincronización con backend Flask via API REST
 * - Optimistic updates para UX instantánea
 * - Rollback automático en caso de error
 * - Tipado estricto con Project interface
 * - Prevención de duplicados por slug
 * - Compatibilidad con SSR (Next.js)
 * - Sincronización entre pestañas
 *
 * @author Boost A Project
 * @since v2.4.0
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Project } from "@/types/project";
import { favoritesApi } from "@/lib/api/favoritesApi";

interface FavoritesState {
    favorites: Project[];
    isLoading: boolean;
    error: string | null;
    
    // Acciones
    fetchFavorites: () => Promise<void>;
    addFavorite: (project: Project) => void;
    removeFavorite: (slug: string) => void;
    toggleFavorite: (project: Project) => Promise<void>;
    isFavorite: (slug: string) => boolean;
    clearFavorites: () => void;
    debugFavorites: () => { memory: Project[]; localStorage: string | null; count: number };
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            favorites: [],
            isLoading: false,
            error: null,

            // Obtener favoritos del backend
            fetchFavorites: async () => {
                set({ isLoading: true, error: null });
                
                try {
                    const response = await favoritesApi.getFavorites();
                    const projects = response.map(fav => fav.project);
                    
                    set({ 
                        favorites: projects,
                        isLoading: false 
                    });
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                    set({ 
                        isLoading: false,
                        error: error instanceof Error ? error.message : "Error desconocido"
                    });
                }
            },

            // Agregar proyecto a favoritos (solo local, sin backend)
            addFavorite: (project: Project) => {
                set((state) => {
                    const exists = state.favorites.some(fav => fav.slug === project.slug);
                    if (exists) return state;
                    
                    return {
                        favorites: [...state.favorites, project]
                    };
                });
            },

            // Remover proyecto de favoritos (solo local, sin backend)
            removeFavorite: (slug: string) => {
                set((state) => ({
                    favorites: state.favorites.filter(fav => fav.slug !== slug)
                }));
            },

            // Toggle con sincronización backend + optimistic update
            toggleFavorite: async (project: Project) => {
                const { isFavorite, favorites } = get();
                const wasFavorite = isFavorite(project.slug);

                // 1. Optimistic update (UI instantánea)
                if (wasFavorite) {
                    set({ 
                        favorites: favorites.filter(fav => fav.slug !== project.slug)
                    });
                } else {
                    set({ 
                        favorites: [...favorites, project]
                    });
                }

                // 2. Sincronización con backend
                try {
                    if (wasFavorite) {
                        await favoritesApi.removeFavorite(project.id);
                        console.log("✅ Eliminado de favoritos");
                    } else {
                        await favoritesApi.addFavorite(project.id);
                        console.log("✅ Añadido a favoritos");
                    }
                } catch (error) {
                    console.error("❌ Error syncing favorite:", error);
                    
                    // 3. Rollback en caso de error
                    if (wasFavorite) {
                        set({ 
                            favorites: [...favorites, project]
                        });
                    } else {
                        set({ 
                            favorites: favorites.filter(fav => fav.slug !== project.slug)
                        });
                    }
                }
            },

            // Verificar si un proyecto es favorito
            isFavorite: (slug: string) => {
                const { favorites } = get();
                return favorites.some(fav => fav.slug === slug);
            },

            // Limpiar todos los favoritos
            clearFavorites: () => {
                console.log("🧹 Limpiando favoritos del store y localStorage...");
                
                // Limpiar estado en memoria
                set({ favorites: [] });
                
                // Limpiar localStorage explícitamente
                localStorage.removeItem("favorites-storage");
                
                // FORZAR LIMPIEZA COMPLETA - limpiar también el estado persistido
                try {
                    // Obtener el estado actual del store persistido
                    const persistedState = localStorage.getItem("favorites-storage");
                    if (persistedState) {
                        console.log("🗑️ Eliminando estado persistido:", persistedState);
                        localStorage.removeItem("favorites-storage");
                    }
                } catch (error) {
                    console.error("Error limpiando localStorage:", error);
                }
                
                console.log("✅ Favoritos limpiados completamente");
            },

            // Función de debugging para inspeccionar el estado
            debugFavorites: () => {
                const { favorites } = get();
                const persistedState = localStorage.getItem("favorites-storage");
                
                console.log("🔍 DEBUG FAVORITOS:");
                console.log("- Estado en memoria:", favorites);
                console.log("- Estado en localStorage:", persistedState);
                console.log("- Cantidad en memoria:", favorites.length);
                
                return {
                    memory: favorites,
                    localStorage: persistedState,
                    count: favorites.length
                };
            }
        }),
        {
            name: "favorites-storage",
            storage: createJSONStorage(() => localStorage),
            version: 2,
            
            migrate: (persistedState: unknown, version: number) => {
                if (version === 1) {
                    return persistedState;
                }
                return persistedState;
            },
            
            partialize: (state) => ({ 
                favorites: state.favorites 
            })
        }
    )
);

export type { FavoritesState };

// Función global de debugging para la consola del navegador
if (typeof window !== 'undefined') {
    (window as any).debugFavorites = () => {
        const { debugFavorites } = useFavoritesStore.getState();
        return debugFavorites();
    };
    
    (window as any).clearFavorites = () => {
        const { clearFavorites } = useFavoritesStore.getState();
        clearFavorites();
    };
}