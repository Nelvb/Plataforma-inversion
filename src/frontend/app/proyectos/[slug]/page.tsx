/**
 * page.tsx — Vista de detalle de proyecto individual
 * ------------------------------------------------------------
 * Página pública que muestra información completa de un proyecto
 *
 * Características:
 * - Hero section con imagen y badges
 * - Breadcrumbs para navegación
 * - Galería antes/después con tabs
 * - Sidebar sticky con resumen financiero
 * - Secciones colapsables (opcional)
 * - CTAs destacados
 * - Loading states profesionales
 * - Error handling con diseño coherente
 * - SEO optimizado
 * 
 * Notas de mantenimiento:
 * - Usa Spinner del sistema de UI
 * - Galería lee desde project.gallery (JSON)
 * - Todos los campos opcionales se renderizan condicionalmente
 * - Links correctos sin nesting inválido
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import LoadingState from "@/components/ui/LoadingState"
import { getProjectBySlug } from "@/lib/api/projectService"
import { Project, GalleryImage } from "@/types/project"
import {
    MapPin,
    Building,
    TrendingUp,
    Clock,
    Users,
    Shield,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Home,
    ChevronRight,
    Euro,
    Calendar,
    Maximize2,
} from "lucide-react"

// Importar componentes de secciones
import ProjectSection from "@/components/projects/sections/ProjectSection"
import ProjectRiskAnalysis from "@/components/projects/sections/ProjectRiskAnalysis"
import ProjectLegalInfo from "@/components/projects/sections/ProjectLegalInfo"
import ProjectExitStrategies from "@/components/projects/sections/ProjectExitStrategies"
import ProjectFAQ from "@/components/projects/sections/ProjectFAQ"
import ProjectLocation from "@/components/projects/sections/ProjectLocation"
import ProjectProfitabilityScenarios from "@/components/projects/sections/ProjectProfitabilityScenarios"
import ProjectProcess from "@/components/projects/sections/ProjectProcess"
import ProjectSensitivityAnalysis from "@/components/projects/sections/ProjectSensitivityAnalysis"

const ProjectDetailPage: React.FC = () => {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug as string

    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeGalleryTab, setActiveGalleryTab] = useState<'after' | 'before'>('after')

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setIsLoading(true)
                const response = await getProjectBySlug(slug)
                setProject(response)
            } catch (err) {
                console.error("Error cargando proyecto:", err)
                setError("Proyecto no encontrado")
            } finally {
                setIsLoading(false)
            }
        }

        if (slug) {
            fetchProject()
        }
    }, [slug])

    // Filtrar galería por categoría
    const getGalleryImages = (category: 'before' | 'after') => {
        if (!project?.gallery || !Array.isArray(project.gallery)) return []
        return project.gallery.filter((img: GalleryImage) => img.category === category)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <LoadingState message="Cargando proyecto..." size="lg" />
                </div>
            </div>
        )
    }

    if (error || !project) {
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
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver atrás
                        </Button>
                        <Link href="/proyectos">
                            <Button variant="primary">
                                Ver todos los proyectos
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const afterImages = getGalleryImages('after')
    const beforeImages = getGalleryImages('before')

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[#6290C3] hover:text-[#1A1341] transition-colors flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <Link href="/proyectos" className="text-[#6290C3] hover:text-[#1A1341] transition-colors">
                            Proyectos
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 line-clamp-1">{project.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[500px] bg-gradient-to-r from-[#1A1341] to-[#6290C3] overflow-hidden">
                {project.main_image_url && (
                    <Image
                        src={project.main_image_url}
                        alt={project.title}
                        fill
                        className="object-cover opacity-30"
                        priority
                        onError={(e) => {
                            console.error('Error loading hero image:', project.main_image_url)
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                                {project.investment_data?.investment_type || "Inversión"}
                            </span>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
                                    project.status === "open" || project.status === "active"
                                        ? "bg-green-500/80 text-white border-green-400/30"
                                        : "bg-gray-500/80 text-white border-gray-400/30"
                                }`}
                            >
                                {project.status === "open" ? "Abierto" : 
                                 project.status === "active" ? "Activo" :
                                 project.status === "funded" ? "Financiado" :
                                 project.status === "closed" ? "Cerrado" : project.status}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{project.investment_data?.property_specs?.address || project.investment_data?.property_specs?.neighborhood || 'Ubicación no especificada'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                <span className="font-semibold">{project.investment_data?.expected_return || 'N/A'} rentabilidad</span>
                            </div>
                            {project.investment_data?.execution_time && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{project.investment_data.execution_time}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Contenido Principal */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Descripción del Proyecto */}
                        <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                <Building className="w-7 h-7 text-[#6290C3]" />
                                Descripción del Proyecto
                            </h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>
                        </Card>

                        {/* Galería Antes/Después */}
                        {project.gallery && project.gallery.length > 0 && (
                            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                    <Maximize2 className="w-7 h-7 text-[#6290C3]" />
                                    Galería del Proyecto
                                </h2>

                                {/* Tabs */}
                                <div className="flex gap-4 mb-6 border-b border-gray-200">
                                    <button
                                        onClick={() => setActiveGalleryTab('after')}
                                        className={`pb-4 px-6 font-semibold transition-colors relative ${
                                            activeGalleryTab === 'after'
                                                ? 'text-[#1DA1F2]'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Resultado Final ({afterImages.length})
                                        {activeGalleryTab === 'after' && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1DA1F2]" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveGalleryTab('before')}
                                        className={`pb-4 px-6 font-semibold transition-colors relative ${
                                            activeGalleryTab === 'before'
                                                ? 'text-[#1DA1F2]'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Estado Original ({beforeImages.length})
                                        {activeGalleryTab === 'before' && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1DA1F2]" />
                                        )}
                                    </button>
                                </div>

                                {/* Grid de imágenes */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {(activeGalleryTab === 'after' ? afterImages : beforeImages).map((img: GalleryImage, index: number) => (
                                        <div
                                            key={img.id || index}
                                            className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <Image
                                                src={img.url}
                                                alt={img.alt || img.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                onError={(e) => {
                                                    console.error('Error loading image:', img.url)
                                                    e.currentTarget.style.display = 'none'
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                <p className="text-white font-semibold p-4 text-sm">
                                                    {img.title}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
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
                                            <p className="text-xl font-bold text-[#1A1341]">{project.investment_data.property_specs.surface_m2} m²</p>
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
                                            <p className="text-xl font-bold text-[#1A1341]">{project.investment_data.property_specs.rooms}</p>
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
                                            <p className="text-xl font-bold text-[#1A1341]">{project.investment_data.property_specs.bathrooms}</p>
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
                                            <p className="text-xl font-bold text-[#1A1341]">{project.investment_data.execution_time}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Estructura Financiera (Tabla) */}
                        {project.investment_data?.financial_breakdown && project.investment_data.financial_breakdown.length > 0 && (
                            <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
                                    <Euro className="w-7 h-7 text-[#6290C3]" />
                                    Estructura Financiera
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="text-left py-4 px-6 font-semibold text-[#1A1341] rounded-tl-lg">
                                                    Concepto
                                                </th>
                                                <th className="text-right py-4 px-6 font-semibold text-[#1A1341]">
                                                    Importe
                                                </th>
                                                <th className="text-right py-4 px-6 font-semibold text-[#1A1341] rounded-tr-lg">
                                                    Porcentaje
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {project.investment_data.financial_breakdown.map((item: any, index: number) => (
                                                <tr
                                                    key={index}
                                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="py-4 px-6 text-gray-700">{item.concept}</td>
                                                    <td className="py-4 px-6 text-right font-semibold text-[#1A1341]">
                                                        €{item.amount?.toLocaleString('es-ES')}
                                                    </td>
                                                    <td className="py-4 px-6 text-right font-semibold text-[#6290C3]">
                                                        {item.percentage}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        )}

                        {/* Contenido Dinámico del Modelo Flexible */}
                        {project.content_sections && project.content_sections.length > 0 && (
                            <div className="space-y-8">
                                {project.content_sections.map((section: any, index: number) => {
                                    // Renderizar según el tipo de sección usando componentes especializados
                                    switch (section.type) {
                                        case 'section':
                                            return <ProjectSection key={index} data={section} />
                                        
                                        case 'risk_analysis':
                                            return <ProjectRiskAnalysis key={index} risks={section.risks} philosophy={section.philosophy} sensitivity_analysis={section.sensitivity_analysis} />
                                        
                                        case 'legal':
                                            return <ProjectLegalInfo key={index} data={section} />
                                        
                                        case 'exit_strategies':
                                            return <ProjectExitStrategies key={index} strategies={section.strategies} recommendation={section.recommendation} />
                                        
                                        case 'faq':
                                            // ✅ Ajuste profesional: compatibilidad con ambos nombres de campo (categories / faq_categories)
                                            // Esto permite mostrar el FAQ sin cambiar backend ni JSON
                                            return (
                                                <ProjectFAQ
                                                    key={index}
                                                    items={section.items}
                                                    categories={section.categories || section.faq_categories}
                                                    faqs={section.faqs}
                                                    title={section.title}
                                                />
                                            )
                                        
                                        case 'location':
                                            return <ProjectLocation key={index} location={section} />
                                        
                                        case 'profitability_scenarios':
                                            return <ProjectProfitabilityScenarios key={index} scenarios={section.scenarios} methodology={section.methodology} comparison_other_investments={section.comparison_other_investments} />
                                        
                                        case 'process':
                                            return <ProjectProcess key={index} phases={section.process_phases} title={section.title} />
                                        
                                        case 'sensitivity_analysis':
                                            return <ProjectSensitivityAnalysis key={index} analysis={section} />
                                        
                                        default:
                                            console.warn('Tipo de sección no reconocido:', section.type)
                                            return null
                                    }
                                })}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        
                        {/* Resumen de Inversión */}
                        <Card className="p-6 sticky top-6 shadow-xl border-2 border-[#6290C3]/20">
                            <h3 className="text-2xl font-bold text-[#1A1341] mb-6">
                                Resumen de Inversión
                            </h3>

                            <div className="space-y-5 mb-6">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Meta de inversión</span>
                                    <span className="font-bold text-xl text-[#1A1341]">
                                        €{(project.investment_data?.total_investment || 0).toLocaleString('es-ES')}
                                    </span>
                                </div>

                                {project.investment_data?.min_investment && (
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-600 font-medium">Inversión mínima</span>
                                        <span className="font-bold text-xl text-[#1A1341]">
                                            €{project.investment_data.min_investment.toLocaleString('es-ES')}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Rentabilidad esperada</span>
                                    <span className="font-bold text-2xl text-green-600">
                                        {project.investment_data?.expected_return || 'N/A'}
                                    </span>
                                </div>

                                {project.investment_data?.optimistic_return && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Rentabilidad optimista</span>
                                        <span className="font-bold text-2xl text-green-600">
                                            {project.investment_data.optimistic_return}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t-2 border-gray-200 pt-6">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full mb-4 shadow-lg hover:shadow-xl transition-shadow"
                                    disabled={project.status === "closed" || project.status === "funded"}
                                >
                                    {project.status === "open" || project.status === "active"
                                        ? "Invertir Ahora"
                                        : "Proyecto Cerrado"}
                                </Button>

                                <p className="text-sm text-gray-500 text-center leading-relaxed">
                                    {project.status === "open" || project.status === "active"
                                        ? "✓ Inversión disponible para nuevos participantes"
                                        : "Este proyecto ya no acepta nuevas inversiones"}
                                </p>
                            </div>
                        </Card>

                        {/* Contacto */}
                        <Card className="p-6 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border-[#6290C3]/30">
                            <h3 className="text-xl font-bold text-[#1A1341] mb-4">
                                ¿Necesitas más información?
                            </h3>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Nuestro equipo de expertos está disponible para resolver tus dudas sobre este proyecto.
                            </p>
                            <Link href="/contact" className="block">
                                <button className="w-full py-3 px-4 border-2 border-[#1A1341] text-[#1A1341] bg-white rounded-md font-medium hover:bg-[#1A1341] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                                    Contactar Asesor
                                </button>
                            </Link>
                        </Card>

                        {/* Enlace externo (si existe) - Comentado hasta que se defina en el modelo flexible */}
                        {/* {project.external_link && (
                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-[#1A1341] mb-4">
                                    Más información
                                </h3>
                                <a
                                    href={project.external_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1DA1F2] hover:text-[#6290C3] font-medium underline flex items-center gap-2"
                                >
                                    Ver sitio web del proyecto
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </Card>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailPage