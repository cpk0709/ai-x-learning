"use client";

import { useMemo } from "react";
import { dailyCounts, toDayKey } from "@/lib/gamification";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * 학습 잔디 그래프 — 최근 18주, GitHub 스타일.
 * 색은 단일 색상(violet) 순차 램프: 옅음(적음) → 진함(많음).
 */

const WEEKS = 18;

// 순차 램프 (라이트/다크 각각 명시적 스텝 — 자동 반전 없음)
const LEVEL_CLASSES = [
  "bg-zinc-100 dark:bg-zinc-800", // 0
  "bg-violet-200 dark:bg-violet-900", // 1
  "bg-violet-400 dark:bg-violet-700", // 2
  "bg-violet-600 dark:bg-violet-500", // 3
  "bg-violet-800 dark:bg-violet-300", // 4+
];

function levelOf(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

const DAY_LABELS = ["", "월", "", "수", "", "금", ""];

export function ContributionGraph({
  completed,
}: {
  completed: Record<string, string>;
}) {
  const { grid, monthLabels, total } = useMemo(() => {
    const counts = dailyCounts(completed);
    const today = new Date();
    // 이번 주 일요일부터 시작하는 주 단위 그리드
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() - (WEEKS - 1) * 7);

    const weeks: { key: string; count: number; future: boolean }[][] = [];
    const months: { index: number; label: string }[] = [];
    let lastMonth = -1;
    const cursor = new Date(start);
    for (let w = 0; w < WEEKS; w++) {
      const week: { key: string; count: number; future: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const key = toDayKey(cursor.toISOString());
        week.push({
          key,
          count: counts.get(key) ?? 0,
          future: cursor > end,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      const firstOfWeek = new Date(`${week[0].key}T12:00:00`);
      if (firstOfWeek.getMonth() !== lastMonth) {
        lastMonth = firstOfWeek.getMonth();
        months.push({ index: w, label: `${lastMonth + 1}월` });
      }
      weeks.push(week);
    }
    let sum = 0;
    counts.forEach((v) => (sum += v));
    return { grid: weeks, monthLabels: months, total: sum };
  }, [completed]);

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-max">
          {/* 월 라벨 */}
          <div className="mb-1 ml-7 flex text-[10px] text-muted-foreground">
            {grid.map((_, w) => {
              const label = monthLabels.find((m) => m.index === w)?.label;
              return (
                <span key={w} className="w-3.5 shrink-0 overflow-visible whitespace-nowrap">
                  {label ?? ""}
                </span>
              );
            })}
          </div>
          <div className="flex gap-0">
            {/* 요일 라벨 */}
            <div className="mr-1 flex w-6 flex-col text-[10px] leading-none text-muted-foreground">
              {DAY_LABELS.map((label, i) => (
                <span key={i} className="flex h-3.5 items-center">
                  {label}
                </span>
              ))}
            </div>
            <TooltipProvider delayDuration={100}>
              {grid.map((week, w) => (
                <div key={w} className="flex w-3.5 flex-col">
                  {week.map((day) => (
                    <Tooltip key={day.key}>
                      <TooltipTrigger asChild>
                        <span
                          role="img"
                          aria-label={`${day.key}: 레슨 ${day.count}개 완료`}
                          className={cn(
                            "m-px size-3 rounded-[3px]",
                            day.future
                              ? "bg-transparent"
                              : LEVEL_CLASSES[levelOf(day.count)]
                          )}
                        />
                      </TooltipTrigger>
                      {!day.future && (
                        <TooltipContent side="top" className="text-xs">
                          {day.key} · 레슨 {day.count}개
                        </TooltipContent>
                      )}
                    </Tooltip>
                  ))}
                </div>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
      {/* 범례 */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>최근 {WEEKS}주 · 총 {total}개 레슨 완료</span>
        <span className="flex items-center gap-1">
          적음
          {LEVEL_CLASSES.map((cls, i) => (
            <span key={i} className={cn("size-2.5 rounded-[2px]", cls)} aria-hidden />
          ))}
          많음
        </span>
      </div>
    </div>
  );
}
