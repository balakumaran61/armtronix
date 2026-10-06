/**
 * ARM-14 SVGs from docs/design. Hero lens renders load lazily (code-split); minis and line art are tiny and eager.
 * Inline SVGs share ids (gradients, hotspots), so every inlined copy is namespaced with a prefix.
 */
const lensFiles = import.meta.glob('../../../../docs/design/renders/*-{photo,xray,layers}.svg', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>
const miniFiles = import.meta.glob('../../../../docs/design/renders/mini-*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const artFiles = import.meta.glob('../../../../docs/design/lineart/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export const HERO_CODES = ['IA015', 'IA013', 'BA011', 'IA003'] as const
export type HeroCode = (typeof HERO_CODES)[number]
export type Lens = 'photo' | 'xray' | 'layers'
export const LENSES: { id: Lens; label: string }[] = [{ id: 'photo', label: 'Photo' }, { id: 'xray', label: 'X-ray' }, { id: 'layers', label: 'Layers' }]
export const isHero = (c: string): c is HeroCode => (HERO_CODES as readonly string[]).includes(c)

const base = (p: string) => p.slice(p.lastIndexOf('/') + 1, -4)
const byName = (files: Record<string, string>) => Object.fromEntries(Object.entries(files).map(([k, v]) => [base(k), v]))
export const minis = byName(miniFiles)
export const lineart = byName(artFiles)

const cache = new Map<string, Promise<string>>()
export function loadLens(code: HeroCode, lens: Lens): Promise<string> {
  const key = `${code}-${lens}`
  if (!cache.has(key)) {
    const entry = Object.entries(lensFiles).find(([k]) => base(k) === key)
    cache.set(key, entry ? entry[1]() : Promise.reject(new Error(`no render ${key}`)))
  }
  return cache.get(key)!
}

/** Prefixes every id and its references so several inline copies can live on one page. */
export function namespace(svg: string, prefix: string): string {
  return svg
    .replace(/\sid="([^"]+)"/g, ` id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
}

export interface Anchor { id: string; x: number; y: number } // x, y in 0–1 of the viewBox
/** Hotspot anchors (<g id="hs-…" transform="translate(x y)">) as fractions of the viewBox. */
export function anchors(svg: string): Anchor[] {
  const vb = /viewBox="([\d.\s-]+)"/.exec(svg)?.[1].split(/\s+/).map(Number) ?? [0, 0, 1, 1]
  return [...svg.matchAll(/id="hs-([^"]+)"\s+transform="translate\(([\d.]+)[ ,]+([\d.]+)\)"/g)].map((m) => ({
    id: m[1], x: (Number(m[2]) - vb[0]) / vb[2], y: (Number(m[3]) - vb[1]) / vb[3],
  }))
}
export const viewBoxRatio = (svg: string) => {
  const vb = /viewBox="([\d.\s-]+)"/.exec(svg)?.[1].split(/\s+/).map(Number)
  return vb ? `${vb[2]} / ${vb[3]}` : '16 / 9'
}
