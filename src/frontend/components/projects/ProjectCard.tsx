/**
 * ProjectCard.tsx — Tarjeta de proyecto para vista pública
 * ------------------------------------------------------------
 * Igualada visualmente con BlogArticleCard, manteniendo datos de inversión.
 * Misma proporción, sombras, padding y ritmo visual que las tarjetas del blog.
 * 
 * @author Boost A Project Team
 * @since v1.1.0
 */

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Project } from "@/types/project";
import {
  MapPin,
  TrendingUp,
  Euro,
  ArrowRight,
  Building,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#6290C3]/30 bg-white"
      itemScope
      itemType="http://schema.org/Product"
    >
      {/* Imagen superior */}
      <div className="relative w-full h-60 overflow-hidden">
        {project.main_image_url ? (
          <Image
            src={project.main_image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            itemProp="image"
            loading="lazy"
            onError={(e) => {
              console.error("Error loading project image:", project.main_image_url);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#6290C3] to-[#1A1341]">
            <Building className="w-16 h-16 text-white/60" />
          </div>
        )}

        {/* Overlay con estado */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border ${
              project.status === "open" || project.status === "active"
                ? "bg-green-500/90 text-white border-green-400/30"
                : "bg-gray-500/90 text-white border-gray-400/30"
            }`}
          >
            {project.status === "open"
              ? "Abierto"
              : project.status === "active"
              ? "Activo"
              : project.status === "funded"
              ? "Financiado"
              : project.status === "closed"
              ? "Cerrado"
              : project.status}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col justify-between flex-grow min-h-[360px]">
        <div>
          {/* Cabecera */}
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{project.investment_data?.investment_type || "Inversión"}</span>
            <span>{project.investment_data?.execution_time || ""}</span>
          </div>

          {/* Título */}
          <h3
            className="text-xl font-bold text-[#1A1341] mb-3 group-hover:text-[#6290C3] transition-colors line-clamp-2"
            itemProp="name"
          >
            {project.title}
          </h3>

          {/* Dirección */}
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">
              {project.investment_data?.property_specs?.address ||
                project.investment_data?.property_specs?.neighborhood ||
                "Ubicación no especificada"}
            </span>
          </div>

          {/* Meta y rentabilidad */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F1FFEF] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Euro className="w-4 h-4 text-[#6290C3]" />
                <span className="text-xs text-gray-600">Meta</span>
              </div>
              <p className="text-lg font-bold text-[#1A1341]">
                €
                {(project.investment_data?.total_investment || 0).toLocaleString(
                  "es-ES"
                )}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">Rentabilidad</span>
              </div>
              <p className="text-lg font-bold text-green-600">
                {project.investment_data?.expected_return || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Botón */}
        <Link
          href={`/proyectos/${project.slug}`}
          className="mt-auto block"
          aria-label={`Ver proyecto completo: ${project.title}`}
        >
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            aria-label="Ver proyecto completo"
          >
            Ver detalles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
