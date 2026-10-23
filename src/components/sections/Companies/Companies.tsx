import React from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import { companyLogos } from '@/lib/data/graphics'

export default function Companies() {
  return (
    <section id="companiesCollaboration" className="projectSection pb-carousel-section">
      <SectionTitle base="Companies &amp; Collabor" fade="ations" full="Companies & Collaborations" />

      <div className="cc-wrap" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px' }}>
        <p className="cc-intro" style={{ color: 'var(--clr-text-secondary)' }}>
          Collaborated with and contributed to multiple companies and organizations, bringing technical expertise and innovative solutions across various industries and projects.
        </p>
      </div>

      <div className="pb-carousel-track" style={{ ['--time' as string]: '34s', ['--total' as string]: '10' }}>
        {companyLogos.map((logo, idx) => (
          <div
            key={idx}
            className="pb-carousel-item"
            style={{ ['--i' as string]: `${idx + 1}` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={70}
              loading="lazy"
              style={{ objectFit: 'contain', width: 'auto', maxHeight: '54px' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
