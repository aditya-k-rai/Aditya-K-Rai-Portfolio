'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function LetsConnect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number | null = null
    let isVisible = false
    const img = new window.Image()
    img.src = '/assets/lets-connect.png'

    let boxes: { x: number; y: number }[] = []
    let boxSize = 24
    let radius = 180
    const pointer = { x: 400, y: 100, tx: 400, ty: 100 }

    const rebuildBoxes = (w: number, h: number) => {
      boxes = []
      boxSize = Math.max(16, Math.round(w / 45))
      radius = Math.max(w * 0.18, h * 1.1)
      for (let x = 0; x < w; x += boxSize) {
        for (let y = 0; y < h; y += boxSize) {
          boxes.push({ x, y })
        }
      }
    }

    const resize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth || 800
      const h = containerRef.current.offsetHeight || 160
      canvas.width = w
      canvas.height = h
      rebuildBoxes(w, h)
    }

    img.onload = () => {
      resize()
    }

    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const render = () => {
      if (!isVisible) {
        animId = null
        return
      }

      pointer.x += (pointer.tx - pointer.x) * 0.15
      pointer.y += (pointer.ty - pointer.y) * 0.15

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (img.complete && img.naturalWidth) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      // Draw grid overlay with alpha reveal around mouse pointer
      boxes.forEach((b) => {
        const dx = b.x + boxSize / 2 - pointer.x
        const dy = b.y + boxSize / 2 - pointer.y
        const dist = Math.hypot(dx, dy)
        const alpha = Math.min(1, Math.max(0, dist / radius))

        if (alpha > 0.05) {
          ctx.fillStyle = `rgba(10, 14, 39, ${alpha * 0.6})`
          ctx.fillRect(b.x, b.y, boxSize - 1, boxSize - 1)
        }
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
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="letsConnectCreation" className="lets-connect-section">
      <div
        className="lets-connect-shell"
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px var(--clr-shadow)',
        }}
      >
        <Image
          src="/assets/lets-connect.png"
          alt="Let's connect for creation"
          width={1200}
          height={240}
          className="lets-connect-image"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <canvas
          ref={canvasRef}
          id="lets-connect-canvas"
          className="lets-connect-canvas"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
          aria-label="Let's connect for creation"
        />
      </div>
    </section>
  )
}
