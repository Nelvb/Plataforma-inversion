/**
 * ProjectCard.tsx — Tarjeta de proyecto para vista pública
 * ------------------------------------------------------------
 * Componente para mostrar proyectos en páginas públicas
 * 
 * Características:
 * - Diseño profesional con gradientes corporativos
 * - Información financiera destacada
 * - Estado del proyecto (Abierto/Cerrado)
 * - CTA para ver detalles
 * - Responsive design
 * - Hover effects suaves
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import FavoriteButton from '@/components/ui/FavoriteButton'
import { Project } from '@/types/project'
import {
  MapPin,
  TrendingUp,
  Euro,
  Building
} from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onLoginRequired?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLoginRequired }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#6290C3]/30 group">
      {/* Imagen del proyecto */}
      <div className="relative h-48 overflow-hidden">
        {project.main_image_url ? (
          <Image
            src={project.main_image_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Error loading project image:', project.main_image_url)
              e.currentTarget.style.display = 'none'
              // Mostrar fallback si la imagen falla
              const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback')
              if (fallback) {
                (fallback as HTMLElement).style.display = 'flex'
              }
            }}
          />
        ) : null}

        {/* Fallback cuando no hay imagen o falla */}
        <div
          className={`image-fallback w-full h-full bg-gradient-to-br from-[#6290C3] to-[#1A1341] flex items-center justify-center ${project.main_image_url ? 'hidden' : 'flex'}`}
        >
          <Building className="w-16 h-16 text-white/60" />
        </div>

        {/* Overlay con estado */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border ${project.status === "open" || project.status === "active"
                ? "bg-green-500/90 text-white border-green-400/30"
                : "bg-gray-500/90 text-white border-gray-400/30"
              }`}
          >
            {project.status === "open" ? "Abierto" :
              project.status === "active" ? "Activo" :
                project.status === "funded" ? "Financiado" :
                  project.status === "closed" ? "Cerrado" : project.status}
          </span>
        </div>

        {/* Overlay con título y dirección */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2 group-hover:text-[#6290C3] transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">
              {project.investment_data?.property_specs?.address ||
                project.investment_data?.property_specs?.neighborhood ||
                "Ubicación no especificada"}
            </span>
          </div>
        </div>

        {/* Botón de favorito */}
        <div className="absolute bottom-4 right-4 z-10">
          <FavoriteButton
            project={project}
            size="md"
            onLoginRequired={onLoginRequired}
          />
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#6290C3] mb-3">
            <span>{project.investment_data?.investment_type || "Inversión"}</span>
            <span>{project.investment_data?.execution_time || ""}</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Información financiera */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#F1FFEF] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Euro className="w-4 h-4 text-[#6290C3]" />
              <span className="text-xs text-gray-600">Meta</span>
            </div>
            <p className="text-lg font-bold text-[#1A1341]">
              €{(project.investment_data?.total_investment || 0).toLocaleString('es-ES')}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-gray-600">Rentabilidad</span>
            </div>
            <p className="text-lg font-bold text-green-600">
              {project.investment_data?.expected_return || 'N/A'}
            </p>
          </div>
        </div>


        {/* CTA */}
        <Link href={`/proyectos/${project.slug}`}>
          <Button
            variant="primary"
            className="w-full"
            disabled={project.status === "closed" || project.status === "funded"}
          >
            {project.status === "open" || project.status === "active" ? "Ver detalles" : "Proyecto cerrado"}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProjectCard
