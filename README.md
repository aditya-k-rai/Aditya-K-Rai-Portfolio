# Aditya Kumar Rai — Next.js Portfolio

A modern, high-performance, responsive portfolio website built with Next.js 16 App Router, TypeScript, Three.js, Matter.js physics, and vanilla CSS design tokens. Optimized for fluid 60 FPS to 165Hz displays, and responsive from 320px mobile screens to 4K UHD monitors.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Physics**: Matter.js (interactive skill avalanche sandbox with zero-gravity & explode effects)
- **3D & Canvas**: Three.js WebGL liquid gradient shader + HTML5 Canvas network and performance marketing analytics
- **Styling**: Vanilla CSS Design Tokens (zero Tailwind constraint — maximum control and 100% visual fidelity)
- **Typography**: `next/font/google` (`Be Vietnam Pro`, `Bricolage Grotesque`, `Space Grotesk`) with `display=swap`
- **Icons**: Font Awesome 6 + optimized SVG icons
- **SEO**: Dynamic `sitemap.ts`, `robots.ts`, Open Graph / Twitter cards, JSON-LD Schema.org Person structured data

---

## 📁 Directory Structure

```
Aditya-K-Rai-Portfolio/
├── public/
│   ├── assets/
│   │   ├── user/           # Profile images, logos, and favicons
│   │   ├── stack/          # Technology logos & mask SVGs
│   │   ├── projects/       # High-res project card background screenshots
│   │   ├── graphics/       # PDF menus, poster banners, company logos
│   │   ├── audio/          # MP3 audio tracks for cassette player
│   │   ├── videos/         # About video, ranking video, social reels & ads
│   │   └── documents/      # Resume PDF (AKR-Resume.pdf)
│   ├── tv.html             # Embedded retro television player
│   └── 4track-recorder/    # Embedded 4-track cassette recorder
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, Google fonts, metadata & theme detector
│   │   ├── page.tsx        # Main single-page application with dynamic code-splitting
│   │   ├── globals.css     # 9,600+ lines of design tokens, animations, and media queries
│   │   ├── not-found.tsx   # Custom 404 error page
│   │   ├── error.tsx       # Client-side error boundary
│   │   ├── sitemap.ts      # Automated sitemap generator
│   │   └── robots.ts       # Automated robots.txt generator
│   ├── components/
│   │   ├── layout/         # Header, GlassNav, Footer, Loader
│   │   ├── sections/       # Hero, About, Projects, Skills, Graphics, Social, Ads, IT, Hobbies, Services, Companies, Shloka
│   │   └── ui/             # SectionTitle, ResumeFAB
│   ├── hooks/              # useTheme, useIntersection, useMediaQuery
│   ├── lib/
│   │   └── data/           # projects.ts, skills.ts, graphics.ts, services.ts
│   └── types/              # TypeScript interfaces
```

---

## 🛠️ Where to Add Your Data

| What you want to add | File location | Code configuration file |
|---|---|---|
| **New Project** | Image in `public/assets/projects/` | `src/lib/data/projects.ts` (Add object to `projects` array) |
| **New Skill Tag** | None (Rendered via CSS tokens) | `src/lib/data/skills.ts` (Add `{ name, color }` to `skills`) |
| **New Menu / Booklet PDF** | File in `public/assets/graphics/menu/` | `src/lib/data/graphics.ts` (Add to `menuPDFs`) |
| **New Poster / Banner Image** | File in `public/assets/graphics/banners/` | `src/lib/data/graphics.ts` (Add to `posterImages`) |
| **New Social Reel / Ad Video** | File in `public/assets/graphics/social/` | `src/lib/data/graphics.ts` (Add to `reelVideos` or `adVideos`) |
| **New Cassette Audio Track** | MP3 in `public/assets/audio/` | `src/lib/data/graphics.ts` (Add to `cassetteAudios`) |
| **Updated Resume** | Replace `public/assets/documents/AKR-Resume.pdf` | Automatically linked by `ResumeFAB.tsx` |

---

## ⚡ Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Run TypeScript & ESLint checks
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Next.js portfolio reconstruction"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Next.js will be detected automatically. Leave default build settings (`npm run build`).
5. Click **Deploy**.
