'use client'

import React, { useState, useRef } from 'react'
import { cassetteAudios } from '@/lib/data/graphics'

export default function CassettePlayer() {
  const [currentTrack, setCurrentTrack] = useState(cassetteAudios[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleTrackChange = (track: typeof cassetteAudios[0]) => {
    setCurrentTrack(track)
    if (audioRef.current) {
      audioRef.current.src = track.src
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <div className="hobbies-subsection cassette-subsection" aria-labelledby="cassetteDeckTitle">
      <h3 id="cassetteDeckTitle" className="sr-only">4TRACK-CC audio cassette player</h3>

      <div style={{ position: 'relative', width: '100%', maxWidth: '680px', margin: '0 auto', minHeight: '380px' }}>
        <iframe
          className="fourtrack-source-frame"
          src="/4track-recorder/index.html"
          title="4TRACK-CC open-source 4-track recorder"
          loading="lazy"
          allow="microphone"
          scrolling="no"
          style={{ width: '100%', height: '400px', border: 'none', borderRadius: '16px' }}
        ></iframe>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="cassette-track-list" aria-label="Audio cassette tracks" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
        {cassetteAudios.map((track, idx) => {
          const isActive = track.src === currentTrack.src
          return (
            <button
              key={idx}
              type="button"
              className={`cassette-track ${isActive ? 'is-active' : ''}`}
              onClick={() => handleTrackChange(track)}
              aria-pressed={isActive}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                background: isActive ? 'var(--clr-accent)' : 'var(--clr-bg-card)',
                color: isActive ? '#fff' : 'var(--clr-text)',
                border: '1px solid var(--clr-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '13px',
              }}
            >
              {track.label} {isActive && isPlaying ? '🔊' : ''}
            </button>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <button
          type="button"
          onClick={togglePlayback}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            background: 'var(--clr-accent)',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause Audio' : 'Play Audio'}
        </button>
      </div>

      <p className="cassette-audio-status" aria-live="polite" style={{ textAlign: 'center', marginTop: '8px', fontSize: '13px', color: 'var(--clr-text-secondary)' }}>
        {isPlaying ? `Playing: ${currentTrack.label}` : `Ready: ${currentTrack.label}`}
      </p>
    </div>
  )
}
