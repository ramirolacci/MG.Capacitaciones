import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Entrance animation: fade in + subtle slide up
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [])

  return (
    <div ref={ref} data-page-root style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
