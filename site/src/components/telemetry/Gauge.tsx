import { SimTag } from '../ui/SimTag'

interface Props { mA: number; level: number; label: string; fault?: boolean }

const A0 = -135, A1 = 135 // needle sweep, degrees
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180
  return [60 + r * Math.cos(a), 60 + r * Math.sin(a)]
}
const arc = (from: number, to: number, r: number) => {
  const [x0, y0] = polar(from, r), [x1, y1] = polar(to, r)
  return `M${x0} ${y0}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x1} ${y1}`
}

/** Analog 4–20 mA gauge (MO-08): the needle springs to the value; numeric readout always shown. */
export function Gauge({ mA, level, label, fault = false }: Props) {
  const deg = A0 + (Math.min(100, Math.max(0, level)) / 100) * (A1 - A0)
  const ticks = Array.from({ length: 9 }, (_, i) => A0 + (i * (A1 - A0)) / 8)
  return (
    <div className="gauge" role="meter" aria-valuemin={4} aria-valuemax={20} aria-valuenow={mA}
      aria-label={label} aria-valuetext={fault ? `${label}: open loop, ${mA.toFixed(1)} milliamps, simulated` : `${label}: ${mA.toFixed(1)} milliamps, ${Math.round(level)} per cent, simulated`}>
      <svg viewBox="0 0 120 112" aria-hidden="true">
        <path d={arc(A0, A1, 50)} className="gauge__track" />
        <path d={arc(A0, deg, 50)} className="gauge__fill" data-fault={fault} />
        {ticks.map((t, i) => { const [x0, y0] = polar(t, 42), [x1, y1] = polar(t, 47); return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} className="gauge__tick" /> })}
        <g className="gauge__needle" style={{ transform: `rotate(${deg}deg)` }}>
          <line x1="60" y1="60" x2="60" y2="18" />
        </g>
        <circle cx="60" cy="60" r="5" className="gauge__hub" />
        <text x="22" y="110" className="gauge__scale">4 mA</text>
        <text x="98" y="110" textAnchor="end" className="gauge__scale">20 mA</text>
      </svg>
      <p className="gauge__read mono"><b>{mA.toFixed(1)} mA</b> = {Math.round(level)} % <SimTag /></p>
    </div>
  )
}
