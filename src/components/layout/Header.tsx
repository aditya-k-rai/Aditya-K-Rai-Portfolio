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
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const glareRef = useRef<HTMLSpanElement>(null)
  const navListRef = useRef<HTMLUListElement>(null)

  const updatePill = (targetHref: string, smooth: boolean = true) => {
    if (!pillRef.current || !navListRef.current) return
    const activeLink = navListRef.current.querySelector(`a[href="${targetHref}"]`) as HTMLElement | null
    if (!activeLink) return

    const navList = navListRef.current
    const listRect = navList.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const pillX = linkRect.left - listRect.left + navList.scrollLeft

    if (!smooth) {
      pillRef.current.style.transition = 'none'
    } else {
      pillRef.current.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }

    pillRef.current.style.width = `${activeLink.offsetWidth}px`
    pillRef.current.style.transform = `translateX(${pillX}px)`
    pillRef.current.style.opacity = '1'

    if (window.matchMedia('(max-width: 1180px)').matches && navList.scrollWidth > navList.clientWidth + 1) {
      const targetScroll = pillX - (navList.clientWidth - activeLink.offsetWidth) / 2
      navList.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  }

  useEffect(() => {
    const wrapper = document.getElementById('wrapper')
    const scroller = wrapper || window

    const syncToScroll = () => {
      const currentScroll = wrapper ? wrapper.scrollTop : window.scrollY
      let active = navItems[0].href

      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i]
        const id = item.href.slice(1)
        const el = document.getElementById(id)
        if (el) {
          const wrapperTop = wrapper ? wrapper.getBoundingClientRect().top : 0
          const top = el.getBoundingClientRect().top - wrapperTop + currentScroll
          if (currentScroll >= top - 220) {
            active = item.href
          }
        }
      }

      setActiveSection(active)
      updatePill(active, true)
    }

    scroller.addEventListener('scroll', syncToScroll, { passive: true })
    window.addEventListener('resize', () => updatePill(activeSection, false))

    const timer = setTimeout(() => {
      updatePill(activeSection, false)
    }, 150)

    return () => {
      scroller.removeEventListener('scroll', syncToScroll)
      clearTimeout(timer)
    }
  }, [activeSection])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glareRef.current || !navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    glareRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    glareRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
    glareRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!glareRef.current) return
    glareRef.current.style.opacity = '0'
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActiveSection(href)
    updatePill(href, true)

    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <span className="glass-glare" ref={glareRef}></span>
        </span>

        <ul className="nav-links" ref={navListRef}>
          <span className="nav-active-pill" ref={pillRef} aria-hidden="true"></span>
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={isActive ? 'is-active' : ''}
                  onClick={(e) => handleNavClick(e, item.href)}
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
