import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { H0 } from '../sections/H0'
import { H1 } from '../sections/H1'
import { H2 } from '../sections/H2'
import { H3 } from '../sections/H3'
import { H4 } from '../sections/H4'
import { H5 } from '../sections/H5'
import { H6 } from '../sections/H6'
import { H7 } from '../sections/H7'
import { H8 } from '../sections/H8'
import { H9 } from '../sections/H9'

/** The signal-path story, H0 to H9. H10 is the global Footer. Each section folder is owned by its build task. */
export function Home() {
  // Mount the hero first, the rest a frame later: splits the first long task (TBT). A #hash link mounts all at once.
  const { hash } = useLocation()
  const [rest, setRest] = useState(!!hash)
  useEffect(() => {
    if (rest) return
    const id = setTimeout(() => setRest(true), 0)
    return () => clearTimeout(id)
  }, [rest])
  return (
    <>
      <H0 />
      <main id="main">
        <H1 />
        {rest ? (
          <>
            <H2 />
            <H3 />
            <H4 />
            <H5 />
            <H6 />
            <H7 />
            <H8 />
            <H9 />
          </>
        ) : null}
      </main>
    </>
  )
}
