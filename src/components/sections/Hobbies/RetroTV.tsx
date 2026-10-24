'use client'

import React, { useEffect, useRef } from 'react'

export default function RetroTV() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let lastAction = ''

    const sendTvAction = (action: string) => {
      if (!iframe.contentWindow || action === lastAction) return
      lastAction = action
      iframe.contentWindow.postMessage(
        {
          type: 'portfolio-tv-media',
          action: action,
        },
        '*'
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            sendTvAction('resume')
          } else {
            sendTvAction('pause')
          }
        })
      },
      { threshold: [0, 0.2, 0.5] }
    )

    observer.observe(iframe)

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'portfolio-pause-tv') {
        sendTvAction('pause')
      }
    }
    window.addEventListener('message', handleMessage)

    return () => {
      observer.disconnect()
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className="hobbies-tv-wrap">
      <iframe
        ref={iframeRef}
        className="tv-frame"
        src="/tv.html"
        title="Interactive retro TV video player"
        loading="lazy"
        scrolling="no"
      ></iframe>
    </div>
  )
}
