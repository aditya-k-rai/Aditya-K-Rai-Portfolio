import React from 'react'

interface TimelineItem {
  period: string
  role: string
  company: string
}

const timelineData: TimelineItem[] = [
  {
    period: 'Mar 2026 — Present',
    role: 'Full Stack Developer',
    company: 'Silveri · E-commerce Jewelry',
  },
  {
    period: 'Mar — Apr 2026',
    role: 'Frontend Developer (React)',
    company: 'Lotwaala Platform · Freelance',
  },
  {
    period: 'Sep 2025 — Apr 2026',
    role: 'Web Developer and Digital Marketer',
    company: 'Trackovo AI Technology',
  },
  {
    period: 'Aug 2025 — Apr 2026',
    role: 'Full Stack Developer and Digital Marketer',
    company: 'Aarna Constructions',
  },
  {
    period: 'Jan — Jul 2025',
    role: 'Web Developer, Designer and Digital Marketer',
    company: 'Freelance · Hospitality Brands',
  },
  {
    period: 'Aug — Nov 2024',
    role: 'Web Support & Tech Executive',
    company: 'Ryoto Electrix Pvt. Ltd.',
  },
]

export default function Timeline() {
  return (
    <div className="ak-timeline">
      {timelineData.map((item, index) => (
        <div key={index} className="ak-t-item">
          <div className="ak-t-dot"></div>
          <div className="ak-t-period">{item.period}</div>
          <div className="ak-t-role">{item.role}</div>
          <div className="ak-t-company">{item.company}</div>
        </div>
      ))}
    </div>
  )
}
