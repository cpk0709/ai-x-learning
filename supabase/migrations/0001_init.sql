-- AI-X Learn 초기 스키마 (PRD 5개 테이블 + RLS)
-- Supabase SQL Editor 또는 `supabase db push`로 실행하세요.

-- 1. users — auth.users를 미러링하는 공개 프로필 (PRD의 users 테이블)
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text,
  created_at timestamptz not null default now()
);

-- 가입 시 자동으로 프로필 생성
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. courses — 강의 대분류
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  thumbnail_url text,
  category text not null check (category in ('dev', 'creative', 'business')),
  level text not null default 'beginner' check (level in ('beginner', 'intermediate', 'advanced')),
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- 3. modules — 강의 내 챕터
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  slug text not null,
  title text not null,
  order_index integer not null default 0,
  unique (course_id, slug)
);

-- 4. lessons — 상세 스텝
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  -- 앱에서 사용하는 전역 키: "courseSlug/lessonSlug"
  key text not null unique,
  slug text not null,
  title text not null,
  content_markdown text not null default '',
  -- 구조화된 일러스트 데이터 (앱 렌더러가 그림). 외부 이미지 사용 시 illustration_url 활용.
  illustration jsonb,
  illustration_url text,
  minutes integer not null default 5,
  order_index integer not null default 0
);

create index if not exists lessons_module_idx on public.lessons (module_id, order_index);

-- 5. user_progress — 진도 트래킹
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_key text not null references public.lessons (key) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, lesson_key)
);

create index if not exists user_progress_user_idx on public.user_progress (user_id);

-- ---------------------------------- RLS ----------------------------------

alter table public.users enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;

-- 콘텐츠는 누구나 읽기 가능 (쓰기는 service_role만)
create policy "courses_public_read" on public.courses for select using (true);
create policy "modules_public_read" on public.modules for select using (true);
create policy "lessons_public_read" on public.lessons for select using (true);

-- 프로필: 본인 것만 조회/수정
create policy "users_own_read" on public.users for select using (auth.uid() = id);
create policy "users_own_update" on public.users for update using (auth.uid() = id);

-- 진도: 본인 행만 CRUD
create policy "progress_own_select" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "progress_own_insert" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_own_update" on public.user_progress
  for update using (auth.uid() = user_id);
create policy "progress_own_delete" on public.user_progress
  for delete using (auth.uid() = user_id);
