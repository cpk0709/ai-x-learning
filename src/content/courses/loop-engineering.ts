import type { Course } from "../types";

/**
 * 예시 강의(품질 기준) — 모든 강의 콘텐츠는 이 파일의 톤/분량/일러스트 활용법을 따릅니다.
 *
 * 스타일 가이드:
 * - 레슨 본문은 한 화면(스텝)에 들어갈 분량: 헤딩 2~3개, 문단은 짧게, 불릿 위주.
 * - 첫 문장은 훅(왜 배우는지), 마지막은 "> 💡 **핵심**:" 블록쿼트로 요약.
 * - 코드/명령어는 실제로 동작하는 최신(2026) 예시만.
 * - 일러스트는 본문을 '복사'하지 않고 구조를 '시각화'한다.
 */
export const loopEngineering: Course = {
  slug: "loop-engineering",
  title: "루프 엔지니어링: 에이전틱 워크플로우 설계",
  subtitle: "AI가 스스로 코드를 고치고 검증하게 만드는 피드백 루프 설계법",
  description:
    "2026년 개발의 중심은 '프롬프트 한 방'이 아니라 '루프'입니다. 이 강의에서는 에이전트가 계획하고, 도구를 실행하고, 결과를 관찰해 스스로 수정하는 에이전틱 루프(Agentic Loop)를 밑바닥부터 설계합니다. 피드백 신호 설계, 가드레일, 컨텍스트 관리, 멀티 에이전트 오케스트레이션까지 — 실무에서 바로 쓰는 패턴을 다이어그램과 함께 익힙니다.",
  category: "dev",
  level: "intermediate",
  tags: ["Agentic Workflow", "AI Agent", "MCP", "Claude", "자동화 루프"],
  gradient: ["#7c3aed", "#4f46e5"],
  icon: "repeat",
  outcomes: [
    "에이전트 루프(계획→실행→관찰→평가)의 4단계 구조를 설계할 수 있다",
    "테스트·린트·타입체크를 피드백 신호로 연결해 자가 수정 루프를 만들 수 있다",
    "무한 루프를 막는 가드레일과 종료 조건을 설계할 수 있다",
    "서브에이전트 분업, 휴먼 인 더 루프 등 프로덕션 패턴을 적용할 수 있다",
  ],
  modules: [
    {
      slug: "agent-loop-basics",
      title: "에이전트 루프의 이해",
      description: "챗봇과 에이전트의 결정적 차이, 루프의 해부학",
      lessons: [
        {
          slug: "why-agents",
          title: "챗봇에서 에이전트로: 무엇이 달라졌나",
          minutes: 4,
          content: `한 번 묻고 한 번 답하는 챗봇의 시대는 끝났습니다. 2026년의 AI는 **목표를 주면 끝날 때까지 스스로 일하는 에이전트**입니다.

## 결정적 차이: 피드백을 받는가

챗봇과 에이전트를 가르는 기준은 모델 성능이 아니라 **구조**입니다.

- **챗봇**: 입력 → 출력. 결과가 틀려도 스스로 알 방법이 없습니다.
- **에이전트**: 입력 → 행동 → **결과 관찰** → 다음 행동. 자기 행동의 결과를 보고 경로를 수정합니다.

## 왜 지금 '루프'인가

- 모델이 도구(터미널, 파일, 브라우저)를 직접 다룰 수 있게 되면서, "행동의 결과"를 기계적으로 확인할 수 있게 됐습니다.
- Claude Code, Cursor Agent, Devin 같은 도구가 모두 이 구조 위에 서 있습니다.
- 같은 모델이라도 **루프 설계가 좋으면 성공률이 몇 배** 차이 납니다. 이것이 루프 엔지니어링입니다.

> 💡 **핵심**: 에이전트 = LLM + 도구 + **피드백 루프**. 이 강의는 그 루프를 설계하는 법을 다룹니다.`,
          illustration: {
            type: "compare",
            title: "챗봇 vs 에이전트",
            columns: [
              {
                title: "챗봇 (단발 호출)",
                icon: "message",
                tone: "muted",
                items: [
                  "질문 1번 → 답변 1번",
                  "결과 검증 없음",
                  "틀리면 사람이 다시 질문",
                  "도구 사용 불가",
                ],
              },
              {
                title: "에이전트 (루프)",
                icon: "repeat",
                tone: "primary",
                items: [
                  "목표 1번 → 완료까지 반복",
                  "행동 결과를 스스로 관찰",
                  "틀리면 스스로 경로 수정",
                  "터미널·파일·API 직접 조작",
                ],
              },
            ],
            caption: "같은 모델이라도 루프 구조가 있으면 '일을 끝내는 능력'이 생깁니다.",
          },
        },
        {
          slug: "anatomy-of-loop",
          title: "에이전트 루프 해부: 계획→실행→관찰→평가",
          minutes: 5,
          content: `모든 에이전틱 시스템은 결국 하나의 사이클로 수렴합니다. 이 4단계를 정확히 이해하면 어떤 프레임워크든 읽을 수 있습니다.

## 루프의 4단계

1. **계획 (Plan)** — 목표를 하위 작업으로 쪼개고, 다음 행동 하나를 결정합니다.
2. **실행 (Act)** — 도구를 호출합니다. 파일 수정, 테스트 실행, API 호출 등.
3. **관찰 (Observe)** — 도구가 돌려준 **원시 결과**(에러 메시지, 테스트 출력)를 읽습니다.
4. **평가 (Evaluate)** — 목표에 도달했는지 판단합니다. 미달이면 1번으로 돌아갑니다.

## 설계자가 통제하는 것

모델은 이 중 1·4단계(판단)를 담당하고, 여러분은 나머지를 설계합니다.

- 어떤 **도구**를 줄 것인가 (2단계의 폭)
- 어떤 **신호**를 보여줄 것인가 (3단계의 해상도)
- 언제 **멈추게** 할 것인가 (4단계의 기준)

> 💡 **핵심**: 루프 엔지니어링 = "모델이 더 똑똑해지게"가 아니라 **"모델이 더 잘 판단할 수 있는 환경"**을 만드는 일입니다.`,
          illustration: {
            type: "cycle",
            title: "에이전트 루프의 4단계",
            center: "목표 달성까지 반복",
            nodes: [
              { label: "계획", sublabel: "다음 행동 결정", icon: "brain" },
              { label: "실행", sublabel: "도구 호출", icon: "terminal" },
              { label: "관찰", sublabel: "결과 읽기", icon: "eye" },
              { label: "평가", sublabel: "완료 판단", icon: "check" },
            ],
            caption: "평가에서 '미완료'면 계획으로 돌아갑니다 — 이 순환이 에이전트의 본질입니다.",
          },
        },
        {
          slug: "tools-and-mcp",
          title: "도구(Tool)와 MCP: 에이전트의 손과 발",
          minutes: 6,
          content: `루프의 '실행' 단계는 도구가 결정합니다. 그리고 2026년 도구 생태계의 표준은 **MCP(Model Context Protocol)**입니다.

## 도구란 무엇인가

도구는 모델이 호출할 수 있는 함수입니다. 이름, 설명, 파라미터 스키마(JSON Schema)로 정의됩니다.

\`\`\`json
{
  "name": "run_tests",
  "description": "프로젝트 테스트를 실행하고 결과를 반환",
  "input_schema": {
    "type": "object",
    "properties": { "path": { "type": "string" } }
  }
}
\`\`\`

## MCP: 도구의 USB-C 포트

- 예전에는 도구를 앱마다 다시 구현했습니다. MCP는 **도구 서버를 한 번 만들면 모든 AI 클라이언트에서 재사용**하게 해주는 개방형 프로토콜입니다.
- Slack, GitHub, Postgres, 사내 API… 이미 수천 개의 MCP 서버가 공개돼 있습니다.
- Claude Code, Cursor 등 주요 에이전트 도구가 모두 MCP 클라이언트입니다.

## 도구 설계의 3원칙

- **결과가 관찰 가능해야** 합니다 — 성공/실패가 텍스트로 명확히 드러나게.
- **원자적**으로 — 한 도구는 한 가지 일만.
- **설명이 프롬프트**입니다 — 모델은 description을 읽고 도구를 고릅니다.

> 💡 **핵심**: 좋은 도구 설명 한 줄이 프롬프트 열 줄보다 루프 성공률을 더 높입니다.`,
          illustration: {
            type: "stack",
            title: "MCP 아키텍처",
            layers: [
              {
                label: "AI 에이전트 (MCP 클라이언트)",
                sublabel: "Claude Code · Cursor · 커스텀 에이전트",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "MCP 프로토콜",
                sublabel: "도구 목록·호출·결과를 표준 형식으로 교환",
                icon: "link",
                tone: "accent",
              },
              {
                label: "MCP 서버들",
                sublabel: "GitHub · Slack · DB · 사내 API",
                icon: "server",
                tone: "muted",
              },
              {
                label: "실제 시스템",
                sublabel: "코드 저장소, 메신저, 데이터베이스",
                icon: "database",
                tone: "muted",
              },
            ],
            caption: "MCP는 'AI 도구의 USB-C' — 서버 하나로 모든 클라이언트에 연결됩니다.",
          },
        },
      ],
    },
    {
      slug: "self-correcting-loops",
      title: "자가 수정 루프 설계",
      description: "AI가 스스로 코드를 고치게 만드는 피드백 신호와 가드레일",
      lessons: [
        {
          slug: "feedback-signals",
          title: "피드백 신호 설계: 루프의 나침반",
          minutes: 5,
          content: `에이전트가 스스로 고치려면 **"지금 틀렸다"는 사실을 기계적으로 알려주는 신호**가 필요합니다. 신호가 없으면 루프는 감으로 도는 것과 같습니다.

## 코드 작업의 3대 신호

- **테스트** — 가장 강력한 신호. 기대 동작을 실행 가능한 형태로 명세합니다.
- **타입체크** — \`tsc --noEmit\` 한 번으로 수백 개의 잠재 버그가 드러납니다.
- **린트/포맷** — 스타일과 명백한 실수를 잡습니다.

## 신호의 품질 = 루프의 품질

같은 실패라도 신호의 **해상도**가 다릅니다.

- 나쁜 신호: \`Error: test failed\` (뭘 고쳐야 할지 모름)
- 좋은 신호: \`expect(cart.total).toBe(3000) — received 2700, at cart.ts:42\` (파일·라인·기대값)

에이전트에게는 **좋은 에러 메시지가 곧 좋은 프롬프트**입니다.

## 신호를 루프에 연결하기

실행 명령을 하나로 묶어 두면 에이전트가 매 반복마다 같은 기준으로 검증합니다.

\`\`\`bash
npm run check   # = tsc --noEmit && eslint . && vitest run
\`\`\`

> 💡 **핵심**: 자가 수정 루프의 성능은 모델이 아니라 **피드백 신호의 해상도**가 결정합니다.`,
          illustration: {
            type: "grid",
            title: "피드백 신호의 종류와 강도",
            items: [
              {
                label: "테스트",
                sublabel: "기대 동작 명세 · 최강 신호",
                icon: "test-tube",
                tone: "primary",
              },
              {
                label: "타입체크",
                sublabel: "tsc --noEmit",
                icon: "shield",
                tone: "accent",
              },
              {
                label: "린트",
                sublabel: "스타일·명백한 실수",
                icon: "filter",
                tone: "accent",
              },
              {
                label: "빌드",
                sublabel: "최종 통합 검증",
                icon: "check",
                tone: "success",
              },
              {
                label: "런타임 로그",
                sublabel: "실행 중 동작 확인",
                icon: "eye",
                tone: "muted",
              },
              {
                label: "사람 리뷰",
                sublabel: "마지막 관문",
                icon: "user",
                tone: "warning",
              },
            ],
            caption: "위쪽 신호일수록 기계적·즉각적 — 루프에 먼저 연결하세요.",
          },
        },
        {
          slug: "write-test-fix",
          title: "실습: 테스트 실패 → 자가 수정 루프 돌리기",
          minutes: 7,
          content: `이론은 충분합니다. Claude Code로 실제 자가 수정 루프를 돌려봅니다.

## 시나리오

장바구니 할인 로직에 버그가 있고, 실패하는 테스트가 있습니다. 에이전트에게 목표만 주고 루프를 관찰합니다.

## 따라 하기

1. 실패하는 테스트를 먼저 확인합니다 — \`npx vitest run\`
2. 에이전트에게 **목표 + 검증 방법**을 함께 줍니다:

\`\`\`text
cart.test.ts의 실패하는 테스트를 통과시켜 줘.
수정 후 반드시 npx vitest run 명령으로 검증하고,
통과할 때까지 반복해.
\`\`\`

3. 에이전트가 도는 루프를 관찰합니다: 테스트 실행 → 에러 읽기 → 코드 수정 → 재실행.

## 관찰 포인트

- 에이전트는 에러 메시지의 **파일·라인 정보**를 따라 이동합니다.
- "통과할 때까지 반복해"라는 한 줄이 **루프 계약**을 만듭니다 — 이 문장이 없으면 한 번 고치고 멈추는 경우가 많습니다.

> 💡 **핵심**: 프롬프트에 목표만 쓰지 말고 **검증 명령 + 반복 조건**을 함께 쓰세요. 그 순간 챗봇이 에이전트가 됩니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "claude — 자가 수정 루프",
            lines: [
              { text: "npx vitest run", tone: "cmd" },
              { text: "✕ cart > 10% 할인 적용  (cart.test.ts:18)", tone: "err" },
              { text: "  expected 2700, received 3000", tone: "dim" },
              { text: "# 에이전트: cart.ts:42 할인율 계산 수정", tone: "comment" },
              { text: "npx vitest run", tone: "cmd" },
              { text: "✕ cart > 중복 쿠폰 방지  (cart.test.ts:31)", tone: "err" },
              { text: "# 에이전트: 쿠폰 중복 가드 추가", tone: "comment" },
              { text: "npx vitest run", tone: "cmd" },
              { text: "✓ 12 passed (12)", tone: "ok" },
              { text: "목표 달성 — 루프 종료", tone: "ok" },
            ],
            caption: "실패 → 수정 → 재검증이 사람 개입 없이 3회 반복된 실제 루프 흐름입니다.",
          },
          demo: {
            title: "에디터에서 자가 수정 루프 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "cart.ts — AI 에이전트 세션",
              files: [
                { id: "f-cart", name: "cart.ts", active: true },
                { id: "f-test", name: "cart.test.ts" },
                { id: "f-pkg", name: "package.json" },
              ],
              code: [
                { id: "c1", text: "export function applyDiscount(total: number) {" },
                { id: "c2", text: "// 10% 할인 쿠폰 적용", indent: 1, tone: "comment" },
                { id: "c3", text: "return total * 1.1; // ← 버그: 할인이 아니라 할증", indent: 1, tone: "del" },
                { id: "c4", text: "return total * 0.9;", indent: 1, tone: "add", hidden: true },
                { id: "c5", text: "}" },
              ],
              terminal: [
                { id: "t1", text: "npx vitest run", tone: "cmd", hidden: true },
                { id: "t2", text: "✕ cart > 10% 할인 적용 (cart.test.ts:18)", tone: "err", hidden: true },
                { id: "t3", text: "  expected 2700, received 3300", tone: "out", hidden: true },
                { id: "t4", text: "npx vitest run", tone: "cmd", hidden: true },
                { id: "t5", text: "✓ 12 passed (12) — 루프 종료", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 먼저 테스트를 실행해 실패 신호를 확인합니다" },
              { t: "type", target: "t1", text: "npx vitest run" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 에러가 가리키는 라인으로 이동합니다" },
              { t: "move", target: "c3" },
              { t: "dblclick", target: "c3" },
              { t: "caption", text: "③ 할인율 계산을 수정합니다 (1.1 → 0.9)" },
              { t: "type", target: "c4", text: "return total * 0.9;" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 같은 명령으로 재검증 — 이것이 루프입니다" },
              { t: "type", target: "t4", text: "npx vitest run" },
              { t: "reveal", target: "t5" },
              { t: "move", target: "t5" },
              { t: "caption", text: "✅ 테스트 통과 — 성공 종료 조건 달성" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "guardrails",
          title: "가드레일: 무한 루프와 폭주를 막는 법",
          minutes: 5,
          content: `루프는 강력한 만큼 위험합니다. 잘못 설계된 루프는 같은 실수를 무한 반복하거나, 테스트를 '삭제'해서 통과시키는 꼼수를 씁니다.

## 반드시 넣어야 할 4가지 가드레일

- **반복 상한** — 최대 시도 횟수(예: 5회)를 넘으면 멈추고 사람에게 보고.
- **불변 영역** — 테스트 파일, 설정 파일은 수정 금지라고 명시. ("테스트를 고치지 말고 구현을 고쳐")
- **범위 제한** — 건드릴 수 있는 디렉토리·파일을 한정.
- **진전 감지** — 직전 시도와 같은 에러가 반복되면 접근을 바꾸거나 중단.

## 종료 조건은 두 종류

1. **성공 종료**: 검증 명령이 통과 (기계적 판정)
2. **안전 종료**: 상한 도달, 진전 없음, 금지 행동 감지 (가드레일 판정)

성공 조건만 있고 안전 조건이 없는 루프는 프로덕션에 넣을 수 없습니다.

> 💡 **핵심**: "통과할 때까지 반복해"에는 반드시 **"단, 최대 N번까지, 테스트 파일은 건드리지 말고"**를 붙이세요.`,
          illustration: {
            type: "flow",
            title: "가드레일이 있는 자가 수정 루프",
            nodes: [
              { label: "코드 수정", icon: "code", tone: "primary" },
              {
                label: "검증 실행",
                sublabel: "테스트 + 타입체크",
                icon: "test-tube",
                tone: "accent",
                edgeLabel: "테스트 파일은 수정 금지",
              },
              {
                label: "가드레일 체크",
                sublabel: "시도 5회 미만? 진전 있음?",
                icon: "shield",
                tone: "warning",
                edgeLabel: "실패 시",
              },
              {
                label: "완료 또는 사람에게 보고",
                sublabel: "성공 종료 / 안전 종료",
                icon: "check",
                tone: "success",
                edgeLabel: "통과 또는 상한 도달",
              },
            ],
            loopBack: { from: 2, to: 0, label: "재시도 (최대 5회)" },
            caption: "성공 종료와 안전 종료, 두 개의 출구가 모두 있어야 프로덕션 루프입니다.",
          },
        },
        {
          slug: "context-management",
          title: "컨텍스트 관리: 긴 루프가 무너지지 않게",
          minutes: 6,
          content: `루프가 수십 번 돌면 대화 기록이 컨텍스트 윈도우를 가득 채웁니다. 긴 작업에서 에이전트가 갑자기 멍청해지는 이유의 대부분이 여기 있습니다.

## 컨텍스트가 오염되는 경로

- 거대한 파일 전체를 반복해서 읽음
- 실패한 시도의 로그가 쌓여 **성공 경로를 가림**
- 오래된 계획과 새 계획이 섞여 목표가 흐려짐

## 2026년의 표준 대응 전략

- **컴팩션(Compaction)** — 오래된 기록을 요약으로 치환. Claude Code의 auto-compact가 대표적.
- **서브에이전트 위임** — 탐색처럼 토큰을 많이 쓰는 작업은 별도 에이전트에게 시키고 **결론만** 받아옵니다.
- **외부 메모리** — 진행 상황을 \`PLAN.md\` 같은 파일에 기록하고, 컨텍스트 대신 파일을 신뢰의 원천으로 삼습니다.
- **부분 읽기** — 파일 전체가 아니라 필요한 범위만 읽도록 도구를 설계합니다.

## 실무 감각

"루프가 길어질수록 컨텍스트에 남기는 것은 **결정과 결론**, 버리는 것은 **과정과 시행착오**" — 이 원칙 하나면 충분합니다.

> 💡 **핵심**: 컨텍스트는 에이전트의 작업대입니다. 작업대가 좁아지면 실력이 떨어집니다 — 요약하고, 위임하고, 파일에 적으세요.`,
          illustration: {
            type: "compare",
            title: "컨텍스트 전략: 방치 vs 관리",
            columns: [
              {
                title: "방치된 루프",
                icon: "alert",
                tone: "warning",
                items: [
                  "실패 로그가 계속 쌓임",
                  "파일 전체를 반복해서 읽음",
                  "50번째 반복에서 목표를 잊음",
                  "품질이 점점 하락",
                ],
              },
              {
                title: "관리된 루프",
                icon: "layers",
                tone: "primary",
                items: [
                  "오래된 기록은 요약(컴팩션)",
                  "탐색은 서브에이전트에 위임",
                  "진행 상황은 PLAN.md에 기록",
                  "긴 작업에도 품질 유지",
                ],
              },
            ],
            caption: "결정과 결론은 남기고, 과정과 시행착오는 버립니다.",
          },
        },
      ],
    },
    {
      slug: "production-workflows",
      title: "프로덕션 에이전틱 워크플로우",
      description: "혼자 도는 루프에서 팀으로 일하는 시스템으로",
      lessons: [
        {
          slug: "orchestration-patterns",
          title: "멀티 에이전트 패턴: 분업의 3가지 형태",
          minutes: 6,
          content: `작업이 커지면 에이전트 하나로는 부족합니다. 2026년 실무에서 검증된 오케스트레이션 패턴은 크게 세 가지입니다.

## 1. 파이프라인 (직렬 분업)

분석 → 구현 → 리뷰처럼 **단계별로 다른 에이전트**가 이어받습니다. 각 단계의 출력이 다음 단계의 입력이 되므로, 단계 사이의 **인터페이스(산출물 형식)**를 명확히 정의하는 것이 핵심입니다.

## 2. 팬아웃 (병렬 분업)

파일 100개 마이그레이션처럼 **같은 작업을 독립적으로 쪼갤 수 있을 때**, 여러 에이전트가 동시에 처리합니다. 서로의 작업 영역이 겹치지 않도록 격리(예: git worktree)가 필요합니다.

## 3. 생성자-검증자 (적대적 협업)

한 에이전트가 만들고, **다른 에이전트가 반박하거나 검증**합니다. 코드 리뷰, 보안 점검, 팩트체크에 강력합니다. 같은 에이전트가 자기 결과물을 검증하는 것보다 독립된 검증자가 훨씬 정확합니다.

## 선택 기준

- 단계가 다르면 → 파이프라인
- 양이 많으면 → 팬아웃
- 정확성이 생명이면 → 생성자-검증자

> 💡 **핵심**: 멀티 에이전트의 가치는 '더 많은 AI'가 아니라 **독립된 컨텍스트**에서 나옵니다. 서로의 편향을 공유하지 않는 것이 힘입니다.`,
          illustration: {
            type: "grid",
            title: "3가지 오케스트레이션 패턴",
            items: [
              {
                label: "파이프라인",
                sublabel: "분석 → 구현 → 리뷰 직렬 연결",
                icon: "workflow",
                tone: "primary",
              },
              {
                label: "팬아웃",
                sublabel: "대량 작업을 병렬 분산",
                icon: "git-branch",
                tone: "accent",
              },
              {
                label: "생성자-검증자",
                sublabel: "만드는 자 vs 반박하는 자",
                icon: "shield",
                tone: "success",
              },
              {
                label: "오케스트레이터",
                sublabel: "전체를 지휘하는 메인 루프",
                icon: "brain",
                tone: "warning",
              },
            ],
            caption: "실전에서는 세 패턴을 조합합니다 — 오케스트레이터가 상황에 맞게 지휘합니다.",
          },
        },
        {
          slug: "human-in-the-loop",
          title: "휴먼 인 더 루프: 사람이 서야 할 자리",
          minutes: 5,
          content: `완전 자동화가 항상 정답은 아닙니다. 좋은 워크플로우는 **사람의 판단이 가장 값진 지점**에만 사람을 배치합니다.

## 사람이 개입해야 하는 3개 관문

- **시작 관문**: 목표와 제약 정의. 모호한 목표로 루프를 돌리면 정교하게 틀린 결과가 나옵니다.
- **위험 관문**: 되돌리기 어려운 행동(배포, 결제, 삭제, 외부 발송) 직전의 승인.
- **완료 관문**: 최종 품질 승인. 기계적 검증이 통과해도 "이게 정말 원하던 것인가"는 사람이 판단합니다.

## 개입 방식의 설계

- **동기 승인**: 에이전트가 멈추고 사람의 확인을 기다림 (위험 관문에 적합)
- **비동기 리뷰**: 에이전트는 계속 일하고, 사람은 PR 리뷰처럼 사후 검토 (일반 작업에 적합)
- **에스컬레이션**: 가드레일 발동 시 사람에게 자동 보고

## 안티패턴

모든 스텝마다 승인을 요구하면 자동화의 의미가 없고, 승인이 하나도 없으면 사고가 납니다. **관문은 적게, 그러나 확실하게.**

> 💡 **핵심**: 자동화 설계의 질문은 "사람을 뺄 수 있는가"가 아니라 **"사람의 판단이 어디서 가장 값진가"**입니다.`,
          illustration: {
            type: "flow",
            title: "3개의 휴먼 관문",
            nodes: [
              {
                label: "사람: 목표·제약 정의",
                sublabel: "시작 관문",
                icon: "user",
                tone: "warning",
              },
              {
                label: "에이전트: 자율 작업 루프",
                sublabel: "계획→실행→관찰→평가 반복",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "사람: 위험 행동 승인",
                sublabel: "배포·결제·삭제 직전",
                icon: "shield",
                tone: "warning",
                edgeLabel: "되돌리기 어려운 행동 감지 시",
              },
              {
                label: "사람: 최종 품질 승인",
                sublabel: "완료 관문",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "사람은 관문에만 서고, 관문 사이는 에이전트가 자율 주행합니다.",
          },
          demo: {
            title: "Slack에서 배포 승인 관문 따라하기",
            app: {
              kind: "chat-app",
              workspace: "우리 팀 워크스페이스",
              channels: [
                { id: "ch-deploy", name: "배포-승인", active: true },
                { id: "ch-dev", name: "개발-일반" },
                { id: "ch-alert", name: "장애-알림" },
              ],
              composerId: "composer",
              messages: [
                {
                  id: "m1",
                  author: "루프봇",
                  bot: true,
                  time: "오후 2:41",
                  text: "결제 모듈 버그 수정 완료 — 테스트 12/12 통과.\n프로덕션 배포는 되돌리기 어려운 작업이라 승인이 필요합니다.",
                  hidden: true,
                },
                {
                  id: "m2",
                  author: "루프봇",
                  bot: true,
                  time: "오후 2:41",
                  text: "변경 요약: cart.ts 할인율 계산 수정 (+1줄 / -1줄)",
                  hidden: true,
                },
                {
                  id: "m3",
                  author: "나 (리드 개발자)",
                  time: "오후 2:44",
                  text: "diff 확인했습니다. 배포 승인합니다 ✅",
                  hidden: true,
                },
                {
                  id: "m4",
                  author: "루프봇",
                  bot: true,
                  time: "오후 2:45",
                  text: "✅ 배포 시작 → 완료 (v2.4.1). 모니터링 정상입니다.",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 에이전트가 위험 관문(배포)에서 멈추고 승인을 요청합니다" },
              { t: "reveal", target: "m1" },
              { t: "reveal", target: "m2" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "② 사람은 변경 요약을 확인하고 판단만 합니다" },
              { t: "move", target: "m2" },
              { t: "click" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 승인 메시지를 입력합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "diff 확인했습니다. 배포 승인합니다 ✅" },
              { t: "wait", ms: 400 },
              { t: "hide", target: "composer" },
              { t: "reveal", target: "composer" },
              { t: "reveal", target: "m3" },
              { t: "caption", text: "④ 승인 즉시 에이전트가 나머지를 자율 수행합니다" },
              { t: "reveal", target: "m4" },
              { t: "move", target: "m4" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "eval-and-monitor",
          title: "운영: 루프를 측정하고 개선하기",
          minutes: 6,
          content: `루프를 만들었다면 이제 **측정**할 차례입니다. 측정 없는 루프 개선은 감으로 하는 최적화일 뿐입니다.

## 루프의 핵심 지표

- **성공률**: 사람 개입 없이 목표를 달성한 비율
- **반복 횟수**: 성공까지 평균 몇 번 돌았는가 (급증하면 신호 품질 저하 의심)
- **개입률**: 안전 종료로 사람에게 넘어온 비율
- **비용/시간**: 작업당 토큰·소요 시간

## 개선 사이클

1. 실패 사례를 수집합니다 (트랜스크립트 저장은 필수)
2. 실패를 분류합니다 — 신호 부족? 도구 문제? 컨텍스트 오염? 가드레일 오작동?
3. **가장 빈번한 실패 유형 하나만** 고칩니다
4. 같은 작업 세트로 재측정합니다 (이것이 곧 이벨/Eval입니다)

## 시작은 소박하게

거창한 대시보드보다, 실패한 루프의 트랜스크립트 10개를 직접 읽는 것이 첫 걸음입니다. 패턴은 항상 거기에 있습니다.

> 💡 **핵심**: "만들고 끝"이 아니라 **측정 → 분류 → 하나 고침 → 재측정**. 루프를 개선하는 것도 결국 루프입니다.`,
          illustration: {
            type: "steps",
            title: "루프 개선 사이클",
            steps: [
              {
                label: "트랜스크립트 수집",
                sublabel: "실패 사례를 빠짐없이 저장",
                icon: "clipboard",
              },
              {
                label: "실패 유형 분류",
                sublabel: "신호·도구·컨텍스트·가드레일",
                icon: "filter",
              },
              {
                label: "최빈 유형 하나만 수정",
                sublabel: "한 번에 하나씩",
                icon: "wrench",
              },
              {
                label: "같은 작업 세트로 재측정",
                sublabel: "성공률·반복 횟수 비교",
                icon: "chart",
              },
            ],
            caption: "이 사이클 자체가 여러분의 '루프를 위한 루프'입니다.",
          },
        },
      ],
    },
  ],
};
