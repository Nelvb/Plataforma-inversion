/**
 * ProjectRiskAnalysis.tsx — Componente para análisis de riesgos
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'risk_analysis' del modelo flexible de proyectos
 *
 * Características:
 * - Tabla de riesgos con probabilidad e impacto
 * - Lista de mitigaciones por riesgo
 * - Diseño claro y responsive
 * - Colores semánticos para niveles de riesgo
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para indicadores visuales
 * - Componente funcional con props tipadas
 * - Responsive design con grid adaptativo
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { AlertTriangle, Shield, TrendingDown, TrendingUp } from 'lucide-react'

interface RiskItem {
  id?: number
  name: string
  probability: 'Baja' | 'Media' | 'Alta'
  impact: 'Bajo' | 'Medio' | 'Alto'
  description: string
  mitigations: string[]
  residual_impact?: string
  statistics?: string
  market_data?: string
}

interface ProjectRiskAnalysisProps {
  risks: RiskItem[]
  philosophy?: string
  sensitivity_analysis?: {
    title: string
    scenarios: Array<{
      question: string
      result: {
        annual_income?: number
        expenses?: number
        net?: number
        roi?: number
        conclusion: string
      }
    }>
    conclusion: string
  }
}

const ProjectRiskAnalysis: React.FC<ProjectRiskAnalysisProps> = ({ 
  risks, 
  philosophy,
  sensitivity_analysis 
}) => {
  if (!risks || risks.length === 0) {
    return null
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Baja':
      case 'Bajo':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Media':
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Alta':
      case 'Alto':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Baja':
      case 'Bajo':
        return <TrendingDown className="w-4 h-4" />
      case 'Media':
      case 'Medio':
        return <AlertTriangle className="w-4 h-4" />
      case 'Alta':
      case 'Alto':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
        <Shield className="w-7 h-7 text-[#6290C3]" />
        Análisis de Riesgos
      </h2>

      {philosophy && (
        <div className="mb-8 p-6 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
          <p className="text-gray-700 text-lg leading-relaxed italic">
            {philosophy}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {risks.map((risk, index) => (
          <div key={risk.id || index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1A1341] mb-2">
                  {risk.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {risk.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-6">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(risk.probability)}`}>
                  {getRiskIcon(risk.probability)}
                  <span>Probabilidad: {risk.probability}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(risk.impact)}`}>
                  {getRiskIcon(risk.impact)}
                  <span>Impacto: {risk.impact}</span>
                </div>
              </div>
            </div>

            {risk.mitigations && risk.mitigations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-[#1A1341] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#6290C3]" />
                  Medidas de Mitigación
                </h4>
                <ul className="space-y-2">
                  {risk.mitigations.map((mitigation, mitIndex) => (
                    <li key={mitIndex} className="flex items-start gap-3 text-gray-700">
                      <span className="text-[#6290C3] mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{mitigation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {risk.residual_impact && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#6290C3]">
                <p className="text-sm text-gray-700">
                  <strong>Impacto residual:</strong> {risk.residual_impact}
                </p>
              </div>
            )}

            {risk.statistics && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Estadísticas:</strong> {risk.statistics}
                </p>
              </div>
            )}

            {risk.market_data && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Datos de mercado:</strong> {risk.market_data}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {sensitivity_analysis && (
        <div className="mt-8 p-6 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] rounded-lg">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4">
            {sensitivity_analysis.title}
          </h3>
          
          <div className="space-y-4">
            {sensitivity_analysis.scenarios.map((scenario, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1A1341] mb-2">
                  {scenario.question}
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {scenario.result.annual_income && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingresos anuales:</span>
                      <span className="font-semibold">€{scenario.result.annual_income.toLocaleString()}</span>
                    </div>
                  )}
                  {scenario.result.expenses && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gastos:</span>
                      <span className="font-semibold">€{scenario.result.expenses.toLocaleString()}</span>
                    </div>
                  )}
                  {scenario.result.net && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Neto:</span>
                      <span className="font-semibold">€{scenario.result.net.toLocaleString()}</span>
                    </div>
                  )}
                  {scenario.result.roi && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-semibold text-green-600">{scenario.result.roi}%</span>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-700 font-medium">
                  {scenario.result.conclusion}
                </p>
              </div>
            ))}
          </div>

          {sensitivity_analysis.conclusion && (
            <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-[#6290C3]">
              <p className="text-gray-700 leading-relaxed">
                {sensitivity_analysis.conclusion}
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default ProjectRiskAnalysis
