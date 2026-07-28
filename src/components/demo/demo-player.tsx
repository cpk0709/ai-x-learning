"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Gauge, MousePointer2, Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoAction, DemoScene } from "@/content/types";
import { Button } from "@/components/ui/button";
import { DemoAppView, type DemoRuntime } from "./demo-apps";

/**
 * 데모 플레이어 — 시뮬레이션 스크린캐스트 재생 엔진.
 *
 * - 커서가 data-demo-id 요소로 부드럽게 이동
 * - 클릭: 물결 1회 / 더블클릭: 물결 2회 / 드래그: 누른 채 이동
 * - 타이핑: 글자 단위 입력 + 캐럿
 * - 자막, 요소 등장(reveal), 재생/일시정지/다시보기/배속
 */

interface Ripple {
  key: number;
  x: number;
  y: number;
}

const CANCELLED = Symbol("demo-cancelled");

export function DemoPlayer({ scene, className }: { scene: DemoScene; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const runIdRef = useRef(0);
  const stepRef = useRef(0);
  const rippleKeyRef = useRef(0);
  const speedRef = useRef(1);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [cursor, setCursor] = useState({ x: 55, y: 62 });
  const [moveMs, setMoveMs] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [typingId, setTypingId] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);

  const rt: DemoRuntime = {
    isVisible: (id, hiddenByDefault) => {
      if (hiddenIds.has(id)) return false;
      if (hiddenByDefault) return revealed.has(id) || typed[id] !== undefined;
      return true;
    },
    typed,
    typingId,
  };

  /** 요소 중심 좌표(% 기준). 요소가 없거나 숨겨져 있으면 null */
  const posOf = useCallback((id: string): { x: number; y: number } | null => {
    const container = containerRef.current;
    if (!container) return null;
    const el = container.querySelector<HTMLElement>(`[data-demo-id="${CSS.escape(id)}"]`);
    if (!el) return null;
    const cRect = container.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return null;
    return {
      x: ((rect.left + rect.width / 2 - cRect.left) / cRect.width) * 100,
      y: ((rect.top + rect.height / 2 - cRect.top) / cRect.height) * 100,
    };
  }, []);

  const sleep = useCallback((ms: number, token: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (token !== runIdRef.current) reject(CANCELLED);
        else resolve();
      }, ms / speedRef.current);
    });
  }, []);

  const spawnRipple = useCallback(() => {
    setCursor((c) => {
      const key = ++rippleKeyRef.current;
      setRipples((r) => [...r, { key, x: c.x, y: c.y }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.key !== key)), 900);
      return c;
    });
    setPressed(true);
    setTimeout(() => setPressed(false), 180);
  }, []);

  const moveTo = useCallback(
    async (id: string, ms: number, token: number) => {
      const p = posOf(id);
      if (!p) return;
      setMoveMs(ms / speedRef.current);
      setCursor(p);
      await sleep(ms + 120, token);
    },
    [posOf, sleep]
  );

  const exec = useCallback(
    async (a: DemoAction, token: number) => {
      switch (a.t) {
        case "caption":
          setCaption(a.text);
          await sleep(700, token);
          break;
        case "move":
          await moveTo(a.target, a.ms ?? 800, token);
          break;
        case "click":
          if (a.target) await moveTo(a.target, 450, token);
          spawnRipple();
          await sleep(600, token);
          break;
        case "dblclick":
          if (a.target) await moveTo(a.target, 450, token);
          spawnRipple();
          await sleep(230, token);
          spawnRipple();
          await sleep(650, token);
          break;
        case "drag": {
          await moveTo(a.from, 500, token);
          setPressed(true);
          const p = posOf(a.to);
          if (p) {
            const ms = a.ms ?? 900;
            setMoveMs(ms / speedRef.current);
            setCursor(p);
            await sleep(ms + 120, token);
          }
          setPressed(false);
          await sleep(250, token);
          break;
        }
        case "type": {
          // 숨김 요소면 먼저 등장시키고 DOM 반영을 기다림
          setRevealed((s) => new Set(s).add(a.target));
          setTyped((t) => ({ ...t, [a.target]: t[a.target] ?? "" }));
          await sleep(180, token);
          setTypingId(a.target);
          const cps = a.cps ?? 18;
          const step = Math.max(1, Math.round(cps / 12)); // 틱당 글자 수
          for (let i = step; i <= a.text.length + step - 1; i += step) {
            const slice = a.text.slice(0, Math.min(i, a.text.length));
            setTyped((t) => ({ ...t, [a.target]: slice }));
            await sleep((1000 / cps) * step, token);
          }
          setTypingId(null);
          await sleep(250, token);
          break;
        }
        case "reveal":
          setRevealed((s) => new Set(s).add(a.target));
          setHiddenIds((s) => {
            const next = new Set(s);
            next.delete(a.target);
            return next;
          });
          await sleep(500, token);
          break;
        case "hide":
          setHiddenIds((s) => new Set(s).add(a.target));
          // 입력창 비우기 시연: 타이핑된 텍스트도 함께 제거 (reveal로 복원 가능)
          setTyped((t) => {
            if (!(a.target in t)) return t;
            const next = { ...t };
            delete next[a.target];
            return next;
          });
          await sleep(300, token);
          break;
        case "wait":
          await sleep(a.ms, token);
          break;
      }
    },
    [moveTo, posOf, sleep, spawnRipple]
  );

  const resetState = useCallback(() => {
    stepRef.current = 0;
    setProgress(0);
    setRevealed(new Set());
    setHiddenIds(new Set());
    setTyped({});
    setTypingId(null);
    setCaption(null);
    setMoveMs(0);
    setCursor({ x: 55, y: 62 });
    setDone(false);
  }, []);

  const runFrom = useCallback(
    async (index: number) => {
      const token = ++runIdRef.current;
      setPlaying(true);
      setStarted(true);
      setDone(false);
      try {
        let start = index;
        for (;;) {
          for (let i = start; i < scene.actions.length; i++) {
            stepRef.current = i;
            await exec(scene.actions[i], token);
            setProgress(((i + 1) / scene.actions.length) * 100);
          }
          if (!scene.loop) {
            setPlaying(false);
            setDone(true);
            stepRef.current = 0;
            return;
          }
          // 루프 모드: 잠시 여운 후 처음부터 반복
          await sleep(1400, token);
          resetState();
          await sleep(400, token);
          start = 0;
        }
      } catch (e) {
        if (e !== CANCELLED) throw e;
      }
    },
    [exec, resetState, scene.actions, scene.loop, sleep]
  );

  const pause = useCallback(() => {
    runIdRef.current++; // 진행 중 스텝 취소 (스텝 경계에서 정지)
    setPlaying(false);
    setTypingId(null);
  }, []);

  const play = useCallback(() => {
    if (done) resetState();
    void runFrom(done ? 0 : stepRef.current);
  }, [done, resetState, runFrom]);

  const restart = useCallback(() => {
    runIdRef.current++;
    resetState();
    void runFrom(0);
  }, [resetState, runFrom]);

  const toggleSpeed = useCallback(() => {
    setSpeed((s) => {
      const next = s === 1 ? 1.5 : s === 1.5 ? 2 : 1;
      speedRef.current = next;
      return next;
    });
  }, []);

  // 언마운트 시 재생 중단
  useEffect(() => () => void runIdRef.current++, []);

  return (
    <figure className={cn("w-full", className)}>
      <figcaption className="mb-2 flex items-center gap-2">
        <span className="flex size-5 items-center justify-center rounded bg-violet-600 text-white">
          <MousePointer2 className="size-3" aria-hidden />
        </span>
        <span className="text-sm font-semibold tracking-tight">{scene.title}</span>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-1.5 py-px text-[10px] font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
          따라하기 데모
        </span>
      </figcaption>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* 스테이지 */}
        <div ref={containerRef} className="relative aspect-[16/10] w-full select-none">
          <DemoAppView app={scene.app} rt={rt} />

          {/* 물결 효과 (클릭 1회 / 더블클릭 2회) */}
          {ripples.map((r) => (
            <span
              key={r.key}
              className="pointer-events-none absolute z-30 size-9 rounded-full border-2 border-violet-500 bg-violet-500/25"
              style={{
                left: `${r.x}%`,
                top: `${r.y}%`,
                transform: "translate(-50%, -50%)",
                animation: "demo-ripple 0.85s ease-out forwards",
              }}
              aria-hidden
            />
          ))}

          {/* 커서 */}
          {started && (
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "pointer-events-none absolute z-40 size-5 drop-shadow-md transition-transform",
                pressed && "scale-75"
              )}
              style={{
                left: `${cursor.x}%`,
                top: `${cursor.y}%`,
                transitionProperty: "left, top, transform",
                transitionDuration: `${moveMs}ms, ${moveMs}ms, 150ms`,
                transitionTimingFunction: "cubic-bezier(0.3, 0.7, 0.4, 1)",
              }}
              aria-hidden
            >
              <path
                d="M5 3l14 8.5-6.1 1.3L9.5 19 5 3z"
                className="fill-white stroke-zinc-900"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {/* 자막 */}
          {caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center px-3">
              <span className="max-w-[92%] rounded-md bg-zinc-900/85 px-2.5 py-1 text-center text-[11px] font-medium leading-snug text-white shadow-md backdrop-blur-sm">
                {caption}
              </span>
            </div>
          )}

          {/* 시작 오버레이 */}
          {!started && (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-zinc-950/45 text-white backdrop-blur-[2px] transition-colors hover:bg-zinc-950/55"
              aria-label="데모 재생"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-violet-600 shadow-lg transition-transform hover:scale-105">
                <Play className="ml-0.5 size-5" fill="currentColor" />
              </span>
              <span className="text-xs font-semibold">데모 재생하기</span>
            </button>
          )}

          {/* 종료 오버레이 */}
          {done && (
            <button
              type="button"
              onClick={restart}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-zinc-950/45 text-white backdrop-blur-[2px] transition-colors hover:bg-zinc-950/55"
              aria-label="데모 다시 보기"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-violet-600 shadow-lg transition-transform hover:scale-105">
                <RotateCcw className="size-5" />
              </span>
              <span className="text-xs font-semibold">다시 보기</span>
            </button>
          )}
        </div>

        {/* 컨트롤 바 */}
        <div className="flex items-center gap-1.5 border-t bg-muted/40 px-2 py-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={playing ? pause : play}
            aria-label={playing ? "일시정지" : "재생"}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={restart}
            disabled={!started}
            aria-label="처음부터"
          >
            <RotateCcw className="size-3.5" />
          </Button>
          <div
            className="mx-1 h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-violet-600 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-[11px] font-semibold tabular-nums"
            onClick={toggleSpeed}
            aria-label="재생 속도 변경"
          >
            <Gauge className="size-3.5" /> {speed}x
          </Button>
        </div>
      </div>
    </figure>
  );
}
