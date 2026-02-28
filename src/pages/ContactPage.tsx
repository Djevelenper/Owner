import React from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Poruka je uspešno poslata! Javićemo vam se uskoro.');
  };

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-6">Kontaktiraj nas</h1>
            <p className="text-xl text-zinc-400 mb-12">Imate pitanja o investiranju ili ste umetnik koji želi da sarađuje? Tu smo za vas.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-bold">Email</div>
                  <div className="text-lg font-bold">podrska@vlasnik.rs</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-bold">Telegram</div>
                  <div className="text-lg font-bold">@vlasnik_podrska</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-bold">Kancelarija</div>
                  <div className="text-lg font-bold">Bulevar Mihajla Pupina 10, Beograd</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-400">Ime</label>
                  <input required type="text" className="w-full bg-black border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-400">Email</label>
                  <input required type="email" className="w-full bg-black border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Tema</label>
                <select className="w-full bg-black border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:outline-none">
                  <option>Investiranje</option>
                  <option>Za Umetnike</option>
                  <option>Tehnička Podrška</option>
                  <option>Ostalo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Poruka</label>
                <textarea required rows={5} className="w-full bg-black border border-white/10 rounded-xl p-4 focus:border-emerald-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 font-bold hover:bg-emerald-500 transition-all">
                Pošalji Poruku
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
