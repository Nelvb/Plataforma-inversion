/**
 * CookieToggle.tsx — Botón flotante para reabrir el panel de configuración de cookies (RGPD).
 *
 * Contexto:
 * - Visible solo cuando el banner NO está activo (isVisible === false).
 * - Permite reabrir el modal de configuración avanzada en cualquier momento.
 * - Colores y estilo coherentes con Boost A Project.
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/stores/useCookieConsent";

const CookieToggle: React.FC = () => {
    const { openModal, isVisible } = useCookieConsent();

    if (isVisible) return null; // no mostrar mientras el banner está activo

    return (
        <button
            onClick={openModal}
            className="fixed bottom-5 right-5 z-[9999] bg-[#1A1341] hover:bg-[#6290C3] text-white p-3 rounded-lg shadow-lg transition-all
        focus:outline-none focus:ring-2 focus:ring-[#C2E7DA] focus:ring-offset-2 flex items-center gap-2 group"
            aria-label="Configurar cookies"
        >
            <Cookie className="w-5 h-5 flex-shrink-0 text-[#C2E7DA] group-hover:text-white transition-colors" />
            <span className="hidden lg:inline text-sm font-medium whitespace-nowrap">
                Configurar cookies
            </span>
        </button>
    );
};

export default CookieToggle;
