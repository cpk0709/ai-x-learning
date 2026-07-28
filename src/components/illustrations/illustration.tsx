import { cn } from "@/lib/utils";
import type {
  ChatIllustration,
  CompareIllustration,
  CycleIllustration,
  FlowIllustration,
  GridIllustration,
  Illustration,
  StackIllustration,
  StepsIllustration,
  TerminalIllustration,
  Tone,
} from "@/content/types";
import { ContentIcon } from "./icon-map";
import { ArrowDown, Bot, User, ChevronRight } from "lucide-react";

/**
 * 일러스트 렌더러 — 구조화된 데이터를 일관된 스타일의 다이어그램으로 그립니다.
 * 모든 레슨의 비주얼이 이 파일 하나에서 통제되므로 스타일 일관성이 보장됩니다.
 * 상태가 없는 순수 컴포넌트라 서버 컴포넌트로 렌더링됩니다.
 */

const TONE_STYLES: Record<
  Tone,
  { card: string; iconWrap: string; headerText: string }
> = {
  primary: {
    card: "border-violet-200 bg-violet-50/70 dark:border-violet-500/30 dark:bg-violet-500/10",
    iconWrap:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    headerText: "text-violet-700 dark:text-violet-300",
  },
  accent: {
    card: "border-sky-200 bg-sky-50/70 dark:border-sky-500/30 dark:bg-sky-500/10",
    iconWrap: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    headerText: "text-sky-700 dark:text-sky-300",
  },
  success: {
    card: "border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    iconWrap:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    headerText: "text-emerald-700 dark:text-emerald-300",
  },
  warning: {
    card: "border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-500/10",
    iconWrap:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    headerText: "text-amber-700 dark:text-amber-300",
  },
  muted: {
    card: "border-border bg-muted/50",
    iconWrap: "bg-muted text-muted-foreground",
    headerText: "text-muted-foreground",
  },
};

function toneStyle(tone?: Tone) {
  return TONE_STYLES[tone ?? "muted"];
}

/* ---------------------------------- Frame ---------------------------------- */

function Frame({
  title,
  caption,
  children,
}: {
  title?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex h-full w-full flex-col justify-center gap-4">
      {title ? (
        <figcaption className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-violet-500" aria-hidden />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </span>
        </figcaption>
      ) : null}
      <div className="min-h-0">{children}</div>
      {caption ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{caption}</p>
      ) : null}
    </figure>
  );
}

/* ---------------------------------- Flow ---------------------------------- */

