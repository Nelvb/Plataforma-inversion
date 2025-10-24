/**
 * Página para editar artículos en el panel de administración del blog.
 *
 * Este componente obtiene los datos del artículo a través de su 'slug' y los muestra
 * en un formulario editable. Al enviarlo, se actualiza el artículo en la base de datos.
 *
 * Incluye:
 * - Carga del artículo desde el backend por slug
 * - Estado de carga mientras se obtiene la información
 * - Envío del formulario con validación previa (gestionado por BlogArticleForm)
 * - Estilo consistente con resto del admin sin duplicar encabezado <h1>
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import LoadingState from '@/components/ui/LoadingState'
import { getArticleBySlug, updateArticleBySlug } from '@/lib/blogService'
import BlogArticleForm from '@/components/admin/blog/BlogArticleForm'
import Button from '@/components/ui/Button'
import type { Article, ArticleFormData } from '@/types/blog'

export default function EditArticlePage() {
    const [articleData, setArticleData] = useState<Article | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { slug } = useParams()

    const slugValue = Array.isArray(slug) ? slug[0] : slug

    useEffect(() => {
        if (slugValue) {
            const fetchArticle = async () => {
                try {
                    const article = await getArticleBySlug(slugValue)
                    setArticleData(article)
                } catch (error) {
                    console.error('Error obteniendo el artículo:', error)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchArticle()
        }
    }, [slugValue])

    const handleSubmit = async (formData: ArticleFormData) => {
        try {
            await updateArticleBySlug(slugValue, {
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                image: formData.image,
                related: formData.related,
            })
            alert('Artículo actualizado correctamente')
            router.push('/admin/blog')
        } catch (error: unknown) {
            console.error('Error al actualizar el artículo:', error)
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            alert(`Error al actualizar el artículo: ${errorMessage}`)
        }
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
                <p className="text-3xl font-bold text-[#1A1341]">Editor de artículo</p>
                <Button variant="outline" size="sm" onClick={() => router.push('/admin/blog')}>
                    ← Volver al listado
                </Button>
            </div>

            {isLoading ? (
                <LoadingState message="Cargando artículo..." size="lg" />
            ) : (
                articleData && (
                    <BlogArticleForm
                        initialData={{
                            title: articleData.title,
                            excerpt: articleData.excerpt,
                            content: articleData.content,
                            image: articleData.image,
                            related: articleData.related || [],
                        }}
                        onSubmit={handleSubmit}
                    />
                )
            )}
        </div>
    )
}