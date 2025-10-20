/**
 * page.tsx — Vista de artículo del blog individual
 * ------------------------------------------------------------
 * Carga un artículo por su slug y muestra:
 * - Título, fecha, contenido y artículos relacionados
 * 
 * Diseño:
 * - Conserva la apariencia original (sin fondo dividido)
 * - Centrado y limpio, coherente con la vista del proyecto
 * 
 * Lógica:
 * - SWR con caching y revalidación automática
 * - Loading y error unificados con el resto del sitio
 * 
 * @author Boost A Project
 * @since v1.5.0
 */

'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import { ArrowLeft, BookOpen } from 'lucide-react';

import LoadingState from '@/components/ui/LoadingState';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleContent from '@/components/articles/ArticleContent';
import ArticleRelated from '@/components/articles/ArticleRelated';
import { getArticleBySlug, getArticles } from '@/lib/blogService';
import { Article } from '@/types';

// --- SWR fetcher ---
const fetcher = (url: string) => {
  const slug = url.split('/').pop();
  return getArticleBySlug(slug!);
};

const ArticlePage: React.FC = React.memo(() => {
  const params = useParams();
  const slug = params?.slug as string;

  // --- SWR principal (artículo actual) ---
  const { data: article, error, isLoading } = useSWR(
    `/api/articles/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000,
    }
  );

  // --- SWR secundarios (artículos relacionados) ---
  const { data: allArticles } = useSWR(
    '/api/articles/related',
    () => getArticles({ limit: 999 }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000,
    }
  );

  // --- Calcular artículos relacionados ---
  const relatedArticles = useMemo(() => {
    if (!article?.related || !allArticles?.articles) return [];
    return allArticles.articles.filter((a) => article.related.includes(a.slug));
  }, [article, allArticles]);

  // --- Loading global ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1341] to-[#6290C3] flex items-center justify-center">
        <LoadingState message="Cargando artículo..." size="lg" color="white" />
      </div>
    );
  }

  // --- Error o artículo no encontrado ---
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1341] mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'El artículo que buscas no existe o ha sido eliminado.'}
          </p>
          <div className="flex justify-center">
            <Link href="/blog">
              <button className="bg-[#6290C3] text-white px-6 py-3 rounded-lg hover:bg-[#1A1341] transition-colors">
                Volver al Blog
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Renderizado principal ---
  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Encabezado del artículo — fuera del container */}
      <ArticleHeader
        article={article}
        onBackClick={() => window.history.back()}
      />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <ArticleContent article={article} />

        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <ArticleRelated articles={relatedArticles} />
          </section>
        )}
      </div>
    </main>

  );
});

export default ArticlePage;
