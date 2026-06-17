import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAPStaggerList } from '../../hooks/useGSAPEntrance'
import type { LessonContent } from '../../data/types'

interface QuoteSlideProps { content: LessonContent }

export function QuoteSlide({ content }: QuoteSlideProps) {
  const quoteRef = useRef<HTMLDivElement>(null)
  const listRef = useGSAPStaggerList<HTMLUListElement>('li', { delay: 0.6 })
  const mobileGrid = content.mobileItemsGrid

  useEffect(() => {
    if (!quoteRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
    }, quoteRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Quote block */}
      <div
        ref={quoteRef}
        className="opacity-0 relative bg-gradient-brand rounded-2xl p-8 md:p-10 text-center shadow-glow"
      >
        <span className="absolute top-4 left-6 text-5xl text-white/20 font-serif leading-none" aria-hidden="true">
          "
        </span>
        <h2 className="lesson-title text-white mb-2">{content.title}</h2>
        {content.quote && (
          <blockquote className="text-fluid-2xl font-semibold text-white/90 leading-relaxed mt-4 italic">
            {content.quote}
          </blockquote>
        )}
        <span className="absolute bottom-4 right-6 text-5xl text-white/20 font-serif leading-none rotate-180" aria-hidden="true">
          "
        </span>
      </div>

      {/* Subtitle */}
      {content.description && (
        <p className="text-fluid-lg font-semibold text-brand-400 text-center">{content.description}</p>
      )}

      {/* Items */}
      {content.items && (
        <ul
          ref={listRef}
          className={
            mobileGrid
              ? 'grid grid-cols-2 gap-3 lg:grid-cols-2'
              : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
          }
        >
          {content.items.map((item, i) => (
            <li
              key={i}
              className={`bg-surface-card border border-surface-border rounded-xl opacity-0 ${
                mobileGrid
                  ? 'flex flex-col items-center justify-center gap-2 px-3 py-4 text-center lg:flex-row lg:items-center lg:gap-4 lg:px-5 lg:py-4 lg:text-left'
                  : 'flex items-center gap-4 px-5 py-4'
              }`}
            >
              {item.icon && <span className="text-2xl" aria-hidden="true">{item.icon}</span>}
              <span className="text-fluid-base text-text-primary font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
