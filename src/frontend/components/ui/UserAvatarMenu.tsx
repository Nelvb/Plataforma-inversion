/**
 * UserAvatarMenu.tsx
 *
 * Componente de avatar de usuario con menú desplegable para la Navbar.
 * Reemplaza los botones "REGÍSTRATE" y "ACCEDER" cuando el usuario está autenticado.
 * 
 * Características:
 * - Render condicional basado en estado de autenticación
 * - Avatar circular con iniciales del usuario
 * - Dropdown con opciones según rol (admin/user)
 * - Diseño responsive (oculto en mobile)
 * - Colores corporativos y transiciones suaves
 * - Integración completa con useAuthStore
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import type { User } from "@/types/auth";

interface UserAvatarMenuProps {
    className?: string;
}

const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({ className = "" }) => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Generar iniciales del usuario
    const getUserInitials = (user: User): string => {
        const firstInitial = user.username.charAt(0).toUpperCase();
        const lastInitial = user.last_name.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    };

    // Manejar logout
    const handleLogout = async () => {
        try {
            await logout();
            setIsDropdownOpen(false);
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Determinar si una ruta está activa
    const isRouteActive = (route: string): boolean => {
        if (route === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(route);
    };

    // Si no está autenticado, mostrar botones originales
    if (!isAuthenticated || !user) {
        return (
            <div className={`flex items-center space-x-4 ${className}`}>
                <Link href="/signup">
                    <button className="rounded-full px-6 py-2 text-lg font-medium transition-all duration-300 border-2 border-[#C2E7DA] text-[#C2E7DA] hover:bg-[#C2E7DA] hover:text-[#1A1341] hover:scale-105">
                        REGÍSTRATE
                    </button>
                </Link>
                <Link href="/login">
                    <button className="rounded-full px-6 py-2 text-lg font-medium transition-all duration-300 bg-[#C2E7DA] text-[#1A1341] hover:bg-transparent hover:text-[#C2E7DA] hover:border-2 hover:border-[#C2E7DA] hover:scale-105">
                        ACCEDER
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Avatar del usuario */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#C2E7DA] focus:ring-opacity-50"
                aria-label="Menú de usuario"
            >
                {/* Avatar circular */}
                <div className="w-10 h-10 rounded-full bg-[#C2E7DA] flex items-center justify-center text-[#1A1341] font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-md">
                    {getUserInitials(user)}
                </div>
                
                {/* Nombre del usuario */}
                <span className="text-white font-semibold text-lg hidden md:block">
                    {user.username}
                </span>
                
                {/* Icono de flecha */}
                <svg
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-[#C2E7DA] z-50 overflow-hidden transition-all duration-300 ease-in-out">
                    {/* Header del dropdown */}
                    <div className="px-4 py-3 bg-[#C2E7DA] border-b border-[#C2E7DA]">
                        <p className="text-[#1A1341] font-semibold text-lg">
                            {user.username}
                        </p>
                        <p className="text-[#1A1341] text-sm opacity-75">
                            {user.email}
                        </p>
                    </div>

                    {/* Opciones del menú */}
                    <div className="py-2 gap-2">
                        {/* Área privada según rol */}
                        <Link
                            href={user.is_admin ? "/admin" : "/dashboard"}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`block px-4 py-3 transition-all duration-300 font-medium relative
                                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                                after:scale-x-0 after:bg-[#1DA1F2] after:transition-transform
                                hover:text-[#1DA1F2] hover:after:scale-x-100
                                ${isRouteActive(user.is_admin ? "/admin" : "/dashboard") ? "text-[#1DA1F2] after:scale-x-100" : "text-[#1A1341]"}
                            `}
                        >
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>
                                    {user.is_admin ? "Panel de Administración" : "Mi Área Privada"}
                                </span>
                            </div>
                        </Link>

                        {/* Perfil */}
                        <Link
                            href={user.is_admin ? "/admin/perfil" : "/perfil"}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`block px-4 py-3 transition-all duration-300 font-medium relative
                                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                                after:scale-x-0 after:bg-[#1DA1F2] after:transition-transform
                                hover:text-[#1DA1F2] hover:after:scale-x-100
                                ${isRouteActive(user.is_admin ? "/admin/perfil" : "/perfil") ? "text-[#1DA1F2] after:scale-x-100" : "text-[#1A1341]"}
                            `}
                        >
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Mi Perfil</span>
                            </div>
                        </Link>

                        {/* Separador */}
                        <div className="border-t border-gray-200 my-2"></div>

                        {/* Cerrar sesión */}
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-all duration-300 ease-in-out font-medium"
                        >
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Cerrar Sesión</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatarMenu;
