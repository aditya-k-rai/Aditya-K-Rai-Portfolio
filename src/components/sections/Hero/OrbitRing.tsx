import React from 'react'
import { orbitChips } from '@/lib/data/skills'

export default function OrbitRing() {
  return (
    <>
      <div className="orbit-glow" aria-hidden="true"></div>
      <div className="orbit-animation-ring" aria-hidden="true">
        {orbitChips.map((chip, idx) => (
          <div
            key={idx}
            className="orbit-slot"
            style={{ ['--angle' as string]: `${chip.angle}deg` }}
          >
            <div className="orbit-counter-rotator">
              <div className="orbit-orientation-fixer">
                <div className={`chip ${chip.colorClass}`}>{chip.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
