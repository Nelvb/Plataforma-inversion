import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://boostaproject.com'; // se actualizará al dominio real

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // se excluye el área de administración
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
