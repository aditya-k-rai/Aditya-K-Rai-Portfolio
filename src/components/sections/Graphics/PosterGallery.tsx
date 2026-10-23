'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { posterImages } from '@/lib/data/graphics'

export default function PosterGallery() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <div className="gfx-division" id="gfx-posters-gallery">
      <h3 className="gfx-division-title">Poster Designs Gallery</h3>
      <p className="gfx-division-desc">Creative poster designs and visual artwork</p>

      <div className="vg-wrapper">
        <div className="vg-items" id="vg-gallery">
          {posterImages.map((src, idx) => (
            <div
              key={idx}
              className="vg-item"
              tabIndex={0}
              onClick={() => setActiveModal(src)}
              role="button"
              aria-label={`View full poster ${idx + 1}`}
              style={{
                backgroundImage: `url('${src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
              }}
            ></div>
          ))}
        </div>
      </div>

      {activeModal && (
        <div
          className="card-lightbox is-open"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="card-lightbox-inner"
            style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="card-lightbox-close"
              type="button"
              onClick={() => setActiveModal(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '32px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
            <Image
              src={activeModal}
              alt="Enlarged Poster"
              width={700}
              height={980}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
