/**
 * SWR Configuration
 * ✅ Optimización aplicada — caching con SWR y memoización (2025-01-18)
 * 
 * Configuración global de SWR para optimización de rendimiento:
 * - Cache inteligente con revalidación automática
 * - Deduplicación de peticiones
 * - Configuración de errores y loading states
 */

import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
  // ✅ Configuración de revalidación optimizada
  revalidateOnFocus: false, // No revalidar al cambiar de pestaña
  revalidateOnReconnect: true, // Revalidar al reconectar
  revalidateIfStale: true, // Revalidar si los datos están obsoletos
  
  // ✅ Configuración de cache
  dedupingInterval: 300000, // 5 minutos de deduplicación
  focusThrottleInterval: 60000, // 1 minuto de throttling en focus
  
  // ✅ Configuración de errores
  errorRetryCount: 3, // Reintentar 3 veces en caso de error
  errorRetryInterval: 5000, // 5 segundos entre reintentos
  
  // ✅ Configuración de loading
  loadingTimeout: 10000, // 10 segundos de timeout
};

export default swrConfig;
