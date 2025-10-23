/**
 * app/(user_private)/dashboard/page.tsx
 *
 * Dashboard principal del usuario autenticado.
 * 
 * Características:
 * - Integración modular de componentes del dashboard
 * - Mantiene el diseño corporativo existente
 * - Fondo azul corporativo #1A1341 preservado
 * - Compatible con SSR y Zustand stores
 * - Accesibilidad completa con navegación por teclado
 * - Arquitectura limpia y escalable
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import DashboardHeader from "@/components/shared/DashboardHeader";
import BannerDashboard from "@/components/dashboard/BannerDashboard";
import FavoritesSection from "@/components/dashboard/FavoritesSection";
import InvestmentSimulator from "@/components/dashboard/InvestmentSimulator";
import AccountAccess from "@/components/dashboard/AccountAccess";
import ContactCTA from "@/components/dashboard/ContactCTA";

const DashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Verificar autenticación y redirigir si es necesario
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen pt-52">
        <div className="absolute inset-0 flex">
          <div className="w-[30%] bg-[#C2E7DA]" />
          <div className="w-[70%] bg-[#1A1341]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C2E7DA] mx-auto mb-4"></div>
            <p>Verificando acceso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-52">
      {/* Fondo dividido 30/70 - MANTENIDO */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal con cabecera y componentes */}
      <div className="relative z-10 container mx-auto px-4">
        <DashboardHeader />

        {/* Banner informativo */}
        <BannerDashboard />

        {/* Sección de favoritos */}
        <FavoritesSection />

        {/* Simulador de inversiones */}
        <InvestmentSimulator />

        {/* Acceso a cuenta */}
        <AccountAccess />

        {/* Contacto directo */}
        <ContactCTA />
      </div>
    </div>
  );
};

export default DashboardPage;
