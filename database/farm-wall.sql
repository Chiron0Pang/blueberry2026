create schema farm_wall_private;
revoke all on schema farm_wall_private from public, anon, authenticated;

create table farm_wall_private.posts (
  id uuid primary key,
  display_name text not null check (char_length(display_name) between 1 and 40),
  message text not null check (char_length(message) between 1 and 1000),
  photo bytea check (octet_length(photo) <= 327680),
  created_at timestamptz not null default clock_timestamp()
);
create index farm_wall_posts_date on farm_wall_private.posts (created_at desc, id desc);

create table farm_wall_private.admins (user_id uuid primary key references auth.users(id) on delete cascade);
create table farm_wall_private.post_events (
  created_at timestamptz not null default clock_timestamp(),
  client_hash text
);
alter table farm_wall_private.posts enable row level security;
alter table farm_wall_private.admins enable row level security;
alter table farm_wall_private.post_events enable row level security;

create function public.farm_wall_list(before_time timestamptz default null, before_id uuid default null)
returns table (id uuid, display_name text, message text, created_at timestamptz, has_photo boolean)
language sql stable security definer set search_path = ''
as $$
  select p.id, p.display_name, p.message, p.created_at, p.photo is not null
  from farm_wall_private.posts p
  where before_time is null or (p.created_at, p.id) < (before_time, before_id)
  order by p.created_at desc, p.id desc
  limit 12
$$;

create function public.farm_wall_photo(post_id uuid)
returns text
language sql stable security definer set search_path = ''
as $$
  select pg_catalog.replace(pg_catalog.encode(p.photo, 'base64'), E'\n', '')
  from farm_wall_private.posts p where p.id = post_id
$$;

create function public.farm_wall_post(post_id uuid, name_text text, message_text text, photo_base64 text default null)
returns uuid
language plpgsql security definer set search_path = ''
as $
declare
  clean_name text := pg_catalog.regexp_replace(name_text, '^[[:space:]]+|[[:space:]]+

create function public.farm_wall_is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((auth.jwt()->>'aal') in ('aal1', 'aal2'), false)
    and exists (select 1 from farm_wall_private.admins a where a.user_id = auth.uid())
$$;

create function public.farm_wall_delete(post_id uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.farm_wall_is_admin() then raise insufficient_privilege; end if;
  delete from farm_wall_private.posts p where p.id = post_id;
  return found;
end
$$;

revoke execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text), public.farm_wall_is_admin(), public.farm_wall_delete(uuid) from public, anon, authenticated;
grant execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text) to anon, authenticated;
grant execute on function public.farm_wall_is_admin(), public.farm_wall_delete(uuid) to authenticated;
, '', 'g');
  clean_message text := pg_catalog.regexp_replace(message_text, '^[[:space:]]+|[[:space:]]+

create function public.farm_wall_is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((auth.jwt()->>'aal') in ('aal1', 'aal2'), false)
    and exists (select 1 from farm_wall_private.admins a where a.user_id = auth.uid())
$$;

create function public.farm_wall_delete(post_id uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.farm_wall_is_admin() then raise insufficient_privilege; end if;
  delete from farm_wall_private.posts p where p.id = post_id;
  return found;
end
$$;

revoke execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text), public.farm_wall_is_admin(), public.farm_wall_delete(uuid) from public, anon, authenticated;
grant execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text) to anon, authenticated;
grant execute on function public.farm_wall_is_admin(), public.farm_wall_delete(uuid) to authenticated;
, '', 'g');
  image_bytes bytea;
  headers jsonb := coalesce(nullif(pg_catalog.current_setting('request.headers', true), ''), '{}')::jsonb;
  requester_hash text := pg_catalog.md5(nullif(headers->>'cf-connecting-ip', ''));
begin
  if post_id is null or clean_name is null or clean_message is null
    or char_length(clean_name) not between 1 and 40
    or char_length(clean_message) not between 1 and 1000
  then raise exception 'invalid_post'; end if;

  if photo_base64 is not null then
    if char_length(photo_base64) not between 8 and 436908 then raise exception 'invalid_photo'; end if;
    image_bytes := pg_catalog.decode(photo_base64, 'base64');
    if octet_length(image_bytes) not between 5 and 327680
      or substring(image_bytes from 1 for 3) <> pg_catalog.decode('ffd8ff', 'hex')
      or substring(image_bytes from octet_length(image_bytes) - 1) <> pg_catalog.decode('ffd9', 'hex')
    then raise exception 'invalid_photo'; end if;
  end if;

  perform pg_catalog.pg_advisory_xact_lock(495210613);
  if exists (select 1 from farm_wall_private.posts p where p.id = post_id) then return post_id; end if;
  delete from farm_wall_private.post_events e where e.created_at < now() - interval '1 day';
  if (select count(*) from farm_wall_private.post_events) >= 80
    or (select count(*) from farm_wall_private.post_events e where e.created_at >= now() - interval '10 minutes') >= 20
    or (requester_hash is not null and (select count(*) from farm_wall_private.post_events e
        where e.client_hash = requester_hash and e.created_at >= now() - interval '10 minutes') >= 8)
  then raise exception 'wall_rate_limit'; end if;
  if (select count(*) from farm_wall_private.posts) >= 1000 then raise exception 'wall_full'; end if;

  insert into farm_wall_private.posts (id, display_name, message, photo)
    values (post_id, clean_name, clean_message, image_bytes);
  insert into farm_wall_private.post_events values (clock_timestamp(), requester_hash);
  return post_id;
end
$;

create function public.farm_wall_is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((auth.jwt()->>'aal') in ('aal1', 'aal2'), false)
    and exists (select 1 from farm_wall_private.admins a where a.user_id = auth.uid())
$$;

create function public.farm_wall_delete(post_id uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.farm_wall_is_admin() then raise insufficient_privilege; end if;
  delete from farm_wall_private.posts p where p.id = post_id;
  return found;
end
$$;

revoke execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text), public.farm_wall_is_admin(), public.farm_wall_delete(uuid) from public, anon, authenticated;
grant execute on function public.farm_wall_list(timestamptz, uuid), public.farm_wall_photo(uuid), public.farm_wall_post(uuid, text, text, text) to anon, authenticated;
grant execute on function public.farm_wall_is_admin(), public.farm_wall_delete(uuid) to authenticated;
