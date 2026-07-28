"use client";

import { getSupabaseBrowser } from "./supabase/client";
import { lessonKey } from "@/content/types";

/**
 * 진도 원격 동기화 — Supabase가 설정되고 로그인된 경우에만 동작하며,
 * 아니면 조용히 no-op 합니다 (데모 모드).
 *
 * user_progress 테이블은 (user_id, lesson_key) 유니크 제약으로 upsert합니다.
 * lesson_key = "courseSlug/lessonSlug" (시드 SQL의 lessons.key와 동일).
 */

export async function pushCompletion(
  courseSlug: string,
  lessonSlug: string,
  completedAt: string
): Promise<void> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      lesson_key: lessonKey(courseSlug, lessonSlug),
      completed: true,
      completed_at: completedAt,
    },
    { onConflict: "user_id,lesson_key" }
  );
}

/** 로그인 시 원격 완료 기록을 내려받아 로컬 스토어에 병합할 때 사용 */
export async function pullCompletions(): Promise<
  { key: string; completedAt: string }[]
> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return [];
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_key, completed_at")
    .eq("user_id", user.id)
    .eq("completed", true);

  if (error || !data) return [];
  return data.map((r) => ({
    key: r.lesson_key as string,
    completedAt: (r.completed_at as string) ?? new Date().toISOString(),
  }));
}
