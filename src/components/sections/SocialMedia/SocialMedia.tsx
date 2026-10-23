import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import ReelsCarousel from './ReelsCarousel'
import AdsCarousel from './AdsCarousel'

export default function SocialMedia() {
  return (
    <section id="socialmedia" className="projectSection">
      <SectionTitle base="Social Medi" fade="a" full="Social Media" />
      <ReelsCarousel />
      <AdsCarousel />
    </section>
  )
}
