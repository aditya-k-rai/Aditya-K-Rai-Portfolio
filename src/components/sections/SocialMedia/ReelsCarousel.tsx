'use client'

import React, { useState, useEffect, useRef } from 'react'
import { reelVideos } from '@/lib/data/graphics'

export default function ReelsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const total = reelVideos.length

  const getDiff = (idx: number) => {
    let diff = idx - activeIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total)
  }

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPlaying, total])

  return (
    <div className="sm-division" id="sm-reels">
      <h3 className="sm-division-title">Reels</h3>
      <p className="sm-division-desc">Portrait video content for social media platforms</p>

      <div
        className="sm-carousel sm-carousel--portrait"
        id="sm-reels-carousel"
        ref={carouselRef}
      >
        <div className="sm-carousel__viewport">
          <ul className="sm-carousel__track">
            {reelVideos.map((src, idx) => {
              const diff = getDiff(idx)
              const isCenter = diff === 0

              return (
                <li
                  key={idx}
                  className="sm-carousel__card"
                  data-pos={diff}
                  data-index={idx}
                  onClick={() => setActiveIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select reel video ${idx + 1}`}
                >
                  <video
                    className="sm-carousel__video"
                    preload="metadata"
                    muted={!isCenter || isMuted}
                    loop
                    playsInline
                    autoPlay={isCenter && isPlaying}
                    src={src}
                  ></video>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="sm-carousel__controls">
          <button
            className="sm-carousel__btn sm-carousel__btn--prev"
            type="button"
            onClick={goPrev}
            aria-label="Previous reel"
          >
            &#10094; PREV
          </button>
          <button
            className="sm-carousel__btn sm-carousel__btn--playpause"
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <span className="sm-carousel__indicator">
            {activeIndex + 1} / {total}
          </span>
          <button
            className="sm-carousel__btn sm-carousel__btn--next"
            type="button"
            onClick={goNext}
            aria-label="Next reel"
          >
            NEXT &#10095;
          </button>
          <button
            className="sm-carousel__btn sm-carousel__btn--mute"
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
          </button>
        </div>
      </div>
    </div>
  )
}
