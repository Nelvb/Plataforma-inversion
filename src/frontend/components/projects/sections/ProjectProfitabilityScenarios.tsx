/**
 * ProjectProfitabilityScenarios.tsx — Componente para escenarios de rentabilidad
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'profitability_scenarios' del modelo flexible de proyectos
 *
 * Características:
 * - Tres escenarios comparativos (conservador, base, optimista)
 * - Diseño con cards y colores diferenciados
 * - Gráficos de barras para rentabilidad
 * - Ejemplos de inversión con cálculos
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Diseño responsive con grid adaptativo
 * - Colores semánticos para diferentes escenarios
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { TrendingUp, TrendingDown, Target, Calculator, DollarSign, BarChart3 } from 'lucide-react'

interface ScenarioAssumptions {
  price_per_room: number
  occupancy: number
  monthly_income_gross: number
  annual_income_gross: number
}

interface ScenarioExpenses {
  fixed: number
  variable: number
  total: number
}

interface ScenarioResult {
  annual_net_income: number
  roi_percentage: number
}

interface ScenarioExample {
  investment_1k?: {
    amount: number
    year_1_return: number
  }
  investment_10k?: {
    amount: number
    year_1_return: number
    year_2_return?: number
  }
}

interface ProfitabilityScenario {
  name: string
  annual_return: string
  most_probable?: boolean
  assumptions: ScenarioAssumptions
  expenses: ScenarioExpenses
  result: ScenarioResult
  example: ScenarioExample
  note: string
}

interface ComparisonItem {
  type: string
  return: string
}

interface ProjectProfitabilityScenariosProps {
  scenarios: ProfitabilityScenario[]
  methodology?: string
  comparison_other_investments?: ComparisonItem[]
}

const ProjectProfitabilityScenarios: React.FC<ProjectProfitabilityScenariosProps> = ({ 
  scenarios, 
  methodology,
  comparison_other_investments 
}) => {
  if (!scenarios || scenarios.length === 0) {
    return null
  }

  const getScenarioColor = (scenarioName: string, isMostProbable: boolean) => {
    if (isMostProbable) {
      return 'border-[#6290C3] bg-[#6290C3]/5 shadow-lg'
    }
    
    switch (scenarioName.toLowerCase()) {
      case 'conservador':
        return 'border-green-200 bg-green-50'
      case 'base':
        return 'border-blue-200 bg-blue-50'
      case 'optimista':
        return 'border-orange-200 bg-orange-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getScenarioIcon = (scenarioName: string) => {
    switch (scenarioName.toLowerCase()) {
      case 'conservador':
        return <TrendingDown className="w-5 h-5" />
      case 'base':
        return <Target className="w-5 h-5" />
      case 'optimista':
        return <TrendingUp className="w-5 h-5" />
      default:
        return <BarChart3 className="w-5 h-5" />
    }
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      <h2 className="text-2xl font-bold text-[#1A1341] mb-4 flex items-center gap-3">
        <Calculator className="w-6 h-6 text-[#6290C3]" />
        Escenarios de Rentabilidad
      </h2>

      {methodology && (
        <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-[#6290C3]">
          <p className="text-gray-700 leading-relaxed text-sm">
            <strong>Metodología:</strong> {methodology}
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {scenarios.map((scenario, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-2xl border-2 shadow-sm ${getScenarioColor(scenario.name, scenario.most_probable || false)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1A1341] flex items-center gap-2">
                {getScenarioIcon(scenario.name)}
                {scenario.name}
              </h3>
              {scenario.most_probable && (
                <span className="bg-[#6290C3] text-white px-3 py-1 rounded-full text-xs font-medium">
                  Más probable
                </span>
              )}
            </div>
            
            {/* Rentabilidad anual destacada */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {scenario.annual_return}
              </div>
              <p className="text-sm text-gray-600">Rentabilidad anual</p>
            </div>

            {/* Asunciones */}
            <div className="mb-4">
              <h4 className="font-semibold text-[#1A1341] mb-3 text-sm">Asunciones</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio/habitación:</span>
                  <span className="font-semibold">€{scenario.assumptions.price_per_room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ocupación:</span>
                  <span className="font-semibold">{scenario.assumptions.occupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos mensuales:</span>
                  <span className="font-semibold">€{scenario.assumptions.monthly_income_gross.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos anuales:</span>
                  <span className="font-semibold">€{scenario.assumptions.annual_income_gross.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Gastos */}
            <div className="mb-4">
              <h4 className="font-semibold text-[#1A1341] mb-3 text-sm">Gastos</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fijos:</span>
                  <span className="font-semibold">€{scenario.expenses.fixed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Variables:</span>
                  <span className="font-semibold">€{scenario.expenses.variable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <span className="font-semibold">€{scenario.expenses.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-[#1A1341] mb-2 text-sm">Resultado</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ingresos netos anuales:</span>
                  <span className="font-semibold text-green-600">€{scenario.result.annual_net_income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className="font-semibold text-green-600">{scenario.result.roi_percentage}%</span>
                </div>
              </div>
            </div>

            {/* Ejemplo de inversión */}
            {scenario.example.investment_10k && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-[#1A1341] mb-2 text-sm">Ejemplo con €10,000</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Año 1:</span>
                    <span className="font-semibold text-green-600">€{scenario.example.investment_10k.year_1_return.toLocaleString()}</span>
                  </div>
                  {scenario.example.investment_10k.year_2_return && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Año 2:</span>
                      <span className="font-semibold text-green-600">€{scenario.example.investment_10k.year_2_return.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nota */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 leading-relaxed">{scenario.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparación con otras inversiones */}
      {comparison_other_investments && comparison_other_investments.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">Comparación con otras inversiones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparison_other_investments.map((investment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1A1341]">{investment.type}</span>
                  <span className="font-semibold text-[#6290C3]">{investment.return}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default ProjectProfitabilityScenarios
