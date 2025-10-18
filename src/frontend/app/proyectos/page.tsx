/**
 * page.tsx — Listado de proyectos de inversión
 * ------------------------------------------------------------
 * Unificada visualmente con la vista del blog.
 * Integra ProjectsHeader para replicar el mismo diseño de hero con gradiente.
 * Mantiene toda la lógica original (fetch, filtros, estados, errores).
 * 
 * @author Boost A Project Team
 * @since v1.4.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { getProjects } from '@/lib/api/projectService';
import { Project } from '@/types/project';
import ProjectCard from '@/components/projects/ProjectCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import { Filter } from 'lucide-react';
import ProjectsHeader from '@/components/projects/ProjectsHeader';

const ProyectosPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');

    // Cargar proyectos
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const response = await getProjects();
                setProjects(response);
                setFilteredProjects(response);
            } catch (err) {
                console.error('Error cargando proyectos:', err);
                setError('Error al cargar los proyectos. Por favor, intente nuevamente.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Aplicar filtros
    useEffect(() => {
        if (filter === 'all') {
            setFilteredProjects(projects);
        } else if (filter === 'open') {
            setFilteredProjects(projects.filter(p => p.status === 'open' || p.status === 'active'));
        } else if (filter === 'closed') {
            setFilteredProjects(projects.filter(p => p.status === 'closed' || p.status === 'funded'));
        }
    }, [filter, projects]);

    return (
        <div className="relative min-h-screen pt-52">
            {/* Fondo dividido general */}
            <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-[#C2E7DA]" />
                <div className="w-[70%] bg-[#1A1341]" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 container mx-auto px-4 pb-16">
                {/* Header visual con gradiente (idéntico al BlogHeader) */}
                <ProjectsHeader count={projects.length} />

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


                {/* Estados de carga / error / contenido */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <LoadingState message="Cargando proyectos..." size="lg" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-700 bg-red-50 p-8 rounded-xl border border-red-200">
                        <h3 className="text-2xl font-bold mb-2">Error al cargar proyectos</h3>
                        <p className="mb-6">{error}</p>
                        <Button variant="primary" onClick={() => window.location.reload()}>
                            Reintentar
                        </Button>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center text-white py-12">
                        <p className="text-2xl font-semibold mb-4">No hay proyectos disponibles</p>
                        <p className="text-[#C2E7DA]">
                            Pronto añadiremos nuevas oportunidades de inversión.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProyectosPage;
