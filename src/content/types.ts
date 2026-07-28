/**
 * AI-X Learn 콘텐츠 타입 시스템
 *
 * 강의 콘텐츠는 코드 내 TypeScript 데이터가 단일 소스(Single Source of Truth)입니다.
 * - 앱은 이 데이터를 직접 읽어 정적 렌더링합니다 (DB 왕복 없음, 데모 모드 완전 동작).
 * - `scripts/generate-seed.ts`가 동일 데이터를 Supabase 시드 SQL로 변환합니다.
 *
 * 일러스트는 이미지 파일이 아닌 구조화된 데이터로 정의하며,
 * `src/components/illustrations/` 의 렌더러가 일관된 스타일로 그립니다.
 */

import type { DemoScene } from "./demo-types";

export type * from "./demo-types";

export type Category = "dev" | "creative" | "business";

export type Level = "beginner" | "intermediate" | "advanced";

/** 일러스트에서 사용할 수 있는 아이콘 키 (lucide-react 매핑은 icon-map.tsx 참고) */
export type IconKey =
  | "bot"
  | "brain"
  | "sparkles"
  | "code"
  | "terminal"
  | "git-branch"
  | "database"
  | "server"
  | "cloud"
  | "cpu"
  | "search"
  | "file-text"
  | "image"
  | "video"
  | "music"
  | "mic"
  | "palette"
  | "wand"
  | "layers"
  | "workflow"
  | "zap"
  | "repeat"
  | "check"
  | "x"
  | "alert"
  | "shield"
  | "lock"
  | "key"
  | "user"
  | "users"
  | "message"
  | "send"
  | "mail"
  | "globe"
  | "link"
  | "settings"
  | "wrench"
  | "test-tube"
  | "gauge"
  | "chart"
  | "trending-up"
  | "dollar"
  | "shopping-cart"
  | "book"
  | "graduation-cap"
  | "lightbulb"
  | "target"
  | "rocket"
  | "clock"
  | "calendar"
  | "clipboard"
  | "download"
  | "upload"
  | "refresh"
  | "eye"
  | "filter"
  | "scissors"
  | "camera"
  | "play"
  | "smartphone"
  | "monitor";

/** 노드/레이어/컬럼의 시각적 강조 톤 */
export type Tone = "primary" | "accent" | "success" | "warning" | "muted";

/* ---------------------------------- 일러스트 ---------------------------------- */

/** 수직 플로우차트: 노드가 위→아래로 흐르고, 선택적으로 루프백 화살표 표시 */
export interface FlowIllustration {
  type: "flow";
  title: string;
  nodes: {
    label: string;
    sublabel?: string;
    icon?: IconKey;
    tone?: Tone;
    /** 이 노드로 들어오는 화살표 위에 표시할 라벨 */
    edgeLabel?: string;
  }[];
  /** 루프백 화살표: to(인덱스) 노드에서 from(인덱스) 노드로 되돌아감 */
  loopBack?: { from: number; to: number; label: string };
  caption?: string;
}

/** 순환 사이클: 3~6개 노드가 원형으로 순환 (피드백 루프 등) */
export interface CycleIllustration {
  type: "cycle";
  title: string;
  nodes: { label: string; sublabel?: string; icon?: IconKey }[];
  /** 중앙에 표시할 텍스트 */
  center?: string;
  caption?: string;
}

/** 2~3개 컬럼 비교 (예: Before/After, 도구 A vs B) */
export interface CompareIllustration {
  type: "compare";
  title: string;
  columns: {
    title: string;
    icon?: IconKey;
    tone?: Tone;
    items: string[];
  }[];
  caption?: string;
}

/** 레이어드 아키텍처 스택 (위 = 사용자에 가까운 층) */
export interface StackIllustration {
  type: "stack";
  title: string;
  layers: {
    label: string;
    sublabel?: string;
    icon?: IconKey;
    tone?: Tone;
  }[];
  caption?: string;
}

/** 번호가 붙은 순서 카드 (실습 절차 등) */
export interface StepsIllustration {
  type: "steps";
  title: string;
  steps: { label: string; sublabel?: string; icon?: IconKey }[];
  caption?: string;
}

