import React from 'react'
import type { ServiceCard as ServiceCardType } from '@/types'

interface ServiceCardProps {
  card: ServiceCardType
}

export default function ServiceCard({ card }: ServiceCardProps) {
  return (
    <div className={`ux-parent ux-parent--${card.color}`}>
      <div className="ux-card">
        <div className="ux-logo" aria-hidden="true">
          <span className="ux-circle"></span>
          <span className="ux-circle"></span>
          <span className="ux-circle"></span>
          <span className="ux-circle"></span>
          <span className="ux-circle">
            <i className={card.icon}></i>
          </span>
        </div>
        <div className="ux-glass"></div>
        <div className="ux-content">
          <span className="ux-title">{card.title}</span>
          <span className="ux-text">{card.description}</span>
        </div>
        <div className="ux-bottom">
          <div className="ux-social" aria-hidden="true">
            {card.techIcons.map((iconClass, idx) => (
              <span key={idx} className="ux-social-btn">
                <i className={iconClass}></i>
              </span>
            ))}
          </div>
          <div className="ux-more">
            <span className="ux-more-btn">{card.number}</span>
            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
