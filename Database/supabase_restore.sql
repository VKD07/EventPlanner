-- =====================================================================
-- STEP 1: TABLES
-- pgcrypto (gen_random_uuid) is enabled by default on Supabase.
-- =====================================================================

create table public.events (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    "eventDate" date not null,
    location text,
    description text,
    user_id uuid references auth.users (id) on delete set null,
    created_at timestamptz not null default now()
);

create table public.members (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text,
    number text,
    created_at timestamptz not null default now()
);

create table public.skills (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

create table public.roles (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

create table public.member_skills (
    member_id uuid references public.members (id) on delete cascade,
    skill_id uuid references public.skills (id) on delete cascade,
    primary key (member_id, skill_id)
);

create table public.member_roles (
    member_id uuid references public.members (id) on delete cascade,
    role_id uuid references public.roles (id) on delete cascade,
    primary key (member_id, role_id)
);

create table public.teams (
    id uuid primary key default gen_random_uuid(),
    "eventID" uuid not null references public.events (id) on delete cascade,
    name text not null
);

create table public.team_members (
    "teamID" uuid not null references public.teams (id) on delete cascade,
    "memberID" uuid not null references public.members (id) on delete cascade,
    primary key ("teamID", "memberID")
);

create table public.songs (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author text,
    lyrics text,
    chords text,
    "originalKey" text,
    "videoUrl" text,
    "audioUrl" text,
    created_at timestamptz not null default now()
);

create table public.tags (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

create table public.song_tags (
    song_id uuid not null references public.songs (id) on delete cascade,
    tag_id uuid not null references public.tags (id) on delete cascade,
    primary key (song_id, tag_id)
);

create table public.vocal_guides (
    id uuid primary key default gen_random_uuid(),
    song_id uuid not null references public.songs (id) on delete cascade,
    category text not null check (category in ('Soprano', 'Alto', 'Tenor', 'Bass')),
    label text,
    "audioUrl" text not null,
    created_at timestamptz not null default now()
);

-- material_type is 'song' today; material_id points into songs.id.
-- No FK on material_id since the type varies (polymorphic).
create table public.agenda_materials (
    id uuid primary key default gen_random_uuid(),
    material_type text not null,
    material_id uuid not null,
    material_name text
);

create table public.event_flow (
    id uuid primary key default gen_random_uuid(),
    "time" time not null,
    segment text not null,
    "eventID" uuid not null references public.events (id) on delete cascade,
    "leaderID" uuid references public.members (id) on delete set null,
    "materialID" uuid references public.agenda_materials (id) on delete set null
);

-- =====================================================================
-- STEP 2: RPC FUNCTIONS
-- Reconstructed from how the frontend consumes each one (exact column
-- names traced through the React components/hooks calling them).
-- =====================================================================

create or replace function public.get_event_flow_by_event_id(event_id uuid)
returns table (
    id uuid,
    "time" time,
    segment text,
    leader_id uuid,
    leader_name text,
    material_pk uuid,
    material_id uuid,
    material_name text,
    material_type text
)
language sql
stable
as $$
    select
        ef.id,
        ef."time",
        ef.segment,
        ef."leaderID" as leader_id,
        m.name as leader_name,
        am.id as material_pk,
        am.material_id,
        am.material_name,
        am.material_type
    from public.event_flow ef
    left join public.members m on m.id = ef."leaderID"
    left join public.agenda_materials am on am.id = ef."materialID"
    where ef."eventID" = event_id
    order by ef."time";
$$;

create or replace function public.get_teams_by_event_id(event_id uuid)
returns table (
    team_id uuid,
    team_name text,
    member_id uuid,
    member_name text,
    email text,
    number text
)
language sql
stable
as $$
    select
        t.id as team_id,
        t.name as team_name,
        m.id as member_id,
        m.name as member_name,
        m.email,
        m.number
    from public.teams t
    left join public.team_members tm on tm."teamID" = t.id
    left join public.members m on m.id = tm."memberID"
    where t."eventID" = event_id;
$$;

create or replace function public.get_songs_with_material_id()
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

create or replace function public.get_tags_by_song(song_uuid uuid)
returns table (tag_name text)
language sql
stable
as $$
    select tg.name as tag_name
    from public.song_tags st
    join public.tags tg on tg.id = st.tag_id
    where st.song_id = song_uuid;
$$;

create or replace function public.add_tags_to_song(
    song_title text,
    song_author text,
    tag_ids uuid[]
)
returns void
language plpgsql
as $$
declare
    target_song_id uuid;
begin
    select id into target_song_id
    from public.songs
    where title = song_title and author = song_author
    limit 1;

    if target_song_id is null then
        raise exception 'No song found with title % and author %', song_title, song_author;
    end if;

    insert into public.song_tags (song_id, tag_id)
    select target_song_id, unnest(tag_ids)
    on conflict do nothing;
end;
$$;

create or replace function public.get_all_members_with_skills_and_roles()
returns table (
    id uuid,
    name text,
    email text,
    number text,
    skills text[],
    roles text[]
)
language sql
stable
as $$
    select
        m.id,
        m.name,
        m.email,
        m.number,
        coalesce(array_agg(distinct sk.name) filter (where sk.name is not null), '{}') as skills,
        coalesce(array_agg(distinct rl.name) filter (where rl.name is not null), '{}') as roles
    from public.members m
    left join public.member_skills ms on ms.member_id = m.id
    left join public.skills sk on sk.id = ms.skill_id
    left join public.member_roles mr on mr.member_id = m.id
    left join public.roles rl on rl.id = mr.role_id
    group by m.id, m.name, m.email, m.number;
$$;

-- =====================================================================
-- STEP 3: ROW LEVEL SECURITY
-- Your frontend only ever uses the anon key, never a service role key,
-- so RLS is what actually protects the data. This grants full access
-- to any authenticated (logged-in) user, matching the app's current
-- behavior (no per-user filtering exists in the client code). Tighten
-- later if you want per-user ownership enforced.
-- =====================================================================

alter table public.events enable row level security;
alter table public.members enable row level security;
alter table public.skills enable row level security;
alter table public.roles enable row level security;
alter table public.member_skills enable row level security;
alter table public.member_roles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.songs enable row level security;
alter table public.tags enable row level security;
alter table public.song_tags enable row level security;
alter table public.vocal_guides enable row level security;
alter table public.agenda_materials enable row level security;
alter table public.event_flow enable row level security;

do $$
declare
    t text;
begin
    for t in
        select unnest(array[
            'events','members','skills','roles','member_skills',
            'member_roles','teams','team_members','songs','tags',
            'song_tags','vocal_guides','agenda_materials','event_flow'
        ])
    loop
        execute format(
            'create policy "authenticated_full_access" on public.%I
             for all to authenticated using (true) with check (true)',
            t
        );
    end loop;
end $$;

-- =====================================================================
-- STEP 4: STORAGE BUCKET
-- songs.js uploads to a bucket literally named "songs" and calls
-- getPublicUrl() on it, so the bucket must be public.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('songs', 'songs', true)
on conflict (id) do nothing;

create policy "authenticated_can_upload_songs"
on storage.objects for insert to authenticated
with check (bucket_id = 'songs');

create policy "public_can_read_songs"
on storage.objects for select to public
using (bucket_id = 'songs');

insert into storage.buckets (id, name, public)
values ('vocal-guides', 'vocal-guides', true)
on conflict (id) do nothing;

create policy "authenticated_can_upload_vocal_guides"
on storage.objects for insert to authenticated
with check (bucket_id = 'vocal-guides');

create policy "public_can_read_vocal_guides"
on storage.objects for select to public
using (bucket_id = 'vocal-guides');