/** 아이콘 + 라벨 그리드 (도구 모음, 개념 지도) */
export interface GridIllustration {
  type: "grid";
  title: string;
  items: { label: string; sublabel?: string; icon?: IconKey; tone?: Tone }[];
  caption?: string;
}

/** 터미널/코드 윈도우 목업 */
export interface TerminalIllustration {
  type: "terminal";
  title?: string;
  windowTitle: string;
  lines: {
    text: string;
    /** cmd: $ 프롬프트, out: 일반 출력, ok/err: 성공/실패, dim: 흐리게, comment: 주석 */
    tone?: "cmd" | "out" | "ok" | "err" | "dim" | "comment";
  }[];
  caption?: string;
}

/** 프롬프트 ↔ AI 대화 버블 (프롬프트 엔지니어링 예시) */
export interface ChatIllustration {
  type: "chat";
  title?: string;
  messages: { role: "user" | "ai" | "system"; text: string }[];
  caption?: string;
}

export type Illustration =
  | FlowIllustration
  | CycleIllustration
  | CompareIllustration
  | StackIllustration
  | StepsIllustration
  | GridIllustration
  | TerminalIllustration
  | ChatIllustration;

/* ---------------------------------- 강의 구조 ---------------------------------- */

export interface Lesson {
  /** 코스 내에서 유일한 URL 슬러그 (kebab-case) */
  slug: string;
  title: string;
  /** 예상 학습 시간 (분) */
  minutes: number;
  /** 마크다운 본문 — 텍스트 최소화, 핵심 개념 위주 (GFM 지원) */
  content: string;
  /** 우측(모바일에서는 상단)에 고정 배치될 일러스트 */
  illustration: Illustration;
  /** 따라하기 데모 (시뮬레이션 스크린캐스트) — 있으면 뷰어에 재생 탭 표시 */
  demo?: DemoScene;
}

export interface Module {
  slug: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  /** 전역 유일 URL 슬러그 */
  slug: string;
  title: string;
  /** 카드에 표시될 한 줄 요약 */
  subtitle: string;
  /** 상세 페이지 소개문 */
  description: string;
  category: Category;
  level: Level;
  tags: string[];
  /** 썸네일 그라디언트 (hex 2개) */
  gradient: [string, string];
  /** 썸네일 중앙 아이콘 */
  icon: IconKey;
  /** 이 강의에서 배우는 것 (상세 페이지 불릿) */
  outcomes: string[];
  modules: Module[];
}

/* ---------------------------------- 헬퍼 ---------------------------------- */

export const CATEGORY_META: Record<
  Category,
  { label: string; description: string }
> = {
  dev: {
    label: "AI 개발",
    description: "하네스, 루프 엔지니어링, RAG, AI 코딩 툴",
  },
  creative: {
    label: "크리에이티브",
    description: "AI 디자인, 영상 제작, 음악과 더빙",
  },
  business: {
    label: "비즈니스 자동화",
    description: "노코드 자동화, SNS 봇, 수익 창출",
  },
};

export const LEVEL_META: Record<Level, { label: string }> = {
  beginner: { label: "입문" },
  intermediate: { label: "중급" },
  advanced: { label: "심화" },
};

/** 코스의 총 레슨 수 */
export function countLessons(course: Course): number {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0);
}

/** 코스의 총 예상 학습 시간(분) */
export function totalMinutes(course: Course): number {
  return course.modules.reduce(
    (n, m) => n + m.lessons.reduce((s, l) => s + l.minutes, 0),
    0
  );
}

/** 코스 내 모든 레슨을 순서대로 평탄화 (모듈 정보 포함) */
export function flattenLessons(
  course: Course
): { lesson: Lesson; module: Module; index: number }[] {
  const out: { lesson: Lesson; module: Module; index: number }[] = [];
  let i = 0;
  for (const m of course.modules) {
    for (const l of m.lessons) {
      out.push({ lesson: l, module: m, index: i++ });
    }
  }
  return out;
}

/** 진도 저장에 사용하는 레슨 전역 키 */
export function lessonKey(courseSlug: string, lessonSlug: string): string {
  return `${courseSlug}/${lessonSlug}`;
}
