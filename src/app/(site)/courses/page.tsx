import type { Metadata } from "next";
import { Suspense } from "react";
import { COURSES } from "@/content";
import { CourseExplorer } from "@/components/course/course-explorer";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "강의 탐색",
  description: "AI 개발, 크리에이티브, 비즈니스 & 커리어 — 카테고리별 최신 AI 강의를 탐색하세요.",
};

/**
 * 정적 페이지 — 카테고리 필터는 CourseExplorer가 클라이언트에서
 * URL 쿼리(useSearchParams)로 처리합니다 (GitHub Pages 정적 배포 호환).
 */
export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">강의 탐색</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        2026년 최신 트렌드 기준으로 큐레이션된 {COURSES.length}개 강의 — 모두
        일러스트 기반 스텝바이스텝으로 배웁니다.
      </p>
      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
          <CourseExplorer courses={COURSES} />
        </Suspense>
      </div>
    </div>
  );
}
