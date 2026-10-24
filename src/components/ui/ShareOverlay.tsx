'use client'

import React, { useState, useEffect } from 'react'

const shareLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877f2', href: 'https://www.facebook.com/sharer/sharer.php?u=https://adityarai.dev' },
  { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25d366', href: 'https://api.whatsapp.com/send?text=Check%20out%20Aditya%20Kumar%20Rai%27s%20portfolio:%20https://adityarai.dev' },
  { name: 'X / Twitter', icon: 'fab fa-x-twitter', color: '#1b1e21', href: 'https://twitter.com/intent/tweet?text=Check%20out%20Aditya%20Kumar%20Rai%27s%20portfolio&url=https://adityarai.dev' },
  { name: 'Telegram', icon: 'fab fa-telegram', color: '#0088cc', href: 'https://t.me/Mighty_Joker' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0a66c2', href: 'https://www.linkedin.com/in/aditya-k-rai' },
  { name: 'Instagram', icon: 'fab fa-instagram', color: '#c32aa3', href: 'https://www.instagram.com/mighty_aditya' },
]

export default function ShareOverlay() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className={`share-toggle-btn ${isOpen ? 'active' : ''}`}
        id="shareToggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close social share menu' : 'Open social share menu'}
        aria-expanded={isOpen}
      >
        <i className="fas fa-plus" aria-hidden="true"></i>
      </button>

      <div
        className={`share-overlay ${isOpen ? 'active' : ''}`}
        id="shareOverlay"
        onClick={() => setIsOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Share Portfolio"
      >
        <ul className="share-menu" onClick={(e) => e.stopPropagation()}>
          {shareLinks.map((item, idx) => (
            <li
              key={idx}
              style={{
                ['--i' as string]: idx,
                ['--clr' as string]: item.color,
              }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                aria-label={item.name}
                onClick={() => setIsOpen(false)}
              >
                <i className={item.icon} aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
