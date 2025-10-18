/**
 * ProjectLocation.tsx — Componente para información de ubicación
 * ------------------------------------------------------------
 * Renderiza secciones de tipo 'location' del modelo flexible de proyectos
 *
 * Características:
 * - Información de dirección y coordenadas
 * - Mapa embebido (Google Maps o placeholder)
 * - Características de la ubicación
 * - Diseño con iconos de ubicación
 * 
 * Notas de mantenimiento:
 * - Usa iconos de lucide-react para elementos visuales
 * - Componente funcional con props tipadas
 * - Soporte para mapas embebidos
 * - Diseño responsive
 * 
 * @author Boost A Project Team
 * @since v1.0.0
 */

import React from 'react'
import Card from '@/components/ui/Card'
import { MapPin, Navigation, Building, Car, Train, ShoppingCart } from 'lucide-react'

interface LocationFeature {
  category: string
  items: string[]
}

interface LocationData {
  title?: string
  address?: string
  neighborhood?: string
  description?: string
  coordinates?: {
    lat: number
    lng: number
  }
  features?: LocationFeature[]
  why_ideal_for_coliving?: string[]
  city_context?: string[]
  market_prices?: {
    title: string
    ranges: Array<{
      range: string
      price: string
    }>
  }
  regional_comparison?: Array<{
    city: string
    price: string
    note: string
  }>
  market_trends?: string
}

interface ProjectLocationProps {
  location: LocationData
}

const ProjectLocation: React.FC<ProjectLocationProps> = ({ location }) => {
  if (!location) {
    return null
  }

  const getFeatureIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'servicios educativos':
        return <Building className="w-5 h-5" />
      case 'instalaciones deportivas':
        return <Navigation className="w-5 h-5" />
      case 'transporte y accesibilidad':
        return <Train className="w-5 h-5" />
      case 'comercios y servicios':
        return <ShoppingCart className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] border border-[#6290C3]/10">
      <h2 className="text-2xl font-bold text-[#1A1341] mb-4 flex items-center gap-3">
        <MapPin className="w-6 h-6 text-[#6290C3]" />
        {location.title || 'Ubicación del Proyecto'}
      </h2>

      {/* Dirección principal */}
      {(location.address || location.neighborhood) && (
        <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-[#6290C3]">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#6290C3] mt-1 flex-shrink-0" />
            <div>
              {location.address && (
                <p className="font-semibold text-[#1A1341] text-lg">{location.address}</p>
              )}
              {location.neighborhood && (
                <p className="text-[#6290C3] font-medium">{location.neighborhood}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Descripción */}
      {location.description && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            {location.description}
          </p>
        </div>
      )}

      {/* Mapa embebido */}
      {location.coordinates && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-3">Ubicación en el mapa</h3>
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBvOkBw3BtuE1B5'}&q=${location.coordinates.lat},${location.coordinates.lng}&zoom=15`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Características de la ubicación */}
      {location.features && location.features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">Características de la ubicación</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {location.features.map((feature, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1A1341] mb-3 flex items-center gap-2">
                  {getFeatureIcon(feature.category)}
                  {feature.category}
                </h4>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#6290C3] mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Por qué es ideal para coliving */}
      {location.why_ideal_for_coliving && location.why_ideal_for_coliving.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">Por qué es ideal para coliving</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {location.why_ideal_for_coliving.map((reason, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="bg-[#6290C3]/10 p-2 rounded-full mt-1 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#6290C3]" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contexto de la ciudad */}
      {location.city_context && location.city_context.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">Contexto de la ciudad</h3>
          <div className="space-y-3">
            {location.city_context.map((context, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed">{context}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Precios del mercado */}
      {location.market_prices && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">{location.market_prices.title}</h3>
          <div className="space-y-3">
            {location.market_prices.ranges.map((range, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-700 font-medium">{range.range}</span>
                <span className="font-semibold text-[#6290C3]">{range.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparación regional */}
      {location.regional_comparison && location.regional_comparison.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-4">Comparación regional</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {location.regional_comparison.map((comparison, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-[#1A1341]">{comparison.city}</h4>
                  <span className="font-semibold text-[#6290C3]">{comparison.price}</span>
                </div>
                <p className="text-sm text-gray-600">{comparison.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tendencias del mercado */}
      {location.market_trends && (
        <div className="p-4 bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] rounded-lg border-l-4 border-[#6290C3]">
          <h3 className="text-lg font-semibold text-[#1A1341] mb-3">Tendencias del mercado</h3>
          <p className="text-gray-700 leading-relaxed">{location.market_trends}</p>
        </div>
      )}
    </Card>
  )
}

export default ProjectLocation
