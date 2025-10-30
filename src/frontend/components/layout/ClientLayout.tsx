/**
 * ClientLayout.tsx — Layout con fade-in sincronizado con PageLoader.
 *
 * Contexto:
 * Replica LABANDA: permanece oculto hasta que PageLoader termine.
 * Fade-in suave de 0.7s al aparecer.
 *
 * Ajuste añadido:
 * - Integración completa del sistema RGPD (CookieBanner, CookieModal, CookieToggle)
 *   visible solo en la parte pública (no en admin).
 *
 * @author Boost A Project
 * @since v2.3.1
 */

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGlobalLayer from "@/components/layout/UiGlobalLayer";
import { useAuthStore } from "@/stores/useAuthStore";
import dynamic from "next/dynamic";

/* ---------------------------------------------
   RGPD — Importación dinámica solo cliente
   (soluciona error "Element type is invalid")
---------------------------------------------- */
const CookieBanner = dynamic(
  () => import("@/components/cookies/CookieBanner").then((m) => m.default),
  { ssr: false }
);

const CookieModal = dynamic(
  () => import("@/components/cookies/CookieModal").then((m) => m.default),
  { ssr: false }
);

const CookieToggle = dynamic(
  () => import("@/components/cookies/CookieToggle").then((m) => m.default),
  { ssr: false }
);

/* ---------------------------------------------
   Declaración de tipo para window.pageLoaderActive
---------------------------------------------- */
declare global {
  interface Window {
    pageLoaderActive?: boolean;
  }
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  useAuthStore();
  const [showContent, setShowContent] = useState(false);

  const isStrictlyAdminHomeOrProfile =
    pathname === "/admin" || pathname === "/admin/perfil";

  const hideLayout =
    pathname.startsWith("/admin") && !isStrictlyAdminHomeOrProfile;

  useEffect(() => {
    if (typeof window !== "undefined" && window.pageLoaderActive) {
      const handleLoaderComplete = () => setShowContent(true);
      window.addEventListener("pageLoaderComplete", handleLoaderComplete);
      return () =>
        window.removeEventListener("pageLoaderComplete", handleLoaderComplete);
    } else {
      setShowContent(true);
    }
  }, []);

  if (!showContent) return null;

  return (
    <div
      className="transition-opacity duration-700"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      {/* NAVBAR y FOOTER visibles solo fuera del admin */}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}

      {/* Capa UI global (todos los usuarios) */}
      <UiGlobalLayer />

      {/* RGPD — Cookies visibles solo fuera del panel admin */}
      {!hideLayout && (
        <>
          <CookieBanner />
          <CookieModal />
          <CookieToggle />
        </>
      )}
    </div>
  );
};

export default ClientLayout;