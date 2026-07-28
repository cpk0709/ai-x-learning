"use client";

import { cn } from "@/lib/utils";
import type {
  AutomationCanvasApp,
  BrowserApp,
  ChatApp,
  CodeEditorApp,
  DemoApp,
  DesignCanvasApp,
  EmailApp,
  Tone,
} from "@/content/types";
import { ContentIcon } from "@/components/illustrations/icon-map";
import {
  Bot,
  FileCode,
  Globe,
  Hash,
  Image as ImageIcon,
  Inbox,
  Lock,
  Pencil,
  Plus,
  Search,
  Send,
  Type as TypeIcon,
  User,
  X,
} from "lucide-react";

/**
 * 데모 앱 템플릿 렌더러 — 실제 도구(에디터/디자인 툴/Make/Slack/Gmail/브라우저)의
 * 화면을 일러스트로 재현합니다. 모든 타깃 요소는 data-demo-id를 달아
 * 플레이어의 커서가 위치를 찾을 수 있게 합니다.
 */

export interface DemoRuntime {
  /** 요소 표시 여부 (reveal/hide/type 반영) */
  isVisible: (id: string, hiddenByDefault?: boolean) => boolean;
  /** 타이핑된 동적 텍스트 (없으면 정적 텍스트 사용) */
  typed: Record<string, string>;
  /** 현재 타이핑 중인 타깃 (캐럿 표시) */
  typingId: string | null;
}

function Caret({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <span className="ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px] animate-pulse bg-violet-500" />
  );
}

/** 등장 애니메이션 래퍼 */
const APPEAR = "animate-in fade-in zoom-in-95 duration-300";

const NODE_TONE: Record<Tone, string> = {
  primary: "bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/50",
  accent: "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/50",
  success: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50",
  warning: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/50",
  muted: "bg-muted text-muted-foreground border-border",
};

/* ---------------------------------- 창 프레임 ---------------------------------- */

