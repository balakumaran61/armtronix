import { useState } from 'react'
import { videos, type VideoId } from '../../data/assets'

/** Click-to-load YouTube (nocookie). Nothing is fetched from YouTube except the poster until the click. */
export function VideoEmbed({ id, className = '' }: { id: VideoId; className?: string }) {
  const v = videos[id]
  const [on, setOn] = useState(false)
  return (
    <div className={`video ${className}`.trim()}>
      {on ? (
        <iframe
          src={`${v.embed}?autoplay=1&rel=0`} title={v.title} loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setOn(true)}>
          <img src={v.poster} alt="" loading="lazy" decoding="async" />
          <span className="video__play" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
          <span className="video__meta"><span className="sr-only">Play video: </span>{v.title} · {v.channel} · loads from YouTube</span>
        </button>
      )}
    </div>
  )
}
