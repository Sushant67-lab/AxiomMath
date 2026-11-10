-- ============================================================
-- AxiomMath Supabase Database Schema
-- Run this in your Supabase Project SQL Editor (fqfunjlnvmidabjkeggx)
-- ============================================================

-- 1. Create 'profiles' table for scholars
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT DEFAULT 'euler',
  target_age TEXT DEFAULT '16-18',
  last_sign_in TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

-- Allow authenticated users to insert/update their own profile
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Create 'signups' audit log table
CREATE TABLE IF NOT EXISTS public.signups (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  username TEXT,
  avatar TEXT,
  target_age TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on signups
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Allow insert by anon/authenticated users
CREATE POLICY "Enable insert for all users" 
ON public.signups FOR INSERT WITH CHECK (true);

-- Allow reading own signup
CREATE POLICY "Enable read access for authenticated users" 
ON public.signups FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Automatic trigger to copy auth.users into public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, avatar, target_age)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar', 'euler'),
    COALESCE(NEW.raw_user_meta_data->>'target_age', '16-18')
  )
  ON CONFLICT (id) DO UPDATE SET
    last_sign_in = NOW(),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on every auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
