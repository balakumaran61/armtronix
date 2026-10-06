import { useEffect, useRef, useState } from 'react'
import { Img } from '../../components/ui/Img'
import { Ticker } from '../../components/ui/Ticker'
import { Button } from '../../components/ui/Button'
import { VideoEmbed } from '../../components/ui/VideoEmbed'

/** H8 proof wall (ARM-19): every number shows its source and date (FACTS.md §3). No certifications are claimed. */
export function H8() {
  const seg = useRef<HTMLDivElement>(null)
  const [orders, setOrders] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOrders(504); io.disconnect() } })
    io.observe(seg.current!)
    return () => io.disconnect()
  }, [])

  return (
    <section className="sec" id="h8" data-section="H8" aria-labelledby="h8-title">
      <div className="wrap">
        <p className="eyebrow">The test bench</p>
        <h2 id="h8-title">Built in the open since 2015.</h2>
        <p className="lede">Public repos, public docs and third-party reviews.</p>

        <div className="bench">
          <div className="bench__cell bench__repos">
            <p className="bench__big mono">32</p>
            <p>public repos on GitHub</p>
            <div className="repo-grid" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <span key={i} data-star={i === 0} />)}</div>
            <p className="src">Most-starred: arduino-LoRa-STM32, 52 ★ · GitHub, 5 Oct 2026</p>
          </div>
          <div className="bench__cell bench__tindie" ref={seg}>
            <p className="seven mono" aria-label="504 Tindie orders"><Ticker value={orders} digits={0} /></p>
            <p>Tindie orders since Jun 2015</p>
            <p className="src">Tindie store page, as read early Oct 2026</p>
          </div>
          <div className="bench__cell bench__badge">
            <span className="badge mono">TASMOTA</span>
            <p>Tasmota device docs list the Armtronix dimmers.</p>
            <p className="src"><a href="https://tasmota.github.io/docs/devices/Armtronix-Dimmers/" rel="noopener" target="_blank">tasmota.github.io ↗</a> · 5 Oct 2026</p>
          </div>
          <div className="bench__cell bench__press">
            <p className="eyebrow">Press</p>
            <p>CNX Software, Jun 2016: the AC quad-relay board.</p>
            <p className="src"><a href="https://www.cnx-software.com/2016/06/23/armtronix-ac-powered-wifi-quad-relay-board-is-powered-by-esp8266-soc-crowdfunding/" rel="noopener" target="_blank">cnx-software.com ↗</a></p>
          </div>
          <div className="bench__cell bench__video">
            <VideoEmbed id="VID-01" />
            <p className="src">A third-party review of the ESP8266 dimmer and relay. Not ARMtronix's own video.</p>
          </div>
          <div className="bench__cell bench__heritage">
            <Img id="IMG-03" caption sizes="(min-width: 1024px) 400px, 100vw" />
            <p className="mt-2">Talks to the PLCs that run your robots.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="https://github.com/armtronix" target="_blank" rel="noopener" variant="primary">Browse the repos ↗</Button>
          <span className="text-xs dim">No certifications are claimed.</span>
        </div>
      </div>
    </section>
  )
}
