import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Music, Zap, ArrowRight } from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import { Link } from 'react-router-dom';

const MOCK_CAMPAIGNS = [
  {
    id: '1',
    song_title: 'Beograd Noću',
    artist_name: 'Zera',
    cover_url: 'https://picsum.photos/seed/zera/600/600',
    total_revenue_pool: 12500,
    end_date: '2026-03-15',
    total_submissions: 42,
  },
  {
    id: '2',
    song_title: 'Sve što želim',
    artist_name: 'Voyage',
    cover_url: 'https://picsum.photos/seed/voyage/600/600',
    total_revenue_pool: 8400,
    end_date: '2026-03-10',
    total_submissions: 28,
  },
  {
    id: '3',
    song_title: 'Kao nekad',
    artist_name: 'Nucci',
    cover_url: 'https://picsum.photos/seed/nucci/600/600',
    total_revenue_pool: 15000,
    end_date: '2026-03-20',
    total_submissions: 56,
  },
  {
    id: '4',
    song_title: 'Zlatni Dan',
    artist_name: 'Breskvica',
    cover_url: 'https://picsum.photos/seed/breskvica/600/600',
    total_revenue_pool: 25000,
    end_date: '2026-03-25',
    total_submissions: 89,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-500 ring-1 ring-inset ring-emerald-500/20 uppercase tracking-widest">
                <Zap className="h-3.5 w-3.5 fill-current" />
                Promote to Earn
              </div>
              <h1 className="mt-8 text-6xl font-black leading-[0.9] tracking-tighter lg:text-9xl uppercase">
                Tvoj video, <br />
                <span className="text-emerald-500 italic">Tvoja zarada.</span>
              </h1>
              <p className="mt-8 text-xl text-zinc-400 max-w-2xl leading-relaxed">
                Umetnici žrtvuju 100% svojih digitalnih tantijema za najbolje promotere. 
                Kreiraj TikTok ili Reels, prikupi preglede i uzmi svoj deo kolača.
              </p>
              <div className="mt-12 flex flex-wrap gap-5">
                <Link to="/explore" className="rounded-2xl bg-emerald-600 px-10 py-5 text-lg font-black transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20">
                  Istraži Kampanje
                </Link>
                <Link to="/how-it-works" className="rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-black backdrop-blur-sm transition-all hover:bg-white/10">
                  Kako funkcioniše?
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { label: 'Nagradni Fond', value: '€142,500', icon: TrendingUp },
              { label: 'Aktivnih Promotera', value: '8,420', icon: Users },
              { label: 'Ukupno Pregleda', value: '42.5M+', icon: Music },
              { label: 'Isplaćeno Danas', value: '€1,240', icon: ArrowRight },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8 backdrop-blur-sm"
              >
                <stat.icon className="h-5 w-5 text-emerald-500" />
                <div className="mt-5 text-3xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tighter uppercase">Aktivne Kampanje</h2>
              <p className="text-zinc-500 font-medium">Izaberi pesmu, napravi video i počni da zarađuješ</p>
            </div>
            <Link to="/explore" className="text-sm font-black text-emerald-500 hover:underline uppercase tracking-widest">
              Vidi sve
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_CAMPAIGNS.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
