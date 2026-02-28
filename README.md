# VLASNIK | Promote-to-Earn Platform

## Tehnološki Stack
- **Frontend**: Vite + React (TypeScript), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Supabase (Auth, PostgreSQL, Edge Functions).
- **API**: Integracija sa TikTok/Instagram API za metriku videa.

## Database Schema (PostgreSQL / Supabase)

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  social_handles JSONB, -- { "tiktok": "@user", "instagram": "@user" }
  wallet_address TEXT,
  role TEXT CHECK (role IN ('artist', 'promoter')) DEFAULT 'promoter',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Campaigns table (Artists sacrifice royalties here)
CREATE TABLE campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artist_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  song_title TEXT NOT NULL,
  audio_link TEXT,
  cover_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  end_date TIMESTAMP WITH TIME ZONE,
  total_revenue_pool NUMERIC DEFAULT 0, -- Current earnings from Spotify/YT
  status TEXT CHECK (status IN ('active', 'completed')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Submissions table (Promoters submit their videos)
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  promoter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_id TEXT,
  current_views INTEGER DEFAULT 0,
  current_likes INTEGER DEFAULT 0,
  current_shares INTEGER DEFAULT 0,
  influence_score NUMERIC DEFAULT 0,
  royalty_share_pct NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Function to calculate influence score
-- Score = (Views * 0.7) + (Likes * 0.2) + (Shares * 0.1)
CREATE OR REPLACE FUNCTION calculate_influence_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.influence_score := (NEW.current_views * 0.7) + (NEW.current_likes * 0.2) + (NEW.current_shares * 0.1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calculate_score
BEFORE INSERT OR UPDATE ON submissions
FOR EACH ROW EXECUTE FUNCTION calculate_influence_score();
```

## Algoritam za isplatu (Proportional Share)
Svaki promoter dobija:
`(individual_influence_score / total_campaign_influence_score) * total_revenue_pool`
