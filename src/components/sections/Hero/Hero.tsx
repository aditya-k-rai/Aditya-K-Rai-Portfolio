'use client'

import React, { useEffect, useState } from 'react'
import WaterText from './WaterText'
import OrbitRing from './OrbitRing'
import HeroShards from './HeroShards'
import { roles } from '@/lib/data/skills'

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullRole = roles[currentRoleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === fullRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      }, 300)
    } else {
      const delta = isDeleting ? 40 : 80
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting ? fullRole.substring(0, prev.length - 1) : fullRole.substring(0, prev.length + 1)
        )
      }, delta)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRoleIndex])

  return (
    <section className="heroSection" id="home">
      <WaterText />

      <div className="infoContainer">
        <div className="heading">Hi! Aditya Rai</div>
        <div className="heading subHeading">
          I am a <span className="role">{displayText}</span>
          <span className="cursor-blink" style={{ opacity: 0.8, marginLeft: '2px' }}>|</span>
        </div>
        <p className="desc">
          I&apos;m a Front-end Web developer and here is my portfolio website. Here
          you&apos;ll learn about my journey as a Web developer.
        </p>
        <a
          href="https://www.linkedin.com/in/aditya-k-rai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
        >
          <div className="btn">Connect +</div>
        </a>
      </div>

      <div className="orbit-hero-right">
        <div className="orbit-center-image">
          <HeroShards />
        </div>
        <OrbitRing />
      </div>
    </section>
  )
}
