-- WishBloom Supabase Database Schema

-- 1. Create birthday_wishes table
CREATE TABLE IF NOT EXISTS public.birthday_wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    recipient_name TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'friend',
    birthday_date DATE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    quote TEXT,
    sender_name TEXT NOT NULL,
    theme TEXT NOT NULL DEFAULT 'romantic',
    music_track TEXT DEFAULT 'celebration',
    music_enabled BOOLEAN DEFAULT true,
    confetti_enabled BOOLEAN DEFAULT true,
    effects JSONB DEFAULT '["confetti", "balloons"]'::jsonb,
    view_count INT DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    report_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create wish_photos table
CREATE TABLE IF NOT EXISTS public.wish_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wish_id UUID REFERENCES public.birthday_wishes(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_birthday_wishes_slug ON public.birthday_wishes(slug);
CREATE INDEX IF NOT EXISTS idx_wish_photos_wish_id ON public.wish_photos(wish_id);

-- Enable RLS
ALTER TABLE public.birthday_wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wish_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to read public wishes
CREATE POLICY "Allow public read access on wishes" 
ON public.birthday_wishes FOR SELECT 
USING (is_public = true);

-- Allow anyone to create a wish
CREATE POLICY "Allow public insert on wishes" 
ON public.birthday_wishes FOR INSERT 
WITH CHECK (true);

-- Allow public read access to wish photos
CREATE POLICY "Allow public read access on wish_photos" 
ON public.wish_photos FOR SELECT 
USING (true);

-- Allow public insert on wish photos
CREATE POLICY "Allow public insert on wish_photos" 
ON public.wish_photos FOR INSERT 
WITH CHECK (true);

-- Storage bucket setup (for Supabase Storage console)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('wish-photos', 'wish-photos', true);
