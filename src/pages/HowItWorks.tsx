import React from 'react';
import { motion } from 'motion/react';
import { Music, Wallet, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Umetnik objavljuje kampanju',
      desc: 'Muzičari biraju procenat budućih tantijema koji žele da ponude fanovima u zamenu za početni kapital.',
      icon: Music,
      color: 'text-blue-500'
    },
    {
      title: 'Fanovi kupuju udele',
      desc: 'Kroz našu platformu, fanovi kupuju digitalne udele (tokene) koji predstavljaju pravo na deo zarade.',
      icon: Wallet,
      color: 'text-emerald-500'
    },
    {
      title: 'Pesma se strimuje',
      desc: 'Pesma se objavljuje na Spotify, Apple Music i YouTube platformama gde generiše prihod.',
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      title: 'Automatska isplata',
      desc: 'Pametni ugovori automatski raspoređuju zaradu svim vlasnicima udela direktno u njihove digitalne novčanike.',
      icon: ShieldCheck,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-black tracking-tighter mb-6">Kako funkcioniše <span className="text-emerald-500">VLASNIK</span>?</h1>
          <p className="text-xl text-zinc-400">Demokratizujemo muzičku industriju kroz moć blockchain tehnologije.</p>
        </header>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl border border-white/5 bg-zinc-900/30"
            >
              <div className={`h-20 w-20 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center ${step.color}`}>
                <step.icon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{i + 1}. {step.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center p-12 rounded-3xl bg-emerald-600/10 border border-emerald-500/20">
          <h2 className="text-3xl font-black mb-4">Spremni da postanete vlasnik?</h2>
          <p className="text-zinc-400 mb-8">Pridružite se hiljadama investitora koji već zarađuju od muzike.</p>
          <button className="rounded-full bg-emerald-600 px-10 py-4 text-lg font-bold hover:bg-emerald-500 transition-all">
            Započni Investiranje
          </button>
        </div>
      </div>
    </div>
  );
}
