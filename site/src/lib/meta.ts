import { useEffect } from 'react'

const DEFAULT_TITLE = 'ARMtronix · Make Every Machine Talk'
const DEFAULT_DESC = 'ARMtronix designs and builds Industrial IoT hardware in Hubballi, India: DIN-rail controllers, I/O boards and gateways that make every machine talk.'

/** Sets the document title and meta description for a page; restores the defaults on leave. */
export function useMeta(title?: string, description?: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    document.title = title ? `${title} · ARMtronix` : DEFAULT_TITLE
    meta?.setAttribute('content', description ?? DEFAULT_DESC)
    return () => { document.title = DEFAULT_TITLE; meta?.setAttribute('content', DEFAULT_DESC) }
  }, [title, description])
}
