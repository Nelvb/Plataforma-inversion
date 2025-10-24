/**
 * SideMenu.tsx
 *
 * Menú lateral público para navegación general (usuarios no autenticados o navegación fuera del área privada).
 * Muestra los enlaces públicos definidos en MainMenuLinks y los botones de autenticación.
 * Utiliza el mismo header visual que el resto de SideMenus para coherencia visual.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideMenuHeader from "@/components/common/SideMenuHeader";
import SideMenuAuthSection from "@/components/sideMenus/SideMenuAuthSection";
import MainMenuLinks from "@/components/common/MainMenuLinks";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

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
              { href: "/#faq", label: "Preguntas frecuentes" },
              { href: "/contact", label: "Contacto" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`block px-4 py-3 transition-all duration-300 font-medium relative
                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                    after:scale-x-0 after:bg-[#1DA1F2] after:transition-transform
                    hover:text-[#1DA1F2] hover:after:scale-x-100
                    ${pathname === href
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

        {/* Botones de autenticación */}
        <div className="p-4 border-t border-[#C2E7DA] space-y-3">
          <SideMenuAuthSection onClose={onClose} />
        </div>
      </aside>
    </div>
  );
};

export default SideMenu;
