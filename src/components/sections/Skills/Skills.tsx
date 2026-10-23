import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ColorAvalanche from './ColorAvalanche'

export default function Skills() {
  return (
    <section className="color-avalanche-section" id="skills">
      <SectionTitle base="Skill" fade="s" full="Skills" />
      <p style={{ textAlign: 'center', color: 'var(--clr-text-secondary)', marginBottom: '24px' }}>
        Interactive physics sandbox &mdash; drag, toss, zero-gravity or explode skill tags in real time.
      </p>
      <ColorAvalanche />
    </section>
  )
}
