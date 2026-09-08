import { useEffect, useState } from 'react'
import { subscribeToMediaQuery } from '../utils/browserCompatibility'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    return subscribeToMediaQuery(media, update)
  }, [query])

  return matches
}
