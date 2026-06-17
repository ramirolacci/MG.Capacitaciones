import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

/**
 * Hook that wraps React Router's navigate with a smooth fade-out
 * page exit animation before changing the route.
 */
export function usePageNavigate() {
  const navigate = useNavigate()

  const navigateTo = (to: string) => {
    // Find the top-level page wrapper (PageTransition div)
    const pageEl = document.querySelector('[data-page-root]') as HTMLElement | null

    if (!pageEl) {
      navigate(to)
      return
    }

    gsap.to(pageEl, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => navigate(to),
    })
  }

  return navigateTo
}