function FlowView({ data }: { data: FlowIllustration }) {
  const hasLoop = Boolean(data.loopBack);
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className={cn("relative", hasLoop && "pr-9")}>
        <div className="flex flex-col items-stretch">
          {data.nodes.map((node, i) => {
            const t = toneStyle(node.tone);
            return (
              <div key={i} className="flex flex-col items-stretch">
                {i > 0 && (
                  <div className="flex flex-col items-center gap-0.5 py-1.5">
                    {node.edgeLabel ? (
                      <span className="rounded-full border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {node.edgeLabel}
                      </span>
                    ) : null}
                    <ArrowDown
                      className="size-4 text-muted-foreground/60"
                      aria-hidden
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xs",
                    t.card
                  )}
                >
                  {node.icon ? (
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        t.iconWrap
                      )}
                    >
                      <ContentIcon name={node.icon} className="size-4.5" />
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-snug text-foreground">
                      {node.label}
                    </div>
                    {node.sublabel ? (
                      <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
                        {node.sublabel}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {hasLoop ? (
          <div
            className="absolute top-5 bottom-5 right-0 flex w-7 items-center"
            aria-hidden
          >
            <div className="relative h-full w-full rounded-r-xl border-y border-r border-dashed border-violet-400/70 dark:border-violet-500/50">
              <ChevronRight className="absolute -left-2 -top-2.25 size-4 rotate-180 text-violet-500" />
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-violet-200 bg-background px-1.5 py-1.5 text-[10px] font-medium text-violet-600 dark:border-violet-500/40 dark:text-violet-300"
                style={{ writingMode: "vertical-rl" }}
              >
                {data.loopBack!.label}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Cycle ---------------------------------- */

function CycleView({ data }: { data: CycleIllustration }) {
  const n = data.nodes.length;
  const R = 38; // 링/화살표 반지름 (%)
  const RX = 33; // 노드 가로 반지름 — 좁은 화면에서 좌우 노드가 잘리지 않도록 살짝 안쪽
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className="relative mx-auto aspect-square w-full max-w-105">
        {/* 점선 링 */}
        <div
          className="absolute rounded-full border-2 border-dashed border-violet-300/70 dark:border-violet-500/40"
          style={{ inset: `${50 - R}%` }}
          aria-hidden
        />
        {/* 진행 방향 화살표 (노드 사이 중간 지점) */}
        {data.nodes.map((_, i) => {
          const mid = ((i + 0.5) / n) * 2 * Math.PI;
          const x = 50 + R * Math.sin(mid);
          const y = 50 - R * Math.cos(mid);
          const deg = (mid * 180) / Math.PI;
          return (
            <ChevronRight
              key={`arrow-${i}`}
              className="absolute size-4 text-violet-500"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${deg}deg)`,
              }}
              aria-hidden
            />
          );
        })}
        {/* 중앙 라벨 */}
        {data.center ? (
          <div className="absolute left-1/2 top-1/2 w-2/5 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-sm font-bold leading-snug text-violet-700 dark:text-violet-300">
              {data.center}
            </span>
          </div>
        ) : null}
        {/* 노드 */}
        {data.nodes.map((node, i) => {
          const angle = (i / n) * 2 * Math.PI;
          const x = 50 + RX * Math.sin(angle);
          const y = 50 - R * Math.cos(angle);
          return (
            <div
              key={i}
              className="absolute w-26 -translate-x-1/2 -translate-y-1/2 sm:w-31"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="flex flex-col items-center gap-1 rounded-xl border bg-card px-2 py-2.5 text-center shadow-sm">
                {node.icon ? (
                  <span className="flex size-7 items-center justify-center rounded-md bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                    <ContentIcon name={node.icon} className="size-4" />
                  </span>
                ) : null}
                <span className="text-xs font-semibold leading-tight text-foreground">
                  {node.label}
                </span>
                {node.sublabel ? (
                  <span className="text-[10px] leading-tight text-muted-foreground">
                    {node.sublabel}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Compare ---------------------------------- */

function CompareView({ data }: { data: CompareIllustration }) {
  return (
    <Frame title={data.title} caption={data.caption}>
      <div
        className={cn(
          "grid gap-3",
          data.columns.length === 3 ? "grid-cols-3 max-[420px]:grid-cols-1" : "grid-cols-2 max-[360px]:grid-cols-1"
        )}
      >
        {data.columns.map((col, i) => {
          const t = toneStyle(col.tone);
          return (
            <div
              key={i}
              className={cn("flex flex-col rounded-xl border shadow-xs", t.card)}
            >
              <div className="flex items-center gap-2 border-b border-inherit px-3 py-2.5">
                {col.icon ? (
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md",
                      t.iconWrap
                    )}
                  >
                    <ContentIcon name={col.icon} className="size-3.5" />
                  </span>
                ) : null}
                <span
                  className={cn("text-xs font-bold leading-tight", t.headerText)}
                >
                  {col.title}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5 px-3 py-2.5">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-1.5 text-xs leading-snug text-foreground/90"
                  >
                    <span
                      className="mt-1.25 size-1.5 shrink-0 rounded-full bg-current opacity-40"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Stack ---------------------------------- */

function StackView({ data }: { data: StackIllustration }) {
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className="flex flex-col gap-2">
        {data.layers.map((layer, i) => {
          const t = toneStyle(layer.tone);
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xs",
                t.card
              )}
            >
              {layer.icon ? (
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    t.iconWrap
                  )}
                >
                  <ContentIcon name={layer.icon} className="size-4" />
                </span>
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-snug text-foreground">
                  {layer.label}
                </div>
                {layer.sublabel ? (
                  <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
                    {layer.sublabel}
                  </div>
                ) : null}
              </div>
              <span className="text-[10px] font-mono font-medium text-muted-foreground/60">
                L{data.layers.length - i}
              </span>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Steps ---------------------------------- */

function StepsView({ data }: { data: StepsIllustration }) {
  return (
    <Frame title={data.title} caption={data.caption}>
      <ol className="relative flex flex-col gap-3">
        {/* 연결선 */}
        <span
          className="absolute left-4.5 top-5 bottom-5 w-px bg-border"
          aria-hidden
        />
        {data.steps.map((step, i) => (
          <li key={i} className="relative flex items-start gap-3.5">
            <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-violet-300 bg-background text-sm font-bold text-violet-700 dark:border-violet-500/50 dark:text-violet-300">
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border bg-card px-3.5 py-2.5 shadow-xs">
              {step.icon ? (
                <ContentIcon
                  name={step.icon}
                  className="size-4 shrink-0 text-violet-600 dark:text-violet-400"
                />
              ) : null}
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug text-foreground">
                  {step.label}
                </div>
                {step.sublabel ? (
                  <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
                    {step.sublabel}
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------------------------------- Grid ---------------------------------- */

function GridView({ data }: { data: GridIllustration }) {
  const cols = data.items.length <= 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3";
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className={cn("grid gap-2.5", cols)}>
        {data.items.map((item, i) => {
          const t = toneStyle(item.tone ?? "muted");
          return (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 text-center shadow-xs",
                item.tone ? t.card : "border-border bg-card"
              )}
            >
              {item.icon ? (
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    item.tone
                      ? t.iconWrap
                      : "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
                  )}
                >
                  <ContentIcon name={item.icon} className="size-4.5" />
                </span>
              ) : null}
              <span className="text-xs font-semibold leading-tight text-foreground">
                {item.label}
              </span>
              {item.sublabel ? (
                <span className="text-[10px] leading-tight text-muted-foreground">
                  {item.sublabel}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Terminal ---------------------------------- */

function TerminalView({ data }: { data: TerminalIllustration }) {
  const lineClass: Record<string, string> = {
    cmd: "text-zinc-100",
    out: "text-zinc-300",
    ok: "text-emerald-400",
    err: "text-red-400",
    dim: "text-zinc-500",
    comment: "text-zinc-500 italic",
  };
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-md">
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="ml-1 truncate font-mono text-xs text-zinc-400">
            {data.windowTitle}
          </span>
        </div>
        <div className="flex flex-col gap-1 overflow-x-auto px-4 py-3.5 font-mono text-xs leading-relaxed">
          {data.lines.map((line, i) => {
            const tone = line.tone ?? "out";
            return (
              <div key={i} className={cn("whitespace-pre-wrap", lineClass[tone])}>
                {tone === "cmd" ? (
                  <span className="mr-1.5 select-none text-emerald-400">$</span>
                ) : null}
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

/* ---------------------------------- Chat ---------------------------------- */

function ChatView({ data }: { data: ChatIllustration }) {
  return (
    <Frame title={data.title} caption={data.caption}>
      <div className="flex flex-col gap-3">
        {data.messages.map((msg, i) => {
          if (msg.role === "system") {
            return (
              <div key={i} className="flex justify-center">
                <span className="max-w-[90%] rounded-full border border-dashed bg-muted/50 px-3 py-1.5 text-center text-[11px] leading-snug text-muted-foreground">
                  {msg.text}
                </span>
              </div>
            );
          }
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  isUser
                    ? "bg-violet-600 text-white"
                    : "bg-muted text-muted-foreground"
                )}
                aria-hidden
              >
                {isUser ? <User className="size-3.5" /> : <Bot className="size-4" />}
              </span>
              <div
                className={cn(
                  "max-w-[82%] whitespace-pre-wrap rounded-2xl border px-3.5 py-2.5 text-xs leading-relaxed shadow-xs",
                  isUser
                    ? "rounded-br-sm border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-100"
                    : "rounded-bl-sm border-border bg-card text-card-foreground"
                )}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------------- Dispatcher ---------------------------------- */

export function IllustrationView({
  data,
  className,
}: {
  data: Illustration;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {data.type === "flow" && <FlowView data={data} />}
      {data.type === "cycle" && <CycleView data={data} />}
      {data.type === "compare" && <CompareView data={data} />}
      {data.type === "stack" && <StackView data={data} />}
      {data.type === "steps" && <StepsView data={data} />}
      {data.type === "grid" && <GridView data={data} />}
      {data.type === "terminal" && <TerminalView data={data} />}
      {data.type === "chat" && <ChatView data={data} />}
    </div>
  );
}
