import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { MotionRoot } from './components/layout/MotionRoot'
import { Nav } from './components/layout/Nav'
import { SignalTrace } from './components/layout/SignalTrace'
import { Footer } from './components/layout/Footer'
import { MobileBar } from './components/layout/MobileBar'
import { RfqOverlay } from './components/rfq/RfqOverlay'

// Secondary routes are code-split so the home page ships less JS (SPEC §12: JS ≤ 250 KB gzip, LCP < 2.5 s)
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })))
const Rfq = lazy(() => import('./pages/Rfq').then((m) => ({ default: m.Rfq })))
const Credits = lazy(() => import('./pages/Credits').then((m) => ({ default: m.Credits })))
const Loading = () => <main id="main" className="wrap" aria-busy="true" style={{ minHeight: "100vh" }}><p className="page-head mono dim">Loading…</p></main>

export function App() {
  return (
    <MotionRoot>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <SignalTrace />
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:code" element={<ProductDetail />} />
        <Route path="/rfq" element={<Rfq />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
      <MobileBar />
      <RfqOverlay />
    </MotionRoot>
  )
}
