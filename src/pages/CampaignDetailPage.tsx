import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Share2, Info, Zap, Trophy, Send } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import Leaderboard from '../components/Leaderboard';
import SubmissionForm from '../components/SubmissionForm';

const MOCK_SUBMISSIONS = [
  { id: '1', username: 'marko_dance', video_url: '#', current_views: 450000, current_likes: 85000, influence_score: 332000 },
  { id: '2', username: 'milica_vibe', video_url: '#', current_views: 280000, current_likes: 42000, influence_score: 204400 },
  { id: '3', username: 'stefan_beats', video_url: '#', current_views: 150000, current_likes: 25000, influence_score: 110000 },
  { id: '4', username: 'ana_music', video_url: '#', current_views: 95000, current_likes: 12000, influence_score: 68900 },
];

export default function CampaignDetailPage() {
  const { id } = useParams();
  const [showSubmit, setShowSubmit] = useState(false);

  const campaign = {
    id,
    song_title: 'Beograd Noću',
    artist: {
      name: 'Zera',
      avatar: 'https://picsum.photos/seed/zera/200/200'
    },
    cover_url: 'https://picsum.photos/seed/zera/800/800',
    total_revenue_pool: 12500,
    end_date: '2026-03-15',
    description: 'Zera nudi 100% svojih digitalnih tantijema za ovaj mesec najboljim promoterima! Napravi kreativan video, koristi zvanični audio i budi u vrhu tabele.'
  };

  return (
    <div className="min-h-screen bg-black pb-24 text-white">
      {/* Header / Hero */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img src={campaign.cover_url} className="h-full w-full object-cover opacity-40 blur-sm" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex flex-col md:flex-row items-end gap-8">
              <motion.img 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                src={campaign.cover_url} 
                className="h-48 w-48 rounded-3xl shadow-2xl border border-white/10" 
                alt="" 
              />
              <div className="flex-1 space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-black text-emerald-400 uppercase tracking-widest"
                >
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  Royalties Sacrifice Active
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{campaign.song_title}</h1>
                <div className="flex items-center gap-3">
                  <img src={campaign.artist.avatar} className="h-8 w-8 rounded-full" alt="" />
                  <span className="text-xl font-bold text-zinc-300">{campaign.artist.name}</span>
                </div>
              </div>
              <div className="hidden lg:block text-right">
                <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Nagradni Fond</div>
                <div className="text-5xl font-black text-emerald-500">{formatCurrency(campaign.total_revenue_pool)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Left: Leaderboard */}
          <div className="lg:col-span-2 space-y-12">
            <Leaderboard submissions={MOCK_SUBMISSIONS} totalPool={campaign.total_revenue_pool} />
            
            <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">O Kampanji</h3>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">{campaign.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-black/40 p-6 border border-white/5">
                  <h4 className="font-black text-emerald-500 uppercase text-xs tracking-widest mb-2">Pravila</h4>
                  <ul className="text-sm text-zinc-400 space-y-2">
                    <li>• Koristi zvanični audio na TikTok/Reels</li>
                    <li>• Video mora biti javan</li>
                    <li>• Nema ograničenja u broju videa</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-black/40 p-6 border border-white/5">
                  <h4 className="font-black text-emerald-500 uppercase text-xs tracking-widest mb-2">Isplata</h4>
                  <ul className="text-sm text-zinc-400 space-y-2">
                    <li>• Proporcionalno tvom Influence Score-u</li>
                    <li>• Isplata na kraju kampanje</li>
                    <li>• Direktno u tvoj digitalni novčanik</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Započni Zaradu</h3>
                <p className="text-sm text-zinc-400 mb-8">Prijavi svoj video i uđi u trku za nagradni fond.</p>
                
                <button 
                  onClick={() => setShowSubmit(true)}
                  className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-5 text-lg font-black text-white transition-all hover:bg-emerald-500 active:scale-95 shadow-xl shadow-emerald-500/20"
                >
                  PRIJAVI VIDEO
                  <Send className="h-5 w-5" />
                </button>
              </motion.div>

              <div className="rounded-3xl border border-white/5 bg-zinc-900/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Zap className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-zinc-500 uppercase tracking-widest">Tvoj Status</div>
                    <div className="text-lg font-black">Nisi prijavljen</div>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Prijavi se da vidiš svoju procenjenu zaradu i rang na tabeli.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl rounded-[40px] border border-white/10 bg-zinc-900 p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Prijavi Video</h2>
                  <p className="text-zinc-500 font-medium">Unesi link do svog TikTok ili Reels videa</p>
                </div>
                <button onClick={() => setShowSubmit(false)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              <SubmissionForm campaignId={id!} onSuccess={() => setShowSubmit(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
