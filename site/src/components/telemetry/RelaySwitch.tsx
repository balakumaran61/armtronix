let ctx: AudioContext | null = null
/** A short relay "click": an opt-in, synthesized 6 ms noise burst (no audio files). */
export function playClick(on: boolean) {
  try {
    ctx ??= new AudioContext()
    const len = Math.floor(ctx.sampleRate * 0.006)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const src = ctx.createBufferSource()
    const gain = ctx.createGain()
    gain.gain.value = on ? 0.35 : 0.22
    src.buffer = buf
    src.connect(gain).connect(ctx.destination)
    src.start()
  } catch { /* audio unavailable */ }
}

interface Props { label: string; on: boolean; held?: boolean; onToggle: () => void }

/** MO-07: a physical toggle (≥ 56 px). Space/Enter flip it (native button). `held` = commanded on but forced off. */
export function RelaySwitch({ label, on, held = false, onToggle }: Props) {
  return (
    <button type="button" role="switch" aria-checked={on} className="relay" data-held={held} onClick={onToggle}
      aria-label={`${label}: ${held ? 'on, held off by e-stop' : on ? 'on' : 'off'}`}>
      <span className="relay__plate" aria-hidden="true">
        <span className="relay__lever" />
      </span>
      <span className="relay__text" aria-hidden="true">
        <span className="relay__name">{label}</span>
        <span className="mono relay__state">{held ? 'HELD' : on ? 'ON' : 'OFF'}</span>
      </span>
    </button>
  )
}
