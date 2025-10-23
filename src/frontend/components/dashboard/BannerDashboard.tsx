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
            className={`bg-white py-8 px-8 text-center w-full ${className}`}
            aria-label="Banner de bienvenida del dashboard de usuario"
        >
            <div className="w-full">
                <div className="flex flex-col items-center gap-4">
                    {/* Contenido textual */}
                    <div className="w-full">
                        <h2 className="text-lg font-medium text-[#1A1341] mb-4">
                            Como usuario registrado, puedes acceder a toda la información de los proyectos, guardar tus favoritos y simular tus inversiones.
                        </h2>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <Link href="/proyectos">
                            <Button
                                variant="outline"
                                size="md"
                                className="hover:opacity-90 transition-all duration-300"
                                aria-label="Ir a la página de proyectos"
                            >
                                Ver proyectos
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerDashboard;
