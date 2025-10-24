/**
 * AdminSideMenu.tsx
 *
 * Menú lateral para el entorno del administrador.
 * Incluye navegación pública general, rutas internas de gestión y botón de cierre de sesión.
 * Formato unificado con UserSideMenu: mismo fondo, animaciones y estructura.
 *
 * - Migrado a Zustand (`useAuthStore`) para logout global.
 * - Mantiene diseño responsivo y experiencia accesible.
 * - Formato unificado con UserSideMenu
 *
 * @author Boost A Project
 * @since v2.6.1
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import SideMenuHeader from "@/components/common/SideMenuHeader";

interface AdminSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSideMenu: React.FC<AdminSideMenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuthStore();
  const pathname = usePathname();

  if (!isOpen) return null;

  const isActive = (route: string) => pathname === route;

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        className="fixed top-0 right-0 w-72 h-screen bg-white shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header unificado */}
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

          {/* Sección administrador */}
          <div className="bg-[#C2E7DA] text-[#1A1341] text-base font-semibold text-center py-2 px-4 rounded mb-2">
            Administrador
          </div>

          {/* Enlaces de gestión del panel admin */}
          <ul className="flex flex-col space-y-1">
            {[
              { href: "/admin", label: "Área Privada" },
              { href: "/admin/projects", label: "Editar Proyectos" },
              { href: "/admin/blog", label: "Editar Blog" },
              { href: "/admin/perfil", label: "Mi Cuenta" },
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

        {/* Botón de logout */}
        <div className="p-4 border-t border-[#C2E7DA] space-y-3">
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

export default AdminSideMenu;