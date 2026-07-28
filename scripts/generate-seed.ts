/**
 * 콘텐츠(TypeScript 데이터) → Supabase 시드 SQL 생성기
 *
 * 실행: npm run seed:generate
 * 출력: supabase/seed.sql
 *
 * - 코스/모듈/레슨 ID는 슬러그 기반 결정적 UUID(md5)로 생성되어
 *   여러 번 실행해도 같은 ID가 유지됩니다 (upsert).
 * - 마크다운/JSON 본문은 달러 인용($aix$)으로 감싸 이스케이프 문제를 차단합니다.
 */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COURSES } from "../src/content";
import { flattenLessons, lessonKey } from "../src/content/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "supabase", "seed.sql");

/** 슬러그 → 결정적 UUID (md5 해시를 UUID 형식으로 포맷) */
function uuidOf(namespace: string, slug: string): string {
  const h = createHash("md5").update(`aix:${namespace}:${slug}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

function q(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

/** 본문용 달러 인용 — 태그 충돌 시 예외 발생으로 조기 감지 */
function dq(value: string): string {
  if (value.includes("$aix$")) {
    throw new Error("본문에 $aix$ 시퀀스가 포함되어 달러 인용이 불가합니다.");
  }
  return `$aix$${value}$aix$`;
}

function textArray(values: string[]): string {
  return `array[${values.map(q).join(", ")}]::text[]`;
}

const lines: string[] = [
  "-- AI-X Learn 콘텐츠 시드 (scripts/generate-seed.ts 로 자동 생성 — 직접 수정 금지)",
  "-- 0001_init.sql 적용 후 실행하세요. 여러 번 실행해도 안전합니다 (upsert).",
  "begin;",
];

for (const course of COURSES) {
  const courseId = uuidOf("course", course.slug);
  lines.push(
    "",
    `-- 강의: ${course.title}`,
    `insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (`,
    `  '${courseId}', ${q(course.slug)}, ${q(course.title)}, ${dq(course.description)},`,
    `  null, ${q(course.category)}, ${q(course.level)}, ${textArray(course.tags)}`,
    `) on conflict (id) do update set`,
    `  title = excluded.title, description = excluded.description,`,
    `  category = excluded.category, level = excluded.level, tags = excluded.tags;`
  );

  course.modules.forEach((module, mi) => {
    const moduleId = uuidOf("module", `${course.slug}/${module.slug}`);
    lines.push(
      `insert into public.modules (id, course_id, slug, title, order_index) values (`,
      `  '${moduleId}', '${courseId}', ${q(module.slug)}, ${q(module.title)}, ${mi}`,
      `) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;`
    );
  });

  for (const { lesson, module, index } of flattenLessons(course)) {
    const moduleId = uuidOf("module", `${course.slug}/${module.slug}`);
    const lessonId = uuidOf("lesson", `${course.slug}/${lesson.slug}`);
    const key = lessonKey(course.slug, lesson.slug);
    const demoSql = lesson.demo
      ? `${dq(JSON.stringify(lesson.demo))}::jsonb`
      : "null";
    lines.push(
      `insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (`,
      `  '${lessonId}', '${moduleId}', ${q(key)}, ${q(lesson.slug)}, ${q(lesson.title)},`,
      `  ${dq(lesson.content)},`,
      `  ${dq(JSON.stringify(lesson.illustration))}::jsonb, ${demoSql}, ${lesson.minutes}, ${index}`,
      `) on conflict (id) do update set`,
      `  title = excluded.title, content_markdown = excluded.content_markdown,`,
      `  illustration = excluded.illustration, demo = excluded.demo,`,
      `  minutes = excluded.minutes, order_index = excluded.order_index;`
    );
  }
}

lines.push("", "commit;", "");

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, lines.join("\n"), "utf8");

const totalLessons = COURSES.reduce((n, c) => n + flattenLessons(c).length, 0);
console.log(
  `seed.sql 생성 완료: 강의 ${COURSES.length}개, 레슨 ${totalLessons}개 → ${OUT}`
);
