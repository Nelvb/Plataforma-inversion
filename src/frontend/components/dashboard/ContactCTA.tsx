/**
 * components/dashboard/ContactCTA.tsx
 *
 * Componente de contacto directo vía WhatsApp para el dashboard.
 * 
 * Características:
 * - Enlace directo a WhatsApp con mensaje predefinido
 * - Diseño con gradiente corporativo
 * - Botón con variante outlineGreen
 * - Accesibilidad completa con ARIA labels
 * - Apertura en nueva pestaña
 * - Texto descriptivo y CTA claro
 *
 * @author Boost A Project
 * @since v2.3.0
 */

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

interface ContactCTAProps {
    className?: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ className = "" }) => {
    // URL de WhatsApp con mensaje predefinido
    const whatsappUrl = "https://wa.me/34685565977?text=Hola%2C%20quiero%20información%20sobre%20los%20proyectos%20de%20inversión.";

    return (
        <section 
            className={`w-full bg-[#C2E7DA] py-20 px-4 sm:px-6 lg:px-24 border-t border-[#6290C3]/20 ${className}`}
            aria-label="Contacto directo por WhatsApp"
        >
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341] leading-snug mb-6">
                        ¿Necesitas ayuda?
                    </h2>
                    <p className="text-[#1A1341] text-lg leading-relaxed mb-8">
                        Contacta directamente con nosotros por WhatsApp y te asesoraremos. 
                        Nuestro equipo de expertos está disponible para resolver tus dudas 
                        y asesorarte sobre las mejores oportunidades de inversión.
                    </p>
                    
                    <Link 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir WhatsApp en nueva pestaña para contacto directo"
                    >
                        <Button
                            variant="outline"
                            size="md"
                            className="inline-flex items-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Hablar por WhatsApp
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
