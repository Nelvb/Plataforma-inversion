/**
 * Spinner.tsx
 *
 * Componente de spinner de carga reutilizable para la aplicación Boost A Project.
 * Proporciona feedback visual durante operaciones asíncronas (login, registro, envío de formularios).
 * Utiliza los colores de la marca para mantener consistencia visual en toda la aplicación.
 */

import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: 'primary' | 'white' | 'gray' | 'secondary';
  className?: string;
}

export default function Spinner({ 
  size = 'md',
  color = 'primary',
  className = ''
}: SpinnerProps) {
  
  // Map de tamaños predefinidos
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2', 
    lg: 'w-12 h-12 border-4'
  };
  
  // Map de colores
  const colorClasses = {
    primary: 'border-[#1A1341] border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
    secondary: 'border-[#6290C3] border-t-transparent'
  };
  
  // Si size es un número, usar el comportamiento legacy
  if (typeof size === 'number') {
    return (
      <div
        className={cn(
          'border-2 rounded-full animate-spin',
          colorClasses[color],
          className
        )}
        style={{ width: size, height: size }}
        role="status"
        aria-label="Cargando"
      />
    );
  }
  
  return (
    <div
      className={cn(
        'rounded-full animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Cargando"
    />
  );
}