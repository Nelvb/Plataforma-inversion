export interface Project {
    id: number
    title: string
    slug: string
    description: string
    image_url?: string
    investment_goal: number
    location: string
    investment_type?: string
    surface_m2?: number
    rooms?: number
    bathrooms?: number
    min_investment?: number
    expected_return: string
    optimistic_return?: string
    estimated_duration?: string
    status: string
    financial_structure?: any[]
    risk_mitigations?: string[]
    gallery?: string[]
    // Campos adicionales para formulario avanzado
    financial_structure_text?: string
    rentability_projection?: string
    risk_analysis?: string
    team_description?: string
    external_link?: string
    created_at?: string
    updated_at?: string
}

export type ProjectInput = Omit<Project, "id" | "slug" | "created_at" | "updated_at">

export const PROJECT_STATUS = {
    ABIERTO: "Abierto",
    CERRADO: "Cerrado",
    COMPLETADO: "Completado",
    CANCELADO: "Cancelado"
} as const

export const INVESTMENT_TYPES = {
    RESIDENTIAL: "Residencial",
    COMMERCIAL: "Comercial",
    MIXED: "Mixto",
    INDUSTRIAL: "Industrial"
} as const

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS]
export type InvestmentType = typeof INVESTMENT_TYPES[keyof typeof INVESTMENT_TYPES]