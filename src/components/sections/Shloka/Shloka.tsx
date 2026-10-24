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
      {Array.from({ length: 30 }).map((_, i) => (
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
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    let ticking = false

    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        let horizontal: number
        let vertical: number

        if (x > rect.width / 2) {
          horizontal = ((x - rect.width / 2) / (rect.width / 2)) * -1
        } else {
          horizontal = (rect.width / 2 - x) / (rect.width / 2)
        }

        if (y > rect.height / 2) {
          vertical = ((y - rect.height / 2) / (rect.height / 2)) * -1
        } else {
          vertical = (rect.height / 2 - y) / (rect.height / 2)
        }

        container.style.setProperty('--horizontal', horizontal.toString())
        container.style.setProperty('--vertical', vertical.toString())
        ticking = false
      })
    }

    const handleMouseLeave = () => {
      container.style.setProperty('--horizontal', '0')
      container.style.setProperty('--vertical', '0')
    }

    section.addEventListener('mousemove', handleMouseMove, { passive: true })
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="shloka-section" id="shlokaSection" ref={sectionRef}>
      <div className="shloka-noise" aria-hidden="true"></div>
      <div
        className="shloka-container"
        id="shlokaContainer"
        ref={containerRef}
        style={{
          ['--horizontal' as string]: '1',
          ['--vertical' as string]: '1',
        }}
      >
        <div
          className={`shloka-flipcard ${isFlipped ? 'flipped' : ''}`}
          id="shlokaFlipcard"
          onClick={() => setIsFlipped(!isFlipped)}
          role="button"
          tabIndex={0}
          aria-label="Toggle Sanskrit shloka meaning"
        >
          <div className="shloka-flip-inner">
            {/* Front: Sanskrit verse with glowing power words */}
            <div className="shloka-flip-front">
              <p className="shloka-line">
                <PowerWord text="उत्साहो" color="#FFE066" />{' '}
                <PowerWord text="बलवान्" color="#FF2D87" />{' '}
                <PowerWord text="आर्य" color="#BF40FF" />{' '}
                <span className="shloka-normal">नास्त्युत्साहात्परं</span>{' '}
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

            {/* Back: Full English meaning */}
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
