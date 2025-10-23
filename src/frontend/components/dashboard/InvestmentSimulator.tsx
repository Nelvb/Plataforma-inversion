/**
 * components/dashboard/InvestmentSimulator.tsx
 *
 * Simulador de inversiones para proyectos favoritos del usuario.
 * 
 * Características:
 * - Cálculo de ROI basado en datos reales del proyecto
 * - Validaciones dinámicas de rango de inversión
 * - Integración con useFavoritesStore
 * - Diseño accesible con aria-live
 * - Validación de datos financieros disponibles
 * - CTA alternativo para explorar proyectos
 * - Tipado estricto con interfaces personalizadas
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import type { Project } from "@/types/project";
import Button from "@/components/ui/Button";
import { Calculator, TrendingUp, AlertCircle } from "lucide-react";

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
    const { favorites } = useFavoritesStore();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [minInvestment, setMinInvestment] = useState<number>(1000);
    const [maxInvestment, setMaxInvestment] = useState<number>(100000);
    const [isValidRange, setIsValidRange] = useState<boolean>(true);
    const [benefit, setBenefit] = useState<number>(0);

    // Calcular límites de inversión cuando cambia el proyecto
    useEffect(() => {
        if (!selectedProject?.investment_data) {
            setMinInvestment(1000);
            setMaxInvestment(100000);
            return;
        }

        const investmentData = selectedProject.investment_data as InvestmentData;
        
        // Mínimo: usar min_investment si está definido, sino 1.000€
        const min = investmentData.min_investment || 1000;
        setMinInvestment(min);

        // Máximo: 40% del investment_goal si existe, sino 100.000€
        const max = investmentData.investment_goal 
            ? Math.floor(investmentData.investment_goal * 0.4)
            : 100000;
        setMaxInvestment(max);

        // Resetear inversión si está fuera del nuevo rango
        if (investmentAmount > max || investmentAmount < min) {
            setInvestmentAmount(0);
        }
    }, [selectedProject, investmentAmount]);

    // Validar rango de inversión
    useEffect(() => {
        if (investmentAmount === 0) {
            setIsValidRange(true);
            setBenefit(0);
            return;
        }

        const isValid = investmentAmount >= minInvestment && investmentAmount <= maxInvestment;
        setIsValidRange(isValid);
        
        if (isValid && selectedProject?.investment_data) {
            const investmentData = selectedProject.investment_data as InvestmentData;
            const expectedReturn = parseFloat(investmentData.expected_return?.replace('%', '') || '0');
            const calculatedBenefit = investmentAmount * (expectedReturn / 100);
            setBenefit(calculatedBenefit);
        } else {
            setBenefit(0);
        }
    }, [investmentAmount, minInvestment, maxInvestment, selectedProject]);

    // Manejar cambio de proyecto
    const handleProjectChange = (projectSlug: string) => {
        const project = favorites.find(fav => fav.slug === projectSlug);
        setSelectedProject(project || null);
        setInvestmentAmount(0);
    };

    // Manejar cambio de cantidad
    const handleAmountChange = (value: string) => {
        const numValue = parseFloat(value) || 0;
        setInvestmentAmount(numValue);
    };

    // Si no hay favoritos, mostrar CTA alternativo
    if (favorites.length === 0) {
        return (
            <section className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}>
                <div className="max-w-screen-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                            Simulador de Inversiones
                        </h2>
                        <p className="text-[#6290C3] text-lg font-medium">
                            Guarda proyectos en tus favoritos para simular inversiones
                        </p>
                    </div>

                    <div className="text-center py-16">
                        <p className="text-[#1A1341] text-lg mb-8">
                            Explora nuestros proyectos de inversión y guarda tus favoritos 
                            para simular inversiones y calcular rentabilidades.
                        </p>
                        
                        <Link href="/proyectos">
                            <Button variant="primary" size="lg">
                                Explorar proyectos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`w-full bg-gradient-to-b from-[#F5F8FF] to-white py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}>
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#1A1341] mb-4">
                        Simulador de Inversiones
                    </h2>
                    <p className="text-[#6290C3] text-lg font-medium">
                        Calcula la rentabilidad estimada de tus proyectos favoritos
                    </p>
                </div>

                <div className="flex flex-col gap-6 items-center">

                {/* Selector de proyecto */}
                <div className="w-full max-w-md">
                    <label htmlFor="project-select" className="block text-sm font-medium text-[#1A1341] mb-2">
                        Selecciona un proyecto
                    </label>
                    <select
                        id="project-select"
                        value={selectedProject?.slug || ''}
                        onChange={(e) => handleProjectChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
                    >
                        <option value="">Selecciona un proyecto</option>
                        {favorites.map((project) => (
                            <option key={project.slug} value={project.slug}>
                                {project.title}
                            </option>
                        ))}
                    </select>
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

                {/* Input de inversión */}
                {selectedProject?.investment_data && (
                    <div className="w-full max-w-md">
                        <label htmlFor="investment-amount" className="block text-sm font-medium text-[#1A1341] mb-2">
                            Cantidad a invertir (€)
                        </label>
                        <input
                            id="investment-amount"
                            type="number"
                            min={minInvestment}
                            max={maxInvestment}
                            step="100"
                            value={investmentAmount || ''}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent"
                            placeholder={`Entre ${minInvestment.toLocaleString('es-ES')}€ y ${maxInvestment.toLocaleString('es-ES')}€`}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Rango permitido: {minInvestment.toLocaleString('es-ES')}€ - {maxInvestment.toLocaleString('es-ES')}€
                        </p>
                    </div>
                )}

                {/* Validación de rango */}
                {investmentAmount > 0 && !isValidRange && (
                    <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">
                            La inversión debe estar entre {minInvestment.toLocaleString('es-ES')}€ y {maxInvestment.toLocaleString('es-ES')}€.
                        </p>
                    </div>
                )}

                {/* Resultado del cálculo */}
                {isValidRange && benefit > 0 && selectedProject?.investment_data && (
                    <div 
                        className="w-full max-w-md p-6 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 rounded-lg"
                        aria-live="polite"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-[#1DA1F2]" />
                            <h4 className="font-semibold text-[#1DA1F2]">Resultado de la simulación</h4>
                        </div>
                        <p className="text-[#1A1341] mb-3">
                            Si inviertes <strong>{investmentAmount.toLocaleString('es-ES')}€</strong> en <strong>{selectedProject.title}</strong>, 
                            obtendrías un beneficio estimado de <strong className="text-[#1DA1F2]">{benefit.toLocaleString('es-ES')}€</strong> 
                            {selectedProject.investment_data?.estimated_duration && ` en ${selectedProject.investment_data.estimated_duration}`}.
                        </p>
                        <p className="text-xs text-gray-600 italic">
                            Simulación orientativa. No constituye recomendación de inversión.
                        </p>
                    </div>
                )}
                </div>
            </div>
        </section>
    );
};

export default InvestmentSimulator;
