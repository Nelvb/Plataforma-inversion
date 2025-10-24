// Optimización aplicada — caching con SWR y memoización (2025-01-18)
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { getArticles } from '@/lib/blogService';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';

// SWR fetcher function para cache automático
const fetcher = function fetcher() {
  return getArticles({ page: 1, limit: 3 });
};

const LatestArticles: React.FC = () => {
    // SWR para cache inteligente y revalidación automática
    const { data, error, isLoading } = useSWR('/api/articles/latest', fetcher, {
        revalidateOnFocus: false, // No revalidar al cambiar de pestaña
        revalidateOnReconnect: true, // Revalidar al reconectar
        dedupingInterval: 300000, // 5 minutos de deduplicación
    });

    // useMemo para extraer artículos (evita recálculos innecesarios)
    const articles = useMemo(() => {
        return data?.articles || [];
    }, [data]);

    if (isLoading) {
        return (
            <section className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
                <div className="max-w-screen-2xl mx-auto">
                    <LoadingState message="Cargando artículos..." size="lg" />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
                <div className="max-w-screen-2xl mx-auto text-center">
                    <p className="text-red-600 mb-4">Error al cargar artículos</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Reintentar
                    </Button>
                </div>
            </section>
        );
    }

    if (articles.length === 0) {
        return (
            <section id="latest-articles" className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
                <div className="max-w-screen-2xl mx-auto text-center">
                    <p className="text-gray-500">No hay artículos disponibles en este momento.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="latest-articles" className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                        Últimas Publicaciones
                    </h2>
                    <p className="text-lg text-[#6290C3] font-medium max-w-2xl mx-auto">
                        Mantente informado con nuestros análisis, tendencias y consejos sobre inversión inmobiliaria
                    </p>
                </div>

                {/* Grid de artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {articles.map((article) => (
                        <BlogArticleCard key={article.id} article={article} from="home" />
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold text-[#1A1341] mb-4">
                        ¿Quiere leer más contenido?
                    </h3>
                    <p className="text-gray-700 max-w-2xl mb-8">
                        Explore nuestro blog completo con análisis detallados, guías de inversión y las últimas tendencias del mercado inmobiliario.
                    </p>
                    <Link href="/blog">
                        <Button variant="primary" size="lg">
                            Ver todas las publicaciones
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

// React.memo aplicado para evitar renders innecesarios
export default React.memo(LatestArticles);
