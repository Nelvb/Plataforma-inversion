/**
 * ClientLayout.tsx — Layout con fade-in sincronizado con PageLoader
 *
 * Contexto:
 * Replica LABANDA: permanece oculto hasta que PageLoader termine.
 * Fade-in suave de 0.7s al aparecer.
 * 
 * Notas de mantenimiento:
 * - Escucha evento 'pageLoaderComplete' para mostrar contenido
 * - Si PageLoader no está activo, muestra contenido inmediatamente
 * - Navbar y Footer incluidos en la transición
 * 
 * @author Boost A Project Team
 * @since v2.0.0
 */

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGlobalLayer from "@/components/layout/UiGlobalLayer";
import { useAuthStore } from "@/stores/useAuthStore";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [showContent, setShowContent] = useState(false);

  const isStrictlyAdminHomeOrProfile =
    pathname === "/admin" || pathname === "/admin/perfil";

  const hideLayout =
    pathname.startsWith("/admin") && !isStrictlyAdminHomeOrProfile;

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).pageLoaderActive) {
      const handleLoaderComplete = () => setShowContent(true);
      window.addEventListener('pageLoaderComplete', handleLoaderComplete);
      return () => window.removeEventListener('pageLoaderComplete', handleLoaderComplete);
    } else {
      setShowContent(true);
    }
  }, []);

  if (!showContent) {
    return null;
  }

  return (
    <div 
      className="transition-opacity duration-700"
      style={{ opacity: showContent ? 1 : 0 }}
    >
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {isAuthenticated && <UiGlobalLayer />}
    </div>
  );
};

export default ClientLayout;