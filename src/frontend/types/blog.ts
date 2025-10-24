/**
 * Definiciones de tipos para el módulo de blog
 * 
 * Este archivo contiene las interfaces y tipos necesarios para
 * trabajar con artículos y otras entidades relacionadas con el blog.
 */

/**
 * Representa un artículo del blog
 */
export interface Article {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  image_alt?: string;
  content: string;
  related?: string[];
  meta_description?: string;
  meta_keywords?: string;
  created_at: string;
  updated_at: string;
}

/**
* Datos necesarios para crear un nuevo artículo
*/
export interface ArticleInput {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  image_alt?: string;
  related?: string[];
  meta_description?: string;
  meta_keywords?: string;
}

/**
* Categoría de artículo
*/
export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
}

/**
* Respuesta de la API para artículos
*/
export interface ArticlesApiResponse {
  articles: Article[];
}

/**
* Artículo básico para listados
*/
export interface ArticleBasic {
  title: string;
  slug: string;
}

/**
* Datos para actualizar un artículo
*/
export interface ArticleUpdateData {
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  image_alt?: string;
  related?: string[];
  meta_description?: string;
  meta_keywords?: string;
}

/**
* Datos del formulario de artículo (para BlogArticleForm)
*/
export interface ArticleFormData {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  related: string[];
}