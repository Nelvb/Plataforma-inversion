'use client'

/**
 * ProjectForm.tsx — Formulario reutilizable para crear o editar proyectos
 * ------------------------------------------------------------
 * Contexto: Componente del panel de administración para gestión de proyectos
 * 
 * Características:
 * - Compatible con el modelo flexible del backend
 * - Validaciones inteligentes unificadas (cada campo se auto-valida)
 * - Contador de caracteres en Título y Descripción
 * - Subida de imagen destacada (con vista previa y validación)
 * - Campos específicos para proyectos de inversión
 * - Totalmente responsive con Tailwind CSS
 * 
 * ✅ Optimización aplicada — memoización y optimización de formularios (2025-01-18)
 * 
 * @author Boost A Project Team
 * @since v2.0.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from '@/components/ui/ImageUpload'
import { Project, ProjectInput } from '@/types/project'

interface ProjectFormProps {
  onSubmit: (projectData: ProjectInput) => void
  initialData?: Project
}

const ProjectForm: React.FC<ProjectFormProps> = React.memo(({ onSubmit, initialData }) => {
  // Estados básicos del proyecto
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [mainImageUrl, setMainImageUrl] = useState(initialData?.main_image_url || '')
  const [status, setStatus] = useState<'open' | 'active' | 'funded' | 'closed'>(
    (initialData?.status as 'open' | 'active' | 'funded' | 'closed') || 'open'
  )

  // Estados de investment_data
  const [totalInvestment, setTotalInvestment] = useState(
    initialData?.investment_data?.total_investment || 0
  )
  const [expectedReturn, setExpectedReturn] = useState(
    initialData?.investment_data?.expected_return || ''
  )
  const [optimisticReturn, setOptimisticReturn] = useState(
    initialData?.investment_data?.optimistic_return || ''
  )
  const [minInvestment, setMinInvestment] = useState(
    initialData?.investment_data?.min_investment || 0
  )

  // Estados de ubicación e inversión (campos de nivel superior)
  const [location, setLocation] = useState(
    initialData?.investment_data?.property_specs?.address || 
    initialData?.investment_data?.property_specs?.neighborhood || ''
  )
  const [investmentType, setInvestmentType] = useState(
    initialData?.investment_data?.investment_type || ''
  )
  const [surfaceM2, setSurfaceM2] = useState(
    initialData?.investment_data?.property_specs?.surface_m2 || 0
  )
  const [rooms, setRooms] = useState(
    initialData?.investment_data?.property_specs?.rooms || 0
  )
  const [bathrooms, setBathrooms] = useState(
    initialData?.investment_data?.property_specs?.bathrooms || 0
  )

  // Estados de error para cada campo
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [totalInvestmentError, setTotalInvestmentError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [expectedReturnError, setExpectedReturnError] = useState(false)

  useEffect(() => {
    if (initialData?.main_image_url) setMainImageUrl(initialData.main_image_url)
  }, [initialData?.main_image_url])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Si algún campo obligatorio tiene error, no enviar
    if (titleError || descriptionError || imageError || totalInvestmentError || locationError || expectedReturnError) {
      return
    }

    const projectData: ProjectInput = {
      title,
      description,
      main_image_url: mainImageUrl || undefined,
      status,
      investment_data: {
        total_investment: totalInvestment || undefined,
        expected_return: expectedReturn || undefined,
        optimistic_return: optimisticReturn || undefined,
        min_investment: minInvestment || undefined,
        investment_type: investmentType || undefined,
        property_specs: {
          address: location || undefined,
          surface_m2: surfaceM2 || undefined,
          rooms: rooms || undefined,
          bathrooms: bathrooms || undefined
        }
      }
    }

    onSubmit(projectData)
  }

  const handleImageUpload = (imageUrl: string) => {
    setMainImageUrl(imageUrl)
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] flex items-start justify-center border border-[#6290C3]/30 rounded-2xl shadow-md">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-[#1A1341]">
          {initialData ? 'Editar proyecto' : 'Crear nuevo proyecto'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* INFORMACIÓN BÁSICA */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Información Básica</h3>
            
            {/* TÍTULO */}
            <div className="mb-4">
              <Input
                label="Título del Proyecto"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: FiveRooms Venezuela"
                required
                validationRules={{
                  minLength: 10,
                  maxLength: 120,
                  required: true
                }}
                validateOnChange={true}
                onErrorChange={setTitleError}
              />
              <p className="text-xs text-gray-500 mt-2">Entre 10 y 120 caracteres</p>
              <p className="text-xs text-gray-400">({title.length} caracteres)</p>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1A1341] mb-2">
                Descripción del Proyecto
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el proyecto en detalle..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
                rows={4}
                required
                minLength={50}
                maxLength={2000}
              />
              <p className="text-xs text-gray-500 mt-2">Entre 50 y 2000 caracteres</p>
              <p className="text-xs text-gray-400">({description.length} caracteres)</p>
            </div>

            {/* IMAGEN PRINCIPAL */}
            <div className="mb-4">
              <ImageUpload
                onImageUpload={handleImageUpload}
                initialImage={mainImageUrl}
                onErrorChange={setImageError}
              />
            </div>
          </div>

          {/* DATOS FINANCIEROS */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Datos Financieros</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Inversión Total (€)"
                  type="number"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  placeholder="110000"
                  required
                  validationRules={{
                    required: true,
                    customValidator: (value) => {
                      const num = Number(value)
                      if (num < 1000) {
                        return 'La inversión debe ser de al menos €1.000'
                      }
                      return null
                    }
                  }}
                  validateOnChange={true}
                  onErrorChange={setTotalInvestmentError}
                />
              </div>

              <div>
                <Input
                  label="Inversión Mínima (€)"
                  type="number"
                  value={minInvestment}
                  onChange={(e) => setMinInvestment(Number(e.target.value))}
                  placeholder="100"
                />
              </div>

              <div>
                <Input
                  label="Retorno Esperado (%)"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  placeholder="12"
                  required
                  validationRules={{
                    required: true
                  }}
                  validateOnChange={true}
                  onErrorChange={setExpectedReturnError}
                />
              </div>

              <div>
                <Input
                  label="Retorno Optimista (%)"
                  value={optimisticReturn}
                  onChange={(e) => setOptimisticReturn(e.target.value)}
                  placeholder="16"
                />
              </div>
            </div>
          </div>

          {/* DATOS TÉCNICOS */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Datos Técnicos</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Calle Venezuela, Valladolid, España"
                  required
                  validationRules={{
                    required: true
                  }}
                  validateOnChange={true}
                  onErrorChange={setLocationError}
                />
              </div>

              <div>
                <Input
                  label="Tipo de Inversión"
                  value={investmentType}
                  onChange={(e) => setInvestmentType(e.target.value)}
                  placeholder="Alquiler por habitaciones"
                />
              </div>

              <div>
                <Input
                  label="Superficie (m²)"
                  type="number"
                  value={surfaceM2}
                  onChange={(e) => setSurfaceM2(Number(e.target.value))}
                  placeholder="90"
                />
              </div>

              <div>
                <Input
                  label="Habitaciones"
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  placeholder="5"
                />
              </div>

              <div>
                <Input
                  label="Baños"
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  placeholder="2"
                />
              </div>
            </div>
          </div>

          {/* ESTADO */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Estado del Proyecto</h3>
            
            <div>
              <label className="block text-sm font-medium text-[#1A1341] mb-2">
                Estado
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'open' | 'active' | 'funded' | 'closed')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
              >
                <option value="open">Abierto</option>
                <option value="active">Activo</option>
                <option value="funded">Financiado</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>
          </div>

          {/* ACCIONES */}
          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => history.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={titleError || descriptionError || imageError || totalInvestmentError || locationError || expectedReturnError}
            >
              {initialData ? 'Guardar cambios' : 'Crear proyecto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
});

// ✅ React.memo aplicado para evitar renders innecesarios
export default ProjectForm