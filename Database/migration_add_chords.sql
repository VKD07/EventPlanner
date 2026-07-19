-- Run this in the Supabase SQL Editor if you already created your
-- database from supabase_restore.sql before chords/video support existed.

alter table public.songs
    add column if not exists chords text,
    add column if not exists "originalKey" text,
    add column if not exists "videoUrl" text;

drop function if exists public.get_songs_with_material_id();

create function public.get_songs_with_material_id()
returns table (
    id uuid,
    title text,
    author text,
    lyrics text,
    chords text,
    "originalKey" text,
    "videoUrl" text,
    "audioUrl" text,
    agenda_material_id uuid
)
language sql
stable
as $$
    select
        s.id,
        s.title,
        s.author,
        s.lyrics,
        s.chords,
        s."originalKey",
        s."videoUrl",
        s."audioUrl",
        am.id as agenda_material_id
    from public.songs s
    left join public.agenda_materials am
        on am.material_type = 'song' and am.material_id = s.id;
$$;
