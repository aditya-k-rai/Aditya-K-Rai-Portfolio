'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/data/projects'
import type { Project } from '@/types'

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProject) {
        setActiveProject(null)
      }
    }

    if (activeProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProject])

  return (
    <section id="projects" className="projectSection">
      <SectionTitle base="Website" fade="s" full="Websites" />
      <div className="projectContainer galleryGrid">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            onCardClick={(p) => setActiveProject(p)}
          />
        ))}
      </div>

      {/* Card Lightbox Modal matching P-Website */}
      <div
        className={`card-lightbox ${activeProject ? 'active' : ''}`}
        id="cardLightbox"
        onClick={() => setActiveProject(null)}
        role="dialog"
        aria-modal="true"
        aria-label={activeProject ? activeProject.title : 'Project details'}
      >
        <div
          className="card-lightbox-inner"
          id="cardLightboxInner"
          style={{
            backgroundImage: activeProject ? `url('/assets/projects/Project${activeProject.id}.png')` : 'none',
            backgroundColor: 'var(--clr-bg-surface, #1e1e24)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="card-lightbox-close"
            id="cardLightboxClose"
            type="button"
            onClick={() => setActiveProject(null)}
            aria-label="Close project modal"
          >
            &times;
          </button>
          <div className="card-lb-overlay"></div>
          {activeProject && (
            <div className="card-lb-body" id="cardLbBody">
              <div className="card-lb-skills">
                {activeProject.stack.map((icon, i) => (
                  <Image
                    key={i}
                    src={icon}
                    alt=""
                    className="projectSkill"
                    width={38}
                    height={38}
                  />
                ))}
              </div>
              <h2 className="card-lb-heading">{activeProject.title}</h2>
              <p className="card-lb-sub">{activeProject.description}</p>
              <div className="card-lb-btns btnGroup">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Link"
                    aria-label={`View ${activeProject.title} source code on GitHub`}
                  >
                    <span className="btn-icon github-icon"></span>
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Link"
                    aria-label={`View live site for ${activeProject.title}`}
                  >
                    <span className="btn-icon link-icon"></span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
