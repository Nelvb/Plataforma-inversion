/**
 * ModalBase.tsx — Componente base unificado para todos los modales.
 *
 * Propósito: mantener coherencia visual con DropdownBase y UserAvatarMenu.
 * Diseño: fondo blanco, header verde (#C2E7DA), bordes redondeados 2xl, sombra uniforme.
 * Animación: fade + scale con Tailwind (sin librerías externas).
 *
 * @author Boost A Project
 * @since v2.5.1
 */

"use client";

import React, { useEffect } from "react";

interface ModalBaseProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalBase: React.FC<ModalBaseProps> = ({ isOpen, title, onClose, children }) => {
    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(26,19,65,0.45)] transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md overflow-hidden border border-[#C2E7DA] transform transition-all duration-300 scale-100 opacity-100 hover:scale-[1.01]"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                {title && (
                    <div className="bg-[#C2E7DA] px-6 py-4 border-b border-[#C2E7DA]">
                        <h2 className="text-[#1A1341] text-lg font-medium">{title}</h2>
                    </div>
                )}
                <div className="p-6 text-[#1A1341]">{children}</div>
            </div>
        </div>
    );
};

export default ModalBase;
