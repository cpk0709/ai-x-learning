import type { Metadata } from "next";
import { COURSES } from "@/content";
import { CourseExplorer } from "@/components/course/course-explorer";

export const metadata: Metadata = {
  title: "강의 탐색",
  description: "AI 개발, 크리에이티브, 비즈니스 자동화 — 카테고리별 최신 AI 강의를 탐색하세요.",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">강의 탐색</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        2026년 최신 트렌드 기준으로 큐레이션된 {COURSES.length}개 강의 — 모두
        일러스트 기반 스텝바이스텝으로 배웁니다.
      </p>
      <div className="mt-8">
        <CourseExplorer courses={COURSES} initialCategory={category} />
      </div>
    </div>
  );
}
