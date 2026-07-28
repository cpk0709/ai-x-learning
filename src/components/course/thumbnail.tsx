import { cn } from "@/lib/utils";
import type { Course } from "@/content/types";
import { ContentIcon } from "@/components/illustrations/icon-map";

/**
 * 강의 썸네일 — 외부 이미지 없이 그라디언트 + 아이콘 + 패턴으로 렌더링.
 * 모든 강의 카드가 동일한 비주얼 언어를 유지합니다.
 */
export function CourseThumbnail({
  course,
  className,
  iconClassName,
}: {
  course: Course;
  className?: string;
  iconClassName?: string;
}) {
  const [from, to] = course.gradient;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden
    >
      {/* 도트 패턴 */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* 글로우 */}
      <div className="absolute -right-6 -top-6 size-28 rounded-full bg-white/15 blur-2xl" />
      <span className="relative flex size-14 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
        <ContentIcon
          name={course.icon}
          className={cn("size-7 text-white", iconClassName)}
        />
      </span>
    </div>
  );
}
