/**
 * Vista de artículo del blog.
 *
 * Carga un artículo por su slug, muestra su contenido y los artículos relacionados
 * seleccionados por el administrador en el formulario de creación/edición.
 * 
 * - Usa `getArticleBySlug` para obtener el artículo.
 * - Filtra los relacionados desde todos los artículos disponibles según `related[]`.
 * - Diseño responsive con fondo dividido.
 * 
 * ✅ Optimización aplicada — caching con SWR y memoización (2025-01-18)
 */

'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import LoadingState from '@/components/ui/LoadingState';
import { getArticleBySlug, getArticles } from '@/lib/blogService';
import { Article } from '@/types';
import { ArrowLeft } from 'lucide-react';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleContent from '@/components/articles/ArticleContent';
import ArticleRelated from '@/components/articles/ArticleRelated';

// ✅ SWR fetcher function para cache automático
const fetcher = (url: string) => {
  const slug = url.split('/').pop();
  return getArticleBySlug(slug!);
};

const ArticlePage: React.FC = React.memo(() => {
  const params = useParams();
  const slug = params?.slug as string;

  // ✅ SWR para cache inteligente y revalidación automática
  const { data: article, error, isLoading } = useSWR(`/api/articles/${slug}`, fetcher, {
    revalidateOnFocus: false, // No revalidar al cambiar de pestaña
    revalidateOnReconnect: true, // Revalidar al reconectar
    dedupingInterval: 300000, // 5 minutos de deduplicación
  });

  // ✅ SWR para artículos relacionados
  const { data: allArticles } = useSWR('/api/articles/related', () => getArticles({ limit: 999 }), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 300000,
  });

  // ✅ useMemo para filtrar artículos relacionados (evita recálculos innecesarios)
  const relatedArticles = useMemo(() => {
    if (!article?.related || !allArticles?.articles) return [];
    return allArticles.articles.filter(a =>
      article.related.includes(a.slug)
    );
  }, [article, allArticles]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1341] to-[#6290C3] flex items-center justify-center">
        <LoadingState message="Cargando artículo..." size="lg" color="white" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <ArrowLeft className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-6">
            {error || 'El artículo que buscas no existe o ha sido eliminado.'}
          </p>
          <Link href="/blog">
            <button className="bg-[#6290C3] text-white px-6 py-3 rounded-lg hover:bg-[#1A1341] transition-colors">
              Volver al Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-52">
      {/* Fondo dividido */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 pb-16">
        <ArticleHeader article={article} onBackClick={() => window.history.back()} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <ArticleContent article={article} />
          </div>
          
          {/* Sidebar con artículos relacionados */}
          <div className="lg:col-span-1">
            {relatedArticles.length > 0 && (
              <ArticleRelated articles={relatedArticles} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// ✅ React.memo aplicado para evitar renders innecesarios
export default ArticlePage;