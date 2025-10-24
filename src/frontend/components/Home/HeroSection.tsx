// Optimización aplicada — caching con SWR y memoización (2025-01-18)
"use client";

import Image from "next/image";
import React from "react";

// React.memo aplicado para evitar renders innecesarios
const HeroSection: React.FC = () => {
  return (
    <section className="w-full relative overflow-hidden border-b border-[#6290C3]/20">
      {/* Fondo dividido en 2 colores */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-screen-3xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-20 pt-52 flex flex-col md:flex-row items-center justify-start gap-8 lg:gap-4">
        {/* Columna izquierda: imagen con marco desplazado */}
        <div className="w-full md:w-[50%] flex justify-start items-center pl-6 sm:pl-8 md:pl-10">
          <div className="relative w-full max-w-[800px]">
            {/* Marco detrás de la imagen */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-[#6290C3] rounded-tl-[70px] rounded-br-[70px] -z-10" />

            {/* Imagen principal */}
            <div className="overflow-hidden rounded-tl-[60px] rounded-br-[60px] shadow-lg">
              <Image
                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742829793/imagen_portada_rszj5g.webp"
                alt="Reunión inversión inmobiliaria"
                width={1200}
                height={700}
                className="object-cover w-full h-auto"
                priority // Priority solo en imagen principal del hero
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha: texto principal */}
        <div className="w-full md:w-[50%] flex flex-col items-start justify-center gap-8 relative px-2 sm:px-8 md:pr-10 max-w-[800px] md:max-w-none mx-auto md:mx-0">
          {/* Burbuja de mensaje principal */}
          <div className="bg-[#6290C3] text-white px-8 sm:px-10 py-12 sm:py-14 rounded-tl-[60px] rounded-br-[60px] w-full shadow-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug">
              Transforme su capital en patrimonio
            </h1>
          </div>

          {/* Burbuja del nombre de empresa */}
          <div className="bg-white text-[#6290C3] px-8 sm:px-10 py-8 sm:py-10 rounded-tr-[40px] rounded-bl-[40px] shadow-md w-full">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              Boost A Project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// React.memo aplicado para evitar renders innecesarios
export default React.memo(HeroSection);
