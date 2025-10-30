/**
 * Configuración de Next.js para el proyecto Boost a Project.
 *
 * Características:
 * - reactStrictMode: Activa el modo estricto de React para detectar errores potenciales.
 * - images: Configura patrones remotos permitidos para cargar imágenes.
 * - rewrites: Redirige automáticamente las rutas `/api/...` al backend en desarrollo.
 * - experimental.forceSwcTransforms: Asegura el uso de SWC para compilación.
 *
 * @author Boost A Project
 * @since v1.0.0
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  outputFileTracingRoot: __dirname,

  experimental: {
    forceSwcTransforms: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Rewrites solo para desarrollo local
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfig;
  }
  return nextConfig;
};