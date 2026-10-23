import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import PDFFlipbook from './PDFFlipbook'
import PosterCarousel from './PosterCarousel'
import PosterGallery from './PosterGallery'

export default function Graphics() {
  return (
    <section id="graphics" className="projectSection">
      <SectionTitle base="Graphics Design" fade="ing" full="Graphics Designing" />
      <PDFFlipbook />
      <PosterCarousel />
      <PosterGallery />
    </section>
  )
}
