export interface GalleryImage {
    id: number
    type: string
    category: 'before' | 'after'
    url: string
    alt: string
    title: string
    order: number
}

export interface Project {
    id: number
    slug: string
    title: string
    subtitle?: string
    description?: string
    status: string
    category?: string
    featured?: boolean
    priority?: number
    main_image_url?: string
    gallery?: GalleryImage[]
    investment_data?: {
        total_investment?: number
        currency?: string
        min_investment?: number
        expected_return?: string
        optimistic_return?: string
        conservative_return?: string
        execution_time?: string
        investment_type?: string
        financial_breakdown?: any[]
        property_specs?: {
            surface_m2?: number
            rooms?: number
            bathrooms?: number
            floor?: string
            address?: string
            neighborhood?: string
        }
        income_scenarios?: any
        annual_expenses?: any
    }
    content_sections?: any[]
    views?: number
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