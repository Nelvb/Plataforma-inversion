/**
 * Página de gestión de artículos del blog (/admin/blog)
 *
 * Lista todos los artículos existentes con opciones para eliminar o crear nuevos.
 * Muestra tarjetas visuales (BlogArticleCard) y maneja estados de carga y vacío.
 * El diseño y metadatos SEO son gestionados por /app/admin/layout.tsx.
 * 
 * Optimización aplicada — caching con SWR y memoización (2025-01-18)
 */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import BlogArticleCard from "@/components/admin/ui/blog/BlogArticleCard";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/ui/LoadingState";
import { getArticles, deleteArticleBySlug } from "@/lib/blogService";
import { Article } from "@/types";

// SWR fetcher function para cache automático
const fetcher = () => getArticles({ limit: 999 });

const BlogAdminPage: React.FC = React.memo(() => {
  // SWR para cache inteligente y revalidación automática
  const { data, error, isLoading, mutate } = useSWR('/api/articles/admin', fetcher, {
    revalidateOnFocus: false, // No revalidar al cambiar de pestaña
    revalidateOnReconnect: true, // Revalidar al reconectar
    dedupingInterval: 300000, // 5 minutos de deduplicación
  });

  // useMemo para extraer artículos (evita recálculos innecesarios)
  const articles = useMemo(() => data?.articles || [], [data]);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este artículo?");
    if (!confirmDelete) return;

    try {
      await deleteArticleBySlug(slug);
      // Revalidar cache después de eliminar
      mutate();
    } catch (err) {
      console.error("Error eliminando artículo:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Gestión de Blog</h1>

        <div className="flex flex-wrap gap-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              ← Volver al panel
            </Button>
          </Link>

          <Link href="/admin/blog/new-article">
            <Button variant="primary" size="sm">
              Crear Nuevo Artículo
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <LoadingState message="Cargando artículos..." size="lg" />
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-600 text-lg">Error al cargar los artículos</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-[#F1FFEF] rounded-lg border border-[#6290C3]">
          <p className="text-[#1A1341] text-xl mb-4">Aún no has creado ningún artículo</p>
          <Link href="/admin/blog/new-article">
            <Button variant="primary">Crear Primer Artículo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <BlogArticleCard
              key={article.slug}
              title={article.title}
              slug={article.slug}
              image={article.image}
              excerpt={article.excerpt}
              created_at={article.date}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

});

// React.memo aplicado para evitar renders innecesarios
export default BlogAdminPage;
