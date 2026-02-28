import React from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist_name: string;
    cover_url: string;
    target_funding: number;
    raised_amount: number;
    equity_share: number;
  };
}

export default function SongCard({ song }: any) {
  const progress = (song.raised_amount / song.target_funding) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:border-emerald-500/30"
    >
      <Link to={`/songs/${song.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={song.cover_url || `https://picsum.photos/seed/${song.id}/400/400`}
            alt={song.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg">
              <Play className="h-6 w-6 fill-current" />
            </div>
          </div>
          <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md">
            {song.equity_share}% UDEO
          </div>
        </div>

        <div className="mt-4">
          <h3 className="truncate font-bold text-white">{song.title}</h3>
          <p className="text-sm text-zinc-500">{song.artist_name}</p>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-400">Prikupljeno</span>
            <span className="text-emerald-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
          <div className="flex justify-between text-xs font-bold text-white">
            <span>{formatCurrency(song.raised_amount)}</span>
            <span className="text-zinc-500">od {formatCurrency(song.target_funding)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
