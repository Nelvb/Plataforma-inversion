/**
 * DropdownBase.tsx — Base para menús desplegables tipo UserAvatarMenu.
 *
 * Estilo unificado con UserAvatarMenu:
 * - Bordes rounded-2xl
 * - Border color #C2E7DA
 * - Transición suave (transition-all duration-300)
 * - Header verde claro coherente con la marca
 *
 * @author Boost A Project
 * @since v2.5.1
 */

"use client";

import React from "react";

interface DropdownBaseProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    width?: number;
    children: React.ReactNode;
}

const DropdownBase: React.FC<DropdownBaseProps> = ({
    isOpen,
    onClose,
    title,
    width = 256,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute z-50"
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#C2E7DA] transform transition-all duration-300"
                role="menu"
                aria-label={title}
            >
                {title && (
                    <div className="bg-[#C2E7DA] px-4 py-3 border-b border-[#C2E7DA]">
                        <h3 className="text-[#1A1341] text-sm font-medium">{title}</h3>
                    </div>
                )}
                <div className="py-2">{children}</div>
            </div>
        </div>
    );
};

export default DropdownBase;
