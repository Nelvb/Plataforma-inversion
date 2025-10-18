/**
 * LoadingState.tsx — Componente para estados de carga con mensaje.
 * 
 * Contexto:
 * Combina el componente Spinner con un mensaje de texto y layout apropiado.
 * Útil para páginas, secciones y componentes que necesitan mostrar loading state.
 * 
 * Notas de mantenimiento:
 * - Usa el componente Spinner base para mantener consistencia visual
 * - El mensaje es obligatorio para claridad al usuario
 * - Soporta diferentes tamaños adaptados al contexto
 * 
 * @author Boost A Project Team
 * @since v2.0.0
 */

import Spinner from './Spinner';

interface LoadingStateProps {
  message: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export default function LoadingState({ 
  message, 
  size = 'md',
  color = 'primary',
  className = '' 
}: LoadingStateProps) {
  
  // Map de espaciado según tamaño
  const spacingClasses = {
    sm: 'gap-2 py-4',
    md: 'gap-3 py-8',
    lg: 'gap-4 py-12'
  };
  
  // Map de tamaño de texto según tamaño
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${spacingClasses[size]} ${className}`}>
      <Spinner size={size} color={color} />
      <p className={`text-gray-600 ${textSizeClasses[size]}`}>
        {message}
      </p>
    </div>
  );
}
