-- WishBloom Supabase Migration Script

create extension if not exists pgcrypto;

create table if not exists public.birthday_wishes (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    event_type text default 'birthday',
    recipient_name text not null,
    sender_name text not null,
    sign_off_phrase text default 'With All Our Love',
    title text,
    message text not null,
    quote text,
    relationship text,
    birthday_date date,
    theme text default 'romantic',
    music_url text,
    effects jsonb default '[]'::jsonb,
    photo_urls jsonb default '[]'::jsonb,
    is_public boolean default true,
    view_count integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Ensure event_type and sign_off_phrase columns exist on existing installations
alter table public.birthday_wishes add column if not exists event_type text default 'birthday';
alter table public.birthday_wishes add column if not exists sign_off_phrase text default 'With All Our Love';

create unique index if not exists birthday_wishes_slug_idx
on public.birthday_wishes (slug);

alter table public.birthday_wishes enable row level security;

grant select, insert on public.birthday_wishes to anon;
grant select, insert on public.birthday_wishes to authenticated;

-- RLS Policies for birthday_wishes
create policy "Anyone can create a birthday wish"
on public.birthday_wishes
for insert
to anon, authenticated
with check (true);

create policy "Anyone can view public birthday wishes"
on public.birthday_wishes
for select
to anon, authenticated
using (is_public = true);

-- Supabase Storage Bucket Setup for wish-photos
insert into storage.buckets (id, name, public)
values ('wish-photos', 'wish-photos', true)
on conflict (id) do nothing;

-- Storage Policies for wish-photos
create policy "Anyone can upload wish photos"
on storage.objects for insert
to anon, authenticated
with check (bucket_id = 'wish-photos');

create policy "Anyone can view wish photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'wish-photos');
