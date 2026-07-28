"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Flame,
  Play,
  Rocket,
  Sparkles,
} from "lucide-react";
import { COURSES } from "@/content";
import { CATEGORY_META } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseThumbnail } from "@/components/course/thumbnail";
import { ContributionGraph } from "./contribution-graph";
import {
  courseProgress,
  resumeLessonSlug,
  useProgressStore,
} from "@/store/progress";
import { BADGES, currentStreak } from "@/lib/gamification";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

export function DashboardView() {
  const { user, configured } = useUser();
  const completed = useProgressStore((s) => s.completed);
  const lastLesson = useProgressStore((s) => s.lastLesson);
  const enrolled = useProgressStore((s) => s.enrolled);
  const lastVisitedAt = useProgressStore((s) => s.lastVisitedAt);
  const hydrated = useProgressStore((s) => s.hydrated);

  const enrolledCourses = useMemo(() => {
    return COURSES.filter((c) => enrolled[c.slug]).sort((a, b) => {
      const ta = lastVisitedAt[a.slug] ?? enrolled[a.slug] ?? "";
      const tb = lastVisitedAt[b.slug] ?? enrolled[b.slug] ?? "";
      return tb.localeCompare(ta);
    });
  }, [enrolled, lastVisitedAt]);

  const stats = useMemo(() => {
    const done = Object.keys(completed).length;
    const inProgress = enrolledCourses.filter((c) => {
      const p = courseProgress(completed, c);
      return p.done < p.total;
    }).length;
    const finished = COURSES.filter((c) => {
      const p = courseProgress(completed, c);
      return p.total > 0 && p.done === p.total;
    }).length;
    const streak = currentStreak(completed);
    const badges = BADGES.filter((b) =>
      b.earned({ completed, courses: COURSES })
    );
    return { done, inProgress, finished, streak, badges };
  }, [completed, enrolledCourses]);

  if (!hydrated) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  const resumeCourse = enrolledCourses[0];
  const resumeTarget = resumeCourse
    ? resumeLessonSlug({ completed, lastLesson }, resumeCourse)
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* 인사 + 모드 안내 */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {user ? `안녕하세요, ${user.email?.split("@")[0]}님` : "내 학습"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {configured
            ? user
              ? "진도가 계정에 안전하게 동기화되고 있습니다."
              : "로그인하면 진도가 계정에 동기화됩니다."
            : "게스트 모드 — 진도는 이 브라우저에 저장됩니다."}
        </p>
      </div>

      {/* 스탯 타일 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: CheckCircle2,
            label: "완료한 레슨",
            value: stats.done,
            unit: "개",
          },
          {
            icon: BookOpen,
            label: "학습 중인 강의",
            value: stats.inProgress,
            unit: "개",
          },
          {
            icon: Flame,
            label: "연속 학습",
            value: stats.streak,
            unit: "일",
          },
          {
            icon: Award,
            label: "획득한 배지",
            value: stats.badges.length,
            unit: `/ ${BADGES.length}`,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <s.icon className="size-3.5" /> {s.label}
            </div>
            <div className="mt-2 text-2xl font-bold tabular-nums tracking-tight">
              {s.value}
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {s.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {enrolledCourses.length === 0 ? (
        /* 빈 상태 */
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <Rocket className="size-7" />
          </span>
          <div>
            <h2 className="text-lg font-bold">아직 시작한 강의가 없어요</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              첫 스텝을 완료하면 여기에 진도와 잔디가 자라기 시작합니다.
            </p>
          </div>
          <Button asChild>
            <Link href="/courses">
              <Sparkles className="size-4" /> 강의 둘러보기
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {/* 이어보기 */}
          {resumeCourse && resumeTarget ? (
            <Link
              href={`/learn/${resumeCourse.slug}/${resumeTarget}`}
              className="group flex items-center gap-4 overflow-hidden rounded-2xl border bg-card p-4 shadow-xs transition-all hover:shadow-md sm:gap-5"
            >
              <CourseThumbnail
                course={resumeCourse}
                className="size-16 shrink-0 rounded-xl sm:size-20"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                  이어보기
                </div>
                <div className="mt-0.5 truncate text-[15px] font-bold tracking-tight">
                  {resumeCourse.title}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress
                    value={courseProgress(completed, resumeCourse).pct}
                    className="h-1.5 max-w-64"
                  />
                  <span className="text-xs font-semibold text-muted-foreground">
                    {courseProgress(completed, resumeCourse).pct}%
                  </span>
                </div>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm transition-transform group-hover:scale-105">
                <Play className="size-4.5" />
              </span>
            </Link>
          ) : null}

          {/* 수강 중인 강의 */}
          <section>
            <h2 className="mb-3 text-lg font-bold tracking-tight">수강 중인 강의</h2>
            <div className="flex flex-col gap-3">
              {enrolledCourses.map((course) => {
                const p = courseProgress(completed, course);
                const finished = p.total > 0 && p.done === p.total;
                const target = resumeLessonSlug({ completed, lastLesson }, course);
                return (
                  <div
                    key={course.slug}
                    className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center"
                  >
                    <CourseThumbnail
                      course={course}
                      className="hidden size-14 shrink-0 rounded-xl sm:flex"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="truncate text-sm font-bold tracking-tight hover:text-violet-600 dark:hover:text-violet-400"
                        >
                          {course.title}
                        </Link>
                        <Badge variant="secondary" className="text-[10px]">
                          {CATEGORY_META[course.category].label}
                        </Badge>
                        {finished && (
                          <Badge className="bg-emerald-600 text-[10px] text-white hover:bg-emerald-600">
                            완주 🎉
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2.5">
                        <Progress value={p.pct} className="h-2 flex-1" />
                        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                          {p.done}/{p.total} · {p.pct}%
                        </span>
                      </div>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant={finished ? "outline" : "default"}
                      className="shrink-0"
                    >
                      <Link href={`/learn/${course.slug}/${target}`}>
                        {finished ? "다시 보기" : "이어보기"}
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 학습 잔디 */}
          <section className="rounded-2xl border bg-card p-5">
            <h2 className="mb-4 text-lg font-bold tracking-tight">학습 잔디</h2>
            <ContributionGraph completed={completed} />
          </section>
        </>
      )}

      {/* 배지 */}
      <section>
        <h2 className="mb-3 text-lg font-bold tracking-tight">
          배지{" "}
          <span className="text-sm font-medium text-muted-foreground">
            {stats.badges.length} / {BADGES.length}
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BADGES.map((badge) => {
            const earned = badge.earned({ completed, courses: COURSES });
            return (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl border p-4 text-center transition-colors",
                  earned
                    ? "border-violet-200 bg-violet-50/60 dark:border-violet-500/30 dark:bg-violet-500/10"
                    : "opacity-50 grayscale"
                )}
              >
                <span className="text-3xl" aria-hidden>
                  {badge.emoji}
                </span>
                <span className="text-sm font-bold">{badge.title}</span>
                <span className="text-[11px] leading-snug text-muted-foreground">
                  {badge.description}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
