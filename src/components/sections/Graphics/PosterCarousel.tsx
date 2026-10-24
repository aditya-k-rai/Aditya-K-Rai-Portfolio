'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { posterImages } from '@/lib/data/graphics'

export default function PosterCarousel() {
  const [activeIndex, setActiveIndex] = useState(3)

  function normalizeIndex(index: number) {
    return (index + posterImages.length) % posterImages.length
  }

  function getLoopOffset(index: number) {
    let offset = index - activeIndex
    const half = posterImages.length / 2
    if (offset > half) offset -= posterImages.length
    if (offset < -half) offset += posterImages.length
    return offset
  }

  const handlePrev = () => {
    setActiveIndex((prev) => normalizeIndex(prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => normalizeIndex(prev + 1))
  }

  return (
    <div className="gfx-division poster-effect-section" id="gfx-posters">
      <h3 className="gfx-division-title pb-title">Posters &amp; Banners</h3>
      <p className="gfx-division-desc pb-desc">Eye-catching poster and banner designs</p>

      <div className="poster-effect-carousel" data-active={activeIndex}>
        <div className="poster-effect-stage" aria-live="polite">
          {posterImages.map((src, idx) => {
            const offset = getLoopOffset(idx)
            const absOffset = Math.abs(offset)
            const isCenter = idx === activeIndex

            return (
              <button
                key={idx}
                className={`poster-effect-slide ${isCenter ? 'is-active' : ''}`}
                type="button"
                data-title={`Poster Design #${idx + 1}`}
                data-index={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  ['--offset' as string]: offset,
                  ['--abs-offset' as string]: absOffset,
                  zIndex: 80 - absOffset,
                }}
                aria-pressed={isCenter}
                aria-label={`Select poster design ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`Poster Design ${idx + 1}`}
                  width={340}
                  height={480}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
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
            data-poster-prev
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
                className={`poster-effect-dot ${i === activeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show poster ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : 'false'}
              />
            ))}
          </div>
          <button
            className="poster-effect-nav"
            type="button"
            data-poster-next
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
