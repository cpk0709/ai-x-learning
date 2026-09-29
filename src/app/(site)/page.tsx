import Link from "next/link";
import { ArrowRight, BookOpen, Layers, MousePointerClick, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSES, getCoursesByCategory } from "@/content";
import { CATEGORY_META, countLessons, totalMinutes, type Category } from "@/content/types";
import { CourseCard } from "@/components/course/course-card";
import { IllustrationView } from "@/components/illustrations/illustration";

const CATEGORIES: Category[] = ["dev", "devops", "creative", "business", "realestate"];

export default function HomePage() {
  const totalLessons = COURSES.reduce((n, c) => n + countLessons(c), 0);
  const totalHours = Math.round(
    COURSES.reduce((n, c) => n + totalMinutes(c), 0) / 60
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-30"
          style={{
            background:
              "radial-gradient(600px circle at 20% 20%, rgba(139,92,246,0.15), transparent 60%), radial-gradient(500px circle at 80% 30%, rgba(14,165,233,0.12), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-start gap-5">
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
              2026 최신 트렌드 커리큘럼
            </span>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
              긴 영상은 그만,
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                일러스트로 배우는 AI 활용
              </span>
            </h1>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
              유튜브·논문·블로그에 흩어진 AI 기술을 큐레이션했습니다. 한 화면에
              하나의 개념 — 다이어그램과 함께 스텝바이스텝으로 끝까지
              배웁니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/courses">
                  무료로 학습 시작 <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">내 학습 현황</Link>
              </Button>
            </div>
            <dl className="mt-2 flex gap-8">
              {[
                { label: "강의", value: `${COURSES.length}개` },
                { label: "스텝 레슨", value: `${totalLessons}개` },
                { label: "학습 분량", value: `${totalHours}시간+` },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="text-xl font-bold tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 히어로 일러스트 — 실제 렌더러로 플랫폼의 비주얼 언어를 그대로 보여줌 */}
          <div className="rounded-2xl border bg-card/70 p-6 shadow-sm backdrop-blur-sm">
            <IllustrationView
              data={{
                type: "cycle",
                title: "AI-X Learn의 학습 루프",
                center: "매일 15분",
                nodes: [
                  { label: "한 스텝 학습", sublabel: "개념 + 일러스트", icon: "lightbulb" },
                  { label: "직접 따라하기", sublabel: "실습 가이드", icon: "terminal" },
                  { label: "진도 자동 저장", sublabel: "이어보기 지원", icon: "check" },
                  { label: "배지 · 잔디", sublabel: "게이미피케이션", icon: "trending-up" },
                ],
              }}
            />
          </div>
        </div>
      </section>

      {/* 학습 방식 */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "한 화면, 하나의 개념",
              desc: "스크롤 지옥 대신 카드 한 장. 텍스트는 최소화하고 다이어그램이 핵심을 짚어줍니다.",
            },
            {
              icon: MousePointerClick,
              title: "클릭 한 번으로 다음 스텝",
              desc: "[다음 단계] 버튼을 누르는 순간 진도가 저장됩니다. 키보드 ←/→로도 이동할 수 있습니다.",
            },
            {
              icon: Route,
              title: "끊긴 곳에서 이어보기",
              desc: "마지막으로 본 스텝을 기억합니다. 대시보드에서 진도율과 학습 잔디를 확인하세요.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-2.5 rounded-2xl border bg-card p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                <f.icon className="size-5" />
              </span>
              <h2 className="text-[15px] font-bold tracking-tight">{f.title}</h2>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리별 강의 */}
      {CATEGORIES.map((cat) => {
        const courses = getCoursesByCategory(cat);
        if (courses.length === 0) return null;
        const meta = CATEGORY_META[cat];
        return (
          <section key={cat} className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {meta.label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{meta.description}</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="shrink-0">
                <Link href={`/courses?category=${cat}`}>
                  전체 보기 <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 px-6 py-12 text-center text-white sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <BookOpen className="relative mx-auto mb-4 size-10 opacity-90" aria-hidden />
          <h2 className="relative text-2xl font-bold tracking-tight sm:text-3xl">
            오늘 첫 스텝을 시작하세요
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/85">
            회원가입 없이도 바로 학습할 수 있습니다. 진도는 자동으로
            저장됩니다.
          </p>
          <Button asChild size="lg" variant="secondary" className="relative mt-6">
            <Link href="/courses">
              강의 둘러보기 <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
