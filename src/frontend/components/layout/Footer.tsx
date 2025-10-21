/**
 * Footer.tsx — Pie de página horizontal y profesional para Boost A Project.
 *
 * Diseño discreto y elegante con estructura horizontal en desktop
 * y disposición vertical automática en móviles.
 *
 * Paleta: #1A1341 (fondo principal), #6290C3 (acento), #C2E7DA (texto claro)
 *
 * @author Boost A Project
 * @since v2.1.0
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1341] text-[#C2E7DA] border-t border-[#6290C3]/30 py-8 px-6 md:px-16">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* BLOQUE IZQUIERDO — LOGO + DESCRIPCIÓN */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          <Image
            src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
            alt="Logo Boost A Project"
            width={90}
            height={90}
            priority
            className="w-16 md:w-20 h-auto object-contain select-none"
          />
          <p className="text-sm text-[#C2E7DA]/80 max-w-sm leading-relaxed">
            <span className="text-white font-semibold">Boost A Project</span> es una plataforma digital de inversión inmobiliaria
            desarrollada y gestionada por{' '}
            <span className="text-white font-semibold">Dynamic Sport 360 Consultora S.L.</span>
          </p>
        </div>

        {/* BLOQUE CENTRAL — ENLACES LEGALES */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <Link href="/legal/aviso" className="hover:text-[#6290C3] transition-colors">
            Aviso Legal
          </Link>
          <Link href="/legal/privacidad" className="hover:text-[#6290C3] transition-colors">
            Política de Privacidad
          </Link>
          <Link href="/legal/cookies" className="hover:text-[#6290C3] transition-colors">
            Política de Cookies
          </Link>
          <Link href="/contact" className="hover:text-[#6290C3] transition-colors">
            Contacto
          </Link>
        </nav>
      </div>

      {/* LÍNEA DIVISORIA */}
      <div className="max-w-screen-2xl mx-auto my-6 border-t border-[#6290C3]/30" />

      {/* BLOQUE INFERIOR — DATOS LEGALES */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-3">
        <p className="text-xs md:text-sm text-[#C2E7DA]/70">
          © {new Date().getFullYear()} Boost A Project — una plataforma de{' '}
          <span className="text-white font-semibold">Dynamic Sport 360 Consultora S.L.</span>
        </p>
        <p className="text-xs md:text-sm text-[#C2E7DA]/70">
          CIF B10762615 · Calle Acanto 2 Bis, Las Rozas (Madrid) ·{' '}
          <a
            href="mailto:bapboostaproject@gmail.com"
            className="text-[#C2E7DA] hover:text-[#6290C3] transition-colors"
          >
            bapboostaproject@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
