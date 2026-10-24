import dynamic from 'next/dynamic'
import Loader from '@/components/layout/Loader'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero/Hero'
import About from '@/components/sections/About/About'
import Projects from '@/components/sections/Projects/Projects'
import Footer from '@/components/layout/Footer'
import ResumeFAB from '@/components/ui/ResumeFAB'
import ShareOverlay from '@/components/ui/ShareOverlay'

// Dynamic components for high performance, code-splitting, and 60fps-165Hz rendering
const Skills = dynamic(() => import('@/components/sections/Skills/Skills'), {
  loading: () => <div style={{ minHeight: '500px' }} />,
})

const Graphics = dynamic(() => import('@/components/sections/Graphics/Graphics'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
})

const SocialMedia = dynamic(() => import('@/components/sections/SocialMedia/SocialMedia'), {
  loading: () => <div style={{ minHeight: '500px' }} />,
})

const Advertisements = dynamic(() => import('@/components/sections/Advertisements/Advertisements'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
})

const ITSpecialist = dynamic(() => import('@/components/sections/ITSpecialist/ITSpecialist'), {
  loading: () => <div style={{ minHeight: '500px' }} />,
})

const LetsConnect = dynamic(() => import('@/components/sections/LetsConnect/LetsConnect'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
})

const Hobbies = dynamic(() => import('@/components/sections/Hobbies/Hobbies'), {
  loading: () => <div style={{ minHeight: '600px' }} />,
})

const Services = dynamic(() => import('@/components/sections/Services/Services'), {
  loading: () => <div style={{ minHeight: '400px' }} />,
})

const Companies = dynamic(() => import('@/components/sections/Companies/Companies'), {
  loading: () => <div style={{ minHeight: '200px' }} />,
})

const Shloka = dynamic(() => import('@/components/sections/Shloka/Shloka'), {
  loading: () => <div style={{ minHeight: '300px' }} />,
})

export default function Home() {
  return (
    <>
      <Loader />
      <div id="wrapper">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Graphics />
          <SocialMedia />
          <Advertisements />
          <ITSpecialist />
          <LetsConnect />
          <Hobbies />
          <Services />
          <Companies />
          <Shloka />
        </main>
        <Footer />
      </div>
      <ResumeFAB />
      <ShareOverlay />
    </>
  )
}
