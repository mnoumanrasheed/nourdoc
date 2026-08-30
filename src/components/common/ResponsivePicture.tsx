import { motion, type HTMLMotionProps } from 'framer-motion'
import { useCallback, useState, type SyntheticEvent } from 'react'
import type { ResponsiveImageAsset } from '../../data/responsiveImages'
import { isResponsiveImageDecoded, markResponsiveImageDecoded } from '../../utils/imagePreload'

type ResponsivePictureProps = Omit<HTMLMotionProps<'img'>, 'height' | 'onLoad' | 'src' | 'srcSet' | 'width'> & {
  asset: ResponsiveImageAsset
  sizes: string
  pictureClassName?: string
  onDecoded?: (image: HTMLImageElement) => void
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void
}

export function ResponsivePicture({
  asset,
  sizes,
  pictureClassName,
  className = '',
  onDecoded,
  onError,
  ...imageProps
}: ResponsivePictureProps) {
  const [decoded, setDecoded] = useState(() => isResponsiveImageDecoded(asset))

  const handleLoad = useCallback(async (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget
    try {
      await image.decode()
    } catch {
      // A completed load is still safe to reveal when decode() is unavailable.
    }
    markResponsiveImageDecoded(asset)
    setDecoded(true)
    onDecoded?.(image)
  }, [asset, onDecoded])

  const handleError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    console.error('ResponsivePicture: Failed to load image', {
      asset,
      src: event.currentTarget.src,
      error: event.type
    })
    onError?.(event)
  }, [asset, onError])

  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={asset.webpSrcSet} sizes={sizes} />
      <motion.img
        {...imageProps}
        className={`optimized-image ${decoded ? 'is-decoded' : ''} ${className}`.trim()}
        src={asset.src}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  )
}
