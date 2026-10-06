/** Catalogue facets and matching shared by H6 (parts drawer) and /products (SPEC §9). */
import { products, type Product } from '../data/products'

export const IFACES = ['Wi-Fi', 'Bluetooth', 'LoRa', 'RS485 / Modbus', 'CAN', 'Ethernet', 'Raspberry Pi', 'USB'] as const
export const POWERS = ['24 V DC', '5 V DC', '100–240 V AC'] as const
export const MOUNTS = ['DIN rail', 'Screw mount', 'Wall mount', 'Other'] as const
export const IOS = ['DI', 'DO', 'AI'] as const
export const LINES = ['IA', 'BA'] as const

export const hasIface = (p: Product, f: string) =>
  f === 'RS485 / Modbus' ? p.interfaces.some((i) => i === 'RS485' || i.startsWith('Modbus')) : p.interfaces.includes(f)
export const powerOf = (p: Product): (typeof POWERS)[number] =>
  p.power.startsWith('5 V') ? '5 V DC' : p.power.includes('24 V DC') ? '24 V DC' : '100–240 V AC'
export const hasPower = (p: Product, f: string) => powerOf(p) === f || (f === '100–240 V AC' && /V AC/.test(p.power))
export const mountOf = (p: Product): (typeof MOUNTS)[number] =>
  p.mounting.startsWith('DIN') ? 'DIN rail' : p.mounting.includes('Wall') ? 'Wall mount' : /screw mount/i.test(p.mounting) ? 'Screw mount' : 'Other'
export const hasIo = (p: Product, f: string) => (f === 'DI' ? p.io.di : f === 'DO' ? p.io.do : p.io.ai) > 0
export const ioText = (p: Product) =>
  [p.io.di && `${p.io.di} DI`, p.io.do && `${p.io.do} DO`, p.io.ai && `${p.io.ai} AI${p.io.aiType ? ` (${p.io.aiType})` : ''}`].filter(Boolean).join(' · ') || '—'
export const ioCount = (p: Product) => p.io.di + p.io.do + p.io.ai

export interface Filters { line: string[]; iface: string[]; power: string[]; mount: string[]; io: string[] }
export const NO_FILTERS: Filters = { line: [], iface: [], power: [], mount: [], io: [] }
const any = (sel: string[], test: (f: string) => boolean) => !sel.length || sel.some(test)

/** OR within a facet, AND across facets. */
export const matches = (p: Product, f: Filters) =>
  any(f.line, (x) => p.line === x) && any(f.iface, (x) => hasIface(p, x)) && any(f.power, (x) => hasPower(p, x)) &&
  any(f.mount, (x) => mountOf(p) === x) && any(f.io, (x) => hasIo(p, x))

export const filterProducts = (f: Filters) => products.filter((p) => matches(p, f))

/** Three key specs for a bin or row: power, the lead interface, mounting. */
export const keyChips = (p: Product) => [powerOf(p), p.interfaces.find((i) => i !== 'USB') ?? p.interfaces[0], mountOf(p) === 'Other' ? p.mounting.split(/[,(]/)[0].trim() : mountOf(p)]
