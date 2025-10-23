/**
 * SideMenuBase.tsx — Contenedor base unificado para menús laterales (público, usuario, admin).
 *
 * Propósito: mantener coherencia visual con ModalBase y DropdownBase.
 * Diseño: fondo blanco, header verde (#C2E7DA), bordes redondeados 2xl, sombra uniforme.
 * Animación: slide-in + fade con TailwindCSS (sin dependencias externas).
 *
 * @author Boost A Project
 * @since v2.5.1
 */

"use client";

import React from "react";

interface SideMenuBaseProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    side?: "left" | "right";
    children: React.ReactNode;
}

const SideMenuBase: React.FC<SideMenuBaseProps> = ({
    isOpen,
    onClose,
    title,
    side = "left",
    children,
}) => {
    if (!isOpen) return null;

    const sidePosition = side === "left" ? "left-0" : "right-0";
    const slideIn =
        side === "left"
            ? "translate-x-0"
            : "translate-x-0"; // slide-in controlado por Tailwind transitions

    return (
        <div className="fixed inset-0 z-[50] flex">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-[rgba(26,19,65,0.45)] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Panel lateral */}
            <div
                className={`absolute top-0 ${sidePosition} h-full w-72 bg-white border border-[#C2E7DA] shadow-lg rounded-tr-2xl rounded-br-2xl overflow-y-auto transform transition-transform duration-300 ${slideIn}`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="bg-[#C2E7DA] px-5 py-4 border-b border-[#C2E7DA]">
                        <h2 className="text-[#1A1341] text-lg font-medium">{title}</h2>
                    </div>
                )}
                <div className="p-5 text-[#1A1341]">{children}</div>
            </div>
        </div>
    );
};

export default SideMenuBase;
