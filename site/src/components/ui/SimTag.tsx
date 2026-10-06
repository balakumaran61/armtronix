/** Required on every telemetry value (SPEC §7, BR-04). `example` labels MQTT lines as "Example format". */
export function SimTag({ variant = 'simulated' }: { variant?: 'simulated' | 'example' }) {
  return variant === 'example'
    ? <span className="sim sim--example">Example format</span>
    : <span className="sim">Simulated</span>
}
