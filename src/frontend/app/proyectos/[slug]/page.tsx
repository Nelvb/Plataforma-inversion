/**
 * page.tsx — Vista de detalle de proyecto individual
 * ------------------------------------------------------------
 * Página pública que muestra información completa de un proyecto.
 *
 * Características:
 * - Hero Section delegada a `ProjectHeader`
 * - Breadcrumbs dentro del header
 * - Galería antes/después con tabs
 * - Sidebar sticky con resumen financiero UNIFICADO
 * - Sistema FREEMIUM: contenido visible + contenido premium con blur
 * - CTAs destacados
 * - Loading states profesionales
 * - Error handling coherente
 * - SEO optimizado
 * 
 * Sistema FREEMIUM implementado (2025-01-19)
 * Optimización aplicada — caching con SWR y memoización (2025-01-18)
 * 
 * @author Boost A Project Team
 * @since v1.4.0
 */

'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingState from '@/components/ui/LoadingState';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectSidebar from '@/components/projects/ProjectSidebar';
import PremiumContentBlur from '@/components/shared/PremiumContentBlur';
import { getProjectBySlug } from '@/lib/api/projectService';
import { Project, GalleryImage } from '@/types/project';
import {
    Building,
    Users,
    Clock,
    Maximize2,
} from 'lucide-react';

// Secciones dinámicas
import ProjectSection from '@/components/projects/sections/ProjectSection';
import ProjectRiskAnalysis from '@/components/projects/sections/ProjectRiskAnalysis';
import ProjectLegalInfo from '@/components/projects/sections/ProjectLegalInfo';
import ProjectExitStrategies from '@/components/projects/sections/ProjectExitStrategies';
import FAQ from '@/components/shared/FAQ';
import ProjectLocation from '@/components/projects/sections/ProjectLocation';
import ProjectProfitabilityScenarios from '@/components/projects/sections/ProjectProfitabilityScenarios';
import ProjectProcess from '@/components/projects/sections/ProjectProcess';
import ProjectSensitivityAnalysis from '@/components/projects/sections/ProjectSensitivityAnalysis';

// SWR fetcher function para cache automático
const fetcher = (url: string) => {
    const slug = url.split('/').pop();
    return getProjectBySlug(slug!);
};

