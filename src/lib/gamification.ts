import type { Course } from "@/content/types";
import { courseProgress } from "@/store/progress";

/**
 * 게이미피케이션 파생 로직 — 진도 스토어의 completed 맵에서 스트릭/배지를 계산합니다.
 * 별도 저장 없이 항상 파생 계산하므로 데이터 불일치가 없습니다.
 */

/** ISO 타임스탬프 → 로컬 날짜 키 (YYYY-MM-DD) */
export function toDayKey(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shiftDay(key: string, delta: number): string {
  const d = new Date(`${key}T12:00:00`);
  d.setDate(d.getDate() + delta);
  return toDayKey(d.toISOString());
}

/** 일별 완료 레슨 수 */
export function dailyCounts(completed: Record<string, string>): Map<string, number> {
  const map = new Map<string, number>();
  for (const iso of Object.values(completed)) {
    const key = toDayKey(iso);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

/** 오늘(또는 어제)까지 이어진 연속 학습 일수 */
export function currentStreak(completed: Record<string, string>): number {
  const days = new Set(dailyCounts(completed).keys());
  if (days.size === 0) return 0;
  const today = toDayKey(new Date().toISOString());
  // 오늘 학습했으면 오늘부터, 아니면 어제부터 역산
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  if (!days.has(cursor)) return 0;
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

/** 역대 최장 스트릭 */
export function longestStreak(completed: Record<string, string>): number {
  const days = [...dailyCounts(completed).keys()].sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of days) {
    run = prev !== null && shiftDay(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  return best;
}

/* ---------------------------------- 배지 ---------------------------------- */

export interface BadgeContext {
  completed: Record<string, string>;
  courses: Course[];
}

export interface BadgeDef {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: (ctx: BadgeContext) => boolean;
}

function completedCount(ctx: BadgeContext): number {
  return Object.keys(ctx.completed).length;
}

function finishedCourses(ctx: BadgeContext): Course[] {
  return ctx.courses.filter((c) => {
    const p = courseProgress(ctx.completed, c);
    return p.total > 0 && p.done === p.total;
  });
}

function touchedCategories(ctx: BadgeContext): Set<string> {
  const set = new Set<string>();
  for (const c of ctx.courses) {
    if (courseProgress(ctx.completed, c).done > 0) set.add(c.category);
  }
  return set;
}

export const BADGES: BadgeDef[] = [
  {
    id: "first-step",
    emoji: "🌱",
    title: "첫 걸음",
    description: "첫 레슨을 완료했어요",
    earned: (ctx) => completedCount(ctx) >= 1,
  },
  {
    id: "ten-steps",
    emoji: "🔥",
    title: "몰입 시작",
    description: "레슨 10개 완료",
    earned: (ctx) => completedCount(ctx) >= 10,
  },
  {
    id: "thirty-steps",
    emoji: "⚡",
    title: "꾸준함의 힘",
    description: "레슨 30개 완료",
    earned: (ctx) => completedCount(ctx) >= 30,
  },
  {
    id: "first-course",
    emoji: "🏆",
    title: "첫 완주",
    description: "강의 1개를 끝까지 완료",
    earned: (ctx) => finishedCourses(ctx).length >= 1,
  },
  {
    id: "three-courses",
    emoji: "👑",
    title: "마스터의 길",
    description: "강의 3개 완주",
    earned: (ctx) => finishedCourses(ctx).length >= 3,
  },
  {
    id: "streak-3",
    emoji: "📅",
    title: "삼일 연속",
    description: "3일 연속 학습",
    earned: (ctx) => currentStreak(ctx.completed) >= 3 || longestStreak(ctx.completed) >= 3,
  },
  {
    id: "streak-7",
    emoji: "🚀",
    title: "일주일 루틴",
    description: "7일 연속 학습",
    earned: (ctx) => currentStreak(ctx.completed) >= 7 || longestStreak(ctx.completed) >= 7,
  },
  {
    id: "explorer",
    emoji: "🧭",
    title: "탐험가",
    description: "세 트랙(개발·크리에이티브·비즈니스) 모두 학습",
    earned: (ctx) => touchedCategories(ctx).size >= 3,
  },
];
