/**
 * components/ui/FavoriteButton.tsx
 *
 * Componente de botón de favoritos para proyectos de inversión.
 * 
 * Características:
 * - Botón circular con icono "V" (favorito)
 * - Estados visuales: inactivo (borde azul), activo (fondo azul)
 * - Integración con useAuthStore y useFavoritesStore
 * - Tamaños configurables (sm, md, lg)
 * - Hover effects con scale y shadow
 * - Callback para usuarios no autenticados
 * - TypeScript estricto y accesibilidad
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useUiStore } from "@/stores/useUiStore";
import { Heart } from "lucide-react";
import type { Project } from "@/types/project";

interface FavoriteButtonProps {
    project: Project;
    size?: "sm" | "md" | "lg";
    onLoginRequired?: () => void;
    className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    project,
    size = "md",
    onLoginRequired,
    className = ""
}) => {
    const { isAuthenticated } = useAuthStore();
    const { isFavorite, toggleFavorite, addFavorite, removeFavorite, addPending, removePending } = useFavoritesStore();
    const { openAuthModal, showAuthModal } = useUiStore();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Guardar favorito pendiente cuando no hay sesión
    const pendingFavoriteSlugRef = useRef<string | null>(null);

    // Verificar si el proyecto es favorito
    const isProjectFavorite = isFavorite(project.slug);

    // FORZAR ACTUALIZACIÓN cuando cambie la autenticación
    useEffect(() => {
        if (!isAuthenticated) {
            const { favorites } = useFavoritesStore.getState();
            if (favorites.length > 0) {
                console.warn("⚠️ Favoritos persistentes detectados después del logout");
            }
        }
    }, [isAuthenticated]);

    // Si el modal de auth se cierra y el usuario sigue sin autenticarse, revertir marcado optimista
    useEffect(() => {
        if (!showAuthModal && !isAuthenticated && pendingFavoriteSlugRef.current) {
            removeFavorite(pendingFavoriteSlugRef.current);
            // También eliminar de cola pendiente si existiera el id (no lo tenemos aquí)
            pendingFavoriteSlugRef.current = null;
        }
    }, [showAuthModal, isAuthenticated, removeFavorite]);

    // Manejar clic en el botón
    const handleClick = () => {
        if (!isAuthenticated) {
            // Marcar optimista y abrir modal
            if (!isProjectFavorite) {
                addFavorite(project);
                // Guardar en cola de pendientes por id
                addPending(project.id);
                pendingFavoriteSlugRef.current = project.slug;
            }

            if (onLoginRequired) {
                onLoginRequired();
            } else {
                openAuthModal();
            }
            return;
        }

        // Si está autenticado, alternar favorito
        const wasFavorite = isProjectFavorite;
        toggleFavorite(project);
        
        if (wasFavorite) {
            setToastMessage("Eliminado de favoritos");
        } else {
            setToastMessage("Agregado a favoritos");
        }
        setShowToast(true);
    };

    // Auto-ocultar toast después de 3 segundos
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    // Configuración de tamaños
    const sizeClasses = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg"
    };

    // Clases base del botón
    const baseClasses = `
        relative flex items-center justify-center
        rounded-full border-2 transition-all duration-200 ease-in-out
        hover:scale-105 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-opacity-50
        ${sizeClasses[size]}
        ${className}
    `;

    // Clases condicionales según estado
    const stateClasses = isProjectFavorite
        ? "bg-[#C2E7DA] text-[#1A1341] border-[#C2E7DA]"
        : "bg-transparent text-[#C2E7DA] border-[#C2E7DA] hover:bg-[#C2E7DA] hover:text-[#1A1341] hover:border-[#C2E7DA]";

    return (
        <>
            <button
                onClick={handleClick}
                className={`${baseClasses} ${stateClasses}`}
                aria-label={
                    isProjectFavorite 
                        ? `Remover ${project.title} de favoritos` 
                        : `Agregar ${project.title} a favoritos`
                }
                title={
                    isProjectFavorite 
                        ? "Remover de favoritos" 
                        : "Agregar a favoritos"
                }
            >
                {/* Icono corazón */}
                <Heart 
                    className={`w-4 h-4 ${
                        isProjectFavorite ? "fill-current" : ""
                    }`}
                />

                {/* Indicador de estado para accesibilidad */}
                {isProjectFavorite && (
                    <span className="sr-only">
                        Este proyecto está en tus favoritos
                    </span>
                )}
            </button>

            {/* Toast de confirmación - Posicionado en el centro de la imagen */}
            {showToast && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className={`text-white px-6 py-3 rounded-lg shadow-xl text-base font-medium animate-in slide-in-from-bottom-2 duration-300 ${
                        toastMessage === "Agregado a favoritos"
                            ? "bg-[#1A1341]" 
                            : "bg-red-600"
                    }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                                toastMessage === "Agregado a favoritos"
                                    ? "bg-[#C2E7DA]" 
                                    : "bg-red-200"
                            }`}></div>
                            <span>{toastMessage}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavoriteButton;
