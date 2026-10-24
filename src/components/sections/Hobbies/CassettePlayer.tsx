'use client'

import React, { useState, useEffect, useRef } from 'react'

const tracks = [
  {
    label: 'Let Me Down',
    src: '/assets/audio/Let me down slowly X main dhondney ko 128KBPS.mp3',
  },
  {
    label: 'Aaja Sanam',
    src: '/assets/audio/AAJA SANAM X DARKSIDE.mp3',
  },
  {
    label: 'Smile Awari',
    src: '/assets/audio/Die-With-A-Smile-X-Awari-Mashup-Lady-128k.mp3',
  },
  {
    label: 'Smile Teri',
    src: '/assets/audio/Die-With-A-Smile-X-Teri-Deewani-Mashup-_128k.mp3',
  },
  {
    label: 'Mikasha Eren',
    src: '/assets/audio/Mikasha-x-eren-Hindi-song128k.mp3',
  },
]

export default function CassettePlayer() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [statusText, setStatusText] = useState('Ready: Let Me Down')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleTrackClick = (idx: number) => {
    const track = tracks[idx]
    const iframe = iframeRef.current
    if (!iframe || !iframe.contentWindow) return

    // Pause TV player
    window.postMessage({ type: 'portfolio-pause-tv' }, '*')

    if (activeIdx === idx && isPlaying) {
      iframe.contentWindow.postMessage(
        {
          type: 'portfolio-cassette-control',
          action: 'stop',
        },
        '*'
      )
      setIsPlaying(false)
      setStatusText(`Stopped: ${track.label}`)
      return
    }

    setActiveIdx(idx)
    setIsPlaying(true)
    setStatusText(`Playing: ${track.label}`)

    const absoluteSrc = new URL(track.src, window.location.href).href

    iframe.contentWindow.postMessage(
      {
        type: 'portfolio-cassette-load-track',
        src: absoluteSrc,
        title: track.label,
        trackIndex: 0,
        play: true,
      },
      '*'
    )
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data || {}
      if (data.type === 'portfolio-cassette-track-loaded') {
        setStatusText(`Loaded in recorder: ${tracks[activeIdx]?.label}`)
      }
      if (data.type === 'portfolio-cassette-track-playing') {
        setIsPlaying(true)
        setStatusText(`Playing: ${tracks[activeIdx]?.label}`)
      }
      if (data.type === 'portfolio-cassette-track-stopped') {
        setIsPlaying(false)
        setStatusText(`Ready: ${tracks[activeIdx]?.label}`)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [activeIdx])

  return (
    <div className="hobbies-subsection cassette-subsection" aria-labelledby="cassetteDeckTitle">
      <h3 id="cassetteDeckTitle" className="sr-only">4TRACK-CC audio cassette player</h3>
      <iframe
        ref={iframeRef}
        className="fourtrack-source-frame"
        src="/4track-recorder/index.html"
        title="4TRACK-CC open-source 4-track recorder"
        loading="lazy"
        allow="microphone"
        scrolling="no"
      ></iframe>
      <div className="cassette-track-list" aria-label="Audio cassette tracks">
        {tracks.map((t, idx) => {
          const isActive = idx === activeIdx
          return (
            <button
              key={idx}
              type="button"
              className={`cassette-track ${isActive ? 'is-active' : ''} ${isActive && isPlaying ? 'is-playing' : ''}`}
              data-cassette-audio={t.src}
              aria-pressed={isActive}
              onClick={() => handleTrackClick(idx)}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <p className="cassette-audio-status" aria-live="polite">
        {statusText}
      </p>
    </div>
  )
}
