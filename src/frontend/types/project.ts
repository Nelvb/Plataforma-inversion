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
    free_sections_count?: number
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
        estimated_duration?: string
        investment_type?: string
        financial_breakdown?: Record<string, unknown>[]
        property_specs?: {
            surface_m2?: number
            rooms?: number
            bathrooms?: number
            floor?: string
            address?: string
            neighborhood?: string
        }
        income_scenarios?: Record<string, unknown>
        annual_expenses?: Record<string, unknown>
    }
    content_sections?: ContentSection[]
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

// ✅ INTERFACES EXACTAS DE LOS COMPONENTES
export interface ContentSection {
    type: string;
    title?: string;
    content?: string | string[];
    breakdown?: FinancialBreakdownItem[];

    // Profitability Scenarios
    scenarios?: ProfitabilityScenario[];
    methodology?: string;
    comparison_other_investments?: ComparisonItem[];

    // Risk Analysis
    risks?: RiskItem[];
    philosophy?: string;
    sensitivity_analysis?: SensitivityAnalysis;

    // Location
    address?: string;
    neighborhood?: string;
    description?: string;
    coordinates?: { lat: number; lng: number };
    features?: Array<{ category: string; items: string[] }>;

    // Exit Strategies
    strategies?: ExitStrategy[];
    recommendation?: ExitRecommendation;

    // Legal
    regulations?: string[];

    // Process
    process_phases?: ProcessStep[];

    // FAQ
    items?: FAQItem[];
    categories?: FAQCategory[];
    faqs?: Array<{ category: string; items: FAQItem[] }>;
    faq_categories?: string[];

    [key: string]: unknown;
}

export interface FinancialBreakdownItem {
    concept: string;
    amount: number | string;
    currency?: string;
}

// ✅ PROFITABILITY SCENARIOS (ProjectProfitabilityScenarios.tsx)
export interface ProfitabilityScenario {
    name: string;
    annual_return: string;
    most_probable?: boolean;
    assumptions: {
        price_per_room: number;
        occupancy: number;
        monthly_income_gross: number;
        annual_income_gross: number;
    };
    expenses: {
        fixed: number;
        variable: number;
        total: number;
    };
    result: {
        annual_net_income: number;
        roi_percentage: number;
    };
    example: {
        investment_1k?: {
            amount: number;
            year_1_return: number;
        };
        investment_10k?: {
            amount: number;
            year_1_return: number;
            year_2_return?: number;
        };
    };
    note: string;
}

export interface ComparisonItem {
    type: string;
    return: string;
}

// ✅ RISK ANALYSIS (ProjectRiskAnalysis.tsx)
export interface RiskItem {
    id?: number;
    name: string;
    probability: 'Baja' | 'Media' | 'Alta';
    impact: 'Bajo' | 'Medio' | 'Alto';
    description: string;
    mitigations: string[];
    residual_impact?: string;
    statistics?: string;
    market_data?: string;
}

export interface SensitivityAnalysis {
    title: string;
    scenarios: SensitivityScenario[];
    conclusion: string;
}

export interface SensitivityScenario {
    question: string;
    result: {
        annual_income?: number;
        expenses?: number;
        net?: number;
        roi?: number;
        conclusion: string;
        price_per_room?: number;
        occupancy?: number;
        income?: number;
        net_income?: number;
    };
}

// ✅ EXIT STRATEGIES (ProjectExitStrategies.tsx)
export interface ExitStrategy {
    id: number;
    name: string;
    recommended_duration?: string;
    recommended_timing?: string;
    description: string;
    advantages?: string[];
    ideal_profile?: string;
    [key: string]: unknown;
}

export interface ExitRecommendation {
    maximize_profitability: string;
    intermediate_liquidity: string;
    optimize: string;
}

// ✅ LEGAL (ProjectLegalInfo.tsx)
export interface LegalSection {
    title: string;
    content: string | string[];
    regulations?: string[];
    [key: string]: unknown;
}

// ✅ PROCESS (ProjectProcess.tsx)
export interface ProcessStep {
    phase: number;
    name: string;
    duration: string;
    steps: string[];
    updates?: string[];
    boostaproyect_handles?: string[];
    you_receive?: string[];
}

// FAQ (buscar en FAQ.tsx las interfaces reales)
// Mientras tanto, usa estas que son las más comunes:
export interface FAQItem {
    q: string;  // ← Nota: es 'q', no 'question'
    a: string;  // ← Nota: es 'a', no 'answer'
}

export interface FAQCategory {
    category: string;    // ← ERA "name", AHORA "category"
    questions: FAQItem[];
}

/**
 * Datos para actualizar un proyecto existente
 * Todos los campos son opcionales excepto los que se requieran explícitamente
 */
export interface ProjectUpdateData {
    title?: string
    subtitle?: string
    description?: string
    status?: string
    category?: string
    featured?: boolean
    priority?: number
    main_image_url?: string
    gallery?: GalleryImage[]
    investment_data?: Project['investment_data']
    content_sections?: ContentSection[]
}

/**
 * Datos del formulario de proyecto (para ProjectForm)
 */
export interface ProjectFormData {
    title: string
    subtitle?: string
    description?: string
    status: string
    category?: string
    featured?: boolean
    priority?: number
    main_image_url?: string
    gallery?: GalleryImage[]
    investment_data?: Project['investment_data']
    content_sections?: ContentSection[]
}