/**
 * CookieBanner.tsx — Banner principal de consentimiento de cookies (RGPD).
 *
 * Contexto:
 * - Se muestra solo si no hay consentimiento guardado (useCookieConsent.isVisible).
 * - Colores corporativos Boost A Project.
 * - Ofrece tres acciones: Configurar, Solo necesarias, Aceptar todas.
 * - Se anima desde la parte inferior (slide-up).
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import { Cookie, Settings } from "lucide-react";
import { useCookieConsent } from "@/stores/useCookieConsent";
import Button from "@/components/ui/Button";

const CookieBanner: React.FC = () => {
    const { isVisible, acceptAll, acceptNecessary, openModal } = useCookieConsent();

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#1A1341] text-white shadow-2xl border-t-4 border-[#6290C3] animate-[slideUp_0.4s_ease-out]"
        >
            <div className="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Texto e icono */}
                <div className="flex items-start md:items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-full flex-shrink-0">
                        <Cookie className="w-5 h-5 text-[#C2E7DA]" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm md:text-base">
                            Usamos cookies para mejorar tu experiencia.
                        </p>
                        <p className="text-sm text-gray-300 leading-snug">
                            Puedes aceptar todas, solo las necesarias o{" "}
                            <button
                                type="button"
                                onClick={openModal}
                                className="text-[#C2E7DA] hover:underline font-medium"
                            >
                                configurar tus preferencias
                            </button>
                            . Más información en{" "}
                            <a
                                href="/legal/cookies"
                                className="text-[#C2E7DA] hover:underline ml-1"
                            >
                                nuestra Política de Cookies
                            </a>
                            .
                        </p>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {/* Solo necesarias — fondo verde claro, destaca sobre el azul */}
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="hover:bg-[#F1FFEF] hover:text-[#1A1341] transition-all"
                        onClick={acceptNecessary}
                    >
                        Solo necesarias
                    </Button>

                    {/* Configurar — outlineGreen (mantiene visibilidad equilibrada) */}
                    <Button
                        type="button"
                        variant="outlineGreen"
                        size="sm"
                        className="border-white/40 text-white hover:bg-[#C2E7DA] hover:text-[#1A1341] transition-all"
                        onClick={openModal}
                    >
                        <Settings className="w-4 h-4 mr-2 inline" />
                        Configurar
                    </Button>

                    {/* Aceptar todas — fondo azul medio, borde blanco para contraste */}
                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        className="bg-[#6290C3] border border-white text-white hover:bg-[#C2E7DA] hover:text-[#1A1341] transition-all"
                        onClick={acceptAll}
                    >
                        Aceptar todas
                    </Button>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default CookieBanner;
