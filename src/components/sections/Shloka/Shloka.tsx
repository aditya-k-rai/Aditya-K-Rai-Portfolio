'use client'

import React, { useState, useEffect, useRef } from 'react'

interface PowerWordProps {
  text: string
  color: string
}

function PowerWord({ text, color }: PowerWordProps) {
  return (
    <span className="pw" style={{ ['--pw-color' as string]: color }}>
      {text}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="pw-copy"
          style={{ ['--index' as string]: i + 1 }}
          aria-hidden="true"
        >
          {text}
        </span>
      ))}
    </span>
  )
}

export default function Shloka() {
  const [isFlipped, setIsFlipped] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ h: 1, v: 1 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const h = (x - 0.5) * 2
      const v = (y - 0.5) * 2
      setCoords({ h, v })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="shloka-section" id="shlokaSection">
      <div className="shloka-noise" aria-hidden="true"></div>
      <div
        className="shloka-container"
        id="shlokaContainer"
        ref={containerRef}
        style={{
          ['--horizontal' as string]: coords.h,
          ['--vertical' as string]: coords.v,
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        role="button"
        tabIndex={0}
        aria-label="Toggle Sanskrit shloka meaning"
      >
        <div className={`shloka-flipcard ${isFlipped ? 'is-flipped' : ''}`} id="shlokaFlipcard">
          <div className="shloka-flip-inner">
            {/* Front: Sanskrit verse with glowing power words */}
            <div className="shloka-flip-front">
              <p className="shloka-line">
                <PowerWord text="उत्साहो" color="#FFE066" />{' '}
                <PowerWord text="बलवानार्य" color="#FF2D87" />{' '}
                <PowerWord text="नास्ति" color="#BF40FF" />{' '}
                <span className="shloka-normal">उत्साहात्परं</span>{' '}
                <PowerWord text="बलम्" color="#00F0FF" />{' '}
                <span className="shloka-normal">|</span>
              </p>
              <p className="shloka-line">
                <PowerWord text="सोत्साहस्य" color="#39FF14" />{' '}
                <span className="shloka-normal">हि</span>{' '}
                <PowerWord text="लोकेषु" color="#4D9FFF" />{' '}
                <span className="shloka-normal">न किञ्चिदपि</span>{' '}
                <PowerWord text="दुर्लभम्" color="#FF6B2B" />{' '}
                <span className="shloka-normal">||</span>
              </p>
              <p className="shloka-hint">click to reveal meaning</p>
            </div>

            {/* Back: English meaning */}
            <div className="shloka-flip-back">
              <p className="shloka-meaning">
                Enthusiasm is supreme strength, O Noble one; there is no power greater than enthusiasm.
                <br />
                <br />
                For the one who is full of enthusiasm, nothing in this world is difficult to attain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
