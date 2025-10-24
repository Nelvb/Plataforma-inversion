/**
 * Página principal del Blog (/blog)
 *
 * Muestra todos los artículos publicados mediante tarjetas (BlogArticleCard),
 * con paginación profesional y diseño responsive. Integra fondo visual dividido,
 * cabecera destacada (BlogHeader), y botón de navegación para cambiar de página.
 * Muestra exactamente 12 artículos por página y oculta el botón "Siguiente"
 * cuando no hay más contenido según el total paginado del backend.
 * 
 * Optimización aplicada — caching con SWR y memoización (2025-01-18)
 */

'use client';

import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import LoadingState from '@/components/ui/LoadingState';
import { getArticles } from '@/lib/blogService';

// SWR fetcher function optimizado para cache automático
const fetcher = function fetcher(url: string) {
  const urlObj = new URL(url, 'http://localhost');
  const page = parseInt(urlObj.searchParams.get('page') || '1');
  const limit = parseInt(urlObj.searchParams.get('limit') || '12');
  return getArticles({ page, limit });
};

const BlogPage: React.FC = () => {
  const [page, setPage] = useState(1);

  // SWR para cache inteligente y revalidación automática
  const { data, error, isLoading } = useSWR(`/api/articles?page=${page}&limit=12`, fetcher, {
    revalidateOnFocus: false, // No revalidar al cambiar de pestaña
    revalidateOnReconnect: true, // Revalidar al reconectar
    dedupingInterval: 300000, // 5 minutos de deduplicación
  });

  // useMemo para extraer datos (evita recálculos innecesarios)
  const articles = useMemo(() => data?.articles || [], [data]);
  const totalPages = useMemo(() => data?.total_pages || 0, [data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };


  return (
    <div className="relative min-h-[100dvh] pt-52">
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <BlogHeader />

        {isLoading ? (
          <div className="py-20 text-center">
            <LoadingState message="Cargando artículos..." size="lg" color="white" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-white py-12">
            <p className="text-2xl font-semibold mb-4">No hay artículos disponibles</p>
            <p className="text-[#C2E7DA]">Próximamente nuevos contenidos</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12 space-x-4">
              {page > 1 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors"
                >
                  Anterior
                </button>
              )}
              {page < totalPages && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors"
                >
                  Siguiente
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// React.memo aplicado para evitar renders innecesarios
export default React.memo(BlogPage);
