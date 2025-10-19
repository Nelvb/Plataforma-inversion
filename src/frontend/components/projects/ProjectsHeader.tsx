/**
 * ProjectsHeader.tsx — Encabezado hero para la vista pública de proyectos
 * -----------------------------------------------------------------------
 * Replica la estructura y estética de BlogHeader con contenido adaptado
 * para la sección de proyectos de inversión.
 *
 * Características:
 * - Gradiente corporativo (#1A1341 → #6290C3)
 * - Elementos decorativos translúcidos en esquinas
 * - Título y descripción centrados
 * - Mensaje dinámico coherente visualmente con los badges del ProjectHeader
 * - Diseño totalmente responsive
 * 
 * @author Boost A Project Team
 * @since v1.4.3
 */

'use client';

import React from 'react';

interface ProjectsHeaderProps {
    count: number;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ count }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl mb-12 shadow-md">
            {/* Fondo con gradiente corporativo */}
            <div className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] py-16 px-6 md:px-12">
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2E7DA] opacity-10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F1FFEF] opacity-10 rounded-tr-full"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge principal */}
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30 text-white shadow-sm mb-4">
                        Boost A Project
                    </span>

                    {/* Título principal */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Proyectos de Inversión
                    </h1>

                    {/* Descripción */}
                    <p className="text-lg md:text-xl text-[#F1FFEF] opacity-90 max-w-3xl mx-auto mb-6">
                        Explora oportunidades de inversión seleccionadas con criterios
                        profesionales de rentabilidad, seguridad y transparencia.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default ProjectsHeader;
