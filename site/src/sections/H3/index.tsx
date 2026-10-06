import { BoardExplorer } from '../../components/board/BoardExplorer'

/** H3 board explorer (ARM-18): the physical proof. Photo · X-ray · Layers with real specs on every part. */
export function H3() {
  return (
    <section className="sec" id="h3" data-section="H3" aria-labelledby="h3-title">
      <div className="wrap">
        <p className="eyebrow">Board explorer</p>
        <h2 id="h3-title">Open the board. Read the engineering.</h2>
        <p className="lede">Photo, X-ray and layers of the real boards, with the real specs on every part.</p>
        <BoardExplorer />
      </div>
    </section>
  )
}
