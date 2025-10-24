/**
 * components/dashboard/InvestmentSimulator.tsx
 *
 * v2.4.2 - Campo de inversión refinado (Enter valida + flechas reinician)
 *
 * Características:
 * - Dropdown personalizado con proyectos activos
 * - Cálculo de ROI basado en datos reales
 * - Validaciones dinámicas de rango de inversión
 * - Campo editable con validación al Enter o blur
 * - Flechas reinician si hay texto sin confirmar
 * - Incrementos y decrementos de 1.000€
 * - Iconos unificados con Lucide React
 *
 * @author Boost A Project
 * @since v2.4.2
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProjects } from "@/lib/api/projectService";
import type { Project } from "@/types/project";
import { TrendingUp, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface InvestmentData {
  expected_return?: string;
  estimated_duration?: string;
  investment_goal?: number;
  min_investment?: number;
}

interface InvestmentSimulatorProps {
  className?: string;
}

const InvestmentSimulator: React.FC<InvestmentSimulatorProps> = ({ className = "" }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const [minInvestment, setMinInvestment] = useState<number>(1000);
  const [maxInvestment, setMaxInvestment] = useState<number>(100000);
  const [isValidRange, setIsValidRange] = useState<boolean>(true);
  const [benefit, setBenefit] = useState<number>(0);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cargar proyectos activos
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getProjects();
        const activeProjects = allProjects.filter((p) => p.status === "open");
        setProjects(activeProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };
    loadProjects();
  }, []);

  // Calcular límites
  useEffect(() => {
    if (!selectedProject?.investment_data) {
      setMinInvestment(1000);
      setMaxInvestment(100000);
      return;
    }

    const data = selectedProject.investment_data as InvestmentData;
    const min = data.min_investment || 1000;
    const max = data.investment_goal ? Math.floor(data.investment_goal * 0.4) : 100000;

    setMinInvestment(min);
    setMaxInvestment(max);

    if (investmentAmount > max || investmentAmount < min) {
      setInvestmentAmount(0);
      setInputValue("");
    }
  }, [selectedProject, investmentAmount]);

  // Validar rango y calcular ROI
  useEffect(() => {
    if (investmentAmount === 0) {
      setIsValidRange(true);
      setBenefit(0);
      return;
    }

    const valid = investmentAmount >= minInvestment && investmentAmount <= maxInvestment;
    setIsValidRange(valid);

    if (valid && selectedProject?.investment_data) {
      const data = selectedProject.investment_data as InvestmentData;
      const expected = parseFloat(data.expected_return?.replace("%", "") || "0");
      setBenefit(investmentAmount * (expected / 100));
    } else setBenefit(0);
  }, [investmentAmount, minInvestment, maxInvestment, selectedProject]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Selección de proyecto
  const handleProjectSelect = (p: Project) => {
    setSelectedProject(p);
    setInvestmentAmount(0);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  // Escritura libre
  const handleAmountChange = (v: string) => {
    const clean = v.replace(/[^0-9]/g, "");
    setInputValue(clean);
  };

  // Validar/redondear
  const validateAndApplyAmount = () => {
    if (!inputValue) {
      setInvestmentAmount(0);
      return;
    }

    const num = parseInt(inputValue, 10);
    if (isNaN(num)) return;

    const rounded = Math.round(num / 100) * 100;
    const bounded = Math.min(Math.max(rounded, minInvestment), maxInvestment);

    setInvestmentAmount(bounded);
    setInputValue(bounded.toString());
  };

  const handleAmountBlur = validateAndApplyAmount;

  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateAndApplyAmount();
    }
  };

  // Flechas: limpiar si hay texto no confirmado
  const handleIncrement = () => {
    if (inputValue && parseInt(inputValue) !== investmentAmount) {
      setInputValue("");
      setInvestmentAmount(minInvestment);
      return;
    }
    const newAmount = Math.min(investmentAmount + 1000, maxInvestment);
    setInvestmentAmount(newAmount);
    setInputValue(newAmount.toString());
  };

  const handleDecrement = () => {
    if (inputValue && parseInt(inputValue) !== investmentAmount) {
      setInputValue("");
      setInvestmentAmount(minInvestment);
      return;
    }
    const newAmount = Math.max(investmentAmount - 1000, minInvestment);
    setInvestmentAmount(newAmount);
    setInputValue(newAmount.toString());
  };

  return (
    <section
      className={`w-full bg-gradient-to-b from-[#C8D8F0] via-[#F0F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 relative z-10 ${className}`}
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A1341] mb-4">Simulador de Inversiones</h2>
          <p className="text-[#6290C3] text-lg font-medium">
            Calcula la rentabilidad anual estimada de nuestros proyectos activos
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          {/* Dropdown */}
          <div className="w-full max-w-md relative" ref={dropdownRef}>
            <label
              htmlFor="project-dropdown"
              className="block text-sm font-medium text-[#1A1341] mb-2"
            >
              Selecciona un proyecto
            </label>

            <button
              id="project-dropdown"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent text-sm bg-white cursor-pointer text-left hover:bg-gray-50 transition-colors relative"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span className={selectedProject ? "text-[#1A1341]" : "text-gray-500"}>
                {selectedProject ? selectedProject.title : "Selecciona un proyecto"}
              </span>
              <ChevronDown
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute left-0 right-0 z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                role="listbox"
              >
                {projects.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => handleProjectSelect(p)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-[#F5F8FF] ${
                      selectedProject?.slug === p.slug
                        ? "bg-[#1DA1F2]/10 text-[#1DA1F2] font-medium"
                        : "text-[#1A1341]"
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Validación de datos financieros */}
          {selectedProject && !selectedProject.investment_data && (
            <div className="w-full max-w-md p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-yellow-800 text-sm">
                  Este proyecto no contiene información financiera disponible.
                </p>
              </div>
            </div>
          )}

          {/* Input */}
          {selectedProject?.investment_data && (
            <div className="w-full max-w-md">
              <label htmlFor="investment-amount" className="block text-sm font-medium text-[#1A1341] mb-2">
                Cantidad a invertir
              </label>

              <div className="relative">
                <input
                  id="investment-amount"
                  type="text"
                  inputMode="numeric"
                  value={inputValue}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  onBlur={handleAmountBlur}
                  onKeyDown={handleAmountKeyDown}
                  className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent text-sm bg-white text-[#1A1341]
                             [appearance:none] [caret-color:#1DA1F2]
                             [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                             transition-all duration-150 placeholder:text-gray-400 hover:bg-gray-50"
                  placeholder={`Entre ${minInvestment.toLocaleString("es-ES")} y ${maxInvestment.toLocaleString("es-ES")}`}
                  aria-label="Cantidad a invertir"
                />

                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="text-gray-400 hover:text-[#1A1341] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={investmentAmount >= maxInvestment}
                    aria-label="Aumentar cantidad en 1.000€"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="text-gray-400 hover:text-[#1A1341] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={investmentAmount <= minInvestment}
                    aria-label="Disminuir cantidad en 1.000€"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-base font-medium pointer-events-none">
                  €
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mínimo: {minInvestment.toLocaleString("es-ES")}€</span>
                <span>Máximo: {maxInvestment.toLocaleString("es-ES")}€</span>
              </div>
            </div>
          )}

          {/* Resultado */}
          {isValidRange && benefit > 0 && selectedProject?.investment_data && (
            <div className="w-full max-w-md p-6 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#1DA1F2]" />
                <h4 className="font-semibold text-[#1DA1F2] text-lg">Resultados de la simulación</h4>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#1A1341] text-sm">Proyecto:</span>
                  <span className="text-[#1A1341] font-semibold">{selectedProject.title}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#1A1341] text-sm">Tu inversión:</span>
                  <span className="text-[#1A1341] font-semibold">
                    {investmentAmount.toLocaleString("es-ES")}€
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#1A1341] text-sm">Rentabilidad anual:</span>
                  <span className="text-[#1DA1F2] font-semibold">
                    {selectedProject.investment_data.expected_return}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#1DA1F2]/20 pt-3 mb-3">
                <p className="text-xs text-gray-600 font-medium mb-2">Beneficios por año:</p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1341]">Año 1:</span>
                  <span className="text-[#1A1341] font-medium">{benefit.toLocaleString("es-ES")}€</span>
                </div>
              </div>

              <div className="bg-[#1DA1F2]/20 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#1A1341] font-semibold">Total acumulado:</span>
                  <span className="text-[#1DA1F2] font-bold text-lg">
                    {benefit.toLocaleString("es-ES")}€
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[#1A1341] text-sm">Recuperarás:</span>
                  <span className="text-[#1A1341] font-semibold">
                    {(investmentAmount + benefit).toLocaleString("es-ES")}€
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 italic mt-4">
                * Simulación orientativa basada en rentabilidad del{" "}
                {selectedProject.investment_data.expected_return} anual.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestmentSimulator;
