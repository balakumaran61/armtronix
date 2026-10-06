import { images, type ImageId } from '../../data/assets'

interface Props {
  id: ImageId
  /** Show the credit line under the image (required by the licence when creditRequired and no credits link nearby). */
  caption?: boolean
  /** Above-the-fold images: eager load and high fetch priority (LCP). */
  priority?: boolean
  sizes?: string
  className?: string
  alt?: string
}

/** A licensed image by asset ID (tasks/reference/assets.json). Never an ad-hoc URL. */
export function Img({ id, caption = false, priority = false, sizes = '100vw', className = '', alt }: Props) {
  const a = images[id]
  return (
    <figure className={`img ${className}`.trim()}>
      <img
        src={a.src} width={a.width} height={a.height} alt={alt ?? a.alt} sizes={sizes}
        loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'}
      />
      {caption ? <figcaption>{a.alt} · {a.credit}, {a.license}</figcaption> : null}
    </figure>
  )
}
