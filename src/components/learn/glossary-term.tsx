"use client";

import { useRef, useState } from "react";
import { BookOpen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * 용어 툴팁 — 점선 밑줄 용어에 마우스를 올리면(모바일은 탭) 쉬운 설명이 뜹니다.
 * 데스크톱: 호버로 열림 / 모바일·키보드: 탭·엔터로 토글.
 */
export function GlossaryTerm({
  term,
  definition,
  children,
}: {
  term: string;
  definition: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          aria-label={`용어 설명: ${term}`}
          className="cursor-help rounded-sm border-b-2 border-dotted border-violet-400/80 pb-px transition-colors hover:bg-violet-50 hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-violet-500 dark:border-violet-500/60 dark:hover:bg-violet-500/15 dark:hover:text-violet-200"
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          onClick={(e) => {
            e.preventDefault();
            setOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={6}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        className="w-fit max-w-76 border-violet-200 shadow-lg dark:border-violet-500/30"
      >
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-violet-700 dark:text-violet-300">
          <BookOpen className="size-3.5 shrink-0" aria-hidden />
          {term}
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/90">
          {definition}
        </p>
      </PopoverContent>
    </Popover>
  );
}
