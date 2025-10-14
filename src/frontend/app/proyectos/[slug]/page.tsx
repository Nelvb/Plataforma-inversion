/**
 * page.tsx
 * ------------------------------------------------------------
 * Página de detalle de proyecto (/proyectos/[slug])
 *
 * Muestra información completa del proyecto, incluyendo:
 * - Hero con imagen principal y etiquetas de estado
 * - Descripción general
 * - Detalles técnicos
 * - Estructura financiera
 * - Proyección de rentabilidad
 * - Riesgos y mitigaciones
 * - Equipo promotor
 * - CTA para inversión
 *
 * Compatible con proyectos cargados dinámicamente desde la API.
 * Todos los campos opcionales se renderizan de forma condicional.
 * ------------------------------------------------------------
 */

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { getProjectBySlug } from "@/lib/api/projectService"
import { Project } from "@/types/project"
import {
    MapPin,
    Building,
    TrendingUp,
    Clock,
    Users,
    Shield,
    ArrowLeft,
    CheckCircle,
} from "lucide-react"

const ProjectDetailPage: React.FC = () => {
    const params = useParams()
    const slug = params.slug as string

    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProject = async () => {
            try {
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DA1F2] mx-auto mb-4"></div>
                    <p className="text-[#1A1341] text-lg">Cargando proyecto...</p>
                </div>
            </div>
        )
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#1A1341] mb-4">
                        Proyecto no encontrado
                    </h1>
                    <p className="text-gray-600 mb-8">
                        El proyecto que buscas no existe o ha sido eliminado.
                    </p>
                    <Link href="/">
                        <Button variant="primary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-to-r from-[#1A1341] to-[#6290C3]">
                {project.image_url && (
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover opacity-20"
                    />
                )}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {project.investment_type || "Inversión"}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === "Abierto"
                                        ? "bg-green-500/80 text-white"
                                        : "bg-gray-500/80 text-white"
                                    }`}
                            >
                                {project.status}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {project.title}
                        </h1>
                        <div className="flex items-center gap-4 text-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                <span>{project.expected_return}% rentabilidad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contenido Principal */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Descripción del Proyecto */}
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-[#1A1341] mb-6">
                                Descripción del Proyecto
                            </h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {project.description}
                                </p>
                            </div>
                        </Card>

                        {/* Detalles Técnicos */}
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-[#1A1341] mb-6">
                                Detalles Técnicos
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {project.surface_m2 && (
                                    <div className="flex items-center gap-3">
                                        <Building className="w-5 h-5 text-[#6290C3]" />
                                        <div>
                                            <p className="font-medium text-[#1A1341]">Superficie</p>
                                            <p className="text-gray-600">{project.surface_m2} m²</p>
                                        </div>
                                    </div>
                                )}
                                {project.rooms && (
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-[#6290C3]" />
                                        <div>
                                            <p className="font-medium text-[#1A1341]">Habitaciones</p>
                                            <p className="text-gray-600">{project.rooms}</p>
                                        </div>
                                    </div>
                                )}
                                {project.bathrooms && (
                                    <div className="flex items-center gap-3">
                                        <Building className="w-5 h-5 text-[#6290C3]" />
                                        <div>
                                            <p className="font-medium text-[#1A1341]">Baños</p>
                                            <p className="text-gray-600">{project.bathrooms}</p>
                                        </div>
                                    </div>
                                )}
                                {project.estimated_duration && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-[#6290C3]" />
                                        <div>
                                            <p className="font-medium text-[#1A1341]">
                                                Plazo Estimado
                                            </p>
                                            <p className="text-gray-600">
                                                {project.estimated_duration}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Estructura Financiera */}
                        {project.financial_structure &&
                            project.financial_structure.length > 0 && (
                                <Card className="p-8">
                                    <h2 className="text-2xl font-bold text-[#1A1341] mb-6">
                                        Estructura Financiera
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 font-medium text-[#1A1341]">
                                                        Concepto
                                                    </th>
                                                    <th className="text-right py-3 px-4 font-medium text-[#1A1341]">
                                                        Importe
                                                    </th>
                                                    <th className="text-right py-3 px-4 font-medium text-[#1A1341]">
                                                        Porcentaje
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.financial_structure.map(
                                                    (item: any, index: number) => (
                                                        <tr
                                                            key={index}
                                                            className="border-b border-gray-100"
                                                        >
                                                            <td className="py-3 px-4">{item.concept}</td>
                                                            <td className="py-3 px-4 text-right">
                                                                €{item.amount?.toLocaleString()}
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                {item.percentage}%
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            )}

                        {/* Estructura Financiera (Texto) */}
                        {project.financial_structure_text && (
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold text-[#1A1341] mb-6">
                                    Estructura Financiera
                                </h2>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {project.financial_structure_text}
                                </p>
                            </Card>
                        )}

                        {/* Proyección de Rentabilidad */}
                        {project.rentability_projection && (
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold text-[#1A1341] mb-6">
                                    Proyección de Rentabilidad
                                </h2>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {project.rentability_projection}
                                </p>
                            </Card>
                        )}

                        {/* Riesgos y Mitigaciones */}
                        {project.risk_analysis && (
                            <Card className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="w-6 h-6 text-[#6290C3]" />
                                    <h2 className="text-2xl font-bold text-[#1A1341]">
                                        Riesgos y Mitigaciones
                                    </h2>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {project.risk_analysis}
                                </p>
                            </Card>
                        )}

                        {/* Equipo Promotor */}
                        {project.team_description && (
                            <Card className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <Users className="w-6 h-6 text-[#6290C3]" />
                                    <h2 className="text-2xl font-bold text-[#1A1341]">
                                        Equipo Promotor
                                    </h2>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {project.team_description}
                                </p>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6 sticky top-6">
                            <h3 className="text-xl font-bold text-[#1A1341] mb-6">
                                Resumen de Inversión
                            </h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Meta de inversión</span>
                                    <span className="font-bold text-[#1A1341]">
                                        €{project.investment_goal.toLocaleString()}
                                    </span>
                                </div>

                                {project.min_investment && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Inversión mínima</span>
                                        <span className="font-bold text-[#1A1341]">
                                            €{project.min_investment.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Rentabilidad esperada</span>
                                    <span className="font-bold text-green-600">
                                        {project.expected_return}%
                                    </span>
                                </div>

                                {project.optimistic_return && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Rentabilidad optimista
                                        </span>
                                        <span className="font-bold text-green-600">
                                            {project.optimistic_return}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full mb-4"
                                    disabled={project.status !== "Abierto"}
                                >
                                    {project.status === "Abierto"
                                        ? "Invertir Ahora"
                                        : "Proyecto Cerrado"}
                                </Button>

                                <p className="text-sm text-gray-500 text-center">
                                    {project.status === "Abierto"
                                        ? "Inversión disponible para nuevos participantes"
                                        : "Este proyecto ya no acepta nuevas inversiones"}
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold text-[#1A1341] mb-4">
                                ¿Necesitas más información?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Nuestro equipo de expertos está disponible para resolver tus
                                dudas sobre este proyecto.
                            </p>
                            <Link href="/contact">
                                <Button variant="outline" className="w-full">
                                    Contactar Asesor
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailPage
