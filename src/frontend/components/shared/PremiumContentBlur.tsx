/**
 * PremiumContentBlur.tsx — Componente de blur para contenido premium
 * ------------------------------------------------------------
 * Bloquea contenido sensible para usuarios no autenticados
 *
 * Características:
 * - Blur CSS sobre contenido (SEO-friendly)
 * - Banner horizontal estilo Urbanitae
 * - Diseño corporativo Boost A Project
 * - Compatible con SSR (Next.js)
 * - Responsive y accesible
 *
 * @author Boost A Project Team
 * @since v1.4.0
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

interface PremiumContentBlurProps {
    children: React.ReactNode;
}

const PremiumContentBlur: React.FC<PremiumContentBlurProps> = ({
    children
}) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    // Usuario autenticado → Mostrar contenido sin blur
    if (isAuthenticated) {
        return <>{children}</>;
    }

    // Usuario NO autenticado → Aplicar blur + banner horizontal
    return (
        <div className="relative">
            {/* Contenido borroso */}
            <div className="blur-sm select-none pointer-events-none">
                {children}
            </div>

            {/* Banner horizontal que empieza en su posición y se hace sticky */}
            <div className="absolute top-0 left-0 right-0 bg-white/70 border-b border-[#6290C3]/20 py-8 px-6 sticky top-36 z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Línea 1 - Grande, azul oscuro */}
                    <h3 className="text-3xl font-bold text-[#1A1341] mb-4">
                        Para ver esta información debes estar logueado
                    </h3>

                    {/* Línea 2 - Mediana, azul corporativo */}
                    <p className="text-lg text-[#6290C3] mb-3">
                        Si aún no tienes cuenta, puedes crearla fácilmente.
                    </p>

                    {/* Línea 3 - Pequeña, azul oscuro con link */}
                    <p className="text-base text-[#1A1341] mb-6">
                        Si ya tienes cuenta, {' '}
                        <button 
                            onClick={() => router.push('/login')} 
                            className="underline text-[#1DA1F2] hover:text-[#1A1341] transition-colors"
                        >
                            accede aquí
                        </button>
                    </p>

                    {/* Botón verde corporativo */}
                    <button
                        onClick={() => router.push('/signup')}
                        className="bg-[#C2E7DA] text-[#1A1341] py-3 px-8 rounded-md font-semibold text-lg hover:bg-white hover:border hover:border-[#C2E7DA] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Regístrate gratis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumContentBlur;