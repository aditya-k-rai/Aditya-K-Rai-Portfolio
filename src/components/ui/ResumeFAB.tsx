'use client'

import React, { useState } from 'react'

export default function ResumeFAB() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (downloading) return
    setDownloading(true)

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '/assets/documents/AKR-Resume.pdf'
      link.download = 'Aditya Kumar Rai Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => setDownloading(false), 2000)
    }, 800)
  }

  return (
    <a
      className={`resume-download-fab ${downloading ? 'is-downloading' : ''}`}
      id="resumeDownloadFab"
      href="/assets/documents/AKR-Resume.pdf"
      download="Aditya Kumar Rai Resume.pdf"
      aria-label="Download Aditya Kumar Rai Resume"
      onClick={handleDownload}
    >
      <span className="resume-fab-glow" aria-hidden="true"></span>
      <span className="resume-fab-icon" aria-hidden="true">
        <i className="fa-solid fa-arrow-down"></i>
        <i className="fa-solid fa-file-lines"></i>
      </span>
      <span className="resume-fab-progress" aria-hidden="true"></span>
    </a>
  )
}
