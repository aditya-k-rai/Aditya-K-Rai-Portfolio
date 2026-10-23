'use client'

import React, { useEffect, useRef, useState } from 'react'

interface PlatformData {
  name: string
  color: string
  points: number[]
}

const platforms: PlatformData[] = [
  { name: 'Google Ads', color: '#4285F4', points: [320, 410, 520, 680, 590, 780, 890] },
  { name: 'Meta Ads', color: '#1877F2', points: [450, 480, 610, 570, 720, 840, 920] },
  { name: 'Instagram', color: '#E1306C', points: [280, 390, 460, 620, 690, 750, 860] },
  { name: 'LinkedIn', color: '#0A66C2', points: [150, 220, 310, 390, 440, 510, 630] },
]

export default function PerfMarketing() {
  const [selectedTime, setSelectedTime] = useState('7D')
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null)
  const chartCanvasRef = useRef<HTMLCanvasElement>(null)
  const roasCanvasRef = useRef<HTMLCanvasElement>(null)

  // Draw Line Chart
  useEffect(() => {
    const canvas = chartCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.parentElement?.getBoundingClientRect()
    const w = rect ? rect.width : 700
    const h = 260

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    const pad = { top: 20, right: 24, bottom: 32, left: 44 }
    const plotW = w - pad.left - pad.right
    const plotH = h - pad.top - pad.bottom

    // Draw background grid
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
    ctx.lineWidth = 1

    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * plotH
      ctx.beginPath()
      ctx.moveTo(pad.left, y)
      ctx.lineTo(w - pad.right, y)
      ctx.stroke()

      const val = Math.round(1000 - (i / 4) * 1000)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.font = '10px var(--font-mono), monospace'
      ctx.textAlign = 'right'
      ctx.fillText(`${val}`, pad.left - 8, y + 4)
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    days.forEach((day, i) => {
      const x = pad.left + (i / (days.length - 1)) * plotW
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.font = '10px var(--font-mono), monospace'
      ctx.textAlign = 'center'
      ctx.fillText(day, x, h - 8)
    })

    // Draw lines
    platforms.forEach((plat, pIdx) => {
      if (selectedPlatform !== null && selectedPlatform !== pIdx) return
      const pts = plat.points

      ctx.beginPath()
      pts.forEach((pt, i) => {
        const x = pad.left + (i / (pts.length - 1)) * plotW
        const y = pad.top + (1 - pt / 1000) * plotH
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })

      ctx.strokeStyle = plat.color
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Gradient area fill
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH)
      grad.addColorStop(0, `${plat.color}33`)
      grad.addColorStop(1, `${plat.color}00`)
      ctx.lineTo(pad.left + plotW, pad.top + plotH)
      ctx.lineTo(pad.left, pad.top + plotH)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()
    })
  }, [selectedPlatform, selectedTime])

  // Draw ROAS Doughnut
  useEffect(() => {
    const canvas = roasCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 64
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const r = 24
    let startAngle = -Math.PI / 2

    const slices = [
      { val: 0.45, color: '#4285F4' },
      { val: 0.35, color: '#1877F2' },
      { val: 0.20, color: '#E1306C' },
    ]

    slices.forEach((s) => {
      const endAngle = startAngle + s.val * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, r, startAngle, endAngle)
      ctx.strokeStyle = s.color
      ctx.lineWidth = 6
      ctx.stroke()
      startAngle = endAngle
    })
  }, [])

  return (
    <div className="perf-marketing" style={{ position: 'relative', zIndex: 1, padding: '24px 0' }}>
      <div className="pm-section-header">
        <div className="pm-section-title">
          <span>📊</span> All Platforms Performance
          <span className="pm-live-badge">LIVE</span>
        </div>
        <div className="pm-time-pills">
          {['1D', '7D', '1M', '3M'].map((t) => (
            <span
              key={t}
              className={`pm-time-pill ${selectedTime === t ? 'active' : ''}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Platform Legend */}
      <div className="pm-legend" id="pmLegend">
        {platforms.map((p, idx) => (
          <div
            key={idx}
            className={`pm-legend-item ${selectedPlatform === idx ? 'active' : ''}`}
            onClick={() => setSelectedPlatform(selectedPlatform === idx ? null : idx)}
            style={{ cursor: 'pointer' }}
          >
            <span className="pm-legend-dot" style={{ background: p.color }}></span>
            {p.name}
          </div>
        ))}
      </div>

      {/* Graph Card */}
      <div className="pm-chart-card">
        <div className="pm-chart-area" style={{ width: '100%', height: '260px', position: 'relative' }}>
          <canvas ref={chartCanvasRef} id="pmGraphCanvas" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="pm-metrics-grid" id="pmMetricsGrid">
        <div className="pm-metric-card">
          <span className="pm-metric-icon">👁️</span>
          <div className="pm-metric-label">Impressions</div>
          <div className="pm-metric-value" id="pm-mv-impressions">6.2k</div>
          <div className="pm-metric-change up" id="pm-mc2-impressions">▲ 12.4%</div>
        </div>

        <div className="pm-metric-card">
          <span className="pm-metric-icon">❤️</span>
          <div className="pm-metric-label">Likes</div>
          <div className="pm-metric-value" id="pm-mv-likes">2.8k</div>
          <div className="pm-metric-change up" id="pm-mc2-likes">▲ 7.2%</div>
        </div>

        <div className="pm-metric-card">
          <span className="pm-metric-icon">👥</span>
          <div className="pm-metric-label">Followers</div>
          <div className="pm-metric-value" id="pm-mv-followers">1.1k</div>
          <div className="pm-metric-change up" id="pm-mc2-followers">▲ 7.3%</div>
        </div>

        <div className="pm-metric-card">
          <span className="pm-metric-icon">📈</span>
          <div className="pm-metric-label">Views</div>
          <div className="pm-metric-value" id="pm-mv-views">87k</div>
          <div className="pm-metric-change up" id="pm-mc2-views">▲ 18.9%</div>
        </div>

        <div className="pm-metric-card">
          <span className="pm-metric-icon">🖱️</span>
          <div className="pm-metric-label">Clicks</div>
          <div className="pm-metric-value" id="pm-mv-clicks">940</div>
          <div className="pm-metric-change up" id="pm-mc2-clicks">▲ 9.1%</div>
        </div>

        <div className="pm-metric-card">
          <span className="pm-metric-icon">🎯</span>
          <div className="pm-metric-label">Events</div>
          <div className="pm-metric-value" id="pm-mv-events">612</div>
          <div className="pm-metric-change up" id="pm-mc2-events">▲ 8.3%</div>
        </div>
      </div>

      {/* CPC / ROAS Row */}
      <div className="pm-cpc-roas-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
        <div className="pm-cpc-roas-card" style={{ background: 'var(--clr-bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--clr-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <div className="pm-metric-label">CPC (Cost Per Click)</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--clr-accent)' }}>₹1.84</div>
            </div>
            <div className="pm-metric-change down" style={{ color: '#22c55e' }}>▼ 4.2%</div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>Google Ads: ₹2.10 (High intent)</div>
            <div>Meta Ads: ₹1.42 (High volume)</div>
          </div>
        </div>

        <div className="pm-cpc-roas-card" style={{ background: 'var(--clr-bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <canvas ref={roasCanvasRef} style={{ width: '64px', height: '64px' }}></canvas>
          <div>
            <div className="pm-metric-label">ROAS (Return on Ad Spend)</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>4.7x</div>
            <div style={{ fontSize: '12px', color: 'var(--clr-text-secondary)' }}>Overall portfolio return</div>
          </div>
        </div>
      </div>
    </div>
  )
}
