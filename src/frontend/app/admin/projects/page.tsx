/**
 * Página de gestión de proyectos (/admin/projects)
 *
 * Lista todos los proyectos existentes con opciones para eliminar o crear nuevos.
 * Muestra tarjetas visuales (ProjectCard) y maneja estados de carga y vacío.
 * El diseño y metadatos SEO son gestionados por /app/admin/layout.tsx.
 * 
 * Optimización aplicada — caching con SWR y memoización (2025-01-18)
 */

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import ProjectCard from "@/components/admin/projects/ProjectCardAdmin";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import { getProjects, deleteProject } from "@/lib/api/projectService";

// SWR fetcher function para cache automático
const fetcher = function fetcher() {
  return getProjects();
};

const ProjectsAdminPage: React.FC = () => {
  // SWR para cache inteligente y revalidación automática
  const { data: projects, error, isLoading, mutate } = useSWR('/api/projects', fetcher, {
    revalidateOnFocus: false, // No revalidar al cambiar de pestaña
    revalidateOnReconnect: true, // Revalidar al reconectar
    dedupingInterval: 300000, // 5 minutos de deduplicación
  });

  // useMemo para extraer proyectos (evita recálculos innecesarios)
  const projectsList = useMemo(() => projects || [], [projects]);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este proyecto?");
    if (!confirmDelete) return;

    try {
      await deleteProject(slug);
      // Revalidar cache después de eliminar
      mutate();
    } catch (err) {
      console.error("Error eliminando proyecto:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Gestión de Proyectos</h1>

        <div className="flex flex-wrap gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              ← Volver al panel
            </Button>
          </Link>

          <Link href="/admin/projects/new">
            <Button variant="primary" size="sm">
              Crear Nuevo Proyecto
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12">
          <LoadingState message="Cargando proyectos..." size="md" color="primary" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-600 text-lg">Error al cargar los proyectos</p>
        </div>
      ) : projectsList.length === 0 ? (
        <div className="text-center py-16 bg-[#F1FFEF] rounded-lg border border-[#6290C3]">
          <p className="text-[#1A1341] text-xl mb-4">Aún no has creado ningún proyecto</p>
          <Link href="/admin/projects/new">
            <Button variant="primary">Crear Primer Proyecto</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// React.memo aplicado para evitar renders innecesarios
export default React.memo(ProjectsAdminPage);