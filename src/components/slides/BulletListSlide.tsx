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

  const stackedMobile = content.mobileStackedImageGrid
  const mobileGrid = content.mobileItemsGrid || stackedMobile
  const hasImage = !!(content.imageSuggested || content.image)

  const imageBlock = hasImage ? (
    <div
      className={`flex-shrink-0 w-full max-w-xl ${
        stackedMobile
          ? 'order-2 lg:order-none lg:w-[45%] xl:w-[50%]'
          : 'lg:w-[45%] xl:w-[50%]'
      }`}
    >
      <ImagePlaceholder
        alt={content.imageAlt ?? content.title}
        suggested={content.imageSuggested}
        image={content.image}
        aspectRatio="square"
        objectFit={content.imageFit ?? 'cover'}
      />
    </div>
  ) : null

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      <div
        className={
          stackedMobile
            ? 'contents lg:flex lg:flex-1 lg:flex-col lg:gap-5'
            : 'flex-1 flex flex-col gap-5'
        }
      >
        <div
          ref={headerRef}
          className={`flex flex-col gap-3 opacity-0 ${stackedMobile ? 'order-1' : ''}`}
        >
          {content.badge && <BadgePill label={content.badge} />}
          <h2 className="lesson-title">{content.title}</h2>
          {content.description && (
            <p className="lesson-description">{content.description}</p>
          )}
        </div>

        <ul
          ref={listRef}
          className={
            mobileGrid
              ? 'order-3 grid grid-cols-2 gap-3 mt-2 lg:order-none lg:flex lg:flex-col lg:gap-3'
              : 'flex flex-col gap-3 mt-2'
          }
        >
          {(content.items ?? []).map((item, i) => (
            <li
              key={i}
              className={`flex bg-surface-card border border-surface-border rounded-xl opacity-0
                         hover:border-brand-600/50 transition-colors duration-200 ${
                           mobileGrid
                             ? 'flex-col items-center justify-center gap-2 px-3 py-4 text-center lg:flex-row lg:items-center lg:gap-4 lg:px-5 lg:py-4 lg:text-left'
                             : 'items-center gap-4 px-5 py-4'
                         }`}
            >
              {item.icon && (
                <span
                  className={`text-2xl flex-shrink-0 text-center ${
                    mobileGrid ? 'w-auto' : 'w-8'
                  }`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span className="text-fluid-base text-text-primary font-medium">{item.text}</span>
            </li>
          ))}
        </ul>

        <div className={stackedMobile ? 'order-4 lg:order-none' : undefined}>
          <HighlightBlock content={content} />
        </div>
      </div>

      {imageBlock}
    </div>
  )
}
