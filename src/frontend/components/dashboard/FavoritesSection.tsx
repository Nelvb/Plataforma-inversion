/**
 * components/dashboard/FavoritesSection.tsx
 *
 * Sección de proyectos favoritos para el dashboard del usuario.
 * 
 * Características:
 * - Grid responsive con proyectos favoritos
 * - Estado vacío con mensaje y CTA
 * - Integración con useFavoritesStore
 * - Diseño profesional con gradientes corporativos
 * - Navegación a explorar más proyectos
 * - Compatible con ProjectCard existente
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import Link from "next/link";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import { Heart, Search } from "lucide-react";

interface FavoritesSectionProps {
    onLoginRequired?: () => void;
    className?: string;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({
    onLoginRequired,
    className = ""
}) => {
    const { favorites } = useFavoritesStore();

    // Si no hay favoritos, mostrar estado vacío
    if (favorites.length === 0) {
        return (
            <section className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}>
                <div className="max-w-screen-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                            Tus Proyectos Favoritos
                        </h2>
                        <p className="text-[#6290C3] text-lg font-medium">
                            Aún no has guardado ningún proyecto
                        </p>
                    </div>

                    <div className="text-center py-16">
                        <p className="text-[#1A1341] text-lg mb-8">
                            Explora nuestros proyectos de inversión y guarda tus favoritos 
                            para acceder rápidamente a ellos desde tu área privada.
                        </p>
                        
                        <Link href="/proyectos">
                            <Button
                                variant="primary"
                                size="lg"
                                className="inline-flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                Explorar más proyectos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Si hay favoritos, mostrar grid
    return (
        <section className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}>
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                        Tus Proyectos Favoritos
                    </h2>
                    <p className="text-[#6290C3] text-lg font-medium">
                        {favorites.length} proyecto{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Grid de proyectos con lógica responsive como ActiveProjects */}
                <div className={`grid gap-6 ${
                    favorites.length === 1 
                      ? 'grid-cols-1 justify-center max-w-md mx-auto' 
                      : favorites.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2 justify-center max-w-2xl mx-auto'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                    {favorites.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            onLoginRequired={onLoginRequired}
                        />
                    ))}
                </div>

                {/* CTA para explorar más */}
                <div className="mt-16 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold text-[#1A1341] mb-4">
                        ¿Quiere ver más proyectos?
                    </h3>
                    <p className="text-gray-700 max-w-2xl mb-8">
                        Explore nuestro catálogo completo de oportunidades de inversión inmobiliaria y encuentre el proyecto perfecto para su cartera.
                    </p>
                    <Link href="/proyectos">
                        <Button
                            variant="primary"
                            size="lg"
                            className="inline-flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Ver todos los proyectos
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FavoritesSection;
