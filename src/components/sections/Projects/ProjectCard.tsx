'use client'

import React from 'react'
import Image from 'next/image'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onCardClick?: (project: Project) => void
}

export default function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  const isRight = project.side === 'right'

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    if (onCardClick) onCardClick(project)
  }

  return (
    <div
      className="projectCard"
      id={`project${project.id}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onCardClick) {
          e.preventDefault()
          onCardClick(project)
        }
      }}
    >
      {project.tag && <span className="project-tag">{project.tag}</span>}
      <div className="projectCardOverlay"></div>
      <div className={`projectNumber ${isRight ? 'leftNumber' : 'rightNumber'}`}>
        {project.number}
      </div>

      <div className={`projectContent ${isRight ? 'rightProjectContent' : 'leftProjectContent'}`}>
        <div className="projectSkillsContainer">
          {project.stack.map((iconPath, idx) => (
            <Image
              key={idx}
              className="projectSkill"
              src={iconPath}
              alt=""
              width={38}
              height={38}
              loading="lazy"
            />
          ))}
        </div>

        <h2 className="projectHeading">{project.title}</h2>
        <p className="projectSubHeading">{project.description}</p>

        <div className="btnGroup">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Link"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <span className="btn-icon github-icon"></span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Link"
              aria-label={`View live site for ${project.title}`}
            >
              <span className="btn-icon link-icon"></span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
