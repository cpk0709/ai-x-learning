-- 레슨에 "따라하기 데모"(시뮬레이션 스크린캐스트) 데이터 컬럼 추가
-- 구조는 src/content/demo-types.ts 의 DemoScene을 그대로 직렬화한 jsonb입니다.

alter table public.lessons
  add column if not exists demo jsonb;
