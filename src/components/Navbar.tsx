import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Wallet, Music2, LayoutDashboard, Briefcase, User } from 'lucide-react';
import { cn } from '../lib/utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Navbar() {
  const location = useLocation();
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Molimo instalirajte MetaMask!");
    }
  };

  const navLinks = [
    { name: 'Istraži', path: '/explore', icon: Music2 },
    { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
    { name: 'Dashboard', path: '/dashboard/artist', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-emerald-500">
            VLASNIK
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-400",
                  location.pathname === link.path ? "text-emerald-500" : "text-zinc-400"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Pretraži pesme..."
              className="h-9 w-64 rounded-full border border-white/10 bg-zinc-900/50 pl-10 pr-4 text-sm focus:border-emerald-500/50 focus:outline-none"
            />
          </div>
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-emerald-500 active:scale-95"
          >
            <Wallet className="h-4 w-4" />
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Poveži Novčanik'}
          </button>
        </div>
      </div>
    </nav>
  );
}
