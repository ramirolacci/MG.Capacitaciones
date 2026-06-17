import { useState } from 'react'
import { getAssetUrl } from '../../utils/assets'

interface ImagePlaceholderProps {
  alt: string
  suggested?: string
  image?: string
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide'
  objectFit?: 'cover' | 'contain'
}

export function ImagePlaceholder({
  alt,
  suggested,
  image,
  className = '',
  aspectRatio = 'video',
  objectFit = 'cover',
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false)

  const ratioClass =
    aspectRatio === 'square' ? 'aspect-square'
    : aspectRatio === 'wide' ? 'aspect-[21/9]'
    : 'aspect-video'

  if (image && !hasError) {
    const isContain = objectFit === 'contain'
    const containerRatioClass = isContain ? 'h-auto w-fit max-w-full mx-auto' : `w-full ${ratioClass}`
    return (
      <div
        className={`${containerRatioClass} rounded-xl overflow-hidden border border-surface-border bg-surface-elevated flex items-center justify-center relative ${className}`}
      >
        <img
          src={getAssetUrl(image)}
          alt={alt}
          className={
            isContain
              ? 'max-w-full h-auto max-h-[inherit] object-contain select-none pointer-events-none'
              : 'w-full h-full object-cover select-none pointer-events-none'
          }
          onError={() => setHasError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={`${ratioClass} w-full rounded-xl overflow-hidden bg-surface-elevated border border-surface-border flex flex-col items-center justify-center gap-3 ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="text-4xl opacity-30">📷</div>
      <div className="text-center px-4">
        <p className="text-text-muted text-xs font-medium uppercase tracking-wider mb-1">
          Imagen sugerida
        </p>
        {suggested && (
          <p className="text-text-secondary text-sm text-center">{suggested}</p>
        )}
      </div>
    </div>
  )
}
