/**
 * ProjectSidebar.tsx — Sidebar de resumen financiero para vista de proyecto.
 * --------------------------------------------------------------
 * Componente independiente que muestra:
 * - Resumen de inversión (meta, mínima, rentabilidades)
 * - CTA "Contactar Asesor" con enlace a contacto
 * 
 * Características:
 * - Sticky positioning responsive
 * - Diseño unificado con gradientes corporativos
 * - Integración completa con datos del proyecto
 * 
 * Notas de mantenimiento:
 * - Recibe objeto Project completo
 * - No realiza fetch ni efectos secundarios
 * - Reutilizable para futuras vistas o layouts
 *
 * @author Boost A Project Team
 * @since v2.0.0
 */

import React from 'react';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { Project } from '@/types/project';

interface ProjectSidebarProps {
  project: Project;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 sticky top-20 sm:top-24 md:top-16 shadow-xl border-2 border-[#6290C3]/20">
        {/* Sección 1: Resumen de Inversión (fondo blanco) */}
        <div className="bg-white">
          <h3 className="text-2xl font-bold text-[#1A1341] mb-6">Resumen de Inversión</h3>

          <div className="space-y-5 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Meta de inversión</span>
              <span className="font-bold text-xl text-[#1A1341]">
                €{(project.investment_data?.total_investment || 0).toLocaleString('es-ES')}
              </span>
            </div>

            {project.investment_data?.min_investment && (
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Inversión mínima</span>
                <span className="font-bold text-xl text-[#1A1341]">
                  €{project.investment_data.min_investment.toLocaleString('es-ES')}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Rentabilidad esperada</span>
              <span className="font-bold text-2xl text-green-600">
                {project.investment_data?.expected_return || 'N/A'}
              </span>
            </div>

            {project.investment_data?.optimistic_return && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Rentabilidad optimista</span>
                <span className="font-bold text-2xl text-green-600">
                  {project.investment_data.optimistic_return}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Separador visual sutil */}
        <div className="border-t-2 border-gray-200 my-6"></div>

        {/* Sección 2: ¿Necesitas más información? (fondo degradado verde) */}
        <div className="bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] p-6 rounded-lg">
          <h3 className="text-xl font-bold text-[#1A1341] mb-4">¿Necesitas más información?</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Nuestro equipo de expertos está disponible para resolver tus dudas sobre este proyecto.
          </p>
          <Link href="/contact" className="block">
            <button className="w-full py-3 px-4 bg-[#1DA1F2] text-white rounded-md font-medium hover:bg-[#1A1341] transition-all duration-300 shadow-md hover:shadow-lg">
              Contactar Asesor
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ProjectSidebar;
