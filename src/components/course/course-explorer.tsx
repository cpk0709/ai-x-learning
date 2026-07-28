"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import type { Category, Course } from "@/content/types";
import { CATEGORY_META } from "@/content/types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "./course-card";

const TABS: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "dev", label: CATEGORY_META.dev.label },
  { value: "creative", label: CATEGORY_META.creative.label },
  { value: "business", label: CATEGORY_META.business.label },
];

export function CourseExplorer({
  courses,
  initialCategory,
}: {
  courses: Course[];
  initialCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const validInitial = TABS.some((t) => t.value === initialCategory)
    ? (initialCategory as Category | "all")
    : "all";
  const [category, setCategory] = useState<Category | "all">(validInitial);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (!q) return true;
      const haystack = [c.title, c.subtitle, c.description, ...c.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [courses, category, query]);

  const onCategoryChange = (value: string) => {
    const next = value as Category | "all";
    setCategory(next);
    router.replace(next === "all" ? pathname : `${pathname}?category=${next}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={category} onValueChange={onCategoryChange}>
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="강의, 태그 검색…"
            className="pl-9"
            aria-label="강의 검색"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-20 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            &ldquo;{query}&rdquo;에 해당하는 강의가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
