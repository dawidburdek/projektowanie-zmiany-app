create table query_reads (
  user_id uuid references auth.users(id) on delete cascade,
  query_id uuid references queries(id) on delete cascade,
  last_read_at timestamptz not null default now(),
  primary key (user_id, query_id)
);

alter table query_reads enable row level security;

create policy "Users can read their own reads"
  on query_reads for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reads"
  on query_reads for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reads"
  on query_reads for update
  using (auth.uid() = user_id);
