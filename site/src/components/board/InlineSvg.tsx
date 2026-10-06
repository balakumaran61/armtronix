import { useMemo } from 'react'
import { lineart, minis, namespace } from './svgs'

/** Renders trusted ARM-14 SVG markup inline so currentColor and the theme variables apply. */
export function InlineSvg({ svg, prefix, className = '', label }: { svg: string; prefix?: string; className?: string; label?: string }) {
  const html = useMemo(() => {
    let s = prefix ? namespace(svg, prefix) : svg
    if (label === '') s = s.replace(/\srole="img"/, ' aria-hidden="true"').replace(/\saria-label="[^"]*"/, '')
    return s
  }, [svg, prefix, label])
  return <span className={`isvg ${className}`.trim()} dangerouslySetInnerHTML={{ __html: html }} />
}

/** A product's mini render (≤ 6 KB, top-down). Decorative unless `label` is given. */
export function MiniRender({ code, className = '', decorative = true }: { code: string; className?: string; decorative?: boolean }) {
  const svg = minis[`mini-${code}`]
  return svg ? <InlineSvg svg={svg} className={`mini ${className}`} label={decorative ? '' : undefined} /> : null
}

/** A line-art piece by file name (stage-board, proto-mqtt, pcb-3-solder-mask, gauge-face…). */
export function LineArt({ name, className = '', decorative = true }: { name: string; className?: string; decorative?: boolean }) {
  const svg = lineart[name]
  return svg ? <InlineSvg svg={svg} className={`art ${className}`} label={decorative ? '' : undefined} /> : null
}
