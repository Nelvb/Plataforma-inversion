'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/blogService';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import { Article } from '@/types';

const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles({ page: 1, limit: 3 });
        setArticles(data.articles);
      } catch (err) {
        console.error('Error cargando artículos:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
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
      <section className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-gray-500">No hay artículos disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-24 bg-white border-t border-[#6290C3]/20">
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
            <BlogArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
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

export default LatestArticles;
