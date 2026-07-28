"use client";

import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import type { Course } from "@/content/types";
import { CATEGORY_META, LEVEL_META, countLessons, totalMinutes } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CourseThumbnail } from "./thumbnail";
import { courseProgress, useProgressStore } from "@/store/progress";

export function CourseCard({ course }: { course: Course }) {
  const completed = useProgressStore((s) => s.completed);
  const hydrated = useProgressStore((s) => s.hydrated);
  const progress = hydrated ? courseProgress(completed, course) : null;
  const lessons = countLessons(course);
  const minutes = totalMinutes(course);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <CourseThumbnail course={course} className="h-36" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="text-[11px]">
            {CATEGORY_META[course.category].label}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            {LEVEL_META[course.level].label}
          </Badge>
        </div>
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {course.subtitle}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" /> {lessons}개 레슨
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> 약 {minutes}분
          </span>
        </div>
        {progress && progress.done > 0 ? (
          <div className="flex items-center gap-2">
            <Progress value={progress.pct} className="h-1.5" />
            <span className="shrink-0 text-xs font-semibold text-violet-600 dark:text-violet-400">
              {progress.pct}%
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
