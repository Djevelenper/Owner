import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, TrendingUp, ArrowUpRight, History } from 'lucide-react';
import { motion } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

const MOCK_DATA = [
  { name: 'Beograd Noću', value: 400, color: '#10b981' },
  { name: 'Sve što želim', value: 300, color: '#3b82f6' },
  { name: 'Zlatni Dan', value: 200, color: '#f59e0b' },
  { name: 'Kao nekad', value: 100, color: '#8b5cf6' },
];

const TRANSACTIONS = [
  { id: 1, song: 'Beograd Noću', amount: 500, date: '24. Feb 2026', type: 'Kupovina' },
  { id: 2, song: 'Sve što želim', amount: 120, date: '20. Feb 2026', type: 'Dividenda' },
  { id: 3, song: 'Zlatni Dan', amount: 1000, date: '15. Feb 2026', type: 'Kupovina' },
];

export default function InvestorPortfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">Moj Portfolio</h1>
          <p className="text-zinc-500">Pregled tvojih muzičkih investicija i zarade</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Ukupna Vrednost', value: '€4,250.00', icon: Wallet, trend: '+12.5%' },
                { label: 'Isplaćene Dividende', value: '€342.15', icon: TrendingUp, trend: '+5.2%' },
                { label: 'Broj Udela', value: '12', icon: ArrowUpRight, trend: null },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-3xl border border-white/5 bg-zinc-900/50 p-6"
                >
                  <stat.icon className="h-6 w-6 text-emerald-500" />
                  <div className="mt-4 text-2xl font-black">{stat.value}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                    {stat.trend && <span className="text-xs font-bold text-emerald-500">{stat.trend}</span>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Holdings Table */}
            <div className="rounded-3xl border border-white/5 bg-zinc-900/50 overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold">Tvoji Udeli</h3>
                <button className="text-xs font-bold text-emerald-500">Vidi sve</button>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Pesma</th>
                    <th className="px-6 py-4">Udeo %</th>
                    <th className="px-6 py-4">Vrednost</th>
                    <th className="px-6 py-4">Zarada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_DATA.map((item, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold">{item.name}</td>
                      <td className="px-6 py-4 text-zinc-400">{(item.value / 1000).toFixed(2)}%</td>
                      <td className="px-6 py-4 font-bold">{formatCurrency(item.value * 5)}</td>
                      <td className="px-6 py-4 text-emerald-500 font-bold">+{formatCurrency(item.value * 0.2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar: Chart & Recent Activity */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/5 bg-zinc-900/50 p-6">
              <h3 className="font-bold mb-6">Raspodela Portfolija</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MOCK_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                {MOCK_DATA.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-zinc-400">{item.name}</span>
                    </div>
                    <span className="font-bold">{Math.round((item.value / 1000) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-zinc-900/50 p-6">
              <h3 className="flex items-center gap-2 font-bold mb-6">
                <History className="h-4 w-4 text-emerald-500" />
                Nedavne Aktivnosti
              </h3>
              <div className="space-y-4">
                {TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-bold">{tx.song}</div>
                      <div className="text-[10px] text-zinc-500">{tx.date} • {tx.type}</div>
                    </div>
                    <div className={cn("text-sm font-black", tx.type === 'Dividenda' ? 'text-emerald-500' : 'text-white')}>
                      {tx.type === 'Dividenda' ? '+' : ''}{formatCurrency(tx.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
