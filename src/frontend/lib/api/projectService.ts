/**
 * projectService.ts
 * ------------------------------------------------------------
 * Servicio de comunicación con la API para gestión de proyectos.
 * 
 * Proporciona funciones CRUD:
 * - Obtener todos los proyectos
 * - Obtener un proyecto por slug
 * - Crear, actualizar y eliminar proyectos
 *
 * Cada función devuelve datos en formato JSON ya parseado
 * y maneja errores HTTP de forma explícita.
 * ------------------------------------------------------------
 */

import { Project, ProjectInput } from "@/types/project"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"

const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Obtiene la lista completa de proyectos desde el backend.
 */
export const getProjects = async (): Promise<Project[]> => {
    const res = await fetch(`${API_URL}/projects`)
    if (!res.ok) throw new Error("Error fetching projects")
    return await res.json()
}

/**
 * Obtiene un proyecto por su slug.
 */
export const getProjectBySlug = async (slug: string): Promise<Project> => {
    const res = await fetch(`${API_URL}/projects/${slug}`)
    if (!res.ok) throw new Error("Project not found")
    return await res.json()
}

/**
 * Crea un nuevo proyecto (requiere autenticación).
 */
export const createProject = async (data: ProjectInput): Promise<Project> => {
    const res = await fetchWithAuth(`${API_URL}/projects`, {
        method: "POST",
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error creating project")
    return await res.json()
}

/**
 * Actualiza un proyecto existente (requiere autenticación).
 */
export const updateProject = async (slug: string, data: ProjectInput): Promise<Project> => {
    const res = await fetchWithAuth(`${API_URL}/projects/${slug}`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error updating project")
    return await res.json()
}

/**
 * Elimina un proyecto por slug (requiere autenticación).
 */
export const deleteProject = async (slug: string): Promise<void> => {
    const res = await fetchWithAuth(`${API_URL}/projects/${slug}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error deleting project")
}
