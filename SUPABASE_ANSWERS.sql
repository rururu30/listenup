-- ListenUp：回答を保存するテーブル
-- Supabase の「SQL Editor」に貼り付けて、Run を押してください（最初の1回だけ）。

create table if not exists public.answers (
  user_id     uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  week        text        not null,          -- questions.js の weekLabel（週ごとに回答を分ける）
  question_id text        not null,          -- 例: mon-1-1
  choice      smallint    check (choice between 0 and 3),   -- 選んだ番号。答えを見ただけなら null
  revealed    boolean     not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, week, question_id)
);

alter table public.answers enable row level security;

-- ログイン中の本人の行だけ、読む・追加・更新・削除できる
create policy "own rows select" on public.answers
  for select to authenticated using (user_id = auth.uid());
create policy "own rows insert" on public.answers
  for insert to authenticated with check (user_id = auth.uid());
create policy "own rows update" on public.answers
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own rows delete" on public.answers
  for delete to authenticated using (user_id = auth.uid());
