import React from 'react'
import Link from 'next/link'

export default function NotFound() {
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
        fontFamily: 'var(--font-primary), system-ui, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(5rem, 15vw, 10rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, hsl(224, 80%, 58%), hsl(280, 70%, 60%))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '1rem', fontWeight: 600 }}>
        Page Not Found
      </h1>
      <p
        style={{
          maxWidth: '480px',
          color: 'var(--clr-text-secondary, #a0a8d0)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for doesn&apos;t exist or has been moved to a new route.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          borderRadius: '999px',
          background: 'hsl(224, 80%, 58%)',
          color: '#ffffff',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 8px 24px hsla(224, 80%, 58%, 0.4)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        Return to Home &rarr;
      </Link>
    </div>
  )
}
