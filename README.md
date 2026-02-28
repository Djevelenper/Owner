# VLASNIK - Music Investment Platform

## Environment Variables
Create a `.env` file with the following:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema (PostgreSQL)

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  wallet_address TEXT,
  role TEXT CHECK (role IN ('artist', 'investor')) DEFAULT 'investor',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Songs table
CREATE TABLE songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  artist_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  audio_preview_url TEXT,
  target_funding NUMERIC NOT NULL,
  raised_amount NUMERIC DEFAULT 0,
  equity_share NUMERIC NOT NULL, -- Percentage of royalties offered
  status TEXT CHECK (status IN ('funding', 'active')) DEFAULT 'funding',
  contract_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Investments table
CREATE TABLE investments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  shares_amount NUMERIC NOT NULL, -- Amount invested
  invested_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for MVP)
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Songs are viewable by everyone." ON songs FOR SELECT USING (true);
CREATE POLICY "Artists can insert songs." ON songs FOR INSERT WITH CHECK (auth.uid() = artist_id);
CREATE POLICY "Investments are viewable by the investor." ON investments FOR SELECT USING (auth.uid() = investor_id);
CREATE POLICY "Anyone can insert an investment." ON investments FOR INSERT WITH CHECK (true);
```
