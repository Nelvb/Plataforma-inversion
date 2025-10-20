/**
 * Página para crear un nuevo artículo en el panel de administración del blog.
 *
 * Esta vista utiliza el componente BlogArticleForm para recoger los datos del nuevo artículo.
 * La lógica de creación se delega a blogService.ts con protección JWT y CSRF vía fetchWithAuth.
 * 
 * En el futuro puede adaptarse a edición activando `isEditMode` con lógica adicional si se requiere.
 * 
 * Optimización aplicada — memoización y optimización de formularios (2025-01-18)
 */

'use client'

import React, { useState, useCallback } from 'react'
import BlogArticleForm from '@/components/admin/blog/BlogArticleForm'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { createArticle, updateArticleBySlug } from '@/lib/blogService'

const NewArticle: React.FC = React.memo(() => {
  const [isEditMode, setIsEditMode] = useState(false) // En esta vista, siempre es false por ahora

  // useCallback para evitar recreación de función en cada render
  const handleSubmit = useCallback(async (articleData: any) => {
    try {
      if (isEditMode) {
        await updateArticleBySlug(articleData.slug, articleData)
      } else {
        await createArticle(articleData)
      }
      alert(isEditMode ? 'Artículo actualizado correctamente' : 'Artículo creado correctamente')
    } catch (error: any) {
      console.error('Error al enviar los datos:', error)
      alert(`Error al ${isEditMode ? 'actualizar' : 'crear'} el artículo: ${error.message}`)
    }
  }, [isEditMode])

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Título y Botón de Volver */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1341]">Editor de artículo</h1>
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">← Volver al listado</Button>
        </Link>
      </div>

      {/* Formulario de creación de artículo */}
      <BlogArticleForm onSubmit={handleSubmit} />
    </div>
  )
}

});

// React.memo aplicado para evitar renders innecesarios
export default NewArticle
