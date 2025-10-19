// src/frontend/components/Home/ActiveProjects.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api/projectService";
import { Project } from "@/types/project";

const ActiveProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        // Filtrar solo proyectos abiertos y mostrar máximo 2
        const activeProjects = response
          .filter(project => project.status === 'open')
          .slice(0, 2);
        setProjects(activeProjects);
      } catch (err) {
        console.error("Error cargando proyectos:", err);
        setError("Error al cargar los proyectos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);
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
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#1A1341] text-lg">No hay proyectos disponibles en este momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-[#1A1341] mb-4">
            ¿Quiere ver más proyectos?
          </h3>
          <p className="text-gray-700 max-w-2xl mb-8">
            Explore nuestro catálogo completo de oportunidades de inversión inmobiliaria y encuentre el proyecto perfecto para su cartera.
          </p>
          <Button 
            variant="primary" 
            size="lg"
          >
            Ver todos los proyectos
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ActiveProjects;