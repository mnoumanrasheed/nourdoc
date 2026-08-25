import type { ResponsiveImageAsset } from '../data/responsiveImages'

const decodedImages = new Set<string>()
const pendingImages = new Map<string, Promise<void>>()

function imageKey(asset: ResponsiveImageAsset) {
  return asset.avifSrcSet
}

export function isResponsiveImageDecoded(asset: ResponsiveImageAsset) {
  return decodedImages.has(imageKey(asset))
}

export function markResponsiveImageDecoded(asset: ResponsiveImageAsset) {
  decodedImages.add(imageKey(asset))
}

export function preloadResponsiveImage(asset: ResponsiveImageAsset, sizes = '100vw') {
  if (typeof document === 'undefined' || isResponsiveImageDecoded(asset)) {
    return Promise.resolve()
  }

  const key = imageKey(asset)
  const pending = pendingImages.get(key)
  if (pending) return pending

  const preload = new Promise<void>((resolve) => {
    const picture = document.createElement('picture')
    const avif = document.createElement('source')
    const webp = document.createElement('source')
    const image = document.createElement('img')

    avif.type = 'image/avif'
    avif.srcset = asset.avifSrcSet
    avif.sizes = sizes
    webp.type = 'image/webp'
    webp.srcset = asset.webpSrcSet
    webp.sizes = sizes

    image.src = asset.src
    image.sizes = sizes
    image.width = asset.width
    image.height = asset.height
    image.alt = ''
    image.loading = 'eager'
    image.decoding = 'async'
    image.fetchPriority = 'high'

    picture.setAttribute('aria-hidden', 'true')
    picture.style.cssText = 'position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden'

    const finish = () => {
      picture.remove()
      pendingImages.delete(key)
      resolve()
    }

    image.addEventListener('load', async () => {
      try {
        await image.decode()
        markResponsiveImageDecoded(asset)
      } catch {
        // The route image will perform its normal decode-safe reveal if needed.
      } finally {
        finish()
      }
    }, { once: true })
    image.addEventListener('error', finish, { once: true })

    picture.append(avif, webp, image)
    document.body.append(picture)
  })

  pendingImages.set(key, preload)
  return preload
}
