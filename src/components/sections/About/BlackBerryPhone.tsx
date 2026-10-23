'use client'

import React, { useRef, useState, useEffect } from 'react'

export default function BlackBerryPhone() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Intersection observer to play/pause video when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {/* auto-play policy */})
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return
    const rect = phoneRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const ry = (x / (rect.width / 2)) * 12
    const rx = -(y / (rect.height / 2)) * 12
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = true
    setIsMuted(true)
  }

  const handleSound = () => {
    if (!videoRef.current) return
    videoRef.current.muted = false
    setIsMuted(false)
  }

  return (
    <div
      className="about-phone-wrap"
      aria-label="BlackBerry style phone with Aditya about video"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="bb-phone-3d"
        ref={phoneRef}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <span className="bb-side-button bb-vol-up"></span>
        <span className="bb-side-button bb-silent"></span>
        <span className="bb-side-button bb-vol-down"></span>
        <span className="bb-speaker"></span>
        <span className="bb-camera"></span>
        <span className={`bb-led ${isPlaying ? 'bb-led-active' : ''}`}></span>
        <div className="bb-brand">BlackBerry</div>

        <div className="bb-screen" onClick={togglePlay} role="button" aria-label="Toggle video playback">
          <video
            ref={videoRef}
            className="bb-screen-video"
            src="/assets/videos/about.mp4"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
          ></video>
        </div>

        <div className="bb-keyboard">
          <div className="bb-key-row">
            <span>Q<small>#</small></span>
            <span>W<small>1</small></span>
            <span>E<small>2</small></span>
            <span>R<small>3</small></span>
            <span>T<small>(</small></span>
            <span>Z<small>)</small></span>
            <span>U<small>_</small></span>
            <span
              className={`bb-volume-off ${isMuted ? 'active-key' : ''}`}
              data-bb-control="mute"
              role="button"
              tabIndex={0}
              aria-label="Mute video"
              onClick={handleMute}
            >
              I<small>-</small>
            </span>
            <span
              className={`bb-volume-on ${!isMuted ? 'active-key' : ''}`}
              data-bb-control="sound"
              role="button"
              tabIndex={0}
              aria-label="Turn video volume on"
              onClick={handleSound}
            >
              O<small>+</small>
            </span>
            <span>P<small>@</small></span>
          </div>

          <div className="bb-key-row">
            <span>A<small>*</small></span>
            <span>S<small>4</small></span>
            <span>D<small>5</small></span>
            <span>F<small>6</small></span>
            <span>G<small>/</small></span>
            <span>H<small>:</small></span>
            <span>J<small>;</small></span>
            <span>K<small>&apos;</small></span>
            <span>L<small>&quot;</small></span>
            <span className="bb-key-wide">del</span>
          </div>

          <div className="bb-key-row">
            <span className="bb-key-wide">alt</span>
            <span>Y<small>7</small></span>
            <span>X<small>8</small></span>
            <span>C<small>9</small></span>
            <span>V<small>?</small></span>
            <span>B<small>!</small></span>
            <span>N<small>,</small></span>
            <span>M<small>.</small></span>
            <span>$</span>
            <span className="bb-key-wide">enter</span>
          </div>

          <div className="bb-key-row bb-key-row-bottom">
            <span className="bb-key-wide">shift</span>
            <span className="bb-key-wide">mic</span>
            <span
              className="bb-space"
              data-bb-control="play"
              role="button"
              tabIndex={0}
              aria-label="Play or pause video"
              onClick={togglePlay}
            ></span>
            <span className="bb-key-wide">sym</span>
            <span className="bb-key-wide">aA</span>
          </div>
        </div>
      </div>
    </div>
  )
}
