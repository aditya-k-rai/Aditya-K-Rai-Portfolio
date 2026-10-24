import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ServiceCard from './ServiceCard'
import { services } from '@/lib/data/services'

export default function Services() {
  return (
    <section className="servicesSection" id="services">
      <div className="container">
        <div className="serviceHeader">
          <SectionTitle base="Servic" fade="e" full="Service" />
          <p className="serviceLead">
            A focused set of services built like a modular card lab: web interfaces, design, security basics, marketing, and visual content.
          </p>
        </div>
        <div className="servicesContainer shape-grid">
          {services.map((s) => (
            <ServiceCard key={s.number} card={s} />
          ))}
        </div>

        {/* Get Started Button After Services Section */}
        <div className="get-started-btn-container">
          <a href="mailto:adtyamighty@gmail.com" className="getStartedBtnLink">
            <button className="getStartedBtn" type="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  )
}
