import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Zap, Users, Eye, TrendingUp, Share2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency } from '../lib/utils';

const GROWTH_DATA = [
  { name: 'Dan 1', views: 4000, reach: 2400 },
  { name: 'Dan 2', views: 12000, reach: 8000 },
  { name: 'Dan 3', views: 45000, reach: 32000 },
  { name: 'Dan 4', views: 120000, reach: 95000 },
  { name: 'Dan 5', views: 350000, reach: 280000 },
  { name: 'Dan 6', views: 850000, reach: 640000 },
  { name: 'Dan 7', views: 1200000, reach: 980000 },
];

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest mb-2">
              <Zap className="h-4 w-4 fill-current" />
              Artist Analytics
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">Dashboard</h1>
            <p className="text-zinc-500 font-medium">Prati rast svog brenda kroz Royalties Sacrifice model</p>
          </div>
          <button className="rounded-2xl bg-emerald-600 px-8 py-4 font-black uppercase text-sm tracking-widest transition-all hover:bg-emerald-500 active:scale-95 shadow-xl shadow-emerald-500/20">
            Nova Kampanja
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Ukupno Pregleda', value: '4.2M', icon: Eye, trend: '+420%' },
            { label: 'Aktivnih Promotera', value: '156', icon: Users, trend: '+12%' },
            { label: 'Reach (Doseg)', value: '1.8M', icon: Share2, trend: '+85%' },
            { label: 'Žrtvovane Tantijeme', value: '€12,500', icon: TrendingUp, trend: 'Aktivno' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-white/5 bg-zinc-900/50 p-8"
            >
              <stat.icon className="h-6 w-6 text-emerald-500" />
              <div className="mt-6 text-4xl font-black tracking-tighter">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                <span className="text-xs font-black text-emerald-500">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 rounded-[40px] border border-white/5 bg-zinc-900/30 p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black uppercase tracking-tight">Eksponencijalni Rast Pregleda</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" /> Pregledi
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                  <div className="h-2 w-2 rounded-full bg-blue-500" /> Doseg
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={GROWTH_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#000' }} 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reach" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#000' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Promoters Sidebar */}
          <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 p-10">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Top Promoteri</h3>
            <div className="space-y-6">
              {[
                { name: 'marko_dance', views: '1.2M', growth: '+150%' },
                { name: 'milica_vibe', views: '850k', growth: '+85%' },
                { name: 'stefan_beats', views: '420k', growth: '+42%' },
                { name: 'ana_music', views: '210k', growth: '+12%' },
              ].map((promoter, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${promoter.name}`} alt="" />
                    </div>
                    <div>
                      <div className="text-sm font-black">@{promoter.name}</div>
                      <div className="text-[10px] font-bold text-zinc-500">{promoter.views} pregleda</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-500">{promoter.growth}</div>
                    <ArrowUpRight className="h-3 w-3 text-zinc-500 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 rounded-2xl border border-white/10 py-4 text-xs font-black uppercase tracking-widest text-zinc-400 hover:bg-white/5 transition-all">
              Vidi Sve Promotere
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
