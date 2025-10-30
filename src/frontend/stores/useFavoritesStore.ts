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
    pendingFavoriteIds: number[];
    
    // Acciones
    fetchFavorites: () => Promise<void>;
    addFavorite: (project: Project) => void;
    removeFavorite: (slug: string) => void;
    toggleFavorite: (project: Project) => Promise<void>;
    isFavorite: (slug: string) => boolean;
    clearFavorites: () => void;
    addPending: (projectId: number) => void;
    removePending: (projectId: number) => void;
    clearPending: () => void;
    syncPendingWithBackend: () => Promise<void>;
    debugFavorites: () => { memory: Project[]; localStorage: string | null; count: number };
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            favorites: [],
            isLoading: false,
            error: null,
            pendingFavoriteIds: [],

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

            // Gestionar cola de favoritos pendientes
            addPending: (projectId: number) => {
                set((state) => {
                    if (state.pendingFavoriteIds.includes(projectId)) return state;
                    const next = [...state.pendingFavoriteIds, projectId];
                    localStorage.setItem("pending-favorites", JSON.stringify(next));
                    return { pendingFavoriteIds: next } as Partial<FavoritesState> as FavoritesState;
                });
            },
            removePending: (projectId: number) => {
                set((state) => {
                    const next = state.pendingFavoriteIds.filter(id => id !== projectId);
                    localStorage.setItem("pending-favorites", JSON.stringify(next));
                    return { pendingFavoriteIds: next } as Partial<FavoritesState> as FavoritesState;
                });
            },
            clearPending: () => {
                localStorage.removeItem("pending-favorites");
                set({ pendingFavoriteIds: [] });
            },

            // Sincronizar cola de favoritos pendientes con el backend tras login
            syncPendingWithBackend: async () => {
                const { pendingFavoriteIds } = get();
                if (!pendingFavoriteIds || pendingFavoriteIds.length === 0) return;
                for (const projectId of pendingFavoriteIds) {
                    try {
                        await favoritesApi.addFavorite(projectId);
                    } catch (err: unknown) {
                        // Ignorar duplicados u otros errores transitorios
                        console.warn("syncPendingWithBackend error:", err);
                    }
                }
                // Limpiar cola y refrescar desde backend
                get().clearPending();
                await get().fetchFavorites();
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
                favorites: state.favorites,
                pendingFavoriteIds: state.pendingFavoriteIds,
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