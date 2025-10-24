/**
 * SideMenuHeader.tsx
 *
 * Cabecera del menú lateral (SideMenu).
 * Muestra el logotipo de Boost A Project y, si el usuario está autenticado,
 * un saludo centrado debajo del header con líneas separadoras diferenciadas.
 *
 * - Fondo del saludo igual que el SideMenu (#F7FAFF)
 * - Línea superior azul oscuro (#1A1341)
 * - Línea inferior verde claro (#C2E7DA)
 * - Estructura y medidas inalteradas
 *
 * @author Boost A Project
 * @since v2.6.5
 */

"use client";

import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface SideMenuHeaderProps {
  onClose: () => void;
}

const SideMenuHeader: React.FC<SideMenuHeaderProps> = ({ onClose }) => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="sticky top-0 z-10">
      {/* Header superior con logo y botón X */}
      <div className="flex justify-between items-center px-6 py-8 bg-[#C2E7DA]">
        <div className="flex items-center space-x-3">
          <h1 className="text-[#1A1341] text-2xl font-bold">
            Boost A Project
          </h1>
        </div>

        <button
          onClick={onClose}
          aria-label="Cerrar menú"
          className="text-[#1A1341] hover:text-[#1DA1F2] transition-all duration-300 text-3xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Saludo con fondo igual al UserSideMenu */}
      {isAuthenticated && (
        <div className="text-center py-3 bg-white border-t-2 border-b border-t-[#1A1341] border-b-[#C2E7DA]">
          <p className="text-[#1A1341] text-lg font-semibold">
            Hola {user?.username}
          </p>
        </div>
      )}
    </div>
  );
};

export default SideMenuHeader;
