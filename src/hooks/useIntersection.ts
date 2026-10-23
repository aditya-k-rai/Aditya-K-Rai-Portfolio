'use client'
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  once?: boolean
}

export function useIntersection<T extends Element>(
  options: UseIntersectionOptions = {}
) {
  const { once = true, threshold = 0.15, rootMargin = '0px', ...rest } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin, ...rest }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin]) // eslint-disable-line

  return { ref, isVisible }
}
