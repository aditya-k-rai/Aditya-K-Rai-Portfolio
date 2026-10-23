// Shared TypeScript types for the portfolio

export interface Project {
  id: number
  tag?: string
  number: string
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl: string
  side: 'left' | 'right'
}

export interface MenuItem {
  label: string
  src: string
}

export interface SkillBlock {
  name: string
  color: string
}

export interface ReelVideo {
  src: string
  poster?: string
}

export interface AdVideo {
  src: string
  poster?: string
}

export interface CompanyLogo {
  src: string
  alt: string
}

export interface ServiceCard {
  number: string
  icon: string
  title: string
  description: string
  techIcons: string[]
  color: string
}

export type Theme = 'light' | 'dark'

export interface PerfMode {
  isLite: boolean
  isUltraLite: boolean
}
