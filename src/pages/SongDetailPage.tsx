import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Info, ShieldCheck, TrendingUp, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';
import { useContract } from '../hooks/useContract';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export default function SongDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { simulateTransaction, isPending } = useContract();
  const [isPlaying, setIsPlaying] = useState(false);
  const [investAmount, setInvestAmount] = useState<number>(100);
  
  const [activeTab, setActiveTab] = useState<'project' | 'plan' | 'artist'>('project');
  
  // Mock data for the specific song
  const song = {
    id,
    title: 'Beograd Noću',
    artist: {
      name: 'Zera',
      bio: 'Zera je jedna od najpopularnijih mladih umetnica na Balkanu, poznata po svojim hitovima koji broje milione pregleda.',
      avatar: 'https://picsum.photos/seed/zera/200/200'
    },
    description: 'Ova pesma predstavlja novi zvuk moderne pop-folk scene. Sredstva će biti korišćena za visokobudžetni muzički spot i marketing kampanju širom Evrope.',
    cover_url: 'https://picsum.photos/seed/zera/800/800',
    target_funding: 50000,
    raised_amount: 32500,
    equity_share: 15,
    min_investment: 10,
    financial_plan: [
      { item: 'Tekst pesme', cost: 2000, desc: 'Angažovanje vrhunskog tekstopisca (raspon 1000-3000€).' },
      { item: 'Kompozicija (Muzika)', cost: 4500, desc: 'Originalna melodija i autorska prava (raspon 3000-6000€).' },
      { item: 'Aranžman', cost: 3000, desc: 'Moderna produkcija i aranžiranje (raspon 2000-4000€).' },
      { item: 'Mastering', cost: 800, desc: 'Finalna obrada zvuka (do 1000€).' },
      { item: 'Muzički spot (Video)', cost: 5000, desc: 'Profesionalna video produkcija (od 600€ naviše).' },
      { item: 'Marketing & Influenseri', cost: 3000, desc: 'Promocija preko Tik-Tok i Instagram influensera.' },
      { item: 'Radio Promocija', cost: 2000, desc: 'Rotacija na 2-3 ključne radio stanice.' },
      { item: 'YouTube & Social Boost', cost: 4700, desc: 'Plaćeni oglasi za povećanje pregleda i vidljivosti.' },
    ]
  };

  const totalTarget = song.financial_plan.reduce((acc, item) => acc + item.cost, 0);
  const progress = (song.raised_amount / totalTarget) * 100;
  const estimatedOwnership = (investAmount / totalTarget) * song.equity_share;

  const handleInvest = async () => {
    const result = await simulateTransaction(investAmount, id!);
    if (result.success) {
      toast.success(`Uspešno ste investirali ${formatCurrency(investAmount)}! Vaš udeo je potvrđen na blockchain-u.`);
      // In a real app, update Supabase here
      navigate('/portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24 text-white">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Left Column: Media & Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video overflow-hidden rounded-3xl border border-white/10"
            >
              <img 
                src={song.cover_url} 
                className="h-full w-full object-cover" 
                alt={song.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-black transition-transform hover:scale-110 active:scale-95"
                >
                  {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
                </button>
                <div>
                  <h1 className="text-4xl font-black tracking-tighter">{song.title}</h1>
                  <p className="text-lg text-zinc-300">{song.artist.name}</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10">
                <button 
                  onClick={() => setActiveTab('project')}
                  className={`pb-4 font-bold transition-colors ${activeTab === 'project' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-white'}`}
                >
                  O Projektu
                </button>
                <button 
                  onClick={() => setActiveTab('plan')}
                  className={`pb-4 font-bold transition-colors ${activeTab === 'plan' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-white'}`}
                >
                  Finansijski Plan
                </button>
                <button 
                  onClick={() => setActiveTab('artist')}
                  className={`pb-4 font-bold transition-colors ${activeTab === 'artist' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-white'}`}
                >
                  Umetnik
                </button>
              </div>
              
              <div className="min-h-[300px]">
                {activeTab === 'project' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="prose prose-invert max-w-none">
                    <p className="text-zinc-400 leading-relaxed text-lg">
                      {song.description}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'plan' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="rounded-2xl border border-white/5 bg-zinc-900/30 overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-white/5">
                            <th className="px-6 py-4">Stavka</th>
                            <th className="px-6 py-4">Opis</th>
                            <th className="px-6 py-4 text-right">Iznos</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {song.financial_plan.map((item, i) => (
                            <tr key={i} className="text-sm">
                              <td className="px-6 py-4 font-bold text-white">{item.item}</td>
                              <td className="px-6 py-4 text-zinc-400">{item.desc}</td>
                              <td className="px-6 py-4 text-right font-mono font-bold text-emerald-400">{formatCurrency(item.cost)}</td>
                            </tr>
                          ))}
                          <tr className="bg-emerald-500/5">
                            <td colSpan={2} className="px-6 py-4 font-black text-white">UKUPNO ZA PRIKUPLJANJE</td>
                            <td className="px-6 py-4 text-right font-black text-emerald-500 text-lg">{formatCurrency(totalTarget)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'artist' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                    <h3 className="flex items-center gap-2 font-bold text-white mb-4">
                      <UserIcon className="h-5 w-5 text-emerald-500" />
                      O Umetniku
                    </h3>
                    <div className="flex items-start gap-4">
                      <img src={song.artist.avatar} className="h-16 w-16 rounded-full" alt={song.artist.name} />
                      <div>
                        <h4 className="font-bold">{song.artist.name}</h4>
                        <p className="text-sm text-zinc-400 mt-1">{song.artist.bio}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Investment Widget */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 rounded-3xl border border-emerald-500/20 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-emerald-500/5"
            >
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-zinc-400">Status finansiranja</span>
                    <span className="text-emerald-400">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                  <div className="mt-3 flex justify-between">
                    <span className="text-2xl font-black">{formatCurrency(song.raised_amount)}</span>
                    <span className="text-sm text-zinc-500 self-end">Cilj: {formatCurrency(totalTarget)}</span>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl bg-black/40 p-6">
                  <label className="text-sm font-bold text-zinc-400">Iznos investicije (EUR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-zinc-500">€</span>
                    <input 
                      type="number" 
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-10 py-4 text-2xl font-black focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Procenjeni udeo:</span>
                    <span className="font-bold text-emerald-400">{estimatedOwnership.toFixed(4)}%</span>
                  </div>
                </div>

                <button 
                  onClick={handleInvest}
                  disabled={isPending}
                  className="w-full rounded-2xl bg-emerald-600 py-5 text-lg font-black text-white transition-all hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isPending ? 'Procesiranje...' : 'KUPI UDELA'}
                </button>

                <div className="flex items-center gap-2 justify-center text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4" />
                  Sigurna transakcija na Polygon mreži
                </div>
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Info className="h-4 w-4 text-emerald-500" />
                Važne informacije
              </div>
              Investiranje u muzičke tantijeme nosi rizik. Isplate zavise od uspeha pesme na striming servisima.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
