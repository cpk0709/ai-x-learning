import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, Clock, Layers } from "lucide-react";
import { COURSES, getCourse } from "@/content";
import {
  CATEGORY_META,
  LEVEL_META,
  countLessons,
  totalMinutes,
} from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { CourseThumbnail } from "@/components/course/thumbnail";
import { Curriculum } from "@/components/course/curriculum";
import { CourseCta } from "@/components/course/course-cta";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return { title: course.title, description: course.subtitle };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const lessons = countLessons(course);
  const minutes = totalMinutes(course);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* 브레드크럼 */}
      <nav
        className="mb-5 flex items-center gap-1 text-sm text-muted-foreground"
        aria-label="현재 위치"
      >
        <Link href="/courses" className="hover:text-foreground">
          강의
        </Link>
        <ChevronRight className="size-3.5" />
        <Link
          href={`/courses?category=${course.category}`}
          className="hover:text-foreground"
        >
          {CATEGORY_META[course.category].label}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <CourseThumbnail course={course} className="h-48 rounded-2xl sm:h-60" />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{CATEGORY_META[course.category].label}</Badge>
            <Badge variant="outline">{LEVEL_META[course.level].label}</Badge>
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal text-muted-foreground">
                #{tag}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {course.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {course.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Layers className="size-4" /> 모듈 {course.modules.length}개
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" /> 레슨 {lessons}개
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> 총 약 {minutes}분
            </span>
          </div>

          {/* 학습 목표 */}
          <section className="mt-8 rounded-2xl border bg-muted/30 p-5">
            <h2 className="text-[15px] font-bold tracking-tight">
              이 강의를 마치면
            </h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm leading-snug">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          {/* 커리큘럼 */}
          <section className="mt-8">
            <h2 className="mb-2 text-lg font-bold tracking-tight">커리큘럼</h2>
            <Curriculum course={course} />
          </section>
        </div>

        {/* 사이드 CTA */}
        <aside className="lg:pt-0">
          <div className="sticky top-20 rounded-2xl border bg-card p-5 shadow-xs">
            <CourseCta course={course} />
          </div>
        </aside>
      </div>
    </div>
  );
}
