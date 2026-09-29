-- 카테고리 확장: realestate(부동산, 2026-07), devops(인프라 & DevOps, 2026-09)
-- 0001의 check 제약이 dev/creative/business만 허용해 seed.sql 적용이 실패하던 문제 수정.
alter table public.courses drop constraint if exists courses_category_check;
alter table public.courses
  add constraint courses_category_check
  check (category in ('dev', 'devops', 'creative', 'business', 'realestate'));
