'use client'

import React, { useEffect, useRef } from 'react'

export default function ITBgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number | null = null
    let isVisible = false

    interface Particle {
      x: number
      y: number
      r: number
      color: string
      ttl: number
      maxTtl: number
    }

    let particles: Particle[] = []

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      canvas.width = w
      canvas.height = h
    }

    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      if (!isVisible) {
        animId = null
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particles.length < 35 && Math.random() < 0.3) {
        const r = Math.floor(Math.random() * 80 + 40)
        const g = Math.floor(Math.random() * 120 + 80)
        const b = Math.floor(Math.random() * 200 + 150)
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 140 + 60,
          color: `rgba(${r},${g},${b},`,
          ttl: 0,
          maxTtl: Math.random() * 160 + 100,
        })
      }

      particles = particles.filter((p) => {
        p.ttl += 1
        const progress = p.ttl / p.maxTtl
        const alpha = Math.sin(progress * Math.PI) * 0.12

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `${p.color}${alpha})`)
        grad.addColorStop(1, `${p.color}0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        return p.ttl < p.maxTtl
      })

      animId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting
          if (isVisible && !animId) render()
        })
      },
      { threshold: 0.05 }
    )

    if (canvas.parentElement) observer.observe(canvas.parentElement)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="it-bg-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