const ProjectDetailPage: React.FC = React.memo(() => {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const slug = params.slug as string;

    const [activeGalleryTab, setActiveGalleryTab] = useState<'after' | 'before'>('after');

    // SWR para cache inteligente y revalidación automática
    const { data: project, error, isLoading } = useSWR(`/api/projects/${slug}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 300000,
    });

    // useMemo para procesar datos del proyecto
    const projectData = useMemo(() => {
        if (!project) return null;
        return project;
    }, [project]);

    // useMemo para filtrar imágenes de galería
    const getGalleryImages = useMemo(() => {
        return (category: 'before' | 'after') => {
            if (!projectData?.gallery || !Array.isArray(projectData.gallery)) return [];
            return projectData.gallery.filter((img: GalleryImage) => img.category === category);
        };
    }, [projectData]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1A1341] to-[#6290C3] flex items-center justify-center">
                <LoadingState message="Cargando proyecto..." size="lg" color="white" />
            </div>
        );
    }

    if (error || !projectData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Building className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1A1341] mb-4">
                        Proyecto no encontrado
                    </h1>
                    <p className="text-gray-600 mb-8">
                        El proyecto que buscas no existe o ha sido eliminado.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={() => router.back()}>
                            Volver atrás
                        </Button>
                        <Link href="/proyectos">
                            <Button variant="primary">Ver todos los proyectos</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const afterImages = getGalleryImages('after');
    const beforeImages = getGalleryImages('before');

    // Helper function para renderizar secciones
    const renderSection = (section: any, index: number) => {
        switch (section.type) {
            case 'section':
                return <ProjectSection key={index} data={section} />;
            case 'location':
                return <ProjectLocation key={index} location={section} />;
            case 'profitability_scenarios':
                return (
                    <ProjectProfitabilityScenarios
                        key={index}
                        scenarios={section.scenarios}
                        methodology={section.methodology}
                        comparison_other_investments={section.comparison_other_investments}
                    />
                );
            case 'risk_analysis':
                return (
                    <ProjectRiskAnalysis
                        key={index}
                        risks={section.risks}
                        philosophy={section.philosophy}
                        sensitivity_analysis={section.sensitivity_analysis}
                    />
                );
            case 'legal':
                return <ProjectLegalInfo key={index} data={section} />;
            case 'sensitivity_analysis':
                return <ProjectSensitivityAnalysis key={index} analysis={section} />;
            case 'exit_strategies':
                return (
                    <ProjectExitStrategies
                        key={index}
                        strategies={section.strategies}
                        recommendation={section.recommendation}
                    />
                );
            case 'process':
                return (
                    <ProjectProcess
                        key={index}
                        phases={section.process_phases}
                        title={section.title}
                    />
                );
            case 'faq':
                return (
                    <FAQ
                        key={index}
                        items={section.items}
                        categories={section.categories || section.faq_categories}
                        faqs={section.faqs}
                        title={section.title}
                    />
                );
            default:
                console.warn('Tipo de sección no reconocido:', section.type);
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header unificado */}
            <ProjectHeader project={project} />

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contenido principal */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Descripción */}
                        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                <Building className="w-7 h-7 text-[#6290C3]" />
                                Descripción del Proyecto
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </Card>

                        {/* Galería antes/después */}
                        {project.gallery && project.gallery.length > 0 && (
                            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                    <Maximize2 className="w-7 h-7 text-[#6290C3]" />
                                    Galería del Proyecto
                                </h2>

                                <div className="flex gap-4 mb-6 border-b border-gray-200">
                                    {['after', 'before'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveGalleryTab(tab as 'after' | 'before')}
                                            className={`pb-4 px-6 font-semibold transition-colors relative ${activeGalleryTab === tab
                                                ? 'text-[#1DA1F2]'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            {tab === 'after'
                                                ? `Resultado Final (${afterImages.length})`
                                                : `Estado Original (${beforeImages.length})`}
                                            {activeGalleryTab === tab && (
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1DA1F2]" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {(activeGalleryTab === 'after' ? afterImages : beforeImages).map(
                                        (img: GalleryImage, i: number) => (
                                            <div
                                                key={img.id || i}
                                                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <Image
                                                    src={img.url}
                                                    alt={img.alt || img.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <p className="text-white font-semibold p-4 text-sm">{img.title}</p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Detalles Técnicos */}
                        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                <Maximize2 className="w-7 h-7 text-[#6290C3]" />
                                Detalles Técnicos
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.investment_data?.property_specs?.surface_m2 && (
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="bg-[#6290C3]/10 p-3 rounded-full">
                                            <Building className="w-6 h-6 text-[#6290C3]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Superficie</p>
                                            <p className="text-xl font-bold text-[#1A1341]">
                                                {project.investment_data.property_specs.surface_m2} m²
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {project.investment_data?.property_specs?.rooms && (
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="bg-[#6290C3]/10 p-3 rounded-full">
                                            <Users className="w-6 h-6 text-[#6290C3]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Habitaciones</p>
                                            <p className="text-xl font-bold text-[#1A1341]">
                                                {project.investment_data.property_specs.rooms}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {project.investment_data?.property_specs?.bathrooms && (
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="bg-[#6290C3]/10 p-3 rounded-full">
                                            <Building className="w-6 h-6 text-[#6290C3]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Baños</p>
                                            <p className="text-xl font-bold text-[#1A1341]">
                                                {project.investment_data.property_specs.bathrooms}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {project.investment_data?.execution_time && (
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="bg-[#6290C3]/10 p-3 rounded-full">
                                            <Clock className="w-6 h-6 text-[#6290C3]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Plazo Estimado</p>
                                            <p className="text-xl font-bold text-[#1A1341]">
                                                {project.investment_data.execution_time}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* CONTENIDO FLEXIBLE CON SISTEMA FREEMIUM */}
                        {project.content_sections?.length > 0 && (
                            <div className="space-y-8">
                                {project.content_sections.map((section: any, index: number) => {
                                    // Obtener número de secciones libres desde el proyecto (default 5)
                                    const freeSections = project.free_sections_count || 5;
                                    
                                    // Renderizar secciones VISIBLES (primeras freeSections)
                                    if (index < freeSections) {
                                        return renderSection(section, index);
                                    }

                                    // Primera sección bloqueada → renderizar contenido premium según autenticación
                                    if (index === freeSections) {
                                        const premiumSections = project.content_sections.slice(freeSections);
                                        
                                        // Usuario autenticado → Mostrar contenido sin blur
                                        if (isAuthenticated) {
                                            return (
                                                <div key="premium-content">
                                                    {premiumSections.map((premiumSection: any, premiumIndex: number) =>
                                                        renderSection(premiumSection, premiumIndex + freeSections)
                                                    )}
                                                </div>
                                            );
                                        }
                                        
                                        // Usuario NO autenticado → Banner sticky + contenido con blur
                                        return (
                                            <div key="premium-content">
                                                {/* Banner sticky en posición correcta */}
                                                <div className="sticky top-36 left-0 right-0 bg-white/70 border-b border-[#6290C3]/20 py-8 px-6 z-10">
                                                    <div className="text-center max-w-4xl mx-auto">
                                                        <h3 className="text-3xl font-bold text-[#1A1341] mb-4">
                                                            Para ver esta información debes estar logueado
                                                        </h3>
                                                        <p className="text-lg text-[#6290C3] mb-3">
                                                            Si aún no tienes cuenta, puedes crearla fácilmente.
                                                        </p>
                                                        <p className="text-base text-[#1A1341] mb-6">
                                                            Si ya tienes cuenta, {' '}
                                                            <button 
                                                                onClick={() => router.push('/login')} 
                                                                className="underline text-[#1DA1F2] hover:text-[#1A1341] transition-colors"
                                                            >
                                                                accede aquí
                                                            </button>
                                                        </p>
                                                        <button
                                                            onClick={() => router.push('/signup')}
                                                            className="bg-[#C2E7DA] text-[#1A1341] py-3 px-8 rounded-md font-semibold text-lg hover:bg-white hover:border hover:border-[#C2E7DA] transition-all duration-300 shadow-md hover:shadow-lg"
                                                        >
                                                            Regístrate gratis
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {/* Contenido premium con blur */}
                                                <div className="relative">
                                                    <div className="blur-sm select-none pointer-events-none">
                                                        {premiumSections.map((premiumSection: any, premiumIndex: number) =>
                                                            renderSection(premiumSection, premiumIndex + freeSections)
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    // Ya renderizado dentro del blur
                                    return null;
                                })}
                            </div>
                        )}
                    </div>

                    <aside className="lg:col-span-1 relative">
  <div className="sticky top-[-182px]">
    <ProjectSidebar project={project} />
  </div>
</aside>

                </div>
            </div>
        </div>
    );
});

export default ProjectDetailPage;