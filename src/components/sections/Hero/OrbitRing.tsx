'use client'

import React, { useEffect, useState } from 'react'
import { orbitChips } from '@/lib/data/skills'

const palette = [
  '#e84949', '#ea580c', '#eab308', '#22c55e',
  '#14b8a6', '#0891b2', '#3b82f6', '#4f46e5',
  '#8b5cf6', '#ec4899', '#f43f5e', '#475569',
]

function textColorFor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.62 ? '#1a1a2e' : '#ffffff'
}

export default function OrbitRing() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev + 1) % palette.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="orbit-glow" aria-hidden="true"></div>
      <div className="orbit-animation-ring" aria-hidden="true">
        {orbitChips.map((chip, idx) => {
          const color = palette[(tick + idx) % palette.length]
          const textColor = textColorFor(color)

          return (
            <div
              key={idx}
              className="orbit-slot"
              style={{ ['--angle' as string]: `${chip.angle}deg` }}
            >
              <div className="orbit-counter-rotator">
                <div className="orbit-orientation-fixer">
                  <div
                    className="chip"
                    style={{
                      backgroundColor: color,
                      color: textColor,
                    }}
                  >
                    {chip.label}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
