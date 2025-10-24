/**
 * ProjectCardAdmin.tsx — Tarjeta de proyecto para panel de administración
 * ------------------------------------------------------------
 * Componente para mostrar proyectos en el panel de administración
 * 
 * Características:
 * - Diseño específico para administradores
 * - Botones de editar y eliminar
 * - Información completa del proyecto
 * - Estados de carga y confirmación
 * - Responsive design
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Project } from '@/types/project'
import { 
  MapPin, 
  TrendingUp, 
  Euro, 
  Edit,
  Trash2,
  Building,
  Users,
  Clock,
  ExternalLink
} from 'lucide-react'

interface ProjectCardAdminProps {
  project: Project
  onDelete: (slug: string) => void
}

const ProjectCardAdmin: React.FC<ProjectCardAdminProps> = ({ project, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el proyecto "${project.title}"?`)) {
      setIsDeleting(true)
      try {
        await onDelete(project.slug)
      } catch (error) {
        console.error('Error eliminando proyecto:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
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
            className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border ${
              project.status === "open" || project.status === "active"
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
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#1A1341] mb-2 line-clamp-2 group-hover:text-[#6290C3] transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{project.investment_data?.property_specs?.address || project.investment_data?.property_specs?.neighborhood || 'Ubicación no especificada'}</span>
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
              <span className="text-xs text-gray-600">Meta de inversión</span>
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

        {/* Detalles adicionales */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
          {project.investment_data?.investment_type && (
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>{project.investment_data.investment_type}</span>
            </div>
          )}
          {project.investment_data?.property_specs?.surface_m2 && (
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>{project.investment_data.property_specs.surface_m2} m²</span>
            </div>
          )}
          {project.investment_data?.property_specs?.rooms && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.investment_data.property_specs.rooms} hab</span>
            </div>
          )}
          {project.investment_data?.execution_time && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{project.investment_data.execution_time}</span>
            </div>
          )}
        </div>

        {/* Botones de administración */}
        <div className="flex gap-3">
          <Link href={`/admin/projects/edit/${project.slug}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Editar
            </Button>
          </Link>
          
          <Link href={`/proyectos/${project.slug}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Ver
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardAdmin