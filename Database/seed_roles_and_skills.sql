-- Seeds starter roles and skills. Safe to re-run: skips any name that already exists.
-- More can be added later from the Members page in the app.

insert into public.roles (name)
select t.name
from (
    values
        ('Leadership'),
        ('Tech'),
        ('Worship')
) as t(name)
where not exists (
    select 1 from public.roles where roles.name = t.name
);

insert into public.skills (name)
select t.name
from (
    values
        ('Singing'),
        ('Dancing'),
        ('Tech')
) as t(name)
where not exists (
    select 1 from public.skills where skills.name = t.name
);
