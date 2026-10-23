import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import RetroTV from './RetroTV'
import CassettePlayer from './CassettePlayer'

export default function Hobbies() {
  return (
    <section id="hobbies" className="hobbies-section">
      <SectionTitle base="Hobbie" fade="s" full="Hobbies" className="hobbies-project-title" />

      {/* Subsection 1: Movies & Series */}
      <div className="hobbies-subsection hobbies-watch-subsection">
        <div className="hobbies-copy" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 id="hobbiesWatchTitle" className="hobbies-subtitle">Watching Movies &amp; Series</h3>
          <p className="hobbies-lead">
            Exploring stories, cinema, world-building, and digital cinematography in my free time.
          </p>
        </div>
        <RetroTV />
      </div>

      {/* Subsection 2: Audio Cassette Player */}
      <div style={{ marginTop: '48px' }}>
        <CassettePlayer />
      </div>
    </section>
  )
}
