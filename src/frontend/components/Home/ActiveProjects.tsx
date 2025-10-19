// src/frontend/components/Home/ActiveProjects.tsx
// ✅ Optimización aplicada — caching con SWR y memoización (2025-01-18)
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import ProjectsBanner from "@/components/shared/ProjectsBanner";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api/projectService";
import { Project } from "@/types/project";

// ✅ SWR fetcher function para cache automático
const fetcher = (url: string) => getProjects();

const ActiveProjects: React.FC = React.memo(() => {
  // ✅ SWR para cache inteligente y revalidación automática
  const { data: allProjects, error, isLoading } = useSWR('/api/projects', fetcher, {
    revalidateOnFocus: false, // No revalidar al cambiar de pestaña
    revalidateOnReconnect: true, // Revalidar al reconectar
    dedupingInterval: 300000, // 5 minutos de deduplicación
  });

  // ✅ useMemo para filtrar proyectos abiertos (evita recálculos innecesarios)
  const activeProjects = useMemo(() => {
    if (!allProjects) return [];
    return allProjects
      .filter(project => project.status === 'open')
      .slice(0, 2);
  }, [allProjects]);
  return (
    <section className="w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
            ¿Buscando oportunidades de inversión?
          </h2>
          <p className="text-[#6290C3] text-lg font-medium">
            Descubra nuestro catálogo completo de proyectos inmobiliarios con alto potencial de retorno
          </p>
        </div>

        {isLoading ? (
          <LoadingState message="Cargando proyectos..." size="lg" />
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 text-lg">Error al cargar los proyectos</p>
          </div>
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#1A1341] text-lg">No hay proyectos disponibles en este momento</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            activeProjects.length === 1 
              ? 'grid-cols-1 justify-center max-w-md mx-auto' 
              : activeProjects.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 justify-center max-w-2xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Banner cuando hay menos de 3 proyectos */}
        {activeProjects.length > 0 && activeProjects.length < 3 && (
          <ProjectsBanner className="mt-12" />
        )}

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
            >
              Ver todos los proyectos
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
});

// ✅ React.memo aplicado para evitar renders innecesarios
export default ActiveProjects;