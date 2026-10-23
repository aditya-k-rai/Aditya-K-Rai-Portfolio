import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ServiceCard from './ServiceCard'
import { services } from '@/lib/data/services'

export default function Services() {
  return (
    <section className="servicesSection" id="services">
      <div className="container">
        <div className="serviceHeader" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <SectionTitle base="Servic" fade="e" full="Service" />
          <p className="serviceLead" style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--clr-text-secondary)' }}>
            A focused set of services built like a modular card lab: web interfaces, design, security basics, marketing, and visual content.
          </p>
        </div>
        <div className="servicesContainer shape-grid">
          {services.map((s) => (
            <ServiceCard key={s.number} card={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
