"use client";

import Link from "next/link";
import { Play, RotateCcw } from "lucide-react";
import type { Course } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  courseProgress,
  resumeLessonSlug,
  useProgressStore,
} from "@/store/progress";

/** 상세 페이지 CTA — 진도에 따라 '학습 시작' / '이어보기'로 변신 */
export function CourseCta({ course }: { course: Course }) {
  const completed = useProgressStore((s) => s.completed);
  const lastLesson = useProgressStore((s) => s.lastLesson);
  const hydrated = useProgressStore((s) => s.hydrated);

  const progress = hydrated ? courseProgress(completed, course) : null;
  const started = progress !== null && progress.done > 0;
  const target = hydrated
    ? resumeLessonSlug({ completed, lastLesson }, course)
    : course.modules[0]?.lessons[0]?.slug ?? "";

  return (
    <div className="flex flex-col gap-3">
      {started && progress ? (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {progress.done}/{progress.total} 레슨 완료
            </span>
            <span className="font-bold text-violet-600 dark:text-violet-400">
              {progress.pct}%
            </span>
          </div>
          <Progress value={progress.pct} className="h-2" />
        </>
      ) : null}
      <Button asChild size="lg" className="w-full">
        <Link href={`/learn/${course.slug}/${target}`}>
          {started ? (
            <>
              <RotateCcw className="size-4" /> 이어보기
            </>
          ) : (
            <>
              <Play className="size-4" /> 학습 시작하기
            </>
          )}
        </Link>
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        진도는 자동으로 저장됩니다
      </p>
    </div>
  );
}
