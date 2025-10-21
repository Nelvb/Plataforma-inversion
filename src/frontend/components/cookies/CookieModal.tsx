/**
 * CookieModal.tsx — Modal de configuración avanzada de cookies (RGPD).
 *
 * Contexto:
 * - Permite aceptar/rechazar cookies analíticas y funcionales.
 * - Colores corporativos Boost A Project (#1A1341, #6290C3, #C2E7DA).
 * - Accesible, con fondo difuminado y cierre al hacer clic fuera.
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import { useCookieConsent } from "@/stores/useCookieConsent";

const CookieModal: React.FC = () => {
    const {
        showModal,
        preferences,
        updatePreference,
        saveModalPreferences,
        closeModal,
        acceptAll,
    } = useCookieConsent();

    if (!showModal) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) closeModal();
    };

    return (
        <div
            className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-[fadeIn_0.3s_ease-out]">
                {/* Header */}
                <div className="bg-[#1A1341] text-white p-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Configuración de cookies
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-white/80 hover:text-white text-2xl font-bold leading-none"
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh] text-gray-700">
                    <p className="text-sm">
                        En Boost A Project utilizamos cookies para mejorar tu experiencia. Puedes aceptar todas,
                        solo las necesarias o personalizar tu configuración.
                    </p>

                    {/* Necesarias */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1A1341]">Cookies necesarias</h3>
                            <p className="text-xs text-gray-600">
                                Son esenciales para el funcionamiento básico del sitio y no se pueden desactivar.
                            </p>
                        </div>
                        <div className="px-4 py-3 text-sm text-gray-700">
                            Se utilizan para mantener la sesión y preferencias de usuario.
                        </div>
                    </div>

                    {/* Analíticas */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1A1341]">Cookies analíticas</h3>
                            <p className="text-xs text-gray-600">
                                Nos ayudan a entender cómo los usuarios interactúan con la web.
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3">
                            <p className="text-sm">Permitir cookies analíticas</p>
                            <input
                                type="checkbox"
                                checked={preferences.analytics}
                                onChange={() =>
                                    updatePreference("analytics", !preferences.analytics)
                                }
                                className="h-5 w-5 text-[#6290C3] border-gray-300 focus:ring-[#6290C3] rounded cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Funcionales */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1A1341]">Cookies funcionales</h3>
                            <p className="text-xs text-gray-600">
                                Permiten mejorar la funcionalidad y personalización del sitio.
                            </p>
                        </div>
                        <div className="flex items-center justify-between px-4 py-3">
                            <p className="text-sm">Permitir cookies funcionales</p>
                            <input
                                type="checkbox"
                                checked={preferences.functional}
                                onChange={() =>
                                    updatePreference("functional", !preferences.functional)
                                }
                                className="h-5 w-5 text-[#6290C3] border-gray-300 focus:ring-[#6290C3] rounded cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Enlaces legales */}
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                        <p className="mb-2 text-[#1A1341] font-medium">
                            Más información
                        </p>
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="/legal/privacidad"
                                    target="_blank"
                                    className="text-[#1A1341] hover:text-[#6290C3] underline transition-colors"
                                >
                                    Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/legal/cookies"
                                    target="_blank"
                                    className="text-[#1A1341] hover:text-[#6290C3] underline transition-colors"
                                >
                                    Política de Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 p-5 flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={acceptAll}
                        className="px-4 py-2 rounded-md bg-[#6290C3] text-white hover:bg-[#C2E7DA] hover:text-[#1A1341] transition-colors"
                    >
                        Aceptar todas
                    </button>

                    <button
                        onClick={saveModalPreferences}
                        className="px-4 py-2 rounded-md border border-[#6290C3] text-[#6290C3] hover:bg-[#6290C3] hover:text-white transition-colors"
                    >
                        Guardar preferencias
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
};

export default CookieModal;
