/**
 * components/auth/AuthRequiredModal.tsx
 *
 * Modal que aparece cuando un usuario no autenticado intenta usar funcionalidades
 * que requieren autenticación (como agregar favoritos).
 * 
 * Características:
 * - Diseño corporativo con colores de Boost A Project
 * - Opciones: Cerrar, Registrarse, Iniciar sesión
 * - Integración con useUiStore para control global
 * - Accesibilidad completa con ARIA labels
 * - Responsive design
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import Link from "next/link";
import { useUiStore } from "@/stores/useUiStore";
import Button from "@/components/ui/Button";
import { User, Lock, Heart } from "lucide-react";

const AuthRequiredModal: React.FC = () => {
    const { showAuthModal, closeAuthModal } = useUiStore();

    if (!showAuthModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1A1341] via-[#6290C3] to-[#C2E7DA] px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-semibold">
                                Acceso requerido
                            </h2>
                            <p className="text-white/90 text-sm">
                                Necesitas estar registrado para usar esta función
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-[#1A1341] mb-2">
                            ¿Quieres guardar tus favoritos?
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Regístrate o inicia sesión para guardar proyectos en tus favoritos 
                            y acceder a tu área privada personalizada.
                        </p>
                    </div>

                    {/* Muñeco fuera de los botones */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-[#1A1341]/10 rounded-full flex items-center justify-center">
                            <Heart className="w-8 h-8 text-[#1A1341]" />
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="space-y-4">
                        {/* Registrarse */}
                        <div className="block">
                            <Link href="/signup" onClick={closeAuthModal} className="block">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full justify-center"
                                >
                                    Crear cuenta
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Iniciar sesión */}
                        <div className="block">
                            <Link href="/login" onClick={closeAuthModal} className="block">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full justify-center border-[#1A1341] text-[#1A1341] hover:bg-[#1A1341] hover:text-white"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>
                        </div>

                        {/* Cerrar separado */}
                        <div className="block">
                            <Button
                                variant="secondary"
                                size="lg"
                                onClick={closeAuthModal}
                                className="w-full justify-center"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3">
                    <p className="text-center text-xs text-gray-500">
                        Al registrarte, podrás guardar favoritos y acceder a tu área privada
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredModal;
