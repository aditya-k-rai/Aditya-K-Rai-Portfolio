'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { posterImages } from '@/lib/data/graphics'

export default function PosterGallery() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>('.vg-item'))
    if (!items.length) return

    const bands = [
      'vg-hover-main',
      ['vg-left-1', 'vg-right-1'],
      ['vg-left-2', 'vg-right-2'],
      ['vg-left-3', 'vg-right-3'],
      ['vg-left-4', 'vg-right-4'],
    ]

    let openIndex = -1
    let hoverIndex = -1
    let padLeft = 0
    let firstCenter = 0
    let step = 0
    let epsBase = 12
    let prevX: number | null = null
    let prevT = 0

    function metric() {
      if (!container || !items[0]) return
      const cs = getComputedStyle(container)
      padLeft = parseFloat(cs.paddingLeft) || 0
      const w = items[0].offsetWidth || 0
      const gap = parseFloat(cs.gap) || 0
      step = w + gap
      firstCenter = items[0].offsetLeft + w / 2
      epsBase = Math.max(10, step * 0.08)
    }

    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v))
    }
    function indexFromX(x: number) {
      return clamp(Math.round((x - firstCenter) / step), 0, items.length - 1)
    }
    function centerFor(i: number) {
      return firstCenter + i * step
    }
    function clearClasses() {
      items.forEach((el) => {
        el.className = 'vg-item'
      })
    }

    function applyHoverState(idx: number) {
      clearClasses()
      if (idx < 0) return
      container?.classList.add('vg-hovering')
      items[idx]?.classList.add(bands[0] as string)
      for (let d = 1; d < bands.length; d++) {
        const L = idx - d
        const R = idx + d
        const pair = bands[d] as [string, string]
        if (L >= 0) items[L]?.classList.add(pair[0])
        if (R < items.length) items[R]?.classList.add(pair[1])
      }
    }

    function centerItem(idx: number) {
      if (!container || !items[idx]) return
      const wrap = container.getBoundingClientRect()
      const it = items[idx].getBoundingClientRect()
      const centerX = wrap.left + wrap.width / 2
      const delta = centerX - (it.left + it.width / 2)
      const maxShift = wrap.width * 0.35
      const clamped = Math.max(-maxShift, Math.min(maxShift, delta))
      container.style.setProperty('--vg-shift', clamped.toFixed(1) + 'px')
    }

    function resetShift() {
      container?.style.setProperty('--vg-shift', '0px')
    }

    function openItem(idx: number) {
      clearClasses()
      container?.classList.add('vg-is-open')
      items[idx]?.classList.add('vg-is-open')
      openIndex = idx
      centerItem(idx)
    }

    function closeOpen() {
      openIndex = -1
      container?.classList.remove('vg-is-open')
      resetShift()
      clearClasses()
    }

    function ensureHoveringOnce() {
      if (container?.classList.contains('vg-hovering')) return
      container?.classList.add('vg-hovering')
      requestAnimationFrame(metric)
    }

    function effectiveEPS(x: number) {
      if (prevX == null) return epsBase
      const dx = Math.abs(x - prevX)
      const now = performance.now()
      const dt = Math.max(1, now - (prevT || now))
      const v = dx / dt
      prevT = now
      const k = clamp(1 - v * 0.8, 0.4, 1)
      return epsBase * k
    }

    const handlePointerEnter = () => {
      if (openIndex !== -1) return
      ensureHoveringOnce()
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (openIndex !== -1) return
      ensureHoveringOnce()
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left - padLeft
      const idxRaw = indexFromX(x)
      let idx = idxRaw
      if (hoverIndex >= 0) {
        const c = centerFor(hoverIndex)
        const movingRight = prevX == null ? true : x > prevX
        const eps = effectiveEPS(x)
        if (movingRight && x < c + eps) idx = hoverIndex
        if (!movingRight && x > c - eps) idx = hoverIndex
      }
      prevX = x
      if (idx !== hoverIndex) {
        hoverIndex = idx
        applyHoverState(idx)
      }
    }

    const handlePointerLeave = (e: PointerEvent) => {
      if (openIndex !== -1) return
      const r = container.getBoundingClientRect()
      const M = 48
      if (
        e.clientX > r.left - M &&
        e.clientX < r.right + M &&
        e.clientY > r.top - M &&
        e.clientY < r.bottom + M
      )
        return
      hoverIndex = -1
      prevX = null
      prevT = 0
      container.classList.remove('vg-hovering')
      clearClasses()
    }

    const handleClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('.vg-item') as HTMLElement | null
      let idx = -1
      if (el) idx = items.indexOf(el)
      else if (hoverIndex >= 0) idx = hoverIndex
      if (idx < 0) return
      if (openIndex === idx) closeOpen()
      else openItem(idx)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openIndex !== -1) {
        e.preventDefault()
        closeOpen()
      }
    }

    container.addEventListener('pointerenter', handlePointerEnter)
    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    container.addEventListener('click', handleClick)
    container.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', metric)

    metric()

    return () => {
      container.removeEventListener('pointerenter', handlePointerEnter)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', metric)
    }
  }, [])

  return (
    <div className="gfx-division" id="gfx-posters-gallery">
      <h3 className="gfx-division-title">Poster Designs Gallery</h3>
      <p className="gfx-division-desc">Creative poster designs and visual artwork</p>

      <div className="vg-wrapper">
        <div className="vg-items" id="vg-gallery" ref={containerRef}>
          {posterImages.map((src, idx) => (
            <div
              key={idx}
              className="vg-item"
              tabIndex={0}
              role="button"
              aria-label={`View full poster ${idx + 1}`}
              style={{
                backgroundImage: `url('${src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          ))}
        </div>
      </div>

      {activeModal && (
        <div
          className="card-lightbox is-open"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="card-lightbox-inner"
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="card-lightbox-close"
              type="button"
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '32px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <Image
              src={activeModal}
              alt="Enlarged Poster"
              width={700}
              height={980}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
