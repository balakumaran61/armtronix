import { images, videos } from '../data/assets'

/** Licence credits for every image and video used (CC BY-SA requires attribution). */
export function Credits() {
  return (
    <main id="main" className="wrap">
      <header className="page-head">
        <p className="eyebrow">Credits</p>
        <h1>Photos, video and licences.</h1>
        <p className="mt-4 dim">Board renders and circuit line art are ARMtronix site originals. Photos are from Wikimedia Commons.</p>
      </header>
      <ul className="grid gap-3 text-sm">
        {Object.values(images).map((i) => (
          <li key={i.id}>
            <span className="mono">{i.id}</span> · {i.alt} · {i.credit} · {i.license} · <a href={i.sourcePage} rel="noopener" target="_blank">source ↗</a>
          </li>
        ))}
        {Object.values(videos).map((v) => (
          <li key={v.id}><span className="mono">{v.id}</span> · {v.title} · {v.channel} · YouTube embed</li>
        ))}
      </ul>
    </main>
  )
}
