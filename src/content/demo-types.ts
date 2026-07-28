import type { IconKey, Tone } from "./types";

/**
 * 데모(시뮬레이션 스크린캐스트) 타입 시스템
 *
 * 실제 영상 대신, 실무 도구의 화면을 일러스트로 재현하고 커서가 움직이며
 * 클릭·타이핑을 시연하는 "따라하기 데모"를 데이터로 정의합니다.
 * 렌더링/재생은 src/components/demo/ 의 플레이어가 담당합니다.
 *
 * ── 작성 규칙 ─────────────────────────────────────────────
 * - 모든 요소는 고유 id를 가지며, 액션의 target은 이 id를 참조합니다.
 * - `hidden: true` 요소는 reveal/type 액션으로 등장시킵니다.
 * - 액션은 위에서 아래로 순차 재생됩니다. 흐름: caption → move → click → ...
 * - 클릭은 물결 1회, 더블클릭은 물결 2회 효과가 자동 적용됩니다.
 * - 각 데모는 20~40개 액션, 재생 시간 30~60초 분량을 권장합니다.
 *
 * ── 미니 예시 (각 앱 템플릿) ──────────────────────────────
 *
 * [code-editor] AI 코딩 도구/에디터 시연:
 *   app: { kind: "code-editor", windowTitle: "cart.ts — Cursor",
 *     files: [{ id: "f1", name: "cart.ts", active: true }, { id: "f2", name: "cart.test.ts" }],
 *     code: [
 *       { id: "c1", text: "function discount(total: number) {" },
 *       { id: "c2", text: "return total * 0.9;", indent: 1, tone: "add", hidden: true },
 *       { id: "c3", text: "}" },
 *     ],
 *     terminal: [
 *       { id: "t1", text: "npx vitest run", tone: "cmd", hidden: true },
 *       { id: "t2", text: "✓ 12 passed", tone: "ok", hidden: true },
 *     ] }
 *   actions: [
 *     { t: "caption", text: "할인 로직을 추가합니다" },
 *     { t: "move", target: "c1" }, { t: "click" },
 *     { t: "type", target: "c2", text: "return total * 0.9;" },
 *     { t: "reveal", target: "t1" }, { t: "reveal", target: "t2" },
 *   ]
 *
 * [design-canvas] Figma/디자인 에디터 시연:
 *   app: { kind: "design-canvas", windowTitle: "히어로 섹션 — Figma",
 *     tools: [{ id: "tool-rect", icon: "image", label: "사각형" }, { id: "tool-text", icon: "file-text", label: "텍스트" }],
 *     objects: [
 *       { id: "frame", shape: "frame", label: "Hero", x: 8, y: 10, w: 84, h: 80 },
 *       { id: "rect1", shape: "rect", x: 14, y: 24, w: 30, h: 40, color: "#8b5cf6", hidden: true },
 *     ] }
 *   actions: [
 *     { t: "move", target: "tool-rect" }, { t: "click" },
 *     { t: "drag", from: "frame", to: "rect1" }, { t: "reveal", target: "rect1" },
 *   ]
 *
 * [automation-canvas] Make/Zapier 노드 시연:
 *   app: { kind: "automation-canvas", windowTitle: "고객 문의 자동 분류 — Make",
 *     nodes: [
 *       { id: "n1", icon: "mail", label: "Gmail", sublabel: "새 메일 감지", tone: "accent" },
 *       { id: "n2", icon: "brain", label: "AI 분류", hidden: true },
 *     ],
 *     runLog: [{ id: "log1", text: "✓ 시나리오 실행 성공", tone: "ok", hidden: true }] }
 *
 * [chat-app] Slack풍 메신저 시연:
 *   app: { kind: "chat-app", workspace: "우리 팀", composerId: "input",
 *     channels: [{ id: "ch1", name: "cs-알림", active: true }],
 *     messages: [{ id: "m1", author: "자동화봇", bot: true, text: "새 문의가 접수되었습니다", hidden: true }] }
 *
 * [email-app] Gmail풍 메일 시연:
 *   app: { kind: "email-app",
 *     folders: [{ id: "inbox", name: "받은편지함", count: 3, active: true }],
 *     emails: [{ id: "e1", from: "고객 김OO", subject: "환불 문의드립니다", unread: true }],
 *     compose: { id: "cp", toId: "cp-to", subjectId: "cp-subj", bodyId: "cp-body", sendId: "cp-send" } }
 *
 * [browser] 웹 서비스 화면 시연:
 *   app: { kind: "browser", url: "app.suno.ai",
 *     blocks: [
 *       { id: "b1", type: "heading", label: "Create" },
 *       { id: "b2", type: "input", label: "스타일 프롬프트 입력…" },
 *       { id: "b3", type: "button", label: "Generate" },
 *       { id: "b4", type: "card", label: "🎵 lofi-track-01.mp3", hidden: true },
 *     ] }
 */

