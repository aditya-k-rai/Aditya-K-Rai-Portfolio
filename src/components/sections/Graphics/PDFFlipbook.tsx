'use client'

import React, { useState } from 'react'
import { menuPDFs } from '@/lib/data/graphics'

export default function PDFFlipbook() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const selectedMenu = menuPDFs[selectedIdx] || menuPDFs[0]

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : menuPDFs.length - 1))
  }

  const handleNext = () => {
    setSelectedIdx((prev) => (prev < menuPDFs.length - 1 ? prev + 1 : 0))
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="gfx-division" id="gfx-menus">
      <h3 className="gfx-division-title">Booklets Designs</h3>
      <p className="gfx-division-desc">Interactive 3D flipbook Booklet designs</p>

      {/* Menu selection tabs */}
      <div className="gfx-menu-tabs">
        {menuPDFs.map((menu, idx) => (
          <button
            key={idx}
            className={`gfx-menu-tab ${selectedIdx === idx ? 'active' : ''}`}
            data-menu={menu.src}
            onClick={() => setSelectedIdx(idx)}
            type="button"
          >
            {menu.label}
          </button>
        ))}
      </div>

      <div className="gfx-book-wrapper">
        <div
          className={`gfx-book-container ${isFullscreen ? 'is-fullscreen' : ''}`}
          id="gfx-book-container"
          style={{
            position: isFullscreen ? 'fixed' : 'relative',
            inset: isFullscreen ? 0 : 'auto',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? '100vh' : '520px',
            zIndex: isFullscreen ? 9999 : 'auto',
            background: 'var(--clr-bg-surface, #1b1e24)',
            borderRadius: isFullscreen ? 0 : '16px',
            overflow: 'hidden',
          }}
        >
          <iframe
            src={`${selectedMenu.src}#toolbar=0&navpanes=0`}
            title={selectedMenu.label}
            style={{ width: '100%', height: '100%', border: 'none' }}
            loading="lazy"
          />
        </div>

        <div className="gfx-book-controls">
          <button
            className="gfx-book-btn"
            id="gfx-prev-btn"
            type="button"
            onClick={handlePrev}
            aria-label="Previous menu"
          >
            &#10094; Prev
          </button>
          <span className="gfx-page-indicator" id="gfx-page-indicator">
            Menu {selectedIdx + 1} / {menuPDFs.length}
          </span>
          <button
            className="gfx-book-btn"
            id="gfx-next-btn"
            type="button"
            onClick={handleNext}
            aria-label="Next menu"
          >
            Next &#10095;
          </button>
          <button
            className="gfx-book-btn gfx-fs-btn"
            id="gfx-fullscreen-btn"
            type="button"
            onClick={handleFullscreen}
            title="View Full Size"
          >
            &#x26F6; {isFullscreen ? 'Exit Full Size' : 'Full Size'}
          </button>
        </div>
        <p className="gfx-fs-hint">Double-tap or long-press the menu to view full size</p>
      </div>
    </div>
  )
}
