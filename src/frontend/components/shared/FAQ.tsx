/**
 * FAQ.tsx — Componente compartido para preguntas frecuentes
 * ------------------------------------------------------------
 * Componente reutilizable para renderizar FAQ en home y proyectos
 *
 * Características:
 * - Acordeón expandible/colapsable
 * - Categorías de preguntas
 * - Diseño limpio y accesible
 * - Animaciones suaves
 * - Soporte para subtitle opcional
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Estado local para control de expansión
 * - Accesibilidad con ARIA labels
 * 
 * @author Boost A Project Team
 * @since v2.0.0
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

interface FAQProps {
  items?: FAQItem[]
  categories?: FAQCategory[]
  faqs?: FAQItem[]
  title?: string
  subtitle?: string
}

const FAQ: React.FC<FAQProps> = ({ 
  items, 
  categories, 
  faqs,
  title = "Preguntas Frecuentes",
  subtitle
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
    <section className="py-16 px-4 bg-[#F7FAFF] border-t border-[#6290C3]/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[#6290C3] font-medium max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] rounded-3xl p-8 md:p-12 shadow-sm border border-[#6290C3]/10">
          <div className="space-y-6">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <h3 className="text-xl font-semibold text-[#6290C3] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.questions.map((faq, questionIndex) => (
                    <details key={questionIndex} className="bg-white/80 backdrop-blur-sm border border-[#6290C3]/20 rounded-xl p-5 hover:border-[#6290C3]/40 hover:shadow-md transition-all duration-300 mb-3">
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
        </div>
      </div>
    </section>
  )
}

export default FAQ
