'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const DEFAULT_COLORS = ['#3d52d5', '#090c08', '#b4c5e4', '#000000', '#47a8bd', '#ffffff']

export default function LiquidGradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    let isVisible = false
    let animId: number | null = null

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))

    const parseColor = (hex: string) => {
      const c = new THREE.Color(hex)
      return new THREE.Vector3(c.r, c.g, c.b)
    }

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uColor1: { value: parseColor(colors[0]) },
      uColor2: { value: parseColor(colors[1]) },
      uColor3: { value: parseColor(colors[2]) },
      uColor4: { value: parseColor(colors[3]) },
      uColor5: { value: parseColor(colors[4]) },
      uColor6: { value: parseColor(colors[5]) },
      uSpeed: { value: 0.8 },
      uIntensity: { value: 1.2 },
    }

    const vert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    const frag = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform vec3 uColor5;
      uniform vec3 uColor6;
      uniform float uSpeed;
      uniform float uIntensity;
      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= uResolution.x / max(uResolution.y, 1.0);
        float t = uTime * uSpeed * 0.3;

        float n1 = sin(p.x * 2.5 + t) * cos(p.y * 2.5 - t);
        float n2 = cos(p.x * 3.2 - t * 0.7) * sin(p.y * 3.2 + t * 0.7);
        float n3 = sin(length(p) * 4.0 - t * 1.2);

        vec3 col = mix(uColor1, uColor2, smoothstep(-1.0, 1.0, n1));
        col = mix(col, uColor3, smoothstep(-0.8, 0.8, n2));
        col = mix(col, uColor4, smoothstep(-0.5, 0.5, n3 * 0.5));
        col = mix(col, uColor5, smoothstep(-0.2, 0.9, sin(p.x * 4.0 + p.y * 4.0 + t)));

        gl_FragColor = vec4(col, 0.85);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms,
      transparent: true,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    const resize = () => {
      const w = container.offsetWidth || 800
      const h = container.offsetHeight || 600
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
    }

    resize()
    window.addEventListener('resize', resize)

    const clock = new THREE.Clock()
    const render = () => {
      if (!isVisible) {
        animId = null
        return
      }
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting
          if (isVisible && !animId) render()
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      if (animId) cancelAnimationFrame(animId)
      renderer.dispose()
      material.dispose()
    }
  }, [colors])

  const handleColorChange = (index: number, hex: string) => {
    setColors((prev) => {
      const next = [...prev]
      next[index] = hex
      return next
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        id="lg-canvas"
        className="lg-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      <div style={{ pointerEvents: 'auto' }}>
        <button
          type="button"
          className="lg-toggle-adjuster"
          id="lg-toggle-adjuster"
          onClick={() => setPanelOpen(!panelOpen)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            fontSize: '12px',
            padding: '6px 12px',
            background: 'var(--clr-glass)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--clr-border)',
            borderRadius: '999px',
            color: 'var(--clr-text)',
            cursor: 'pointer',
          }}
        >
          Adjust Colors
        </button>

        {panelOpen && (
          <div
            className="lg-adjuster-panel is-open"
            id="lg-adjuster-panel"
            role="dialog"
            aria-label="Color Adjuster"
            style={{
              position: 'absolute',
              top: '56px',
              right: '16px',
              zIndex: 20,
              background: 'var(--clr-bg-card)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--clr-border)',
              borderRadius: '16px',
              padding: '16px',
              width: '260px',
              boxShadow: '0 16px 36px var(--clr-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Adjust Liquid Colors</span>
              <button
                type="button"
                className="lg-adjuster-close"
                onClick={() => setPanelOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--clr-text)' }}
              >
                &times;
              </button>
            </div>
            {colors.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px' }}>Color {i + 1}</span>
                <input
                  type="color"
                  value={c}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  style={{ width: '32px', height: '24px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
