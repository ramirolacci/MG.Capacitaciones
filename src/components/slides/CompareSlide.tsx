import { useGSAPEntrance } from '../../hooks/useGSAPEntrance'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { HighlightBlock } from '../ui/HighlightBlock'
import type { LessonContent } from '../../data/types'

interface CompareSlideProps { content: LessonContent }

export function CompareSlide({ content }: CompareSlideProps) {
  const ref = useGSAPEntrance({ y: 24, duration: 0.6 })
  const hasColumns = !!(content.compareColumns && content.compareColumns.length > 0)

  return (
    <div ref={ref} className="flex flex-col gap-6 w-full opacity-0">
      <div className="flex flex-col gap-2">
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
          aspectRatio="wide"
          objectFit="contain"
          className={hasColumns ? "max-h-96 md:max-h-[480px] lg:max-h-[550px]" : "max-h-[70vh] w-full"}
        />
      )}

      {hasColumns && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.compareColumns!.map((col, i) => {
            const isCorrect = col.variant === 'correct'
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 p-5 flex flex-col gap-3 ${
                  isCorrect
                    ? 'bg-brand-600/10 border-brand-600/50'
                    : 'bg-red-500/10 border-red-500/50'
                }`}
              >
                <h3 className={`font-bold text-fluid-lg ${isCorrect ? 'text-brand-400' : 'text-red-400'}`}>
                  {col.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-fluid-base text-text-secondary">
                      <span className="mt-0.5 flex-shrink-0">{isCorrect ? '✅' : '❌'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      <HighlightBlock content={content} />
    </div>
  )
}
