-- AI-X Learn 콘텐츠 시드 (scripts/generate-seed.ts 로 자동 생성 — 직접 수정 금지)
-- 0001_init.sql 적용 후 실행하세요. 여러 번 실행해도 안전합니다 (upsert).
begin;

-- 강의: 루프 엔지니어링: 에이전틱 워크플로우 설계
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'ee5af2ab-0f01-04af-54cf-6e58ee98468f', 'loop-engineering', '루프 엔지니어링: 에이전틱 워크플로우 설계', $aix$2026년 개발의 중심은 '프롬프트 한 방'이 아니라 '루프'입니다. 이 강의에서는 에이전트가 계획하고, 도구를 실행하고, 결과를 관찰해 스스로 수정하는 에이전틱 루프(Agentic Loop)를 밑바닥부터 설계합니다. 피드백 신호 설계, 가드레일, 컨텍스트 관리, 멀티 에이전트 오케스트레이션까지 — 실무에서 바로 쓰는 패턴을 다이어그램과 함께 익힙니다.$aix$,
  null, 'dev', 'intermediate', array['Agentic Workflow', 'AI Agent', 'MCP', 'Claude', '자동화 루프']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'bb43b706-521e-c6a6-3ab3-cccb0a0dcbe5', 'ee5af2ab-0f01-04af-54cf-6e58ee98468f', 'agent-loop-basics', '에이전트 루프의 이해', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'ee5af2ab-0f01-04af-54cf-6e58ee98468f', 'self-correcting-loops', '자가 수정 루프 설계', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '2e4b67fa-e5e4-d93b-399d-fa3391b6dda0', 'ee5af2ab-0f01-04af-54cf-6e58ee98468f', 'production-workflows', '프로덕션 에이전틱 워크플로우', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5f8c6207-ea4e-b0d1-8762-03f68fe11079', 'bb43b706-521e-c6a6-3ab3-cccb0a0dcbe5', 'loop-engineering/why-agents', 'why-agents', '챗봇에서 에이전트로: 무엇이 달라졌나',
  $aix$한 번 묻고 한 번 답하는 챗봇의 시대는 끝났습니다. 2026년의 AI는 **목표를 주면 끝날 때까지 스스로 일하는 에이전트**입니다.

## 결정적 차이: 피드백을 받는가

챗봇과 에이전트를 가르는 기준은 모델 성능이 아니라 **구조**입니다.

- **챗봇**: 입력 → 출력. 결과가 틀려도 스스로 알 방법이 없습니다.
- **에이전트**: 입력 → 행동 → **결과 관찰** → 다음 행동. 자기 행동의 결과를 보고 경로를 수정합니다.

## 왜 지금 '루프'인가

- 모델이 도구(터미널, 파일, 브라우저)를 직접 다룰 수 있게 되면서, "행동의 결과"를 기계적으로 확인할 수 있게 됐습니다.
- Claude Code, Cursor Agent, Devin 같은 도구가 모두 이 구조 위에 서 있습니다.
- 같은 모델이라도 **루프 설계가 좋으면 성공률이 몇 배** 차이 납니다. 이것이 루프 엔지니어링입니다.

> 💡 **핵심**: 에이전트 = LLM + 도구 + **피드백 루프**. 이 강의는 그 루프를 설계하는 법을 다룹니다.$aix$,
  $aix${"type":"compare","title":"챗봇 vs 에이전트","columns":[{"title":"챗봇 (단발 호출)","icon":"message","tone":"muted","items":["질문 1번 → 답변 1번","결과 검증 없음","틀리면 사람이 다시 질문","도구 사용 불가"]},{"title":"에이전트 (루프)","icon":"repeat","tone":"primary","items":["목표 1번 → 완료까지 반복","행동 결과를 스스로 관찰","틀리면 스스로 경로 수정","터미널·파일·API 직접 조작"]}],"caption":"같은 모델이라도 루프 구조가 있으면 '일을 끝내는 능력'이 생깁니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a8e24f8d-0758-6c72-4ee9-4d023ab2f4ce', 'bb43b706-521e-c6a6-3ab3-cccb0a0dcbe5', 'loop-engineering/anatomy-of-loop', 'anatomy-of-loop', '에이전트 루프 해부: 계획→실행→관찰→평가',
  $aix$모든 에이전틱 시스템은 결국 하나의 사이클로 수렴합니다. 이 4단계를 정확히 이해하면 어떤 프레임워크든 읽을 수 있습니다.

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

> 💡 **핵심**: 루프 엔지니어링 = "모델이 더 똑똑해지게"가 아니라 **"모델이 더 잘 판단할 수 있는 환경"**을 만드는 일입니다.$aix$,
  $aix${"type":"cycle","title":"에이전트 루프의 4단계","center":"목표 달성까지 반복","nodes":[{"label":"계획","sublabel":"다음 행동 결정","icon":"brain"},{"label":"실행","sublabel":"도구 호출","icon":"terminal"},{"label":"관찰","sublabel":"결과 읽기","icon":"eye"},{"label":"평가","sublabel":"완료 판단","icon":"check"}],"caption":"평가에서 '미완료'면 계획으로 돌아갑니다 — 이 순환이 에이전트의 본질입니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3d1ff484-b652-ee1e-576e-fbf163fb98cc', 'bb43b706-521e-c6a6-3ab3-cccb0a0dcbe5', 'loop-engineering/tools-and-mcp', 'tools-and-mcp', '도구(Tool)와 MCP: 에이전트의 손과 발',
  $aix$루프의 '실행' 단계는 도구가 결정합니다. 그리고 2026년 도구 생태계의 표준은 **MCP(Model Context Protocol)**입니다.

## 도구란 무엇인가

도구는 모델이 호출할 수 있는 함수입니다. 이름, 설명, 파라미터 스키마(JSON Schema)로 정의됩니다.

```json
{
  "name": "run_tests",
  "description": "프로젝트 테스트를 실행하고 결과를 반환",
  "input_schema": {
    "type": "object",
    "properties": { "path": { "type": "string" } }
  }
}
```

## MCP: 도구의 USB-C 포트

- 예전에는 도구를 앱마다 다시 구현했습니다. MCP는 **도구 서버를 한 번 만들면 모든 AI 클라이언트에서 재사용**하게 해주는 개방형 프로토콜입니다.
- Slack, GitHub, Postgres, 사내 API… 이미 수천 개의 MCP 서버가 공개돼 있습니다.
- Claude Code, Cursor 등 주요 에이전트 도구가 모두 MCP 클라이언트입니다.

## 도구 설계의 3원칙

- **결과가 관찰 가능해야** 합니다 — 성공/실패가 텍스트로 명확히 드러나게.
- **원자적**으로 — 한 도구는 한 가지 일만.
- **설명이 프롬프트**입니다 — 모델은 description을 읽고 도구를 고릅니다.

> 💡 **핵심**: 좋은 도구 설명 한 줄이 프롬프트 열 줄보다 루프 성공률을 더 높입니다.$aix$,
  $aix${"type":"stack","title":"MCP 아키텍처","layers":[{"label":"AI 에이전트 (MCP 클라이언트)","sublabel":"Claude Code · Cursor · 커스텀 에이전트","icon":"bot","tone":"primary"},{"label":"MCP 프로토콜","sublabel":"도구 목록·호출·결과를 표준 형식으로 교환","icon":"link","tone":"accent"},{"label":"MCP 서버들","sublabel":"GitHub · Slack · DB · 사내 API","icon":"server","tone":"muted"},{"label":"실제 시스템","sublabel":"코드 저장소, 메신저, 데이터베이스","icon":"database","tone":"muted"}],"caption":"MCP는 'AI 도구의 USB-C' — 서버 하나로 모든 클라이언트에 연결됩니다."}$aix$::jsonb, null, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9f36c635-06ca-8343-fa71-65988badca07', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/feedback-signals', 'feedback-signals', '피드백 신호 설계: 루프의 나침반',
  $aix$에이전트가 스스로 고치려면 **"지금 틀렸다"는 사실을 기계적으로 알려주는 신호**가 필요합니다. 신호가 없으면 루프는 감으로 도는 것과 같습니다.

## 코드 작업의 3대 신호

- **테스트** — 가장 강력한 신호. 기대 동작을 실행 가능한 형태로 명세합니다.
- **타입체크** — `tsc --noEmit` 한 번으로 수백 개의 잠재 버그가 드러납니다.
- **린트/포맷** — 스타일과 명백한 실수를 잡습니다.

## 신호의 품질 = 루프의 품질

같은 실패라도 신호의 **해상도**가 다릅니다.

- 나쁜 신호: `Error: test failed` (뭘 고쳐야 할지 모름)
- 좋은 신호: `expect(cart.total).toBe(3000) — received 2700, at cart.ts:42` (파일·라인·기대값)

에이전트에게는 **좋은 에러 메시지가 곧 좋은 프롬프트**입니다.

## 신호를 루프에 연결하기

실행 명령을 하나로 묶어 두면 에이전트가 매 반복마다 같은 기준으로 검증합니다.

```bash
npm run check   # = tsc --noEmit && eslint . && vitest run
```

> 💡 **핵심**: 자가 수정 루프의 성능은 모델이 아니라 **피드백 신호의 해상도**가 결정합니다.$aix$,
  $aix${"type":"grid","title":"피드백 신호의 종류와 강도","items":[{"label":"테스트","sublabel":"기대 동작 명세 · 최강 신호","icon":"test-tube","tone":"primary"},{"label":"타입체크","sublabel":"tsc --noEmit","icon":"shield","tone":"accent"},{"label":"린트","sublabel":"스타일·명백한 실수","icon":"filter","tone":"accent"},{"label":"빌드","sublabel":"최종 통합 검증","icon":"check","tone":"success"},{"label":"런타임 로그","sublabel":"실행 중 동작 확인","icon":"eye","tone":"muted"},{"label":"사람 리뷰","sublabel":"마지막 관문","icon":"user","tone":"warning"}],"caption":"위쪽 신호일수록 기계적·즉각적 — 루프에 먼저 연결하세요."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '30f31345-856d-46ef-0e63-446b597c92cd', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/write-test-fix', 'write-test-fix', '실습: 테스트 실패 → 자가 수정 루프 돌리기',
  $aix$이론은 충분합니다. Claude Code로 실제 자가 수정 루프를 돌려봅니다.

## 시나리오

장바구니 할인 로직에 버그가 있고, 실패하는 테스트가 있습니다. 에이전트에게 목표만 주고 루프를 관찰합니다.

## 따라 하기

1. 실패하는 테스트를 먼저 확인합니다 — `npx vitest run`
2. 에이전트에게 **목표 + 검증 방법**을 함께 줍니다:

```text
cart.test.ts의 실패하는 테스트를 통과시켜 줘.
수정 후 반드시 npx vitest run 명령으로 검증하고,
통과할 때까지 반복해.
```

3. 에이전트가 도는 루프를 관찰합니다: 테스트 실행 → 에러 읽기 → 코드 수정 → 재실행.

## 관찰 포인트

- 에이전트는 에러 메시지의 **파일·라인 정보**를 따라 이동합니다.
- "통과할 때까지 반복해"라는 한 줄이 **루프 계약**을 만듭니다 — 이 문장이 없으면 한 번 고치고 멈추는 경우가 많습니다.

> 💡 **핵심**: 프롬프트에 목표만 쓰지 말고 **검증 명령 + 반복 조건**을 함께 쓰세요. 그 순간 챗봇이 에이전트가 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"claude — 자가 수정 루프","lines":[{"text":"npx vitest run","tone":"cmd"},{"text":"✕ cart > 10% 할인 적용  (cart.test.ts:18)","tone":"err"},{"text":"  expected 2700, received 3000","tone":"dim"},{"text":"# 에이전트: cart.ts:42 할인율 계산 수정","tone":"comment"},{"text":"npx vitest run","tone":"cmd"},{"text":"✕ cart > 중복 쿠폰 방지  (cart.test.ts:31)","tone":"err"},{"text":"# 에이전트: 쿠폰 중복 가드 추가","tone":"comment"},{"text":"npx vitest run","tone":"cmd"},{"text":"✓ 12 passed (12)","tone":"ok"},{"text":"목표 달성 — 루프 종료","tone":"ok"}],"caption":"실패 → 수정 → 재검증이 사람 개입 없이 3회 반복된 실제 루프 흐름입니다."}$aix$::jsonb, $aix${"title":"에디터에서 자가 수정 루프 따라하기","app":{"kind":"code-editor","windowTitle":"cart.ts — AI 에이전트 세션","files":[{"id":"f-cart","name":"cart.ts","active":true},{"id":"f-test","name":"cart.test.ts"},{"id":"f-pkg","name":"package.json"}],"code":[{"id":"c1","text":"export function applyDiscount(total: number) {"},{"id":"c2","text":"// 10% 할인 쿠폰 적용","indent":1,"tone":"comment"},{"id":"c3","text":"return total * 1.1; // ← 버그: 할인이 아니라 할증","indent":1,"tone":"del"},{"id":"c4","text":"return total * 0.9;","indent":1,"tone":"add","hidden":true},{"id":"c5","text":"}"}],"terminal":[{"id":"t1","text":"npx vitest run","tone":"cmd","hidden":true},{"id":"t2","text":"✕ cart > 10% 할인 적용 (cart.test.ts:18)","tone":"err","hidden":true},{"id":"t3","text":"  expected 2700, received 3300","tone":"out","hidden":true},{"id":"t4","text":"npx vitest run","tone":"cmd","hidden":true},{"id":"t5","text":"✓ 12 passed (12) — 루프 종료","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 먼저 테스트를 실행해 실패 신호를 확인합니다"},{"t":"type","target":"t1","text":"npx vitest run"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"② 에러가 가리키는 라인으로 이동합니다"},{"t":"move","target":"c3"},{"t":"dblclick","target":"c3"},{"t":"caption","text":"③ 할인율 계산을 수정합니다 (1.1 → 0.9)"},{"t":"type","target":"c4","text":"return total * 0.9;"},{"t":"wait","ms":500},{"t":"caption","text":"④ 같은 명령으로 재검증 — 이것이 루프입니다"},{"t":"type","target":"t4","text":"npx vitest run"},{"t":"reveal","target":"t5"},{"t":"move","target":"t5"},{"t":"caption","text":"✅ 테스트 통과 — 성공 종료 조건 달성"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1d02b7ab-afef-6629-6731-906cd179087f', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/guardrails', 'guardrails', '가드레일: 무한 루프와 폭주를 막는 법',
  $aix$루프는 강력한 만큼 위험합니다. 잘못 설계된 루프는 같은 실수를 무한 반복하거나, 테스트를 '삭제'해서 통과시키는 꼼수를 씁니다.

## 반드시 넣어야 할 4가지 가드레일

- **반복 상한** — 최대 시도 횟수(예: 5회)를 넘으면 멈추고 사람에게 보고.
- **불변 영역** — 테스트 파일, 설정 파일은 수정 금지라고 명시. ("테스트를 고치지 말고 구현을 고쳐")
- **범위 제한** — 건드릴 수 있는 디렉토리·파일을 한정.
- **진전 감지** — 직전 시도와 같은 에러가 반복되면 접근을 바꾸거나 중단.

## 종료 조건은 두 종류

1. **성공 종료**: 검증 명령이 통과 (기계적 판정)
2. **안전 종료**: 상한 도달, 진전 없음, 금지 행동 감지 (가드레일 판정)

성공 조건만 있고 안전 조건이 없는 루프는 프로덕션에 넣을 수 없습니다.

> 💡 **핵심**: "통과할 때까지 반복해"에는 반드시 **"단, 최대 N번까지, 테스트 파일은 건드리지 말고"**를 붙이세요.$aix$,
  $aix${"type":"flow","title":"가드레일이 있는 자가 수정 루프","nodes":[{"label":"코드 수정","icon":"code","tone":"primary"},{"label":"검증 실행","sublabel":"테스트 + 타입체크","icon":"test-tube","tone":"accent","edgeLabel":"테스트 파일은 수정 금지"},{"label":"가드레일 체크","sublabel":"시도 5회 미만? 진전 있음?","icon":"shield","tone":"warning","edgeLabel":"실패 시"},{"label":"완료 또는 사람에게 보고","sublabel":"성공 종료 / 안전 종료","icon":"check","tone":"success","edgeLabel":"통과 또는 상한 도달"}],"loopBack":{"from":2,"to":0,"label":"재시도 (최대 5회)"},"caption":"성공 종료와 안전 종료, 두 개의 출구가 모두 있어야 프로덕션 루프입니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '04c7685d-c4bb-e5e9-df98-e0874713d165', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/context-management', 'context-management', '컨텍스트 관리: 긴 루프가 무너지지 않게',
  $aix$루프가 수십 번 돌면 대화 기록이 컨텍스트 윈도우를 가득 채웁니다. 긴 작업에서 에이전트가 갑자기 멍청해지는 이유의 대부분이 여기 있습니다.

## 컨텍스트가 오염되는 경로

- 거대한 파일 전체를 반복해서 읽음
- 실패한 시도의 로그가 쌓여 **성공 경로를 가림**
- 오래된 계획과 새 계획이 섞여 목표가 흐려짐

## 2026년의 표준 대응 전략

- **컴팩션(Compaction)** — 오래된 기록을 요약으로 치환. Claude Code의 auto-compact가 대표적.
- **서브에이전트 위임** — 탐색처럼 토큰을 많이 쓰는 작업은 별도 에이전트에게 시키고 **결론만** 받아옵니다.
- **외부 메모리** — 진행 상황을 `PLAN.md` 같은 파일에 기록하고, 컨텍스트 대신 파일을 신뢰의 원천으로 삼습니다.
- **부분 읽기** — 파일 전체가 아니라 필요한 범위만 읽도록 도구를 설계합니다.

## 실무 감각

"루프가 길어질수록 컨텍스트에 남기는 것은 **결정과 결론**, 버리는 것은 **과정과 시행착오**" — 이 원칙 하나면 충분합니다.

> 💡 **핵심**: 컨텍스트는 에이전트의 작업대입니다. 작업대가 좁아지면 실력이 떨어집니다 — 요약하고, 위임하고, 파일에 적으세요.$aix$,
  $aix${"type":"compare","title":"컨텍스트 전략: 방치 vs 관리","columns":[{"title":"방치된 루프","icon":"alert","tone":"warning","items":["실패 로그가 계속 쌓임","파일 전체를 반복해서 읽음","50번째 반복에서 목표를 잊음","품질이 점점 하락"]},{"title":"관리된 루프","icon":"layers","tone":"primary","items":["오래된 기록은 요약(컴팩션)","탐색은 서브에이전트에 위임","진행 상황은 PLAN.md에 기록","긴 작업에도 품질 유지"]}],"caption":"결정과 결론은 남기고, 과정과 시행착오는 버립니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'eff676fa-0e07-be2f-c842-7ae3ae6cf322', '2e4b67fa-e5e4-d93b-399d-fa3391b6dda0', 'loop-engineering/orchestration-patterns', 'orchestration-patterns', '멀티 에이전트 패턴: 분업의 3가지 형태',
  $aix$작업이 커지면 에이전트 하나로는 부족합니다. 2026년 실무에서 검증된 오케스트레이션 패턴은 크게 세 가지입니다.

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

> 💡 **핵심**: 멀티 에이전트의 가치는 '더 많은 AI'가 아니라 **독립된 컨텍스트**에서 나옵니다. 서로의 편향을 공유하지 않는 것이 힘입니다.$aix$,
  $aix${"type":"grid","title":"3가지 오케스트레이션 패턴","items":[{"label":"파이프라인","sublabel":"분석 → 구현 → 리뷰 직렬 연결","icon":"workflow","tone":"primary"},{"label":"팬아웃","sublabel":"대량 작업을 병렬 분산","icon":"git-branch","tone":"accent"},{"label":"생성자-검증자","sublabel":"만드는 자 vs 반박하는 자","icon":"shield","tone":"success"},{"label":"오케스트레이터","sublabel":"전체를 지휘하는 메인 루프","icon":"brain","tone":"warning"}],"caption":"실전에서는 세 패턴을 조합합니다 — 오케스트레이터가 상황에 맞게 지휘합니다."}$aix$::jsonb, null, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f510d67a-f429-39a1-d5d1-02b29cd21380', '2e4b67fa-e5e4-d93b-399d-fa3391b6dda0', 'loop-engineering/human-in-the-loop', 'human-in-the-loop', '휴먼 인 더 루프: 사람이 서야 할 자리',
  $aix$완전 자동화가 항상 정답은 아닙니다. 좋은 워크플로우는 **사람의 판단이 가장 값진 지점**에만 사람을 배치합니다.

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

> 💡 **핵심**: 자동화 설계의 질문은 "사람을 뺄 수 있는가"가 아니라 **"사람의 판단이 어디서 가장 값진가"**입니다.$aix$,
  $aix${"type":"flow","title":"3개의 휴먼 관문","nodes":[{"label":"사람: 목표·제약 정의","sublabel":"시작 관문","icon":"user","tone":"warning"},{"label":"에이전트: 자율 작업 루프","sublabel":"계획→실행→관찰→평가 반복","icon":"bot","tone":"primary"},{"label":"사람: 위험 행동 승인","sublabel":"배포·결제·삭제 직전","icon":"shield","tone":"warning","edgeLabel":"되돌리기 어려운 행동 감지 시"},{"label":"사람: 최종 품질 승인","sublabel":"완료 관문","icon":"check","tone":"success"}],"caption":"사람은 관문에만 서고, 관문 사이는 에이전트가 자율 주행합니다."}$aix$::jsonb, $aix${"title":"Slack에서 배포 승인 관문 따라하기","app":{"kind":"chat-app","workspace":"우리 팀 워크스페이스","channels":[{"id":"ch-deploy","name":"배포-승인","active":true},{"id":"ch-dev","name":"개발-일반"},{"id":"ch-alert","name":"장애-알림"}],"composerId":"composer","messages":[{"id":"m1","author":"루프봇","bot":true,"time":"오후 2:41","text":"결제 모듈 버그 수정 완료 — 테스트 12/12 통과.\n프로덕션 배포는 되돌리기 어려운 작업이라 승인이 필요합니다.","hidden":true},{"id":"m2","author":"루프봇","bot":true,"time":"오후 2:41","text":"변경 요약: cart.ts 할인율 계산 수정 (+1줄 / -1줄)","hidden":true},{"id":"m3","author":"나 (리드 개발자)","time":"오후 2:44","text":"diff 확인했습니다. 배포 승인합니다 ✅","hidden":true},{"id":"m4","author":"루프봇","bot":true,"time":"오후 2:45","text":"✅ 배포 시작 → 완료 (v2.4.1). 모니터링 정상입니다.","hidden":true}]},"actions":[{"t":"caption","text":"① 에이전트가 위험 관문(배포)에서 멈추고 승인을 요청합니다"},{"t":"reveal","target":"m1"},{"t":"reveal","target":"m2"},{"t":"wait","ms":700},{"t":"caption","text":"② 사람은 변경 요약을 확인하고 판단만 합니다"},{"t":"move","target":"m2"},{"t":"click"},{"t":"wait","ms":500},{"t":"caption","text":"③ 승인 메시지를 입력합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"diff 확인했습니다. 배포 승인합니다 ✅"},{"t":"wait","ms":400},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"m3"},{"t":"caption","text":"④ 승인 즉시 에이전트가 나머지를 자율 수행합니다"},{"t":"reveal","target":"m4"},{"t":"move","target":"m4"},{"t":"wait","ms":900}]}$aix$::jsonb, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '929004f6-65c6-f78d-66ff-c0310fe5a1df', '2e4b67fa-e5e4-d93b-399d-fa3391b6dda0', 'loop-engineering/eval-and-monitor', 'eval-and-monitor', '운영: 루프를 측정하고 개선하기',
  $aix$루프를 만들었다면 이제 **측정**할 차례입니다. 측정 없는 루프 개선은 감으로 하는 최적화일 뿐입니다.

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

> 💡 **핵심**: "만들고 끝"이 아니라 **측정 → 분류 → 하나 고침 → 재측정**. 루프를 개선하는 것도 결국 루프입니다.$aix$,
  $aix${"type":"steps","title":"루프 개선 사이클","steps":[{"label":"트랜스크립트 수집","sublabel":"실패 사례를 빠짐없이 저장","icon":"clipboard"},{"label":"실패 유형 분류","sublabel":"신호·도구·컨텍스트·가드레일","icon":"filter"},{"label":"최빈 유형 하나만 수정","sublabel":"한 번에 하나씩","icon":"wrench"},{"label":"같은 작업 세트로 재측정","sublabel":"성공률·반복 횟수 비교","icon":"chart"}],"caption":"이 사이클 자체가 여러분의 '루프를 위한 루프'입니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 하네스 구축: LLM 평가와 테스트 프레임워크
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '6a2a3f5d-1a88-fbd4-2c0f-93e1fa9fdce4', 'ai-harness', 'AI 하네스 구축: LLM 평가와 테스트 프레임워크', $aix$프롬프트를 바꿨는데 좋아졌는지 나빠졌는지 아무도 모른다면, 그 팀은 감으로 개발하고 있는 것입니다. 이 강의에서는 골든 데이터셋과 채점기(정확 일치·코드 채점·LLM-as-Judge)로 이벨(Evals)을 설계하고, promptfoo 스타일 하네스를 CI에 연결해 회귀를 자동으로 잡아냅니다. 나아가 프로덕션 실패 사례를 다시 이벨로 환류시키는 개선 루프와 A/B 테스트까지 — 2026년 LLM 품질 관리의 전 과정을 다이어그램과 함께 익힙니다.$aix$,
  null, 'dev', 'advanced', array['Evals', 'LLM Testing', 'LLM-as-Judge', '프롬프트 버전 관리', 'CI/CD']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', '6a2a3f5d-1a88-fbd4-2c0f-93e1fa9fdce4', 'evals-foundations', '이벨(Evals)의 기초', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', '6a2a3f5d-1a88-fbd4-2c0f-93e1fa9fdce4', 'building-harness', '테스트 하네스 구축', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'ead8ad43-5360-8b0d-801b-53c76195ef46', '6a2a3f5d-1a88-fbd4-2c0f-93e1fa9fdce4', 'production-quality', '프로덕션 품질 관리', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4a3ce6e6-c722-57f1-fe0f-a78af628c761', 'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', 'ai-harness/why-harness', 'why-harness', '왜 하네스인가: 바이브 체크의 한계',
  $aix$"프롬프트를 고쳤더니 더 좋아진 것 같아요" — 이 문장이 팀 슬랙에 올라오는 순간, 여러분에게는 하네스가 필요합니다.

## 바이브 체크(Vibe Check)의 3가지 함정

- **표본 편향** — 방금 떠올린 예시 3개로 판단합니다. 실사용 입력의 분포와 전혀 다릅니다.
- **회귀 실명** — 케이스 A가 좋아진 대신 케이스 B가 망가져도 알아챌 방법이 없습니다.
- **재현 불가** — "좋아 보였다"는 기억은 다음 주에 같은 기준으로 재측정할 수 없습니다.

## 하네스(Harness)란

하네스는 LLM 앱을 **같은 입력 세트로 반복 실행하고, 출력을 자동 채점해 점수로 만드는 실행 틀**입니다.

- 입력: 골든 데이터셋 (대표 케이스 모음)
- 실행: 프롬프트/모델 버전별로 일괄 호출
- 채점: 규칙·코드·LLM 채점기로 자동 판정
- 결과: "이번 변경으로 정확도 84% → 91%" 같은 **숫자**

숫자가 생기면 논쟁이 실험으로 바뀝니다. 이것이 이 강의의 목표입니다.

> 💡 **핵심**: 바이브 체크는 폐기물이 아니라 출발점입니다 — 감으로 발견한 기준을 **하네스에 옮겨 적는 순간** 품질 관리가 시작됩니다.$aix$,
  $aix${"type":"compare","title":"바이브 체크 vs 이벨 하네스","columns":[{"title":"바이브 체크","icon":"eye","tone":"muted","items":["떠오른 예시 3~4개로 판단","케이스 B의 회귀를 놓침","\"좋아 보였다\"는 기억뿐","논쟁으로 의사결정"]},{"title":"이벨 하네스","icon":"test-tube","tone":"primary","items":["대표 케이스 수백 개 일괄 실행","전체 점수로 회귀 즉시 감지","언제든 같은 기준으로 재측정","숫자로 의사결정"]}],"caption":"같은 프롬프트 변경도 하네스가 있으면 '실험'이 되고, 없으면 '도박'이 됩니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '72cc7adf-04c5-69a2-db06-0c25c765dd8b', 'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', 'ai-harness/golden-dataset', 'golden-dataset', '골든 데이터셋 만들기',
  $aix$이벨의 품질은 채점기가 아니라 **데이터셋**이 결정합니다. 대표성 없는 100문항보다 잘 고른 30문항이 낫습니다.

## 어디서 케이스를 모으는가

- **실사용 로그** — 최고의 원천. 실제 사용자가 던진 입력이 곧 시험 문제입니다.
- **실패 사례** — 버그 리포트, 고객 불만에 등장한 입력은 무조건 수록합니다.
- **엣지 케이스** — 빈 입력, 초장문, 다국어, 프롬프트 인젝션 시도 등 경계 조건.
- **합성 데이터** — 부족한 유형은 LLM으로 변형 생성하되, 반드시 사람이 검수합니다.

## 케이스 하나의 구조

각 케이스는 세 가지를 갖춥니다: **입력(input) · 기대 결과(expected) · 채점 기준(assertion)**. 기대 결과는 정답 문자열일 수도, "환불 정책을 언급해야 함" 같은 조건일 수도 있습니다.

## 크기보다 커버리지

- 시작은 **20~50개**면 충분합니다. 지금 당장 만드세요.
- 유형별 분포를 실사용과 비슷하게 맞춥니다 (자주 오는 질문이 데이터셋에도 많아야 합니다).
- 데이터셋은 코드처럼 **버전 관리**하고, 새 실패가 나올 때마다 자랍니다.

> 💡 **핵심**: 골든 데이터셋은 한 번 만드는 산출물이 아니라 **실패할 때마다 자라는 살아있는 자산**입니다.$aix$,
  $aix${"type":"steps","title":"골든 데이터셋 구축 절차","steps":[{"label":"실사용 로그 발굴","sublabel":"실제 입력에서 대표 케이스 추출","icon":"search"},{"label":"실패·엣지 케이스 수록","sublabel":"버그 리포트, 경계 조건, 인젝션","icon":"alert"},{"label":"기대 결과·채점 기준 작성","sublabel":"input · expected · assertion","icon":"clipboard"},{"label":"검수 후 버전 관리","sublabel":"20~50개로 시작, git에 커밋","icon":"git-branch"}],"caption":"완벽한 100개를 기다리지 말고, 대표적인 30개로 오늘 시작하세요."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '50baa3fd-5d64-0d43-2a05-88c50b58bbd8', 'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', 'ai-harness/grading-methods', 'grading-methods', '채점 방식 3종: 정확 일치·코드 채점·LLM-as-Judge',
  $aix$출력을 어떻게 채점할지가 이벨 설계의 절반입니다. 2026년 실무에서 쓰는 채점기는 크게 세 계열입니다.

## 1. 정확 일치 (Exact / Pattern Match)

정답이 하나로 정해지는 작업에 씁니다 — 분류 라벨, JSON 필드 값, 숫자 계산.

- 장점: 빠르고, 공짜고, 결정적(같은 입력 = 같은 점수)
- 변형: 부분 문자열 포함, 정규식, 대소문자 무시

## 2. 코드 채점 (Programmatic)

정답 문자열은 없지만 **검증 가능한 속성**이 있을 때 씁니다.

- JSON 스키마 통과 여부, 생성된 SQL의 실행 성공, 코드의 테스트 통과
- 응답 길이·금칙어·필수 키워드 같은 규칙 검사
- 결정적이면서 정확 일치보다 유연 — **가능하면 항상 여기까지는 코드로**

## 3. LLM-as-Judge

"친절한가", "요약이 원문에 충실한가"처럼 사람의 판단이 필요한 품질은 **다른 LLM에게 루브릭을 주고 채점**시킵니다.

- 유연하지만 비싸고, 채점기 자체가 틀릴 수 있음 → 2모듈에서 설계법을 다룹니다

## 선택 순서

정확 일치로 되면 정확 일치 → 안 되면 코드 채점 → 그래도 안 되는 것만 Judge. **싼 채점기부터 소진**하는 것이 원칙입니다.

> 💡 **핵심**: 채점기는 섞어 씁니다 — 형식은 코드로, 품질은 Judge로. 한 케이스에 assertion 여러 개가 정상입니다.$aix$,
  $aix${"type":"grid","title":"채점 방식 3종 비교","items":[{"label":"정확 일치","sublabel":"분류·JSON 값 · 공짜·결정적","icon":"check","tone":"success"},{"label":"코드 채점","sublabel":"스키마·실행 검증 · 결정적","icon":"code","tone":"primary"},{"label":"LLM-as-Judge","sublabel":"톤·충실성 · 유연하지만 비쌈","icon":"brain","tone":"accent"},{"label":"사람 평가","sublabel":"최종 보정 · Judge 검증용","icon":"user","tone":"warning"}],"caption":"왼쪽 위(싸고 결정적)부터 소진하고, 남는 것만 오른쪽(비싸고 유연)으로 보냅니다."}$aix$::jsonb, null, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'adfc6946-d73d-1f7f-1e0f-c1fdf759b84c', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/harness-setup', 'harness-setup', '실습: promptfoo로 하네스 세팅하기',
  $aix$이론은 충분합니다. promptfoo 스타일 도구로 10분 만에 첫 하네스를 세웁니다.

## 하네스의 3요소를 파일로

promptfoo는 설정 파일 하나에 이벨의 3요소를 선언합니다.

- **prompts**: 테스트할 프롬프트 (파일 경로 또는 인라인)
- **providers**: 실행할 모델 (여러 개면 자동으로 나란히 비교)
- **tests**: 골든 데이터셋 — 입력 변수와 assertion 목록

```yaml
# promptfooconfig.yaml
prompts: [file://prompts/support-agent.txt]
providers: [anthropic:claude-sonnet-4-5]
tests:
  - vars: { question: "환불은 며칠 걸리나요?" }
    assert:
      - type: contains
        value: "영업일"
      - type: llm-rubric
        value: "환불 정책을 정확히 안내하고 정중한 톤이어야 함"
```

## 실행과 리포트

- `npx promptfoo eval` — 전체 케이스 실행, 터미널에 합격률 출력
- `npx promptfoo view` — 케이스별 출력·점수를 웹 UI로 비교

## 첫 실행에서 볼 것

합격률 숫자 자체보다 **실패한 케이스의 출력**을 직접 읽으세요. assertion이 너무 빡빡하거나 헐거운 곳이 반드시 발견되고, 그걸 고치는 과정이 곧 이벨 튜닝입니다.

> 💡 **핵심**: 하네스 세팅의 완성 기준은 "명령 한 줄로 전체 데이터셋이 돌고 합격률이 나오는가"입니다. 그 한 줄이 이후 모든 자동화의 기반이 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"promptfoo — 첫 이벨 실행","lines":[{"text":"npx promptfoo eval","tone":"cmd"},{"text":"Running 42 test cases across 1 provider...","tone":"dim"},{"text":"✓ [contains] 환불은 며칠 걸리나요?","tone":"ok"},{"text":"✓ [llm-rubric] 배송 조회 방법 알려줘","tone":"ok"},{"text":"✕ [contains] 해외 배송도 되나요?","tone":"err"},{"text":"  expected \"관세\" in output","tone":"dim"},{"text":"─────────────────────────────","tone":"dim"},{"text":"Pass rate: 36/42 (85.7%)","tone":"out"},{"text":"npx promptfoo view  # 웹 UI로 실패 케이스 확인","tone":"comment"}],"caption":"명령 한 줄 = 데이터셋 전체 실행 + 자동 채점 + 합격률. 이것이 하네스입니다."}$aix$::jsonb, $aix${"title":"promptfoo로 첫 이벨 실행 따라하기","app":{"kind":"code-editor","windowTitle":"promptfooconfig.yaml — 이벨 하네스","files":[{"id":"f-config","name":"promptfooconfig.yaml","active":true},{"id":"f-prompt","name":"prompts/support-agent.txt"},{"id":"f-pkg","name":"package.json"}],"code":[{"id":"y1","text":"prompts: [file://prompts/support-agent.txt]"},{"id":"y2","text":"providers: [anthropic:claude-sonnet-4-5]"},{"id":"y3","text":"tests:"},{"id":"y4","text":"- vars: { question: \"해외 배송도 되나요?\" }","indent":1},{"id":"y5","text":"assert:","indent":2},{"id":"y6","text":"- type: contains","indent":3},{"id":"y7","text":"value: \"관세\" # ← 너무 빡빡한 기준","indent":4,"tone":"del"},{"id":"y8","text":"value: \"해외 배송\"","indent":4,"tone":"add","hidden":true},{"id":"y9","text":"- type: llm-rubric","indent":3,"hidden":true},{"id":"y10","text":"value: \"배송 가능 여부를 정확히 안내\"","indent":4,"hidden":true}],"terminal":[{"id":"t1","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"t2","text":"✕ [contains] 해외 배송도 되나요?","tone":"err","hidden":true},{"id":"t3","text":"  expected \"관세\" in output","tone":"out","hidden":true},{"id":"t4","text":"Pass rate: 36/42 (85.7%)","tone":"out","hidden":true},{"id":"t5","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"t6","text":"✓ [contains] 해외 배송도 되나요?","tone":"ok","hidden":true},{"id":"t7","text":"Pass rate: 42/42 (100%)","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 설정 파일의 3요소(프롬프트·모델·테스트)를 확인합니다"},{"t":"move","target":"y1"},{"t":"move","target":"y3"},{"t":"caption","text":"② 명령 한 줄로 전체 데이터셋을 실행합니다"},{"t":"type","target":"t1","text":"npx promptfoo eval"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"reveal","target":"t4"},{"t":"wait","ms":600},{"t":"caption","text":"③ 실패 케이스를 읽고 너무 빡빡한 assertion을 찾습니다"},{"t":"move","target":"y7"},{"t":"dblclick","target":"y7"},{"t":"caption","text":"④ assertion을 실제 기준에 맞게 고칩니다"},{"t":"type","target":"y8","text":"value: \"해외 배송\""},{"t":"reveal","target":"y9"},{"t":"reveal","target":"y10"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 같은 명령으로 재실행해 합격률 변화를 확인합니다"},{"t":"type","target":"t5","text":"npx promptfoo eval"},{"t":"reveal","target":"t6"},{"t":"reveal","target":"t7"},{"t":"move","target":"t7"},{"t":"caption","text":"✅ 합격률 100% — 첫 하네스 세팅 완료입니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '74abd22b-ff85-d860-cc50-603b8c5a043f', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/llm-as-judge-design', 'llm-as-judge-design', 'LLM-as-Judge 설계와 함정',
  $aix$Judge는 강력하지만, 검증하지 않은 Judge는 **틀린 자로 재는 것**과 같습니다. 설계 원칙과 알려진 편향을 짚습니다.

## 좋은 루브릭의 조건

- **이분법으로 쪼개기** — "1~10점 매겨줘"보다 "원문에 없는 사실이 있는가: 예/아니오" 여러 개가 훨씬 일관됩니다.
- **기준을 프롬프트에 명시** — "좋은 요약인가"가 아니라 "핵심 수치 포함? 원문에 없는 주장 없음? 3문장 이내?"
- **판단 이유를 먼저 쓰게** — 근거를 먼저 생성하고 결론을 내리게 하면 정확도가 오릅니다.

## 알려진 편향 3가지

- **자기 선호(Self-preference)** — 모델은 자기(같은 계열 모델)가 쓴 답을 후하게 줍니다 → 채점 대상과 **다른 모델**을 Judge로.
- **위치 편향** — A/B 비교 시 먼저 본 답을 선호하는 경향 → 순서를 바꿔 두 번 채점하고 교차 검증.
- **장문 편향** — 길고 그럴듯한 답에 후한 점수 → 루브릭에 "길이는 평가하지 않는다"를 명시.

## Judge도 이벨이 필요합니다

사람이 라벨링한 표본 30~50개와 Judge 판정의 **일치율**을 측정하세요. 일치율 90% 미만이면 루브릭을 고칠 차례입니다.

> 💡 **핵심**: Judge는 "설계 → 사람 라벨과 대조 → 루브릭 수정"을 거친 뒤에만 신뢰하세요. **채점기를 채점하는 단계**를 건너뛰면 안 됩니다.$aix$,
  $aix${"type":"chat","title":"Judge 프롬프트 설계 예시","messages":[{"role":"system","text":"루브릭: ① 원문에 없는 사실 포함? ② 핵심 수치 누락? ③ 3문장 초과? 각각 예/아니오로. 길이는 평가하지 마세요. 근거를 먼저 쓰고 결론을 내리세요."},{"role":"user","text":"[원문]과 [요약]을 채점하세요."},{"role":"ai","text":"근거: 요약의 \"전년 대비 30% 성장\"은 원문에 없음(원문은 13%). → ① 예 ② 아니오 ③ 아니오 — 판정: FAIL (환각)"}],"caption":"점수 대신 예/아니오 체크리스트, 결론 전에 근거 — Judge 일관성의 핵심 두 가지입니다."}$aix$::jsonb, $aix${"title":"LLM-as-Judge 채점과 검증 따라하기","app":{"kind":"browser","url":"evals.ourteam.dev/judge","blocks":[{"id":"b-head","type":"heading","label":"LLM-as-Judge 채점 대시보드"},{"id":"b-rubric","type":"text","label":"루브릭: ① 원문에 없는 사실? ② 핵심 수치 누락? ③ 3문장 초과? — 각각 예/아니오, 길이는 평가하지 않음"},{"id":"b-input","type":"input","label":"채점할 요약을 붙여넣으세요…"},{"id":"b-run","type":"button","label":"Judge 채점 실행"},{"id":"b-reason","type":"card","label":"근거: 요약의 \"30% 성장\"은 원문에 없음 (원문은 13%)","hidden":true},{"id":"b-check","type":"card","label":"체크: ① 예 · ② 아니오 · ③ 아니오","hidden":true},{"id":"b-verdict","type":"badge","label":"판정: FAIL (환각)","hidden":true},{"id":"b-verify","type":"button","label":"사람 라벨 50건과 대조"},{"id":"b-agree","type":"card","label":"사람 라벨 일치율: 46/50 (92%) — 신뢰 가능","hidden":true}]},"actions":[{"t":"caption","text":"① 루브릭을 예/아니오 체크리스트로 명시합니다"},{"t":"move","target":"b-rubric"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 채점할 요약을 입력합니다"},{"t":"click","target":"b-input"},{"t":"type","target":"b-input","text":"3분기 매출이 전년 대비 30% 성장했다."},{"t":"caption","text":"③ Judge를 실행합니다 — 근거를 먼저 쓰게 합니다"},{"t":"move","target":"b-run"},{"t":"click"},{"t":"wait","ms":600},{"t":"reveal","target":"b-reason"},{"t":"reveal","target":"b-check"},{"t":"reveal","target":"b-verdict"},{"t":"move","target":"b-verdict"},{"t":"wait","ms":600},{"t":"caption","text":"④ Judge 자체를 사람 라벨과 대조해 검증합니다"},{"t":"move","target":"b-verify"},{"t":"click"},{"t":"wait","ms":500},{"t":"reveal","target":"b-agree"},{"t":"move","target":"b-agree"},{"t":"caption","text":"✅ 일치율 92% — 이제 이 Judge를 신뢰할 수 있습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'bb1c4889-1145-2a6b-426c-391e1594de1c', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/prompt-versioning', 'prompt-versioning', '프롬프트 버전 관리: git으로 diff 남기기',
  $aix$프롬프트는 코드입니다. 노션 페이지나 채팅창에 흩어진 프롬프트는 "어제는 됐는데 오늘은 안 되는" 미스터리의 근원입니다.

## 프롬프트를 저장소로

- 프롬프트를 **별도 파일**(`prompts/*.txt`, `.yaml`)로 분리해 git에 커밋합니다.
- 코드에 문자열로 하드코딩하면 diff가 코드 변경에 묻힙니다 — 파일 분리가 핵심입니다.
- 모델명·온도 같은 파라미터도 설정 파일로 함께 버전 관리합니다.

## diff + 이벨 점수 = 완전한 기록

git이 "무엇이 바뀌었나"를, 이벨이 "그래서 얼마나 좋아졌나"를 기록합니다.

- 커밋 메시지에 이벨 결과를 남깁니다: `refine tone guide (eval: 85.7% → 92.9%)`
- PR 리뷰에서 프롬프트 diff와 점수 변화를 함께 봅니다 — 프롬프트 리뷰가 코드 리뷰와 같아집니다.

## 롤백이 공짜가 됩니다

프로덕션에서 품질 이슈가 터지면 `git revert` 한 번으로 직전 프롬프트로 복귀합니다. 배포된 프롬프트에는 커밋 해시를 태그로 남겨 **"지금 프로덕션에 어떤 버전이 돌고 있는가"**를 항상 답할 수 있게 하세요.

> 💡 **핵심**: 프롬프트 변경 이력 = **git diff(무엇을) + 이벨 점수(얼마나)**. 이 둘이 쌓이면 팀의 프롬프트 노하우가 자산이 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"git — 프롬프트 diff와 이벨 기록","lines":[{"text":"git diff prompts/support-agent.txt","tone":"cmd"},{"text":"- 고객 질문에 답변하세요.","tone":"err"},{"text":"+ 고객 질문에 답변하세요. 반드시 정책 문서의","tone":"ok"},{"text":"+ 근거 조항을 인용하고, 모르면 모른다고 답하세요.","tone":"ok"},{"text":"npx promptfoo eval","tone":"cmd"},{"text":"Pass rate: 39/42 (92.9%)  # 이전 85.7%","tone":"out"},{"text":"git commit -am \"support: 근거 인용 규칙 추가 (eval 85.7%→92.9%)\"","tone":"cmd"},{"text":"[main a3f9c21] support: 근거 인용 규칙 추가","tone":"dim"}],"caption":"diff가 '무엇을 바꿨나', 이벨 점수가 '그래서 좋아졌나'를 증명합니다."}$aix$::jsonb, $aix${"title":"프롬프트 diff + 이벨 점수 커밋 따라하기","app":{"kind":"code-editor","windowTitle":"support-agent.txt — 프롬프트 버전 관리","files":[{"id":"f-agent","name":"prompts/support-agent.txt","active":true},{"id":"f-cfg","name":"promptfooconfig.yaml"}],"code":[{"id":"p1","text":"당신은 우리 쇼핑몰의 고객 지원 상담원입니다."},{"id":"p2","text":"고객 질문에 답변하세요.","tone":"del"},{"id":"p3","text":"고객 질문에 답변하세요. 반드시 정책 문서의","tone":"add","hidden":true},{"id":"p4","text":"근거 조항을 인용하고, 모르면 모른다고 답하세요.","tone":"add","hidden":true}],"terminal":[{"id":"g1","text":"git diff prompts/support-agent.txt","tone":"cmd","hidden":true},{"id":"g2","text":"- 고객 질문에 답변하세요.","tone":"err","hidden":true},{"id":"g3","text":"+ …근거 조항을 인용하고, 모르면 모른다고","tone":"ok","hidden":true},{"id":"g4","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"g5","text":"Pass rate: 39/42 (92.9%)  # 이전 85.7%","tone":"ok","hidden":true},{"id":"g6","text":"git commit -am \"eval 85.7%→92.9%\"","tone":"cmd","hidden":true},{"id":"g7","text":"[main a3f9c21] support: 근거 인용 규칙 추가","tone":"out","hidden":true}]},"actions":[{"t":"caption","text":"① 프롬프트 파일에서 고칠 줄을 찾습니다"},{"t":"move","target":"p2"},{"t":"dblclick","target":"p2"},{"t":"caption","text":"② 근거 인용 규칙을 추가합니다"},{"t":"type","target":"p3","text":"고객 질문에 답변하세요. 반드시 정책 문서의"},{"t":"type","target":"p4","text":"근거 조항을 인용하고, 모르면 모른다고 답하세요."},{"t":"wait","ms":500},{"t":"caption","text":"③ git diff로 무엇이 바뀌었는지 확인합니다"},{"t":"type","target":"g1","text":"git diff prompts/support-agent.txt"},{"t":"reveal","target":"g2"},{"t":"reveal","target":"g3"},{"t":"wait","ms":600},{"t":"caption","text":"④ 이벨을 돌려 점수 변화를 확인합니다"},{"t":"type","target":"g4","text":"npx promptfoo eval"},{"t":"reveal","target":"g5"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ diff와 점수를 함께 커밋 메시지에 남깁니다"},{"t":"type","target":"g6","text":"git commit -am \"eval 85.7%→92.9%\""},{"t":"reveal","target":"g7"},{"t":"move","target":"g7"},{"t":"caption","text":"✅ 무엇을(diff) + 얼마나(점수)가 함께 기록되었습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '2e3cd141-1a38-c9d3-a16f-e7e778fcc32b', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/regression-ci', 'regression-ci', '회귀 테스트와 CI 연동',
  $aix$하네스의 진짜 힘은 **자동으로 돌 때** 나옵니다. 프롬프트 PR마다 이벨이 돌고, 점수가 떨어지면 머지가 막히는 구조를 만듭니다.

## CI 파이프라인 설계

- **트리거**: `prompts/` 디렉토리 변경이 포함된 PR
- **실행**: 골든 데이터셋 전체로 이벨 실행 (promptfoo는 GitHub Actions 연동을 기본 제공)
- **게이트**: 합격률이 기준선(예: main 브랜치 점수) 아래로 떨어지면 체크 실패 → 머지 차단
- **리포트**: PR 코멘트에 케이스별 변화 요약 자동 게시

## 비용과 속도 관리

- LLM 호출이 든 이벨은 유닛 테스트보다 느리고 비쌉니다 — **캐시**(같은 프롬프트+입력은 재사용)가 필수입니다.
- PR에서는 핵심 서브셋(스모크 세트)만, main 머지 후에 전체 세트를 돌리는 2단 구성도 실용적입니다.
- Judge 채점의 비결정성 대비: 경계선 케이스는 재시도 후 다수결로 판정합니다.

## 기준선(Baseline)의 규율

기준선 점수를 낮추는 머지는 반드시 **명시적 합의**를 거치게 하세요. "이번만 예외"가 쌓이면 하네스는 장식이 됩니다.

> 💡 **핵심**: "프롬프트 PR → 이벨 자동 실행 → 점수 하락 시 머지 차단" — 이 게이트 하나가 팀 전체의 품질 하한선을 지킵니다.$aix$,
  $aix${"type":"flow","title":"이벨 CI 게이트","nodes":[{"label":"프롬프트 수정 PR","sublabel":"prompts/ 디렉토리 변경","icon":"git-branch","tone":"primary"},{"label":"이벨 자동 실행","sublabel":"골든 데이터셋 전체 채점","icon":"test-tube","tone":"accent","edgeLabel":"CI 트리거"},{"label":"기준선 비교","sublabel":"main 브랜치 점수와 대조","icon":"gauge","tone":"warning"},{"label":"머지 승인","sublabel":"점수 유지·상승 시에만","icon":"check","tone":"success","edgeLabel":"기준선 이상"}],"loopBack":{"from":2,"to":0,"label":"점수 하락 → 머지 차단, 프롬프트 재수정"},"caption":"점수가 떨어지면 머지가 막히고 수정으로 되돌아갑니다 — 회귀가 프로덕션에 못 들어갑니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'c9235b61-151b-0bc9-806c-cf0aa4608ef7', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/production-monitoring', 'production-monitoring', '프로덕션 모니터링과 실사용 데이터 수집',
  $aix$배포 전 이벨이 아무리 촘촘해도, 실사용 입력의 분포는 항상 예상을 벗어납니다. 프로덕션은 **가장 큰 이벨 데이터셋의 원천**입니다.

## 무엇을 기록하는가

- **트레이스**: 입력 → (검색·도구 호출 등 중간 단계) → 최종 출력의 전 과정. LangSmith·Langfuse 같은 LLM 관측 도구가 표준입니다.
- **명시적 피드백**: 👍/👎 버튼, 수정 요청. 양은 적지만 신호가 강합니다.
- **암묵적 신호**: 답변 후 재질문, 대화 이탈, 응답 복사 여부 — 만족도의 대리 지표입니다.
- **운영 지표**: 지연 시간, 토큰 비용, 에러율.

## 온라인 이벨

수집만 하지 말고 **표본을 실시간 채점**하세요. 프로덕션 응답의 일부(예: 5%)에 Judge를 돌려 품질 점수를 대시보드화하면, 모델 제공사의 조용한 변경이나 데이터 드리프트를 며칠 만에 감지할 수 있습니다.

## 알림 기준

- 온라인 이벨 점수의 급락 (예: 7일 이동평균 대비 -5%p)
- 👎 비율·에러율의 스파이크

> 💡 **핵심**: 프로덕션 로깅의 목적은 관찰 자체가 아니라 **다음 이벨 케이스의 채굴**입니다. 트레이스 없는 LLM 앱은 블랙박스입니다.$aix$,
  $aix${"type":"stack","title":"LLM 관측(Observability) 스택","layers":[{"label":"알림·대시보드","sublabel":"점수 급락·👎 스파이크 감지","icon":"alert","tone":"warning"},{"label":"온라인 이벨","sublabel":"표본 5%를 Judge로 실시간 채점","icon":"gauge","tone":"accent"},{"label":"피드백 수집","sublabel":"👍/👎 · 재질문 · 이탈 신호","icon":"users","tone":"primary"},{"label":"트레이스 로깅","sublabel":"입력→중간 단계→출력 전 과정 기록","icon":"database","tone":"muted"}],"caption":"아래층(기록)이 없으면 위층(감지·개선)은 성립하지 않습니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '277d0bfc-2661-3e12-5c37-4a6482ce8ff5', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/failure-to-eval-loop', 'failure-to-eval-loop', '개선 루프: 실패 사례를 이벨로 환류시키기',
  $aix$모니터링으로 실패를 발견했다면, 그 실패가 **두 번 다시 조용히 재발하지 못하게** 만들어야 합니다. 그 장치가 환류(Feedback) 루프입니다.

## 환류 루프의 5단계

1. **발견** — 👎 피드백, 온라인 이벨 실패, CS 티켓에서 실패 트레이스 확보
2. **분류** — 환각? 형식 위반? 정책 누락? 유형별로 태깅 (주간 30분이면 충분합니다)
3. **케이스화** — 실패 입력 + 올바른 기대 결과를 골든 데이터셋에 추가. **이 시점부터 회귀 방어가 시작됩니다**
4. **수정** — 프롬프트·검색·모델을 고치고, 이벨로 새 케이스 통과 + 기존 점수 유지 확인
5. **배포** — CI 게이트를 통과해 릴리즈, 다시 1번으로

## 이 루프가 만드는 복리 효과

- 데이터셋이 실사용 실패로 계속 자라며 **이벨의 대표성이 스스로 개선**됩니다.
- "고쳤다"의 정의가 "그 케이스가 이벨에 있고 통과한다"로 명확해집니다.
- 신규 팀원도 데이터셋만 읽으면 과거의 모든 실패 유형을 학습합니다.

## 흔한 실수

실패를 프롬프트로만 고치고 케이스를 추가하지 않는 것 — 다음 리팩터링에서 같은 실패가 **조용히** 돌아옵니다.

> 💡 **핵심**: 버그 수정의 완료 조건은 "동작한다"가 아니라 **"그 실패가 골든 데이터셋에 들어갔다"**입니다.$aix$,
  $aix${"type":"cycle","title":"실패 → 이벨 환류 루프","center":"데이터셋이 계속 자란다","nodes":[{"label":"발견","sublabel":"👎·온라인 이벨·CS 티켓","icon":"search"},{"label":"분류","sublabel":"실패 유형 태깅","icon":"filter"},{"label":"케이스화","sublabel":"골든 데이터셋에 추가","icon":"clipboard"},{"label":"수정·검증","sublabel":"이벨 통과 확인","icon":"wrench"},{"label":"배포","sublabel":"CI 게이트 통과","icon":"rocket"}],"caption":"한 바퀴 돌 때마다 같은 실패의 재발 가능성이 영구히 차단됩니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '40a91867-4da1-7eb3-07cf-be65c20a6d6a', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/ab-testing', 'ab-testing', 'A/B 테스트: 모델·프롬프트 교체 검증',
  $aix$새 모델이 이벨에서 이겼다고 바로 전량 교체하는 것은 위험합니다. 이벨은 **오프라인 예측**이고, 최종 판정은 실사용자가 내립니다.

## 오프라인 이벨 → 온라인 A/B의 2단 검증

- **1단 (오프라인)**: 골든 데이터셋에서 신규 후보가 기존 대비 동등 이상인지 확인. 여기서 지면 온라인에 갈 자격이 없습니다.
- **2단 (온라인)**: 트래픽 일부(5~10%)만 후보에 배정하고 실사용 지표를 비교합니다.

## 온라인에서 보는 지표

- 온라인 이벨 점수 (같은 Judge로 A/B 양쪽 표본 채점)
- 👍/👎 비율, 재질문율, 태스크 완료율
- 지연 시간과 토큰 비용 — **품질이 같다면 싸고 빠른 쪽이 승자**입니다

## 운영 원칙

- 한 번에 **하나의 변수만** 바꿉니다 (모델과 프롬프트를 동시에 바꾸면 원인을 알 수 없습니다).
- 표본이 충분히 쌓이기 전의 "초반 우세"를 믿지 마세요.
- 즉시 롤백 스위치(피처 플래그)를 준비하고 시작합니다.
- 승자 확정 후에도 패자 설정을 git에 남겨 두면 언제든 재검증할 수 있습니다.

> 💡 **핵심**: 교체 결정 공식은 **"오프라인 이벨로 후보 선별 → 온라인 A/B로 최종 판정"**. 이벨은 필터, A/B는 심판입니다.$aix$,
  $aix${"type":"compare","title":"챔피언 vs 챌린저","columns":[{"title":"A: 챔피언 (현행)","icon":"shield","tone":"muted","items":["트래픽 90% 유지","온라인 이벨 91.2%","👍 비율 87% · p95 1.8s","검증된 기준선 역할"]},{"title":"B: 챌린저 (신규 모델)","icon":"rocket","tone":"primary","items":["트래픽 10%로 시작","온라인 이벨 93.5%","👍 비율 89% · 비용 -30%","승자 확정 시 점진 확대"]}],"caption":"오프라인 이벨을 통과한 후보만 링에 오르고, 실사용 지표가 최종 판정합니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: 프롬프트 엔지니어링 심화 & RAG 아키텍처
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'dd025644-b2bc-f7c6-2391-e636e152cbcf', 'prompt-engineering-rag', '프롬프트 엔지니어링 심화 & RAG 아키텍처', $aix$프롬프트는 감이 아니라 구조입니다. 이 강의에서는 역할·맥락·작업·형식으로 프롬프트를 설계하는 법부터, reasoning 모델 시대에 달라진 CoT, Few-shot 예시 설계, 구조화된 출력까지 프롬프트 엔지니어링을 심화합니다. 이어서 임베딩·청킹·벡터 검색으로 기본 RAG 파이프라인을 세우고, 하이브리드 검색과 리랭킹, 에이전트가 검색을 도구로 쓰는 Agentic RAG, 검색과 생성을 분리해 측정하는 평가까지 — 2026년 프로덕션 기준의 검색 증강 생성을 아키텍처 다이어그램과 함께 익힙니다.$aix$,
  null, 'dev', 'intermediate', array['프롬프트 엔지니어링', 'CoT', 'RAG', '임베딩', '벡터 DB']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'dd025644-b2bc-f7c6-2391-e636e152cbcf', 'prompt-engineering-deep', '프롬프트 엔지니어링 심화', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'dd025644-b2bc-f7c6-2391-e636e152cbcf', 'rag-basics', 'RAG의 기초', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '33b3514f-c133-d07f-f400-b633fb8d92f5', 'dd025644-b2bc-f7c6-2391-e636e152cbcf', 'production-rag', '프로덕션 RAG', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8501acea-2c29-1b3f-82e3-aeabe1964b6f', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/prompt-anatomy', 'prompt-anatomy', '프롬프트의 구조: 역할·맥락·작업·형식',
  $aix$좋은 프롬프트는 길거나 정중한 프롬프트가 아니라 **구조가 있는 프롬프트**입니다. 4가지 요소만 채우면 결과의 편차가 극적으로 줄어듭니다.

## 프롬프트의 4요소

- **역할 (Role)** — 모델이 어떤 관점으로 답할지. "시니어 백엔드 개발자로서"
- **맥락 (Context)** — 판단에 필요한 배경. 코드베이스, 대상 독자, 제약 조건.
- **작업 (Task)** — 동사로 시작하는 명확한 지시 하나. "요약해라", "리팩터링해라"
- **형식 (Format)** — 출력의 모양. 마크다운 표, JSON, 글자 수 제한.

## 대부분의 실패는 '맥락 누락'

모델이 이상한 답을 내는 경우의 대부분은 모델 탓이 아니라 **모델이 알 수 없는 정보를 알 것이라 가정**했기 때문입니다.

- 나쁜 예: "이 함수 좀 고쳐줘" (어떤 기준으로? 무엇이 문제인데?)
- 좋은 예: 증상 + 기대 동작 + 제약을 함께 제공

## 재현 가능성이 목표

4요소가 채워진 프롬프트는 **누가 실행해도 비슷한 품질**이 나옵니다. 팀에서 프롬프트를 템플릿으로 공유할 수 있는 이유가 여기 있습니다.

> 💡 **핵심**: 프롬프트를 쓰기 전에 자문하세요 — "역할·맥락·작업·형식 중 빠진 것은 무엇인가?"$aix$,
  $aix${"type":"chat","title":"나쁜 프롬프트 vs 좋은 프롬프트","messages":[{"role":"user","text":"이 함수 좀 고쳐줘"},{"role":"ai","text":"어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)"},{"role":"user","text":"[역할] 시니어 TS 개발자로서 [맥락] 아래 함수는 빈 배열 입력 시 NaN을 반환합니다 [작업] 빈 배열이면 0을 반환하도록 수정하고 [형식] 수정 코드 + 한 줄 설명으로 답해줘"},{"role":"ai","text":"빈 배열 가드를 추가했습니다: `if (items.length === 0) return 0;` — reduce 전에 예외 케이스를 차단합니다."}],"caption":"같은 모델, 같은 함수 — 4요소가 채워지자 답변이 '추측'에서 '해결'로 바뀝니다."}$aix$::jsonb, $aix${"title":"플레이그라운드에서 프롬프트 개선 따라하기","app":{"kind":"browser","url":"console.anthropic.com/playground","blocks":[{"id":"b-head","type":"heading","label":"AI 플레이그라운드"},{"id":"b-input","type":"input","label":"프롬프트를 입력하세요…"},{"id":"b-run","type":"button","label":"실행"},{"id":"b-bad","type":"card","label":"🤖 어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)","hidden":true},{"id":"b-badge-bad","type":"badge","label":"모호한 응답 — 맥락 누락","hidden":true},{"id":"b-good","type":"card","label":"🤖 빈 배열 가드를 추가했습니다: if (items.length === 0) return 0;","hidden":true},{"id":"b-badge-good","type":"badge","label":"✓ 정확한 해결 — 4요소 충족","hidden":true}]},"actions":[{"t":"caption","text":"① 먼저 4요소 없이 프롬프트를 입력해 봅니다"},{"t":"move","target":"b-input"},{"t":"click"},{"t":"type","target":"b-input","text":"이 함수 좀 고쳐줘"},{"t":"click","target":"b-run"},{"t":"wait","ms":500},{"t":"caption","text":"② 모델이 맥락이 없어 추측성 응답을 내놓습니다"},{"t":"reveal","target":"b-bad"},{"t":"reveal","target":"b-badge-bad"},{"t":"wait","ms":700},{"t":"caption","text":"③ 역할·맥락·작업·형식을 채워 다시 입력합니다"},{"t":"hide","target":"b-input"},{"t":"reveal","target":"b-input"},{"t":"click","target":"b-input"},{"t":"type","target":"b-input","text":"[역할]시니어 TS [맥락]빈 배열→NaN [작업]0 반환 [형식]코드"},{"t":"click","target":"b-run"},{"t":"wait","ms":500},{"t":"caption","text":"④ 추측이 사라지고 근거 있는 해결책이 나옵니다"},{"t":"reveal","target":"b-good"},{"t":"reveal","target":"b-badge-good"},{"t":"move","target":"b-badge-good"},{"t":"caption","text":"✅ 같은 모델 — 프롬프트의 구조가 품질을 바꿉니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '392bb2c9-b7fa-4b4e-4c02-00bb01c8b69f', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/cot-reasoning', 'cot-reasoning', 'CoT와 사고 유도: reasoning 모델 시대의 변화',
  $aix$"단계별로 생각해 봐(step by step)" 한 줄이 정답률을 끌어올리던 시절이 있었습니다. 하지만 **reasoning 모델이 표준이 된 2026년, CoT의 문법은 달라졌습니다.**

## 고전 CoT (2022~2024)

- 모델이 바로 답을 내뱉지 않고 **중간 추론을 텍스트로 쓰게** 유도하는 기법.
- "Let's think step by step", 풀이 과정을 포함한 Few-shot 예시가 대표 패턴.
- 수학·논리 문제에서 정답률을 크게 올렸습니다.

## reasoning 모델 시대의 CoT

- 최신 모델(Claude의 extended thinking 등)은 **내부적으로 사고 과정을 먼저 거친 뒤** 답합니다. "단계별로 생각해"는 이미 기본 동작입니다.
- 수동 CoT 지시는 효과가 미미하거나, 모델의 자체 추론과 충돌해 **오히려 성능을 떨어뜨리기도** 합니다.
- 대신 통제할 것은 **사고 예산(thinking budget)**입니다 — 단순 작업엔 짧게, 복잡한 설계엔 길게.

## 지금도 유효한 사고 유도

- 문제를 **명확히 정의**하기: 제약·성공 기준을 프롬프트에 명시 (모델은 이를 중심으로 사고합니다)
- 답 전에 **계획을 먼저 출력**시키고 사람이 검토한 뒤 실행 (에이전트 워크플로우의 표준)

> 💡 **핵심**: 2026년의 CoT는 "생각해 봐"라고 시키는 게 아니라, **생각할 재료(제약·기준)와 예산을 설계**하는 일입니다.$aix$,
  $aix${"type":"compare","title":"고전 CoT vs reasoning 모델 시대","columns":[{"title":"고전 CoT (수동 유도)","icon":"message","tone":"muted","items":["\"step by step\" 주문을 직접 삽입","풀이 과정 포함 Few-shot 예시","추론이 답변 텍스트에 노출","일반 모델에서 정답률 상승"]},{"title":"reasoning 모델 (내장 사고)","icon":"brain","tone":"primary","items":["모델이 내부에서 먼저 사고","사고 예산(budget)으로 깊이 조절","제약·성공 기준이 사고의 재료","수동 CoT 지시는 효과 미미·역효과도"]}],"caption":"주문을 외우는 시대에서, 사고의 재료와 예산을 설계하는 시대로."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3eff63bd-71ae-7e27-9fad-a2b87d2f530f', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/few-shot-design', 'few-shot-design', 'Few-shot 예시 설계: 말보다 보여주기',
  $aix$백 마디 설명보다 **잘 고른 예시 2~3개**가 출력 품질을 더 확실하게 통제합니다. 단, 예시는 아무거나 넣는 게 아니라 설계하는 것입니다.

## Few-shot이 이기는 순간

- 출력 **형식·톤·스타일**을 맞춰야 할 때 (분류 라벨, 요약 문체, 네이밍 규칙)
- 규칙을 말로 다 설명하기 어려울 때 — 예시가 곧 암묵적 규칙 전달
- 반대로 단순 사실 질문이나 reasoning 작업엔 zero-shot이 낫습니다. 예시가 오히려 사고를 좁힙니다.

## 예시 설계 4단계

1. **대표 케이스 선정** — 실제 입력 분포를 대표하는 전형적 사례부터.
2. **경계 케이스 추가** — 헷갈리기 쉬운 케이스 1개 (빈 입력, 애매한 분류 등).
3. **형식 통일** — 모든 예시의 입력/출력 구조를 완전히 동일하게. 모델은 내용보다 **패턴**을 복사합니다.
4. **순서·개수 검증** — 마지막 예시의 영향이 가장 큽니다. 2~5개 사이에서 실제 데이터로 테스트.

## 흔한 함정

- 예시 속 편향이 그대로 복제됩니다 — 예시가 전부 긍정 리뷰면 부정 리뷰를 잘 못 다룹니다.
- 예시와 실제 입력의 형식이 다르면 효과가 급감합니다.

> 💡 **핵심**: Few-shot은 "예시를 몇 개 넣는 것"이 아니라 **대표성·경계·형식·순서를 설계하는 것**입니다.$aix$,
  $aix${"type":"steps","title":"Few-shot 예시 설계 절차","steps":[{"label":"대표 케이스 선정","sublabel":"실제 입력 분포의 전형적 사례","icon":"target"},{"label":"경계 케이스 추가","sublabel":"빈 입력·애매한 분류 1개","icon":"alert"},{"label":"형식 통일","sublabel":"입력/출력 구조를 완전히 동일하게","icon":"layers"},{"label":"순서·개수 검증","sublabel":"2~5개, 실데이터로 테스트","icon":"test-tube"}],"caption":"모델은 예시의 내용이 아니라 패턴을 복사합니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '734abec5-20d7-3e3e-7a11-a61b3515999e', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/structured-output', 'structured-output', '구조화된 출력: JSON Schema와 도구 호출',
  $aix$프롬프트의 결과를 코드가 소비한다면, "JSON으로 답해줘"라는 부탁만으로는 부족합니다. 2026년의 표준은 **스키마로 강제하는 것**입니다.

## 왜 '부탁'으로는 안 되는가

- 모델은 가끔 JSON 앞뒤에 설명을 붙이거나, 필드명을 바꾸거나, 따옴표를 빼먹습니다.
- 파싱 실패율 1%도 하루 1만 건 파이프라인에선 100건의 장애입니다.

## 스키마로 강제하는 2가지 방법

- **Structured Outputs** — API 요청에 JSON Schema를 첨부하면, 모델이 **스키마에 맞는 출력만** 생성하도록 디코딩 단계에서 제약됩니다. 주요 API가 모두 지원합니다.
- **도구 호출 (Tool Use)** — 원하는 출력 구조를 도구의 파라미터 스키마로 정의하고, 모델이 그 도구를 "호출"하게 합니다. 추출·분류 작업의 고전적이고 견고한 패턴입니다.

## 스키마 설계 팁

- 필드마다 `description`을 다세요 — 스키마의 설명문이 곧 프롬프트입니다.
- 자유 문자열보다 **enum**으로 선택지를 제한하면 후처리가 사라집니다.
- 확신도(confidence)나 근거(evidence) 필드를 추가하면 저품질 출력을 걸러낼 수 있습니다.

> 💡 **핵심**: 코드가 소비하는 출력은 프롬프트로 부탁하지 말고 **스키마로 계약**하세요.$aix$,
  $aix${"type":"terminal","windowTitle":"structured-output.ts — 리뷰 분류 파이프라인","lines":[{"text":"# 출력 스키마: sentiment는 enum으로 제한","tone":"comment"},{"text":"{ \"sentiment\": { \"enum\": [\"positive\", \"negative\", \"neutral\"] },","tone":"dim"},{"text":"  \"keywords\": { \"type\": \"array\" }, \"confidence\": { \"type\": \"number\" } }","tone":"dim"},{"text":"npx tsx classify.ts --input reviews.jsonl","tone":"cmd"},{"text":"{\"sentiment\":\"negative\",\"keywords\":[\"배송 지연\"],\"confidence\":0.94}","tone":"out"},{"text":"{\"sentiment\":\"positive\",\"keywords\":[\"재구매\"],\"confidence\":0.98}","tone":"out"},{"text":"✓ 10,000건 파싱 실패 0건 — 스키마 강제 덕분","tone":"ok"}],"caption":"스키마가 디코딩을 제약하므로 '설명 붙은 JSON' 같은 파싱 장애가 원천 차단됩니다."}$aix$::jsonb, $aix${"title":"에디터에서 스키마 강제 출력 따라하기","app":{"kind":"code-editor","windowTitle":"schema.ts — 리뷰 분류 파이프라인","files":[{"id":"f-schema","name":"schema.ts","active":true},{"id":"f-classify","name":"classify.ts"},{"id":"f-reviews","name":"reviews.jsonl"}],"code":[{"id":"s1","text":"// 리뷰 분류 출력 스키마 (Structured Outputs)","tone":"comment"},{"id":"s2","text":"export const reviewSchema = {"},{"id":"s3","text":"sentiment: { enum: [\"positive\", \"negative\", \"neutral\"] },","indent":1},{"id":"s4","text":"keywords: { type: \"array\", items: { type: \"string\" } },","indent":1},{"id":"s5","text":"confidence: { type: \"number\" },","indent":1,"tone":"add","hidden":true},{"id":"s6","text":"};"}],"terminal":[{"id":"t1","text":"npx tsx classify.ts reviews.jsonl","tone":"cmd","hidden":true},{"id":"t2","text":"{\"sentiment\":\"negative\",\"keywords\":[\"배송 지연\"],\"confidence\":0.94}","tone":"out","hidden":true},{"id":"t3","text":"{\"sentiment\":\"positive\",\"keywords\":[\"재구매\"],\"confidence\":0.98}","tone":"out","hidden":true},{"id":"t4","text":"✓ 10,000건 처리 — 파싱 실패 0건","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 자유 문자열 대신 enum으로 선택지를 제한합니다"},{"t":"move","target":"s3"},{"t":"dblclick","target":"s3"},{"t":"wait","ms":400},{"t":"caption","text":"② confidence 필드를 추가해 저품질 출력을 거릅니다"},{"t":"move","target":"s4"},{"t":"click"},{"t":"type","target":"s5","text":"confidence: { type: \"number\" },"},{"t":"wait","ms":500},{"t":"caption","text":"③ 스키마를 첨부해 분류 파이프라인을 실행합니다"},{"t":"type","target":"t1","text":"npx tsx classify.ts reviews.jsonl"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"④ 1만 건을 처리해도 파싱 실패가 0건입니다"},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"✅ 부탁이 아닌 스키마 계약 — 코드가 안심하고 소비합니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a7bee649-9603-6097-38b4-f718222194c5', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/why-rag', 'why-rag', '왜 RAG인가: 할루시네이션과 최신성',
  $aix$아무리 좋은 모델도 **학습하지 않은 것은 모릅니다.** 그런데 모른다고 말하는 대신 그럴듯하게 지어내는 것이 문제입니다. RAG는 이 구조적 한계에 대한 구조적 해법입니다.

## LLM 단독 사용의 4가지 벽

- **할루시네이션** — 모르는 질문에 그럴듯한 거짓을 생성합니다.
- **최신성** — 지식이 학습 시점(knowledge cutoff)에 멈춰 있습니다.
- **사내 지식** — 여러분 회사의 위키·문서·DB는 학습된 적이 없습니다.
- **출처 부재** — 답의 근거를 확인할 방법이 없습니다.

## RAG의 발상

**RAG(Retrieval-Augmented Generation)** = 질문과 관련된 문서를 먼저 **검색(Retrieval)**해서, 프롬프트에 **증강(Augmented)**한 뒤, 그 근거로 **생성(Generation)**하게 하는 구조입니다.

- 모델을 재학습하지 않고도 지식을 갱신할 수 있습니다 — 문서만 교체하면 됩니다.
- 답변마다 "이 문서의 이 부분"이라는 **출처**를 붙일 수 있습니다.
- 접근 권한이 있는 문서만 검색하게 하면 **권한 관리**도 됩니다.

> 💡 **핵심**: RAG는 모델을 똑똑하게 만드는 기술이 아니라, **모델에게 정답이 담긴 근거를 쥐여주는** 아키텍처입니다.$aix$,
  $aix${"type":"grid","title":"LLM 단독 사용의 4가지 벽","items":[{"label":"할루시네이션","sublabel":"모르면 지어냄","icon":"alert","tone":"warning"},{"label":"최신성","sublabel":"지식이 cutoff에 정지","icon":"clock","tone":"warning"},{"label":"사내 지식","sublabel":"위키·문서·DB 미학습","icon":"lock","tone":"muted"},{"label":"출처 부재","sublabel":"근거 확인 불가","icon":"eye","tone":"muted"},{"label":"RAG","sublabel":"검색된 근거를 프롬프트에 주입","icon":"search","tone":"primary"},{"label":"결과","sublabel":"갱신 가능 · 출처 표시 · 권한 관리","icon":"check","tone":"success"}],"caption":"네 가지 벽을 하나의 아키텍처(RAG)가 동시에 해결합니다."}$aix$::jsonb, null, 4, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '28a2b80b-6a46-3d18-f978-14076ecb1f4e', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/embeddings-vector-search', 'embeddings-vector-search', '임베딩과 벡터 검색의 원리',
  $aix$"환불 규정"으로 검색했는데 문서에는 "반품 정책"이라고 적혀 있다면? 키워드 검색은 실패하지만 **벡터 검색은 찾아냅니다.** 그 비밀이 임베딩입니다.

## 임베딩: 의미를 좌표로

- **임베딩 모델**은 텍스트를 수백~수천 차원의 숫자 벡터로 변환합니다.
- 핵심 성질: **의미가 비슷한 텍스트는 벡터 공간에서 가까운 곳에** 놓입니다. "환불 규정"과 "반품 정책"은 단어가 달라도 좌표가 가깝습니다.
- 문장, 문단, 코드, 이미지까지 같은 공간에 넣을 수 있습니다(멀티모달 임베딩).

## 벡터 검색의 동작

1. 모든 문서 조각을 미리 임베딩해서 **벡터 DB**에 저장합니다.
2. 질문이 들어오면 **같은 임베딩 모델**로 질문도 벡터로 바꿉니다.
3. 질문 벡터와 가장 가까운(코사인 유사도가 높은) 문서 벡터 top-k를 찾습니다.
4. 수백만 건에서도 빠르게 찾도록 **ANN 인덱스**(HNSW 등)를 사용합니다 — 정확도를 조금 양보하고 속도를 얻는 근사 검색입니다.

## 실무 감각

- 질문과 문서에 **반드시 같은 모델**을 써야 합니다. 모델이 다르면 좌표계가 달라 검색이 무너집니다.
- 임베딩 모델을 교체하면 **전체 문서 재임베딩**이 필요합니다 — 교체 비용을 설계에 반영하세요.

> 💡 **핵심**: 벡터 검색 = 질문과 문서를 **같은 의미 공간의 좌표**로 바꾼 뒤, 가장 가까운 이웃을 찾는 것입니다.$aix$,
  $aix${"type":"flow","title":"벡터 검색의 흐름","nodes":[{"label":"질문","sublabel":"\"환불 규정 알려줘\"","icon":"message","tone":"primary"},{"label":"임베딩 모델","sublabel":"텍스트 → 1,536차원 벡터","icon":"cpu","tone":"accent","edgeLabel":"문서와 같은 모델 사용"},{"label":"벡터 DB (ANN 인덱스)","sublabel":"미리 임베딩된 문서 벡터들","icon":"database","tone":"muted"},{"label":"최근접 이웃 top-k","sublabel":"\"반품 정책\" 문서 발견","icon":"target","tone":"success","edgeLabel":"코사인 유사도 순 정렬"}],"caption":"단어가 아니라 좌표가 가까운 문서를 찾으므로, 표현이 달라도 의미로 매칭됩니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6f6c67d2-a8f5-bc7d-eced-83f5017b3381', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/chunking-strategies', 'chunking-strategies', '청킹 전략: 크기·오버랩·구조',
  $aix$RAG 품질 문제의 절반은 모델이 아니라 **문서를 자르는 방식**에서 옵니다. 통째로 임베딩하면 의미가 뭉개지고, 너무 잘게 자르면 맥락이 끊깁니다.

## 왜 잘라야 하나

- 임베딩은 텍스트가 길수록 **여러 주제가 평균**돼 검색 정확도가 떨어집니다.
- 검색 결과로 프롬프트에 넣을 분량에도 한계가 있습니다.
- 그래서 문서를 **검색 가능한 최소 의미 단위(청크)**로 자릅니다.

## 3가지 축

- **크기** — 보통 토큰 200~800 사이에서 시작합니다. 작으면 검색은 정밀하지만 맥락이 부족하고, 크면 그 반대입니다.
- **오버랩** — 인접 청크를 10~20% 겹치게 잘라, 경계에서 문장·맥락이 끊기는 것을 완화합니다.
- **구조 기반** — 글자 수가 아니라 **문서의 구조(헤딩, 문단, 함수 단위)**로 자릅니다. 마크다운은 헤딩 기준, 코드는 함수·클래스 기준이 정석입니다.

## 2026년의 보강 기법

- **컨텍스트 보강 청킹**: 각 청크에 "이 청크는 어떤 문서의 어떤 절인지" 요약을 덧붙여 임베딩 — 청크 단독으로도 의미가 통하게 만듭니다.
- 정답은 데이터마다 다릅니다. **실제 질문 세트로 검색 품질을 측정**하며 크기를 조정하세요.

> 💡 **핵심**: 청킹의 목표는 "적당히 자르기"가 아니라 **각 청크가 홀로 읽혀도 의미가 통하는 단위**를 만드는 것입니다.$aix$,
  $aix${"type":"compare","title":"청킹 전략 3가지","columns":[{"title":"작은 고정 크기","icon":"scissors","tone":"muted","items":["토큰 ~200, 기계적 분할","검색은 정밀","맥락 단절 위험","문장이 중간에 끊김"]},{"title":"큰 고정 크기","icon":"file-text","tone":"muted","items":["토큰 ~800 이상","맥락은 풍부","여러 주제가 섞여 검색 흐림","프롬프트 비용 증가"]},{"title":"구조 기반 + 오버랩","icon":"layers","tone":"primary","items":["헤딩·문단·함수 단위로 분할","10~20% 오버랩으로 경계 보완","청크 단독으로 의미가 통함","2026년 실무 기본값"]}],"caption":"고정 크기에서 시작하되, 프로덕션은 문서 구조를 따라 자릅니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ad20b1cd-0615-bf77-b45c-4e322accc72d', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/rag-pipeline', 'rag-pipeline', '기본 RAG 파이프라인 아키텍처',
  $aix$배운 조각들을 하나의 시스템으로 조립할 차례입니다. 모든 RAG는 **두 개의 흐름** — 미리 준비하는 수집(Ingestion)과 실시간으로 도는 질의(Query) — 로 이루어집니다.

## 수집 파이프라인 (오프라인)

1. **수집** — 위키, PDF, DB에서 원본 문서를 가져옵니다.
2. **청킹** — 구조 기반으로 자르고 메타데이터(출처, 날짜, 권한)를 붙입니다.
3. **임베딩** — 각 청크를 벡터로 변환합니다.
4. **저장** — 벡터 DB에 벡터 + 원문 + 메타데이터를 함께 저장합니다.

## 질의 파이프라인 (온라인)

1. **검색** — 질문을 임베딩해 관련 청크 top-k를 찾습니다.
2. **생성** — 검색된 청크를 프롬프트에 넣고, "이 근거에 기반해서만 답하고 출처를 표시하라"고 지시합니다.

## 설계 포인트

- 수집은 **배치/이벤트 기반**으로 계속 갱신돼야 합니다 — 문서가 바뀌었는데 벡터가 옛날 것이면 RAG는 자신 있게 낡은 답을 합니다.
- 생성 프롬프트에 **"근거에 없으면 모른다고 답하라"**를 반드시 넣으세요. 이 한 줄이 할루시네이션 방어의 마지막 관문입니다.

> 💡 **핵심**: RAG = 오프라인 수집 파이프라인 + 온라인 질의 파이프라인. **두 흐름의 신선도와 품질을 각각 관리**하는 것이 운영의 전부입니다.$aix$,
  $aix${"type":"stack","title":"RAG 시스템의 레이어","layers":[{"label":"애플리케이션","sublabel":"질문 입력 · 출처 표시된 답변","icon":"message","tone":"primary"},{"label":"생성 레이어","sublabel":"LLM + \"근거 기반으로만 답하라\" 프롬프트","icon":"sparkles","tone":"accent"},{"label":"검색 레이어","sublabel":"질문 임베딩 → top-k 청크","icon":"search","tone":"accent"},{"label":"저장 레이어","sublabel":"벡터 DB: 벡터 + 원문 + 메타데이터","icon":"database","tone":"muted"},{"label":"수집 파이프라인","sublabel":"문서 수집 → 청킹 → 임베딩 (배치 갱신)","icon":"upload","tone":"muted"}],"caption":"아래 두 층(오프라인)이 신선해야 위 세 층(온라인)이 정확합니다."}$aix$::jsonb, $aix${"title":"RAG 수집 파이프라인 구축 따라하기","app":{"kind":"code-editor","windowTitle":"ingest.ts — RAG 수집 파이프라인","files":[{"id":"f-ingest","name":"ingest.ts","active":true},{"id":"f-query","name":"query.ts"},{"id":"f-docs","name":"docs/"}],"code":[{"id":"i1","text":"// 수집: 문서 → 청킹 → 임베딩 → 저장 (오프라인)","tone":"comment"},{"id":"i2","text":"const docs = await loadDocs(\"./docs\");"},{"id":"i3","text":"const chunks = splitByHeading(docs, {"},{"id":"i4","text":"maxTokens: 512, overlap: 64,","indent":1},{"id":"i5","text":"});"},{"id":"i6","text":"const vectors = await embed(chunks);","tone":"add","hidden":true},{"id":"i7","text":"await db.upsert(vectors, {meta:true});","tone":"add","hidden":true}],"terminal":[{"id":"t1","text":"npx tsx ingest.ts","tone":"cmd","hidden":true},{"id":"t2","text":"→ 문서 128건 로드, 청크 1,842개 생성","tone":"out","hidden":true},{"id":"t3","text":"→ 임베딩 1,842건 완료 (배치 8회)","tone":"out","hidden":true},{"id":"t4","text":"✓ 벡터 DB 인덱싱 완료 — 신선도 2026-07-28","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 구조 기반 청킹에 크기와 오버랩을 설정합니다"},{"t":"move","target":"i3"},{"t":"click"},{"t":"move","target":"i4"},{"t":"dblclick","target":"i4"},{"t":"wait","ms":400},{"t":"caption","text":"② 각 청크를 벡터로 변환하는 임베딩을 추가합니다"},{"t":"type","target":"i6","text":"const vectors = await embed(chunks);"},{"t":"wait","ms":300},{"t":"caption","text":"③ 벡터·원문·메타데이터를 함께 저장합니다"},{"t":"type","target":"i7","text":"await db.upsert(vectors, {meta:true});"},{"t":"wait","ms":400},{"t":"caption","text":"④ 수집 파이프라인을 실행해 인덱싱합니다"},{"t":"type","target":"t1","text":"npx tsx ingest.ts"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":500},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"✅ 오프라인 수집 완료 — 이제 질의가 신선한 근거를 찾습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a4e24349-490a-15c8-1b4f-f28472e1e9a3', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/hybrid-search-reranking', 'hybrid-search-reranking', '하이브리드 검색과 리랭킹',
  $aix$벡터 검색만 쓰는 RAG는 프로덕션에서 반드시 구멍이 납니다. **"ERR-4042" 같은 코드, 제품명, 고유명사**는 의미 공간에서 이웃이 없기 때문입니다.

## 두 검색의 상호보완

- **키워드 검색(BM25)** — 정확한 단어 일치에 강함. 에러 코드, 제품명, 약어에 필수.
- **벡터 검색** — 의미·패러프레이즈에 강함. "환불 규정" ↔ "반품 정책"을 연결.
- **하이브리드 검색** = 둘을 동시에 실행하고 결과를 병합합니다. 병합에는 순위 기반으로 합치는 **RRF(Reciprocal Rank Fusion)**가 표준입니다.

## 리랭킹: 2단계 정밀 선별

- 1차 검색은 빠르지만 거칩니다. 후보 50~100개를 넓게 건진 뒤, **리랭커(reranker)** 모델이 질문과 각 후보의 관련성을 정밀 채점해 상위 5~10개만 남깁니다.
- 리랭커는 질문과 문서를 **한 쌍으로 함께 읽는 cross-encoder**라 임베딩 유사도보다 훨씬 정확합니다. 대신 느려서 후보군에만 적용합니다.
- "넓게 건지고(recall) 좁게 고른다(precision)" — 검색 시스템의 오래된 지혜가 RAG에도 그대로 적용됩니다.

## 적용 우선순위

기본 RAG의 답변 품질이 아쉬울 때, 모델 교체보다 **하이브리드 + 리랭킹 도입이 먼저**입니다. 비용 대비 효과가 가장 큰 업그레이드입니다.

> 💡 **핵심**: 프로덕션 검색 = **하이브리드로 넓게 건지고, 리랭커로 좁게 고른다.** 이 2단계가 표준입니다.$aix$,
  $aix${"type":"flow","title":"하이브리드 검색 + 리랭킹 파이프라인","nodes":[{"label":"질문","sublabel":"\"ERR-4042 환불 처리 방법\"","icon":"message","tone":"primary"},{"label":"키워드 검색 ∥ 벡터 검색","sublabel":"BM25는 코드를, 벡터는 의미를 잡음","icon":"search","tone":"accent","edgeLabel":"두 검색을 병렬 실행"},{"label":"RRF 병합","sublabel":"순위 기반 융합 → 후보 100개","icon":"git-branch","tone":"accent"},{"label":"리랭커","sublabel":"cross-encoder 정밀 채점","icon":"filter","tone":"warning","edgeLabel":"넓게 건진 후보를"},{"label":"top-5 → 생성","sublabel":"정밀 선별된 근거만 프롬프트에","icon":"sparkles","tone":"success","edgeLabel":"좁게 고른다"}],"caption":"recall은 하이브리드가, precision은 리랭커가 책임집니다."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '55cc97a9-260d-e8df-0f17-7bfdb66f8d03', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/agentic-rag', 'agentic-rag', 'Agentic RAG: 검색을 도구로 쓰는 에이전트',
  $aix$고정된 "검색 1번 → 생성 1번" 파이프라인은 복잡한 질문 앞에서 무너집니다. 2026년의 답은 **에이전트가 검색을 도구로 쥐고, 필요한 만큼 반복 검색하는** Agentic RAG입니다.

## 파이프라인에서 에이전트로

에이전트는 검색을 이렇게 다룹니다.

- **질문 분해** — "작년 대비 올해 환불 정책 변화는?"을 두 개의 검색으로 쪼갭니다.
- **쿼리 재작성** — 대화 맥락("그건 언제부터야?")을 독립된 검색어로 변환합니다.
- **결과 평가 후 재검색** — 검색 결과가 부실하면 다른 키워드로 다시 시도합니다.
- **도구 선택** — 벡터 DB, SQL, 웹 검색 중 질문에 맞는 소스를 고릅니다.

즉, 앞서 배운 **에이전트 루프(계획→실행→관찰→평가)**의 도구 자리에 검색이 들어간 것입니다.

## 긴 컨텍스트 시대, RAG는 죽었나

컨텍스트 윈도우가 수백만 토큰이 되며 "그냥 다 넣으면 되지 않나"라는 질문이 나옵니다. 그러나 실무의 답은 **역할 분담**입니다.

- **비용·지연** — 매 질문마다 전체 문서를 넣으면 토큰 비용과 응답 속도가 감당이 안 됩니다.
- **권한·신선도** — 사용자별 접근 제어와 실시간 갱신은 검색 레이어에서만 가능합니다.
- 결론: **검색으로 후보를 좁히고, 넉넉한 컨텍스트로 깊게 읽는다** — 둘은 경쟁자가 아니라 조합입니다.

> 💡 **핵심**: Agentic RAG = 에이전트 루프의 도구 자리에 검색을 꽂은 것. 긴 컨텍스트는 RAG를 대체하는 게 아니라 **검색 후 읽는 분량을 늘려줄** 뿐입니다.$aix$,
  $aix${"type":"cycle","title":"Agentic RAG 루프","center":"충분한 근거를 얻을 때까지","nodes":[{"label":"질문 분석","sublabel":"분해 · 쿼리 재작성","icon":"brain"},{"label":"검색 실행","sublabel":"벡터 DB · SQL · 웹 중 선택","icon":"search"},{"label":"결과 평가","sublabel":"근거가 충분한가?","icon":"eye"},{"label":"답변 생성","sublabel":"출처와 함께 · 부족하면 재검색","icon":"sparkles"}],"caption":"검색 1번으로 끝나지 않습니다 — 에이전트가 근거가 모일 때까지 루프를 돕니다."}$aix$::jsonb, null, 7, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6b003e28-d309-ec1f-69c0-e91f7c74d4f9', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/rag-evaluation', 'rag-evaluation', 'RAG 평가: 검색과 생성을 분리해서 측정',
  $aix$"답변이 이상해요"라는 리포트만으로는 아무것도 고칠 수 없습니다. RAG의 실패는 **검색 실패와 생성 실패가 전혀 다른 병**이기 때문에, 반드시 분리해서 측정해야 합니다.

## 검색 품질 (Retrieval)

"정답 근거가 top-k 안에 들어왔는가"를 봅니다.

- **Recall@k** — 정답 문서가 상위 k개 안에 포함된 비율. 가장 중요한 지표.
- **Precision@k / MRR** — 상위 결과가 얼마나 깨끗한지, 정답이 얼마나 위에 있는지.
- 측정에는 "질문 ↔ 정답 청크" 쌍으로 된 **골든 셋**이 필요합니다. 50~100개면 시작할 수 있습니다.

## 생성 품질 (Generation)

"주어진 근거를 충실히 썼는가"를 봅니다.

- **충실성(Faithfulness)** — 답변의 모든 주장이 검색된 근거에 실제로 있는가. 낮으면 할루시네이션입니다.
- **답변 관련성** — 근거를 인용했더라도 질문에 답했는가.
- 사람이 전부 채점할 수 없으므로 **LLM-as-judge**(별도 모델이 루브릭으로 채점)가 표준이며, 주기적으로 사람 평가와 일치율을 검증합니다.

## 진단 매트릭스

- 검색 나쁨 → 청킹·임베딩·하이브리드부터 고칩니다. (생성 프롬프트를 만져봐야 소용없습니다)
- 검색 좋음 + 생성 나쁨 → 프롬프트·모델·근거 배치를 고칩니다.

> 💡 **핵심**: RAG 평가의 첫 질문은 "답이 좋은가"가 아니라 **"검색이 실패했는가, 생성이 실패했는가"**입니다.$aix$,
  $aix${"type":"compare","title":"검색 평가 vs 생성 평가","columns":[{"title":"검색 품질","icon":"search","tone":"primary","items":["질문: 정답 근거가 top-k에 있나","Recall@k · Precision@k · MRR","골든 셋(질문↔정답 청크)으로 측정","낮으면: 청킹·임베딩·하이브리드 수정"]},{"title":"생성 품질","icon":"sparkles","tone":"accent","items":["질문: 근거를 충실히 썼나","충실성 · 답변 관련성","LLM-as-judge로 자동 채점","낮으면: 프롬프트·모델·근거 배치 수정"]}],"caption":"두 지표를 분리하면 '어디를 고칠지'가 즉시 드러납니다 — 진단 없는 치료는 없습니다."}$aix$::jsonb, null, 6, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 코딩 툴 실전: Claude Code · Cursor · Copilot
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '2fccce30-a1ac-571c-f6ec-07bc627c2306', 'ai-coding-tools', 'AI 코딩 툴 실전: Claude Code · Cursor · Copilot', $aix$2026년의 개발자는 도구 하나를 '잘 쓰는' 사람이 아니라, 상황마다 맞는 도구를 '조합하는' 사람입니다. 이 강의에서는 탭 자동완성(Copilot·Cursor Tab), IDE 에이전트(Cursor Agent), 터미널 에이전트(Claude Code)라는 세 축을 각각 익히고, 하나의 하루 워크플로우로 엮는 법까지 다룹니다. 설치와 첫 작업부터 CLAUDE.md 맥락 주입, 플랜 모드, AI 코드 리뷰, 팀 도입과 생산성 측정까지 — 실무에서 바로 쓰는 순서 그대로 배웁니다.$aix$,
  null, 'dev', 'beginner', array['Claude Code', 'Cursor', 'GitHub Copilot', 'AI 코딩', '개발 생산성']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', '2fccce30-a1ac-571c-f6ec-07bc627c2306', 'tool-landscape', '도구의 지형도', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', '2fccce30-a1ac-571c-f6ec-07bc627c2306', 'agent-coding', '에이전트 코딩 실전', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '21b4b59e-9a10-96ff-d917-d7bee99e627a', '2fccce30-a1ac-571c-f6ec-07bc627c2306', 'combo-workflow', '조합 워크플로우', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'dce97307-1b8a-dc51-2bf8-da3f3fbd5bb1', 'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', 'ai-coding-tools/three-categories', 'three-categories', 'AI 코딩 도구 3분류: 자동완성·IDE 에이전트·터미널 에이전트',
  $aix$"어떤 AI 코딩 툴이 제일 좋아요?"는 잘못된 질문입니다. 2026년의 도구들은 서로 **다른 일**을 하기 때문입니다.

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

> 💡 **핵심**: 도구 선택 기준은 브랜드가 아니라 **작업의 크기와 맡길 자율성의 정도**입니다.$aix$,
  $aix${"type":"stack","title":"AI 코딩 도구 3층 구조","layers":[{"label":"자동완성형","sublabel":"Copilot · Cursor Tab — 문장 단위, 초 단위 개입","icon":"zap","tone":"accent"},{"label":"IDE 에이전트형","sublabel":"Cursor Agent · Copilot 에이전트 — 여러 파일 수정","icon":"code","tone":"primary"},{"label":"터미널 에이전트형","sublabel":"Claude Code — 파일·명령어·git, 작업 완수","icon":"terminal","tone":"success"}],"caption":"아래로 갈수록 자율성이 커집니다 — 세 층을 함께 쓰는 것이 2026년의 표준입니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '837f448d-7369-238c-581a-09dfbf5411a9', 'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', 'ai-coding-tools/tab-autocomplete', 'tab-autocomplete', '탭 자동완성 잘 쓰는 법: Copilot과 Cursor Tab',
  $aix$자동완성은 켜 두기만 하면 되는 기능이 아닙니다. **좋은 제안을 유도하는 습관**이 있는 사람과 없는 사람의 속도 차이는 큽니다.

## 제안 품질은 내가 만든다

자동완성은 **주변 코드와 열려 있는 파일**을 읽고 다음을 예측합니다. 그래서:

- **이름을 먼저 잘 짓기** — `calculateDiscountedTotal`이라고 쓰는 순간 구현의 절반이 제안됩니다.
- **주석으로 의도 선언** — 함수 위에 한 줄 주석을 쓰면 그 방향으로 제안이 옵니다.
- **참고할 파일을 옆 탭에 열어두기** — 비슷한 기존 코드가 열려 있으면 팀 컨벤션대로 제안됩니다.

## Cursor Tab의 진화: 다음 '편집' 예측

2026년의 Tab은 커서 위치의 완성만이 아니라, **다음에 고칠 위치로 점프**까지 제안합니다. 파라미터 하나를 바꾸면 그걸 쓰는 다른 줄들로 탭탭탭 — 연쇄 수정이 순식간에 끝납니다. Copilot도 같은 방향의 '다음 편집 제안'을 제공합니다.

## 받아들이기의 규율

- 제안을 **읽지 않고 탭 누르기 금지** — 그럴듯한 오답이 가장 위험합니다.
- 3번 연속 엉뚱한 제안이 오면, 자동완성과 싸우지 말고 상위 도구(채팅·에이전트)로 전환하세요.

> 💡 **핵심**: 자동완성의 실력 = **이름·주석·열린 탭**으로 맥락을 공급하는 여러분의 실력입니다.$aix$,
  $aix${"type":"steps","title":"좋은 제안을 유도하는 4단계 습관","steps":[{"label":"의도가 드러나는 이름 짓기","sublabel":"함수·변수명이 곧 프롬프트","icon":"file-text"},{"label":"한 줄 주석으로 방향 선언","sublabel":"// 만료 쿠폰은 제외하고 합산","icon":"message"},{"label":"참고 파일을 옆 탭에 열기","sublabel":"팀 컨벤션대로 제안 유도","icon":"layers"},{"label":"읽고 나서 탭 누르기","sublabel":"연속 오답이면 상위 도구로 전환","icon":"check"}],"caption":"자동완성은 수동적 기능이 아니라, 맥락을 '공급'하며 쓰는 능동적 도구입니다."}$aix$::jsonb, $aix${"title":"주석으로 자동완성 유도하기 따라하기","app":{"kind":"code-editor","windowTitle":"coupon.ts — Cursor","files":[{"id":"f-coupon","name":"coupon.ts","active":true},{"id":"f-cart","name":"cart.ts"}],"code":[{"id":"c1","text":"// 만료 쿠폰은 제외하고 합산","tone":"comment","hidden":true},{"id":"c2","text":"function sumValidCoupons(coupons) {","hidden":true},{"id":"c3","text":"const now = Date.now();","indent":1,"tone":"add","hidden":true},{"id":"c4","text":"return coupons","indent":1,"tone":"add","hidden":true},{"id":"c5","text":".filter((c) => c.expiresAt > now)","indent":2,"tone":"add","hidden":true},{"id":"c6","text":".reduce((s, c) => s + c.amount, 0);","indent":2,"tone":"add","hidden":true},{"id":"c7","text":"}","tone":"add","hidden":true}]},"actions":[{"t":"caption","text":"① 참고할 파일을 옆 탭에 열어 맥락을 공급합니다"},{"t":"move","target":"f-cart"},{"t":"click"},{"t":"wait","ms":400},{"t":"move","target":"f-coupon"},{"t":"click"},{"t":"caption","text":"② 한 줄 주석으로 의도를 먼저 선언합니다"},{"t":"type","target":"c1","text":"// 만료 쿠폰은 제외하고 합산"},{"t":"caption","text":"③ 의도가 드러나는 함수명을 타이핑합니다"},{"t":"type","target":"c2","text":"function sumValidCoupons(coupons) {"},{"t":"wait","ms":400},{"t":"caption","text":"④ 구현 전체가 회색 제안으로 나타납니다"},{"t":"reveal","target":"c3"},{"t":"reveal","target":"c4"},{"t":"reveal","target":"c5"},{"t":"reveal","target":"c6"},{"t":"reveal","target":"c7"},{"t":"wait","ms":700},{"t":"caption","text":"⑤ 제안을 끝까지 읽은 뒤 탭으로 수락합니다"},{"t":"move","target":"c5"},{"t":"click"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '26396057-df6b-319b-457a-80b628db5a9a', 'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', 'ai-coding-tools/inline-vs-chat', 'inline-vs-chat', '인라인 편집 vs 채팅: 언제 무엇을 쓰나',
  $aix$에디터 안에는 자동완성 말고도 두 개의 입구가 더 있습니다. **인라인 편집**과 **채팅**을 구분해 쓰면 왕복이 줄어듭니다.

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

> 💡 **핵심**: 범위를 아는 국소 수정은 **인라인**, 범위를 모르는 탐색·다중 파일 작업은 **채팅/에이전트**.$aix$,
  $aix${"type":"compare","title":"인라인 편집 vs 채팅","columns":[{"title":"인라인 편집 (Cmd+K)","icon":"wand","tone":"accent","items":["블록 선택 → 그 자리에서 지시","범위를 내가 이미 앎","diff가 즉시 그 자리에 표시","국소 수정에 최속"]},{"title":"채팅 / 에이전트","icon":"message","tone":"primary","items":["질문·탐색·설명 요청","범위를 모르는 작업","여러 파일에 걸친 수정","에이전트 모드로 자율 실행"]}],"caption":"판별 질문은 하나 — '수정 범위를 손으로 선택할 수 있는가?'"}$aix$::jsonb, null, 4, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ade6384c-af27-a933-c6c6-59db700c4e0f', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/claude-code-first-task', 'claude-code-first-task', 'Claude Code 시작하기: 설치부터 첫 작업까지',
  $aix$터미널 에이전트는 백문이 불여일견입니다. 10분 안에 설치하고 첫 작업을 맡겨봅니다.

## 설치와 실행

```bash
npm install -g @anthropic-ai/claude-code
cd my-project
claude
```

프로젝트 루트에서 `claude`를 실행하면 대화형 세션이 열립니다. 로그인은 최초 1회면 됩니다.

## 첫 작업은 '읽기'부터

바로 코드를 고치게 하지 말고, 프로젝트를 파악하게 하세요.

- "이 프로젝트 구조를 요약해줘"
- "결제 로직이 어디 있는지 찾아서 흐름을 설명해줘"

에이전트가 파일을 뒤지며 답하는 과정을 보면 **무엇을 맡길 수 있는지** 감이 잡힙니다.

## 두 번째 작업: 작고 검증 가능한 수정

"로그인 버튼 라벨을 '시작하기'로 바꾸고, 빌드가 통과하는지 확인해줘" — 이렇게 **검증까지 포함한 작은 작업**이 좋은 출발점입니다. Claude Code는 파일을 수정하기 전 diff를 보여주고 승인을 요청하므로, 처음에는 하나씩 확인하며 신뢰를 쌓으세요.

> 💡 **핵심**: 첫 작업 공식 = **읽기 요청 → 작은 수정 + 검증**. 자율성은 신뢰가 쌓인 만큼만 넓히세요.$aix$,
  $aix${"type":"terminal","windowTitle":"claude — 첫 작업","lines":[{"text":"npm install -g @anthropic-ai/claude-code","tone":"cmd"},{"text":"claude","tone":"cmd"},{"text":"# 나: 이 프로젝트 구조를 요약해줘","tone":"comment"},{"text":"Next.js 앱 — app/ 라우트, lib/에 결제·인증 로직","tone":"out"},{"text":"# 나: 로그인 버튼 라벨을 '시작하기'로 바꾸고 빌드 확인해줘","tone":"comment"},{"text":"● app/login/page.tsx 수정 제안 (diff 승인 대기)","tone":"dim"},{"text":"npm run build","tone":"cmd"},{"text":"✓ Compiled successfully","tone":"ok"},{"text":"완료 — 라벨 변경 + 빌드 통과 확인","tone":"ok"}],"caption":"읽기 → 작은 수정 → 검증. 첫 세션에서 이 흐름을 그대로 따라 해보세요."}$aix$::jsonb, $aix${"title":"Claude Code 첫 작업 따라하기","app":{"kind":"code-editor","windowTitle":"my-project — Claude Code 세션","files":[{"id":"f-page","name":"login/page.tsx","active":true},{"id":"f-auth","name":"lib/auth.ts"},{"id":"f-readme","name":"README.md"}],"code":[{"id":"c1","text":"export default function LoginPage() {"},{"id":"c2","text":"return (","indent":1},{"id":"c3","text":"<Button>로그인</Button>","indent":2,"tone":"del"},{"id":"c4","text":"<Button>시작하기</Button>","indent":2,"tone":"add","hidden":true},{"id":"c5","text":");","indent":1},{"id":"c6","text":"}"}],"terminal":[{"id":"t1","text":"claude","tone":"cmd","hidden":true},{"id":"t2","text":"> 로그인 버튼 라벨을 '시작하기'로 바꿔줘","tone":"cmd","hidden":true},{"id":"t3","text":"● login/page.tsx 수정 제안 (diff 승인 대기)","tone":"out","hidden":true},{"id":"t4","text":"npm run build","tone":"cmd","hidden":true},{"id":"t5","text":"✓ Compiled successfully","tone":"ok","hidden":true},{"id":"t6","text":"완료 — 라벨 변경 + 빌드 통과 확인","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 프로젝트 루트에서 claude를 실행합니다"},{"t":"type","target":"t1","text":"claude"},{"t":"wait","ms":500},{"t":"caption","text":"② 작고 검증 가능한 작업을 지시합니다"},{"t":"type","target":"t2","text":"> 로그인 버튼 라벨을 '시작하기'로 바꿔줘"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"③ 에이전트가 제안한 diff를 확인하고 승인합니다"},{"t":"move","target":"c3"},{"t":"click"},{"t":"reveal","target":"c4"},{"t":"wait","ms":500},{"t":"caption","text":"④ 빌드 명령으로 변경을 검증합니다"},{"t":"type","target":"t4","text":"npm run build"},{"t":"reveal","target":"t5"},{"t":"reveal","target":"t6"},{"t":"move","target":"t6"},{"t":"caption","text":"⑤ 작은 수정 + 검증 완료 — 신뢰가 한 칸 쌓였습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f17360ec-2259-0b41-c46d-aa8400e91b66', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/claude-md-context', 'claude-md-context', 'CLAUDE.md와 규칙 파일: 프로젝트 맥락 주입',
  $aix$같은 지시를 매번 반복하고 있다면, 그것은 채팅이 아니라 **파일에 적을 내용**입니다. 에이전트 도구들은 프로젝트의 규칙 파일을 매 세션 자동으로 읽습니다.

## CLAUDE.md: 프로젝트의 사용 설명서

프로젝트 루트의 `CLAUDE.md`는 Claude Code가 세션 시작 시 항상 읽는 파일입니다. `/init` 명령으로 초안을 자동 생성할 수 있습니다.

**넣어야 할 것:**

- 빌드·테스트·린트 명령어 (`npm run check` 등)
- 아키텍처 한 줄 요약과 핵심 디렉토리
- 팀 컨벤션 (예: "스타일은 Tailwind만, CSS 파일 생성 금지")
- 하지 말 것 (예: "마이그레이션 파일 직접 수정 금지")

**넣지 말아야 할 것:** 코드로 알 수 있는 세부사항, 금방 낡을 정보. 규칙 파일도 코드처럼 **짧고 최신**이어야 합니다.

## 다른 도구도 같은 구조

Cursor는 `.cursor/rules`, Copilot은 `.github/copilot-instructions.md`를 읽습니다. 내용의 원천을 하나로 관리하고 도구별 파일이 참조하게 하면 유지보수가 쉽습니다.

## 효과

규칙 파일 한 번 정리 = 앞으로의 **모든 세션에 자동 적용되는 프롬프트**. 팀원이 새 세션을 열어도 같은 규칙이 적용됩니다.

> 💡 **핵심**: 두 번 이상 반복한 지시는 채팅이 아니라 **CLAUDE.md에 적으세요**. 규칙 파일은 '영구 프롬프트'입니다.$aix$,
  $aix${"type":"grid","title":"규칙 파일 생태계와 CLAUDE.md 구성","items":[{"label":"CLAUDE.md","sublabel":"Claude Code · /init으로 초안 생성","icon":"file-text","tone":"primary"},{"label":".cursor/rules","sublabel":"Cursor 규칙 파일","icon":"settings","tone":"accent"},{"label":"copilot-instructions.md","sublabel":"Copilot 지침 파일","icon":"clipboard","tone":"accent"},{"label":"명령어","sublabel":"빌드·테스트·린트","icon":"terminal","tone":"success"},{"label":"컨벤션","sublabel":"스타일·네이밍 규칙","icon":"check","tone":"success"},{"label":"금지 사항","sublabel":"건드리면 안 되는 것","icon":"shield","tone":"warning"}],"caption":"위: 도구별 규칙 파일 · 아래: 어떤 파일이든 공통으로 담을 3요소."}$aix$::jsonb, $aix${"title":"CLAUDE.md 규칙 파일 만들기 따라하기","app":{"kind":"code-editor","windowTitle":"CLAUDE.md — 규칙 파일 작성","files":[{"id":"f-md","name":"CLAUDE.md","active":true},{"id":"f-pkg","name":"package.json"},{"id":"f-btn","name":"components/button.tsx"}],"code":[{"id":"c1","text":"# 프로젝트 규칙","tone":"comment","hidden":true},{"id":"c2","text":"- 검증: npm run check","hidden":true},{"id":"c3","text":"- 스타일은 Tailwind만, CSS 파일 생성 금지","hidden":true},{"id":"c4","text":"- 마이그레이션 파일 직접 수정 금지","hidden":true}],"terminal":[{"id":"t1","text":"claude","tone":"cmd","hidden":true},{"id":"t2","text":"> 버튼 컴포넌트에 로딩 상태 추가해줘","tone":"cmd","hidden":true},{"id":"t3","text":"CLAUDE.md 규칙 확인 — Tailwind로만 구현","tone":"out","hidden":true},{"id":"t4","text":"npm run check","tone":"cmd","hidden":true},{"id":"t5","text":"✓ lint + type + test 통과","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 프로젝트 루트에 CLAUDE.md를 만들어 엽니다"},{"t":"move","target":"f-md"},{"t":"click"},{"t":"type","target":"c1","text":"# 프로젝트 규칙"},{"t":"caption","text":"② 검증 명령어를 가장 먼저 적습니다"},{"t":"type","target":"c2","text":"- 검증: npm run check"},{"t":"caption","text":"③ 팀 컨벤션과 금지 사항을 한 줄씩 추가합니다"},{"t":"type","target":"c3","text":"- 스타일은 Tailwind만, CSS 파일 생성 금지"},{"t":"type","target":"c4","text":"- 마이그레이션 파일 직접 수정 금지"},{"t":"wait","ms":500},{"t":"caption","text":"④ 새 세션을 열어 규칙이 자동 적용되는지 확인합니다"},{"t":"type","target":"t1","text":"claude"},{"t":"type","target":"t2","text":"> 버튼 컴포넌트에 로딩 상태 추가해줘"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ 지시하지 않아도 규칙대로 검증까지 수행합니다"},{"t":"reveal","target":"t4"},{"t":"reveal","target":"t5"},{"t":"move","target":"t5"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0889692f-922c-867e-0c5e-d840126afca8', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/good-task-prompts', 'good-task-prompts', '좋은 작업 지시문: 목표 + 제약 + 검증',
  $aix$에이전트 결과물의 품질은 모델보다 **지시문의 구조**가 결정하는 경우가 많습니다. 좋은 지시문의 공식은 세 부분입니다.

## 공식: 목표 + 제약 + 검증

- **목표** — 무엇이 완료 상태인가. "고쳐줘"가 아니라 "비로그인 상태에서 /cart 접근 시 로그인 페이지로 리다이렉트되게 해줘".
- **제약** — 건드리면 안 되는 것, 따라야 할 방식. "기존 미들웨어 패턴을 따르고, 테스트 파일은 수정하지 마".
- **검증** — 완료를 무엇으로 확인하는가. "`npm run check`가 통과하면 완료야".

## 왜 검증이 게임 체인저인가

검증 명령을 주는 순간, 에이전트는 스스로 실행→확인→수정을 반복하는 **루프**를 돌 수 있습니다. 검증이 없으면 "그럴듯해 보이는" 시점에 멈추고, 검증이 있으면 "실제로 통과하는" 시점에 멈춥니다.

## 나쁜 지시문 고쳐 쓰기

- ✕ "장바구니 버그 고쳐줘"
- ○ "장바구니에서 같은 상품을 두 번 담으면 수량이 안 올라가는 버그를 고쳐줘. cart.ts의 기존 구조 유지, 수정 후 `npx vitest run`으로 검증해."

> 💡 **핵심**: 지시문 3요소 — **목표(완료 상태) + 제약(경계) + 검증(판정 명령)**. 특히 검증이 챗봇을 에이전트로 바꿉니다.$aix$,
  $aix${"type":"chat","title":"지시문 구조가 만드는 차이","messages":[{"role":"user","text":"장바구니 버그 고쳐줘"},{"role":"ai","text":"어떤 버그인지 특정하기 어려워 추측으로 수정했습니다. (검증 없이 종료)"},{"role":"user","text":"같은 상품 2번 담으면 수량이 안 올라가는 버그 수정. cart.ts 구조 유지, 테스트 파일 수정 금지. npx vitest run 통과하면 완료."},{"role":"ai","text":"원인: addItem의 중복 체크 누락. 수정 후 vitest 12/12 통과 확인했습니다."}],"caption":"같은 모델, 다른 지시문 — 목표·제약·검증이 갖춰지면 결과가 달라집니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a6b05232-8ca8-0077-7a5d-061834b61450', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/plan-mode-large-changes', 'plan-mode-large-changes', '플랜 모드와 대규모 변경',
  $aix$파일 수십 개를 건드리는 작업을 "바로 시작해"라고 맡기면 중간에 산으로 갑니다. 큰 변경의 규율은 **계획과 실행의 분리**입니다.

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

> 💡 **핵심**: 큰 변경일수록 **계획 승인 → 단계 실행 → 단계 검증**. 계획 단계에서 잡은 오류가 가장 싼 오류입니다.$aix$,
  $aix${"type":"flow","title":"플랜 모드 기반 대규모 변경","nodes":[{"label":"플랜 모드 진입","sublabel":"Shift+Tab — 읽기 전용","icon":"search","tone":"accent"},{"label":"계획 검토·수정","sublabel":"잘못된 가정을 여기서 교정","icon":"clipboard","tone":"warning"},{"label":"단계 실행","sublabel":"승인 후 한 단계씩","icon":"code","tone":"primary","edgeLabel":"계획 승인"},{"label":"검증 + 커밋","sublabel":"npm run check → git commit","icon":"check","tone":"success"}],"loopBack":{"from":3,"to":2,"label":"다음 단계 반복"},"caption":"계획은 한 번, 실행·검증·커밋은 단계 수만큼 반복합니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b88e2793-a0b6-dbf0-01ee-b1cc93a5fd28', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/ai-code-review', 'ai-code-review', 'AI 코드 리뷰 활용하기',
  $aix$AI가 쓴 코드가 늘어날수록 리뷰가 병목이 됩니다. 해법은 역설적이게도 **리뷰에도 AI를 넣는 것**입니다.

## 어디에 넣을 수 있나

- **커밋 전** — Claude Code에게 "방금 변경사항을 리뷰해줘. 버그·보안·엣지케이스 위주로". 가장 빠른 피드백 지점입니다.
- **PR 단계** — GitHub의 Copilot 코드 리뷰나 Claude Code의 GitHub 연동으로, PR이 열리면 자동으로 첫 리뷰가 달리게 합니다.
- **작성자와 다른 AI로** — 코드를 쓴 세션과 **별도의 새 세션**(또는 다른 도구)이 리뷰하면 같은 편향을 공유하지 않아 더 잘 잡습니다.

## AI 리뷰에게 시킬 것과 사람이 볼 것

- AI가 잘 잡는 것: 엣지케이스 누락, 에러 처리 빠짐, 보안 실수, 컨벤션 위반 — **패턴이 있는 결함**
- 사람이 봐야 하는 것: 이 변경이 애초에 옳은 방향인가, 제품 요구사항에 맞는가 — **맥락과 판단**

## 리뷰 지시문도 구체적으로

"리뷰해줘"보다 "이 diff에서 **null 처리 누락과 권한 체크 빠진 곳**을 찾아줘"가 훨씬 잘 작동합니다. 팀의 단골 결함 유형을 리뷰 프롬프트로 만들어 두세요.

> 💡 **핵심**: AI 리뷰는 사람 리뷰의 대체가 아니라 **1차 필터**입니다. 패턴 결함은 AI가, 방향 판단은 사람이.$aix$,
  $aix${"type":"flow","title":"AI 1차 필터 리뷰 파이프라인","nodes":[{"label":"코드 작성","sublabel":"사람 + AI 도구","icon":"code","tone":"primary"},{"label":"커밋 전 셀프 리뷰","sublabel":"Claude Code: 변경사항 리뷰 요청","icon":"eye","tone":"accent"},{"label":"PR 자동 AI 리뷰","sublabel":"별도 세션 — 패턴 결함 필터","icon":"bot","tone":"accent","edgeLabel":"PR 생성 시 자동"},{"label":"사람 리뷰","sublabel":"방향·요구사항 판단만 집중","icon":"user","tone":"success","edgeLabel":"패턴 결함 해소 후"}],"caption":"AI가 패턴 결함을 걸러주면, 사람은 '방향이 맞는가'에만 집중할 수 있습니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '232e52dc-4e43-9fae-ccd7-7c011f95d5a5', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/daily-workflow', 'daily-workflow', '하루 워크플로우: 탐색은 에이전트, 작성은 탭, 수정은 인라인',
  $aix$이제 배운 도구들을 **실제 하루**에 배치해봅니다. 핵심 원칙은 하나 — 작업의 크기에 도구를 맞추는 것입니다.

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

> 💡 **핵심**: **탐색·리팩토링은 에이전트, 작성은 탭, 국소 수정은 인라인.** 도구를 바꾸는 타이밍이 곧 생산성입니다.$aix$,
  $aix${"type":"steps","title":"AI 코딩 하루 루틴","steps":[{"label":"아침: 탐색·계획","sublabel":"Claude Code — 원인 분석, 플랜 모드","icon":"search"},{"label":"낮: 구현","sublabel":"탭 자동완성 + 인라인 편집(Cmd+K)","icon":"zap"},{"label":"중간 작업 위임","sublabel":"IDE 에이전트 — 다중 파일 수정 후 diff 검토","icon":"code"},{"label":"오후: 정리·검증","sublabel":"Claude Code — 리팩토링·테스트·커밋 전 리뷰","icon":"check"}],"caption":"작업 크기가 커질수록 아래 층(에이전트)으로, 작아질수록 위 층(탭)으로."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9bf3b870-e346-696a-da09-0cc0d52573b7', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/team-adoption', 'team-adoption', '팀 도입 가이드: 컨벤션·보안·리뷰 정책',
  $aix$개인의 도구가 팀의 도구가 되려면 **정책**이 필요합니다. 정책 없는 도입은 "각자 다르게 쓰다가 사고 한 번에 금지"로 끝나기 쉽습니다.

## 컨벤션: 규칙 파일을 저장소에

- `CLAUDE.md`, `.cursor/rules` 같은 규칙 파일을 **git으로 버전 관리**합니다. 팀원 누가 세션을 열어도 같은 규칙이 적용됩니다.
- 자주 쓰는 작업 지시문(리뷰 프롬프트, 리팩토링 절차)은 팀 위키가 아니라 **저장소 안에** 둡니다.

## 보안: 경계를 먼저 긋기

- 비밀키·고객 데이터가 프롬프트에 들어가지 않도록 `.env` 등 **민감 파일 접근 차단**을 도구 설정으로 강제합니다.
- 조직 계정(팀 플랜)을 써서 **학습 미사용·데이터 보존 정책**을 조직 차원에서 통제합니다.
- 에이전트의 자율 실행 범위(어떤 명령어까지 승인 없이 허용하는지)를 팀 표준으로 정합니다.

## 리뷰 정책: 책임은 사람에게

- 원칙 한 줄이면 충분합니다 — **"AI가 썼어도 머지한 사람이 저자다."**
- AI 생성 코드도 같은 리뷰 기준을 통과해야 하며, "AI가 그렇게 짰어요"는 리뷰 코멘트에 대한 답변이 될 수 없습니다.

> 💡 **핵심**: 팀 도입 3종 세트 = **저장소 안의 규칙 파일 + 민감 데이터 경계 + '머지한 사람이 저자' 원칙**.$aix$,
  $aix${"type":"grid","title":"팀 도입 정책 체크리스트","items":[{"label":"규칙 파일 버전 관리","sublabel":"CLAUDE.md를 git에","icon":"git-branch","tone":"primary"},{"label":"지시문 라이브러리","sublabel":"리뷰·리팩토링 프롬프트 공유","icon":"book","tone":"primary"},{"label":"민감 파일 차단","sublabel":".env · 고객 데이터 접근 금지","icon":"lock","tone":"warning"},{"label":"조직 계정 정책","sublabel":"학습 미사용 · 보존 통제","icon":"shield","tone":"warning"},{"label":"자율 실행 범위","sublabel":"승인 없는 명령의 한계선","icon":"settings","tone":"accent"},{"label":"머지한 사람이 저자","sublabel":"AI 코드도 같은 리뷰 기준","icon":"users","tone":"success"}],"caption":"컨벤션(위) · 보안(중간) · 리뷰 책임(아래) — 세 축이 모두 있어야 팀 도입입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '11661966-fe83-f487-0800-4ae31a1c3eaa', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/measuring-productivity', 'measuring-productivity', '생산성을 실제로 측정하는 법',
  $aix$"AI 덕분에 빨라진 것 같아요"는 측정이 아닙니다. 도구 투자와 정책을 조정하려면 **숫자**가 필요합니다.

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

> 💡 **핵심**: 속도 지표(리드 타임)와 **안전 지표(되돌림 비율)를 반드시 함께** 보세요. 한쪽만 보는 측정은 측정이 아닙니다.$aix$,
  $aix${"type":"cycle","title":"생산성 측정 루프","center":"월 단위 반복","nodes":[{"label":"기준선 수립","sublabel":"도입 전 4주 지표","icon":"gauge"},{"label":"지표 수집","sublabel":"리드 타임 · 되돌림 비율","icon":"chart"},{"label":"비교·해석","sublabel":"속도와 안전을 함께","icon":"eye"},{"label":"정책 조정","sublabel":"리뷰 기준 · 자율 범위","icon":"settings"}],"caption":"측정도 루프입니다 — 기준선 없이 시작한 측정은 해석할 수 없습니다."}$aix$::jsonb, null, 5, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 디자인 마스터: Midjourney & Stable Diffusion
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '16df7143-b4d3-92ba-470f-25e9d5bb2d9a', 'ai-design', 'AI 디자인 마스터: Midjourney & Stable Diffusion', $aix$2026년의 이미지 생성 AI는 '뽑기'가 아니라 '설계'의 도구입니다. 이 강의에서는 주제·스타일·구도·조명·파라미터로 이루어진 프롬프트의 문법을 익히고, Midjourney의 스타일·옴니 레퍼런스와 Stable Diffusion의 ControlNet으로 결과물을 정밀하게 통제합니다. 나아가 일관된 캐릭터 제작, 업스케일 파이프라인, 히어로 이미지·아이콘 같은 상업용 웹 에셋 워크플로우와 2026년 기준 라이선스·저작권 이슈까지 — 실무에 바로 쓰는 순서로 배웁니다.$aix$,
  null, 'creative', 'beginner', array['Midjourney', 'Stable Diffusion', 'ControlNet', '프롬프트', '웹 디자인 에셋']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '66337546-a796-3c6f-a2da-e7cbd77cc4ec', '16df7143-b4d3-92ba-470f-25e9d5bb2d9a', 'prompt-grammar', '이미지 프롬프트의 문법', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'ef9d1973-62ed-7dac-3251-51b5ac3dc553', '16df7143-b4d3-92ba-470f-25e9d5bb2d9a', 'consistency-craft', '일관성의 기술', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '925616d8-fab8-ca22-f82c-b65f57952332', '16df7143-b4d3-92ba-470f-25e9d5bb2d9a', 'commercial-assets', '상업용 에셋 제작', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e03cbca1-ed8a-17c9-2176-b51ab290b456', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/prompt-anatomy', 'prompt-anatomy', '프롬프트의 5요소: 주제·스타일·구도·조명·파라미터',
  $aix$"예쁜 그림 그려줘"로는 예쁜 그림이 나오지 않습니다. 좋은 이미지 프롬프트는 **문장이 아니라 설계도**입니다.

## 프롬프트를 이루는 5개의 층

- **주제(Subject)** — 무엇을 그릴 것인가. 인물·사물·장면을 구체적으로.
- **스타일(Style)** — 어떤 화풍인가. 사진/일러스트/3D, 시대, 아티스트 무드.
- **구도(Composition)** — 카메라가 어디에 있는가. 클로즈업, 부감, 광각, 여백.
- **조명(Lighting)** — 빛이 어디서 오는가. 골든아워, 스튜디오, 네온, 역광.
- **파라미터(Parameters)** — 비율·스타일 강도 등 기계에게 주는 숫자 명령.

## 왜 순서대로 쓰는가

- 모델은 **앞에 나온 단어에 더 큰 가중치**를 둡니다. 가장 중요한 주제를 맨 앞에 두세요.
- 5요소를 층으로 나눠 쓰면, 결과가 마음에 안 들 때 **어느 층을 고칠지** 바로 찾을 수 있습니다.
- "조명만 바꿔서 4장" 같은 변주 실험이 가능해집니다 — 이것이 디자이너의 반복 작업 방식입니다.

> 💡 **핵심**: 프롬프트는 한 문장이 아니라 **주제→스타일→구도→조명→파라미터의 5층 설계도**입니다. 층을 나누는 순간 결과를 통제할 수 있게 됩니다.$aix$,
  $aix${"type":"stack","title":"프롬프트 5층 설계도","layers":[{"label":"주제 (Subject)","sublabel":"무엇을 — 가장 앞, 가장 구체적으로","icon":"target","tone":"primary"},{"label":"스타일 (Style)","sublabel":"화풍·매체·시대의 무드","icon":"palette","tone":"accent"},{"label":"구도 (Composition)","sublabel":"카메라 위치·앵글·여백","icon":"camera","tone":"accent"},{"label":"조명 (Lighting)","sublabel":"빛의 방향·시간대·분위기","icon":"sparkles","tone":"accent"},{"label":"파라미터 (Parameters)","sublabel":"--ar, --stylize 등 숫자 명령","icon":"settings","tone":"muted"}],"caption":"결과가 아쉬우면 전체를 다시 쓰지 말고, 문제가 있는 층 하나만 고치세요."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '98493055-1877-eee9-5cc7-3eec16c3d7b7', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/bad-vs-good-prompt', 'bad-vs-good-prompt', '나쁜 프롬프트 vs 좋은 프롬프트',
  $aix$같은 모델, 같은 요금제인데 결과가 하늘과 땅 차이인 이유는 단 하나 — **프롬프트의 정보량**입니다.

## 나쁜 프롬프트의 3가지 습관

- **모호한 형용사**: "예쁜", "멋진", "고퀄리티" — 모델마다 해석이 제각각입니다.
- **정보 없는 요청**: 주제만 있고 스타일·구도·조명이 없으면 나머지는 전부 랜덤입니다.
- **한 번에 다 넣기**: 서로 충돌하는 키워드 20개를 나열하면 모델은 평균을 내버립니다.

## 좋은 프롬프트로 고치는 법

- 형용사를 **시각적 사실**로 바꿉니다. "예쁜 카페" → "통유리창으로 오후 햇살이 드는 미니멀 카페".
- 5요소 체크: 주제 → 스타일 → 구도 → 조명 → 파라미터 순으로 빠진 층을 채웁니다.
- **빼기의 기술**: 원치 않는 요소는 네거티브(`--no text, watermark`)로 명시합니다.

## 실무 감각

프롬프트를 "주문서"라고 생각하세요. 카페에서 "맛있는 거 주세요"라고 하면 무엇이 나올지 모르지만, "아이스 라떼, 샷 추가, 얼음 적게"는 항상 같은 결과가 나옵니다.

> 💡 **핵심**: 좋은 프롬프트 = 모호한 형용사를 **시각적 사실**로 바꾸고, 5요소의 빈칸을 채운 주문서입니다.$aix$,
  $aix${"type":"chat","title":"같은 요청, 다른 결과","messages":[{"role":"user","text":"예쁜 카페 그림 고퀄리티로 그려줘"},{"role":"ai","text":"(랜덤 스타일의 평범한 카페 4장 — 매번 다른 결과)"},{"role":"user","text":"미니멀 인테리어의 카페, 통유리창으로 드는 오후 햇살, 광각 인테리어 사진, 필름 톤 --ar 16:9 --no people, text"},{"role":"ai","text":"(의도한 무드·구도·비율이 재현된 4장 — 다시 뽑아도 방향 유지)"}],"caption":"모호한 형용사를 시각적 사실로 바꾸는 것이 프롬프트 개선의 90%입니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '409c53aa-3464-9b11-86b0-687f489f13bd', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/midjourney-parameters', 'midjourney-parameters', 'Midjourney 핵심 파라미터: --ar, --stylize, --sref',
  $aix$프롬프트가 '무엇을'이라면 파라미터는 '어떻게'입니다. 최신 Midjourney(V7 이후)에서 실무에 쓰는 파라미터는 사실 몇 개 안 됩니다.

## 반드시 쓰는 3개

- `--ar 16:9` — **화면 비율**. 웹 히어로는 16:9~21:9, SNS는 1:1, 포스터는 2:3.
- `--stylize 0~1000` (`--s`) — **Midjourney 미학의 개입 강도**. 낮으면 프롬프트에 충실, 높으면 예술적 해석이 강해집니다. 기본 100.
- `--sref [이미지 URL]` — **스타일 레퍼런스**. 색감·질감·무드만 가져오고 내용은 프롬프트를 따릅니다. `--sw`로 강도 조절.

## 상황별로 쓰는 파라미터

- `--oref` — 옴니 레퍼런스(V7+). 특정 인물·캐릭터·사물을 새 장면에 등장시킵니다. 구버전의 `--cref`를 대체했습니다.
- `--seed` — 난수 고정. 같은 시드 + 같은 프롬프트 = 비슷한 결과. 변수 통제 실험에 필수.
- `--chaos`, `--weird` — 4장의 다양성·기이함. 아이디어 탐색 단계에서만.
- `--raw` — 미학 보정을 끈 절제된 모드. 사진·제품컷에 유리합니다.

> 💡 **핵심**: 탐색할 때는 `--chaos`를 올리고, 확정할 때는 `--seed`와 `--sref`로 고정하세요. **탐색과 고정의 파라미터는 다릅니다.**$aix$,
  $aix${"type":"terminal","windowTitle":"Midjourney — /imagine","lines":[{"text":"/imagine minimal cafe interior, afternoon light","tone":"cmd"},{"text":"  --ar 16:9 --stylize 200","tone":"cmd"},{"text":"4장 생성 완료 — 무드 탐색","tone":"ok"},{"text":"# 2번 이미지의 스타일이 마음에 듦 → 고정","tone":"comment"},{"text":"/imagine cozy bookstore interior","tone":"cmd"},{"text":"  --sref https://.../cafe-2.png --sw 300 --ar 16:9","tone":"cmd"},{"text":"같은 색감·무드의 서점 4장 생성","tone":"ok"},{"text":"# 내용은 바뀌고 스타일은 유지됨","tone":"comment"}],"caption":"--sref는 '내용'이 아니라 '스타일'만 이식합니다 — 시리즈 작업의 핵심 무기입니다."}$aix$::jsonb, $aix${"title":"Midjourney 웹에서 생성과 업스케일 따라하기","app":{"kind":"browser","url":"midjourney.com/imagine","blocks":[{"id":"mj-head","type":"heading","label":"Imagine"},{"id":"mj-prompt","type":"input","label":"프롬프트를 입력하세요…"},{"id":"mj-generate","type":"button","label":"Generate"},{"id":"mj-loading","type":"badge","label":"생성 중… 4장","hidden":true},{"id":"mj-img1","type":"card","label":"🖼 cafe-01 — 창가 구도","hidden":true},{"id":"mj-img2","type":"card","label":"🖼 cafe-02 — 필름 톤 ✓","hidden":true},{"id":"mj-img3","type":"card","label":"🖼 cafe-03 — 광각","hidden":true},{"id":"mj-img4","type":"card","label":"🖼 cafe-04 — 클로즈업","hidden":true},{"id":"mj-upscale","type":"button","label":"Upscale (Subtle)","hidden":true},{"id":"mj-final","type":"card","label":"✨ cafe-02-4K.png — 업스케일 완료","hidden":true}]},"actions":[{"t":"caption","text":"① 프롬프트 입력창을 클릭합니다"},{"t":"move","target":"mj-prompt"},{"t":"click"},{"t":"caption","text":"② 주제를 먼저 쓰고 파라미터는 뒤에 붙입니다"},{"t":"type","target":"mj-prompt","text":"minimal cafe interior --ar 16:9 --s 200"},{"t":"caption","text":"③ Generate를 눌러 4장을 생성합니다"},{"t":"move","target":"mj-generate"},{"t":"click"},{"t":"reveal","target":"mj-loading"},{"t":"wait","ms":700},{"t":"hide","target":"mj-loading"},{"t":"reveal","target":"mj-img1"},{"t":"reveal","target":"mj-img2"},{"t":"reveal","target":"mj-img3"},{"t":"reveal","target":"mj-img4"},{"t":"caption","text":"④ 무드가 잡힌 2번 컷을 선택합니다"},{"t":"move","target":"mj-img2"},{"t":"click"},{"t":"reveal","target":"mj-upscale"},{"t":"caption","text":"⑤ 충실형 업스케일로 4K 납품본을 만듭니다"},{"t":"move","target":"mj-upscale"},{"t":"click"},{"t":"reveal","target":"mj-final"},{"t":"move","target":"mj-final"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '326e1950-99e9-6b31-1d9e-1d5159bfea75', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/style-reference-moodboard', 'style-reference-moodboard', '무드보드에서 스타일 레퍼런스로',
  $aix$디자이너는 프롬프트를 쓰기 전에 무드보드부터 만듭니다. 2026년의 무드보드는 감상용이 아니라 **AI에게 직접 먹이는 입력값**입니다.

## 무드보드 → 프롬프트 워크플로우

1. **수집** — 원하는 무드의 이미지를 10~20장 모읍니다(핀터레스트, 자기 작업물, AI 생성물).
2. **선별** — 색감·질감·조명이 일관된 3~5장으로 좁힙니다. 여기서 무드가 결정됩니다.
3. **언어화** — 선별한 이미지의 공통점을 5요소 언어로 적어봅니다. "저채도 파스텔, 필름 그레인, 자연광".
4. **레퍼런스 연결** — `--sref`에 이미지를 걸고, 언어화한 키워드를 프롬프트에 씁니다.

## 왜 이미지와 언어를 둘 다 쓰는가

- `--sref`만 쓰면 스타일은 잡히지만 **왜 그 스타일인지** 팀에 설명할 수 없습니다.
- 언어화된 키워드는 다른 도구(Stable Diffusion 등)로 옮길 때 **이식 가능한 자산**이 됩니다.
- 무드보드 이미지 자체를 여러 장 `--sref`로 섞어 나만의 스타일 코드를 만들 수도 있습니다.

> 💡 **핵심**: 무드보드는 감상용 콜라주가 아니라 **수집→선별→언어화→레퍼런스 연결**로 이어지는 스타일 파이프라인의 첫 단계입니다.$aix$,
  $aix${"type":"steps","title":"무드보드 → 스타일 레퍼런스 4단계","steps":[{"label":"수집","sublabel":"무드에 맞는 이미지 10~20장","icon":"search"},{"label":"선별","sublabel":"색감·질감이 일관된 3~5장","icon":"filter"},{"label":"언어화","sublabel":"공통점을 5요소 키워드로","icon":"file-text"},{"label":"레퍼런스 연결","sublabel":"--sref + 키워드로 생성","icon":"wand"}],"caption":"언어화 단계를 건너뛰면 스타일을 다른 도구·팀원에게 이식할 수 없습니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '64966b79-ff83-089d-7a42-699e24fe23c2', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/controlnet-basics', 'controlnet-basics', 'ControlNet: 포즈와 구도를 못 박는 법',
  $aix$프롬프트로는 "왼손을 든 캐릭터"를 정확히 만들 수 없습니다. **구조를 통제하려면 구조를 입력**해야 합니다 — 그것이 ControlNet입니다.

## ControlNet의 원리

Stable Diffusion은 원래 텍스트만 보고 그립니다. ControlNet은 여기에 **조건 이미지**를 추가로 꽂는 어댑터입니다.

- 입력 이미지에서 **구조 정보만 추출**합니다(전처리) — 뼈대, 윤곽선, 깊이.
- 추출된 구조를 생성 과정에 **강제 조건**으로 겁니다.
- 결과: 포즈·구도는 입력을 따르고, 화풍·내용은 프롬프트를 따릅니다.

## 대표 전처리기 3종

- **OpenPose** — 사람의 관절 뼈대만 추출. 포즈 복제의 표준.
- **Depth** — 깊이 맵으로 공간 배치·원근을 고정. 배경·인테리어에 강력.
- **Canny/Lineart** — 윤곽선을 고정. 로고, 제품 형태 유지에 사용.

## 2026년 실무 환경

ComfyUI가 사실상 표준 작업대이며, SDXL·FLUX 계열 모델에도 같은 개념의 컨트롤 어댑터가 제공됩니다. 도구가 바뀌어도 **"구조 추출 → 조건 주입"** 원리는 동일합니다.

> 💡 **핵심**: 프롬프트는 '내용'을, ControlNet은 '구조'를 담당합니다. 이 분업을 이해하면 우연이 아니라 **설계로** 그림을 만들 수 있습니다.$aix$,
  $aix${"type":"flow","title":"ControlNet 파이프라인","nodes":[{"label":"레퍼런스 이미지","sublabel":"원하는 포즈·구도의 사진","icon":"image","tone":"muted"},{"label":"전처리기","sublabel":"OpenPose · Depth · Canny","icon":"scissors","tone":"accent","edgeLabel":"구조만 추출"},{"label":"ControlNet + 프롬프트","sublabel":"구조는 조건으로, 내용은 텍스트로","icon":"layers","tone":"primary","edgeLabel":"조건 주입"},{"label":"결과 이미지","sublabel":"포즈 고정 + 새로운 화풍","icon":"sparkles","tone":"success"}],"caption":"구조(뼈대)와 내용(살)을 분리해서 입력하는 것이 ControlNet의 전부입니다."}$aix$::jsonb, $aix${"title":"ControlNet 포즈 고정 생성 따라하기","app":{"kind":"browser","url":"localhost:8188/controlnet","blocks":[{"id":"cn-head","type":"heading","label":"ControlNet — 구조는 이미지로, 내용은 텍스트로"},{"id":"cn-upload","type":"button","label":"📤 포즈 레퍼런스 업로드"},{"id":"cn-pose","type":"card","label":"🧍 pose-ref.jpg — 왼손을 든 포즈","hidden":true},{"id":"cn-prep","type":"button","label":"전처리기: OpenPose"},{"id":"cn-skeleton","type":"card","label":"🦴 skeleton.png — 뼈대만 추출됨","hidden":true},{"id":"cn-prompt","type":"input","label":"프롬프트를 입력하세요…"},{"id":"cn-generate","type":"button","label":"Generate"},{"id":"cn-result","type":"card","label":"🎨 결과 — 수채화 기사, 포즈는 그대로","hidden":true},{"id":"cn-badge","type":"badge","label":"✓ 구조 일치 — 포즈 고정 성공","hidden":true}]},"actions":[{"t":"caption","text":"① 원하는 포즈의 레퍼런스를 업로드합니다"},{"t":"move","target":"cn-upload"},{"t":"click"},{"t":"reveal","target":"cn-pose"},{"t":"wait","ms":500},{"t":"caption","text":"② OpenPose 전처리기로 뼈대만 추출합니다"},{"t":"move","target":"cn-prep"},{"t":"click"},{"t":"reveal","target":"cn-skeleton"},{"t":"wait","ms":600},{"t":"caption","text":"③ 내용은 프롬프트로 씁니다 — 화풍과 주제"},{"t":"move","target":"cn-prompt"},{"t":"click"},{"t":"type","target":"cn-prompt","text":"watercolor knight, dramatic light"},{"t":"caption","text":"④ 생성합니다 — 구조는 조건, 내용은 텍스트"},{"t":"move","target":"cn-generate"},{"t":"click"},{"t":"reveal","target":"cn-result"},{"t":"wait","ms":500},{"t":"reveal","target":"cn-badge"},{"t":"caption","text":"⑤ 포즈는 그대로, 화풍만 바뀌었습니다"},{"t":"move","target":"cn-result"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e495d9c9-ab2c-9d50-9d88-8c8f2713005e', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/consistent-character', 'consistent-character', '일관된 캐릭터 만들기: 시트·시드·레퍼런스',
  $aix$웹툰, 브랜드 마스코트, 게임 일러스트의 공통 난제 — "다음 컷에서도 같은 얼굴"입니다. 한 장의 행운을 **반복 가능한 시스템**으로 바꿔봅니다.

## 캐릭터 일관성 루프

1. **베이스 생성** — 외모를 언어로 완전히 명세합니다(머리색, 눈, 의상, 체형). 이 서술문이 캐릭터의 '주민등록'입니다.
2. **베스트 컷 선별** — 생성물 중 캐릭터의 정체성이 가장 잘 드러난 1장을 고릅니다.
3. **캐릭터 시트 제작** — 그 이미지를 레퍼런스로 정면·측면·표정 변화를 한 화면에 뽑습니다(character sheet, multiple views).
4. **레퍼런스 등록 후 재생성** — Midjourney는 `--oref`(옴니 레퍼런스)에 시트를 걸고, Stable Diffusion은 IP-Adapter나 캐릭터 LoRA를 학습시켜 새 장면을 만듭니다.

새 장면에서 잘 나온 컷은 다시 시트에 추가합니다 — 돌수록 캐릭터가 단단해지는 루프입니다.

## 보조 장치

- **시드 고정**: 같은 `--seed`는 변수 통제 실험(의상만 교체 등)에 유용합니다.
- **서술문 재사용**: 레퍼런스가 있어도 외모 서술문은 항상 함께 씁니다. 이미지와 텍스트가 서로를 보강합니다.

> 💡 **핵심**: 캐릭터 일관성은 한 번의 프롬프트가 아니라 **생성→선별→시트화→레퍼런스 재투입**을 반복하는 루프에서 나옵니다.$aix$,
  $aix${"type":"cycle","title":"캐릭터 일관성 루프","center":"돌수록 캐릭터가 단단해짐","nodes":[{"label":"베이스 생성","sublabel":"외모를 완전히 언어화","icon":"user"},{"label":"베스트 컷 선별","sublabel":"정체성이 가장 또렷한 1장","icon":"eye"},{"label":"캐릭터 시트화","sublabel":"정면·측면·표정 모음","icon":"clipboard"},{"label":"레퍼런스 재투입","sublabel":"--oref · LoRA로 새 장면","icon":"refresh"}],"caption":"새 장면의 좋은 컷을 다시 시트에 추가하면 일관성이 누적됩니다."}$aix$::jsonb, null, 7, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b0c53e8f-1da6-fbff-00fd-090b7a917a28', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/upscale-pipeline', 'upscale-pipeline', '업스케일과 후보정: 뽑고 끝이 아니다',
  $aix$AI가 처음 내놓는 이미지는 '시안'입니다. 상업용 퀄리티는 **생성 이후의 파이프라인**에서 만들어집니다.

## 표준 후보정 파이프라인

- **1단계 — 결점 수리(인페인팅)**: 손가락, 눈, 어긋난 디테일을 해당 영역만 다시 그립니다. 전체 재생성보다 훨씬 경제적입니다.
- **2단계 — 업스케일**: 1~2K 원본을 4K 이상으로. Midjourney 내장 Upscale, Real-ESRGAN 계열, Magnific·Topaz 같은 디테일 생성형 업스케일러를 용도에 맞게 선택합니다.
- **3단계 — 톤 보정**: 시리즈 전체의 색 온도·대비를 통일합니다. 포토샵/라이트룸에서 같은 프리셋을 일괄 적용합니다.
- **4단계 — 포맷 최적화**: 웹용이면 WebP/AVIF 변환과 용량 압축까지가 납품입니다.

## 업스케일러 선택 기준

- **충실형**(원본 유지): 사진·인물 — 디테일을 지어내지 않아 안전합니다.
- **창작형**(디테일 생성): 일러스트·배경 — 질감을 새로 그려 넣어 화려하지만, 얼굴이 변형될 수 있어 인물엔 주의가 필요합니다.

> 💡 **핵심**: 생성은 시작일 뿐입니다. **수리→업스케일→톤 통일→포맷 최적화**까지 마쳐야 상업용 결과물입니다.$aix$,
  $aix${"type":"flow","title":"생성 이후 후보정 파이프라인","nodes":[{"label":"원본 생성물","sublabel":"1~2K 시안","icon":"image","tone":"muted"},{"label":"인페인팅 수리","sublabel":"손·눈·디테일만 부분 재생성","icon":"wrench","tone":"accent"},{"label":"업스케일","sublabel":"충실형 vs 창작형 선택","icon":"trending-up","tone":"primary"},{"label":"톤 통일 + 포맷 최적화","sublabel":"시리즈 프리셋 · WebP/AVIF","icon":"check","tone":"success"}],"caption":"인물은 충실형, 배경·일러스트는 창작형 업스케일러가 기본 선택입니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ef7d39a5-502e-888e-3fe6-5f857d4c1737', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/web-asset-workflow', 'web-asset-workflow', '웹 디자인 에셋 제작: 히어로·아이콘·배경',
  $aix$실무에서 AI 디자인의 최대 수요처는 웹사이트입니다. 에셋 종류마다 **요구 조건이 다르므로 프롬프트 전략도 달라야** 합니다.

## 에셋별 제작 전략

- **히어로 이미지** — `--ar 21:9` 같은 와이드 비율로 생성하고, **텍스트가 올라갈 여백**(negative space)을 프롬프트에 명시합니다. 피사체를 한쪽에 치우치게.
- **아이콘 세트** — 한 장에 한 아이콘씩, 같은 `--sref`(또는 시드)로 시리즈를 뽑아 스타일을 통일합니다. 단순한 형태·플랫 스타일이 축소 시 강합니다.
- **배경/패턴** — `tile` 옵션이나 반복 패턴 프롬프트로 이음새 없는(seamless) 텍스처를 만듭니다. 저대비로 뽑아야 위의 콘텐츠를 방해하지 않습니다.
- **일러스트 스팟** — 빈 상태 화면, 온보딩 등. 캐릭터 레퍼런스로 시리즈 일관성을 유지합니다.

## 납품 전 체크

- 실제 페이지에 얹어 **텍스트 가독성**을 확인합니다.
- 반응형 크롭(모바일 세로)을 견디는지 봅니다 — 중요한 피사체가 잘리면 안 됩니다.
- 파일은 용도별 해상도 + WebP/AVIF로 정리합니다.

> 💡 **핵심**: 웹 에셋은 '예쁜 그림'이 아니라 **텍스트 여백, 축소 내성, 저대비, 반응형 크롭**이라는 제약 조건을 통과한 그림입니다.$aix$,
  $aix${"type":"grid","title":"웹 에셋 4종과 핵심 제약","items":[{"label":"히어로 이미지","sublabel":"와이드 비율 + 텍스트 여백","icon":"monitor","tone":"primary"},{"label":"아이콘 세트","sublabel":"같은 sref로 시리즈 통일","icon":"zap","tone":"accent"},{"label":"배경·패턴","sublabel":"이음새 없음 + 저대비","icon":"layers","tone":"muted"},{"label":"스팟 일러스트","sublabel":"캐릭터 레퍼런스로 일관성","icon":"smartphone","tone":"success"}],"caption":"에셋 종류가 바뀌면 비율·대비·여백 등 제약 조건부터 다시 정의하세요."}$aix$::jsonb, $aix${"title":"디자인 에디터에서 히어로 섹션 조립 따라하기","app":{"kind":"design-canvas","windowTitle":"landing-hero — Figma","tools":[{"id":"tool-frame","icon":"layers","label":"프레임"},{"id":"tool-image","icon":"image","label":"이미지"},{"id":"tool-text","icon":"file-text","label":"텍스트"},{"id":"tool-rect","icon":"target","label":"사각형"}],"objects":[{"id":"frame-hero","shape":"frame","label":"Hero 1440×600","x":6,"y":8,"w":88,"h":58},{"id":"img-hero","shape":"image","label":"AI 히어로 이미지 (21:9 생성물)","x":9,"y":13,"w":42,"h":48,"hidden":true},{"id":"text-head","shape":"text","label":"AI로 디자인을 10배 빠르게","x":56,"y":18,"w":34,"h":10,"hidden":true},{"id":"text-sub","shape":"text","label":"프롬프트 템플릿으로 팀 톤 유지","x":56,"y":32,"w":32,"h":8,"hidden":true},{"id":"btn-cta","shape":"rect","label":"시작하기","x":56,"y":46,"w":16,"h":9,"color":"#f59e0b","hidden":true}]},"actions":[{"t":"caption","text":"① 21:9 와이드 히어로 프레임을 확인합니다"},{"t":"move","target":"frame-hero"},{"t":"click"},{"t":"caption","text":"② 이미지 툴로 AI 생성 히어로를 배치합니다"},{"t":"move","target":"tool-image"},{"t":"click"},{"t":"drag","from":"frame-hero","to":"img-hero"},{"t":"reveal","target":"img-hero"},{"t":"wait","ms":500},{"t":"caption","text":"③ 비워둔 여백에 헤드라인을 올립니다"},{"t":"move","target":"tool-text"},{"t":"click"},{"t":"type","target":"text-head","text":"AI로 디자인을 10배 빠르게"},{"t":"type","target":"text-sub","text":"프롬프트 템플릿으로 팀 톤 유지"},{"t":"caption","text":"④ 사각형 툴로 CTA 버튼을 그립니다"},{"t":"move","target":"tool-rect"},{"t":"click"},{"t":"drag","from":"text-sub","to":"btn-cta"},{"t":"reveal","target":"btn-cta"},{"t":"caption","text":"⑤ 텍스트 가독성과 여백 균형을 확인합니다"},{"t":"move","target":"img-hero"},{"t":"move","target":"text-head"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '50b3228d-84d2-6f21-d0e8-77bf6cbe99bf', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/brand-consistency', 'brand-consistency', '브랜드 일관성: 스타일 시스템으로 굳히기',
  $aix$에셋 하나하나가 훌륭해도 서로 따로 놀면 브랜드가 무너집니다. 해법은 재능이 아니라 **시스템**입니다.

## 브랜드 스타일 시스템의 3요소

- **스타일 코드** — 확정된 무드보드 이미지들을 `--sref`용 고정 레퍼런스로 저장합니다. 모든 신규 에셋은 이 레퍼런스를 통과해야 합니다.
- **프롬프트 템플릿** — 브랜드 공통 키워드(색감·질감·조명)를 템플릿으로 만들고, 에셋마다 주제만 갈아 끼웁니다. 팀원 누가 뽑아도 같은 톤이 나옵니다.
- **컬러 후처리 프리셋** — 생성 후 브랜드 팔레트로 보정하는 프리셋을 공유합니다. AI의 색은 미세하게 흔들리므로 마지막은 항상 후처리로 잠급니다.

## 운영 규칙

- 템플릿과 레퍼런스는 **버전 관리**합니다 — "v3 스타일로 뽑아주세요"가 가능해집니다.
- 새 스타일 실험은 별도 브랜치처럼 분리하고, 확정되면 템플릿에 반영합니다.
- 분기마다 전체 에셋을 한 화면에 모아 **일관성 감사**를 합니다.

> 💡 **핵심**: 브랜드 일관성 = **고정 레퍼런스 + 프롬프트 템플릿 + 후처리 프리셋**. 개인의 감각을 팀의 시스템으로 바꾸는 것이 프로의 방식입니다.$aix$,
  $aix${"type":"compare","title":"그때그때 생성 vs 스타일 시스템","columns":[{"title":"그때그때 생성","icon":"alert","tone":"warning","items":["에셋마다 프롬프트를 새로 작성","담당자마다 다른 톤","색감이 페이지마다 미묘하게 다름","리뉴얼 때 전부 다시 제작"]},{"title":"스타일 시스템","icon":"layers","tone":"primary","items":["고정 sref + 프롬프트 템플릿","누가 뽑아도 같은 브랜드 톤","후처리 프리셋으로 색을 잠금","템플릿 버전만 올리면 갱신 끝"]}],"caption":"감각은 사람에게, 일관성은 시스템에 맡기세요."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '91c5ce2a-3183-976b-e0a3-3eb2fdcba440', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/license-and-copyright', 'license-and-copyright', '상업적 이용: 라이선스와 저작권 (2026년 기준)',
  $aix$상업 프로젝트에서 가장 비싼 실수는 그림이 아니라 **법적 검토 누락**입니다. 2026년 기준으로 반드시 확인할 것들을 정리합니다.

## 도구별 이용 조건 확인

- **Midjourney**: 유료 플랜이면 상업적 이용이 가능합니다. 단, 연 매출 100만 달러 이상 기업은 상위 플랜 가입이 조건입니다.
- **Stable Diffusion 계열**: 모델마다 라이선스가 다릅니다. 오픈 라이선스 모델과 비상업용(연구용) 가중치가 섞여 있으므로, **쓰는 모델·LoRA의 라이선스를 개별 확인**해야 합니다.

## 2026년 규제 동향

- **미국**: 저작권청 방침상 AI가 단독 생성한 이미지는 저작권 보호를 받지 못합니다. 사람의 **창작적 기여**(구체적 편집·합성·가공)가 있어야 그 부분에 한해 보호됩니다.
- **EU**: AI Act에 따라 AI 생성 콘텐츠임을 표시하는 **투명성 의무**가 단계적으로 적용 중입니다.
- **한국**: 2026년 1월 시행된 AI 기본법에 따라 생성형 AI 산출물 **표시 의무**가 도입되었습니다.

## 실무 안전 수칙

- 생존 작가 이름·특정 캐릭터·로고를 프롬프트에 쓰지 않습니다 — 상표·퍼블리시티권 분쟁의 지름길입니다.
- 프롬프트·생성 일시·사용 모델을 **기록으로 남깁니다**. 분쟁 시 인간 기여를 입증하는 자료가 됩니다.

> 💡 **핵심**: "생성 가능"과 "상업적으로 안전"은 다릅니다. **플랜·모델 라이선스 확인 + 인간 기여 + 표시 의무 + 기록 보관**이 2026년의 4대 안전장치입니다.$aix$,
  $aix${"type":"grid","title":"상업 이용 전 4대 체크포인트","items":[{"label":"플랜·모델 라이선스","sublabel":"유료 플랜 조건 · 모델별 확인","icon":"key","tone":"primary"},{"label":"인간의 창작적 기여","sublabel":"편집·합성 없인 저작권 없음","icon":"user","tone":"accent"},{"label":"AI 생성물 표시","sublabel":"EU AI Act · 한국 AI 기본법","icon":"alert","tone":"warning"},{"label":"기록 보관","sublabel":"프롬프트·모델·일시 증빙","icon":"clipboard","tone":"success"},{"label":"타인 IP 배제","sublabel":"작가명·캐릭터·로고 금지","icon":"shield","tone":"warning"},{"label":"계약서 명시","sublabel":"클라이언트에 AI 사용 고지","icon":"file-text","tone":"muted"}],"caption":"네 가지 안전장치에 'IP 배제'와 '고지'까지 더하면 실무 체크리스트가 완성됩니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 영상 제작: Sora · Runway · Veo와 숏폼 자동화
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'fb2289d4-2769-d76f-0c55-f213a266a1bb', 'ai-video', 'AI 영상 제작: Sora · Runway · Veo와 숏폼 자동화', $aix$2026년 영상 제작의 진입 장벽은 카메라가 아니라 '설계'입니다. 이 강의에서는 Sora, Runway, Google Veo 같은 텍스트-투-비디오 도구의 원리와 한계를 이해하고, 시네마토그래피 언어로 프롬프트를 쓰는 법을 익힙니다. 이어서 스토리보드→클립 생성→캡컷 편집으로 이어지는 제작 워크플로우를 완성하고, 대본→음성→클립→자막을 자동으로 이어붙여 릴스·쇼츠·틱톡에 배포하는 숏폼 자동화 파이프라인까지 설계합니다.$aix$,
  null, 'creative', 'intermediate', array['Sora', 'Runway', 'Google Veo', '숏폼 자동화', 'CapCut']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'fb2289d4-2769-d76f-0c55-f213a266a1bb', 'text-to-video-basics', '텍스트-투-비디오의 이해', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '2e800625-0718-244a-324f-b6c33fd0a71d', 'fb2289d4-2769-d76f-0c55-f213a266a1bb', 'production-workflow', '제작 워크플로우', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '717803d4-4348-4f09-db6f-0c46782b1570', 'fb2289d4-2769-d76f-0c55-f213a266a1bb', 'shortform-automation', '숏폼 자동화', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '65e6c1b4-1ac8-b271-5e30-883e06404fcd', 'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'ai-video/how-video-ai-works', 'how-video-ai-works', '영상 생성 AI의 원리와 한계',
  $aix$텍스트 한 줄이 영상이 되는 마법의 정체는 **노이즈에서 프레임을 조각해내는 확산(Diffusion) 모델**입니다. 원리를 알면 한계도, 우회법도 보입니다.

## 어떻게 만들어지는가

- 프롬프트를 이해한 모델이 **잠재 공간의 노이즈**에서 시작해, 수십 단계에 걸쳐 노이즈를 걷어내며 프레임을 완성합니다.
- 2026년 주력 모델들은 **디퓨전 트랜스포머(DiT)** 구조로, 시간축까지 한 덩어리로 학습해 프레임 간 움직임이 자연스럽습니다.
- Veo, Sora 계열은 **영상과 동기화된 오디오**(대사·효과음)까지 함께 생성합니다.

## 여전히 남은 두 가지 한계

- **물리 일관성** — 모델은 물리 법칙을 '계산'하지 않고 '흉내' 냅니다. 손가락 개수, 액체의 흐름, 화면 밖으로 나갔다 돌아온 물체(객체 영속성)가 자주 무너집니다.
- **길이 제한** — 한 번에 생성되는 클립은 보통 **5~15초**. 긴 영상은 여러 클립을 이어 붙여야 하고, 그래서 '편집 파이프라인'이 필수입니다.

## 실무 감각

한계는 회피 대상이지 극복 대상이 아닙니다. 물리가 무너지기 쉬운 장면(손 클로즈업, 군중)은 피해서 설계하고, 긴 서사는 짧은 클립의 합으로 쪼갭니다.

> 💡 **핵심**: 영상 생성 AI는 "물리 시뮬레이터"가 아니라 "그럴듯함 생성기"입니다. 한계를 아는 사람이 한계 안에서 완성도를 만듭니다.$aix$,
  $aix${"type":"flow","title":"텍스트가 영상이 되기까지","nodes":[{"label":"프롬프트 이해","sublabel":"장면·피사체·카메라 해석","icon":"file-text","tone":"primary"},{"label":"잠재 공간 노이즈","sublabel":"무작위 상태에서 시작","icon":"sparkles","tone":"muted"},{"label":"확산 디노이징","sublabel":"수십 단계 반복으로 프레임 조각","icon":"wand","tone":"accent","edgeLabel":"시간축 포함 한 덩어리로"},{"label":"클립 완성 (5~15초)","sublabel":"오디오 동시 생성 모델도 등장","icon":"video","tone":"success"}],"caption":"물리 법칙은 '계산'이 아니라 '흉내' — 그래서 손·액체·군중이 약점입니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'cedc9990-4f9b-5497-dd9d-5b8fc3506fd3', 'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'ai-video/tool-landscape-2026', 'tool-landscape-2026', '2026 도구 지형도: Sora · Runway · Veo · Pika · Kling',
  $aix$도구가 너무 많아서 못 고르겠다는 말은 이제 핑계입니다. 2026년의 지형도는 **용도별로 뚜렷하게 갈라져** 있습니다.

## 5대 플레이어의 성격

- **Sora (OpenAI)** — 복잡한 장면 연출과 서사 표현이 강점. 소셜 앱과 결합해 '만들고 바로 공유'하는 흐름을 만들었습니다.
- **Runway (Gen 시리즈)** — 크리에이터용 **편집 도구가 가장 성숙**. 모션 브러시, 카메라 컨트롤 등 세밀한 연출 개입이 가능합니다.
- **Google Veo** — **네이티브 오디오 생성**과 프롬프트 충실도가 강점. Flow 등 구글 생태계와의 연결이 매끄럽습니다.
- **Pika** — 빠르고 가벼운 밈·이펙트 특화. 숏폼 감성의 변형 효과가 풍부합니다.
- **Kling (콰이쇼우)** — 가성비와 인물 동작 표현으로 급성장. 대량 생성 파이프라인에서 자주 선택됩니다.

## 선택 기준 3가지

1. **연출 통제력**이 필요하면 → Runway
2. **오디오 포함 완성형 클립**이 필요하면 → Veo, Sora
3. **대량 생산 단가**가 중요하면 → Kling, Pika

## 하나만 기억한다면

도구는 계속 바뀝니다. "어떤 도구가 최고인가"보다 **"내 파이프라인의 어느 단계에 어떤 도구를 꽂는가"**를 기준으로 판단하세요.

> 💡 **핵심**: 2026년의 정답은 단일 도구가 아니라 **조합**입니다 — 연출은 Runway, 완성형은 Veo/Sora, 물량은 Kling/Pika.$aix$,
  $aix${"type":"grid","title":"2026 텍스트-투-비디오 지형도","items":[{"label":"Sora","sublabel":"복잡한 연출 · 소셜 결합","icon":"sparkles","tone":"primary"},{"label":"Runway","sublabel":"연출 통제력 · 편집 도구 성숙","icon":"camera","tone":"primary"},{"label":"Google Veo","sublabel":"네이티브 오디오 · 프롬프트 충실","icon":"music","tone":"accent"},{"label":"Pika","sublabel":"밈 · 이펙트 특화","icon":"zap","tone":"muted"},{"label":"Kling","sublabel":"가성비 · 인물 동작","icon":"users","tone":"muted"},{"label":"선택 기준","sublabel":"통제력 / 오디오 / 단가","icon":"target","tone":"warning"}],"caption":"단일 도구가 아니라 파이프라인 단계별 조합으로 고릅니다."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9c224ef1-348c-8804-82cb-495a2525bdf7', 'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'ai-video/cinematography-prompts', 'cinematography-prompts', '프롬프트의 시네마토그래피: 감독의 언어로 쓰기',
  $aix$"예쁜 노을 영상"이라고 쓰면 모델은 평범한 스톡 영상을 줍니다. 모델이 학습한 것은 **영화 제작 현장의 언어**이기 때문에, 감독처럼 써야 감독의 결과물이 나옵니다.

## 프롬프트에 넣을 4가지 레이어

- **샷 종류** — 와이드 샷 / 미디엄 샷 / 클로즈업 / 오버 더 숄더. 프레임 안에 무엇이 얼마나 담기는지를 결정합니다.
- **카메라 움직임** — 돌리 인(dolly in), 팬(pan), 틸트(tilt), 트래킹 샷, 크레인 샷, 핸드헬드. "천천히(slow)" 같은 속도 부사를 붙이면 안정됩니다.
- **조명** — 골든 아워, 백라이트(역광), 소프트 라이트, 네온, 로우키. 분위기의 8할은 조명 언어가 만듭니다.
- **렌즈·질감** — 35mm 필름 룩, 얕은 심도(shallow depth of field), 아나모픽 등.

## 쓰는 순서

**[샷] + [피사체와 행동] + [배경] + [카메라 움직임] + [조명·질감]** 순으로 한 문장씩. 한 클립에는 **하나의 샷, 하나의 움직임**만 담으세요. 두 개를 섞으면 둘 다 어정쩡해집니다.

## 피해야 할 것

"아름다운, 멋진" 같은 감상 형용사는 자리만 차지합니다. 그 자리에 조명과 렌즈 단어를 넣으세요.

> 💡 **핵심**: 좋은 영상 프롬프트는 소설이 아니라 **콘티 지문**입니다 — 샷·움직임·조명을 기술 용어로 지정하세요.$aix$,
  $aix${"type":"chat","title":"감상 프롬프트 vs 시네마토그래피 프롬프트","messages":[{"role":"user","text":"바닷가에서 달리는 강아지의 아름답고 감동적인 영상"},{"role":"ai","text":"→ 평범한 스톡 영상 느낌의 결과물 (연출 정보 없음)"},{"role":"user","text":"트래킹 샷: 골든 리트리버가 해질녘 해변을 달린다. 로우 앵글, 느린 트래킹, 골든 아워 역광, 얕은 심도, 35mm 필름 룩"},{"role":"ai","text":"→ 카메라가 함께 달리는 영화적 장면 (샷·움직임·조명이 모두 지정됨)"}],"caption":"감상 형용사를 빼고 그 자리에 샷·카메라·조명 용어를 넣으세요."}$aix$::jsonb, $aix${"title":"Runway에서 시네마토그래피 프롬프트 따라하기","app":{"kind":"browser","url":"app.runwayml.com/generate","blocks":[{"id":"b-head","type":"heading","label":"Generate Video — Runway Gen-4"},{"id":"b-prompt","type":"input","label":"샷·피사체·배경 프롬프트 입력…"},{"id":"b-style","type":"input","label":"카메라·조명·질감 옵션 입력…"},{"id":"b-ratio","type":"badge","label":"9:16 · 10초 · Gen-4"},{"id":"b-generate","type":"button","label":"Generate"},{"id":"b-progress","type":"badge","label":"생성 중… 디노이징 45%","hidden":true},{"id":"b-clip1","type":"card","label":"🎬 beach-run_v1.mp4 · 10초","hidden":true},{"id":"b-clip2","type":"card","label":"🎬 beach-run_v2.mp4 · 10초","hidden":true},{"id":"b-play","type":"button","label":"▶ 미리보기 재생","hidden":true}]},"actions":[{"t":"caption","text":"① 샷 종류와 피사체·행동을 먼저 지정합니다"},{"t":"move","target":"b-prompt"},{"t":"click"},{"t":"type","target":"b-prompt","text":"트래킹 샷: 해질녘 해변을 달리는 리트리버"},{"t":"caption","text":"② 감상 형용사 대신 조명·렌즈 언어를 넣습니다"},{"t":"click","target":"b-style"},{"t":"type","target":"b-style","text":"골든 아워 역광, 얕은 심도, 35mm 필름 룩"},{"t":"caption","text":"③ 비율과 길이를 확인하고 생성을 시작합니다"},{"t":"move","target":"b-ratio"},{"t":"click","target":"b-generate"},{"t":"reveal","target":"b-progress"},{"t":"wait","ms":900},{"t":"hide","target":"b-progress"},{"t":"caption","text":"④ 변형 2개를 비교해 베스트를 고릅니다"},{"t":"reveal","target":"b-clip1"},{"t":"reveal","target":"b-clip2"},{"t":"move","target":"b-clip1"},{"t":"dblclick"},{"t":"caption","text":"⑤ 재생하며 물리 붕괴 프레임이 없는지 검수합니다"},{"t":"reveal","target":"b-play"},{"t":"click","target":"b-play"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '29594c0c-deac-0dc7-2095-b6a30752061a', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/storyboard-pipeline', 'storyboard-pipeline', '스토리보드→클립→편집: 파이프라인으로 만들기',
  $aix$클립 한 개는 누구나 뽑습니다. 차이는 **여러 클립을 하나의 영상으로 완성하는 파이프라인**에서 갈립니다. 5~15초 길이 제한이 있는 한, 편집 없는 AI 영상은 없습니다.

## 파이프라인 5단계

1. **대본** — 전체 서사를 씬 단위로 쪼갭니다. 씬 하나 = 클립 하나.
2. **스토리보드** — 씬마다 샷·카메라·조명을 지정한 프롬프트 표를 만듭니다. LLM에게 대본을 주고 표로 변환시키면 빠릅니다.
3. **클립 생성** — 씬별로 생성하되, 씬당 **2~4개 변형**을 뽑아 베스트를 고릅니다.
4. **편집** — 캡컷 등에서 이어 붙이고 자막·음악·트랜지션을 입힙니다.
5. **검수** — 물리 붕괴(손가락, 텍스트 왜곡) 프레임을 걸러냅니다.

## 왜 '표'가 중요한가

스토리보드를 표로 관리하면 실패한 씬만 **골라서 재생성**할 수 있습니다. 프롬프트를 채팅창에 흘려보내면 재현이 불가능합니다.

## 비용 감각

생성 단계가 비용의 대부분입니다. 씬당 변형 개수 × 씬 수가 곧 예산이므로, 스토리보드에서 씬 수를 먼저 확정하고 생성에 들어가세요.

> 💡 **핵심**: AI 영상 제작은 "생성"이 아니라 **"기획→생성→편집" 파이프라인 운영**입니다. 스토리보드 표가 그 파이프라인의 설계도입니다.$aix$,
  $aix${"type":"steps","title":"AI 영상 제작 파이프라인","steps":[{"label":"대본 작성","sublabel":"씬 단위로 분할 (씬 = 클립)","icon":"file-text"},{"label":"스토리보드 표","sublabel":"씬별 샷·카메라·조명 프롬프트","icon":"clipboard"},{"label":"클립 생성","sublabel":"씬당 2~4개 변형 → 베스트 선택","icon":"video"},{"label":"편집·검수","sublabel":"이어붙이기 + 물리 붕괴 프레임 제거","icon":"scissors"}],"caption":"표로 관리하면 실패한 씬만 골라 재생성할 수 있습니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'fc130973-c645-e350-7503-e4f8cbc28b07', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/image-to-video-consistency', 'image-to-video-consistency', '이미지-투-비디오: 일관성을 지키는 기술',
  $aix$클립을 이어 붙였더니 주인공 얼굴이 씬마다 다르다면, 시청자는 3초 안에 이탈합니다. 일관성 문제의 표준 해법이 **이미지-투-비디오(I2V)**입니다.

## 텍스트에서 바로 뽑으면 안 되는 이유

텍스트-투-비디오는 매 생성이 **복권 추첨**입니다. 같은 프롬프트라도 인물·소품·색감이 매번 달라집니다. 반면 I2V는 **시작 프레임을 고정**하므로, 그 프레임 안의 정체성이 클립 전체에 유지됩니다.

## 일관성 워크플로우 3단계

1. **캐릭터 시트 확보** — 이미지 생성 AI로 주인공의 기준 이미지를 만들고, 레퍼런스 기능(캐릭터 고정)으로 다양한 각도·의상을 뽑습니다.
2. **씬별 키프레임 생성** — 스토리보드의 각 씬을 **정지 이미지**로 먼저 만듭니다. 이미지는 영상보다 싸고 빠르니, 여기서 충분히 고릅니다.
3. **키프레임 → I2V 변환** — 확정된 이미지를 시작 프레임으로 넣고, 프롬프트에는 **움직임만** 지시합니다. Runway·Kling·Veo 모두 시작/끝 프레임 지정을 지원합니다.

## 보너스: 끝 프레임 연결

앞 클립의 마지막 프레임을 다음 클립의 시작 프레임으로 쓰면, 클립 경계가 자연스럽게 이어집니다.

> 💡 **핵심**: 일관성은 프롬프트가 아니라 **이미지로 고정**합니다. "이미지에서 정체성, 프롬프트에서 움직임" — 이 분업이 I2V의 공식입니다.$aix$,
  $aix${"type":"flow","title":"일관성을 지키는 I2V 워크플로우","nodes":[{"label":"캐릭터 시트","sublabel":"기준 이미지 + 각도·의상 변형","icon":"user","tone":"primary"},{"label":"씬별 키프레임","sublabel":"정지 이미지로 먼저 확정 (싸고 빠름)","icon":"image","tone":"accent","edgeLabel":"레퍼런스로 캐릭터 고정"},{"label":"I2V 변환","sublabel":"이미지 = 정체성, 프롬프트 = 움직임","icon":"play","tone":"primary","edgeLabel":"시작 프레임으로 입력"},{"label":"클립 연결","sublabel":"끝 프레임 → 다음 클립 시작 프레임","icon":"link","tone":"success"}],"loopBack":{"from":3,"to":1,"label":"다음 씬 반복"},"caption":"텍스트-투-비디오는 복권, 이미지-투-비디오는 설계입니다."}$aix$::jsonb, null, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '104b7c4b-d2db-fc7e-958c-e14b9ac74d98', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/capcut-editing', 'capcut-editing', '캡컷 연동 편집: 자막·템포·트랜지션',
  $aix$생성된 클립은 재료일 뿐, 시청 완주율을 만드는 것은 **편집**입니다. 숏폼 편집의 사실상 표준인 캡컷(CapCut)에서 챙길 것은 딱 세 가지입니다.

## 1. 자막 — 자동 캡션 + 강조

- 숏폼의 **대다수가 무음으로 시청**됩니다. 자막은 옵션이 아니라 본체입니다.
- 캡컷의 **자동 캡션**으로 음성을 받아쓰고, 키워드에만 색·크기 강조를 넣습니다. 문장 전체 강조는 강조가 아닙니다.

## 2. 템포 — 컷의 리듬

- 숏폼의 컷 길이는 **2~4초**가 기본입니다. AI 클립이 8초라면 가장 좋은 구간만 잘라 쓰세요.
- 음악의 **비트에 컷을 스냅**시키면(비트 싱크) 같은 재료도 완성도가 다르게 느껴집니다.
- 늘어지는 구간은 1.2~1.5배속 처리로 템포를 살립니다.

## 3. 트랜지션 — 절제가 실력

- 기본은 **하드 컷**입니다. 화려한 전환 효과는 씬의 성격이 바뀌는 지점에만 씁니다.
- AI 클립 경계의 어색함은 트랜지션으로 가리기보다, **컷 타이밍을 비트에 맞춰** 자연스럽게 넘기는 편이 낫습니다.

## 재사용 가능한 템플릿

자막 스타일·인트로·아웃트로를 한 번 만들어 **템플릿으로 저장**하면, 다음 영상부터 편집 시간이 절반으로 줄어듭니다.

> 💡 **핵심**: 편집의 우선순위는 **자막 > 템포 > 트랜지션**입니다. 화려함이 아니라 리듬이 완주율을 만듭니다.$aix$,
  $aix${"type":"grid","title":"캡컷 편집 체크리스트","items":[{"label":"자동 캡션","sublabel":"무음 시청 대비 · 키워드만 강조","icon":"message","tone":"primary"},{"label":"컷 템포","sublabel":"컷 길이 2~4초 유지","icon":"scissors","tone":"accent"},{"label":"비트 싱크","sublabel":"음악 비트에 컷을 스냅","icon":"music","tone":"accent"},{"label":"하드 컷 기본","sublabel":"전환 효과는 씬 전환에만","icon":"zap","tone":"muted"},{"label":"배속 조절","sublabel":"늘어지는 구간 1.2~1.5배속","icon":"gauge","tone":"muted"},{"label":"템플릿 저장","sublabel":"자막·인트로 재사용","icon":"layers","tone":"success"}],"caption":"우선순위는 자막 > 템포 > 트랜지션 — 리듬이 완주율을 만듭니다."}$aix$::jsonb, $aix${"title":"캡컷 타임라인 편집 따라하기","app":{"kind":"design-canvas","windowTitle":"숏폼 시퀀스 편집 — CapCut","tools":[{"id":"tool-select","icon":"target","label":"선택"},{"id":"tool-cut","icon":"scissors","label":"분할"},{"id":"tool-text","icon":"file-text","label":"텍스트"},{"id":"tool-music","icon":"music","label":"오디오"}],"objects":[{"id":"preview","shape":"frame","label":"미리보기 (9:16)","x":8,"y":8,"w":34,"h":44},{"id":"sub-text","shape":"text","label":"3가지만 기억하세요","x":12,"y":40,"w":26,"h":6,"hidden":true},{"id":"sub-style","shape":"text","label":"강조: 키워드만 노랑 · 120%","x":12,"y":14,"w":26,"h":6,"color":"#f59e0b","hidden":true},{"id":"timeline","shape":"frame","label":"타임라인","x":8,"y":58,"w":84,"h":34},{"id":"clip-hook","shape":"rect","label":"훅 3초","x":10,"y":66,"w":16,"h":12,"color":"#ec4899"},{"id":"clip-cta","shape":"rect","label":"CTA 4초","x":28,"y":66,"w":16,"h":12,"color":"#f59e0b"},{"id":"clip-body","shape":"rect","label":"전개 8초","x":46,"y":66,"w":26,"h":12,"color":"#8b5cf6"},{"id":"clip-cta-end","shape":"rect","label":"CTA 4초","x":74,"y":66,"w":16,"h":12,"color":"#f59e0b","hidden":true},{"id":"cut-mark","shape":"ellipse","x":58,"y":63,"w":3,"h":3,"color":"#22d3ee","hidden":true}]},"actions":[{"t":"caption","text":"① 생성한 클립들을 타임라인에서 확인합니다"},{"t":"move","target":"clip-hook"},{"t":"click"},{"t":"move","target":"clip-body"},{"t":"caption","text":"② 순서가 어긋난 CTA 클립을 맨 뒤로 옮깁니다"},{"t":"click","target":"clip-cta"},{"t":"drag","from":"clip-cta","to":"clip-cta-end","ms":1000},{"t":"hide","target":"clip-cta"},{"t":"reveal","target":"clip-cta-end"},{"t":"wait","ms":500},{"t":"caption","text":"③ 텍스트 도구로 훅 자막을 얹습니다"},{"t":"click","target":"tool-text"},{"t":"click","target":"preview"},{"t":"type","target":"sub-text","text":"3가지만 기억하세요"},{"t":"caption","text":"④ 문장 전체가 아니라 키워드만 강조합니다"},{"t":"dblclick","target":"sub-text"},{"t":"reveal","target":"sub-style"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 분할 도구로 비트에 맞춰 컷을 나눕니다"},{"t":"click","target":"tool-cut"},{"t":"move","target":"clip-body"},{"t":"click"},{"t":"reveal","target":"cut-mark"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f551a4c9-5941-0ece-03c6-d67b9a44c921', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/shortform-formula', 'shortform-formula', '숏폼의 공식: 훅 3초와 구조 설계',
  $aix$숏폼은 시청자가 '선택'하는 매체가 아니라 알고리즘이 '배달'하는 매체입니다. 그래서 승부는 **스크롤을 멈추게 하는 첫 3초**에서 끝납니다.

## 훅 3초의 법칙

- 첫 3초 이탈률이 영상 전체의 노출량을 결정합니다. 알고리즘은 초반 이탈을 가장 무겁게 봅니다.
- 훅의 4가지 정석: **질문형**("이거 아직도 모르세요?"), **결과 선공개**(완성본을 먼저 보여주기), **패턴 파괴**(예상 밖 비주얼), **숫자 약속**("3가지만 기억하세요").
- AI 영상의 강점: 현실에서 못 찍는 **비현실적 비주얼**이 그 자체로 패턴 파괴 훅이 됩니다.

## 검증된 시간 구조

- **0~3초 훅** — 멈추게 한다
- **3~25초 전개** — 약속한 내용을 빠른 템포로 전달, 5~7초마다 화면 변화
- **25~40초 반전·클라이맥스** — 완주할 이유
- **마지막 5초 CTA** — 팔로우·댓글 유도, 또는 **루프 연결**(끝이 처음으로 자연스럽게 이어지면 반복 재생이 시청 시간을 올립니다)

## 공식이 곧 자동화의 설계도

이 구조가 고정되어 있기 때문에 자동화가 가능합니다. 다음 레슨에서 이 구조를 파이프라인 코드로 옮깁니다.

> 💡 **핵심**: 숏폼은 창의력 승부이기 전에 **구조 승부**입니다. 훅→전개→반전→CTA 구조를 고정하면, 나머지는 자동화할 수 있습니다.$aix$,
  $aix${"type":"stack","title":"숏폼 60초의 구조 (위 = 시작)","layers":[{"label":"훅 (0~3초)","sublabel":"질문 · 결과 선공개 · 패턴 파괴","icon":"zap","tone":"warning"},{"label":"전개 (3~25초)","sublabel":"빠른 템포 · 5~7초마다 화면 변화","icon":"play","tone":"primary"},{"label":"반전·클라이맥스 (25~40초)","sublabel":"완주할 이유 제공","icon":"sparkles","tone":"accent"},{"label":"CTA·루프 (마지막 5초)","sublabel":"팔로우 유도 또는 처음으로 연결","icon":"repeat","tone":"success"}],"caption":"첫 3초 이탈률이 전체 노출량을 결정합니다 — 훅에 예산의 절반을 쓰세요."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ac30a314-b972-15c7-64b8-0ea84b2ae608', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/automation-pipeline', 'automation-pipeline', '자동화 파이프라인: 대본→음성→클립→자막',
  $aix$매일 1개씩 올리는 채널을 손으로 운영하면 반드시 지칩니다. 숏폼 제작을 **4단계 자동 파이프라인**으로 옮기면, 사람은 기획과 검수만 하면 됩니다.

## 파이프라인 4단계

1. **대본 생성** — LLM API에 주제를 주고 "훅→전개→반전→CTA" 구조의 대본을 JSON으로 받습니다. 씬별 프롬프트까지 함께 생성시킵니다.
2. **음성 합성(TTS)** — ElevenLabs 등으로 대본을 내레이션으로 변환합니다. 음성 길이가 확정되면 **씬별 필요한 클립 길이도 확정**됩니다.
3. **클립 생성** — 씬별 프롬프트를 영상 생성 API(Runway·Kling 등)에 병렬로 요청합니다. 대량 생산에는 단가가 중요하므로 도구 선택이 여기서 갈립니다.
4. **조립과 자막** — FFmpeg 또는 캡컷으로 클립+음성을 붙이고, STT 타임스탬프로 자막을 얹습니다.

## 설계의 핵심 원칙

- **중간 산출물을 파일로 저장** — 대본 JSON, 음성 mp3, 클립 mp4를 단계별로 남기면 실패한 단계만 재실행할 수 있습니다.
- **사람의 검수 관문은 두 곳** — 대본 확정 직후(방향 검수)와 업로드 직전(품질 검수). 전 과정 무검수 자동화는 채널 품질을 무너뜨립니다.

> 💡 **핵심**: 자동화의 목표는 "사람 제거"가 아니라 **반복 노동 제거**입니다. 기획과 검수에만 사람을 남기고, 나머지는 파이프라인에 맡기세요.$aix$,
  $aix${"type":"terminal","windowTitle":"shortform-pipeline — 1회 실행 로그","lines":[{"text":"python pipeline.py --topic '우주에서 가장 추운 곳'","tone":"cmd"},{"text":"[1/4] 대본 생성 (LLM) ... script.json 저장","tone":"out"},{"text":"      훅/전개/반전/CTA · 씬 6개 · 프롬프트 포함","tone":"dim"},{"text":"# 사람 검수: 대본 방향 승인","tone":"comment"},{"text":"[2/4] TTS 합성 ... voice.mp3 (42.3초)","tone":"out"},{"text":"[3/4] 클립 생성 6건 병렬 요청 ...","tone":"out"},{"text":"      scene_04 실패 → 해당 씬만 재시도 ✓","tone":"dim"},{"text":"[4/4] FFmpeg 조립 + STT 자막 ... final.mp4","tone":"out"},{"text":"✓ 완료 (총 11분) — 업로드 전 품질 검수 대기","tone":"ok"}],"caption":"중간 산출물을 파일로 남기면 실패한 단계만 재실행할 수 있습니다."}$aix$::jsonb, $aix${"title":"Make에서 숏폼 자동화 시나리오 따라하기","app":{"kind":"automation-canvas","windowTitle":"숏폼 자동 제작 파이프라인 — Make","nodes":[{"id":"n-script","icon":"file-text","label":"대본 생성","sublabel":"LLM · 훅→전개→CTA","tone":"accent"},{"id":"n-tts","icon":"mic","label":"음성 합성","sublabel":"ElevenLabs TTS","hidden":true},{"id":"n-clip","icon":"video","label":"클립 생성","sublabel":"Runway · 씬별 병렬","hidden":true},{"id":"n-caption","icon":"message","label":"조립·자막","sublabel":"FFmpeg + STT","hidden":true},{"id":"n-review","icon":"eye","label":"품질 검수","sublabel":"사람 관문","tone":"warning","hidden":true},{"id":"n-upload","icon":"upload","label":"예약 업로드","sublabel":"릴스·쇼츠·틱톡","tone":"success","hidden":true}],"runLog":[{"id":"log1","text":"▶ 시나리오 실행 — 주제: 우주에서 가장 추운 곳","tone":"out","hidden":true},{"id":"log2","text":"✓ 대본 script.json 저장 (씬 6개)","tone":"ok","hidden":true},{"id":"log3","text":"✓ 음성 voice.mp3 합성 (42.3초)","tone":"ok","hidden":true},{"id":"log4","text":"✓ 클립 6건 생성 — scene_04 재시도 성공","tone":"ok","hidden":true},{"id":"log5","text":"✓ final.mp4 조립 완료 — 품질 검수 대기","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 시작 노드는 LLM 대본 생성입니다"},{"t":"move","target":"n-script"},{"t":"click"},{"t":"caption","text":"② 음성→클립→자막 노드를 차례로 잇습니다"},{"t":"reveal","target":"n-tts"},{"t":"move","target":"n-tts"},{"t":"reveal","target":"n-clip"},{"t":"move","target":"n-clip"},{"t":"reveal","target":"n-caption"},{"t":"wait","ms":400},{"t":"caption","text":"③ 업로드 직전에 사람 검수 관문을 둡니다"},{"t":"reveal","target":"n-review"},{"t":"move","target":"n-review"},{"t":"click"},{"t":"reveal","target":"n-upload"},{"t":"wait","ms":500},{"t":"caption","text":"④ 시나리오를 실행해 단계별 로그를 확인합니다"},{"t":"reveal","target":"log1"},{"t":"reveal","target":"log2"},{"t":"reveal","target":"log3"},{"t":"reveal","target":"log4"},{"t":"caption","text":"⑤ 검수만 통과하면 3개 플랫폼에 자동 배포됩니다"},{"t":"reveal","target":"log5"},{"t":"move","target":"n-upload"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '650017c5-feac-90aa-e608-9fc330be3387', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/platform-optimization', 'platform-optimization', '플랫폼별 최적화: 릴스 · 쇼츠 · 틱톡',
  $aix$같은 영상을 세 플랫폼에 그대로 복사해 올리면 세 곳 모두에서 어중간해집니다. 알고리즘과 시청 문화가 다르기 때문에 **배포 단계에서 변형**이 필요합니다.

## 플랫폼별 성격

- **틱톡** — 트렌드 반응 속도가 생명. 유행 사운드·챌린지 결합이 노출에 직결되고, 날것의 감성이 잘 통합니다.
- **유튜브 쇼츠** — **검색과 구독 자산**으로 쌓입니다. 제목·해시태그의 키워드가 중요하고, 쇼츠에서 롱폼으로 유입시키는 구조를 짤 수 있습니다.
- **인스타 릴스** — 비주얼 완성도와 톤 일관성이 중요합니다. 피드 그리드와 어울리는 커버 이미지, 공유(DM 전송)를 부르는 콘텐츠가 강합니다.

## 자동화 파이프라인의 배포 분기

- 공통 마스터 영상(9:16, 안전 영역 준수)을 만들고, 플랫폼별로 **제목·해시태그·커버·사운드만 분기**합니다.
- 각 플랫폼 API·예약 도구로 업로드를 스케줄링하되, **워터마크가 남은 영상의 교차 업로드는 노출 불이익**이 있으니 원본 파일로 각각 올립니다.

## 업로드 전략

- 타깃 시청자의 활동 시간대에 예약 업로드, 초기 1시간 반응이 확산을 결정합니다.
- 처음에는 **한 플랫폼에 집중**해 공식을 찾고, 검증된 뒤에 3개 동시 배포로 확장하세요.

> 💡 **핵심**: "하나 만들어 셋에 뿌리기"가 아니라 **"하나의 마스터, 셋의 변형"**입니다. 분기 지점은 제목·해시태그·커버·사운드입니다.$aix$,
  $aix${"type":"compare","title":"3대 숏폼 플랫폼 비교","columns":[{"title":"틱톡","icon":"music","tone":"primary","items":["트렌드 반응 속도가 생명","유행 사운드·챌린지 결합","날것의 감성 선호"]},{"title":"유튜브 쇼츠","icon":"play","tone":"accent","items":["검색·구독 자산으로 축적","제목·해시태그 키워드 중요","롱폼 유입 구조 설계 가능"]},{"title":"인스타 릴스","icon":"camera","tone":"success","items":["비주얼 완성도·톤 일관성","커버 이미지가 그리드 자산","공유(DM)를 부르는 콘텐츠"]}],"caption":"마스터 영상은 하나, 제목·해시태그·커버·사운드는 플랫폼별 분기."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '219d35af-bcc2-f597-3293-86d70c5bb92f', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/operate-and-improve', 'operate-and-improve', '운영 사이클: 데이터로 다음 영상을 만들기',
  $aix$자동화 파이프라인의 진짜 힘은 '많이 만드는 것'이 아니라 **빨리 배우는 것**입니다. 업로드는 끝이 아니라 다음 영상을 위한 데이터 수집의 시작입니다.

## 봐야 할 지표는 두 개뿐

- **3초 유지율(훅 성과)** — 첫 3초를 넘긴 비율. 낮으면 훅과 커버를 바꿉니다.
- **완주율(구조 성과)** — 끝까지 본 비율. 특정 구간에서 이탈이 몰리면 그 구간의 템포·내용이 범인입니다.

조회수는 결과 지표일 뿐, 개선의 단서는 위 두 지표의 **유지율 그래프**에 있습니다.

## 주간 개선 사이클

1. **기획** — 지난주 상위 20% 영상의 공통점(주제·훅 유형·길이)을 추립니다.
2. **대량 생성** — 파이프라인으로 변형을 여러 개 만듭니다. 훅만 다른 A/B 버전이 특히 유효합니다.
3. **배포** — 예약 업로드로 꾸준한 주기를 유지합니다.
4. **분석** — 3초 유지율과 완주율을 기록하고, 다음 주 기획에 반영합니다.

## 자동화이기에 가능한 실험량

손 제작이면 주 2편으로 배우지만, 파이프라인이면 주 10편으로 배웁니다. **실험 횟수 자체가 경쟁력**입니다. 단, 품질 검수 관문은 끝까지 유지하세요 — 저품질 대량 업로드는 채널 신뢰도를 깎습니다.

> 💡 **핵심**: 숏폼 채널 운영은 기획→생성→배포→분석의 **루프**입니다. 자동화는 이 루프의 회전 속도를 높이는 장치입니다.$aix$,
  $aix${"type":"cycle","title":"숏폼 운영 사이클","center":"주 단위로 회전","nodes":[{"label":"기획","sublabel":"상위 20% 영상의 공통점 추출","icon":"lightbulb"},{"label":"대량 생성","sublabel":"파이프라인 · 훅 A/B 변형","icon":"workflow"},{"label":"배포","sublabel":"예약 업로드 · 주기 유지","icon":"upload"},{"label":"분석","sublabel":"3초 유지율 · 완주율","icon":"chart"}],"caption":"조회수가 아니라 3초 유지율과 완주율이 다음 영상의 설계도입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 음악과 더빙: Suno & ElevenLabs
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'c9d90d0a-539d-878d-53a0-cd5fbc6a4ed2', 'ai-audio', 'AI 음악과 더빙: Suno & ElevenLabs', $aix$영상의 완성도는 결국 소리가 결정합니다. 이 강의에서는 Suno로 콘텐츠에 꼭 맞는 BGM을 만들고, ElevenLabs로 자연스러운 AI 내레이션과 다국어 더빙을 입히는 전 과정을 다룹니다. 스타일 태그 프롬프트, 보이스 클로닝과 윤리, 감정·톤 제어, 레벨 밸런스와 덕킹, 그리고 2026년 기준 저작권·플랫폼 정책까지 — 음악 지식이 없어도 따라올 수 있게 단계별로 안내합니다.$aix$,
  null, 'creative', 'beginner', array['Suno', 'ElevenLabs', 'AI 음악', 'AI 더빙', '사운드 디자인']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'c9d90d0a-539d-878d-53a0-cd5fbc6a4ed2', 'suno-music', 'Suno로 음악 만들기', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'c9d90d0a-539d-878d-53a0-cd5fbc6a4ed2', 'elevenlabs-voice', 'ElevenLabs로 음성 만들기', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'a7c86bcd-9639-11de-3642-91f5870b3aac', 'c9d90d0a-539d-878d-53a0-cd5fbc6a4ed2', 'sound-pipeline', '사운드 통합 파이프라인', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1d19ad25-2ff7-33ae-a390-e16a62dd0d08', 'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'ai-audio/how-music-ai-works', 'how-music-ai-works', '음악 생성 AI의 원리와 Suno 시작하기',
  $aix$작곡을 배운 적 없어도, 이제 문장 하나로 3분짜리 곡을 만들 수 있습니다. 원리를 알면 프롬프트가 달라집니다.

## 텍스트가 음악이 되는 과정

음악 생성 AI는 수백만 곡을 학습해 **"이런 설명이면 이런 소리"**라는 패턴을 익혔습니다.

- 프롬프트는 장르·무드·악기 같은 **음악적 특징**으로 해석됩니다.
- 모델이 그 특징에 맞는 오디오를 처음부터 생성합니다 — 기존 곡을 잘라 붙이는 것이 아닙니다.
- 그래서 프롬프트에 **음악을 설명하는 언어**를 쓸수록 결과가 정확해집니다.

## Suno 첫 곡 만들기

- suno.com 가입 후 **Create** 탭에서 시작합니다. 무료 크레딧으로 하루 몇 곡 생성 가능합니다.
- **Simple 모드**: 한 문장 설명만으로 가사·작곡을 전부 AI가 처리합니다.
- **Custom 모드**: 스타일과 가사를 분리 입력합니다 — 이 강의는 주로 이 모드를 씁니다.
- 한 번에 곡이 2개씩 생성되니, 마음에 드는 쪽을 **Extend**로 이어서 발전시키세요.

> 💡 **핵심**: 음악 생성 AI는 '설명 → 특징 → 소리'로 변환하는 기계입니다. 좋은 곡은 좋은 설명에서 나옵니다.$aix$,
  $aix${"type":"flow","title":"텍스트가 곡이 되기까지","nodes":[{"label":"프롬프트 입력","sublabel":"\"lo-fi, 따뜻한, 새벽 감성\"","icon":"file-text","tone":"primary"},{"label":"음악적 특징으로 해석","sublabel":"장르 · 무드 · 악기 · 템포","icon":"brain","tone":"accent"},{"label":"오디오 생성","sublabel":"곡 2개가 동시에 생성됨","icon":"music","tone":"success"},{"label":"선택 · 발전","sublabel":"Extend로 이어 만들기","icon":"wand","tone":"muted","edgeLabel":"마음에 드는 쪽만"}],"loopBack":{"from":3,"to":0,"label":"프롬프트 수정 후 재생성"},"caption":"한 번에 완성이 아니라 '생성 → 선택 → 수정'을 반복하는 과정입니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '881829d2-07b4-c4bf-7bab-d1274bdeef49', 'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'ai-audio/style-tags-and-lyrics', 'style-tags-and-lyrics', '스타일 태그와 가사 프롬프트: 음악을 설명하는 언어',
  $aix$"신나는 노래"라고 쓰면 AI도 감으로 만듭니다. 원하는 소리를 얻으려면 **네 가지 축의 언어**가 필요합니다.

## 스타일 태그의 4축

- **장르**: lo-fi hip hop, synthwave, acoustic folk, corporate pop — 장르가 소리의 뼈대입니다.
- **무드**: uplifting, dreamy, tense, warm — 형용사 1~2개면 충분합니다.
- **악기**: soft piano, punchy drums, warm bass — 넣을 것과 **뺄 것**(no vocals)을 모두 지정하세요.
- **BPM/에너지**: 90 BPM, slow build, energetic — 템포는 영상 편집 리듬과 직결됩니다.

네 축을 쉼표로 나열하는 것이 기본형입니다: `lo-fi hip hop, dreamy, soft piano, 80 BPM, no vocals`

## 가사 프롬프트와 구조 태그

Custom 모드의 가사 칸에서는 **대괄호 구조 태그**로 곡의 전개를 지휘합니다.

- `[Intro]` `[Verse]` `[Chorus]` `[Bridge]` `[Outro]` — 섹션 구분
- `[Instrumental]` — 가사 없는 연주 구간
- 훅(후렴)은 짧고 반복적으로 쓰는 것이 AI 보컬에 잘 맞습니다.

## 자주 하는 실수

- 장르를 5개씩 섞으면 정체불명의 곡이 나옵니다 — **장르는 1~2개**로.
- 아티스트 실명은 정책상 무시되거나 차단됩니다. 이름 대신 **소리를 묘사**하세요.

> 💡 **핵심**: 스타일 태그 = 장르 + 무드 + 악기 + BPM. 이 네 축만 채우면 프롬프트의 80%는 완성입니다.$aix$,
  $aix${"type":"chat","title":"스타일 프롬프트 개선 예시","messages":[{"role":"user","text":"신나는 노래 만들어줘"},{"role":"ai","text":"장르·무드·악기·BPM이 없어 임의로 생성합니다 → 매번 다른 결과"},{"role":"user","text":"upbeat synthwave, retro, punchy drums, analog synth, 118 BPM, no vocals"},{"role":"ai","text":"4축이 모두 지정됨 → 의도한 소리를 재현 가능하게 생성"}],"caption":"막연한 형용사 대신 음악을 설명하는 4축 언어를 쓰세요."}$aix$::jsonb, $aix${"title":"Suno에서 스타일 태그로 BGM 만들기 따라하기","app":{"kind":"browser","url":"app.suno.ai/create","blocks":[{"id":"h1","type":"heading","label":"Create"},{"id":"badge-mode","type":"badge","label":"Custom 모드"},{"id":"lbl-style","type":"text","label":"스타일 프롬프트 (Styles)"},{"id":"in-style","type":"input","label":"장르, 무드, 악기, BPM을 쉼표로 입력…"},{"id":"lbl-lyrics","type":"text","label":"가사 (Lyrics) — 구조 태그 사용 가능"},{"id":"in-lyrics","type":"input","label":"[Verse] [Chorus] 구조 태그 입력…"},{"id":"btn-create","type":"button","label":"Create"},{"id":"badge-gen","type":"badge","label":"생성 중… 곡 2개를 만들고 있습니다","hidden":true},{"id":"card-1","type":"card","label":"🎵 새벽 감성 lo-fi — v1 (2:58)","hidden":true},{"id":"card-2","type":"card","label":"🎵 새벽 감성 lo-fi — v2 (3:04)","hidden":true},{"id":"btn-extend","type":"button","label":"Extend — 이어서 발전시키기","hidden":true}]},"actions":[{"t":"caption","text":"① Custom 모드에서 스타일 입력창을 클릭합니다"},{"t":"move","target":"in-style"},{"t":"click"},{"t":"caption","text":"② 장르·무드·악기·BPM, 4축 언어로 스타일을 적습니다"},{"t":"type","target":"in-style","text":"lo-fi, dreamy, piano, 80 BPM, no vocals"},{"t":"wait","ms":400},{"t":"caption","text":"③ 가사 칸에는 대괄호 구조 태그로 전개를 지정합니다"},{"t":"click","target":"in-lyrics"},{"t":"type","target":"in-lyrics","text":"[Intro] [Verse] [Chorus] [Outro]"},{"t":"caption","text":"④ Create를 눌러 생성을 시작합니다"},{"t":"move","target":"btn-create"},{"t":"click"},{"t":"reveal","target":"badge-gen"},{"t":"wait","ms":800},{"t":"hide","target":"badge-gen"},{"t":"caption","text":"⑤ 동시에 생성된 곡 2개를 비교해 마음에 드는 쪽을 고릅니다"},{"t":"reveal","target":"card-1"},{"t":"reveal","target":"card-2"},{"t":"move","target":"card-2"},{"t":"click"},{"t":"caption","text":"⑥ Extend로 고른 곡을 이어서 발전시킵니다"},{"t":"reveal","target":"btn-extend"},{"t":"move","target":"btn-extend"},{"t":"click"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4e6a1ad9-ce46-2427-1972-701552dd6cd9', 'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'ai-audio/bgm-by-purpose', 'bgm-by-purpose', '콘텐츠 용도별 BGM 제작: 인트로·브이로그·광고',
  $aix$좋은 BGM의 기준은 '좋은 곡'이 아니라 **'영상에 맞는 곡'**입니다. 용도가 다르면 설계 공식이 다릅니다.

## 유튜브 인트로: 5초 안에 각인

- 길이 5~15초, **즉시 임팩트** — 빌드업 없이 훅으로 시작해야 합니다.
- 프롬프트 키워드: `short intro jingle, catchy, energetic, instant hook`
- 채널마다 같은 인트로를 반복 사용해 **사운드 로고**로 만드세요.

## 브이로그: 존재감을 지운 배경

- 목소리를 방해하지 않는 것이 최우선 — `no vocals`는 필수입니다.
- 프롬프트 키워드: `chill lo-fi, warm acoustic, mellow, steady rhythm`
- 급격한 전개가 없는 **일정한 에너지**의 곡이 편집 컷에 강합니다.

## 광고: 15~30초 안에 감정 곡선

- 도입(호기심) → 상승(기대) → 클라이맥스(메시지)의 **에너지 설계**가 핵심입니다.
- 프롬프트 키워드: `uplifting corporate pop, building energy, bright, climactic ending`
- 제품 등장 타이밍에 클라이맥스가 오도록 편집점을 역산하세요.

> 💡 **핵심**: BGM 프롬프트는 곡 설명이 아니라 **영상의 역할 설명**에서 출발합니다 — "이 소리가 시청자에게 무엇을 시키는가"를 먼저 정하세요.$aix$,
  $aix${"type":"compare","title":"용도별 BGM 설계 공식","columns":[{"title":"인트로","icon":"zap","tone":"primary","items":["5~15초","즉시 훅, 빌드업 없음","채널 사운드 로고화","energetic · catchy"]},{"title":"브이로그","icon":"camera","tone":"accent","items":["목소리가 주인공","no vocals 필수","일정한 에너지 유지","chill · mellow"]},{"title":"광고","icon":"trending-up","tone":"success","items":["15~30초","도입→상승→클라이맥스","제품 등장 = 절정","uplifting · climactic"]}],"caption":"같은 Suno라도 용도에 따라 길이·에너지 곡선·보컬 여부가 달라집니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f5d3735f-c505-55f5-34f0-d406dbc15989', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/tts-basics', 'tts-basics', 'TTS 기초와 보이스 선택',
  $aix$AI 음성의 품질은 절반이 **보이스 선택**에서 결정됩니다. 좋은 원고도 안 맞는 목소리로 읽으면 어색해집니다.

## TTS가 자연스러워진 이유

- 최신 TTS는 글자를 소리로 바꾸는 게 아니라 **문맥을 이해하고 연기**합니다 — 같은 "네"도 상황에 따라 다르게 읽습니다.
- ElevenLabs는 2026년 기준 다국어 표현력에서 가장 널리 쓰이는 서비스이며, 한국어 품질도 실사용 수준입니다.

## 보이스 고르는 순서

1. **Voice Library**에서 콘텐츠 언어로 필터링합니다.
2. 성별·연령대보다 **톤 태그**(calm, energetic, narrative)를 먼저 봅니다.
3. 실제 원고의 **첫 문단**으로 시험 생성합니다 — 샘플 문장과 내 원고는 다르게 들립니다.
4. 후보 2~3개를 같은 원고로 비교한 뒤 하나를 채널 고정 보이스로 삼습니다.

## 핵심 설정 두 가지

- **Stability**: 낮추면 감정 기복이 풍부해지고, 높이면 일정하고 안정적입니다. 내레이션은 중간~높게.
- **Similarity**: 원본 보이스 특성 유지 강도입니다. 과하게 높이면 잡음까지 재현될 수 있습니다.

> 💡 **핵심**: 샘플 듣고 고르지 말고 **내 원고로 시험**해서 고르세요. 그리고 한 채널엔 한 보이스 — 목소리가 곧 브랜드입니다.$aix$,
  $aix${"type":"steps","title":"보이스 선택 4단계","steps":[{"label":"언어로 필터","sublabel":"Voice Library에서 한국어 지원 확인","icon":"globe"},{"label":"톤 태그 확인","sublabel":"calm · energetic · narrative","icon":"filter"},{"label":"내 원고로 시험","sublabel":"샘플 문장 말고 실제 첫 문단으로","icon":"mic"},{"label":"채널 고정 보이스 확정","sublabel":"후보 2~3개 비교 후 하나로","icon":"check"}],"caption":"목소리는 채널의 브랜드 자산 — 한 번 정하면 유지하세요."}$aix$::jsonb, $aix${"title":"ElevenLabs에서 보이스 시험 생성 따라하기","app":{"kind":"browser","url":"elevenlabs.io/text-to-speech","blocks":[{"id":"h1","type":"heading","label":"Text to Speech"},{"id":"lbl-lib","type":"text","label":"Voice Library — 한국어 필터 적용됨"},{"id":"voice-1","type":"card","label":"🎙️ 지호 — calm · narrative"},{"id":"voice-2","type":"card","label":"🎙️ 세라 — energetic · bright"},{"id":"badge-sel","type":"badge","label":"선택됨: 지호 (내레이션용)","hidden":true},{"id":"in-script","type":"input","label":"실제 원고의 첫 문단을 입력하세요…"},{"id":"lbl-stab","type":"text","label":"Stability: 중간~높음 (내레이션 권장)"},{"id":"btn-gen","type":"button","label":"Generate"},{"id":"card-audio","type":"card","label":"🔊 내레이션_시험.mp3 (0:14)","hidden":true},{"id":"btn-dl","type":"button","label":"다운로드","hidden":true}]},"actions":[{"t":"caption","text":"① Voice Library에서 한국어 보이스 후보를 비교합니다"},{"t":"move","target":"voice-1"},{"t":"click"},{"t":"move","target":"voice-2"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 톤 태그를 보고 내레이션용 보이스를 확정합니다"},{"t":"click","target":"voice-1"},{"t":"reveal","target":"badge-sel"},{"t":"wait","ms":400},{"t":"caption","text":"③ 샘플 문장 대신 실제 원고의 첫 문단을 입력합니다"},{"t":"click","target":"in-script"},{"t":"type","target":"in-script","text":"안녕하세요, 오늘은 AI 더빙을 배워봅니다."},{"t":"wait","ms":400},{"t":"caption","text":"④ Generate를 눌러 음성을 생성합니다"},{"t":"move","target":"btn-gen"},{"t":"click"},{"t":"wait","ms":800},{"t":"reveal","target":"card-audio"},{"t":"move","target":"card-audio"},{"t":"click"},{"t":"caption","text":"⑤ 들어보고 어색함이 없으면 다운로드합니다"},{"t":"reveal","target":"btn-dl"},{"t":"move","target":"btn-dl"},{"t":"click"}]}$aix$::jsonb, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '03267aa3-68de-49f0-89df-74f564953d98', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/voice-cloning-ethics', 'voice-cloning-ethics', '보이스 클로닝과 윤리: 동의가 먼저입니다',
  $aix$1분 녹음으로 내 목소리를 복제하는 시대입니다. 강력한 만큼, **이 레슨의 규칙을 지키지 않으면 법적 문제가 됩니다.**

## 클로닝 두 가지 방식

- **Instant Cloning**: 1~2분 샘플로 즉시 복제. 빠르지만 유사도는 보통입니다.
- **Professional Cloning**: 30분 이상 깨끗한 녹음으로 학습. 본인 인증(음성 캡차)이 필수이며, 유사도가 훨씬 높습니다.

## 절대 규칙: 동의 없는 클로닝 금지

- 복제 가능한 목소리는 **본인 것, 또는 서면 동의를 받은 목소리**뿐입니다.
- 연예인·정치인·지인의 목소리 무단 복제는 ElevenLabs 약관 위반이자, 한국에서도 퍼블리시티권 침해·성폭력처벌법(딥페이크)상 처벌 대상이 될 수 있습니다.
- 2026년 시행 중인 **EU AI Act** 등 주요 규제는 AI 생성 음성에 **AI임을 고지**하도록 요구합니다. 국내 플랫폼들도 AI 콘텐츠 표시를 요구하는 추세입니다.

## 안전한 활용 체크리스트

- 내 목소리 클로닝 → 내레이션 자동화 (가장 안전하고 실용적)
- 성우 목소리 → **이용 범위·기간을 계약서에 명시**하고 사용
- 공개 시 "AI 보이스 사용" 고지 문구 추가

> 💡 **핵심**: 클로닝의 기준은 기술이 아니라 **동의**입니다. 동의 → 녹음 → 복제 → 고지, 이 순서를 벗어나면 만들지 마세요.$aix$,
  $aix${"type":"flow","title":"동의 기반 클로닝 워크플로우","nodes":[{"label":"동의 확보","sublabel":"본인 목소리 or 서면 동의","icon":"clipboard","tone":"warning"},{"label":"깨끗한 샘플 녹음","sublabel":"잡음 없는 1~30분","icon":"mic","tone":"primary","edgeLabel":"동의 없으면 여기서 중단"},{"label":"클로닝 + 본인 인증","sublabel":"Professional은 음성 캡차","icon":"lock","tone":"accent"},{"label":"AI 사용 고지 후 공개","sublabel":"EU AI Act · 플랫폼 표시 의무","icon":"shield","tone":"success"}],"caption":"첫 관문이 '동의'인 이유 — 이후 모든 단계의 합법성이 여기서 결정됩니다."}$aix$::jsonb, null, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'd175d35a-54ef-aaf2-6948-15f48c5be2d7', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/emotion-and-pronunciation', 'emotion-and-pronunciation', '감정·톤 제어와 발음 교정',
  $aix$밋밋한 낭독과 살아있는 내레이션의 차이는 **연출 지시**에 있습니다. ElevenLabs는 텍스트 안에 연기 지문을 넣을 수 있습니다.

## 오디오 태그로 감정 연출

최신 모델(Eleven v3 계열)은 대괄호 **오디오 태그**를 연기 지시로 해석합니다.

- 감정: `[excited]` `[sad]` `[whispers]` `[laughs]`
- 전달: `[pause]`로 호흡을, 문장 분리로 리듬을 만듭니다.
- 태그는 문장 앞에 붙이며, 한 문단에 1~2개면 충분합니다 — 남발하면 부자연스러워집니다.

## 텍스트 자체가 연출입니다

- **문장을 짧게** 끊으면 또박또박, 길게 이으면 흘러가듯 읽습니다.
- 강조할 단어는 따옴표나 **쉼표로 앞뒤 분리**하면 자연히 힘이 들어갑니다.
- 말줄임표(…)는 머뭇거림, 느낌표는 에너지 상승으로 해석됩니다.

## 발음 교정 요령

- 숫자·단위는 읽는 법을 풀어 쓰세요: "2026년" → 확인 후 이상하면 "이천이십육 년".
- 외래어·브랜드명이 틀리면 **소리 나는 대로** 다시 씁니다: "Suno" → "수노".
- 반복 사용하는 용어는 사전(Pronunciation Dictionary)에 등록하면 프로젝트 전체에 적용됩니다.

> 💡 **핵심**: TTS 원고는 '읽을 글'이 아니라 **'연기 대본'**입니다. 태그와 문장 부호가 여러분의 연출 도구입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"elevenlabs — 연기 대본 vs 평문","lines":[{"text":"# 평문 원고 (밋밋한 낭독)","tone":"comment"},{"text":"오늘은 정말 놀라운 소식이 있습니다. 드디어 신제품이 나왔습니다.","tone":"dim"},{"text":"# 연기 대본 (오디오 태그 + 리듬)","tone":"comment"},{"text":"[excited] 오늘은… 정말 놀라운 소식이 있습니다!","tone":"cmd"},{"text":"[pause]","tone":"cmd"},{"text":"[whispers] 드디어, 신제품이 나왔거든요.","tone":"cmd"},{"text":"✓ 같은 문장, 태그 하나로 전달력이 달라집니다","tone":"ok"}],"caption":"태그는 문장 앞에, 문단당 1~2개만 — 과유불급입니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0975668d-ada4-8d55-c4e5-5d9a67e2b26d', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/multilingual-dubbing', 'multilingual-dubbing', '다국어 더빙 워크플로우',
  $aix$한국어 영상 하나로 영어·일본어·스페인어 시청자까지 — 더빙 자동화는 2026년 크리에이터의 표준 확장 전략입니다.

## Dubbing Studio의 5단계

ElevenLabs Dubbing Studio에 영상을 올리면 아래 과정이 자동으로 진행됩니다.

1. **전사**: 원본 음성을 텍스트로 변환하고 화자를 분리합니다.
2. **번역**: 대상 언어로 번역합니다 — 여기서 **직접 검수**가 품질을 가릅니다.
3. **음성 생성**: 원래 화자의 목소리 특성을 유지한 채 다른 언어로 말하게 합니다.
4. **타이밍 정렬**: 원본 발화 길이에 맞춰 속도를 조정합니다.
5. **검수·내보내기**: 구간별로 듣고 수정한 뒤 오디오/영상으로 출력합니다.

## 품질을 가르는 두 지점

- **번역 검수**: 자동 번역은 관용구·유행어에 약합니다. 해당 언어를 아는 사람의 검토, 최소한 역번역 확인을 거치세요.
- **길이 차이**: 한국어→영어는 문장이 길어지는 경향이 있어 말이 빨라질 수 있습니다. 원문을 미리 간결하게 다듬으면 해결됩니다.

## 실전 팁

- 처음엔 **자막 대신 더빙**이 필요한 콘텐츠인지부터 판단하세요 — 얼굴이 안 나오는 내레이션 영상이 더빙 효과가 가장 큽니다.

> 💡 **핵심**: 더빙 자동화에서 기계가 못 하는 단계는 단 하나, **번역 검수**입니다. 그 한 단계에 사람을 배치하세요.$aix$,
  $aix${"type":"steps","title":"다국어 더빙 5단계","steps":[{"label":"전사","sublabel":"음성 → 텍스트, 화자 분리","icon":"file-text"},{"label":"번역","sublabel":"사람 검수 필수 구간","icon":"globe"},{"label":"음성 생성","sublabel":"원래 목소리 특성 유지","icon":"mic"},{"label":"타이밍 정렬","sublabel":"원본 발화 길이에 맞춤","icon":"clock"},{"label":"검수 · 내보내기","sublabel":"구간별 확인 후 출력","icon":"check"}],"caption":"5단계 중 4단계는 자동 — 사람의 가치는 2단계(번역 검수)에 있습니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1ebc8a8c-d9d7-a681-b9c7-19cd4a7eb07e', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/mixing-bgm-and-voice', 'mixing-bgm-and-voice', '영상에 BGM과 더빙 입히기: 레벨 밸런스와 덕킹',
  $aix$좋은 BGM과 좋은 더빙을 만들어도, 섞는 순간 망칠 수 있습니다. 믹싱의 규칙은 단순합니다 — **목소리가 왕**입니다.

## 레벨 밸런스의 기본 공식

오디오 트랙은 역할별로 크기의 서열이 있습니다.

- **내레이션(더빙)**: 가장 크게, 평균 -6 ~ -12dB 부근
- **효과음**: 내레이션보다 약간 작게
- **BGM**: 목소리가 나올 때 -20 ~ -25dB 수준으로, 배경에 깔리게

숫자보다 중요한 검증법: **스마트폰 스피커로 들어보기**. 작은 스피커에서 목소리가 묻히면 밸런스 실패입니다.

## 덕킹(Ducking): 자동으로 비켜주는 BGM

- 덕킹은 **목소리가 나오는 순간 BGM 볼륨을 자동으로 낮추는** 기법입니다.
- 프리미어 프로(Essential Sound → 덕킹), 다빈치 리졸브, 캡컷 모두 자동 덕킹을 지원합니다.
- 수동으로 키프레임을 찍는 것보다 빠르고, 목소리 사이 공백에서 BGM이 자연스럽게 살아납니다.

## 마지막 점검

- 전체 라우드니스는 유튜브 기준 약 **-14 LUFS**에 맞추면 플랫폼 자동 볼륨 조정에 안전합니다.

> 💡 **핵심**: 믹싱 우선순위는 목소리 > 효과음 > BGM. 그리고 덕킹 기능이 이 서열을 자동으로 지켜줍니다.$aix$,
  $aix${"type":"stack","title":"오디오 트랙의 서열","layers":[{"label":"내레이션 (더빙)","sublabel":"가장 크게 · 항상 왕좌","icon":"mic","tone":"primary"},{"label":"효과음","sublabel":"내레이션보다 한 단계 아래","icon":"zap","tone":"accent"},{"label":"BGM","sublabel":"목소리 나오면 덕킹으로 자동 하강","icon":"music","tone":"muted"},{"label":"최종 라우드니스","sublabel":"유튜브 기준 약 -14 LUFS","icon":"gauge","tone":"success"}],"caption":"위층이 나올 때 아래층이 비켜주는 구조 — 이것이 덕킹입니다."}$aix$::jsonb, $aix${"title":"타임라인에서 레벨 밸런스와 덕킹 따라하기","app":{"kind":"design-canvas","windowTitle":"사운드 믹싱 — 오디오 타임라인","tools":[{"id":"tool-mic","icon":"mic","label":"더빙 트랙"},{"id":"tool-music","icon":"music","label":"BGM 트랙"},{"id":"tool-duck","icon":"gauge","label":"덕킹"}],"objects":[{"id":"timeline","shape":"frame","label":"오디오 타임라인","x":4,"y":6,"w":92,"h":88},{"id":"video-track","shape":"rect","label":"영상 트랙","x":8,"y":14,"w":84,"h":14,"color":"#64748b"},{"id":"voice-track","shape":"rect","label":"내레이션 -9dB","x":22,"y":36,"w":56,"h":13,"color":"#8b5cf6","hidden":true},{"id":"voice-track-aligned","shape":"rect","label":"내레이션 -9dB","x":8,"y":36,"w":56,"h":13,"color":"#8b5cf6","hidden":true},{"id":"bgm-track","shape":"rect","label":"BGM -22dB","x":8,"y":58,"w":84,"h":13,"color":"#14b8a6","hidden":true},{"id":"bgm-duck","shape":"rect","label":"덕킹: 목소리 구간 -25dB","x":8,"y":74,"w":56,"h":10,"color":"#0f766e","hidden":true},{"id":"lufs-badge","shape":"text","label":"최종 -14 LUFS ✓","x":68,"y":76,"w":24,"h":8,"hidden":true}]},"actions":[{"t":"caption","text":"① 더빙 트랙 도구로 내레이션을 타임라인에 올립니다"},{"t":"move","target":"tool-mic"},{"t":"click"},{"t":"drag","from":"video-track","to":"voice-track"},{"t":"reveal","target":"voice-track"},{"t":"wait","ms":400},{"t":"caption","text":"② 드래그로 내레이션을 영상 시작점에 맞춰 정렬합니다"},{"t":"drag","from":"voice-track","to":"voice-track-aligned"},{"t":"hide","target":"voice-track"},{"t":"reveal","target":"voice-track-aligned"},{"t":"wait","ms":400},{"t":"caption","text":"③ BGM은 목소리보다 작게, 맨 아래 층에 깔아줍니다"},{"t":"move","target":"tool-music"},{"t":"click"},{"t":"drag","from":"voice-track-aligned","to":"bgm-track"},{"t":"reveal","target":"bgm-track"},{"t":"wait","ms":400},{"t":"caption","text":"④ 덕킹을 켜 목소리 구간의 BGM을 자동으로 낮춥니다"},{"t":"move","target":"tool-duck"},{"t":"click"},{"t":"reveal","target":"bgm-duck"},{"t":"caption","text":"⑤ 스마트폰 스피커로 확인하고 -14 LUFS로 마무리합니다"},{"t":"reveal","target":"lufs-badge"},{"t":"move","target":"lufs-badge"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8330e7e2-30a7-64ef-2613-5b3191ae6f87', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/podcast-audiobook-automation', 'podcast-audiobook-automation', '팟캐스트·오디오북 자동화 파이프라인',
  $aix$원고만 쓰면 나머지는 기계가 하는 시대입니다. 매주 반복되는 오디오 콘텐츠는 **파이프라인으로 만들면** 제작 시간이 10분의 1로 줄어듭니다.

## 반복되는 4단계를 자동화

1. **원고**: 블로그 글·뉴스레터를 LLM으로 '말하기용 대본'으로 변환합니다 — 문어체를 구어체로.
2. **음성 생성**: 고정 보이스 + 저장된 설정으로 ElevenLabs API 호출. 매회 같은 목소리가 브랜드가 됩니다.
3. **후반 작업**: 인트로 징글(Suno 제작) 붙이기, 라우드니스 정규화 — 스크립트나 자동화 도구(Make, n8n)로 처리합니다.
4. **발행**: 팟캐스트 호스팅에 업로드하고 에피소드 정보를 채웁니다.

## 오디오북은 '장(章) 단위'로

- 책 한 권을 한 번에 넣지 말고 **장별로 나눠 생성**하세요 — 수정할 때 그 장만 다시 만들면 됩니다.
- 등장인물 대사가 많다면 화자별로 보이스를 나누는 것도 가능하지만, 입문 단계에선 **단일 내레이터 + 오디오 태그**가 관리하기 쉽습니다.

## 사람이 남아야 할 자리

자동화해도 **발행 전 전체 듣기**는 생략하지 마세요. 발음 오류·어색한 번역투는 아직 사람 귀가 가장 빨리 잡습니다.

> 💡 **핵심**: '원고 → 음성 → 후반 → 발행'을 한 번 파이프라인으로 만들면, 이후엔 원고만 넣으면 됩니다. 반복 작업은 설계 대상입니다.$aix$,
  $aix${"type":"cycle","title":"주간 오디오 콘텐츠 파이프라인","center":"매주 반복","nodes":[{"label":"원고 변환","sublabel":"문어체 → 구어체 대본","icon":"file-text"},{"label":"음성 생성","sublabel":"고정 보이스 API 호출","icon":"mic"},{"label":"후반 작업","sublabel":"징글 + 라우드니스 정규화","icon":"settings"},{"label":"검수 · 발행","sublabel":"전체 듣기 후 업로드","icon":"upload"}],"caption":"사이클 중 자동화 불가 구간은 '검수' 하나 — 나머지는 기계에 맡기세요."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '45000cb9-1376-bf64-439f-10893fd0a608', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/copyright-and-policy', 'copyright-and-policy', '음원 저작권과 플랫폼 정책: 2026 상업 이용 가이드',
  $aix$만드는 것보다 중요한 것이 **쓸 수 있는가**입니다. AI 음원의 권리는 "어떤 플랜으로 만들었나"에 따라 달라집니다.

## 대원칙: 유료 플랜 = 상업적 이용

- **Suno**: 유료 플랜(Pro/Premier) 구독 중 생성한 곡은 상업적 이용이 허용됩니다. **무료 플랜 곡은 비상업 용도로 제한**되며 출처 표기가 요구됩니다.
- **ElevenLabs**: 유료 플랜부터 상업 라이선스가 부여됩니다. 무료 플랜은 비상업 + 출처 표기 조건입니다.
- 플랜은 **생성 시점** 기준입니다 — 구독 해지 전에 만든 곡의 권리는 유지되는 것이 일반적이지만, 약관 원문을 반드시 확인하세요.

## 플랫폼별 체크포인트

- **유튜브**: AI 음원 자체는 문제없으나, **사실적인 AI 음성·합성 콘텐츠는 공개 설정에서 고지**해야 합니다. Content ID 오탐지가 생기면 생성 기록으로 이의 제기가 가능합니다.
- **음원 유통(스포티파이 등)**: AI 생성곡 유통은 가능하지만 아티스트 사칭·스트리밍 조작은 삭제 사유입니다.
- **광고·클라이언트 납품**: 계약서에 "AI 생성물 포함" 여부를 명시하는 것이 2026년 실무 표준입니다.

## 안전 수칙 세 가지

- 생성 당시의 **플랜·날짜·프롬프트를 기록**해 두세요 — 분쟁 시 증거가 됩니다.
- 특정 가수 스타일 모사곡을 그 가수 이름으로 홍보하지 마세요.
- 약관은 바뀝니다. **연 1회 재확인**을 캘린더에 넣으세요.

> 💡 **핵심**: 상업 이용의 3요소 — **유료 플랜으로 생성 + 생성 기록 보관 + 플랫폼 고지 준수**. 이 세 가지면 대부분의 분쟁을 예방합니다.$aix$,
  $aix${"type":"grid","title":"상업 이용 전 점검 항목","items":[{"label":"플랜 확인","sublabel":"유료 플랜 생성분만 상업 이용","icon":"dollar","tone":"primary"},{"label":"생성 기록 보관","sublabel":"날짜 · 플랜 · 프롬프트","icon":"clipboard","tone":"accent"},{"label":"AI 고지","sublabel":"유튜브 합성 콘텐츠 설정","icon":"alert","tone":"warning"},{"label":"사칭 금지","sublabel":"아티스트 이름 홍보 불가","icon":"x","tone":"muted"},{"label":"계약서 명시","sublabel":"납품 시 AI 생성물 고지","icon":"file-text","tone":"accent"},{"label":"약관 재확인","sublabel":"연 1회, 정책은 바뀝니다","icon":"refresh","tone":"success"}],"caption":"여섯 칸 모두 체크되면 안심하고 발행해도 됩니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: 노코드 자동화: Make.com & Zapier 마스터
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '7d6ec359-983c-9bd8-d4a4-d60256613829', 'nocode-automation', '노코드 자동화: Make.com & Zapier 마스터', $aix$복사-붙여넣기로 하루를 보내는 반복 업무, 2026년에는 코드 한 줄 없이 자동화할 수 있습니다. 이 강의에서는 트리거·액션·노드라는 자동화의 기본 문법부터 라우터 분기, 데이터 변환, 웹훅 연동, 그리고 AI 모듈을 결합한 지능형 파이프라인까지 — Make.com과 Zapier를 중심으로 실무에 바로 쓰는 자동화 설계법을 노드 다이어그램과 함께 익힙니다.$aix$,
  null, 'business', 'beginner', array['Make.com', 'Zapier', '노코드', '업무 자동화', 'AI 워크플로우']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '0ac23c4e-607f-e717-793d-2ac4049637ed', '7d6ec359-983c-9bd8-d4a4-d60256613829', 'automation-basics', '자동화의 기본 문법', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'e0b47e73-c0fe-a504-c669-923206e31b19', '7d6ec359-983c-9bd8-d4a4-d60256613829', 'pipeline-design', '중급 파이프라인 설계', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '78ec5d66-2ade-8a21-60e8-93c519f0bbaf', '7d6ec359-983c-9bd8-d4a4-d60256613829', 'ai-automation', 'AI 결합 자동화', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '29c4c4a9-f639-8547-a4e6-43faf9333089', '0ac23c4e-607f-e717-793d-2ac4049637ed', 'nocode-automation/trigger-action-node', 'trigger-action-node', '자동화의 3요소: 트리거, 액션, 노드',
  $aix$세상의 모든 업무 자동화는 단 하나의 문장으로 요약됩니다. **"무언가 일어나면(트리거), 무언가를 한다(액션)."**

## 자동화의 3요소

- **트리거(Trigger)** — 자동화를 깨우는 사건. 폼 응답 도착, 메일 수신, 매일 오전 9시 등.
- **액션(Action)** — 트리거 이후 실행되는 일. 시트에 행 추가, 슬랙 알림, 메일 발송 등.
- **노드(Node)** — 트리거와 액션 하나하나를 담은 블록. 노드를 선으로 이으면 **시나리오**(Zapier에서는 Zap)가 됩니다.

## 왜 '노드'로 생각해야 하나

- 자동화 도구의 화면은 결국 **노드를 선으로 연결하는 캔버스**입니다.
- 노드 사이를 흐르는 것은 **데이터**입니다 — 앞 노드의 출력이 뒷 노드의 입력이 됩니다.
- 복잡한 자동화도 "트리거 1개 + 액션 N개의 연결"로 분해하면 전부 읽을 수 있습니다.

## 첫 감각 잡기

내 업무 중 "A가 생기면 B에 옮겨 적는다"에 해당하는 일을 하나 떠올려 보세요. 그것이 여러분의 첫 시나리오 후보입니다.

> 💡 **핵심**: 자동화 설계 = "무슨 사건이(트리거) → 어떤 데이터가 흘러서(노드 연결) → 무슨 일이 일어나는가(액션)"를 그리는 일입니다.$aix$,
  $aix${"type":"flow","title":"자동화 시나리오의 뼈대","nodes":[{"label":"트리거","sublabel":"폼 응답 도착","icon":"zap","tone":"warning"},{"label":"액션 노드 1","sublabel":"스프레드시트에 행 추가","icon":"database","tone":"primary","edgeLabel":"응답 데이터"},{"label":"액션 노드 2","sublabel":"팀 채널에 알림 발송","icon":"send","tone":"accent","edgeLabel":"저장 완료"}],"caption":"노드 사이를 흐르는 것은 데이터 — 앞 노드의 출력이 뒷 노드의 입력입니다."}$aix$::jsonb, $aix${"title":"Gmail 트리거가 울리는 순간 따라하기","app":{"kind":"email-app","folders":[{"id":"fd-inbox","name":"받은편지함","count":2,"active":true},{"id":"fd-sent","name":"보낸편지함"},{"id":"fd-auto","name":"자동화/처리됨"}],"emails":[{"id":"e-old","from":"주간 뉴스레터","subject":"7월 넷째 주 업계 소식","preview":"이번 주 하이라이트를 전해드립니다…"},{"id":"e-new","from":"고객 김민준","subject":"Pro 플랜 신청 문의드립니다","preview":"안녕하세요, 신청 절차가 궁금해서 연락드립니다…","unread":true,"hidden":true}],"compose":{"id":"cp","toId":"cp-to","subjectId":"cp-subj","bodyId":"cp-body","sendId":"cp-send"}},"actions":[{"t":"caption","text":"① 받은편지함에 새 메일 도착 — 이 사건이 트리거입니다"},{"t":"reveal","target":"e-new"},{"t":"wait","ms":600},{"t":"caption","text":"② 사람은 메일을 클릭해 확인만 합니다"},{"t":"move","target":"e-new"},{"t":"click"},{"t":"wait","ms":500},{"t":"caption","text":"③ 트리거가 울리면 자동화가 액션(자동 회신)을 시작합니다"},{"t":"reveal","target":"cp"},{"t":"type","target":"cp-to","text":"minjun.kim@example.com"},{"t":"type","target":"cp-subj","text":"문의 접수 안내 (자동 회신)"},{"t":"type","target":"cp-body","text":"접수되었습니다. 1영업일 내 답변드립니다."},{"t":"wait","ms":400},{"t":"caption","text":"④ 발송 버튼까지 자동화가 누릅니다 — 액션 완료"},{"t":"move","target":"cp-send"},{"t":"click"},{"t":"hide","target":"cp"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 처리된 메일은 전용 폴더로 정리됩니다"},{"t":"move","target":"fd-auto"},{"t":"click"},{"t":"hide","target":"e-new"},{"t":"caption","text":"✅ 트리거 1번 = 액션 자동 실행 — 이것이 자동화입니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '52bfdf6e-16e9-2507-9dd3-8559562cd855', '0ac23c4e-607f-e717-793d-2ac4049637ed', 'nocode-automation/make-vs-zapier-vs-n8n', 'make-vs-zapier-vs-n8n', 'Make vs Zapier vs n8n: 무엇으로 시작할까',
  $aix$도구 선택으로 일주일을 고민하는 분이 많습니다. 2026년 기준, 세 도구의 성격만 알면 10분 안에 결정할 수 있습니다.

## 세 도구의 성격

- **Zapier** — 가장 쉽고 연동 앱이 가장 많음(8,000개+). 직선형 Zap 중심이라 단순 자동화에 최적. AI 에이전트 빌더(Zapier Agents)로 자연어 기반 자동화까지 확장.
- **Make.com** — 시각적 캔버스에서 분기·반복 등 복잡한 흐름을 그리기 좋음. 오퍼레이션 단가가 저렴해 대량 실행에 유리. AI Agents 기능으로 시나리오에 자율 판단 단계를 삽입 가능.
- **n8n** — 오픈소스. 셀프호스팅하면 실행량 과금이 없고, 코드 노드와 LangChain 기반 AI 워크플로우로 확장성이 가장 큼. 대신 초기 학습과 서버 관리가 필요.

## 선택 기준 3문항

1. **처음이고 빨리 결과를 보고 싶다** → Zapier
2. **분기가 많고 실행량이 많다(비용 민감)** → Make
3. **데이터를 외부에 못 보내거나, 개발자 협업이 가능하다** → n8n

## 이 강의의 선택

기본 개념은 세 도구가 동일하므로, 이 강의는 **Make를 기준**으로 하되 Zapier 용어를 병기합니다. 하나를 익히면 갈아타는 데 하루면 충분합니다.

> 💡 **핵심**: 도구보다 **개념(트리거·노드·데이터 흐름)**이 자산입니다. 일단 하나로 시작하세요 — 이 강의에서는 Make입니다.$aix$,
  $aix${"type":"compare","title":"2026년 자동화 도구 3파전","columns":[{"title":"Zapier","icon":"zap","tone":"accent","items":["연동 앱 8,000개+ 최다","직선형 Zap, 가장 쉬움","Zapier Agents (AI)","태스크당 비용은 높은 편"]},{"title":"Make.com","icon":"workflow","tone":"primary","items":["시각적 캔버스 · 분기 강함","오퍼레이션 단가 저렴","AI Agents 내장","이 강의의 기준 도구"]},{"title":"n8n","icon":"server","tone":"muted","items":["오픈소스 · 셀프호스팅","실행량 과금 없음(자체 서버)","코드·AI 노드 확장성 최고","서버 관리 부담 있음"]}],"caption":"쉬움 → Zapier, 복잡·대량 → Make, 보안·확장 → n8n."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e5472b16-535e-ec6d-b48e-b656790707fd', '0ac23c4e-607f-e717-793d-2ac4049637ed', 'nocode-automation/first-scenario', 'first-scenario', '실습: 첫 시나리오 — 폼 응답을 시트와 알림으로',
  $aix$백문이 불여일런(run)입니다. 가장 보편적인 자동화 — **폼 응답 → 스프레드시트 저장 → 팀 알림** — 을 Make에서 직접 만들어 봅니다.

## 만들 것

Google Forms에 신청이 들어오면, Google Sheets에 자동 기록하고 Slack으로 알림을 보내는 시나리오입니다.

## 따라 하기

1. **트리거 노드**: 캔버스에 Google Forms의 "Watch Responses"를 놓고 폼을 연결합니다.
2. **테스트 데이터 확보**: 폼에 답을 한 번 제출하고 "Run once"로 실제 응답 데이터를 가져옵니다. 이 데이터가 다음 노드의 재료가 됩니다.
3. **액션 노드 1**: Google Sheets "Add a Row"를 연결하고, 폼 응답의 이름·이메일 필드를 시트 열에 **매핑**합니다.
4. **액션 노드 2**: Slack "Create a Message"를 연결하고 알림 문구에 이름 필드를 끼워 넣습니다.
5. **스케줄 켜기**: 좌측 하단 토글을 켜면 이후 응답부터 자동 실행됩니다.

## 초심자가 걸리는 곳

- 매핑 목록이 비어 있다면 → 2번(테스트 실행)을 건너뛴 것입니다.
- 알림이 두 번 온다면 → 시나리오가 중복 활성화된 것입니다.

> 💡 **핵심**: 트리거 연결 직후 **반드시 한 번 실행해 실제 데이터를 확보**하세요. 매핑은 언제나 진짜 데이터 위에서 합니다.$aix$,
  $aix${"type":"steps","title":"첫 시나리오 5단계","steps":[{"label":"트리거 배치","sublabel":"Google Forms · Watch Responses","icon":"zap"},{"label":"테스트 실행","sublabel":"Run once로 실데이터 확보","icon":"play"},{"label":"시트 노드 연결","sublabel":"응답 필드를 열에 매핑","icon":"database"},{"label":"슬랙 노드 연결","sublabel":"알림 문구에 필드 삽입","icon":"send"},{"label":"스케줄 활성화","sublabel":"토글 ON — 자동 운행 시작","icon":"check"}],"caption":"5단계, 약 15분 — 여러분의 첫 자동화가 돌기 시작합니다."}$aix$::jsonb, $aix${"title":"Make 캔버스에서 첫 시나리오 조립 따라하기","app":{"kind":"automation-canvas","windowTitle":"폼 응답 알림 시나리오 — Make","nodes":[{"id":"n-forms","icon":"zap","label":"Google Forms","sublabel":"Watch Responses","tone":"warning","hidden":true},{"id":"n-sheets","icon":"database","label":"Google Sheets","sublabel":"Add a Row","tone":"primary","hidden":true},{"id":"n-slack","icon":"send","label":"Slack","sublabel":"Create a Message","tone":"accent","hidden":true}],"runLog":[{"id":"log-run","text":"▶ Run once — 테스트 실행","tone":"out","hidden":true},{"id":"log-forms","text":"✓ Google Forms: 응답 1건 수신 (김민준)","tone":"ok","hidden":true},{"id":"log-sheets","text":"✓ Google Sheets: 3행에 기록 완료","tone":"ok","hidden":true},{"id":"log-slack","text":"✓ Slack: #신청-알림 채널 발송 — 시나리오 성공","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 트리거 슬롯을 클릭해 Google Forms를 배치합니다"},{"t":"move","target":"n-forms"},{"t":"click"},{"t":"reveal","target":"n-forms"},{"t":"wait","ms":500},{"t":"caption","text":"② Run once로 실제 응답 데이터를 확보합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-forms"},{"t":"wait","ms":600},{"t":"caption","text":"③ 시트 노드를 연결하고 이름·이메일 필드를 매핑합니다"},{"t":"move","target":"n-sheets"},{"t":"click"},{"t":"reveal","target":"n-sheets"},{"t":"wait","ms":500},{"t":"caption","text":"④ 슬랙 노드를 붙여 알림 문구에 필드를 끼워 넣습니다"},{"t":"move","target":"n-slack"},{"t":"click"},{"t":"reveal","target":"n-slack"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 전체 실행 — 세 노드가 차례로 초록 불이 됩니다"},{"t":"reveal","target":"log-sheets"},{"t":"reveal","target":"log-slack"},{"t":"move","target":"log-slack"},{"t":"caption","text":"✅ 첫 시나리오 완성 — 토글을 켜면 자동 운행됩니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '92d72b40-90a9-c431-c684-a8d1c2188c14', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/routers-and-filters', 'routers-and-filters', '라우터와 필터: 조건에 따라 길을 나누기',
  $aix$실무의 자동화는 직선이 아닙니다. "VIP 문의는 매니저에게, 일반 문의는 시트에만" — 이런 **분기**를 만드는 부품이 라우터와 필터입니다.

## 필터(Filter): 통과 조건 걸기

- 노드와 노드 **사이의 선**에 조건을 답니다. 조건을 만족하는 데이터만 다음 노드로 통과합니다.
- 예: "금액 ≥ 100만 원일 때만 알림" — 조건 미달 데이터는 조용히 버려집니다.
- Zapier에서는 "Filter" 스텝, Make에서는 연결선 위의 필터 아이콘입니다.

## 라우터(Router): 여러 갈래로 나누기

- 하나의 흐름을 **여러 경로로 복제**하고, 각 경로에 서로 다른 필터를 답니다.
- 예: 문의 유형이 "환불"이면 CS팀 경로, "제휴"면 영업팀 경로, 나머지는 기본 경로.
- 마지막에 **폴백(fallback) 경로**를 두면 어떤 조건에도 안 걸린 데이터가 유실되지 않습니다.

## 설계 감각

- 분기 조건은 **서로 겹치지 않게** — 두 경로에 동시에 걸리면 중복 실행됩니다.
- 경로가 4개를 넘으면 시나리오를 쪼개는 편이 유지보수에 낫습니다.

> 💡 **핵심**: 필터는 "통과/차단", 라우터는 "갈림길". 그리고 **폴백 경로 없는 라우터는 데이터를 흘립니다** — 반드시 기본 경로를 두세요.$aix$,
  $aix${"type":"flow","title":"라우터 분기 파이프라인","nodes":[{"label":"트리거: 문의 접수","icon":"mail","tone":"warning"},{"label":"라우터","sublabel":"문의 유형으로 경로 결정","icon":"git-branch","tone":"primary"},{"label":"환불 경로 → CS팀 배정","icon":"users","tone":"accent","edgeLabel":"유형 = 환불"},{"label":"폴백 경로 → 기본 시트 기록","icon":"database","tone":"muted","edgeLabel":"그 외 전부"}],"caption":"각 경로의 필터 조건은 겹치지 않게, 폴백은 반드시 하나."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3c5d46ec-f89c-da7f-4d3a-79ac00fcc4a4', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/data-transformation', 'data-transformation', '데이터 변환: 매핑, 포매터, 집계',
  $aix$자동화가 깨지는 원인 1위는 연결이 아니라 **데이터 모양**입니다. 앞 노드가 주는 형태와 뒷 노드가 원하는 형태를 맞추는 기술이 데이터 변환입니다.

## 매핑(Mapping): 필드 이어 붙이기

- 앞 노드의 출력 필드를 뒷 노드의 입력 칸에 끌어다 놓는 것.
- 고정 텍스트와 필드를 섞어 쓸 수 있습니다: `신규 신청: {이름} ({이메일})`

## 포매터(Formatter): 형태 바꾸기

- **날짜**: `2026-07-28T09:00:00Z` → `2026년 7월 28일` (타임존 주의!)
- **텍스트**: 대소문자, 공백 제거, 분리(split), 치환(replace)
- **숫자**: 통화 표기, 반올림. Zapier는 Formatter 스텝, Make는 내장 함수(`formatDate`, `replace` 등)를 매핑 칸 안에서 바로 씁니다.

## 집계(Aggregator): 여러 개를 하나로

- 행 10개를 받아 **요약 하나**로 묶습니다. 예: 오늘 주문 목록 → 한 통의 일일 리포트 메일.
- 반대 방향은 **이터레이터(Iterator)** — 배열 하나를 낱개로 풀어 반복 처리합니다.

> 💡 **핵심**: 노드 연결이 뼈대라면 변환은 관절입니다. 막히면 항상 **"앞 노드의 출력 데이터가 실제로 어떤 모양인지"**부터 확인하세요.$aix$,
  $aix${"type":"grid","title":"데이터 변환 도구 상자","items":[{"label":"매핑","sublabel":"필드 ↔ 칸 연결","icon":"link","tone":"primary"},{"label":"날짜 포매터","sublabel":"형식·타임존 변환","icon":"calendar","tone":"accent"},{"label":"텍스트 포매터","sublabel":"분리·치환·정리","icon":"scissors","tone":"accent"},{"label":"숫자 포매터","sublabel":"통화·반올림","icon":"dollar","tone":"accent"},{"label":"집계 (Aggregator)","sublabel":"여러 행 → 하나로","icon":"layers","tone":"success"},{"label":"이터레이터","sublabel":"배열 → 낱개 반복","icon":"repeat","tone":"warning"}],"caption":"막히면 변환 도구부터 — 연결 문제의 대부분은 데이터 모양 문제입니다."}$aix$::jsonb, null, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '716e51e7-3431-8cfc-7f98-ff41930d098c', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/webhooks', 'webhooks', '웹훅: 목록에 없는 서비스도 연결하기',
  $aix$"우리 사내 시스템은 연동 목록에 없는데요?" — 괜찮습니다. **웹훅(Webhook)**을 알면 HTTP를 쓰는 어떤 서비스든 연결할 수 있습니다.

## 웹훅이란

- 웹훅은 **이벤트가 생기면 특정 URL로 데이터를 쏘아 주는** 방식입니다.
- Make에서 "Custom Webhook" 트리거를 만들면 고유 URL이 발급됩니다. 이 URL로 데이터가 도착하는 순간 시나리오가 실행됩니다.
- 폴링(주기적 확인)과 달리 **즉시 실행 + 오퍼레이션 절약**이라는 이점이 있습니다.

## 양방향으로 쓰기

- **받기(트리거)**: 사내 시스템·결제 서비스가 웹훅 URL로 이벤트를 보냄 → 시나리오 시작.
- **보내기(액션)**: HTTP 모듈로 외부 API에 직접 요청 → 연동 앱이 없어도 호출 가능.

## 첫 테스트는 curl로

발급받은 URL에 터미널에서 직접 데이터를 쏘아 보면 구조가 단번에 이해됩니다. 도착한 JSON의 필드는 이후 노드에서 그대로 매핑할 수 있습니다.

## 주의점

- 웹훅 URL은 **비밀번호처럼** 취급하세요 — 아는 사람은 누구나 실행시킬 수 있습니다.
- 검증용 시크릿 헤더나 토큰 필드를 하나 넣어 걸러내는 습관을 들이세요.

> 💡 **핵심**: 연동 목록은 편의일 뿐, 본질은 HTTP입니다. **웹훅(받기) + HTTP 모듈(보내기)**만 있으면 사실상 모든 서비스가 연결 대상입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"terminal — 웹훅 테스트","lines":[{"text":"# Make에서 발급받은 웹훅 URL로 테스트 데이터 전송","tone":"comment"},{"text":"curl -X POST https://hook.make.com/abc123 \\","tone":"cmd"},{"text":"  -H 'Content-Type: application/json' \\","tone":"cmd"},{"text":"  -d '{\"name\":\"김민준\",\"plan\":\"pro\",\"amount\":29000}'","tone":"cmd"},{"text":"Accepted","tone":"ok"},{"text":"# Make 캔버스: 웹훅 노드에 초록 불 — 시나리오 즉시 실행","tone":"comment"},{"text":"# name/plan/amount 필드가 다음 노드에서 매핑 가능해짐","tone":"dim"}],"caption":"curl 한 줄이면 웹훅의 동작 원리가 눈앞에서 확인됩니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '72eaf81e-36a3-438f-242f-74ee02f739fd', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/error-handling', 'error-handling', '에러 처리와 재시도: 무너지지 않는 파이프라인',
  $aix$자동화는 만들 때가 아니라 **한 달 뒤 조용히 실패할 때** 진짜 실력이 드러납니다. 에러 처리 없는 시나리오는 언젠가 반드시 데이터를 흘립니다.

## 에러의 두 종류

- **일시적 에러** — API 서버 순간 장애, 요청 한도 초과(rate limit). **재시도하면 대부분 해결**됩니다.
- **영구적 에러** — 필수 필드 누락, 잘못된 인증, 존재하지 않는 레코드. 재시도해도 똑같이 실패하므로 **사람에게 알려야** 합니다.

## Make의 에러 핸들러 4종

- **Retry(Break)** — 일정 간격을 두고 재시도. 일시적 에러의 기본기.
- **Resume** — 대체 값을 넣고 계속 진행.
- **Ignore** — 이 건만 버리고 다음 데이터 처리.
- **Rollback/Commit** — 트랜잭션처럼 전체 취소 또는 확정.

## 실무 기본 설계

1. 외부 API 노드에는 **Retry(간격 15분, 최대 3회)**를 답니다.
2. 최종 실패 시 **에러 알림 경로**(슬랙/메일)로 사람에게 보고합니다.
3. 실패한 실행은 **Incomplete Executions**에 보관해 두고, 원인 수정 후 재실행합니다.

> 💡 **핵심**: 설계 질문은 "실패하면 어쩌지?"가 아니라 **"일시적 실패는 재시도, 영구적 실패는 누구에게 어떻게 알릴 것인가"**입니다.$aix$,
  $aix${"type":"flow","title":"에러 처리 표준 패턴","nodes":[{"label":"외부 API 호출","icon":"cloud","tone":"primary"},{"label":"실패 감지","sublabel":"일시적? 영구적?","icon":"alert","tone":"warning","edgeLabel":"에러 발생 시"},{"label":"재시도 (Break)","sublabel":"15분 간격 · 최대 3회","icon":"refresh","tone":"accent","edgeLabel":"일시적 에러"},{"label":"사람에게 알림 + 실행 보관","sublabel":"슬랙 보고 · 수정 후 재실행","icon":"shield","tone":"success","edgeLabel":"3회 초과 또는 영구적 에러"}],"loopBack":{"from":2,"to":0,"label":"재시도 (최대 3회)"},"caption":"재시도로 풀리는 실패는 기계가, 안 풀리는 실패는 사람이."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e9b2af84-cd90-04a3-dcc6-bf78c13a6694', '78ec5d66-2ade-8a21-60e8-93c519f0bbaf', 'nocode-automation/ai-modules', 'ai-modules', '시나리오에 AI 모듈 넣기: 분류·요약·생성',
  $aix$라우터의 조건식으로는 "이 문의가 화가 난 고객인지"를 판별할 수 없습니다. **규칙으로 못 가르는 것을 가르는 노드**, 그것이 AI 모듈입니다.

## AI 노드가 잘하는 세 가지

- **분류** — 자유 텍스트에 라벨 붙이기. "이 문의는 환불/배송/제휴 중 무엇인가?"
- **요약** — 긴 이메일·회의록을 알림에 넣을 3줄로 압축.
- **생성** — 답변 초안, 제목, SNS 문구 등 사람이 다듬을 초안 만들기.

## 연결 방법

- Make·Zapier 모두 **Claude, OpenAI 등 AI 모듈을 기본 제공**합니다. API 키를 연결하고, 프롬프트 칸에 앞 노드의 필드를 매핑해 넣으면 끝입니다.
- 2026년에는 한 단계 더 나아가 **AI 에이전트 노드**(Make AI Agents, Zapier Agents)가 도구 선택까지 스스로 하지만, 시작은 단일 AI 노드로 충분합니다.

## 프롬프트 설계의 철칙: 출력 형식 고정

AI의 출력은 **다음 노드가 기계적으로 읽어야** 합니다. "환불, 배송, 제휴, 기타 중 한 단어로만 답하라"처럼 형식을 고정하세요. 라우터 필터가 그 단어로 분기합니다.

> 💡 **핵심**: 자동화 속 AI는 수다쟁이가 아니라 부품입니다. **출력 형식을 한 단어/JSON으로 고정**해야 뒷 노드와 맞물립니다.$aix$,
  $aix${"type":"chat","title":"AI 분류 노드의 프롬프트 설계","messages":[{"role":"system","text":"너는 고객 문의 분류기다. 반드시 환불/배송/제휴/기타 중 한 단어로만 답하라."},{"role":"user","text":"{문의 내용 필드} ← 앞 노드에서 매핑: \"주문한 지 2주가 지났는데 아직도 안 왔어요. 취소하고 싶습니다.\""},{"role":"ai","text":"환불"}],"caption":"출력이 한 단어로 고정되어야 라우터가 기계적으로 분기할 수 있습니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '01c1c136-70cd-e951-d07b-64973ef845ee', '78ec5d66-2ade-8a21-60e8-93c519f0bbaf', 'nocode-automation/ai-inquiry-pipeline', 'ai-inquiry-pipeline', '실전: 고객 문의 분류 → 답변 초안 → 담당자 배정',
  $aix$배운 것을 전부 조립할 시간입니다. 실제 회사에서 가장 수요가 많은 파이프라인 — **문의 접수부터 담당자 배정까지** — 를 만들어 봅니다.

## 파이프라인 설계

1. **트리거**: 문의 채널(이메일/폼/채널톡 웹훅)에서 새 문의 수신.
2. **AI 분류 노드**: 문의를 환불/배송/제휴/기타로 분류 + 긴급도(상/중/하) 판정. 출력은 JSON으로 고정합니다.
3. **AI 초안 노드**: 문의 내용과 분류 결과를 받아 **답변 초안**을 생성합니다. "발송은 사람이 한다"를 전제로 한 초안입니다.
4. **라우터**: 분류 결과에 따라 담당팀 채널로 분기. 긴급도 '상'은 매니저 멘션 추가.
5. **기록**: 전 건을 시트/CRM에 적재 — 나중에 AI 분류 정확도를 검수할 데이터가 됩니다.

## 왜 '초안'까지만 자동화하나

- AI 분류 정확도가 100%가 아닌 이상, **고객에게 직접 발송은 위험**합니다.
- 담당자는 초안을 검토·수정해 보냅니다. 응답 시간은 줄고, 사고 위험은 사람이 막습니다.
- 분류 정확도가 검증되면(예: 95%+) '기타' 외 유형부터 단계적으로 자동 발송을 열 수 있습니다.

> 💡 **핵심**: AI 자동화의 정석은 **판단(분류)과 초안은 AI, 최종 발송은 사람**. 신뢰가 데이터로 쌓인 뒤에 자동화 범위를 넓히세요.$aix$,
  $aix${"type":"flow","title":"고객 문의 AI 파이프라인","nodes":[{"label":"문의 수신","sublabel":"이메일 · 폼 · 웹훅","icon":"mail","tone":"warning"},{"label":"AI 분류","sublabel":"유형 + 긴급도 → JSON","icon":"brain","tone":"primary","edgeLabel":"문의 원문"},{"label":"AI 답변 초안","sublabel":"사람이 검토할 초안 생성","icon":"sparkles","tone":"accent","edgeLabel":"분류 결과"},{"label":"라우터 → 담당팀 배정","sublabel":"긴급도 상 = 매니저 멘션","icon":"users","tone":"success","edgeLabel":"유형별 분기"},{"label":"전 건 시트/CRM 기록","sublabel":"분류 정확도 검수용 데이터","icon":"database","tone":"muted"}],"caption":"AI는 분류와 초안까지, 고객에게 보내는 마지막 클릭은 사람이."}$aix$::jsonb, $aix${"title":"Slack에서 AI 분류 알림 받기 따라하기","app":{"kind":"chat-app","workspace":"우리 회사 워크스페이스","channels":[{"id":"ch-refund","name":"cs-환불","active":true},{"id":"ch-ship","name":"cs-배송"},{"id":"ch-biz","name":"제휴-문의"}],"composerId":"composer","messages":[{"id":"m-notice","author":"자동화봇","bot":true,"time":"오전 10:12","text":"새 문의 도착 — AI 분류: 환불 / 긴급도: 상","hidden":true},{"id":"m-summary","author":"자동화봇","bot":true,"time":"오전 10:12","text":"요약: 주문 2주째 미도착, 취소 요청. 긴급도 상 → @매니저 확인 바랍니다.","hidden":true},{"id":"m-draft","author":"자동화봇","bot":true,"time":"오전 10:12","text":"답변 초안: \"배송 지연으로 불편을 드려 죄송합니다. 요청하신 환불 절차를 바로 안내드리겠습니다…\"","hidden":true},{"id":"m-human","author":"나 (CS 담당)","time":"오전 10:15","text":"초안 확인했습니다. 다듬어서 발송할게요 ✅","hidden":true},{"id":"m-done","author":"자동화봇","bot":true,"time":"오전 10:15","text":"✓ 전 건 시트에 기록 완료 — 분류 정확도 검수 데이터로 적재했습니다.","hidden":true}]},"actions":[{"t":"caption","text":"① AI가 문의를 분류해 담당 채널로 알림을 보냅니다"},{"t":"reveal","target":"m-notice"},{"t":"wait","ms":600},{"t":"caption","text":"② 긴급도 '상' — 요약과 매니저 멘션이 붙습니다"},{"t":"reveal","target":"m-summary"},{"t":"move","target":"m-summary"},{"t":"wait","ms":500},{"t":"caption","text":"③ AI가 만든 답변 초안까지 함께 도착합니다"},{"t":"reveal","target":"m-draft"},{"t":"move","target":"m-draft"},{"t":"click"},{"t":"wait","ms":600},{"t":"caption","text":"④ 최종 발송은 사람 — 담당자가 초안을 검토합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"초안 확인했습니다. 다듬어서 발송할게요 ✅"},{"t":"wait","ms":400},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"m-human"},{"t":"caption","text":"⑤ 전 과정이 시트에 쌓여 AI 검수 데이터가 됩니다"},{"t":"reveal","target":"m-done"},{"t":"move","target":"m-done"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '535566e3-fd85-4ec8-ea45-a392c8fcf784', '78ec5d66-2ade-8a21-60e8-93c519f0bbaf', 'nocode-automation/operations-and-cost', 'operations-and-cost', '운영 관리: 실행 로그, 비용, 오퍼레이션 최적화',
  $aix$만든 자동화가 10개를 넘는 순간, 여러분의 역할은 제작자에서 **운영자**로 바뀝니다. 운영의 핵심은 로그와 비용, 두 개의 숫자를 읽는 일입니다.

## 실행 로그: 자동화의 블랙박스

- Make의 **History**, Zapier의 **Zap Runs**에서 실행별 입출력 데이터를 확인할 수 있습니다.
- "어제부터 알림이 안 와요"의 답은 항상 로그에 있습니다 — 트리거가 안 울렸는지, 중간 노드가 실패했는지 즉시 구분됩니다.
- 에러 알림 시나리오(강의 2-4)를 붙여 두면 로그를 매일 열어 보지 않아도 됩니다.

## 비용의 단위: 오퍼레이션

- Make는 **노드 1회 실행 = 1 오퍼레이션**, Zapier는 트리거 이후 **스텝 1회 = 1 태스크**로 과금합니다.
- 여기에 AI 노드는 **토큰 비용이 별도**로 듭니다 — AI 자동화 비용의 대부분은 이쪽입니다.

## 오퍼레이션 최적화 3수

1. **필터를 앞에** — 걸러질 데이터는 첫 노드 직후에 차단해 뒷 노드 실행을 아낍니다.
2. **폴링 간격 조정** — 15분마다 확인할 필요가 없다면 1시간으로. 웹훅화가 가능하면 최선.
3. **AI 입력 다이어트** — 이메일 전체가 아니라 필요한 필드만 프롬프트에 넣습니다.

> 💡 **핵심**: 운영 = **로그(건강)와 오퍼레이션(비용)** 두 계기판 읽기. 필터는 앞으로, 폴링은 웹훅으로, AI 입력은 가볍게.$aix$,
  $aix${"type":"cycle","title":"자동화 운영 사이클","center":"매주 반복","nodes":[{"label":"로그 점검","sublabel":"History · 실패 건 확인","icon":"eye"},{"label":"비용 분석","sublabel":"오퍼레이션 · AI 토큰","icon":"chart"},{"label":"최적화","sublabel":"필터 전진 · 웹훅화","icon":"wrench"},{"label":"재배포","sublabel":"수정 후 다시 활성화","icon":"rocket"}],"caption":"만들고 끝이 아닙니다 — 점검·분석·최적화가 매주 도는 운영 루프입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: SNS 자동 포스팅 봇 구축: AI API + Make
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'bf429837-e82a-5733-adbf-eda7e89203bc', 'sns-auto-bot', 'SNS 자동 포스팅 봇 구축: AI API + Make', $aix$콘텐츠는 꾸준함이 전부인데, 사람의 꾸준함에는 한계가 있습니다. 이 강의에서는 AI API와 노코드 자동화 도구 Make를 연결해 주제 선정부터 카피·이미지 생성, 검수, 인스타그램·블로그 발행까지 스스로 돌아가는 포스팅 파이프라인을 만듭니다. 발행 데이터를 다시 주제 큐로 되돌리는 개선 루프와 계정을 지키는 정책 준수까지 — 하루 10분 관리로 매일 발행되는 시스템을 완성합니다.$aix$,
  null, 'business', 'intermediate', array['Make', 'SNS 자동화', '인스타그램 API', 'AI 카피라이팅', '노코드']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'bf429837-e82a-5733-adbf-eda7e89203bc', 'system-design', '설계: 자동 포스팅 시스템의 뼈대', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'a76bb583-7de2-68c3-2284-c72dc71e594b', 'bf429837-e82a-5733-adbf-eda7e89203bc', 'build-pipeline', '구축: Make로 발행 라인 연결하기', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '4d6e7968-627d-db7b-affa-b7be3076d42b', 'bf429837-e82a-5733-adbf-eda7e89203bc', 'safe-operations', '운영: 품질과 계정을 지키는 루프', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '09e50aa7-0d38-c4d0-c7e9-e6d0f74283b4', 'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'sns-auto-bot/auto-posting-architecture', 'auto-posting-architecture', '전체 아키텍처: 주제에서 발행까지의 파이프라인',
  $aix$"매일 올리자"는 다짐은 3주를 못 갑니다. 오래가는 계정은 의지가 아니라 **시스템** 위에서 돌아갑니다.

## 자동 포스팅의 5단계 파이프라인

- **주제 소스** — 스프레드시트·노션에 쌓아둔 주제 큐에서 오늘의 소재를 꺼냅니다.
- **생성** — AI API가 카피와 이미지를 플랫폼별 형식으로 만듭니다.
- **검수** — 금칙어·형식·사실 여부를 기계적으로 거르고, 필요하면 사람이 승인합니다.
- **발행** — Make가 인스타그램 그래프 API와 블로그 API를 호출합니다.
- **환류** — 도달·참여 데이터를 수집해 다음 주제 선정에 반영합니다.

## 왜 Make인가

- 인스타그램·워드프레스·구글 시트 등 **공식 모듈**이 이미 준비돼 있어 API 코드를 직접 짤 일이 적습니다.
- 시나리오(플로우)를 그림처럼 그려서 **비개발자도 유지보수**할 수 있습니다.
- HTTP 모듈로 AI API 등 모듈이 없는 서비스도 붙일 수 있습니다.

이 강의의 나머지 전부는 이 다섯 상자를 하나씩 채우는 과정입니다.

> 💡 **핵심**: 자동 포스팅 봇 = **큐 → 생성 → 검수 → 발행 → 환류**. 발행에서 끝나지 않고 데이터가 큐로 되돌아와야 '시스템'입니다.$aix$,
  $aix${"type":"flow","title":"자동 포스팅 파이프라인","nodes":[{"label":"주제 큐","sublabel":"스프레드시트 · 노션","icon":"calendar","tone":"muted"},{"label":"AI 생성","sublabel":"카피 + 이미지","icon":"sparkles","tone":"primary"},{"label":"검수 게이트","sublabel":"금칙어 · 형식 · 승인","icon":"shield","tone":"warning"},{"label":"발행","sublabel":"인스타그램 · 블로그","icon":"send","tone":"accent"},{"label":"성과 수집","sublabel":"도달 · 참여 데이터","icon":"chart","tone":"success"}],"loopBack":{"from":4,"to":0,"label":"잘된 주제를 큐에 환류"},"caption":"성과 데이터가 주제 큐로 되돌아오는 순간, 봇은 스스로 나아지기 시작합니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8094cd94-4041-7e80-44c9-2c4dbb4ee2b9', 'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'sns-auto-bot/content-calendar-queue', 'content-calendar-queue', '콘텐츠 캘린더와 주제 큐 설계',
  $aix$봇이 매일 멈추지 않으려면 "오늘 뭘 올리지?"라는 질문이 시스템 안에서 이미 답해져 있어야 합니다. 그 답이 **주제 큐**입니다.

## 큐는 시트 한 장이면 충분합니다

구글 스프레드시트(또는 노션 데이터베이스)에 행 하나 = 포스트 하나로 관리합니다. 필수 컬럼은 5개뿐입니다.

- **주제** — 한 줄 소재 ("여름 휴가철 짐 싸기 체크리스트")
- **핵심 메시지** — AI에게 줄 방향 한 문장
- **발행일 / 플랫폼** — 언제, 어디에
- **상태** — `대기 → 생성됨 → 승인 → 발행됨` (Make가 이 값을 보고 움직입니다)
- **결과 링크** — 발행 후 봇이 채워 넣는 증거

## 큐를 마르지 않게 하는 법

- 콘텐츠 필러(pillar) 3~4개를 정하고 요일별로 배정합니다 — 월: 정보, 수: 후기, 금: 프로모션.
- 주 1회 30분, AI에게 필러별 주제 20개를 뽑게 해 큐를 채웁니다. 사람은 **고르기만** 합니다.
- 잔여 큐가 7개 미만이면 알림을 보내는 시나리오를 하나 더 둡니다.

> 💡 **핵심**: 상태 컬럼이 곧 봇의 신호등입니다. Make는 "상태 = 승인"인 행만 집어 발행하고, 끝나면 "발행됨"으로 바꿉니다.$aix$,
  $aix${"type":"steps","title":"주제 큐 구축 4단계","steps":[{"label":"필러 정하기","sublabel":"정보 · 후기 · 프로모션 등 3~4개","icon":"target"},{"label":"큐 시트 만들기","sublabel":"주제 · 발행일 · 상태 · 결과 컬럼","icon":"clipboard"},{"label":"AI로 대량 채우기","sublabel":"필러별 주제 20개 생성 → 사람이 선별","icon":"sparkles"},{"label":"Make에 연결","sublabel":"상태 값 기준으로 행을 읽고 갱신","icon":"workflow"}],"caption":"사람은 주 1회 큐를 채우고, 나머지 6일은 봇이 큐를 소비합니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8708642c-ae0e-f48f-ca70-68619adf1a94', 'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'sns-auto-bot/brand-voice-copywriting', 'brand-voice-copywriting', 'AI 카피 생성: 브랜드 보이스와 플랫폼별 형식',
  $aix$AI 카피의 문제는 못 쓰는 게 아니라 **누가 써도 똑같다**는 것입니다. 해법은 브랜드 보이스를 프롬프트에 박제하는 것입니다.

## 브랜드 보이스 프롬프트의 3요소

시스템 프롬프트에 한 번 정의해두고 매 호출에 재사용합니다.

- **정체성** — 누구인가: "10년 차 여행 가이드가 친구에게 말하듯"
- **규칙** — 항상/절대: "항상 해요체, 이모지는 문단당 1개, 과장 표현('무조건','최고') 금지"
- **실제 예시 2~3개** — 잘 쓴 과거 포스트 원문. 형용사 열 개보다 예시 하나가 강합니다.

## 플랫폼별 형식은 출력 스펙으로

같은 주제라도 채널마다 완성형이 다르므로, 한 번의 호출에서 **JSON으로 두 벌**을 받습니다.

- **인스타그램**: 첫 문장 훅 + 본문 500자 이내 + 해시태그 10개 내외
- **블로그**: 검색 키워드가 든 제목 + 소제목 구조 + 1,500자 이상

```text
출력은 JSON으로:
{ "instagram": { "caption", "hashtags" },
  "blog": { "title", "html_body" } }
```

JSON으로 받아야 Make가 필드를 그대로 다음 모듈에 꽂을 수 있습니다.

> 💡 **핵심**: 보이스는 **시스템 프롬프트에 예시로**, 형식은 **JSON 출력 스펙으로**. 이 분리가 자동화 가능한 카피의 조건입니다.$aix$,
  $aix${"type":"chat","title":"브랜드 보이스 프롬프트 실전","messages":[{"role":"system","text":"10년 차 여행 가이드가 친구에게 말하듯. 해요체, 과장 금지, 이모지 문단당 1개. [예시 포스트 2건 첨부]"},{"role":"user","text":"주제: 여름 휴가철 짐 싸기 체크리스트. 인스타 캡션과 블로그 글을 JSON으로."},{"role":"ai","text":"{ \"instagram\": { \"caption\": \"캐리어 앞에서 30분째 고민 중이라면… ✈️ 이 5가지만 기억하세요.\", \"hashtags\": [\"#여름휴가\", \"#짐싸기꿀팁\", …] }, \"blog\": { \"title\": \"여름 휴가 짐 싸기 체크리스트 5가지\", … } }"}],"caption":"같은 주제, 한 번의 호출로 플랫폼별 완성본 두 벌을 받습니다."}$aix$::jsonb, $aix${"title":"브랜드 보이스 카피 생성 따라하기","app":{"kind":"browser","url":"playground.ai-studio.dev","blocks":[{"id":"b-head","type":"heading","label":"AI 카피 스튜디오"},{"id":"b-sys-label","type":"text","label":"시스템 프롬프트 (브랜드 보이스)"},{"id":"b-sys-input","type":"input","label":"브랜드 보이스를 입력하세요…"},{"id":"b-topic-input","type":"input","label":"오늘의 주제를 입력하세요…"},{"id":"b-json-badge","type":"badge","label":"JSON 출력 모드"},{"id":"b-gen-btn","type":"button","label":"카피 생성"},{"id":"b-card-insta","type":"card","label":"📸 Instagram — \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"","hidden":true},{"id":"b-card-tags","type":"card","label":"#여름휴가 #짐싸기꿀팁 #여행준비 외 7개","hidden":true},{"id":"b-card-blog","type":"card","label":"📝 Blog — 여름 휴가 짐 싸기 체크리스트 5가지 (1,800자)","hidden":true}]},"actions":[{"t":"caption","text":"① 브랜드 보이스를 시스템 프롬프트에 입력합니다"},{"t":"move","target":"b-sys-input"},{"t":"click"},{"t":"type","target":"b-sys-input","text":"10년 차 여행 가이드처럼 해요체, 과장 금지"},{"t":"wait","ms":400},{"t":"caption","text":"② 주제 큐에서 가져온 오늘의 소재를 붙여넣습니다"},{"t":"click","target":"b-topic-input"},{"t":"type","target":"b-topic-input","text":"여름 휴가철 짐 싸기 체크리스트"},{"t":"caption","text":"③ JSON 출력 모드를 켜고 생성을 실행합니다"},{"t":"move","target":"b-json-badge"},{"t":"click"},{"t":"move","target":"b-gen-btn"},{"t":"click"},{"t":"wait","ms":700},{"t":"caption","text":"④ 인스타그램 캡션과 해시태그가 먼저 도착합니다"},{"t":"reveal","target":"b-card-insta"},{"t":"reveal","target":"b-card-tags"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 같은 호출에서 블로그 버전도 함께 받습니다"},{"t":"reveal","target":"b-card-blog"},{"t":"move","target":"b-card-blog"},{"t":"caption","text":"✅ 한 번의 호출로 두 플랫폼 완성본 — Make가 필드를 그대로 씁니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a77d817a-1d19-a42f-0e88-25354d64653d', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/auto-image-generation', 'auto-image-generation', '이미지 자동 생성: 카드뉴스와 썸네일',
  $aix$인스타그램은 결국 이미지 플랫폼입니다. 텍스트 봇에서 멈추면 절반짜리 자동화입니다.

## 두 가지 전략, 용도가 다릅니다

- **AI 이미지 생성 API** — 매번 새로운 비주얼. 감성 컷·배경 이미지에 적합하지만 브랜드 일관성 유지가 어렵습니다.
- **템플릿 렌더링(Bannerbear·Placid 등)** — 디자이너가 만든 템플릿에 **텍스트·이미지 변수만 치환**. 카드뉴스·정보성 썸네일의 정석이며, 100장을 만들어도 톤이 같습니다.

실무 조합은 "배경은 AI 생성, 텍스트 레이어는 템플릿"입니다.

## Make에서의 연결

1. 카피 생성 결과에서 헤드라인을 추출합니다.
2. 템플릿 API에 `headline`, `background_url` 변수를 넘겨 렌더링합니다.
3. 결과 이미지 URL을 발행 모듈로 전달합니다.

## 규격을 처음부터 맞추세요

- 인스타그램 피드 1:1(1080×1080) 또는 4:5(1080×1350)
- 스토리·릴스 커버 9:16(1080×1920)
- 블로그 대표 이미지 16:9(1200×675)

템플릿을 규격별로 미리 만들어두면 리사이즈 단계가 통째로 사라집니다.

> 💡 **핵심**: 브랜드 일관성이 필요한 이미지는 **생성이 아니라 치환**입니다. AI는 소재를, 템플릿은 톤을 담당합니다.$aix$,
  $aix${"type":"grid","title":"이미지 자동화 구성 요소","items":[{"label":"AI 이미지 생성","sublabel":"새로운 비주얼 소재","icon":"wand","tone":"primary"},{"label":"템플릿 렌더링","sublabel":"카드뉴스 · 변수 치환","icon":"palette","tone":"accent"},{"label":"브랜드 에셋","sublabel":"로고 · 폰트 · 컬러 고정","icon":"layers","tone":"muted"},{"label":"플랫폼 규격","sublabel":"1:1 · 4:5 · 9:16 · 16:9","icon":"image","tone":"muted"},{"label":"이미지 URL 전달","sublabel":"발행 API가 URL로 수신","icon":"link","tone":"success"},{"label":"대체 텍스트","sublabel":"접근성 + 검색 노출","icon":"file-text","tone":"muted"}],"caption":"여섯 조각이 모여 '사람이 만든 것 같은' 이미지 라인이 됩니다."}$aix$::jsonb, null, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'de5927e6-6d7d-8a60-258f-0f12d045f386', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/instagram-graph-api', 'instagram-graph-api', '인스타그램 그래프 API: 계정 연결과 제약',
  $aix$인스타그램 자동 발행의 관문은 코드가 아니라 **계정 설정**입니다. 여기서 90%가 막히니 순서대로 갑니다.

## 발행까지의 연결 사슬

1. 인스타그램 계정을 **프로페셔널(비즈니스) 계정**으로 전환합니다 — 개인 계정은 API 발행이 불가합니다.
2. 페이스북 페이지를 만들고 인스타그램 계정과 **연결**합니다.
3. Meta 개발자 앱을 만들고 `instagram_content_publish` 등 권한을 받습니다.
4. Make의 인스타그램 비즈니스 모듈에 로그인하면 토큰 갱신은 Make가 대신 처리합니다.

## 반드시 알아야 할 제약 (2026 기준)

- 발행은 **2단계**입니다: 미디어 컨테이너 생성 → 발행 확정. Make 모듈이 감싸주지만 실패 시 디버깅에 필요한 지식입니다.
- 이미지는 파일 업로드가 아니라 **공개 URL**로 전달합니다 — 앞 레슨에서 URL을 받아둔 이유입니다.
- API 발행은 **24시간당 계정별 상한**(수십 건 수준)이 있습니다. 하루 1~3회 발행 봇에는 충분합니다.
- 스토리·릴스 발행은 지원 범위와 형식 제약이 다르므로 피드부터 안정화하세요.

> 💡 **핵심**: 순서는 **비즈니스 계정 → 페이지 연결 → 권한 → Make 로그인**. 발행 실패의 대부분은 코드가 아니라 이 사슬의 어딘가가 끊긴 것입니다.$aix$,
  $aix${"type":"stack","title":"인스타그램 발행의 연결 사슬","layers":[{"label":"Make 시나리오","sublabel":"발행 모듈 · 토큰 자동 갱신","icon":"workflow","tone":"primary"},{"label":"Meta 개발자 앱","sublabel":"instagram_content_publish 권한","icon":"key","tone":"accent"},{"label":"페이스북 페이지","sublabel":"인스타그램 계정과 연결","icon":"link","tone":"muted"},{"label":"인스타그램 비즈니스 계정","sublabel":"개인 계정은 API 발행 불가","icon":"camera","tone":"warning"}],"caption":"위에서 아래까지 한 층이라도 끊기면 발행은 실패합니다 — 아래층부터 점검하세요."}$aix$::jsonb, $aix${"title":"Make에서 발행 시나리오 조립 따라하기","app":{"kind":"automation-canvas","windowTitle":"daily-post 시나리오 — Make","nodes":[{"id":"n-sheet","icon":"clipboard","label":"Google Sheets","sublabel":"상태=승인 행 읽기","tone":"accent"},{"id":"n-copy","icon":"sparkles","label":"AI 카피","sublabel":"JSON 두 벌 생성","tone":"primary","hidden":true},{"id":"n-image","icon":"image","label":"이미지 렌더링","sublabel":"템플릿 변수 치환","tone":"muted","hidden":true},{"id":"n-insta","icon":"camera","label":"Instagram 발행","sublabel":"비즈니스 계정 · 공개 URL","tone":"warning","hidden":true},{"id":"n-update","icon":"refresh","label":"시트 갱신","sublabel":"상태=발행됨 기록","tone":"success","hidden":true}],"runLog":[{"id":"log-run","text":"▶ 시나리오 1회 실행 시작","tone":"out","hidden":true},{"id":"log-sheet","text":"✓ 시트: 승인 상태 1건 로드","tone":"ok","hidden":true},{"id":"log-container","text":"✓ 미디어 컨테이너 생성 — 2단계 발행 1/2","tone":"ok","hidden":true},{"id":"log-publish","text":"✓ 발행 확정 — 게시물 ID 1789… (2/2)","tone":"ok","hidden":true},{"id":"log-done","text":"✓ 시트 갱신: 상태=발행됨, 결과 링크 기록","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 주제 큐를 읽는 구글 시트 모듈부터 놓습니다"},{"t":"move","target":"n-sheet"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 카피를 만드는 AI 모듈을 이어 붙입니다"},{"t":"reveal","target":"n-copy"},{"t":"move","target":"n-copy"},{"t":"click"},{"t":"caption","text":"③ 이미지 렌더링과 인스타그램 발행 모듈을 연결합니다"},{"t":"reveal","target":"n-image"},{"t":"reveal","target":"n-insta"},{"t":"move","target":"n-insta"},{"t":"click"},{"t":"caption","text":"④ 마지막에 시트 상태를 갱신하는 모듈을 답니다"},{"t":"reveal","target":"n-update"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 1회 실행으로 컨테이너 생성 → 발행 확정 2단계를 확인합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-sheet"},{"t":"reveal","target":"log-container"},{"t":"reveal","target":"log-publish"},{"t":"move","target":"log-publish"},{"t":"reveal","target":"log-done"},{"t":"caption","text":"✅ 큐에서 발행까지 무인 라인 완성 — 실패하면 로그의 단계부터 봅니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9a160035-af47-4377-8dc3-26da6ea61b93', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/blog-publishing', 'blog-publishing', '블로그 발행 자동화: 워드프레스와 티스토리',
  $aix$블로그는 인스타그램과 반대로 **검색 유입의 저수지**입니다. 같은 파이프라인에서 긴 글 버전을 흘려보냅니다.

## 워드프레스: 자동화의 정석

- 공식 **REST API**가 안정적이고, Make에 전용 모듈이 있습니다.
- 애플리케이션 비밀번호를 발급해 연결하면 제목·본문(HTML)·카테고리·대표 이미지·예약 발행까지 전부 API로 제어됩니다.
- 자체 도메인이라 계정 정지 리스크가 없고, 콘텐츠 자산이 온전히 내 것입니다.

## 티스토리: 우회 설계가 필요

- 공개 Open API가 **신규 발급 중단**된 상태라 정공법 연결이 어렵습니다.
- 현실적 대안: 완성 원고를 이메일/노션으로 받아 **사람이 3분 만에 붙여넣는 반자동**, 또는 브라우저 자동화 도구 활용(차단 리스크는 감수).
- 장기 운영이라면 워드프레스나 자체 블로그로의 이전을 권합니다.

## 발행 후 마무리 훅

- 발행된 글 URL을 큐 시트의 결과 컬럼에 기록합니다.
- 같은 URL을 인스타그램 프로필 링크 도구나 스토리로 재활용하면 채널 간 순환이 생깁니다.

> 💡 **핵심**: 자동화 친화도는 플랫폼마다 다릅니다. **API가 열려 있는 곳에 본진**을 두고, 닫힌 곳은 반자동으로 타협하세요.$aix$,
  $aix${"type":"compare","title":"워드프레스 vs 티스토리 자동화","columns":[{"title":"워드프레스","icon":"globe","tone":"primary","items":["공식 REST API + Make 전용 모듈","예약 발행 · 카테고리 · 대표 이미지 제어","자체 도메인 — 정지 리스크 없음","완전 무인 발행 가능"]},{"title":"티스토리","icon":"alert","tone":"warning","items":["Open API 신규 발급 중단","반자동(원고 전달 → 수동 게시)이 현실적","브라우저 자동화는 차단 리스크","장기적으로 이전 검토 권장"]}],"caption":"본진은 API가 열린 플랫폼에 — 자동화 가능성이 곧 플랫폼 선택 기준입니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '59b745b7-bf8b-979d-8ff6-ffb86dfa0fbc', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/scheduling', 'scheduling', '스케줄링과 최적 발행 시간',
  $aix$콘텐츠가 준비됐어도 **언제 올리느냐**로 도달이 갈립니다. 스케줄링은 봇의 심장 박동입니다.

## Make 스케줄링의 두 층

- **시나리오 트리거** — 시나리오 자체를 "매일 07:30 실행"처럼 예약합니다. 큐에서 오늘 날짜 행을 읽어 발행하는 가장 단순한 구조입니다.
- **행 단위 예약** — 큐 시트에 발행 시각 컬럼을 두고, 15분마다 도는 시나리오가 "지금 시각 ≤ 예약 시각인 승인 행"만 집어 발행합니다. 포스트마다 다른 시간을 줄 수 있습니다.

## 최적 시간은 정답이 아니라 실험값

- 출발점: 인스타그램은 출근길(7~9시)·점심(12시)·밤(20~22시), 블로그는 검색이 몰리는 오전.
- 단, **내 팔로워의 활동 시간**이 통계를 이깁니다. 인사이트의 활동 시간대를 매달 확인해 예약 규칙을 갱신하세요.
- 같은 필러를 두 시간대에 번갈아 발행해 4주간 도달을 비교하면 자체 데이터가 생깁니다.

## 운영 팁

- 발행 성공/실패를 슬랙·텔레그램으로 알림 받는 모듈을 끝에 붙이세요. 침묵하는 봇이 가장 위험합니다.

> 💡 **핵심**: 스케줄은 **고정값이 아니라 실험 변수**입니다. 시각 컬럼 하나로 발행 시간을 데이터로 관리하세요.$aix$,
  $aix${"type":"terminal","windowTitle":"Make — 시나리오 실행 로그","lines":[{"text":"[07:30:00] 시나리오 'daily-post' 시작","tone":"cmd"},{"text":"큐 조회: 상태=승인, 예약시각≤07:30 → 1건","tone":"out"},{"text":"AI 카피 로드 · 이미지 URL 확인 … OK","tone":"ok"},{"text":"Instagram: 컨테이너 생성 → 발행 완료 (id: 1789…)","tone":"ok"},{"text":"WordPress: 초안 → 공개 전환 완료","tone":"ok"},{"text":"시트 갱신: 상태=발행됨, 결과 링크 기록","tone":"out"},{"text":"# 실패 시: 텔레그램 알림 + 상태=오류","tone":"comment"},{"text":"[07:30:41] 완료 — 다음 실행 07:45","tone":"dim"}],"caption":"15분 주기로 도는 시나리오가 예약 시각이 된 행만 집어 발행합니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '47651e39-1d27-dbe2-6f4e-f883b7cf1dc3', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/quality-gate', 'quality-gate', '품질 가드: 발행 전 검수 게이트 만들기',
  $aix$자동화의 진짜 리스크는 오타가 아니라 **틀린 내용이 브랜드 이름으로 매일 나가는 것**입니다. 발행 앞에 게이트를 세웁니다.

## 3겹의 자동 검사

Make 시나리오에서 발행 모듈 **직전**에 필터를 겹칩니다.

- **금칙어 검사** — 과장·의료·금융 관련 위험 표현("100% 보장", "부작용 없음"), 경쟁사명, 비속어 목록과 대조합니다.
- **형식 검사** — 글자 수 상한, 해시태그 개수, 이미지 URL 응답 확인, 링크 유효성.
- **AI 교차 검수** — 생성과 **다른 모델·다른 프롬프트**로 "사실 오류·과장·보이스 이탈"을 채점하게 합니다. 자기가 쓴 글을 자기가 검사하게 하면 안 됩니다.

## 휴먼 승인은 옵션이 아니라 다이얼

- **초기(1~4주)**: 전수 승인 — 승인 요청을 텔레그램으로 받고, 버튼 한 번으로 상태를 "승인"으로 바꿉니다.
- **안정기**: 표본 승인 — 민감 필러(프로모션·시사)만 사람이 보고 나머지는 자동 통과.
- 반려된 포스트는 반려 사유와 함께 생성 단계로 되돌립니다. 이 반려 루프가 프롬프트 개선의 원료가 됩니다.

> 💡 **핵심**: 게이트는 **기계 검사 3겹 + 사람 승인 다이얼**. 신뢰가 쌓이는 만큼만 다이얼을 자동 쪽으로 돌리세요.$aix$,
  $aix${"type":"flow","title":"발행 전 검수 게이트","nodes":[{"label":"AI 생성 완료","sublabel":"카피 + 이미지","icon":"sparkles","tone":"muted"},{"label":"자동 검사","sublabel":"금칙어 · 형식 · 링크","icon":"filter","tone":"accent"},{"label":"AI 교차 검수","sublabel":"다른 모델이 사실·보이스 채점","icon":"eye","tone":"primary","edgeLabel":"자동 검사 통과 시"},{"label":"휴먼 승인","sublabel":"텔레그램 버튼 승인 (다이얼 조절)","icon":"user","tone":"warning"},{"label":"발행","sublabel":"인스타그램 · 블로그","icon":"send","tone":"success"}],"loopBack":{"from":3,"to":0,"label":"반려 시 사유와 함께 재생성"},"caption":"반려 사유가 생성 단계로 되돌아가는 루프가 품질을 누적시킵니다."}$aix$::jsonb, $aix${"title":"발행 전 검수 승인 따라하기","app":{"kind":"chat-app","workspace":"브랜드 운영팀","channels":[{"id":"ch-review","name":"포스팅-검수","active":true},{"id":"ch-publish","name":"발행-알림"},{"id":"ch-report","name":"성과-리포트"}],"composerId":"composer","messages":[{"id":"m-draft","author":"포스팅봇","bot":true,"time":"오후 6:02","text":"내일 07:30 발행 예정 초안입니다.\n주제: 여름 휴가철 짐 싸기 체크리스트\n훅: \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"","hidden":true},{"id":"m-auto-check","author":"포스팅봇","bot":true,"time":"오후 6:02","text":"자동 검사 통과: 금칙어 0건 · 해시태그 9개 · 이미지 URL 정상","hidden":true},{"id":"m-cross-check","author":"포스팅봇","bot":true,"time":"오후 6:03","text":"AI 교차 검수(다른 모델): 사실 오류 없음 · 과장 표현 없음 · 보이스 점수 9/10","hidden":true},{"id":"m-approve","author":"나 (운영자)","time":"오후 6:07","text":"검수 결과 확인했습니다. 승인합니다 ✅","hidden":true},{"id":"m-scheduled","author":"포스팅봇","bot":true,"time":"오후 6:07","text":"✅ 큐 시트 상태=승인 갱신 — 내일 07:30 인스타그램·블로그 발행 예약 완료","hidden":true}]},"actions":[{"t":"caption","text":"① 봇이 발행 전 초안과 자동 검사 결과를 올립니다"},{"t":"reveal","target":"m-draft"},{"t":"reveal","target":"m-auto-check"},{"t":"wait","ms":600},{"t":"caption","text":"② 다른 모델의 교차 검수 점수까지 확인합니다"},{"t":"reveal","target":"m-cross-check"},{"t":"move","target":"m-cross-check"},{"t":"click"},{"t":"wait","ms":500},{"t":"caption","text":"③ 사람은 판단만 — 승인 코멘트를 입력합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"검수 결과 확인했습니다. 승인합니다 ✅"},{"t":"wait","ms":400},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"m-approve"},{"t":"caption","text":"④ 승인 즉시 봇이 큐 상태를 갱신하고 발행을 예약합니다"},{"t":"reveal","target":"m-scheduled"},{"t":"move","target":"m-scheduled"},{"t":"caption","text":"✅ 검수 게이트 통과 — 판단은 사람, 실행은 봇의 몫입니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '87e76eba-0a98-db6f-902f-df40526eb508', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/measure-improve', 'measure-improve', '성과 측정과 개선 루프: 데이터가 큐를 채운다',
  $aix$발행까지 자동화했다면 절반입니다. 나머지 절반은 **무엇이 통했는지를 시스템이 스스로 배우게** 하는 것입니다.

## 주간 환류 사이클

주 1회 도는 별도 시나리오를 만듭니다.

1. **수집** — 인스타그램 인사이트 API에서 도달·저장·공유를, 블로그에서 조회·체류를 지난 7일 치 가져와 시트에 적재합니다.
2. **분석** — AI에게 상위 20%와 하위 20% 포스트를 주고 "주제·훅 문장·발행 시간의 패턴"을 요약하게 합니다.
3. **반영** — 잘된 필러의 비중을 늘리고, 잘된 훅 스타일을 브랜드 보이스 프롬프트의 예시로 교체합니다.
4. **재발행** — 6개월 이상 지난 히트 콘텐츠는 새 이미지로 리메이크해 큐에 다시 넣습니다.

## 지표는 플랫폼 목적에 맞게

- 인스타그램: 팔로워 수보다 **저장·공유율** — 알고리즘이 확산을 결정하는 신호입니다.
- 블로그: 조회수보다 **검색 유입 키워드** — 다음 주제 선정의 직접 재료입니다.

## 사람의 역할

주간 리포트를 읽고 방향만 결정합니다 — "이번 달은 후기 필러 강화". 실행은 다시 봇의 몫입니다.

> 💡 **핵심**: 성과 데이터가 **주제 큐와 프롬프트 예시로 되돌아가는** 순간, 봇은 반복기가 아니라 학습기가 됩니다.$aix$,
  $aix${"type":"cycle","title":"주간 개선 루프","center":"매주 1회 자동 순환","nodes":[{"label":"발행","sublabel":"매일 자동 포스팅","icon":"send"},{"label":"수집","sublabel":"도달 · 저장 · 검색 유입","icon":"chart"},{"label":"분석","sublabel":"AI가 상·하위 패턴 요약","icon":"brain"},{"label":"반영","sublabel":"큐 비중 · 프롬프트 예시 갱신","icon":"refresh"}],"caption":"이 사이클이 돌 때마다 다음 주 콘텐츠의 평균 성적이 올라갑니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4985e147-503c-7a3c-e736-ada35fd4b925', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/policy-and-account-safety', 'policy-and-account-safety', '플랫폼 정책 준수: 계정이 살아야 봇도 산다',
  $aix$자동화 봇 최악의 결말은 버그가 아니라 **계정 정지**입니다. 몇 년 키운 계정은 복구가 안 되니, 정책 준수는 기능이 아니라 전제입니다.

## 지켜야 할 선 (2026 기준)

- **공식 API만 사용** — 비공식 자동화 앱·계정 공유·매크로 앱은 탐지 즉시 제재 대상입니다. 그래프 API를 쓰는 것 자체가 최고의 방어입니다.
- **발행 빈도 절제** — API 상한과 별개로, 피드 기준 하루 1~2회가 안전선입니다. 갑작스러운 빈도 급증은 스팸 신호로 읽힙니다.
- **반복 콘텐츠 금지** — 같은 문구·해시태그 세트의 반복은 스팸 필터에 걸립니다. 해시태그 풀을 30개 이상 두고 회전시키세요.
- **자동 상호작용 금지** — 자동 팔로우·좋아요·DM·댓글은 발행 자동화와 전혀 다른 취급을 받습니다. 이 강의 범위 밖이며, 하지 마세요.

## 광고·출처 표기

- 협찬·제휴 콘텐츠는 `#광고` 등 표시 의무를 프롬프트와 검수 게이트 양쪽에 규칙으로 넣습니다.
- AI 생성 이미지에 실존 인물·브랜드가 연상되는 표현이 없는지 검수 항목에 포함하세요.

## 최후의 안전장치

토큰 만료·정책 변경 공지를 월 1회 점검하는 캘린더 반복 일정을 만드세요. 봇은 방치한 만큼 위험해집니다.

> 💡 **핵심**: 오래가는 봇의 조건은 기술이 아니라 **절제**입니다 — 공식 API, 사람 같은 빈도, 반복 없는 콘텐츠.$aix$,
  $aix${"type":"compare","title":"정지당하는 봇 vs 오래가는 봇","columns":[{"title":"정지당하는 봇","icon":"x","tone":"warning","items":["비공식 앱 · 매크로로 발행","하루 수십 건 폭탄 발행","같은 해시태그 세트 복붙","자동 팔로우 · 좋아요 · DM"]},{"title":"오래가는 봇","icon":"shield","tone":"success","items":["공식 그래프 API + Make","하루 1~2회, 일정한 리듬","해시태그 풀 30개 이상 회전","발행만 자동화, 소통은 사람이"]}],"caption":"계정은 봇의 유일한 자산입니다 — 절제가 곧 수명입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 수익화: 전자책 · 스톡 이미지 파이프라인
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '206a3f5e-81d2-d22f-39ed-625dae1dc109', 'ai-passive-income', 'AI 수익화: 전자책 · 스톡 이미지 파이프라인', $aix$'AI로 월 천만 원'이라는 광고는 넘쳐나지만, 실제로 남는 것은 파이프라인을 만든 사람뿐입니다. 이 강의는 과장을 걷어내고 2026년 기준으로 실제 작동하는 두 가지 수익 모델 — 전자책과 스톡 이미지 — 의 제작·판매 파이프라인을 처음부터 끝까지 구축합니다. 니치 검증, AI 초안과 사람의 편집 분업, 플랫폼별 AI 콘텐츠 정책, 판매 데이터 기반 개선 루프까지 현실적인 순서로 배웁니다.$aix$,
  null, 'business', 'beginner', array['AI 수익화', '전자책', '스톡 이미지', 'KDP', '디지털 자산']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '83964f32-349e-a6d2-f48a-556b196341e0', '206a3f5e-81d2-d22f-39ed-625dae1dc109', 'reality-and-strategy', '수익화의 현실과 전략', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '42e48838-8148-c842-f738-80e882570a01', '206a3f5e-81d2-d22f-39ed-625dae1dc109', 'ebook-pipeline', '전자책 파이프라인', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '9a0cec31-c225-d7a0-2f84-875c820e39ca', '206a3f5e-81d2-d22f-39ed-625dae1dc109', 'stock-image-pipeline', '스톡 이미지 파이프라인', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'db8849f6-23c2-5e88-11ea-ea71b8557589', '83964f32-349e-a6d2-f48a-556b196341e0', 'ai-passive-income/realistic-expectations', 'realistic-expectations', '현실적 기대치: ''월 천만 원'' 광고 해부하기',
  $aix$AI 수익화에서 가장 먼저 만들어야 할 자산은 전자책이 아니라 **정확한 기대치**입니다.

## 과장 마케팅의 공통 패턴

- "하루 10분, 클릭 몇 번" — 제작 시간은 줄었지만 **선별·편집·등록·개선** 시간은 그대로입니다.
- "AI가 다 해준다" — AI가 다 해주는 것은 경쟁자도 똑같이 만들 수 있다는 뜻입니다.
- 수익 인증 스크린샷 — 대부분 광고 수익(강의 판매)이지, 그 방법 자체의 수익이 아닙니다.

## 실제 수익 구조

- **자산 1개의 수익은 작습니다.** 전자책 한 권, 이미지 한 장의 월 수익은 몇천 원~몇만 원 수준이 현실입니다.
- 대신 **자산 수 × 개당 수익 × 시간**의 곱으로 쌓입니다. 파이프라인이 필요한 이유입니다.
- 첫 수익까지 보통 **1~3개월**, 의미 있는 수익까지는 꾸준한 반복이 전제입니다.

## 그럼에도 할 만한 이유

- 한 번 만든 자산은 잠든 사이에도 팔립니다 — 노동 시간과 수익이 분리됩니다.
- AI는 제작 원가를 극적으로 낮췄습니다. 남은 승부처는 **기획과 선별**입니다.

> 💡 **핵심**: AI 수익화는 복권이 아니라 **소액 자산을 꾸준히 쌓는 파이프라인 사업**입니다. 기대치가 정확해야 3개월을 버팁니다.$aix$,
  $aix${"type":"compare","title":"과장 마케팅 vs 현실","columns":[{"title":"광고가 말하는 것","icon":"alert","tone":"warning","items":["하루 10분, 클릭 몇 번","첫 달부터 월 천만 원","AI가 전부 알아서","누구나 즉시 가능"]},{"title":"실제 수익 구조","icon":"chart","tone":"primary","items":["자산 1개 수익은 소액","자산 수 × 시간으로 누적","선별·편집은 사람의 몫","첫 수익까지 1~3개월"]}],"caption":"제작 원가는 내려갔지만, 기획·선별·개선의 노동은 그대로 남아 있습니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0bf2b54a-30cd-8019-4573-db69c5246d27', '83964f32-349e-a6d2-f48a-556b196341e0', 'ai-passive-income/finding-your-niche', 'finding-your-niche', '팔리는 니치 찾기: 수요와 경쟁의 교차점',
  $aix$무엇을 만들지 정하는 30분이 무엇을 만드는 30시간보다 수익을 더 크게 좌우합니다.

## 니치의 공식

팔리는 니치 = **검색 수요는 있는데, 공급 품질이 낮은 곳**. 둘 다 데이터로 확인할 수 있습니다.

- **수요 확인**: 아마존·플랫폼 검색창 자동완성, 구글 트렌드, 키워드 도구의 월 검색량.
- **경쟁 확인**: 상위 결과의 리뷰 수·평점·출간일. 리뷰 수백 개짜리 강자가 즐비하면 후순위로.
- **틈새 신호**: 리뷰 평점은 낮은데 판매 순위가 높은 카테고리 — "사긴 사는데 불만족"은 기회입니다.

## 4단계 검증 절차

1. 관심 있는 큰 주제에서 하위 키워드 20개를 뽑습니다 (AI 브레인스토밍 활용).
2. 각 키워드의 검색량과 상위 경쟁물 수준을 표로 정리합니다.
3. "수요 중간 이상 + 경쟁 약함" 후보 3개로 좁힙니다.
4. 후보별로 상위 5개 상품의 **불만 리뷰**를 읽고 개선 각도를 찾습니다.

## 흔한 실수

- 내가 좋아하는 주제 ≠ 팔리는 주제. 검증 없이 취향으로 정하면 대부분 실패합니다.
- 반대로 수요만 보고 레드오션(다이어트, 재테크 일반론)에 들어가는 것도 실패 공식입니다.

> 💡 **핵심**: 니치 선정은 감이 아니라 **검색량 × 경쟁 강도 표**로 결정하세요. 데이터 30분이 제작 30시간을 살립니다.$aix$,
  $aix${"type":"steps","title":"니치 검증 4단계","steps":[{"label":"하위 키워드 20개 발산","sublabel":"AI 브레인스토밍 + 검색 자동완성","icon":"lightbulb"},{"label":"수요 × 경쟁 표 만들기","sublabel":"검색량, 상위 상품 리뷰 수·평점","icon":"search"},{"label":"후보 3개로 압축","sublabel":"수요 중간 이상 + 경쟁 약함","icon":"filter"},{"label":"불만 리뷰에서 각도 찾기","sublabel":"'사긴 사는데 불만족'이 기회","icon":"target"}],"caption":"취향이 아니라 데이터가 니치를 고릅니다."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e47ae9e4-3c87-00c6-3aa8-896b61eb690a', '83964f32-349e-a6d2-f48a-556b196341e0', 'ai-passive-income/your-added-value', 'your-added-value', '나만의 부가가치: AI 100% 생성물은 왜 안 팔리나',
  $aix$프롬프트 한 줄로 만든 결과물은 이제 **누구나 1분 만에** 만들 수 있습니다. 누구나 만들 수 있는 것에는 가격이 붙지 않습니다.

## AI 100% 생성물의 한계

- **차별성 제로**: 같은 모델, 비슷한 프롬프트 → 비슷한 결과물이 시장에 쏟아집니다.
- **신뢰성 문제**: 검증 없는 AI 텍스트에는 오류(환각)가 섞이고, 환불과 악평으로 돌아옵니다.
- **플랫폼 규제**: 저품질 AI 대량 업로드는 주요 플랫폼이 적발·제재하는 1순위 대상입니다.

## 가치를 얹는 4개 층

AI 출력물은 원재료입니다. 그 위에 사람만 얹을 수 있는 층이 있습니다.

- **경험**: 내가 직접 해본 사례, 실패담, 실제 수치.
- **큐레이션**: 100개를 만들어 8개만 남기는 선별 기준.
- **구조**: 독자의 문제 순서대로 재배열한 목차, 일관된 시리즈 스타일.
- **검증**: 사실 확인, 최신 정보 업데이트, 오류 수정.

## 실무 감각

"AI가 만든 것"이 아니라 "AI로 **내가** 만든 것"이 팔립니다. 구매자가 돈을 내는 대상은 생성이 아니라 **판단**입니다.

> 💡 **핵심**: AI는 원재료 공장입니다. 경험 · 큐레이션 · 구조 · 검증 — 이 4개 층이 여러분의 마진입니다.$aix$,
  $aix${"type":"stack","title":"가격이 붙는 가치의 층","layers":[{"label":"검증","sublabel":"사실 확인 · 최신화 · 오류 수정","icon":"shield","tone":"success"},{"label":"구조","sublabel":"독자 문제 순서의 목차 · 시리즈 스타일","icon":"layers","tone":"primary"},{"label":"경험 · 큐레이션","sublabel":"직접 해본 사례 · 100개 중 8개 선별","icon":"eye","tone":"accent"},{"label":"AI 생성물 (원재료)","sublabel":"누구나 1분 만에 — 그 자체론 가격 0원","icon":"sparkles","tone":"muted"}],"caption":"아래층(생성)은 흔해졌고, 위층(판단)으로 갈수록 희소해집니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'fe9971d5-32b9-988a-fd61-eaaa642242f9', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/planning-and-outline', 'planning-and-outline', '기획과 목차 설계: AI 브레인스토밍 활용법',
  $aix$전자책의 판매량은 집필 전에 이미 절반이 결정됩니다. 목차가 곧 상품 기획서이기 때문입니다.

## AI에게 시킬 일: 발산

- 니치 키워드를 주고 **독자의 질문 30개**를 뽑게 합니다 — 목차의 원료입니다.
- 경쟁 도서의 목차를 주고 "빠진 주제, 겹치는 주제"를 분석하게 합니다.
- 같은 주제로 목차 구성을 3가지 각도(입문 가이드 / 체크리스트형 / 사례 중심)로 받아 비교합니다.

## 사람이 할 일: 수렴

- 30개 질문 중 **내가 답할 수 있고, 독자가 돈 낼** 질문만 남깁니다.
- 순서를 독자의 문제 해결 순서로 재배열합니다 — AI는 백과사전 순서로 나열하는 경향이 있습니다.
- 챕터마다 "이 장을 읽으면 무엇을 할 수 있게 되는가"를 한 줄로 적습니다. 안 써지면 그 장은 삭제 후보입니다.

## 분량 기획

- 2026년 전자책 시장의 주력은 두꺼운 책이 아니라 **한 가지 문제를 확실히 푸는 30~80쪽**입니다.
- 얇게 여러 권(시리즈)이 두껍게 한 권보다 노출 기회와 수익 면에서 유리합니다.

> 💡 **핵심**: AI로 질문을 발산하고, 사람이 "돈 낼 질문"만 수렴하세요. 목차의 각 장은 독자가 얻는 능력 한 줄로 검증합니다.$aix$,
  $aix${"type":"chat","title":"목차 브레인스토밍 프롬프트","messages":[{"role":"user","text":"'1인 사업자 세금 신고' 전자책을 기획 중이야. 초보 독자가 실제로 검색할 법한 질문 30개를 뽑아줘."},{"role":"ai","text":"1. 홈택스 첫 신고, 뭐부터 눌러야 하나요? 2. 경비 처리 되는 것과 안 되는 것은? 3. 세금계산서와 현금영수증의 차이는? …"},{"role":"user","text":"좋아. 이 질문들을 '신고 전 준비 → 신고 당일 → 신고 후 관리' 순서로 묶어서 3부 목차로 재구성해줘."},{"role":"ai","text":"1부 준비: 장부와 증빙 모으기(질문 2,3,7…) / 2부 실전: 홈택스 화면 순서대로(질문 1,5…) / 3부 관리: 환급·경정청구(질문 12…)"}],"caption":"AI는 질문을 발산하고, 사람은 독자의 문제 순서로 수렴합니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6d7c5109-3e38-19af-135d-52daed2eb337', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/writing-workflow', 'writing-workflow', '집필 워크플로우: 초안은 AI, 편집은 사람',
  $aix$전자책 집필에서 시간이 가장 오래 걸리는 일은 이제 쓰기가 아니라 **고치기와 확인하기**입니다. 워크플로우도 거기에 맞춰 설계합니다.

## 3단계 분업

1. **AI 초안** — 목차의 장별로 개요·독자·금지사항(과장 금지, 추측 금지)을 담은 프롬프트로 초안을 뽑습니다. 한 번에 책 전체가 아니라 **장 단위**로.
2. **사람의 편집** — 내 경험과 사례를 삽입하고, AI 특유의 뻔한 문장("~하는 것이 중요합니다" 반복)을 걷어내고, 문체를 통일합니다.
3. **사실 확인** — 숫자·법규·요금·URL 등 검증 가능한 주장에 전부 표시를 하고, 원본 출처를 직접 확인합니다.

## 사실 확인이 유일한 보험입니다

- AI 초안의 환각은 그럴듯해서 더 위험합니다. 특히 **세금·법률·건강·요금** 정보는 오류 하나가 환불 폭탄이 됩니다.
- 검증 요령: 초안 생성 시 "확실하지 않은 부분은 [확인 필요]로 표시해"라고 지시하면 검토 대상이 줄어듭니다.

## 리듬 만들기

- 하루 1장(챕터) 사이클: 오전 초안 30분 → 편집 1시간 → 확인 30분.
- 편집하다 구조 문제를 발견하면 목차로 되돌아가는 것을 두려워하지 마세요 — 파이프라인은 원래 되돌아갑니다.

> 💡 **핵심**: AI가 빨라진 만큼 병목은 편집과 사실 확인으로 이동했습니다. **초안 30% : 편집·검증 70%**로 시간을 배분하세요.$aix$,
  $aix${"type":"flow","title":"장(챕터) 단위 집필 루프","nodes":[{"label":"AI 초안 생성","sublabel":"장 단위 · 개요+독자+금지사항 프롬프트","icon":"wand","tone":"accent"},{"label":"사람의 편집","sublabel":"경험 삽입 · AI 문체 제거","icon":"user","tone":"primary"},{"label":"사실 확인","sublabel":"숫자·법규·URL 출처 대조","icon":"shield","tone":"warning"},{"label":"장 완성 → 다음 장","sublabel":"하루 1장 사이클","icon":"check","tone":"success","edgeLabel":"검증 통과 시"}],"loopBack":{"from":2,"to":0,"label":"오류·구조 문제 발견 시 재작성"},"caption":"생성은 빨라졌으니, 시간의 70%는 편집과 검증에 씁니다."}$aix$::jsonb, $aix${"title":"AI 초안 → 사람 편집 워크플로우 따라하기","app":{"kind":"browser","url":"app.ai-writer.example/project/tax-guide","blocks":[{"id":"b-head","type":"heading","label":"전자책 집필 어시스턴트 — 1인 사업자 세금 신고"},{"id":"b-prompt","type":"input","label":"AI에게 요청할 내용을 입력하세요…"},{"id":"b-send","type":"button","label":"요청 보내기"},{"id":"b-outline","type":"card","label":"📑 목차 초안 — 1부 준비 / 2부 홈택스 실전 / 3부 신고 후 관리","hidden":true},{"id":"b-confirm","type":"badge","label":"목차 확정 — 독자의 문제 순서로 재배열","hidden":true},{"id":"b-draft","type":"card","label":"📝 2부 1장 초안 (1,200자) — [확인 필요] 표시 2곳 포함","hidden":true},{"id":"b-flag","type":"badge","label":"[확인 필요] 홈택스 화면 개편 여부 — 출처 직접 대조","hidden":true},{"id":"b-edit","type":"card","label":"✍️ 사람 편집 — 내 실패 사례 삽입 · AI 문체 제거","hidden":true},{"id":"b-done","type":"badge","label":"1장 완성 — 사실 확인 통과","hidden":true}]},"actions":[{"t":"caption","text":"① 니치 키워드로 목차 초안을 요청합니다"},{"t":"click","target":"b-prompt"},{"t":"type","target":"b-prompt","text":"1인 사업자 세금 신고, 3부 목차 구성해줘"},{"t":"click","target":"b-send"},{"t":"reveal","target":"b-outline"},{"t":"wait","ms":600},{"t":"caption","text":"② 사람이 독자의 문제 순서로 목차를 확정합니다"},{"t":"move","target":"b-outline"},{"t":"click"},{"t":"reveal","target":"b-confirm"},{"t":"caption","text":"③ 장 단위로 초안을 요청합니다 — 금지사항 포함"},{"t":"hide","target":"b-prompt"},{"t":"type","target":"b-prompt","text":"2부 1장 초안. 불확실하면 [확인 필요] 표시해"},{"t":"click","target":"b-send"},{"t":"reveal","target":"b-draft"},{"t":"reveal","target":"b-flag"},{"t":"caption","text":"④ [확인 필요] 표시는 사람이 원본 출처로 검증합니다"},{"t":"dblclick","target":"b-flag"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 경험 삽입과 문체 정리는 사람의 몫입니다"},{"t":"reveal","target":"b-edit"},{"t":"move","target":"b-edit"},{"t":"reveal","target":"b-done"},{"t":"caption","text":"✅ 초안 30% : 편집·검증 70% — 하루 1장 사이클"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'af4d487d-8e9d-9549-def6-d5202d760523', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/formatting-and-cover', 'formatting-and-cover', '자동 포맷팅과 표지 제작',
  $aix$내용이 같아도 조판과 표지가 조악하면 '싸구려 AI 책'으로 보입니다. 다행히 이 단계는 거의 전부 자동화됩니다.

## 원고는 마크다운, 변환은 도구에게

- 원고를 처음부터 **마크다운**으로 쓰면 EPUB·PDF 변환이 명령 한 줄이 됩니다.
- `pandoc` 하나로 EPUB 변환, 목차 자동 생성, 스타일(CSS) 적용까지 처리됩니다.
- 같은 원고로 KDP용 EPUB, PDF 판매용, 웹 미리보기용을 동시에 뽑는 것이 파이프라인의 힘입니다.

## 표지: AI 생성 + 규격 준수

- 이미지 생성 AI로 배경 시안을 여러 장 뽑되, **제목 텍스트는 디자인 도구에서 직접** 얹으세요. AI가 그린 글자는 여전히 어색한 경우가 많습니다.
- 썸네일 크기(목록에서 손톱만 하게 보임)에서도 제목이 읽히는지가 유일한 합격 기준입니다.
- 플랫폼 규격(KDP 권장 2,560×1,600px, 세로:가로 1.6:1)을 먼저 확인하고 시작합니다.

## 체크리스트

- 목차 링크가 실제로 작동하는가 (EPUB 검증 도구 통과)
- 본문 폰트·여백이 모바일 미리보기에서 깨지지 않는가
- 표지가 흑백·축소 상태에서도 판독되는가

> 💡 **핵심**: 원고는 마크다운으로, 변환은 pandoc으로, 표지 텍스트는 사람 손으로. 포맷팅은 **한 번 만든 스크립트를 시리즈 전체에 재사용**하는 단계입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"포맷팅 파이프라인 — 명령 한 줄 변환","lines":[{"text":"# 마크다운 원고 → EPUB (목차·스타일 자동)","tone":"comment"},{"text":"pandoc book.md -o book.epub --toc --css=style.css \\","tone":"cmd"},{"text":"  --metadata title=\"1인 사업자 세금 신고\"","tone":"cmd"},{"text":"✓ book.epub 생성 완료","tone":"ok"},{"text":"# 같은 원고로 PDF 판매본도 동시에","tone":"comment"},{"text":"pandoc book.md -o book.pdf --toc","tone":"cmd"},{"text":"✓ book.pdf 생성 완료","tone":"ok"},{"text":"epubcheck book.epub","tone":"cmd"},{"text":"✓ 검증 통과 — 오류 0건","tone":"ok"}],"caption":"한 번 만든 변환 스크립트는 시리즈 전권에 그대로 재사용됩니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '935eca3d-8fb9-c78b-da57-2987b324061b', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/publishing-and-disclosure', 'publishing-and-disclosure', '퍼블리싱 등록과 AI 콘텐츠 고지 정책',
  $aix$다 만든 책이 계정 정지로 사라지는 일은 실제로 일어납니다. 등록 절차보다 먼저 알아야 할 것이 **각 플랫폼의 AI 콘텐츠 정책**입니다.

## KDP(아마존)의 AI 고지 규정

- KDP는 등록 시 AI 사용 여부를 **묻고, 답하도록 의무화**하고 있습니다.
- 기준은 두 가지로 나뉩니다: **AI 생성(AI-generated)** — AI가 만든 텍스트·이미지를 그대로 또는 편집해서 사용 → 고지 필수. **AI 보조(AI-assisted)** — 사람이 쓴 원고를 AI로 다듬음·아이디어 얻음 → 고지 불요.
- 허위 고지가 적발되면 해당 도서 삭제를 넘어 **계정 정지**까지 갈 수 있습니다. 정직하게 답하는 것이 유일한 전략입니다.

## 국내·기타 플랫폼

- 리디·교보 등 국내 플랫폼과 크몽·탈잉 같은 지식마켓, Gumroad 같은 직접 판매 채널은 정책과 수수료가 제각각입니다 — 등록 전 최신 약관을 반드시 확인하세요.
- 한 곳 독점(예: KDP 셀렉트)은 로열티 혜택 대신 타 플랫폼 판매가 금지됩니다. 첫 책은 **비독점 다중 등록**으로 시장 반응을 넓게 보는 편이 안전합니다.

## 등록 실무 순서

- 상품 페이지의 제목·소개문이 사실상 광고입니다. 니치 조사에서 찾은 "불만 리뷰의 언어"를 소개문에 그대로 쓰세요.
- 가격은 경쟁작 범위 안에서 시작하고, 이후 데이터로 조정합니다.

> 💡 **핵심**: AI 사용은 숨길 것이 아니라 **정책에 맞게 고지**할 대상입니다. 계정은 파이프라인 전체가 걸린 자산이라, 정책 위반은 최대 리스크입니다.$aix$,
  $aix${"type":"grid","title":"퍼블리싱 채널 지도","items":[{"label":"아마존 KDP","sublabel":"AI 생성 여부 고지 의무","icon":"book","tone":"primary"},{"label":"국내 이북 플랫폼","sublabel":"리디·교보 등 — 약관 확인","icon":"smartphone","tone":"accent"},{"label":"지식마켓","sublabel":"크몽 등 — PDF 직판","icon":"shopping-cart","tone":"accent"},{"label":"직접 판매","sublabel":"Gumroad 등 — 수수료 최소","icon":"globe","tone":"success"},{"label":"독점 계약 주의","sublabel":"타 플랫폼 판매 금지 조건","icon":"alert","tone":"warning"},{"label":"계정 = 핵심 자산","sublabel":"정책 위반은 최대 리스크","icon":"key","tone":"muted"}],"caption":"첫 책은 비독점 다중 등록으로 — 계정 안전이 수익보다 우선입니다."}$aix$::jsonb, $aix${"title":"KDP 등록과 AI 콘텐츠 고지 따라하기","app":{"kind":"browser","url":"kdp.amazon.com/ko_KR/title-setup/kindle","blocks":[{"id":"k-head","type":"heading","label":"Kindle 전자책 세부 정보 등록"},{"id":"k-title","type":"input","label":"도서 제목 입력…"},{"id":"k-desc","type":"input","label":"도서 소개문 입력…"},{"id":"k-ai-q","type":"card","label":"생성형 AI 사용 여부 — 텍스트·이미지에 AI 생성 콘텐츠가 포함되어 있습니까?"},{"id":"k-ai-yes","type":"button","label":"예 — AI 생성 콘텐츠 포함"},{"id":"k-ai-badge","type":"badge","label":"☑ AI 생성 고지 완료 — 허위 고지 시 계정 정지 위험","hidden":true},{"id":"k-upload","type":"button","label":"원고·표지 업로드"},{"id":"k-file","type":"card","label":"📄 book.epub · cover.jpg — 업로드 완료 (epubcheck 통과본)","hidden":true},{"id":"k-publish","type":"button","label":"출간 신청"},{"id":"k-review","type":"badge","label":"🕒 심사 대기 중 — 보통 72시간 이내","hidden":true}]},"actions":[{"t":"caption","text":"① 니치 조사로 검증한 제목을 입력합니다"},{"t":"click","target":"k-title"},{"t":"type","target":"k-title","text":"1인 사업자 세금 신고, 30분 가이드"},{"t":"wait","ms":400},{"t":"caption","text":"② 소개문에는 불만 리뷰의 언어를 그대로 씁니다"},{"t":"click","target":"k-desc"},{"t":"type","target":"k-desc","text":"홈택스, 뭐부터 눌러야 할지 막막하다면"},{"t":"wait","ms":400},{"t":"caption","text":"③ AI 사용 여부는 정직하게 고지합니다"},{"t":"move","target":"k-ai-q"},{"t":"wait","ms":500},{"t":"click","target":"k-ai-yes"},{"t":"reveal","target":"k-ai-badge"},{"t":"wait","ms":500},{"t":"caption","text":"④ 검증을 통과한 EPUB과 표지를 업로드합니다"},{"t":"click","target":"k-upload"},{"t":"reveal","target":"k-file"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 출간을 신청하고 심사 상태를 확인합니다"},{"t":"click","target":"k-publish"},{"t":"reveal","target":"k-review"},{"t":"move","target":"k-review"},{"t":"caption","text":"✅ 정책에 맞는 고지로 등록 완료 — 심사 대기"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5695498d-7bff-b467-74f9-df557acc76f0', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/stock-policy-landscape', 'stock-policy-landscape', '스톡 시장의 AI 정책 지형: 어디에 올릴 수 있나',
  $aix$스톡 이미지 수익화의 첫 관문은 그림 실력이 아니라 **플랫폼 정책 독해**입니다. AI 이미지를 받는 곳과 금지하는 곳이 명확히 갈립니다.

## 허용 진영 (고지 조건부)

- **Adobe Stock** — AI 생성 이미지를 정식 카테고리로 받습니다. 업로드 시 '생성형 AI로 제작' 체크가 **의무**이고, 실존 인물·상표가 등장하면 거절됩니다.
- **Freepik, Vecteezy, Dreamstime** 등도 고지를 전제로 허용하는 대표 플랫폼입니다.

## 금지·제한 진영

- **Getty Images / iStock** — 외부 AI 생성물 업로드 금지 기조를 유지하고 있습니다.
- **Shutterstock** — 기여자가 제3자 AI 도구로 만든 이미지의 업로드를 제한해 왔습니다.
- 정책은 계속 바뀌므로 **업로드 전에 해당 플랫폼의 최신 기여자 가이드 확인**이 습관이 되어야 합니다.

## 정책 위에서 세우는 전략

- 허용 플랫폼 2~3곳에 **동일 포트폴리오를 병행 업로드**하는 것이 기본형입니다.
- 학습 데이터·저작권 논쟁이 있는 화풍(특정 작가 모사)은 정책과 무관하게 피하세요. 장기 계정 리스크입니다.
- 실사 인물 이미지는 초상권 문제로 심사 거절률이 높습니다. 초보자는 **사물·배경·개념 일러스트**부터가 안전합니다.

> 💡 **핵심**: "어디에 팔 수 있는가"를 먼저 확정하세요. 허용 플랫폼에 정직하게 고지하고 올리는 것이 유일하게 지속 가능한 전략입니다.$aix$,
  $aix${"type":"compare","title":"AI 이미지 정책: 플랫폼 진영","columns":[{"title":"허용 (고지 조건부)","icon":"check","tone":"success","items":["Adobe Stock","Freepik · Vecteezy","Dreamstime","'AI 생성' 표시 의무"]},{"title":"금지 · 제한","icon":"x","tone":"muted","items":["Getty / iStock","Shutterstock (외부 AI 제한)","정책 수시 변경 — 최신 가이드 확인","허위 미고지 시 계정 정지"]}],"caption":"허용 플랫폼 2~3곳 병행 업로드가 기본 전략입니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '2648db5a-e014-f5f1-2273-280236be220d', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/batch-generation-pipeline', 'batch-generation-pipeline', '대량 생성 파이프라인: 주제 리스트 → 배치 → 선별',
  $aix$스톡 수익은 한 장의 걸작이 아니라 **꾸준히 팔리는 수백 장의 포트폴리오**에서 나옵니다. 그래서 생산 방식도 공장처럼 설계합니다.

## 파이프라인 3단계

1. **주제 리스트업** — 시즌 이벤트(설날, 연말정산), 비즈니스 개념(재택근무, 협업), 배경·텍스처 등 **수요가 검증된 주제**를 스프레드시트로 관리합니다. AI에게 "다음 분기 마케터가 찾을 이미지 주제 50개"를 뽑게 하는 것도 좋은 시작점입니다.
2. **배치 생성** — 주제 하나당 프롬프트 변형(구도·색·스타일)을 여러 개 만들어 한 번에 수십 장을 뽑습니다. 잘 나온 프롬프트는 **템플릿으로 저장**해 다음 주제에 재사용합니다.
3. **선별** — 생성량의 10~20%만 살아남는 것이 정상입니다. 손가락·문자·로고 왜곡 같은 AI 티가 나는 결함은 심사 거절 1순위입니다.

## 선별 기준 3가지

- **결함 없음**: 확대해서 손·글자·경계선 확인.
- **용도 명확**: "이 이미지를 누가 어떤 문서에 쓸까"가 한 문장으로 나오는가.
- **시리즈 일관성**: 같은 스타일로 묶인 10장이 제각각 1장 열 개보다 잘 팔립니다.

## 양보다 리듬

주 1회 "주제 5개 × 생성 100장 × 선별 15장 업로드" 같은 **고정 리듬**이 몰아치기보다 오래 갑니다.

> 💡 **핵심**: 생성은 기계에게, 선별은 사람에게. **생성량의 80~90%를 버리는 용기**가 포트폴리오 품질이자 계정 신뢰도입니다.$aix$,
  $aix${"type":"flow","title":"주간 배치 생산 파이프라인","nodes":[{"label":"주제 리스트업","sublabel":"수요 검증된 주제 스프레드시트","icon":"clipboard","tone":"accent"},{"label":"배치 생성","sublabel":"주제당 프롬프트 변형 × 수십 장","icon":"image","tone":"primary"},{"label":"선별 (10~20% 생존)","sublabel":"결함 검수 · 용도 · 시리즈 일관성","icon":"filter","tone":"warning"},{"label":"플랫폼 업로드","sublabel":"AI 생성 고지 체크","icon":"upload","tone":"success","edgeLabel":"합격작만"}],"loopBack":{"from":3,"to":0,"label":"주 1회 고정 리듬으로 반복"},"caption":"80~90%를 버리는 선별이 이 파이프라인의 품질 관문입니다."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '606d8cf3-ac69-6202-827c-5a2ecba651b5', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/metadata-automation', 'metadata-automation', '메타데이터 자동화: 제목과 키워드가 곧 유통망',
  $aix$스톡 이미지는 검색으로만 팔립니다. 아무리 좋은 이미지도 **제목·키워드가 부실하면 존재하지 않는 것**과 같습니다.

## 메타데이터의 구조

- **제목**: 구체적 묘사형. "비즈니스 이미지"(나쁨) → "노트북으로 화상회의 중인 재택근무 홈오피스 책상"(좋음).
- **키워드**: 플랫폼당 30~50개. 피사체 → 상황·개념 → 분위기·색상 → 용도 순으로 층을 쌓습니다.
- **카테고리·고지 플래그**: AI 생성 표시 포함, 플랫폼 양식에 맞게.

## AI로 자동화하기

- 이미지 인식이 가능한 AI 모델에 이미지를 주고 "스톡용 제목 1개 + 키워드 40개(영문)를 CSV 형식으로"라고 지시하면 초안이 나옵니다.
- 수십 장을 스크립트로 돌려 **CSV로 일괄 생성 → 플랫폼의 CSV 업로드 기능**으로 넣는 것이 표준 파이프라인입니다.
- 단, 자동 생성 키워드의 **스팸성 무관 키워드는 직접 삭제**해야 합니다. 무관 키워드 남발은 검색 페널티와 심사 거절 사유입니다.

## 시간 배분의 역전

수작업 시 이미지 1장당 메타데이터 5~10분 — 100장이면 10시간입니다. 자동화하면 검수 포함 1~2시간으로 줄어듭니다. 이 차이가 파이프라인의 채산성을 결정합니다.

> 💡 **핵심**: 메타데이터는 AI로 일괄 생성하고 사람이 스팸 키워드만 걷어내세요. **검색되지 않는 이미지는 존재하지 않는 이미지**입니다.$aix$,
  $aix${"type":"steps","title":"메타데이터 일괄 처리 절차","steps":[{"label":"선별작 폴더 정리","sublabel":"업로드 확정본만 모으기","icon":"camera"},{"label":"AI 일괄 분석","sublabel":"이미지 → 제목 + 키워드 40개","icon":"wand"},{"label":"CSV 생성 · 스팸 검수","sublabel":"무관 키워드 삭제 (페널티 예방)","icon":"file-text"},{"label":"CSV 일괄 업로드","sublabel":"AI 생성 고지 플래그 포함","icon":"upload"}],"caption":"100장 10시간짜리 수작업이 검수 포함 1~2시간으로 줄어듭니다."}$aix$::jsonb, $aix${"title":"메타데이터 자동화 시나리오 따라하기","app":{"kind":"automation-canvas","windowTitle":"스톡 메타데이터 일괄 처리 — Make","nodes":[{"id":"n-folder","icon":"camera","label":"선별작 폴더 감시","sublabel":"업로드 확정본 15장","tone":"accent"},{"id":"n-vision","icon":"brain","label":"AI 이미지 분석","sublabel":"제목 1개 + 키워드 40개","hidden":true},{"id":"n-csv","icon":"file-text","label":"CSV 생성","sublabel":"플랫폼 양식으로 변환","hidden":true},{"id":"n-review","icon":"filter","label":"사람 검수","sublabel":"스팸 키워드 삭제","tone":"warning","hidden":true},{"id":"n-upload","icon":"upload","label":"일괄 업로드","sublabel":"AI 생성 고지 플래그 ON","tone":"success","hidden":true}],"runLog":[{"id":"log-run","text":"▶ 시나리오 실행 — 신규 이미지 15장 감지","tone":"out","hidden":true},{"id":"log-meta","text":"✓ 제목·키워드 생성 완료 (15/15)","tone":"ok","hidden":true},{"id":"log-spam","text":"⚠ 무관 키워드 3건 감지 — 사람 검수 대기","tone":"err","hidden":true},{"id":"log-done","text":"✓ metadata.csv 업로드 완료 — 고지 플래그 포함","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 선별을 통과한 이미지 폴더가 시작점입니다"},{"t":"move","target":"n-folder"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② AI 분석 노드로 제목·키워드를 일괄 생성합니다"},{"t":"reveal","target":"n-vision"},{"t":"move","target":"n-vision"},{"t":"click"},{"t":"caption","text":"③ CSV 변환 뒤에 사람 검수 노드를 꼭 넣습니다"},{"t":"reveal","target":"n-csv"},{"t":"reveal","target":"n-review"},{"t":"move","target":"n-review"},{"t":"click"},{"t":"caption","text":"④ 업로드 노드에 AI 생성 고지 플래그를 켭니다"},{"t":"reveal","target":"n-upload"},{"t":"dblclick","target":"n-upload"},{"t":"wait","ms":400},{"t":"caption","text":"⑤ 시나리오를 실행하고 로그로 검수합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-meta"},{"t":"reveal","target":"log-spam"},{"t":"dblclick","target":"log-spam"},{"t":"reveal","target":"log-done"},{"t":"move","target":"log-done"},{"t":"caption","text":"✅ 100장 10시간 작업이 검수 포함 1~2시간으로"},{"t":"wait","ms":900}]}$aix$::jsonb, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b9c7d332-cad2-03db-66f4-15710e6e087b', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/sales-data-improvement-loop', 'sales-data-improvement-loop', '판매 데이터 개선 루프: 팔린 것이 다음 주제를 정한다',
  $aix$업로드가 끝이 아니라 시작입니다. 수익이 커지는 계정과 정체되는 계정의 차이는 **판매 데이터를 다음 제작에 반영하는가**뿐입니다.

## 무엇을 보는가

- **판매·다운로드 수**: 어떤 주제·스타일이 실제로 팔렸는가.
- **검색 유입 키워드**: 구매자가 어떤 검색어로 내 이미지에 도달했는가 — 다음 메타데이터의 원료입니다.
- **포트폴리오 대비 판매 집중도**: 보통 상위 10~20% 이미지가 수익 대부분을 만듭니다.

## 개선 루프 돌리기

1. 월 1회, 판매 상위 이미지의 **공통점**(주제·색·구도·키워드)을 정리합니다.
2. 그 공통점으로 **변형 시리즈**를 만듭니다 — 팔린 주제의 다른 계절, 다른 구도, 다른 인종·연령 구성.
3. 3개월 연속 판매 0인 스타일은 생산 중단합니다. 데이터가 없애라는 신호입니다.
4. 결과를 주제 리스트(파이프라인 1단계)에 반영합니다 — 루프가 닫힙니다.

## 전자책에도 같은 루프

이 구조는 전자책도 동일합니다. 팔린 책의 주제로 시리즈 다음 권을 내는 것이 신규 주제 개척보다 성공률이 몇 배 높습니다.

> 💡 **핵심**: 첫 업로드는 가설, 판매 데이터는 검증입니다. **팔린 것의 변형을 늘리고 안 팔린 것을 끊는 월간 루프**가 수익 곡선의 기울기를 만듭니다.$aix$,
  $aix${"type":"cycle","title":"월간 판매 데이터 개선 루프","center":"팔린 것이 다음 주제를 정한다","nodes":[{"label":"업로드·판매","sublabel":"포트폴리오 노출","icon":"shopping-cart"},{"label":"데이터 분석","sublabel":"판매 상위작의 공통점","icon":"chart"},{"label":"주제 리스트 갱신","sublabel":"팔린 주제의 변형 추가","icon":"trending-up"},{"label":"변형 시리즈 제작","sublabel":"안 팔린 스타일은 중단","icon":"refresh"}],"caption":"이 루프가 닫히는 순간, 부업이 시스템이 됩니다."}$aix$::jsonb, null, 6, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

commit;
