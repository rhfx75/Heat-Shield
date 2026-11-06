import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { HeroWordmark } from './hero/HeroWordmark'
import { HeroOrbits } from './hero/HeroOrbits'
import { HeroEmbers } from './hero/HeroEmbers'
import './hero/hero.css'

const HERO_VIDEOS = ['/media/hero-fire.mp4', '/media/hero-foundry.mp4']
const HERO_RATE = 0.35

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoIndex, setVideoIndex] = useState(0)
  const scrollNext = () => {
    const next = document.getElementById('hero-next')
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const setRate = () => { v.playbackRate = HERO_RATE }
    const next = () => setVideoIndex((i) => (i + 1) % HERO_VIDEOS.length)
    setRate()
    v.addEventListener('loadedmetadata', setRate)
    v.addEventListener('play', setRate)
    v.addEventListener('ended', next)
    v.play().catch(() => {})
    return () => {
      v.removeEventListener('loadedmetadata', setRate)
      v.removeEventListener('play', setRate)
      v.removeEventListener('ended', next)
    }
  }, [videoIndex])

  return (
    <section className="hse-hh" aria-label="Heat Shield Engineering">
      <video key={HERO_VIDEOS[videoIndex]} ref={videoRef} className="hse-hh__video" src={HERO_VIDEOS[videoIndex]} autoPlay muted playsInline preload="metadata" aria-hidden="true" />
      <div className="hse-hh__video-tint" aria-hidden="true" />
      <div className="hse-hh__vignette" aria-hidden="true" />
      <div className="hse-hh__grid" aria-hidden="true" />
      <HeroEmbers />
      <HeroOrbits />
      <div className="hse-hh__center">
        <h1 className="hse-hh__sr">Heat Shield Engineering</h1>
        <HeroWordmark />
      </div>
      <button type="button" className="hse-hh__cue" aria-label="Scroll to the next section" onClick={scrollNext}>
        <ChevronDown aria-hidden="true" />
      </button>
    </section>
  )
}
