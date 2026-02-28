import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, Zap, History, ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

const EARNINGS_DATA = [
  { name: 'Beograd Noću', value: 450, color: '#10b981' },
  { name: 'Sve što želim', value: 120, color: '#3b82f6' },
  { name: 'Zlatni Dan', value: 850, color: '#f59e0b' },
];

const RECENT_SUBMISSIONS = [
  { id: 1, song: 'Beograd Noću', views: '450k', earnings: 125.50, status: 'Aktivno' },
  { id: 2, song: 'Zlatni Dan', views: '1.2M', earnings: 450.20, status: 'Aktivno' },
  { id: 3, song: 'Sve što želim', views: '85k', earnings: 42.10, status: 'Završeno' },
];

export default function InvestorPortfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest mb-2">
            <Zap className="h-4 w-4 fill-current" />
            Promoter Earnings
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Moj Portfolio</h1>
          <p className="text-zinc-500 font-medium">Prati svoju zaradu od kreiranog sadržaja</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Ukupna Zarada', value: '€1,420.80', icon: Wallet, trend: '+€142 danas' },
                { label: 'Ukupno Pregleda', value: '1.7M', icon: Eye, trend: '+120k' },
                { label: 'Aktivnih Videa', value: '8', icon: TrendingUp, trend: 'Aktivno' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-[32px] border border-white/5 bg-zinc-900/50 p-8"
                >
                  <stat.icon className="h-6 w-6 text-emerald-500" />
                  <div className="mt-6 text-3xl font-black tracking-tighter">{stat.value}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-[10px] font-black text-emerald-500">{stat.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submissions Table */}
            <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight">Moje Prijave</h3>
                <button className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:underline">Vidi sve</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-8 py-5">Pesma</th>
                      <th className="px-8 py-5">Pregledi</th>
                      <th className="px-8 py-5">Zarada</th>
                      <th className="px-8 py-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {RECENT_SUBMISSIONS.map((sub, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6 font-black text-white">{sub.song}</td>
                        <td className="px-8 py-6 text-zinc-400 font-bold">{sub.views}</td>
                        <td className="px-8 py-6 text-emerald-500 font-black">{formatCurrency(sub.earnings)}</td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest",
                            sub.status === 'Aktivno' ? "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20" : "bg-zinc-500/10 text-zinc-500 ring-1 ring-zinc-500/20"
                          )}>
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar: Earnings Chart */}
          <div className="space-y-8">
            <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 p-10">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Raspodela Zarade</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={EARNINGS_DATA}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {EARNINGS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-4">
                {EARNINGS_DATA.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-bold text-zinc-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-white">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[40px] border border-emerald-500/10 bg-emerald-500/5 p-10 border-dashed">
              <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-emerald-500">Savet za veći Reach</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Koristi trending hashtage i objavljuj u "prime time" terminima (18h-21h) kako bi tvoj video dobio više pregleda i veći udeo u tantijemama.
              </p>
              <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-emerald-500 transition-all">
                Pogledaj Trendove
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
