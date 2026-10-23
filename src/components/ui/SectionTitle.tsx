import React from 'react'

interface SectionTitleProps {
  base: string
  fade?: string
  full?: string
  className?: string
}

export default function SectionTitle({ base, fade = '', full, className = '' }: SectionTitleProps) {
  const fullText = full || `${base}${fade}`
  return (
    <h2 className={`projectTitle text-effect ${className}`.trim()}>
      <span className="te-line">
        <span className="te-base">{base}</span>
        {fade && <span className="te-fade">{fade}</span>}
      </span>
      <span className="te-hover">{fullText}</span>
    </h2>
  )
}
