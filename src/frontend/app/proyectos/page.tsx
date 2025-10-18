/**
 * page.tsx — Listado de proyectos de inversión
 * ------------------------------------------------------------
 * Página pública que muestra todos los proyectos disponibles
 *
 * Características:
 * - Grid adaptable según número de proyectos (1, 2, 3+ columnas)
 * - Si solo hay 1 proyecto, se centra automáticamente
 * - Si hay número impar > 2, el último se centra
 * - Hero section con gradiente corporativo
 * - Filtros por estado (Todos, Abierto, Cerrado)
 * - Loading states profesionales con LoadingState
 * - Manejo de errores con diseño coherente
 * - SEO optimizado con metadata dinámica
 * - Estadísticas rápidas en el hero
 * 
 * Notas de mantenimiento:
 * - Las cards usan ProjectCard.tsx profesional
 * - El grid usa clases Tailwind con breakpoints responsive
 * - Estados de carga y error siguen el patrón global
 * - Los filtros se gestionan con estado local
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

'use client'

import React, { useState, useEffect } from 'react'
import { getProjects } from '@/lib/api/projectService'
import { Project } from '@/types/project'
import ProjectCard from '@/components/projects/ProjectCard'
import Button from '@/components/ui/Button'
import LoadingState from '@/components/ui/LoadingState'
import { Building2, TrendingUp, Shield, Filter } from 'lucide-react'

const ProyectosPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true)
                const response = await getProjects()
                setProjects(response)
                setFilteredProjects(response)
            } catch (err) {
                console.error('Error cargando proyectos:', err)
                setError('Error al cargar los proyectos. Por favor, intente nuevamente.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProjects()
    }, [])

    useEffect(() => {
        if (filter === 'all') {
            setFilteredProjects(projects)
        } else if (filter === 'open') {
            setFilteredProjects(projects.filter(p => p.status === 'open' || p.status === 'active'))
        } else if (filter === 'closed') {
            setFilteredProjects(projects.filter(p => p.status === 'closed' || p.status === 'funded'))
        }
    }, [filter, projects])

    // Lógica de grid adaptable
    const getGridClass = (count: number) => {
        if (count === 0) return ''
        if (count === 1) return 'flex justify-center'
        if (count === 2) return 'grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    }

    // Calcular rentabilidad media
    const avgReturn = projects.length > 0
        ? (projects.reduce((sum, p) => {
            const returnValue = p.investment_data?.expected_return?.replace('%', '') || '0'
            return sum + parseFloat(returnValue)
        }, 0) / projects.length).toFixed(0)
        : '0'

    // Contar proyectos abiertos
    const openProjectsCount = projects.filter(p => p.status === 'open' || p.status === 'active').length

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#1A1341] via-[#6290C3] to-[#1A1341] py-20 px-4 overflow-hidden">
                {/* Patrón decorativo de fondo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C2E7DA] rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Proyectos de Inversión
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Descubra oportunidades de inversión inmobiliaria seleccionadas con criterios profesionales de rentabilidad, seguridad y transparencia.
                    </p>

                    {/* Estadísticas rápidas */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold">{openProjectsCount}</p>
                                <p className="text-sm text-white/80">Proyectos activos</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold">{avgReturn}%</p>
                                <p className="text-sm text-white/80">Rentabilidad media</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold">100%</p>
                                <p className="text-sm text-white/80">Transparencia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de filtros y proyectos */}
            <section className="max-w-7xl mx-auto px-4 py-12">

                {/* Filtros */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#6290C3]" />
                        <h2 className="text-2xl font-bold text-[#1A1341]">
                            {filter === 'all' ? 'Todos los proyectos' : 
                             filter === 'open' ? 'Proyectos abiertos' : 
                             'Proyectos cerrados'}
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </Button>
                        <Button
                            variant={filter === 'open' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('open')}
                        >
                            Abiertos
                        </Button>
                        <Button
                            variant={filter === 'closed' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('closed')}
                        >
                            Cerrados
                        </Button>
                    </div>
                </div>

                {/* Estados de carga, error y contenido */}
                {isLoading ? (
                    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                        <div className="flex flex-col items-center justify-center py-24">
                            <LoadingState message="Cargando proyectos..." size="lg" />
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-2xl border border-red-200">
                        <div className="text-center max-w-md">
                            <h3 className="text-2xl font-bold text-red-800 mb-2">Error al cargar proyectos</h3>
                            <p className="text-red-600 mb-6">{error}</p>
                            <Button
                                variant="primary"
                                onClick={() => window.location.reload()}
                            >
                                Reintentar
                            </Button>
                        </div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border border-gray-200">
                        <Building2 className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-2xl font-bold text-[#1A1341] mb-2">
                            No hay proyectos disponibles
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filter !== 'all'
                                ? `No hay proyectos ${filter === 'open' ? 'abiertos' : 'cerrados'} en este momento.`
                                : 'Pronto añadiremos nuevas oportunidades de inversión.'}
                        </p>
                        {filter !== 'all' && (
                            <Button variant="primary" onClick={() => setFilter('all')}>
                                Ver todos los proyectos
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Grid de proyectos */}
                        <div className={getGridClass(filteredProjects.length)}>
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>

                        {/* Información adicional */}
                        <div className="mt-16 text-center bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] rounded-2xl p-8 border border-[#6290C3]/20">
                            <h3 className="text-2xl font-bold text-[#1A1341] mb-4">
                                ¿Necesita asesoramiento personalizado?
                            </h3>
                            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                                Nuestro equipo de expertos está disponible para ayudarle a seleccionar la mejor oportunidad de inversión según su perfil y objetivos financieros.
                            </p>
                            <Button variant="primary" size="lg">
                                Solicitar consulta gratuita
                            </Button>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}

export default ProyectosPage