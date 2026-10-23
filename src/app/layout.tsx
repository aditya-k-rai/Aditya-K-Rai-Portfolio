import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro, Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://adityakrai.com'),
  title: 'Aditya Kumar Rai — Full Stack Developer & Digital Marketer',
  description:
    'Portfolio of Aditya Kumar Rai — Full Stack Web Developer, Digital Marketer, IT Specialist, and Graphics Designer from India. Explore projects, skills, and creative work.',
  keywords: [
    'Aditya Kumar Rai',
    'Aditya Rai developer',
    'Full Stack Developer India',
    'Digital Marketer',
    'Web Developer portfolio',
    'React Next.js developer',
    'IT Specialist',
    'Graphics Designer',
  ],
  authors: [{ name: 'Aditya Kumar Rai' }],
  creator: 'Aditya Kumar Rai',
  openGraph: {
    title: 'Aditya Kumar Rai — Full Stack Developer & Digital Marketer',
    description: 'Explore my portfolio — web development, digital marketing, graphics, and IT work.',
    type: 'website',
    url: 'https://adityakrai.com',
    images: [{ url: '/assets/user/Aditya_nobg.png', width: 800, height: 800, alt: 'Aditya Kumar Rai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Kumar Rai — Full Stack Developer',
    description: 'Full Stack Web Developer, Digital Marketer & IT Specialist.',
    images: ['/assets/user/Aditya_nobg.png'],
  },
  icons: {
    icon: '/assets/user/icon.ico',
    shortcut: '/assets/user/icon.ico',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0e27' },
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} ${bricolageGrotesque.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/assets/user/Aditya_nobg.png" fetchPriority="high" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Aditya Kumar Rai',
              url: 'https://adityakrai.com',
              image: 'https://adityakrai.com/assets/user/Aditya_nobg.png',
              jobTitle: 'Full Stack Web Developer & Digital Marketer',
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Chaudhary Charan Singh University',
              },
              sameAs: [
                'https://www.linkedin.com/in/aditya-k-rai',
                'https://github.com/aditya-k-rai',
              ],
            }),
          }}
        />
        {/* Performance & theme detection: runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try{
    var pref=localStorage.getItem('themePref');
    var h=new Date().getHours();
    var mode=(pref==='dark'||pref==='light')?pref:((h>=18||h<9)?'dark':'light');
    if(mode==='dark')document.documentElement.classList.add('night');
    var dpr=window.devicePixelRatio||1;
    var vw=window.innerWidth||0;
    var vh=window.innerHeight||0;
    var mem=navigator.deviceMemory||0;
    var cpu=navigator.hardwareConcurrency||0;
    var area=Math.max(vw,screen.width||0)*Math.max(vh,screen.height||0)*dpr*dpr;
    var lite=area>3200000||(mem&&mem<=3)||(cpu&&cpu<=4)||((navigator.maxTouchPoints||0)>0&&Math.min(vw,vh)<=760&&dpr>=2.5);
    var ultraLite=(mem&&mem<=2)||(cpu&&cpu<=2)||((navigator.maxTouchPoints||0)>0&&(mem&&mem<=3)&&(cpu&&cpu<=4));
    if(lite)document.documentElement.classList.add('perf-lite');
    if(ultraLite)document.documentElement.classList.add('perf-ultra-lite');
    window.__perfLite=!!lite;
    window.__perfUltraLite=!!ultraLite;
  }catch(e){}
})();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
