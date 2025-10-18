import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
        template: '%s | Proyectos de Inversión | Boost A Project',
        default: 'Proyectos de Inversión Inmobiliaria | Boost A Project',
    },
    description:
        'Descubre oportunidades reales de inversión inmobiliaria con Boost A Project. Análisis, rentabilidad y transparencia en cada proyecto.',
    openGraph: {
        title: 'Proyectos de Inversión Inmobiliaria | Boost A Project',
        description:
            'Explora oportunidades seguras y rentables en el mercado inmobiliario.',
        type: 'website',
        images: ['/og-projects-image.jpg'],
    },
    keywords: [
        'proyectos de inversión',
        'inversión inmobiliaria',
        'bienes raíces',
        'rentabilidad',
        'Boost A Project',
    ],
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <div className="projects-layout">{children}</div>;
}
