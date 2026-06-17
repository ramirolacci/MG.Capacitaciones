import { useGSAPEntrance } from '../../hooks/useGSAPEntrance'
import { useGSAPStaggerList } from '../../hooks/useGSAPEntrance'
import { HighlightBlock } from '../ui/HighlightBlock'
import { BadgePill } from '../ui/HighlightBlock'
import type { LessonContent } from '../../data/types'

interface AlertSlideProps { content: LessonContent }

export function AlertSlide({ content }: AlertSlideProps) {
  const headerRef = useGSAPEntrance({ y: 20, duration: 0.5 })
  const listRef = useGSAPStaggerList<HTMLUListElement>('li', { delay: 0.3 })
  const mobileGrid = content.mobileItemsGrid

  const isWarning = content.highlightVariant === 'warning' || content.highlightVariant === 'danger'

  return (
    <div className="flex flex-col gap-6 w-full">
      <div ref={headerRef} className="flex flex-col gap-3 opacity-0">
        {content.badge && <BadgePill label={content.badge} />}

        {/* Alert header strip */}
        <div className={`flex items-center gap-3 rounded-xl px-5 py-4 border ${
          isWarning
            ? 'bg-amber-500/10 border-amber-500/40'
            : 'bg-blue-500/10 border-blue-500/40'
        }`}>
          <span className="text-3xl" aria-hidden="true">{isWarning ? '⚠️' : 'ℹ️'}</span>
          <h2 className={`text-fluid-2xl font-bold ${isWarning ? 'text-amber-300' : 'text-blue-300'}`}>
            {content.title}
          </h2>
        </div>

        {content.description && (
          <p className="lesson-description">{content.description}</p>
        )}
      </div>

      {content.items && (
        <ul
          ref={listRef}
          className={
            mobileGrid
              ? 'grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-3'
              : 'flex flex-col gap-3'
          }
        >
          {content.items.map((item, i) => (
            <li
              key={i}
              className={`flex bg-surface-card border border-surface-border rounded-xl opacity-0 ${
                mobileGrid
                  ? 'flex-col items-center justify-center gap-2 px-3 py-4 text-center lg:flex-row lg:items-center lg:gap-4 lg:px-5 lg:py-4 lg:text-left'
                  : 'items-center gap-4 px-5 py-4'
              }`}
            >
              {item.icon && (
                <span
                  className={`text-2xl flex-shrink-0 text-center ${mobileGrid ? 'w-auto' : 'w-8'}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span className="text-fluid-base text-text-primary font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      )}

      <HighlightBlock content={content} />
    </div>
  )
}
