import React, { lazy, Suspense } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Loader from 'components/Loader'
import { ScrollToTop } from 'components/ScrollTop'

const Header = lazy(() => import('./components/Header'))
const Home = lazy(() => import('./views/Home'))
const ArtGenerator = lazy(() => import('./views/ArtGenerator'))

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<ArtGenerator />} />
          </Routes>
        </ScrollToTop>
      </Suspense>
    </Router>
  )
}

export default App
