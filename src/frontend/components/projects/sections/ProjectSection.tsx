/**
 * ProjectSection.tsx — Componente para secciones de contenido general
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'section' del modelo flexible de proyectos
 *
 * Características:
 * - Renderiza títulos y contenido HTML seguro
 * - Soporte para listas y párrafos
 * - Diseño coherente con el sistema de diseño
 * - TypeScript estricto
 * 
 * Notas de mantenimiento:
 * - Usa dangerouslySetInnerHTML para contenido HTML
 * - Sanitización debe manejarse en el backend
 * - Componente funcional con props tipadas
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'

interface Subsection {
  subtitle: string
  text?: string
  stats?: string[]
  reasons?: Array<{
    title: string
    description: string
  }>
}

interface SectionData {
  title?: string
  content?: string | string[]
  intro?: string
  description?: string
  paragraphs?: string[]
  subsections?: Subsection[]
  highlight?: string
  reasons?: Array<{
    title: string
    description: string
  }>
  stats?: string[]
  city_context?: string[]
  market_prices?: {
    title: string
    ranges: Array<{
      range: string
      price: string
    }>
  }
  regional_comparison?: Array<{
    city: string
    price: string
    note: string
  }>
  market_trends?: string
}

interface ProjectSectionProps {
  data: SectionData
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ data }) => {
  if (!data) {
    return null
  }

  const renderContent = () => {
    // Renderizar párrafos si existen
    if (data.paragraphs && data.paragraphs.length > 0) {
      return (
        <div className="space-y-4">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )
    }

    // Renderizar contenido HTML si existe
    if (data.content) {
      if (typeof data.content === 'string') {
        return (
          <div 
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )
      }

      if (Array.isArray(data.content)) {
        return (
          <div className="space-y-4">
            {data.content.map((item, index) => (
              <div key={index} className="text-gray-700 leading-relaxed">
                {typeof item === 'string' ? (
                  <p dangerouslySetInnerHTML={{ __html: item }} />
                ) : (
                  <p>{item}</p>
                )}
              </div>
            ))}
          </div>
        )
      }
    }

    return null
  }

  const renderSubsections = () => {
    if (!data.subsections || data.subsections.length === 0) {
      return null
    }

    return (
      <div className="space-y-6">
        {data.subsections.map((subsection, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-3">
              {subsection.subtitle}
            </h3>
            
            {subsection.text && (
              <p className="text-gray-700 leading-relaxed">
                {subsection.text}
              </p>
            )}

            {subsection.stats && subsection.stats.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4">
                {subsection.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="p-4 bg-[#F1FFEF] rounded-lg border border-[#6290C3]/20">
                    <p className="text-gray-700 font-medium">{stat}</p>
                  </div>
                ))}
              </div>
            )}

            {subsection.reasons && subsection.reasons.length > 0 && (
              <div className="space-y-3">
                {subsection.reasons.map((reason, reasonIndex) => (
                  <div key={reasonIndex} className="p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-[#1A1341] mb-2">{reason.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{reason.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderReasons = () => {
    if (!data.reasons || data.reasons.length === 0) {
      return null
    }

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Razones principales</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {data.reasons.map((reason, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-[#1A1341] mb-2">{reason.title}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderStats = () => {
    if (!data.stats || data.stats.length === 0) {
      return null
    }

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Estadísticas clave</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {data.stats.map((stat, index) => (
            <div key={index} className="p-4 bg-[#F1FFEF] rounded-lg border border-[#6290C3]/20">
              <p className="text-gray-700 font-medium">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCityContext = () => {
    if (!data.city_context || data.city_context.length === 0) {
      return null
    }

    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-[#1A1341] mb-2">Contexto de la ciudad</h3>
        <ul className="list-disc pl-6 space-y-1 text-[#1A1341]/80">
          {data.city_context.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  const renderMarketPrices = () => {
    if (!data.market_prices || !data.market_prices.ranges || data.market_prices.ranges.length === 0) {
      return null
    }

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-[#1A1341] mb-2">
          {data.market_prices.title || "Precios del mercado"}
        </h3>
        <table className="w-full border border-[#6290C3]/20 text-sm">
          <tbody>
            {data.market_prices.ranges.map((range, idx) => (
              <tr key={idx} className="border-t border-[#6290C3]/10">
                <td className="p-2 font-medium">{range.range}</td>
                <td className="p-2 text-right">{range.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderRegionalComparison = () => {
    if (!data.regional_comparison || data.regional_comparison.length === 0) {
      return null
    }

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-[#1A1341] mb-2">Comparativa regional</h3>
        <table className="w-full border border-[#6290C3]/20 text-sm">
          <thead>
            <tr className="bg-[#C2E7DA]/40">
              <th className="p-2 text-left">Ciudad</th>
              <th className="p-2 text-left">Precio</th>
              <th className="p-2 text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            {data.regional_comparison.map((row, idx) => (
              <tr key={idx} className="border-t border-[#6290C3]/10">
                <td className="p-2">{row.city}</td>
                <td className="p-2">{row.price}</td>
                <td className="p-2">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderMarketTrends = () => {
    if (!data.market_trends) {
      return null
    }

    return (
      <p className="mt-6 italic text-[#1A1341]/70">{data.market_trends}</p>
    )
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      {data.title && (
        <h2 className="text-2xl font-bold text-[#1A1341] mb-4">
          {data.title}
        </h2>
      )}
      
      {data.intro && (
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {data.intro}
        </p>
      )}

      {data.description && (
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line mb-6">
          {data.description}
        </p>
      )}

      {renderContent()}
      {renderSubsections()}
      {renderReasons()}
      {renderStats()}
      {renderCityContext()}
      {renderMarketPrices()}
      {renderRegionalComparison()}

      {data.highlight && (
        <div className="mt-6 p-6 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
          <blockquote className="text-gray-700 leading-relaxed italic">
            {data.highlight}
          </blockquote>
        </div>
      )}

      {renderMarketTrends()}
    </Card>
  )
}

export default ProjectSection
