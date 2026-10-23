'use client'

import React, { useState } from 'react'
import { menuPDFs } from '@/lib/data/graphics'

export default function PDFFlipbook() {
  const [selectedMenu, setSelectedMenu] = useState(menuPDFs[0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="gfx-division" id="gfx-menus">
      <h3 className="gfx-division-title">Booklets Designs</h3>
      <p className="gfx-division-desc">Interactive Booklet and Menu Designs</p>

      {/* Menu selection tabs */}
      <div className="gfx-menu-tabs" role="tablist" style={{ overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '12px' }}>
        {menuPDFs.map((menu, idx) => (
          <button
            key={idx}
            className={`gfx-menu-tab ${selectedMenu.src === menu.src ? 'active' : ''}`}
            onClick={() => setSelectedMenu(menu)}
            type="button"
            role="tab"
            aria-selected={selectedMenu.src === menu.src}
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
            top: isFullscreen ? 0 : 'auto',
            left: isFullscreen ? 0 : 'auto',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? '100vh' : '520px',
            zIndex: isFullscreen ? 9999 : 'auto',
            background: 'var(--clr-bg-secondary)',
            borderRadius: isFullscreen ? 0 : '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px var(--clr-shadow)',
          }}
        >
          <iframe
            src={`${selectedMenu.src}#toolbar=0&navpanes=0`}
            title={selectedMenu.label}
            style={{ width: '100%', height: '100%', border: 'none' }}
            loading="lazy"
          />
        </div>

        <div className="gfx-book-controls" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
          <a
            href={selectedMenu.src}
            target="_blank"
            rel="noopener noreferrer"
            className="gfx-book-btn gfx-fs-btn"
            title="Open in new tab"
          >
            &#x26F6; Open PDF
          </a>
          <button
            className="gfx-book-btn"
            type="button"
            onClick={handleFullscreen}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
        <p className="gfx-fs-hint" style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.85rem', opacity: 0.7 }}>
          Select any restaurant or cafe booklet above to preview
        </p>
      </div>
    </div>
  )
}
