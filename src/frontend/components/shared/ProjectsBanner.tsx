import React from 'react';

interface ProjectsBannerProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const ProjectsBanner: React.FC<ProjectsBannerProps> = ({ className = "", variant = 'light' }) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={`text-center py-8 bg-gradient-to-r from-[#6290C3]/10 to-[#C2E7DA]/10 rounded-2xl border border-[#6290C3]/20 ${className}`}>
      <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#1A1341]'}`}>
        Próximamente más proyectos disponibles
      </h3>
      <p className="font-medium text-[#6290C3]">
        Estamos trabajando en nuevas oportunidades de inversión inmobiliaria.
      </p>
    </div>
  );
};

export default ProjectsBanner;
