'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { posterImages } from '@/lib/data/graphics'

export default function PosterCarousel() {
  const [activeIndex, setActiveIndex] = useState(3)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : posterImages.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < posterImages.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="gfx-division poster-effect-section" id="gfx-posters">
      <h3 className="gfx-division-title pb-title">Posters &amp; Banners</h3>
      <p className="gfx-division-desc pb-desc">Eye-catching poster and banner designs</p>

      <div className="poster-effect-carousel" data-active={activeIndex}>
        <div className="poster-effect-stage" aria-live="polite">
          {posterImages.map((src, idx) => {
            const offset = idx - activeIndex
            const isCenter = offset === 0
            const absOffset = Math.abs(offset)
            const isVisible = absOffset <= 3

            let transform = 'translate(-50%, -50%) scale(0.6)'
            let opacity = 0
            let zIndex = 1

            if (isVisible) {
              const translateX = offset * 110
              const translateZ = -absOffset * 80
              const rotateY = offset * -18
              const scale = isCenter ? 1 : Math.max(0.7, 1 - absOffset * 0.15)
              transform = `translate(calc(-50% + ${translateX}px), -50%) perspective(1000px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
              opacity = isCenter ? 1 : Math.max(0.4, 0.9 - absOffset * 0.25)
              zIndex = 20 - absOffset
            }

            return (
              <button
                key={idx}
                className={`poster-effect-slide ${isCenter ? 'is-active' : ''}`}
                type="button"
                data-title="Poster Design"
                data-index={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  display: isVisible ? 'block' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                <Image
                  src={src}
                  alt={`Poster Design ${idx + 1}`}
                  width={340}
                  height={480}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />
              </button>
            )
          })}
        </div>

        <div className="poster-effect-caption">
          Poster Design #{activeIndex + 1}
        </div>

        <div className="poster-effect-controls" aria-label="Poster carousel controls">
          <button
            className="poster-effect-nav"
            type="button"
            onClick={handlePrev}
            aria-label="Previous poster"
          >
            &#10094;
          </button>
          <div className="poster-effect-dots" aria-label="Choose poster">
            {posterImages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`poster-dot ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: i === activeIndex ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === activeIndex ? 'var(--clr-accent)' : 'var(--clr-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
          <button
            className="poster-effect-nav"
            type="button"
            onClick={handleNext}
            aria-label="Next poster"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  )
}
