/**
 * page.tsx — Listado de proyectos de inversión
 * ------------------------------------------------------------
 * Unificada visualmente con la vista del blog.
 * Integra ProjectsHeader para replicar el mismo diseño de hero con gradiente.
 * Mantiene toda la lógica original (fetch, filtros, estados, errores).
 * 
 * Optimización aplicada — caching con SWR y memoización (2025-01-18)
 * 
 * @author Boost A Project Team
 * @since v1.4.0
 */

'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { getProjects } from '@/lib/api/projectService';
import { Project } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import ProjectsBanner from '@/components/shared/ProjectsBanner';
import { Filter } from 'lucide-react';
import ProjectsHeader from '@/components/projects/ProjectsHeader';

// SWR fetcher function para cache automático
const fetcher = () => getProjects();

const ProyectosPage: React.FC = React.memo(() => {
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');

    // SWR para cache inteligente y revalidación automática
    const { data: projects, error, isLoading } = useSWR('/api/projects', fetcher, {
        revalidateOnFocus: false, // No revalidar al cambiar de pestaña
        revalidateOnReconnect: true, // Revalidar al reconectar
        dedupingInterval: 300000, // 5 minutos de deduplicación
    });

    // useMemo para filtrar proyectos (evita recálculos innecesarios)
    const filteredProjects = useMemo(() => {
        if (!projects || !Array.isArray(projects)) return [];
        
        if (filter === 'all') {
            return projects;
        } else if (filter === 'open') {
            return projects.filter(p => p.status === 'open' || p.status === 'active');
        } else if (filter === 'closed') {
            return projects.filter(p => p.status === 'closed' || p.status === 'funded');
        }
        return projects;
    }, [filter, projects]);


    return (
        <div className="relative min-h-[100dvh] pt-52">
            {/* Fondo dividido general */}
            <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-[#C2E7DA]" />
                <div className="w-[70%] bg-[#1A1341]" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 container mx-auto px-4 pb-16">
                {/* Header visual con gradiente (idéntico al BlogHeader) */}
                <ProjectsHeader count={projects?.length || 0} />

                {/* Filtros */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 text-[#1A1341]">
                        <Filter className="w-5 h-5 text-[#1A1341]" />
                        <h2 className="text-xl font-semibold">
                            {filter === 'all'
                                ? 'Todos los proyectos'
                                : filter === 'open'
                                    ? 'Proyectos abiertos'
                                    : 'Proyectos cerrados'}
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

                {/* Estados de error / contenido */}
                {error ? (
                    <div className="text-center text-red-700 bg-red-50 p-8 rounded-xl border border-red-200">
                        <h3 className="text-2xl font-bold mb-2">Error al cargar proyectos</h3>
                        <p className="mb-6">{error}</p>
                        <Button variant="primary" onClick={() => window.location.reload()}>
                            Reintentar
                        </Button>
                    </div>
                ) : isLoading ? (
                    <div className="py-20 text-center">
                        <LoadingState message="Cargando proyectos..." size="lg" color="white" />
                    </div>
                ) : (filteredProjects?.length || 0) === 0 ? (
                    <div className="text-center text-white py-12">
                        <p className="text-2xl font-semibold mb-4">No hay proyectos disponibles</p>
                        <p className="text-[#C2E7DA]">
                            Pronto añadiremos nuevas oportunidades de inversión.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={`grid gap-8 ${
                            (filteredProjects?.length || 0) === 1 
                                ? 'grid-cols-1 justify-center max-w-md mx-auto' 
                                : (filteredProjects?.length || 0) === 2 
                                    ? 'grid-cols-1 md:grid-cols-2 justify-center max-w-2xl mx-auto'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {(filteredProjects || []).map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                        
                        {/* Banner cuando hay menos de 3 proyectos */}
                        {(filteredProjects?.length || 0) > 0 && (filteredProjects?.length || 0) < 3 && (
                            <ProjectsBanner className="mt-12" variant="dark" />
                        )}
                    </>
                )}
            </div>
        </div>
    );
});

// React.memo aplicado para evitar renders innecesarios
export default ProyectosPage;
