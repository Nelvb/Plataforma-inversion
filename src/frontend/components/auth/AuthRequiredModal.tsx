/**
 * components/auth/AuthRequiredModal.tsx
 *
 * Modal que aparece cuando un usuario no autenticado intenta usar funcionalidades
 * que requieren autenticación (como agregar favoritos).
 *
 * Refactorizado para usar ModalBase — mantiene exactamente el contenido original,
 * pero con diseño y comportamiento unificados con el sistema UI (header verde, sombras, bordes 2xl).
 *
 * @author Boost A Project
 * @since v2.5.1
 */

"use client";

import React from "react";
import Link from "next/link";
import { useUiStore } from "@/stores/useUiStore";
import Button from "@/components/ui/Button";
import { Heart } from "lucide-react";
import ModalBase from "@/components/ui/ModalBase";

const AuthRequiredModal: React.FC = () => {
    const { showAuthModal, closeAuthModal } = useUiStore();

    if (!showAuthModal) return null;

    return (
        <ModalBase
            isOpen={showAuthModal}
            onClose={closeAuthModal}
            title="Acceso requerido"
        >
            {/* Contenido principal */}
            <div className="p-2">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-[#1A1341] mb-2">
                        ¿Quieres guardar tus favoritos?
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Regístrate o inicia sesión para guardar proyectos en tus favoritos
                        y acceder a tu área privada personalizada.
                    </p>
                </div>

                {/* Ícono decorativo */}
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

                    {/* Cancelar */}
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

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 mt-6 rounded-xl">
                    <p className="text-center text-xs text-gray-500">
                        Al registrarte, podrás guardar favoritos y acceder a tu área privada
                    </p>
                </div>
            </div>
        </ModalBase>
    );
};

export default AuthRequiredModal;
