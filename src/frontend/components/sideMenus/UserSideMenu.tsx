/**
 * UserSideMenu.tsx — Menú lateral del usuario autenticado.
 *
 * Versión definitiva con:
 * - Header original (logo + saludo + botón cerrar) con colores del UserAvatarMenu.
 * - Navegación con mismo marcado, animaciones y colores del dropdown (UserAvatarMenu).
 * - Separador entre secciones públicas y privadas.
 * - Botones de acción (Eliminar cuenta / Cerrar sesión) intactos.
 *
 * @author Boost A Project
 * @since v2.6.0
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import Button from "@/components/ui/Button";
import SideMenuHeader from "@/components/common/SideMenuHeader";

interface UserSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserSideMenu: React.FC<UserSideMenuProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuthStore();
    const { openDeleteModal } = useUiStore();
    const pathname = usePathname();

    if (!isOpen) return null;

    const isActive = (route: string) => pathname === route;

    return (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
            <aside
                className="fixed top-0 right-0 w-72 h-screen bg-white shadow-xl z-50 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header original, solo cambia colores */}
                <SideMenuHeader onClose={onClose} />

                {/* Navegación principal */}
                <nav className="py-5">
                    <ul className="flex flex-col space-y-1">
                        {[
                            { href: "/", label: "Inicio" },
                            { href: "/proyectos", label: "Proyectos" },
                            { href: "/blog", label: "Blog" },
                            { href: "/faq", label: "Preguntas frecuentes" },
                            { href: "/contacto", label: "Contacto" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={onClose}
                                    className={`block px-4 py-3 transition-all duration-300 font-medium relative
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                    after:scale-x-0 after:bg-[#1DA1F2] after:transition-transform
                    hover:text-[#1DA1F2] hover:after:scale-x-100
                    ${isActive(href)
                                            ? "text-[#1DA1F2] after:scale-x-100"
                                            : "text-[#1A1341]"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Separador */}
                    <div className="border-t border-[#C2E7DA] my-4"></div>

                    {/* Enlaces privados */}
                    <ul className="flex flex-col space-y-1">
                        {[
                            { href: "/perfil", label: "Editar perfil" },
                            { href: "/dashboard", label: "Área privada" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={onClose}
                                    className={`block px-4 py-3 transition-all duration-300 font-medium relative
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                    after:scale-x-0 after:bg-[#1DA1F2] after:transition-transform
                    hover:text-[#1DA1F2] hover:after:scale-x-100
                    ${isActive(href)
                                            ? "text-[#1DA1F2] after:scale-x-100"
                                            : "text-[#1A1341]"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Botones inferiores */}
                <div className="p-4 border-t border-[#C2E7DA] space-y-3">
                    <Button
                        variant="danger"
                        size="md"
                        className="w-full"
                        onClick={() => {
                            openDeleteModal();
                            onClose();
                        }}
                    >
                        Eliminar cuenta
                    </Button>

                    <Button
                        variant="outline"
                        size="md"
                        className="w-full"
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                    >
                        Cerrar sesión
                    </Button>
                </div>
            </aside>
        </div>
    );
};

export default UserSideMenu;
