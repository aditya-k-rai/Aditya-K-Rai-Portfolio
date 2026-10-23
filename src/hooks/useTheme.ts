'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '@/types'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const pref = localStorage.getItem('themePref') as Theme | null
        const hour = new Date().getHours()
        const resolved: Theme = (pref === 'dark' || pref === 'light')
          ? pref
          : (hour >= 18 || hour < 9 ? 'dark' : 'light')
        setTheme(resolved)
        document.body.classList.toggle('night-theme', resolved === 'dark')
        document.documentElement.classList.toggle('night', resolved === 'dark')
      } catch {
        // SSR safe
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('themePref', next)
        document.body.classList.toggle('night-theme', next === 'dark')
        document.documentElement.classList.toggle('night', next === 'dark')
      } catch {/* noop */}
      return next
    })
  }, [])

  return { theme, toggle }
}
