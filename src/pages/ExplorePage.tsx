import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import SongCard from '../components/SongCard';
import { motion } from 'motion/react';

const ALL_SONGS = [
  { id: '1', title: 'Beograd Noću', artist_name: 'Zera', cover_url: 'https://picsum.photos/seed/zera/400/400', target_funding: 50000, raised_amount: 32500, equity_share: 15 },
  { id: '2', title: 'Sve što želim', artist_name: 'Voyage', cover_url: 'https://picsum.photos/seed/voyage/400/400', target_funding: 75000, raised_amount: 12000, equity_share: 10 },
  { id: '3', title: 'Kao nekad', artist_name: 'Nucci', cover_url: 'https://picsum.photos/seed/nucci/400/400', target_funding: 30000, raised_amount: 28000, equity_share: 20 },
  { id: '4', title: 'Zlatni Dan', artist_name: 'Breskvica', cover_url: 'https://picsum.photos/seed/breskvica/400/400', target_funding: 100000, raised_amount: 85000, equity_share: 5 },
  { id: '5', title: 'Noćna Ptica', artist_name: 'Relja', cover_url: 'https://picsum.photos/seed/relja/400/400', target_funding: 40000, raised_amount: 5000, equity_share: 12 },
  { id: '6', title: 'Samo Ti', artist_name: 'Teodora', cover_url: 'https://picsum.photos/seed/teodora/400/400', target_funding: 60000, raised_amount: 45000, equity_share: 8 },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = ALL_SONGS.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">Istraži Katalog</h1>
          <p className="text-zinc-500">Pronađi sledeći veliki hit i postani njegov suvlasnik</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Pretraži po nazivu pesme ili izvođaču..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-2xl px-6 py-4 font-bold hover:bg-zinc-800 transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
            Filteri
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <p className="text-zinc-500 text-lg">Nismo pronašli nijednu pesmu za vašu pretragu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
