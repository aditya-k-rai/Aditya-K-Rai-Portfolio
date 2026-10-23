'use client'

import React from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import BlackBerryPhone from './BlackBerryPhone'
import Timeline from './Timeline'

export default function About() {
  return (
    <section id="about" className="projectSection">
      <SectionTitle base="About" fade=" Me" full="About Me" />

      <div className="about-grid">
        <BlackBerryPhone />

        <div className="about-copy ak-resume">
          <div className="ak-head">
            <div className="ak-identity">
              <h3 className="ak-name">Aditya Kumar Rai</h3>
              <div className="ak-role">
                Full Stack Web Developer &middot; Digital Marketer &middot; IT Specialist
              </div>
            </div>
            <div className="ak-chips-row">
              <span className="ak-mini-chip">24 yrs</span>
              <a
                className="ak-mini-chip ak-mini-chip--link"
                href="https://www.ccsuniversity.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Chaudhary Charan Singh University, Meerut"
              >
                <Image
                  src="/assets/graphics/icons/Chaudhary_Charan_Singh_University_logo.png"
                  alt="CCSU"
                  width={20}
                  height={20}
                  className="ak-mini-chip-logo"
                />
                <span>BCA &middot; CCSU</span>
              </a>
              <a
                className="ak-mini-chip ak-mini-chip--link"
                href="https://www.njmskasia.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Nav Jeevan Mission School, Kasia"
              >
                <Image
                  src="/assets/graphics/icons/NJMS School LOGO .png"
                  alt="NJMS"
                  width={20}
                  height={20}
                  className="ak-mini-chip-logo"
                />
                <span>10+2 &middot; NJMS, CBSE</span>
              </a>
            </div>
          </div>

          {/* About User Image - Between NJMS and Profile */}
          <img
            src="/assets/graphics/icons/Aditya Kumar Rai Siting .png"
            alt="Aditya Kumar Rai"
            className="about-user-image is-visible"
            loading="lazy"
            decoding="async"
          />

          <div className="ak-panels ak-split">
            <div className="ak-panel is-shown" data-ak-panel="profile">
              <div className="ak-panel-title">Profile</div>
              <p className="ak-para">
                Full-stack developer, digital marketer, and IT specialist &mdash; I treat curiosity
                like a workbench. Build, break, fix, repeat &mdash; and stay for the part where it finally clicks.
              </p>
              <p className="ak-para">
                BCA graduate, CCSU Meerut. Shipping production work across e-commerce, hospitality,
                construction, AI, and EV brands &mdash; code, campaigns, and creative under one roof.
              </p>
            </div>

            <div className="ak-panel is-shown" data-ak-panel="journey">
              <div className="ak-panel-title">Journey</div>
              <Timeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
