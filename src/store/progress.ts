"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { lessonKey, type Course } from "@/content/types";
import { countLessons, flattenLessons } from "@/content/types";
import { pushCompletion } from "@/lib/progress-sync";

/**
 * 학습 진도 스토어
 *
 * - 기본: localStorage에 영속화 (데모/게스트 모드에서 완전 동작)
 * - Supabase 로그인 상태면 완료 이벤트를 user_progress 테이블에도 동기화
 */

interface ProgressState {
  /** 완료된 레슨: "courseSlug/lessonSlug" -> 완료 시각 ISO */
  completed: Record<string, string>;
  /** 코스별 마지막으로 본 레슨 슬러그 (이어보기) */
  lastLesson: Record<string, string>;
  /** 수강 시작한 코스: courseSlug -> 시작 시각 ISO */
  enrolled: Record<string, string>;
  /** 코스별 마지막 방문 시각 (대시보드 '이어보기' 정렬용) */
  lastVisitedAt: Record<string, string>;
  /** persist 재수화 완료 여부 (SSR 하이드레이션 가드) */
  hydrated: boolean;

  markComplete: (courseSlug: string, lessonSlug: string) => void;
  markVisited: (courseSlug: string, lessonSlug: string) => void;
  /** 원격(user_progress)에서 가져온 완료 기록 병합 */
  mergeRemote: (rows: { key: string; completedAt: string }[]) => void;
  resetAll: () => void;
  setHydrated: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      lastLesson: {},
      enrolled: {},
      lastVisitedAt: {},
      hydrated: false,

      markComplete: (courseSlug, lessonSlug) => {
        const key = lessonKey(courseSlug, lessonSlug);
        if (get().completed[key]) return;
        const now = new Date().toISOString();
        set((s) => ({ completed: { ...s.completed, [key]: now } }));
        // Supabase 미설정/비로그인 시 내부에서 no-op
        void pushCompletion(courseSlug, lessonSlug, now);
      },

      markVisited: (courseSlug, lessonSlug) => {
        const now = new Date().toISOString();
        set((s) => ({
          lastLesson: { ...s.lastLesson, [courseSlug]: lessonSlug },
          lastVisitedAt: { ...s.lastVisitedAt, [courseSlug]: now },
          enrolled: s.enrolled[courseSlug]
            ? s.enrolled
            : { ...s.enrolled, [courseSlug]: now },
        }));
      },

      mergeRemote: (rows) => {
        set((s) => {
          const merged = { ...s.completed };
          for (const r of rows) {
            if (!merged[r.key]) merged[r.key] = r.completedAt;
          }
          return { completed: merged };
        });
      },

      resetAll: () =>
        set({ completed: {}, lastLesson: {}, enrolled: {}, lastVisitedAt: {} }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "aix-progress",
      partialize: (s) => ({
        completed: s.completed,
        lastLesson: s.lastLesson,
        enrolled: s.enrolled,
        lastVisitedAt: s.lastVisitedAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

/* ---------------------------------- 파생 셀렉터 ---------------------------------- */

export function isLessonDone(
  completed: Record<string, string>,
  courseSlug: string,
  lessonSlug: string
): boolean {
  return Boolean(completed[lessonKey(courseSlug, lessonSlug)]);
}

export interface CourseProgress {
  done: number;
  total: number;
  pct: number;
}

export function courseProgress(
  completed: Record<string, string>,
  course: Course
): CourseProgress {
  const total = countLessons(course);
  const done = flattenLessons(course).filter(({ lesson }) =>
    isLessonDone(completed, course.slug, lesson.slug)
  ).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

/** 이어보기 대상: 마지막 방문 레슨, 없으면 첫 미완료 레슨, 다 들었으면 첫 레슨 */
export function resumeLessonSlug(
  state: Pick<ProgressState, "completed" | "lastLesson">,
  course: Course
): string {
  const last = state.lastLesson[course.slug];
  if (last) return last;
  const firstIncomplete = flattenLessons(course).find(
    ({ lesson }) => !isLessonDone(state.completed, course.slug, lesson.slug)
  );
  return (
    firstIncomplete?.lesson.slug ?? course.modules[0]?.lessons[0]?.slug ?? ""
  );
}
