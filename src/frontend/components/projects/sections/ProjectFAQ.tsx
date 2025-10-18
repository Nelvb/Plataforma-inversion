/**
 * ProjectFAQ.tsx — Componente para preguntas frecuentes
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'faq' del modelo flexible de proyectos
 *
 * Características:
 * - Acordeón expandible/colapsable
 * - Categorías de preguntas
 * - Diseño limpio y accesible
 * - Animaciones suaves
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Estado local para control de expansión
 * - Accesibilidad con ARIA labels
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { HelpCircle, MessageSquare } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

interface FAQCategory {
  category: string
  questions: FAQItem[]
}

interface ProjectFAQProps {
  items?: FAQItem[]
  categories?: FAQCategory[]
  faqs?: FAQItem[]
  title?: string
}

const ProjectFAQ: React.FC<ProjectFAQProps> = ({ 
  items, 
  categories, 
  faqs,
  title = "Preguntas Frecuentes" 
}) => {
  if (!items && !categories && !faqs) {
    return null
  }

  // Priorizar categories, luego faqs, luego items
  const faqData = categories || (faqs ? [{ category: 'General', questions: faqs }] : (items ? [{ category: 'General', questions: items }] : []))

  // Si no hay datos, no renderizar
  if (!faqData || faqData.length === 0) {
    return null
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      <h2 className="text-2xl font-bold text-[#1A1341] mb-6 flex items-center gap-3">
        <HelpCircle className="w-6 h-6 text-[#6290C3]" />
        {title}
      </h2>

      <div className="space-y-6">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-6">
            <h3 className="text-xl font-semibold text-[#6290C3] mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.questions.map((faq, questionIndex) => (
                <details key={questionIndex} className="mb-2 border border-[#6290C3]/20 rounded-lg p-3 bg-[#F1FFEF]/60 hover:bg-[#F1FFEF]/80 transition-colors duration-200">
                  <summary className="cursor-pointer font-medium text-[#1A1341] hover:text-[#6290C3] transition-colors duration-200">
                    {faq.q}
                  </summary>
                  <p className="mt-2 text-[#1A1341]/80 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ProjectFAQ
