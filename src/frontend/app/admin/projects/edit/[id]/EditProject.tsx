/**
 * Página para editar un proyecto existente en el panel de administración.
 *
 * Esta vista utiliza el componente ProjectForm para editar los datos del proyecto.
 * La lógica de actualización se delega a projectService.ts con protección JWT vía fetchWithAuth.
 */

'use client'

import React, { useEffect, useState } from 'react'
import ProjectForm from '@/components/admin/projects/ProjectForm'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import LoadingState from '@/components/ui/LoadingState'
import { getProjectBySlug, updateProject } from '@/lib/api/projectService'
import { useRouter, useParams } from 'next/navigation'
import type { Project, ProjectFormData } from '@/types/project'

const EditProject = () => {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectBySlug(projectId)
        setProject(response)
      } catch (error) {
        console.error('Error cargando proyecto:', error)
        alert('Error al cargar el proyecto')
        router.push('/admin/projects')
      } finally {
        setIsLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId, router])

  const handleSubmit = async (projectData: ProjectFormData) => {
    try {
      await updateProject(projectId, {
        title: projectData.title,
        subtitle: projectData.subtitle,
        description: projectData.description,
        status: projectData.status,
        category: projectData.category,
        featured: projectData.featured,
        priority: projectData.priority,
        main_image_url: projectData.main_image_url,
        gallery: projectData.gallery,
        investment_data: projectData.investment_data,
        content_sections: projectData.content_sections,
      })
      alert('Proyecto actualizado correctamente.')
      router.push('/admin/projects')
    } catch (error: unknown) {
      console.error('Error al actualizar el proyecto:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      alert(`Error al actualizar el proyecto: ${errorMessage}`)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <LoadingState message="Cargando proyecto..." size="lg" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-12 px-4">
        <p className="text-center text-[#1A1341]">Proyecto no encontrado</p>
        <Link href="/admin/projects">
          <Button variant="primary" className="mt-4">Volver al listado</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Título y Botón de Volver */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Editar Proyecto</h1>
        <Link href="/admin/projects">
          <Button variant="outline" size="sm">← Volver al listado</Button>
        </Link>
      </div>

      {/* Formulario de edición de proyecto */}
      <ProjectForm
        onSubmit={handleSubmit}
        initialData={{
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          status: project.status,
          category: project.category,
          featured: project.featured,
          priority: project.priority,
          main_image_url: project.main_image_url,
          gallery: project.gallery,
          investment_data: project.investment_data,
          content_sections: project.content_sections,
        }}
      />
    </div>
  )
}

export default EditProject