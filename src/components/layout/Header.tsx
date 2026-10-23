'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'

interface NavItem {
  label: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about', icon: 'fa-regular fa-user' },
  { label: 'Websites', href: '#projects', icon: 'fa-solid fa-code' },
  { label: 'Skills', href: '#skills', icon: 'fa-solid fa-list' },
  { label: 'Graphics', href: '#graphics', icon: 'fa-regular fa-image' },
  { label: 'Social', href: '#socialmedia', icon: 'fa-solid fa-share-nodes' },
  { label: 'Ads', href: '#advertisements', icon: 'fa-solid fa-bullhorn' },
  { label: 'IT', href: '#itSpecialist', icon: 'fa-solid fa-screwdriver-wrench' },
  { label: 'Hobby', href: '#hobbies', icon: 'fa-solid fa-film' },
  { label: 'Service', href: '#services', icon: 'fa-solid fa-briefcase' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const [activeSection, setActiveSection] = useState('#about')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i]
        const el = document.querySelector(item.href) as HTMLElement | null
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.href)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePos({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <header>
      <div className="logo">
        <Link href="#home" className="logo-home-link" aria-label="Go to home section">
          <Image
            src="/assets/user/ALRLogo.png"
            alt="Aditya Kumar Rai"
            width={70}
            height={44}
            className="header-logo-img"
            priority
            style={{ width: 'auto', height: '40px' }}
          />
        </Link>
      </div>

      <nav
        className="glass-nav"
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Main Navigation"
      >
        <span className="glass-filter" aria-hidden="true"></span>
        <span className="glass-overlay" aria-hidden="true"></span>
        <span className="glass-specular" aria-hidden="true"></span>
        <span className="glass-glare-wrap" aria-hidden="true">
          <span
            className="glass-glare"
            style={{
              left: `${glarePos.x}%`,
              top: `${glarePos.y}%`,
              opacity: glarePos.opacity,
            }}
          ></span>
        </span>

        <ul className="nav-links">
          <span className="nav-active-pill" aria-hidden="true"></span>
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={isActive ? 'is-active' : ''}
                  onClick={() => setActiveSection(item.href)}
                >
                  <i className={item.icon} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <span className="nav-divider" aria-hidden="true"></span>

        <button
          className="nav-theme-btn"
          id="navThemeToggleBtn"
          type="button"
          onClick={toggle}
          aria-label={`Toggle theme (currently ${theme})`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <i
            className={`fa-regular fa-sun nav-theme-sun ${theme === 'light' ? 'is-active' : ''}`}
            aria-hidden="true"
          ></i>
          <i
            className={`fa-regular fa-moon nav-theme-moon ${theme === 'dark' ? 'is-active' : ''}`}
            aria-hidden="true"
          ></i>
        </button>
      </nav>

      {/* SVG lens filter for the liquid-glass nav */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{ position: 'absolute', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <filter id="glassLensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceAlpha" result="alpha">
            <feFuncA type="identity" />
          </feComponentTransfer>
          <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="50" xChannelSelector="A" yChannelSelector="A" />
        </filter>
      </svg>
    </header>
  )
}