/* ---------------------------------- 액션 ---------------------------------- */

export type DemoAction =
  /** 하단 자막 표시 (다음 caption까지 유지) */
  | { t: "caption"; text: string }
  /** 커서를 요소로 이동 (기본 800ms) */
  | { t: "move"; target: string; ms?: number }
  /** 클릭 — 물결 1회. target 지정 시 짧게 이동 후 클릭 */
  | { t: "click"; target?: string }
  /** 더블클릭 — 물결 2회 연속 */
  | { t: "dblclick"; target?: string }
  /** 드래그 — from에서 누른 채 to까지 이동 */
  | { t: "drag"; from: string; to: string; ms?: number }
  /** 타이핑 — target 요소에 텍스트가 한 글자씩 입력됨 (숨김 요소면 자동 등장) */
  | { t: "type"; target: string; text: string; cps?: number }
  /** 숨김 요소 등장 */
  | { t: "reveal"; target: string }
  /** 요소 숨기기 */
  | { t: "hide"; target: string }
  /** 대기 */
  | { t: "wait"; ms: number };

/* ---------------------------------- 앱 템플릿 ---------------------------------- */

export interface CodeEditorApp {
  kind: "code-editor";
  windowTitle: string;
  /** 좌측 파일 트리 */
  files: { id: string; name: string; active?: boolean }[];
  /** 코드 라인 (indent: 들여쓰기 단계) */
  code: {
    id: string;
    text: string;
    indent?: number;
    tone?: "code" | "comment" | "add" | "del";
    hidden?: boolean;
  }[];
  /** 하단 터미널 패널 (선택) */
  terminal?: {
    id: string;
    text: string;
    tone?: "cmd" | "out" | "ok" | "err";
    hidden?: boolean;
  }[];
}

export interface BrowserApp {
  kind: "browser";
  url: string;
  blocks: {
    id: string;
    type: "heading" | "text" | "button" | "input" | "card" | "badge";
    label: string;
    hidden?: boolean;
  }[];
}

export interface DesignCanvasApp {
  kind: "design-canvas";
  windowTitle: string;
  /** 좌측 툴바 */
  tools: { id: string; icon: IconKey; label: string }[];
  /** 캔버스 오브젝트 — x/y/w/h는 캔버스 기준 % 좌표 */
  objects: {
    id: string;
    shape: "frame" | "rect" | "ellipse" | "text" | "image";
    label?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    color?: string;
    hidden?: boolean;
  }[];
}

export interface AutomationCanvasApp {
  kind: "automation-canvas";
  windowTitle: string;
  /** 좌→우로 연결선과 함께 배치되는 노드들 */
  nodes: {
    id: string;
    icon: IconKey;
    label: string;
    sublabel?: string;
    tone?: Tone;
    hidden?: boolean;
  }[];
  /** 하단 실행 로그 (선택) */
  runLog?: {
    id: string;
    text: string;
    tone?: "out" | "ok" | "err";
    hidden?: boolean;
  }[];
}

export interface ChatApp {
  kind: "chat-app";
  workspace: string;
  channels: { id: string; name: string; active?: boolean }[];
  messages: {
    id: string;
    author: string;
    text: string;
    time?: string;
    bot?: boolean;
    hidden?: boolean;
  }[];
  /** 하단 입력창의 타깃 id — type 액션으로 입력 시연 */
  composerId?: string;
}

export interface EmailApp {
  kind: "email-app";
  folders: { id: string; name: string; count?: number; active?: boolean }[];
  emails: {
    id: string;
    from: string;
    subject: string;
    preview?: string;
    unread?: boolean;
    hidden?: boolean;
  }[];
  /** 메일 작성 오버레이 (reveal(compose.id)로 열기, 각 필드는 type 타깃) */
  compose?: {
    id: string;
    toId: string;
    subjectId: string;
    bodyId: string;
    sendId: string;
  };
}

export type DemoApp =
  | CodeEditorApp
  | BrowserApp
  | DesignCanvasApp
  | AutomationCanvasApp
  | ChatApp
  | EmailApp;

/* ---------------------------------- 씬 ---------------------------------- */

export interface DemoScene {
  /** 플레이어 상단에 표시할 데모 제목 */
  title: string;
  app: DemoApp;
  actions: DemoAction[];
  /** 끝나면 처음부터 자동 반복 */
  loop?: boolean;
}
