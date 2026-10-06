import { useState } from 'react'
import type { Power } from '../../lib/telemetry'
import { SimTag } from '../ui/SimTag'

/** Power monitor (BA015/BA019 style): V, W, kWh and a 40-tick W sparkline. */
export function PowerMeter({ power, t }: { power: Power; t: number }) {
  const [hist, setHist] = useState<{ t: number; w: number[] }>({ t, w: [power.w] })
  if (hist.t !== t) setHist({ t, w: [...hist.w, power.w].slice(-40) }) // one sample per tick (render-time update)
  const max = Math.max(...hist.w, 200), min = 0
  const pts = hist.w.map((w, i) => `${(i / 39) * 200},${40 - ((w - min) / (max - min)) * 36}`).join(' ')
  return (
    <div className="power">
      <dl className="power__vals mono">
        <div><dt>V</dt><dd>{power.v.toFixed(1)}</dd></div>
        <div><dt>W</dt><dd>{power.w.toLocaleString('en-IN')}</dd></div>
        <div><dt>kWh</dt><dd>{power.kwh.toFixed(3)}</dd></div>
      </dl>
      <svg viewBox="0 0 200 42" className="power__spark" role="img" aria-label={`Power over the last ${hist.w.length} seconds, now ${power.w} watts, simulated`} preserveAspectRatio="none">
        <polyline points={pts} />
      </svg>
      <SimTag />
    </div>
  )
}
