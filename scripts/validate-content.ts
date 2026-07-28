/**
 * 콘텐츠 무결성 검증기
 *
 * 실행: npm run content:check
 *
 * 타입체크가 잡지 못하는 콘텐츠 오류를 잡습니다:
 * - 데모 액션의 target/from/to가 앱에 존재하지 않는 요소 id를 참조 (오타 시 데모가 조용히 깨짐)
 * - 데모 내 요소 id 중복
 * - reveal 대상이 hidden이 아님 / hidden 요소가 어떤 액션으로도 등장하지 않음
 * - 코스/레슨 슬러그 중복
 */
import { COURSES } from "../src/content";
import type { DemoApp, DemoScene } from "../src/content/types";

let errors = 0;
let warnings = 0;

function err(where: string, msg: string) {
  errors++;
  console.error(`  ✕ [${where}] ${msg}`);
}
function warn(where: string, msg: string) {
  warnings++;
  console.warn(`  ⚠ [${where}] ${msg}`);
}

/** 앱의 모든 요소 id와, 기본 숨김(hidden) id 수집 */
function collectIds(app: DemoApp): { ids: string[]; hidden: Set<string> } {
  const ids: string[] = [];
  const hidden = new Set<string>();
  const push = (id: string, isHidden?: boolean) => {
    ids.push(id);
    if (isHidden) hidden.add(id);
  };
  switch (app.kind) {
    case "code-editor":
      app.files.forEach((e) => push(e.id));
      app.code.forEach((e) => push(e.id, e.hidden));
      app.terminal?.forEach((e) => push(e.id, e.hidden));
      break;
    case "browser":
      app.blocks.forEach((e) => push(e.id, e.hidden));
      break;
    case "design-canvas":
      app.tools.forEach((e) => push(e.id));
      app.objects.forEach((e) => push(e.id, e.hidden));
      break;
    case "automation-canvas":
      app.nodes.forEach((e) => push(e.id, e.hidden));
      app.runLog?.forEach((e) => push(e.id, e.hidden));
      break;
    case "chat-app":
      app.channels.forEach((e) => push(e.id));
      app.messages.forEach((e) => push(e.id, e.hidden));
      if (app.composerId) push(app.composerId);
      break;
    case "email-app":
      app.folders.forEach((e) => push(e.id));
      app.emails.forEach((e) => push(e.id, e.hidden));
      if (app.compose) {
        push(app.compose.id, true);
        push(app.compose.toId);
        push(app.compose.subjectId);
        push(app.compose.bodyId);
        push(app.compose.sendId);
      }
      break;
  }
  return { ids, hidden };
}

function validateDemo(where: string, demo: DemoScene) {
  const { ids, hidden } = collectIds(demo.app);
  const idSet = new Set(ids);

  // id 중복
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) err(where, `요소 id 중복: "${id}"`);
    seen.add(id);
  }

  // 액션 참조 검증
  const referenced = new Set<string>();
  const shown = new Set<string>();
  demo.actions.forEach((a, i) => {
    const refs: string[] = [];
    if ("target" in a && a.target) refs.push(a.target);
    if (a.t === "drag") refs.push(a.from, a.to);
    for (const ref of refs) {
      referenced.add(ref);
      if (!idSet.has(ref)) {
        err(where, `액션 #${i + 1} (${a.t})이 존재하지 않는 id 참조: "${ref}"`);
      }
    }
    if (a.t === "reveal" || a.t === "type") shown.add((a as { target: string }).target);
    if (a.t === "reveal" && idSet.has(a.target) && !hidden.has(a.target)) {
      warn(where, `reveal 대상 "${a.target}"이 hidden이 아닙니다 (hide 후 재등장 용도면 무시)`);
    }
  });

  // 등장 경로 없는 hidden 요소
  const hasHide = demo.actions.some((a) => a.t === "hide");
  for (const id of hidden) {
    if (!shown.has(id) && !hasHide) {
      warn(where, `hidden 요소 "${id}"를 등장시키는 reveal/type 액션이 없습니다`);
    }
  }

  if (demo.actions.length < 8) {
    warn(where, `액션이 ${demo.actions.length}개로 너무 적습니다 (권장 15~25)`);
  }
}

/* ---------------------------------- 실행 ---------------------------------- */

const courseSlugs = new Set<string>();
let demoCount = 0;
let lessonCount = 0;

for (const course of COURSES) {
  if (courseSlugs.has(course.slug)) err(course.slug, "코스 슬러그 중복");
  courseSlugs.add(course.slug);

  const lessonSlugs = new Set<string>();
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      lessonCount++;
      const where = `${course.slug}/${lesson.slug}`;
      if (lessonSlugs.has(lesson.slug)) err(where, "레슨 슬러그 중복");
      lessonSlugs.add(lesson.slug);
      if (lesson.demo) {
        demoCount++;
        validateDemo(where, lesson.demo);
      }
    }
  }
}

console.log(
  `\n검증 완료: 강의 ${COURSES.length}개 / 레슨 ${lessonCount}개 / 데모 ${demoCount}개 — 오류 ${errors}건, 경고 ${warnings}건`
);
if (errors > 0) process.exit(1);
