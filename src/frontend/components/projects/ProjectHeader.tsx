/**
 * ProjectHeader.tsx — Encabezado visual del detalle de proyecto.
 * --------------------------------------------------------------
 * Muestra imagen principal, tipo de inversión, estado, título,
 * ubicación, rentabilidad y plazo con un hero coherente con el
 * ArticleHeader (blog).
 *
 * Características:
 * - Imagen principal con overlay degradado oscuro azul (#1A1341 → #6290C3)
 * - Contenido centrado verticalmente
 * - Badges para tipo y estado
 * - Texto blanco con sombra sutil
 * - Breadcrumbs integrados dentro del header
 * 
 * Notas de mantenimiento:
 * - Recibe un objeto Project (completo)
 * - No realiza fetch ni efectos secundarios
 * - Reutilizable para futuras vistas o layouts
 *
 * @author Boost A Project Team
 * @since v1.4.0
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import {
    Home,
    ChevronRight,
    MapPin,
    TrendingUp,
    Calendar,
} from 'lucide-react';

interface ProjectHeaderProps {
    project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
    return (
        <header className="relative h-[70dvh] min-h-[500px] overflow-hidden pt-40 sm:pt-44 md:pt-0">
            {/* Imagen de fondo con overlay azul */}
            {project.main_image_url && (
                <div className="absolute inset-0">
                    <Image
                        src={project.main_image_url}
                        alt={project.title}
                        fill
                        priority
                        className="object-cover"
                        onError={(e) => {
                            console.error('Error cargando imagen del header:', project.main_image_url);
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A1341]/75 via-[#1A1341]/40 to-transparent"></div>
                </div>
            )}

            {/* Contenido centrado */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-base mb-6">
                    <Link href="/" className="flex items-center gap-1 text-[#C2E7DA] hover:text-white transition-colors">
                        <Home className="w-4 h-4" />
                        Inicio
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <Link href="/proyectos" className="text-[#C2E7DA] hover:text-white transition-colors">
                        Proyectos
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    <span className="text-gray-100">{project.title}</span>
                </nav>
                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-3 mb-5">
                    {project.investment_data?.investment_type && (
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                            {project.investment_data.investment_type}
                        </span>
                    )}
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${project.status === 'open' || project.status === 'active'
                            ? 'bg-green-500/80 text-white border-green-400/30'
                            : 'bg-gray-500/80 text-white border-gray-400/30'
                            }`}
                    >
                        {project.status === 'open'
                            ? 'Abierto'
                            : project.status === 'active'
                                ? 'Activo'
                                : project.status === 'funded'
                                    ? 'Financiado'
                                    : project.status === 'closed'
                                        ? 'Cerrado'
                                        : project.status}
                    </span>
                </div>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                    {project.title}
                </h1>

                {/* Info general */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-lg">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>
                            {project.investment_data?.property_specs?.address ||
                                project.investment_data?.property_specs?.neighborhood ||
                                'Ubicación no especificada'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-semibold">
                            {project.investment_data?.expected_return || 'N/A'} rentabilidad
                        </span>
                    </div>

                    {project.investment_data?.execution_time && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{project.investment_data.execution_time}</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default ProjectHeader;
