/**
 * useCookieConsent.ts — Estado global para gestión de consentimiento de cookies (RGPD).
 *
 * Contexto:
 * - Se usa junto con CookieBanner, CookieModal y CookieToggle.
 * - Persiste preferencias en localStorage ("cookie-consent").
 * - Cumple RGPD: permite aceptar todas, solo necesarias o configurar.
 *
 * Notas de mantenimiento:
 * - No usa cookies del navegador, solo localStorage (sin trazas antes de aceptar).
 * - Preparado para integrarse en todo el layout público (no admin).
 * - Escalable para añadir categorías nuevas (marketing, performance, etc.).
 *
 * @author Boost A Project
 * @since v2.3.0
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    functional: boolean;
}

interface CookieConsentState {
    // Estado visual
    isVisible: boolean; // Banner inferior
    showModal: boolean; // Modal avanzado

    // Preferencias
    preferences: CookiePreferences;

    // Acciones principales
    acceptAll: () => void;
    acceptNecessary: () => void;
    openModal: () => void;
    closeModal: () => void;
    updatePreference: (key: keyof CookiePreferences, value: boolean) => void;
    saveModalPreferences: () => void;
}

/**
 * Estado global persistente con Zustand (sin dependencias externas).
 * Persiste automáticamente en localStorage con clave "cookie-consent".
 */
export const useCookieConsent = create<CookieConsentState>()(
    persist(
        (set, get) => ({
            isVisible: true,
            showModal: false,
            preferences: {
                necessary: true,
                analytics: false,
                functional: false,
            },

            acceptAll: () => {
                set({
                    preferences: { necessary: true, analytics: true, functional: true },
                    isVisible: false,
                    showModal: false,
                });
            },

            acceptNecessary: () => {
                set({
                    preferences: { necessary: true, analytics: false, functional: false },
                    isVisible: false,
                    showModal: false,
                });
            },

            openModal: () => set({ showModal: true }),
            closeModal: () => set({ showModal: false }),

            updatePreference: (key, value) => {
                const current = get().preferences;
                set({
                    preferences: { ...current, [key]: value },
                });
            },

            saveModalPreferences: () => {
                set({ isVisible: false, showModal: false });
            },
        }),
        {
            name: "cookie-consent", // Clave en localStorage
            // onRehydrateStorage: () => (state) => {
            //     if (state && typeof state.isVisible !== "undefined") {
            //         // Si ya existe consentimiento previo, no mostrar banner
            //         state.isVisible = false;
            //     }
            // },
        }
    )
);
