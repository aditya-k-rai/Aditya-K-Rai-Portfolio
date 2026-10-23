'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { skills } from '@/lib/data/skills'

export default function ColorAvalanche() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [zeroGravity, setZeroGravity] = useState(false)
  const engineRef = useRef<Matter.Engine | null>(null)
  const bodiesDOMRef = useRef<{ body: Matter.Body; elem: HTMLDivElement }[]>([])

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

    const engine = Engine.create()
    engineRef.current = engine
    const world = engine.world

    const section = containerRef.current
    const sceneContainer = sceneRef.current
    const w = section.offsetWidth || 800
    const h = section.offsetHeight || 600

    const render = Render.create({
      element: section,
      engine,
      options: {
        width: w,
        height: h,
        wireframes: false,
        background: 'transparent',
      },
    })

    const runner = Runner.create()
    let isVisible = false
    let isRunning = false
    let hasSpawned = false
    let animFrameId: number | null = null

    // Create boundary walls
    const thickness = 100
    const spawnHeight = 3000
    const floor = Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, {
      isStatic: true,
      label: 'ca-floor',
      friction: 0.5,
    })
    const leftWall = Bodies.rectangle(-thickness / 2, h - (h + spawnHeight) / 2, thickness, h + spawnHeight, {
      isStatic: true,
      label: 'ca-wall',
      friction: 0,
    })
    const rightWall = Bodies.rectangle(w + thickness / 2, h - (h + spawnHeight) / 2, thickness, h + spawnHeight, {
      isStatic: true,
      label: 'ca-wall',
      friction: 0,
    })

    Composite.add(world, [floor, leftWall, rightWall])

    // Spawn skill blocks
    const spawnSkills = () => {
      if (hasSpawned) return
      hasSpawned = true

      const isMobile = window.innerWidth <= 600
      const count = isMobile ? 24 : 45
      const charWidth = isMobile ? 7 : 9
      const boxPad = isMobile ? 24 : 34
      const pillHeight = isMobile ? 32 : 40
      const padding = 40

      const shuffled = [...skills].sort(() => 0.5 - Math.random()).slice(0, count)

      shuffled.forEach((skill) => {
        const x = Math.random() * (w - padding * 2) + padding
        const y = -Math.random() * 1500 - 150
        const boxWidth = skill.name.length * charWidth + boxPad

        const body = Bodies.rectangle(x, y, boxWidth, pillHeight, {
          angle: Math.random() * 0.4 - 0.2,
          restitution: 0.55,
          friction: 0.05,
          label: skill.name,
        })

        const elem = document.createElement('div')
        elem.className = 'ca-color-body'
        elem.textContent = skill.name
        elem.style.width = `${boxWidth}px`
        elem.style.height = `${pillHeight}px`
        elem.style.fontSize = isMobile ? '11px' : '13px'
        elem.style.backgroundColor = skill.color
        elem.style.position = 'absolute'
        elem.style.left = '0'
        elem.style.top = '0'
        elem.style.cursor = 'grab'
        elem.style.userSelect = 'none'

        sceneContainer.appendChild(elem)
        bodiesDOMRef.current.push({ body, elem })
        Composite.add(world, body)
      })
    }

    // Sync loop
    const updateLoop = () => {
      if (!isVisible) {
        animFrameId = null
        return
      }

      bodiesDOMRef.current.forEach(({ body, elem }) => {
        const { x, y } = body.position
        const angle = body.angle
        elem.style.transform = `translate(${x - elem.offsetWidth / 2}px, ${y - elem.offsetHeight / 2}px) rotate(${angle}rad)`
      })

      animFrameId = requestAnimationFrame(updateLoop)
    }

    // Mouse drag
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    render.canvas.style.zIndex = '5'
    Composite.add(world, mouseConstraint)

    // Intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible) {
            if (!hasSpawned) spawnSkills()
            if (!isRunning) {
              Render.run(render)
              Runner.run(runner, engine)
              isRunning = true
            }
            if (!animFrameId) animFrameId = requestAnimationFrame(updateLoop)
          } else {
            if (isRunning) {
              Render.stop(render)
              Runner.stop(runner)
              isRunning = false
            }
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      if (animFrameId) cancelAnimationFrame(animFrameId)
      Render.stop(render)
      Runner.stop(runner)
      Composite.clear(world, false)
      Engine.clear(engine)
      if (render.canvas && render.canvas.parentElement) {
        render.canvas.parentElement.removeChild(render.canvas)
      }
    }
  }, [])

  const handleToggleGravity = () => {
    if (!engineRef.current) return
    const nextState = !zeroGravity
    setZeroGravity(nextState)
    engineRef.current.gravity.y = nextState ? 0 : 1

    if (nextState) {
      bodiesDOMRef.current.forEach(({ body }) => {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
        })
      })
    }
  }

  const handleExplode = () => {
    if (!engineRef.current) return

    // Sound effect via Web Audio
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.setValueAtTime(140, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        gain.gain.setValueAtTime(0.4, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        osc.start()
        osc.stop(ctx.currentTime + 0.4)
      }
    } catch {}

    bodiesDOMRef.current.forEach(({ body }) => {
      const force = 0.05 * body.mass
      const angle = Math.random() * Math.PI * 2
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force,
      })
    })
  }

  return (
    <div className="ca-scene-wrapper" style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden' }} ref={containerRef}>
      <div className="ca-controls" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, display: 'flex', gap: '8px' }}>
        <button className="ca-btn" id="ca-btn-gravity" type="button" onClick={handleToggleGravity}>
          {zeroGravity ? 'Restore Gravity' : 'Zero Gravity'}
        </button>
        <button className="ca-btn" id="ca-btn-explode" type="button" onClick={handleExplode}>
          Explode
        </button>
      </div>
      <div className="ca-scene" id="ca-scene-container" ref={sceneRef}></div>
    </div>
  )
}
