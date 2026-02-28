import React, { useState } from 'react';
import { Plus, Music, DollarSign, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

import { toast } from 'sonner';

export default function ArtistDashboard() {
  const [step, setStep] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const handlePublish = () => {
    toast.success('Pesma je uspešno objavljena i čeka na odobrenje!');
    setShowForm(false);
    setStep(1);
  };

  const activeFundraisings = [
    { id: 1, title: 'Beograd Noću', target: 50000, raised: 32500, status: 'U toku' },
    { id: 2, title: 'Zlatni Dan', target: 100000, raised: 85000, status: 'U toku' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">Artist Dashboard</h1>
            <p className="text-zinc-500">Upravljaj svojim pesmama i prikupljanjem sredstava</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-bold transition-all hover:bg-emerald-500 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Objavi Novu Pesmu
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-3xl border border-white/5 bg-zinc-900/50 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold">Aktivna Prikupljanja Sredstava</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Pesma</th>
                  <th className="px-6 py-4">Cilj</th>
                  <th className="px-6 py-4">Prikupljeno</th>
                  <th className="px-6 py-4">Progres</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeFundraisings.map((song) => (
                  <tr key={song.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold">{song.title}</td>
                    <td className="px-6 py-4 text-zinc-400">{formatCurrency(song.target)}</td>
                    <td className="px-6 py-4 font-bold">{formatCurrency(song.raised)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 rounded-full bg-zinc-800 overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: `${(song.raised / song.target) * 100}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold">{Math.round((song.raised / song.target) * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-500 ring-1 ring-emerald-500/20">
                        {song.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Multi-step Form Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black">Nova Pesma</h2>
                  <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white">Zatvori</button>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center gap-4 mb-12">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                        step >= s ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-500"
                      )}>
                        {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                      </div>
                      {s < 3 && <div className={cn("h-px w-12", step > s ? "bg-emerald-500" : "bg-zinc-800")} />}
                    </div>
                  ))}
                </div>

                <div className="min-h-[300px]">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400">Naziv Pesme</label>
                        <input type="text" placeholder="npr. Beograd Noću" className="w-full rounded-xl border border-white/10 bg-black p-4 focus:border-emerald-500 focus:outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-400">Opis Projekta</label>
                        <textarea rows={4} placeholder="O čemu se radi u ovom projektu?" className="w-full rounded-xl border border-white/10 bg-black p-4 focus:border-emerald-500 focus:outline-none" />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-zinc-400">Cilj (EUR)</label>
                          <input type="number" placeholder="50000" className="w-full rounded-xl border border-white/10 bg-black p-4 focus:border-emerald-500 focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-zinc-400">Udeo za investitore (%)</label>
                          <input type="number" placeholder="15" className="w-full rounded-xl border border-white/10 bg-black p-4 focus:border-emerald-500 focus:outline-none" />
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/20 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                        <p className="text-xs text-zinc-400">
                          Preporučujemo da ne nudite više od 20% udela kako biste zadržali kontrolu nad svojim autorskim pravima.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                        <Upload className="h-12 w-12 text-zinc-500 mb-4" />
                        <h4 className="font-bold mb-1">Otpremi Audio Preview</h4>
                        <p className="text-sm text-zinc-500 mb-6">MP3 ili WAV, maksimalno 30 sekundi</p>
                        <button className="rounded-full bg-white text-black px-6 py-2 font-bold text-sm">Izaberi Fajl</button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-12 flex justify-between">
                  <button 
                    onClick={() => step > 1 && setStep(step - 1)}
                    className={cn("px-6 py-3 font-bold text-zinc-500", step === 1 && "invisible")}
                  >
                    Nazad
                  </button>
                  <button 
                    onClick={() => step < 3 ? setStep(step + 1) : handlePublish()}
                    className="rounded-full bg-emerald-600 px-8 py-3 font-bold text-white transition-all hover:bg-emerald-500"
                  >
                    {step === 3 ? 'Završi i Objavi' : 'Nastavi'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
