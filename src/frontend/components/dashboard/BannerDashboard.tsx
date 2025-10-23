/**
 * components/dashboard/BannerDashboard.tsx
 *
 * Banner informativo para el Dashboard del usuario registrado.
 * 
 * Características:
 * - Banner de bienvenida con información de funcionalidades
 * - Diseño con fondo blanco como el home
 * - CTA para navegar a proyectos
 * - Responsive design (mobile/desktop)
 * - Accesibilidad completa con ARIA labels
 * - Tipografía jerarquizada y semántica
 * - Hover effects y transiciones suaves
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface BannerDashboardProps {
    className?: string;
}

const BannerDashboard: React.FC<BannerDashboardProps> = ({ className = "" }) => {
    return (
        <section 
            className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}
            aria-label="Banner de bienvenida del dashboard de usuario"
        >
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                        Bienvenido a tu área privada
                    </h2>
                    <p className="text-[#6290C3] text-lg font-medium mb-8">
                        Como usuario registrado, puedes acceder a toda la información de los proyectos, guardar tus favoritos y simular tus inversiones.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BannerDashboard;