function WindowChrome({
  title,
  url,
  children,
  dark,
}: {
  title?: string;
  url?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border text-left",
        dark ? "border-zinc-800 bg-zinc-950 text-zinc-200" : "border-border bg-card"
      )}
    >
      <div
        className={cn(
          "flex h-7 shrink-0 items-center gap-2 border-b px-2.5",
          dark ? "border-zinc-800 bg-zinc-900" : "border-border bg-muted/60"
        )}
      >
        <span className="flex gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-amber-500/80" />
          <span className="size-2 rounded-full bg-emerald-500/80" />
        </span>
        {url ? (
          <span
            className={cn(
              "ml-1 flex min-w-0 flex-1 items-center gap-1 truncate rounded-full border px-2 py-0.5 text-[9px]",
              dark
                ? "border-zinc-700 bg-zinc-800 text-zinc-400"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            <Lock className="size-2 shrink-0" /> {url}
          </span>
        ) : (
          <span
            className={cn(
              "ml-1 truncate text-[10px] font-medium",
              dark ? "text-zinc-400" : "text-muted-foreground"
            )}
          >
            {title}
          </span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/* ---------------------------------- 코드 에디터 ---------------------------------- */

function CodeEditorView({ app, rt }: { app: CodeEditorApp; rt: DemoRuntime }) {
  const lineTone: Record<string, string> = {
    code: "text-zinc-200",
    comment: "text-zinc-500 italic",
    add: "bg-emerald-500/15 text-emerald-300",
    del: "bg-red-500/15 text-red-400 line-through",
  };
  const visibleCode = app.code.filter((l) => rt.isVisible(l.id, l.hidden));
  const visibleTerm = (app.terminal ?? []).filter((l) => rt.isVisible(l.id, l.hidden));
  return (
    <WindowChrome title={app.windowTitle} dark>
      <div className="flex h-full">
        {/* 파일 트리 */}
        <div className="w-[26%] shrink-0 border-r border-zinc-800 bg-zinc-900/60 py-1.5">
          <div className="px-2 pb-1 text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
            탐색기
          </div>
          {app.files.map((f) => (
            <div
              key={f.id}
              data-demo-id={f.id}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 text-[10px]",
                f.active ? "bg-violet-500/20 text-violet-200" : "text-zinc-400"
              )}
            >
              <FileCode className="size-2.5 shrink-0" />
              <span className="truncate">{f.name}</span>
            </div>
          ))}
        </div>
        {/* 코드 + 터미널 */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-hidden py-1.5 font-mono text-[10px] leading-[1.7]">
            {visibleCode.map((line, i) => {
              const typed = rt.typed[line.id];
              const text = typed !== undefined ? typed : line.text;
              return (
                <div
                  key={line.id}
                  data-demo-id={line.id}
                  className={cn("flex px-2", lineTone[line.tone ?? "code"])}
                >
                  <span className="w-5 shrink-0 select-none text-right text-[9px] text-zinc-600">
                    {i + 1}
                  </span>
                  <span
                    className="whitespace-pre-wrap break-all"
                    style={{ paddingLeft: `${(line.indent ?? 0) * 12 + 8}px` }}
                  >
                    {text}
                    <Caret active={rt.typingId === line.id} />
                  </span>
                </div>
              );
            })}
          </div>
          {app.terminal ? (
            <div className="max-h-[42%] shrink-0 overflow-hidden border-t border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 font-mono text-[9.5px] leading-relaxed">
              <div className="pb-0.5 text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
                터미널
              </div>
              {visibleTerm.map((line) => {
                const toneCls = {
                  cmd: "text-zinc-100",
                  out: "text-zinc-400",
                  ok: "text-emerald-400",
                  err: "text-red-400",
                }[line.tone ?? "out"];
                const typed = rt.typed[line.id];
                const text = typed !== undefined ? typed : line.text;
                return (
                  <div key={line.id} data-demo-id={line.id} className={cn(APPEAR, toneCls)}>
                    {line.tone === "cmd" && (
                      <span className="mr-1 select-none text-emerald-400">$</span>
                    )}
                    {text}
                    <Caret active={rt.typingId === line.id} />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 브라우저 ---------------------------------- */

function BrowserView({ app, rt }: { app: BrowserApp; rt: DemoRuntime }) {
  return (
    <WindowChrome url={app.url}>
      <div className="flex h-full flex-col gap-2 overflow-hidden p-3">
        {app.blocks
          .filter((b) => rt.isVisible(b.id, b.hidden))
          .map((b) => {
            const typed = rt.typed[b.id];
            const common = { "data-demo-id": b.id, key: b.id };
            switch (b.type) {
              case "heading":
                return (
                  <div {...common} className={cn("text-sm font-bold tracking-tight", APPEAR)}>
                    {b.label}
                  </div>
                );
              case "text":
                return (
                  <div {...common} className={cn("text-[10px] leading-relaxed text-muted-foreground", APPEAR)}>
                    {b.label}
                  </div>
                );
              case "button":
                return (
                  <div
                    {...common}
                    className={cn(
                      "inline-flex w-fit items-center rounded-md bg-violet-600 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm",
                      APPEAR
                    )}
                  >
                    {b.label}
                  </div>
                );
              case "input":
                return (
                  <div
                    {...common}
                    className={cn(
                      "flex min-h-7 items-center rounded-md border bg-background px-2.5 py-1.5 text-[10px]",
                      APPEAR
                    )}
                  >
                    {typed ? (
                      <span className="text-foreground">
                        {typed}
                        <Caret active={rt.typingId === b.id} />
                      </span>
                    ) : (
                      <span className="text-muted-foreground/60">
                        {b.label}
                        <Caret active={rt.typingId === b.id} />
                      </span>
                    )}
                  </div>
                );
              case "card":
                return (
                  <div
                    {...common}
                    className={cn(
                      "rounded-lg border bg-card px-3 py-2 text-[10px] font-medium shadow-xs",
                      APPEAR
                    )}
                  >
                    {b.label}
                  </div>
                );
              case "badge":
                return (
                  <div
                    {...common}
                    className={cn(
                      "inline-flex w-fit rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300",
                      APPEAR
                    )}
                  >
                    {b.label}
                  </div>
                );
            }
          })}
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 디자인 캔버스 ---------------------------------- */

function DesignCanvasView({ app, rt }: { app: DesignCanvasApp; rt: DemoRuntime }) {
  return (
    <WindowChrome title={app.windowTitle} dark>
      <div className="flex h-full">
        {/* 툴바 */}
        <div className="flex w-9 shrink-0 flex-col items-center gap-1 border-r border-zinc-800 bg-zinc-900/60 py-2">
          {app.tools.map((tool) => (
            <div
              key={tool.id}
              data-demo-id={tool.id}
              title={tool.label}
              className="flex size-6 items-center justify-center rounded text-zinc-400 hover:text-zinc-200"
            >
              <ContentIcon name={tool.icon} className="size-3.5" />
            </div>
          ))}
          <div className="mt-auto flex flex-col gap-1 text-zinc-600">
            <Pencil className="size-3" />
            <TypeIcon className="size-3" />
          </div>
        </div>
        {/* 캔버스 */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            backgroundColor: "#18181b",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "14px 14px",
          }}
        >
          {app.objects
            .filter((o) => rt.isVisible(o.id, o.hidden))
            .map((o) => {
              const style: React.CSSProperties = {
                left: `${o.x}%`,
                top: `${o.y}%`,
                width: `${o.w}%`,
                height: `${o.h}%`,
              };
              if (o.shape === "frame") {
                return (
                  <div key={o.id} data-demo-id={o.id} className={cn("absolute", APPEAR)} style={style}>
                    <span className="absolute -top-3.5 left-0 text-[8px] text-zinc-500">
                      {o.label ?? "Frame"}
                    </span>
                    <div className="h-full w-full rounded-sm border border-zinc-700 bg-white/95" />
                  </div>
                );
              }
              if (o.shape === "text") {
                return (
                  <div
                    key={o.id}
                    data-demo-id={o.id}
                    className={cn("absolute flex items-center text-[11px] font-bold", APPEAR)}
                    style={{ ...style, color: o.color ?? "#18181b" }}
                  >
                    {rt.typed[o.id] ?? o.label}
                    <Caret active={rt.typingId === o.id} />
                  </div>
                );
              }
              if (o.shape === "image") {
                return (
                  <div
                    key={o.id}
                    data-demo-id={o.id}
                    className={cn(
                      "absolute flex items-center justify-center rounded border border-zinc-300 bg-zinc-200 text-zinc-400",
                      APPEAR
                    )}
                    style={style}
                  >
                    <ImageIcon className="size-4" />
                  </div>
                );
              }
              return (
                <div
                  key={o.id}
                  data-demo-id={o.id}
                  className={cn("absolute shadow-sm", APPEAR, o.shape === "ellipse" ? "rounded-full" : "rounded")}
                  style={{ ...style, backgroundColor: o.color ?? "#8b5cf6" }}
                />
              );
            })}
        </div>
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 자동화 캔버스 ---------------------------------- */

function AutomationCanvasView({ app, rt }: { app: AutomationCanvasApp; rt: DemoRuntime }) {
  return (
    <WindowChrome title={app.windowTitle}>
      <div className="flex h-full flex-col">
        <div
          className="flex flex-1 items-center justify-center gap-0 overflow-x-auto px-3"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, currentColor 12%, transparent) 1px, transparent 0)",
            backgroundSize: "14px 14px",
          }}
        >
          {app.nodes.map((node, i) => {
            const visible = rt.isVisible(node.id, node.hidden);
            return (
              <div key={node.id} className="flex items-center">
                {i > 0 && (
                  <span
                    className={cn(
                      "h-px w-5 shrink-0 sm:w-7",
                      visible ? "bg-violet-400" : "border-t border-dashed border-muted-foreground/40"
                    )}
                    aria-hidden
                  />
                )}
                <div
                  data-demo-id={node.id}
                  className="flex w-16 flex-col items-center gap-1 text-center sm:w-18"
                >
                  {visible ? (
                    <>
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-full border-2 shadow-sm sm:size-11",
                          APPEAR,
                          NODE_TONE[node.tone ?? "primary"]
                        )}
                      >
                        <ContentIcon name={node.icon} className="size-4.5" />
                      </span>
                      <span className="text-[9px] font-semibold leading-tight">{node.label}</span>
                      {node.sublabel ? (
                        <span className="text-[8px] leading-tight text-muted-foreground">
                          {node.sublabel}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/40 text-muted-foreground/50 sm:size-11">
                      <Plus className="size-4" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {app.runLog ? (
          <div className="shrink-0 border-t bg-muted/40 px-3 py-1.5 font-mono text-[9.5px] leading-relaxed">
            {app.runLog
              .filter((l) => rt.isVisible(l.id, l.hidden))
              .map((l) => (
                <div
                  key={l.id}
                  data-demo-id={l.id}
                  className={cn(
                    APPEAR,
                    { out: "text-muted-foreground", ok: "text-emerald-600 dark:text-emerald-400", err: "text-red-500" }[l.tone ?? "out"]
                  )}
                >
                  {l.text}
                </div>
              ))}
          </div>
        ) : null}
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 채팅 (Slack풍) ---------------------------------- */

function ChatAppView({ app, rt }: { app: ChatApp; rt: DemoRuntime }) {
  const active = app.channels.find((c) => c.active) ?? app.channels[0];
  return (
    <WindowChrome title={app.workspace}>
      <div className="flex h-full">
        <div className="w-[28%] shrink-0 border-r bg-violet-950/95 py-2 text-violet-100 dark:bg-violet-950/60">
          <div className="px-2.5 pb-1.5 text-[10px] font-bold">{app.workspace}</div>
          <div className="px-2.5 pb-0.5 text-[8px] font-semibold uppercase tracking-wider text-violet-300/60">
            채널
          </div>
          {app.channels.map((ch) => (
            <div
              key={ch.id}
              data-demo-id={ch.id}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 text-[10px]",
                ch.active ? "bg-violet-500/40 font-semibold" : "text-violet-200/70"
              )}
            >
              <Hash className="size-2.5 shrink-0" /> {ch.name}
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-6 shrink-0 items-center gap-1 border-b px-2.5 text-[10px] font-bold">
            <Hash className="size-2.5" /> {active?.name}
          </div>
          <div className="flex flex-1 flex-col gap-2 overflow-hidden px-2.5 py-2">
            {app.messages
              .filter((m) => rt.isVisible(m.id, m.hidden))
              .map((m) => (
                <div key={m.id} data-demo-id={m.id} className={cn("flex gap-1.5", APPEAR)}>
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded",
                      m.bot ? "bg-violet-600 text-white" : "bg-amber-500 text-white"
                    )}
                  >
                    {m.bot ? <Bot className="size-3" /> : <User className="size-3" />}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold">
                      {m.author}
                      {m.bot && (
                        <span className="ml-1 rounded-sm bg-muted px-1 text-[7px] font-medium text-muted-foreground align-middle">
                          앱
                        </span>
                      )}
                      {m.time && (
                        <span className="ml-1 text-[8px] font-normal text-muted-foreground">{m.time}</span>
                      )}
                    </span>
                    <div className="whitespace-pre-wrap text-[10px] leading-snug text-foreground/90">
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {app.composerId ? (
            <div className="shrink-0 px-2.5 pb-2">
              <div
                data-demo-id={app.composerId}
                className="flex min-h-6.5 items-center justify-between gap-2 rounded-md border px-2 py-1 text-[10px]"
              >
                <span className={rt.typed[app.composerId] ? "text-foreground" : "text-muted-foreground/50"}>
                  {rt.typed[app.composerId] ?? `#${active?.name}에 메시지 보내기`}
                  <Caret active={rt.typingId === app.composerId} />
                </span>
                <Send className="size-3 shrink-0 text-muted-foreground" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 메일 (Gmail풍) ---------------------------------- */

function EmailAppView({ app, rt }: { app: EmailApp; rt: DemoRuntime }) {
  const composeOpen = app.compose ? rt.isVisible(app.compose.id, true) : false;
  return (
    <WindowChrome title="메일">
      <div className="flex h-full">
        <div className="w-[27%] shrink-0 border-r bg-muted/40 py-2">
          <div className="mx-2 mb-2 flex items-center gap-1.5 rounded-full border bg-background px-2 py-1 text-[9px] font-semibold text-muted-foreground shadow-xs">
            <Pencil className="size-2.5" /> 편지쓰기
          </div>
          {app.folders.map((f) => (
            <div
              key={f.id}
              data-demo-id={f.id}
              className={cn(
                "flex items-center justify-between px-2.5 py-1 text-[10px]",
                f.active ? "rounded-r-full bg-violet-100 font-bold text-violet-800 dark:bg-violet-500/20 dark:text-violet-200" : "text-muted-foreground"
              )}
            >
              <span className="flex items-center gap-1.5">
                <Inbox className="size-2.5" /> {f.name}
              </span>
              {f.count ? <span className="text-[9px]">{f.count}</span> : null}
            </div>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <div className="flex h-6 items-center gap-1.5 border-b px-2.5 text-[9px] text-muted-foreground">
            <Search className="size-2.5" /> 메일 검색
          </div>
          <div>
            {app.emails
              .filter((e) => rt.isVisible(e.id, e.hidden))
              .map((e) => (
                <div
                  key={e.id}
                  data-demo-id={e.id}
                  className={cn(
                    "flex items-baseline gap-2 border-b px-2.5 py-1.5 text-[10px]",
                    APPEAR,
                    e.unread ? "bg-background font-bold" : "bg-muted/30 text-muted-foreground"
                  )}
                >
                  <span className="w-[26%] shrink-0 truncate">{e.from}</span>
                  <span className="truncate">{e.subject}</span>
                  {e.preview ? (
                    <span className="hidden truncate font-normal text-muted-foreground sm:inline">
                      — {e.preview}
                    </span>
                  ) : null}
                </div>
              ))}
          </div>
          {/* 작성 오버레이 */}
          {app.compose && composeOpen ? (
            <div
              data-demo-id={app.compose.id}
              className={cn(
                "absolute bottom-0 right-2 flex w-[78%] max-w-64 flex-col overflow-hidden rounded-t-lg border bg-card shadow-lg",
                APPEAR
              )}
            >
              <div className="flex items-center justify-between bg-zinc-800 px-2 py-1 text-[9px] font-semibold text-zinc-100">
                새 메일 <X className="size-2.5" />
              </div>
              {(
                [
                  { id: app.compose.toId, ph: "받는사람" },
                  { id: app.compose.subjectId, ph: "제목" },
                ] as const
              ).map((f) => (
                <div key={f.id} data-demo-id={f.id} className="border-b px-2 py-1 text-[9.5px]">
                  <span className={rt.typed[f.id] ? "text-foreground" : "text-muted-foreground/50"}>
                    {rt.typed[f.id] ?? f.ph}
                    <Caret active={rt.typingId === f.id} />
                  </span>
                </div>
              ))}
              <div
                data-demo-id={app.compose.bodyId}
                className="min-h-12 px-2 py-1.5 text-[9.5px] leading-snug"
              >
                <span className={rt.typed[app.compose.bodyId] ? "text-foreground" : "text-muted-foreground/40"}>
                  {rt.typed[app.compose.bodyId] ?? ""}
                  <Caret active={rt.typingId === app.compose.bodyId} />
                </span>
              </div>
              <div className="flex px-2 pb-1.5">
                <span
                  data-demo-id={app.compose.sendId}
                  className="rounded-full bg-violet-600 px-3 py-1 text-[9px] font-bold text-white"
                >
                  보내기
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </WindowChrome>
  );
}

/* ---------------------------------- 디스패처 ---------------------------------- */

function GlobeFallback() {
  return (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      <Globe className="size-5" />
    </div>
  );
}

export function DemoAppView({ app, rt }: { app: DemoApp; rt: DemoRuntime }) {
  switch (app.kind) {
    case "code-editor":
      return <CodeEditorView app={app} rt={rt} />;
    case "browser":
      return <BrowserView app={app} rt={rt} />;
    case "design-canvas":
      return <DesignCanvasView app={app} rt={rt} />;
    case "automation-canvas":
      return <AutomationCanvasView app={app} rt={rt} />;
    case "chat-app":
      return <ChatAppView app={app} rt={rt} />;
    case "email-app":
      return <EmailAppView app={app} rt={rt} />;
    default:
      return <GlobeFallback />;
  }
}
