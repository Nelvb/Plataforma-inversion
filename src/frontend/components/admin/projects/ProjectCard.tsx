'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import Button from '@/components/ui/Button'

interface ProjectCardProps {
  project: Project
  onDelete: (slug: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="bg-[#F1FFEF] border border-[#6290C3]/30 rounded-lg shadow-md p-4 flex flex-col space-y-3">
      <div className="relative w-full h-48 rounded overflow-hidden">
        <Image
          src={project.image_url || "https://res.cloudinary.com/dy1pkrd52/image/upload/v1743073496/estudio_qmgfwg.webp"}
          alt={project.title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === "Abierto" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      <h2 className="text-[#1A1341] font-bold text-lg line-clamp-2">{project.title}</h2>
      <p className="text-sm text-[#1A1341] opacity-70">{formatDate(project.created_at || '')}</p>
      <p className="text-[#1A1341] text-sm line-clamp-2">{project.description}</p>
      
      <div className="space-y-1">
        <p className="text-sm text-[#1A1341]">
          <span className="font-medium">Objetivo:</span> {formatCurrency(project.investment_goal)}
        </p>
        <p className="text-sm text-[#1A1341]">
          <span className="font-medium">Ubicación:</span> {project.location}
        </p>
        <p className="text-sm text-[#1A1341]">
          <span className="font-medium">Retorno esperado:</span> {project.expected_return}%
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Link href={`/proyectos/${project.slug}`}>
          <Button variant="primary" size="sm">Ver</Button>
        </Link>

        {/* Botón Editar */}
        <Link href={`/admin/projects/edit/${project.slug}`}>
          <Button variant="secondary" size="sm">Editar</Button>
        </Link>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(project.slug)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  )
}

export default ProjectCard
