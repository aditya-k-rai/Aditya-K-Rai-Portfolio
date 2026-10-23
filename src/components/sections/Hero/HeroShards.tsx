'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function HeroShards() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on desktop with normal motion
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 900
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isMobile || reduceMotion) return

    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = '/hero-shards.js'
      script.async = true
      document.body.appendChild(script)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="hero-shard-host" ref={hostRef}>
      <Image
        src="/assets/user/Aditya_nobg.png"
        alt="Aditya Rai"
        width={600}
        height={750}
        priority
        className="hero-shard-fallback"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
      />
      <svg
        id="heroFaceShards"
        className="hero-shards-svg"
        viewBox="0 0 600 750"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
      ></svg>
    </div>
  )
}
