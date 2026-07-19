-- Seeds the tags table with common worship song themes.
-- Safe to re-run: skips any name that already exists.

insert into public.tags (name)
select t.name
from (
    values
        ('faith'),
        ('hope'),
        ('love'),
        ('grace'),
        ('salvation'),
        ('praise'),
        ('worship'),
        ('surrender'),
        ('healing'),
        ('forgiveness'),
        ('joy'),
        ('peace'),
        ('strength'),
        ('comfort'),
        ('redemption'),
        ('freedom'),
        ('thanksgiving'),
        ('trust'),
        ('victory'),
        ('glory')
) as t(name)
where not exists (
    select 1 from public.tags where tags.name = t.name
);
