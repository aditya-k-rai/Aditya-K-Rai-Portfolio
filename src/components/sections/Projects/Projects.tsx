import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="projectSection">
      <SectionTitle base="Website" fade="s" full="Websites" />
      <div className="projectContainer galleryGrid">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </section>
  )
}
