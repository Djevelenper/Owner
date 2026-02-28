import React from 'react';
import { Trophy, TrendingUp, DollarSign, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

interface LeaderboardProps {
  submissions: any[];
  totalPool: number;
}

export default function Leaderboard({ submissions, totalPool }: LeaderboardProps) {
  const totalScore = submissions.reduce((acc, s) => acc + Number(s.influence_score), 0);

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/50 overflow-hidden">
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h3 className="text-xl font-black">Live Leaderboard</h3>
        </div>
        <div className="text-xs font-bold text-zinc-500">AŽURIRANO U REALNOM VREMENU</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
              <th className="px-6 py-5">Rang</th>
              <th className="px-6 py-5">Promoter</th>
              <th className="px-6 py-5">Video Metrika</th>
              <th className="px-6 py-5">Influence Score</th>
              <th className="px-6 py-5 text-right">Procenjena Zarada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {submissions.sort((a, b) => b.influence_score - a.influence_score).map((sub, i) => {
              const sharePct = totalScore > 0 ? (sub.influence_score / totalScore) : 0;
              const projectedEarnings = sharePct * totalPool;

              return (
                <motion.tr 
                  key={sub.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-emerald-500/5 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-black",
                      i === 0 ? "bg-yellow-500 text-black" : 
                      i === 1 ? "bg-zinc-300 text-black" :
                      i === 2 ? "bg-orange-400 text-black" : "bg-zinc-800 text-zinc-400"
                    )}>
                      {i + 1}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.username}`} alt="" />
                      </div>
                      <div>
                        <div className="font-bold text-white">@{sub.username}</div>
                        <a href={sub.video_url} target="_blank" className="text-[10px] text-emerald-500 hover:underline">Pogledaj Video</a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {sub.current_views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {sub.current_likes.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-black text-white">{Math.round(sub.influence_score).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="text-lg font-black text-emerald-500">{formatCurrency(projectedEarnings)}</div>
                    <div className="text-[10px] font-bold text-zinc-500">{(sharePct * 100).toFixed(2)}% UDEO</div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
