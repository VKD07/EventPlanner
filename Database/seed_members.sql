-- Seeds sample members. Safe to re-run: skips any name that already exists.

insert into public.members (name)
select t.name
from (
    values
        ('Darwin'),
        ('Aileen'),
        ('Lydia'),
        ('Myla'),
        ('Alfred'),
        ('Meshil')
) as t(name)
where not exists (
    select 1 from public.members where members.name = t.name
);
