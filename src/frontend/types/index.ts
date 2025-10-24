/**
 * Definiciones de tipos globales para la aplicación
 * Centraliza interfaces y tipos reutilizables en múltiples componentes
 * Facilita la consistencia de tipos y reduce la duplicación de código
 */

// Extensión del objeto Window para propiedades personalizadas
declare global {
  interface Window {
    pageLoaderActive?: boolean;
  }
}

export * from "./blog";
export * from "./user";
