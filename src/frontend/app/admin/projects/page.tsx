/**
 * Página de gestión de proyectos (/admin/projects)
 *
 * Lista todos los proyectos existentes con opciones para eliminar o crear nuevos.
 * Muestra tarjetas visuales (ProjectCard) y maneja estados de carga y vacío.
 * El diseño y metadatos SEO son gestionados por /app/admin/layout.tsx.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import Button from "@/components/ui/Button";
import { getProjects, deleteProject } from "@/lib/api/projectService";
import { Project } from "@/types/project";

const ProjectsAdminPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response);
      } catch (err) {
        console.error("Error cargando proyectos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este proyecto?");
    if (!confirmDelete) return;

    try {
      await deleteProject(slug);
      setProjects((prev) => prev.filter((project) => project.slug !== slug));
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
        <p className="text-center text-[#1A1341]">Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-[#F1FFEF] rounded-lg border border-[#6290C3]">
          <p className="text-[#1A1341] text-xl mb-4">Aún no has creado ningún proyecto</p>
          <Link href="/admin/projects/new">
            <Button variant="primary">Crear Primer Proyecto</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
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

export default ProjectsAdminPage;