'use client'

import React, { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Portfolio caught error:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--clr-bg, #080b1a)',
        color: 'var(--clr-text, #e8ecff)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>
        Something went wrong
      </h2>
      <p style={{ maxWidth: '440px', color: 'var(--clr-text-secondary, #a0a8d0)', marginBottom: '1.5rem' }}>
        An unexpected error occurred while rendering this section.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 24px',
          borderRadius: '999px',
          background: 'hsl(224, 80%, 58%)',
          color: '#ffffff',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}
