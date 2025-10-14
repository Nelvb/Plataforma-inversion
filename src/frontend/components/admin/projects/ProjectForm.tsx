'use client'

/**
 * Formulario reutilizable para crear o editar proyectos en el panel de administración.
 *
 * Este componente incluye:
 * - Validaciones inteligentes unificadas (cada campo se auto-valida)
 * - Contador de caracteres en Título y Descripción
 * - Subida de imagen destacada (con vista previa y validación)
 * - Campos específicos para proyectos de inversión
 * - Totalmente responsive con Tailwind CSS
 */

import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from '@/components/ui/ImageUpload'
import { Project, ProjectInput } from '@/types/project'

interface ProjectFormProps {
  onSubmit: (projectData: ProjectInput) => void
  initialData?: Project
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [image_url, setImage_url] = useState(initialData?.image_url || '')
  const [investment_goal, setInvestment_goal] = useState(initialData?.investment_goal || 0)
  const [location, setLocation] = useState(initialData?.location || '')
  const [investment_type, setInvestment_type] = useState(initialData?.investment_type || '')
  const [surface_m2, setSurface_m2] = useState(initialData?.surface_m2 || 0)
  const [rooms, setRooms] = useState(initialData?.rooms || 0)
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms || 0)
  const [min_investment, setMin_investment] = useState(initialData?.min_investment || 0)
  const [expected_return, setExpected_return] = useState(initialData?.expected_return || '')
  const [optimistic_return, setOptimistic_return] = useState(initialData?.optimistic_return || '')
  const [estimated_duration, setEstimated_duration] = useState(initialData?.estimated_duration || '')
  const [status, setStatus] = useState(initialData?.status || 'Abierto')
  
  // Campos adicionales para formulario avanzado
  const [financial_structure_text, setFinancial_structure_text] = useState(initialData?.financial_structure_text || '')
  const [rentability_projection, setRentability_projection] = useState(initialData?.rentability_projection || '')
  const [risk_analysis, setRisk_analysis] = useState(initialData?.risk_analysis || '')
  const [team_description, setTeam_description] = useState(initialData?.team_description || '')
  const [external_link, setExternal_link] = useState(initialData?.external_link || '')

  // Estados de error para cada campo
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [investmentGoalError, setInvestmentGoalError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [expectedReturnError, setExpectedReturnError] = useState(false)

  useEffect(() => {
    if (initialData?.image_url) setImage_url(initialData.image_url)
  }, [initialData?.image_url])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Si algún campo obligatorio tiene error, no enviar
    if (titleError || descriptionError || imageError || investmentGoalError || locationError || expectedReturnError) {
      return
    }

    const projectData: ProjectInput = {
      title,
      description,
      image_url: image_url || undefined,
      investment_goal,
      location,
      investment_type: investment_type || undefined,
      surface_m2: surface_m2 || undefined,
      rooms: rooms || undefined,
      bathrooms: bathrooms || undefined,
      min_investment: min_investment || undefined,
      expected_return,
      optimistic_return: optimistic_return || undefined,
      estimated_duration: estimated_duration || undefined,
      status: status || 'Abierto',
      financial_structure: initialData?.financial_structure,
      risk_mitigations: initialData?.risk_mitigations,
      gallery: initialData?.gallery,
      // Campos adicionales para formulario avanzado
      financial_structure_text: financial_structure_text || undefined,
      rentability_projection: rentability_projection || undefined,
      risk_analysis: risk_analysis || undefined,
      team_description: team_description || undefined,
      external_link: external_link || undefined
    }

    onSubmit(projectData)
  }

  const handleImageUpload = (imageUrl: string) => {
    setImage_url(imageUrl)
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
                placeholder="Ej: Residencial Premium en Madrid"
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

            {/* IMAGEN */}
            <div className="mb-4">
              <ImageUpload
                onImageUpload={handleImageUpload}
                initialImage={image_url}
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
                  label="Objetivo de Inversión (€)"
                  type="number"
                  value={investment_goal}
                  onChange={(e) => setInvestment_goal(Number(e.target.value))}
                  placeholder="500000"
                  required
                  validationRules={{
                    min: 1000,
                    required: true
                  }}
                  validateOnChange={true}
                  onErrorChange={setInvestmentGoalError}
                />
              </div>

              <div>
                <Input
                  label="Inversión Mínima (€)"
                  type="number"
                  value={min_investment}
                  onChange={(e) => setMin_investment(Number(e.target.value))}
                  placeholder="1000"
                />
              </div>

              <div>
                <Input
                  label="Retorno Esperado (%)"
                  value={expected_return}
                  onChange={(e) => setExpected_return(e.target.value)}
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
                  value={optimistic_return}
                  onChange={(e) => setOptimistic_return(e.target.value)}
                  placeholder="15"
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
                  placeholder="Madrid, España"
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
                  value={investment_type}
                  onChange={(e) => setInvestment_type(e.target.value)}
                  placeholder="Residencial, Comercial, etc."
                />
              </div>

              <div>
                <Input
                  label="Superficie (m²)"
                  type="number"
                  value={surface_m2}
                  onChange={(e) => setSurface_m2(Number(e.target.value))}
                  placeholder="120"
                />
              </div>

              <div>
                <Input
                  label="Habitaciones"
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  placeholder="3"
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

              <div>
                <Input
                  label="Plazo Estimado"
                  value={estimated_duration}
                  onChange={(e) => setEstimated_duration(e.target.value)}
                  placeholder="12-18 meses"
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
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
              >
                <option value="Abierto">Abierto</option>
                <option value="Cerrado">Cerrado</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
          </div>

          {/* ANÁLISIS FINANCIERO Y RIESGOS */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#1A1341] mb-4">Análisis Financiero y Riesgos</h3>
            
            <div className="space-y-4">
              {/* ESTRUCTURA FINANCIERA */}
              <div>
                <label className="block text-sm font-medium text-[#1A1341] mb-2">
                  Estructura Financiera
                </label>
                <textarea
                  value={financial_structure_text}
                  onChange={(e) => setFinancial_structure_text(e.target.value)}
                  placeholder="Ejemplo: Compra 77 %, Reforma 9 %, Gastos 9 %, Contingencias 5 %"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* PROYECCIÓN DE RENTABILIDAD */}
              <div>
                <label className="block text-sm font-medium text-[#1A1341] mb-2">
                  Proyección de Rentabilidad
                </label>
                <textarea
                  value={rentability_projection}
                  onChange={(e) => setRentability_projection(e.target.value)}
                  placeholder="Escenario conservador: 10 %, base: 12 %, optimista: 16 %"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* RIESGOS Y MITIGACIONES */}
              <div>
                <label className="block text-sm font-medium text-[#1A1341] mb-2">
                  Riesgos y Mitigaciones
                </label>
                <textarea
                  value={risk_analysis}
                  onChange={(e) => setRisk_analysis(e.target.value)}
                  placeholder="Retrasos → proveedores locales confirmados. Vacancia → alta demanda..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* EQUIPO PROMOTOR */}
              <div>
                <label className="block text-sm font-medium text-[#1A1341] mb-2">
                  Equipo Promotor
                </label>
                <textarea
                  value={team_description}
                  onChange={(e) => setTeam_description(e.target.value)}
                  placeholder="Boostaproyect · Empresa especializada en inversión inmobiliaria colaborativa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6290C3] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* ENLACE EXTERNO */}
              <div>
                <Input
                  label="Enlace Externo"
                  type="url"
                  value={external_link}
                  onChange={(e) => setExternal_link(e.target.value)}
                  placeholder="https://www.boostaproyect.com/fiverooms-venezuela"
                />
              </div>
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
              disabled={titleError || descriptionError || imageError || investmentGoalError || locationError || expectedReturnError}
            >
              {initialData ? 'Guardar cambios' : 'Crear proyecto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm