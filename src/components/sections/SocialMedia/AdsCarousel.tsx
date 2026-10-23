'use client'

import React, { useRef } from 'react'
import { adVideos } from '@/lib/data/graphics'

export default function AdsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const scrollAmount = direction === 'left' ? -420 : 420
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className="sm-division" id="sm-ads">
      <h3 className="sm-division-title">Landscape Ads</h3>
      <p className="sm-division-desc">Commercial video ads and brand campaigns</p>

      <div className="sm-carousel sm-carousel--landscape" id="sm-ads-carousel" style={{ position: 'relative' }}>
        <button
          className="sm-nav-btn sm-nav-prev"
          type="button"
          onClick={() => handleScroll('left')}
          aria-label="Scroll ads left"
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'var(--clr-glass)',
            border: '1px solid var(--clr-border)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            color: 'var(--clr-text)',
          }}
        >
          &#10094;
        </button>

        <div className="sm-carousel__viewport" style={{ overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
          <ul
            className="sm-carousel__track"
            ref={trackRef}
            style={{ display: 'flex', gap: '24px', listStyle: 'none', padding: '0 24px' }}
          >
            {adVideos.map((src, idx) => (
              <li
                key={idx}
                className="sm-carousel__card"
                style={{
                  flex: '0 0 460px',
                  maxWidth: '85vw',
                  height: '260px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#000',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                  position: 'relative',
                }}
              >
                <video
                  className="sm-carousel__video"
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  src={src}
                  onClick={handleVideoClick}
                  onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                ></video>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    pointerEvents: 'none',
                  }}
                >
                  <i className="fa-solid fa-bullhorn" style={{ marginRight: '4px' }}></i> Ad Video #{idx + 1}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="sm-nav-btn sm-nav-next"
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll ads right"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'var(--clr-glass)',
            border: '1px solid var(--clr-border)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            color: 'var(--clr-text)',
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}
