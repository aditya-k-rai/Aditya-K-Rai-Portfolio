import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import RetroTV from './RetroTV'
import CassettePlayer from './CassettePlayer'

export default function Hobbies() {
  return (
    <section id="hobbies" className="hobbies-section">
      <SectionTitle base="Hobbie" fade="s" full="Hobbies" className="hobbies-project-title" />

      {/* Subsection 1: Movies & Series */}
      <div className="hobbies-subsection hobbies-watch-subsection" aria-labelledby="hobbiesWatchTitle">
        <div className="hobbies-copy">
          <h3 id="hobbiesWatchTitle" className="hobbies-subtitle">
            Watching Movies &amp; Series
          </h3>
          <p className="hobbies-lead">
            My hobby is watching movies and series in my free time.
          </p>
          <div className="hobbies-simple-card" aria-label="Watching movies and series hobby">
            <span className="hobbies-simple-icon">
              <i className="fa-solid fa-film" aria-hidden="true"></i>
            </span>
            <div className="hobbies-simple-copy">
              <strong>My Hobby</strong>
              <p>Watching movies and series</p>
            </div>
            <div className="hobbies-simple-tags">
              <span>
                <i className="fa-solid fa-clapperboard" aria-hidden="true"></i>Movies
              </span>
              <span>
                <i className="fa-solid fa-tv" aria-hidden="true"></i>Series
              </span>
            </div>
          </div>
        </div>
        <RetroTV />
      </div>

      {/* Subsection 2: Audio Cassette Player */}
      <CassettePlayer />
    </section>
  )
}
