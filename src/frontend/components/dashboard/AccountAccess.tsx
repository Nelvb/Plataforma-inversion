/**
 * components/dashboard/AccountAccess.tsx
 *
 * Componente de acceso directo a la gestión de cuenta del usuario.
 * 
 * Características:
 * - Acceso directo a /perfil
 * - Diseño accesible y responsive
 * - Información clara sobre funcionalidades
 * - CTA con Button component
 * - Estilo consistente con ActiveProjects
 * - Navegación semántica y accesible
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { User, Settings } from "lucide-react";

interface AccountAccessProps {
    className?: string;
}

const AccountAccess: React.FC<AccountAccessProps> = ({ className = "" }) => {
    return (
        <section 
            className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}
            aria-label="Acceso a gestión de cuenta"
        >
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                        Gestiona tu cuenta
                    </h2>
                    <p className="text-[#6290C3] text-lg font-medium">
                        Edita tus datos personales o elimina tu perfil cuando lo desees
                    </p>
                </div>

                <div className="text-center py-16">
                    <p className="text-[#1A1341] text-lg mb-8">
                        Accede a tu área de perfil para gestionar tu información personal, 
                        cambiar tu contraseña o eliminar tu cuenta cuando lo necesites.
                    </p>
                    
                    <Link href="http://localhost:3000/perfil">
                        <Button
                            variant="primary"
                            size="lg"
                            className="hover:opacity-90 transition-all duration-300"
                            aria-label="Ir a la página de perfil para gestionar cuenta"
                        >
                            Ir a mi cuenta
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AccountAccess;
