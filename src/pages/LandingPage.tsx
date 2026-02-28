import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Music, ArrowRight } from 'lucide-react';
import SongCard from '../components/SongCard';
import { Link } from 'react-router-dom';

const MOCK_SONGS = [
  {
    id: '1',
    title: 'Beograd Noću',
    artist_name: 'Zera',
    cover_url: 'https://picsum.photos/seed/zera/400/400',
    target_funding: 50000,
    raised_amount: 32500,
    equity_share: 15,
  },
  {
    id: '2',
    title: 'Sve što želim',
    artist_name: 'Voyage',
    cover_url: 'https://picsum.photos/seed/voyage/400/400',
    target_funding: 65000,
    raised_amount: 12000,
    equity_share: 10,
  },
  {
    id: '3',
    title: 'Kao nekad',
    artist_name: 'Nucci',
    cover_url: 'https://picsum.photos/seed/nucci/400/400',
    target_funding: 45000,
    raised_amount: 28000,
    equity_share: 20,
  },
  {
    id: '4',
    title: 'Zlatni Dan',
    artist_name: 'Breskvica',
    cover_url: 'https://picsum.photos/seed/breskvica/400/400',
    target_funding: 120000,
    raised_amount: 85000,
    equity_share: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-sm font-bold text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                Budućnost muzičke industrije
              </span>
              <h1 className="mt-6 text-6xl font-black leading-tight tracking-tighter lg:text-8xl">
                Postani <span className="text-emerald-500 italic">Vlasnik</span> hitova.
              </h1>
              <p className="mt-6 text-xl text-zinc-400">
                Investiraj u omiljene umetnike i zarađuj od svake sekunde koju svet sluša. 
                Prva platforma na Balkanu za trgovinu muzičkim tantijemama.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/explore" className="rounded-full bg-emerald-600 px-8 py-4 text-lg font-bold transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95">
                  Istraži Pesme
                </Link>
                <Link to="/how-it-works" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all hover:bg-white/10">
                  Kako funkcioniše?
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Ukupno Investirano', value: '€2.4M+', icon: TrendingUp },
              { label: 'Aktivnih Investitora', value: '12,400+', icon: Users },
              { label: 'Objavljenih Pesama', value: '450+', icon: Music },
              { label: 'Isplaćeno Dividendi', value: '€840k+', icon: ArrowRight },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-zinc-900/30 p-6 backdrop-blur-sm"
              >
                <stat.icon className="h-6 w-6 text-emerald-500" />
                <div className="mt-4 text-3xl font-black">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Trenutno u trendu</h2>
              <p className="text-zinc-500">Najpopularnije pesme koje traže finansiranje</p>
            </div>
            <Link to="/explore" className="text-sm font-bold text-emerald-500 hover:underline">
              Vidi sve
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_SONGS.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
