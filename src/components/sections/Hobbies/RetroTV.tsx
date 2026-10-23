import React from 'react'

export default function RetroTV() {
  return (
    <div className="hobbies-tv-wrap" style={{ width: '100%', maxWidth: '720px', margin: '0 auto', minHeight: '440px' }}>
      <iframe
        className="tv-frame"
        src="/tv.html"
        title="Interactive retro TV video player"
        loading="lazy"
        scrolling="no"
        style={{ width: '100%', height: '460px', border: 'none', borderRadius: '16px' }}
      ></iframe>
    </div>
  )
}
