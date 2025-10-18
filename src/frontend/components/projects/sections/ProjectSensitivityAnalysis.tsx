/**
 * ProjectSensitivityAnalysis.tsx — Componente para análisis de sensibilidad
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'sensitivity_analysis' del modelo flexible de proyectos
 *
 * Características:
 * - Escenarios financieros con valores calculados
 * - Tabla compacta con resultados destacados
 * - ROI final en color verde
 * - Diseño con cards y colores semánticos
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Diseño responsive con grid adaptativo
 * - Colores del sistema de diseño
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calculator, 
  BarChart3,
  DollarSign
} from 'lucide-react'

interface SensitivityScenario {
  question: string
  result: {
    annual_income?: number
    expenses?: number
    net?: number
    roi?: number
    conclusion: string
    price_per_room?: number
    occupancy?: number
    income?: number
    net_income?: number
  }
}

interface ProjectSensitivityAnalysisProps {
  analysis: {
    title: string
    scenarios: SensitivityScenario[]
    conclusion: string
  }
}

const ProjectSensitivityAnalysis: React.FC<ProjectSensitivityAnalysisProps> = ({ analysis }) => {
  if (!analysis || !analysis.scenarios || analysis.scenarios.length === 0) {
    return null
  }

  const getScenarioIcon = (question: string) => {
    if (question.toLowerCase().includes('baja') || question.toLowerCase().includes('bajar')) {
      return <TrendingDown className="w-5 h-5" />
    }
    if (question.toLowerCase().includes('aumenta') || question.toLowerCase().includes('aumentar')) {
      return <TrendingUp className="w-5 h-5" />
    }
    return <AlertTriangle className="w-5 h-5" />
  }

  const getScenarioColor = (index: number) => {
    const colors = [
      'border-red-200 bg-red-50',
      'border-yellow-200 bg-yellow-50',
      'border-blue-200 bg-blue-50',
      'border-green-200 bg-green-50'
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      <h2 className="text-2xl font-bold text-[#1A1341] mb-4 flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-[#6290C3]" />
        {analysis.title}
      </h2>

      <div className="space-y-6">
        {analysis.scenarios.map((scenario, index) => (
          <div key={index} className={`p-6 rounded-lg border-2 ${getScenarioColor(index)}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#6290C3] text-white p-3 rounded-full">
                {getScenarioIcon(scenario.question)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1A1341] mb-2">
                  {scenario.question}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {/* Ingresos anuales */}
                  {scenario.result.annual_income && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Ingresos anuales:</span>
                      <span className="font-semibold text-[#1A1341]">€{scenario.result.annual_income.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Gastos */}
                  {scenario.result.expenses && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Gastos:</span>
                      <span className="font-semibold text-red-600">€{scenario.result.expenses.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Neto */}
                  {scenario.result.net && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Neto:</span>
                      <span className="font-semibold text-green-600">€{scenario.result.net.toLocaleString()}</span>
                    </div>
                  )}

                  {/* ROI */}
                  {scenario.result.roi && (
                    <div className="flex justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <span className="text-gray-600 font-medium">ROI:</span>
                      <span className="font-bold text-green-600 text-lg">{scenario.result.roi}%</span>
                    </div>
                  )}

                  {/* Precio por habitación */}
                  {scenario.result.price_per_room && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Precio/habitación:</span>
                      <span className="font-semibold text-[#1A1341]">€{scenario.result.price_per_room}</span>
                    </div>
                  )}

                  {/* Ocupación */}
                  {scenario.result.occupancy && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Ocupación:</span>
                      <span className="font-semibold text-[#1A1341]">{scenario.result.occupancy}%</span>
                    </div>
                  )}

                  {/* Ingresos */}
                  {scenario.result.income && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Ingresos:</span>
                      <span className="font-semibold text-[#1A1341]">€{scenario.result.income.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Ingresos netos */}
                  {scenario.result.net_income && (
                    <div className="flex justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-600">Ingresos netos:</span>
                      <span className="font-semibold text-green-600">€{scenario.result.net_income.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Conclusión */}
                <div className="mt-4 p-4 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
                  <div className="flex items-start gap-2">
                    <Calculator className="w-5 h-5 text-[#6290C3] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#1A1341] mb-1">Conclusión</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {scenario.result.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusión general */}
      {analysis.conclusion && (
        <div className="mt-8 p-6 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Conclusión del Análisis
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {analysis.conclusion}
          </p>
        </div>
      )}
    </Card>
  )
}

export default ProjectSensitivityAnalysis
