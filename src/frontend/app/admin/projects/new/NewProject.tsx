/**
 * Página para crear un nuevo proyecto en el panel de administración.
 *
 * Esta vista utiliza el componente ProjectForm para recoger los datos del nuevo proyecto.
 * La lógica de creación se delega a projectService.ts con protección JWT vía fetchWithAuth.
 * 
 * ✅ Optimización aplicada — memoización y optimización de formularios (2025-01-18)
 */

'use client'

import React, { useCallback } from 'react'
import ProjectForm from '@/components/admin/projects/ProjectForm'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { createProject } from '@/lib/api/projectService'
import { useRouter } from 'next/navigation'

const NewProject: React.FC = React.memo(() => {
  const router = useRouter()

  // ✅ useCallback para evitar recreación de función en cada render
  const handleSubmit = useCallback(async (projectData: any) => {
    try {
      await createProject(projectData)
      alert('Proyecto creado correctamente.')
      router.push('/admin/projects')
    } catch (error: any) {
      console.error('Error al crear el proyecto:', error)
      alert(`Error al crear el proyecto: ${error.message}`)
    }
  }, [router])

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Título y Botón de Volver */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Crear Nuevo Proyecto</h1>
        <Link href="/admin/projects">
          <Button variant="outline" size="sm">← Volver al listado</Button>
        </Link>
      </div>

      {/* Formulario de creación de proyecto */}
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  )
}

});

// ✅ React.memo aplicado para evitar renders innecesarios
export default NewProject
