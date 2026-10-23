'use client'

import React, { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const MAX_LOADER_MS = 1400 // Fast snappy load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const target = Math.min(100, Math.floor((elapsed / MAX_LOADER_MS) * 100))
      
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.ceil((target - prev) * 0.4) + 2)
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setHidden(true)
            setTimeout(() => setRemoved(true), 600)
          }, 200)
          return 100
        }
        return next
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  if (removed) return null

  return (
    <div
      className={`loader-screen ${hidden ? 'hidden' : ''}`}
      id="loader"
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s ease',
      }}
    >
      <div className="loader-card">
        <div className="loader-code-text">
          <div className="loader-code-line" data-line="1">const developer = &#123;</div>
          <div className="loader-code-line" data-line="2">&nbsp;&nbsp;name: &apos;Aditya Rai&apos;,</div>
          <div className="loader-code-line" data-line="3">&nbsp;&nbsp;status: &apos;loading portfolio...&apos;</div>
          <div className="loader-code-line" data-line="4">&#125;;</div>
        </div>
        <div className="loader-spinner-wrapper">
          <div className="loader-spinner"></div>
        </div>
        <div className="loader-progress-wrapper">
          <div
            className="loader-progress-bar"
            style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
          ></div>
        </div>
        <div className="loader-percentage" id="loaderPercent">
          {progress}%
        </div>
      </div>
    </div>
  )
}
