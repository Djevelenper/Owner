import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import ArtistDashboard from './pages/ArtistDashboard';
import InvestorPortfolio from './pages/InvestorPortfolio';
import ExplorePage from './pages/ExplorePage';
import HowItWorks from './pages/HowItWorks';
import ContactPage from './pages/ContactPage';
import { TermsPage, PrivacyPage } from './pages/LegalPages';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-sans text-white selection:bg-emerald-500/30 selection:text-emerald-500">
        <Toaster position="top-center" theme="dark" richColors />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
            <Route path="/dashboard/artist" element={<ArtistDashboard />} />
            <Route path="/portfolio" element={<InvestorPortfolio />} />
          </Routes>
        </main>
        
        <footer className="border-t border-white/5 bg-black py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="text-2xl font-black tracking-tighter text-emerald-500 mb-4">VLASNIK</div>
            <p className="text-sm text-zinc-500">© 2026 VLASNIK Platforma. Sva prava zadržana.</p>
            <div className="mt-6 flex justify-center gap-6 text-xs font-bold text-zinc-400">
              <a href="/terms" className="hover:text-emerald-500">Uslovi korišćenja</a>
              <a href="/privacy" className="hover:text-emerald-500">Privatnost</a>
              <a href="/contact" className="hover:text-emerald-500">Kontakt</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
