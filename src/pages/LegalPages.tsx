import React from 'react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-black mb-8">Uslovi Korišćenja</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-zinc-400">
          <p>Dobrodošli na VLASNIK platformu. Korišćenjem naših usluga, pristajete na sledeće uslove:</p>
          <h2 className="text-xl font-bold text-white">1. Priroda Investicije</h2>
          <p>Investiranje u muzičke tantijeme nosi rizik. VLASNIK ne garantuje povraćaj investicije niti određeni nivo zarade. Uspeh pesme zavisi od tržišnih faktora.</p>
          <h2 className="text-xl font-bold text-white">2. Digitalni Novčanici</h2>
          <p>Korisnici su isključivo odgovorni za sigurnost svojih privatnih ključeva i digitalnih novčanika. VLASNIK nema pristup vašim sredstvima.</p>
          <h2 className="text-xl font-bold text-white">3. Isplate</h2>
          <p>Isplate se vrše periodično, nakon što striming servisi obrade i isplate tantijeme distributerima, što može potrajati od 3 do 6 meseci.</p>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-black mb-8">Politika Privatnosti</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-zinc-400">
          <p>Vaša privatnost nam je važna. Evo kako rukujemo vašim podacima:</p>
          <h2 className="text-xl font-bold text-white">1. Prikupljanje Podataka</h2>
          <p>Prikupljamo samo neophodne podatke kao što su adresa vašeg novčanika i email adresa (ukoliko se odlučite za notifikacije).</p>
          <h2 className="text-xl font-bold text-white">2. Korišćenje Podataka</h2>
          <p>Podaci se koriste isključivo za funkcionisanje platforme i personalizaciju vašeg iskustva.</p>
          <h2 className="text-xl font-bold text-white">3. Deljenje sa Trećim Licima</h2>
          <p>Nikada ne prodajemo vaše podatke. Podaci se dele samo sa neophodnim servisima kao što je Supabase za autentifikaciju.</p>
        </div>
      </div>
    </div>
  );
}
