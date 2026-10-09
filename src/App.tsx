import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { Methodology } from './pages/Methodology';
import { Architecture } from './pages/Architecture';
import { Results } from './pages/Results';
import { Team } from './pages/Team';
import { Documents } from './pages/Documents';
import { PanelComments } from './pages/PanelComments';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen w-full flex-col bg-white font-sans text-ink">
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/results" element={<Results />} />
            <Route path="/team" element={<Team />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/panel-comments" element={<PanelComments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>);

}