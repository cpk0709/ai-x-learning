"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { Course } from "@/content/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { isLessonDone, useProgressStore } from "@/store/progress";
import { cn } from "@/lib/utils";

export function Curriculum({ course }: { course: Course }) {
  const completed = useProgressStore((s) => s.completed);
  const hydrated = useProgressStore((s) => s.hydrated);

  return (
    <Accordion
      type="multiple"
      defaultValue={course.modules.map((m) => m.slug)}
      className="w-full"
    >
      {course.modules.map((module, mi) => (
        <AccordionItem key={module.slug} value={module.slug}>
          <AccordionTrigger className="text-left">
            <div>
              <div className="text-xs font-medium text-muted-foreground">
                모듈 {mi + 1}
              </div>
              <div className="text-[15px] font-semibold">{module.title}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col">
              {module.lessons.map((lesson) => {
                const done =
                  hydrated && isLessonDone(completed, course.slug, lesson.slug);
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${course.slug}/${lesson.slug}`}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                    >
                      {done ? (
                        <CheckCircle2 className="size-4.5 shrink-0 text-emerald-500" />
                      ) : (
                        <Circle className="size-4.5 shrink-0 text-muted-foreground/40" />
                      )}
                      <span
                        className={cn(
                          "flex-1 text-sm",
                          done && "text-muted-foreground"
                        )}
                      >
                        {lesson.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" /> {lesson.minutes}분
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
