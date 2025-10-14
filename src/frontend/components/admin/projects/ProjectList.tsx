'use client'

import React from 'react'
import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

interface ProjectListProps {
  projects: Project[]
  onDelete: (slug: string) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 bg-[#F1FFEF] rounded-lg border border-[#6290C3]">
        <p className="text-[#1A1341] text-xl mb-4">No hay proyectos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProjectList
