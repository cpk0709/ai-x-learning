"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Circle,
  Clock,
  ListTree,
  PartyPopper,
} from "lucide-react";
import type { Course } from "@/content/types";
import { flattenLessons } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IllustrationView } from "@/components/illustrations/illustration";
import { DemoPlayer } from "@/components/demo/demo-player";
import { LessonMarkdown } from "./lesson-markdown";
import {
  courseProgress,
  isLessonDone,
  useProgressStore,
} from "@/store/progress";
import { cn } from "@/lib/utils";

export function LessonViewer({
  course,
  lessonSlug,
}: {
  course: Course;
  lessonSlug: string;
}) {
  const router = useRouter();
  const completed = useProgressStore((s) => s.completed);
  const hydrated = useProgressStore((s) => s.hydrated);
  const markComplete = useProgressStore((s) => s.markComplete);
  const markVisited = useProgressStore((s) => s.markVisited);

  const flat = useMemo(() => flattenLessons(course), [course]);
  const currentIndex = flat.findIndex((f) => f.lesson.slug === lessonSlug);
  const current = flat[currentIndex];
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  const [tocOpen, setTocOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);

  // 방문 기록 (이어보기용)
  useEffect(() => {
    markVisited(course.slug, lessonSlug);
  }, [course.slug, lessonSlug, markVisited]);

  const goNext = useCallback(() => {
    markComplete(course.slug, lessonSlug);
    if (next) {
      router.push(`/learn/${course.slug}/${next.lesson.slug}`);
    } else {
      setDoneOpen(true);
    }
  }, [course.slug, lessonSlug, markComplete, next, router]);

  const goPrev = useCallback(() => {
    if (prev) router.push(`/learn/${course.slug}/${prev.lesson.slug}`);
  }, [course.slug, prev, router]);

  // 키보드 내비게이션 (← / →)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  if (!current) return null;

  const progress = hydrated ? courseProgress(completed, course) : null;
  const positionPct = Math.round(((currentIndex + 1) / flat.length) * 100);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* 뷰어 헤더 */}
      <div className="sticky top-14 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <Button asChild variant="ghost" size="sm" className="shrink-0 px-2">
            <Link href={`/courses/${course.slug}`} aria-label="강의 상세로 돌아가기">
              <ChevronLeft className="size-4" />
              <span className="hidden max-w-44 truncate text-xs font-medium sm:inline">
                {course.title}
              </span>
            </Link>
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Progress value={positionPct} className="h-1.5" />
            <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
              {currentIndex + 1} / {flat.length}
            </span>
          </div>

          <Sheet open={tocOpen} onOpenChange={setTocOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0">
                <ListTree className="size-4" />
                <span className="hidden sm:inline">목차</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="border-b px-5">
                <SheetTitle className="text-sm leading-snug">{course.title}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-5rem)]">
                <nav className="flex flex-col gap-4 px-3 py-4" aria-label="레슨 목차">
                  {course.modules.map((module, mi) => (
                    <div key={module.slug}>
                      <div className="px-2 pb-1.5 text-xs font-semibold text-muted-foreground">
                        모듈 {mi + 1} · {module.title}
                      </div>
                      <ul>
                        {module.lessons.map((lesson) => {
                          const isCurrent = lesson.slug === lessonSlug;
                          const done =
                            hydrated &&
                            isLessonDone(completed, course.slug, lesson.slug);
                          return (
                            <li key={lesson.slug}>
                              <Link
                                href={`/learn/${course.slug}/${lesson.slug}`}
                                onClick={() => setTocOpen(false)}
                                aria-current={isCurrent ? "page" : undefined}
                                className={cn(
                                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] leading-snug transition-colors hover:bg-muted",
                                  isCurrent &&
                                    "bg-violet-50 font-semibold text-violet-700 hover:bg-violet-50 dark:bg-violet-500/15 dark:text-violet-300"
                                )}
                              >
                                {done ? (
                                  <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                                ) : (
                                  <Circle className="size-4 shrink-0 text-muted-foreground/40" />
                                )}
                                {lesson.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* 본문: 스플릿 뷰 (모바일: 일러스트 상단 / 데스크톱: 우측) */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 lg:grid-cols-2">
        <article className="order-2 min-w-0 px-4 py-8 sm:px-6 lg:order-1 lg:py-10 lg:pr-10">
          <div className="mb-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
            {current.module.title}
          </div>
          <h1 className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
            {current.lesson.title}
          </h1>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> 약 {current.lesson.minutes}분
          </div>
          <div className="mt-6">
            <LessonMarkdown content={current.lesson.content} />
          </div>
        </article>

        <div className="order-1 border-b bg-muted/30 px-4 py-6 sm:px-6 lg:order-2 lg:border-b-0 lg:border-l lg:px-8 lg:py-10">
          <div className="lg:sticky lg:top-32">
            {current.lesson.demo ? (
              <Tabs defaultValue="demo" key={current.lesson.slug}>
                <TabsList className="mb-3">
                  <TabsTrigger value="demo">🎬 따라하기 데모</TabsTrigger>
                  <TabsTrigger value="diagram">📊 다이어그램</TabsTrigger>
                </TabsList>
                <TabsContent value="demo">
                  <DemoPlayer scene={current.lesson.demo} />
                </TabsContent>
                <TabsContent value="diagram">
                  <IllustrationView data={current.lesson.illustration} />
                </TabsContent>
              </Tabs>
            ) : (
              <IllustrationView data={current.lesson.illustration} />
            )}
          </div>
        </div>
      </div>

      {/* 하단 내비게이션 */}
      <div className="sticky bottom-0 z-40 border-t bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={!prev}
            className="min-w-28"
          >
            <ArrowLeft className="size-4" /> 이전 단계
          </Button>
          <div className="hidden text-xs text-muted-foreground sm:block">
            키보드 <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono">→</kbd> 로 이동
          </div>
          <Button onClick={goNext} className="min-w-36">
            {next ? (
              <>
                다음 단계로 <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                학습 완료 <PartyPopper className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 완료 다이얼로그 */}
      <Dialog open={doneOpen} onOpenChange={setDoneOpen}>
        <DialogContent className="text-center sm:max-w-md">
          <DialogHeader className="items-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
              <PartyPopper className="size-7" />
            </span>
            <DialogTitle className="mt-3 text-xl">강의 완주를 축하합니다! 🎉</DialogTitle>
            <DialogDescription className="leading-relaxed">
              <span className="font-semibold text-foreground">{course.title}</span>
              의 모든 스텝({flat.length}개)을 마쳤습니다.
              {progress ? ` 진도율 ${progress.pct}%.` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard">대시보드에서 배지 확인하기</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">다음 강의 둘러보기</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
