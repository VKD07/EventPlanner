-- Run this in the Supabase SQL Editor to add vocal guide support
-- (Soprano/Alto/Tenor/Bass recordings attached to a song).

create table public.vocal_guides (
    id uuid primary key default gen_random_uuid(),
    song_id uuid not null references public.songs (id) on delete cascade,
    category text not null check (category in ('Soprano', 'Alto', 'Tenor', 'Bass')),
    label text,
    "audioUrl" text not null,
    created_at timestamptz not null default now()
);

alter table public.vocal_guides enable row level security;

create policy "authenticated_full_access" on public.vocal_guides
    for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('vocal-guides', 'vocal-guides', true)
on conflict (id) do nothing;

create policy "authenticated_can_upload_vocal_guides"
on storage.objects for insert to authenticated
with check (bucket_id = 'vocal-guides');

create policy "public_can_read_vocal_guides"
on storage.objects for select to public
using (bucket_id = 'vocal-guides');
