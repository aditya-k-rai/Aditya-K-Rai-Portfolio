import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import LiquidGradientBg from './LiquidGradientBg'
import PerfMarketing from './PerfMarketing'

export default function Advertisements() {
  return (
    <section id="advertisements" className="projectSection" style={{ position: 'relative' }}>
      <LiquidGradientBg />
      <SectionTitle base="Advertise" fade="ments" full="Advertisements" />
      <PerfMarketing />
    </section>
  )
}
