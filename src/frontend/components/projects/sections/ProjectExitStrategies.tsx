/**
 * ProjectExitStrategies.tsx — Componente para estrategias de salida
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'exit_strategies' del modelo flexible de proyectos
 *
 * Características:
 * - Lista de estrategias de salida con iconos
 * - Diseño con tarjetas y información detallada
 * - Soporte para múltiples tipos de estrategias
 * - Información financiera y temporal
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Diseño responsive con grid adaptativo
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  ArrowUpRight,
  Building,
  Calculator,
  Users
} from 'lucide-react'

interface ExitStrategy {
  id: number
  name: string
  recommended_duration?: string
  recommended_timing?: string
  description: string
  advantages?: string[]
  ideal_profile?: string
  accumulated_returns?: {
    year_1: string
    year_2: string
    year_3: string
    year_5: string
  }
  optimal_timing?: string[]
  estimated_value?: {
    initial_cost: number
    post_reform_value: string
    expected_plusvalia: string
  }
  total_return_example_5_years?: {
    initial_investment: number
    accumulated_returns: number
    plusvalia_on_sale: number
    total_recovered: number
    total_return_percentage: number
    annualized_return: number
  }
  how_it_works?: string[]
  practical_example?: {
    appraised_value_year_3: number
    mortgage_70_percent: number
    your_initial_investment: number
    your_percentage: number
    capital_you_extract: number
    monthly_net_income_continues: string
  }
  advantages_refinancing?: string[]
  liquidity?: string
  process?: string[]
  estimated_price?: string
  example?: {
    participation: number
    years_held: number
    annual_return: number
    initial_capital: number
    accumulated_returns: number
    market_premium: number
    approximate_sale_price: number
  }
}

interface ProjectExitStrategiesProps {
  strategies: ExitStrategy[]
  recommendation?: {
    maximize_profitability: string
    intermediate_liquidity: string
    optimize: string
  }
}

const ProjectExitStrategies: React.FC<ProjectExitStrategiesProps> = ({ 
  strategies, 
  recommendation 
}) => {
  if (!strategies || strategies.length === 0) {
    return null
  }

  const getStrategyIcon = (strategyName: string) => {
    if (strategyName.toLowerCase().includes('renta') || strategyName.toLowerCase().includes('mantenimiento')) {
      return <TrendingUp className="w-6 h-6" />
    }
    if (strategyName.toLowerCase().includes('venta')) {
      return <Building className="w-6 h-6" />
    }
    if (strategyName.toLowerCase().includes('refinanciación')) {
      return <Calculator className="w-6 h-6" />
    }
    if (strategyName.toLowerCase().includes('cesión')) {
      return <Users className="w-6 h-6" />
    }
    return <Target className="w-6 h-6" />
  }

  const getStrategyColor = (index: number) => {
    const colors = [
      'border-blue-200 bg-blue-50',
      'border-green-200 bg-green-50',
      'border-purple-200 bg-purple-50',
      'border-orange-200 bg-orange-50'
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
        <ArrowUpRight className="w-7 h-7 text-[#6290C3]" />
        Estrategias de Salida
      </h2>

      <div className="space-y-6">
        {strategies.map((strategy, index) => (
          <div 
            key={strategy.id} 
            className={`p-6 rounded-lg border-2 ${getStrategyColor(index)}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#6290C3] text-white p-3 rounded-full">
                {getStrategyIcon(strategy.name)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1A1341] mb-2">
                  {strategy.name}
                </h3>
                {(strategy.recommended_duration || strategy.recommended_timing) && (
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {strategy.recommended_duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Duración: {strategy.recommended_duration}</span>
                      </div>
                    )}
                    {strategy.recommended_timing && (
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>Momento: {strategy.recommended_timing}</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {strategy.description}
                </p>
              </div>
            </div>

            {strategy.advantages && strategy.advantages.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#1A1341] mb-2">Ventajas:</h4>
                <ul className="space-y-1">
                  {strategy.advantages.map((advantage, advIndex) => (
                    <li key={advIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#6290C3] mt-1">•</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.ideal_profile && (
              <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Perfil ideal:</strong> {strategy.ideal_profile}
                </p>
              </div>
            )}

            {strategy.accumulated_returns && (
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1A1341] mb-3">Rentabilidades acumuladas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{strategy.accumulated_returns.year_1}</div>
                    <div className="text-gray-600">Año 1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{strategy.accumulated_returns.year_2}</div>
                    <div className="text-gray-600">Año 2</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{strategy.accumulated_returns.year_3}</div>
                    <div className="text-gray-600">Año 3</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{strategy.accumulated_returns.year_5}</div>
                    <div className="text-gray-600">Año 5</div>
                  </div>
                </div>
              </div>
            )}

            {strategy.estimated_value && (
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1A1341] mb-3">Valoración estimada</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coste inicial:</span>
                    <span className="font-semibold">€{strategy.estimated_value.initial_cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor post-reforma:</span>
                    <span className="font-semibold">{strategy.estimated_value.post_reform_value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plusvalía esperada:</span>
                    <span className="font-semibold text-green-600">{strategy.estimated_value.expected_plusvalia}</span>
                  </div>
                </div>
              </div>
            )}

            {strategy.total_return_example_5_years && (
              <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-[#1A1341] mb-3">Ejemplo de retorno total (5 años)</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inversión inicial:</span>
                      <span className="font-semibold">€{strategy.total_return_example_5_years.initial_investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rentabilidades acumuladas:</span>
                      <span className="font-semibold">€{strategy.total_return_example_5_years.accumulated_returns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plusvalía en venta:</span>
                      <span className="font-semibold">€{strategy.total_return_example_5_years.plusvalia_on_sale.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total recuperado:</span>
                      <span className="font-semibold text-green-600">€{strategy.total_return_example_5_years.total_recovered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retorno total:</span>
                      <span className="font-semibold text-green-600">{strategy.total_return_example_5_years.total_return_percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retorno anualizado:</span>
                      <span className="font-semibold text-green-600">{strategy.total_return_example_5_years.annualized_return}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {strategy.how_it_works && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#1A1341] mb-2">Cómo funciona:</h4>
                <ol className="space-y-1">
                  {strategy.how_it_works.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="bg-[#6290C3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {strategy.practical_example && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-[#1A1341] mb-3">Ejemplo práctico</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor tasado año 3:</span>
                      <span className="font-semibold">€{strategy.practical_example.appraised_value_year_3.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hipoteca 70%:</span>
                      <span className="font-semibold">€{strategy.practical_example.mortgage_70_percent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tu inversión inicial:</span>
                      <span className="font-semibold">€{strategy.practical_example.your_initial_investment.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tu porcentaje:</span>
                      <span className="font-semibold">{strategy.practical_example.your_percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital que extraes:</span>
                      <span className="font-semibold text-green-600">€{strategy.practical_example.capital_you_extract.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingresos netos mensuales:</span>
                      <span className="font-semibold text-green-600">{strategy.practical_example.monthly_net_income_continues}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {strategy.advantages_refinancing && strategy.advantages_refinancing.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#1A1341] mb-2">Ventajas de la refinanciación:</h4>
                <ul className="space-y-1">
                  {strategy.advantages_refinancing.map((advantage, advIndex) => (
                    <li key={advIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#6290C3] mt-1">•</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {strategy.liquidity && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>Liquidez:</strong> {strategy.liquidity}
                </p>
              </div>
            )}

            {strategy.process && strategy.process.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-[#1A1341] mb-2">Proceso:</h4>
                <ol className="space-y-1">
                  {strategy.process.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="bg-[#6290C3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {strategy.estimated_price && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Precio estimado:</strong> {strategy.estimated_price}
                </p>
              </div>
            )}

            {strategy.example && (
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1A1341] mb-3">Ejemplo de cesión</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participación:</span>
                      <span className="font-semibold">€{strategy.example.participation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Años mantenida:</span>
                      <span className="font-semibold">{strategy.example.years_held}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retorno anual:</span>
                      <span className="font-semibold">{strategy.example.annual_return}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital inicial:</span>
                      <span className="font-semibold">€{strategy.example.initial_capital.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rentabilidades acumuladas:</span>
                      <span className="font-semibold">€{strategy.example.accumulated_returns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio de venta aproximado:</span>
                      <span className="font-semibold text-green-600">€{strategy.example.approximate_sale_price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {recommendation && (
        <div className="mt-8 p-6 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
          <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Recomendaciones</h3>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <h4 className="font-semibold text-[#1A1341] mb-1">Maximizar rentabilidad</h4>
              <p className="text-sm text-gray-700">{recommendation.maximize_profitability}</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <h4 className="font-semibold text-[#1A1341] mb-1">Liquidez intermedia</h4>
              <p className="text-sm text-gray-700">{recommendation.intermediate_liquidity}</p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <h4 className="font-semibold text-[#1A1341] mb-1">Optimizar</h4>
              <p className="text-sm text-gray-700">{recommendation.optimize}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default ProjectExitStrategies
