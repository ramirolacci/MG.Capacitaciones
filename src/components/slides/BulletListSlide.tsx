import { useGSAPStaggerList } from '../../hooks/useGSAPEntrance'
import { useGSAPEntrance } from '../../hooks/useGSAPEntrance'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { HighlightBlock, BadgePill } from '../ui/HighlightBlock'
import type { LessonContent } from '../../data/types'

interface BulletListSlideProps { content: LessonContent }

export function BulletListSlide({ content }: BulletListSlideProps) {
  const headerRef = useGSAPEntrance({ y: 20, duration: 0.5 })
  const listRef = useGSAPStaggerList<HTMLUListElement>('li', { delay: 0.3 })
  const hasItems = !!(content.items && content.items.length > 0)

  if (!hasItems) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div ref={headerRef} className="flex flex-col gap-3 opacity-0">
          {content.badge && <BadgePill label={content.badge} />}
          <h2 className="lesson-title">{content.title}</h2>
          {content.description && (
            <p className="lesson-description">{content.description}</p>
          )}
        </div>

        {(content.imageSuggested || content.image) && (
          <ImagePlaceholder
            alt={content.imageAlt ?? content.title}
            suggested={content.imageSuggested}
            image={content.image}
            aspectRatio="video"
            objectFit="contain"
            className="max-h-[70vh] w-full"
          />
        )}

        <HighlightBlock content={content} />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      <div className="flex-1 flex flex-col gap-5">
        <div ref={headerRef} className="flex flex-col gap-3 opacity-0">
          {content.badge && <BadgePill label={content.badge} />}
          <h2 className="lesson-title">{content.title}</h2>
          {content.description && (
            <p className="lesson-description">{content.description}</p>
          )}
        </div>

        <ul ref={listRef} className="flex flex-col gap-3 mt-2">
          {content.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-4 bg-surface-card border border-surface-border
                         rounded-xl px-5 py-4 opacity-0 hover:border-brand-600/50 transition-colors duration-200"
            >
              {item.icon && (
                <span className="text-2xl flex-shrink-0 w-8 text-center" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="text-fluid-base text-text-primary font-medium">{item.text}</span>
            </li>
          ))}
        </ul>

        <HighlightBlock content={content} />
      </div>

      {(content.imageSuggested || content.image) && (
        <div className="flex-shrink-0 w-full lg:w-[45%] xl:w-[50%] max-w-xl">
          <ImagePlaceholder
            alt={content.imageAlt ?? content.title}
            suggested={content.imageSuggested}
            image={content.image}
            aspectRatio="square"
            objectFit={content.imageFit ?? "cover"}
          />
        </div>
      )}
    </div>
  )
}
