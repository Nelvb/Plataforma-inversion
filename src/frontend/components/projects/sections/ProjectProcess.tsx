/**
 * ProjectProcess.tsx — Componente para pasos del proceso de inversión
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'process' del modelo flexible de proyectos
 *
 * Características:
 * - Timeline de pasos numerados
 * - Diseño tipo proceso con líneas conectoras
 * - Información de duración y actualizaciones
 * - Diseño con fondo degradado
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Diseño responsive con timeline vertical
 * - Colores del sistema de diseño
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Users, 
  Building, 
  DollarSign,
  FileText,
  Home
} from 'lucide-react'

interface ProcessStep {
  phase: number
  name: string
  duration: string
  steps: string[]
  updates?: string[]
  boostaproyect_handles?: string[]
  you_receive?: string[]
}

interface ProjectProcessProps {
  phases: ProcessStep[]
  title?: string
}

const ProjectProcess: React.FC<ProjectProcessProps> = ({ phases, title = "Proceso de Inversión" }) => {
  if (!phases || phases.length === 0) {
    return null
  }

  const getPhaseIcon = (phaseName: string) => {
    switch (phaseName.toLowerCase()) {
      case 'tu inversión':
        return <DollarSign className="w-5 h-5" />
      case 'nosotros compramos y reformamos':
        return <Building className="w-5 h-5" />
      case 'certificaciones y comercialización':
        return <FileText className="w-5 h-5" />
      case 'empieza a generar rentabilidad':
        return <CheckCircle className="w-5 h-5" />
      case 'gestión continua':
        return <Home className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getPhaseColor = (phaseNumber: number) => {
    const colors = [
      'bg-[#6290C3]',
      'bg-green-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-orange-500'
    ]
    return colors[(phaseNumber - 1) % colors.length]
  }

  const getPhaseStatus = (phaseNumber: number) => {
    // Fase 1: Tu inversión (completada)
    if (phaseNumber === 1) return 'completed'
    // Fase 2: Nosotros compramos y reformamos (en progreso)
    if (phaseNumber === 2) return 'in-progress'
    // Resto: pendientes
    return 'pending'
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      <h2 className="text-2xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
        <Clock className="w-6 h-6 text-[#6290C3]" />
        {title}
      </h2>

      <div className="space-y-8">
        {phases.map((phase, index) => (
          <div key={index} className="relative">
            {/* Línea conectora (excepto para el último elemento) */}
            {index < phases.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-[#6290C3] to-transparent opacity-30"></div>
            )}

            <div className="flex items-start gap-6">
              {/* Número de fase */}
              <div className={`${getPhaseColor(phase.phase)} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg relative`}>
                {phase.phase}
                {getPhaseStatus(phase.phase) === 'completed' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
                {getPhaseStatus(phase.phase) === 'in-progress' && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ⏳
                  </div>
                )}
              </div>

              {/* Contenido de la fase */}
              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  {getPhaseIcon(phase.name)}
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1341]">{phase.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#6290C3]">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{phase.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Pasos del proceso */}
                {phase.steps && phase.steps.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#1A1341] mb-3 text-sm">Pasos:</h4>
                    <ol className="space-y-2">
                      {phase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="bg-[#6290C3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Actualizaciones */}
                {phase.updates && phase.updates.length > 0 && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-[#1A1341] mb-2 text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Actualizaciones
                    </h4>
                    <ul className="space-y-1">
                      {phase.updates.map((update, updateIndex) => (
                        <li key={updateIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#6290C3] mt-1">•</span>
                          <span>{update}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lo que maneja Boostaproyect */}
                {phase.boostaproyect_handles && phase.boostaproyect_handles.length > 0 && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-[#1A1341] mb-2 text-sm flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Boostaproyect se encarga de:
                    </h4>
                    <ul className="space-y-1">
                      {phase.boostaproyect_handles.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lo que recibes */}
                {phase.you_receive && phase.you_receive.length > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-[#1A1341] mb-2 text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Tú recibes:
                    </h4>
                    <ul className="space-y-1">
                      {phase.you_receive.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del proceso */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
        <h3 className="text-lg font-semibold text-[#1A1341] mb-3 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          Resumen del Proceso
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Todo el proceso está diseñado para ser transparente y eficiente. Recibirás actualizaciones regulares 
          y tendrás acceso a un dashboard donde podrás seguir el progreso de tu inversión en tiempo real.
        </p>
      </div>
    </Card>
  )
}

export default ProjectProcess
