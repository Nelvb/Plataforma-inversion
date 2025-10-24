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
import ModalBase from "@/components/ui/ModalBase";
import Button from "@/components/ui/Button";

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

    return (
        <ModalBase
            isOpen={showModal}
            onClose={closeModal}
            title="Configuración de cookies"
        >
            <div className="space-y-5 overflow-y-auto max-h-[60vh] text-gray-700">
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
                    <Button
                        variant="secondary"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="primary"
                        onClick={acceptAll}
                    >
                        Aceptar todas
                    </Button>

                    <Button
                        variant="outline"
                        onClick={saveModalPreferences}
                    >
                        Guardar preferencias
                    </Button>
                </div>
        </ModalBase>
    );
};

export default CookieModal;
