import React, { useState } from 'react';
import { Send, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface SubmissionFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

export default function SubmissionForm({ campaignId, onSuccess }: SubmissionFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url: string) => {
    const tiktokRegex = /tiktok\.com\/@[\w.-]+\/video\/\d+/;
    const reelsRegex = /instagram\.com\/(reels|reel)\/[\w-]+\//;
    const shortsRegex = /youtube\.com\/shorts\/[\w-]+/;
    return tiktokRegex.test(url) || reelsRegex.test(url) || shortsRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      toast.error('Nevažeći link. Molimo unesite ispravan TikTok, Reels ili Shorts link.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to fetch video stats
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast.success('Video uspešno prijavljen! Vaš rang će biti ažuriran uskoro.');
    setUrl('');
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-black text-zinc-400 uppercase tracking-widest">Link do videa</label>
        <div className="relative">
          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.tiktok.com/@user/video/..."
            className="w-full rounded-2xl border border-white/10 bg-black/50 py-5 pl-12 pr-4 text-white focus:border-emerald-500 focus:outline-none transition-all placeholder:text-zinc-700"
          />
        </div>
        <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Podržavamo TikTok, Instagram Reels i YouTube Shorts.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !url}
        className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-5 text-lg font-black text-white transition-all hover:bg-emerald-500 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            PROVERAVAM VIDEO...
          </>
        ) : (
          <>
            PRIJAVI SE ZA ZARADU
            <Send className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
