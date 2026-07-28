import type { Course } from "../types";

/**
 * AI 코딩 툴 실전 — Claude Code · Cursor · Copilot을 조합해
 * 개발 생산성을 극대화하는 스텝별 실전 가이드.
 *
 * 스타일은 loop-engineering.ts(품질 기준)를 따릅니다.
 */
export const aiCodingTools: Course = {
  slug: "ai-coding-tools",
  title: "AI 코딩 툴 실전: Claude Code · Cursor · Copilot",
  subtitle: "세 가지 대표 AI 코딩 도구를 조합해 개발 속도를 몇 배로 끌어올리는 실전 가이드",
  description:
    "2026년의 개발자는 도구 하나를 '잘 쓰는' 사람이 아니라, 상황마다 맞는 도구를 '조합하는' 사람입니다. 이 강의에서는 탭 자동완성(Copilot·Cursor Tab), IDE 에이전트(Cursor Agent), 터미널 에이전트(Claude Code)라는 세 축을 각각 익히고, 하나의 하루 워크플로우로 엮는 법까지 다룹니다. 설치와 첫 작업부터 CLAUDE.md 맥락 주입, 플랜 모드, AI 코드 리뷰, 팀 도입과 생산성 측정까지 — 실무에서 바로 쓰는 순서 그대로 배웁니다.",
  category: "dev",
  level: "beginner",
  tags: ["Claude Code", "Cursor", "GitHub Copilot", "AI 코딩", "개발 생산성"],
  gradient: ["#10b981", "#0ea5e9"],
  icon: "code",
  outcomes: [
    "AI 코딩 도구 3분류(자동완성·IDE 에이전트·터미널 에이전트)를 이해하고 상황별로 고를 수 있다",
    "Claude Code를 설치하고 CLAUDE.md로 프로젝트 맥락을 주입해 첫 작업을 완료할 수 있다",
    "목표+제약+검증이 갖춰진 작업 지시문과 플랜 모드로 대규모 변경을 안전하게 수행할 수 있다",
    "세 도구를 조합한 하루 워크플로우를 설계하고, 팀 도입 정책과 생산성 측정까지 이어갈 수 있다",
  ],
  modules: [
    {
      slug: "tool-landscape",
      title: "도구의 지형도",
      description: "2026년 AI 코딩 도구 3분류와 선택 기준, 각 도구의 기본기",
      lessons: [
        {
          slug: "three-categories",
          title: "AI 코딩 도구 3분류: 자동완성·IDE 에이전트·터미널 에이전트",
          minutes: 5,
          content: `"어떤 AI 코딩 툴이 제일 좋아요?"는 잘못된 질문입니다. 2026년의 도구들은 서로 **다른 일**을 하기 때문입니다.

## 세 가지 분류

- **자동완성형** (Copilot 자동완성, Cursor Tab) — 타이핑하는 **문장 단위**를 이어 씁니다. 개입은 작지만 빈도는 초 단위입니다.
- **IDE 에이전트형** (Cursor Agent, Copilot 에이전트 모드) — 에디터 안에서 **여러 파일을 스스로 수정**합니다. 변경 diff를 눈으로 보며 승인합니다.
- **터미널 에이전트형** (Claude Code) — 터미널에서 **파일·명령어·git까지** 다루며 작업을 끝까지 완수합니다. 가장 자율적입니다.

## 선택 기준: 작업의 크기와 자율성

- 한 줄~한 함수 → 자동완성형
- 한 기능, 파일 몇 개 → IDE 에이전트형
- 탐색·리팩토링·반복 작업·검증 루프 → 터미널 에이전트형

## 하나만 고르지 마세요

세 분류는 경쟁 관계가 아니라 **레이어**입니다. 실무 고수들은 세 층을 동시에 켜 두고 작업 크기에 따라 갈아탑니다. 이 강의의 목표가 바로 그 조합입니다.

> 💡 **핵심**: 도구 선택 기준은 브랜드가 아니라 **작업의 크기와 맡길 자율성의 정도**입니다.`,
          illustration: {
            type: "stack",
            title: "AI 코딩 도구 3층 구조",
            layers: [
              {
                label: "자동완성형",
                sublabel: "Copilot · Cursor Tab — 문장 단위, 초 단위 개입",
                icon: "zap",
                tone: "accent",
              },
              {
                label: "IDE 에이전트형",
                sublabel: "Cursor Agent · Copilot 에이전트 — 여러 파일 수정",
                icon: "code",
                tone: "primary",
              },
              {
                label: "터미널 에이전트형",
                sublabel: "Claude Code — 파일·명령어·git, 작업 완수",
                icon: "terminal",
                tone: "success",
              },
            ],
            caption: "아래로 갈수록 자율성이 커집니다 — 세 층을 함께 쓰는 것이 2026년의 표준입니다.",
          },
        },
        {
          slug: "tab-autocomplete",
          title: "탭 자동완성 잘 쓰는 법: Copilot과 Cursor Tab",
          minutes: 5,
          content: `자동완성은 켜 두기만 하면 되는 기능이 아닙니다. **좋은 제안을 유도하는 습관**이 있는 사람과 없는 사람의 속도 차이는 큽니다.

## 제안 품질은 내가 만든다

자동완성은 **주변 코드와 열려 있는 파일**을 읽고 다음을 예측합니다. 그래서:

- **이름을 먼저 잘 짓기** — \`calculateDiscountedTotal\`이라고 쓰는 순간 구현의 절반이 제안됩니다.
- **주석으로 의도 선언** — 함수 위에 한 줄 주석을 쓰면 그 방향으로 제안이 옵니다.
- **참고할 파일을 옆 탭에 열어두기** — 비슷한 기존 코드가 열려 있으면 팀 컨벤션대로 제안됩니다.

## Cursor Tab의 진화: 다음 '편집' 예측

2026년의 Tab은 커서 위치의 완성만이 아니라, **다음에 고칠 위치로 점프**까지 제안합니다. 파라미터 하나를 바꾸면 그걸 쓰는 다른 줄들로 탭탭탭 — 연쇄 수정이 순식간에 끝납니다. Copilot도 같은 방향의 '다음 편집 제안'을 제공합니다.

## 받아들이기의 규율

- 제안을 **읽지 않고 탭 누르기 금지** — 그럴듯한 오답이 가장 위험합니다.
- 3번 연속 엉뚱한 제안이 오면, 자동완성과 싸우지 말고 상위 도구(채팅·에이전트)로 전환하세요.

> 💡 **핵심**: 자동완성의 실력 = **이름·주석·열린 탭**으로 맥락을 공급하는 여러분의 실력입니다.`,
          illustration: {
            type: "steps",
            title: "좋은 제안을 유도하는 4단계 습관",
            steps: [
              {
                label: "의도가 드러나는 이름 짓기",
                sublabel: "함수·변수명이 곧 프롬프트",
                icon: "file-text",
              },
              {
                label: "한 줄 주석으로 방향 선언",
                sublabel: "// 만료 쿠폰은 제외하고 합산",
                icon: "message",
              },
              {
                label: "참고 파일을 옆 탭에 열기",
                sublabel: "팀 컨벤션대로 제안 유도",
                icon: "layers",
              },
              {
                label: "읽고 나서 탭 누르기",
                sublabel: "연속 오답이면 상위 도구로 전환",
                icon: "check",
              },
            ],
            caption: "자동완성은 수동적 기능이 아니라, 맥락을 '공급'하며 쓰는 능동적 도구입니다.",
          },
          demo: {
            title: "주석으로 자동완성 유도하기 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "coupon.ts — Cursor",
              files: [
                { id: "f-coupon", name: "coupon.ts", active: true },
                { id: "f-cart", name: "cart.ts" },
              ],
              code: [
                { id: "c1", text: "// 만료 쿠폰은 제외하고 합산", tone: "comment", hidden: true },
                { id: "c2", text: "function sumValidCoupons(coupons) {", hidden: true },
                { id: "c3", text: "const now = Date.now();", indent: 1, tone: "add", hidden: true },
                { id: "c4", text: "return coupons", indent: 1, tone: "add", hidden: true },
                { id: "c5", text: ".filter((c) => c.expiresAt > now)", indent: 2, tone: "add", hidden: true },
                { id: "c6", text: ".reduce((s, c) => s + c.amount, 0);", indent: 2, tone: "add", hidden: true },
                { id: "c7", text: "}", tone: "add", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 참고할 파일을 옆 탭에 열어 맥락을 공급합니다" },
              { t: "move", target: "f-cart" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "move", target: "f-coupon" },
              { t: "click" },
              { t: "caption", text: "② 한 줄 주석으로 의도를 먼저 선언합니다" },
              { t: "type", target: "c1", text: "// 만료 쿠폰은 제외하고 합산" },
              { t: "caption", text: "③ 의도가 드러나는 함수명을 타이핑합니다" },
              { t: "type", target: "c2", text: "function sumValidCoupons(coupons) {" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ 구현 전체가 회색 제안으로 나타납니다" },
              { t: "reveal", target: "c3" },
              { t: "reveal", target: "c4" },
              { t: "reveal", target: "c5" },
              { t: "reveal", target: "c6" },
              { t: "reveal", target: "c7" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "⑤ 제안을 끝까지 읽은 뒤 탭으로 수락합니다" },
              { t: "move", target: "c5" },
              { t: "click" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "inline-vs-chat",
          title: "인라인 편집 vs 채팅: 언제 무엇을 쓰나",
          minutes: 4,
          content: `에디터 안에는 자동완성 말고도 두 개의 입구가 더 있습니다. **인라인 편집**과 **채팅**을 구분해 쓰면 왕복이 줄어듭니다.

## 인라인 편집 (Cursor Cmd+K, Copilot 인라인 챗)

코드를 **블록 선택하고 그 자리에서** 지시합니다.

- "이 함수를 async/await로 바꿔줘"
- "이 부분 에러 처리 추가해줘"
- 장점: 범위가 명확해서 빠르고 정확, diff가 바로 그 자리에 표시
- 적합: **어디를 고칠지 내가 이미 아는** 국소 수정

## 채팅 / 에이전트 패널

파일을 넘나드는 질문과 작업은 채팅으로 갑니다.

- "이 에러가 왜 나는지 관련 코드 찾아서 설명해줘"
- "이 컴포넌트를 세 파일로 분리해줘" (에이전트 모드가 여러 파일을 수정)
- 적합: **어디를 고칠지 모르거나, 여러 파일에 걸친** 작업

## 구분 기준 한 줄

"수정할 **범위를 손으로 선택할 수 있는가?"** — 선택할 수 있으면 인라인, 없으면 채팅입니다. 인라인으로 할 일을 채팅으로 하면 느리고, 채팅으로 할 일을 인라인으로 하면 맥락이 부족해 틀립니다.

> 💡 **핵심**: 범위를 아는 국소 수정은 **인라인**, 범위를 모르는 탐색·다중 파일 작업은 **채팅/에이전트**.`,
          illustration: {
            type: "compare",
            title: "인라인 편집 vs 채팅",
            columns: [
              {
                title: "인라인 편집 (Cmd+K)",
                icon: "wand",
                tone: "accent",
                items: [
                  "블록 선택 → 그 자리에서 지시",
                  "범위를 내가 이미 앎",
                  "diff가 즉시 그 자리에 표시",
                  "국소 수정에 최속",
                ],
              },
              {
                title: "채팅 / 에이전트",
                icon: "message",
                tone: "primary",
                items: [
                  "질문·탐색·설명 요청",
                  "범위를 모르는 작업",
                  "여러 파일에 걸친 수정",
                  "에이전트 모드로 자율 실행",
                ],
              },
            ],
            caption: "판별 질문은 하나 — '수정 범위를 손으로 선택할 수 있는가?'",
          },
        },
      ],
    },
    {
      slug: "agent-coding",
      title: "에이전트 코딩 실전",
      description: "Claude Code로 배우는 터미널 에이전트 활용의 모든 것",
      lessons: [
        {
          slug: "claude-code-first-task",
          title: "Claude Code 시작하기: 설치부터 첫 작업까지",
          minutes: 6,
          content: `터미널 에이전트는 백문이 불여일견입니다. 10분 안에 설치하고 첫 작업을 맡겨봅니다.

## 설치와 실행

\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
cd my-project
claude
\`\`\`

공식 설치 스크립트 한 줄이면 됩니다(Windows는 PowerShell용 스크립트 제공). 프로젝트 루트에서 \`claude\`를 실행하면 대화형 세션이 열립니다. 로그인은 최초 1회면 됩니다.

## 첫 작업은 '읽기'부터

바로 코드를 고치게 하지 말고, 프로젝트를 파악하게 하세요.

- "이 프로젝트 구조를 요약해줘"
- "결제 로직이 어디 있는지 찾아서 흐름을 설명해줘"

에이전트가 파일을 뒤지며 답하는 과정을 보면 **무엇을 맡길 수 있는지** 감이 잡힙니다.

## 두 번째 작업: 작고 검증 가능한 수정

"로그인 버튼 라벨을 '시작하기'로 바꾸고, 빌드가 통과하는지 확인해줘" — 이렇게 **검증까지 포함한 작은 작업**이 좋은 출발점입니다. Claude Code는 파일을 수정하기 전 diff를 보여주고 승인을 요청하므로, 처음에는 하나씩 확인하며 신뢰를 쌓으세요.

> 💡 **핵심**: 첫 작업 공식 = **읽기 요청 → 작은 수정 + 검증**. 자율성은 신뢰가 쌓인 만큼만 넓히세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "claude — 첫 작업",
            lines: [
              { text: "curl -fsSL https://claude.ai/install.sh | bash", tone: "cmd" },
              { text: "claude", tone: "cmd" },
              { text: "# 나: 이 프로젝트 구조를 요약해줘", tone: "comment" },
              { text: "Next.js 앱 — app/ 라우트, lib/에 결제·인증 로직", tone: "out" },
              { text: "# 나: 로그인 버튼 라벨을 '시작하기'로 바꾸고 빌드 확인해줘", tone: "comment" },
              { text: "● app/login/page.tsx 수정 제안 (diff 승인 대기)", tone: "dim" },
              { text: "npm run build", tone: "cmd" },
              { text: "✓ Compiled successfully", tone: "ok" },
              { text: "완료 — 라벨 변경 + 빌드 통과 확인", tone: "ok" },
            ],
            caption: "읽기 → 작은 수정 → 검증. 첫 세션에서 이 흐름을 그대로 따라 해보세요.",
          },
          demo: {
            title: "Claude Code 첫 작업 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "my-project — Claude Code 세션",
              files: [
                { id: "f-page", name: "login/page.tsx", active: true },
                { id: "f-auth", name: "lib/auth.ts" },
                { id: "f-readme", name: "README.md" },
              ],
              code: [
                { id: "c1", text: "export default function LoginPage() {" },
                { id: "c2", text: "return (", indent: 1 },
                { id: "c3", text: "<Button>로그인</Button>", indent: 2, tone: "del" },
                { id: "c4", text: "<Button>시작하기</Button>", indent: 2, tone: "add", hidden: true },
                { id: "c5", text: ");", indent: 1 },
                { id: "c6", text: "}" },
              ],
              terminal: [
                { id: "t1", text: "claude", tone: "cmd", hidden: true },
                { id: "t2", text: "> 로그인 버튼 라벨을 '시작하기'로 바꿔줘", tone: "cmd", hidden: true },
                { id: "t3", text: "● login/page.tsx 수정 제안 (diff 승인 대기)", tone: "out", hidden: true },
                { id: "t4", text: "npm run build", tone: "cmd", hidden: true },
                { id: "t5", text: "✓ Compiled successfully", tone: "ok", hidden: true },
                { id: "t6", text: "완료 — 라벨 변경 + 빌드 통과 확인", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 프로젝트 루트에서 claude를 실행합니다" },
              { t: "type", target: "t1", text: "claude" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 작고 검증 가능한 작업을 지시합니다" },
              { t: "type", target: "t2", text: "> 로그인 버튼 라벨을 '시작하기'로 바꿔줘" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 에이전트가 제안한 diff를 확인하고 승인합니다" },
              { t: "move", target: "c3" },
              { t: "click" },
              { t: "reveal", target: "c4" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 빌드 명령으로 변경을 검증합니다" },
              { t: "type", target: "t4", text: "npm run build" },
              { t: "reveal", target: "t5" },
              { t: "reveal", target: "t6" },
              { t: "move", target: "t6" },
              { t: "caption", text: "⑤ 작은 수정 + 검증 완료 — 신뢰가 한 칸 쌓였습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "claude-md-context",
          title: "CLAUDE.md와 규칙 파일: 프로젝트 맥락 주입",
          minutes: 5,
          content: `같은 지시를 매번 반복하고 있다면, 그것은 채팅이 아니라 **파일에 적을 내용**입니다. 에이전트 도구들은 프로젝트의 규칙 파일을 매 세션 자동으로 읽습니다.

## CLAUDE.md: 프로젝트의 사용 설명서

프로젝트 루트의 \`CLAUDE.md\`는 Claude Code가 세션 시작 시 항상 읽는 파일입니다. \`/init\` 명령으로 초안을 자동 생성할 수 있습니다.

**넣어야 할 것:**

- 빌드·테스트·린트 명령어 (\`npm run check\` 등)
- 아키텍처 한 줄 요약과 핵심 디렉토리
- 팀 컨벤션 (예: "스타일은 Tailwind만, CSS 파일 생성 금지")
- 하지 말 것 (예: "마이그레이션 파일 직접 수정 금지")

**넣지 말아야 할 것:** 코드로 알 수 있는 세부사항, 금방 낡을 정보. 규칙 파일도 코드처럼 **짧고 최신**이어야 합니다.

## 다른 도구도 같은 구조

Cursor는 \`.cursor/rules\`, Copilot은 \`.github/copilot-instructions.md\`를 읽습니다. 내용의 원천을 하나로 관리하고 도구별 파일이 참조하게 하면 유지보수가 쉽습니다.

## 효과

규칙 파일 한 번 정리 = 앞으로의 **모든 세션에 자동 적용되는 프롬프트**. 팀원이 새 세션을 열어도 같은 규칙이 적용됩니다.

> 💡 **핵심**: 두 번 이상 반복한 지시는 채팅이 아니라 **CLAUDE.md에 적으세요**. 규칙 파일은 '영구 프롬프트'입니다.`,
          illustration: {
            type: "grid",
            title: "규칙 파일 생태계와 CLAUDE.md 구성",
            items: [
              {
                label: "CLAUDE.md",
                sublabel: "Claude Code · /init으로 초안 생성",
                icon: "file-text",
                tone: "primary",
              },
              {
                label: ".cursor/rules",
                sublabel: "Cursor 규칙 파일",
                icon: "settings",
                tone: "accent",
              },
              {
                label: "copilot-instructions.md",
                sublabel: "Copilot 지침 파일",
                icon: "clipboard",
                tone: "accent",
              },
              {
                label: "명령어",
                sublabel: "빌드·테스트·린트",
                icon: "terminal",
                tone: "success",
              },
              {
                label: "컨벤션",
                sublabel: "스타일·네이밍 규칙",
                icon: "check",
                tone: "success",
              },
              {
                label: "금지 사항",
                sublabel: "건드리면 안 되는 것",
                icon: "shield",
                tone: "warning",
              },
            ],
            caption: "위: 도구별 규칙 파일 · 아래: 어떤 파일이든 공통으로 담을 3요소.",
          },
          demo: {
            title: "CLAUDE.md 규칙 파일 만들기 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "CLAUDE.md — 규칙 파일 작성",
              files: [
                { id: "f-md", name: "CLAUDE.md", active: true },
                { id: "f-pkg", name: "package.json" },
                { id: "f-btn", name: "components/button.tsx" },
              ],
              code: [
                { id: "c1", text: "# 프로젝트 규칙", tone: "comment", hidden: true },
                { id: "c2", text: "- 검증: npm run check", hidden: true },
                { id: "c3", text: "- 스타일은 Tailwind만, CSS 파일 생성 금지", hidden: true },
                { id: "c4", text: "- 마이그레이션 파일 직접 수정 금지", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "claude", tone: "cmd", hidden: true },
                { id: "t2", text: "> 버튼 컴포넌트에 로딩 상태 추가해줘", tone: "cmd", hidden: true },
                { id: "t3", text: "CLAUDE.md 규칙 확인 — Tailwind로만 구현", tone: "out", hidden: true },
                { id: "t4", text: "npm run check", tone: "cmd", hidden: true },
                { id: "t5", text: "✓ lint + type + test 통과", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 프로젝트 루트에 CLAUDE.md를 만들어 엽니다" },
              { t: "move", target: "f-md" },
              { t: "click" },
              { t: "type", target: "c1", text: "# 프로젝트 규칙" },
              { t: "caption", text: "② 검증 명령어를 가장 먼저 적습니다" },
              { t: "type", target: "c2", text: "- 검증: npm run check" },
              { t: "caption", text: "③ 팀 컨벤션과 금지 사항을 한 줄씩 추가합니다" },
              { t: "type", target: "c3", text: "- 스타일은 Tailwind만, CSS 파일 생성 금지" },
              { t: "type", target: "c4", text: "- 마이그레이션 파일 직접 수정 금지" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 새 세션을 열어 규칙이 자동 적용되는지 확인합니다" },
              { t: "type", target: "t1", text: "claude" },
              { t: "type", target: "t2", text: "> 버튼 컴포넌트에 로딩 상태 추가해줘" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "⑤ 지시하지 않아도 규칙대로 검증까지 수행합니다" },
              { t: "reveal", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "move", target: "t5" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "good-task-prompts",
          title: "좋은 작업 지시문: 목표 + 제약 + 검증",
          minutes: 5,
          content: `에이전트 결과물의 품질은 모델보다 **지시문의 구조**가 결정하는 경우가 많습니다. 좋은 지시문의 공식은 세 부분입니다.

## 공식: 목표 + 제약 + 검증

- **목표** — 무엇이 완료 상태인가. "고쳐줘"가 아니라 "비로그인 상태에서 /cart 접근 시 로그인 페이지로 리다이렉트되게 해줘".
- **제약** — 건드리면 안 되는 것, 따라야 할 방식. "기존 미들웨어 패턴을 따르고, 테스트 파일은 수정하지 마".
- **검증** — 완료를 무엇으로 확인하는가. "\`npm run check\`가 통과하면 완료야".

## 왜 검증이 게임 체인저인가

검증 명령을 주는 순간, 에이전트는 스스로 실행→확인→수정을 반복하는 **루프**를 돌 수 있습니다. 검증이 없으면 "그럴듯해 보이는" 시점에 멈추고, 검증이 있으면 "실제로 통과하는" 시점에 멈춥니다.

## 나쁜 지시문 고쳐 쓰기

- ✕ "장바구니 버그 고쳐줘"
- ○ "장바구니에서 같은 상품을 두 번 담으면 수량이 안 올라가는 버그를 고쳐줘. cart.ts의 기존 구조 유지, 수정 후 \`npx vitest run\`으로 검증해."

> 💡 **핵심**: 지시문 3요소 — **목표(완료 상태) + 제약(경계) + 검증(판정 명령)**. 특히 검증이 챗봇을 에이전트로 바꿉니다.`,
          illustration: {
            type: "chat",
            title: "지시문 구조가 만드는 차이",
            messages: [
              { role: "user", text: "장바구니 버그 고쳐줘" },
              {
                role: "ai",
                text: "어떤 버그인지 특정하기 어려워 추측으로 수정했습니다. (검증 없이 종료)",
              },
              {
                role: "user",
                text: "같은 상품 2번 담으면 수량이 안 올라가는 버그 수정. cart.ts 구조 유지, 테스트 파일 수정 금지. npx vitest run 통과하면 완료.",
              },
              {
                role: "ai",
                text: "원인: addItem의 중복 체크 누락. 수정 후 vitest 12/12 통과 확인했습니다.",
              },
            ],
            caption: "같은 모델, 다른 지시문 — 목표·제약·검증이 갖춰지면 결과가 달라집니다.",
          },
        },
        {
          slug: "plan-mode-large-changes",
          title: "플랜 모드와 대규모 변경",
          minutes: 6,
          content: `파일 수십 개를 건드리는 작업을 "바로 시작해"라고 맡기면 중간에 산으로 갑니다. 큰 변경의 규율은 **계획과 실행의 분리**입니다.

## 플랜 모드: 읽기 전용 계획 단계

Claude Code의 플랜 모드(Shift+Tab으로 전환)에서는 에이전트가 **코드를 수정하지 않고** 탐색과 계획만 합니다.

1. 플랜 모드에서 작업을 설명하면, 에이전트가 관련 코드를 조사해 **단계별 계획**을 제시합니다.
2. 계획을 읽고 잘못된 가정을 **여기서** 바로잡습니다 — 코드를 고치기 전이라 수정 비용이 0입니다.
3. 계획을 승인하면 실행 모드로 전환되어 작업이 시작됩니다.

Cursor와 Copilot의 에이전트 모드에도 같은 취지의 계획 단계가 있습니다.

## 대규모 변경의 3원칙

- **쪼개기** — "전체 마이그레이션"이 아니라 "1단계: 유틸 함수부터". 단계마다 검증하고 커밋합니다.
- **되돌릴 수 있게** — 새 브랜치에서 시작하고, 단계별 커밋으로 언제든 롤백 지점을 남깁니다.
- **계획을 파일로** — 긴 작업은 계획을 마크다운 파일로 저장하게 하면, 세션이 길어져도 목표가 흐려지지 않습니다.

> 💡 **핵심**: 큰 변경일수록 **계획 승인 → 단계 실행 → 단계 검증**. 계획 단계에서 잡은 오류가 가장 싼 오류입니다.`,
          illustration: {
            type: "flow",
            title: "플랜 모드 기반 대규모 변경",
            nodes: [
              {
                label: "플랜 모드 진입",
                sublabel: "Shift+Tab — 읽기 전용",
                icon: "search",
                tone: "accent",
              },
              {
                label: "계획 검토·수정",
                sublabel: "잘못된 가정을 여기서 교정",
                icon: "clipboard",
                tone: "warning",
              },
              {
                label: "단계 실행",
                sublabel: "승인 후 한 단계씩",
                icon: "code",
                tone: "primary",
                edgeLabel: "계획 승인",
              },
              {
                label: "검증 + 커밋",
                sublabel: "npm run check → git commit",
                icon: "check",
                tone: "success",
              },
            ],
            loopBack: { from: 3, to: 2, label: "다음 단계 반복" },
            caption: "계획은 한 번, 실행·검증·커밋은 단계 수만큼 반복합니다.",
          },
        },
        {
          slug: "ai-code-review",
          title: "AI 코드 리뷰 활용하기",
          minutes: 5,
          content: `AI가 쓴 코드가 늘어날수록 리뷰가 병목이 됩니다. 해법은 역설적이게도 **리뷰에도 AI를 넣는 것**입니다.

## 어디에 넣을 수 있나

- **커밋 전** — Claude Code에게 "방금 변경사항을 리뷰해줘. 버그·보안·엣지케이스 위주로". 가장 빠른 피드백 지점입니다.
- **PR 단계** — GitHub의 Copilot 코드 리뷰나 Claude Code의 GitHub 연동으로, PR이 열리면 자동으로 첫 리뷰가 달리게 합니다.
- **작성자와 다른 AI로** — 코드를 쓴 세션과 **별도의 새 세션**(또는 다른 도구)이 리뷰하면 같은 편향을 공유하지 않아 더 잘 잡습니다.

## AI 리뷰에게 시킬 것과 사람이 볼 것

- AI가 잘 잡는 것: 엣지케이스 누락, 에러 처리 빠짐, 보안 실수, 컨벤션 위반 — **패턴이 있는 결함**
- 사람이 봐야 하는 것: 이 변경이 애초에 옳은 방향인가, 제품 요구사항에 맞는가 — **맥락과 판단**

## 리뷰 지시문도 구체적으로

"리뷰해줘"보다 "이 diff에서 **null 처리 누락과 권한 체크 빠진 곳**을 찾아줘"가 훨씬 잘 작동합니다. 팀의 단골 결함 유형을 리뷰 프롬프트로 만들어 두세요.

> 💡 **핵심**: AI 리뷰는 사람 리뷰의 대체가 아니라 **1차 필터**입니다. 패턴 결함은 AI가, 방향 판단은 사람이.`,
          illustration: {
            type: "flow",
            title: "AI 1차 필터 리뷰 파이프라인",
            nodes: [
              {
                label: "코드 작성",
                sublabel: "사람 + AI 도구",
                icon: "code",
                tone: "primary",
              },
              {
                label: "커밋 전 셀프 리뷰",
                sublabel: "Claude Code: 변경사항 리뷰 요청",
                icon: "eye",
                tone: "accent",
              },
              {
                label: "PR 자동 AI 리뷰",
                sublabel: "별도 세션 — 패턴 결함 필터",
                icon: "bot",
                tone: "accent",
                edgeLabel: "PR 생성 시 자동",
              },
              {
                label: "사람 리뷰",
                sublabel: "방향·요구사항 판단만 집중",
                icon: "user",
                tone: "success",
                edgeLabel: "패턴 결함 해소 후",
              },
            ],
            caption: "AI가 패턴 결함을 걸러주면, 사람은 '방향이 맞는가'에만 집중할 수 있습니다.",
          },
        },
      ],
    },
    {
      slug: "combo-workflow",
      title: "조합 워크플로우",
      description: "세 도구를 하나의 흐름으로 — 개인의 하루부터 팀 도입까지",
      lessons: [
        {
          slug: "daily-workflow",
          title: "하루 워크플로우: 탐색은 에이전트, 작성은 탭, 수정은 인라인",
          minutes: 6,
          content: `이제 배운 도구들을 **실제 하루**에 배치해봅니다. 핵심 원칙은 하나 — 작업의 크기에 도구를 맞추는 것입니다.

## 아침: 파악과 계획 (터미널 에이전트)

- 새 이슈를 받으면 Claude Code에게 관련 코드 **탐색과 원인 분석**을 맡깁니다. "이 버그와 관련된 코드를 찾아 흐름을 설명해줘."
- 큰 작업이면 플랜 모드로 계획까지 세우고 하루를 시작합니다.

## 낮: 구현 (탭 + 인라인)

- 에이전트가 짠 뼈대 위에서, 세부 구현은 에디터에서 **탭 자동완성**으로 빠르게 채웁니다.
- 눈에 보이는 국소 수정은 **인라인 편집**(Cmd+K)으로 그 자리에서 해결합니다.
- 여러 파일에 걸친 중간 크기 작업은 **IDE 에이전트**에게 맡기고 diff를 검토합니다.

## 오후: 정리와 검증 (다시 터미널 에이전트)

- 반복적인 리팩토링, 테스트 추가, 커밋 전 리뷰는 Claude Code에게 검증 명령과 함께 위임합니다.
- 기다리는 동안 다음 작업의 탐색을 시작하면 **대기 시간이 사라집니다**.

## 전환 신호

같은 도구와 3번 이상 씨름하고 있다면 도구가 틀린 것입니다. 자동완성과 싸우면 인라인으로, 인라인이 반복되면 에이전트로 올라가세요.

> 💡 **핵심**: **탐색·리팩토링은 에이전트, 작성은 탭, 국소 수정은 인라인.** 도구를 바꾸는 타이밍이 곧 생산성입니다.`,
          illustration: {
            type: "steps",
            title: "AI 코딩 하루 루틴",
            steps: [
              {
                label: "아침: 탐색·계획",
                sublabel: "Claude Code — 원인 분석, 플랜 모드",
                icon: "search",
              },
              {
                label: "낮: 구현",
                sublabel: "탭 자동완성 + 인라인 편집(Cmd+K)",
                icon: "zap",
              },
              {
                label: "중간 작업 위임",
                sublabel: "IDE 에이전트 — 다중 파일 수정 후 diff 검토",
                icon: "code",
              },
              {
                label: "오후: 정리·검증",
                sublabel: "Claude Code — 리팩토링·테스트·커밋 전 리뷰",
                icon: "check",
              },
            ],
            caption: "작업 크기가 커질수록 아래 층(에이전트)으로, 작아질수록 위 층(탭)으로.",
          },
        },
        {
          slug: "team-adoption",
          title: "팀 도입 가이드: 컨벤션·보안·리뷰 정책",
          minutes: 5,
          content: `개인의 도구가 팀의 도구가 되려면 **정책**이 필요합니다. 정책 없는 도입은 "각자 다르게 쓰다가 사고 한 번에 금지"로 끝나기 쉽습니다.

## 컨벤션: 규칙 파일을 저장소에

- \`CLAUDE.md\`, \`.cursor/rules\` 같은 규칙 파일을 **git으로 버전 관리**합니다. 팀원 누가 세션을 열어도 같은 규칙이 적용됩니다.
- 자주 쓰는 작업 지시문(리뷰 프롬프트, 리팩토링 절차)은 팀 위키가 아니라 **저장소 안에** 둡니다.

## 보안: 경계를 먼저 긋기

- 비밀키·고객 데이터가 프롬프트에 들어가지 않도록 \`.env\` 등 **민감 파일 접근 차단**을 도구 설정으로 강제합니다.
- 조직 계정(팀 플랜)을 써서 **학습 미사용·데이터 보존 정책**을 조직 차원에서 통제합니다.
- 에이전트의 자율 실행 범위(어떤 명령어까지 승인 없이 허용하는지)를 팀 표준으로 정합니다.

## 리뷰 정책: 책임은 사람에게

- 원칙 한 줄이면 충분합니다 — **"AI가 썼어도 머지한 사람이 저자다."**
- AI 생성 코드도 같은 리뷰 기준을 통과해야 하며, "AI가 그렇게 짰어요"는 리뷰 코멘트에 대한 답변이 될 수 없습니다.

> 💡 **핵심**: 팀 도입 3종 세트 = **저장소 안의 규칙 파일 + 민감 데이터 경계 + '머지한 사람이 저자' 원칙**.`,
          illustration: {
            type: "grid",
            title: "팀 도입 정책 체크리스트",
            items: [
              {
                label: "규칙 파일 버전 관리",
                sublabel: "CLAUDE.md를 git에",
                icon: "git-branch",
                tone: "primary",
              },
              {
                label: "지시문 라이브러리",
                sublabel: "리뷰·리팩토링 프롬프트 공유",
                icon: "book",
                tone: "primary",
              },
              {
                label: "민감 파일 차단",
                sublabel: ".env · 고객 데이터 접근 금지",
                icon: "lock",
                tone: "warning",
              },
              {
                label: "조직 계정 정책",
                sublabel: "학습 미사용 · 보존 통제",
                icon: "shield",
                tone: "warning",
              },
              {
                label: "자율 실행 범위",
                sublabel: "승인 없는 명령의 한계선",
                icon: "settings",
                tone: "accent",
              },
              {
                label: "머지한 사람이 저자",
                sublabel: "AI 코드도 같은 리뷰 기준",
                icon: "users",
                tone: "success",
              },
            ],
            caption: "컨벤션(위) · 보안(중간) · 리뷰 책임(아래) — 세 축이 모두 있어야 팀 도입입니다.",
          },
        },
        {
          slug: "measuring-productivity",
          title: "생산성을 실제로 측정하는 법",
          minutes: 5,
          content: `"AI 덕분에 빨라진 것 같아요"는 측정이 아닙니다. 도구 투자와 정책을 조정하려면 **숫자**가 필요합니다.

## 함정부터 피하기

- **코드 줄 수, 제안 수락률**은 생산성이 아닙니다 — AI는 줄 수를 늘리는 데 특히 능합니다.
- 진짜 질문은 "**가치 있는 변경이 얼마나 빨리, 얼마나 안전하게** 배포되는가"입니다.

## 볼 만한 지표

- **리드 타임** — 작업 시작부터 머지·배포까지 걸린 시간
- **PR 처리량과 크기** — 완료된 변경의 흐름 (크기가 함께 줄면 좋은 신호)
- **되돌림 비율** — 배포 후 revert·핫픽스 비율. AI로 속도만 오르고 이 지표가 나빠지면 경고입니다.
- **개발자 체감 설문** — "반복 작업에 쓰는 시간이 줄었는가" 같은 정성 지표는 분기마다.

## 측정 루프 돌리기

1. 도입 전 4주의 지표로 **기준선**을 만듭니다.
2. 도구·정책을 도입하고 같은 지표를 계속 수집합니다.
3. 월 단위로 비교하고, 나빠진 지표가 있으면 정책(리뷰 기준, 자율 범위)을 조정합니다.

> 💡 **핵심**: 속도 지표(리드 타임)와 **안전 지표(되돌림 비율)를 반드시 함께** 보세요. 한쪽만 보는 측정은 측정이 아닙니다.`,
          illustration: {
            type: "cycle",
            title: "생산성 측정 루프",
            center: "월 단위 반복",
            nodes: [
              { label: "기준선 수립", sublabel: "도입 전 4주 지표", icon: "gauge" },
              { label: "지표 수집", sublabel: "리드 타임 · 되돌림 비율", icon: "chart" },
              { label: "비교·해석", sublabel: "속도와 안전을 함께", icon: "eye" },
              { label: "정책 조정", sublabel: "리뷰 기준 · 자율 범위", icon: "settings" },
            ],
            caption: "측정도 루프입니다 — 기준선 없이 시작한 측정은 해석할 수 없습니다.",
          },
        },
      ],
    },
  ],
};
