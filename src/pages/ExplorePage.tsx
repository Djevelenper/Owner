import React, { useState } from 'react';
import { Search, SlidersHorizontal, Zap } from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import { motion } from 'motion/react';

const ALL_CAMPAIGNS = [
  { id: '1', song_title: 'Beograd Noću', artist_name: 'Zera', cover_url: 'https://picsum.photos/seed/zera/600/600', total_revenue_pool: 12500, end_date: '2026-03-15', total_submissions: 42 },
  { id: '2', song_title: 'Sve što želim', artist_name: 'Voyage', cover_url: 'https://picsum.photos/seed/voyage/600/600', total_revenue_pool: 8400, end_date: '2026-03-10', total_submissions: 28 },
  { id: '3', song_title: 'Kao nekad', artist_name: 'Nucci', cover_url: 'https://picsum.photos/seed/nucci/600/600', total_revenue_pool: 15000, end_date: '2026-03-20', total_submissions: 56 },
  { id: '4', song_title: 'Zlatni Dan', artist_name: 'Breskvica', cover_url: 'https://picsum.photos/seed/breskvica/600/600', total_revenue_pool: 25000, end_date: '2026-03-25', total_submissions: 89 },
  { id: '5', song_title: 'Noćna Ptica', artist_name: 'Relja', cover_url: 'https://picsum.photos/seed/relja/600/600', total_revenue_pool: 5000, end_date: '2026-03-12', total_submissions: 15 },
  { id: '6', song_title: 'Samo Ti', artist_name: 'Teodora', cover_url: 'https://picsum.photos/seed/teodora/600/600', total_revenue_pool: 10000, end_date: '2026-03-18', total_submissions: 34 },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = ALL_CAMPAIGNS.filter(c => 
    c.song_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest mb-2">
            <Zap className="h-4 w-4 fill-current" />
            Aktivne Kampanje
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Istraži Katalog</h1>
          <p className="text-zinc-500 font-medium">Pronađi pesmu, napravi video i uzmi svoj deo tantijema</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Pretraži po nazivu pesme ili izvođaču..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 rounded-2xl px-8 py-5 font-black uppercase text-xs tracking-widest hover:bg-zinc-800 transition-all">
            <SlidersHorizontal className="h-5 w-5" />
            Filteri
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-zinc-500 text-lg font-medium">Nismo pronašli nijednu kampanju za vašu pretragu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
