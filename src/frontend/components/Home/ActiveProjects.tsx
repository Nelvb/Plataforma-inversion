// src/frontend/components/Home/ActiveProjects.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, MapPin, Building, TrendingUp, Clock } from "lucide-react";
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
          .filter(project => project.status === 'Abierto')
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
    <section className="w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341] mb-2">
              Descubra Oportunidades Exclusivas
            </h2>
            <p className="text-[#6290C3] text-lg font-medium">
              Proyectos seleccionados con alto potencial de retorno
            </p>
          </div>
          <Button 
            variant="outline" 
            size="md" 
            className="mt-4 md:mt-0 flex items-center gap-2"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-[#1A1341] text-lg">Cargando proyectos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#1A1341] text-lg">No hay proyectos disponibles en este momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="relative">
                  <Image
                    src={project.image_url || "https://res.cloudinary.com/dy1pkrd52/image/upload/v1743073496/estudio_qmgfwg.webp"}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#1DA1F2] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.investment_type || 'Inversión'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === "Abierto" ? "bg-[#C2E7DA] text-[#1A1341]" : "bg-white text-[#1A1341]"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1A1341] mb-3">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#6290C3]" />
                      <span className="text-gray-700">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#6290C3]" />
                      <span className="text-gray-700">
                        Inversión mínima: €{project.min_investment?.toLocaleString() || '1,000'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#6290C3]" />
                      <span className="text-gray-700">Rentabilidad: {project.expected_return}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#6290C3]" />
                      <span className="text-gray-700">Plazo: {project.estimated_duration || '12-18 meses'}</span>
                    </div>
                  </div>
                  
                  {/* Barra de progreso simulada */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-[#1A1341]">Financiación</span>
                      <span className="text-sm font-bold text-[#1A1341]">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#1DA1F2] h-2.5 rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link href={`/proyectos/${project.slug}`}>
                    <Button 
                      variant="primary" 
                      size="md" 
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Ver detalles
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-[#1A1341] mb-4">
            ¿Buscando maximizar su capital?
          </h3>
          <p className="text-gray-700 max-w-2xl mb-8">
            Nuestro equipo selecciona únicamente proyectos con potencial real de crecimiento.
            Descubra cómo podemos ayudarle a diversificar su cartera de inversiones.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="flex items-center gap-2"
          >
            Agendar asesoramiento personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActiveProjects;