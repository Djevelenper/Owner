import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function CampaignCard({ campaign }: {
  key?: string | number;
  campaign: {
    id: string;
    song_title: string;
    artist_name: string;
    cover_url: string;
    total_revenue_pool: number;
    end_date: string;
    total_submissions: number;
  };
}) {
  const timeLeft = () => {
    const end = new Date(campaign.end_date).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} dana preostalo` : 'Završava se danas';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-5 transition-all hover:border-emerald-500/30"
    >
      <Link to={`/campaigns/${campaign.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <img
            src={campaign.cover_url || `https://picsum.photos/seed/${campaign.id}/600/600`}
            alt={campaign.song_title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            AKTIVNA KAMPANJA
          </div>
        </div>

        <div className="mt-5 space-y-1">
          <h3 className="truncate text-lg font-black text-white">{campaign.song_title}</h3>
          <p className="text-sm text-zinc-500 font-medium">{campaign.artist_name}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-black/40 p-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Nagradni Fond</div>
            <div className="text-sm font-black text-emerald-500">{formatCurrency(campaign.total_revenue_pool)}</div>
          </div>
          <div className="rounded-2xl bg-black/40 p-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Vreme</div>
            <div className="text-sm font-black text-white">{timeLeft()}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-zinc-400">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {campaign.total_submissions} Promotera
          </div>
          <div className="flex items-center gap-1 text-emerald-500">
            UČESTVUJ <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import { ArrowRight } from 'lucide-react';
