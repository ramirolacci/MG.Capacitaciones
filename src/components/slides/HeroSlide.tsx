import { useGSAPEntrance } from '../../hooks/useGSAPEntrance'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import { BadgePill } from '../ui/HighlightBlock'
import type { LessonContent } from '../../data/types'

interface HeroSlideProps { content: LessonContent }

export function HeroSlide({ content }: HeroSlideProps) {
  const ref = useGSAPEntrance({ y: 32, duration: 0.7 })
  return (
    <div ref={ref} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full opacity-0">
      {/* Text side */}
      <div className="flex-1 flex flex-col gap-5">
        {content.tagline && (
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
            {content.tagline}
          </p>
        )}
        {content.badge && <BadgePill label={content.badge} />}
        <h1 className="text-fluid-5xl font-extrabold text-text-primary leading-tight text-balance">
          {content.title}
        </h1>
        {content.subtitle && (
          <p className="text-fluid-xl font-semibold text-brand-400">{content.subtitle}</p>
        )}
        {content.description && (
          <p className="lesson-description max-w-xl">{content.description}</p>
        )}
      </div>
      {/* Image side */}
      <div className="flex-1 w-full max-w-2xl">
        <ImagePlaceholder
          alt={content.imageAlt ?? content.title}
          suggested={content.imageSuggested}
          image={content.image}
          aspectRatio="video"
          objectFit={content.imageFit ?? "cover"}
        />
      </div>
    </div>
  )
}
