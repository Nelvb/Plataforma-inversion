/**
 * Navbar.tsx — Barra de navegación global de Boost A Project.
 *
 * Versión profesional con color y animación originales restaurados:
 * - Transparente al inicio
 * - Azul corporativo (#1DA1F2) al hacer scroll
 * - Enlaces visibles en desktop con subrayado animado
 * - Botones “REGÍSTRATE” y “ACCEDER” (verde sólido y outlineGreen)
 * - Botón hamburguesa solo visible en mobile
 *
 * Mantiene logo, altura y lógica de menú lateral originales.
 *
 * @author Boost A Project
 * @since v2.2.2
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import AdminSideMenu from "@/components/sideMenus/AdminSideMenu";
import UserSideMenu from "@/components/sideMenus/UserSideMenu";
import SideMenu from "@/components/sideMenus/SideMenu";
import UserAvatarMenu from "@/components/ui/UserAvatarMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    fixed w-full top-0 left-0 z-20 h-36 flex items-center
    transition-colors duration-300
    ${scrolled ? "bg-[#1DA1F2] shadow-md" : "bg-transparent"}
  `;

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/blog", label: "Blog" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <>
      <nav className={navbarClasses}>
        <div className="w-full px-6 lg:px-12 flex justify-between items-center h-full">
          {/* LOGO PRINCIPAL */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
              alt="Boost A Project Logo"
              width={50}
              height={50}
              priority
              className="w-32 h-32 object-contain"
            />
            <span className="sr-only">Boost A Project</span>
          </Link>

          {/* ENLACES + BOTONES — SOLO EN DESKTOP */}
          <div className="hidden lg:flex items-center space-x-10">
            {/* Enlaces principales */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative text-white text-lg transition-all duration-300
                      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                      after:scale-x-0 after:bg-[#C2E7DA] after:transition-transform
                      hover:text-[#C2E7DA] hover:after:scale-x-100
                      ${isActive ? "text-[#C2E7DA] after:scale-x-100" : ""}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Botones de acción - Render condicional */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserAvatarMenu />
              ) : (
                <>
                  <Link href="/signup">
                    <Button
                      variant="secondary"
                      size="md"
                      className="rounded-full px-6 py-2 text-lg hover:border-[#C2E7DA] hover:text-[#C2E7DA] hover:bg-transparent"
                    >
                      REGÍSTRATE
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="outlineGreen"
                      size="md"
                      className="rounded-full px-6 py-2 text-lg border-[#C2E7DA] text-[#C2E7DA] hover:bg-[#C2E7DA] hover:text-[#1A1341]"
                    >
                      ACCEDER
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* BOTÓN HAMBURGUESA — MOBILE Y TABLET */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white text-lg transition-all duration-300 hover:scale-110 transform-gpu"
            aria-label="Abrir menú"
          >
            {isOpen ? (
              <svg
                className="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* MENÚ LATERAL (MÓVIL / TABLET) */}
      {user?.is_admin ? (
        <AdminSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : user ? (
        <UserSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : (
        <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
