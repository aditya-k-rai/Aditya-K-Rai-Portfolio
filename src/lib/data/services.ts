import type { ServiceCard } from '@/types'

export const services: ServiceCard[] = [
  {
    number: '01',
    icon: 'fa-solid fa-code',
    title: 'Front-end Web Development',
    description: 'Responsive, modern, and interactive websites using HTML, CSS, JavaScript, React, Next.js, and more.',
    techIcons: ['fa-brands fa-html5', 'fa-brands fa-css3-alt', 'fa-brands fa-js'],
    color: 'mint',
  },
  {
    number: '02',
    icon: 'fa-solid fa-paint-brush',
    title: 'UI/UX Design',
    description: 'User-friendly interfaces and experiences for web and mobile applications with pixel-perfect layouts.',
    techIcons: ['fa-solid fa-pen-nib', 'fa-solid fa-layer-group', 'fa-solid fa-wand-magic-sparkles'],
    color: 'violet',
  },
  {
    number: '03',
    icon: 'fa-solid fa-lock',
    title: 'Basic Cybersecurity',
    description: 'Basic penetration testing, vulnerability scanning, and security analysis for web projects.',
    techIcons: ['fa-solid fa-shield-halved', 'fa-solid fa-bug', 'fa-solid fa-magnifying-glass-chart'],
    color: 'solar',
  },
  {
    number: '04',
    icon: 'fa-solid fa-bullhorn',
    title: 'Digital Marketing',
    description: 'Brand growth through social media, SEO, paid campaigns, analytics, and consistent performance tracking.',
    techIcons: ['fa-solid fa-chart-line', 'fa-brands fa-google', 'fa-solid fa-hashtag'],
    color: 'ocean',
  },
  {
    number: '05',
    icon: 'fa-solid fa-photo-film',
    title: 'Graphics and Video Editing',
    description: 'Graphics, edits, reels, and visual content for web and social media using Canva and Premiere Pro.',
    techIcons: ['fa-solid fa-scissors', 'fa-solid fa-image', 'fa-solid fa-play'],
    color: 'prism',
  },
]
