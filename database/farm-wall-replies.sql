create table farm_wall_private.replies (
  id uuid primary key,
  parent_id uuid not null references farm_wall_private.posts(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  message text not null check (char_length(message) between 1 and 1000),
  created_at timestamptz not null default clock_timestamp()
);
create index farm_wall_replies_thread on farm_wall_private.replies (parent_id, created_at desc, id desc);
create table farm_wall_private.reply_events (
  created_at timestamptz not null default clock_timestamp(),
  client_hash text
);
alter table farm_wall_private.replies enable row level security;
alter table farm_wall_private.reply_events enable row level security;

create function public.farm_wall_reply_list(post_id uuid, before_time timestamptz default null, before_id uuid default null)
returns table (id uuid, display_name text, message text, created_at timestamptz)
language sql stable security definer set search_path = ''
as $$
  select r.id, r.display_name, r.message, r.created_at
  from farm_wall_private.replies r
  where r.parent_id = post_id
    and (before_time is null or (r.created_at, r.id) < (before_time, before_id))
  order by r.created_at desc, r.id desc
  limit 20
$$;

create function public.farm_wall_reply_post(post_id uuid, reply_id uuid, name_text text, message_text text)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  clean_name text := pg_catalog.regexp_replace(name_text, '^[[:space:]]+|[[:space:]]+$', '', 'g');
  clean_message text := pg_catalog.regexp_replace(message_text, '^[[:space:]]+|[[:space:]]+$', '', 'g');
  headers jsonb := coalesce(nullif(pg_catalog.current_setting('request.headers', true), ''), '{}')::jsonb;
  requester_hash text := pg_catalog.md5(nullif(headers->>'cf-connecting-ip', ''));
begin
  if post_id is null or reply_id is null or clean_name is null or clean_message is null
    or char_length(clean_name) not between 1 and 40
    or char_length(clean_message) not between 1 and 1000
  then raise exception 'invalid_reply'; end if;

  perform pg_catalog.pg_advisory_xact_lock(495210614);
  perform 1 from farm_wall_private.posts p where p.id = post_id for key share;
  if not found then raise exception 'post_missing'; end if;
  if exists (select 1 from farm_wall_private.replies r where r.id = reply_id and r.parent_id = post_id) then
    return reply_id;
  end if;
  delete from farm_wall_private.reply_events e where e.created_at < now() - interval '1 day';
  if (select count(*) from farm_wall_private.reply_events) >= 120
    or (select count(*) from farm_wall_private.reply_events e where e.created_at >= now() - interval '10 minutes') >= 30
    or (requester_hash is not null and (select count(*) from farm_wall_private.reply_events e
      where e.client_hash = requester_hash and e.created_at >= now() - interval '10 minutes') >= 10)
  then raise exception 'wall_rate_limit'; end if;
  if (select count(*) from farm_wall_private.replies r where r.parent_id = post_id) >= 250
  then raise exception 'thread_full'; end if;

  insert into farm_wall_private.replies (id, parent_id, display_name, message)
    values (reply_id, post_id, clean_name, clean_message);
  insert into farm_wall_private.reply_events values (clock_timestamp(), requester_hash);
  return reply_id;
end
$$;

create function public.farm_wall_reply_delete(reply_id uuid)
returns boolean
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.farm_wall_is_admin() then raise insufficient_privilege; end if;
  delete from farm_wall_private.replies r where r.id = reply_id;
  return found;
end
$$;

revoke execute on function public.farm_wall_reply_list(uuid, timestamptz, uuid), public.farm_wall_reply_post(uuid, uuid, text, text), public.farm_wall_reply_delete(uuid) from public, anon, authenticated;
grant execute on function public.farm_wall_reply_list(uuid, timestamptz, uuid), public.farm_wall_reply_post(uuid, uuid, text, text) to anon, authenticated;
grant execute on function public.farm_wall_reply_delete(uuid) to authenticated;
