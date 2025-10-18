/**
 * ProjectLegalInfo.tsx — Componente para información legal
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'legal' del modelo flexible de proyectos
 *
 * Características:
 * - Marco legal y normativo
 * - Diseño sobrio con borde lateral azul
 * - Soporte para múltiples secciones legales
 * - Listas y párrafos estructurados
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Diseño profesional para contenido legal
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { Scale, FileText, Shield, AlertCircle } from 'lucide-react'

interface LegalSection {
  title: string
  content: string | string[]
  regulations?: string[]
  difference_from_tourist?: {
    title: string
    reasons: string[]
    conclusion: string
  }
  licenses_certificates?: {
    mandatory_certificates: string[]
    administrative_licenses: string[]
  }
  tenant_contracts?: {
    description: string
    includes: string[]
    legal_status: string
  }
  investor_protection?: {
    documentation_provided: string[]
    legal_structure: string
  }
  taxation?: {
    category: string
    tax_advantages: string[]
    example?: {
      gross_annual_income: number
      deductible_expenses: number
      net_income: number
      with_60_reduction: number
      tax_range: string
    }
    note: string
  }
  cnmv_status?: {
    status: string
    transparency_principles: string[]
  }
}

interface ProjectLegalInfoProps {
  data: LegalSection
}

const ProjectLegalInfo: React.FC<ProjectLegalInfoProps> = ({ data }) => {
  if (!data) {
    return null
  }

  const renderContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      return (
        <p className="text-gray-700 leading-relaxed mb-4">
          {content}
        </p>
      )
    }

    if (Array.isArray(content)) {
      return (
        <div className="space-y-3">
          {content.map((item, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      )
    }

    return null
  }

  const renderList = (items: string[], title?: string) => {
    if (!items || items.length === 0) return null

    return (
      <div className="mb-6">
        {title && (
          <h4 className="text-lg font-semibold text-[#1A1341] mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#6290C3]" />
            {title}
          </h4>
        )}
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700">
              <span className="text-[#6290C3] mt-1 flex-shrink-0">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#6290C3]">
      <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
        <Scale className="w-7 h-7 text-[#6290C3]" />
        {data.title}
      </h2>

      {data.content && renderContent(data.content)}

      {data.regulations && renderList(data.regulations, 'Regulaciones aplicables')}

      {data.difference_from_tourist && (
        <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#6290C3]" />
            {data.difference_from_tourist.title}
          </h3>
          {renderList(data.difference_from_tourist.reasons)}
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-[#6290C3]">
            <p className="text-gray-700 font-medium">
              {data.difference_from_tourist.conclusion}
            </p>
          </div>
        </div>
      )}

      {data.licenses_certificates && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6290C3]" />
            Licencias y Certificados
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {data.licenses_certificates.mandatory_certificates && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-[#1A1341] mb-3">Certificados obligatorios</h4>
                {renderList(data.licenses_certificates.mandatory_certificates)}
              </div>
            )}
            
            {data.licenses_certificates.administrative_licenses && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-[#1A1341] mb-3">Licencias administrativas</h4>
                {renderList(data.licenses_certificates.administrative_licenses)}
              </div>
            )}
          </div>
        </div>
      )}

      {data.tenant_contracts && (
        <div className="mb-6 p-6 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#6290C3]" />
            Contratos de Inquilinos
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {data.tenant_contracts.description}
          </p>
          {renderList(data.tenant_contracts.includes, 'El contrato incluye')}
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-green-500">
            <p className="text-gray-700 font-medium">
              {data.tenant_contracts.legal_status}
            </p>
          </div>
        </div>
      )}

      {data.investor_protection && (
        <div className="mb-6 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#6290C3]" />
            Protección del Inversor
          </h3>
          {renderList(data.investor_protection.documentation_provided, 'Documentación proporcionada')}
          <div className="mt-4 p-4 bg-white rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {data.investor_protection.legal_structure}
            </p>
          </div>
        </div>
      )}

      {data.taxation && (
        <div className="mb-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#6290C3]" />
            Fiscalidad
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {data.taxation.category}
          </p>
          {renderList(data.taxation.tax_advantages, 'Ventajas fiscales')}
          
          {data.taxation.example && (
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-[#1A1341] mb-3">Ejemplo de tributación</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos brutos anuales:</span>
                  <span className="font-semibold">€{data.taxation.example.gross_annual_income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gastos deducibles:</span>
                  <span className="font-semibold">€{data.taxation.example.deductible_expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos netos:</span>
                  <span className="font-semibold">€{data.taxation.example.net_income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Con reducción 60%:</span>
                  <span className="font-semibold">€{data.taxation.example.with_60_reduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rango de tributación:</span>
                  <span className="font-semibold text-[#6290C3]">{data.taxation.example.tax_range}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-[#6290C3]">
            <p className="text-gray-700 text-sm">
              {data.taxation.note}
            </p>
          </div>
        </div>
      )}

      {data.cnmv_status && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#6290C3]" />
            Estado CNMV
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {data.cnmv_status.status}
          </p>
          {renderList(data.cnmv_status.transparency_principles, 'Principios de transparencia')}
        </div>
      )}
    </Card>
  )
}

export default ProjectLegalInfo
