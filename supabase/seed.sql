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

내비게이션에 비유하면 쉽습니다. 챗봇은 길을 한 번 알려주고 끝이지만, 에이전트는 **길을 잘못 들면 경로를 다시 계산**합니다.

## 왜 지금 '루프'인가

- 이제 모델은 도구(터미널, 파일, 브라우저)를 직접 다룰 수 있습니다. 그래서 "방금 한 행동이 성공했는지"를 기계적으로 확인할 수 있게 됐습니다.
- Claude Code, Cursor Agent, Devin 같은 도구가 모두 이 구조 위에 서 있습니다.
- 같은 모델이라도 **루프 설계가 좋으면 성공률이 몇 배** 차이 납니다. 이것이 루프 엔지니어링입니다.

> 💡 **핵심**: 에이전트 = LLM + 도구 + **피드백 루프**. 이 강의는 그 루프를 설계하는 법을 다룹니다.$aix$,
  $aix${"type":"compare","title":"챗봇 vs 에이전트","columns":[{"title":"챗봇 (한 번 묻고 끝)","icon":"message","tone":"muted","items":["질문 1번 → 답변 1번","결과 검증 없음","틀리면 사람이 다시 질문","도구 사용 불가"]},{"title":"에이전트 (루프)","icon":"repeat","tone":"primary","items":["목표 1번 → 완료까지 반복","행동 결과를 스스로 관찰","틀리면 스스로 경로 수정","터미널·파일·API 직접 조작"]}],"caption":"같은 모델이라도 루프 구조가 있으면 '일을 끝내는 능력'이 생깁니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a8e24f8d-0758-6c72-4ee9-4d023ab2f4ce', 'bb43b706-521e-c6a6-3ab3-cccb0a0dcbe5', 'loop-engineering/anatomy-of-loop', 'anatomy-of-loop', '에이전트 루프 해부: 계획→실행→관찰→평가',
  $aix$복잡해 보이는 에이전트 시스템도 뜯어 보면 결국 같은 사이클 하나로 돌아갑니다. 이 4단계만 정확히 이해하면 어떤 프레임워크든 읽을 수 있습니다.

## 루프의 4단계

1. **계획 (Plan)** — 목표를 작은 작업으로 쪼개고, 다음 행동 하나를 결정합니다.
2. **실행 (Act)** — 도구를 호출합니다. 파일 수정, 테스트 실행, API 호출 등.
3. **관찰 (Observe)** — 도구가 돌려준 **가공되지 않은 결과**(에러 메시지, 테스트 출력)를 읽습니다.
4. **평가 (Evaluate)** — 목표에 도달했는지 판단합니다. 아직이면 1번으로 돌아갑니다.

요리에 비유하면 이렇습니다. 레시피 정하기(계획) → 조리(실행) → 맛보기(관찰) → 간이 맞는지 판단(평가). 싱거우면 다시 간을 하죠.

## 설계자가 통제하는 것

모델은 이 중 1·4단계(판단)를 담당하고, 여러분은 나머지를 설계합니다.

- 어떤 **도구**를 줄 것인가 (2단계에서 할 수 있는 행동의 범위)
- 어떤 **신호**를 보여줄 것인가 (3단계에서 보이는 정보의 자세함)
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

도구는 모델이 호출할 수 있는 함수입니다. 이름, 설명, 입력값의 형식(JSON Schema) 세 가지로 정의합니다.

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

- 예전에는 도구를 앱마다 처음부터 다시 만들어야 했습니다. MCP는 **도구 서버를 한 번 만들면 모든 AI 앱에서 재사용**하게 해주는 개방형 프로토콜(누구나 쓸 수 있는 공통 연결 규칙)입니다.
- Slack, GitHub, Postgres, 사내 API… 이미 1만 개가 넘는 MCP 서버가 공개돼 있습니다.
- Claude Code, Cursor 등 주요 에이전트 도구가 모두 MCP 클라이언트(서버의 도구를 가져다 쓰는 쪽)입니다.

## 도구 설계의 3원칙

- **결과가 관찰 가능해야** 합니다 — 성공/실패가 텍스트로 명확히 드러나게.
- **한 도구는 한 가지 일만** 하게 만듭니다 — 여러 일을 하는 도구는 모델을 헷갈리게 합니다.
- **설명이 곧 프롬프트**입니다 — 모델은 도구의 설명(description)을 읽고 어떤 도구를 쓸지 고릅니다.

> 💡 **핵심**: 좋은 도구 설명 한 줄이 프롬프트 열 줄보다 루프 성공률을 더 높입니다.$aix$,
  $aix${"type":"stack","title":"MCP 아키텍처","layers":[{"label":"AI 에이전트 (MCP 클라이언트)","sublabel":"Claude Code · Cursor · 커스텀 에이전트","icon":"bot","tone":"primary"},{"label":"MCP 프로토콜","sublabel":"도구 목록·호출·결과를 표준 형식으로 교환","icon":"link","tone":"accent"},{"label":"MCP 서버들","sublabel":"GitHub · Slack · DB · 사내 API","icon":"server","tone":"muted"},{"label":"실제 시스템","sublabel":"코드 저장소, 메신저, 데이터베이스","icon":"database","tone":"muted"}],"caption":"MCP는 'AI 도구의 USB-C' — 서버 하나로 모든 클라이언트에 연결됩니다."}$aix$::jsonb, null, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9f36c635-06ca-8343-fa71-65988badca07', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/feedback-signals', 'feedback-signals', '피드백 신호 설계: 루프의 나침반',
  $aix$에이전트가 스스로 고치려면 **"지금 틀렸다"는 사실을 기계적으로 알려주는 신호**가 필요합니다. 신호 없이 도는 루프는 나침반 없이 걷는 것과 같습니다.

## 코드 작업의 3대 신호

- **테스트** — 가장 강력한 신호. "이렇게 동작해야 한다"는 기대를 실행 가능한 코드로 적어 둔 것입니다.
- **타입체크** — `tsc --noEmit` 한 번으로 수백 개의 숨은 버그가 드러납니다.
- **린트/포맷** — 스타일과 명백한 실수를 잡습니다.

## 신호의 품질 = 루프의 품질

같은 실패라도 신호의 **해상도**(얼마나 자세히 알려주는가)가 다릅니다.

- 나쁜 신호: `Error: test failed` (뭘 고쳐야 할지 모름)
- 좋은 신호: `expect(cart.total).toBe(3000) — received 2700, at cart.ts:42` (파일·라인·기대값)

에이전트에게는 **좋은 에러 메시지가 곧 좋은 프롬프트**입니다.

## 신호를 루프에 연결하기

실행 명령을 하나로 묶어 두면 에이전트가 매 반복마다 같은 기준으로 검증합니다.

```bash
npm run check   # = tsc --noEmit && eslint . && vitest run
```

> 💡 **핵심**: 자가 수정 루프의 성능은 모델이 아니라 **피드백 신호의 해상도**가 결정합니다.$aix$,
  $aix${"type":"grid","title":"피드백 신호의 종류와 강도","items":[{"label":"테스트","sublabel":"기대 동작을 코드로 · 최강 신호","icon":"test-tube","tone":"primary"},{"label":"타입체크","sublabel":"tsc --noEmit","icon":"shield","tone":"accent"},{"label":"린트","sublabel":"스타일·명백한 실수","icon":"filter","tone":"accent"},{"label":"빌드","sublabel":"최종 통합 검증","icon":"check","tone":"success"},{"label":"런타임 로그","sublabel":"실행 중 동작 확인","icon":"eye","tone":"muted"},{"label":"사람 리뷰","sublabel":"마지막 관문","icon":"user","tone":"warning"}],"caption":"위쪽 신호일수록 기계적·즉각적 — 루프에 먼저 연결하세요."}$aix$::jsonb, null, 5, 3
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

1. 터미널에 `npx vitest run`을 입력해, 어떤 테스트가 왜 실패하는지 먼저 눈으로 확인합니다.
2. 에이전트에게 **목표 + 검증 방법**을 함께 줍니다:

```text
cart.test.ts의 실패하는 테스트를 통과시켜 줘.
수정 후 반드시 npx vitest run 명령으로 검증하고,
통과할 때까지 반복해.
```

3. 에이전트가 도는 루프를 관찰합니다: 테스트 실행 → 에러 읽기 → 코드 수정 → 재실행.

지금 손에 실습용 프로젝트가 없어도 괜찮습니다. 아래 데모에서 같은 흐름을 화면으로 따라가 보세요.

## 관찰 포인트

- 에이전트는 에러 메시지의 **파일·라인 정보**를 따라 이동합니다.
- "통과할 때까지 반복해"라는 한 줄이 **루프 계약**을 만듭니다 — 이 문장이 없으면 한 번 고치고 멈추는 경우가 많습니다.

> 💡 **핵심**: 프롬프트에 목표만 쓰지 말고 **검증 명령 + 반복 조건**을 함께 쓰세요. 그 순간 챗봇이 에이전트가 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"claude — 자가 수정 루프","lines":[{"text":"npx vitest run","tone":"cmd"},{"text":"✕ cart > 10% 할인 적용  (cart.test.ts:18)","tone":"err"},{"text":"  expected 2700, received 3300","tone":"dim"},{"text":"# 에이전트: cart.ts:42 할인율 계산 수정","tone":"comment"},{"text":"npx vitest run","tone":"cmd"},{"text":"✕ cart > 중복 쿠폰 방지  (cart.test.ts:31)","tone":"err"},{"text":"# 에이전트: 쿠폰 중복 가드 추가","tone":"comment"},{"text":"npx vitest run","tone":"cmd"},{"text":"✓ 12 passed (12)","tone":"ok"},{"text":"목표 달성 — 루프 종료","tone":"ok"}],"caption":"실패 → 수정 → 재검증이 사람 개입 없이 3회 반복된 실제 루프 흐름입니다."}$aix$::jsonb, $aix${"title":"에디터에서 자가 수정 루프 따라하기","app":{"kind":"code-editor","windowTitle":"cart.ts — AI 에이전트 세션","files":[{"id":"f-cart","name":"cart.ts","active":true},{"id":"f-test","name":"cart.test.ts"},{"id":"f-pkg","name":"package.json"}],"code":[{"id":"c1","text":"export function applyDiscount(total: number) {"},{"id":"c2","text":"// 10% 할인 쿠폰 적용","indent":1,"tone":"comment"},{"id":"c3","text":"return total * 1.1; // ← 버그: 할인이 아니라 할증","indent":1,"tone":"del"},{"id":"c4","text":"return total * 0.9;","indent":1,"tone":"add","hidden":true},{"id":"c5","text":"}"}],"terminal":[{"id":"t1","text":"npx vitest run","tone":"cmd","hidden":true},{"id":"t2","text":"✕ cart > 10% 할인 적용 (cart.test.ts:18)","tone":"err","hidden":true},{"id":"t3","text":"  expected 2700, received 3300","tone":"out","hidden":true},{"id":"t4","text":"npx vitest run","tone":"cmd","hidden":true},{"id":"t5","text":"✓ 12 passed (12) — 루프 종료","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 먼저 테스트를 실행해 실패 신호를 확인합니다"},{"t":"type","target":"t1","text":"npx vitest run"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"② 에러가 가리키는 라인으로 이동합니다"},{"t":"move","target":"c3"},{"t":"dblclick","target":"c3"},{"t":"caption","text":"③ 할인율 계산을 수정합니다 (1.1 → 0.9)"},{"t":"type","target":"c4","text":"return total * 0.9;"},{"t":"wait","ms":500},{"t":"caption","text":"④ 같은 명령으로 재검증 — 이것이 루프입니다"},{"t":"type","target":"t4","text":"npx vitest run"},{"t":"reveal","target":"t5"},{"t":"move","target":"t5"},{"t":"caption","text":"✅ 테스트 통과 — 성공 종료 조건 달성"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1d02b7ab-afef-6629-6731-906cd179087f', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/guardrails', 'guardrails', '가드레일: 무한 루프와 폭주를 막는 법',
  $aix$루프는 강력한 만큼 위험합니다. 잘못 설계된 루프는 같은 실수를 무한 반복하거나, 테스트를 '삭제'해서 통과시키는 꼼수를 씁니다. 그래서 도로의 가드레일처럼, 벗어나면 막아주는 장치가 필요합니다.

## 반드시 넣어야 할 4가지 가드레일

- **반복 횟수 제한** — 최대 시도 횟수(예: 5회)를 넘으면 멈추고 사람에게 보고.
- **수정 금지 영역** — 테스트 파일, 설정 파일은 건드리지 말라고 명시. ("테스트를 고치지 말고 구현을 고쳐")
- **범위 제한** — 건드릴 수 있는 디렉토리·파일을 미리 정해 둠.
- **진전 감지** — 직전 시도와 같은 에러가 또 나오면 접근을 바꾸거나 중단.

## 종료 조건은 두 종류

1. **성공 종료**: 검증 명령이 통과 (기계적 판정)
2. **안전 종료**: 횟수 제한 도달, 진전 없음, 금지 행동 감지 (가드레일 판정)

성공 조건만 있고 안전 조건이 없는 루프는 프로덕션(실제 서비스 환경)에 넣을 수 없습니다.

> 💡 **핵심**: "통과할 때까지 반복해"에는 반드시 **"단, 최대 N번까지, 테스트 파일은 건드리지 말고"**를 붙이세요.$aix$,
  $aix${"type":"flow","title":"가드레일이 있는 자가 수정 루프","nodes":[{"label":"코드 수정","icon":"code","tone":"primary"},{"label":"검증 실행","sublabel":"테스트 + 타입체크","icon":"test-tube","tone":"accent","edgeLabel":"테스트 파일은 수정 금지"},{"label":"가드레일 체크","sublabel":"시도 5회 미만? 진전 있음?","icon":"shield","tone":"warning","edgeLabel":"실패 시"},{"label":"완료 또는 사람에게 보고","sublabel":"성공 종료 / 안전 종료","icon":"check","tone":"success","edgeLabel":"통과 또는 상한 도달"}],"loopBack":{"from":2,"to":0,"label":"재시도 (최대 5회)"},"caption":"성공 종료와 안전 종료, 두 개의 출구가 모두 있어야 프로덕션 루프입니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '04c7685d-c4bb-e5e9-df98-e0874713d165', 'c42ae9ea-be93-c212-b599-8b76b58b7bad', 'loop-engineering/context-management', 'context-management', '컨텍스트 관리: 긴 루프가 무너지지 않게',
  $aix$루프가 수십 번 돌면 대화 기록이 컨텍스트 윈도우를 가득 채웁니다. 긴 작업에서 에이전트가 갑자기 멍청해지는 이유의 대부분이 여기 있습니다. 컨텍스트는 에이전트의 **책상**입니다 — 서류가 쌓이면 누구든 일이 느려집니다.

## 컨텍스트가 오염되는 3가지 경로

- 거대한 파일 전체를 반복해서 읽음
- 실패한 시도의 로그가 쌓여 **정작 중요한 정보를 가림**
- 오래된 계획과 새 계획이 섞여 목표가 흐려짐

## 2026년의 표준 대응 전략

- **컴팩션(Compaction)** — 오래된 기록을 짧은 요약으로 바꿔치기합니다. Claude Code의 auto-compact가 대표적.
- **서브에이전트 위임** — 탐색처럼 토큰을 많이 쓰는 작업은 별도 에이전트에게 시키고 **결론만** 받아옵니다.
- **외부 메모리** — 진행 상황을 `PLAN.md` 같은 파일에 적어 두고, 컨텍스트 대신 그 파일을 믿을 기준으로 삼습니다.
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

공장의 조립 라인처럼, 분석 → 구현 → 리뷰를 **단계별로 다른 에이전트**가 이어받습니다. 앞 단계의 출력이 다음 단계의 입력이 됩니다. 그래서 단계 사이에 **주고받을 산출물의 형식**을 명확히 정하는 것이 핵심입니다.

## 2. 팬아웃 (병렬 분업)

팬아웃은 한 작업을 여러 갈래로 나눠 **동시에** 처리하는 방식입니다. 파일 100개를 일괄 수정하는 작업처럼 독립적으로 쪼갤 수 있을 때 씁니다. 서로의 작업 영역이 겹치지 않도록 분리(예: git worktree)가 필요합니다.

## 3. 생성자-검증자 (서로 견제하는 협업)

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

- **동기 승인**: 에이전트가 그 자리에서 멈추고 사람의 확인을 기다림 (위험 관문에 적합)
- **비동기 리뷰**: 에이전트는 계속 일하고, 사람은 PR 리뷰처럼 나중에 검토 (일반 작업에 적합)
- **에스컬레이션**: 가드레일이 발동하면 문제를 사람에게 자동으로 올려 보냄

## 흔한 실수 (안티패턴)

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
- **반복 횟수**: 성공까지 평균 몇 번 돌았는가 (갑자기 늘면 피드백 신호가 나빠졌다는 뜻)
- **개입률**: 안전 종료로 사람에게 넘어온 비율
- **비용/시간**: 작업당 토큰·소요 시간

## 개선 사이클

1. 실패 사례를 모읍니다 (트랜스크립트 저장은 필수)
2. 실패를 분류합니다 — 신호 부족? 도구 문제? 컨텍스트 오염? 가드레일 오작동?
3. **가장 자주 나오는 실패 유형 하나만** 고칩니다
4. 같은 작업 세트로 재측정합니다 (이것이 곧 이벨/Eval입니다)

## 시작은 소박하게

거창한 대시보드보다, 실패한 루프의 트랜스크립트 10개를 직접 읽는 것이 첫 걸음입니다. 패턴은 항상 거기에 있습니다.

> 💡 **핵심**: "만들고 끝"이 아니라 **측정 → 분류 → 하나 고침 → 재측정**. 루프를 개선하는 것도 결국 루프입니다.$aix$,
  $aix${"type":"steps","title":"루프 개선 사이클","steps":[{"label":"트랜스크립트 수집","sublabel":"실패 사례를 빠짐없이 저장","icon":"clipboard"},{"label":"실패 유형 분류","sublabel":"신호·도구·컨텍스트·가드레일","icon":"filter"},{"label":"가장 잦은 유형 하나만 수정","sublabel":"한 번에 하나씩","icon":"wrench"},{"label":"같은 작업 세트로 재측정","sublabel":"성공률·반복 횟수 비교","icon":"chart"}],"caption":"이 사이클 자체가 여러분의 '루프를 위한 루프'입니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: 밤새 일하는 AI 팀 만들기: 멀티 에이전트 실전
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'aa6aca2e-216a-f00b-ef45-ea5d47317481', 'ai-agent-team', '밤새 일하는 AI 팀 만들기: 멀티 에이전트 실전', $aix$AI에게 일을 시켜 본 사람은 압니다 — 한 명에게 전부 맡기면 뒤로 갈수록 흐트러진다는 것을. 기억은 넘치고, 자기가 짠 코드는 자기가 검사하니 관대해집니다. 이 강의는 Claude Code 위에 지휘자·기획자·개발자·테스터·디자이너로 구성된 AI 팀을 직접 꾸리는 실습입니다. 마크다운 파일 하나로 팀원을 채용하고, 역할 지시서와 도구 권한으로 품질을 조이고, 기획→개발→검증→반려로 일이 도는 릴레이를 눈으로 관찰합니다. 마지막에는 권한 설계와 Hook 안전장치를 갖춰 저녁에 브리핑을 남기고 아침에 결과를 받는 무인 운영까지 완성합니다. 터미널을 조금 써 봤다면 충분합니다 — 모든 실습은 파일 경로, 명령어, 입력할 프롬프트 전문까지 그대로 따라 할 수 있게 구성했습니다.$aix$,
  null, 'dev', 'beginner', array['멀티 에이전트', 'Claude Code', '서브에이전트', '오케스트레이션', '무인 자동화']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '39931734-ed13-6563-d09d-5c09dc521069', 'aa6aca2e-216a-f00b-ef45-ea5d47317481', 'team-structure', 'AI 팀은 어떻게 돌아가는가', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '46a386b4-1458-722b-7aa9-53e7461f2b6b', 'aa6aca2e-216a-f00b-ef45-ea5d47317481', 'hire-agents', '팀원 채용: 에이전트 만들고 설정하기', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'c29c531b-8028-b9d0-79e1-677cef35a599', 'aa6aca2e-216a-f00b-ef45-ea5d47317481', 'run-the-team', '팀 가동: 서로 일을 던지게 만들기', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '5b5ff14a-bd15-7dc2-aa20-c7c50563a2af', 'aa6aca2e-216a-f00b-ef45-ea5d47317481', 'overnight', '밤새 돌리기: 무인 운영', 3
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '025a61df-5143-8362-447d-a45951af38a2', '39931734-ed13-6563-d09d-5c09dc521069', 'ai-agent-team/why-team', 'why-team', '왜 AI ''한 명''이 아니라 ''팀''인가',
  $aix$에이전트 하나에게 "기획부터 테스트까지 전부 해줘"라고 시켜 본 적이 있다면, 이미 답을 알고 있습니다 — 처음엔 잘하다가 뒤로 갈수록 흐트러집니다.

## 혼자 다 하는 AI의 3가지 한계

- **컨텍스트 포화** — 기획 메모, 코드, 에러 로그가 전부 하나의 컨텍스트 윈도우에 쌓입니다. 작업 후반이 되면 초반에 정한 요구사항을 잊기 시작합니다.
- **자기 검증의 한계** — 자기가 짠 코드를 자기가 검사하면 같은 편향으로 같은 실수를 그대로 통과시킵니다. 자기 글의 오타는 자기 눈에 잘 안 보이는 것과 같습니다.
- **역할 전환 비용** — "과감하게 만들어라"와 "의심하며 검사하라"는 상충하는 요구입니다. 한 에이전트가 두 모드를 오가면 어느 쪽도 어중간해집니다.

1인 식당을 떠올려 보세요. 주문받고, 요리하고, 서빙하고, 계산까지 혼자서도 손님 두세 팀까지는 됩니다. 하지만 주문이 밀리는 순간 전부 무너지죠. 그래서 식당은 주방·홀·계산대로 **분업**합니다.

## 팀으로 바꾸면 달라지는 것

- 역할마다 **독립된 컨텍스트** — 테스터는 테스트만 기억하면 되니 끝까지 선명합니다.
- **만든 사람 ≠ 검사하는 사람** — 그래서 "반려"라는 행위가 성립합니다.
- 역할 지시서가 고정되어 있어 **품질이 일정**합니다.

멀티 에이전트 패턴의 이론은 '루프 엔지니어링' 강의에서 다뤘습니다. 이 강의는 그 패턴을 Claude Code로 **직접 만들어 돌리는** 실습편입니다.

> 💡 **핵심**: 멀티 에이전트의 힘은 'AI가 여러 명'이 아니라 **독립된 컨텍스트 + 서로 견제하는 역할**에서 나옵니다.$aix$,
  $aix${"type":"compare","title":"1인 AI vs AI 팀","columns":[{"title":"혼자 다 하는 AI","icon":"user","tone":"muted","items":["기획·코드·로그가 한 기억에 뒤섞임","자기 코드를 자기가 검사 (관대해짐)","만들기·검사하기 모드를 오가며 흔들림","긴 작업일수록 품질 하락"]},{"title":"역할을 나눈 AI 팀","icon":"users","tone":"primary","items":["역할마다 독립된 컨텍스트","테스터가 개발자의 결과를 반려","역할 지시서가 고정되어 품질 일정","밤새 돌려도 구조가 유지됨"]}],"caption":"1인 식당이 주방·홀·계산대로 분업하는 것과 같은 원리입니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '375e5ae9-2577-eba0-19c8-7ccf874010bf', '39931734-ed13-6563-d09d-5c09dc521069', 'ai-agent-team/meet-the-team', 'meet-the-team', '팀 소개: 지휘자와 4명의 전문가',
  $aix$이 강의에서 함께 꾸릴 팀은 다섯입니다. 각자를 소개하기 전에, 가장 중요한 규칙 하나부터 — **지휘자는 연주하지 않습니다.**

## 오케스트레이터: 일하지 않는 팀원

오케스트라 지휘자는 바이올린을 잡지 않습니다. 악보를 나누고, 타이밍을 맞추고, 전체 소리를 듣습니다. 오케스트레이터(팀을 지휘하는 메인 에이전트)도 똑같습니다.

- 하는 일: 목표를 작은 작업으로 **쪼개고**, 팀원에게 **분배하고**, 결과를 **취합**합니다.
- 하지 않는 일: 직접 코드를 짜지 않습니다. 지휘자가 연주를 시작하는 순간 합주가 무너지듯, 오케스트레이터가 구현에 뛰어들면 분업 구조가 무너집니다.

## 4명의 전문가: 무엇을 받아 무엇을 내놓는가

각 팀원은 **입력물 → 산출물**로 정의됩니다. 이 정의가 뒤에서 만들 역할 지시서의 뼈대가 됩니다.

- **기획자** — 입력: 목표 한 줄 / 산출: 요구사항 명세 파일 `SPEC.md`
- **개발자** — 입력: `SPEC.md` / 산출: 동작하는 코드 + 커밋
- **테스터** — 입력: 코드 / 산출: 검증 결과 `TEST_REPORT.md` (통과 또는 **반려**)
- **디자이너** — 입력: `SPEC.md` / 산출: 화면 구성과 스타일

## 왜 이 다섯인가

만드는 사람(기획·개발·디자인), 검사하는 사람(테스터), 지휘하는 사람 — 소프트웨어 팀의 최소 구성입니다. 프로젝트에 따라 문서 담당이나 리서처를 더해도 좋습니다. 뽑는 방법은 전부 같으니까요.

> 💡 **핵심**: 팀원 한 명 = "무엇을 받아(입력물) 무엇을 내놓는가(산출물)"의 정의. 지휘자만 예외 — **분배와 취합**이 산출물입니다.$aix$,
  $aix${"type":"grid","title":"다섯 역할의 입력물 → 산출물","items":[{"label":"오케스트레이터","sublabel":"일을 쪼개고 나누고 취합 — 직접 일하지 않음","icon":"brain","tone":"primary"},{"label":"기획자","sublabel":"목표 한 줄 → SPEC.md","icon":"clipboard","tone":"accent"},{"label":"개발자","sublabel":"SPEC.md → 코드 + 커밋","icon":"code","tone":"accent"},{"label":"테스터","sublabel":"코드 → TEST_REPORT.md (통과/반려)","icon":"test-tube","tone":"warning"},{"label":"디자이너","sublabel":"SPEC.md → 화면 구성·스타일","icon":"palette","tone":"accent"}],"caption":"만드는 셋 + 검사하는 하나 + 지휘하는 하나 — 소프트웨어 팀의 최소 구성입니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'fc9bd8ff-943f-57cd-4312-687d8352ebbc', '39931734-ed13-6563-d09d-5c09dc521069', 'ai-agent-team/how-work-flows', 'how-work-flows', '일이 흐르는 구조: 작업 보드와 메시지',
  $aix$팀원을 만드는 법보다 먼저 알아야 할 것이 있습니다 — **일이 팀 안에서 어떻게 흐르는가**. 이 구조를 이해하면 나중에 어떤 문제가 생겨도 어디가 막혔는지 짚을 수 있습니다.

## 작업 보드: 주방의 주문서 걸이

바쁜 주방에는 주문서 걸이가 있습니다. 주문이 들어오면 걸리고, 요리사가 하나 집어 조리하고, 완성되면 빼냅니다. AI 팀의 **공유 작업 보드**도 똑같이 세 칸으로 움직입니다.

- **할 일** — 오케스트레이터가 등록한 작업이 대기하는 곳
- **진행 중** — 팀원이 집어 간 작업
- **완료** — 산출물과 함께 끝난 작업

누가 뭘 하는지 팀 전체가 이 보드 하나로 공유합니다. 말로 묻지 않아도 됩니다.

## 의존성: 순서가 필요한 일은 잠근다

명세가 없는데 개발부터 시작하면 엉뚱한 것을 만듭니다. 그래서 작업에는 **의존성**을 걸 수 있습니다.

- "구현" 작업은 "명세 작성" 완료 전까지 **잠겨** 있습니다.
- 기획자가 명세를 완료하는 순간, 잠겨 있던 구현 작업이 **자동으로 열립니다**.
- 릴레이 경주와 같습니다 — 바통을 받기 전에는 뛸 수 없습니다.

## 다이렉트 메시지: 반려의 통로

테스터가 버그를 찾으면? 팀원끼리 **직접 메시지**를 보내 개발자에게 반려합니다. 이 되돌아가는 화살표(반려 → 수정 → 재검증)가 팀 품질의 심장입니다. 방식에 따라 지휘자가 메시지를 중계하기도 하는데, 그 차이는 3모듈에서 다룹니다.

> 💡 **핵심**: 팀의 구조 = **보드**(무엇을) + **의존성**(어떤 순서로) + **메시지**(누구에게). 이 셋만 기억하면 어떤 멀티 에이전트 도구든 읽을 수 있습니다.$aix$,
  $aix${"type":"flow","title":"일이 팀 안에서 흐르는 길","nodes":[{"label":"오케스트레이터","sublabel":"목표를 작업으로 쪼개 보드에 등록","icon":"brain","tone":"primary"},{"label":"공유 작업 보드","sublabel":"할 일 → 진행 중 → 완료 · 의존성으로 잠금","icon":"clipboard","tone":"accent"},{"label":"팀원들이 작업 수행","sublabel":"기획 → 개발 → 테스트 릴레이","icon":"users","tone":"accent","edgeLabel":"선행 작업 완료 시 잠금 해제"},{"label":"결과 취합·보고","sublabel":"산출물 정리 후 사람에게 보고","icon":"check","tone":"success","edgeLabel":"전부 완료되면"}],"loopBack":{"from":2,"to":1,"label":"테스터 반려 → 수정 작업 재등록"},"caption":"되돌아가는 반려 화살표가 팀 품질의 심장입니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'c473d21f-dc9e-af80-5b97-f49472819af6', '46a386b4-1458-722b-7aa9-53e7461f2b6b', 'ai-agent-team/setup', 'setup', '준비물: Claude Code 설치와 사무실 개설',
  $aix$팀을 꾸리려면 먼저 사무실이 필요합니다. 이번 레슨에서 Claude Code를 설치하고, 팀이 일할 프로젝트 폴더를 만듭니다.

## 설치와 첫 실행

터미널을 열고 아래를 순서대로 입력합니다.

```bash
# 1. 설치 (macOS·리눅스·WSL)
curl -fsSL https://claude.ai/install.sh | bash

# 2. 설치 확인 — 버전 번호가 나오면 성공
claude --version

# 3. 팀의 사무실(프로젝트 폴더) 만들기
mkdir my-ai-team && cd my-ai-team

# 4. 첫 실행 — 브라우저가 열리며 로그인 안내
claude
```

- Windows라면 PowerShell에서 `irm https://claude.ai/install.ps1 | iex` 로 설치합니다.
- 로그인은 Claude 구독 계정 또는 Console 계정으로 진행합니다.

**여기서 막힌다면**: 설치 직후 `claude`를 찾을 수 없다고 나오면, 터미널을 완전히 닫고 새로 열어 다시 시도하세요. 설치가 등록한 경로를 새 터미널이 읽어옵니다.

## `.claude/` 폴더: 팀의 인사 서류함

프로젝트 안의 `.claude/` 폴더가 이 강의의 무대입니다. 회사의 서류함이라고 생각하세요.

- `.claude/agents/` — **팀원들의 인사 서류** (다음 레슨에서 채용 시작)
- `.claude/settings.json` — **사무실 규칙** (권한·안전장치, 4모듈에서)
- `CLAUDE.md` — **사무실 게시판** (팀 공통 규칙, 3모듈에서)

폴더가 아직 없어도 괜찮습니다. 필요할 때 직접 만들면 됩니다.

> 💡 **핵심**: 사무실 개설 = 설치 + 프로젝트 폴더 + `.claude/`. 앞으로 만들 모든 것이 이 폴더 안의 **파일**입니다 — 눈에 보이고, 고칠 수 있고, 팀과 공유할 수 있습니다.$aix$,
  $aix${"type":"terminal","windowTitle":"터미널 — 사무실 개설","lines":[{"text":"curl -fsSL https://claude.ai/install.sh | bash","tone":"cmd"},{"text":"✓ Claude Code 설치 완료","tone":"ok"},{"text":"claude --version","tone":"cmd"},{"text":"x.y.z (Claude Code)","tone":"out"},{"text":"mkdir my-ai-team && cd my-ai-team","tone":"cmd"},{"text":"claude","tone":"cmd"},{"text":"브라우저에서 로그인을 완료하세요…","tone":"dim"},{"text":"✓ 로그인 완료 — 무엇을 도와드릴까요?","tone":"ok"},{"text":"# 다음 레슨: .claude/agents/ 에 첫 팀원 채용","tone":"comment"}],"caption":"명령 4개면 사무실이 열립니다. 막히면 터미널을 새로 열어 보세요."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3772f13d-aa17-acd5-d5c4-3b83430aadf1', '46a386b4-1458-722b-7aa9-53e7461f2b6b', 'ai-agent-team/first-hire', 'first-hire', '첫 채용: 테스터 에이전트 만들기',
  $aix$첫 팀원은 테스터입니다. 검사하는 사람부터 뽑아야 나머지 팀원의 결과물을 받아줄 수 있으니까요. 채용 절차는 단순합니다 — **마크다운 파일 하나를 쓰면 끝**입니다.

## 파일 하나 = 팀원 한 명

```bash
mkdir -p .claude/agents
```

이제 `.claude/agents/tester.md` 파일을 만들고 아래 내용을 넣습니다.

```markdown
---
name: tester
description: 코드 구현이 끝나면 테스트를 실행해 검증하고 결과를 보고한다
tools: Read, Grep, Glob, Bash
---

# 테스터 업무 지시서

너는 이 팀의 테스터다.
- 테스트를 실행하고, 실패하면 파일·라인·원인을 정리해 TEST_REPORT.md에 기록하라.
- 구현 코드를 절대 고치지 말고, 문제를 발견하면 반려하라.
- 모든 테스트가 통과했을 때만 "검증 통과"라고 보고하라.
```

## frontmatter 한 줄씩 뜯어보기

파일 맨 위 `---` 사이 구간이 frontmatter(파일의 설정 머리말)입니다. 팀원의 인사 카드라고 생각하세요.

- `name` — 팀원을 부르는 이름.
- `description` — **가장 중요한 줄.** 오케스트레이터가 이 설명을 읽고 "이 일은 tester에게 맡기자"라고 **스스로 판단**합니다. 채용 공고의 '담당 업무'처럼 언제 불려야 하는지가 드러나게 쓰세요.
- `tools` — 이 팀원이 만질 수 있는 도구 목록 (자세한 설계는 두 레슨 뒤에).
- `model` — 어떤 모델로 일할지. 생략하면 기본값을 따르니 지금은 비워 둡니다.

그리고 frontmatter 아래 **본문 전체가 이 팀원의 시스템 프롬프트**가 됩니다. 즉, 업무 지시서입니다.

## 채용 확인

`claude`를 실행하고 `/agents`를 입력하면 등록된 에이전트 목록에 tester가 보입니다.

**여기서 막힌다면**: 목록에 안 보이면 ① 파일이 프로젝트 루트 기준 `.claude/agents/` 안에 있는지, ② frontmatter의 `---`가 위아래로 정확히 닫혔는지 확인하고, 새 세션으로 다시 열어 보세요.

> 💡 **핵심**: 채용 = 마크다운 파일 1개. `description`은 **자동 위임의 열쇠**, 본문은 그 팀원의 **업무 지시서(시스템 프롬프트)**입니다.$aix$,
  $aix${"type":"stack","title":"에이전트 파일 해부","layers":[{"label":"name · description","sublabel":"누가, 언제 불려야 하나 — 자동 위임의 근거","icon":"key","tone":"primary"},{"label":"tools · model","sublabel":"무엇을 만질 수 있고, 어떤 모델로 일하나","icon":"wrench","tone":"accent"},{"label":"마크다운 본문","sublabel":"어떻게 일하나 — 시스템 프롬프트가 되는 업무 지시서","icon":"file-text","tone":"muted"}],"caption":"위 두 층은 frontmatter(인사 카드), 아래 층은 업무 지시서입니다."}$aix$::jsonb, $aix${"title":"테스터 에이전트 채용 따라하기","app":{"kind":"code-editor","windowTitle":"tester.md — .claude/agents","files":[{"id":"f-tester","name":"tester.md","active":true},{"id":"f-claude","name":"CLAUDE.md"},{"id":"f-app","name":"app.js"}],"code":[{"id":"c1","text":"---"},{"id":"c2","text":"name: tester","tone":"add","hidden":true},{"id":"c3","text":"description: 구현이 끝나면 테스트를 실행해","tone":"add","hidden":true},{"id":"c4","text":"  검증하고 결과를 보고한다","tone":"add","hidden":true},{"id":"c5","text":"tools: Read, Grep, Glob, Bash","tone":"add","hidden":true},{"id":"c6","text":"---","hidden":true},{"id":"c7","text":"# 테스터 업무 지시서","tone":"comment","hidden":true},{"id":"c8","text":"너는 이 팀의 테스터다.","hidden":true},{"id":"c9","text":"테스트를 실행하고 결과를 보고하라.","hidden":true},{"id":"c10","text":"구현 코드를 고치지 말고 반려하라.","hidden":true}],"terminal":[{"id":"t1","text":"claude","tone":"cmd","hidden":true},{"id":"t2","text":"/agents","tone":"cmd","hidden":true},{"id":"t3","text":"프로젝트 에이전트 (.claude/agents)","tone":"out","hidden":true},{"id":"t4","text":"✓ tester — 테스트 실행·검증 담당","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① frontmatter — 팀원의 인사 카드부터 씁니다"},{"t":"move","target":"c1"},{"t":"click"},{"t":"type","target":"c2","text":"name: tester"},{"t":"type","target":"c3","text":"description: 구현이 끝나면 테스트를 실행해"},{"t":"type","target":"c4","text":"  검증하고 결과를 보고한다"},{"t":"type","target":"c5","text":"tools: Read, Grep, Glob, Bash"},{"t":"reveal","target":"c6"},{"t":"caption","text":"② 본문 — 이 내용이 시스템 프롬프트가 됩니다"},{"t":"type","target":"c7","text":"# 테스터 업무 지시서"},{"t":"type","target":"c8","text":"너는 이 팀의 테스터다."},{"t":"type","target":"c9","text":"테스트를 실행하고 결과를 보고하라."},{"t":"type","target":"c10","text":"구현 코드를 고치지 말고 반려하라."},{"t":"wait","ms":500},{"t":"caption","text":"③ Claude Code에서 채용됐는지 확인합니다"},{"t":"type","target":"t1","text":"claude"},{"t":"type","target":"t2","text":"/agents"},{"t":"reveal","target":"t3"},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"✅ 채용 완료 — description을 보고 일이 자동 위임됩니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9882772f-fbd8-ec51-34d4-eb913b5f55a6', '46a386b4-1458-722b-7aa9-53e7461f2b6b', 'ai-agent-team/role-prompts', 'role-prompts', '역할 지시서 쓰는 법: 4명분 완성',
  $aix$테스터를 뽑아 봤으니 이제 요령이 생겼습니다. 나머지 팀원도 같은 틀로 채용합니다. 좋은 역할 지시서에는 공통 구조가 있습니다 — **4요소**만 채우면 됩니다.

## 좋은 지시서의 4요소

1. **정체성** — "너는 이 팀의 ○○다." 역할을 한 문장으로 고정합니다.
2. **입력물** — 무엇을 받아서 일을 시작하는가. (예: "SPEC.md를 읽고 시작하라")
3. **산출물 형식** — 무엇을, 어떤 파일에, 어떤 형식으로 내놓는가.
4. **완료·반려 기준** — 언제 끝났다고 말할 수 있고, 언제 되돌려보내는가.

## 4명분 핵심 문구

각 파일을 `.claude/agents/`에 만들고, frontmatter는 테스터 때처럼 채웁니다. 본문의 핵심 문구는 이렇습니다.

```markdown
# planner.md — 기획자
너는 이 팀의 기획자다. 목표를 받으면 요구사항을
SPEC.md에 번호 목록으로 정리하라. 각 항목은
"~하면 ~된다" 형식의 확인 가능한 문장으로 쓴다.
코드를 작성하지 마라 — 명세가 너의 산출물이다.
```

```markdown
# developer.md — 개발자
너는 이 팀의 개발자다. SPEC.md를 읽고 항목 순서대로
구현하라. SPEC에 없는 기능을 임의로 추가하지 마라.
항목 하나를 끝낼 때마다 커밋을 남겨라.
```

```markdown
# designer.md — 디자이너
너는 이 팀의 디자이너다. SPEC.md를 읽고 화면 구성과
스타일을 정리해 DESIGN.md에 기록하라. 색·간격·글꼴은
근거와 함께 제안하고, 구현 코드는 건드리지 마라.
```

## 실전에서 배운 팁

- 테스터에게는 **"구현을 고치지 말고 반려하라"**를 반드시 명시하세요. 없으면 버그를 직접 고쳐 버려서 검증자의 의미가 사라집니다.
- 기획자의 "코드를 쓰지 마라", 개발자의 "SPEC에 없는 기능 금지"처럼 각 역할의 **하지 말 것**이 품질을 지킵니다.
- 산출물 파일명(`SPEC.md` 등)을 지시서에 **고정**하세요. 다음 주자가 어디서 바통을 받을지 알게 됩니다.

> 💡 **핵심**: 지시서 = 정체성 + 입력물 + 산출물 형식 + 완료·반려 기준. 그리고 각 역할의 **"하지 말 것" 한 줄**이 팀의 품질을 지킵니다.$aix$,
  $aix${"type":"grid","title":"역할 지시서의 4요소","items":[{"label":"① 정체성","sublabel":"너는 이 팀의 ○○다 — 역할 고정","icon":"user","tone":"primary"},{"label":"② 입력물","sublabel":"무엇을 받아 시작하는가 (SPEC.md 등)","icon":"download","tone":"accent"},{"label":"③ 산출물 형식","sublabel":"어떤 파일에 어떤 형식으로 내놓는가","icon":"upload","tone":"accent"},{"label":"④ 완료·반려 기준","sublabel":"언제 끝인가, 언제 되돌리는가 + 하지 말 것","icon":"check","tone":"warning"}],"caption":"네 칸을 채우면 어떤 역할이든 지시서가 됩니다 — 빈 칸이 곧 사고 지점입니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5aae3568-b002-4da0-0b19-82bc84575d3a', '46a386b4-1458-722b-7aa9-53e7461f2b6b', 'ai-agent-team/tool-permissions', 'tool-permissions', '도구 권한: 누가 뭘 만질 수 있나',
  $aix$새 직원에게 첫날부터 사무실 전체의 마스터키를 주는 회사는 없습니다. 각자 필요한 방의 열쇠만 주죠. AI 팀원의 `tools` 필드가 바로 그 **열쇠 꾸러미**입니다.

## 최소 권한 원칙

`tools`는 허용 목록입니다 — 적힌 도구만 쓸 수 있고, **생략하면 전부 물려받습니다**. 그래서 역할마다 딱 필요한 만큼만 적어 줍니다.

- **기획자** — `Read, Grep, Glob` : 코드를 읽고 검색만. 명세를 쓰는 사람이 코드를 고칠 이유가 없습니다.
- **테스터** — `Read, Grep, Glob, Bash` : 읽기 + 테스트 실행. 편집 도구는 없습니다.
- **개발자** — 편집 도구 포함(또는 생략해 전체 상속) : 실제로 코드를 고치는 유일한 역할.

## 왜 테스터에게 편집 권한을 주면 안 되나

실패하는 테스트를 "통과"시키는 가장 쉬운 방법이 뭘까요? 버그를 고치는 게 아니라 **테스트를 고치는 것**입니다. 기대값을 실제 출력에 맞춰 바꾸면 순식간에 초록불이 되죠.

- 편집 권한이 있는 테스터는 이 유혹에 빠질 수 있습니다 — 지시서에 "고치지 마라"를 썼더라도요.
- `tools`에서 편집 도구를 빼면 **구조적으로 불가능**해집니다. 지시서는 약속이고, 권한은 잠금장치입니다.
- 검사자와 수정자가 분리되어야 "통과"라는 보고를 믿을 수 있습니다.

## 권한 설계가 곧 역할 설계

권한 목록을 보면 그 팀원의 역할이 보입니다. 반대로, 역할이 흐릿하면 권한도 못 정합니다. "이 팀원에게 이 열쇠가 왜 필요하지?"에 답할 수 없다면 빼는 게 정답입니다.

> 💡 **핵심**: 지시서는 **약속**, 권한은 **잠금장치**. "고치지 마라"라고 말하는 것보다 **못 고치게 만드는 것**이 확실합니다.$aix$,
  $aix${"type":"compare","title":"권한 넉넉 vs 최소 권한","columns":[{"title":"전원 마스터키","icon":"alert","tone":"warning","items":["tools 생략 → 모두 전체 도구 상속","테스터가 테스트를 고쳐 '통과' 조작 가능","기획자가 코드를 건드리는 사고","문제가 나도 누가 그랬는지 불분명"]},{"title":"필요한 열쇠만","icon":"lock","tone":"primary","items":["기획자: Read·Grep·Glob (읽기만)","테스터: 읽기 + Bash (실행만)","개발자만 편집 가능","'통과' 보고를 구조적으로 신뢰 가능"]}],"caption":"권한 목록만 봐도 역할이 읽히는 팀이 좋은 팀입니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '53c07b25-1300-5457-5cac-8541a5f60c22', 'c29c531b-8028-b9d0-79e1-677cef35a599', 'ai-agent-team/two-ways', 'two-ways', '팀을 돌리는 두 가지 방법',
  $aix$팀원 파일이 준비됐습니다. 이제 이들을 함께 일하게 만드는 방법이 두 가지 있습니다 — 안정적인 기본형과, 강력하지만 실험적인 확장형입니다.

## 방법 A: 서브에이전트 오케스트레이션 (기본 권장)

여러분이 대화하는 **메인 세션이 곧 오케스트레이터**가 되는 방식입니다.

- 메인 세션이 `description`을 보고 팀원(서브에이전트)에게 일을 맡기고, **결과 요약만** 돌려받습니다.
- 팀원끼리 직접 대화하지는 않습니다 — 모든 소통이 지휘자를 거칩니다.
- 결과만 취합하므로 토큰이 절약되고, 흐름이 단순해서 **안정적**입니다.
- 별도 설정 없이 `.claude/agents/` 파일만 있으면 바로 동작합니다.

## 방법 B: 에이전트 팀 (실험적)

팀원들이 **각자 독립된 세션**으로 살아나 서로 직접 협업하는 방식입니다. 실험적 기능이라 직접 켜야 합니다.

```json
// .claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

- 켠 뒤 "팀을 만들어 ○○를 진행해줘"라고 **자연어로 요청**하면 리드가 팀원들을 스폰합니다.
- 공유 작업 보드 + 팀원 간 다이렉트 메시지 — 3레슨에서 본 구조 그대로입니다.
- 주의: 팀원마다 독립 컨텍스트를 쓰므로 **토큰 비용이 팀원 수만큼 배**로 듭니다. 한 세션에 팀은 하나, 팀원이 또 팀원을 뽑을 수는 없습니다.

## 언제 뭘 쓰나

- 순차 릴레이, 결과만 필요한 작업 → **A**. 대부분의 일은 이걸로 충분합니다.
- 팀원끼리 토론·조율이 필요한 작업(여러 가설 디버깅, 다각도 리뷰) → **B**.
- 이 강의의 실습은 **A를 기본**으로 하되, 다음 레슨의 데모에서 B의 협업 모습을 관찰합니다.

> 💡 **핵심**: 먼저 **서브에이전트(A)로 시작**하세요. 팀원끼리 대화가 꼭 필요해질 때만 에이전트 팀(B)을 켭니다 — 비용은 팀원 수에 비례합니다.$aix$,
  $aix${"type":"compare","title":"서브에이전트 vs 에이전트 팀","columns":[{"title":"A. 서브에이전트 (기본)","icon":"workflow","tone":"primary","items":["메인 세션 = 오케스트레이터","팀원은 결과 요약만 보고","소통은 전부 지휘자 경유","설정 불필요 · 토큰 절약 · 안정적"]},{"title":"B. 에이전트 팀 (실험적)","icon":"users","tone":"accent","items":["팀원마다 독립 세션으로 가동","공유 작업 보드 + 직접 메시지","환경변수로 켜는 실험 기능","토큰 비용이 팀원 수만큼 배"]}],"caption":"A로 시작해서, 팀원 간 '대화'가 필요해질 때만 B로 확장하세요."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '96604784-2347-389a-42a8-8ce0af66d08b', 'c29c531b-8028-b9d0-79e1-677cef35a599', 'ai-agent-team/first-relay', 'first-relay', '실전 릴레이: 기획→개발→테스트→반려→수정',
  $aix$드디어 팀을 가동합니다. 오케스트레이터에게 좋은 브리핑 하나만 주면, 일이 팀 안을 돌기 시작합니다.

## 오케스트레이터에게 줄 프롬프트 전문

`claude`를 실행하고 아래를 그대로 입력해 보세요 (목표는 원하는 것으로 바꿔도 됩니다).

```text
브라우저에서 동작하는 할 일 앱을 만들어줘.

역할 분담 — 서브에이전트를 이 순서로 써라:
1. planner: 요구사항을 SPEC.md로 정리
2. developer: SPEC.md대로 구현하고 항목마다 커밋
3. tester: 테스트를 실행해 TEST_REPORT.md 작성

완료 기준: 모든 테스트 통과 + SPEC 항목 전부 구현.
반려 규칙: tester가 실패를 보고하면 실패 내용을
그대로 developer에게 전달해 수정시켜라. 최대 3회.
너는 직접 구현하지 마라 — 분배와 취합만 해라.
```

브리핑의 뼈대는 넷입니다: **목표 + 역할 분담 + 완료 기준 + 반려 규칙**.

## 관찰 포인트

일이 도는 동안 이걸 지켜보세요. 구조가 눈에 들어옵니다.

- 오케스트레이터가 각 팀원의 `description`을 보고 **알아서 위임**하는가.
- 테스터의 실패 보고가 개발자에게 전달되고, 수정 후 **재검증**이 도는가 — 이 반려 루프가 릴레이의 심장입니다.
- "직접 구현하지 마라"가 없으면 지휘자가 혼자 다 해버리는 경우가 많습니다. 실무를 놓지 못하는 초보 관리자와 똑같습니다.
- "최대 3회"는 무한 반복을 막는 안전장치입니다 — 없으면 같은 반려가 끝없이 돌 수 있습니다.

**여기서 막힌다면**: 지휘자가 팀원을 부르지 않고 혼자 일한다면, "planner 서브에이전트에게 맡겨라"처럼 **이름을 콕 집어** 다시 지시하세요.

## 데모에서 릴레이를 눈으로

아래 데모는 에이전트 팀 방식으로 돌렸을 때의 협업 채널 모습입니다. 배정 → 명세 → 구현 → 반려 → 수정 → 통과 → 보고가 한눈에 보입니다.

> 💡 **핵심**: 좋은 브리핑 = **목표 + 역할 분담 + 완료 기준 + 반려 규칙**. 특히 "직접 하지 마라"와 "최대 N회"가 팀을 팀답게 만듭니다.$aix$,
  $aix${"type":"chat","title":"오케스트레이터와의 대화","messages":[{"role":"user","text":"할 일 앱을 만들어줘. planner → developer → tester 순서로, 실패하면 반려. 너는 분배와 취합만 해."},{"role":"ai","text":"작업 3개를 등록했습니다. planner에게 명세 작성을 맡깁니다."},{"role":"ai","text":"tester가 반려했습니다 — 빈 입력 버그. 실패 내용을 developer에게 전달해 수정시킵니다. (1/3회)"},{"role":"ai","text":"재검증 통과 ✅ 산출물: SPEC.md · todo.js · TEST_REPORT.md — 최종 검수 부탁드립니다."}],"caption":"지휘자는 분배·전달·취합만 합니다. 반려도 보고의 한 형태입니다."}$aix$::jsonb, $aix${"title":"팀 채널에서 릴레이 관찰하기","app":{"kind":"chat-app","workspace":"AI 팀 — 할 일 앱 프로젝트","composerId":"composer","channels":[{"id":"ch-team","name":"팀-작업-현황","active":true},{"id":"ch-log","name":"빌드-로그"}],"messages":[{"id":"m1","author":"지휘자","bot":true,"time":"21:02","text":"작업 보드 등록: ① 명세(기획자) ② 구현(개발자, ①에 의존) ③ 검증(테스터, ②에 의존)","hidden":true},{"id":"m2","author":"기획자","bot":true,"time":"21:07","text":"SPEC.md 제출 — 할 일 추가·완료·삭제, 빈 입력은 거부. ① 명세 완료 ✅","hidden":true},{"id":"m3","author":"개발자","bot":true,"time":"21:26","text":"todo.js 구현·커밋 완료. ② 완료 — ③ 검증 작업이 열렸습니다 → 테스터","hidden":true},{"id":"m4","author":"테스터","bot":true,"time":"21:31","text":"12개 중 11개 통과. ❌ 빈 입력이 목록에 추가됨 (SPEC 3번 위반) — 개발자에게 반려합니다","hidden":true},{"id":"m5","author":"개발자","bot":true,"time":"21:38","text":"빈 입력 검사를 추가하고 수정 커밋했습니다. 재검증 부탁합니다","hidden":true},{"id":"m6","author":"테스터","bot":true,"time":"21:42","text":"✓ 12개 전부 통과 — ③ 검증 완료, TEST_REPORT.md 갱신","hidden":true},{"id":"m7","author":"지휘자","bot":true,"time":"21:44","text":"모든 작업 완료. 산출물: SPEC.md · todo.js · TEST_REPORT.md — 최종 검수만 남았습니다","hidden":true}]},"actions":[{"t":"caption","text":"① 지휘자에게 목표와 반려 규칙을 한 번에 줍니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"할 일 앱 만들어줘. 기획→개발→검증, 실패는 반려해"},{"t":"wait","ms":400},{"t":"reveal","target":"m1"},{"t":"move","target":"m1"},{"t":"caption","text":"② 앞 작업이 끝나야 다음이 열립니다 — 릴레이 시작"},{"t":"reveal","target":"m2"},{"t":"reveal","target":"m3"},{"t":"wait","ms":600},{"t":"caption","text":"③ 테스터가 버그를 찾아 개발자에게 직접 반려합니다"},{"t":"reveal","target":"m4"},{"t":"move","target":"m4"},{"t":"wait","ms":500},{"t":"reveal","target":"m5"},{"t":"reveal","target":"m6"},{"t":"caption","text":"④ 지휘자는 취합·보고만 — 사람은 최종 검수만 합니다"},{"t":"reveal","target":"m7"},{"t":"move","target":"m7"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '71b8c826-7ad5-a356-d1e5-009d37e4231f', 'c29c531b-8028-b9d0-79e1-677cef35a599', 'ai-agent-team/parallel-worktree', 'parallel-worktree', '병렬 작업과 충돌 방지: 각자의 작업실',
  $aix$팀이 커지면 새로운 사고가 생깁니다 — 두 팀원이 **같은 파일**을 동시에 고치는 것. 원본 서류 한 장에 두 사람이 동시에 펜을 대는 셈입니다.

## 같은 파일을 만지면 생기는 일

- 나중에 저장한 쪽이 먼저 저장한 쪽의 수정을 **덮어씁니다**. 한 명의 밤샘 작업이 조용히 사라질 수 있습니다.
- 반쯤 고쳐진 파일을 다른 팀원이 읽고 **엉뚱한 판단**을 내리기도 합니다.
- 해결의 원리는 단순합니다: 원본을 **복사해서 각자 책상에서** 작업하고, 끝나면 취합한다.

## worktree: Git이 주는 독립 작업실

worktree(같은 저장소를 다른 폴더에 하나 더 펼쳐 놓는 Git 기능)를 쓰면 세션마다 독립된 작업 폴더가 생깁니다.

```bash
# 터미널 1 — 로그인 기능 담당 세션
claude --worktree login-feature

# 터미널 2 — 다크 모드 담당 세션
claude --worktree dark-mode
```

- 각 세션은 **자기 폴더와 자기 브랜치**에서만 일합니다. 서로의 파일을 건드릴 수 없습니다.
- 작업이 끝나면 브랜치를 검토하고 머지해서 취합합니다.
- 아무 변경 없이 끝난 worktree는 자동으로 정리됩니다.
- 서브에이전트에도 격리를 줄 수 있습니다 — 에이전트 파일 frontmatter에 `isolation: worktree`를 추가하면 그 팀원은 자기 작업실에서 일합니다.

## 격리의 한계도 알아두기

worktree가 격리하는 것은 **파일뿐**입니다. 두 세션이 같은 포트로 개발 서버를 띄우면 충돌하고, 같은 데이터베이스를 바라보면 서로의 데이터를 건드립니다.

> 💡 **핵심**: 병렬의 전제는 **격리**입니다. 일을 나눌 때 "파일이 겹치는가?"부터 확인하고, 겹칠 수 있으면 worktree로 책상을 분리하세요.$aix$,
  $aix${"type":"steps","title":"충돌 없는 병렬 작업 절차","steps":[{"label":"일을 파일 기준으로 쪼갠다","sublabel":"두 작업이 같은 파일을 만지지 않게 설계","icon":"scissors"},{"label":"worktree로 세션 분리","sublabel":"claude --worktree 이름 — 독립 폴더+브랜치","icon":"git-branch"},{"label":"각자 작업실에서 커밋","sublabel":"서로의 파일을 건드릴 수 없음","icon":"code"},{"label":"검토 후 머지로 취합","sublabel":"변경 없는 작업실은 자동 정리","icon":"check"}],"caption":"원본 서류를 복사해 각자 책상에서 작업하고, 끝나면 한 서랍에 모으는 절차입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0c3672c0-4e9c-a674-161c-db135fe2e8d9', 'c29c531b-8028-b9d0-79e1-677cef35a599', 'ai-agent-team/team-rules', 'team-rules', '팀 규칙 문서화: CLAUDE.md와 산출물 규약',
  $aix$사람 팀도 "말 안 해도 알겠지"가 사고의 시작입니다. AI 팀은 더합니다 — **적히지 않은 규칙은 존재하지 않는 규칙**입니다.

## CLAUDE.md: 사무실 게시판

프로젝트 루트의 `CLAUDE.md`는 팀원 모두가 일을 시작할 때 자동으로 읽는 공통 문서입니다. 출근길에 반드시 지나치는 게시판인 셈이죠. 역할 지시서에 넣기엔 **모두에게 해당하는** 규칙을 여기 적습니다.

```markdown
# 팀 공통 규칙
- 커밋 메시지는 "무엇을, 왜"를 한 줄로.
- 완료 보고는 3줄: 한 일 / 검증 결과 / 다음 사람에게.
- node_modules와 .env는 절대 수정 금지.
- 확신이 없으면 추측으로 진행하지 말고 질문을 남겨라.
```

## 산출물 규약: 릴레이의 바통 규격

릴레이에서 앞 주자의 산출물은 다음 주자의 입력물입니다. 형식이 흔들리면 바통을 놓칩니다.

- **파일명 고정** — 명세는 `SPEC.md`, 검증은 `TEST_REPORT.md`, 디자인은 `DESIGN.md`. 어디서 받을지 모두가 압니다.
- **형식 고정** — SPEC은 번호 목록, TEST_REPORT는 "통과 n / 실패 n + 실패 상세" 같은 틀을 정합니다.
- 규약은 CLAUDE.md와 각 역할 지시서 **양쪽에** 적습니다. 주는 쪽과 받는 쪽이 같은 규격을 알아야 하니까요.

## 보고 형식이 릴레이 품질을 결정한다

"됐어요"라는 보고는 다음 주자에게 아무 정보가 없습니다. "SPEC 1~4번 구현, 테스트 12개 통과, 5번은 질문 있음"이라는 보고는 다음 행동을 바로 정해 줍니다. 보고 형식을 통일하는 것은 예의가 아니라 **성능**입니다.

> 💡 **핵심**: CLAUDE.md는 **전원이 읽는 게시판**, 산출물 규약은 **바통의 규격**. 릴레이 품질은 팀원의 실력보다 이 규격의 명확함이 결정합니다.$aix$,
  $aix${"type":"stack","title":"팀 규칙의 층위","layers":[{"label":"CLAUDE.md","sublabel":"전원이 자동으로 읽는 공통 규칙 (게시판)","icon":"book","tone":"primary"},{"label":"역할 지시서 (.claude/agents/*.md)","sublabel":"팀원 개인의 업무 방식","icon":"user","tone":"accent"},{"label":"산출물 규약 (SPEC.md · TEST_REPORT.md)","sublabel":"팀원 사이를 오가는 바통의 규격","icon":"file-text","tone":"accent"},{"label":"작업 보드","sublabel":"지금 누가 무엇을 하는지의 실시간 상태","icon":"clipboard","tone":"muted"}],"caption":"위로 갈수록 오래 유지되는 규칙, 아래로 갈수록 실시간 상태입니다."}$aix$::jsonb, null, 5, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b9212012-5e07-10ff-7652-6a6ca9e4fa25', '5b5ff14a-bd15-7dc2-aa20-c7c50563a2af', 'ai-agent-team/night-permissions', 'night-permissions', '무인 모드의 조건: 권한 설계',
  $aix$낮에는 위험한 행동마다 여러분이 승인 버튼을 눌러 줍니다. 밤에는? **승인해 줄 사람이 없습니다.** 팀이 확인을 기다리며 아침까지 멈춰 있거나, 아무거나 하도록 풀어놓거나 — 둘 다 정답이 아닙니다.

## 권한 모드의 스펙트럼

Claude Code는 세션의 기본 태도를 권한 모드로 정합니다. `claude --permission-mode acceptEdits`처럼 시작하거나, 세션 중 Shift+Tab으로 전환합니다.

- **default** — 위험한 행동마다 물어봄. 낮에 옆에서 지켜볼 때의 모드.
- **acceptEdits** — 파일 편집은 자동 승인. 야간 운영의 현실적인 출발점.
- **plan (플랜 모드)** — 읽기만 하고 계획만 세움. 실행 전 검토용.
- **bypassPermissions** — 전부 자동 승인. 가장 위험한 모드입니다.

## allow와 deny: 목록으로 조인다

모드가 큰 방향이라면, `.claude/settings.json`의 규칙은 정밀 조준입니다.

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint:*)",
      "Bash(git commit:*)"
    ],
    "deny": [
      "Bash(rm:*)",
      "Bash(git push:*)"
    ]
  }
}
```

- `allow` — 물어보지 않고 실행해도 되는 것. 테스트·린트·커밋처럼 **되돌릴 수 있는** 명령들.
- `deny` — 무슨 일이 있어도 금지. 삭제(`rm`)나 외부 반영(`git push`)처럼 **되돌리기 어려운** 명령들.
- 같은 명령이 양쪽에 걸리면 **deny가 항상 이깁니다**.

## bypassPermissions는 격리 환경 전용

`--dangerously-skip-permissions`(bypassPermissions와 같은 효과)라는 이름부터가 경고입니다. 내 컴퓨터에서 그대로 켜면 팀이 어떤 명령이든 실행할 수 있게 됩니다. 쓰려면 망가져도 되는 **격리된 컨테이너나 가상 머신 안**에서만 쓰세요.

> 💡 **핵심**: 무인 모드는 "전부 허용"이 아닙니다. **allow를 넓히고 deny를 단단히** — 되돌릴 수 있는 것은 풀고, 되돌리기 어려운 것은 잠급니다.$aix$,
  $aix${"type":"grid","title":"권한 모드 스펙트럼","items":[{"label":"default","sublabel":"행동마다 확인 — 낮에 지켜볼 때","icon":"message","tone":"muted"},{"label":"plan (플랜 모드)","sublabel":"읽기와 계획만 — 실행 전 검토","icon":"eye","tone":"accent"},{"label":"acceptEdits","sublabel":"파일 편집 자동 승인 — 야간의 출발점","icon":"check","tone":"primary"},{"label":"bypassPermissions","sublabel":"전부 자동 — 격리된 컨테이너 전용","icon":"alert","tone":"warning"}],"caption":"모드로 큰 방향을 정하고, allow/deny 목록으로 정밀하게 조입니다."}$aix$::jsonb, null, 6, 11
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b957e55e-76e0-cfd3-f4bd-c4846aa1b6a3', '5b5ff14a-bd15-7dc2-aa20-c7c50563a2af', 'ai-agent-team/night-guardrails', 'night-guardrails', '야간 가드레일: Hook과 안전장치',
  $aix$권한이 문단속이라면, Hook은 **밤새 순찰하는 경비원**입니다. Hook(특정 순간마다 자동 실행되는 스크립트)은 팀원의 행동 사이사이에 끼어들어 기계적으로 규칙을 강제합니다.

## PreToolUse: 실행 직전의 검문소

PreToolUse Hook은 팀원이 도구를 실행하기 **직전**에 내 스크립트를 먼저 돌립니다. 스크립트가 종료 코드 2로 끝나면 그 행동은 **차단**되고, 차단 사유가 에이전트에게 전달되어 다른 방법을 찾게 됩니다.

```json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "./check-danger.sh" }
        ]
      }
    ]
  }
}
```

`check-danger.sh`는 실행될 명령을 검사해 위험 패턴(예: `rm`이 포함된 명령)이면 종료 코드 2로 끝나는 짧은 스크립트입니다. deny 규칙과 겹쳐 두면 **이중 잠금**이 됩니다.

## 끝났을 때 알리기

- **Stop** — 에이전트가 응답을 마칠 때 실행. 작업 완료 알림을 보내기 좋습니다.
- **SessionEnd** — 세션이 종료될 때 실행. "밤샘 근무 종료" 신호로 쓸 수 있습니다.
- **Notification** — 확인이 필요해 멈췄을 때 실행. 밤중에 팀이 조용히 멈춰 있는 걸 아침에야 발견하는 사태를 막아 줍니다.

## 상한과 예산 감각

'루프 엔지니어링'의 가드레일이 **프롬프트 속 약속**이었다면, Hook은 **시스템이 강제하는 규칙**입니다. 사람이 없는 밤에는 약속보다 강제가 필요합니다.

- 반복 상한("최대 3회")은 브리핑 프롬프트에 명시합니다.
- 팀원 수는 곧 토큰 배수입니다 — 밤샘 팀은 3~5명 규모로 시작하세요.

> 💡 **핵심**: 밤의 안전장치는 3중입니다 — **deny(잠금) + PreToolUse(검문) + 알림 Hook(보고)**. 약속(프롬프트)이 아니라 구조(설정)로 지킵니다.$aix$,
  $aix${"type":"flow","title":"Hook이 지키는 야간 작업 흐름","nodes":[{"label":"팀원이 명령 실행 시도","sublabel":"예: 빌드, 파일 정리, 커밋","icon":"bot","tone":"primary"},{"label":"PreToolUse 검문","sublabel":"위험 패턴이면 종료 코드 2 → 차단","icon":"shield","tone":"warning"},{"label":"실행 및 작업 계속","sublabel":"통과한 명령만 실제로 실행","icon":"zap","tone":"accent","edgeLabel":"검문 통과 시"},{"label":"Stop · SessionEnd 알림","sublabel":"작업 종료를 사람에게 보고","icon":"send","tone":"success"}],"loopBack":{"from":1,"to":0,"label":"차단 — 사유가 전달되고 다른 방법 모색"},"caption":"검문에 걸리면 멈추는 게 아니라, 사유를 듣고 안전한 경로로 다시 시도합니다."}$aix$::jsonb, null, 5, 12
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6db4aabc-f330-610f-64b4-56733b3da907', '5b5ff14a-bd15-7dc2-aa20-c7c50563a2af', 'ai-agent-team/night-shift', 'night-shift', '밤샘 근무 지시서: 저녁에 시키고 아침에 받기',
  $aix$퇴근하는 매니저가 야간 근무자에게 남기는 인수인계 메모를 떠올려 보세요. 좋은 메모에는 할 일만이 아니라 **막혔을 때의 행동 요령**까지 적혀 있습니다. 밤샘 브리핑도 똑같습니다.

## 밤샘 브리핑의 5요소

프로젝트에 `night-briefing.md`를 만들고 다섯 가지를 채웁니다.

```text
[목표] TODO.md의 작업을 위에서부터 처리한다.
[우선순위] 1) 실패 테스트 수정 2) 로그인 기능 3) 리팩토링
[완료 기준] npm run test 전부 통과한 것만 완료로 표시.
[막혔을 때] 같은 에러 3회 반복이면 그 작업은 건너뛰고
  BLOCKED.md에 상황을 기록한 뒤 다음 작업으로 넘어가라.
[아침 보고] MORNING_REPORT.md에 완료/보류/막힌 것 정리.
  작업 하나 끝날 때마다 git 커밋을 남겨라.
```

특히 **[막혔을 때]**가 무인 운영의 핵심입니다. 이 규칙이 없으면 팀은 새벽 1시에 만난 에러 하나를 아침까지 붙잡고 있습니다.

## headless로 실행하기

`claude -p`는 대화 화면 없이 프롬프트 하나를 받아 끝까지 수행하고 종료하는 **headless(비대화형) 실행**입니다. 스크립트와 예약 실행의 재료죠.

```bash
# 저녁에 한 번 실행하고 퇴근
claude -p "night-briefing.md를 읽고 그대로 수행하라" \
  --permission-mode acceptEdits

# cron(정해진 시각에 명령을 자동 실행하는 예약 도구)에
# 등록하면 매일 밤 10시에 자동 출근합니다
```

앞 레슨의 allow/deny와 Hook이 설정된 상태라는 전제입니다 — 브리핑은 그 안전망 **위에서** 도는 겁니다.

## 중간 저장은 커밋으로

"작업 하나 끝날 때마다 커밋"이라는 한 줄이 밤샘 운영의 블랙박스를 만듭니다.

- 아침에 커밋 로그만 훑어도 밤새 무슨 일이 있었는지 재구성됩니다.
- 마지막에 뭔가 잘못됐어도, 커밋 단위로 **되돌릴 수** 있습니다.

> 💡 **핵심**: 밤샘 브리핑 = 목표 + 우선순위 + 완료 기준 + **막혔을 때 규칙** + 아침 보고 형식. 그리고 `claude -p`로 맡기고 퇴근합니다.$aix$,
  $aix${"type":"terminal","windowTitle":"밤샘 근무 세션 로그","lines":[{"text":"claude -p \"night-briefing.md를 읽고 수행하라\" --permission-mode acceptEdits","tone":"cmd"},{"text":"22:05 브리핑 확인 — 작업 3건 접수","tone":"dim"},{"text":"23:12 ✓ 실패 테스트 3건 수정 — 커밋","tone":"ok"},{"text":"01:40 ✓ 로그인 기능 구현, 테스트 통과 — 커밋","tone":"ok"},{"text":"03:05 ✕ DB 설정 변경 3회 실패","tone":"err"},{"text":"03:06 규칙에 따라 건너뜀 — BLOCKED.md 기록","tone":"dim"},{"text":"05:58 ✓ MORNING_REPORT.md 작성 완료","tone":"ok"},{"text":"# 아침의 나에게: 완료 2 / 막힘 1 (상세는 보고서)","tone":"comment"}],"caption":"막혔을 때 규칙 덕분에 팀이 에러 하나에 밤을 새우지 않았습니다."}$aix$::jsonb, null, 6, 13
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '85a473f4-93e5-7909-1ca1-e5fc1c00074e', '5b5ff14a-bd15-7dc2-aa20-c7c50563a2af', 'ai-agent-team/morning-review', 'morning-review', '아침 점검 루틴과 팀 개선',
  $aix$아침에 커피를 들고 자리에 앉으면, 밤새 일한 팀의 보고가 기다리고 있습니다. 무인 운영의 마지막 조각은 **사람의 검수** — 그리고 검수에서 배운 것을 팀에 되돌려 넣는 습관입니다.

## 아침에 볼 것 3가지 (순서대로)

1. **커밋 로그** — `git log --oneline`으로 밤새 작업의 큰 그림부터. 커밋이 없다면 팀이 일찍 멈췄다는 신호입니다.
2. **테스트 결과** — `TEST_REPORT.md`를 읽고, 테스트를 직접 한 번 다시 돌려 봅니다. 보고서와 실제가 다르면 그게 첫 번째 조사 대상입니다.
3. **잔여 작업** — `MORNING_REPORT.md`와 `BLOCKED.md`에서 보류·막힌 항목을 확인하고 오늘 계획에 반영합니다.

## 검수와 반려

결과물이 마음에 안 들면 사람도 반려하면 됩니다. 요령은 팀 내부의 반려와 같습니다 — **구체적으로**.

- 나쁜 반려: "로그인이 좀 이상해요"
- 좋은 반려: "로그인 실패 시 에러 문구가 안 보임. SPEC 4번 기준으로 수정하고 테스트 추가해줘"

## 팀도 루프처럼 개선한다

같은 실패가 반복되면 그건 팀원의 실수가 아니라 **지시서의 구멍**입니다.

- 테스터가 빈 입력 버그를 놓쳤다 → tester.md에 "빈 입력·아주 긴 입력을 반드시 확인하라" 추가.
- 개발자가 명세에 없는 기능을 만들었다 → developer.md의 금지 조항을 더 구체적으로.
- 사용량도 주기적으로 확인하세요. 팀원 수만큼 토큰이 배로 들어가니, 며칠 지켜보고 **일이 없는 역할은 줄이는 것**도 개선입니다.

이 사이클이 돌기 시작하면, 팀은 매일 밤 조금씩 더 좋아집니다. 여러분이 자는 동안에도요.

> 💡 **핵심**: 아침 루틴 = **커밋 로그 → 테스트 → 잔여 확인**, 그리고 실패 원인을 **역할 지시서에 반영**. 팀을 개선하는 것도 결국 하나의 루프입니다.$aix$,
  $aix${"type":"cycle","title":"매일 도는 팀 개선 루프","center":"팀이 매일 밤 좋아진다","nodes":[{"label":"저녁: 브리핑 작성","sublabel":"목표·기준·막힘 규칙","icon":"clipboard"},{"label":"밤: 무인 실행","sublabel":"claude -p + 안전장치","icon":"clock"},{"label":"아침: 점검·검수","sublabel":"커밋 → 테스트 → 잔여","icon":"eye"},{"label":"개선: 지시서 반영","sublabel":"실패 원인을 규칙으로","icon":"wrench"}],"caption":"검수에서 배운 것을 지시서에 되돌려 넣는 순간, 운영이 성장으로 바뀝니다."}$aix$::jsonb, null, 5, 14
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
  $aix$"프롬프트를 고쳤더니 더 좋아진 것 같아요" — 이 문장이 팀 채팅에 올라오는 순간, 여러분에게는 하네스가 필요합니다. "좋아진 것 같다"는 느낌만으로는 아무것도 증명할 수 없기 때문입니다.

## 바이브 체크(Vibe Check)의 3가지 함정

바이브 체크란 결과 몇 개를 눈으로 훑어보고 "느낌상 괜찮네"라고 판단하는 방식입니다. 누구나 이렇게 시작하지만, 앱이 커질수록 반드시 한계에 부딪힙니다.

- **표본이 치우칩니다** — 방금 떠올린 예시 3개로 판단합니다. 실제 사용자가 던지는 질문의 종류·비율과는 전혀 다릅니다.
- **회귀를 놓칩니다** — 회귀란 전에는 잘 되던 것이 수정 후 망가지는 현상입니다. 케이스 A가 좋아진 대신 케이스 B가 망가져도 알아챌 방법이 없습니다.
- **재현이 안 됩니다** — "좋아 보였다"는 기억은 다음 주에 같은 기준으로 다시 측정할 수 없습니다.

## 하네스(Harness)란

하네스는 원래 기계를 시험대에 고정하는 '틀'을 가리키는 말입니다. 여기서는 LLM 앱을 **같은 문제 세트로 반복 실행하고, 출력을 자동 채점해 점수로 만드는 실행 틀**을 뜻합니다. 매번 같은 시험지로 치르는 모의고사장이라고 생각하면 쉽습니다.

- 입력: 골든 데이터셋 (대표 케이스 모음 = 시험 문제지)
- 실행: 프롬프트/모델 버전별로 한꺼번에 호출
- 채점: 규칙·코드·LLM 채점기로 자동 판정
- 결과: "이번 변경으로 정확도 84% → 91%" 같은 **숫자**

숫자가 생기면 "내 느낌엔 좋았는데요"라는 소모적인 논쟁이 검증 가능한 실험으로 바뀝니다. 이것이 이 강의 전체의 목표입니다.

> 💡 **핵심**: 바이브 체크는 폐기물이 아니라 출발점입니다 — 감으로 발견한 기준을 **하네스에 옮겨 적는 순간** 품질 관리가 시작됩니다.$aix$,
  $aix${"type":"compare","title":"바이브 체크 vs 이벨 하네스","columns":[{"title":"바이브 체크","icon":"eye","tone":"muted","items":["떠오른 예시 3~4개로 판단","케이스 B의 회귀를 놓침","\"좋아 보였다\"는 기억뿐","논쟁으로 의사결정"]},{"title":"이벨 하네스","icon":"test-tube","tone":"primary","items":["대표 케이스 수백 개 일괄 실행","전체 점수로 회귀 즉시 감지","언제든 같은 기준으로 재측정","숫자로 의사결정"]}],"caption":"같은 프롬프트 변경도 하네스가 있으면 '실험'이 되고, 없으면 '도박'이 됩니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '72cc7adf-04c5-69a2-db06-0c25c765dd8b', 'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', 'ai-harness/golden-dataset', 'golden-dataset', '골든 데이터셋 만들기',
  $aix$이벨의 품질은 채점기가 아니라 **데이터셋**이 결정합니다. 시험이 공정하려면 채점 방식보다 먼저 문제가 좋아야 하는 것과 같습니다. 대표성 없는 100문항보다 잘 고른 30문항이 낫습니다. '골든(golden)'이라는 이름은 "정답이 확정된 기준 데이터"라는 뜻입니다.

## 어디서 케이스를 모으는가

- **실사용 로그** — 최고의 원천입니다. 실제 사용자가 던진 입력이 곧 시험 문제입니다.
- **실패 사례** — 버그 리포트나 고객 불만에 등장한 입력은 무조건 수록합니다.
- **엣지 케이스**(정상 범위의 가장자리에 있는 특이한 입력) — 빈 입력, 아주 긴 글, 다국어, 프롬프트 인젝션(입력에 악성 지시를 숨겨 AI를 조종하려는 시도) 등.
- **합성 데이터** — 부족한 유형은 LLM에게 비슷한 문제를 만들게 하되, 반드시 사람이 검수합니다.

실사용 로그가 아직 없다면, 동료 3~4명에게 "이 앱에 뭘 물어보고 싶어요?"라고 묻고 10개씩 받아 시작하는 것도 좋은 방법입니다.

## 케이스 하나의 구조

각 케이스는 세 가지를 갖춥니다: **입력(input) · 기대 결과(expected) · 채점 기준(assertion)**. 기대 결과는 정답 문자열일 수도 있고, "환불 정책을 언급해야 함" 같은 조건일 수도 있습니다.

## 크기보다 커버리지

커버리지란 데이터셋이 실제 상황을 얼마나 빠짐없이 대표하는지를 뜻합니다.

- 시작은 **20~50개**면 충분합니다. 지금 당장 만드세요.
- 유형별 비율을 실사용과 비슷하게 맞춥니다. 자주 오는 질문이 데이터셋에도 많아야 합니다.
- 데이터셋은 코드처럼 **버전 관리**하고, 새 실패가 나올 때마다 케이스를 추가해 키웁니다.

> 💡 **핵심**: 골든 데이터셋은 한 번 만들고 끝나는 산출물이 아니라 **실패할 때마다 자라는 살아있는 자산**입니다.$aix$,
  $aix${"type":"steps","title":"골든 데이터셋 구축 절차","steps":[{"label":"실사용 로그 발굴","sublabel":"실제 입력에서 대표 케이스 추출","icon":"search"},{"label":"실패·엣지 케이스 수록","sublabel":"버그 리포트, 경계 조건, 인젝션","icon":"alert"},{"label":"기대 결과·채점 기준 작성","sublabel":"input · expected · assertion","icon":"clipboard"},{"label":"검수 후 버전 관리","sublabel":"20~50개로 시작, git에 커밋","icon":"git-branch"}],"caption":"완벽한 100개를 기다리지 말고, 대표적인 30개로 오늘 시작하세요."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '50baa3fd-5d64-0d43-2a05-88c50b58bbd8', 'fd67f84e-e3a4-fbea-4eac-e2ee44a47291', 'ai-harness/grading-methods', 'grading-methods', '채점 방식 3종: 정확 일치·코드 채점·LLM-as-Judge',
  $aix$출력을 어떻게 채점할지 정하는 일이 이벨 설계의 절반입니다. 2026년 실무에서 쓰는 채점기는 크게 세 계열이고, 각각 쓰임새가 다릅니다.

## 1. 정확 일치 (Exact / Pattern Match)

정답이 하나로 정해지는 작업에 씁니다 — 분류 라벨(예: "이 문의는 환불/배송/기타 중 무엇인가"의 답), JSON 필드 값, 숫자 계산.

- 장점: 빠르고, 공짜고, 결정적입니다(같은 입력이면 언제나 같은 점수라는 뜻).
- 변형: 특정 문구 포함 여부, 정규식(문자 패턴을 찾는 검색 규칙), 대소문자 무시.

## 2. 코드 채점 (Programmatic)

하나의 정답 문자열은 없지만 **코드로 검사할 수 있는 조건**이 있을 때 씁니다.

- JSON 스키마 통과 여부, 생성된 SQL(데이터베이스 질의 언어)의 실행 성공, 코드의 테스트 통과
- 응답 길이, 쓰면 안 되는 단어(금칙어), 꼭 들어가야 할 키워드 검사
- 결정적이면서 정확 일치보다 유연합니다 — **가능하면 항상 여기까지는 코드로** 해결하세요.

## 3. LLM-as-Judge

"친절한가", "요약이 원문에 충실한가"처럼 사람의 판단이 필요한 품질은 **다른 LLM에게 루브릭을 주고 채점**시킵니다.

- 유연하지만 비싸고, 채점기 자체가 틀릴 수 있습니다 → 2모듈에서 설계법을 다룹니다.

## 선택 순서

정확 일치로 되면 정확 일치 → 안 되면 코드 채점 → 그래도 안 되는 것만 Judge. **싼 채점기부터 먼저 다 쓰고 넘어가는 것**이 원칙입니다. 계산기로 풀 수 있는 문제를 굳이 전문가에게 들고 가지 않는 것과 같습니다.

> 💡 **핵심**: 채점기는 섞어 씁니다 — 형식은 코드로, 품질은 Judge로. 한 케이스에 assertion(채점 기준)이 여러 개 달리는 것이 정상입니다.$aix$,
  $aix${"type":"grid","title":"채점 방식 3종 비교","items":[{"label":"정확 일치","sublabel":"분류·JSON 값 · 공짜·결정적","icon":"check","tone":"success"},{"label":"코드 채점","sublabel":"스키마·실행 검증 · 결정적","icon":"code","tone":"primary"},{"label":"LLM-as-Judge","sublabel":"톤·충실성 · 유연하지만 비쌈","icon":"brain","tone":"accent"},{"label":"사람 평가","sublabel":"최종 보정 · Judge 검증용","icon":"user","tone":"warning"}],"caption":"왼쪽 위(싸고 결정적)부터 소진하고, 남는 것만 오른쪽(비싸고 유연)으로 보냅니다."}$aix$::jsonb, null, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'adfc6946-d73d-1f7f-1e0f-c1fdf759b84c', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/harness-setup', 'harness-setup', '실습: promptfoo로 하네스 세팅하기',
  $aix$이론은 충분합니다. 이번에는 promptfoo라는 오픈소스 도구로 10분 만에 첫 하네스를 직접 세워 봅니다.

## 하네스의 3요소를 파일 하나에

promptfoo는 설정 파일 하나에 이벨의 3요소를 선언합니다. 파일 형식은 YAML입니다(들여쓰기로 구조를 표현하는, 사람이 읽기 쉬운 설정 파일 형식).

- **prompts**: 테스트할 프롬프트 (파일 경로를 적거나 직접 써넣음)
- **providers**: 실행할 모델 (여러 개 적으면 자동으로 나란히 비교)
- **tests**: 골든 데이터셋 — 입력 변수와 assertion(채점 기준) 목록

```yaml
# promptfooconfig.yaml
prompts: [file://prompts/support-agent.txt]
providers: [anthropic:claude-sonnet-5]
tests:
  - vars: { question: "환불은 며칠 걸리나요?" }
    assert:
      - type: contains
        value: "영업일"
      - type: llm-rubric
        value: "환불 정책을 정확히 안내하고 정중한 톤이어야 함"
```

## 실행과 리포트

터미널을 열고 프로젝트 폴더에서 아래 명령을 입력하세요.

- `npx promptfoo eval` — 전체 케이스를 실행하고 터미널에 합격률을 출력합니다.
- `npx promptfoo view` — 케이스별 출력과 점수를 브라우저 화면에서 나란히 비교합니다.

## 첫 실행에서 볼 것

합격률 숫자 자체보다 **실패한 케이스의 출력**을 직접 읽으세요. 채점 기준이 너무 빡빡하거나 헐거운 곳이 반드시 발견됩니다. 그것을 고치는 과정이 곧 이벨 튜닝입니다.

> 💡 **핵심**: 하네스 세팅의 완성 기준은 "명령 한 줄로 전체 데이터셋이 돌고 합격률이 나오는가"입니다. 그 한 줄이 이후 모든 자동화의 기반이 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"promptfoo — 첫 이벨 실행","lines":[{"text":"npx promptfoo eval","tone":"cmd"},{"text":"Running 42 test cases across 1 provider...","tone":"dim"},{"text":"✓ [contains] 환불은 며칠 걸리나요?","tone":"ok"},{"text":"✓ [llm-rubric] 배송 조회 방법 알려줘","tone":"ok"},{"text":"✕ [contains] 해외 배송도 되나요?","tone":"err"},{"text":"  expected \"관세\" in output","tone":"dim"},{"text":"─────────────────────────────","tone":"dim"},{"text":"Pass rate: 36/42 (85.7%)","tone":"out"},{"text":"npx promptfoo view  # 웹 UI로 실패 케이스 확인","tone":"comment"}],"caption":"명령 한 줄 = 데이터셋 전체 실행 + 자동 채점 + 합격률. 이것이 하네스입니다."}$aix$::jsonb, $aix${"title":"promptfoo로 첫 이벨 실행 따라하기","app":{"kind":"code-editor","windowTitle":"promptfooconfig.yaml — 이벨 하네스","files":[{"id":"f-config","name":"promptfooconfig.yaml","active":true},{"id":"f-prompt","name":"prompts/support-agent.txt"},{"id":"f-pkg","name":"package.json"}],"code":[{"id":"y1","text":"prompts: [file://prompts/support-agent.txt]"},{"id":"y2","text":"providers: [anthropic:claude-sonnet-5]"},{"id":"y3","text":"tests:"},{"id":"y4","text":"- vars: { question: \"해외 배송도 되나요?\" }","indent":1},{"id":"y5","text":"assert:","indent":2},{"id":"y6","text":"- type: contains","indent":3},{"id":"y7","text":"value: \"관세\" # ← 너무 빡빡한 기준","indent":4,"tone":"del"},{"id":"y8","text":"value: \"해외 배송\"","indent":4,"tone":"add","hidden":true},{"id":"y9","text":"- type: llm-rubric","indent":3,"hidden":true},{"id":"y10","text":"value: \"배송 가능 여부를 정확히 안내\"","indent":4,"hidden":true}],"terminal":[{"id":"t1","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"t2","text":"✕ [contains] 해외 배송도 되나요?","tone":"err","hidden":true},{"id":"t3","text":"  expected \"관세\" in output","tone":"out","hidden":true},{"id":"t4","text":"Pass rate: 36/42 (85.7%)","tone":"out","hidden":true},{"id":"t5","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"t6","text":"✓ [contains] 해외 배송도 되나요?","tone":"ok","hidden":true},{"id":"t7","text":"Pass rate: 42/42 (100%)","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 설정 파일의 3요소(프롬프트·모델·테스트)를 확인합니다"},{"t":"move","target":"y1"},{"t":"move","target":"y3"},{"t":"caption","text":"② 명령 한 줄로 전체 데이터셋을 실행합니다"},{"t":"type","target":"t1","text":"npx promptfoo eval"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"reveal","target":"t4"},{"t":"wait","ms":600},{"t":"caption","text":"③ 실패 케이스를 읽고 너무 빡빡한 assertion을 찾습니다"},{"t":"move","target":"y7"},{"t":"dblclick","target":"y7"},{"t":"caption","text":"④ assertion을 실제 기준에 맞게 고칩니다"},{"t":"type","target":"y8","text":"value: \"해외 배송\""},{"t":"reveal","target":"y9"},{"t":"reveal","target":"y10"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 같은 명령으로 재실행해 합격률 변화를 확인합니다"},{"t":"type","target":"t5","text":"npx promptfoo eval"},{"t":"reveal","target":"t6"},{"t":"reveal","target":"t7"},{"t":"move","target":"t7"},{"t":"caption","text":"✅ 합격률 100% — 첫 하네스 세팅 완료입니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '74abd22b-ff85-d860-cc50-603b8c5a043f', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/llm-as-judge-design', 'llm-as-judge-design', 'LLM-as-Judge 설계와 함정',
  $aix$Judge는 강력하지만, 검증하지 않은 Judge는 **눈금이 틀린 자로 재는 것**과 같습니다. Judge를 채점 아르바이트생이라고 생각해 보세요 — 기준표 없이 맡기면 사람마다, 날마다 점수가 달라집니다. 잘 만드는 원칙과 알려진 편향을 하나씩 짚습니다.

## 좋은 루브릭의 조건

- **예/아니오로 쪼개기** — "1~10점을 매겨줘"보다 "원문에 없는 사실이 있는가: 예/아니오" 같은 질문 여러 개가 훨씬 일관됩니다.
- **기준을 프롬프트에 명시** — "좋은 요약인가"가 아니라 "핵심 수치 포함? 원문에 없는 주장 없음? 3문장 이내?"처럼 구체적으로 적습니다.
- **판단 이유를 먼저 쓰게** — 근거를 먼저 쓰고 결론을 내리게 하면 채점 정확도가 오릅니다.

## 알려진 편향 3가지

- **자기 선호(Self-preference)** — 모델은 자기(같은 계열 모델)가 쓴 답에 점수를 후하게 줍니다 → 채점 대상과 **다른 모델**을 Judge로 쓰세요.
- **위치 편향** — 두 답을 비교시키면 먼저 본 답을 선호하는 경향이 있습니다 → 순서를 바꿔 두 번 채점하고 결과를 맞춰 봅니다.
- **장문 편향** — 길고 그럴듯한 답에 후한 점수를 줍니다 → 루브릭에 "길이는 평가하지 않는다"를 명시합니다.

## Judge도 이벨이 필요합니다

사람이 직접 채점(라벨링)한 표본 30~50개를 만들고, 같은 표본에 대한 Judge의 판정과 얼마나 **일치하는지** 측정하세요. 표본에는 통과작과 실패작이 골고루 섞여 있어야 합니다. 일치율이 90% 미만이면 루브릭을 고칠 차례입니다.

> 💡 **핵심**: Judge는 "설계 → 사람 라벨과 대조 → 루브릭 수정"을 거친 뒤에만 신뢰하세요. **채점기를 채점하는 단계**를 건너뛰면 안 됩니다.$aix$,
  $aix${"type":"chat","title":"Judge 프롬프트 설계 예시","messages":[{"role":"system","text":"루브릭: ① 원문에 없는 사실 포함? ② 핵심 수치 누락? ③ 3문장 초과? 각각 예/아니오로. 길이는 평가하지 마세요. 근거를 먼저 쓰고 결론을 내리세요."},{"role":"user","text":"[원문]과 [요약]을 채점하세요."},{"role":"ai","text":"근거: 요약의 \"전년 대비 30% 성장\"은 원문에 없음(원문은 13%). → ① 예 ② 아니오 ③ 아니오 — 판정: FAIL (환각)"}],"caption":"점수 대신 예/아니오 체크리스트, 결론 전에 근거 — Judge 일관성의 핵심 두 가지입니다."}$aix$::jsonb, $aix${"title":"LLM-as-Judge 채점과 검증 따라하기","app":{"kind":"browser","url":"evals.ourteam.dev/judge","blocks":[{"id":"b-head","type":"heading","label":"LLM-as-Judge 채점 대시보드"},{"id":"b-rubric","type":"text","label":"루브릭: ① 원문에 없는 사실? ② 핵심 수치 누락? ③ 3문장 초과? — 각각 예/아니오, 길이는 평가하지 않음"},{"id":"b-input","type":"input","label":"채점할 요약을 붙여넣으세요…"},{"id":"b-run","type":"button","label":"Judge 채점 실행"},{"id":"b-reason","type":"card","label":"근거: 요약의 \"30% 성장\"은 원문에 없음 (원문은 13%)","hidden":true},{"id":"b-check","type":"card","label":"체크: ① 예 · ② 아니오 · ③ 아니오","hidden":true},{"id":"b-verdict","type":"badge","label":"판정: FAIL (환각)","hidden":true},{"id":"b-verify","type":"button","label":"사람 라벨 50건과 대조"},{"id":"b-agree","type":"card","label":"사람 라벨 일치율: 46/50 (92%) — 신뢰 가능","hidden":true}]},"actions":[{"t":"caption","text":"① 루브릭을 예/아니오 체크리스트로 명시합니다"},{"t":"move","target":"b-rubric"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 채점할 요약을 입력합니다"},{"t":"click","target":"b-input"},{"t":"type","target":"b-input","text":"3분기 매출이 전년 대비 30% 성장했다."},{"t":"caption","text":"③ Judge를 실행합니다 — 근거를 먼저 쓰게 합니다"},{"t":"move","target":"b-run"},{"t":"click"},{"t":"wait","ms":600},{"t":"reveal","target":"b-reason"},{"t":"reveal","target":"b-check"},{"t":"reveal","target":"b-verdict"},{"t":"move","target":"b-verdict"},{"t":"wait","ms":600},{"t":"caption","text":"④ Judge 자체를 사람 라벨과 대조해 검증합니다"},{"t":"move","target":"b-verify"},{"t":"click"},{"t":"wait","ms":500},{"t":"reveal","target":"b-agree"},{"t":"move","target":"b-agree"},{"t":"caption","text":"✅ 일치율 92% — 이제 이 Judge를 신뢰할 수 있습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'bb1c4889-1145-2a6b-426c-391e1594de1c', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/prompt-versioning', 'prompt-versioning', '프롬프트 버전 관리: git으로 diff 남기기',
  $aix$프롬프트는 코드입니다. 노션 페이지나 채팅창에 흩어진 프롬프트는 "어제는 됐는데 오늘은 안 되는" 미스터리의 근원입니다. 누가, 언제, 왜 바꿨는지 아무도 모르기 때문입니다. 코드처럼 Git으로 관리하면 이 미스터리가 사라집니다.

## 프롬프트를 저장소로

- 프롬프트를 **별도 파일**(`prompts/*.txt`, `.yaml`)로 분리해 git에 커밋합니다.
- 코드 안에 문자열로 직접 박아 넣으면(하드코딩) 프롬프트 변경이 코드 변경에 묻혀 찾기 어렵습니다 — 파일 분리가 핵심입니다.
- 모델명이나 온도(답변의 무작위성을 조절하는 파라미터) 같은 설정값도 파일로 함께 버전 관리합니다.

지금 프롬프트가 코드 문자열 안에 박혀 있다면, 오늘 파일 하나로 꺼내는 것부터 시작하세요.

## diff + 이벨 점수 = 완전한 기록

git이 "무엇이 바뀌었나"를, 이벨이 "그래서 얼마나 좋아졌나"를 기록합니다. 둘을 합치면 프롬프트 변경 하나하나가 결과가 딸린 실험 기록이 됩니다.

- 커밋 메시지에 이벨 결과를 남깁니다: `refine tone guide (eval: 85.7% → 92.9%)`
- PR 리뷰에서 프롬프트 diff와 점수 변화를 함께 봅니다 — 프롬프트 리뷰가 코드 리뷰와 똑같아집니다.

## 되돌리기(롤백)가 공짜가 됩니다

프로덕션(실제 사용자가 쓰는 서비스 환경)에서 품질 문제가 터지면 `git revert` 명령 한 번으로 직전 프롬프트로 복귀합니다. 배포된 프롬프트에는 커밋 해시(커밋마다 붙는 고유 번호)를 태그로 남겨, **"지금 서비스에 어떤 버전이 돌고 있는가"**에 항상 답할 수 있게 하세요.

> 💡 **핵심**: 프롬프트 변경 이력 = **git diff(무엇을) + 이벨 점수(얼마나)**. 이 둘이 쌓이면 팀의 프롬프트 노하우가 자산이 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"git — 프롬프트 diff와 이벨 기록","lines":[{"text":"git diff prompts/support-agent.txt","tone":"cmd"},{"text":"- 고객 질문에 답변하세요.","tone":"err"},{"text":"+ 고객 질문에 답변하세요. 반드시 정책 문서의","tone":"ok"},{"text":"+ 근거 조항을 인용하고, 모르면 모른다고 답하세요.","tone":"ok"},{"text":"npx promptfoo eval","tone":"cmd"},{"text":"Pass rate: 39/42 (92.9%)  # 이전 85.7%","tone":"out"},{"text":"git commit -am \"support: 근거 인용 규칙 추가 (eval 85.7%→92.9%)\"","tone":"cmd"},{"text":"[main a3f9c21] support: 근거 인용 규칙 추가","tone":"dim"}],"caption":"diff가 '무엇을 바꿨나', 이벨 점수가 '그래서 좋아졌나'를 증명합니다."}$aix$::jsonb, $aix${"title":"프롬프트 diff + 이벨 점수 커밋 따라하기","app":{"kind":"code-editor","windowTitle":"support-agent.txt — 프롬프트 버전 관리","files":[{"id":"f-agent","name":"prompts/support-agent.txt","active":true},{"id":"f-cfg","name":"promptfooconfig.yaml"}],"code":[{"id":"p1","text":"당신은 우리 쇼핑몰의 고객 지원 상담원입니다."},{"id":"p2","text":"고객 질문에 답변하세요.","tone":"del"},{"id":"p3","text":"고객 질문에 답변하세요. 반드시 정책 문서의","tone":"add","hidden":true},{"id":"p4","text":"근거 조항을 인용하고, 모르면 모른다고 답하세요.","tone":"add","hidden":true}],"terminal":[{"id":"g1","text":"git diff prompts/support-agent.txt","tone":"cmd","hidden":true},{"id":"g2","text":"- 고객 질문에 답변하세요.","tone":"err","hidden":true},{"id":"g3","text":"+ …근거 조항을 인용하고, 모르면 모른다고","tone":"ok","hidden":true},{"id":"g4","text":"npx promptfoo eval","tone":"cmd","hidden":true},{"id":"g5","text":"Pass rate: 39/42 (92.9%)  # 이전 85.7%","tone":"ok","hidden":true},{"id":"g6","text":"git commit -am \"eval 85.7%→92.9%\"","tone":"cmd","hidden":true},{"id":"g7","text":"[main a3f9c21] support: 근거 인용 규칙 추가","tone":"out","hidden":true}]},"actions":[{"t":"caption","text":"① 프롬프트 파일에서 고칠 줄을 찾습니다"},{"t":"move","target":"p2"},{"t":"dblclick","target":"p2"},{"t":"caption","text":"② 근거 인용 규칙을 추가합니다"},{"t":"type","target":"p3","text":"고객 질문에 답변하세요. 반드시 정책 문서의"},{"t":"type","target":"p4","text":"근거 조항을 인용하고, 모르면 모른다고 답하세요."},{"t":"wait","ms":500},{"t":"caption","text":"③ git diff로 무엇이 바뀌었는지 확인합니다"},{"t":"type","target":"g1","text":"git diff prompts/support-agent.txt"},{"t":"reveal","target":"g2"},{"t":"reveal","target":"g3"},{"t":"wait","ms":600},{"t":"caption","text":"④ 이벨을 돌려 점수 변화를 확인합니다"},{"t":"type","target":"g4","text":"npx promptfoo eval"},{"t":"reveal","target":"g5"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ diff와 점수를 함께 커밋 메시지에 남깁니다"},{"t":"type","target":"g6","text":"git commit -am \"eval 85.7%→92.9%\""},{"t":"reveal","target":"g7"},{"t":"move","target":"g7"},{"t":"caption","text":"✅ 무엇을(diff) + 얼마나(점수)가 함께 기록되었습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '2e3cd141-1a38-c9d3-a16f-e7e778fcc32b', '7f1e9d3a-91ca-e3fe-8554-a49e791478a4', 'ai-harness/regression-ci', 'regression-ci', '회귀 테스트와 CI 연동',
  $aix$하네스의 진짜 힘은 **자동으로 돌 때** 나옵니다. 프롬프트를 고치는 PR이 올라올 때마다 이벨이 자동으로 돌고, 점수가 떨어지면 머지(변경을 팀의 본 코드에 합치는 것)가 막히는 구조를 만듭니다. 공항 검색대처럼, 통과 못 하면 아예 들어갈 수 없게 하는 것입니다.

## CI 파이프라인 설계

CI는 코드가 올라올 때마다 정해진 검사를 자동으로 실행해 주는 시스템입니다. 이벨을 그 검사 목록에 추가합니다.

- **시작 조건**: `prompts/` 폴더 변경이 포함된 PR이 올라오면 자동 실행
- **실행**: 골든 데이터셋 전체로 이벨 실행 (promptfoo는 GitHub Actions 연동을 기본 제공합니다)
- **게이트**: 합격률이 기준선(예: main 브랜치의 현재 점수) 아래로 떨어지면 검사 실패 → 머지 차단
- **리포트**: PR 코멘트에 케이스별 변화 요약을 자동으로 게시해 리뷰어가 한눈에 봅니다

## 비용과 속도 관리

- LLM 호출이 들어간 이벨은 일반 테스트보다 느리고 비쌉니다 — **캐시**(같은 프롬프트+입력의 결과를 저장해 두고 재사용)가 필수입니다.
- PR에서는 핵심만 추린 축소판(스모크 세트)을 돌리고, main에 합쳐진 뒤 전체 세트를 돌리는 2단 구성도 실용적입니다.
- Judge는 같은 답에 다른 판정을 내릴 수 있습니다 — 애매한 케이스는 여러 번 채점해 다수결로 판정합니다.

## 기준선(Baseline)의 규율

기준선 점수를 낮추는 머지는 반드시 팀의 **명시적 합의**를 거치게 하세요. "급하니까 이번만 예외"가 몇 번 쌓이면 하네스는 아무도 안 보는 장식이 됩니다.

> 💡 **핵심**: "프롬프트 PR → 이벨 자동 실행 → 점수 하락 시 머지 차단" — 이 게이트 하나가 팀 전체의 품질 하한선을 지킵니다.$aix$,
  $aix${"type":"flow","title":"이벨 CI 게이트","nodes":[{"label":"프롬프트 수정 PR","sublabel":"prompts/ 디렉토리 변경","icon":"git-branch","tone":"primary"},{"label":"이벨 자동 실행","sublabel":"골든 데이터셋 전체 채점","icon":"test-tube","tone":"accent","edgeLabel":"CI 트리거"},{"label":"기준선 비교","sublabel":"main 브랜치 점수와 대조","icon":"gauge","tone":"warning"},{"label":"머지 승인","sublabel":"점수 유지·상승 시에만","icon":"check","tone":"success","edgeLabel":"기준선 이상"}],"loopBack":{"from":2,"to":0,"label":"점수 하락 → 머지 차단, 프롬프트 재수정"},"caption":"점수가 떨어지면 머지가 막히고 수정으로 되돌아갑니다 — 회귀가 프로덕션에 못 들어갑니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'c9235b61-151b-0bc9-806c-cf0aa4608ef7', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/production-monitoring', 'production-monitoring', '프로덕션 모니터링과 실사용 데이터 수집',
  $aix$배포 전 이벨을 아무리 촘촘히 짜도, 실제 사용자의 입력은 항상 예상을 벗어납니다. 그래서 프로덕션(실서비스 환경)은 위험 지대인 동시에 **가장 큰 이벨 데이터셋의 원천**입니다. 매장을 열었으면 CCTV와 고객의 소리함이 필요한 것처럼, LLM 앱에도 기록과 피드백 장치가 필요합니다.

## 무엇을 기록하는가

- **트레이스** — 한 요청이 입력 → (검색·도구 호출 등 중간 단계) → 최종 출력까지 거친 전 과정의 기록입니다. 실패 신고가 들어왔을 때 어느 단계에서 틀렸는지 바로 짚을 수 있게 해 줍니다. LangSmith·Langfuse 같은 LLM 관측 도구가 표준입니다.
- **명시적 피드백** — 👍/👎 버튼, 수정 요청. 양은 적지만 신호가 강합니다.
- **암묵적 신호** — 답변 직후의 재질문, 대화 이탈, 응답 복사 여부. 만족도를 간접적으로 보여주는 지표입니다.
- **운영 지표** — 응답 속도, 토큰 비용, 에러율. 품질 못지않게 사용자 경험을 좌우합니다.

## 온라인 이벨

수집만 하지 말고 **표본을 실시간으로 채점**하세요. 전부 채점하면 비용이 크므로 표본이면 충분합니다. 프로덕션 응답의 일부(예: 5%)에 Judge를 돌려 품질 점수를 그래프로 만들어 두면, 모델 제공사의 조용한 변경이나 사용자 질문 유형의 변화(드리프트)를 며칠 만에 감지할 수 있습니다.

## 알림 기준

숫자를 사람이 매일 들여다볼 수는 없으니, 기준을 정해 자동 알림을 겁니다.

- 온라인 이벨 점수의 급락 (예: 최근 7일 평균 대비 5%p 하락)
- 👎 비율이나 에러율의 갑작스러운 급증

> 💡 **핵심**: 프로덕션 로깅의 목적은 관찰 자체가 아니라 **다음 이벨 케이스의 채굴**입니다. 트레이스 없는 LLM 앱은 안이 안 보이는 블랙박스입니다.$aix$,
  $aix${"type":"stack","title":"LLM 관측(Observability) 스택","layers":[{"label":"알림·대시보드","sublabel":"점수 급락·👎 스파이크 감지","icon":"alert","tone":"warning"},{"label":"온라인 이벨","sublabel":"표본 5%를 Judge로 실시간 채점","icon":"gauge","tone":"accent"},{"label":"피드백 수집","sublabel":"👍/👎 · 재질문 · 이탈 신호","icon":"users","tone":"primary"},{"label":"트레이스 로깅","sublabel":"입력→중간 단계→출력 전 과정 기록","icon":"database","tone":"muted"}],"caption":"아래층(기록)이 없으면 위층(감지·개선)은 성립하지 않습니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '277d0bfc-2661-3e12-5c37-4a6482ce8ff5', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/failure-to-eval-loop', 'failure-to-eval-loop', '개선 루프: 실패 사례를 이벨로 환류시키기',
  $aix$모니터링으로 실패를 발견했다면, 그 실패가 **두 번 다시 조용히 재발하지 못하게** 만들어야 합니다. 그 장치가 환류(Feedback) 루프 — 실패 사례를 다시 이벨로 되돌려 보내는 순환 구조입니다. 수험생의 오답노트와 같습니다. 틀린 문제를 노트에 적어 두고 매번 다시 풀어보면, 같은 문제로 다시 틀리는 일이 사라집니다.

## 환류 루프의 5단계

1. **발견** — 👎 피드백, 온라인 이벨 실패, CS 티켓(고객센터 문의 기록)에서 실패한 트레이스를 확보합니다.
2. **분류** — 할루시네이션인지, 형식 위반인지, 정책 누락인지 유형별로 태그를 답니다. 주간 30분이면 충분합니다.
3. **케이스화** — 실패한 입력 + 올바른 기대 결과를 골든 데이터셋에 추가합니다. **이 시점부터 재발 방어가 시작됩니다.**
4. **수정** — 프롬프트·검색·모델을 고치고, 이벨로 새 케이스 통과 + 기존 점수 유지를 확인합니다.
5. **배포** — CI 게이트를 통과해 릴리즈하고, 다시 1번으로 돌아갑니다.

## 이 루프가 만드는 복리 효과

- 데이터셋이 실사용 실패로 계속 자라며 **이벨의 대표성이 저절로 좋아집니다**. 만든 사람의 상상이 아니라 실제 실패가 문제를 출제하기 때문입니다.
- "고쳤다"의 정의가 "그 케이스가 이벨에 있고 통과한다"로 명확해집니다.
- 신규 팀원도 데이터셋만 읽으면 과거의 모든 실패 유형을 배울 수 있습니다.

## 흔한 실수

실패를 프롬프트 수정으로만 고치고 케이스를 추가하지 않는 것 — 다음 리팩토링 때 같은 실패가 **조용히** 돌아옵니다. 케이스 추가까지 마쳐야 수정이 끝난 것입니다.

> 💡 **핵심**: 버그 수정의 완료 조건은 "동작한다"가 아니라 **"그 실패가 골든 데이터셋에 들어갔다"**입니다.$aix$,
  $aix${"type":"cycle","title":"실패 → 이벨 환류 루프","center":"데이터셋이 계속 자란다","nodes":[{"label":"발견","sublabel":"👎·온라인 이벨·CS 티켓","icon":"search"},{"label":"분류","sublabel":"실패 유형 태깅","icon":"filter"},{"label":"케이스화","sublabel":"골든 데이터셋에 추가","icon":"clipboard"},{"label":"수정·검증","sublabel":"이벨 통과 확인","icon":"wrench"},{"label":"배포","sublabel":"CI 게이트 통과","icon":"rocket"}],"caption":"한 바퀴 돌 때마다 같은 실패의 재발 가능성이 영구히 차단됩니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '40a91867-4da1-7eb3-07cf-be65c20a6d6a', 'ead8ad43-5360-8b0d-801b-53c76195ef46', 'ai-harness/ab-testing', 'ab-testing', 'A/B 테스트: 모델·프롬프트 교체 검증',
  $aix$새 모델이 이벨에서 이겼다고 바로 전부 교체하는 것은 위험합니다. 이벨은 배포 전에 치르는 **오프라인 모의고사**일 뿐이고, 최종 판정은 실사용자가 내리기 때문입니다.

## 오프라인 이벨 → 온라인 A/B의 2단 검증

- **1단 (오프라인)**: 골든 데이터셋에서 새 후보가 기존과 같거나 나은지 확인합니다. 여기서 지면 실사용 테스트에 갈 자격이 없습니다.
- **2단 (온라인)**: 트래픽(서비스에 들어오는 사용자 요청)의 일부(5~10%)만 새 후보에 배정하고, 실사용 지표를 나란히 비교합니다. 일부만 배정하는 이유는 후보가 나쁠 때 피해를 소수로 한정하기 위해서입니다.

실무에서는 현행 설정을 챔피언, 새 후보를 챌린저라고 부릅니다. 권투 타이틀전처럼, 도전자가 링 위에서 이겨야만 자리를 내줍니다.

## 온라인에서 보는 지표

- 온라인 이벨 점수 (같은 Judge로 A/B 양쪽 표본을 채점)
- 👍/👎 비율, 재질문율, 태스크 완료율(사용자가 목적을 이뤘는가)
- 응답 속도와 토큰 비용 — **품질이 같다면 싸고 빠른 쪽이 승자**입니다.

## 운영 원칙

- 한 번에 **하나의 변수만** 바꿉니다. 모델과 프롬프트를 동시에 바꾸면 무엇 덕분에 좋아졌는지 알 수 없습니다.
- 표본이 충분히 쌓이기 전의 "초반 우세"를 믿지 마세요. 동전을 10번 던진 결과로 확률을 단정하는 것과 같습니다.
- 문제가 생기면 즉시 되돌릴 스위치(피처 플래그 — 재배포 없이 기능을 켜고 끄는 장치)를 준비하고 시작합니다.
- 승자가 확정된 뒤에도 패자의 설정을 git에 남겨 두면 언제든 다시 검증할 수 있습니다.

> 💡 **핵심**: 교체 결정 공식은 **"오프라인 이벨로 후보 선별 → 온라인 A/B로 최종 판정"**. 이벨은 필터, A/B는 심판입니다.$aix$,
  $aix${"type":"compare","title":"챔피언 vs 챌린저","columns":[{"title":"A: 챔피언 (현행)","icon":"shield","tone":"muted","items":["트래픽 90% 유지","온라인 이벨 91.2%","👍 비율 87% · 응답 1.8초","검증된 기준선 역할"]},{"title":"B: 챌린저 (신규 모델)","icon":"rocket","tone":"primary","items":["트래픽 10%로 시작","온라인 이벨 93.5%","👍 비율 89% · 비용 -30%","승자 확정 시 점진 확대"]}],"caption":"오프라인 이벨을 통과한 후보만 링에 오르고, 실사용 지표가 최종 판정합니다."}$aix$::jsonb, null, 5, 9
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
  $aix$좋은 프롬프트는 길거나 정중한 프롬프트가 아닙니다. **구조가 있는 프롬프트**입니다. 배달 앱 요청사항에 "맛있게 해주세요"라고만 쓰면 주방장이 추측할 수밖에 없듯이, 모델도 빠진 정보를 추측으로 채웁니다. 아래 4가지 요소만 채우면 결과의 들쭉날쭉함이 크게 줄어듭니다.

## 프롬프트의 4요소

- **역할 (Role)** — 모델이 어떤 관점에서 답할지 정해 줍니다. 예: "시니어 백엔드 개발자로서"
- **맥락 (Context)** — 판단에 필요한 배경 정보. 다루는 코드, 읽을 사람, 지켜야 할 조건.
- **작업 (Task)** — 동사로 시작하는 명확한 지시 하나. "요약해라", "고쳐 써라"
- **형식 (Format)** — 결과물의 모양. 마크다운 표, JSON, 글자 수 제한.

## 실패의 대부분은 '맥락 누락'

모델이 이상한 답을 내면 모델 탓 같지만, 사실은 **모델이 알 수 없는 정보를 당연히 알 것이라 가정**한 경우가 대부분입니다. 모델에게는 여러분의 화면도, 어제의 대화도 보이지 않습니다. 프롬프트에 적은 것이 모델이 아는 전부라고 생각하세요.

- 나쁜 예: "이 함수 좀 고쳐줘" — 무엇이 문제인지, 어떤 기준으로 고칠지가 없습니다.
- 좋은 예: 지금 어떤 증상인지 + 원래 어떻게 동작해야 하는지 + 지켜야 할 조건을 함께 적기.

## 목표는 '재현 가능성'

4요소를 채운 프롬프트는 **누가 실행해도 비슷한 품질**이 나옵니다. 그래서 팀에서는 프롬프트를 템플릿(빈칸만 바꿔 쓰는 틀)으로 만들어 공유할 수 있습니다. 연습 방법은 간단합니다. 메모장에 [역할]·[맥락]·[작업]·[형식] 네 줄을 미리 적어 두고, 빈칸을 채워서 보내 보세요.

> 💡 **핵심**: 프롬프트를 보내기 전에 자문하세요 — "역할·맥락·작업·형식 중 빠진 것은 무엇인가?"$aix$,
  $aix${"type":"chat","title":"나쁜 프롬프트 vs 좋은 프롬프트","messages":[{"role":"user","text":"이 함수 좀 고쳐줘"},{"role":"ai","text":"어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)"},{"role":"user","text":"[역할] 시니어 TS 개발자로서 [맥락] 아래 함수는 빈 배열 입력 시 NaN을 반환합니다 [작업] 빈 배열이면 0을 반환하도록 수정하고 [형식] 수정 코드 + 한 줄 설명으로 답해줘"},{"role":"ai","text":"빈 배열 가드를 추가했습니다: `if (items.length === 0) return 0;` — reduce 전에 예외 케이스를 차단합니다."}],"caption":"같은 모델, 같은 함수 — 4요소가 채워지자 답변이 '추측'에서 '해결'로 바뀝니다."}$aix$::jsonb, $aix${"title":"플레이그라운드에서 프롬프트 개선 따라하기","app":{"kind":"browser","url":"console.anthropic.com/playground","blocks":[{"id":"b-head","type":"heading","label":"AI 플레이그라운드"},{"id":"b-input","type":"input","label":"프롬프트를 입력하세요…"},{"id":"b-run","type":"button","label":"실행"},{"id":"b-bad","type":"card","label":"🤖 어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)","hidden":true},{"id":"b-badge-bad","type":"badge","label":"모호한 응답 — 맥락 누락","hidden":true},{"id":"b-good","type":"card","label":"🤖 빈 배열 가드를 추가했습니다: if (items.length === 0) return 0;","hidden":true},{"id":"b-badge-good","type":"badge","label":"✓ 정확한 해결 — 4요소 충족","hidden":true}]},"actions":[{"t":"caption","text":"① 먼저 4요소 없이 프롬프트를 입력해 봅니다"},{"t":"move","target":"b-input"},{"t":"click"},{"t":"type","target":"b-input","text":"이 함수 좀 고쳐줘"},{"t":"click","target":"b-run"},{"t":"wait","ms":500},{"t":"caption","text":"② 모델이 맥락이 없어 추측성 응답을 내놓습니다"},{"t":"reveal","target":"b-bad"},{"t":"reveal","target":"b-badge-bad"},{"t":"wait","ms":700},{"t":"caption","text":"③ 역할·맥락·작업·형식을 채워 다시 입력합니다"},{"t":"hide","target":"b-input"},{"t":"reveal","target":"b-input"},{"t":"click","target":"b-input"},{"t":"type","target":"b-input","text":"[역할]시니어 TS [맥락]빈 배열→NaN [작업]0 반환 [형식]코드"},{"t":"click","target":"b-run"},{"t":"wait","ms":500},{"t":"caption","text":"④ 추측이 사라지고 근거 있는 해결책이 나옵니다"},{"t":"reveal","target":"b-good"},{"t":"reveal","target":"b-badge-good"},{"t":"move","target":"b-badge-good"},{"t":"caption","text":"✅ 같은 모델 — 프롬프트의 구조가 품질을 바꿉니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '392bb2c9-b7fa-4b4e-4c02-00bb01c8b69f', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/cot-reasoning', 'cot-reasoning', 'CoT와 사고 유도: reasoning 모델 시대의 변화',
  $aix$"단계별로 생각해 봐(step by step)" 한 줄이 정답률을 끌어올리던 시절이 있었습니다. 하지만 **reasoning 모델이 표준이 된 2026년, 이 주문의 효과는 달라졌습니다.** 무엇이 바뀌었는지 알아야 헛수고를 피할 수 있습니다.

## 고전 CoT (2022~2024)

- **CoT(Chain of Thought, 생각의 사슬)**는 모델이 바로 답을 내뱉지 않고 **중간 풀이 과정을 글로 쓰게** 유도하는 기법입니다. 수학 시험에서 암산 대신 풀이를 쓰게 하면 실수가 줄어드는 것과 같은 원리입니다.
- "Let's think step by step" 문구나, 풀이 과정이 담긴 예시를 붙이는 것이 대표 패턴이었습니다.
- 수학·논리 문제에서 정답률을 크게 올렸습니다.

## reasoning 모델 시대의 CoT

- 최신 모델(Claude의 extended thinking 등)은 **답하기 전에 속으로 먼저 생각하는 과정**이 기본으로 들어 있습니다. "단계별로 생각해"는 이미 하고 있는 일을 또 시키는 셈입니다.
- 그래서 수동 CoT 지시는 효과가 거의 없거나, 모델의 자체 추론과 부딪혀 **오히려 성능을 떨어뜨리기도** 합니다.
- 대신 조절할 것은 **사고 예산(thinking budget)**, 즉 모델이 생각에 쓸 분량입니다. 단순한 일엔 짧게, 복잡한 설계엔 길게 줍니다.

## 지금도 유효한 사고 유도

- 문제를 **명확히 정의**하기: 지켜야 할 조건과 성공 기준을 프롬프트에 적어 주면, 모델은 그것을 중심으로 생각합니다.
- 답을 만들기 전에 **계획부터 출력**시키고, 사람이 검토한 뒤 실행하게 하기. 에이전트 워크플로우의 표준입니다.

> 💡 **핵심**: 2026년의 CoT는 "생각해 봐"라고 시키는 게 아니라, **생각할 재료(조건·기준)와 예산을 설계**하는 일입니다.$aix$,
  $aix${"type":"compare","title":"고전 CoT vs reasoning 모델 시대","columns":[{"title":"고전 CoT (수동 유도)","icon":"message","tone":"muted","items":["\"step by step\" 주문을 직접 삽입","풀이 과정 포함 Few-shot 예시","추론이 답변 텍스트에 노출","일반 모델에서 정답률 상승"]},{"title":"reasoning 모델 (내장 사고)","icon":"brain","tone":"primary","items":["모델이 내부에서 먼저 사고","사고 예산(budget)으로 깊이 조절","제약·성공 기준이 사고의 재료","수동 CoT 지시는 효과 미미·역효과도"]}],"caption":"주문을 외우는 시대에서, 사고의 재료와 예산을 설계하는 시대로."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3eff63bd-71ae-7e27-9fad-a2b87d2f530f', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/few-shot-design', 'few-shot-design', 'Few-shot 예시 설계: 말보다 보여주기',
  $aix$백 마디 설명보다 **잘 고른 예시 2~3개**가 결과물을 더 확실하게 통제합니다. 신입사원에게 두꺼운 규정집을 읽히는 것보다 잘 쓴 보고서 샘플 하나를 건네는 편이 빠른 것과 같습니다. 단, 예시는 아무거나 넣는 게 아니라 골라서 설계하는 것입니다.

## Few-shot이 이기는 순간

**Few-shot**은 원하는 입력→출력 예시를 몇 개 먼저 보여준 뒤 일을 시키는 방식입니다.

- 출력의 **형식·말투·스타일**을 맞춰야 할 때 강합니다. 분류 라벨, 요약 문체, 이름 짓기 규칙 등.
- 규칙을 말로 다 설명하기 어려울 때도 좋습니다. 예시가 곧 규칙을 대신 전달합니다.
- 반대로 단순한 사실 질문이나 깊은 추론 작업엔 **zero-shot(예시 없이 바로 시키기)**이 낫습니다. 예시가 오히려 생각의 폭을 좁힙니다.

## 예시 설계 4단계

1. **대표 케이스 선정** — 실제로 자주 들어오는 전형적인 사례부터 고릅니다.
2. **경계 케이스 추가** — 헷갈리기 쉬운 사례를 1개 넣습니다. 빈 입력, 애매한 분류 등.
3. **형식 통일** — 모든 예시의 입력/출력 구조를 완전히 똑같이 맞춥니다. 모델은 내용보다 **패턴**을 복사하기 때문입니다.
4. **순서·개수 검증** — 마지막 예시의 영향이 가장 큽니다. 2~5개 사이에서 실제 데이터로 테스트하세요.

## 흔한 함정

- 예시에 치우침이 있으면 그대로 복제됩니다. 예시가 전부 긍정 리뷰면 부정 리뷰를 잘 못 다룹니다.
- 예시와 실제 입력의 형식이 다르면 효과가 급감합니다.
- 예시가 너무 많아도 문제입니다. 프롬프트가 길어져 토큰 비용이 늘고, 효과는 어느 지점부터 늘지 않습니다.

> 💡 **핵심**: Few-shot은 "예시를 몇 개 넣는 것"이 아니라 **대표성·경계·형식·순서를 설계하는 것**입니다.$aix$,
  $aix${"type":"steps","title":"Few-shot 예시 설계 절차","steps":[{"label":"대표 케이스 선정","sublabel":"실제 입력 분포의 전형적 사례","icon":"target"},{"label":"경계 케이스 추가","sublabel":"빈 입력·애매한 분류 1개","icon":"alert"},{"label":"형식 통일","sublabel":"입력/출력 구조를 완전히 동일하게","icon":"layers"},{"label":"순서·개수 검증","sublabel":"2~5개, 실데이터로 테스트","icon":"test-tube"}],"caption":"모델은 예시의 내용이 아니라 패턴을 복사합니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '734abec5-20d7-3e3e-7a11-a61b3515999e', 'f65162dc-af23-3d5a-4eb9-b2b87d953257', 'prompt-engineering-rag/structured-output', 'structured-output', '구조화된 출력: JSON Schema와 도구 호출',
  $aix$프롬프트의 결과를 사람이 아니라 코드가 받아서 쓴다면, "JSON으로 답해줘"라는 부탁만으로는 부족합니다. 2026년의 표준은 **스키마로 강제하는 것**입니다. 자유롭게 쓰게 두는 대신, 정해진 서식지의 빈칸만 채우게 하는 방식입니다.

## 왜 '부탁'으로는 안 되는가

- 모델은 가끔 JSON 앞뒤에 설명을 붙이거나, 필드명을 바꾸거나, 따옴표를 빼먹습니다.
- 사람이라면 "아, 대충 이 뜻이구나" 하고 넘어가지만, 코드가 결과를 읽어 들이는 파싱 단계는 쉼표 하나만 어긋나도 실패합니다.
- 실패율이 1%뿐이어도 하루 1만 건을 처리하는 파이프라인에선 매일 100건의 장애입니다.

## 스키마로 강제하는 2가지 방법

여기서 스키마란 "출력에 어떤 필드가 어떤 형태로 들어가야 하는지"를 적은 명세서입니다.

- **Structured Outputs** — API 요청에 JSON 스키마를 첨부하면, 모델이 글자를 만들어 내는 단계에서부터 **스키마에 맞는 출력만** 나오도록 제한됩니다. 주요 API가 모두 지원합니다.
- **도구 호출 (Tool Use)** — 원하는 출력 구조를 도구의 파라미터 스키마로 정의하고, 모델이 그 도구를 "호출"하게 합니다. 추출·분류 작업에서 오래 검증된 견고한 패턴입니다.

## 스키마 설계 팁

- 필드마다 `description`(설명문)을 다세요 — 스키마의 설명문이 곧 프롬프트 역할을 합니다.
- 자유 문자열보다 **enum**(정해진 선택지 목록)으로 답을 제한하면 뒤처리가 사라집니다.
- 확신도(confidence)나 근거(evidence) 필드를 추가하면 품질 낮은 출력을 걸러낼 수 있습니다.
- 처음에는 필드 2~3개짜리 작은 스키마로 시작해, 결과를 보며 필드를 늘려 가는 것이 안전합니다.

> 💡 **핵심**: 코드가 소비하는 출력은 프롬프트로 부탁하지 말고 **스키마로 계약**하세요.$aix$,
  $aix${"type":"terminal","windowTitle":"structured-output.ts — 리뷰 분류 파이프라인","lines":[{"text":"# 출력 스키마: sentiment는 enum으로 제한","tone":"comment"},{"text":"{ \"sentiment\": { \"enum\": [\"positive\", \"negative\", \"neutral\"] },","tone":"dim"},{"text":"  \"keywords\": { \"type\": \"array\" }, \"confidence\": { \"type\": \"number\" } }","tone":"dim"},{"text":"npx tsx classify.ts --input reviews.jsonl","tone":"cmd"},{"text":"{\"sentiment\":\"negative\",\"keywords\":[\"배송 지연\"],\"confidence\":0.94}","tone":"out"},{"text":"{\"sentiment\":\"positive\",\"keywords\":[\"재구매\"],\"confidence\":0.98}","tone":"out"},{"text":"✓ 10,000건 파싱 실패 0건 — 스키마 강제 덕분","tone":"ok"}],"caption":"스키마가 디코딩을 제약하므로 '설명 붙은 JSON' 같은 파싱 장애가 원천 차단됩니다."}$aix$::jsonb, $aix${"title":"에디터에서 스키마 강제 출력 따라하기","app":{"kind":"code-editor","windowTitle":"schema.ts — 리뷰 분류 파이프라인","files":[{"id":"f-schema","name":"schema.ts","active":true},{"id":"f-classify","name":"classify.ts"},{"id":"f-reviews","name":"reviews.jsonl"}],"code":[{"id":"s1","text":"// 리뷰 분류 출력 스키마 (Structured Outputs)","tone":"comment"},{"id":"s2","text":"export const reviewSchema = {"},{"id":"s3","text":"sentiment: { enum: [\"positive\", \"negative\", \"neutral\"] },","indent":1},{"id":"s4","text":"keywords: { type: \"array\", items: { type: \"string\" } },","indent":1},{"id":"s5","text":"confidence: { type: \"number\" },","indent":1,"tone":"add","hidden":true},{"id":"s6","text":"};"}],"terminal":[{"id":"t1","text":"npx tsx classify.ts reviews.jsonl","tone":"cmd","hidden":true},{"id":"t2","text":"{\"sentiment\":\"negative\",\"keywords\":[\"배송 지연\"],\"confidence\":0.94}","tone":"out","hidden":true},{"id":"t3","text":"{\"sentiment\":\"positive\",\"keywords\":[\"재구매\"],\"confidence\":0.98}","tone":"out","hidden":true},{"id":"t4","text":"✓ 10,000건 처리 — 파싱 실패 0건","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 자유 문자열 대신 enum으로 선택지를 제한합니다"},{"t":"move","target":"s3"},{"t":"dblclick","target":"s3"},{"t":"wait","ms":400},{"t":"caption","text":"② confidence 필드를 추가해 저품질 출력을 거릅니다"},{"t":"move","target":"s4"},{"t":"click"},{"t":"type","target":"s5","text":"confidence: { type: \"number\" },"},{"t":"wait","ms":500},{"t":"caption","text":"③ 스키마를 첨부해 분류 파이프라인을 실행합니다"},{"t":"type","target":"t1","text":"npx tsx classify.ts reviews.jsonl"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"④ 1만 건을 처리해도 파싱 실패가 0건입니다"},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"✅ 부탁이 아닌 스키마 계약 — 코드가 안심하고 소비합니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a7bee649-9603-6097-38b4-f718222194c5', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/why-rag', 'why-rag', '왜 RAG인가: 할루시네이션과 최신성',
  $aix$아무리 좋은 모델도 **배운 적 없는 것은 모릅니다.** 진짜 문제는 모른다고 말하는 대신 그럴듯하게 지어낸다는 점입니다. RAG는 이 한계를 구조로 푸는 방법입니다. 비유하자면, 모든 걸 외운 천재에게 기억에만 의존해 답하게 두는 대신 **도서관 사서를 붙여 주는 것**입니다.

## LLM 단독 사용의 4가지 벽

왜 사서가 필요할까요? 모델 혼자서는 넘을 수 없는 벽이 4개 있기 때문입니다.

- **할루시네이션** — 모르는 질문에 그럴듯한 거짓을 만들어 냅니다.
- **최신성** — 지식이 학습을 끝낸 시점(knowledge cutoff)에 멈춰 있습니다.
- **사내 지식** — 여러분 회사의 위키·문서·데이터베이스는 애초에 배운 적이 없습니다.
- **출처 부재** — 답의 근거를 확인할 방법이 없습니다.

## RAG의 발상

**RAG(Retrieval-Augmented Generation, 검색 증강 생성)**는 세 단계로 움직입니다. 질문과 관련된 문서를 먼저 **검색(Retrieval)**하고, 찾은 내용을 프롬프트에 **덧붙인(Augmented)** 뒤, 그 근거를 보고 답을 **생성(Generation)**하게 합니다. 사서가 질문에 맞는 책을 찾아 책상 위에 펼쳐 주면, 모델은 그 페이지를 보면서 답하는 셈입니다.

- 모델을 다시 학습시키지 않아도 지식을 갱신할 수 있습니다. 서가의 책(문서)만 바꾸면 됩니다.
- 답변마다 "이 문서의 이 부분"이라는 **출처**를 붙일 수 있습니다.
- 읽을 권한이 있는 문서만 검색하게 하면 **권한 관리**도 됩니다.

이 구조 덕분에 "우리 회사 자료로 답하는 사내 챗봇" 같은 서비스가 가능해집니다.

> 💡 **핵심**: RAG는 모델을 똑똑하게 만드는 기술이 아니라, **모델에게 정답이 담긴 근거를 쥐여주는** 아키텍처입니다.$aix$,
  $aix${"type":"grid","title":"LLM 단독 사용의 4가지 벽","items":[{"label":"할루시네이션","sublabel":"모르면 지어냄","icon":"alert","tone":"warning"},{"label":"최신성","sublabel":"지식이 cutoff에 정지","icon":"clock","tone":"warning"},{"label":"사내 지식","sublabel":"위키·문서·DB 미학습","icon":"lock","tone":"muted"},{"label":"출처 부재","sublabel":"근거 확인 불가","icon":"eye","tone":"muted"},{"label":"RAG","sublabel":"검색된 근거를 프롬프트에 주입","icon":"search","tone":"primary"},{"label":"결과","sublabel":"갱신 가능 · 출처 표시 · 권한 관리","icon":"check","tone":"success"}],"caption":"네 가지 벽을 하나의 아키텍처(RAG)가 동시에 해결합니다."}$aix$::jsonb, null, 4, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '28a2b80b-6a46-3d18-f978-14076ecb1f4e', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/embeddings-vector-search', 'embeddings-vector-search', '임베딩과 벡터 검색의 원리',
  $aix$"환불 규정"으로 검색했는데 문서에는 "반품 정책"이라고 적혀 있다면? 단어를 그대로 맞춰 보는 키워드 검색은 실패합니다. 하지만 **벡터 검색은 찾아냅니다.** 그 비밀이 임베딩입니다.

## 임베딩: 의미를 좌표로

- **임베딩 모델**은 텍스트를 수백~수천 개의 숫자 목록, 즉 벡터로 바꿉니다. "벡터"라는 말이 어렵다면 그냥 "지도 위의 좌표"라고 생각해도 충분합니다.
- 핵심 성질은 하나입니다. **의미가 비슷한 텍스트는 가까운 좌표에** 놓입니다. 사서가 제목이 달라도 같은 주제의 책을 같은 서가에 꽂아 두듯, "환불 규정"과 "반품 정책"은 단어가 달라도 좌표가 가깝습니다.
- 문장, 문단, 코드, 이미지까지 같은 공간에 넣을 수 있습니다(멀티모달 임베딩).

## 벡터 검색의 동작

1. 모든 문서 조각을 미리 임베딩해서 **벡터 DB**에 저장합니다. 책을 미리 주제별 서가에 꽂아 두는 작업입니다.
2. 질문이 들어오면 **같은 임베딩 모델**로 질문도 벡터로 바꿉니다.
3. 질문 벡터와 가장 가까운 문서 벡터를 위에서부터 k개(top-k) 찾습니다. 가까움은 코사인 유사도(두 벡터의 방향이 얼마나 비슷한지 재는 값)로 잽니다.
4. 수백만 건에서도 빨리 찾도록 **ANN 인덱스**(HNSW 등)를 사용합니다 — 정확도를 아주 조금 양보하고 속도를 얻는 근사 검색입니다.

## 실무 감각

- 질문과 문서에 **반드시 같은 모델**을 써야 합니다. 모델이 다르면 좌표계 자체가 달라져 검색이 무너집니다. 배치가 다른 두 도서관의 지도를 섞어 쓰는 셈입니다.
- 임베딩 모델을 바꾸면 **모든 문서를 다시 임베딩**해야 합니다. 교체 비용을 설계에 미리 반영하세요.

> 💡 **핵심**: 벡터 검색 = 질문과 문서를 **같은 의미 공간의 좌표**로 바꾼 뒤, 가장 가까운 이웃을 찾는 것입니다.$aix$,
  $aix${"type":"flow","title":"벡터 검색의 흐름","nodes":[{"label":"질문","sublabel":"\"환불 규정 알려줘\"","icon":"message","tone":"primary"},{"label":"임베딩 모델","sublabel":"텍스트 → 수백~수천 차원 벡터","icon":"cpu","tone":"accent","edgeLabel":"문서와 같은 모델 사용"},{"label":"벡터 DB (ANN 인덱스)","sublabel":"미리 임베딩된 문서 벡터들","icon":"database","tone":"muted"},{"label":"최근접 이웃 top-k","sublabel":"\"반품 정책\" 문서 발견","icon":"target","tone":"success","edgeLabel":"코사인 유사도 순 정렬"}],"caption":"단어가 아니라 좌표가 가까운 문서를 찾으므로, 표현이 달라도 의미로 매칭됩니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6f6c67d2-a8f5-bc7d-eced-83f5017b3381', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/chunking-strategies', 'chunking-strategies', '청킹 전략: 크기·오버랩·구조',
  $aix$RAG 품질 문제의 절반은 모델이 아니라 **문서를 자르는 방식**에서 옵니다. 도서관에 비유하면, 책을 통째로 한 칸에 욱여넣으면 원하는 대목을 못 찾고, 낱장으로 찢어 놓으면 앞뒤 맥락을 잃습니다. 알맞은 단위로 나누는 일이 청킹입니다.

## 왜 잘라야 하나

- 임베딩은 텍스트가 길수록 **여러 주제가 평균**돼 좌표가 흐려지고, 검색 정확도가 떨어집니다. 요리·여행·역사가 한 권에 섞인 책은 어느 서가에 꽂아도 애매한 것과 같습니다.
- 검색 결과로 프롬프트에 넣을 수 있는 분량에도 한계가 있습니다.
- 그래서 문서를 **검색 가능한 최소 의미 단위(청크)**로 자릅니다. 청크가 곧 검색의 단위이자, 모델이 받아 볼 근거의 단위입니다.

## 3가지 축

- **크기** — 보통 토큰 200~800 사이에서 시작합니다. 작게 자르면 검색은 정밀하지만 맥락이 부족하고, 크게 자르면 그 반대입니다.
- **오버랩(겹침)** — 이웃한 청크를 10~20% 겹치게 잘라, 경계에서 문장과 맥락이 뚝 끊기는 것을 완화합니다.
- **구조 기반** — 글자 수가 아니라 **문서의 구조(제목, 문단, 함수 단위)**로 자릅니다. 마크다운은 헤딩(제목 줄) 기준, 코드는 함수·클래스 기준이 정석입니다. 책을 챕터 단위로 나누는 것과 같습니다.

## 2026년의 보강 기법

- **컨텍스트 보강 청킹**: 각 청크에 "이 조각은 어떤 문서의 어떤 절인지" 요약을 덧붙여 임베딩합니다. 찢어 낸 페이지마다 책 제목과 챕터명을 적어 두는 셈이라, 청크 혼자서도 의미가 통합니다.
- 정답은 데이터마다 다릅니다. 처음엔 토큰 400~500 같은 중간값으로 시작하고, 이후 **실제 질문 세트로 검색 품질을 재면서** 크기를 조정하세요.

> 💡 **핵심**: 청킹의 목표는 "적당히 자르기"가 아니라 **각 청크가 홀로 읽혀도 의미가 통하는 단위**를 만드는 것입니다.$aix$,
  $aix${"type":"compare","title":"청킹 전략 3가지","columns":[{"title":"작은 고정 크기","icon":"scissors","tone":"muted","items":["토큰 ~200, 기계적 분할","검색은 정밀","맥락 단절 위험","문장이 중간에 끊김"]},{"title":"큰 고정 크기","icon":"file-text","tone":"muted","items":["토큰 ~800 이상","맥락은 풍부","여러 주제가 섞여 검색 흐림","프롬프트 비용 증가"]},{"title":"구조 기반 + 오버랩","icon":"layers","tone":"primary","items":["헤딩·문단·함수 단위로 분할","10~20% 오버랩으로 경계 보완","청크 단독으로 의미가 통함","2026년 실무 기본값"]}],"caption":"고정 크기에서 시작하되, 프로덕션은 문서 구조를 따라 자릅니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ad20b1cd-0615-bf77-b45c-4e322accc72d', 'e0a12f58-20ff-c1f2-fee0-fda67ee4d143', 'prompt-engineering-rag/rag-pipeline', 'rag-pipeline', '기본 RAG 파이프라인 아키텍처',
  $aix$배운 조각들을 하나의 시스템으로 조립할 차례입니다. 모든 RAG는 **두 개의 흐름**으로 이루어집니다. 도서관에 비유하면, 개관 전에 책을 분류해 서가에 꽂아 두는 **수집(Ingestion)**과, 손님의 질문을 받아 그 자리에서 책을 찾아 주는 **질의(Query)**입니다.

## 수집 파이프라인 (오프라인 — 미리 해 두는 일)

1. **수집** — 위키, PDF, DB에서 원본 문서를 가져옵니다.
2. **청킹** — 구조 기반으로 자르고 메타데이터(출처, 날짜, 권한)를 붙입니다. 책마다 분류 라벨을 붙이는 일입니다.
3. **임베딩** — 각 청크를 벡터로 바꿉니다.
4. **저장** — 벡터 DB에 벡터 + 원문 + 메타데이터를 함께 저장합니다.

## 질의 파이프라인 (온라인 — 질문마다 실시간)

1. **검색** — 질문을 임베딩해 관련 청크를 top-k개 찾습니다.
2. **생성** — 찾은 청크를 프롬프트에 넣고, "이 근거에 기반해서만 답하고 출처를 표시하라"고 지시합니다.

두 흐름을 나누는 이유는 속도입니다. 무거운 정리 작업을 미리 끝내 두어야, 질문이 왔을 때 몇 초 안에 답할 수 있습니다.

## 설계 포인트

- 수집은 한 번으로 끝나지 않습니다. **주기적으로(배치) 또는 문서가 바뀔 때마다(이벤트)** 계속 갱신해야 합니다. 서가의 책이 낡은 채로 남아 있으면, 사서는 자신 있게 낡은 답을 건넵니다.
- 청킹 때 붙여 둔 권한 메타데이터를 활용하면, 사용자가 볼 수 없는 문서를 검색 단계에서 걸러낼 수 있습니다.
- 생성 프롬프트에 **"근거에 없으면 모른다고 답하라"**를 반드시 넣으세요. 이 한 줄이 할루시네이션을 막는 마지막 관문입니다.

> 💡 **핵심**: RAG = 오프라인 수집 파이프라인 + 온라인 질의 파이프라인. **두 흐름의 신선도와 품질을 각각 관리**하는 것이 운영의 전부입니다.$aix$,
  $aix${"type":"stack","title":"RAG 시스템의 레이어","layers":[{"label":"애플리케이션","sublabel":"질문 입력 · 출처 표시된 답변","icon":"message","tone":"primary"},{"label":"생성 레이어","sublabel":"LLM + \"근거 기반으로만 답하라\" 프롬프트","icon":"sparkles","tone":"accent"},{"label":"검색 레이어","sublabel":"질문 임베딩 → top-k 청크","icon":"search","tone":"accent"},{"label":"저장 레이어","sublabel":"벡터 DB: 벡터 + 원문 + 메타데이터","icon":"database","tone":"muted"},{"label":"수집 파이프라인","sublabel":"문서 수집 → 청킹 → 임베딩 (배치 갱신)","icon":"upload","tone":"muted"}],"caption":"아래 두 층(오프라인)이 신선해야 위 세 층(온라인)이 정확합니다."}$aix$::jsonb, $aix${"title":"RAG 수집 파이프라인 구축 따라하기","app":{"kind":"code-editor","windowTitle":"ingest.ts — RAG 수집 파이프라인","files":[{"id":"f-ingest","name":"ingest.ts","active":true},{"id":"f-query","name":"query.ts"},{"id":"f-docs","name":"docs/"}],"code":[{"id":"i1","text":"// 수집: 문서 → 청킹 → 임베딩 → 저장 (오프라인)","tone":"comment"},{"id":"i2","text":"const docs = await loadDocs(\"./docs\");"},{"id":"i3","text":"const chunks = splitByHeading(docs, {"},{"id":"i4","text":"maxTokens: 512, overlap: 64,","indent":1},{"id":"i5","text":"});"},{"id":"i6","text":"const vectors = await embed(chunks);","tone":"add","hidden":true},{"id":"i7","text":"await db.upsert(vectors, {meta:true});","tone":"add","hidden":true}],"terminal":[{"id":"t1","text":"npx tsx ingest.ts","tone":"cmd","hidden":true},{"id":"t2","text":"→ 문서 128건 로드, 청크 1,842개 생성","tone":"out","hidden":true},{"id":"t3","text":"→ 임베딩 1,842건 완료 (배치 8회)","tone":"out","hidden":true},{"id":"t4","text":"✓ 벡터 DB 인덱싱 완료 — 신선도 2026-07-28","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 구조 기반 청킹에 크기와 오버랩을 설정합니다"},{"t":"move","target":"i3"},{"t":"click"},{"t":"move","target":"i4"},{"t":"dblclick","target":"i4"},{"t":"wait","ms":400},{"t":"caption","text":"② 각 청크를 벡터로 변환하는 임베딩을 추가합니다"},{"t":"type","target":"i6","text":"const vectors = await embed(chunks);"},{"t":"wait","ms":300},{"t":"caption","text":"③ 벡터·원문·메타데이터를 함께 저장합니다"},{"t":"type","target":"i7","text":"await db.upsert(vectors, {meta:true});"},{"t":"wait","ms":400},{"t":"caption","text":"④ 수집 파이프라인을 실행해 인덱싱합니다"},{"t":"type","target":"t1","text":"npx tsx ingest.ts"},{"t":"reveal","target":"t2"},{"t":"reveal","target":"t3"},{"t":"wait","ms":500},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"✅ 오프라인 수집 완료 — 이제 질의가 신선한 근거를 찾습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a4e24349-490a-15c8-1b4f-f28472e1e9a3', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/hybrid-search-reranking', 'hybrid-search-reranking', '하이브리드 검색과 리랭킹',
  $aix$벡터 검색만 쓰는 RAG는 실서비스에서 반드시 구멍이 납니다. **"ERR-4042" 같은 에러 코드, 제품명, 고유명사**는 의미가 비슷한 이웃이 없어서, 의미 공간에서 길을 잃기 때문입니다.

## 두 검색의 상호보완

- **키워드 검색(BM25)** — 단어가 정확히 일치하는 문서를 찾는 고전 방식입니다. 에러 코드, 제품명, 약어에 필수입니다. 사서가 색인 카드에서 제목을 그대로 찾는 것과 같습니다.
- **벡터 검색** — 표현이 달라도 의미가 통하는 문서를 찾습니다. "환불 규정" ↔ "반품 정책"을 연결합니다. 사서가 주제로 서가를 뒤지는 것입니다.
- **하이브리드 검색** = 둘을 동시에 실행하고 결과를 합칩니다. 합칠 때는 각 검색에서의 순위를 기준으로 점수를 매기는 **RRF(Reciprocal Rank Fusion)**가 표준입니다.

## 리랭킹: 2단계 정밀 선별

- 1차 검색은 빠르지만 거칩니다. 후보 50~100개를 넓게 건진 뒤, **리랭커(reranker)** 모델이 질문과 각 후보의 관련성을 정밀 채점해 상위 5~10개만 남깁니다.
- 리랭커는 질문과 문서를 **한 쌍으로 같이 읽는 방식(cross-encoder)**이라 임베딩 유사도보다 훨씬 정확합니다. 대신 느려서 후보군에만 적용합니다. 사서가 후보 책 더미를 실제로 펼쳐 읽고 딱 맞는 책만 골라내는 단계입니다.
- "넓게 건지고(recall) 좁게 고른다(precision)" — 검색 시스템의 오래된 지혜가 RAG에도 그대로 적용됩니다.

## 적용 우선순위

기본 RAG의 답변 품질이 아쉬울 때, 모델 교체보다 **하이브리드 + 리랭킹 도입이 먼저**입니다. 비용 대비 효과가 가장 큰 업그레이드입니다.

> 💡 **핵심**: 프로덕션(실서비스) 검색 = **하이브리드로 넓게 건지고, 리랭커로 좁게 고른다.** 이 2단계가 표준입니다.$aix$,
  $aix${"type":"flow","title":"하이브리드 검색 + 리랭킹 파이프라인","nodes":[{"label":"질문","sublabel":"\"ERR-4042 환불 처리 방법\"","icon":"message","tone":"primary"},{"label":"키워드 검색 ∥ 벡터 검색","sublabel":"BM25는 코드를, 벡터는 의미를 잡음","icon":"search","tone":"accent","edgeLabel":"두 검색을 병렬 실행"},{"label":"RRF 병합","sublabel":"순위 기반 융합 → 후보 100개","icon":"git-branch","tone":"accent"},{"label":"리랭커","sublabel":"cross-encoder 정밀 채점","icon":"filter","tone":"warning","edgeLabel":"넓게 건진 후보를"},{"label":"top-5 → 생성","sublabel":"정밀 선별된 근거만 프롬프트에","icon":"sparkles","tone":"success","edgeLabel":"좁게 고른다"}],"caption":"recall은 하이브리드가, precision은 리랭커가 책임집니다."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '55cc97a9-260d-e8df-0f17-7bfdb66f8d03', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/agentic-rag', 'agentic-rag', 'Agentic RAG: 검색을 도구로 쓰는 에이전트',
  $aix$정해진 "검색 1번 → 생성 1번" 파이프라인은 복잡한 질문 앞에서 무너집니다. 2026년의 답은 **에이전트가 검색을 도구로 쥐고, 필요한 만큼 반복 검색하는** Agentic RAG입니다. 시키는 대로 한 번만 찾고 마는 아르바이트생 대신, 스스로 판단하며 서가를 오가는 베테랑 사서를 두는 것입니다.

## 파이프라인에서 에이전트로

에이전트는 검색을 이렇게 다룹니다.

- **질문 분해** — "작년 대비 올해 환불 정책 변화는?"을 두 개의 검색으로 쪼갭니다.
- **쿼리 재작성** — 대화 중의 "그건 언제부터야?"처럼 혼자서는 뜻이 통하지 않는 질문을 독립된 검색어로 바꿉니다.
- **결과 평가 후 재검색** — 찾아온 근거가 부실하면 다른 키워드로 다시 시도합니다.
- **도구 선택** — 벡터 DB, SQL(데이터베이스 질의 언어), 웹 검색 중 질문에 맞는 소스를 고릅니다.

즉, 앞서 배운 **에이전트 루프(계획→실행→관찰→평가)**의 도구 자리에 검색이 들어간 것입니다.

## 긴 컨텍스트 시대, RAG는 죽었나

컨텍스트 윈도우가 수백만 토큰으로 커지면서 "문서를 그냥 다 넣으면 되지 않나"라는 질문이 나옵니다. 그러나 실무의 답은 **역할 분담**입니다.

- **비용·속도** — 질문할 때마다 도서관 전체를 통째로 건네면 토큰 비용과 응답 속도가 감당이 안 됩니다.
- **권한·신선도** — 사용자마다 볼 수 있는 문서를 가려내는 일과 실시간 갱신은 검색 레이어에서만 가능합니다.
- 결론: **검색으로 후보를 좁히고, 넉넉한 컨텍스트로 깊게 읽는다** — 둘은 경쟁자가 아니라 조합입니다.

> 💡 **핵심**: Agentic RAG = 에이전트 루프의 도구 자리에 검색을 꽂은 것. 긴 컨텍스트는 RAG를 대체하는 게 아니라 **검색 후 읽는 분량을 늘려줄** 뿐입니다.$aix$,
  $aix${"type":"cycle","title":"Agentic RAG 루프","center":"충분한 근거를 얻을 때까지","nodes":[{"label":"질문 분석","sublabel":"분해 · 쿼리 재작성","icon":"brain"},{"label":"검색 실행","sublabel":"벡터 DB · SQL · 웹 중 선택","icon":"search"},{"label":"결과 평가","sublabel":"근거가 충분한가?","icon":"eye"},{"label":"답변 생성","sublabel":"출처와 함께 · 부족하면 재검색","icon":"sparkles"}],"caption":"검색 1번으로 끝나지 않습니다 — 에이전트가 근거가 모일 때까지 루프를 돕니다."}$aix$::jsonb, null, 7, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6b003e28-d309-ec1f-69c0-e91f7c74d4f9', '33b3514f-c133-d07f-f400-b633fb8d92f5', 'prompt-engineering-rag/rag-evaluation', 'rag-evaluation', 'RAG 평가: 검색과 생성을 분리해서 측정',
  $aix$"답변이 이상해요"라는 신고만으로는 아무것도 고칠 수 없습니다. RAG의 실패에는 전혀 다른 두 가지 병이 있기 때문입니다. **사서가 엉뚱한 책을 가져온 경우(검색 실패)**와, **맞는 책을 받고도 엉뚱하게 읽고 답한 경우(생성 실패)**입니다. 반드시 나눠서 재야 합니다.

## 검색 품질 (Retrieval)

"정답 근거가 상위 k개(top-k) 안에 들어왔는가"를 봅니다.

- **Recall@k** — 정답 문서가 상위 k개 안에 포함된 비율. 가장 중요한 지표입니다.
- **Precision@k / MRR** — 상위 결과가 얼마나 깨끗한지, 정답이 얼마나 위쪽에 있는지를 재는 지표입니다.
- 측정에는 "질문 ↔ 정답 청크" 쌍으로 만든 **골든 데이터셋**이 필요합니다. 50~100개면 시작할 수 있습니다.

## 생성 품질 (Generation)

"건네받은 근거를 충실히 썼는가"를 봅니다.

- **충실성(Faithfulness)** — 답변의 모든 주장이 검색된 근거에 실제로 있는가. 낮으면 할루시네이션입니다.
- **답변 관련성** — 근거를 인용했더라도 정작 질문에 답했는가.
- 사람이 전부 채점할 수 없으므로 **LLM-as-Judge**(별도 모델이 루브릭으로 채점)가 표준입니다. 대신 주기적으로 사람 평가와 얼마나 일치하는지 검증합니다.

## 진단 매트릭스

- 검색이 나쁘면 → 청킹·임베딩·하이브리드 검색부터 고칩니다. 생성 프롬프트를 만져 봐야 소용없습니다.
- 검색은 좋은데 생성이 나쁘면 → 프롬프트·모델·근거 배치를 고칩니다.

이 측정을 자동으로 돌리는 회귀 테스트를 만들어 두면, 청킹이나 모델을 바꿀 때마다 품질이 후퇴하지 않았는지 바로 알 수 있습니다.

> 💡 **핵심**: RAG 평가의 첫 질문은 "답이 좋은가"가 아니라 **"검색이 실패했는가, 생성이 실패했는가"**입니다.$aix$,
  $aix${"type":"compare","title":"검색 평가 vs 생성 평가","columns":[{"title":"검색 품질","icon":"search","tone":"primary","items":["질문: 정답 근거가 top-k에 있나","Recall@k · Precision@k · MRR","골든 데이터셋(질문↔정답 청크)으로 측정","낮으면: 청킹·임베딩·하이브리드 수정"]},{"title":"생성 품질","icon":"sparkles","tone":"accent","items":["질문: 근거를 충실히 썼나","충실성 · 답변 관련성","LLM-as-judge로 자동 채점","낮으면: 프롬프트·모델·근거 배치 수정"]}],"caption":"두 지표를 분리하면 '어디를 고칠지'가 즉시 드러납니다 — 진단 없는 치료는 없습니다."}$aix$::jsonb, null, 6, 10
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
  $aix$"어떤 AI 코딩 툴이 제일 좋아요?"는 사실 잘못된 질문입니다. 2026년의 도구들은 서로 경쟁하는 게 아니라, 각자 **다른 일**을 하기 때문입니다. 비서 한 명을 뽑는 게 아니라, 역할이 다른 조수 셋을 두는 쪽에 가깝습니다.

## 세 가지 분류

- **자동완성형** (Copilot 자동완성, Cursor Tab) — 여러분이 타이핑하는 **문장 단위**를 이어 씁니다. 스마트폰 키보드의 추천 단어처럼, 아주 작게 그러나 초 단위로 자주 개입합니다.
- **IDE 에이전트형** (Cursor Agent, Copilot 에이전트 모드) — 코드 편집기 안에서 **여러 파일을 스스로 수정**합니다. 무엇이 바뀌는지 diff로 눈으로 확인한 뒤 승인하면 됩니다.
- **터미널 에이전트형** (Claude Code) — 터미널에서 **파일 수정·명령어 실행·git까지** 다루며 작업을 끝까지 완수합니다. 셋 중 가장 자율적입니다.

## 선택 기준: 작업의 크기와 자율성

어떤 도구를 꺼낼지는 브랜드가 아니라 **지금 하려는 일의 크기**로 정합니다.

- 한 줄~한 함수 고치기 → 자동완성형
- 한 기능, 파일 몇 개 → IDE 에이전트형
- 코드 탐색·리팩토링·반복 작업·검증까지 → 터미널 에이전트형

일이 클수록 아래 층으로, 작을수록 위 층으로 — 이 감각만 있으면 됩니다.

## 하나만 고르지 마세요

세 분류는 경쟁 관계가 아니라 겹쳐 쓰는 **레이어(층)**입니다. 실무 고수들은 세 층을 동시에 켜 두고, 작업 크기에 따라 자연스럽게 갈아탑니다. 이 강의의 최종 목표가 바로 그 조합입니다.

처음이라면 에디터의 자동완성 하나, 터미널 에이전트 하나 — 이렇게 두 층부터 시작해도 충분합니다. 다음 레슨부터 층별로 하나씩 익혀 갑니다.

> 💡 **핵심**: 도구 선택 기준은 브랜드가 아니라 **작업의 크기와 맡길 자율성의 정도**입니다.$aix$,
  $aix${"type":"stack","title":"AI 코딩 도구 3층 구조","layers":[{"label":"자동완성형","sublabel":"Copilot · Cursor Tab — 문장 단위, 초 단위 개입","icon":"zap","tone":"accent"},{"label":"IDE 에이전트형","sublabel":"Cursor Agent · Copilot 에이전트 — 여러 파일 수정","icon":"code","tone":"primary"},{"label":"터미널 에이전트형","sublabel":"Claude Code — 파일·명령어·git, 작업 완수","icon":"terminal","tone":"success"}],"caption":"아래로 갈수록 자율성이 커집니다 — 세 층을 함께 쓰는 것이 2026년의 표준입니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '837f448d-7369-238c-581a-09dfbf5411a9', 'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', 'ai-coding-tools/tab-autocomplete', 'tab-autocomplete', '탭 자동완성 잘 쓰는 법: Copilot과 Cursor Tab',
  $aix$자동완성은 한 번 켜 두면 끝나는 기능이 아닙니다. 같은 도구를 써도 **좋은 제안을 유도하는 습관**이 있는 사람과 없는 사람의 속도 차이는 몇 배로 벌어집니다.

## 제안 품질은 내가 만든다

자동완성은 스마트폰 키보드의 추천 단어와 원리가 같습니다. **주변 코드와 지금 열려 있는 파일**을 읽고 다음에 올 내용을 예측하지요. 그래서 재료를 잘 주면 제안도 좋아집니다.

- **이름을 먼저 잘 짓기** — `calculateDiscountedTotal`(할인 합계 계산)처럼 의도가 드러나는 이름을 쓰는 순간, 구현의 절반이 제안됩니다.
- **주석으로 의도 선언** — 함수 위에 "// 만료 쿠폰은 제외하고 합산" 같은 한 줄 주석을 쓰면 그 방향으로 제안이 옵니다.
- **참고할 파일을 옆 탭에 열어두기** — 비슷한 기존 코드가 열려 있으면 팀 컨벤션(팀이 함께 지키는 코드 작성 규칙)대로 제안됩니다.

## Cursor Tab의 진화: 다음 '편집' 예측

2026년의 Tab은 지금 커서 위치의 완성만 하지 않습니다. **다음에 고칠 위치로 점프**까지 제안합니다. 파라미터 하나를 바꾸면 그걸 쓰는 다른 줄들로 탭, 탭, 탭 — 연쇄 수정이 순식간에 끝납니다. 손으로 일일이 찾아다니며 고치던 일이 키 하나로 줄어드는 셈입니다. Copilot도 같은 방향의 '다음 편집 제안'을 제공합니다.

## 받아들이기의 규율

- 제안을 **읽지 않고 탭 누르기 금지** — 그럴듯해 보이는 오답이 가장 위험합니다. AI가 넣은 버그는 내가 쓴 기억이 없어서, 내 손으로 만든 버그보다 찾기 어렵습니다.
- 3번 연속 엉뚱한 제안이 오면 자동완성과 씨름하지 마세요. 채팅이나 에이전트 같은 상위 도구로 넘어갈 신호입니다.

> 💡 **핵심**: 자동완성의 실력 = **이름·주석·열린 탭**으로 맥락을 공급하는 여러분의 실력입니다.$aix$,
  $aix${"type":"steps","title":"좋은 제안을 유도하는 4단계 습관","steps":[{"label":"의도가 드러나는 이름 짓기","sublabel":"함수·변수명이 곧 프롬프트","icon":"file-text"},{"label":"한 줄 주석으로 방향 선언","sublabel":"// 만료 쿠폰은 제외하고 합산","icon":"message"},{"label":"참고 파일을 옆 탭에 열기","sublabel":"팀 컨벤션대로 제안 유도","icon":"layers"},{"label":"읽고 나서 탭 누르기","sublabel":"연속 오답이면 상위 도구로 전환","icon":"check"}],"caption":"자동완성은 수동적 기능이 아니라, 맥락을 '공급'하며 쓰는 능동적 도구입니다."}$aix$::jsonb, $aix${"title":"주석으로 자동완성 유도하기 따라하기","app":{"kind":"code-editor","windowTitle":"coupon.ts — Cursor","files":[{"id":"f-coupon","name":"coupon.ts","active":true},{"id":"f-cart","name":"cart.ts"}],"code":[{"id":"c1","text":"// 만료 쿠폰은 제외하고 합산","tone":"comment","hidden":true},{"id":"c2","text":"function sumValidCoupons(coupons) {","hidden":true},{"id":"c3","text":"const now = Date.now();","indent":1,"tone":"add","hidden":true},{"id":"c4","text":"return coupons","indent":1,"tone":"add","hidden":true},{"id":"c5","text":".filter((c) => c.expiresAt > now)","indent":2,"tone":"add","hidden":true},{"id":"c6","text":".reduce((s, c) => s + c.amount, 0);","indent":2,"tone":"add","hidden":true},{"id":"c7","text":"}","tone":"add","hidden":true}]},"actions":[{"t":"caption","text":"① 참고할 파일을 옆 탭에 열어 맥락을 공급합니다"},{"t":"move","target":"f-cart"},{"t":"click"},{"t":"wait","ms":400},{"t":"move","target":"f-coupon"},{"t":"click"},{"t":"caption","text":"② 한 줄 주석으로 의도를 먼저 선언합니다"},{"t":"type","target":"c1","text":"// 만료 쿠폰은 제외하고 합산"},{"t":"caption","text":"③ 의도가 드러나는 함수명을 타이핑합니다"},{"t":"type","target":"c2","text":"function sumValidCoupons(coupons) {"},{"t":"wait","ms":400},{"t":"caption","text":"④ 구현 전체가 회색 제안으로 나타납니다"},{"t":"reveal","target":"c3"},{"t":"reveal","target":"c4"},{"t":"reveal","target":"c5"},{"t":"reveal","target":"c6"},{"t":"reveal","target":"c7"},{"t":"wait","ms":700},{"t":"caption","text":"⑤ 제안을 끝까지 읽은 뒤 탭으로 수락합니다"},{"t":"move","target":"c5"},{"t":"click"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '26396057-df6b-319b-457a-80b628db5a9a', 'a0f271ee-5694-74ce-3eed-78f74d7ac7b7', 'ai-coding-tools/inline-vs-chat', 'inline-vs-chat', '인라인 편집 vs 채팅: 언제 무엇을 쓰나',
  $aix$에디터 안에는 자동완성 말고도 입구가 두 개 더 있습니다. **인라인 편집**과 **채팅**입니다. 이 둘을 구분해서 쓰면 AI와 주고받는 왕복 횟수가 눈에 띄게 줄어듭니다.

## 인라인 편집 (Cursor Cmd+K, Copilot 인라인 챗)

인라인 편집은 고칠 코드를 **블록으로 선택하고, 바로 그 자리에서** 지시하는 방식입니다. 문서에서 고칠 문장에 밑줄을 긋고 빨간펜으로 교정 지시를 써 주는 것과 같습니다.

- "이 함수를 async/await(결과를 기다렸다가 이어서 실행하는 문법)로 바꿔줘"
- "이 부분 에러 처리 추가해줘"
- 장점: 범위가 명확해서 빠르고 정확합니다. 바뀐 내용(diff)도 바로 그 자리에 표시됩니다.
- 적합: **어디를 고칠지 내가 이미 아는** 좁은 수정

## 채팅 / 에이전트 패널

파일 여러 개를 넘나드는 질문과 작업은 채팅 창으로 갑니다.

- "이 에러가 왜 나는지 관련 코드를 찾아서 설명해줘"
- "이 컴포넌트를 세 파일로 분리해줘" (에이전트 모드가 여러 파일을 대신 수정)
- 적합: **어디를 고칠지 모르거나, 여러 파일에 걸친** 작업

## 구분 기준은 한 줄

"수정할 **범위를 내 손으로 선택할 수 있는가?"** — 선택할 수 있으면 인라인, 없으면 채팅입니다. 인라인으로 할 일을 채팅으로 하면 느리고, 채팅으로 할 일을 인라인으로 하면 맥락이 부족해 엉뚱하게 고칩니다.

## 직접 해보기

Cursor에서 함수 하나를 마우스로 드래그해 선택하고 Cmd+K를 눌러 보세요. 작은 입력창이 뜨면 "이 함수에 설명 주석을 달아줘"라고 적고 Enter를 누릅니다. 제안된 diff를 읽고 수락하면 끝 — 인라인 편집의 전체 흐름이 이 30초 안에 다 들어 있습니다.

> 💡 **핵심**: 범위를 아는 좁은 수정은 **인라인**, 범위를 모르는 탐색·다중 파일 작업은 **채팅/에이전트**.$aix$,
  $aix${"type":"compare","title":"인라인 편집 vs 채팅","columns":[{"title":"인라인 편집 (Cmd+K)","icon":"wand","tone":"accent","items":["블록 선택 → 그 자리에서 지시","범위를 내가 이미 앎","diff가 즉시 그 자리에 표시","좁은 수정에 가장 빠름"]},{"title":"채팅 / 에이전트","icon":"message","tone":"primary","items":["질문·탐색·설명 요청","범위를 모르는 작업","여러 파일에 걸친 수정","에이전트 모드로 자율 실행"]}],"caption":"판별 질문은 하나 — '수정 범위를 손으로 선택할 수 있는가?'"}$aix$::jsonb, null, 4, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ade6384c-af27-a933-c6c6-59db700c4e0f', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/claude-code-first-task', 'claude-code-first-task', 'Claude Code 시작하기: 설치부터 첫 작업까지',
  $aix$터미널 에이전트는 백문이 불여일견입니다. 아래 순서 그대로 따라 하면 10분 안에 설치부터 첫 작업까지 끝낼 수 있습니다.

## 설치와 실행

먼저 터미널을 엽니다. 맥에서는 Spotlight(Cmd+Space)에 "터미널"을 검색해 열면 됩니다. 그다음 아래 첫 줄을 복사해 붙여넣고 Enter를 누르세요.

```bash
curl -fsSL https://claude.ai/install.sh | bash
cd my-project
claude
```

첫 줄이 공식 설치 스크립트입니다. 이 한 줄이면 설치 끝입니다(Windows는 PowerShell용 스크립트 제공). 둘째 줄의 `my-project` 자리에는 작업할 내 프로젝트 폴더 이름을 넣어 이동합니다. 마지막으로 프로젝트 루트(프로젝트의 최상위 폴더)에서 `claude`를 입력하면 대화형 세션이 열립니다. 처음 한 번은 로그인 안내가 나오는데, 화면을 그대로 따라가면 됩니다. 여기서 `claude` 명령을 찾을 수 없다고 나오면, 터미널 창을 닫고 새로 연 뒤 다시 시도해 보세요.

## 첫 작업은 '읽기'부터

바로 코드를 고치게 하지 말고, 먼저 프로젝트를 파악하게 하세요.

- "이 프로젝트 구조를 요약해줘"
- "결제 로직이 어디 있는지 찾아서 흐름을 설명해줘"

에이전트가 파일을 뒤지며 답하는 과정을 지켜보면 **무엇을 맡겨도 되는지** 감이 잡힙니다.

## 두 번째 작업: 작고 검증 가능한 수정

"로그인 버튼 라벨을 '시작하기'로 바꾸고, 빌드가 통과하는지 확인해줘" — 이렇게 **검증까지 포함한 작은 작업**이 좋은 출발점입니다. Claude Code는 파일을 고치기 전에 바뀔 내용을 diff로 보여주고 승인을 요청합니다. 처음에는 하나씩 읽고 승인하며 신뢰를 쌓으세요.

> 💡 **핵심**: 첫 작업 공식 = **읽기 요청 → 작은 수정 + 검증**. 자율성은 신뢰가 쌓인 만큼만 넓히세요.$aix$,
  $aix${"type":"terminal","windowTitle":"claude — 첫 작업","lines":[{"text":"curl -fsSL https://claude.ai/install.sh | bash","tone":"cmd"},{"text":"claude","tone":"cmd"},{"text":"# 나: 이 프로젝트 구조를 요약해줘","tone":"comment"},{"text":"Next.js 앱 — app/ 라우트, lib/에 결제·인증 로직","tone":"out"},{"text":"# 나: 로그인 버튼 라벨을 '시작하기'로 바꾸고 빌드 확인해줘","tone":"comment"},{"text":"● app/login/page.tsx 수정 제안 (diff 승인 대기)","tone":"dim"},{"text":"npm run build","tone":"cmd"},{"text":"✓ Compiled successfully","tone":"ok"},{"text":"완료 — 라벨 변경 + 빌드 통과 확인","tone":"ok"}],"caption":"읽기 → 작은 수정 → 검증. 첫 세션에서 이 흐름을 그대로 따라 해보세요."}$aix$::jsonb, $aix${"title":"Claude Code 첫 작업 따라하기","app":{"kind":"code-editor","windowTitle":"my-project — Claude Code 세션","files":[{"id":"f-page","name":"login/page.tsx","active":true},{"id":"f-auth","name":"lib/auth.ts"},{"id":"f-readme","name":"README.md"}],"code":[{"id":"c1","text":"export default function LoginPage() {"},{"id":"c2","text":"return (","indent":1},{"id":"c3","text":"<Button>로그인</Button>","indent":2,"tone":"del"},{"id":"c4","text":"<Button>시작하기</Button>","indent":2,"tone":"add","hidden":true},{"id":"c5","text":");","indent":1},{"id":"c6","text":"}"}],"terminal":[{"id":"t1","text":"claude","tone":"cmd","hidden":true},{"id":"t2","text":"> 로그인 버튼 라벨을 '시작하기'로 바꿔줘","tone":"cmd","hidden":true},{"id":"t3","text":"● login/page.tsx 수정 제안 (diff 승인 대기)","tone":"out","hidden":true},{"id":"t4","text":"npm run build","tone":"cmd","hidden":true},{"id":"t5","text":"✓ Compiled successfully","tone":"ok","hidden":true},{"id":"t6","text":"완료 — 라벨 변경 + 빌드 통과 확인","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 프로젝트 루트에서 claude를 실행합니다"},{"t":"type","target":"t1","text":"claude"},{"t":"wait","ms":500},{"t":"caption","text":"② 작고 검증 가능한 작업을 지시합니다"},{"t":"type","target":"t2","text":"> 로그인 버튼 라벨을 '시작하기'로 바꿔줘"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"③ 에이전트가 제안한 diff를 확인하고 승인합니다"},{"t":"move","target":"c3"},{"t":"click"},{"t":"reveal","target":"c4"},{"t":"wait","ms":500},{"t":"caption","text":"④ 빌드 명령으로 변경을 검증합니다"},{"t":"type","target":"t4","text":"npm run build"},{"t":"reveal","target":"t5"},{"t":"reveal","target":"t6"},{"t":"move","target":"t6"},{"t":"caption","text":"⑤ 작은 수정 + 검증 완료 — 신뢰가 한 칸 쌓였습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f17360ec-2259-0b41-c46d-aa8400e91b66', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/claude-md-context', 'claude-md-context', 'CLAUDE.md와 규칙 파일: 프로젝트 맥락 주입',
  $aix$같은 지시를 채팅에 매번 반복하고 있다면, 그것은 채팅이 아니라 **파일에 적을 내용**입니다. 에이전트 도구들은 프로젝트의 규칙 파일을 매 세션 자동으로 읽기 때문에, 한 번 적어 두면 다시 말할 필요가 없습니다.

## CLAUDE.md: 프로젝트의 사용 설명서

프로젝트 루트(최상위 폴더)의 `CLAUDE.md`는 Claude Code가 세션을 시작할 때 항상 먼저 읽는 파일입니다. 세션 안에서 `/init` 명령을 입력하면 초안을 자동으로 만들어 줍니다. 새로 온 동료에게 건네는 업무 매뉴얼이라고 생각하면 됩니다.

**넣어야 할 것:**

- 빌드·테스트·린트 명령어 (`npm run check` 등)
- 프로젝트 구조 한 줄 요약과 핵심 폴더
- 팀 컨벤션(함께 지키는 규칙) — 예: "스타일은 Tailwind만, CSS 파일 생성 금지"
- 하지 말 것 — 예: "마이그레이션 파일(데이터베이스 구조 변경 기록) 직접 수정 금지"

**넣지 말아야 할 것:** 코드를 보면 알 수 있는 세부사항, 금방 낡을 정보. 규칙 파일도 코드처럼 **짧고 최신**이어야 합니다.

## 다른 도구도 같은 구조

Cursor는 `.cursor/rules`, Copilot은 `.github/copilot-instructions.md`를 읽습니다. 같은 내용을 파일 세 곳에 복사해 두면 머지않아 서로 어긋나기 시작합니다. 규칙 내용은 한곳에서 관리하고, 도구별 파일이 그것을 참조하게 하면 관리가 쉽습니다.

## 효과

규칙 파일을 한 번 정리하는 것 = 앞으로의 **모든 세션에 자동 적용되는 프롬프트**를 만드는 것. 팀원 누가 새 세션을 열어도 같은 규칙이 적용됩니다.

> 💡 **핵심**: 두 번 이상 반복한 지시는 채팅이 아니라 **CLAUDE.md에 적으세요**. 규칙 파일은 '영구 프롬프트'입니다.$aix$,
  $aix${"type":"grid","title":"규칙 파일 생태계와 CLAUDE.md 구성","items":[{"label":"CLAUDE.md","sublabel":"Claude Code · /init으로 초안 생성","icon":"file-text","tone":"primary"},{"label":".cursor/rules","sublabel":"Cursor 규칙 파일","icon":"settings","tone":"accent"},{"label":"copilot-instructions.md","sublabel":"Copilot 지침 파일","icon":"clipboard","tone":"accent"},{"label":"명령어","sublabel":"빌드·테스트·린트","icon":"terminal","tone":"success"},{"label":"컨벤션","sublabel":"스타일·네이밍 규칙","icon":"check","tone":"success"},{"label":"금지 사항","sublabel":"건드리면 안 되는 것","icon":"shield","tone":"warning"}],"caption":"위: 도구별 규칙 파일 · 아래: 어떤 파일이든 공통으로 담을 3요소."}$aix$::jsonb, $aix${"title":"CLAUDE.md 규칙 파일 만들기 따라하기","app":{"kind":"code-editor","windowTitle":"CLAUDE.md — 규칙 파일 작성","files":[{"id":"f-md","name":"CLAUDE.md","active":true},{"id":"f-pkg","name":"package.json"},{"id":"f-btn","name":"components/button.tsx"}],"code":[{"id":"c1","text":"# 프로젝트 규칙","tone":"comment","hidden":true},{"id":"c2","text":"- 검증: npm run check","hidden":true},{"id":"c3","text":"- 스타일은 Tailwind만, CSS 파일 생성 금지","hidden":true},{"id":"c4","text":"- 마이그레이션 파일 직접 수정 금지","hidden":true}],"terminal":[{"id":"t1","text":"claude","tone":"cmd","hidden":true},{"id":"t2","text":"> 버튼 컴포넌트에 로딩 상태 추가해줘","tone":"cmd","hidden":true},{"id":"t3","text":"CLAUDE.md 규칙 확인 — Tailwind로만 구현","tone":"out","hidden":true},{"id":"t4","text":"npm run check","tone":"cmd","hidden":true},{"id":"t5","text":"✓ lint + type + test 통과","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 프로젝트 루트에 CLAUDE.md를 만들어 엽니다"},{"t":"move","target":"f-md"},{"t":"click"},{"t":"type","target":"c1","text":"# 프로젝트 규칙"},{"t":"caption","text":"② 검증 명령어를 가장 먼저 적습니다"},{"t":"type","target":"c2","text":"- 검증: npm run check"},{"t":"caption","text":"③ 팀 컨벤션과 금지 사항을 한 줄씩 추가합니다"},{"t":"type","target":"c3","text":"- 스타일은 Tailwind만, CSS 파일 생성 금지"},{"t":"type","target":"c4","text":"- 마이그레이션 파일 직접 수정 금지"},{"t":"wait","ms":500},{"t":"caption","text":"④ 새 세션을 열어 규칙이 자동 적용되는지 확인합니다"},{"t":"type","target":"t1","text":"claude"},{"t":"type","target":"t2","text":"> 버튼 컴포넌트에 로딩 상태 추가해줘"},{"t":"reveal","target":"t3"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ 지시하지 않아도 규칙대로 검증까지 수행합니다"},{"t":"reveal","target":"t4"},{"t":"reveal","target":"t5"},{"t":"move","target":"t5"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0889692f-922c-867e-0c5e-d840126afca8', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/good-task-prompts', 'good-task-prompts', '좋은 작업 지시문: 목표 + 제약 + 검증',
  $aix$같은 모델을 써도 결과가 크게 갈리는 이유가 있습니다. 에이전트 결과물의 품질은 모델보다 **지시문의 구조**가 결정하는 경우가 많기 때문입니다. 좋은 지시문의 공식은 세 부분입니다. 심부름을 부탁할 때 "무엇을, 어떤 조건으로, 어떻게 확인할지"를 알려주는 것과 같습니다.

## 공식: 목표 + 제약 + 검증

- **목표** — 무엇이 완료 상태인가. "고쳐줘"가 아니라 "로그인하지 않은 상태에서 /cart에 들어가면 로그인 페이지로 자동 이동되게 해줘"처럼 구체적으로.
- **제약** — 건드리면 안 되는 것, 따라야 할 방식. "기존 미들웨어(요청을 중간에서 가로채 처리하는 코드) 패턴을 따르고, 테스트 파일은 수정하지 마".
- **검증** — 완료를 무엇으로 확인하는가. "`npm run check`가 통과하면 완료야".

## 왜 검증이 게임 체인저인가

검증 명령을 주는 순간, 에이전트는 스스로 실행→확인→수정을 반복하는 **루프**를 돌 수 있습니다. 검증이 없으면 "그럴듯해 보이는" 시점에 멈추고, 검증이 있으면 "실제로 통과하는" 시점에 멈춥니다. 이 차이가 결과물의 품질 차이를 만듭니다.

## 나쁜 지시문 고쳐 쓰기

- ✕ "장바구니 버그 고쳐줘"
- ○ "장바구니에서 같은 상품을 두 번 담으면 수량이 안 올라가는 버그를 고쳐줘. cart.ts의 기존 구조는 유지하고, 수정 후 `npx vitest run`(테스트 실행 명령)으로 검증해."

처음에는 세 요소를 다 채우는 게 번거롭게 느껴집니다. 하지만 "다시 해줘"를 반복하는 왕복이 사라져서 결과적으로 훨씬 빠릅니다. 지시문을 보내기 전에 "목표·제약·검증이 다 있나?" 한 번만 훑어보세요.

> 💡 **핵심**: 지시문 3요소 — **목표(완료 상태) + 제약(경계) + 검증(판정 명령)**. 특히 검증이 챗봇을 에이전트로 바꿉니다.$aix$,
  $aix${"type":"chat","title":"지시문 구조가 만드는 차이","messages":[{"role":"user","text":"장바구니 버그 고쳐줘"},{"role":"ai","text":"어떤 버그인지 특정하기 어려워 추측으로 수정했습니다. (검증 없이 종료)"},{"role":"user","text":"같은 상품 2번 담으면 수량이 안 올라가는 버그 수정. cart.ts 구조 유지, 테스트 파일 수정 금지. npx vitest run 통과하면 완료."},{"role":"ai","text":"원인: addItem의 중복 체크 누락. 수정 후 vitest 12/12 통과 확인했습니다."}],"caption":"같은 모델, 다른 지시문 — 목표·제약·검증이 갖춰지면 결과가 달라집니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a6b05232-8ca8-0077-7a5d-061834b61450', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/plan-mode-large-changes', 'plan-mode-large-changes', '플랜 모드와 대규모 변경',
  $aix$파일 수십 개를 건드리는 큰 작업을 "바로 시작해"라고 맡기면 중간에 산으로 가기 쉽습니다. 큰 변경의 규율은 **계획과 실행의 분리**입니다. 이사할 때 짐부터 옮기지 않고 가구 배치도를 먼저 그리는 것과 같습니다.

## 플랜 모드: 읽기 전용 계획 단계

Claude Code의 플랜 모드(Shift+Tab 키로 전환)에서는 에이전트가 **코드를 전혀 수정하지 않고** 탐색과 계획만 합니다.

1. 플랜 모드에서 하고 싶은 작업을 설명하면, 에이전트가 관련 코드를 조사해 **단계별 계획**을 제시합니다.
2. 계획을 읽고 잘못된 가정을 **이 단계에서** 바로잡습니다. 아직 코드를 고치기 전이라 수정 비용이 0입니다. 계획이 마음에 들지 않으면 승인하지 말고 "이 부분은 이렇게 바꿔줘"라고 답하세요. 승인 전에는 아무것도 바뀌지 않으니 마음껏 고쳐도 됩니다.
3. 계획을 승인하면 실행 모드로 전환되어 작업이 시작됩니다.

Cursor와 Copilot의 에이전트 모드에도 같은 취지의 계획 단계가 마련되어 있습니다.

## 대규모 변경의 3원칙

계획이 좋아도 실행에는 별도의 안전장치가 필요합니다. 세 가지만 지키면 됩니다.

- **쪼개기** — "전체 마이그레이션"처럼 한 덩어리로 맡기지 말고 "1단계: 유틸 함수부터"처럼 나눕니다. 단계마다 검증하고 커밋합니다.
- **되돌릴 수 있게** — 새 브랜치(원본과 분리된 작업 공간)에서 시작하고, 단계별로 커밋해 언제든 돌아갈 지점을 남깁니다.
- **계획을 파일로** — 긴 작업은 계획을 마크다운 파일로 저장하게 하세요. 세션이 길어져도 목표가 흐려지지 않고, 다음 세션에서 이어서 작업하기도 쉬워집니다.

> 💡 **핵심**: 큰 변경일수록 **계획 승인 → 단계 실행 → 단계 검증**. 계획 단계에서 잡은 오류가 가장 싼 오류입니다.$aix$,
  $aix${"type":"flow","title":"플랜 모드 기반 대규모 변경","nodes":[{"label":"플랜 모드 진입","sublabel":"Shift+Tab — 읽기 전용","icon":"search","tone":"accent"},{"label":"계획 검토·수정","sublabel":"잘못된 가정을 여기서 교정","icon":"clipboard","tone":"warning"},{"label":"단계 실행","sublabel":"승인 후 한 단계씩","icon":"code","tone":"primary","edgeLabel":"계획 승인"},{"label":"검증 + 커밋","sublabel":"npm run check → git commit","icon":"check","tone":"success"}],"loopBack":{"from":3,"to":2,"label":"다음 단계 반복"},"caption":"계획은 한 번, 실행·검증·커밋은 단계 수만큼 반복합니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b88e2793-a0b6-dbf0-01ee-b1cc93a5fd28', '3b804477-a8c1-d1fb-5bd4-db038ed6b6f4', 'ai-coding-tools/ai-code-review', 'ai-code-review', 'AI 코드 리뷰 활용하기',
  $aix$AI가 쓴 코드가 늘어날수록 사람의 리뷰가 병목이 됩니다. 해법은 역설적이게도 **리뷰에도 AI를 넣는 것**입니다. 사람이 보기 전에 1차로 걸러 주는 거름망을 두는 셈입니다.

## 어디에 넣을 수 있나

- **커밋 전** — Claude Code에게 "방금 변경사항을 리뷰해줘. 버그·보안·엣지케이스(드물지만 문제를 일으키는 예외 상황) 위주로"라고 요청합니다. 가장 빠른 피드백 지점입니다.
- **PR 단계** — GitHub의 Copilot 코드 리뷰나 Claude Code의 GitHub 연동을 쓰면, PR이 열릴 때 자동으로 첫 리뷰가 달리게 할 수 있습니다.
- **작성자와 다른 AI로** — 코드를 쓴 세션이 아닌 **별도의 새 세션**(또는 다른 도구)이 리뷰하게 하세요. 같은 편향을 공유하지 않아 실수를 더 잘 잡습니다. 자기가 쓴 글의 오타를 스스로 찾기 어려운 것과 같은 이치입니다.

## AI 리뷰에게 시킬 것과 사람이 볼 것

- AI가 잘 잡는 것: 엣지케이스 누락, 에러 처리 빠짐, 보안 실수, 컨벤션 위반 — **패턴이 있는 결함**
- 사람이 봐야 하는 것: 이 변경이 애초에 옳은 방향인가, 제품 요구사항에 맞는가 — **맥락과 판단**

## 리뷰 지시문도 구체적으로

"리뷰해줘"보다 "이 diff에서 **null(값이 비어 있는 상태) 처리 누락과 권한 체크 빠진 곳**을 찾아줘"가 훨씬 잘 작동합니다. 팀에서 자주 나오는 단골 결함 유형을 리뷰 프롬프트로 만들어 두세요.

가장 쉬운 시작은 커밋 전 한 문장입니다. 오늘부터 커밋하기 전에 "방금 변경사항 리뷰해줘"를 습관처럼 붙여 보세요. 비용은 몇 초, 효과는 즉시 체감됩니다.

> 💡 **핵심**: AI 리뷰는 사람 리뷰의 대체가 아니라 **1차 필터**입니다. 패턴 결함은 AI가, 방향 판단은 사람이.$aix$,
  $aix${"type":"flow","title":"AI 1차 필터 리뷰 파이프라인","nodes":[{"label":"코드 작성","sublabel":"사람 + AI 도구","icon":"code","tone":"primary"},{"label":"커밋 전 셀프 리뷰","sublabel":"Claude Code: 변경사항 리뷰 요청","icon":"eye","tone":"accent"},{"label":"PR 자동 AI 리뷰","sublabel":"별도 세션 — 패턴 결함 필터","icon":"bot","tone":"accent","edgeLabel":"PR 생성 시 자동"},{"label":"사람 리뷰","sublabel":"방향·요구사항 판단만 집중","icon":"user","tone":"success","edgeLabel":"패턴 결함 해소 후"}],"caption":"AI가 패턴 결함을 걸러주면, 사람은 '방향이 맞는가'에만 집중할 수 있습니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '232e52dc-4e43-9fae-ccd7-7c011f95d5a5', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/daily-workflow', 'daily-workflow', '하루 워크플로우: 탐색은 에이전트, 작성은 탭, 수정은 인라인',
  $aix$이제 앞에서 배운 도구들을 **실제 하루 일과**에 배치해 봅니다. 핵심 원칙은 하나 — 작업의 크기에 도구를 맞추는 것입니다. 요리로 치면 재료 손질 칼과 큰 냄비를 때에 맞게 바꿔 드는 것과 같습니다.

## 아침: 파악과 계획 (터미널 에이전트)

- 새 이슈(처리해야 할 작업 항목)를 받으면 Claude Code에게 관련 코드 **탐색과 원인 분석**을 맡깁니다. "이 버그와 관련된 코드를 찾아 흐름을 설명해줘."
- 큰 작업이면 플랜 모드로 계획까지 세우고 하루를 시작합니다.

## 낮: 구현 (탭 + 인라인)

- 에이전트가 짜 준 뼈대 위에서, 세부 구현은 에디터에서 **탭 자동완성**으로 빠르게 채웁니다.
- 눈에 보이는 좁은 수정은 **인라인 편집**(Cmd+K)으로 그 자리에서 해결합니다.
- 여러 파일에 걸친 중간 크기 작업은 **IDE 에이전트**에게 맡기고, 제안된 diff를 검토합니다.

## 오후: 정리와 검증 (다시 터미널 에이전트)

- 반복적인 리팩토링, 테스트 추가, 커밋 전 리뷰는 검증 명령과 함께 Claude Code에게 위임합니다. 예: "이 파일의 중복 코드를 정리하고 npm run check로 검증해줘."
- 에이전트가 일하는 동안 다음 작업의 탐색을 시작하면 **기다리는 시간이 사라집니다**.

## 전환 신호

같은 도구와 3번 이상 씨름하고 있다면, 여러분이 아니라 고른 도구가 틀린 것입니다. 자동완성과 싸우고 있으면 인라인으로, 인라인 지시가 반복되면 에이전트로 한 층씩 올라가세요.

처음부터 하루 전체를 바꾸려 하지 않아도 됩니다. 이번 주에는 아침 탐색만 에이전트에게 맡겨 보고, 익숙해지면 오후 정리까지 넓히는 식으로 한 구간씩 도입하는 편이 오래갑니다.

> 💡 **핵심**: **탐색·리팩토링은 에이전트, 작성은 탭, 좁은 수정은 인라인.** 도구를 바꾸는 타이밍이 곧 생산성입니다.$aix$,
  $aix${"type":"steps","title":"AI 코딩 하루 루틴","steps":[{"label":"아침: 탐색·계획","sublabel":"Claude Code — 원인 분석, 플랜 모드","icon":"search"},{"label":"낮: 구현","sublabel":"탭 자동완성 + 인라인 편집(Cmd+K)","icon":"zap"},{"label":"중간 작업 위임","sublabel":"IDE 에이전트 — 다중 파일 수정 후 diff 검토","icon":"code"},{"label":"오후: 정리·검증","sublabel":"Claude Code — 리팩토링·테스트·커밋 전 리뷰","icon":"check"}],"caption":"작업 크기가 커질수록 아래 층(에이전트)으로, 작아질수록 위 층(탭)으로."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9bf3b870-e346-696a-da09-0cc0d52573b7', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/team-adoption', 'team-adoption', '팀 도입 가이드: 컨벤션·보안·리뷰 정책',
  $aix$개인의 도구가 팀의 도구가 되려면 **정책**이 필요합니다. 정책 없이 도입하면 "각자 다르게 쓰다가 사고 한 번에 전면 금지"로 끝나기 쉽습니다. 다행히 필요한 것은 컨벤션·보안·리뷰 정책, 이 세 가지뿐입니다.

## 컨벤션: 규칙 파일을 저장소에

- `CLAUDE.md`, `.cursor/rules` 같은 규칙 파일을 **git으로 버전 관리**합니다. 팀원 누가 세션을 열어도 같은 규칙이 적용됩니다.
- 자주 쓰는 작업 지시문(리뷰 프롬프트, 리팩토링 절차)도 팀 위키가 아니라 **저장소 안에** 둡니다. 코드 옆에 있어야 코드와 함께 관리되고, 새 팀원의 온보딩도 "규칙 파일 읽기"로 끝나 훨씬 빨라집니다.

## 보안: 경계를 먼저 긋기

보안 경계는 도입 첫날에 긋는 것이 중요합니다. 사고가 난 뒤에 긋는 경계는 '전면 금지'가 되기 쉽기 때문입니다.

- 비밀키·고객 데이터가 프롬프트에 들어가지 않도록, `.env`(비밀키를 모아 두는 설정 파일) 같은 **민감 파일 접근 차단**을 도구 설정으로 강제합니다.
- 조직 계정(팀 플랜)을 쓰면 **학습 미사용·데이터 보존 정책**을 회사 차원에서 통제할 수 있습니다.
- 에이전트가 승인 없이 실행해도 되는 명령어의 범위를 팀 표준으로 정해 둡니다. 예: 테스트 실행은 자동 허용, 파일 삭제는 반드시 사전 승인.

## 리뷰 정책: 책임은 사람에게

- 원칙은 한 줄이면 충분합니다 — **"AI가 썼어도 머지(변경을 본 줄기 코드에 합치는 것)한 사람이 저자다."**
- AI가 만든 코드도 같은 리뷰 기준을 통과해야 합니다. "AI가 그렇게 짰어요"는 리뷰 코멘트에 대한 답변이 될 수 없습니다.

> 💡 **핵심**: 팀 도입 3종 세트 = **저장소 안의 규칙 파일 + 민감 데이터 경계 + '머지한 사람이 저자' 원칙**.$aix$,
  $aix${"type":"grid","title":"팀 도입 정책 체크리스트","items":[{"label":"규칙 파일 버전 관리","sublabel":"CLAUDE.md를 git에","icon":"git-branch","tone":"primary"},{"label":"지시문 라이브러리","sublabel":"리뷰·리팩토링 프롬프트 공유","icon":"book","tone":"primary"},{"label":"민감 파일 차단","sublabel":".env · 고객 데이터 접근 금지","icon":"lock","tone":"warning"},{"label":"조직 계정 정책","sublabel":"학습 미사용 · 보존 통제","icon":"shield","tone":"warning"},{"label":"자율 실행 범위","sublabel":"승인 없는 명령의 한계선","icon":"settings","tone":"accent"},{"label":"머지한 사람이 저자","sublabel":"AI 코드도 같은 리뷰 기준","icon":"users","tone":"success"}],"caption":"컨벤션(위) · 보안(중간) · 리뷰 책임(아래) — 세 축이 모두 있어야 팀 도입입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '11661966-fe83-f487-0800-4ae31a1c3eaa', '21b4b59e-9a10-96ff-d917-d7bee99e627a', 'ai-coding-tools/measuring-productivity', 'measuring-productivity', '생산성을 실제로 측정하는 법',
  $aix$"AI 덕분에 빨라진 것 같아요"는 느낌이지 측정이 아닙니다. 도구 투자와 정책을 조정하려면 **숫자**가 필요합니다. 다이어트를 시작하기 전에 몸무게부터 재 두는 것과 같은 이치입니다.

## 함정부터 피하기

- **코드 줄 수나 제안 수락률**은 생산성이 아닙니다. AI는 줄 수를 늘리는 데 특히 능하기 때문입니다. 줄 수로 재기 시작하면 팀은 그저 더 긴 코드를 쓰게 될 뿐입니다.
- 진짜 질문은 이것입니다 — "**가치 있는 변경이 얼마나 빨리, 얼마나 안전하게** 배포되는가."

## 볼 만한 지표

- **리드 타임** — 작업 시작부터 머지·배포까지 걸린 시간. 음식을 주문한 순간부터 도착까지 걸리는 배달 시간과 같은 개념입니다.
- **PR 처리량과 크기** — 완료된 변경이 흘러가는 양. PR 크기가 함께 줄어들면 좋은 신호입니다.
- **되돌림 비율** — 배포 후 되돌리기(revert)나 핫픽스(급히 내보내는 긴급 수정)가 차지하는 비율. AI로 속도만 오르고 이 지표가 나빠지면 경고입니다.
- **개발자 체감 설문** — "반복 작업에 쓰는 시간이 줄었는가" 같은 체감 지표는 분기마다 물어봅니다.

## 측정 루프 돌리기

1. 도입 전 4주의 지표로 **기준선**(비교의 출발점이 되는 수치)을 만듭니다.
2. 도구와 정책을 도입하고, 같은 지표를 계속 수집합니다.
3. 월 단위로 비교하고, 나빠진 지표가 있으면 정책(리뷰 기준, 자율 실행 범위)을 조정합니다.

한 가지 주의: 지표는 팀원을 평가하는 성적표가 아니라, 정책을 조정하기 위한 계기판으로 쓰세요. 개인 순위를 매기기 시작하는 순간 숫자는 부풀려지기 시작합니다.

> 💡 **핵심**: 속도 지표(리드 타임)와 **안전 지표(되돌림 비율)를 반드시 함께** 보세요. 한쪽만 보는 측정은 측정이 아닙니다.$aix$,
  $aix${"type":"cycle","title":"생산성 측정 루프","center":"월 단위 반복","nodes":[{"label":"기준선 수립","sublabel":"도입 전 4주 지표","icon":"gauge"},{"label":"지표 수집","sublabel":"리드 타임 · 되돌림 비율","icon":"chart"},{"label":"비교·해석","sublabel":"속도와 안전을 함께","icon":"eye"},{"label":"정책 조정","sublabel":"리뷰 기준 · 자율 범위","icon":"settings"}],"caption":"측정도 루프입니다 — 기준선 없이 시작한 측정은 해석할 수 없습니다."}$aix$::jsonb, null, 5, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 게임 개발: 에셋부터 NPC까지
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '92dd9e34-7cd9-7121-64e6-b0bc90ca874b', 'ai-game-dev', 'AI 게임 개발: 에셋부터 NPC까지', $aix$아트팀도 QA팀도 없는 1인 개발자가 상용 수준의 게임을 완성하는 시대입니다. 이 강의에서는 기획·에셋·코드·QA로 이어지는 게임 제작 파이프라인의 각 단계에 AI를 결합하는 법을 다룹니다. 2D 스프라이트와 3D 모델 생성, LLM 기반 NPC 대화, AI 에이전트를 이용한 게임플레이 코드 작성과 플레이테스트 자동화, 그리고 Steam AI 고지 정책과 저작권 리스크 대응까지 — 2026년 기준으로 실제 동작하는 워크플로우만 담았습니다.$aix$,
  null, 'dev', 'intermediate', array['Unity', 'Unreal', 'AI 에셋 생성', 'LLM NPC', '1인 개발']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '3dd9a655-290c-de11-782f-3aee636c73f8', '92dd9e34-7cd9-7121-64e6-b0bc90ca874b', 'ai-gamedev-landscape', 'AI 게임 개발 지형도', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'cefe6985-4404-2735-0bcd-cafed3e5c2c1', '92dd9e34-7cd9-7121-64e6-b0bc90ca874b', 'asset-content-generation', '에셋과 콘텐츠 생성', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '49b41a03-0628-9610-f25c-86fa0c90baf9', '92dd9e34-7cd9-7121-64e6-b0bc90ca874b', 'code-qa-launch', '코드·QA·출시', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3f7c2e68-e622-b591-daf1-a3c79f255e56', '3dd9a655-290c-de11-782f-3aee636c73f8', 'ai-game-dev/pipeline-shift', 'pipeline-shift', '게임 제작 파이프라인, AI가 바꾼 것과 못 바꾼 것',
  $aix$"팀이 없어서 게임을 못 만든다"는 말은 2026년에 절반만 사실입니다. 게임 제작의 어떤 단계는 AI 덕분에 10배 빨라졌고, 어떤 단계는 여전히 사람의 몫입니다. 어디가 빨라졌는지 알아야 내 시간을 어디에 쓸지 정할 수 있습니다.

## 파이프라인(제작 공정) 4단계별 변화

게임은 보통 기획 → 에셋 → 코드 → QA 순서로 만들어집니다. 이 흐름을 파이프라인이라고 부릅니다.

- **기획**: 아이디어 정리, 세계관 문서, 밸런스(적 체력·데미지 같은 수치 조율) 초안 — AI가 초안을 만들고 사람이 방향을 잡습니다.
- **에셋**: 가장 극적인 변화. 게임에 들어가는 그림(스프라이트)·3D 모델·소리 같은 재료를 텍스트 한 줄로 만들어 냅니다.
- **코드**: AI 에이전트가 게임 엔진과 직접 연결(MCP)되어 게임 동작 코드를 쓰고 테스트까지 돌립니다.
- **QA(품질 검증)**: AI 봇이 게임을 수백 번 플레이하며 진행이 막히는 구간과 밸런스가 무너지는 지점을 찾아냅니다.

## 여전히 사람이 해야 하는 것

- **재미의 판단** — "이게 재밌는가"는 어떤 수치로도 대체되지 않습니다.
- **일관된 아트 디렉션** — 그림 생성은 AI가 해도, "우리 게임은 이런 그림체"라는 기준을 세우는 건 사람입니다.
- **스코프 결정** — 스코프란 게임에 넣을 내용의 범위입니다. 무엇을 만들지 않을지 정하는 일이야말로 1인 개발의 핵심 기술입니다.

> 💡 **핵심**: AI는 "만드는 속도"를 바꿨지, "무엇을 만들지 판단하는 일"을 바꾸지 못했습니다. 이 강의는 그 둘을 결합하는 법을 다룹니다.$aix$,
  $aix${"type":"grid","title":"파이프라인 단계별 AI 영향도","items":[{"label":"기획","sublabel":"초안 생성 · 방향은 사람","icon":"lightbulb","tone":"accent"},{"label":"에셋","sublabel":"가장 큰 변화 · 텍스트→에셋","icon":"image","tone":"primary"},{"label":"코드","sublabel":"에이전트가 작성·검증","icon":"code","tone":"primary"},{"label":"QA","sublabel":"봇이 수백 회 플레이","icon":"test-tube","tone":"accent"},{"label":"재미의 판단","sublabel":"여전히 사람의 몫","icon":"user","tone":"warning"},{"label":"아트 디렉션","sublabel":"스타일 기준은 사람이","icon":"palette","tone":"warning"}],"caption":"보라색은 AI가 강한 영역, 노란색은 사람이 지켜야 할 영역입니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'c597d856-14c7-319a-b126-4b59c175e672', '3dd9a655-290c-de11-782f-3aee636c73f8', 'ai-game-dev/engine-ai-tools', 'engine-ai-tools', '엔진별 AI 도구 현황: Unity AI vs Unreal',
  $aix$게임 엔진을 고르기 전에, 각 엔진이 AI를 얼마나 지원하는지 알아야 합니다. 2026년 현재 양대 엔진인 Unity(유니티)와 Unreal(언리얼)의 접근은 뚜렷하게 다릅니다.

## Unity: 에디터 안의 'Unity AI'

에디터란 게임을 조립하는 작업 화면입니다. Unity 6.2부터는 베타 시절의 Muse가 은퇴하고 **Unity AI**가 에디터에 정식 탑재됐습니다. 세 가지로 구성됩니다.

- **Assistant** — 내 프로젝트 내용을 이해하는 에디터 안의 AI 조수. 질문에 답하고 코드도 다듬어 줍니다.
- **Generators** — 스프라이트·텍스처(물체 표면에 입히는 이미지)·애니메이션·사운드를 만드는 생성 도구 모음.
- **Inference Engine** — 구 Sentis의 새 이름. AI 모델을 서버 없이 플레이어 기기에서 직접(**로컬 추론**) 돌립니다.

Muse와의 결정적 차이는 외부 회사의 AI 모델(서드파티 모델)을 쓴다는 점입니다.

## Unreal: MCP로 여는 에이전트 통합

- **UE 5.8**에 MCP 서버와 AI 작업용 Skills가 탑재됐습니다. 덕분에 외부 AI 에이전트가 씬(게임의 한 장면을 담는 무대)을 들여다보고 직접 조작할 수 있습니다.
- 2026년 State of Unreal 행사에서 발표된 **UE6**(2027년 말 얼리 액세스 목표)는 Claude·Gemini 같은 모델을 엔진의 정식 기능으로 통합할 계획입니다. 레벨 배치, 리깅(캐릭터에 움직일 뼈대 넣기), 조명 조정 같은 반복 작업을 AI에게 맡기는 그림입니다.

## 선택 기준

- 에디터 안에 다 갖춰진 생성 도구를 원하면 → Unity
- 외부 AI 에이전트와 자유롭게 연동하고 싶으면 → Unreal (또는 Unity + 커뮤니티 MCP)

> 💡 **핵심**: 두 엔진 모두 방향은 같습니다 — "AI가 에디터를 직접 조작하되, 최종 편집권은 개발자에게". 도구 이름보다 이 구조를 기억하세요.$aix$,
  $aix${"type":"compare","title":"Unity AI vs Unreal의 AI 전략","columns":[{"title":"Unity (6.2+)","icon":"layers","tone":"primary","items":["Unity AI 정식 탑재 (Muse 은퇴)","Assistant: 에디터 내 어시스턴트","Generators: 에셋 생성 도구 모음","Inference Engine: 게임 안에서 로컬 추론"]},{"title":"Unreal (5.8 → UE6)","icon":"rocket","tone":"accent","items":["UE 5.8: MCP 서버 · AI Skills","외부 에이전트가 씬 검사·조작","UE6: Claude·Gemini 통합 예고","얼리 액세스 2027년 말 목표"]}],"caption":"통합 생성 도구의 Unity, 에이전트 개방의 Unreal — 방향은 같고 순서가 다릅니다."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '84a7ab92-1543-7129-3684-3991ead24dcc', '3dd9a655-290c-de11-782f-3aee636c73f8', 'ai-game-dev/solo-dev-scope', 'solo-dev-scope', '1인 개발의 현실적 스코프 설계',
  $aix$AI가 있으니 MMORPG(수천 명이 함께 접속하는 대형 온라인 게임)도 혼자 만들 수 있을까요? 아니요. AI 시대의 1인 개발은 **스코프(만들 범위)를 넓히는 게 아니라 완성도를 높이는** 방향으로 설계해야 합니다.

## AI가 시간을 줄여주는 곳 vs 아닌 곳

AI 코딩 도구가 강한 영역과 약한 영역은 명확히 갈립니다.

- **강함**: 혼자 즐기는 싱글플레이 로직, 에디터 툴, UI(화면의 버튼·메뉴), 표준적인 물리·상태머신, 에셋 파이프라인
- **약함**: 실시간 멀티플레이의 통신 코드(넷코드), 화면 1장면(프레임) 단위의 정밀한 타이밍, 거대한 상태를 가진 RPG 시스템

약한 영역이 게임의 중심이면 AI의 배수 효과가 사라집니다. 예를 들어 온라인 대전이 핵심인 게임은 AI가 도울 수 있는 부분이 적습니다.

## 스코프 설계 3원칙

1. **AI가 강한 영역에 게임을 세우세요** — 싱글플레이 + 절차적 다양성(맵·아이템을 규칙에 따라 자동으로 매번 다르게 만드는 방식) 조합이 1인 개발의 최적 지점입니다.
2. **에셋 종류를 줄이고 스타일을 통일하세요** — 만드는 것 자체보다 그림체를 똑같이 유지하는 게 진짜 비용입니다 (모듈 2에서 다룹니다).
3. **수직 슬라이스를 먼저** — 수직 슬라이스란 레벨(스테이지) 1개만 골라 출시 품질로 끝까지 완성해 보는 것입니다. 해 보면 전체 제작의 진짜 비용이 보입니다.

## 현실적인 목표선

"대작(AAA)을 혼자"가 아니라 **"과거 5인 팀 규모의 완성도를 혼자"**가 2026년의 현실적인 기준입니다.

> 💡 **핵심**: AI는 스코프의 상한을 올리는 도구가 아니라, 같은 스코프의 **완성도와 속도**를 올리는 도구입니다.$aix$,
  $aix${"type":"steps","title":"1인 개발 스코프 설계 순서","steps":[{"label":"장르를 AI 강점에 맞추기","sublabel":"싱글플레이 · 표준 게임 방식 중심","icon":"target"},{"label":"에셋 스타일 1개로 통일","sublabel":"종류를 줄이면 일관성 비용 감소","icon":"palette"},{"label":"수직 슬라이스 제작","sublabel":"레벨 1개를 출시 품질로","icon":"scissors"},{"label":"비용 측정 후 전체 계획","sublabel":"슬라이스 x 레벨 수 = 진짜 스코프","icon":"chart"}],"caption":"수직 슬라이스가 스코프 계산기입니다 — 계획은 그 다음입니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f4c9a1c2-e439-ee03-86d6-7606c4bb8a98', 'cefe6985-4404-2735-0bcd-cafed3e5c2c1', 'ai-game-dev/2d-sprite-workflow', '2d-sprite-workflow', '2D 스프라이트·컨셉아트: 일관성이 전부다',
  $aix$이미지 생성 AI로 멋진 스프라이트 한 장을 만드는 건 쉽습니다. 어려운 것은 **100장을 같은 게임처럼 보이게** 만드는 일입니다. 그림체가 제각각이면 플레이어는 바로 알아챕니다.

## 일관성이 무너지는 지점

- 캐릭터가 장면마다 미묘하게 다르게 생김
- 아이템 아이콘마다 명암과 선 굵기가 제각각
- 달리기·점프·공격 동작의 그림(프레임)들 사이에서 디테일이 흔들림

## 일관성 유지 워크플로우

1. **스타일 바이블 먼저** — 우리 게임 그림체의 기준서입니다. 대표 이미지 10~20장으로 색·선·명암 기준을 정합니다.
2. **커스텀 모델(LoRA) 학습** — Scenario 같은 도구는 내 그림으로 LoRA를 학습시켜, 이후 모든 출력이 같은 스타일로 나오게 합니다. 2026년 2D 워크플로우의 표준입니다.
3. **베이스 스프라이트 → 애니메이션 분리** — AI는 한 장짜리 그림에 강하고, 연속 동작 사이의 일관성에 약합니다. 깨끗한 기본 그림 1장을 생성한 뒤, 리깅 도구(그림에 뼈대를 넣어 움직이게 하는 도구)나 프레임 보간(중간 그림을 자동으로 채우는 기법)으로 애니메이션을 만드는 게 실무 패턴입니다.
4. **마지막 손질은 사람 손으로** — 최종 픽셀 정리와 색 통일은 사람이 마무리합니다 (저작권 측면에서도 유리합니다 — 모듈 3 참고).

> 💡 **핵심**: 2D 에셋 생성의 성패는 프롬프트가 아니라 **커스텀 모델 학습 + 베이스/애니메이션 분리**라는 파이프라인 설계에 달려 있습니다.$aix$,
  $aix${"type":"flow","title":"일관성 있는 2D 에셋 파이프라인","nodes":[{"label":"스타일 바이블 확정","sublabel":"대표 이미지 10~20장","icon":"book","tone":"warning"},{"label":"커스텀 모델(LoRA) 학습","sublabel":"내 아트 스타일로 고정","icon":"brain","tone":"primary"},{"label":"베이스 스프라이트 생성","sublabel":"캐릭터·아이템·타일","icon":"image","tone":"accent"},{"label":"리깅·보간으로 애니메이션","sublabel":"프레임 일관성은 도구로","icon":"repeat","tone":"accent"},{"label":"사람 손 후보정 → 엔진 임포트","sublabel":"팔레트 통일 · 픽셀 정리","icon":"check","tone":"success"}],"caption":"생성은 3단계일 뿐 — 앞의 기준 잡기와 뒤의 정리가 품질을 만듭니다."}$aix$::jsonb, $aix${"title":"생성한 스프라이트를 레벨에 배치 따라하기","app":{"kind":"design-canvas","windowTitle":"숲 스테이지 — 레벨 에디터","tools":[{"id":"tool-select","icon":"target","label":"선택"},{"id":"tool-asset","icon":"image","label":"에셋"},{"id":"tool-play","icon":"play","label":"테스트"}],"objects":[{"id":"level","shape":"frame","label":"Stage 1","x":6,"y":8,"w":88,"h":84},{"id":"ground","shape":"rect","x":8,"y":72,"w":84,"h":16,"color":"#65a30d"},{"id":"asset-tree","shape":"image","label":"🌲 나무","x":10,"y":14,"w":12,"h":13},{"id":"asset-hero","shape":"image","label":"🦊 주인공","x":24,"y":14,"w":12,"h":13},{"id":"tree1","shape":"image","label":"🌲","x":16,"y":54,"w":11,"h":17,"hidden":true},{"id":"tree2","shape":"image","label":"🌲","x":68,"y":54,"w":11,"h":17,"hidden":true},{"id":"hero1","shape":"image","label":"🦊","x":42,"y":58,"w":9,"h":13,"hidden":true},{"id":"check-ok","shape":"text","label":"✓ 배치 저장됨","x":66,"y":12,"w":24,"h":7,"hidden":true}]},"actions":[{"t":"caption","text":"① AI로 생성한 스프라이트가 팔레트에 준비되어 있습니다"},{"t":"move","target":"tool-asset"},{"t":"click"},{"t":"caption","text":"② 나무 스프라이트를 드래그해 지면 위에 배치합니다"},{"t":"drag","from":"asset-tree","to":"tree1"},{"t":"reveal","target":"tree1"},{"t":"drag","from":"asset-tree","to":"tree2"},{"t":"reveal","target":"tree2"},{"t":"caption","text":"③ 주인공 캐릭터를 시작 지점에 배치합니다"},{"t":"move","target":"asset-hero"},{"t":"click"},{"t":"drag","from":"asset-hero","to":"hero1"},{"t":"reveal","target":"hero1"},{"t":"caption","text":"④ 테스트 버튼으로 배치 결과를 확인합니다"},{"t":"move","target":"tool-play"},{"t":"click"},{"t":"reveal","target":"check-ok"},{"t":"move","target":"check-ok"},{"t":"caption","text":"⑤ 같은 LoRA로 뽑은 에셋이라 장면 톤이 유지됩니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f32351c4-75d4-835e-508a-3edf9bc647b9', 'cefe6985-4404-2735-0bcd-cafed3e5c2c1', 'ai-game-dev/3d-model-generation', '3d-model-generation', '3D 모델 생성: 텍스트에서 게임 레디 메시까지',
  $aix$3D 모델링은 1인 개발자의 최대 병목이었습니다. 2026년에는 **Meshy·Tripo** 같은 도구가 텍스트나 이미지 한 장으로, 색과 질감까지 입힌 3D 모델을 1분 안에 만들어 줍니다.

## 두 대표 도구의 성격

- **Meshy** — PBR 텍스처(빛을 실제처럼 반사하는 고급 표면 질감) 품질이 강점. 텍스트→3D, 이미지→3D 모두 지원하고, 대화하듯 수정 지시도 가능합니다.
- **Tripo** — 생성 속도(평균 수 초)와 깨끗한 형태가 강점. 쿼드 리토폴로지(Smart Mesh)를 자동으로 해 줘서 게임용으로 유리합니다.

## "생성됐다"와 "게임에 쓸 수 있다"는 다릅니다

메시란 3D 모델의 표면을 이루는 그물 구조입니다. 생성 직후의 메시는 대부분 그대로 못 씁니다. 반드시 확인하세요.

- **폴리곤 수** — 폴리곤은 3D 모델을 이루는 작은 면 조각으로, 많을수록 무겁습니다. 생성 모델은 수만 개가 기본이라, 작은 소품이면 수백~수천 개로 줄이는 **리토폴로지**가 필요합니다.
- **면 구조 품질** — 움직여야 하는 모델(캐릭터)은 변형에 견디는 사각형(쿼드) 기반 면 구조가 필요해 수동 정리가 남습니다.
- **UV·텍스처** — UV는 3D 표면에 2D 그림을 입히기 위한 "펼침 지도"입니다. 자동 UV는 이음새(심)가 어색한 경우가 많아 텍스처를 다시 만들어야 할 수 있습니다.
- **LOD** — 멀리 있는 물체를 단순한 버전으로 바꿔 보여주는 기법입니다. 만들어 둬야 게임이 끊기지 않습니다.

## 실무 요령

주인공처럼 화면 중앙에 오래 보이는 모델은 여전히 수작업(또는 외주) 가치가 있고, **배경 소품부터 AI로** 채우는 것이 승률 높은 순서입니다.

> 💡 **핵심**: AI 3D 생성은 "모델링의 끝"이 아니라 **"초벌 모델 만들기의 10배속"**입니다. 리토폴로지·LOD라는 마무리 공정을 예산에 넣으세요.$aix$,
  $aix${"type":"steps","title":"텍스트→게임 레디 3D 에셋 공정","steps":[{"label":"프롬프트/이미지로 생성","sublabel":"Meshy · Tripo — 1분 내 초안","icon":"wand"},{"label":"후보 중 선택 + 텍스처","sublabel":"PBR 머티리얼 적용","icon":"palette"},{"label":"리토폴로지·폴리곤 감량","sublabel":"소품 수백~수천 폴리곤 목표","icon":"scissors"},{"label":"LOD 생성 후 엔진 임포트","sublabel":"FBX/glTF → 콜라이더 설정","icon":"download"}],"caption":"3~4단계(최적화)를 건너뛰면 게임이 뚝뚝 끊겨서 결국 되돌아오게 됩니다."}$aix$::jsonb, $aix${"title":"텍스트→3D 모델 생성 따라하기","app":{"kind":"browser","url":"app.meshy.ai","blocks":[{"id":"b-head","type":"heading","label":"Text to 3D"},{"id":"b-prompt","type":"input","label":"에셋을 텍스트로 설명하세요…"},{"id":"b-gen","type":"button","label":"Generate"},{"id":"b-draft","type":"card","label":"📦 초안 메시 4종 생성됨","hidden":true},{"id":"b-refine","type":"button","label":"Refine & Texture","hidden":true},{"id":"b-textured","type":"card","label":"✨ PBR 텍스처 적용 완료","hidden":true},{"id":"b-polycount","type":"badge","label":"폴리곤 12,400 — 감량 필요","hidden":true},{"id":"b-export","type":"button","label":"Export FBX","hidden":true},{"id":"b-done","type":"card","label":"✓ chest.fbx 다운로드 완료","hidden":true}]},"actions":[{"t":"caption","text":"① 원하는 에셋을 텍스트로 설명합니다"},{"t":"move","target":"b-prompt"},{"t":"click"},{"t":"type","target":"b-prompt","text":"low poly treasure chest, game asset"},{"t":"caption","text":"② Generate로 초안 메시를 생성합니다"},{"t":"move","target":"b-gen"},{"t":"click"},{"t":"wait","ms":600},{"t":"reveal","target":"b-draft"},{"t":"move","target":"b-draft"},{"t":"caption","text":"③ 마음에 드는 초안을 골라 텍스처를 입힙니다"},{"t":"click"},{"t":"reveal","target":"b-refine"},{"t":"move","target":"b-refine"},{"t":"click"},{"t":"reveal","target":"b-textured"},{"t":"caption","text":"④ 폴리곤 수를 확인합니다 — 그대로 쓰면 무겁습니다"},{"t":"reveal","target":"b-polycount"},{"t":"move","target":"b-polycount"},{"t":"caption","text":"⑤ FBX로 내보내 엔진에서 리토폴로지·LOD를 마무리합니다"},{"t":"reveal","target":"b-export"},{"t":"click","target":"b-export"},{"t":"reveal","target":"b-done"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'dad24b15-a397-b2c3-8ea9-097704ca2e5d', 'cefe6985-4404-2735-0bcd-cafed3e5c2c1', 'ai-game-dev/texture-audio-generation', 'texture-audio-generation', '텍스처·사운드·음악: 라이선스가 도구를 고른다',
  $aix$에셋 중 오디오는 AI 품질이 이미 상용 수준입니다. 단, 이 영역에서 도구를 고르는 기준은 품질보다 **라이선스**입니다. 소리가 아무리 좋아도 권리가 불안하면 출시 후에 발목을 잡습니다.

## 텍스처

- Unity 6.2의 **Generators**가 텍스처(물체 표면에 입히는 이미지)와 머티리얼(재질 설정) 생성을 에디터 안에서 지원합니다.
- Meshy 같은 3D 생성 도구의 PBR 텍스처 기능으로, 기존 모델에 새 표면 질감만 입히는 것도 실무 패턴입니다.
- 타일링(이어 붙여도 이음새가 보이지 않는 반복) 가능 여부를 반드시 확인하세요.

## 효과음(SFX)

- ElevenLabs 등의 효과음 생성기는 "낡은 나무 문이 삐걱이는 소리" 수준의 문장만으로 소리를 만들어 줍니다.
- 타격감이 중요한 핵심 소리는 여러 개 생성해 겹쳐 쌓으면(레이어링) 품질이 크게 오릅니다.

## 음악 — 라이선스를 먼저 보세요

- **ElevenLabs Music**: 권리를 확보한 데이터로만 학습한 "라이선스 클린" 모델. 상업 게임에 안전한 선택지입니다.
- **Stable Audio**: 상업 이용 가능을 명시. BGM과 잔잔한 배경음에 강합니다.
- **Suno·Udio**: 출력 품질은 높지만 학습 데이터를 둘러싼 소송이 진행 중(2026년 기준)입니다. 상업 게임 BGM으로 쓰려면 리스크 검토가 필요합니다.

> 💡 **핵심**: 오디오 생성 도구는 "가장 좋은 소리"가 아니라 **"학습 데이터가 깨끗하고 상업 이용 조건이 명시된 도구"**부터 고르세요. 출시 후 문제가 되는 건 품질이 아니라 권리입니다.$aix$,
  $aix${"type":"grid","title":"오디오·텍스처 생성 도구 지도","items":[{"label":"텍스처·머티리얼","sublabel":"Unity Generators · Meshy","icon":"layers","tone":"accent"},{"label":"효과음(SFX)","sublabel":"텍스트→효과음 · 레이어링","icon":"mic","tone":"accent"},{"label":"BGM — 클린 라이선스","sublabel":"ElevenLabs Music · Stable Audio","icon":"music","tone":"success"},{"label":"BGM — 소송 진행 중","sublabel":"Suno · Udio (리스크 검토)","icon":"alert","tone":"warning"},{"label":"체크 1: 상업 이용 조항","sublabel":"플랜별 허용 범위 확인","icon":"file-text","tone":"muted"},{"label":"체크 2: 학습 데이터 출처","sublabel":"라이선스 확보 여부","icon":"shield","tone":"muted"}],"caption":"초록은 안전지대, 노랑은 출시 전 법무 검토가 필요한 영역입니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '7236be44-32ef-4e17-5bfb-52ab209d7648', 'cefe6985-4404-2735-0bcd-cafed3e5c2c1', 'ai-game-dev/llm-npc', 'llm-npc', 'LLM으로 살아있는 NPC 만들기: 비용과 지연의 공학',
  $aix$"모든 NPC가 자유롭게 대화한다"는 시연은 쉽고, 출시는 어렵습니다. 문제는 AI의 지능이 아니라 **응답 속도와 비용**입니다.

## 두 개의 벽

- **지연**: 클라우드 LLM으로 대사 2~3문장을 만들면 0.8~2.5초가 걸립니다. 대화의 몰입이 깨지기에 충분한 시간입니다.
- **비용**: 추론(AI가 답을 만드는 계산)이 NPC 수 × 플레이어 수만큼 곱해집니다. 동시 접속자가 많은 라이브 게임에서는 감당 못 하는 청구서가 나옵니다.

## 온디바이스 vs API

- **온디바이스** — NVIDIA ACE처럼 플레이어 컴퓨터의 GPU(그래픽 처리 장치)에서 작은 모델을 직접 돌리는 방식. 지연도 서버비도 없지만, 게임의 최소 사양이 올라갑니다. Unity의 Inference Engine도 이 방식의 기반입니다.
- **API** — Inworld·Convai 같은 게임 특화 플랫폼이 캐릭터의 성격(페르소나)·기억·안전 필터를 대신 관리해 줍니다. 품질 상한이 높지만, 쓴 만큼 돈이 나가고 인터넷 없이는 동작하지 않습니다.

## 실무 완화 기법

- **스트리밍 출력**: 문장이 다 완성되길 기다리지 않고 첫 글자부터 바로 보여줍니다. 0.3초에 첫 글자가 나오면 체감 지연이 사라집니다.
- **응답 사전 생성**: 플레이어가 입력하는 동안, 나올 법한 응답 후보를 미리 만들어 둡니다.
- **계층 설계**: 핵심 스토리 대사는 사람이 쓰고, 잡담과 반응만 LLM에 맡기면 비용이 급감합니다.

> 💡 **핵심**: LLM NPC 설계의 질문은 "무엇을 말하게 할까"가 아니라 **"어떤 대사를 굳이 실시간으로 생성해야 하는가"**입니다. 대부분의 대사는 미리 만들어 두는 것으로 충분합니다.$aix$,
  $aix${"type":"compare","title":"NPC용 LLM 연동: 온디바이스 vs API","columns":[{"title":"온디바이스 (로컬 추론)","icon":"cpu","tone":"primary","items":["플레이어 GPU에서 소형 모델 실행","지연 최소 · 서버 비용 0","오프라인 동작 가능","단점: 최소 사양 상승 · 품질 상한"]},{"title":"API (관리형 클라우드)","icon":"cloud","tone":"accent","items":["Inworld · Convai 등 특화 플랫폼","페르소나·기억·안전 필터 내장","품질 상한 높음 · 모델 교체 쉬움","단점: 동접 비례 과금 · 지연 0.8초+"]}],"caption":"핵심 대사는 사전 제작, 잡담만 실시간 — 하이브리드가 2026년의 정석입니다."}$aix$::jsonb, null, 7, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '350bf49e-25d4-cf6c-bfd1-fab449e92b30', '49b41a03-0628-9610-f25c-86fa0c90baf9', 'ai-game-dev/ai-gameplay-code', 'ai-gameplay-code', 'AI 에이전트로 게임플레이 코드 작성하기',
  $aix$게임 코드는 "코드 작성 → 에디터에서 직접 실행해 확인"을 오가는 왕복이 잦아, AI에게 불리한 분야였습니다. 2026년에는 **MCP로 에이전트가 엔진을 직접 조작**하게 되면서, 이 왕복이 AI의 작업 루프 안으로 들어왔습니다.

## 에디터 연동: Unity MCP

커뮤니티가 만든 Unity-MCP 같은 연결 도구를 붙이면, Claude Code·Cursor 같은 에이전트가 다음을 직접 합니다.

- 씬(게임의 한 장면) 안의 게임오브젝트(씬에 놓인 물체 하나하나)와 컴포넌트 검사
- C#(Unity에서 쓰는 프로그래밍 언어) 스크립트 작성 후, **컴파일 에러(코드 문법 오류)를 직접 읽고 수정**
- 플레이 모드(에디터에서 게임을 바로 실행해 보는 기능)로 동작 검증

단순한 "코드 생성기"가 아니라 **작성→실행→관찰→수정 루프를 도는 개발자**가 되는 것입니다.

## 무엇을 맡기면 잘하나

- **물리 기반 이동**: `Rigidbody2D`(물체에 물리 효과를 붙이는 컴포넌트) 설정과 이동 스크립트 (Unity 6는 `velocity` 대신 `linearVelocity`를 씁니다 — 최신 문법은 프로젝트 규칙 파일로 보강하세요)
- **상태머신**: 대기→달리기→점프→공격 상태를 전환하는 로직과 애니메이션 연결
- **에디터 툴**: 레벨 검증 스크립트, 에셋 일괄 처리기 — 투자 대비 효과 최고

## 프롬프트 요령

목표만 주지 말고 검증 방법을 함께 주세요: "이동 스크립트를 작성하고, 컴파일 확인 후 플레이 모드에서 좌우 이동을 검증해."

> 💡 **핵심**: 게임 코드에서 AI의 가치는 자동완성이 아니라 **엔진과 연결된 검증 루프**에서 나옵니다. MCP 연동을 먼저 세팅하세요.$aix$,
  $aix${"type":"terminal","windowTitle":"claude + unity-mcp — 에이전트 세션","lines":[{"text":"점프 기능을 PlayerMovement에 추가해 줘","tone":"cmd"},{"text":"[mcp] 씬 검사: Player에 Rigidbody2D 확인","tone":"dim"},{"text":"[edit] PlayerMovement.cs +12줄","tone":"out"},{"text":"[mcp] 컴파일... error CS0103: 'isGrounded'","tone":"err"},{"text":"# 에이전트: 접지 판정 변수 누락 — 수정","tone":"comment"},{"text":"[edit] GroundCheck 레이캐스트 추가","tone":"out"},{"text":"[mcp] 컴파일 성공 → 플레이 모드 테스트","tone":"ok"},{"text":"✓ 점프 동작 확인 — 완료","tone":"ok"}],"caption":"에이전트가 컴파일 에러를 스스로 읽고 고치는 것이 MCP 연동의 가치입니다."}$aix$::jsonb, $aix${"title":"유니티 C# 이동 스크립트를 AI로 작성 따라하기","app":{"kind":"code-editor","windowTitle":"PlayerMovement.cs — Unity + AI 에이전트","files":[{"id":"f-move","name":"PlayerMovement.cs","active":true},{"id":"f-input","name":"PlayerInput.cs"},{"id":"f-scene","name":"Stage1.unity"}],"code":[{"id":"c1","text":"public class PlayerMovement : MonoBehaviour {"},{"id":"c2","text":"[SerializeField] float speed = 5f;","indent":1},{"id":"c3","text":"Rigidbody2D rb;","indent":1},{"id":"c4","text":"void Awake() { rb = GetComponent<Rigidbody2D>(); }","indent":1},{"id":"c5","text":"void FixedUpdate() {","indent":1,"tone":"add","hidden":true},{"id":"c6","text":"float x = Input.GetAxis(\"Horizontal\");","indent":2,"tone":"add","hidden":true},{"id":"c7","text":"rb.linearVelocity = new Vector2(x * speed, rb.linearVelocity.y);","indent":2,"tone":"add","hidden":true},{"id":"c8","text":"}","indent":1,"tone":"add","hidden":true},{"id":"c9","text":"}"}],"terminal":[{"id":"t1","text":"좌우 이동 스크립트를 작성해 줘","tone":"cmd","hidden":true},{"id":"t2","text":"[mcp] Player 오브젝트에 Rigidbody2D 확인 — 작성 시작","tone":"out","hidden":true},{"id":"t3","text":"플레이 모드로 이동을 검증해 줘","tone":"cmd","hidden":true},{"id":"t4","text":"✓ 컴파일 성공 — 좌우 이동 동작 확인","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① AI 에이전트에게 목표를 자연어로 지시합니다"},{"t":"type","target":"t1","text":"좌우 이동 스크립트를 작성해 줘"},{"t":"reveal","target":"t2"},{"t":"wait","ms":500},{"t":"caption","text":"② 에이전트가 물리 기반 이동 코드를 작성합니다"},{"t":"move","target":"c4"},{"t":"click"},{"t":"reveal","target":"c5"},{"t":"type","target":"c6","text":"float x = Input.GetAxis(\"Horizontal\");"},{"t":"reveal","target":"c7"},{"t":"reveal","target":"c8"},{"t":"wait","ms":400},{"t":"caption","text":"③ Unity 6에서는 velocity 대신 linearVelocity입니다"},{"t":"dblclick","target":"c7"},{"t":"caption","text":"④ 플레이 모드 검증까지가 한 루프입니다"},{"t":"type","target":"t3","text":"플레이 모드로 이동을 검증해 줘"},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"caption","text":"⑤ 통과 — 실패 시 에러를 주고 다시 돌리면 됩니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'bea7bd36-75ad-acce-729e-22ea25b13412', '49b41a03-0628-9610-f25c-86fa0c90baf9', 'ai-game-dev/playtest-balancing', 'playtest-balancing', '플레이테스트와 밸런싱 자동화',
  $aix$1인 개발자에게 진짜 부족한 것은 아트가 아니라 **테스터**입니다. 2026년에는 게임 스튜디오의 절반 가까이가 QA(품질 검증)·플레이테스트에 AI를 씁니다. 혼자인 당신에게는 더 절실한 도구입니다.

## AI 플레이테스트가 잡아주는 것

- **진행 불가 구간**: 봇 수백 대가 레벨을 돌며 끼임·낙사·소프트락(게임은 돌아가는데 더 이상 진행할 수 없게 되는 상태)을 기계적으로 찾아냅니다.
- **밸런스 붕괴**: 강화학습(RL — 시행착오를 반복하며 스스로 배우는 AI 학습법) 에이전트끼리 수만 판을 시뮬레이션해, 그것만 쓰면 이기는 지배적 무기·전략을 찾아냅니다.
- **난이도 곡선**: "신중한 탐험가", "공격적인 스피드러너" 같은 **플레이어 유형별 봇**을 돌려, 유형별로 어디서 그만두는지 측정합니다.

## 1인 개발자의 현실적 도입 순서

1. **스모크 테스트 봇** — "시작부터 클리어까지 무작위 입력으로 완주"만 자동화해도, 새 빌드마다 생기는 큰 회귀(멀쩡하던 기능이 다시 망가지는 것)를 잡습니다.
2. **밸런스 시뮬레이터** — 전투 공식을 코드로 분리하고, AI 에이전트에게 수천 번 시뮬레이션시켜 능력치 표를 조정합니다.
3. **AI 리뷰어** — 플레이 영상과 로그를 멀티모달 모델에게 보여주고 "어디서 지루했나"를 물어봅니다.

## 한계

봇은 버그와 수치를 찾을 뿐, **재미를 느끼지 못합니다**. 사람 테스트를 대체하는 게 아니라, 사람의 시간을 재미 판단에만 쓰게 해주는 것입니다.

> 💡 **핵심**: AI 플레이테스트의 목적은 사람 테스터의 대체가 아니라 **"사람에게는 재미 질문만 남기기"**입니다.$aix$,
  $aix${"type":"cycle","title":"자동 밸런싱 루프","center":"매 빌드마다 반복","nodes":[{"label":"봇 플레이","sublabel":"아키타입별 수백 회","icon":"bot"},{"label":"지표 수집","sublabel":"클리어율·사망 지점","icon":"chart"},{"label":"붕괴 탐지","sublabel":"지배 전략·소프트락","icon":"search"},{"label":"수치 조정","sublabel":"스탯 테이블 갱신","icon":"settings"}],"caption":"사람은 이 루프의 결과를 보고 '재미'만 판단하면 됩니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4458c3bc-8e56-b368-8166-17c49534984e', '49b41a03-0628-9610-f25c-86fa0c90baf9', 'ai-game-dev/store-ai-policy', 'store-ai-policy', '스토어 등록과 AI 콘텐츠 고지: Steam 정책 실전',
  $aix$열심히 만든 게임이 고지(사전 신고) 누락으로 스토어에서 문제가 되면 억울합니다. 2026년 1월 개정된 Steam(가장 큰 PC 게임 판매 플랫폼)의 AI 고지 정책은 이전보다 명확해졌으니 정확히 알아두세요.

## 개정의 핵심: "플레이어가 소비하는 것"만

Valve(Steam 운영사)는 고지 대상을 **게임에 실려 플레이어가 직접 보고 듣는 AI 생성 콘텐츠**로 좁혔습니다. 개발 과정에서 쓴 효율 도구 — AI 코드 어시스턴트, 내부 문서 작성 등 — 는 고지 대상이 아닙니다.

## 두 가지 카테고리

- **사전 생성(Pre-generated)**: 개발 중에 AI로 만들어 게임에 포함한 에셋(이미지·오디오·텍스트). 등록할 때 **무엇을 AI로 만들었는지 문장으로 상세히 기재**하고, 일반 콘텐츠와 같은 심사를 받습니다. 스토어 페이지와 홍보 이미지에 쓴 AI도 포함됩니다.
- **라이브 생성(Live-generated)**: 게임 실행 중에 AI가 즉석에서 콘텐츠를 만드는 경우(LLM NPC 대화 등). 체크박스 확인과 함께 **부적절하거나 불법인 내용이 나오지 않게 막는 가드레일**을 설명해야 합니다.

## 고지 실무 팁

- 고지 내용은 스토어 페이지에 공개됩니다 — 숨기려다 커뮤니티에 발각되는 것이 최악의 시나리오입니다.
- LLM NPC를 쓴다면 모듈 2에서 다룬 안전 필터가 곧 가드레일 설명의 재료가 됩니다.
- 개발하면서 "어떤 에셋을 어떤 도구로 만들었는지" 기록을 남겨 두면, 고지 작성이 10분 일거리가 됩니다.

> 💡 **핵심**: 기준은 하나 — **"플레이어가 보고 듣는 것 중 AI가 만든 게 있는가"**. 있으면 사전/라이브를 구분해 정직하게 쓰는 것이 가장 싼 보험입니다.$aix$,
  $aix${"type":"flow","title":"Steam AI 고지 판단 플로우","nodes":[{"label":"AI로 만든 것이 있는가?","sublabel":"에셋·대사·스토어 이미지 점검","icon":"search","tone":"primary"},{"label":"플레이어가 소비하는가?","sublabel":"코드 어시스턴트 등 효율 도구는 제외","icon":"eye","tone":"accent","edgeLabel":"개발 도구만 썼다면 고지 불필요"},{"label":"사전 생성 → 서술형 기재","sublabel":"포함된 AI 에셋을 상세히 설명","icon":"file-text","tone":"warning"},{"label":"라이브 생성 → 가드레일 설명","sublabel":"부적절 콘텐츠 방지책 명시","icon":"shield","tone":"warning"},{"label":"스토어 페이지에 공개","sublabel":"정직한 고지가 가장 싼 보험","icon":"check","tone":"success"}],"caption":"2026년 1월 개정 기준 — '플레이어가 소비하는 콘텐츠'가 유일한 기준선입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ae9296bc-0f35-1a8c-3c80-7206e601fa97', '49b41a03-0628-9610-f25c-86fa0c90baf9', 'ai-game-dev/copyright-risk', 'copyright-risk', '저작권 리스크 관리: 내 게임을 지키는 법',
  $aix$AI 에셋의 저작권 문제는 "소송당할 위험"보다 **"내 게임을 아무도 못 지키게 되는 위험"**이 먼저입니다. 저작권 등록이 안 되면, 남이 내 에셋을 그대로 베껴도 막을 방법이 없습니다.

## 확정된 법적 지형 (미국 기준)

- 2026년 3월 연방대법원이 관련 상고를 기각(사건을 받아들이지 않아 아래 판결이 확정됨)하면서, **순수 AI 생성물은 저작권 등록 불가**라는 원칙이 확정됐습니다.
- 반면 사람이 충분히 기여한 **인간+AI 협업 저작물은 등록 가능** — 이미 6,000건 이상 등록됐습니다. 단, AI가 만든 부분은 명시하고 보호 범위에서 빼야 하며, 숨기면 등록이 취소될 수 있습니다.

## 무엇이 "인간의 기여"인가

프롬프트를 잘 쓰고 첫 출력을 그대로 쓰는 것은 인정받기 어렵습니다. 인정되는 것은:

- AI 출력을 **실제로 편집·수정**한 것 (2D 후보정, 리토폴로지가 여기서도 효자입니다)
- 여러 출력물 중에서 **고르고, 배치하고, 조합**한 구성적 판단
- AI 요소와 직접 만든 요소의 결합

## 1인 개발자의 방어 체크리스트

1. 학습 데이터가 깨끗한(라이선스 클린) 도구를 우선 선택
2. 도구별 상업 이용 약관 확인 — 무료 플랜은 상업 이용 금지인 경우가 많습니다
3. AI가 준 원본과 내가 고친 수정본을 따로 보관 (기여를 입증하는 자료)
4. 어떤 에셋을 어떤 도구로 만들었는지 기록 (Steam 고지와 등록 서류에 재사용)
5. 게임의 "얼굴"(주인공·대표 이미지·로고)은 사람 손의 비중을 높게

> 💡 **핵심**: AI 에셋을 쓰되 **사람의 편집·선택·결합을 기록으로 남기는 것** — 이것이 저작권 보호와 스토어 고지를 동시에 해결하는 한 가지 습관입니다.$aix$,
  $aix${"type":"stack","title":"저작권 방어의 4층 구조","layers":[{"label":"보호받는 최종 게임","sublabel":"인간+AI 협업 저작물로 등록","icon":"shield","tone":"success"},{"label":"인간의 기여 층","sublabel":"편집·선택·배치·결합의 기록","icon":"user","tone":"primary"},{"label":"도구·약관 층","sublabel":"라이선스 클린 도구 · 상업 조항 확인","icon":"file-text","tone":"accent"},{"label":"AI 원시 출력","sublabel":"이 층만으로는 보호 불가 (등록 불가)","icon":"bot","tone":"muted"}],"caption":"맨 아래 층(AI 원시 출력)에 머무는 에셋이 많을수록 게임의 방어력이 약해집니다."}$aix$::jsonb, null, 5, 10
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
  $aix$"예쁜 그림 그려줘"로는 예쁜 그림이 나오지 않습니다. AI는 우리가 말하지 않은 부분을 전부 제멋대로 채우기 때문입니다. 그래서 좋은 이미지 프롬프트는 **문장이 아니라 설계도**입니다.

## 프롬프트를 이루는 5개의 층

- **주제(Subject)** — 무엇을 그릴 것인가. 인물·사물·장면을 구체적으로 씁니다.
- **스타일(Style)** — 어떤 그림체인가. 사진처럼/일러스트/3D, 시대의 분위기.
- **구도(Composition)** — 카메라가 어디에 있는가. 얼굴만 크게(클로즈업), 위에서 내려다보기(부감), 넓게 담기(광각), 여백 두기.
- **조명(Lighting)** — 빛이 어디서 오는가. 해질 무렵의 노을빛(골든아워), 스튜디오 조명, 네온, 역광.
- **파라미터(Parameters)** — `--ar` 같은 짧은 코드. 비율·화풍 강도를 조절하는 다이얼로, 다음다음 레슨에서 자세히 다룹니다.

## 왜 층을 나눠 쓰는가

- 모델은 **앞에 쓴 단어를 더 중요하게** 여깁니다. 가장 중요한 주제를 맨 앞에 두세요.
- 층을 나눠 두면 결과가 마음에 안 들 때 **어느 층 하나만** 고치면 됩니다. 건물 설계도가 층별로 나뉘어 있어 "2층 창문만 수정"이 가능한 것과 같습니다.
- "조명만 바꿔서 4장 더" 같은 변주 실험이 가능해집니다 — 이것이 디자이너의 실제 작업 방식입니다.

## 처음이라면 이렇게

영어가 부담되면 한국어로 5요소를 먼저 쓰고, 챗봇에게 "이미지 프롬프트용 영어로 바꿔줘"라고 부탁하세요. 요소별 키워드는 쉼표로 구분해 나열하면 됩니다. 유창한 영어보다 **요소를 빠뜨리지 않는 것**이 훨씬 중요합니다.

> 💡 **핵심**: 프롬프트는 한 문장이 아니라 **주제→스타일→구도→조명→파라미터의 5층 설계도**입니다. 층을 나누는 순간 결과를 통제할 수 있게 됩니다.$aix$,
  $aix${"type":"stack","title":"프롬프트 5층 설계도","layers":[{"label":"주제 (Subject)","sublabel":"무엇을 — 가장 앞, 가장 구체적으로","icon":"target","tone":"primary"},{"label":"스타일 (Style)","sublabel":"화풍·매체·시대의 무드","icon":"palette","tone":"accent"},{"label":"구도 (Composition)","sublabel":"카메라 위치·앵글·여백","icon":"camera","tone":"accent"},{"label":"조명 (Lighting)","sublabel":"빛의 방향·시간대·분위기","icon":"sparkles","tone":"accent"},{"label":"파라미터 (Parameters)","sublabel":"--ar, --stylize 등 숫자 명령","icon":"settings","tone":"muted"}],"caption":"결과가 아쉬우면 전체를 다시 쓰지 말고, 문제가 있는 층 하나만 고치세요."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '98493055-1877-eee9-5cc7-3eec16c3d7b7', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/bad-vs-good-prompt', 'bad-vs-good-prompt', '나쁜 프롬프트 vs 좋은 프롬프트',
  $aix$같은 모델, 같은 요금제를 쓰는데도 결과가 하늘과 땅 차이인 이유는 단 하나 — **프롬프트에 담긴 정보량**입니다.

## 나쁜 프롬프트의 3가지 습관

- **모호한 형용사**: "예쁜", "멋진", "고퀄리티" — 사람마다 기준이 다르듯 모델마다 해석이 제각각입니다.
- **정보 없는 요청**: 주제만 있고 스타일·구도·조명이 없으면, 빠진 부분은 전부 운에 맡겨집니다.
- **한 번에 다 넣기**: 서로 충돌하는 키워드를 20개씩 나열하면 모델은 어중간한 평균을 내버립니다.

## 좋은 프롬프트로 고치는 법

- 형용사를 **시각적 사실**(눈에 보이는 그대로의 묘사)로 바꿉니다. "예쁜 카페" → "통유리창으로 오후 햇살이 드는 미니멀 카페".
- 5요소 체크: 주제 → 스타일 → 구도 → 조명 → 파라미터 순으로 빠진 층을 채웁니다.
- **빼기의 기술**: 원치 않는 요소는 "빼 달라"고 명시합니다. `--no text, watermark`라고 쓰면 글자와 워터마크가 빠집니다. AI는 시키지 않아도 글자를 그려 넣는 일이 잦아, 이 둘은 습관처럼 붙입니다.

## 실무 감각

프롬프트를 "주문서"라고 생각하세요. 카페에서 "맛있는 거 주세요"라고 하면 무엇이 나올지 모르지만, "아이스 라떼, 샷 추가, 얼음 적게"는 항상 같은 결과가 나옵니다.

## 직접 고쳐보기

"멋진 강아지 그림"을 5요소로 고쳐볼까요. 주제(골든리트리버 강아지), 스타일(수채화 일러스트), 구도(전신이 보이는 정면), 조명(부드러운 아침 햇살)을 채우면 — "골든리트리버 강아지, 수채화 일러스트, 전신 정면 구도, 부드러운 아침 햇살"이 됩니다. 이 습관이 들면 어떤 주제든 같은 방식으로 주문할 수 있습니다.

> 💡 **핵심**: 좋은 프롬프트 = 모호한 형용사를 **시각적 사실**로 바꾸고, 5요소의 빈칸을 채운 주문서입니다.$aix$,
  $aix${"type":"chat","title":"같은 요청, 다른 결과","messages":[{"role":"user","text":"예쁜 카페 그림 고퀄리티로 그려줘"},{"role":"ai","text":"(랜덤 스타일의 평범한 카페 4장 — 매번 다른 결과)"},{"role":"user","text":"미니멀 인테리어의 카페, 통유리창으로 드는 오후 햇살, 광각 인테리어 사진, 필름 톤 --ar 16:9 --no people, text"},{"role":"ai","text":"(의도한 무드·구도·비율이 재현된 4장 — 다시 뽑아도 방향 유지)"}],"caption":"모호한 형용사를 시각적 사실로 바꾸는 것이 프롬프트 개선의 90%입니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '409c53aa-3464-9b11-86b0-687f489f13bd', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/midjourney-parameters', 'midjourney-parameters', 'Midjourney 핵심 파라미터: --ar, --stylize, --sref',
  $aix$`--ar 16:9` 같은 코드를 처음 보면 암호처럼 느껴집니다. 하지만 정체는 단순합니다 — 각각이 **결과물의 한 가지 성질만 돌려서 조절하는 다이얼**입니다. 프롬프트가 '무엇을' 그릴지라면 파라미터는 '어떤 모양·강도로' 뽑을지이고, 항상 프롬프트 맨 뒤에 붙여 씁니다. 최신 Midjourney(V7 이후)에서 실무에 쓰는 다이얼은 몇 개 안 됩니다.

## 반드시 쓰는 3개

- `--ar 16:9` — **화면 비율(aspect ratio) 다이얼**. 가로:세로 모양을 정합니다. 웹 히어로는 16:9~21:9(TV처럼 넓게), SNS는 1:1(정사각형), 포스터는 2:3(세로).
- `--stylize 0~1000`(줄여서 `--s`) — **Midjourney가 멋을 부리는 정도**. 낮추면 쓴 대로 충실하게, 높이면 알아서 예술적으로 해석합니다. 기본값 100.
- `--sref [이미지 URL]` — **스타일 레퍼런스**. "이 이미지 느낌으로"라며 견본을 보여주는 것. 색감·질감·무드만 가져오고 내용은 프롬프트를 따릅니다. `--sw`로 반영 강도를 조절합니다.

## 상황별로 쓰는 것

- `--oref` — 옴니 레퍼런스(V7+). 특정 인물·캐릭터·사물을 새 장면에 등장시킵니다. 구버전의 `--cref`를 대체했습니다.
- `--seed` — 주사위 눈 고정. AI는 매번 다른 주사위를 굴리는데, 같은 시드 + 같은 프롬프트면 비슷한 결과가 다시 나옵니다.
- `--chaos`, `--weird` — 함께 나오는 4장이 서로 얼마나 다르고 엉뚱할지. 아이디어 탐색 단계에서만.
- `--raw` — 멋 부림을 끈 절제 모드. 사진·제품컷에 유리합니다.

> 💡 **핵심**: 탐색할 때는 `--chaos`를 올리고, 확정할 때는 `--seed`와 `--sref`로 고정하세요. **탐색과 고정의 다이얼은 다릅니다.**$aix$,
  $aix${"type":"terminal","windowTitle":"Midjourney — /imagine","lines":[{"text":"/imagine minimal cafe interior, afternoon light","tone":"cmd"},{"text":"  --ar 16:9 --stylize 200","tone":"cmd"},{"text":"4장 생성 완료 — 무드 탐색","tone":"ok"},{"text":"# 2번 이미지의 스타일이 마음에 듦 → 고정","tone":"comment"},{"text":"/imagine cozy bookstore interior","tone":"cmd"},{"text":"  --sref https://.../cafe-2.png --sw 300 --ar 16:9","tone":"cmd"},{"text":"같은 색감·무드의 서점 4장 생성","tone":"ok"},{"text":"# 내용은 바뀌고 스타일은 유지됨","tone":"comment"}],"caption":"--sref는 '내용'이 아니라 '스타일'만 이식합니다 — 시리즈 작업의 핵심 무기입니다."}$aix$::jsonb, $aix${"title":"Midjourney 웹에서 생성과 업스케일 따라하기","app":{"kind":"browser","url":"midjourney.com/imagine","blocks":[{"id":"mj-head","type":"heading","label":"Imagine"},{"id":"mj-prompt","type":"input","label":"프롬프트를 입력하세요…"},{"id":"mj-generate","type":"button","label":"Generate"},{"id":"mj-loading","type":"badge","label":"생성 중… 4장","hidden":true},{"id":"mj-img1","type":"card","label":"🖼 cafe-01 — 창가 구도","hidden":true},{"id":"mj-img2","type":"card","label":"🖼 cafe-02 — 필름 톤 ✓","hidden":true},{"id":"mj-img3","type":"card","label":"🖼 cafe-03 — 광각","hidden":true},{"id":"mj-img4","type":"card","label":"🖼 cafe-04 — 클로즈업","hidden":true},{"id":"mj-upscale","type":"button","label":"Upscale (Subtle)","hidden":true},{"id":"mj-final","type":"card","label":"✨ cafe-02-4K.png — 업스케일 완료","hidden":true}]},"actions":[{"t":"caption","text":"① 프롬프트 입력창을 클릭합니다"},{"t":"move","target":"mj-prompt"},{"t":"click"},{"t":"caption","text":"② 주제를 먼저 쓰고 파라미터는 뒤에 붙입니다"},{"t":"type","target":"mj-prompt","text":"minimal cafe interior --ar 16:9 --s 200"},{"t":"caption","text":"③ Generate를 눌러 4장을 생성합니다"},{"t":"move","target":"mj-generate"},{"t":"click"},{"t":"reveal","target":"mj-loading"},{"t":"wait","ms":700},{"t":"hide","target":"mj-loading"},{"t":"reveal","target":"mj-img1"},{"t":"reveal","target":"mj-img2"},{"t":"reveal","target":"mj-img3"},{"t":"reveal","target":"mj-img4"},{"t":"caption","text":"④ 무드가 잡힌 2번 컷을 선택합니다"},{"t":"move","target":"mj-img2"},{"t":"click"},{"t":"reveal","target":"mj-upscale"},{"t":"caption","text":"⑤ 충실형 업스케일로 4K 납품본을 만듭니다"},{"t":"move","target":"mj-upscale"},{"t":"click"},{"t":"reveal","target":"mj-final"},{"t":"move","target":"mj-final"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '326e1950-99e9-6b31-1d9e-1d5159bfea75', '66337546-a796-3c6f-a2da-e7cbd77cc4ec', 'ai-design/style-reference-moodboard', 'style-reference-moodboard', '무드보드에서 스타일 레퍼런스로',
  $aix$디자이너는 프롬프트를 쓰기 전에 무드보드부터 만듭니다. 2026년의 무드보드는 벽에 붙여 놓고 감상하는 콜라주가 아니라 **AI에게 직접 먹이는 입력값**입니다.

## 무드보드 → 프롬프트 워크플로우

1. **수집** — 원하는 느낌의 이미지를 10~20장 모읍니다. 핀터레스트, 예전 작업물, AI 생성물 어디서 가져와도 좋습니다.
2. **선별** — 색감·질감·조명이 서로 닮은 3~5장으로 좁힙니다. 이 단계에서 무드가 결정됩니다.
3. **언어화** — 남긴 이미지들의 공통점을 5요소의 말로 적어봅니다. 예: "저채도 파스텔, 필름 그레인(필름 사진 특유의 자글자글한 입자), 자연광".
4. **레퍼런스 연결** — `--sref`에 이미지를 걸고, 언어화한 키워드를 프롬프트에 함께 씁니다.

## 왜 이미지와 언어를 둘 다 쓰는가

- `--sref`만 쓰면 스타일은 잡히지만 **왜 그 스타일인지** 팀원에게 설명할 수 없습니다.
- 말로 정리한 키워드는 다른 도구(Stable Diffusion 등)로 옮길 때 그대로 들고 갈 수 있는 **이식 가능한 자산**이 됩니다.
- 무드보드 이미지 여러 장을 `--sref`로 섞어 나만의 스타일 코드를 만들 수도 있습니다.

## 초보가 막히기 쉬운 지점

- `--sref`에는 인터넷에서 접근 가능한 이미지 주소(URL)가 필요합니다. 내 컴퓨터의 파일은 Midjourney 웹 화면에 끌어다 놓으면 업로드되며 주소가 생깁니다.
- 견본들의 무드가 서로 다르면 결과도 이도 저도 아니게 섞입니다. 선별 단계에서 과감히 버리는 것이 요령입니다.
- 결과가 견본과 너무 똑같이 나오면 `--sw` 값을 낮춰 반영 강도를 줄이세요.

> 💡 **핵심**: 무드보드는 감상용 콜라주가 아니라 **수집→선별→언어화→레퍼런스 연결**로 이어지는 스타일 파이프라인의 첫 단계입니다.$aix$,
  $aix${"type":"steps","title":"무드보드 → 스타일 레퍼런스 4단계","steps":[{"label":"수집","sublabel":"무드에 맞는 이미지 10~20장","icon":"search"},{"label":"선별","sublabel":"색감·질감이 일관된 3~5장","icon":"filter"},{"label":"언어화","sublabel":"공통점을 5요소 키워드로","icon":"file-text"},{"label":"레퍼런스 연결","sublabel":"--sref + 키워드로 생성","icon":"wand"}],"caption":"언어화 단계를 건너뛰면 스타일을 다른 도구·팀원에게 이식할 수 없습니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '64966b79-ff83-089d-7a42-699e24fe23c2', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/controlnet-basics', 'controlnet-basics', 'ControlNet: 포즈와 구도를 못 박는 법',
  $aix$프롬프트만으로는 "왼손을 든 캐릭터"를 정확히 만들 수 없습니다. 포즈나 구도를 말로 1mm 단위까지 지시할 수는 없기 때문입니다. **구조를 통제하려면 구조를 그림으로 입력**해야 합니다 — 그것이 ControlNet입니다.

## ControlNet의 원리

Stable Diffusion은 원래 텍스트만 보고 그립니다. ControlNet은 여기에 **조건 이미지**를 추가로 꽂아 주는 보조 장치입니다. 종이에 밑그림을 깔아 두고 그 위에만 그리게 하는 것과 같습니다.

- 먼저 입력 이미지에서 **구조 정보만 추출**합니다 — 뼈대, 윤곽선, 깊이. 이 손질 단계를 '전처리'라고 부릅니다.
- 추출된 구조를 생성 과정에 **강제 조건**으로 겁니다.
- 결과: 포즈·구도는 입력 이미지를 따르고, 화풍·내용은 프롬프트를 따릅니다.

## 대표 전처리기 3종

- **OpenPose** — 사람의 관절 뼈대만 추출합니다. 포즈 복제의 표준.
- **Depth** — 사물의 멀고 가까움(깊이) 정보로 공간 배치·원근을 고정합니다. 배경·인테리어에 강력.
- **Canny/Lineart** — 윤곽선을 고정합니다. 로고, 제품 형태 유지에 사용.

처음에는 OpenPose 하나만 익혀도 충분합니다. 인물 작업에서 부딪히는 문제의 대부분이 포즈이기 때문입니다.

## 2026년 실무 환경

ComfyUI(노드를 이어 붙여 만드는 Stable Diffusion 작업 도구)가 사실상 표준 작업대이며, SDXL·FLUX 계열 모델에도 같은 개념의 컨트롤 어댑터가 제공됩니다. 도구가 바뀌어도 **"구조 추출 → 조건 주입"** 원리는 동일합니다.

> 💡 **핵심**: 프롬프트는 '내용'을, ControlNet은 '구조'를 담당합니다. 이 분업을 이해하면 우연이 아니라 **설계로** 그림을 만들 수 있습니다.$aix$,
  $aix${"type":"flow","title":"ControlNet 파이프라인","nodes":[{"label":"레퍼런스 이미지","sublabel":"원하는 포즈·구도의 사진","icon":"image","tone":"muted"},{"label":"전처리기","sublabel":"OpenPose · Depth · Canny","icon":"scissors","tone":"accent","edgeLabel":"구조만 추출"},{"label":"ControlNet + 프롬프트","sublabel":"구조는 조건으로, 내용은 텍스트로","icon":"layers","tone":"primary","edgeLabel":"조건 주입"},{"label":"결과 이미지","sublabel":"포즈 고정 + 새로운 화풍","icon":"sparkles","tone":"success"}],"caption":"구조(뼈대)와 내용(살)을 분리해서 입력하는 것이 ControlNet의 전부입니다."}$aix$::jsonb, $aix${"title":"ControlNet 포즈 고정 생성 따라하기","app":{"kind":"browser","url":"localhost:8188/controlnet","blocks":[{"id":"cn-head","type":"heading","label":"ControlNet — 구조는 이미지로, 내용은 텍스트로"},{"id":"cn-upload","type":"button","label":"📤 포즈 레퍼런스 업로드"},{"id":"cn-pose","type":"card","label":"🧍 pose-ref.jpg — 왼손을 든 포즈","hidden":true},{"id":"cn-prep","type":"button","label":"전처리기: OpenPose"},{"id":"cn-skeleton","type":"card","label":"🦴 skeleton.png — 뼈대만 추출됨","hidden":true},{"id":"cn-prompt","type":"input","label":"프롬프트를 입력하세요…"},{"id":"cn-generate","type":"button","label":"Generate"},{"id":"cn-result","type":"card","label":"🎨 결과 — 수채화 기사, 포즈는 그대로","hidden":true},{"id":"cn-badge","type":"badge","label":"✓ 구조 일치 — 포즈 고정 성공","hidden":true}]},"actions":[{"t":"caption","text":"① 원하는 포즈의 레퍼런스를 업로드합니다"},{"t":"move","target":"cn-upload"},{"t":"click"},{"t":"reveal","target":"cn-pose"},{"t":"wait","ms":500},{"t":"caption","text":"② OpenPose 전처리기로 뼈대만 추출합니다"},{"t":"move","target":"cn-prep"},{"t":"click"},{"t":"reveal","target":"cn-skeleton"},{"t":"wait","ms":600},{"t":"caption","text":"③ 내용은 프롬프트로 씁니다 — 화풍과 주제"},{"t":"move","target":"cn-prompt"},{"t":"click"},{"t":"type","target":"cn-prompt","text":"watercolor knight, dramatic light"},{"t":"caption","text":"④ 생성합니다 — 구조는 조건, 내용은 텍스트"},{"t":"move","target":"cn-generate"},{"t":"click"},{"t":"reveal","target":"cn-result"},{"t":"wait","ms":500},{"t":"reveal","target":"cn-badge"},{"t":"caption","text":"⑤ 포즈는 그대로, 화풍만 바뀌었습니다"},{"t":"move","target":"cn-result"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e495d9c9-ab2c-9d50-9d88-8c8f2713005e', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/consistent-character', 'consistent-character', '일관된 캐릭터 만들기: 시트·시드·레퍼런스',
  $aix$웹툰, 브랜드 마스코트, 게임 일러스트의 공통 난제 — "다음 컷에서도 같은 얼굴"입니다. AI는 매번 처음부터 새로 그리기 때문에, 그냥 두면 얼굴이 계속 바뀝니다. 한 장의 행운을 **반복 가능한 시스템**으로 바꿔봅니다.

## 캐릭터 일관성 루프

1. **베이스 생성** — 외모를 말로 빠짐없이 적습니다(머리색, 눈, 의상, 체형). 이 서술문이 캐릭터의 '주민등록증'입니다.
2. **베스트 컷 선별** — 생성된 이미지 중 캐릭터다움이 가장 잘 드러난 1장을 고릅니다. 여러 장을 나란히 놓고 비교하면 고르기 쉽습니다.
3. **캐릭터 시트 제작** — 그 이미지를 참고로 정면·측면·표정 변화를 한 화면에 뽑습니다. 프롬프트에 character sheet, multiple views를 씁니다.
4. **레퍼런스 등록 후 재생성** — Midjourney는 `--oref`(옴니 레퍼런스)에 시트를 걸고, Stable Diffusion은 IP-Adapter(참고 이미지를 조건으로 꽂아 주는 장치)나 캐릭터 LoRA를 학습시켜 새 장면을 만듭니다.

새 장면에서 잘 나온 컷은 다시 시트에 추가합니다 — 돌수록 캐릭터가 단단해지는 루프입니다. 웹툰처럼 컷이 많은 작업일수록 이 루프의 효과가 큽니다.

## 보조 장치

- **시드 고정**: 같은 `--seed`를 쓰면 "의상만 바꾸기"처럼 한 가지 변수만 바꾸는 실험이 가능해집니다.
- **서술문 재사용**: 레퍼런스 이미지가 있어도 외모 서술문은 항상 함께 씁니다. 이미지와 텍스트가 서로를 보강합니다.
- **시트 배경 비우기**: 시트의 배경은 단색으로 둡니다. 배경이 복잡하면 레퍼런스가 캐릭터만이 아니라 배경까지 따라 하려고 합니다.

> 💡 **핵심**: 캐릭터 일관성은 한 번의 프롬프트가 아니라 **생성→선별→시트화→레퍼런스 재투입**을 반복하는 루프에서 나옵니다.$aix$,
  $aix${"type":"cycle","title":"캐릭터 일관성 루프","center":"돌수록 캐릭터가 단단해짐","nodes":[{"label":"베이스 생성","sublabel":"외모를 완전히 언어화","icon":"user"},{"label":"베스트 컷 선별","sublabel":"정체성이 가장 또렷한 1장","icon":"eye"},{"label":"캐릭터 시트화","sublabel":"정면·측면·표정 모음","icon":"clipboard"},{"label":"레퍼런스 재투입","sublabel":"--oref · LoRA로 새 장면","icon":"refresh"}],"caption":"새 장면의 좋은 컷을 다시 시트에 추가하면 일관성이 누적됩니다."}$aix$::jsonb, null, 7, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b0c53e8f-1da6-fbff-00fd-090b7a917a28', 'ef9d1973-62ed-7dac-3251-51b5ac3dc553', 'ai-design/upscale-pipeline', 'upscale-pipeline', '업스케일과 후보정: 뽑고 끝이 아니다',
  $aix$AI가 처음 내놓는 이미지는 '시안'(검토용 초안)일 뿐입니다. 촬영을 마쳤다고 사진이 완성되는 게 아니듯, 상업용 퀄리티는 **생성 이후의 파이프라인**에서 만들어집니다. 생성의 몇 초보다 후보정의 몇 분이 프로와 아마추어를 가릅니다.

## 표준 후보정 파이프라인

- **1단계 — 결점 수리(인페인팅)**: 이상한 손가락, 눈, 어긋난 디테일이 있는 부분만 지우고 그 자리만 다시 그리게 합니다. 전체를 다시 뽑는 것보다 훨씬 경제적입니다.
- **2단계 — 업스케일**: 1~2K 원본을 4K 이상으로 키웁니다. Midjourney 내장 Upscale, Real-ESRGAN 계열, Magnific·Topaz 같은 디테일 생성형 업스케일러를 용도에 맞게 선택합니다.
- **3단계 — 톤 보정**: 시리즈 전체의 색 온도·대비를 통일합니다. 포토샵/라이트룸에서 같은 프리셋(저장해 둔 보정값 묶음)을 일괄 적용합니다.
- **4단계 — 포맷 최적화**: 웹용이면 WebP/AVIF(용량이 작은 웹용 이미지 형식) 변환과 압축까지 마쳐야 납품입니다.

## 업스케일러 선택 기준

- **충실형**(원본 유지): 사진·인물에 사용 — 없던 디테일을 지어내지 않아 안전합니다.
- **창작형**(디테일 생성): 일러스트·배경에 사용 — 질감을 새로 그려 넣어 화려하지만, 얼굴이 변형될 수 있어 인물엔 주의가 필요합니다.

## 초보 팁 — 순서를 지키세요

반드시 수리(1단계)를 끝낸 뒤에 업스케일하세요. 키운 다음 결점을 발견하면 훨씬 큰 파일을 다시 고쳐야 해서 시간이 배로 듭니다. 그리고 웹에 올릴 이미지를 무작정 8K까지 키울 필요는 없습니다 — 실제로 쓰일 크기의 2배 정도면 충분합니다.

> 💡 **핵심**: 생성은 시작일 뿐입니다. **수리→업스케일→톤 통일→포맷 최적화**까지 마쳐야 상업용 결과물입니다.$aix$,
  $aix${"type":"flow","title":"생성 이후 후보정 파이프라인","nodes":[{"label":"원본 생성물","sublabel":"1~2K 시안","icon":"image","tone":"muted"},{"label":"인페인팅 수리","sublabel":"손·눈·디테일만 부분 재생성","icon":"wrench","tone":"accent"},{"label":"업스케일","sublabel":"충실형 vs 창작형 선택","icon":"trending-up","tone":"primary"},{"label":"톤 통일 + 포맷 최적화","sublabel":"시리즈 프리셋 · WebP/AVIF","icon":"check","tone":"success"}],"caption":"인물은 충실형, 배경·일러스트는 창작형 업스케일러가 기본 선택입니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ef7d39a5-502e-888e-3fe6-5f857d4c1737', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/web-asset-workflow', 'web-asset-workflow', '웹 디자인 에셋 제작: 히어로·아이콘·배경',
  $aix$실무에서 AI 디자인의 최대 수요처는 웹사이트입니다. 에셋 종류마다 **쓰이는 자리와 요구 조건이 다르므로, 프롬프트 전략도 달라야** 합니다.

## 에셋별 제작 전략

- **히어로 이미지**(사이트 첫 화면의 큰 대표 이미지) — `--ar 21:9` 같은 와이드 비율로 생성하고, **글자가 올라갈 빈 공간**(negative space)을 프롬프트에 명시합니다. 피사체는 한쪽에 치우치게 둡니다.
- **아이콘 세트** — 한 장에 한 아이콘씩, 같은 `--sref`(또는 시드)로 시리즈를 뽑아 스타일을 통일합니다. 작게 줄여도 알아볼 수 있는 단순한 형태가 유리합니다.
- **배경/패턴** — `tile` 옵션이나 반복 패턴 프롬프트로, 벽지처럼 이어 붙여도 이음새가 안 보이는(seamless) 텍스처를 만듭니다. 색 대비를 낮게 뽑아야 위에 올라갈 글·버튼을 방해하지 않습니다.
- **일러스트 스팟** — "아직 데이터가 없어요" 같은 빈 화면이나 온보딩 안내용 삽화. 캐릭터 레퍼런스로 시리즈 일관성을 유지합니다.

처음이라면 히어로 이미지부터 연습하세요. 한 장으로 결과가 바로 보이고, 프롬프트에 "empty space on the right side"처럼 빈 공간의 위치까지 적는 감각을 가장 빨리 익힐 수 있습니다.

## 납품 전 체크

- 실제 페이지에 얹어 보고 **글자가 잘 읽히는지** 확인합니다. 어두운 화면(다크 모드)에서도 한 번 봐 두면 좋습니다.
- 모바일 세로 화면으로 잘렸을 때도 괜찮은지 봅니다 — 중요한 피사체가 잘리면 안 됩니다.
- 파일은 용도별 해상도 + WebP/AVIF로 정리합니다.

> 💡 **핵심**: 웹 에셋은 '예쁜 그림'이 아니라 **글자 여백, 축소해도 버티는 형태, 낮은 대비, 모바일 크롭**이라는 제약 조건을 통과한 그림입니다.$aix$,
  $aix${"type":"grid","title":"웹 에셋 4종과 핵심 제약","items":[{"label":"히어로 이미지","sublabel":"와이드 비율 + 텍스트 여백","icon":"monitor","tone":"primary"},{"label":"아이콘 세트","sublabel":"같은 sref로 시리즈 통일","icon":"zap","tone":"accent"},{"label":"배경·패턴","sublabel":"이음새 없음 + 저대비","icon":"layers","tone":"muted"},{"label":"스팟 일러스트","sublabel":"캐릭터 레퍼런스로 일관성","icon":"smartphone","tone":"success"}],"caption":"에셋 종류가 바뀌면 비율·대비·여백 등 제약 조건부터 다시 정의하세요."}$aix$::jsonb, $aix${"title":"디자인 에디터에서 히어로 섹션 조립 따라하기","app":{"kind":"design-canvas","windowTitle":"landing-hero — Figma","tools":[{"id":"tool-frame","icon":"layers","label":"프레임"},{"id":"tool-image","icon":"image","label":"이미지"},{"id":"tool-text","icon":"file-text","label":"텍스트"},{"id":"tool-rect","icon":"target","label":"사각형"}],"objects":[{"id":"frame-hero","shape":"frame","label":"Hero 1440×600","x":6,"y":8,"w":88,"h":58},{"id":"img-hero","shape":"image","label":"AI 히어로 이미지 (21:9 생성물)","x":9,"y":13,"w":42,"h":48,"hidden":true},{"id":"text-head","shape":"text","label":"AI로 디자인을 10배 빠르게","x":56,"y":18,"w":34,"h":10,"hidden":true},{"id":"text-sub","shape":"text","label":"프롬프트 템플릿으로 팀 톤 유지","x":56,"y":32,"w":32,"h":8,"hidden":true},{"id":"btn-cta","shape":"rect","label":"시작하기","x":56,"y":46,"w":16,"h":9,"color":"#f59e0b","hidden":true}]},"actions":[{"t":"caption","text":"① 21:9 와이드 히어로 프레임을 확인합니다"},{"t":"move","target":"frame-hero"},{"t":"click"},{"t":"caption","text":"② 이미지 툴로 AI 생성 히어로를 배치합니다"},{"t":"move","target":"tool-image"},{"t":"click"},{"t":"drag","from":"frame-hero","to":"img-hero"},{"t":"reveal","target":"img-hero"},{"t":"wait","ms":500},{"t":"caption","text":"③ 비워둔 여백에 헤드라인을 올립니다"},{"t":"move","target":"tool-text"},{"t":"click"},{"t":"type","target":"text-head","text":"AI로 디자인을 10배 빠르게"},{"t":"type","target":"text-sub","text":"프롬프트 템플릿으로 팀 톤 유지"},{"t":"caption","text":"④ 사각형 툴로 CTA 버튼을 그립니다"},{"t":"move","target":"tool-rect"},{"t":"click"},{"t":"drag","from":"text-sub","to":"btn-cta"},{"t":"reveal","target":"btn-cta"},{"t":"caption","text":"⑤ 텍스트 가독성과 여백 균형을 확인합니다"},{"t":"move","target":"img-hero"},{"t":"move","target":"text-head"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '50b3228d-84d2-6f21-d0e8-77bf6cbe99bf', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/brand-consistency', 'brand-consistency', '브랜드 일관성: 스타일 시스템으로 굳히기',
  $aix$에셋 하나하나가 훌륭해도 서로 따로 놀면 브랜드가 무너집니다. 프랜차이즈 카페가 어느 지점에서나 같은 맛을 내는 비결이 개인의 손맛이 아니라 레시피이듯, 해법은 재능이 아니라 **시스템**입니다.

## 브랜드 스타일 시스템의 3요소

- **스타일 코드** — 확정된 무드보드 이미지들을 `--sref`용 고정 레퍼런스로 저장합니다. 새로 만드는 모든 에셋은 이 레퍼런스를 거쳐야 합니다.
- **프롬프트 템플릿** — 브랜드 공통 키워드(색감·질감·조명)를 템플릿으로 만들고, 에셋마다 주제만 갈아 끼웁니다. 팀원 누가 뽑아도 같은 톤이 나옵니다.
- **컬러 후처리 프리셋** — 생성 후 브랜드 색으로 보정하는 프리셋(저장해 둔 보정값)을 팀에 공유합니다. AI가 내는 색은 매번 미세하게 흔들리므로, 마지막은 항상 후처리로 잠급니다.

## 운영 규칙

- 템플릿과 레퍼런스에 **버전 번호**를 붙여 관리합니다 — "v3 스타일로 뽑아주세요" 같은 대화가 가능해집니다.
- 새 스타일 실험은 별도 폴더로 분리해 두고, 확정된 것만 템플릿에 반영합니다.
- 분기마다 전체 에셋을 한 화면에 모아 놓고 튀는 것이 없는지 **일관성 점검**을 합니다. 튀는 에셋은 템플릿으로 다시 뽑아 교체합니다.

## 1인 팀이라도 필요합니다

혼자 작업해도 석 달 뒤의 나는 남입니다. 오늘 쓴 프롬프트와 레퍼런스를 문서 하나에 정리해 두면, 다음에 에셋을 추가할 때 그 문서가 팀 역할을 합니다. 템플릿 예시: "[주제], 따뜻한 베이지 톤, 부드러운 자연광, 미니멀 일러스트" — 대괄호 부분만 갈아 끼우면 됩니다. 이 문서 한 장이 곧 우리 브랜드의 레시피입니다.

> 💡 **핵심**: 브랜드 일관성 = **고정 레퍼런스 + 프롬프트 템플릿 + 후처리 프리셋**. 개인의 감각을 팀의 시스템으로 바꾸는 것이 프로의 방식입니다.$aix$,
  $aix${"type":"compare","title":"그때그때 생성 vs 스타일 시스템","columns":[{"title":"그때그때 생성","icon":"alert","tone":"warning","items":["에셋마다 프롬프트를 새로 작성","담당자마다 다른 톤","색감이 페이지마다 미묘하게 다름","리뉴얼 때 전부 다시 제작"]},{"title":"스타일 시스템","icon":"layers","tone":"primary","items":["고정 sref + 프롬프트 템플릿","누가 뽑아도 같은 브랜드 톤","후처리 프리셋으로 색을 잠금","템플릿 버전만 올리면 갱신 끝"]}],"caption":"감각은 사람에게, 일관성은 시스템에 맡기세요."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '91c5ce2a-3183-976b-e0a3-3eb2fdcba440', '925616d8-fab8-ca22-f82c-b65f57952332', 'ai-design/license-and-copyright', 'license-and-copyright', '상업적 이용: 라이선스와 저작권 (2026년 기준)',
  $aix$상업 프로젝트에서 가장 비싼 실수는 그림 실력이 아니라 **법적 검토 누락**에서 나옵니다. 어렵게 느껴져도 체크리스트로 만들면 어렵지 않습니다. 2026년 기준으로 반드시 확인할 것들을 정리합니다.

## 도구별 이용 조건 확인

- **Midjourney**: 유료 플랜이면 상업적 이용이 가능합니다. 단, 연 매출 100만 달러 이상 기업은 상위 플랜 가입이 조건입니다.
- **Stable Diffusion 계열**: 모델마다 라이선스가 다릅니다. 자유롭게 쓸 수 있는 오픈 라이선스 모델과 연구용(비상업) 모델이 섞여 있으므로, **내가 쓰는 모델·LoRA의 라이선스를 하나하나 확인**해야 합니다.

## 2026년 규제 동향

- **미국**: 저작권청 방침상 AI가 단독 생성한 이미지는 저작권 보호를 받지 못합니다. 사람의 **창작적 기여**(구체적 편집·합성·가공)가 있어야 그 부분에 한해 보호됩니다.
- **EU**: AI Act에 따라 AI 생성 콘텐츠임을 표시하는 **투명성 의무**가 단계적으로 적용 중입니다.
- **한국**: 2026년 1월 시행된 AI 기본법에 따라 생성형 AI 산출물 **표시 의무**가 도입되었습니다.

## 실무 안전 수칙

- 생존 작가의 이름, 특정 캐릭터, 로고를 프롬프트에 쓰지 않습니다 — 상표권·퍼블리시티권(유명인의 얼굴·이름을 상업적으로 이용할 권리) 분쟁의 지름길입니다.
- 프롬프트·생성 일시·사용 모델을 **기록으로 남깁니다**. 분쟁이 생겼을 때 사람이 기여했음을 입증하는 자료가 됩니다.
- 클라이언트 작업이라면 AI 사용 사실을 계약 단계에서 미리 알립니다. 나중에 알려지는 것보다 훨씬 안전합니다.

> 💡 **핵심**: "생성 가능"과 "상업적으로 안전"은 다릅니다. **플랜·모델 라이선스 확인 + 인간 기여 + 표시 의무 + 기록 보관**이 2026년의 4대 안전장치입니다.$aix$,
  $aix${"type":"grid","title":"상업 이용 전 4대 체크포인트","items":[{"label":"플랜·모델 라이선스","sublabel":"유료 플랜 조건 · 모델별 확인","icon":"key","tone":"primary"},{"label":"인간의 창작적 기여","sublabel":"편집·합성 없인 저작권 없음","icon":"user","tone":"accent"},{"label":"AI 생성물 표시","sublabel":"EU AI Act · 한국 AI 기본법","icon":"alert","tone":"warning"},{"label":"기록 보관","sublabel":"프롬프트·모델·일시 증빙","icon":"clipboard","tone":"success"},{"label":"타인 IP 배제","sublabel":"작가명·캐릭터·로고 금지","icon":"shield","tone":"warning"},{"label":"계약서 명시","sublabel":"클라이언트에 AI 사용 고지","icon":"file-text","tone":"muted"}],"caption":"네 가지 안전장치에 'IP 배제'와 '고지'까지 더하면 실무 체크리스트가 완성됩니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 프로덕트 디자인: Figma 실전 워크플로우
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '3b0ae812-43f2-7c2a-c5a3-9dcb36be3a9c', 'figma-product-design', 'AI 프로덕트 디자인: Figma 실전 워크플로우', $aix$2026년의 프로덕트 디자인은 와이어프레임을 그리는 일이 아니라, AI가 만든 초안을 판단하고 시스템으로 다듬는 일이 됐습니다. 이 강의에서는 Figma의 AI 에이전트·Figma Make·Dev Mode MCP 서버 같은 최신 기능으로 아이디어에서 동작 프로토타입까지 직행하는 워크플로우를 익히고, 디자인 시스템 정리·네이밍·문서화 자동화, 디자인→코드 핸드오프 도구들의 현실적 품질, 그리고 인터뷰 전사·태깅·사용성 분석까지 — 프로덕트 디자이너의 하루 전체를 AI와 함께 재설계합니다.$aix$,
  null, 'creative', 'intermediate', array['Figma', '프로덕트 디자인', '디자인 시스템', 'UX 리서치', '코드 핸드오프']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '9eca39a0-9bfd-419c-9320-5698b6db4aa9', '3b0ae812-43f2-7c2a-c5a3-9dcb36be3a9c', 'workflow-shift', '디자인 워크플로우의 변화', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'e7521ecc-332b-9a8a-a17d-bfba3db9c156', '3b0ae812-43f2-7c2a-c5a3-9dcb36be3a9c', 'hands-on-workflow', '실전 워크플로우', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '354e435d-32ba-67e2-c6d3-b58bf9c0c412', '3b0ae812-43f2-7c2a-c5a3-9dcb36be3a9c', 'ux-research-collab', 'UX 리서치와 협업', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9fc0434e-5cd8-3177-efaf-cf4c7f695d99', '9eca39a0-9bfd-419c-9320-5698b6db4aa9', 'figma-product-design/ai-design-cycle', 'ai-design-cycle', '와이어프레임 건너뛰기: 짧아진 디자인 사이클',
  $aix$와이어프레임 2주, 목업 2주, 프로토타입 1주 — 오랫동안 디자인은 이 순서를 하나씩 밟았습니다. 이 흐름이 지금 무너지고 있습니다. 2026년의 디자이너는 **아이디어에서 '동작하는 프로토타입'으로 직행**합니다.

## 무엇이 달라졌나

- 예전: 뼈대만 그린 와이어프레임 → 색·글꼴까지 입힌 목업(실물처럼 꾸민 화면 그림) → 클릭 프로토타입 → 개발 전달. 단계가 바뀔 때마다 처음부터 다시 그렸습니다.
- 지금: 원하는 화면을 글로 설명하면 몇 분 만에 초안이 나옵니다. 그 초안을 곧바로 **실제로 눌러볼 수 있는 프로토타입**으로 만들어 사용자 앞에 놓습니다.

## 왜 이게 큰 변화인가

- 검증이 빨라집니다 — "이 흐름이 맞나?"를 그림이 아니라 **직접 눌러보는 동작**으로 확인합니다.
- 버리는 비용이 싸집니다 — 초안 10개를 만들고 9개를 버려도 반나절이면 됩니다.
- 대신 **고르는 눈**이 중요해집니다. 초안 10개 중 어느 것이 사용자의 문제를 푸는지 판단하는 능력이 디자이너의 핵심 역량이 됐습니다.

## 사라지지 않는 것

문제 정의, 정보 구조(화면과 메뉴를 어떻게 나눌지 정하는 일), 디자인 시스템, 그리고 취향 — AI는 화면을 그려주지만 **무엇을 만들지는 정해주지 않습니다**.

> 💡 **핵심**: 사이클이 짧아진 만큼 디자이너의 무게중심은 '그리기'에서 **'판단하고 다듬기'**로 이동했습니다. 이 강의 전체가 그 새 무게중심을 다룹니다.$aix$,
  $aix${"type":"compare","title":"기존 사이클 vs AI 사이클","columns":[{"title":"기존 (직렬 공정)","icon":"clock","tone":"muted","items":["와이어프레임 → 목업 → 프로토타입","단계마다 다시 그리기","검증까지 몇 주 소요","초안을 버리는 비용이 큼"]},{"title":"AI 사이클 (직행)","icon":"zap","tone":"primary","items":["프롬프트 → 동작 프로토타입 직행","초안 10개 생성, 9개 폐기","당일 사용자 검증 가능","판단·다듬기에 시간 집중"]}],"caption":"그리는 시간이 줄어든 자리를 '판단하는 시간'이 채웁니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b4ad73dc-1703-36fb-d7dd-20f3a5671062', '9eca39a0-9bfd-419c-9320-5698b6db4aa9', 'figma-product-design/figma-ai-landscape', 'figma-ai-landscape', 'Figma AI 지형도: 무엇이 어디까지 되는가',
  $aix$도구가 어디까지 되는지 정확히 알아야 지나친 기대도, 지나친 의심도 하지 않습니다. 그 전에 Figma 화면부터 잠깐 봅시다. 파일을 처음 열면 가운데에 넓은 작업 공간(캔버스)이 있고, **왼쪽 패널**에는 화면 속 요소들의 목록, **오른쪽 패널**에는 색·크기 같은 속성이 보입니다. 도구 막대는 **화면 아래 가운데**에 떠 있습니다. 이 지도 위에 2026년 중반 기준 AI 기능을 얹어 봅니다.

## 캔버스 안의 AI

- **First Draft** — 만들고 싶은 화면을 글로 설명하면 레이아웃을 그려줍니다. 아래 도구 막대의 **Actions 버튼**에서 시작합니다. 연결된 디자인 시스템이 있으면 그 컴포넌트를 사용합니다. 2026년 5월부터는 **AI 에이전트가 First Draft의 새 진입점**이 됐습니다.
- **Figma AI 에이전트 (베타)** — 2026년 5월 20일 베타 공개. "버튼을 전부 우리 브랜드 색으로 바꿔줘"처럼 말로 시키면 디자인을 만들고 고쳐줍니다. 컴포넌트와 레이아웃 구조를 이해한 채 고치는 **컴포넌트 인지형 편집**이 특징입니다.
- **Make an image / 이미지 편집** — 캔버스 안에서 이미지를 만들고 바꿉니다.

## 캔버스 밖으로

- **Figma Make** — 프롬프트로 **실제로 눌러볼 수 있는 앱/프로토타입**을 만듭니다 (2025년 Config 공개). 팀 라이브러리(팀이 공유하는 컴포넌트 모음)를 연결하면 우리 시스템의 색·글꼴·컴포넌트가 적용됩니다.
- **Dev Mode MCP 서버** — 디자인 정보(요소의 계층 구조·색과 간격 값·컴포넌트 이름)를 AI 코딩 도구에 직접 전달합니다. Dev Mode는 도구 막대 오른쪽 끝의 `</>` 스위치로 켭니다.
- **Code Connect** — 디자인 속 컴포넌트와 개발자가 쓰는 실제 코드 컴포넌트를 짝지어 줍니다.

> 💡 **핵심**: "초안 생성(에이전트) → 동작 프로토타입(Make) → 코드 전달(MCP·Code Connect)" — 이 세 축이 이후 모든 레슨의 뼈대입니다.$aix$,
  $aix${"type":"grid","title":"Figma AI 기능 지도 (2026)","items":[{"label":"AI 에이전트","sublabel":"자연어 생성·수정 (2026.5 베타)","icon":"bot","tone":"primary"},{"label":"First Draft","sublabel":"텍스트 → 화면 레이아웃","icon":"sparkles","tone":"primary"},{"label":"Figma Make","sublabel":"프롬프트 → 동작 프로토타입","icon":"play","tone":"accent"},{"label":"Dev Mode MCP 서버","sublabel":"디자인 데이터 → AI 코딩 도구","icon":"link","tone":"success"},{"label":"Code Connect","sublabel":"디자인 ↔ 실제 코드 연결","icon":"code","tone":"success"},{"label":"이미지 생성·편집","sublabel":"캔버스 안 에셋 작업","icon":"image","tone":"muted"}],"caption":"초안 생성 → 동작 프로토타입 → 코드 전달, 세 축으로 기억하세요."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e370d0f3-ed69-6de9-6aca-f9f28af518a0', '9eca39a0-9bfd-419c-9320-5698b6db4aa9', 'figma-product-design/prompt-ui-limits', 'prompt-ui-limits', '프롬프트로 UI 초안 만들기, 그리고 그 한계',
  $aix$프롬프트 한 줄로 화면이 나옵니다. 하지만 그 화면을 **그대로 쓰면 안 되는 이유**를 아는 것이 이 강의의 출발점입니다.

## 좋은 UI 프롬프트의 구조

세 가지를 순서대로 적으면 됩니다.

- **화면의 목적** — "운동 앱의 주간 리포트 화면"
- **꼭 들어갈 요소** — "주간 걸음 수 차트, 최근 운동 리스트, 목표 달성 배지"
- **맥락과 톤** — "모바일, 미니멀, 우리 라이브러리 컴포넌트 사용"

요소를 구체적으로 나열할수록 초안의 쓸모가 올라갑니다. "예쁜 대시보드 만들어줘"는 예쁜 쓰레기를 만듭니다.

## AI 초안의 전형적인 한계

- **시스템 이탈** — 라이브러리를 연결하지 않으면 어디서 본 듯한 범용 컴포넌트로 채워집니다. 색·간격·버튼이 우리 제품과 미묘하게 다릅니다.
- **평균의 함정** — AI는 학습한 '무난한 패턴'으로 되돌아갑니다. 남들과 다른 인터랙션은 알아서 나오지 않습니다.
- **예외 상황 누락** — 목록이 비었을 때, 에러가 났을 때, 텍스트가 아주 길 때의 화면은 사람이 챙겨야 합니다.

## 그래서 워크플로우는

**생성은 AI, 고르고 시스템에 맞추는 일은 사람.** 초안을 받으면 우리 디자인 시스템의 컴포넌트로 바꿔 끼우고, 간격·글자 크기를 팀 규칙에 맞춥니다 — 아래 데모에서 직접 해봅니다.

> 💡 **핵심**: AI 초안은 주니어가 잡아준 러프 스케치입니다. **취향과 시스템은 여전히 사람의 몫**입니다.$aix$,
  $aix${"type":"chat","title":"나쁜 프롬프트 vs 좋은 프롬프트","messages":[{"role":"user","text":"예쁜 대시보드 만들어줘"},{"role":"ai","text":"(어디서 본 듯한 범용 대시보드 — 우리 제품과 무관한 색과 컴포넌트)"},{"role":"user","text":"운동 앱 주간 리포트 화면. 주간 걸음 수 차트, 최근 운동 리스트, 목표 배지 포함. 모바일, 우리 라이브러리 컴포넌트 사용"},{"role":"ai","text":"(요소·맥락이 반영된 초안 — 이제 사람이 시스템에 맞게 다듬을 차례)"}],"caption":"목적 + 필수 요소 + 맥락. 초안의 품질은 프롬프트의 구체성에 비례합니다."}$aix$::jsonb, $aix${"title":"AI 초안을 디자인 시스템에 맞게 정리 따라하기","app":{"kind":"design-canvas","windowTitle":"체크아웃 화면 초안 — Figma","tools":[{"id":"tool-select","icon":"target","label":"선택"},{"id":"tool-frame","icon":"layers","label":"프레임"},{"id":"tool-text","icon":"file-text","label":"텍스트"},{"id":"tool-ai","icon":"sparkles","label":"AI"}],"objects":[{"id":"frame-draft","shape":"frame","label":"Checkout — AI 초안","x":6,"y":8,"w":56,"h":84},{"id":"txt-title","shape":"text","label":"주문 확인","x":10,"y":14,"w":28,"h":6},{"id":"rect-form","shape":"rect","x":10,"y":24,"w":48,"h":26,"color":"#e5e7eb"},{"id":"rect-form2","shape":"rect","x":10,"y":24,"w":48,"h":26,"color":"#fae8ff","hidden":true},{"id":"btn-generic","shape":"rect","label":"결제하기","x":10,"y":58,"w":48,"h":10,"color":"#94a3b8"},{"id":"btn-brand","shape":"rect","label":"결제하기","x":10,"y":58,"w":48,"h":10,"color":"#d946ef","hidden":true},{"id":"frame-lib","shape":"frame","label":"우리 디자인 시스템","x":68,"y":8,"w":26,"h":84},{"id":"lib-btn","shape":"rect","label":"Button/Primary","x":71,"y":16,"w":20,"h":8,"color":"#d946ef"},{"id":"lib-input","shape":"rect","label":"Input/Default","x":71,"y":30,"w":20,"h":8,"color":"#fae8ff"},{"id":"txt-done","shape":"text","label":"✓ 시스템 컴포넌트로 교체 완료","x":10,"y":74,"w":44,"h":6,"hidden":true}]},"actions":[{"t":"caption","text":"① 왼쪽 프레임이 AI가 만든 체크아웃 초안입니다"},{"t":"move","target":"frame-draft"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 회색 기본 버튼은 우리 브랜드 색이 아닙니다"},{"t":"move","target":"btn-generic"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"③ 오른쪽 라이브러리에서 Button/Primary를 끌어와 교체합니다"},{"t":"drag","from":"lib-btn","to":"btn-generic"},{"t":"hide","target":"btn-generic"},{"t":"reveal","target":"btn-brand"},{"t":"wait","ms":500},{"t":"caption","text":"④ 입력 필드도 Input/Default로 바꿉니다"},{"t":"drag","from":"lib-input","to":"rect-form"},{"t":"hide","target":"rect-form"},{"t":"reveal","target":"rect-form2"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 초안이 우리 시스템의 언어로 정리됐습니다"},{"t":"reveal","target":"txt-done"},{"t":"move","target":"txt-done"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'bd3d03eb-c66b-1616-8b15-ca7a2ff41102', 'e7521ecc-332b-9a8a-a17d-bfba3db9c156', 'figma-product-design/design-system-ai', 'design-system-ai', '디자인 시스템과 AI: 정리·네이밍·문서화 자동화',
  $aix$AI 시대에 디자인 시스템의 역할이 하나 늘었습니다. 사람이 보는 규칙집을 넘어 **AI가 읽는 참고 자료(컨텍스트)**가 된 것입니다.

## 왜 정리가 먼저인가

First Draft도, Figma Make도, 코드 생성 도구도 결국 **여러분의 라이브러리를 읽고** 결과를 만듭니다. 화면 왼쪽의 레이어 목록이 "Rectangle 47", "btn_final_v2" 같은 이름으로 가득하면 AI에게는 소음일 뿐입니다. 정리된 시스템이 곧 좋은 프롬프트입니다.

## AI로 자동화할 수 있는 정리 작업

- **이름 통일(네이밍 정규화)** — 제각각인 레이어·컴포넌트 이름을 `Button/Primary` 같은 규칙으로 한 번에 바꿉니다. Figma AI 에이전트가 컴포넌트 구조를 이해하고 이런 반복 작업을 대신합니다.
- **설명(description) 초안** — 컴포넌트를 선택하면 오른쪽 패널에 설명란이 있습니다. 여기 들어갈 용도·사용 규칙의 초안을 AI가 쓰고 사람이 다듬습니다. 이 설명은 나중에 Dev Mode와 MCP를 거쳐 **AI가 읽는 프롬프트 재료**로도 쓰입니다.
- **중복·이탈 감지** — 비슷한 컴포넌트 변형이나, 정해진 색을 벗어난 사용을 찾아 목록으로 만들어줍니다.

## 사람이 정하는 것

이름 규칙 자체, 변형(variant, 한 컴포넌트의 크기·상태별 갈래)을 나눌 기준, 무엇을 시스템에 넣을지 — **규칙은 사람이, 적용은 AI가**.

> 💡 **핵심**: 이제 디자인 시스템 문서는 사람과 AI가 함께 읽는 문서입니다. **정리가 잘된 시스템일수록 모든 AI 기능의 출력 품질이 올라갑니다.**$aix$,
  $aix${"type":"stack","title":"디자인 시스템 = AI의 컨텍스트","layers":[{"label":"AI 도구들","sublabel":"First Draft · Make · 코드 생성","icon":"bot","tone":"primary"},{"label":"Code Connect · MCP","sublabel":"디자인 데이터를 코드 세계로 전달","icon":"link","tone":"accent"},{"label":"설명·문서·토큰","sublabel":"컴포넌트 description이 곧 프롬프트","icon":"file-text","tone":"accent"},{"label":"정리된 컴포넌트와 네이밍","sublabel":"Button/Primary — 모든 것의 기반","icon":"layers","tone":"muted"}],"caption":"아래층이 부실하면 위층의 모든 AI 출력이 흔들립니다."}$aix$::jsonb, $aix${"title":"디자인 시스템 컴포넌트 정리 따라하기","app":{"kind":"design-canvas","windowTitle":"컴포넌트 라이브러리 정리 — Figma","tools":[{"id":"tool-select2","icon":"target","label":"선택"},{"id":"tool-layers2","icon":"layers","label":"레이어"},{"id":"tool-doc2","icon":"file-text","label":"문서"},{"id":"tool-ai2","icon":"sparkles","label":"AI"}],"objects":[{"id":"frame-comp","shape":"frame","label":"Components","x":6,"y":8,"w":88,"h":84},{"id":"comp-a","shape":"rect","label":"Rectangle 47","x":12,"y":20,"w":24,"h":12,"color":"#a5b4fc"},{"id":"comp-b","shape":"rect","label":"btn_final_v2","x":52,"y":38,"w":24,"h":12,"color":"#a5b4fc"},{"id":"comp-c","shape":"ellipse","label":"타원 3","x":30,"y":62,"w":14,"h":12,"color":"#f9a8d4"},{"id":"comp-a2","shape":"rect","label":"Card/Default","x":12,"y":20,"w":24,"h":12,"color":"#818cf8","hidden":true},{"id":"comp-b2","shape":"rect","label":"Button/Primary","x":12,"y":38,"w":24,"h":12,"color":"#818cf8","hidden":true},{"id":"comp-c2","shape":"ellipse","label":"Avatar/Large","x":12,"y":56,"w":14,"h":12,"color":"#f472b6","hidden":true},{"id":"txt-report","shape":"text","label":"✓ 3개 이름 정규화 · 설명 초안 3건 생성","x":44,"y":74,"w":46,"h":6,"hidden":true}]},"actions":[{"t":"caption","text":"① 이름이 제각각인 컴포넌트 3개를 확인합니다"},{"t":"move","target":"comp-a"},{"t":"click"},{"t":"move","target":"comp-b"},{"t":"click"},{"t":"move","target":"comp-c"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 도구 막대의 AI 버튼을 눌러 이름 정리를 요청합니다"},{"t":"move","target":"tool-ai2"},{"t":"click"},{"t":"wait","ms":600},{"t":"caption","text":"③ 규칙에 맞는 이름으로 바뀌고 가지런히 정렬됩니다"},{"t":"hide","target":"comp-a"},{"t":"reveal","target":"comp-a2"},{"t":"hide","target":"comp-b"},{"t":"reveal","target":"comp-b2"},{"t":"hide","target":"comp-c"},{"t":"reveal","target":"comp-c2"},{"t":"wait","ms":500},{"t":"caption","text":"④ 설명 문서 초안까지 자동 생성됩니다"},{"t":"reveal","target":"txt-report"},{"t":"move","target":"txt-report"},{"t":"caption","text":"⑤ 컨벤션은 사람이 정하고 적용은 AI가 합니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '28d8ea8e-1404-2dc8-a80a-5905890798dc', 'e7521ecc-332b-9a8a-a17d-bfba3db9c156', 'figma-product-design/consistent-ui-assets', 'consistent-ui-assets', '일관된 UI 에셋: 아이콘·일러스트를 시스템에 맞게',
  $aix$이미지 생성 AI로 아이콘 하나 뽑기는 쉽습니다. 어려운 것은 **30개를 뽑아도 한 세트로 보이게** 만드는 일입니다.

## 낱개 생성이 실패하는 이유

그때그때 프롬프트로 뽑은 에셋은 선 굵기, 모서리 둥글기, 색, 바라보는 각도가 조금씩 다릅니다. 화면에 올리는 순간 "어디서 주워온 티"가 납니다. 프로덕트 에셋의 생명은 화려함이 아니라 **일관성**입니다.

## 시스템에 맞추는 4단계

1. **스타일 명세를 프롬프트로** — "2px 굵기의 선, 둥근 선 끝, 24px 격자, 단색" 같은 우리 아이콘 규칙을 프롬프트 맨 앞에 고정해 둡니다.
2. **기준 에셋을 레퍼런스로** — 기존 아이콘 3~4개를 참고 이미지로 함께 주고 "같은 세트의 새 멤버"를 요청합니다.
3. **일괄 생성 후 솎아내기(컬링)** — 후보를 넉넉히 뽑고, 세트에서 튀는 것을 탈락시킵니다.
4. **라이브러리로 편입** — 통과한 에셋만 컴포넌트로 등록합니다. 등록 전까지는 모두 '초안'입니다.

## 일러스트도 같은 원리

일러스트는 색 조합(팔레트)·인물 비례·질감을 명세로 고정합니다. 명세 없이 생성하는 것은 매번 다른 작가를 고용하는 것과 같습니다.

> 💡 **핵심**: 에셋 생성의 프롬프트는 "무엇을"보다 **"우리 스타일 명세"**가 먼저입니다. 명세 → 레퍼런스 → 솎아내기 → 라이브러리 편입, 이 관문을 지키세요.$aix$,
  $aix${"type":"steps","title":"시스템에 맞는 에셋 생성 4단계","steps":[{"label":"스타일 명세 고정","sublabel":"스트로크·그리드·팔레트를 프롬프트로","icon":"palette"},{"label":"기준 에셋 레퍼런스","sublabel":"기존 세트 3~4개를 참조로 제공","icon":"image"},{"label":"일괄 생성 → 컬링","sublabel":"넉넉히 뽑고 튀는 것 탈락","icon":"filter"},{"label":"라이브러리 편입","sublabel":"통과한 것만 컴포넌트로 등록","icon":"layers"}],"caption":"편입 관문을 지키면 30개를 뽑아도 한 세트로 보입니다."}$aix$::jsonb, null, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'd37cd0af-3775-8b60-11f0-ed90bfc5beff', 'e7521ecc-332b-9a8a-a17d-bfba3db9c156', 'figma-product-design/prototype-feedback', 'prototype-feedback', '동작 프로토타입과 AI 피드백 루프',
  $aix$클릭 몇 개 연결한 프로토타입과 **실제로 동작하는 프로토타입**은 검증의 질이 다릅니다. Figma Make가 이 간격을 메웁니다.

## 프롬프트 → 동작 프로토타입

Figma Make는 말로 설명하면 화면 사이의 논리·상태·데이터까지 갖춘 프로토타입을 만듭니다. 디자인 파일의 프레임(화면 한 장)을 첨부하거나 팀 라이브러리를 연결하면 **우리 컴포넌트와 스타일이 반영된** 결과가 나옵니다. "탭을 누르면 목록이 걸러지고, 항목을 누르면 상세 화면으로" — 이런 동작이 클릭을 일일이 잇지 않아도 만들어집니다.

## AI 피드백으로 다듬기

만들고 끝이 아니라 **고치는 바퀴(루프)**를 돌립니다.

- 프로토타입을 AI에게 보여주고 기본기 점검을 요청합니다 — 글자와 배경의 대비 부족, 손가락보다 작은 버튼, 눌러도 갈 곳이 없는 화면.
- "이 화면에서 사용자가 헤맬 지점은?"처럼 **관점을 정해서** 물으면 답이 훨씬 구체적으로 나옵니다.
- 지적을 반영하고 다시 점검 — 사용자 테스트 전에 싼 비용으로 몇 바퀴 돕니다.

## AI 피드백의 위치

AI 점검은 사용자 테스트를 **대신하는 게 아니라 그 전에 거르는 필터**입니다. 뻔한 결함을 미리 걷어내면 진짜 테스트에서는 깊은 발견에 집중할 수 있습니다.

> 💡 **핵심**: 만들기 → AI 점검 → 수정 → 사용자 테스트. **AI 피드백은 테스트 전 결함 필터**로 쓸 때 가장 값집니다.$aix$,
  $aix${"type":"cycle","title":"프로토타입 개선 루프","center":"사용자 테스트 전 반복","nodes":[{"label":"생성","sublabel":"프롬프트 → 동작 프로토타입","icon":"play"},{"label":"AI 점검","sublabel":"대비·버튼 크기·막다른 길 지적","icon":"search"},{"label":"수정","sublabel":"지적 반영해 다듬기","icon":"wrench"},{"label":"재확인","sublabel":"흐름 다시 점검","icon":"eye"}],"caption":"이 루프를 몇 바퀴 돈 뒤 사용자 테스트에 들어가면 발견의 질이 달라집니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8043bf8a-a9e9-6261-0c4b-1e2325bc4a19', 'e7521ecc-332b-9a8a-a17d-bfba3db9c156', 'figma-product-design/design-to-code-handoff', 'design-to-code-handoff', '디자인 → 코드 핸드오프: 도구의 현실적 품질',
  $aix$"디자인하면 코드가 나온다"는 말은 절반만 사실입니다. 2026년 기준으로 **어디까지 되고 어디부터 사람이 하는지**를 정확히 알아야 헛된 기대 없이 쓸 수 있습니다.

## 파이프라인의 부품들

- **Dev Mode MCP 서버** — 도구 막대 오른쪽 끝의 `</>` 스위치로 켜는 Dev Mode의 디자인 정보(요소의 계층 구조·색과 간격 값·컴포넌트 이름)를 Claude Code 같은 AI 코딩 도구에 전달합니다. 스크린샷을 붙여넣는 것과는 넘어가는 정보의 양이 다릅니다. 2026년에는 코드를 다시 캔버스로 가져오는 **양방향(Code to Canvas)** 흐름까지 열렸습니다.
- **Code Connect** — 디자인 컴포넌트를 개발팀의 실제 코드 컴포넌트에 짝지어, 생성된 코드가 의미 없는 상자 더미 대신 **우리 팀의 실제 컴포넌트**를 쓰게 합니다.
- **전문 변환 도구** — Builder.io Visual Copilot, Anima, Locofy 등. 기존 컴포넌트 라이브러리와 연결할 수 있는 도구일수록 실전 가치가 높습니다.

## 현실적 품질 (2026)

- 프런트엔드(사용자가 보는 화면 쪽 코드) 초기 작업 시간을 30~60% 줄여줍니다.
- 그러나 결과물의 **20~40%는 사람이 손봐야** 합니다 — 접근성, 코드의 의미 구조, 성능, 고치기 쉬운 구조.
- 변환 품질은 **디자인 파일이 얼마나 정돈됐는지에 비례**합니다. 오토 레이아웃과 정돈된 이름 없이는 어떤 도구도 좋은 코드를 못 만듭니다.

> 💡 **핵심**: 핸드오프 자동화의 성패는 도구가 아니라 **연결(Code Connect)과 파일 규율**이 결정합니다. "그리는 대로 코드가 된다"가 아니라 "정리한 만큼 코드가 된다"입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"claude — Figma MCP 핸드오프","lines":[{"text":"선택한 결제 화면을 React로 구현해 줘","tone":"cmd"},{"text":"Figma MCP: 레이어 트리·토큰·컴포넌트명 수신","tone":"out"},{"text":"Code Connect 매핑 발견: Button/Primary → <Button>","tone":"ok"},{"text":"CheckoutForm.tsx 생성 (우리 컴포넌트 사용)","tone":"ok"},{"text":"# 사람: 접근성 라벨·에러 상태·긴 텍스트 보완","tone":"comment"},{"text":"npm run check","tone":"cmd"},{"text":"✓ lint · type · test 통과","tone":"ok"},{"text":"# 초기 구현 60% 단축, 정리 30%는 사람 몫","tone":"comment"}],"caption":"구조화 데이터 + 컴포넌트 매핑 + 사람의 마무리 — 2026년 핸드오프의 실제 모습입니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b8d45ce9-0ef2-b1da-7458-42b65eb45abb', '354e435d-32ba-67e2-c6d3-b58bf9c0c412', 'figma-product-design/ai-user-research', 'ai-user-research', '유저 리서치에 AI: 전사·태깅·인사이트 추출',
  $aix$인터뷰 6건을 분석하는 데 일주일 걸리던 일이 하루로 줄었습니다. 단, **줄어든 것은 시간이지 판단 책임이 아닙니다**.

## AI가 잘하는 것 (2026 기준)

- **전사(녹음을 글로 옮기기)** — 정확도 95~98%에, 누가 말했는지 나누는 화자 분리까지 자동입니다. 이 단계는 안심하고 맡기세요.
- **태깅·클러스터링(발언에 꼬리표를 달고 주제별로 묶기)** — Dovetail의 Magic Cluster처럼 중요한 발언을 주제별로 자동으로 묶어줍니다. 주제 뽑기는 전문 분석가와 80~85% 일치하는 수준 — 쓸 만하지만 **맹신할 수준은 아닙니다**.
- **질의 응답** — "가입 중 이탈 신호가 나온 순간은?"처럼 전사본 전체에 질문을 던지면 근거가 되는 발언을 찾아줍니다.

## 반드시 지킬 편향 가드

- **원문 대조** — AI 요약 속 모든 인사이트(분석에서 얻은 발견)는 실제 발언 인용까지 거슬러 올라가 확인합니다. 인용이 없는 인사이트는 채택하지 않습니다.
- **확증 편향 경계** — "사용자들이 X를 싫어하지?"라고 물으면 AI는 싫어한 증거만 골라 모아줍니다. "X에 대한 반응은 어땠어?"처럼 치우치지 않게 물으세요.
- **소수 의견 확인** — 자동 분류는 다수 의견을 키우고 소수의 신호를 묻어버립니다. 어느 묶음에도 속하지 않은 발언을 일부러 훑어보세요.

> 💡 **핵심**: 전사는 맡기고, 태깅은 검토하고, 인사이트는 **원문 인용으로 검증**합니다. AI는 리서치의 손을 대신하지, 판단을 대신하지 않습니다.$aix$,
  $aix${"type":"flow","title":"AI 리서치 분석 파이프라인","nodes":[{"label":"녹음 업로드 → 자동 전사","sublabel":"정확도 95~98% · 화자 분리","icon":"mic","tone":"primary"},{"label":"AI 태깅·클러스터링","sublabel":"전문가와 80~85% 일치 — 검토 필요","icon":"brain","tone":"accent"},{"label":"원문 대조 검증","sublabel":"인용 없는 인사이트는 폐기","icon":"search","tone":"warning","edgeLabel":"사람의 관문"},{"label":"인사이트 확정·공유","sublabel":"근거 인용과 함께 문서화","icon":"check","tone":"success"}],"caption":"세 번째 관문(원문 대조)을 건너뛰는 순간 리서치가 아니라 소설이 됩니다."}$aix$::jsonb, $aix${"title":"인터뷰 녹취 AI 분석 따라하기","app":{"kind":"browser","url":"app.dovetail.com/projects/onboarding","blocks":[{"id":"b-head","type":"heading","label":"온보딩 리서치 — 인터뷰 6건"},{"id":"b-upload","type":"button","label":"녹음 파일 업로드"},{"id":"b-file","type":"card","label":"🎙 interview-03.mp3 (42분)","hidden":true},{"id":"b-transcribed","type":"badge","label":"전사 완료 — 화자 2명 분리","hidden":true},{"id":"b-cluster","type":"button","label":"테마 자동 클러스터링"},{"id":"b-theme1","type":"card","label":"테마 1: 가입 단계가 너무 길다 (5/6명)","hidden":true},{"id":"b-theme2","type":"card","label":"테마 2: 요금제 용어가 어렵다 (3/6명)","hidden":true},{"id":"b-quote","type":"text","label":"원문 인용: \"세 번째 화면에서 포기할 뻔했어요\"","hidden":true},{"id":"b-ask","type":"input","label":"전사본에 질문하기…"},{"id":"b-verify","type":"badge","label":"⚠ 원문 대조 후 인사이트 확정","hidden":true}]},"actions":[{"t":"caption","text":"① 인터뷰 녹음을 업로드해 자동 전사합니다"},{"t":"move","target":"b-upload"},{"t":"click"},{"t":"reveal","target":"b-file"},{"t":"reveal","target":"b-transcribed"},{"t":"wait","ms":500},{"t":"caption","text":"② 테마 자동 클러스터링을 실행합니다"},{"t":"move","target":"b-cluster"},{"t":"click"},{"t":"wait","ms":400},{"t":"reveal","target":"b-theme1"},{"t":"reveal","target":"b-theme2"},{"t":"caption","text":"③ 테마의 근거를 원문 인용으로 확인합니다"},{"t":"move","target":"b-theme1"},{"t":"click"},{"t":"reveal","target":"b-quote"},{"t":"wait","ms":400},{"t":"caption","text":"④ 중립형 질문으로 데이터를 파고듭니다"},{"t":"click","target":"b-ask"},{"t":"type","target":"b-ask","text":"가입 중 이탈 신호가 나온 순간은?"},{"t":"wait","ms":400},{"t":"caption","text":"⑤ 요약은 초안 — 원문 대조로 사람이 확정합니다"},{"t":"reveal","target":"b-verify"},{"t":"move","target":"b-verify"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '416f08a9-0111-b436-38f2-03f6b0de4bcc', '354e435d-32ba-67e2-c6d3-b58bf9c0c412', 'figma-product-design/usability-analysis', 'usability-analysis', '사용성 테스트 분석 자동화, 그리고 편향 주의보',
  $aix$사용성 테스트에서 정말 오래 걸리는 일은 진행이 아니라 **분석**이었습니다 — 세션(참가자 1명의 테스트 1회분) 영상 수십 시간을 돌려보는 일. 2026년의 도구들은 이 병목을 정면으로 공략합니다.

## 자동화되는 것들

- **세션 요약** — Maze, UserTesting 같은 도구가 세션별 요약과 태스크 성공률·포기 지점을 자동으로 뽑아줍니다.
- **AI 모더레이터(테스트 진행자)** — 미리 정한 질문 순서에 따라 비대면 세션을 진행하고 후속 질문까지 던집니다. 사람 진행자처럼 즉흥적으로 답을 유도하는 말이 없어 오히려 **일관성**이 좋습니다.
- **편향 질문 감지** — 테스트를 설계하는 단계에서 유도 질문("이 버튼이 편하시죠?")을 자동으로 지적해줍니다.

## 그래도 남는 함정

- AI 요약은 **말한 것**은 잘 잡지만 **말하지 않은 것**(머뭇거림, 표정, 엉뚱한 곳 클릭)은 놓칩니다. 실패한 태스크의 영상은 직접 보세요.
- 요약이 매끄러울수록 검증 없이 믿게 되는 **자동화 편향**이 생깁니다. 의사결정에 쓸 발견은 반드시 세션 원본으로 재확인합니다.
- 참가자를 치우치게 모집한 문제는 AI가 못 잡습니다 — 누구를 몇 명 테스트할지 정하는 일은 여전히 사람 몫입니다.

> 💡 **핵심**: 분석 자동화의 올바른 용도는 "볼 영상을 줄이는 것"이지 "영상을 안 보는 것"이 아닙니다. **AI가 골라준 결정적 순간을 사람이 봅니다.**$aix$,
  $aix${"type":"compare","title":"분석 자동화: 잘 맡긴 팀 vs 잘못 맡긴 팀","columns":[{"title":"잘못 맡긴 팀","icon":"alert","tone":"warning","items":["AI 요약만 읽고 결정","유도 질문을 그대로 사용","머뭇거림·비언어 신호 놓침","매끄러운 요약을 맹신"]},{"title":"잘 맡긴 팀","icon":"check","tone":"primary","items":["AI가 지목한 순간만 영상 확인","편향 질문 감지로 설계 보정","실패 태스크는 원본 시청","결정용 발견은 재검증"]}],"caption":"같은 도구, 다른 결과 — 차이는 '원본 확인 관문'의 유무입니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'db5a8e3f-e473-6595-25ca-f20790bcd22b', '354e435d-32ba-67e2-c6d3-b58bf9c0c412', 'figma-product-design/new-designer-role', 'new-designer-role', '흐려지는 경계: 개발자·PM과 일하는 새 방식',
  $aix$AI가 협업을 줄여줄 것 같지만, 현실은 반대입니다. **모두가 빨라진 만큼 서로 맞춰야 할 접점이 늘었습니다.**

## 무슨 일이 벌어지고 있나

- 디자이너의 65%가 기획·개발 쪽 업무를 더 맡게 됐다고 답했고, 엔지니어와 PM도 40%가 디자인 작업에 더 참여합니다. **역할의 경계가 실제로 흐려지고 있습니다.**
- PM이 Figma Make로 프로토타입을 만들어 오고, 개발자가 Code to Canvas로 구현한 화면을 디자인 파일에 밀어 넣는 시대 — 디자인 파일은 더 이상 디자이너만의 공간이 아닙니다.

## 디자이너의 새 자리

- **품질 기준의 소유자** — 누구나 화면을 만들 수 있으니, "무엇이 좋은 화면인가"의 기준을 세우고 지키는 사람이 필요합니다.
- **시스템의 관리자** — 모두가 쓰는 라이브러리·디자인 토큰(색·간격을 변수처럼 정해둔 값)·가이드가 곧 제품의 일관성입니다. 시스템 관리가 곧 디자인 리더십입니다.
- **구현 감각의 통역자** — HTML/CSS(웹 화면을 만드는 기본 언어)와 컴포넌트 구조를 이해하면 핸드오프가 깨끗해지고, AI가 만든 코드 초안을 놓고 개발자와 대화할 수 있습니다.

## 실무 팁

PM이 만들어 온 AI 프로토타입을 무시하지도, 그대로 받지도 마세요. **"의도는 접수, 완성도는 시스템으로"** — 초안으로 존중하되 우리 시스템에 맞게 다시 다듬는 것이 새 협업 예절입니다.

> 💡 **핵심**: AI 시대의 디자이너는 화면의 생산자에서 **기준과 시스템의 소유자**로 이동합니다. 경계가 흐려질수록 기준을 쥔 사람이 중심이 됩니다.$aix$,
  $aix${"type":"grid","title":"디자이너의 새 포지션 4가지","items":[{"label":"품질 기준의 소유자","sublabel":"무엇이 좋은 화면인지 정의","icon":"target","tone":"primary"},{"label":"시스템 관리자","sublabel":"라이브러리·토큰이 곧 일관성","icon":"layers","tone":"accent"},{"label":"구현 통역자","sublabel":"코드 구조를 아는 핸드오프","icon":"code","tone":"success"},{"label":"판단하는 눈","sublabel":"AI 초안 10개 중 정답 고르기","icon":"eye","tone":"warning"}],"caption":"PM도 개발자도 화면을 만드는 시대 — 기준을 쥔 사람이 디자이너입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4dff5c79-41d1-2df9-af93-bbf3716ec545', '354e435d-32ba-67e2-c6d3-b58bf9c0c412', 'figma-product-design/portfolio-career', 'portfolio-career', 'AI 시대의 포트폴리오: 결과물이 아니라 판단을 보여라',
  $aix$누구나 그럴듯한 화면을 만드는 시대에는, 그럴듯한 화면만 모은 포트폴리오가 **아무것도 증명하지 못합니다**.

## 채용하는 쪽이 이제 보는 것

- 최종 화면이 아니라 **과정의 판단** — 왜 이 방향을 골랐고, 무엇을 버렸는가.
- AI를 **어떻게 부렸는가** — 어떤 단계를 자동화했고, 어디에 사람의 손을 남겼는가.
- **시스템 사고** — 화면 한 장이 아니라 컴포넌트·디자인 토큰·가이드 단위로 생각한 흔적.

## 포트폴리오에 넣을 새 재료

1. **비포/애프터 스토리** — AI 초안과 시스템에 맞게 다듬은 결과를 나란히 놓습니다. "이 간극을 메우는 게 내 일"이라는 가장 강한 증명입니다.
2. **버린 옵션의 이유** — 생성한 10개 중 9개를 탈락시킨 기준을 한 단락으로 적습니다.
3. **리서치→결정의 연결** — 인터뷰 속 발언이 어떤 디자인 결정으로 이어졌는지 근거의 사슬을 보여줍니다.
4. **워크플로우 자체** — 내가 설계한 AI 협업 과정(도구·검증 관문)을 다이어그램 한 장으로 그립니다.

## 차별화의 방향

"AI를 안 쓴다"도 "AI가 다 했다"도 아닙니다. **AI를 팀원처럼 부리되 품질의 최종 서명은 내가 한다** — 이것이 2026년 시니어의 서사입니다.

> 💡 **핵심**: 포트폴리오의 질문이 바뀌었습니다. "무엇을 만들었나"가 아니라 **"무엇을 판단했나"**. 판단의 기록을 남기는 습관이 곧 커리어 자산입니다.$aix$,
  $aix${"type":"steps","title":"AI 시대 포트폴리오 재구성 4단계","steps":[{"label":"비포/애프터 배치","sublabel":"AI 초안 vs 내가 다듬은 결과","icon":"image"},{"label":"폐기의 이유 기록","sublabel":"버린 9개의 판단 기준","icon":"filter"},{"label":"근거 사슬 연결","sublabel":"리서치 인용 → 디자인 결정","icon":"link"},{"label":"워크플로우 공개","sublabel":"도구·관문·검증 다이어그램","icon":"workflow"}],"caption":"결과물은 흔해졌습니다 — 판단의 기록이 여러분의 서명입니다."}$aix$::jsonb, null, 5, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 영상 제작: Runway · Veo · Kling과 숏폼 자동화
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  'fb2289d4-2769-d76f-0c55-f213a266a1bb', 'ai-video', 'AI 영상 제작: Runway · Veo · Kling과 숏폼 자동화', $aix$2026년 영상 제작의 진입 장벽은 카메라가 아니라 '설계'입니다. 이 강의에서는 Sora, Runway, Google Veo 같은 텍스트-투-비디오 도구의 원리와 한계를 이해하고, 시네마토그래피 언어로 프롬프트를 쓰는 법을 익힙니다. 이어서 스토리보드→클립 생성→캡컷 편집으로 이어지는 제작 워크플로우를 완성하고, 대본→음성→클립→자막을 자동으로 이어붙여 릴스·쇼츠·틱톡에 배포하는 숏폼 자동화 파이프라인까지 설계합니다.$aix$,
  null, 'creative', 'intermediate', array['Runway', 'Google Veo', 'Kling', '숏폼 자동화', 'CapCut']::text[]
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
  $aix$텍스트 한 줄이 영상이 되는 마법의 정체는 **노이즈에서 그림을 깎아내는 확산(Diffusion) 모델**입니다. 원리를 알면 무엇이 잘 되고 무엇이 안 되는지, 그리고 우회하는 법까지 보입니다.

## 어떻게 만들어지는가

- 모델은 옛날 TV가 지지직거릴 때 같은 **무작위 점 노이즈**에서 시작합니다. 프롬프트를 참고해 수십 단계에 걸쳐 노이즈를 조금씩 걷어내며 프레임(영상을 이루는 낱장 사진)을 완성합니다. 대리석에서 조각상을 깎아내는 과정과 비슷합니다.
- 2026년 주력 모델들은 **디퓨전 트랜스포머(DiT)**라는 구조를 씁니다. 프레임을 한 장씩 그리지 않고 시간의 흐름까지 한 덩어리로 학습해서, 프레임 사이의 움직임이 자연스럽습니다.
- Veo를 비롯한 최신 모델들은 **영상에 딱 맞는 오디오**(대사·효과음)까지 함께 생성합니다.

## 여전히 남은 두 가지 한계

- **물리 일관성** — 모델은 물리 법칙을 '계산'하지 않고 '흉내' 냅니다. 그래서 손가락 개수, 물이 흐르는 모양, 화면 밖으로 나갔다 돌아온 물체의 생김새가 자주 무너집니다.
- **길이 제한** — 한 번에 만들 수 있는 클립(몇 초짜리 짧은 영상 조각)은 보통 **10초 안팎**, 길어야 수십 초입니다. 긴 영상을 만들려면 여러 클립을 이어 붙여야 하고, 그래서 '편집'이 반드시 필요합니다.

## 실무 감각

한계는 이기려 들지 말고 피해서 설계하세요. 물리가 무너지기 쉬운 장면(손 클로즈업, 많은 군중)은 처음부터 빼고, 긴 이야기는 짧은 클립 여러 개의 합으로 쪼갭니다. 처음 연습할 때는 '노을 지는 바다'처럼 물리가 단순한 풍경부터 만들어 보세요. 성공 경험을 쌓은 뒤 인물 장면으로 넘어가면 시행착오가 훨씬 줄어듭니다.

> 💡 **핵심**: 영상 생성 AI는 "물리 시뮬레이터"가 아니라 "그럴듯함 생성기"입니다. 한계를 아는 사람이 한계 안에서 완성도를 만듭니다.$aix$,
  $aix${"type":"flow","title":"텍스트가 영상이 되기까지","nodes":[{"label":"프롬프트 이해","sublabel":"장면·피사체·카메라 해석","icon":"file-text","tone":"primary"},{"label":"무작위 노이즈","sublabel":"지지직거리는 점에서 시작","icon":"sparkles","tone":"muted"},{"label":"노이즈 걷어내기","sublabel":"수십 단계 반복으로 프레임 완성","icon":"wand","tone":"accent","edgeLabel":"시간 흐름까지 한 덩어리로"},{"label":"클립 완성 (10초 안팎)","sublabel":"오디오 동시 생성 모델도 등장","icon":"video","tone":"success"}],"caption":"물리 법칙은 '계산'이 아니라 '흉내' — 그래서 손·액체·군중이 약점입니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'cedc9990-4f9b-5497-dd9d-5b8fc3506fd3', 'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'ai-video/tool-landscape-2026', 'tool-landscape-2026', '2026 도구 지형도: Sora · Runway · Veo · Pika · Kling',
  $aix$도구가 너무 많아서 못 고르겠다는 말은 이제 핑계입니다. 2026년의 도구들은 **용도별로 뚜렷하게 갈라져** 있어서, 내 목적만 정하면 답이 나옵니다.

## 5대 플레이어의 성격

- **Sora (OpenAI)** — 복잡한 장면 연출과 이야기 표현으로 시장을 열었습니다. 하지만 소셜 앱이 2026년 상반기에 종료되고 API도 단계적 중단이 예고됐습니다. 새로 시작하는 작업 흐름에는 넣지 않는 편이 안전합니다.
- **Runway (Gen 시리즈)** — 크리에이터용 **편집 도구가 가장 성숙**합니다. 모션 브러시(움직일 부분을 붓으로 칠해 지정), 카메라 컨트롤 등으로 연출에 세밀하게 개입할 수 있습니다.
- **Google Veo** — 소리를 따로 입히지 않아도 되는 **네이티브 오디오 생성**(영상과 소리를 처음부터 함께 생성)과 프롬프트를 잘 따르는 충실도가 강점입니다. Flow 등 구글 생태계와의 연결도 매끄럽습니다.
- **Pika** — 빠르고 가벼운 밈·이펙트(재미 효과) 특화. 숏폼 감성의 변형 효과가 풍부합니다.
- **Kling (콰이쇼우)** — 가성비와 인물 동작 표현으로 급성장했습니다. 클립을 대량으로 뽑는 작업에서 자주 선택됩니다.

## 선택 기준 3가지

1. **연출 통제력**이 필요하면 → Runway
2. **오디오 포함 완성형 클립**이 필요하면 → Veo
3. **대량 생산 단가**가 중요하면 → Kling, Pika

## 하나만 기억한다면

도구는 계속 바뀝니다. "어떤 도구가 최고인가"보다 **"내 제작 과정의 어느 단계에 어떤 도구를 꽂는가"**를 기준으로 판단하세요.

> 💡 **핵심**: 2026년의 정답은 단일 도구가 아니라 **조합**입니다 — 연출은 Runway, 완성형은 Veo, 물량은 Kling/Pika.$aix$,
  $aix${"type":"grid","title":"2026 텍스트-투-비디오 지형도","items":[{"label":"Sora","sublabel":"복잡한 연출 · 서비스 종료 수순","icon":"sparkles","tone":"primary"},{"label":"Runway","sublabel":"연출 통제력 · 편집 도구 성숙","icon":"camera","tone":"primary"},{"label":"Google Veo","sublabel":"네이티브 오디오 · 프롬프트 충실","icon":"music","tone":"accent"},{"label":"Pika","sublabel":"밈 · 이펙트 특화","icon":"zap","tone":"muted"},{"label":"Kling","sublabel":"가성비 · 인물 동작","icon":"users","tone":"muted"},{"label":"선택 기준","sublabel":"통제력 / 오디오 / 단가","icon":"target","tone":"warning"}],"caption":"하나의 최고 도구가 아니라, 제작 단계별로 도구를 조합해 고릅니다."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9c224ef1-348c-8804-82cb-495a2525bdf7', 'ac3869b9-6f78-a9d2-52bf-bca94f865af8', 'ai-video/cinematography-prompts', 'cinematography-prompts', '프롬프트의 시네마토그래피: 감독의 언어로 쓰기',
  $aix$"예쁜 노을 영상"이라고 쓰면 모델은 어디서 본 듯한 평범한 영상을 줍니다. 모델이 학습한 것은 **영화 제작 현장의 언어**이기 때문에, 감독처럼 써야 감독의 결과물이 나옵니다. 용어가 낯설어도 괜찮습니다 — 아래 단어들을 재료처럼 골라 끼우면 됩니다.

## 프롬프트에 넣을 4가지 재료

- **샷 종류** — 샷은 카메라가 한 번에 담는 화면 단위입니다. 와이드 샷(멀리서 넓게) / 미디엄 샷(허리 위쯤) / 클로즈업(얼굴이나 사물을 크게) / 오버 더 숄더(한 사람의 어깨 너머로 상대를 보는 구도). 화면에 무엇이 얼마나 담길지를 결정합니다.
- **카메라 움직임** — 돌리 인(피사체 쪽으로 다가가기), 팬(좌우로 돌리기), 틸트(위아래로 돌리기), 트래킹 샷(움직이는 대상을 따라가기), 핸드헬드(손으로 든 듯 흔들리게). "천천히(slow)" 같은 속도 표현을 붙이면 결과가 안정됩니다.
- **조명** — 골든 아워(해 뜨고 질 무렵의 따뜻한 빛), 백라이트(역광), 소프트 라이트(부드러운 빛), 네온, 로우키(어둡고 그림자 짙게). 분위기의 8할은 조명 언어가 만듭니다.
- **렌즈·질감** — 35mm 필름 룩(옛 필름 카메라 느낌), 얕은 심도(주인공만 선명하고 배경은 흐릿하게) 등.

## 쓰는 순서

**[샷] + [피사체와 행동] + [배경] + [카메라 움직임] + [조명·질감]** 순으로 한 문장씩 씁니다. 한 클립에는 **하나의 샷, 하나의 움직임**만 담으세요. 두 개를 섞으면 둘 다 어정쩡해집니다.

## 피해야 할 것

"아름다운, 멋진" 같은 감상 형용사는 자리만 차지합니다. 그 자리에 조명과 렌즈 단어를 넣으세요.

> 💡 **핵심**: 좋은 영상 프롬프트는 소설이 아니라 **콘티 지문**(장면 지시문)입니다 — 샷·움직임·조명을 기술 용어로 지정하세요.$aix$,
  $aix${"type":"chat","title":"감상 프롬프트 vs 시네마토그래피 프롬프트","messages":[{"role":"user","text":"바닷가에서 달리는 강아지의 아름답고 감동적인 영상"},{"role":"ai","text":"→ 평범한 스톡 영상 느낌의 결과물 (연출 정보 없음)"},{"role":"user","text":"트래킹 샷: 골든 리트리버가 해질녘 해변을 달린다. 로우 앵글, 느린 트래킹, 골든 아워 역광, 얕은 심도, 35mm 필름 룩"},{"role":"ai","text":"→ 카메라가 함께 달리는 영화적 장면 (샷·움직임·조명이 모두 지정됨)"}],"caption":"감상 형용사를 빼고 그 자리에 샷·카메라·조명 용어를 넣으세요."}$aix$::jsonb, $aix${"title":"Runway에서 시네마토그래피 프롬프트 따라하기","app":{"kind":"browser","url":"app.runwayml.com/generate","blocks":[{"id":"b-head","type":"heading","label":"Generate Video — Runway"},{"id":"b-prompt","type":"input","label":"샷·피사체·배경 프롬프트 입력…"},{"id":"b-style","type":"input","label":"카메라·조명·질감 옵션 입력…"},{"id":"b-ratio","type":"badge","label":"9:16 · 10초 · Gen 시리즈"},{"id":"b-generate","type":"button","label":"Generate"},{"id":"b-progress","type":"badge","label":"생성 중… 디노이징 45%","hidden":true},{"id":"b-clip1","type":"card","label":"🎬 beach-run_v1.mp4 · 10초","hidden":true},{"id":"b-clip2","type":"card","label":"🎬 beach-run_v2.mp4 · 10초","hidden":true},{"id":"b-play","type":"button","label":"▶ 미리보기 재생","hidden":true}]},"actions":[{"t":"caption","text":"① 샷 종류와 피사체·행동을 먼저 지정합니다"},{"t":"move","target":"b-prompt"},{"t":"click"},{"t":"type","target":"b-prompt","text":"트래킹 샷: 해질녘 해변을 달리는 리트리버"},{"t":"caption","text":"② 감상 형용사 대신 조명·렌즈 언어를 넣습니다"},{"t":"click","target":"b-style"},{"t":"type","target":"b-style","text":"골든 아워 역광, 얕은 심도, 35mm 필름 룩"},{"t":"caption","text":"③ 비율과 길이를 확인하고 생성을 시작합니다"},{"t":"move","target":"b-ratio"},{"t":"click","target":"b-generate"},{"t":"reveal","target":"b-progress"},{"t":"wait","ms":900},{"t":"hide","target":"b-progress"},{"t":"caption","text":"④ 변형 2개를 비교해 베스트를 고릅니다"},{"t":"reveal","target":"b-clip1"},{"t":"reveal","target":"b-clip2"},{"t":"move","target":"b-clip1"},{"t":"dblclick"},{"t":"caption","text":"⑤ 재생하며 손·물체가 이상한 장면이 없는지 확인합니다"},{"t":"reveal","target":"b-play"},{"t":"click","target":"b-play"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '29594c0c-deac-0dc7-2095-b6a30752061a', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/storyboard-pipeline', 'storyboard-pipeline', '스토리보드→클립→편집: 파이프라인으로 만들기',
  $aix$클립 한 개는 누구나 뽑습니다. 차이는 **여러 클립을 하나의 영상으로 완성하는 파이프라인**(재료가 순서대로 흘러가는 조립 라인 같은 작업 흐름)에서 갈립니다. 클립 길이가 10초 안팎으로 제한되는 한, 편집 없는 AI 영상은 없습니다.

## 파이프라인 5단계

1. **대본** — 전체 이야기를 씬(장면 하나) 단위로 쪼갭니다. 씬 하나 = 클립 하나.
2. **스토리보드** — 씬마다 샷·카메라·조명을 지정한 프롬프트 표를 만듭니다. LLM에게 대본을 주고 "표로 바꿔 달라"고 하면 빠릅니다.
3. **클립 생성** — 씬별로 생성하되, 씬당 **2~4개 변형**(같은 프롬프트로 뽑은 서로 다른 버전)을 만들어 베스트를 고릅니다.
4. **편집** — 캡컷 등에서 이어 붙이고 자막·음악·트랜지션(장면과 장면 사이의 전환 효과)을 입힙니다.
5. **검수** — 손가락이 이상하거나 글자가 뭉개진 프레임을 걸러냅니다.

## 왜 '표'가 중요한가

스토리보드를 표로 관리하면 실패한 씬만 **골라서 다시 생성**할 수 있습니다. 프롬프트를 채팅창에 흘려보내면 어떤 씬을 어떤 프롬프트로 만들었는지 남지 않아, 똑같이 다시 만들 수 없습니다. 표는 거창할 필요 없습니다 — 구글 시트에 **씬 번호 · 프롬프트 · 길이 · 상태(대기/완료/재생성)** 네 칸이면 충분합니다.

## 비용 감각

돈은 대부분 생성 단계에서 나갑니다. 씬당 변형 개수 × 씬 수가 곧 예산이므로, 스토리보드에서 씬 수를 먼저 확정한 뒤에 생성을 시작하세요.

> 💡 **핵심**: AI 영상 제작은 "생성"이 아니라 **"기획→생성→편집" 파이프라인 운영**입니다. 스토리보드 표가 그 파이프라인의 설계도입니다.$aix$,
  $aix${"type":"steps","title":"AI 영상 제작 파이프라인","steps":[{"label":"대본 작성","sublabel":"씬 단위로 분할 (씬 = 클립)","icon":"file-text"},{"label":"스토리보드 표","sublabel":"씬별 샷·카메라·조명 프롬프트","icon":"clipboard"},{"label":"클립 생성","sublabel":"씬당 2~4개 변형 → 베스트 선택","icon":"video"},{"label":"편집·검수","sublabel":"이어붙이기 + 이상한 프레임 걸러내기","icon":"scissors"}],"caption":"표로 관리하면 실패한 씬만 골라 재생성할 수 있습니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'fc130973-c645-e350-7503-e4f8cbc28b07', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/image-to-video-consistency', 'image-to-video-consistency', '이미지-투-비디오: 일관성을 지키는 기술',
  $aix$클립을 이어 붙였더니 주인공 얼굴이 씬마다 다르다면, 시청자는 3초 안에 떠납니다. 이 일관성 문제의 표준 해법이 **이미지-투-비디오(I2V)** — 글 대신 **이미지 한 장을 출발점으로 영상을 만드는 방식**입니다.

## 텍스트에서 바로 뽑으면 안 되는 이유

텍스트-투-비디오는 매번 **복권 추첨**입니다. 같은 프롬프트를 넣어도 인물·소품·색감이 생성할 때마다 달라집니다. 반면 I2V는 **첫 화면(시작 프레임)을 이미지로 고정**하므로, 그 안의 얼굴과 소품이 클립 끝까지 유지됩니다.

## 일관성 워크플로우 3단계

1. **캐릭터 시트 확보** — 이미지 생성 AI로 주인공의 기준 이미지를 만듭니다. 그다음 레퍼런스 기능(만든 캐릭터를 기억시켜 고정하는 기능)으로 다양한 각도·의상 버전을 뽑아 둡니다. 메뉴가 안 보이면 도구마다 이름이 다르니 'reference'나 'character' 메뉴를 찾아보세요.
2. **씬별 키프레임 생성** — 스토리보드의 각 씬을 먼저 **정지 이미지**(키프레임: 그 장면의 기준이 되는 한 장)로 만듭니다. 이미지는 영상보다 싸고 빠르니, 이 단계에서 마음에 들 때까지 충분히 고릅니다.
3. **키프레임 → I2V 변환** — 확정된 이미지를 시작 프레임으로 넣고, 프롬프트에는 **움직임만** 씁니다("카메라가 천천히 다가간다" 등). Runway·Kling·Veo 모두 시작 프레임 입력을 지원하고, Kling·Veo는 끝 프레임 지정까지 가능합니다.

## 보너스: 끝 프레임 연결

앞 클립의 마지막 프레임을 다음 클립의 시작 프레임으로 쓰면, 클립과 클립의 경계가 자연스럽게 이어집니다.

> 💡 **핵심**: 일관성은 프롬프트가 아니라 **이미지로 고정**합니다. "이미지에서 정체성, 프롬프트에서 움직임" — 이 분업이 I2V의 공식입니다.$aix$,
  $aix${"type":"flow","title":"일관성을 지키는 I2V 워크플로우","nodes":[{"label":"캐릭터 시트","sublabel":"기준 이미지 + 각도·의상 변형","icon":"user","tone":"primary"},{"label":"씬별 키프레임","sublabel":"정지 이미지로 먼저 확정 (싸고 빠름)","icon":"image","tone":"accent","edgeLabel":"레퍼런스로 캐릭터 고정"},{"label":"I2V 변환","sublabel":"이미지 = 정체성, 프롬프트 = 움직임","icon":"play","tone":"primary","edgeLabel":"시작 프레임으로 입력"},{"label":"클립 연결","sublabel":"끝 프레임 → 다음 클립 시작 프레임","icon":"link","tone":"success"}],"loopBack":{"from":3,"to":1,"label":"다음 씬 반복"},"caption":"텍스트-투-비디오는 복권, 이미지-투-비디오는 설계입니다."}$aix$::jsonb, null, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '104b7c4b-d2db-fc7e-958c-e14b9ac74d98', '2e800625-0718-244a-324f-b6c33fd0a71d', 'ai-video/capcut-editing', 'capcut-editing', '캡컷 연동 편집: 자막·템포·트랜지션',
  $aix$생성된 클립은 재료일 뿐, 시청자가 끝까지 보게 만드는 것은 **편집**입니다. 숏폼 편집의 사실상 표준인 캡컷(CapCut)에서 챙길 것은 딱 세 가지입니다.

## 1. 자막 — 자동 캡션 + 강조

- 숏폼의 **대다수가 소리를 끈 채 시청**됩니다. 자막은 옵션이 아니라 본체입니다.
- 캡컷의 **자동 캡션** 기능을 켜면 음성을 알아서 받아써 줍니다. 메뉴가 안 보이면 하단 도구에서 '텍스트 → 자동 캡션'을 찾으세요. 받아쓴 자막의 오타는 업로드 전에 꼭 훑어봐야 합니다.
- 자막이 준비됐으면 핵심 키워드에만 색·크기 강조를 넣으세요. 문장 전체를 강조하면 아무것도 강조되지 않습니다.

## 2. 템포 — 컷의 리듬

- 컷은 화면이 다음 화면으로 바뀌기 전까지, 한 번에 이어지는 화면 토막입니다. 숏폼의 컷 길이는 **2~4초**가 기본입니다. AI 클립이 8초라면 가장 좋은 구간만 잘라 쓰세요.
- 음악의 **비트(박자)에 맞춰 컷이 바뀌게** 하면(비트 싱크) 같은 재료도 완성도가 다르게 느껴집니다.
- 늘어지는 구간은 1.2~1.5배속으로 빠르게 돌려 템포를 살립니다.

## 3. 트랜지션 — 절제가 실력

- 트랜지션은 컷과 컷 사이에 넣는 전환 효과입니다. 기본은 효과 없이 바로 바뀌는 **하드 컷**이고, 화려한 효과는 장면의 성격이 바뀌는 지점에만 씁니다.
- AI 클립 경계의 어색함은 효과로 가리기보다, **컷이 바뀌는 순간을 비트에 맞춰** 자연스럽게 넘기는 편이 낫습니다.

## 재사용 가능한 템플릿

자막 스타일·인트로·아웃트로를 한 번 만들어 **템플릿으로 저장**하면, 다음 영상부터 편집 시간이 절반으로 줄어듭니다.

> 💡 **핵심**: 편집의 우선순위는 **자막 > 템포 > 트랜지션**입니다. 화려함이 아니라 리듬이 완주율(끝까지 본 비율)을 만듭니다.$aix$,
  $aix${"type":"grid","title":"캡컷 편집 체크리스트","items":[{"label":"자동 캡션","sublabel":"무음 시청 대비 · 키워드만 강조","icon":"message","tone":"primary"},{"label":"컷 템포","sublabel":"컷 길이 2~4초 유지","icon":"scissors","tone":"accent"},{"label":"비트 싱크","sublabel":"음악 박자에 맞춰 컷 전환","icon":"music","tone":"accent"},{"label":"하드 컷 기본","sublabel":"전환 효과는 씬 전환에만","icon":"zap","tone":"muted"},{"label":"배속 조절","sublabel":"늘어지는 구간 1.2~1.5배속","icon":"gauge","tone":"muted"},{"label":"템플릿 저장","sublabel":"자막·인트로 재사용","icon":"layers","tone":"success"}],"caption":"우선순위는 자막 > 템포 > 트랜지션 — 리듬이 완주율을 만듭니다."}$aix$::jsonb, $aix${"title":"캡컷 타임라인 편집 따라하기","app":{"kind":"design-canvas","windowTitle":"숏폼 시퀀스 편집 — CapCut","tools":[{"id":"tool-select","icon":"target","label":"선택"},{"id":"tool-cut","icon":"scissors","label":"분할"},{"id":"tool-text","icon":"file-text","label":"텍스트"},{"id":"tool-music","icon":"music","label":"오디오"}],"objects":[{"id":"preview","shape":"frame","label":"미리보기 (9:16)","x":8,"y":8,"w":34,"h":44},{"id":"sub-text","shape":"text","label":"3가지만 기억하세요","x":12,"y":40,"w":26,"h":6,"hidden":true},{"id":"sub-style","shape":"text","label":"강조: 키워드만 노랑 · 120%","x":12,"y":14,"w":26,"h":6,"color":"#f59e0b","hidden":true},{"id":"timeline","shape":"frame","label":"타임라인","x":8,"y":58,"w":84,"h":34},{"id":"clip-hook","shape":"rect","label":"훅 3초","x":10,"y":66,"w":16,"h":12,"color":"#ec4899"},{"id":"clip-cta","shape":"rect","label":"CTA 4초","x":28,"y":66,"w":16,"h":12,"color":"#f59e0b"},{"id":"clip-body","shape":"rect","label":"전개 8초","x":46,"y":66,"w":26,"h":12,"color":"#8b5cf6"},{"id":"clip-cta-end","shape":"rect","label":"CTA 4초","x":74,"y":66,"w":16,"h":12,"color":"#f59e0b","hidden":true},{"id":"cut-mark","shape":"ellipse","x":58,"y":63,"w":3,"h":3,"color":"#22d3ee","hidden":true}]},"actions":[{"t":"caption","text":"① 생성한 클립들을 타임라인에서 확인합니다"},{"t":"move","target":"clip-hook"},{"t":"click"},{"t":"move","target":"clip-body"},{"t":"caption","text":"② 순서가 어긋난 CTA(행동 유도) 클립을 맨 뒤로 옮깁니다"},{"t":"click","target":"clip-cta"},{"t":"drag","from":"clip-cta","to":"clip-cta-end","ms":1000},{"t":"hide","target":"clip-cta"},{"t":"reveal","target":"clip-cta-end"},{"t":"wait","ms":500},{"t":"caption","text":"③ 텍스트 도구로 훅 자막을 얹습니다"},{"t":"click","target":"tool-text"},{"t":"click","target":"preview"},{"t":"type","target":"sub-text","text":"3가지만 기억하세요"},{"t":"caption","text":"④ 문장 전체가 아니라 키워드만 강조합니다"},{"t":"dblclick","target":"sub-text"},{"t":"reveal","target":"sub-style"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 분할 도구로 비트에 맞춰 컷을 나눕니다"},{"t":"click","target":"tool-cut"},{"t":"move","target":"clip-body"},{"t":"click"},{"t":"reveal","target":"cut-mark"},{"t":"wait","ms":800}]}$aix$::jsonb, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f551a4c9-5941-0ece-03c6-d67b9a44c921', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/shortform-formula', 'shortform-formula', '숏폼의 공식: 훅 3초와 구조 설계',
  $aix$숏폼은 시청자가 골라서 '선택'하는 매체가 아니라, 알고리즘이 피드에 '배달'해 주는 매체입니다. 그래서 승부는 **스크롤을 멈추게 하는 첫 3초**에서 끝납니다.

## 훅 3초의 법칙

- 훅(hook)은 낚싯바늘처럼 시선을 낚아채는 도입부를 말합니다. 첫 3초에 떠나는 사람의 비율이 영상 전체의 노출량을 결정합니다 — 알고리즘은 초반 이탈을 가장 무겁게 봅니다.
- 훅의 4가지 정석: **질문형**("이거 아직도 모르세요?"), **결과 선공개**(완성본을 먼저 보여주기), **패턴 파괴**(예상 밖 비주얼로 허를 찌르기), **숫자 약속**("3가지만 기억하세요").
- AI 영상의 강점: 현실에서 못 찍는 **비현실적 비주얼**이 그 자체로 패턴 파괴 훅이 됩니다.

## 검증된 시간 구조

- **0~3초 훅** — 멈추게 한다
- **3~25초 전개** — 약속한 내용을 빠른 템포로 전달, 5~7초마다 화면 변화
- **25~40초 반전·클라이맥스** — 끝까지 볼 이유를 준다
- **마지막 5초 CTA** — CTA(Call To Action)는 팔로우·댓글 같은 행동을 요청하는 마무리입니다. 또는 **루프 연결**(끝 장면이 처음으로 자연스럽게 이어지게 만들기)도 좋습니다 — 반복 재생이 시청 시간을 올려 줍니다.

60초를 다 채울 필요는 없습니다. 30초짜리 영상이라도 훅→전개→CTA 뼈대만 지키면 같은 공식이 통합니다.

## 공식이 곧 자동화의 설계도

이 구조가 매번 똑같이 고정되어 있기 때문에 자동화가 가능합니다. 다음 레슨에서 이 구조를 자동 파이프라인으로 옮깁니다.

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

1. **대본 생성** — LLM API에 주제를 주고 "훅→전개→반전→CTA" 구조의 대본을 JSON으로 받습니다. 이때 씬별 영상 프롬프트까지 함께 만들어 달라고 시킵니다.
2. **음성 합성(TTS)** — ElevenLabs 등으로 대본을 내레이션 음성으로 바꿉니다. 음성 길이가 정해지면 **씬마다 필요한 클립 길이도 저절로 정해집니다**.
3. **클립 생성** — 씬별 프롬프트를 영상 생성 API(Runway·Kling 등)에 병렬로(한 번에 여러 개 동시에) 요청합니다. 대량 생산에는 단가가 중요하므로 도구 선택이 여기서 갈립니다.
4. **조립과 자막** — FFmpeg(명령어로 영상을 자르고 붙이는 무료 도구) 또는 캡컷으로 클립과 음성을 합치고, STT(음성을 글자로 받아쓰는 기술)가 주는 시간 정보로 자막을 얹습니다.

## 설계의 핵심 원칙

- **중간 결과물을 파일로 저장** — 대본 JSON, 음성 mp3, 클립 mp4를 단계마다 남겨 두세요. 그러면 3단계에서 실패해도 1~2단계를 다시 돌릴 필요 없이, 실패한 단계만 재실행하면 됩니다.
- **사람의 검수 관문은 두 곳** — 대본이 나온 직후(방향이 맞는지)와 업로드 직전(품질이 괜찮은지). 사람이 전혀 보지 않는 완전 자동화는 채널 품질을 무너뜨립니다.
- **코드가 부담스러우면 노코드로** — Make 같은 노코드 도구에서 노드를 이어 붙여도 같은 구조를 만들 수 있습니다. 아래 데모에서 직접 확인해 보세요.

> 💡 **핵심**: 자동화의 목표는 "사람 제거"가 아니라 **반복 노동 제거**입니다. 기획과 검수에만 사람을 남기고, 나머지는 파이프라인에 맡기세요.$aix$,
  $aix${"type":"terminal","windowTitle":"shortform-pipeline — 1회 실행 로그","lines":[{"text":"python pipeline.py --topic '우주에서 가장 추운 곳'","tone":"cmd"},{"text":"[1/4] 대본 생성 (LLM) ... script.json 저장","tone":"out"},{"text":"      훅/전개/반전/CTA · 씬 6개 · 프롬프트 포함","tone":"dim"},{"text":"# 사람 검수: 대본 방향 승인","tone":"comment"},{"text":"[2/4] TTS 합성 ... voice.mp3 (42.3초)","tone":"out"},{"text":"[3/4] 클립 생성 6건 병렬 요청 ...","tone":"out"},{"text":"      scene_04 실패 → 해당 씬만 재시도 ✓","tone":"dim"},{"text":"[4/4] FFmpeg 조립 + STT 자막 ... final.mp4","tone":"out"},{"text":"✓ 완료 (총 11분) — 업로드 전 품질 검수 대기","tone":"ok"}],"caption":"중간 산출물을 파일로 남기면 실패한 단계만 재실행할 수 있습니다."}$aix$::jsonb, $aix${"title":"Make에서 숏폼 자동화 시나리오 따라하기","app":{"kind":"automation-canvas","windowTitle":"숏폼 자동 제작 파이프라인 — Make","nodes":[{"id":"n-script","icon":"file-text","label":"대본 생성","sublabel":"LLM · 훅→전개→CTA","tone":"accent"},{"id":"n-tts","icon":"mic","label":"음성 합성","sublabel":"ElevenLabs TTS","hidden":true},{"id":"n-clip","icon":"video","label":"클립 생성","sublabel":"Runway · 씬별 병렬","hidden":true},{"id":"n-caption","icon":"message","label":"조립·자막","sublabel":"FFmpeg + STT","hidden":true},{"id":"n-review","icon":"eye","label":"품질 검수","sublabel":"사람 관문","tone":"warning","hidden":true},{"id":"n-upload","icon":"upload","label":"예약 업로드","sublabel":"릴스·쇼츠·틱톡","tone":"success","hidden":true}],"runLog":[{"id":"log1","text":"▶ 시나리오 실행 — 주제: 우주에서 가장 추운 곳","tone":"out","hidden":true},{"id":"log2","text":"✓ 대본 script.json 저장 (씬 6개)","tone":"ok","hidden":true},{"id":"log3","text":"✓ 음성 voice.mp3 합성 (42.3초)","tone":"ok","hidden":true},{"id":"log4","text":"✓ 클립 6건 생성 — scene_04 재시도 성공","tone":"ok","hidden":true},{"id":"log5","text":"✓ final.mp4 조립 완료 — 품질 검수 대기","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 시작 노드는 LLM 대본 생성입니다"},{"t":"move","target":"n-script"},{"t":"click"},{"t":"caption","text":"② 음성→클립→자막 노드를 차례로 잇습니다"},{"t":"reveal","target":"n-tts"},{"t":"move","target":"n-tts"},{"t":"reveal","target":"n-clip"},{"t":"move","target":"n-clip"},{"t":"reveal","target":"n-caption"},{"t":"wait","ms":400},{"t":"caption","text":"③ 업로드 직전에 사람 검수 관문을 둡니다"},{"t":"reveal","target":"n-review"},{"t":"move","target":"n-review"},{"t":"click"},{"t":"reveal","target":"n-upload"},{"t":"wait","ms":500},{"t":"caption","text":"④ 시나리오를 실행해 단계별 로그를 확인합니다"},{"t":"reveal","target":"log1"},{"t":"reveal","target":"log2"},{"t":"reveal","target":"log3"},{"t":"reveal","target":"log4"},{"t":"caption","text":"⑤ 검수만 통과하면 3개 플랫폼에 자동 배포됩니다"},{"t":"reveal","target":"log5"},{"t":"move","target":"n-upload"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '650017c5-feac-90aa-e608-9fc330be3387', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/platform-optimization', 'platform-optimization', '플랫폼별 최적화: 릴스 · 쇼츠 · 틱톡',
  $aix$같은 영상을 세 플랫폼에 그대로 복사해 올리면 세 곳 모두에서 어중간해집니다. 플랫폼마다 알고리즘과 시청 문화가 다르기 때문에, **배포 단계에서 플랫폼에 맞게 조금씩 바꿔야** 합니다.

## 플랫폼별 성격

- **틱톡** — 트렌드에 얼마나 빨리 반응하느냐가 생명입니다. 유행하는 사운드·챌린지를 결합하면 노출이 늘고, 다듬지 않은 날것의 감성이 잘 통합니다.
- **유튜브 쇼츠** — 영상이 **검색 결과와 구독자라는 자산**으로 쌓입니다. 제목·해시태그의 키워드가 중요하고, 쇼츠를 본 사람을 긴 영상(롱폼)으로 데려오는 구조도 짤 수 있습니다.
- **인스타 릴스** — 비주얼 완성도와 계정 전체의 톤 일관성이 중요합니다. 프로필에 바둑판처럼 쌓이는 커버 이미지, 친구에게 공유(DM 전송)하고 싶어지는 콘텐츠가 강합니다.

## 자동화 파이프라인의 배포 분기

- 공통 마스터 영상(원본이 되는 한 편, 9:16 세로 비율)을 만들되, 화면 가장자리는 비워 둡니다 — 앱 버튼·자막에 가려지지 않는 안전 영역을 지키기 위해서입니다. 그다음 플랫폼별로 **제목·해시태그·커버·사운드만 바꿔** 내보냅니다.
- 각 플랫폼의 API나 예약 도구로 업로드 시간을 걸어 두되, **다른 앱의 워터마크(앱 로고 표시)가 남은 영상을 그대로 올리면 노출 불이익**이 있으니 원본 파일로 각각 올립니다.

## 업로드 전략

- 타깃 시청자가 활동하는 시간대에 예약 업로드하세요. 올린 뒤 첫 1시간의 반응이 확산 폭을 결정합니다.
- 처음에는 **한 플랫폼에 집중**해 나만의 공식을 찾고, 검증된 뒤에 3개 동시 배포로 넓히세요.

> 💡 **핵심**: "하나 만들어 셋에 뿌리기"가 아니라 **"하나의 마스터, 셋의 변형"**입니다. 바꿀 것은 제목·해시태그·커버·사운드 네 가지입니다.$aix$,
  $aix${"type":"compare","title":"3대 숏폼 플랫폼 비교","columns":[{"title":"틱톡","icon":"music","tone":"primary","items":["트렌드 반응 속도가 생명","유행 사운드·챌린지 결합","날것의 감성 선호"]},{"title":"유튜브 쇼츠","icon":"play","tone":"accent","items":["검색·구독 자산으로 축적","제목·해시태그 키워드 중요","롱폼 유입 구조 설계 가능"]},{"title":"인스타 릴스","icon":"camera","tone":"success","items":["비주얼 완성도·톤 일관성","커버 이미지가 그리드 자산","공유(DM)를 부르는 콘텐츠"]}],"caption":"마스터 영상은 하나, 제목·해시태그·커버·사운드만 플랫폼별로 바꿉니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '219d35af-bcc2-f597-3293-86d70c5bb92f', '717803d4-4348-4f09-db6f-0c46782b1570', 'ai-video/operate-and-improve', 'operate-and-improve', '운영 사이클: 데이터로 다음 영상을 만들기',
  $aix$자동화 파이프라인의 진짜 힘은 '많이 만드는 것'이 아니라 **빨리 배우는 것**입니다. 업로드는 끝이 아니라, 다음 영상을 더 잘 만들기 위한 데이터 수집의 시작입니다.

## 봐야 할 지표는 두 개뿐

- **3초 유지율(훅 성과)** — 첫 3초를 넘겨서 계속 본 사람의 비율입니다. 낮으면 훅과 커버를 바꿉니다.
- **완주율(구조 성과)** — 끝까지 본 사람의 비율입니다. 특정 구간에서 이탈이 몰리면 그 구간의 템포나 내용이 범인입니다.

조회수는 결과일 뿐입니다. 무엇을 고칠지 알려 주는 단서는 위 두 지표, 즉 **시간에 따라 시청자가 얼마나 남아 있는지 보여주는 유지율 그래프**에 있습니다. 이 그래프는 각 플랫폼의 크리에이터 스튜디오(계정의 '분석' 또는 '인사이트' 메뉴)에서 영상별로 볼 수 있습니다.

## 주간 개선 사이클

1. **기획** — 지난주 성적 상위 20% 영상의 공통점(주제·훅 유형·길이)을 추립니다.
2. **대량 생성** — 파이프라인으로 변형을 여러 개 만듭니다. 훅만 다르게 만든 A/B 버전이 특히 잘 먹힙니다.
3. **배포** — 예약 업로드로 올리는 주기를 꾸준히 지킵니다.
4. **분석** — 3초 유지율과 완주율을 기록하고, 다음 주 기획에 반영합니다.

## 자동화이기에 가능한 실험량

손으로 만들면 주 2편으로 배우지만, 파이프라인이 있으면 주 10편으로 배웁니다. **실험 횟수 자체가 경쟁력**입니다. 단, 품질 검수 관문은 끝까지 유지하세요 — 질 낮은 영상을 대량으로 올리면 채널 신뢰도가 깎입니다.

> 💡 **핵심**: 숏폼 채널 운영은 기획→생성→배포→분석의 **루프**(반복 고리)입니다. 자동화는 이 루프의 회전 속도를 높이는 장치입니다.$aix$,
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
  $aix$작곡을 배운 적 없어도 괜찮습니다. 이제 문장 하나만 쓰면 3분짜리 곡이 나옵니다. 그리고 원리를 알면 그 문장, 즉 프롬프트를 훨씬 잘 쓰게 됩니다.

## 텍스트가 음악이 되는 과정

음악 생성 AI는 수백만 곡을 들으며 **"이런 설명이면 이런 소리"**라는 짝을 익힌 모델입니다. 주방장에 비유하면, 수많은 주문서와 완성된 요리를 함께 보면서 "달콤하고 부드럽게"가 어떤 맛인지 배운 셈입니다.

- 내가 쓴 프롬프트는 장르·무드·악기 같은 **음악적 특징**으로 번역됩니다.
- 모델은 그 특징에 맞는 소리를 처음부터 새로 만들어 냅니다. 기존 곡을 잘라 붙이는 방식이 아닙니다.
- 그래서 "좋은 노래"라는 감상평보다 **음악을 설명하는 말**(잔잔한 피아노, 느린 템포…)을 쓸수록 결과가 정확해집니다.

## Suno 첫 곡 만들기

- 브라우저에서 suno.com에 접속해 가입한 뒤, 화면의 **Create** 메뉴를 클릭하세요. 무료 크레딧(생성할 때마다 차감되는 포인트)으로 하루 몇 곡을 만들 수 있습니다.
- **Simple 모드**: 한 문장 설명만 쓰면 가사·작곡을 AI가 전부 처리합니다. 첫 곡은 이 모드로 감을 잡으세요.
- **Custom 모드**: 스타일과 가사를 나눠 입력합니다. 이 강의는 주로 이 모드를 씁니다. Custom 스위치가 안 보이면 Create 화면 위쪽을 확인하세요.
- 한 번 생성하면 곡이 2개씩 나옵니다. 마음에 드는 쪽을 골라 **Extend**(곡 이어 만들기) 버튼으로 발전시키세요.
- 생성 버튼이 눌리지 않으면 크레딧이 다 떨어진 것입니다. 무료 크레딧은 매일 다시 채워지니 다음 날 이어서 하면 됩니다.
- 첫 결과가 마음에 안 들어도 정상입니다. 프롬프트를 조금 고쳐 다시 생성하는 반복이 기본 과정입니다.

> 💡 **핵심**: 음악 생성 AI는 '설명 → 특징 → 소리'로 변환하는 기계입니다. 좋은 곡은 좋은 설명에서 나옵니다.$aix$,
  $aix${"type":"flow","title":"텍스트가 곡이 되기까지","nodes":[{"label":"프롬프트 입력","sublabel":"\"lo-fi, 따뜻한, 새벽 감성\"","icon":"file-text","tone":"primary"},{"label":"음악적 특징으로 해석","sublabel":"장르 · 무드 · 악기 · 템포","icon":"brain","tone":"accent"},{"label":"오디오 생성","sublabel":"곡 2개가 동시에 생성됨","icon":"music","tone":"success"},{"label":"선택 · 발전","sublabel":"Extend로 이어 만들기","icon":"wand","tone":"muted","edgeLabel":"마음에 드는 쪽만"}],"loopBack":{"from":3,"to":0,"label":"프롬프트 수정 후 재생성"},"caption":"한 번에 완성이 아니라 '생성 → 선택 → 수정'을 반복하는 과정입니다."}$aix$::jsonb, null, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '881829d2-07b4-c4bf-7bab-d1274bdeef49', 'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'ai-audio/style-tags-and-lyrics', 'style-tags-and-lyrics', '스타일 태그와 가사 프롬프트: 음악을 설명하는 언어',
  $aix$"신나는 노래 만들어줘"라고 쓰면 AI도 감으로 만듭니다. 그래서 매번 다른 결과가 나옵니다. 원하는 소리를 다시 만들어내려면 **네 가지 축의 언어**가 필요합니다. 커피 주문과 같습니다 — "맛있는 거 주세요" 대신 "아이스 라떼, 샷 추가, 덜 달게"라고 해야 원하는 잔이 나옵니다.

## 스타일 태그의 4축

- **장르**: lo-fi hip hop, synthwave, acoustic folk, corporate pop — 장르가 소리의 뼈대입니다.
- **무드(분위기)**: uplifting(희망찬), dreamy(몽환적), tense(긴장감), warm(따뜻한) — 형용사 1~2개면 충분합니다.
- **악기**: soft piano, punchy drums처럼 넣을 것과, `no vocals`(보컬 없음)처럼 **뺄 것**을 모두 지정하세요.
- **BPM/에너지**: BPM은 곡의 빠르기 단위(분당 박자 수)입니다. 90 BPM이면 잔잔한 편, 120 BPM이면 신나는 편입니다.

네 축을 쉼표로 나열하면 기본형이 완성됩니다: `lo-fi hip hop, dreamy, soft piano, 80 BPM, no vocals`

## 가사 프롬프트와 구조 태그

Custom 모드의 가사 칸에서는 **대괄호 구조 태그**로 곡의 전개를 지휘할 수 있습니다.

- `[Intro]` `[Verse]` `[Chorus]` `[Bridge]` `[Outro]` — 도입·절·후렴 같은 구간 구분
- `[Instrumental]` — 가사 없이 연주만 나오는 구간
- 훅(귀에 남는 후렴 문구)은 짧고 반복되게 쓰는 것이 AI 보컬에 잘 맞습니다.

## 자주 하는 실수

- 장르를 5개씩 섞으면 정체불명의 곡이 나옵니다. **장르는 1~2개**만 고르세요.
- 아티스트 실명은 정책상 무시되거나 차단됩니다. 이름 대신 그 아티스트의 **소리를 묘사**하세요.

> 💡 **핵심**: 스타일 태그 = 장르 + 무드 + 악기 + BPM. 이 네 축만 채우면 프롬프트의 80%는 완성입니다.$aix$,
  $aix${"type":"chat","title":"스타일 프롬프트 개선 예시","messages":[{"role":"user","text":"신나는 노래 만들어줘"},{"role":"ai","text":"장르·무드·악기·BPM이 없어 임의로 생성합니다 → 매번 다른 결과"},{"role":"user","text":"upbeat synthwave, retro, punchy drums, analog synth, 118 BPM, no vocals"},{"role":"ai","text":"4축이 모두 지정됨 → 의도한 소리를 재현 가능하게 생성"}],"caption":"막연한 형용사 대신 음악을 설명하는 4축 언어를 쓰세요."}$aix$::jsonb, $aix${"title":"Suno에서 스타일 태그로 BGM 만들기 따라하기","app":{"kind":"browser","url":"suno.com/create","blocks":[{"id":"h1","type":"heading","label":"Create"},{"id":"badge-mode","type":"badge","label":"Custom 모드"},{"id":"lbl-style","type":"text","label":"스타일 프롬프트 (Styles)"},{"id":"in-style","type":"input","label":"장르, 무드, 악기, BPM을 쉼표로 입력…"},{"id":"lbl-lyrics","type":"text","label":"가사 (Lyrics) — 구조 태그 사용 가능"},{"id":"in-lyrics","type":"input","label":"[Verse] [Chorus] 구조 태그 입력…"},{"id":"btn-create","type":"button","label":"Create"},{"id":"badge-gen","type":"badge","label":"생성 중… 곡 2개를 만들고 있습니다","hidden":true},{"id":"card-1","type":"card","label":"🎵 새벽 감성 lo-fi — v1 (2:58)","hidden":true},{"id":"card-2","type":"card","label":"🎵 새벽 감성 lo-fi — v2 (3:04)","hidden":true},{"id":"btn-extend","type":"button","label":"Extend — 이어서 발전시키기","hidden":true}]},"actions":[{"t":"caption","text":"① Custom 모드에서 스타일 입력창을 클릭합니다"},{"t":"move","target":"in-style"},{"t":"click"},{"t":"caption","text":"② 장르·무드·악기·BPM, 4축 언어로 스타일을 적습니다"},{"t":"type","target":"in-style","text":"lo-fi, dreamy, piano, 80 BPM, no vocals"},{"t":"wait","ms":400},{"t":"caption","text":"③ 가사 칸에는 대괄호 구조 태그로 전개를 지정합니다"},{"t":"click","target":"in-lyrics"},{"t":"type","target":"in-lyrics","text":"[Intro] [Verse] [Chorus] [Outro]"},{"t":"caption","text":"④ Create를 눌러 생성을 시작합니다"},{"t":"move","target":"btn-create"},{"t":"click"},{"t":"reveal","target":"badge-gen"},{"t":"wait","ms":800},{"t":"hide","target":"badge-gen"},{"t":"caption","text":"⑤ 동시에 생성된 곡 2개를 비교해 마음에 드는 쪽을 고릅니다"},{"t":"reveal","target":"card-1"},{"t":"reveal","target":"card-2"},{"t":"move","target":"card-2"},{"t":"click"},{"t":"caption","text":"⑥ Extend로 고른 곡을 이어서 발전시킵니다"},{"t":"reveal","target":"btn-extend"},{"t":"move","target":"btn-extend"},{"t":"click"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4e6a1ad9-ce46-2427-1972-701552dd6cd9', 'a17fd4bb-2025-42d4-1e88-e7961ce0e3be', 'ai-audio/bgm-by-purpose', 'bgm-by-purpose', '콘텐츠 용도별 BGM 제작: 인트로·브이로그·광고',
  $aix$좋은 BGM의 기준은 '좋은 곡'이 아니라 **'영상에 맞는 곡'**입니다. 식당 음악을 떠올려 보세요. 아무리 명곡이라도 손님 대화를 방해하면 실패입니다. 용도가 다르면 설계 공식도 다릅니다.

## 유튜브 인트로: 5초 안에 각인

- 길이 5~15초, **즉시 임팩트**가 생명입니다. 빌드업(서서히 고조되는 도입부) 없이 바로 훅으로 시작하세요.
- 프롬프트 키워드: `short intro jingle, catchy, energetic, instant hook`
- 같은 인트로를 매 영상 반복해서 쓰면 "이 소리 = 이 채널"로 기억되는 **사운드 로고**가 됩니다.

## 브이로그: 존재감을 지운 배경

- 목소리를 방해하지 않는 것이 최우선입니다. `no vocals`(보컬 없음)는 필수입니다.
- 프롬프트 키워드: `chill lo-fi, warm acoustic, mellow, steady rhythm`
- 중간에 갑자기 커지거나 빨라지지 않는 **일정한 에너지**의 곡을 고르세요. 어디서 잘라도 어색하지 않아 편집이 쉬워집니다.

## 광고: 15~30초 안에 감정 곡선

- 도입(호기심) → 상승(기대) → 클라이맥스(메시지)로 이어지는 **에너지 설계**가 핵심입니다.
- 프롬프트 키워드: `uplifting corporate pop, building energy, bright, climactic ending`
- 편집 순서는 거꾸로입니다. 제품이 등장하는 순간을 먼저 정하고, 그 지점에 곡의 절정이 오도록 앞을 맞추세요.

어느 용도든 마지막 확인은 같습니다. 곡만 따로 듣지 말고, **실제 영상에 얹어 목소리와 함께** 들어보세요. 그때 어울려야 진짜 합격입니다.

> 💡 **핵심**: BGM 프롬프트는 곡 설명이 아니라 **영상의 역할 설명**에서 출발합니다 — "이 소리가 시청자에게 무엇을 시키는가"를 먼저 정하세요.$aix$,
  $aix${"type":"compare","title":"용도별 BGM 설계 공식","columns":[{"title":"인트로","icon":"zap","tone":"primary","items":["5~15초","즉시 훅, 빌드업 없음","채널 사운드 로고화","energetic · catchy"]},{"title":"브이로그","icon":"camera","tone":"accent","items":["목소리가 주인공","no vocals 필수","일정한 에너지 유지","chill · mellow"]},{"title":"광고","icon":"trending-up","tone":"success","items":["15~30초","도입→상승→클라이맥스","제품 등장 = 절정","uplifting · climactic"]}],"caption":"같은 Suno라도 용도에 따라 길이·에너지 곡선·보컬 여부가 달라집니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'f5d3735f-c505-55f5-34f0-d406dbc15989', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/tts-basics', 'tts-basics', 'TTS 기초와 보이스 선택',
  $aix$AI 음성의 품질은 절반이 **보이스 선택**에서 결정됩니다. 좋은 원고도 안 맞는 목소리로 읽으면 어색해집니다. 옷과 같습니다 — 걸어놓고 볼 때가 아니라 **직접 입어봐야** 어울리는지 알 수 있습니다.

## TTS가 자연스러워진 이유

- 최신 TTS는 글자를 소리로 하나씩 바꾸는 게 아니라 **문맥을 이해하고 연기**합니다. 같은 "네"도 질문 뒤에서는 대답처럼, 놀란 장면에서는 감탄처럼 읽습니다.
- ElevenLabs는 2026년 기준 다국어 표현력에서 가장 널리 쓰이는 서비스이며, 한국어 품질도 실사용 수준입니다.

## 보이스 고르는 순서

1. elevenlabs.io에 가입한 뒤 **Voice Library**(목소리 모음) 메뉴에서 콘텐츠 언어로 필터를 겁니다. 메뉴가 안 보이면 왼쪽 사이드바의 Voices 항목을 확인하세요.
2. 성별·연령대보다 **톤 태그**를 먼저 보세요 — calm(차분), energetic(활기), narrative(내레이션형) 같은 표시입니다.
3. 후보 보이스에 실제 원고의 **첫 문단**을 넣어 시험 생성합니다. 샘플 문장과 내 원고는 다르게 들리기 때문입니다.
4. 후보 2~3개를 같은 원고로 비교한 뒤, 하나를 채널 고정 보이스로 정합니다.

## 핵심 설정 두 가지

- **Stability(안정성)**: 낮추면 감정 기복이 풍부해지고, 높이면 일정하고 차분해집니다. 내레이션은 중간~높게 두세요.
- **Similarity(유사도)**: 원본 보이스의 특성을 얼마나 유지할지입니다. 과하게 높이면 원본 녹음의 잡음까지 재현될 수 있습니다.
- 설정이 헷갈리면 일단 기본값 그대로 시작해도 충분합니다. 보이스부터 정하는 것이 먼저입니다.

> 💡 **핵심**: 샘플 듣고 고르지 말고 **내 원고로 시험**해서 고르세요. 그리고 한 채널엔 한 보이스 — 목소리가 곧 브랜드입니다.$aix$,
  $aix${"type":"steps","title":"보이스 선택 4단계","steps":[{"label":"언어로 필터","sublabel":"Voice Library에서 한국어 지원 확인","icon":"globe"},{"label":"톤 태그 확인","sublabel":"calm · energetic · narrative","icon":"filter"},{"label":"내 원고로 시험","sublabel":"샘플 문장 말고 실제 첫 문단으로","icon":"mic"},{"label":"채널 고정 보이스 확정","sublabel":"후보 2~3개 비교 후 하나로","icon":"check"}],"caption":"목소리는 채널의 브랜드 자산 — 한 번 정하면 유지하세요."}$aix$::jsonb, $aix${"title":"ElevenLabs에서 보이스 시험 생성 따라하기","app":{"kind":"browser","url":"elevenlabs.io/text-to-speech","blocks":[{"id":"h1","type":"heading","label":"Text to Speech"},{"id":"lbl-lib","type":"text","label":"Voice Library — 한국어 필터 적용됨"},{"id":"voice-1","type":"card","label":"🎙️ 지호 — calm · narrative"},{"id":"voice-2","type":"card","label":"🎙️ 세라 — energetic · bright"},{"id":"badge-sel","type":"badge","label":"선택됨: 지호 (내레이션용)","hidden":true},{"id":"in-script","type":"input","label":"실제 원고의 첫 문단을 입력하세요…"},{"id":"lbl-stab","type":"text","label":"Stability: 중간~높음 (내레이션 권장)"},{"id":"btn-gen","type":"button","label":"Generate"},{"id":"card-audio","type":"card","label":"🔊 내레이션_시험.mp3 (0:14)","hidden":true},{"id":"btn-dl","type":"button","label":"다운로드","hidden":true}]},"actions":[{"t":"caption","text":"① Voice Library에서 한국어 보이스 후보를 비교합니다"},{"t":"move","target":"voice-1"},{"t":"click"},{"t":"move","target":"voice-2"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 톤 태그를 보고 내레이션용 보이스를 확정합니다"},{"t":"click","target":"voice-1"},{"t":"reveal","target":"badge-sel"},{"t":"wait","ms":400},{"t":"caption","text":"③ 샘플 문장 대신 실제 원고의 첫 문단을 입력합니다"},{"t":"click","target":"in-script"},{"t":"type","target":"in-script","text":"안녕하세요, 오늘은 AI 더빙을 배워봅니다."},{"t":"wait","ms":400},{"t":"caption","text":"④ Generate를 눌러 음성을 생성합니다"},{"t":"move","target":"btn-gen"},{"t":"click"},{"t":"wait","ms":800},{"t":"reveal","target":"card-audio"},{"t":"move","target":"card-audio"},{"t":"click"},{"t":"caption","text":"⑤ 들어보고 어색함이 없으면 다운로드합니다"},{"t":"reveal","target":"btn-dl"},{"t":"move","target":"btn-dl"},{"t":"click"}]}$aix$::jsonb, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '03267aa3-68de-49f0-89df-74f564953d98', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/voice-cloning-ethics', 'voice-cloning-ethics', '보이스 클로닝과 윤리: 동의가 먼저입니다',
  $aix$1분 녹음이면 내 목소리를 그대로 복제할 수 있는 시대입니다. 강력한 만큼 위험합니다. **이 레슨의 규칙을 지키지 않으면 법적 문제가 됩니다.**

## 클로닝 두 가지 방식

- **Instant Cloning(즉석 복제)**: 1~2분 샘플로 바로 복제합니다. 빠르지만 유사도는 보통이라, 시험 삼아 써보기에 알맞습니다.
- **Professional Cloning(정밀 복제)**: 30분 이상의 깨끗한 녹음으로 학습합니다. 본인 인증이 필수인데, 화면에 나온 문장을 직접 소리 내어 읽는 '음성 캡차' 방식입니다. 유사도가 훨씬 높습니다.

## 절대 규칙: 동의 없는 클로닝 금지

- 복제해도 되는 목소리는 딱 두 가지입니다. **내 목소리, 그리고 서면 동의를 받은 목소리.**
- 연예인·정치인·지인의 목소리를 몰래 복제하면 ElevenLabs 약관 위반입니다. 한국에서도 퍼블리시티권(자기 이름·목소리를 남이 함부로 돈벌이에 못 쓰게 하는 권리) 침해, 그리고 딥페이크 관련 성폭력처벌법의 처벌 대상이 될 수 있습니다.
- 2026년 8월부터 적용되는 **EU AI Act** 투명성 의무 등 주요 규제는 AI 생성 음성에 **AI임을 고지**하도록 요구합니다. 국내 플랫폼들도 AI 콘텐츠 표시를 요구하는 추세입니다.

## 안전한 활용 체크리스트

- 내 목소리 클로닝 → 내레이션 자동화. 가장 안전하고 실용적인 사용법입니다. 감기에 걸려도, 새벽에도 같은 목소리로 녹음할 수 있습니다.
- 성우 목소리 → **이용 범위와 기간을 계약서에 명시**한 뒤에 사용하세요.
- 공개할 때는 영상 설명란 등에 "AI 보이스 사용" 고지 문구를 넣으세요.

> 💡 **핵심**: 클로닝의 기준은 기술이 아니라 **동의**입니다. 동의 → 녹음 → 복제 → 고지, 이 순서를 벗어나면 만들지 마세요.$aix$,
  $aix${"type":"flow","title":"동의 기반 클로닝 워크플로우","nodes":[{"label":"동의 확보","sublabel":"본인 목소리 or 서면 동의","icon":"clipboard","tone":"warning"},{"label":"깨끗한 샘플 녹음","sublabel":"잡음 없는 1~30분","icon":"mic","tone":"primary","edgeLabel":"동의 없으면 여기서 중단"},{"label":"클로닝 + 본인 인증","sublabel":"Professional은 음성 캡차","icon":"lock","tone":"accent"},{"label":"AI 사용 고지 후 공개","sublabel":"EU AI Act · 플랫폼 표시 의무","icon":"shield","tone":"success"}],"caption":"첫 관문이 '동의'인 이유 — 이후 모든 단계의 합법성이 여기서 결정됩니다."}$aix$::jsonb, null, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'd175d35a-54ef-aaf2-6948-15f48c5be2d7', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/emotion-and-pronunciation', 'emotion-and-pronunciation', '감정·톤 제어와 발음 교정',
  $aix$밋밋한 낭독과 살아있는 내레이션의 차이는 **연출 지시**에 있습니다. ElevenLabs에서는 연극 대본의 지문처럼, 텍스트 안에 연기 지시를 직접 써넣을 수 있습니다.

## 오디오 태그로 감정 연출

최신 모델(Eleven v3 계열)은 대괄호로 쓴 **오디오 태그**를 연기 지시로 해석합니다.

- 감정: `[excited]`(신나게) `[sad]`(슬프게) `[whispers]`(속삭이듯) `[laughs]`(웃음)
- 전달: `[pause]`로 잠깐 숨을 고르게 하고, 문장을 나눠 리듬을 만듭니다.
- 태그는 문장 앞에 붙입니다. 태그 자체는 소리로 읽히지 않고 연기 지시로만 쓰입니다.
- 한 문단에 1~2개면 충분합니다 — 남발하면 오히려 부자연스러워집니다.

## 텍스트 자체가 연출입니다

- **문장을 짧게** 끊으면 또박또박 읽고, 길게 이으면 흘러가듯 읽습니다.
- 강조할 단어는 따옴표로 감싸거나 **쉼표로 앞뒤를 분리**하세요. 자연히 그 단어에 힘이 들어갑니다.
- 말줄임표(…)는 머뭇거림으로, 느낌표는 에너지 상승으로 해석됩니다.

## 발음 교정 요령

- 숫자·단위는 일단 생성해서 들어보고, 이상하게 읽으면 읽는 법을 풀어 쓰세요: "2026년" → "이천이십육 년".
- 외래어·브랜드명을 틀리게 읽으면 **소리 나는 대로** 다시 씁니다: "Suno" → "수노".
- 자주 쓰는 용어는 발음 사전(Pronunciation Dictionary) 기능에 등록하세요. 한 번 등록하면 프로젝트 전체에 적용됩니다.
- 긴 원고는 문단 단위로 나눠 생성하세요. 틀린 문단만 다시 만들면 되니 수정이 빠르고 크레딧도 아낄 수 있습니다.

> 💡 **핵심**: TTS 원고는 '읽을 글'이 아니라 **'연기 대본'**입니다. 태그와 문장 부호가 여러분의 연출 도구입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"elevenlabs — 연기 대본 vs 평문","lines":[{"text":"# 평문 원고 (밋밋한 낭독)","tone":"comment"},{"text":"오늘은 정말 놀라운 소식이 있습니다. 드디어 신제품이 나왔습니다.","tone":"dim"},{"text":"# 연기 대본 (오디오 태그 + 리듬)","tone":"comment"},{"text":"[excited] 오늘은… 정말 놀라운 소식이 있습니다!","tone":"cmd"},{"text":"[pause]","tone":"cmd"},{"text":"[whispers] 드디어, 신제품이 나왔거든요.","tone":"cmd"},{"text":"✓ 같은 문장, 태그 하나로 전달력이 달라집니다","tone":"ok"}],"caption":"태그는 문장 앞에, 문단당 1~2개만 — 과유불급입니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0975668d-ada4-8d55-c4e5-5d9a67e2b26d', 'c1f815f0-14f9-b1c8-14ba-12d38904e061', 'ai-audio/multilingual-dubbing', 'multilingual-dubbing', '다국어 더빙 워크플로우',
  $aix$한국어 영상 하나로 영어·일본어·스페인어 시청자까지 만날 수 있습니다. 더빙 자동화는 2026년 크리에이터의 표준 확장 전략입니다.

## Dubbing Studio의 5단계

ElevenLabs의 Dubbing Studio 메뉴에 영상 파일을 올리면 아래 과정이 자동으로 진행됩니다.

1. **전사**: 원본 음성을 텍스트로 받아 적고, 누가 말했는지 화자를 구분합니다.
2. **번역**: 대상 언어로 번역합니다 — 여기서 **직접 검수**하느냐가 품질을 가릅니다.
3. **음성 생성**: 원래 화자의 목소리 느낌을 유지한 채 다른 언어로 말하게 합니다. 내 목소리가 그대로 영어를 하는 셈입니다.
4. **타이밍 정렬**: 원본에서 말한 길이에 맞춰 속도를 조정합니다.
5. **검수·내보내기**: 구간별로 들어보며 고친 뒤 오디오나 영상 파일로 출력합니다.

## 품질을 가르는 두 지점

- **번역 검수**: 자동 번역은 관용구·유행어에 약합니다. 해당 언어를 아는 사람의 검토를 거치세요. 어렵다면 최소한 역번역(번역문을 다시 한국어로 번역해 뜻이 온전한지 보는 것)이라도 확인하세요.
- **길이 차이**: 한국어를 영어로 옮기면 문장이 길어지는 경향이 있어, 정해진 시간 안에 말하느라 말이 빨라질 수 있습니다. 원고를 미리 간결하게 다듬으면 해결됩니다.

## 실전 팁

- 시작 전에 **자막 대신 더빙**이 꼭 필요한 콘텐츠인지부터 판단하세요. 얼굴이 화면에 안 나오는 내레이션 영상이 더빙 효과가 가장 큽니다 — 입 모양과 소리가 어긋날 걱정이 없기 때문입니다.
- 첫 더빙은 5분 이하의 짧은 영상으로 시험해 보세요. 전 과정을 한 번 겪어봐야 어디를 검수해야 할지 감이 잡힙니다.

> 💡 **핵심**: 더빙 자동화에서 기계가 못 하는 단계는 단 하나, **번역 검수**입니다. 그 한 단계에 사람을 배치하세요.$aix$,
  $aix${"type":"steps","title":"다국어 더빙 5단계","steps":[{"label":"전사","sublabel":"음성 → 텍스트, 화자 분리","icon":"file-text"},{"label":"번역","sublabel":"사람 검수 필수 구간","icon":"globe"},{"label":"음성 생성","sublabel":"원래 목소리 특성 유지","icon":"mic"},{"label":"타이밍 정렬","sublabel":"원본 발화 길이에 맞춤","icon":"clock"},{"label":"검수 · 내보내기","sublabel":"구간별 확인 후 출력","icon":"check"}],"caption":"5단계 중 4단계는 자동 — 사람의 가치는 2단계(번역 검수)에 있습니다."}$aix$::jsonb, null, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1ebc8a8c-d9d7-a681-b9c7-19cd4a7eb07e', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/mixing-bgm-and-voice', 'mixing-bgm-and-voice', '영상에 BGM과 더빙 입히기: 레벨 밸런스와 덕킹',
  $aix$좋은 BGM과 좋은 더빙을 만들어도, 섞는 순간 망칠 수 있습니다. 다행히 믹싱(여러 소리를 한 결과물로 섞는 작업)의 규칙은 단순합니다 — **목소리가 왕**입니다.

## 레벨 밸런스의 기본 공식

오디오 트랙은 역할별로 크기의 서열이 있습니다. 여기서 dB(데시벨)는 소리 크기 단위로, 0에 가까울수록 큰 소리입니다.

- **내레이션(더빙)**: 가장 크게, 평균 -6 ~ -12dB 부근
- **효과음**: 내레이션보다 약간 작게
- **BGM**: 목소리가 나올 때 -20 ~ -25dB 수준으로, 배경에 깔리게

숫자는 편집 프로그램에서 각 트랙의 볼륨 값을 조정하면 됩니다. 그리고 숫자보다 확실한 검증법이 있습니다. **스마트폰 스피커로 들어보세요.** 작은 스피커에서 목소리가 묻히면 밸런스 실패입니다.

## 덕킹(Ducking): 자동으로 비켜주는 BGM

- 덕킹은 **목소리가 나오는 순간 BGM 볼륨을 자동으로 낮추는** 기법입니다. 사회자가 말을 시작하면 알아서 조용해지는 행사장 음악을 떠올리면 됩니다.
- 프리미어 프로(Essential Sound 패널 → 덕킹), 다빈치 리졸브, 캡컷 모두 자동 덕킹을 지원합니다.
- 키프레임(볼륨을 바꿀 지점을 하나씩 손으로 찍는 표시)을 일일이 만드는 것보다 훨씬 빠르고, 목소리가 쉬는 구간에서 BGM이 자연스럽게 살아납니다.

## 마지막 점검

- 전체 음량은 유튜브 기준 약 **-14 LUFS**에 맞추세요. 플랫폼이 자동으로 볼륨을 조정할 때 안전한 값입니다.
- 측정이 어렵게 느껴지면 편집 프로그램의 라우드니스 미터(음량 측정 계기판)나 자동 음량 맞춤 기능을 쓰면 됩니다. 숫자를 외우는 것보다 습관이 중요합니다.

> 💡 **핵심**: 믹싱 우선순위는 목소리 > 효과음 > BGM. 그리고 덕킹 기능이 이 서열을 자동으로 지켜줍니다.$aix$,
  $aix${"type":"stack","title":"오디오 트랙의 서열","layers":[{"label":"내레이션 (더빙)","sublabel":"가장 크게 · 항상 왕좌","icon":"mic","tone":"primary"},{"label":"효과음","sublabel":"내레이션보다 한 단계 아래","icon":"zap","tone":"accent"},{"label":"BGM","sublabel":"목소리 나오면 덕킹으로 자동 하강","icon":"music","tone":"muted"},{"label":"최종 라우드니스","sublabel":"유튜브 기준 약 -14 LUFS","icon":"gauge","tone":"success"}],"caption":"위층이 나올 때 아래층이 비켜주는 구조 — 이것이 덕킹입니다."}$aix$::jsonb, $aix${"title":"타임라인에서 레벨 밸런스와 덕킹 따라하기","app":{"kind":"design-canvas","windowTitle":"사운드 믹싱 — 오디오 타임라인","tools":[{"id":"tool-mic","icon":"mic","label":"더빙 트랙"},{"id":"tool-music","icon":"music","label":"BGM 트랙"},{"id":"tool-duck","icon":"gauge","label":"덕킹"}],"objects":[{"id":"timeline","shape":"frame","label":"오디오 타임라인","x":4,"y":6,"w":92,"h":88},{"id":"video-track","shape":"rect","label":"영상 트랙","x":8,"y":14,"w":84,"h":14,"color":"#64748b"},{"id":"voice-track","shape":"rect","label":"내레이션 -9dB","x":22,"y":36,"w":56,"h":13,"color":"#8b5cf6","hidden":true},{"id":"voice-track-aligned","shape":"rect","label":"내레이션 -9dB","x":8,"y":36,"w":56,"h":13,"color":"#8b5cf6","hidden":true},{"id":"bgm-track","shape":"rect","label":"BGM -22dB","x":8,"y":58,"w":84,"h":13,"color":"#14b8a6","hidden":true},{"id":"bgm-duck","shape":"rect","label":"덕킹: 목소리 구간 -25dB","x":8,"y":74,"w":56,"h":10,"color":"#0f766e","hidden":true},{"id":"lufs-badge","shape":"text","label":"최종 -14 LUFS ✓","x":68,"y":76,"w":24,"h":8,"hidden":true}]},"actions":[{"t":"caption","text":"① 더빙 트랙 도구로 내레이션을 타임라인에 올립니다"},{"t":"move","target":"tool-mic"},{"t":"click"},{"t":"drag","from":"video-track","to":"voice-track"},{"t":"reveal","target":"voice-track"},{"t":"wait","ms":400},{"t":"caption","text":"② 드래그로 내레이션을 영상 시작점에 맞춰 정렬합니다"},{"t":"drag","from":"voice-track","to":"voice-track-aligned"},{"t":"hide","target":"voice-track"},{"t":"reveal","target":"voice-track-aligned"},{"t":"wait","ms":400},{"t":"caption","text":"③ BGM은 목소리보다 작게, 맨 아래 층에 깔아줍니다"},{"t":"move","target":"tool-music"},{"t":"click"},{"t":"drag","from":"voice-track-aligned","to":"bgm-track"},{"t":"reveal","target":"bgm-track"},{"t":"wait","ms":400},{"t":"caption","text":"④ 덕킹을 켜 목소리 구간의 BGM을 자동으로 낮춥니다"},{"t":"move","target":"tool-duck"},{"t":"click"},{"t":"reveal","target":"bgm-duck"},{"t":"caption","text":"⑤ 스마트폰 스피커로 확인하고 -14 LUFS로 마무리합니다"},{"t":"reveal","target":"lufs-badge"},{"t":"move","target":"lufs-badge"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8330e7e2-30a7-64ef-2613-5b3191ae6f87', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/podcast-audiobook-automation', 'podcast-audiobook-automation', '팟캐스트·오디오북 자동화 파이프라인',
  $aix$원고만 쓰면 나머지는 기계가 하는 시대입니다. 매주 반복되는 오디오 콘텐츠는 **파이프라인**(공장 조립 라인처럼 작업 단계를 이어 붙인 자동 흐름)으로 만들면 제작 시간이 10분의 1로 줄어듭니다.

## 반복되는 4단계를 자동화

1. **원고**: 블로그 글·뉴스레터를 LLM에게 맡겨 '말하기용 대본'으로 바꿉니다 — 문어체를 구어체로.
2. **음성 생성**: 고정 보이스와 저장해 둔 설정으로 ElevenLabs API를 호출합니다. 매회 같은 목소리가 곧 브랜드가 됩니다.
3. **후반 작업**: Suno로 만든 인트로 징글(채널을 알리는 짧은 로고 음악)을 붙이고, 에피소드마다 음량을 고르게 맞춥니다. 스크립트나 자동화 도구(Make, n8n)로 처리합니다.
4. **발행**: 팟캐스트 호스팅 서비스에 올리고 에피소드 제목·설명을 채웁니다. 설명에는 "AI 보이스 사용" 고지도 함께 넣으세요.

## 오디오북은 '장(章) 단위'로

- 책 한 권을 통째로 넣지 마세요. **장별로 나눠 생성**하면 오류가 났을 때 그 장만 다시 만들면 되니 시간이 크게 절약됩니다.
- 등장인물 대사가 많으면 화자별로 보이스를 나눌 수도 있습니다. 하지만 입문 단계에서는 **내레이터 한 명 + 오디오 태그**가 관리하기 훨씬 쉽습니다.

## 사람이 남아야 할 자리

자동화를 해도 **발행 전 전체 듣기**는 생략하지 마세요. 발음 오류나 어색한 번역투는 아직 사람 귀가 가장 빨리 잡습니다.

그리고 처음부터 4단계 전부를 자동화하려 하지 마세요. 가장 반복이 지겨운 한 단계부터 자동화하고, 익숙해지면 옆 단계로 넓혀가는 것이 실패 없는 순서입니다.

> 💡 **핵심**: '원고 → 음성 → 후반 → 발행'을 한 번 파이프라인으로 만들면, 이후엔 원고만 넣으면 됩니다. 반복 작업은 설계 대상입니다.$aix$,
  $aix${"type":"cycle","title":"주간 오디오 콘텐츠 파이프라인","center":"매주 반복","nodes":[{"label":"원고 변환","sublabel":"문어체 → 구어체 대본","icon":"file-text"},{"label":"음성 생성","sublabel":"고정 보이스 API 호출","icon":"mic"},{"label":"후반 작업","sublabel":"징글 붙이기 + 음량 고르게","icon":"settings"},{"label":"검수 · 발행","sublabel":"전체 듣기 후 업로드","icon":"upload"}],"caption":"사이클 중 자동화 불가 구간은 '검수' 하나 — 나머지는 기계에 맡기세요."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '45000cb9-1376-bf64-439f-10893fd0a608', 'a7c86bcd-9639-11de-3642-91f5870b3aac', 'ai-audio/copyright-and-policy', 'copyright-and-policy', '음원 저작권과 플랫폼 정책: 2026 상업 이용 가이드',
  $aix$만드는 것보다 중요한 것이 **쓸 수 있는가**입니다. AI 음원을 상업적으로(수익이 나는 콘텐츠에) 써도 되는지는 "어떤 플랜으로 만들었나"에 따라 달라집니다.

## 대원칙: 유료 플랜 = 상업적 이용

- **Suno**: 유료 플랜(Pro/Premier) 구독 중에 만든 곡은 상업적 이용이 허용됩니다. **무료 플랜 곡은 비상업 용도로 제한**되고 출처 표기가 요구됩니다.
- **ElevenLabs**: 역시 유료 플랜부터 상업 라이선스가 부여됩니다. 무료 플랜은 비상업 + 출처 표기 조건입니다.
- 기준은 **생성 시점**의 플랜입니다. 구독을 해지해도 그 전에 만든 곡의 권리는 유지되는 것이 일반적이지만, 약관 원문을 꼭 확인하세요.

## 플랫폼별 체크포인트

- **유튜브**: AI 음원 자체는 문제없습니다. 다만 **사실적인 AI 음성·합성 콘텐츠는 업로드할 때 공개 설정 화면에서 고지**해야 합니다. Content ID(유튜브가 기존 저작권 음원과 자동 대조하는 시스템)에 잘못 걸리면, 생성 기록을 근거로 이의 제기가 가능합니다.
- **음원 유통(스포티파이 등)**: AI 생성곡도 유통할 수 있지만, 아티스트 사칭·스트리밍 조작은 삭제 사유입니다.
- **광고·클라이언트 납품**: 계약서에 "AI 생성물 포함" 여부를 명시하는 것이 2026년 실무 표준입니다.

## 안전 수칙 세 가지

- 생성 당시의 **플랜·날짜·프롬프트를 기록**해 두세요. 분쟁이 생기면 증거가 됩니다.
- 특정 가수 스타일을 흉내 낸 곡을 그 가수 이름을 걸고 홍보하지 마세요.
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
  $aix$세상의 모든 업무 자동화는 한 문장으로 요약됩니다. **"무언가 일어나면(트리거), 무언가를 한다(액션)."** 초인종이 울리면(트리거) 문을 열러 나가는(액션) 것과 같은 구조입니다.

## 자동화의 3요소

- **트리거(Trigger)** — 자동화를 깨우는 사건. 폼 응답 도착, 메일 수신, 매일 오전 9시 등.
- **액션(Action)** — 트리거 이후 실행되는 일. 시트에 행 추가, 슬랙 알림, 메일 발송 등.
- **노드(Node)** — 트리거와 액션 하나하나를 담은 블록. 노드를 선으로 이으면 **시나리오**(Zapier에서는 Zap)가 됩니다.

## 왜 '노드'로 생각해야 하나

- 자동화 도구의 화면은 결국 **노드를 선으로 연결하는 캔버스**(블록을 놓고 잇는 작업판)입니다.
- 노드 사이를 흐르는 것은 **데이터**입니다. 앞 노드의 출력이 뒷 노드의 입력이 됩니다.
- 아무리 복잡한 자동화도 "트리거 1개 + 액션 N개의 연결"로 분해하면 전부 읽을 수 있습니다.

## 첫 감각 잡기

내 업무 중 "A가 생기면 B에 옮겨 적는다"에 해당하는 일을 하나 떠올려 보세요. 예를 들어 "신청 메일이 오면 엑셀에 옮겨 적는다" 같은 일입니다. 그것이 여러분의 첫 시나리오 후보입니다. 좋은 첫 후보의 조건은 두 가지입니다. **판단 없이 규칙만으로 처리되는 일**, 그리고 **일주일에 여러 번 반복되는 일**. 판단이 필요한 일은 3모듈에서 AI 노드로 해결합니다.

> 💡 **핵심**: 자동화 설계 = "무슨 사건이(트리거) → 어떤 데이터가 흘러서(노드 연결) → 무슨 일이 일어나는가(액션)"를 그리는 일입니다.$aix$,
  $aix${"type":"flow","title":"자동화 시나리오의 뼈대","nodes":[{"label":"트리거","sublabel":"폼 응답 도착","icon":"zap","tone":"warning"},{"label":"액션 노드 1","sublabel":"스프레드시트에 행 추가","icon":"database","tone":"primary","edgeLabel":"응답 데이터"},{"label":"액션 노드 2","sublabel":"팀 채널에 알림 발송","icon":"send","tone":"accent","edgeLabel":"저장 완료"}],"caption":"노드 사이를 흐르는 것은 데이터 — 앞 노드의 출력이 뒷 노드의 입력입니다."}$aix$::jsonb, $aix${"title":"Gmail 트리거가 울리는 순간 따라하기","app":{"kind":"email-app","folders":[{"id":"fd-inbox","name":"받은편지함","count":2,"active":true},{"id":"fd-sent","name":"보낸편지함"},{"id":"fd-auto","name":"자동화/처리됨"}],"emails":[{"id":"e-old","from":"주간 뉴스레터","subject":"7월 넷째 주 업계 소식","preview":"이번 주 하이라이트를 전해드립니다…"},{"id":"e-new","from":"고객 김민준","subject":"Pro 플랜 신청 문의드립니다","preview":"안녕하세요, 신청 절차가 궁금해서 연락드립니다…","unread":true,"hidden":true}],"compose":{"id":"cp","toId":"cp-to","subjectId":"cp-subj","bodyId":"cp-body","sendId":"cp-send"}},"actions":[{"t":"caption","text":"① 받은편지함에 새 메일 도착 — 이 사건이 트리거입니다"},{"t":"reveal","target":"e-new"},{"t":"wait","ms":600},{"t":"caption","text":"② 사람은 메일을 클릭해 확인만 합니다"},{"t":"move","target":"e-new"},{"t":"click"},{"t":"wait","ms":500},{"t":"caption","text":"③ 트리거가 울리면 자동화가 액션(자동 회신)을 시작합니다"},{"t":"reveal","target":"cp"},{"t":"type","target":"cp-to","text":"minjun.kim@example.com"},{"t":"type","target":"cp-subj","text":"문의 접수 안내 (자동 회신)"},{"t":"type","target":"cp-body","text":"접수되었습니다. 1영업일 내 답변드립니다."},{"t":"wait","ms":400},{"t":"caption","text":"④ 발송 버튼까지 자동화가 누릅니다 — 액션 완료"},{"t":"move","target":"cp-send"},{"t":"click"},{"t":"hide","target":"cp"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 처리된 메일은 전용 폴더로 정리됩니다"},{"t":"move","target":"fd-auto"},{"t":"click"},{"t":"hide","target":"e-new"},{"t":"caption","text":"✅ 트리거 1번 = 액션 자동 실행 — 이것이 자동화입니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 4, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '52bfdf6e-16e9-2507-9dd3-8559562cd855', '0ac23c4e-607f-e717-793d-2ac4049637ed', 'nocode-automation/make-vs-zapier-vs-n8n', 'make-vs-zapier-vs-n8n', 'Make vs Zapier vs n8n: 무엇으로 시작할까',
  $aix$도구 선택으로 일주일을 고민하는 분이 많습니다. 하지만 2026년 기준, 세 도구의 성격만 알면 10분 안에 결정할 수 있습니다.

## 세 도구의 성격

- **Zapier** — 가장 쉽고 연동 앱이 가장 많습니다(8,000개+). 트리거 하나에 액션을 일렬로 잇는 직선형 Zap 중심이라, 단순한 자동화를 빨리 만들 때 최적입니다. AI 에이전트 빌더(Zapier Agents)로 말로 시키는 자동화까지 확장됩니다.
- **Make.com** — 시각적 캔버스에서 갈래를 나누고 반복하는 복잡한 흐름을 그리기 좋습니다. 실행 1회당 비용(오퍼레이션 단가)이 저렴해 대량 실행에 유리합니다. AI Agents 기능으로 시나리오에 자율 판단 단계를 넣을 수 있습니다.
- **n8n** — 소스가 공개된 도구입니다(페어코드 라이선스). 내 서버에 직접 설치(셀프호스팅)하면 실행량 과금이 없고, 코드 노드와 AI 워크플로우 덕분에 확장성이 가장 큽니다. 대신 초기 학습과 서버 관리가 필요합니다.

## 선택 기준 3문항

1. **처음이고 빨리 결과를 보고 싶다** → Zapier
2. **분기가 많고 실행량이 많다(비용 민감)** → Make
3. **데이터를 회사 밖으로 못 보내거나, 개발자 협업이 가능하다** → n8n

## 이 강의의 선택

기본 개념은 세 도구가 동일합니다. 그래서 이 강의는 **Make를 기준**으로 하되 Zapier 용어를 함께 적습니다. 하나를 익히면 다른 도구로 갈아타는 데 하루면 충분합니다.

> 💡 **핵심**: 도구보다 **개념(트리거·노드·데이터 흐름)**이 자산입니다. 일단 하나로 시작하세요 — 이 강의에서는 Make입니다.$aix$,
  $aix${"type":"compare","title":"2026년 자동화 도구 3파전","columns":[{"title":"Zapier","icon":"zap","tone":"accent","items":["연동 앱 8,000개+ 최다","직선형 Zap, 가장 쉬움","Zapier Agents (AI)","태스크당 비용은 높은 편"]},{"title":"Make.com","icon":"workflow","tone":"primary","items":["시각적 캔버스 · 분기 강함","오퍼레이션 단가 저렴","AI Agents 내장","이 강의의 기준 도구"]},{"title":"n8n","icon":"server","tone":"muted","items":["페어코드 · 셀프호스팅","실행량 과금 없음(자체 서버)","코드·AI 노드 확장성 최고","서버 관리 부담 있음"]}],"caption":"쉬움 → Zapier, 복잡·대량 → Make, 보안·확장 → n8n."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e5472b16-535e-ec6d-b48e-b656790707fd', '0ac23c4e-607f-e717-793d-2ac4049637ed', 'nocode-automation/first-scenario', 'first-scenario', '실습: 첫 시나리오 — 폼 응답을 시트와 알림으로',
  $aix$백문이 불여일런(run) — 백 번 듣기보다 한 번 실행이 낫습니다. 가장 보편적인 자동화 — **폼 응답 → 스프레드시트 저장 → 팀 알림** — 을 Make에서 직접 만들어 봅니다.

## 만들 것

Google Forms에 신청이 들어오면, Google Sheets에 자동 기록하고 Slack으로 알림을 보내는 시나리오입니다.

## 따라 하기

1. **트리거 배치**: Make에 로그인해 화면 오른쪽 위 **"+ Create a new scenario"** 버튼을 클릭합니다. 빈 캔버스 가운데의 큰 **+ 버튼**을 누르고 검색창에 "Google Forms"를 입력해 **"Watch Responses"**를 선택합니다. 구글 계정 연결 팝업이 뜨면 로그인해 허용합니다.
2. **테스트 데이터 확보**: 내 폼에 답을 한 번 직접 제출한 뒤, 캔버스 왼쪽 아래 **"Run once"** 버튼을 눌러 방금 그 응답을 가져옵니다. 이 데이터가 다음 노드의 재료가 됩니다.
3. **액션 노드 1**: Forms 노드 오른쪽의 +를 눌러 Google Sheets **"Add a Row"**를 붙이고, 폼 응답의 이름·이메일 필드를 시트 열에 끌어다 놓습니다(이 연결이 **매핑**입니다).
4. **액션 노드 2**: 같은 방법으로 Slack **"Create a Message"**를 붙이고, 알림 문구에 이름 필드를 끼워 넣습니다.
5. **스케줄 켜기**: 캔버스 왼쪽 아래 **토글을 ON**으로 바꾸면 이후 응답부터 자동 실행됩니다.

## 여기서 막힌다면

- 매핑 목록이 비어 있다면 → 2번(테스트 실행)을 건너뛴 것입니다. 폼 제출 후 다시 Run once 하세요.
- 검색해도 앱이 안 보이면 → 이름을 끝까지 정확히 입력해 보세요.
- 알림이 두 번 온다면 → 같은 시나리오가 중복으로 켜져 있는지 확인하세요.

> 💡 **핵심**: 트리거 연결 직후 **반드시 한 번 실행해 실제 데이터를 확보**하세요. 매핑은 언제나 진짜 데이터 위에서 합니다.$aix$,
  $aix${"type":"steps","title":"첫 시나리오 5단계","steps":[{"label":"트리거 배치","sublabel":"Google Forms · Watch Responses","icon":"zap"},{"label":"테스트 실행","sublabel":"Run once로 실데이터 확보","icon":"play"},{"label":"시트 노드 연결","sublabel":"응답 필드를 열에 매핑","icon":"database"},{"label":"슬랙 노드 연결","sublabel":"알림 문구에 필드 삽입","icon":"send"},{"label":"스케줄 활성화","sublabel":"토글 ON — 자동 운행 시작","icon":"check"}],"caption":"5단계, 약 15분 — 여러분의 첫 자동화가 돌기 시작합니다."}$aix$::jsonb, $aix${"title":"Make 캔버스에서 첫 시나리오 조립 따라하기","app":{"kind":"automation-canvas","windowTitle":"폼 응답 알림 시나리오 — Make","nodes":[{"id":"n-forms","icon":"zap","label":"Google Forms","sublabel":"Watch Responses","tone":"warning","hidden":true},{"id":"n-sheets","icon":"database","label":"Google Sheets","sublabel":"Add a Row","tone":"primary","hidden":true},{"id":"n-slack","icon":"send","label":"Slack","sublabel":"Create a Message","tone":"accent","hidden":true}],"runLog":[{"id":"log-run","text":"▶ Run once — 테스트 실행","tone":"out","hidden":true},{"id":"log-forms","text":"✓ Google Forms: 응답 1건 수신 (김민준)","tone":"ok","hidden":true},{"id":"log-sheets","text":"✓ Google Sheets: 3행에 기록 완료","tone":"ok","hidden":true},{"id":"log-slack","text":"✓ Slack: #신청-알림 채널 발송 — 시나리오 성공","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 트리거 슬롯을 클릭해 Google Forms를 배치합니다"},{"t":"move","target":"n-forms"},{"t":"click"},{"t":"reveal","target":"n-forms"},{"t":"wait","ms":500},{"t":"caption","text":"② Run once로 실제 응답 데이터를 확보합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-forms"},{"t":"wait","ms":600},{"t":"caption","text":"③ 시트 노드를 연결하고 이름·이메일 필드를 매핑합니다"},{"t":"move","target":"n-sheets"},{"t":"click"},{"t":"reveal","target":"n-sheets"},{"t":"wait","ms":500},{"t":"caption","text":"④ 슬랙 노드를 붙여 알림 문구에 필드를 끼워 넣습니다"},{"t":"move","target":"n-slack"},{"t":"click"},{"t":"reveal","target":"n-slack"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 전체 실행 — 세 노드가 차례로 초록 불이 됩니다"},{"t":"reveal","target":"log-sheets"},{"t":"reveal","target":"log-slack"},{"t":"move","target":"log-slack"},{"t":"caption","text":"✅ 첫 시나리오 완성 — 토글을 켜면 자동 운행됩니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '92d72b40-90a9-c431-c684-a8d1c2188c14', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/routers-and-filters', 'routers-and-filters', '라우터와 필터: 조건에 따라 길을 나누기',
  $aix$실무의 자동화는 직선이 아닙니다. "VIP 문의는 매니저에게, 일반 문의는 시트에만" — 이렇게 조건에 따라 길을 나누는 **분기**가 필요합니다. 분기를 만드는 부품이 라우터와 필터입니다.

## 필터(Filter): 통과 조건 걸기

- 노드와 노드 **사이의 선**에 조건을 답니다. 조건을 만족하는 데이터만 다음 노드로 통과합니다. 검문소와 같은 역할입니다.
- 예: "금액 ≥ 100만 원일 때만 알림" — 조건에 못 미치는 데이터는 조용히 버려집니다.
- Zapier에서는 "Filter" 스텝, Make에서는 연결선 위의 필터 아이콘입니다.

## 라우터(Router): 여러 갈래로 나누기

- 하나의 흐름을 **여러 경로로 복제**하고, 각 경로에 서로 다른 필터를 답니다. 우편물을 지역별 칸에 나누는 우체국 분류대를 떠올리면 됩니다.
- 예: 문의 유형이 "환불"이면 CS팀 경로, "제휴"면 영업팀 경로, 나머지는 기본 경로.
- 마지막에 **폴백(fallback) 경로**(어떤 조건에도 안 걸린 데이터가 가는 기본 길)를 두면 데이터가 사라지지 않습니다.

## 설계 감각

- 분기 조건은 **서로 겹치지 않게** 만드세요. 두 경로에 동시에 걸리면 같은 일이 중복 실행됩니다.
- 경로가 4개를 넘으면 시나리오를 둘로 쪼개는 편이 관리하기 낫습니다.

> 💡 **핵심**: 필터는 "통과/차단", 라우터는 "갈림길". 그리고 **폴백 경로 없는 라우터는 데이터를 흘립니다** — 반드시 기본 경로를 두세요.$aix$,
  $aix${"type":"flow","title":"라우터 분기 파이프라인","nodes":[{"label":"트리거: 문의 접수","icon":"mail","tone":"warning"},{"label":"라우터","sublabel":"문의 유형으로 경로 결정","icon":"git-branch","tone":"primary"},{"label":"환불 경로 → CS팀 배정","icon":"users","tone":"accent","edgeLabel":"유형 = 환불"},{"label":"폴백 경로 → 기본 시트 기록","icon":"database","tone":"muted","edgeLabel":"그 외 전부"}],"caption":"각 경로의 필터 조건은 겹치지 않게, 폴백은 반드시 하나."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3c5d46ec-f89c-da7f-4d3a-79ac00fcc4a4', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/data-transformation', 'data-transformation', '데이터 변환: 매핑, 포매터, 집계',
  $aix$자동화가 깨지는 원인 1위는 연결이 아니라 **데이터 모양**입니다. 앞 노드가 주는 형태와 뒷 노드가 원하는 형태가 다르면 흐름이 멈춥니다. 이 둘을 맞추는 기술이 데이터 변환 — 규격이 다른 플러그 사이에 끼우는 '어댑터'입니다.

## 매핑(Mapping): 필드 이어 붙이기

- 앞 노드의 출력 필드를 뒷 노드의 입력 칸에 끌어다 놓는 것입니다.
- 고정 텍스트와 필드를 섞어 쓸 수 있습니다: `신규 신청: {이름} ({이메일})`

## 포매터(Formatter): 형태 바꾸기

- **날짜**: `2026-07-28T09:00:00Z` → `2026년 7월 28일` (타임존, 즉 나라별 기준 시각에 주의!)
- **텍스트**: 대소문자 바꾸기, 공백 제거, 분리(split), 치환(replace)
- **숫자**: 통화 표기, 반올림. Zapier는 Formatter 스텝을 쓰고, Make는 내장 함수(`formatDate`, `replace` 등)를 매핑 칸 안에서 바로 씁니다.

## 집계(Aggregator): 여러 개를 하나로

- 행 10개를 받아 **요약 하나**로 묶습니다. 예: 오늘 주문 목록 → 한 통의 일일 리포트 메일.
- 반대 방향은 **이터레이터(Iterator)** — 묶음 하나를 낱개로 풀어 하나씩 반복 처리합니다.

## 초보자가 자주 겪는 장면

시트에 날짜가 이상하게 적히거나 저장이 실패한다면, 대부분 앞 노드의 날짜 형식이 시트가 기대하는 형식과 다른 경우입니다. 이때 연결을 의심하지 말고, 두 노드 사이에 포매터(변환)를 끼워 넣으면 해결됩니다.

> 💡 **핵심**: 노드 연결이 뼈대라면 변환은 관절입니다. 막히면 항상 **"앞 노드의 출력 데이터가 실제로 어떤 모양인지"**부터 확인하세요.$aix$,
  $aix${"type":"grid","title":"데이터 변환 도구 상자","items":[{"label":"매핑","sublabel":"필드 ↔ 칸 연결","icon":"link","tone":"primary"},{"label":"날짜 포매터","sublabel":"형식·타임존 변환","icon":"calendar","tone":"accent"},{"label":"텍스트 포매터","sublabel":"분리·치환·정리","icon":"scissors","tone":"accent"},{"label":"숫자 포매터","sublabel":"통화·반올림","icon":"dollar","tone":"accent"},{"label":"집계 (Aggregator)","sublabel":"여러 행 → 하나로","icon":"layers","tone":"success"},{"label":"이터레이터","sublabel":"배열 → 낱개 반복","icon":"repeat","tone":"warning"}],"caption":"막히면 변환 도구부터 — 연결 문제의 대부분은 데이터 모양 문제입니다."}$aix$::jsonb, null, 5, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '716e51e7-3431-8cfc-7f98-ff41930d098c', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/webhooks', 'webhooks', '웹훅: 목록에 없는 서비스도 연결하기',
  $aix$"우리 사내 시스템은 연동 목록에 없는데요?" — 괜찮습니다. **웹훅(Webhook)**을 알면 HTTP(웹에서 데이터를 주고받는 통신 방식)를 쓰는 어떤 서비스든 연결할 수 있습니다.

## 웹훅이란

- 웹훅은 **이벤트가 생기면 정해진 URL로 데이터를 쏘아 주는** 방식입니다. 내 자동화 전용 우편함 주소를 하나 받는 셈입니다.
- Make에서 "Custom Webhook" 트리거를 만들면 나만의 고유 URL이 발급됩니다. 이 URL로 데이터가 도착하는 순간 시나리오가 실행됩니다.
- 폴링(주기적으로 새 소식을 확인하는 방식)과 달리 **즉시 실행 + 오퍼레이션 절약**이라는 이점이 있습니다.

## 양방향으로 쓰기

- **받기(트리거)**: 사내 시스템·결제 서비스가 웹훅 URL로 이벤트를 보냅니다 → 시나리오 시작.
- **보내기(액션)**: HTTP 모듈로 외부 API에 직접 요청합니다 → 연동 앱이 없어도 호출 가능.

## 첫 테스트는 curl로

curl(터미널에서 인터넷 요청을 보내는 명령어)로 발급받은 URL에 데이터를 직접 쏘아 보세요. 구조가 단번에 이해됩니다. 도착한 JSON의 필드는 이후 노드에서 그대로 매핑할 수 있습니다.

## 주의점

- 웹훅 URL은 **비밀번호처럼** 취급하세요. 주소를 아는 사람은 누구나 내 자동화를 실행시킬 수 있습니다.
- 검증용 비밀 값(시크릿)을 하나 정해 요청에 넣게 하고, 그 값이 없는 요청은 걸러내는 습관을 들이세요.

> 💡 **핵심**: 연동 목록은 편의일 뿐, 본질은 HTTP입니다. **웹훅(받기) + HTTP 모듈(보내기)**만 있으면 사실상 모든 서비스가 연결 대상입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"terminal — 웹훅 테스트","lines":[{"text":"# Make에서 발급받은 웹훅 URL로 테스트 데이터 전송","tone":"comment"},{"text":"curl -X POST https://hook.eu1.make.com/abc123 \\","tone":"cmd"},{"text":"  -H 'Content-Type: application/json' \\","tone":"cmd"},{"text":"  -d '{\"name\":\"김민준\",\"plan\":\"pro\",\"amount\":29000}'","tone":"cmd"},{"text":"Accepted","tone":"ok"},{"text":"# Make 캔버스: 웹훅 노드에 초록 불 — 시나리오 즉시 실행","tone":"comment"},{"text":"# name/plan/amount 필드가 다음 노드에서 매핑 가능해짐","tone":"dim"}],"caption":"curl 한 줄이면 웹훅의 동작 원리가 눈앞에서 확인됩니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '72eaf81e-36a3-438f-242f-74ee02f739fd', 'e0b47e73-c0fe-a504-c669-923206e31b19', 'nocode-automation/error-handling', 'error-handling', '에러 처리와 재시도: 무너지지 않는 파이프라인',
  $aix$자동화는 만들 때가 아니라 **한 달 뒤 조용히 실패할 때** 진짜 실력이 드러납니다. 에러 처리 없는 시나리오는 언젠가 반드시 데이터를 흘립니다.

## 에러의 두 종류

- **일시적 에러** — API 서버의 순간 장애, 요청 한도 초과(rate limit). 통화 중인 전화처럼, **잠시 후 다시 시도하면 대부분 해결**됩니다.
- **영구적 에러** — 필수 필드 누락, 잘못된 인증, 존재하지 않는 레코드. 재시도해도 똑같이 실패합니다. 이때는 **사람에게 알려야** 합니다.

## Make의 에러 처리 방식 4가지 (에러 핸들러)

- **Retry(Break)** — 일정 간격을 두고 재시도. 일시적 에러의 기본기.
- **Resume** — 대체 값을 넣고 계속 진행.
- **Ignore** — 이 건만 버리고 다음 데이터 처리.
- **Rollback/Commit** — 전체 취소 또는 확정. 은행 이체처럼 "전부 성공 아니면 전부 없던 일로" 처리합니다.

## 실무 기본 설계

1. 외부 API 노드에는 **Retry(간격 15분, 최대 3회)**를 답니다.
2. 그래도 실패하면 **에러 알림 경로**(슬랙/메일)로 사람에게 보고합니다.
3. 실패한 실행은 **Incomplete Executions**(미완료 실행 보관함)에 남습니다. 원인을 고친 뒤 그 건만 다시 실행할 수 있습니다.

> 💡 **핵심**: 설계 질문은 "실패하면 어쩌지?"가 아니라 **"일시적 실패는 재시도, 영구적 실패는 누구에게 어떻게 알릴 것인가"**입니다.$aix$,
  $aix${"type":"flow","title":"에러 처리 표준 패턴","nodes":[{"label":"외부 API 호출","icon":"cloud","tone":"primary"},{"label":"실패 감지","sublabel":"일시적? 영구적?","icon":"alert","tone":"warning","edgeLabel":"에러 발생 시"},{"label":"재시도 (Break)","sublabel":"15분 간격 · 최대 3회","icon":"refresh","tone":"accent","edgeLabel":"일시적 에러"},{"label":"사람에게 알림 + 실행 보관","sublabel":"슬랙 보고 · 수정 후 재실행","icon":"shield","tone":"success","edgeLabel":"3회 초과 또는 영구적 에러"}],"loopBack":{"from":2,"to":0,"label":"재시도 (최대 3회)"},"caption":"재시도로 풀리는 실패는 기계가, 안 풀리는 실패는 사람이."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e9b2af84-cd90-04a3-dcc6-bf78c13a6694', '78ec5d66-2ade-8a21-60e8-93c519f0bbaf', 'nocode-automation/ai-modules', 'ai-modules', '시나리오에 AI 모듈 넣기: 분류·요약·생성',
  $aix$라우터의 조건식으로는 "이 문의가 화가 난 고객인지"를 판별할 수 없습니다. **규칙으로 못 가르는 것을 대신 갈라 주는 노드**, 그것이 AI 모듈입니다.

## AI 노드가 잘하는 세 가지

- **분류** — 자유롭게 쓴 글에 라벨 붙이기. "이 문의는 환불/배송/제휴 중 무엇인가?"
- **요약** — 긴 이메일·회의록을 알림에 넣을 3줄로 압축.
- **생성** — 답변 초안, 제목, SNS 문구 등 사람이 다듬을 초안 만들기.

## 연결 방법

- Make·Zapier 모두 **Claude, OpenAI 등 AI 모듈을 기본 제공**합니다. API 키를 연결하고, 프롬프트 칸에 앞 노드의 필드를 매핑해 넣으면 끝입니다.
- 2026년에는 한 단계 더 나아간 **AI 에이전트 노드**(Make AI Agents, Zapier Agents)가 도구 선택까지 스스로 합니다. 다만 시작은 단일 AI 노드로 충분합니다.

## 프롬프트 설계의 철칙: 출력 형식 고정

AI의 출력은 사람이 아니라 **다음 노드가 기계적으로 읽습니다**. 그래서 "환불, 배송, 제휴, 기타 중 한 단어로만 답하라"처럼 답의 형식을 고정해야 합니다. 라우터 필터가 그 단어를 보고 분기합니다. 형식을 고정하지 않으면 AI가 "이 문의는 환불 요청으로 보입니다"처럼 문장으로 답해, 뒷 노드의 필터가 아무것도 못 잡습니다. 연결 후에는 실제 문의 몇 건으로 **먼저 테스트 실행**을 해서 답이 정말 한 단어로 오는지 확인하세요.

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

1. **트리거**: 문의 채널(이메일/폼/채널톡 웹훅)에서 새 문의를 받습니다.
2. **AI 분류 노드**: 문의를 환불/배송/제휴/기타로 분류하고 긴급도(상/중/하)를 판정합니다. 출력은 JSON 형식으로 고정합니다.
3. **AI 초안 노드**: 문의 내용과 분류 결과를 받아 **답변 초안**을 만듭니다. "발송은 사람이 한다"를 전제로 한 초안입니다.
4. **라우터**: 분류 결과에 따라 담당팀 채널로 나눕니다. 긴급도 '상'이면 매니저 호출(멘션)을 붙입니다.
5. **기록**: 모든 건을 시트/CRM에 저장합니다. 나중에 AI 분류가 얼마나 정확했는지 검수할 데이터가 됩니다.

## 왜 '초안'까지만 자동화하나

- AI 분류 정확도가 100%가 아닌 이상, **고객에게 바로 발송하는 것은 위험**합니다.
- 담당자는 초안을 검토·수정해 보냅니다. 응답 시간은 줄고, 사고 위험은 사람이 막습니다.
- 분류 정확도가 데이터로 검증되면(예: 95% 이상) '기타' 외 유형부터 단계적으로 자동 발송을 열 수 있습니다.

## 조립 순서 팁

한 번에 다 만들려 하지 마세요. **트리거 + AI 분류 + 시트 기록**만으로 먼저 돌려 보고, 분류 결과가 그럴듯하면 초안 노드와 라우터를 하나씩 붙입니다. 앞에서 배운 폴백 경로(2모듈 1강)와 에러 재시도(2모듈 4강)도 잊지 말고 달아 주세요.

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

- Make의 **History**, Zapier의 **Zap Runs** 메뉴에서 실행 한 건 한 건의 입출력 데이터를 볼 수 있습니다.
- "어제부터 알림이 안 와요"의 답은 항상 로그에 있습니다. 트리거가 안 울렸는지, 중간 노드가 실패했는지 바로 구분됩니다.
- 에러 알림 시나리오(2모듈 4강)를 붙여 두면 로그를 매일 열어 보지 않아도 됩니다.

## 비용의 단위: 오퍼레이션

- Make는 **모듈(노드) 1회 실행 = 1 오퍼레이션**으로 세고, 청구는 크레딧 단위입니다. 일반 모듈은 1 오퍼레이션 = 크레딧 1개, 내장 AI 기능은 사용량에 따라 더 씁니다.
- Zapier는 **액션 스텝 1회 성공 = 1 태스크**로 셉니다. 트리거와 필터·포매터 같은 내장 스텝은 태스크로 세지 않습니다.
- 여기에 AI 노드는 **토큰 비용이 별도**로 듭니다. AI 자동화 비용의 대부분은 이쪽에서 나옵니다.

## 오퍼레이션 최적화 3수

1. **필터를 앞에** — 걸러질 데이터는 첫 노드 직후에 차단해 뒷 노드 실행을 아낍니다.
2. **폴링 간격 조정** — 15분마다 확인할 필요가 없다면 1시간으로. 웹훅으로 바꿀 수 있다면 최선입니다.
3. **AI 입력 다이어트** — 이메일 전체가 아니라 필요한 필드만 프롬프트에 넣습니다.

> 💡 **핵심**: 운영 = **로그(건강)와 오퍼레이션(비용)** 두 계기판 읽기. 필터는 앞으로, 폴링은 웹훅으로, AI 입력은 가볍게.$aix$,
  $aix${"type":"cycle","title":"자동화 운영 사이클","center":"매주 반복","nodes":[{"label":"로그 점검","sublabel":"History · 실패 건 확인","icon":"eye"},{"label":"비용 분석","sublabel":"오퍼레이션 · AI 토큰","icon":"chart"},{"label":"최적화","sublabel":"필터 전진 · 웹훅화","icon":"wrench"},{"label":"재배포","sublabel":"수정 후 다시 활성화","icon":"rocket"}],"caption":"만들고 끝이 아닙니다 — 점검·분석·최적화가 매주 도는 운영 루프입니다."}$aix$::jsonb, null, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: n8n 마스터: 셀프호스팅 AI 에이전트 자동화
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '0752fdd0-9cf8-45a3-83c3-8fc529c00920', 'n8n-automation', 'n8n 마스터: 셀프호스팅 AI 에이전트 자동화', $aix$Zapier의 태스크 요금 청구서가 무서워지기 시작했다면, n8n으로 넘어올 때입니다. n8n은 소스가 공개된 fair-code 자동화 플랫폼으로, 내 서버에 직접 설치하면 실행량 과금 없이 무제한으로 돌릴 수 있습니다. 이 강의는 Docker 셀프호스팅부터 LangChain 기반 AI Agent 노드, 자체 데이터 RAG 챗봇, 사람 승인 관문, 그리고 에러 워크플로우·큐 모드 같은 프로덕션 운영 기술까지 — 2026년 기준 n8n의 실전 기능을 처음부터 끝까지 다룹니다.$aix$,
  null, 'business', 'intermediate', array['n8n', '셀프호스팅', 'AI Agent', 'RAG', '워크플로우 자동화']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'ca1f0300-03ca-a90d-6535-9baff0dc6ec9', '0752fdd0-9cf8-45a3-83c3-8fc529c00920', 'n8n-foundation', 'n8n 시작하기', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'bbc543d8-285f-6105-d14d-1ad66620283b', '0752fdd0-9cf8-45a3-83c3-8fc529c00920', 'ai-agent-workflows', 'AI 에이전트 워크플로우', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '175e83e1-d040-95dd-d2f4-ff8544ab06c5', '0752fdd0-9cf8-45a3-83c3-8fc529c00920', 'production-ops', '프로덕션 운영', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '7d593d64-6eb3-b10d-fa9e-4f32ca077c40', 'ca1f0300-03ca-a90d-6535-9baff0dc6ec9', 'n8n-automation/why-n8n', 'why-n8n', '왜 n8n인가: 빌리는 자동화 vs 소유하는 자동화',
  $aix$자동화를 쓰다 보면 Zapier·Make 청구서가 어느 순간 무서워집니다. 이유는 하나 — 두 서비스 모두 **동작 한 번마다 돈을 내는 구조**이기 때문입니다.

## 과금 구조가 모든 것을 가른다

- **Zapier**는 태스크(액션 1회), **Make**는 오퍼레이션(모듈 1회) 단위로 요금을 셉니다. 10단계 워크플로우가 1만 번 돌면 **최대 10만 단위**가 청구됩니다.
- **n8n**은 워크플로우 **실행(execution) 1회 = 1단위**입니다. 같은 작업이 1만 실행으로 끝나고, 안에 스텝이 몇 개 들어 있든 요금은 그대로입니다.
- 내 서버에 직접 설치(셀프호스팅)하면 실행 자체가 **무제한 무료** — 서버비만 남습니다. 설치가 부담스러우면 n8n Cloud(스타터 월 24유로~)도 있습니다.

비유하면 Zapier·Make는 **택시**, 셀프호스팅 n8n은 **내 차**입니다. 가끔 타면 택시가 싸지만, 매일 출퇴근한다면 이야기가 달라지죠. 자동화가 늘어날수록 이 차이는 점점 크게 벌어집니다.

## 돈 말고도 남는 것: 데이터 주권

- 고객 데이터가 외부 회사 서버를 거치지 않고 **내 서버 안에서만** 흐릅니다. 보안 심사를 받는 조직에는 결정적인 장점입니다.
- n8n의 라이선스는 **Sustainable Use License(페어코드)** — 소스 코드가 공개되고 사내 업무용은 무료지만, n8n 자체를 되파는 것은 제한됩니다. 엄밀한 기준(OSI)의 '오픈소스'는 아니라는 점만 정확히 알아두세요.
- Code 노드에 JavaScript/Python 코드를 직접 쓸 수 있어, 노코드의 한계에 막혔을 때 탈출구가 있습니다.

> 💡 **핵심**: n8n의 본질은 "무료 Zapier"가 아니라 **실행 단위 과금 + 셀프호스팅으로 자동화를 자산처럼 소유하는 것**입니다.$aix$,
  $aix${"type":"compare","title":"과금·소유 구조: SaaS vs n8n","columns":[{"title":"Zapier · Make","icon":"cloud","tone":"muted","items":["태스크/오퍼레이션(스텝) 단위 과금","스텝이 늘수록 요금 급증","데이터가 외부 서버를 경유","플랫폼 정책 변경에 종속"]},{"title":"n8n","icon":"zap","tone":"primary","items":["워크플로우 실행 단위 과금","셀프호스팅 시 실행 무제한","데이터가 내 서버에만 머묾","소스 공개 — 직접 확장 가능"]}],"caption":"10단계 × 1만 회 = Zapier·Make는 최대 10만 과금 단위, n8n은 1만 실행입니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0dbc6f95-57a6-ec73-c4c1-6546bed4f983', 'ca1f0300-03ca-a90d-6535-9baff0dc6ec9', 'n8n-automation/self-hosting-docker', 'self-hosting-docker', '설치와 셀프호스팅: Docker 컨테이너 한 방',
  $aix$n8n을 내 서버에 설치하는 표준 방법은 **Docker**입니다. 프로그램과 실행 환경을 통째로 담은 '도시락'을 받아 그대로 여는 방식이라, 명령 몇 줄이면 설치가 끝납니다. 이 레슨이 초보에게 가장 큰 고비이니, 천천히 따라오세요.

## 준비물

- **서버**: VPS(월 몇천 원에 빌리는 인터넷 위의 컴퓨터) 기준 **2 vCPU / 4GB RAM**이면 충분합니다. 연습이 목적이면 내 PC에 Docker Desktop을 설치해도 됩니다.
- 기본 저장소는 SQLite(파일 하나짜리 간이 데이터베이스)지만, 실제 운영에서는 **PostgreSQL**(정식 데이터베이스)을 함께 띄우는 것이 표준입니다.

## 따라하기 4단계

1. 터미널을 열고 `mkdir n8n && cd n8n` 을 입력해 작업 폴더를 만들어 들어갑니다.
2. 폴더 안에 `docker-compose.yml` 파일을 만듭니다 (아래 데모 참고 — 공식 문서 예시를 복사해도 됩니다).
3. `docker compose up -d` 를 입력합니다. "Started"가 보이면 성공입니다.
4. 브라우저 주소창에 `http://localhost:5678` 을 입력하고 관리자 계정을 만듭니다.

**여기서 막힌다면**: "command not found: docker"가 나오면 Docker가 아직 없는 것 — docker.com에서 먼저 설치하세요. 접속 화면이 안 뜨면 1~2분 기다렸다가 새로고침해 보세요.

## 반드시 챙길 설정 3가지

- **`N8N_ENCRYPTION_KEY`** — 크레덴셜을 암호화하는 열쇠. 잃어버리면 저장된 모든 인증 정보를 복구할 수 없으니, 반드시 다른 곳에도 백업하세요.
- **볼륨** — `/home/node/.n8n` 폴더를 컨테이너 바깥에 저장하는 설정. 이게 있어야 컨테이너를 갈아치워도 데이터가 남습니다.
- **HTTPS** — 외부에서 웹훅을 받으려면 Caddy/Traefik 같은 리버스 프록시(앞단에서 도메인과 보안 연결을 대신 처리해 주는 서버)를 붙입니다.

설치를 맡기고 싶다면 **n8n Cloud**, Railway·Render 같은 원클릭 배포 템플릿도 있습니다. 업데이트는 이미지 버전을 올리고 `docker compose up -d` 를 다시 실행하면 끝입니다.

> 💡 **핵심**: Docker + Postgres + 암호화 키 백업. 이 세 가지가 갖춰진 순간부터 여러분의 자동화는 '내 인프라'가 됩니다.$aix$,
  $aix${"type":"terminal","windowTitle":"server — docker compose","lines":[{"text":"docker compose up -d","tone":"cmd"},{"text":"✔ Container n8n-postgres  Started","tone":"ok"},{"text":"✔ Container n8n  Started","tone":"ok"},{"text":"docker compose logs n8n | tail -2","tone":"cmd"},{"text":"Editor is now accessible via:","tone":"out"},{"text":"http://localhost:5678","tone":"out"},{"text":"# 볼륨 + 암호화 키 설정 확인 완료","tone":"comment"},{"text":"✓ 관리자 계정 생성 후 바로 사용 가능","tone":"ok"}],"caption":"Compose 파일 하나로 n8n과 Postgres가 함께 뜹니다."}$aix$::jsonb, $aix${"title":"Docker로 n8n 설치 따라하기","app":{"kind":"code-editor","windowTitle":"docker-compose.yml — 내 서버","files":[{"id":"f-compose","name":"docker-compose.yml","active":true},{"id":"f-env","name":".env"}],"code":[{"id":"d1","text":"services:"},{"id":"d2","text":"n8n:","indent":1},{"id":"d3","text":"image: docker.n8n.io/n8nio/n8n","indent":2},{"id":"d4","text":"ports: [\"5678:5678\"]","indent":2},{"id":"d5","text":"environment:","indent":2},{"id":"d6","text":"- N8N_ENCRYPTION_KEY=${KEY}","indent":3,"tone":"add","hidden":true},{"id":"d7","text":"volumes:","indent":2},{"id":"d8","text":"- n8n_data:/home/node/.n8n","indent":3}],"terminal":[{"id":"t1","text":"docker compose up -d","tone":"cmd","hidden":true},{"id":"t2","text":"✔ Container n8n  Started","tone":"ok","hidden":true},{"id":"t3","text":"docker compose logs n8n","tone":"cmd","hidden":true},{"id":"t4","text":"Editor is now accessible via: http://localhost:5678","tone":"out","hidden":true},{"id":"t5","text":"✓ 브라우저에서 관리자 계정 생성 완료","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① Compose 파일에서 이미지와 포트를 확인합니다"},{"t":"move","target":"d3"},{"t":"click"},{"t":"move","target":"d4"},{"t":"caption","text":"② 크레덴셜 암호화 키를 환경변수로 추가합니다"},{"t":"move","target":"d5"},{"t":"click"},{"t":"type","target":"d6","text":"- N8N_ENCRYPTION_KEY=${KEY}"},{"t":"wait","ms":500},{"t":"caption","text":"③ 컨테이너를 백그라운드로 시작합니다"},{"t":"type","target":"t1","text":"docker compose up -d"},{"t":"reveal","target":"t2"},{"t":"wait","ms":600},{"t":"caption","text":"④ 로그에서 에디터 접속 주소를 확인합니다"},{"t":"type","target":"t3","text":"docker compose logs n8n"},{"t":"reveal","target":"t4"},{"t":"move","target":"t4"},{"t":"reveal","target":"t5"},{"t":"caption","text":"✅ 내 서버에서 n8n이 실행 중입니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '871c2451-c452-6bcd-0680-198e0a77d81f', 'ca1f0300-03ca-a90d-6535-9baff0dc6ec9', 'n8n-automation/first-workflow', 'first-workflow', '기본기와 첫 워크플로우: 웹훅 → 가공 → 알림',
  $aix$n8n의 화면은 Make와 닮았지만, 데이터를 다루는 방식은 훨씬 개발자 친화적입니다. 겁먹을 필요는 없습니다 — 기본기 세 가지만 알면 첫 워크플로우를 바로 만들 수 있습니다.

## 3가지 기본기

- **노드** — 워크플로우를 이루는 블록입니다. 시작점이 되는 트리거 노드(Webhook, Schedule), 외부 서비스를 다루는 앱 노드(Slack, Sheets), 데이터를 다듬는 코어 노드(IF, Edit Fields, Code)로 나뉩니다.
- **크레덴셜** — API 키·토큰 같은 비밀 정보는 워크플로우와 **분리 저장**되고 암호화됩니다. 워크플로우를 남에게 공유해도 비밀은 새지 않습니다.
- **데이터 흐름** — 노드 사이를 흐르는 것은 **JSON 아이템 배열**입니다. 컨베이어 벨트 위를 지나가는 상자라고 생각하세요. 노드를 클릭하면 출력 패널에서 상자 안 내용물(실제 JSON)을 눈으로 확인할 수 있습니다.

## 첫 워크플로우: 리드 수집 알림

랜딩 페이지 폼에 잠재 고객이 등록하면 영업 채널로 알리는 흐름입니다.

1. **Webhook 트리거** — 폼이 데이터를 보낼(POST) 주소를 만듭니다. 테스트용 URL과 운영용 URL이 따로 있으니 헷갈리지 마세요.
2. **Edit Fields** — 이름·이메일·회사만 남기고 정리합니다.
3. **IF** — 회사 도메인 이메일만 통과시킵니다 (gmail 등 무료 메일은 제외).
4. **Slack** — #영업 채널에 리드 카드를 보냅니다.

만드는 동안에는 **핀(Pin)** 기능이 유용합니다. 테스트로 한 번 받은 샘플 데이터를 노드에 고정해 두면, 폼을 매번 다시 제출하지 않고도 뒷단을 다듬을 수 있습니다. 완성되면 화면 오른쪽 위의 **Active 토글**을 켜서 활성화합니다.

> 💡 **핵심**: n8n 실력 = JSON 흐름을 읽는 능력입니다. 노드마다 출력 데이터를 확인하는 습관이 디버깅 시간을 90% 줄입니다.$aix$,
  $aix${"type":"flow","title":"첫 워크플로우: 리드 수집 알림","nodes":[{"label":"Webhook 트리거","sublabel":"폼에서 새 리드 POST 수신","icon":"globe","tone":"accent"},{"label":"Edit Fields","sublabel":"이름·이메일·회사 정리","icon":"wrench"},{"label":"IF 필터","sublabel":"회사 이메일만 통과","icon":"filter","tone":"warning","edgeLabel":"무료 메일은 여기서 종료"},{"label":"Slack 알림","sublabel":"#영업 채널에 리드 카드","icon":"message","tone":"success"}],"caption":"노드 사이를 흐르는 것은 항상 JSON 아이템 — 각 단계의 출력을 눈으로 확인하세요."}$aix$::jsonb, null, 7, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1cdaa254-4f74-105e-bf3d-d24e74061253', 'bbc543d8-285f-6105-d14d-1ad66620283b', 'n8n-automation/ai-node-system', 'ai-node-system', 'n8n의 AI 노드 체계: 루트 노드와 서브 노드',
  $aix$n8n이 Make·Zapier와 결정적으로 갈라지는 지점이 AI입니다. "AI 모듈 하나"를 얹은 수준이 아니라, **LangChain(AI 앱을 조립하는 유명 개발 도구)을 내장한 70여 개의 AI 노드**가 하나의 체계를 이룹니다.

## 클러스터 구조: 본체와 부품

AI 노드는 일반 노드와 연결 방식이 다릅니다. 게임기 본체에 카트리지를 꽂듯, **루트 노드(본체)에 서브 노드(부품)를 꽂아** 능력을 조립합니다.

- **루트 노드** — 워크플로우 본선에 놓이는 본체. 스스로 판단하며 도구를 쓰는 **AI Agent**, 한 번 묻고 한 번 답받는 **Basic LLM Chain**이 대표입니다.
- **서브 노드** — 본체 아래에 꽂는 부품. 무엇을 꽂느냐로 능력이 결정됩니다:
  - **Chat Model**: OpenAI, Anthropic, Google, 그리고 **Ollama**(내 컴퓨터에서 AI 모델을 돌리게 해주는 무료 프로그램)로 로컬 모델까지
  - **Memory**: 대화를 기억하는 부품 — Window Buffer(최근 N개만), Postgres/Redis(대화를 오래 보관)
  - **Tool**: 에이전트가 쓸 도구 — HTTP Request, 다른 워크플로우 호출, 벡터 스토어 검색
  - **Output Parser**: 답변을 정해진 JSON 형식으로 강제

## 대화의 입구: Chat Trigger

**Chat Trigger** 노드를 붙이면 워크플로우가 즉시 채팅 화면을 갖습니다. 임베드 위젯으로 사내 포털에 붙일 수도 있습니다.

셀프호스팅 + Ollama 조합이면 **모델 호출까지 내 서버 안에서** 끝나, 데이터가 밖으로 한 톨도 나가지 않는 AI 자동화도 가능합니다.

> 💡 **핵심**: n8n의 AI는 "노드 하나"가 아니라 **조립식 클러스터**입니다. 루트 노드에 무엇을 꽂는지가 곧 설계입니다.$aix$,
  $aix${"type":"stack","title":"AI Agent 노드의 클러스터 구조","layers":[{"label":"AI Agent (루트 노드)","sublabel":"판단 · 도구 선택 · 반복 실행","icon":"bot","tone":"primary"},{"label":"Chat Model","sublabel":"OpenAI · Anthropic · Ollama(로컬)","icon":"brain","tone":"accent"},{"label":"Memory","sublabel":"Window Buffer · Postgres · Redis","icon":"layers","tone":"accent"},{"label":"Tools + Output Parser","sublabel":"HTTP Request · 벡터 검색 · JSON 강제","icon":"wrench","tone":"muted"}],"caption":"루트 노드에 서브 노드를 꽂아 조립합니다 — LangChain 기반 70여 개 AI 노드."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e468c07a-b66e-0730-5760-69530d704cea', 'bbc543d8-285f-6105-d14d-1ad66620283b', 'n8n-automation/build-tool-agent', 'build-tool-agent', 'AI Agent 노드: 도구를 쓰는 에이전트 만들기',
  $aix$IF 노드로 만든 자동화는 사람이 미리 그려둔 길만 갑니다. 예상 못 한 상황이 오면 거기서 멈추죠. **AI Agent 노드**를 쓰면, 상황을 보고 스스로 도구를 골라 쓰는 에이전트를 캔버스 위에서 조립할 수 있습니다.

## 실전 사례: 리드 스코어링 에이전트

폼으로 들어온 잠재 고객을 에이전트가 조사하고, 등급을 매겨 CRM에 기록하는 흐름입니다.

1. **Webhook** — 새 리드 수신
2. **AI Agent** — 시스템 메시지에 평가 기준을 적습니다: "직원 수, 업종, 기존 거래 여부로 0~100점"
3. 도구 연결: **HTTP Request Tool**(회사 정보 조회), **CRM 조회 Tool**(기존 고객 여부 확인)
4. **Structured Output Parser** — 답변을 `{ score, grade, reason }` JSON 형식으로 강제
5. **CRM 업데이트** — 점수·등급 기록

에이전트는 리드마다 필요한 도구만 골라 씁니다. 기존 고객이면 조회 한 번으로 끝내고, 처음 보는 회사면 외부 조사를 추가하는 식입니다.

## 품질을 가르는 3가지

- **도구 설명(description)이 곧 프롬프트입니다** — 에이전트는 이 설명을 읽고 도구를 고릅니다. "회사 도메인으로 직원 수·업종을 조회한다"처럼 언제 쓰는 도구인지 명확히 적으세요.
- **Max Iterations**(최대 반복 횟수)로 상한을 걸어, 에이전트가 도구를 무한정 호출하는 폭주를 막습니다.
- 출력은 반드시 **Output Parser로 JSON 강제** — 형식이 고정돼야 뒷단 노드가 안정적으로 받아 씁니다.

> 💡 **핵심**: IF 노드는 여러분이 정한 길을 가고, AI Agent는 **도구 목록 안에서 스스로 길을 찾습니다**. 좋은 도구 설명이 좋은 에이전트를 만듭니다.$aix$,
  $aix${"type":"cycle","title":"AI Agent의 실행 사이클","center":"목표: 리드 등급 판정","nodes":[{"label":"판단","sublabel":"어떤 도구가 필요한가","icon":"brain"},{"label":"도구 호출","sublabel":"회사 조회 · CRM 검색","icon":"wrench"},{"label":"관찰","sublabel":"도구 응답 읽기","icon":"eye"},{"label":"확정","sublabel":"점수·등급 JSON 출력","icon":"check"}],"caption":"AI Agent 노드가 이 사이클을 자동으로 돕니다 — Max Iterations로 상한은 필수."}$aix$::jsonb, $aix${"title":"AI Agent 노드 워크플로우 조립 따라하기","app":{"kind":"automation-canvas","windowTitle":"리드 스코어링 에이전트 — n8n","nodes":[{"id":"n-webhook","icon":"globe","label":"Webhook","sublabel":"새 리드 수신","tone":"accent"},{"id":"n-agent","icon":"bot","label":"AI Agent","sublabel":"평가 기준: 시스템 메시지","tone":"primary","hidden":true},{"id":"n-model","icon":"brain","label":"Chat Model","sublabel":"서브 노드 연결","hidden":true},{"id":"n-tool1","icon":"search","label":"HTTP Request Tool","sublabel":"회사 정보 조회","hidden":true},{"id":"n-tool2","icon":"database","label":"CRM 조회 Tool","sublabel":"기존 고객 여부","hidden":true},{"id":"n-crm","icon":"trending-up","label":"CRM 업데이트","sublabel":"점수·등급 기록","tone":"success","hidden":true}],"runLog":[{"id":"lg1","text":"▶ 테스트 리드: kim@acme.io (Acme Corp)","tone":"out","hidden":true},{"id":"lg2","text":"AI Agent: 도구 2회 호출 → 스코어 87점 (A등급)","tone":"out","hidden":true},{"id":"lg3","text":"✓ CRM에 A등급 리드로 기록 완료","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 웹훅 트리거 뒤에 AI Agent 노드를 추가합니다"},{"t":"move","target":"n-webhook"},{"t":"click"},{"t":"reveal","target":"n-agent"},{"t":"caption","text":"② 서브 노드로 Chat Model을 연결합니다"},{"t":"move","target":"n-agent"},{"t":"click"},{"t":"reveal","target":"n-model"},{"t":"wait","ms":400},{"t":"caption","text":"③ 에이전트가 쓸 도구 2개를 꽂습니다"},{"t":"reveal","target":"n-tool1"},{"t":"reveal","target":"n-tool2"},{"t":"wait","ms":500},{"t":"caption","text":"④ 평가 결과를 기록할 CRM 노드를 붙입니다"},{"t":"reveal","target":"n-crm"},{"t":"move","target":"n-crm"},{"t":"caption","text":"⑤ 테스트 리드를 흘려보내 실행을 확인합니다"},{"t":"reveal","target":"lg1"},{"t":"reveal","target":"lg2"},{"t":"reveal","target":"lg3"},{"t":"move","target":"lg3"},{"t":"caption","text":"✅ 에이전트가 스스로 도구를 골라 리드를 평가했습니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '27c188d7-2b51-c835-dc24-49b74ff1a6cd', 'bbc543d8-285f-6105-d14d-1ad66620283b', 'n8n-automation/rag-knowledge-bot', 'rag-knowledge-bot', '자체 데이터 RAG: 사내 지식봇 만들기',
  $aix$"우리 회사 규정은 AI 모델이 모른다"는 문제의 정답이 **RAG**입니다. 시험 직전에 모델 손에 오픈북을 쥐여주는 것과 같죠. n8n은 벡터 스토어 노드를 내장하고 있어, 코드 없이 캔버스에서 RAG 파이프라인을 완성할 수 있습니다.

## 파이프라인은 두 개입니다

**① 적재(Ingestion)** — 문서를 검색 가능한 형태로 미리 저장합니다. 도서관에 책을 분류해 꽂아두는 단계입니다.

- 문서 로더(Google Drive·Notion·PDF) → **Text Splitter**로 청크(작은 조각) 분할 → **Embeddings** 노드로 벡터화 → **Vector Store**에 저장

**② 질의(Query)** — 질문이 오면 근거를 찾아 답합니다. 사서가 책을 찾아와 답해주는 단계입니다.

- **Chat Trigger** → **AI Agent** + **Vector Store Tool** → 질문과 비슷한 청크 검색 → 근거를 붙여 답변 생성

## 벡터 스토어 선택 가이드

- **Simple Vector Store**(인메모리 — 메모리에만 저장): 설정 0초, 청킹 전략 실험용. 재시작하면 사라집니다
- **Qdrant / PGVector**: 셀프호스팅 철학 그대로 — 내 서버에서 함께 운영
- **Pinecone / Supabase**: 관리를 맡기는 쪽이 편할 때

## 실패를 막는 2가지 규칙

- 적재와 질의에 **같은 임베딩 모델**을 써야 합니다. 서로 다르면 에러도 없이 검색만 조용히 망가집니다.
- 시스템 메시지에 "**문서에 근거가 없으면 모른다고 답하라**"를 명시하고, 답변에 출처(문서명·섹션)를 붙이세요. 이것이 사내 지식봇의 신뢰를 만듭니다.

> 💡 **핵심**: RAG의 품질은 모델이 아니라 **청킹과 임베딩 일관성**에서 결정됩니다. 인메모리로 실험하고, Qdrant로 운영하세요.$aix$,
  $aix${"type":"flow","title":"사내 지식봇 RAG 파이프라인","nodes":[{"label":"문서 로더","sublabel":"Drive · Notion · PDF","icon":"file-text"},{"label":"Text Splitter","sublabel":"청크로 분할","icon":"scissors"},{"label":"Embeddings → Vector Store","sublabel":"Qdrant/PGVector에 저장","icon":"database","tone":"accent"},{"label":"Vector Store Tool 검색","sublabel":"질문과 유사한 청크 회수","icon":"search","tone":"primary","edgeLabel":"사용자 질문 도착 시"},{"label":"AI Agent 답변","sublabel":"근거 + 출처 표기","icon":"bot","tone":"success"}],"caption":"적재와 질의에 반드시 같은 임베딩 모델을 사용해야 검색이 맞습니다."}$aix$::jsonb, $aix${"title":"사내 지식봇 응답 확인 따라하기","app":{"kind":"chat-app","workspace":"우리 회사","channels":[{"id":"ch-kb","name":"사내-지식봇","active":true},{"id":"ch-general","name":"일반"}],"composerId":"composer","messages":[{"id":"q1","author":"나","time":"오전 10:02","text":"연차는 이월되나요? 최대 며칠까지?","hidden":true},{"id":"a1","author":"지식봇","bot":true,"time":"오전 10:02","text":"연차는 다음 해로 최대 5일까지 이월할 수 있습니다.\n출처: 인사규정 v3 · 7.2절 '연차 이월'","hidden":true},{"id":"q2","author":"나","time":"오전 10:04","text":"우리 회사 주차 지원 정책은?","hidden":true},{"id":"a2","author":"지식봇","bot":true,"time":"오전 10:04","text":"적재된 문서에서 근거를 찾지 못했습니다.\n추측 대신 인사팀(#hr) 문의를 권장합니다.","hidden":true}]},"actions":[{"t":"caption","text":"① 사내 규정 문서는 이미 벡터 스토어에 적재돼 있습니다"},{"t":"wait","ms":500},{"t":"caption","text":"② 지식봇 채널에 질문을 입력합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"연차는 이월되나요? 최대 며칠까지?"},{"t":"wait","ms":400},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"q1"},{"t":"caption","text":"③ 봇이 벡터 검색으로 근거를 찾아 답합니다"},{"t":"reveal","target":"a1"},{"t":"move","target":"a1"},{"t":"wait","ms":600},{"t":"caption","text":"④ 문서에 없는 질문으로 환각 방지를 시험합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"우리 회사 주차 지원 정책은?"},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"q2"},{"t":"reveal","target":"a2"},{"t":"move","target":"a2"},{"t":"caption","text":"✅ 근거가 없으면 모른다고 답합니다 — 신뢰의 조건"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '82bb96a9-514a-8708-1736-74ac8114a761', 'bbc543d8-285f-6105-d14d-1ad66620283b', 'n8n-automation/human-approval', 'human-approval', '사람 승인 스텝: 멈추고, 묻고, 이어간다',
  $aix$AI가 쓴 메일이 검토 없이 고객에게 바로 나간다면? 아찔합니다. 그래서 중요한 순간에는 사람의 결재 도장이 필요합니다. n8n은 **워크플로우를 일시 정지하고 사람의 응답을 기다리는** 휴먼 인 더 루프를 기본 기능으로 제공합니다.

## Send and Wait for Response

Slack·Gmail·Teams 등 주요 메신저 노드에는 **"Send and Wait for Response"**(보내고 응답 대기) 오퍼레이션이 있습니다.

- 메시지와 함께 **승인/거절 버튼**(또는 직접 만든 폼)을 보냅니다
- 워크플로우는 그 지점에서 **멈춘 채 기다립니다** — 기다리는 동안 서버 자원은 거의 쓰지 않습니다
- 응답이 오면 결과(approved/declined)를 들고 다음 노드로 진행합니다

## 실전 사례: AI 답장 승인 관문

잠재 고객에게 보낼 답장을 AI가 초안 작성 → Slack으로 담당자에게 초안 + 승인 버튼 전송 → 승인하면 발송하고, 거절하면 수정 대기줄로 보냅니다. AI가 초안 쓰는 반복 노동을 대신하고, 사람은 마지막 확인만 하니 서로의 부담이 줄어듭니다.

## 설계 포인트

- **타임아웃 필수** — 응답 제한 시간을 정해 실행이 무한정 기다리지 않게 합니다. 시간이 지나면 어떻게 할지(중단할지, 다른 담당자에게 넘길지)도 미리 정하세요.
- **판단 재료를 함께** — 초안 전문, AI의 확신도, 원본 링크를 메시지에 담아, 담당자가 다른 화면으로 이동하지 않고 그 자리에서 판단하게 합니다.
- AI Agent의 **도구 호출 자체에 승인**을 거는 패턴도 지원됩니다 — "발송 도구를 쓰기 전에 먼저 허락받기".

> 💡 **핵심**: 자동화의 신뢰는 "전부 자동"이 아니라 **되돌리기 어려운 지점 직전의 승인 관문**에서 나옵니다.$aix$,
  $aix${"type":"chat","title":"Slack 승인 관문 (Send and Wait)","messages":[{"role":"ai","text":"리드 답장 초안: '요청하신 견적서를 첨부합니다…' 발송을 승인하시겠어요? [승인] [거절]"},{"role":"system","text":"워크플로우 일시 정지 — 응답 대기 중 (타임아웃 2시간)"},{"role":"user","text":"승인"},{"role":"ai","text":"✅ 발송 완료. 다음 노드로 실행을 이어갑니다."}],"caption":"응답이 올 때까지 실행이 멈춥니다 — 자원은 거의 쓰지 않습니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '87125174-b745-a640-a0fa-8cb0c0624620', '175e83e1-d040-95dd-d2f4-ff8544ab06c5', 'n8n-automation/error-workflows', 'error-workflows', '에러 워크플로우와 재시도 설계',
  $aix$자동화는 만들 때가 아니라 **아무도 모르게 실패할 때** 사고가 납니다. 그래서 n8n의 에러 처리는 자동차처럼 설계합니다 — 1차로 안전벨트(재시도)가 막고, 그래도 안 되면 에어백(에러 워크플로우)이 받아냅니다.

## 1차 방어선: 노드 재시도

- 노드 설정의 **Retry on Fail**(실패 시 재시도) — 최대 횟수(2~3회)와 재시도 간격을 지정합니다. API 응답 지연 같은 일시적 오류의 대부분이 여기서 해소됩니다.
- **On Error 설정** — 실패했을 때 워크플로우 전체를 멈출지, 에러 전용 출구로 내보내고 계속 갈지 노드별로 고릅니다. "이 스텝은 실패해도 전체는 계속"이 가능해집니다.

## 2차 방어선: 전역 에러 워크플로우

**Error Trigger** 노드로 시작하는 워크플로우를 하나 만들고, 각 워크플로우의 Settings에서 error workflow로 지정합니다.

- 어떤 워크플로우든 실패하면 자동 실행되며, **워크플로우 이름·에러 메시지·실행 URL**이 데이터로 함께 들어옵니다
- 표준 구성: Slack #장애 채널 알림 + 실행 링크 → 담당자가 클릭 한 번으로 실패 지점을 확인합니다. 워크플로우가 100개여도 감시 창구는 이 하나면 됩니다
- 단, Error Trigger는 수동 테스트 실행에는 반응하지 않습니다 — 운영 중인 실행이 실패했을 때만 발동합니다

## 재실행 안전성 (멱등성)

실패한 실행은 화면에서 **실패 지점부터 다시 실행**할 수 있습니다. 이때 "CRM에 같은 내용이 두 번 기록"되는 사고가 나지 않도록, 쓰기 작업은 **업서트**(이미 있으면 갱신, 없으면 새로 생성) 패턴으로 설계하세요.

> 💡 **핵심**: 노드엔 Retry, 전체엔 Error Trigger. 그리고 모든 쓰기 작업은 **두 번 실행돼도 안전하게**.$aix$,
  $aix${"type":"flow","title":"에러 처리 이중 방어선","nodes":[{"label":"노드 실행","icon":"zap","tone":"primary"},{"label":"Retry on Fail","sublabel":"최대 3회 · 간격 5초","icon":"repeat","tone":"accent","edgeLabel":"일시 오류 발생 시"},{"label":"Error Trigger 워크플로우","sublabel":"전역 에러 캐치","icon":"alert","tone":"warning","edgeLabel":"재시도 소진 시"},{"label":"Slack 보고 + 실행 링크","sublabel":"클릭 한 번으로 실패 지점 확인","icon":"message","tone":"success"}],"loopBack":{"from":1,"to":0,"label":"재시도 (최대 3회)"},"caption":"1차는 노드 재시도, 2차는 전역 에러 워크플로우 — 두 겹이 표준입니다."}$aix$::jsonb, null, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '74593fbd-3adb-c363-5d8a-7b899d7e52cf', '175e83e1-d040-95dd-d2f4-ff8544ab06c5', 'n8n-automation/environments-backup', 'environments-backup', '환경 분리·버전 관리·백업',
  $aix$운영 중인 워크플로우를 캔버스에서 직접 고치는 것은, 손님이 꽉 찬 영업 중 주방에서 새 요리를 실험하는 것과 같습니다. 그래서 성장한 팀은 연습 주방과 영업 주방 — 즉 **환경을 나눕니다**.

## 환경 분리: dev와 prod

- 인스턴스(n8n 설치본)를 두 개 운영합니다 — 개발용(dev)에서 만들고 검증한 뒤, 운영용(prod)으로 승격합니다.
- n8n의 **Source Control 기능**(유료 플랜)은 인스턴스를 Git 브랜치에 연결합니다: dev에서 **push** → 리뷰 → prod에서 **pull**.
- 주의: pull은 **덮어쓰기**입니다(합쳐주는 것이 아닙니다). prod에서 직접 수정하는 습관을 먼저 끊어야 합니다.
- 크레덴셜은 Git에 **이름만(스텁)** 올라갑니다 — 비밀값은 환경마다 따로 등록합니다.

## 백업: 무료(커뮤니티) 에디션의 정석

Source Control 없이도 백업은 가능합니다. 서버 터미널에서 두 줄이면 됩니다.

```bash
n8n export:workflow --all --output=backup/
n8n export:credentials --all --decrypted
```

- 더 우아한 방법: **n8n이 n8n을 백업** — Schedule 트리거로 매일 밤 자기 자신의 API에서 전체 워크플로우 JSON을 받아 Git에 커밋하는 워크플로우를 만듭니다. 백업 파일은 서버 밖(다른 저장소)에 두어야 서버 사고에도 안전합니다.
- **`N8N_ENCRYPTION_KEY`는 따로 백업** — 이 키가 없으면 데이터베이스를 복구해도 크레덴셜은 전부 열 수 없는 금고가 됩니다.

> 💡 **핵심**: "dev에서 만들고 Git으로 승격, prod는 손대지 않는다" — 워크플로우도 코드처럼 다루는 순간 운영 사고가 사라집니다.$aix$,
  $aix${"type":"steps","title":"운영 표준: 환경·버전·백업","steps":[{"label":"dev / prod 인스턴스 분리","sublabel":"개발과 운영을 물리적으로 격리","icon":"server"},{"label":"Git Source Control 연동","sublabel":"dev push → 리뷰 → prod pull","icon":"git-branch"},{"label":"야간 자동 백업","sublabel":"CLI export 또는 API 백업 워크플로우","icon":"download"},{"label":"암호화 키 별도 보관","sublabel":"키 분실 = 크레덴셜 전손","icon":"key"}],"caption":"pull은 병합이 아니라 덮어쓰기 — prod 직접 수정 습관부터 끊으세요."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'd7e62c78-a55f-794e-3cdf-a4380ad7fba8', '175e83e1-d040-95dd-d2f4-ff8544ab06c5', 'n8n-automation/queue-mode', 'queue-mode', '성능과 큐 모드: 대량 실행 버티기',
  $aix$컨테이너 하나로 돌리는 n8n은 화면 표시·예약 실행·워크플로우 실행을 한 프로세스가 다 합니다. 실행이 몰리면 편집 화면까지 함께 느려지죠. 해답은 **큐 모드** — 은행처럼 번호표 대기열을 도입하는 것입니다.

## 큐 모드 아키텍처

`EXECUTIONS_MODE=queue` 설정 하나로 역할을 나눕니다.

- **메인 인스턴스** — 창구 접수 담당. UI, 스케줄, 웹훅 접수만 하고, 실행할 일감은 **Redis**(초고속 메모리 저장소)의 대기열에 넣습니다.
- **워커** — 일감 처리 담당. `n8n worker` 명령으로 띄우는 실행 전담 프로세스로, 대기열에서 일감을 꺼내 처리하고 결과를 DB에 기록합니다.
- **필수 조건**: Redis + **PostgreSQL** (큐 모드에서 SQLite는 지원되지 않습니다)

## 확장은 수평으로

- 처리가 밀리면 서버 한 대를 키우는 대신 **워커 개수를 늘립니다** — `docker compose up -d --scale worker=4`. 몇 개를 띄워도 대기열에서 사이좋게 일감을 나눠 갑니다.
- 워커 하나가 동시에 처리할 실행 수(concurrency)도 조절할 수 있습니다
- 웹훅이 초당 수백 건씩 들어온다면 **웹훅 프로세서**를 따로 두어 접수 창구까지 늘립니다

## 큐 모드 전에 챙길 성능 기본기

- **실행 기록 정리** — 실행 기록을 무한정 보관하면 데이터베이스가 비대해집니다. 보관 기간을 정해 오래된 기록을 자동 삭제(프루닝)하세요.
- 아이템 수천 개짜리 대량 작업은 **Split In Batches(Loop)** 노드로 나눠 처리해 메모리 폭발을 막습니다.

> 💡 **핵심**: 트래픽이 늘면 서버를 키우지 말고 **역할을 나누세요**. 메인은 접수, 워커는 실행 — 이것이 n8n 스케일링의 정석입니다.$aix$,
  $aix${"type":"stack","title":"큐 모드 아키텍처","layers":[{"label":"메인 인스턴스","sublabel":"UI · 스케줄 · 웹훅 접수","icon":"monitor","tone":"primary"},{"label":"Redis 큐","sublabel":"실행 대기열","icon":"layers","tone":"accent"},{"label":"워커 × N","sublabel":"n8n worker — 수평 확장","icon":"cpu","tone":"accent"},{"label":"PostgreSQL","sublabel":"실행 기록 저장 (SQLite 불가)","icon":"database","tone":"muted"}],"caption":"접수와 실행을 분리하면 워커만 늘려서 대량 트래픽을 버팁니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '2c6ba5cd-9c66-6e16-f9d6-6d98eec5ca27', '175e83e1-d040-95dd-d2f4-ff8544ab06c5', 'n8n-automation/migration-strategy', 'migration-strategy', 'Make/Zapier에서 n8n으로 이전하는 전략',
  $aix$이전은 "전부 옮기기"가 아니라 **효과가 큰 것부터 옮기기**입니다. 자동 변환 도구에 기대기보다, 아래 5단계를 차례로 밟는 것이 안전합니다.

## 이전 5단계

1. **인벤토리** — 운영 중인 시나리오/잽을 전수 조사해 표로 정리합니다: 실행량, 스텝 수, 실패율, 담당자. 이 표가 곧 이전 로드맵이 됩니다.
2. **ROI 순위** — ROI(들인 노력 대비 절감 효과)가 큰 **실행량 많고 스텝이 긴 것부터** 옮깁니다. 과금 단위 차이(스텝당 → 실행당) 덕에 절감 폭이 가장 큽니다. 거의 안 도는 자동화는 굳이 옮기지 않아도 됩니다.
3. **재구축** — 모듈→노드로 다시 조립합니다. 지원 앱이 없다면? **HTTP Request 노드**로 대부분의 API를 직접 호출할 수 있고, **커뮤니티 노드**(화면의 Settings → Community Nodes에서 검색·설치)로 메꿉니다.
4. **병행 운영** — 같은 트리거를 양쪽에 걸고 1~2주간 결과가 같은지 대조합니다. n8n 쪽 알림에 태그를 붙여 구분하면 편합니다. 결과가 다르면 원인을 찾은 뒤에만 다음 단계로 넘어가세요.
5. **컷오버**(옛것을 끄고 새것으로 완전히 갈아타기) — 기존 쪽을 끄고, 첫 달은 에러 워크플로우 알림을 집중 모니터링합니다. 문제가 없으면 구독을 정리합니다.

## 커뮤니티 노드 주의점

누구나 올릴 수 있는 npm 생태계라 자유롭지만, 2026년 초 악성 패키지를 몰래 심어 퍼뜨리는 공급망 공격 사례가 보고됐습니다. **Verified 배지가 있는 노드** 위주로 쓰고, 미검증 패키지는 코드를 확인한 뒤 설치하세요.

> 💡 **핵심**: 실행량 × 스텝 수가 큰 워크플로우부터 옮기고, **반드시 병행 운영으로 검증 후 컷오버** — 절감액이 이전 비용을 첫 달에 회수해 줍니다.$aix$,
  $aix${"type":"steps","title":"Make/Zapier → n8n 이전 5단계","steps":[{"label":"인벤토리","sublabel":"실행량 · 스텝 수 · 실패율 조사","icon":"clipboard"},{"label":"ROI 순위","sublabel":"실행량 많고 스텝 긴 것부터","icon":"chart"},{"label":"재구축","sublabel":"없는 앱은 HTTP Request · 커뮤니티 노드","icon":"workflow"},{"label":"병행 운영","sublabel":"1~2주 양쪽 결과 대조","icon":"repeat"},{"label":"컷오버","sublabel":"구독 정리 · 집중 모니터링","icon":"check"}],"caption":"자동 변환보다 ROI 순서의 수동 재구축이 결과적으로 빠르고 안전합니다."}$aix$::jsonb, null, 5, 10
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
  $aix$"매일 올리자"는 다짐은 3주를 못 갑니다. 오래가는 계정은 의지가 아니라 **시스템** 위에서 돌아갑니다. 이 레슨에서는 그 시스템의 전체 그림부터 잡습니다.

## 자동 포스팅의 5단계 파이프라인

파이프라인은 공장의 컨베이어 벨트라고 생각하면 쉽습니다. 재료(주제)가 들어가면 완성품(포스트)이 나올 때까지 다섯 정거장을 거칩니다.

- **주제 소스** — 스프레드시트나 노션에 미리 쌓아둔 주제 목록(큐)에서 오늘의 소재를 꺼냅니다.
- **생성** — AI API가 카피(포스트에 쓸 글)와 이미지를 플랫폼별 형식으로 만듭니다.
- **검수** — 쓰면 안 되는 표현이나 형식 오류를 기계가 먼저 거르고, 필요하면 사람이 최종 승인합니다.
- **발행** — Make가 인스타그램 그래프 API와 블로그 API를 호출해 실제로 올립니다.
- **환류** — 도달·참여 데이터를 모아 다음 주제 선정에 반영합니다. (환류 = 결과를 다시 입력으로 되돌리는 것)

## 왜 Make인가

Make는 클릭만으로 자동화를 조립하는 노코드 도구입니다.

- 인스타그램·워드프레스·구글 시트 등 **미리 만들어진 연결 부품(공식 모듈)**이 있어 API 코드를 직접 짤 일이 거의 없습니다.
- 시나리오를 그림 그리듯 조립해서, 개발자가 아니어도 고치고 관리할 수 있습니다.
- 전용 모듈이 없는 서비스도 HTTP 모듈(주소만 알면 어떤 API든 호출하는 만능 부품)로 붙일 수 있습니다.

## 처음부터 다 만들지 않아도 됩니다

다섯 단계가 부담스럽게 들릴 수 있지만, 걱정하지 마세요. 이 강의는 주제 큐 한 장부터 시작해 한 단계씩 이어 붙입니다. 각 단계는 독립된 부품이라, 앞 단계만 완성돼도 그 자체로 쓸모가 있습니다.

이 강의의 나머지 전부는 이 다섯 상자를 하나씩 채우는 과정입니다.

> 💡 **핵심**: 자동 포스팅 봇 = **큐 → 생성 → 검수 → 발행 → 환류**. 발행에서 끝나지 않고 데이터가 큐로 되돌아와야 '시스템'입니다.$aix$,
  $aix${"type":"flow","title":"자동 포스팅 파이프라인","nodes":[{"label":"주제 큐","sublabel":"스프레드시트 · 노션","icon":"calendar","tone":"muted"},{"label":"AI 생성","sublabel":"카피 + 이미지","icon":"sparkles","tone":"primary"},{"label":"검수 게이트","sublabel":"금칙어 · 형식 · 승인","icon":"shield","tone":"warning"},{"label":"발행","sublabel":"인스타그램 · 블로그","icon":"send","tone":"accent"},{"label":"성과 수집","sublabel":"도달 · 참여 데이터","icon":"chart","tone":"success"}],"loopBack":{"from":4,"to":0,"label":"잘된 주제를 큐에 환류"},"caption":"성과 데이터가 주제 큐로 되돌아오는 순간, 봇은 스스로 나아지기 시작합니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8094cd94-4041-7e80-44c9-2c4dbb4ee2b9', 'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'sns-auto-bot/content-calendar-queue', 'content-calendar-queue', '콘텐츠 캘린더와 주제 큐 설계',
  $aix$봇이 매일 멈추지 않으려면 "오늘 뭘 올리지?"라는 질문의 답이 시스템 안에 미리 준비돼 있어야 합니다. 그 답이 **주제 큐**입니다. 큐(queue)는 은행 번호표처럼 처리할 일을 순서대로 줄 세워 둔 대기열을 말합니다.

## 큐는 시트 한 장이면 충분합니다

구글 스프레드시트(또는 노션 데이터베이스)를 열고, 행 하나 = 포스트 하나로 관리합니다. 필수 컬럼(세로줄)은 5개뿐입니다.

- **주제** — 한 줄 소재 ("여름 휴가철 짐 싸기 체크리스트")
- **핵심 메시지** — AI에게 줄 방향 한 문장
- **발행일 / 플랫폼** — 언제, 어디에 올릴지
- **상태** — `대기 → 생성됨 → 승인 → 발행됨` 중 하나. Make가 이 값을 보고 움직입니다.
- **결과 링크** — 발행이 끝나면 봇이 채워 넣는 증거

## 큐를 마르지 않게 하는 법

큐가 비면 봇도 멈춥니다. 그래서 채우는 일도 규칙으로 만들어 둡니다.

- 콘텐츠 필러(우리 계정이 반복해서 다룰 큰 주제 기둥) 3~4개를 정하고 요일별로 배정합니다 — 월: 정보, 수: 후기, 금: 프로모션.
- 주 1회 30분만 씁니다. AI에게 필러별 주제 20개를 뽑게 하고, 사람은 그중 쓸 만한 것을 **고르기만** 합니다.
- 남은 큐가 7개 미만이면 알림을 보내는 시나리오를 하나 더 둡니다.

한 가지 팁: 상태 컬럼은 손으로 입력하면 오타가 나기 쉽습니다. 구글 시트에서 상태 컬럼을 선택하고 "삽입 → 드롭다운"으로 네 가지 값만 고르게 만들어 두세요. "승인 "처럼 뒤에 공백이 붙으면 Make가 그 행을 못 찾는데, 초보자가 가장 자주 겪는 사고입니다. 노션을 쓴다면 상태 속성을 "선택" 타입으로 만들면 같은 효과입니다.

> 💡 **핵심**: 상태 컬럼이 곧 봇의 신호등입니다. Make는 "상태 = 승인"인 행만 집어 발행하고, 끝나면 "발행됨"으로 바꿉니다.$aix$,
  $aix${"type":"steps","title":"주제 큐 구축 4단계","steps":[{"label":"필러 정하기","sublabel":"정보 · 후기 · 프로모션 등 3~4개","icon":"target"},{"label":"큐 시트 만들기","sublabel":"주제 · 발행일 · 상태 · 결과 컬럼","icon":"clipboard"},{"label":"AI로 대량 채우기","sublabel":"필러별 주제 20개 생성 → 사람이 선별","icon":"sparkles"},{"label":"Make에 연결","sublabel":"상태 값 기준으로 행을 읽고 갱신","icon":"workflow"}],"caption":"사람은 주 1회 큐를 채우고, 나머지 6일은 봇이 큐를 소비합니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '8708642c-ae0e-f48f-ca70-68619adf1a94', 'fee0e334-e049-cd8d-d93a-5dc76ab6d51c', 'sns-auto-bot/brand-voice-copywriting', 'brand-voice-copywriting', 'AI 카피 생성: 브랜드 보이스와 플랫폼별 형식',
  $aix$AI 카피의 문제는 못 쓰는 게 아니라 **누가 써도 똑같다**는 것입니다. 해법은 우리 계정만의 말투, 즉 브랜드 보이스를 프롬프트에 고정해 두는 것입니다.

## 브랜드 보이스 프롬프트의 3요소

시스템 프롬프트에 한 번 정의해 두면 매번 호출할 때마다 재사용됩니다. 도장을 한 번 파두고 계속 찍어 쓰는 것과 같습니다.

- **정체성** — 누구처럼 말할지: "10년 차 여행 가이드가 친구에게 말하듯"
- **규칙** — 항상 할 것과 절대 하지 말 것: "항상 해요체, 이모지는 문단당 1개, 과장 표현('무조건','최고') 금지"
- **실제 예시 2~3개** — 잘 쓴 과거 포스트 원문을 그대로 붙입니다. 형용사 열 개보다 예시 하나가 강합니다. 아직 과거 포스트가 없다면, 닮고 싶은 계정의 글을 참고해 직접 두 편을 써서 예시로 쓰세요.

## 플랫폼별 형식은 출력 스펙으로

같은 주제라도 인스타그램과 블로그는 완성형이 다릅니다. 그래서 한 번의 호출에서 **JSON으로 두 벌**을 받습니다.

- **인스타그램**: 첫 문장 훅(스크롤을 멈추게 하는 낚싯바늘 문장) + 본문 500자 이내 + 해시태그 10개 내외
- **블로그**: 검색 키워드가 든 제목 + 소제목 구조 + 1,500자 이상

```text
출력은 JSON으로:
{ "instagram": { "caption", "hashtags" },
  "blog": { "title", "html_body" } }
```

JSON처럼 칸이 정해진 형식으로 받아야, Make가 각 칸의 값을 그대로 다음 모듈에 꽂을 수 있습니다. 사람이 읽을 문장이 아니라 기계가 읽을 데이터를 주문한다고 생각하면 됩니다.

> 💡 **핵심**: 보이스는 **시스템 프롬프트에 예시로**, 형식은 **JSON 출력 스펙으로**. 이 분리가 자동화 가능한 카피의 조건입니다.$aix$,
  $aix${"type":"chat","title":"브랜드 보이스 프롬프트 실전","messages":[{"role":"system","text":"10년 차 여행 가이드가 친구에게 말하듯. 해요체, 과장 금지, 이모지 문단당 1개. [예시 포스트 2건 첨부]"},{"role":"user","text":"주제: 여름 휴가철 짐 싸기 체크리스트. 인스타 캡션과 블로그 글을 JSON으로."},{"role":"ai","text":"{ \"instagram\": { \"caption\": \"캐리어 앞에서 30분째 고민 중이라면… ✈️ 이 5가지만 기억하세요.\", \"hashtags\": [\"#여름휴가\", \"#짐싸기꿀팁\", …] }, \"blog\": { \"title\": \"여름 휴가 짐 싸기 체크리스트 5가지\", … } }"}],"caption":"같은 주제, 한 번의 호출로 플랫폼별 완성본 두 벌을 받습니다."}$aix$::jsonb, $aix${"title":"브랜드 보이스 카피 생성 따라하기","app":{"kind":"browser","url":"playground.ai-studio.dev","blocks":[{"id":"b-head","type":"heading","label":"AI 카피 스튜디오"},{"id":"b-sys-label","type":"text","label":"시스템 프롬프트 (브랜드 보이스)"},{"id":"b-sys-input","type":"input","label":"브랜드 보이스를 입력하세요…"},{"id":"b-topic-input","type":"input","label":"오늘의 주제를 입력하세요…"},{"id":"b-json-badge","type":"badge","label":"JSON 출력 모드"},{"id":"b-gen-btn","type":"button","label":"카피 생성"},{"id":"b-card-insta","type":"card","label":"📸 Instagram — \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"","hidden":true},{"id":"b-card-tags","type":"card","label":"#여름휴가 #짐싸기꿀팁 #여행준비 외 7개","hidden":true},{"id":"b-card-blog","type":"card","label":"📝 Blog — 여름 휴가 짐 싸기 체크리스트 5가지 (1,800자)","hidden":true}]},"actions":[{"t":"caption","text":"① 브랜드 보이스를 시스템 프롬프트에 입력합니다"},{"t":"move","target":"b-sys-input"},{"t":"click"},{"t":"type","target":"b-sys-input","text":"10년 차 여행 가이드처럼 해요체, 과장 금지"},{"t":"wait","ms":400},{"t":"caption","text":"② 주제 큐에서 가져온 오늘의 소재를 붙여넣습니다"},{"t":"click","target":"b-topic-input"},{"t":"type","target":"b-topic-input","text":"여름 휴가철 짐 싸기 체크리스트"},{"t":"caption","text":"③ JSON 출력 모드를 켜고 생성을 실행합니다"},{"t":"move","target":"b-json-badge"},{"t":"click"},{"t":"move","target":"b-gen-btn"},{"t":"click"},{"t":"wait","ms":700},{"t":"caption","text":"④ 인스타그램 캡션과 해시태그가 먼저 도착합니다"},{"t":"reveal","target":"b-card-insta"},{"t":"reveal","target":"b-card-tags"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 같은 호출에서 블로그 버전도 함께 받습니다"},{"t":"reveal","target":"b-card-blog"},{"t":"move","target":"b-card-blog"},{"t":"caption","text":"✅ 한 번의 호출로 두 플랫폼 완성본 — Make가 필드를 그대로 씁니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'a77d817a-1d19-a42f-0e88-25354d64653d', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/auto-image-generation', 'auto-image-generation', '이미지 자동 생성: 카드뉴스와 썸네일',
  $aix$인스타그램은 결국 이미지 플랫폼입니다. 글만 자동화하고 멈추면 절반짜리입니다. 다행히 이미지도 두 가지 방법으로 자동화할 수 있습니다.

## 두 가지 전략, 용도가 다릅니다

- **AI 이미지 생성 API** — 매번 새로운 비주얼을 만듭니다. 감성 컷·배경 이미지에 좋지만, 만들 때마다 느낌이 달라져 브랜드 일관성을 지키기 어렵습니다.
- **템플릿 렌더링(Bannerbear·Placid 등)** — 디자이너가 만든 틀에 **글자와 이미지만 갈아 끼우는** 방식입니다. 붕어빵 틀처럼 100장을 만들어도 모양이 같아서, 카드뉴스·정보성 썸네일의 정석입니다.

실무에서는 둘을 섞습니다 — "배경은 AI가 생성, 글자가 올라가는 층은 템플릿".

## Make에서의 연결

1. 앞 단계의 카피 생성 결과에서 헤드라인(대표 문구)을 추출합니다.
2. 템플릿 API에 `headline`(제목 글자), `background_url`(배경 이미지 주소) 값을 넘겨 이미지를 만듭니다.
3. 완성된 이미지의 URL(웹 주소)을 발행 모듈로 전달합니다.

## 규격을 처음부터 맞추세요

플랫폼마다 요구하는 이미지 비율이 다릅니다. 나중에 고치면 번거로우니 처음부터 맞춥니다.

- 인스타그램 피드 1:1(1080×1080) 또는 4:5(1080×1350)
- 스토리·릴스 커버 9:16(1080×1920)
- 블로그 대표 이미지 16:9(1200×675)

규격별 템플릿을 미리 만들어두면 크기를 다시 맞추는 단계가 통째로 사라집니다. 템플릿 도구들은 무료 체험 플랜이 있으니, 먼저 템플릿 1개로 테스트 이미지를 만들어보고 결제 여부를 결정하세요.

> 💡 **핵심**: 브랜드 일관성이 필요한 이미지는 **생성이 아니라 치환**(틀은 두고 내용만 갈아 끼우기)입니다. AI는 소재를, 템플릿은 톤을 담당합니다.$aix$,
  $aix${"type":"grid","title":"이미지 자동화 구성 요소","items":[{"label":"AI 이미지 생성","sublabel":"새로운 비주얼 소재","icon":"wand","tone":"primary"},{"label":"템플릿 렌더링","sublabel":"카드뉴스 · 변수 치환","icon":"palette","tone":"accent"},{"label":"브랜드 에셋","sublabel":"로고 · 폰트 · 컬러 고정","icon":"layers","tone":"muted"},{"label":"플랫폼 규격","sublabel":"1:1 · 4:5 · 9:16 · 16:9","icon":"image","tone":"muted"},{"label":"이미지 URL 전달","sublabel":"발행 API가 URL로 수신","icon":"link","tone":"success"},{"label":"대체 텍스트","sublabel":"접근성 + 검색 노출","icon":"file-text","tone":"muted"}],"caption":"여섯 조각이 모여 '사람이 만든 것 같은' 이미지 라인이 됩니다."}$aix$::jsonb, null, 6, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'de5927e6-6d7d-8a60-258f-0f12d045f386', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/instagram-graph-api', 'instagram-graph-api', '인스타그램 그래프 API: 계정 연결과 제약',
  $aix$인스타그램 자동 발행의 관문은 코드가 아니라 **계정 설정**입니다. 초보자의 90%가 여기서 막히니, 아래 순서를 그대로 따라오세요.

## 발행까지의 연결 사슬 — 그대로 따라하기

1. **프로페셔널 계정 전환** — 인스타그램 앱에서 내 프로필 → 오른쪽 위 메뉴(≡) → 설정 → "계정 유형 및 도구" → "프로페셔널 계정으로 전환"을 누릅니다. 비즈니스와 크리에이터 중 어느 쪽이든 됩니다. 개인 계정인 채로는 API 발행이 아예 안 됩니다.
2. **페이스북 페이지 만들고 연결** — 페이스북에서 페이지를 하나 만들고(무료), 인스타그램 프로필 편집 화면의 "페이지" 항목에서 그 페이지를 선택해 연결합니다. Make 모듈이 쓰는 페이스북 로그인 경로의 필수 요건입니다. (Meta에는 페이지 없이 연결하는 인스타그램 로그인 방식도 생겼지만, Make는 전자를 씁니다.)
3. **권한 받기** — Meta 개발자 앱을 만들고 `instagram_content_publish` 등 권한을 받습니다.
4. **Make에 로그인** — 시나리오에 인스타그램 비즈니스 모듈을 놓고 Connection 옆 "Add" 버튼 → 페이스북 계정으로 로그인 → 권한 허용 화면에서 페이지와 인스타그램 계정을 체크합니다. 이후 토큰 갱신은 Make가 알아서 처리합니다.

여기서 내 계정이 목록에 안 보이면, 거의 항상 2번(페이지 연결)이 빠진 것입니다.

## 반드시 알아야 할 제약 (2026 기준)

- 발행은 **2단계**입니다: 미디어 컨테이너 생성(올릴 준비) → 발행 확정. Make 모듈이 감싸주지만, 실패했을 때 어느 단계인지 읽으려면 알아야 합니다.
- 이미지는 파일 업로드가 아니라 **누구나 접근 가능한 공개 URL**로 전달합니다 — 앞 레슨에서 URL을 받아둔 이유입니다.
- API 발행은 **24시간당 계정별 상한**이 있습니다(최근 24시간을 세는 이동 창 기준, 캐러셀(여러 장 묶음 게시물)은 1건으로 계산). 하루 1~3회 발행 봇에는 여유가 충분합니다.
- 스토리·릴스 발행은 지원 범위와 형식 제약이 다르므로 피드부터 안정화하세요.

> 💡 **핵심**: 순서는 **비즈니스 계정 → 페이지 연결 → 권한 → Make 로그인**. 발행 실패의 대부분은 코드가 아니라 이 사슬의 어딘가가 끊긴 것입니다.$aix$,
  $aix${"type":"stack","title":"인스타그램 발행의 연결 사슬","layers":[{"label":"Make 시나리오","sublabel":"발행 모듈 · 토큰 자동 갱신","icon":"workflow","tone":"primary"},{"label":"Meta 개발자 앱","sublabel":"instagram_content_publish 권한","icon":"key","tone":"accent"},{"label":"페이스북 페이지","sublabel":"인스타그램 계정과 연결","icon":"link","tone":"muted"},{"label":"인스타그램 비즈니스 계정","sublabel":"개인 계정은 API 발행 불가","icon":"camera","tone":"warning"}],"caption":"위에서 아래까지 한 층이라도 끊기면 발행은 실패합니다 — 아래층부터 점검하세요."}$aix$::jsonb, $aix${"title":"Make에서 발행 시나리오 조립 따라하기","app":{"kind":"automation-canvas","windowTitle":"daily-post 시나리오 — Make","nodes":[{"id":"n-sheet","icon":"clipboard","label":"Google Sheets","sublabel":"상태=승인 행 읽기","tone":"accent"},{"id":"n-copy","icon":"sparkles","label":"AI 카피","sublabel":"JSON 두 벌 생성","tone":"primary","hidden":true},{"id":"n-image","icon":"image","label":"이미지 렌더링","sublabel":"템플릿 변수 치환","tone":"muted","hidden":true},{"id":"n-insta","icon":"camera","label":"Instagram 발행","sublabel":"비즈니스 계정 · 공개 URL","tone":"warning","hidden":true},{"id":"n-update","icon":"refresh","label":"시트 갱신","sublabel":"상태=발행됨 기록","tone":"success","hidden":true}],"runLog":[{"id":"log-run","text":"▶ 시나리오 1회 실행 시작","tone":"out","hidden":true},{"id":"log-sheet","text":"✓ 시트: 승인 상태 1건 로드","tone":"ok","hidden":true},{"id":"log-container","text":"✓ 미디어 컨테이너 생성 — 2단계 발행 1/2","tone":"ok","hidden":true},{"id":"log-publish","text":"✓ 발행 확정 — 게시물 ID 1789… (2/2)","tone":"ok","hidden":true},{"id":"log-done","text":"✓ 시트 갱신: 상태=발행됨, 결과 링크 기록","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 주제 큐를 읽는 구글 시트 모듈부터 놓습니다"},{"t":"move","target":"n-sheet"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② 카피를 만드는 AI 모듈을 이어 붙입니다"},{"t":"reveal","target":"n-copy"},{"t":"move","target":"n-copy"},{"t":"click"},{"t":"caption","text":"③ 이미지 렌더링과 인스타그램 발행 모듈을 연결합니다"},{"t":"reveal","target":"n-image"},{"t":"reveal","target":"n-insta"},{"t":"move","target":"n-insta"},{"t":"click"},{"t":"caption","text":"④ 마지막에 시트 상태를 갱신하는 모듈을 답니다"},{"t":"reveal","target":"n-update"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 1회 실행으로 컨테이너 생성 → 발행 확정 2단계를 확인합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-sheet"},{"t":"reveal","target":"log-container"},{"t":"reveal","target":"log-publish"},{"t":"move","target":"log-publish"},{"t":"reveal","target":"log-done"},{"t":"caption","text":"✅ 큐에서 발행까지 무인 라인 완성 — 실패하면 로그의 단계부터 봅니다"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '9a160035-af47-4377-8dc3-26da6ea61b93', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/blog-publishing', 'blog-publishing', '블로그 발행 자동화: 워드프레스와 티스토리',
  $aix$인스타그램이 오늘의 손님을 부른다면, 블로그는 **검색으로 손님이 꾸준히 들어오는 저수지**입니다. 같은 파이프라인에서 긴 글 버전을 흘려보냅니다.

## 워드프레스: 자동화의 정석

- 공식 **REST API**(웹 주소로 글을 읽고 쓰게 해주는 표준 통로)가 안정적이고, Make에 전용 모듈이 있습니다.
- 연결 방법: 워드프레스 관리자 화면 → 사용자 → 프로필 → 아래쪽 "애플리케이션 비밀번호"에서 이름을 입력하고 발급 버튼을 누릅니다. 이 비밀번호를 Make의 워드프레스 모듈에 넣으면 연결 끝입니다.
- 제목·본문(HTML)·카테고리·대표 이미지·예약 발행까지 전부 API로 제어됩니다.
- 자체 도메인이라 계정 정지 걱정이 없고, 쓴 글이 온전히 내 자산으로 남습니다.
- 처음 연결했다면 바로 공개 발행하지 말고, 상태를 "초안"으로 보내 관리자 화면에서 모양을 확인한 뒤 공개로 바꾸는 것이 안전합니다.

## 티스토리: 우회 설계가 필요

- 공개 Open API가 **2024년에 완전히 종료**되어 정식 연결이 불가능합니다.
- 현실적 대안은 반자동입니다. 완성 원고를 이메일이나 노션으로 받아 **사람이 3분 만에 붙여넣는** 방식이죠. 브라우저 자동화 도구도 있지만 차단당할 위험은 감수해야 합니다.
- 오래 운영할 계획이라면 워드프레스나 자체 블로그로 옮기는 것을 권합니다.

## 발행 후 마무리 훅

- 발행된 글 URL을 큐 시트의 결과 컬럼에 기록합니다. 이 기록이 있어야 뒤에서 배울 성과 수집이 자동으로 이어집니다.
- 같은 URL을 인스타그램 프로필 링크 도구나 스토리에 재활용하면, 채널끼리 서로 손님을 보내는 순환이 생깁니다.

> 💡 **핵심**: 자동화 친화도는 플랫폼마다 다릅니다. **API가 열려 있는 곳에 본진**을 두고, 닫힌 곳은 반자동으로 타협하세요.$aix$,
  $aix${"type":"compare","title":"워드프레스 vs 티스토리 자동화","columns":[{"title":"워드프레스","icon":"globe","tone":"primary","items":["공식 REST API + Make 전용 모듈","예약 발행 · 카테고리 · 대표 이미지 제어","자체 도메인 — 정지 리스크 없음","완전 무인 발행 가능"]},{"title":"티스토리","icon":"alert","tone":"warning","items":["Open API 서비스 종료 (2024)","반자동(원고 전달 → 수동 게시)이 현실적","브라우저 자동화는 차단 리스크","장기적으로 이전 검토 권장"]}],"caption":"본진은 API가 열린 플랫폼에 — 자동화 가능성이 곧 플랫폼 선택 기준입니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '59b745b7-bf8b-979d-8ff6-ffb86dfa0fbc', 'a76bb583-7de2-68c3-2284-c72dc71e594b', 'sns-auto-bot/scheduling', 'scheduling', '스케줄링과 최적 발행 시간',
  $aix$콘텐츠가 준비됐어도 **언제 올리느냐**에 따라 도달(게시물을 본 사람 수)이 갈립니다. 스케줄링은 봇의 심장 박동입니다. 다행히 Make에서는 클릭 몇 번이면 설정이 끝납니다.

## Make 스케줄링의 두 층

- **시나리오 트리거** — 시나리오 전체를 정해진 시각에 돌립니다. 첫 모듈에 붙은 시계 아이콘을 클릭해 "매일 07:30 실행"처럼 예약하면 됩니다. 큐에서 오늘 날짜 행을 읽어 발행하는 가장 단순한 구조입니다.
- **행 단위 예약** — 큐 시트에 발행 시각 컬럼을 두고, 15분마다 도는 시나리오가 "지금 시각 ≤ 예약 시각인 승인 행"만 집어 발행합니다. 포스트마다 다른 시간을 줄 수 있습니다 — 예: 프로모션은 금요일 저녁, 정보 글은 월요일 아침.

## 최적 시간은 정답이 아니라 실험값

- 출발점은 일반 통계입니다. 인스타그램은 출근길(7~9시)·점심(12시)·밤(20~22시), 블로그는 검색이 몰리는 오전.
- 단, **내 팔로워의 활동 시간**이 일반 통계를 이깁니다. 인스타그램 인사이트(프로페셔널 계정에 제공되는 성과 통계 메뉴)에서 팔로워 활동 시간대를 매달 확인해 예약 규칙을 갱신하세요.
- 같은 필러를 두 시간대에 번갈아 발행하고 4주간 도달을 비교하면, 나만의 데이터가 생깁니다.

## 운영 팁

- 예약한 시각과 실제 실행 시각이 다르다면 시간대(타임존) 설정부터 확인하세요. Make는 프로필에 설정된 시간대를 기준으로 돌기 때문에, 한국 시간(Asia/Seoul)으로 맞춰져 있는지 처음에 한 번 점검해야 합니다.
- 발행 성공/실패를 슬랙·텔레그램으로 알림 받는 모듈을 시나리오 끝에 붙이세요. 조용히 멈춰 있는 봇이 가장 위험합니다.

> 💡 **핵심**: 스케줄은 **고정값이 아니라 실험 변수**입니다. 시각 컬럼 하나로 발행 시간을 데이터로 관리하세요.$aix$,
  $aix${"type":"terminal","windowTitle":"Make — 시나리오 실행 로그","lines":[{"text":"[07:30:00] 시나리오 'daily-post' 시작","tone":"cmd"},{"text":"큐 조회: 상태=승인, 예약시각≤07:30 → 1건","tone":"out"},{"text":"AI 카피 로드 · 이미지 URL 확인 … OK","tone":"ok"},{"text":"Instagram: 컨테이너 생성 → 발행 완료 (id: 1789…)","tone":"ok"},{"text":"WordPress: 초안 → 공개 전환 완료","tone":"ok"},{"text":"시트 갱신: 상태=발행됨, 결과 링크 기록","tone":"out"},{"text":"# 실패 시: 텔레그램 알림 + 상태=오류","tone":"comment"},{"text":"[07:30:41] 완료 — 다음 실행 07:45","tone":"dim"}],"caption":"15분 주기로 도는 시나리오가 예약 시각이 된 행만 집어 발행합니다."}$aix$::jsonb, null, 5, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '47651e39-1d27-dbe2-6f4e-f883b7cf1dc3', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/quality-gate', 'quality-gate', '품질 가드: 발행 전 검수 게이트 만들기',
  $aix$자동화의 진짜 리스크는 오타가 아니라 **틀린 내용이 브랜드 이름으로 매일 나가는 것**입니다. 그래서 발행 직전에 검문소, 즉 게이트를 세웁니다.

## 3겹의 자동 검사

Make에서는 모듈과 모듈을 잇는 선 위의 공구(렌치) 아이콘을 클릭하면 필터(조건을 통과한 데이터만 다음으로 보내는 장치)를 달 수 있습니다. 발행 모듈 **직전**에 세 겹을 겹칩니다.

- **금칙어 검사** — 쓰면 안 되는 표현 목록과 대조합니다: 과장·의료·금융 위험 표현("100% 보장", "부작용 없음"), 경쟁사명, 비속어. 목록을 구글 시트에 두면 개발 지식 없이도 계속 추가할 수 있습니다.
- **형식 검사** — 글자 수 상한, 해시태그 개수, 이미지 URL이 정상 응답하는지, 링크가 살아 있는지.
- **AI 교차 검수** — 글을 쓴 것과 **다른 모델·다른 프롬프트**에게 "사실 오류·과장·보이스 이탈"을 채점하게 합니다. 자기가 쓴 글을 자기가 검사하게 하면 후한 점수를 주기 때문입니다. 학생과 채점자가 같은 사람이면 안 되는 것과 같은 이치입니다.

## 휴먼 승인은 옵션이 아니라 다이얼

볼륨 다이얼처럼, 사람이 개입하는 정도를 신뢰가 쌓인 만큼 조절합니다.

- **초기(1~4주)**: 전부 승인 — 승인 요청을 텔레그램으로 받고, 버튼 한 번으로 시트 상태를 "승인"으로 바꿉니다.
- **안정기**: 표본 승인 — 민감한 필러(프로모션·시사)만 사람이 보고 나머지는 자동 통과.
- 반려한 포스트는 반려 사유와 함께 생성 단계로 되돌립니다. 사유는 "과장 표현 있음 — 수치 근거로 교체"처럼 구체적으로 적을수록 좋습니다. 이 반려 기록이 프롬프트 개선의 원료가 됩니다.

> 💡 **핵심**: 게이트는 **기계 검사 3겹 + 사람 승인 다이얼**. 신뢰가 쌓이는 만큼만 다이얼을 자동 쪽으로 돌리세요.$aix$,
  $aix${"type":"flow","title":"발행 전 검수 게이트","nodes":[{"label":"AI 생성 완료","sublabel":"카피 + 이미지","icon":"sparkles","tone":"muted"},{"label":"자동 검사","sublabel":"금칙어 · 형식 · 링크","icon":"filter","tone":"accent"},{"label":"AI 교차 검수","sublabel":"다른 모델이 사실·보이스 채점","icon":"eye","tone":"primary","edgeLabel":"자동 검사 통과 시"},{"label":"휴먼 승인","sublabel":"텔레그램 버튼 승인 (다이얼 조절)","icon":"user","tone":"warning"},{"label":"발행","sublabel":"인스타그램 · 블로그","icon":"send","tone":"success"}],"loopBack":{"from":3,"to":0,"label":"반려 시 사유와 함께 재생성"},"caption":"반려 사유가 생성 단계로 되돌아가는 루프가 품질을 누적시킵니다."}$aix$::jsonb, $aix${"title":"발행 전 검수 승인 따라하기","app":{"kind":"chat-app","workspace":"브랜드 운영팀","channels":[{"id":"ch-review","name":"포스팅-검수","active":true},{"id":"ch-publish","name":"발행-알림"},{"id":"ch-report","name":"성과-리포트"}],"composerId":"composer","messages":[{"id":"m-draft","author":"포스팅봇","bot":true,"time":"오후 6:02","text":"내일 07:30 발행 예정 초안입니다.\n주제: 여름 휴가철 짐 싸기 체크리스트\n훅: \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"","hidden":true},{"id":"m-auto-check","author":"포스팅봇","bot":true,"time":"오후 6:02","text":"자동 검사 통과: 금칙어 0건 · 해시태그 9개 · 이미지 URL 정상","hidden":true},{"id":"m-cross-check","author":"포스팅봇","bot":true,"time":"오후 6:03","text":"AI 교차 검수(다른 모델): 사실 오류 없음 · 과장 표현 없음 · 보이스 점수 9/10","hidden":true},{"id":"m-approve","author":"나 (운영자)","time":"오후 6:07","text":"검수 결과 확인했습니다. 승인합니다 ✅","hidden":true},{"id":"m-scheduled","author":"포스팅봇","bot":true,"time":"오후 6:07","text":"✅ 큐 시트 상태=승인 갱신 — 내일 07:30 인스타그램·블로그 발행 예약 완료","hidden":true}]},"actions":[{"t":"caption","text":"① 봇이 발행 전 초안과 자동 검사 결과를 올립니다"},{"t":"reveal","target":"m-draft"},{"t":"reveal","target":"m-auto-check"},{"t":"wait","ms":600},{"t":"caption","text":"② 다른 모델의 교차 검수 점수까지 확인합니다"},{"t":"reveal","target":"m-cross-check"},{"t":"move","target":"m-cross-check"},{"t":"click"},{"t":"wait","ms":500},{"t":"caption","text":"③ 사람은 판단만 — 승인 코멘트를 입력합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"검수 결과 확인했습니다. 승인합니다 ✅"},{"t":"wait","ms":400},{"t":"hide","target":"composer"},{"t":"reveal","target":"composer"},{"t":"reveal","target":"m-approve"},{"t":"caption","text":"④ 승인 즉시 봇이 큐 상태를 갱신하고 발행을 예약합니다"},{"t":"reveal","target":"m-scheduled"},{"t":"move","target":"m-scheduled"},{"t":"caption","text":"✅ 검수 게이트 통과 — 판단은 사람, 실행은 봇의 몫입니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '87e76eba-0a98-db6f-902f-df40526eb508', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/measure-improve', 'measure-improve', '성과 측정과 개선 루프: 데이터가 큐를 채운다',
  $aix$발행까지 자동화했다면 절반입니다. 나머지 절반은 **무엇이 통했는지를 시스템이 스스로 배우게** 만드는 것입니다.

## 주간 환류 사이클

주 1회 도는 별도 시나리오를 만듭니다. 사람이 매주 하던 성과 회고를 봇이 대신하는 셈입니다.

1. **수집** — 인스타그램 인사이트 API에서 도달·저장·공유 수를, 블로그에서 조회수·머문 시간을 지난 7일 치 가져와 시트에 쌓습니다. 첫 실행은 수동으로 돌려 숫자가 잘 들어오는지 확인하세요.
2. **분석** — AI에게 성적 상위 20%와 하위 20% 포스트를 주고 "주제·훅 문장·발행 시간에 어떤 패턴이 있는지" 요약하게 합니다. 사람이 눈으로 훑으면 놓치는 패턴을 AI는 표로 정리해 줍니다.
3. **반영** — 잘된 필러의 비중을 늘리고, 잘된 훅 스타일을 브랜드 보이스 프롬프트의 예시로 교체합니다.
4. **재발행** — 6개월 이상 지난 히트 콘텐츠는 새 이미지로 다시 만들어 큐에 넣습니다. 한 번 통한 주제는 다시 통할 확률이 높습니다.

## 지표는 플랫폼 목적에 맞게

숫자라고 다 같은 숫자가 아닙니다. 플랫폼의 목적에 맞는 지표를 골라야 합니다.

- 인스타그램: 팔로워 수보다 **저장·공유율** — 알고리즘이 이 게시물을 더 퍼뜨릴지 결정하는 신호입니다.
- 블로그: 조회수보다 **검색 유입 키워드** — 사람들이 어떤 단어로 들어왔는지가 다음 주제의 직접 재료입니다.

## 사람의 역할

주간 리포트를 읽고 방향만 결정합니다 — "이번 달은 후기 필러 강화". 실행은 다시 봇의 몫입니다. 처음 몇 주는 데이터가 적어 패턴이 안 보일 수 있는데, 정상입니다. 포스트가 20~30개 쌓이는 4주 차부터 비교가 의미를 갖기 시작합니다.

> 💡 **핵심**: 성과 데이터가 **주제 큐와 프롬프트 예시로 되돌아가는** 순간, 봇은 반복기가 아니라 학습기가 됩니다.$aix$,
  $aix${"type":"cycle","title":"주간 개선 루프","center":"매주 1회 자동 순환","nodes":[{"label":"발행","sublabel":"매일 자동 포스팅","icon":"send"},{"label":"수집","sublabel":"도달 · 저장 · 검색 유입","icon":"chart"},{"label":"분석","sublabel":"AI가 상·하위 패턴 요약","icon":"brain"},{"label":"반영","sublabel":"큐 비중 · 프롬프트 예시 갱신","icon":"refresh"}],"caption":"이 사이클이 돌 때마다 다음 주 콘텐츠의 평균 성적이 올라갑니다."}$aix$::jsonb, null, 5, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '4985e147-503c-7a3c-e736-ada35fd4b925', '4d6e7968-627d-db7b-affa-b7be3076d42b', 'sns-auto-bot/policy-and-account-safety', 'policy-and-account-safety', '플랫폼 정책 준수: 계정이 살아야 봇도 산다',
  $aix$자동화 봇 최악의 결말은 버그가 아니라 **계정 정지**입니다. 몇 년 키운 계정은 복구가 안 되니, 정책 준수는 선택 기능이 아니라 전제 조건입니다.

## 지켜야 할 선 (2026 기준)

- **공식 API만 사용** — 비공식 자동화 앱, 계정 공유, 매크로 앱은 탐지되는 즉시 제재 대상입니다. 그래프 API(인스타그램의 공식 API)를 쓰는 것 자체가 최고의 방어입니다.
- **발행 빈도 절제** — API 상한과는 별개로, 피드 기준 하루 1~2회가 안전선입니다. 갑자기 빈도가 확 늘면 스팸 신호로 읽힙니다. 예: 아침 1건, 저녁 1건의 일정한 리듬.
- **반복 콘텐츠 금지** — 같은 문구·해시태그 세트를 복사해 붙이면 스팸 필터에 걸립니다. 해시태그를 30개 이상 모아두고 돌려가며 쓰세요. AI에게 매번 새 조합을 뽑게 하면 자연스럽게 해결됩니다.
- **자동 상호작용 금지** — 자동 팔로우·좋아요·DM·댓글은 발행 자동화와 전혀 다른 취급을 받습니다. 이 강의 범위 밖이며, 하지 마세요.

## 광고·출처 표기

- 협찬·제휴 콘텐츠에는 `#광고` 같은 표시 의무가 있습니다. 프롬프트와 검수 게이트 양쪽에 규칙으로 넣으세요.
- AI 생성 이미지에 실존 인물이나 남의 브랜드가 연상되는 표현이 없는지도 검수 항목에 포함하세요.

## 최후의 안전장치

봇은 방치한 만큼 위험해집니다. 토큰 만료와 정책 변경 공지를 월 1회 점검하는 반복 일정을 캘린더에 만들어 두세요. 규칙이 많아 보여도 정리하면 하나입니다 — 사람이 손으로 운영하는 계정처럼 보이게 하는 것. 이 강의의 파이프라인은 처음부터 그 선 안에서 설계되어 있으니, 범위를 벗어난 기능만 추가하지 않으면 됩니다.

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
  $aix$"AI로 월 천만 원" 같은 광고에 흔들리지 않으려면, 전자책보다 먼저 **정확한 기대치**부터 만들어야 합니다. 기대치가 틀리면 한 달 만에 포기하게 되기 때문입니다.

## 과장 마케팅의 공통 패턴

- "하루 10분, 클릭 몇 번" — AI 덕분에 만드는 시간은 확실히 줄었습니다. 하지만 **고르고, 다듬고, 등록하고, 개선하는** 시간은 그대로입니다.
- "AI가 다 해준다" — AI가 다 해주는 것은, 경쟁자도 똑같이 1분 만에 만들 수 있다는 뜻입니다.
- 수익 인증 스크린샷 — 대부분 그 방법으로 번 돈이 아니라, 그 방법을 가르치는 **강의를 팔아 번 돈**인 경우가 많습니다.

## 실제 수익 구조

- **자산 1개의 수익은 작습니다.** 전자책 한 권, 이미지 한 장의 월 수익은 몇천 원~몇만 원 수준이 현실입니다.
- 대신 수익은 **자산 수 × 개당 수익 × 시간**의 곱으로 쌓입니다. 자판기 사업과 같습니다. 한 대의 매출은 작아도, 여러 대를 꾸준히 늘리면 이야기가 달라집니다.
- 그래서 파이프라인(같은 제작 과정을 반복할 수 있게 정리한 작업 라인)이 필요합니다.
- 첫 수익까지 보통 **1~3개월** 걸립니다. 의미 있는 수익은 그 뒤로도 꾸준히 반복해야 나옵니다. 그 사이에는 판매 대신 조회수·노출 같은 작은 신호를 보며 버티게 됩니다.

## 그럼에도 할 만한 이유

- 한 번 만든 자산은 잠든 사이에도 팔립니다. 일한 시간과 수익이 분리되는 것이 이 모델의 가장 큰 매력입니다.
- AI 덕분에 만드는 비용은 크게 내려갔습니다. 남은 승부처는 **무엇을 만들지 정하는 기획과, 좋은 것만 남기는 선별**입니다.

> 💡 **핵심**: AI 수익화는 복권이 아니라 **소액 자산을 꾸준히 쌓는 파이프라인 사업**입니다. 기대치가 정확해야 3개월을 버팁니다.$aix$,
  $aix${"type":"compare","title":"과장 마케팅 vs 현실","columns":[{"title":"광고가 말하는 것","icon":"alert","tone":"warning","items":["하루 10분, 클릭 몇 번","첫 달부터 월 천만 원","AI가 전부 알아서","누구나 즉시 가능"]},{"title":"실제 수익 구조","icon":"chart","tone":"primary","items":["자산 1개 수익은 소액","자산 수 × 시간으로 누적","선별·편집은 사람의 몫","첫 수익까지 1~3개월"]}],"caption":"제작 원가는 내려갔지만, 기획·선별·개선의 노동은 그대로 남아 있습니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0bf2b54a-30cd-8019-4573-db69c5246d27', '83964f32-349e-a6d2-f48a-556b196341e0', 'ai-passive-income/finding-your-niche', 'finding-your-niche', '팔리는 니치 찾기: 수요와 경쟁의 교차점',
  $aix$무엇을 만들지 정하는 30분이, 무엇을 만드는 30시간보다 수익을 더 크게 좌우합니다. 그래서 제작보다 먼저 니치 검증부터 배웁니다.

## 니치의 공식

팔리는 니치 = **찾는 사람은 많은데, 좋은 상품이 없는 곳**입니다. 손님은 줄을 서는데 제대로 된 맛집이 없는 동네를 찾는 것과 같습니다. 둘 다 감이 아니라 데이터로 확인할 수 있습니다.

- **수요 확인**: 아마존·판매 플랫폼 검색창에 키워드를 쳐 보고 자동완성에 무엇이 뜨는지 봅니다. 구글 트렌드와 키워드 도구의 월 검색량도 함께 봅니다.
- **경쟁 확인**: 검색 상위 결과의 리뷰 수·평점·출간일을 확인합니다. 리뷰 수백 개짜리 강자가 즐비하면 그 니치는 후순위로 미룹니다.
- **틈새 신호**: 리뷰 평점은 낮은데 판매 순위는 높은 카테고리를 찾으세요. "사긴 사는데 불만족"은 곧 기회라는 뜻입니다.

## 4단계 검증 절차

1. 관심 있는 큰 주제에서 하위 키워드 20개를 뽑습니다. AI에게 브레인스토밍을 시키면 빠릅니다.
2. 키워드마다 검색량과 상위 경쟁 상품 수준을 표 한 장으로 정리합니다. 검색량 도구가 낯설면, 처음에는 아마존 검색창 자동완성만으로 시작해도 충분합니다.
3. "수요는 중간 이상 + 경쟁은 약함"인 후보 3개로 좁힙니다.
4. 후보별로 상위 5개 상품의 **불만 리뷰**를 읽고, 내가 더 잘 만들 각도를 찾습니다.

## 흔한 실수

- 내가 좋아하는 주제 ≠ 팔리는 주제입니다. 검증 없이 취향으로 정하면 대부분 실패합니다.
- 반대로 수요만 보고 레드오션(경쟁자가 이미 가득 찬 포화 시장 — 다이어트, 재테크 일반론 등)에 들어가는 것도 실패 공식입니다.

> 💡 **핵심**: 니치 선정은 감이 아니라 **검색량 × 경쟁 강도 표**로 결정하세요. 데이터 30분이 제작 30시간을 살립니다.$aix$,
  $aix${"type":"steps","title":"니치 검증 4단계","steps":[{"label":"하위 키워드 20개 발산","sublabel":"AI 브레인스토밍 + 검색 자동완성","icon":"lightbulb"},{"label":"수요 × 경쟁 표 만들기","sublabel":"검색량, 상위 상품 리뷰 수·평점","icon":"search"},{"label":"후보 3개로 압축","sublabel":"수요 중간 이상 + 경쟁 약함","icon":"filter"},{"label":"불만 리뷰에서 각도 찾기","sublabel":"'사긴 사는데 불만족'이 기회","icon":"target"}],"caption":"취향이 아니라 데이터가 니치를 고릅니다."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e47ae9e4-3c87-00c6-3aa8-896b61eb690a', '83964f32-349e-a6d2-f48a-556b196341e0', 'ai-passive-income/your-added-value', 'your-added-value', '나만의 부가가치: AI 100% 생성물은 왜 안 팔리나',
  $aix$프롬프트 한 줄로 만든 결과물은 이제 **누구나 1분 만에** 만들 수 있습니다. 누구나 만들 수 있는 것에는 가격이 붙지 않습니다. 그래서 이번 레슨에서는 "AI 위에 무엇을 얹어야 팔리는가"를 정리합니다.

## AI 100% 생성물의 한계

- **차별성 제로**: 같은 모델에 비슷한 프롬프트를 넣으면 비슷한 결과물이 나옵니다. 시장에는 이미 그런 결과물이 쏟아지고 있습니다.
- **신뢰성 문제**: 검증하지 않은 AI 텍스트에는 그럴듯한 오류(할루시네이션)가 섞입니다. 오류는 환불과 악평으로 돌아옵니다.
- **플랫폼 규제**: 저품질 AI 콘텐츠의 대량 업로드는 주요 플랫폼이 가장 먼저 적발·제재하는 대상입니다.

## 가치를 얹는 4개 층

AI 출력물은 밀가루 같은 원재료입니다. 손님이 돈을 내는 것은 밀가루가 아니라 빵입니다. 원재료 위에 사람만 얹을 수 있는 층이 4개 있습니다.

- **경험**: 내가 직접 해본 사례, 실패담, 실제 수치. 예를 들어 세금 전자책이라면 "내가 홈택스에서 실제로 헤맨 화면"을 캡처와 함께 설명하는 식입니다.
- **큐레이션(선별)**: 100개를 만들어 좋은 8개만 남기는 나만의 기준.
- **구조**: 독자의 문제 순서대로 재배열한 목차, 일관된 시리즈 스타일.
- **검증**: 사실 확인, 최신 정보 업데이트, 오류 수정. 시간이 가장 들지만 신뢰를 만듭니다.

## 실무 감각

"AI가 만든 것"이 아니라 "AI로 **내가** 만든 것"이 팔립니다. 구매자가 돈을 내는 대상은 생성이 아니라, 무엇을 남기고 무엇을 버릴지 가르는 **판단**입니다. 이 판단 기준은 다음 레슨부터 만드는 파이프라인 곳곳에 들어갑니다.

> 💡 **핵심**: AI는 원재료 공장입니다. 경험 · 큐레이션 · 구조 · 검증 — 이 4개 층이 여러분의 마진(남는 이익)입니다.$aix$,
  $aix${"type":"stack","title":"가격이 붙는 가치의 층","layers":[{"label":"검증","sublabel":"사실 확인 · 최신화 · 오류 수정","icon":"shield","tone":"success"},{"label":"구조","sublabel":"독자 문제 순서의 목차 · 시리즈 스타일","icon":"layers","tone":"primary"},{"label":"경험 · 큐레이션","sublabel":"직접 해본 사례 · 100개 중 8개 선별","icon":"eye","tone":"accent"},{"label":"AI 생성물 (원재료)","sublabel":"누구나 1분 만에 — 그 자체론 가격 0원","icon":"sparkles","tone":"muted"}],"caption":"아래층(생성)은 흔해졌고, 위층(판단)으로 갈수록 희소해집니다."}$aix$::jsonb, null, 5, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'fe9971d5-32b9-988a-fd61-eaaa642242f9', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/planning-and-outline', 'planning-and-outline', '기획과 목차 설계: AI 브레인스토밍 활용법',
  $aix$전자책의 판매량은 집필 전에 이미 절반이 결정됩니다. 목차가 곧 상품 기획서이기 때문입니다. 그래서 첫 단계는 글쓰기가 아니라 목차 설계입니다.

## AI에게 시킬 일: 아이디어 펼치기(발산)

- 니치 키워드를 주고 **독자가 실제로 검색할 법한 질문 30개**를 뽑게 합니다. 이 질문들이 목차의 원료입니다. "초보 독자가 검색창에 칠 법한 말투 그대로"라는 조건을 붙이면 실제 수요에 훨씬 가까운 질문이 나옵니다.
- 경쟁 도서의 목차를 주고 "빠진 주제, 겹치는 주제"를 분석하게 합니다.
- 같은 주제로 목차 구성을 3가지 각도(입문 가이드 / 체크리스트형 / 사례 중심)로 받아 나란히 비교해 봅니다.

## 사람이 할 일: 골라서 좁히기(수렴)

- AI가 준 30개 질문 중 **내가 자신 있게 답할 수 있고, 독자가 돈을 낼 만한** 질문만 남깁니다.
- 남긴 질문을 독자가 문제를 해결하는 순서대로 재배열합니다. AI는 백과사전처럼 항목 나열식으로 늘어놓는 경향이 있어서, 순서 잡기는 사람 몫입니다.
- 챕터마다 "이 장을 읽으면 무엇을 할 수 있게 되는가"를 한 줄로 적어 봅니다. 한 줄이 안 써지면 그 장은 삭제 후보입니다. 이 한 줄들은 나중에 판매 페이지의 소개문으로도 재활용됩니다.

## 분량 기획

- 2026년 전자책 시장의 주력은 두꺼운 책이 아니라 **한 가지 문제를 확실히 푸는 30~80쪽 분량**입니다. 독자도 빨리 답을 얻고 싶어 합니다.
- 얇은 책 여러 권(시리즈)이 두꺼운 책 한 권보다 검색에 노출될 기회도, 수익도 유리합니다. "이 분량으로 부족하지 않을까" 싶은 내용은 억지로 채우지 말고 다음 권의 목차로 미루세요.

> 💡 **핵심**: AI로 질문을 펼치고, 사람이 "돈 낼 질문"만 골라내세요. 목차의 각 장은 "독자가 얻는 능력 한 줄"로 검증합니다.$aix$,
  $aix${"type":"chat","title":"목차 브레인스토밍 프롬프트","messages":[{"role":"user","text":"'1인 사업자 세금 신고' 전자책을 기획 중이야. 초보 독자가 실제로 검색할 법한 질문 30개를 뽑아줘."},{"role":"ai","text":"1. 홈택스 첫 신고, 뭐부터 눌러야 하나요? 2. 경비 처리 되는 것과 안 되는 것은? 3. 세금계산서와 현금영수증의 차이는? …"},{"role":"user","text":"좋아. 이 질문들을 '신고 전 준비 → 신고 당일 → 신고 후 관리' 순서로 묶어서 3부 목차로 재구성해줘."},{"role":"ai","text":"1부 준비: 장부와 증빙 모으기(질문 2,3,7…) / 2부 실전: 홈택스 화면 순서대로(질문 1,5…) / 3부 관리: 환급·경정청구(질문 12…)"}],"caption":"AI는 질문을 발산하고, 사람은 독자의 문제 순서로 수렴합니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6d7c5109-3e38-19af-135d-52daed2eb337', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/writing-workflow', 'writing-workflow', '집필 워크플로우: 초안은 AI, 편집은 사람',
  $aix$전자책 집필에서 시간이 가장 오래 걸리는 일은 이제 쓰기가 아니라 **고치기와 확인하기**입니다. 집을 지을 때 골조는 금방 올라가도 마감 공사가 오래 걸리는 것과 같습니다. 작업 순서도 거기에 맞춰 설계합니다.

## 3단계 분업

1. **AI 초안** — 장(챕터)마다 개요·독자·금지사항(과장 금지, 추측 금지)을 담은 프롬프트로 초안을 뽑습니다. 한 번에 책 전체를 시키지 말고 **장 단위**로 시키세요. 그래야 품질을 챙길 수 있습니다.
2. **사람의 편집** — 내 경험과 사례를 끼워 넣고, AI 특유의 뻔한 문장("~하는 것이 중요합니다"의 반복)을 걷어내고, 책 전체의 문체를 통일합니다.
3. **사실 확인** — 숫자·법규·요금·URL처럼 검증 가능한 주장에 전부 표시를 해 두고, 원본 출처를 하나하나 직접 열어 확인합니다.

## 사실 확인이 유일한 보험입니다

- AI 초안의 할루시네이션은 문장이 그럴듯해서 더 위험합니다. 특히 **세금·법률·건강·요금** 정보는 오류 하나가 환불 폭탄과 악평으로 돌아옵니다.
- 검증 요령: 초안을 시킬 때 "확실하지 않은 부분은 [확인 필요]로 표시해"라고 함께 지시하세요. 검토할 범위가 훨씬 줄어듭니다.

## 리듬 만들기

- 하루 1장(챕터) 사이클을 추천합니다: 오전 초안 30분 → 편집 1시간 → 확인 30분. 전체 일정은 첫 장을 끝내 본 뒤에 세우세요. 1장에 실제로 걸린 시간이 가장 정확한 견적입니다.
- 편집하다 목차의 구조 문제를 발견하면 기획 단계로 되돌아가도 됩니다. 파이프라인은 원래 앞 단계로 되돌아가며 좋아집니다.

> 💡 **핵심**: AI가 빨라진 만큼 병목(가장 오래 걸려 전체 속도를 정하는 구간)은 편집과 사실 확인으로 이동했습니다. **초안 30% : 편집·검증 70%**로 시간을 배분하세요.$aix$,
  $aix${"type":"flow","title":"장(챕터) 단위 집필 루프","nodes":[{"label":"AI 초안 생성","sublabel":"장 단위 · 개요+독자+금지사항 프롬프트","icon":"wand","tone":"accent"},{"label":"사람의 편집","sublabel":"경험 삽입 · AI 문체 제거","icon":"user","tone":"primary"},{"label":"사실 확인","sublabel":"숫자·법규·URL 출처 대조","icon":"shield","tone":"warning"},{"label":"장 완성 → 다음 장","sublabel":"하루 1장 사이클","icon":"check","tone":"success","edgeLabel":"검증 통과 시"}],"loopBack":{"from":2,"to":0,"label":"오류·구조 문제 발견 시 재작성"},"caption":"생성은 빨라졌으니, 시간의 70%는 편집과 검증에 씁니다."}$aix$::jsonb, $aix${"title":"AI 초안 → 사람 편집 워크플로우 따라하기","app":{"kind":"browser","url":"app.ai-writer.example/project/tax-guide","blocks":[{"id":"b-head","type":"heading","label":"전자책 집필 어시스턴트 — 1인 사업자 세금 신고"},{"id":"b-prompt","type":"input","label":"AI에게 요청할 내용을 입력하세요…"},{"id":"b-send","type":"button","label":"요청 보내기"},{"id":"b-outline","type":"card","label":"📑 목차 초안 — 1부 준비 / 2부 홈택스 실전 / 3부 신고 후 관리","hidden":true},{"id":"b-confirm","type":"badge","label":"목차 확정 — 독자의 문제 순서로 재배열","hidden":true},{"id":"b-draft","type":"card","label":"📝 2부 1장 초안 (1,200자) — [확인 필요] 표시 2곳 포함","hidden":true},{"id":"b-flag","type":"badge","label":"[확인 필요] 홈택스 화면 개편 여부 — 출처 직접 대조","hidden":true},{"id":"b-edit","type":"card","label":"✍️ 사람 편집 — 내 실패 사례 삽입 · AI 문체 제거","hidden":true},{"id":"b-done","type":"badge","label":"1장 완성 — 사실 확인 통과","hidden":true}]},"actions":[{"t":"caption","text":"① 니치 키워드로 목차 초안을 요청합니다"},{"t":"click","target":"b-prompt"},{"t":"type","target":"b-prompt","text":"1인 사업자 세금 신고, 3부 목차 구성해줘"},{"t":"click","target":"b-send"},{"t":"reveal","target":"b-outline"},{"t":"wait","ms":600},{"t":"caption","text":"② 사람이 독자의 문제 순서로 목차를 확정합니다"},{"t":"move","target":"b-outline"},{"t":"click"},{"t":"reveal","target":"b-confirm"},{"t":"caption","text":"③ 장 단위로 초안을 요청합니다 — 금지사항 포함"},{"t":"hide","target":"b-prompt"},{"t":"type","target":"b-prompt","text":"2부 1장 초안. 불확실하면 [확인 필요] 표시해"},{"t":"click","target":"b-send"},{"t":"reveal","target":"b-draft"},{"t":"reveal","target":"b-flag"},{"t":"caption","text":"④ [확인 필요] 표시는 사람이 원본 출처로 검증합니다"},{"t":"dblclick","target":"b-flag"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 경험 삽입과 문체 정리는 사람의 몫입니다"},{"t":"reveal","target":"b-edit"},{"t":"move","target":"b-edit"},{"t":"reveal","target":"b-done"},{"t":"caption","text":"✅ 초안 30% : 편집·검증 70% — 하루 1장 사이클"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'af4d487d-8e9d-9549-def6-d5202d760523', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/formatting-and-cover', 'formatting-and-cover', '자동 포맷팅과 표지 제작',
  $aix$내용이 같아도 글자 배치(조판)와 표지가 조악하면 '싸구려 AI 책'으로 보입니다. 표지는 매대에 놓인 책의 얼굴이기 때문입니다. 다행히 이 단계는 거의 전부 자동화할 수 있습니다.

## 원고는 마크다운으로, 변환은 도구에게

- 원고를 처음부터 **마크다운**으로 쓰세요. 그러면 EPUB(전자책 표준 파일 형식)·PDF 변환이 명령 한 줄로 끝납니다.
- `pandoc`(무료 문서 변환 도구) 하나로 EPUB 변환, 목차 자동 생성, 스타일(CSS) 적용까지 처리됩니다. 공식 사이트에서 설치한 뒤, 터미널에 변환 명령을 그대로 붙여 넣으면 됩니다. 오류가 나면 파일 이름 오타부터 확인하세요.
- 같은 원고 하나로 KDP(아마존 전자책 출판)용 EPUB, PDF 판매용, 웹 미리보기용을 동시에 뽑을 수 있습니다. 이것이 파이프라인의 힘입니다.

## 표지: AI 생성 + 규격 준수

- 이미지 생성 AI로 배경 시안을 여러 장 뽑되, **제목 글자는 디자인 도구에서 직접** 얹으세요. AI가 그린 글자는 여전히 어색한 경우가 많습니다.
- 판매 목록에서 표지는 손톱만 한 크기로 보입니다. 그 크기에서도 제목이 읽히는지가 유일한 합격 기준입니다.
- 플랫폼 규격(KDP 권장 2,560×1,600px, 세로:가로 1.6:1)을 먼저 확인하고 시작합니다. 규격이 안 맞으면 업로드 단계에서 거절됩니다.

## 업로드 전 체크리스트

- 목차 링크를 눌렀을 때 실제로 해당 장으로 이동하는가 (EPUB 검증 도구 통과)
- 본문 글꼴·여백이 모바일 미리보기에서 깨지지 않는가
- 표지가 흑백·축소 상태에서도 알아볼 수 있는가

> 💡 **핵심**: 원고는 마크다운으로, 변환은 pandoc으로, 표지 글자는 사람 손으로. 포맷팅은 **한 번 만든 변환 스크립트를 시리즈 전체에 재사용**하는 단계입니다.$aix$,
  $aix${"type":"terminal","windowTitle":"포맷팅 파이프라인 — 명령 한 줄 변환","lines":[{"text":"# 마크다운 원고 → EPUB (목차·스타일 자동)","tone":"comment"},{"text":"pandoc book.md -o book.epub --toc --css=style.css \\","tone":"cmd"},{"text":"  --metadata title=\"1인 사업자 세금 신고\"","tone":"cmd"},{"text":"✓ book.epub 생성 완료","tone":"ok"},{"text":"# 같은 원고로 PDF 판매본도 동시에","tone":"comment"},{"text":"pandoc book.md -o book.pdf --toc","tone":"cmd"},{"text":"✓ book.pdf 생성 완료","tone":"ok"},{"text":"epubcheck book.epub","tone":"cmd"},{"text":"✓ 검증 통과 — 오류 0건","tone":"ok"}],"caption":"한 번 만든 변환 스크립트는 시리즈 전권에 그대로 재사용됩니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '935eca3d-8fb9-c78b-da57-2987b324061b', '42e48838-8148-c842-f738-80e882570a01', 'ai-passive-income/publishing-and-disclosure', 'publishing-and-disclosure', '퍼블리싱 등록과 AI 콘텐츠 고지 정책',
  $aix$다 만든 책이 계정 정지로 사라지는 일은 실제로 일어납니다. 그래서 등록 버튼을 누르기 전에 **각 플랫폼의 AI 콘텐츠 정책**부터 알아야 합니다. 계정은 가게로 치면 사업자 등록증입니다. 정지되면 책 한 권이 아니라 가게 전체가 사라집니다.

## KDP(아마존)의 AI 고지 규정

- KDP는 책 등록 화면에서 AI 사용 여부를 **묻고, 반드시 답하도록 의무화**하고 있습니다. 이 질문이 안 보인다고 건너뛰지 마세요. 등록 단계 중간에 반드시 나옵니다.
- 기준은 두 가지로 나뉩니다. **AI 생성(AI-generated)**: AI가 만든 텍스트·이미지를 그대로 또는 편집해서 사용 → 고지 필수. **AI 보조(AI-assisted)**: 사람이 쓴 원고를 AI로 다듬거나 아이디어만 얻음 → 고지 불요.
- 허위로 고지했다가 적발되면 해당 도서 삭제를 넘어 **계정 정지**까지 갈 수 있습니다. 정직하게 답하는 것이 유일한 전략입니다.

## 국내·기타 플랫폼

- 리디·교보 같은 국내 플랫폼, 크몽·탈잉 같은 지식마켓, Gumroad 같은 직접 판매 채널은 정책과 수수료가 제각각입니다. 등록 전에 최신 약관을 반드시 확인하세요.
- 한 곳 독점(예: KDP 셀렉트)은 로열티 혜택을 주는 대신 다른 플랫폼 판매를 금지합니다. 첫 책은 **비독점으로 여러 곳에 등록**해 시장 반응을 넓게 보는 편이 안전합니다.

## 등록 실무 순서

- 상품 페이지의 제목·소개문이 사실상 광고입니다. 니치 조사에서 모아 둔 "불만 리뷰의 표현"을 소개문에 그대로 쓰세요. 독자가 실제로 쓰는 말이 가장 잘 통합니다.
- 가격은 경쟁작 가격대 안에서 시작하고, 이후 판매 데이터를 보며 조정합니다.

> 💡 **핵심**: AI 사용은 숨길 것이 아니라 **정책에 맞게 고지**할 대상입니다. 계정은 파이프라인 전체가 걸린 자산이라, 정책 위반이 최대 리스크입니다.$aix$,
  $aix${"type":"grid","title":"퍼블리싱 채널 지도","items":[{"label":"아마존 KDP","sublabel":"AI 생성 여부 고지 의무","icon":"book","tone":"primary"},{"label":"국내 이북 플랫폼","sublabel":"리디·교보 등 — 약관 확인","icon":"smartphone","tone":"accent"},{"label":"지식마켓","sublabel":"크몽 등 — PDF 직판","icon":"shopping-cart","tone":"accent"},{"label":"직접 판매","sublabel":"Gumroad 등 — 수수료 최소","icon":"globe","tone":"success"},{"label":"독점 계약 주의","sublabel":"타 플랫폼 판매 금지 조건","icon":"alert","tone":"warning"},{"label":"계정 = 핵심 자산","sublabel":"정책 위반은 최대 리스크","icon":"key","tone":"muted"}],"caption":"첫 책은 비독점 다중 등록으로 — 계정 안전이 수익보다 우선입니다."}$aix$::jsonb, $aix${"title":"KDP 등록과 AI 콘텐츠 고지 따라하기","app":{"kind":"browser","url":"kdp.amazon.com/ko_KR/title-setup/kindle","blocks":[{"id":"k-head","type":"heading","label":"Kindle 전자책 세부 정보 등록"},{"id":"k-title","type":"input","label":"도서 제목 입력…"},{"id":"k-desc","type":"input","label":"도서 소개문 입력…"},{"id":"k-ai-q","type":"card","label":"생성형 AI 사용 여부 — 텍스트·이미지에 AI 생성 콘텐츠가 포함되어 있습니까?"},{"id":"k-ai-yes","type":"button","label":"예 — AI 생성 콘텐츠 포함"},{"id":"k-ai-badge","type":"badge","label":"☑ AI 생성 고지 완료 — 허위 고지 시 계정 정지 위험","hidden":true},{"id":"k-upload","type":"button","label":"원고·표지 업로드"},{"id":"k-file","type":"card","label":"📄 book.epub · cover.jpg — 업로드 완료 (epubcheck 통과본)","hidden":true},{"id":"k-publish","type":"button","label":"출간 신청"},{"id":"k-review","type":"badge","label":"🕒 심사 대기 중 — 보통 72시간 이내","hidden":true}]},"actions":[{"t":"caption","text":"① 니치 조사로 검증한 제목을 입력합니다"},{"t":"click","target":"k-title"},{"t":"type","target":"k-title","text":"1인 사업자 세금 신고, 30분 가이드"},{"t":"wait","ms":400},{"t":"caption","text":"② 소개문에는 불만 리뷰의 언어를 그대로 씁니다"},{"t":"click","target":"k-desc"},{"t":"type","target":"k-desc","text":"홈택스, 뭐부터 눌러야 할지 막막하다면"},{"t":"wait","ms":400},{"t":"caption","text":"③ AI 사용 여부는 정직하게 고지합니다"},{"t":"move","target":"k-ai-q"},{"t":"wait","ms":500},{"t":"click","target":"k-ai-yes"},{"t":"reveal","target":"k-ai-badge"},{"t":"wait","ms":500},{"t":"caption","text":"④ 검증을 통과한 EPUB과 표지를 업로드합니다"},{"t":"click","target":"k-upload"},{"t":"reveal","target":"k-file"},{"t":"wait","ms":500},{"t":"caption","text":"⑤ 출간을 신청하고 심사 상태를 확인합니다"},{"t":"click","target":"k-publish"},{"t":"reveal","target":"k-review"},{"t":"move","target":"k-review"},{"t":"caption","text":"✅ 정책에 맞는 고지로 등록 완료 — 심사 대기"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5695498d-7bff-b467-74f9-df557acc76f0', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/stock-policy-landscape', 'stock-policy-landscape', '스톡 시장의 AI 정책 지형: 어디에 올릴 수 있나',
  $aix$스톡 이미지(광고·문서에 쓰라고 파는 기성 이미지) 수익화의 첫 관문은 그림 실력이 아니라 **플랫폼 정책 읽기**입니다. 쇼핑몰에 입점하기 전에 입점 규정부터 읽는 것과 같습니다. AI 이미지를 받아 주는 곳과 금지하는 곳이 명확히 갈리기 때문입니다.

## 허용 진영 (고지 조건부)

- **Adobe Stock** — AI 생성 이미지를 정식 카테고리로 받습니다. 업로드 화면에서 '생성형 AI로 제작' 체크가 **의무**이고, 실존 인물·상표가 등장하면 거절됩니다.
- **Freepik, Vecteezy, Dreamstime** 등도 고지를 전제로 허용하는 대표 플랫폼입니다.

## 금지·제한 진영

- **Getty Images / iStock** — 외부 AI로 생성한 이미지의 업로드 금지 기조를 유지하고 있습니다.
- **Shutterstock** — 기여자가 제3자 AI 도구로 만든 이미지의 업로드를 제한해 왔습니다.
- 정책은 계속 바뀝니다. **업로드 전에 해당 플랫폼의 최신 기여자(contributor) 가이드를 확인**하는 습관이 필요합니다. 보통 사이트 하단의 'Contributor' 메뉴에서 찾을 수 있습니다.

## 정책 위에서 세우는 전략

- 허용 플랫폼 2~3곳에 **같은 포트폴리오(내 이미지 전체 묶음)를 나란히 업로드**하는 것이 기본형입니다.
- 특정 작가의 화풍을 흉내 낸 이미지는 저작권 논쟁이 있으니, 정책과 무관하게 피하세요. 계정을 오래 지키려면 처음부터 멀리하는 편이 낫습니다.
- 실제 사람 얼굴이 나오는 이미지는 초상권(자기 얼굴이 함부로 쓰이지 않을 권리) 문제로 심사 거절률이 높습니다. 초보자는 **사물·배경·개념 일러스트**부터 시작하는 것이 안전합니다.

> 💡 **핵심**: "어디에 팔 수 있는가"를 먼저 확정하세요. 허용 플랫폼에 정직하게 고지하고 올리는 것이 유일하게 지속 가능한 전략입니다.$aix$,
  $aix${"type":"compare","title":"AI 이미지 정책: 플랫폼 진영","columns":[{"title":"허용 (고지 조건부)","icon":"check","tone":"success","items":["Adobe Stock","Freepik · Vecteezy","Dreamstime","'AI 생성' 표시 의무"]},{"title":"금지 · 제한","icon":"x","tone":"muted","items":["Getty / iStock","Shutterstock (외부 AI 제한)","정책 수시 변경 — 최신 가이드 확인","허위 미고지 시 계정 정지"]}],"caption":"허용 플랫폼 2~3곳 병행 업로드가 기본 전략입니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '2648db5a-e014-f5f1-2273-280236be220d', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/batch-generation-pipeline', 'batch-generation-pipeline', '대량 생성 파이프라인: 주제 리스트 → 배치 → 선별',
  $aix$스톡 수익은 한 장의 걸작이 아니라 **꾸준히 팔리는 수백 장의 포트폴리오**에서 나옵니다. 그래서 만드는 방식도 공장의 생산 라인처럼 설계합니다.

## 파이프라인 3단계

1. **주제 리스트업** — 시즌 이벤트(설날, 연말정산), 비즈니스 개념(재택근무, 협업), 배경·텍스처(질감 패턴)처럼 **수요가 검증된 주제**를 스프레드시트 한 장으로 관리합니다. AI에게 "다음 분기에 마케터가 찾을 이미지 주제 50개"를 뽑게 하는 것도 좋은 시작점입니다.
2. **배치 생성** — 배치란 여러 건을 한꺼번에 모아 처리하는 방식입니다. 주제 하나마다 프롬프트를 구도·색·스타일별로 바꿔 가며 한 번에 수십 장을 뽑습니다. 잘 나온 프롬프트는 **템플릿으로 저장**해 다음 주제에 재사용합니다.
3. **선별** — 생성한 것의 10~20%만 살아남는 것이 정상입니다. 손가락 개수가 이상하거나 글자·로고가 뭉개진 "AI 티" 결함은 플랫폼 심사 거절 1순위입니다.

## 선별 기준 3가지

- **결함 없음**: 이미지를 100% 이상으로 확대해서 손·글자·경계선을 확인합니다. 작게 볼 때는 멀쩡해 보이는 결함이 많습니다.
- **용도 명확**: "이 이미지를 누가 어떤 문서에 쓸까"가 한 문장으로 나오는가. 안 나오면 예쁜 그림일 뿐, 팔리는 스톡이 아닙니다.
- **시리즈 일관성**: 같은 스타일로 묶인 10장이, 제각각인 1장 열 개보다 잘 팔립니다.

## 양보다 리듬

주 1회 "주제 5개 × 생성 100장 × 선별해서 15장 업로드" 같은 **고정 리듬**이, 한 번에 몰아치는 것보다 오래갑니다. 요일과 시간을 정해 두면 습관이 됩니다.

> 💡 **핵심**: 생성은 기계에게, 선별은 사람에게. **생성량의 80~90%를 버리는 용기**가 포트폴리오 품질이자 계정 신뢰도입니다.$aix$,
  $aix${"type":"flow","title":"주간 배치 생산 파이프라인","nodes":[{"label":"주제 리스트업","sublabel":"수요 검증된 주제 스프레드시트","icon":"clipboard","tone":"accent"},{"label":"배치 생성","sublabel":"주제당 프롬프트 변형 × 수십 장","icon":"image","tone":"primary"},{"label":"선별 (10~20% 생존)","sublabel":"결함 검수 · 용도 · 시리즈 일관성","icon":"filter","tone":"warning"},{"label":"플랫폼 업로드","sublabel":"AI 생성 고지 체크","icon":"upload","tone":"success","edgeLabel":"합격작만"}],"loopBack":{"from":3,"to":0,"label":"주 1회 고정 리듬으로 반복"},"caption":"80~90%를 버리는 선별이 이 파이프라인의 품질 관문입니다."}$aix$::jsonb, null, 6, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '606d8cf3-ac69-6202-827c-5a2ecba651b5', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/metadata-automation', 'metadata-automation', '메타데이터 자동화: 제목과 키워드가 곧 유통망',
  $aix$스톡 이미지는 오직 검색으로만 팔립니다. 제목과 키워드는 상품 진열대의 안내 표지판 같아서, 아무리 좋은 이미지도 **이것이 부실하면 존재하지 않는 것**과 같습니다.

## 메타데이터의 구조

- **제목**: 구체적인 묘사형으로 씁니다. "비즈니스 이미지"(나쁨) → "노트북으로 화상회의 중인 재택근무 홈오피스 책상"(좋음). 구체적일수록 검색에 잘 걸립니다.
- **키워드**: 플랫폼당 30~50개를 답니다. 피사체(무엇이 찍혔나) → 상황·개념 → 분위기·색상 → 용도 순서로 층을 쌓으면 빠뜨리지 않습니다.
- **카테고리·고지 표시**: 'AI 생성' 표시를 포함해 플랫폼 양식에 맞게 빠짐없이 채웁니다.

## AI로 자동화하기

- 이미지를 볼 수 있는 멀티모달 AI에 이미지를 주고 "스톡용 제목 1개 + 키워드 40개(영문)를 CSV 형식으로"라고 지시하면 초안이 나옵니다. CSV는 엑셀로 열리는 표 형식 파일입니다.
- 수십 장을 스크립트로 한 번에 돌려 **CSV로 일괄 생성 → 플랫폼의 CSV 업로드 기능**으로 넣는 것이 표준 파이프라인입니다. 스크립트가 어렵다면, 처음에는 AI 채팅창에 이미지를 몇 장씩 올려 받는 것부터 시작해도 됩니다.
- 단, 자동 생성된 키워드 중 **이미지와 무관한 스팸성 키워드는 사람이 직접 삭제**해야 합니다. 무관 키워드를 남발하면 검색 순위가 깎이고 심사에서도 거절됩니다.

## 시간 배분의 역전

손으로 하면 이미지 1장당 제목·키워드 작성에 5~10분 — 100장이면 10시간입니다. 자동화하면 검수까지 포함해 1~2시간으로 줄어듭니다. 이 차이가 파이프라인의 수지타산을 결정합니다.

> 💡 **핵심**: 메타데이터는 AI로 일괄 생성하고, 사람은 스팸 키워드만 걷어내세요. **검색되지 않는 이미지는 존재하지 않는 이미지**입니다.$aix$,
  $aix${"type":"steps","title":"메타데이터 일괄 처리 절차","steps":[{"label":"선별작 폴더 정리","sublabel":"업로드 확정본만 모으기","icon":"camera"},{"label":"AI 일괄 분석","sublabel":"이미지 → 제목 + 키워드 40개","icon":"wand"},{"label":"CSV 생성 · 스팸 검수","sublabel":"무관 키워드 삭제 (페널티 예방)","icon":"file-text"},{"label":"CSV 일괄 업로드","sublabel":"AI 생성 고지 플래그 포함","icon":"upload"}],"caption":"100장 10시간짜리 수작업이 검수 포함 1~2시간으로 줄어듭니다."}$aix$::jsonb, $aix${"title":"메타데이터 자동화 시나리오 따라하기","app":{"kind":"automation-canvas","windowTitle":"스톡 메타데이터 일괄 처리 — Make","nodes":[{"id":"n-folder","icon":"camera","label":"선별작 폴더 감시","sublabel":"업로드 확정본 15장","tone":"accent"},{"id":"n-vision","icon":"brain","label":"AI 이미지 분석","sublabel":"제목 1개 + 키워드 40개","hidden":true},{"id":"n-csv","icon":"file-text","label":"CSV 생성","sublabel":"플랫폼 양식으로 변환","hidden":true},{"id":"n-review","icon":"filter","label":"사람 검수","sublabel":"스팸 키워드 삭제","tone":"warning","hidden":true},{"id":"n-upload","icon":"upload","label":"일괄 업로드","sublabel":"AI 생성 고지 플래그 ON","tone":"success","hidden":true}],"runLog":[{"id":"log-run","text":"▶ 시나리오 실행 — 신규 이미지 15장 감지","tone":"out","hidden":true},{"id":"log-meta","text":"✓ 제목·키워드 생성 완료 (15/15)","tone":"ok","hidden":true},{"id":"log-spam","text":"⚠ 무관 키워드 3건 감지 — 사람 검수 대기","tone":"err","hidden":true},{"id":"log-done","text":"✓ metadata.csv 업로드 완료 — 고지 플래그 포함","tone":"ok","hidden":true}]},"actions":[{"t":"caption","text":"① 선별을 통과한 이미지 폴더가 시작점입니다"},{"t":"move","target":"n-folder"},{"t":"click"},{"t":"wait","ms":400},{"t":"caption","text":"② AI 분석 노드로 제목·키워드를 일괄 생성합니다"},{"t":"reveal","target":"n-vision"},{"t":"move","target":"n-vision"},{"t":"click"},{"t":"caption","text":"③ CSV 변환 뒤에 사람 검수 노드를 꼭 넣습니다"},{"t":"reveal","target":"n-csv"},{"t":"reveal","target":"n-review"},{"t":"move","target":"n-review"},{"t":"click"},{"t":"caption","text":"④ 업로드 노드에 AI 생성 고지 플래그를 켭니다"},{"t":"reveal","target":"n-upload"},{"t":"dblclick","target":"n-upload"},{"t":"wait","ms":400},{"t":"caption","text":"⑤ 시나리오를 실행하고 로그로 검수합니다"},{"t":"reveal","target":"log-run"},{"t":"reveal","target":"log-meta"},{"t":"reveal","target":"log-spam"},{"t":"dblclick","target":"log-spam"},{"t":"reveal","target":"log-done"},{"t":"move","target":"log-done"},{"t":"caption","text":"✅ 100장 10시간 작업이 검수 포함 1~2시간으로"},{"t":"wait","ms":900}]}$aix$::jsonb, 5, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b9c7d332-cad2-03db-66f4-15710e6e087b', '9a0cec31-c225-d7a0-2f84-875c820e39ca', 'ai-passive-income/sales-data-improvement-loop', 'sales-data-improvement-loop', '판매 데이터 개선 루프: 팔린 것이 다음 주제를 정한다',
  $aix$업로드는 끝이 아니라 시작입니다. 수익이 커지는 계정과 제자리인 계정의 차이는 단 하나, **판매 데이터를 다음 제작에 반영하는가**입니다. 잘 팔린 메뉴를 대표 메뉴로 키우고 안 나가는 메뉴를 빼는 식당처럼요.

## 무엇을 보는가

- **판매·다운로드 수**: 어떤 주제·스타일이 실제로 팔렸는지 확인합니다. 판매 플랫폼의 기여자(판매자) 대시보드에 기본으로 제공됩니다.
- **검색 유입 키워드**: 구매자가 어떤 검색어로 내 이미지에 도달했는지 봅니다. 여기서 얻은 실제 검색어가 다음 메타데이터의 원료입니다.
- **판매 집중도**: 보통 포트폴리오 상위 10~20% 이미지가 수익 대부분을 만듭니다. 그래서 내 상위작이 무엇인지부터 정확히 알아야 합니다.

## 개선 루프(반복 고리) 돌리기

1. 월 1회, 달력에 날을 정해 두고 판매 상위 이미지들의 **공통점**(주제·색·구도·키워드)을 정리합니다.
2. 그 공통점으로 **변형 시리즈**를 만듭니다. 팔린 주제의 다른 계절 버전, 다른 구도, 다른 인물 구성처럼요.
3. 3개월 연속 판매가 0인 스타일은 생산을 중단합니다. 만든 정성이 아깝더라도, 데이터가 그만두라고 보내는 신호입니다.
4. 결과를 주제 리스트(파이프라인 1단계)에 반영합니다. 이렇게 루프가 닫히고, 다음 달 제작물은 이번 달보다 팔릴 확률이 높아집니다.

## 전자책에도 같은 루프

이 구조는 전자책도 똑같습니다. 팔린 책의 주제로 시리즈 다음 권을 내는 것이, 완전히 새 주제를 여는 것보다 성공률이 몇 배 높습니다. 판매 페이지의 리뷰와 질문은 다음 권의 목차 재료로 그대로 쓸 수 있습니다.

> 💡 **핵심**: 첫 업로드는 가설, 판매 데이터는 검증입니다. **팔린 것의 변형을 늘리고 안 팔린 것을 끊는 월간 루프**가 수익 곡선의 기울기를 만듭니다.$aix$,
  $aix${"type":"cycle","title":"월간 판매 데이터 개선 루프","center":"팔린 것이 다음 주제를 정한다","nodes":[{"label":"업로드·판매","sublabel":"포트폴리오 노출","icon":"shopping-cart"},{"label":"데이터 분석","sublabel":"판매 상위작의 공통점","icon":"chart"},{"label":"주제 리스트 갱신","sublabel":"팔린 주제의 변형 추가","icon":"trending-up"},{"label":"변형 시리즈 제작","sublabel":"안 팔린 스타일은 중단","icon":"refresh"}],"caption":"이 루프가 닫히는 순간, 부업이 시스템이 됩니다."}$aix$::jsonb, null, 6, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AI 시대의 PM: 새로운 역할과 핵심 역량
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '2afe3831-2d86-38d4-8241-e72f7b41baf6', 'ai-pm', 'AI 시대의 PM: 새로운 역할과 핵심 역량', $aix$AI가 코드를 짜고, 디자인을 그리고, 문서를 쓰는 2026년 — 제품 개발의 병목은 더 이상 '만드는 것'이 아닙니다. 무엇을 만들지 판단하는 사람, 즉 PM에게 무게중심이 옮겨왔습니다. 이 강의는 AI 이전/이후 제품 개발 사이클이 어떻게 달라졌는지, PM의 역할이 백로그 관리자에서 제품 방향 결정자로 어떻게 재정의됐는지 짚고, AI 제품 감각(이벨 읽기), 바이브 코딩 프로토타이핑, 데이터 리터러시 같은 새 역량과 함께 30-60-90일 전환 로드맵까지 제시합니다.$aix$,
  null, 'business', 'beginner', array['AI PM', '프로덕트 매니지먼트', '이벨(Evals)', '바이브 코딩', '커리어 전환']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'bf127cfb-33ed-2f7a-77cf-7e1f75e5a3dc', '2afe3831-2d86-38d4-8241-e72f7b41baf6', 'what-changed', '무엇이 달라졌나', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '19f0ca6f-ea55-6d88-3f4b-79a52c458312', '2afe3831-2d86-38d4-8241-e72f7b41baf6', 'core-skills', 'AI 시대 필수 역량', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'fe7b0f05-195d-4dcf-b8b9-0c3580b14766', '2afe3831-2d86-38d4-8241-e72f7b41baf6', 'practice-career', '실무 적용과 커리어 전환', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'ff056fd1-9bab-c728-fa12-464c7625236a', 'bf127cfb-33ed-2f7a-77cf-7e1f75e5a3dc', 'ai-pm/execution-cost-collapse', 'execution-cost-collapse', '실행 비용의 붕괴: 병목이 옮겨간 자리',
  $aix$"만들 사람이 없어서 못 한다"는 말이 사라지고 있습니다. 2026년 제품 개발의 병목(전체 속도를 가장 느리게 만드는 구간)은 실행이 아니라 **판단**입니다. 이 변화를 이해해야 PM이라는 직무가 왜 지금 주목받는지 보입니다.

## AI 이전의 개발 사이클

- 아이디어 하나를 검증하려면 **기획서 → 설득 → 개발 착수 → 몇 주 대기**가 필요했습니다.
- 만드는 비용이 비쌌기 때문에, PM의 일은 "무엇을 만들지 아주 신중하게 고르고 문서로 정당화하는 것"이었습니다.
- 틀린 선택의 대가가 커서, 회의와 문서가 늘어났습니다.

## AI 이후의 개발 사이클

- AI 코딩 도구와 에이전트 덕분에 프로토타입이 **몇 주가 아니라 몇 시간** 만에 나옵니다.
- 만들 수 있는 것이 폭증하자, 병목은 "만들기"에서 **"무엇을 만들지, 만든 게 좋은지 판단하기"**로 이동했습니다.
- AI 분야의 세계적 석학 앤드류 응(Andrew Ng)은 이를 "프로덕트 매니지먼트가 새로운 병목이 되고 있다"고 표현했습니다.

## PM에게 의미하는 것

- 결정의 **횟수**가 늘어납니다 — 같은 시간에 더 많은 판단을 내려야 합니다.
- 좋은 것과 그럴듯한 것을 가르는 **취향과 판단력**이 희소 자원이 됩니다.

> 💡 **핵심**: 실행이 값싸지면 판단이 비싸집니다. AI 시대 PM의 경쟁력은 "많이 만들게 하는 힘"이 아니라 **"무엇을 만들지 고르는 힘"**입니다.$aix$,
  $aix${"type":"compare","title":"AI 이전 vs 이후의 제품 개발 사이클","columns":[{"title":"AI 이전 (실행이 병목)","icon":"clock","tone":"muted","items":["아이디어 → 문서 → 설득 → 개발 대기","프로토타입 1개에 몇 주","틀린 선택의 비용이 큼","PM = 신중한 선별자"]},{"title":"AI 이후 (판단이 병목)","icon":"zap","tone":"primary","items":["아이디어 → 프로토타입 → 즉시 검증","프로토타입 1개에 몇 시간","선택지가 폭증 — 고르기가 문제","PM = 빠른 판단자"]}],"caption":"실행 비용이 급감하자 병목이 '만들기'에서 '판단하기'로 이동했습니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '3885300e-6af5-072b-ca46-2e83b37a7839', 'bf127cfb-33ed-2f7a-77cf-7e1f75e5a3dc', 'ai-pm/pm-role-redefined', 'pm-role-redefined', 'PM 역할의 재정의: 백로그 관리자에서 방향 결정자로',
  $aix$티켓(개발팀에 전달하는 할 일 카드)을 정리하고 회의록을 요약하는 PM은 AI가 이미 더 잘합니다. 그렇다면 사람 PM의 일은 무엇으로 남을까요? 이 질문의 답이 앞으로 배울 모든 역량의 출발점입니다.

## 대체되는 것: 정보의 포장과 전달

- 고객 피드백 요약, 회의록 정리, 티켓 작성, 진행 상황 보고 — **"정보를 옮기는 일"**은 에이전트가 대신합니다.
- 백로그를 관리하는 것 자체는 더 이상 PM의 존재 이유가 아닙니다.

## 남고 커지는 것: 방향의 결정

- **문제 선택**: 수많은 가능한 것 중에 "지금 풀 가치가 있는 문제"를 고르는 일
- **품질 판정**: AI가 만든 결과물이 출시해도 될 수준인지 가르는 일
- **정렬(Alignment)**: 개발자·디자이너·경영진이 같은 방향을 보게 만드는 설득의 일

## 새로운 하루의 모습

2026년의 PM은 문서를 쓰는 시간이 줄고, **AI가 만든 초안·프로토타입·분석을 검토하고 판단하는 시간**이 늘었습니다. 실행을 지시하는 사람이 아니라, 실행 결과를 심사하는 **에디터**에 가깝습니다.

> 💡 **핵심**: PM의 정의가 바뀌었습니다 — "백로그를 관리하는 사람"에서 **"제품의 방향을 결정하고 품질을 판정하는 사람"**으로.$aix$,
  $aix${"type":"flow","title":"방향 결정자의 업무 루프","nodes":[{"label":"문제 선택","sublabel":"지금 풀 가치가 있는가","icon":"target","tone":"primary"},{"label":"AI에게 실행 위임","sublabel":"초안·프로토타입·분석 생성","icon":"bot","tone":"accent"},{"label":"결과 심사","sublabel":"좋은가, 그럴듯하기만 한가","icon":"eye","tone":"warning"},{"label":"방향 결정·팀 정렬","sublabel":"출시 / 수정 / 폐기","icon":"check","tone":"success"}],"loopBack":{"from":2,"to":1,"label":"기준 미달이면 다시 위임"},"caption":"PM은 실행자가 아니라 에디터 — 위임하고, 심사하고, 결정합니다."}$aix$::jsonb, null, 5, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '48c34ea2-7dbf-214d-494c-d2fb955e3db3', 'bf127cfb-33ed-2f7a-77cf-7e1f75e5a3dc', 'ai-pm/team-structure-shift', 'team-structure-shift', '팀 구조의 변화: 소수 정예 + 에이전트',
  $aix$"팀이 커야 큰 제품을 만든다"는 공식이 깨지고 있습니다. 2026년의 제품 팀은 작아졌고, 그 자리를 AI 에이전트가 채웁니다.

## 팀은 작아지고, 산출량은 늘었다

- 8~12명이던 제품 팀이 **3~5명 규모**로 재편되는 흐름이 보고됩니다. 한 사람이 AI 도구로 더 많이 만들기 때문입니다.
- 초기 스타트업에서는 5명이 에이전트(고객지원·리서치·운영)를 붙여 **예전 20명 몫**을 처리하는 사례가 나옵니다.

## PM 대 엔지니어 비율의 변화

- 전통적 비율은 PM 1명당 엔지니어 6~8명이었습니다.
- 엔지니어 한 명이 만들어내는 양이 커지자, **판단할 것도 폭증**했습니다 — 스펙(무엇을 어떻게 만들지 적은 사양서)·우선순위·품질 기준을 정해줄 사람이 더 많이 필요해진 것입니다.
- 동시에 "정보 전달만 하는 PM" 수요는 줄어듭니다 — PM 역할이 **양극화**됩니다.

## PM에게 의미하는 것

- 작은 팀에서는 역할 경계가 흐려집니다. PM도 프로토타입을 만들고, 엔지니어도 고객을 만납니다.
- "누가 무엇을 하느냐"보다 **"누가 판단에 책임지느냐"**가 팀 설계의 중심이 됩니다.

> 💡 **핵심**: 팀은 작아지고 에이전트가 늘어납니다. 이 구조에서 PM의 가치는 머릿수 관리가 아니라 **판단의 밀도**에서 나옵니다.$aix$,
  $aix${"type":"grid","title":"2026년 소수 정예 제품 팀의 구성","items":[{"label":"PM 1","sublabel":"방향 결정·품질 판정","icon":"target","tone":"primary"},{"label":"엔지니어 2~3","sublabel":"AI 도구로 산출량 수 배","icon":"code","tone":"accent"},{"label":"디자이너 1","sublabel":"취향과 경험의 기준","icon":"palette","tone":"accent"},{"label":"리서치 에이전트","sublabel":"인터뷰 분석·경쟁 조사","icon":"search","tone":"muted"},{"label":"코딩 에이전트","sublabel":"프로토타입·반복 코딩 작업","icon":"bot","tone":"muted"},{"label":"운영 에이전트","sublabel":"티켓 분류·리포트 생성","icon":"workflow","tone":"muted"}],"caption":"사람은 판단에, 에이전트는 실행에 — 작은 팀이 큰 팀의 산출량을 냅니다."}$aix$::jsonb, null, 4, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '02b9b89c-f645-2191-7bc8-9c9237836033', 'bf127cfb-33ed-2f7a-77cf-7e1f75e5a3dc', 'ai-pm/fading-vs-rising', 'fading-vs-rising', '사라지는 업무 vs 더 중요해지는 업무',
  $aix$"PM이 사라진다"는 공포와 "PM 전성시대"라는 낙관이 동시에 들립니다. 둘 다 절반만 맞습니다 — **업무 단위로 갈라지기** 때문입니다.

## 사라지거나 자동화되는 업무

- 회의록 요약, 상태 보고서 작성, 티켓(할 일 카드) 정리
- 유저 피드백의 1차 분류와 요약
- 경쟁사 기능 변경 추적, 시장 자료 1차 조사
- 표준적인 PRD와 유저 스토리(사용자 관점으로 쓴 짧은 요구사항)의 **초안 작성**

공통점: 입력과 출력이 명확한 **정보 가공** 작업입니다.

## 더 중요해지는 업무

- **문제 정의**: 애매한 신호에서 "진짜 문제"를 골라내는 일
- **품질 기준 수립**: AI 산출물의 합격선을 정의하는 일 (이벨의 출발점)
- **트레이드오프 결정**: 하나를 얻으면 하나를 내줘야 할 때, 데이터가 답을 주지 않는 지점에서 선택하는 일
- **이해관계자 정렬**: 경영진·개발팀 등 제품에 관여하는 모두가 한 방향으로 움직이게 만드는 설득

공통점: 정답이 없고, **책임**이 따르는 판단 작업입니다.

## 갈림길

정보 가공이 업무의 대부분이었던 PM은 위기를, 판단과 정렬이 중심이었던 PM은 기회를 맞습니다. 준비는 이 격차를 좁히는 일입니다.

> 💡 **핵심**: AI는 PM을 대체하지 않습니다. **정보 가공형 업무를 대체하고, 판단형 업무의 가치를 끌어올립니다.** 여러분의 시간표를 후자로 옮기세요.$aix$,
  $aix${"type":"compare","title":"PM 업무의 양극화","columns":[{"title":"자동화되는 업무","icon":"bot","tone":"muted","items":["회의록·보고서 작성","피드백 1차 분류·요약","경쟁사 변경 추적","PRD·스토리 초안"]},{"title":"가치가 커지는 업무","icon":"trending-up","tone":"primary","items":["문제 정의와 선택","품질 기준(이벨) 수립","트레이드오프 결정","이해관계자 정렬·설득"]}],"caption":"왼쪽에 시간을 쓰던 PM일수록, 오른쪽으로의 이동이 시급합니다."}$aix$::jsonb, null, 5, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '411fc435-fa6b-b851-2bad-ea47494c0570', '19f0ca6f-ea55-6d88-3f4b-79a52c458312', 'ai-pm/ai-product-sense', 'ai-product-sense', 'AI 제품 감각 ①: 프롬프트·이벨·모델의 한계',
  $aix$AI 기능을 기획하려면 모델을 만들 줄은 몰라도 됩니다. 하지만 **모델이 어디서 틀리는지, 품질을 어떻게 측정하는지**는 알아야 합니다.

## PM이 알아야 할 모델의 성질

- **확률적**: 같은 입력에도 답이 달라질 수 있습니다. "항상 정확히"라는 스펙은 성립하지 않습니다.
- **그럴듯한 오류**: 모델은 자신 있게 틀립니다 — 지어낸 통계, 근거 없는 확신이 대표적 실패 유형입니다.
- **프롬프트 = 사양서**: 프롬프트에 없는 규칙(예: 존댓말, 사과 우선)은 지켜지지 않습니다.

## 이벨(Evals): AI 제품의 품질 계기판

이벨은 대표 케이스 수백 건에 AI가 내놓은 답을 채점한 성적표입니다. 자동차 계기판처럼, 제품이 지금 어떤 상태인지 숫자로 보여줍니다. 2026년 실무에서 **이벨은 PM의 요구사항과 개발을 잇는 다리**이며, 성공 기준을 정하는 사람은 PM입니다.

- "좋다"를 **여러 갈래(차원)로 쪼갭니다**: 정확성·간결성·톤·정책 준수를 각각 점수화
- 점수만 보지 말고 **실패 사례 원문**을 읽습니다 — 패턴은 항상 원문에 있습니다
- 발견한 패턴을 **스펙(사양서)의 품질 기준**으로 되돌려 씁니다

## PM의 실무 루틴

이벨 리포트를 읽고 → 하락한 차원의 실패 사례를 읽고 → 품질 기준을 한 줄 추가하는 것. 아래 데모에서 이 흐름을 그대로 따라 해봅니다.

> 💡 **핵심**: AI 제품 감각 = **이벨을 읽고, 실패 사례에서 패턴을 찾고, 그것을 스펙의 품질 기준으로 쓰는 능력**입니다.$aix$,
  $aix${"type":"chat","title":"모델은 자신 있게 틀립니다","messages":[{"role":"user","text":"우리 앱 이탈률이 업계 평균 대비 어떤지 알려줘"},{"role":"ai","text":"업계 평균 이탈률은 23.7%로, 귀사는 이보다 5.2%p 낮습니다."},{"role":"system","text":"⚠️ 출처 없는 수치 — 모델이 지어낸 통계일 수 있습니다. PM은 이런 실패 유형을 알고 검증 절차를 설계해야 합니다."}],"caption":"그럴듯한 오류를 잡아내는 눈 — 이것이 AI 제품 감각의 출발점입니다."}$aix$::jsonb, $aix${"title":"이벨 대시보드 읽기 따라하기","app":{"kind":"browser","url":"evals.our-product.ai/reports/summary-v2","blocks":[{"id":"h1","type":"heading","label":"요약 어시스턴트 v2 — 이벨 리포트"},{"id":"b-run","type":"badge","label":"테스트 케이스 200건 · 오늘 실행"},{"id":"c-acc","type":"card","label":"정확성 94% (▲3)"},{"id":"c-brev","type":"card","label":"간결성 89% (—)"},{"id":"c-tone","type":"card","label":"톤 준수 72% (▼9)"},{"id":"btn-fail","type":"button","label":"실패 사례 보기"},{"id":"f1","type":"card","label":"사례 #117: 고객 응답에 반말 사용","hidden":true},{"id":"f2","type":"card","label":"사례 #142: 사과 없이 환불 거절 통보","hidden":true},{"id":"b-cause","type":"badge","label":"공통 패턴: 톤 가이드가 프롬프트에 없음","hidden":true},{"id":"in-note","type":"input","label":"스펙에 추가할 품질 기준 입력…"},{"id":"btn-add","type":"button","label":"품질 기준으로 저장"},{"id":"done","type":"badge","label":"✅ 스펙 v2.1에 반영됨","hidden":true}]},"actions":[{"t":"caption","text":"① 점수를 훑고 하락한 차원을 찾습니다"},{"t":"move","target":"c-acc"},{"t":"move","target":"c-tone"},{"t":"click","target":"c-tone"},{"t":"wait","ms":500},{"t":"caption","text":"② 점수가 아니라 실패 사례 원문을 읽습니다"},{"t":"click","target":"btn-fail"},{"t":"reveal","target":"f1"},{"t":"reveal","target":"f2"},{"t":"move","target":"f2"},{"t":"wait","ms":600},{"t":"caption","text":"③ 실패의 공통 패턴을 확인합니다"},{"t":"reveal","target":"b-cause"},{"t":"move","target":"b-cause"},{"t":"wait","ms":500},{"t":"caption","text":"④ 발견을 스펙의 품질 기준으로 되돌려 씁니다"},{"t":"click","target":"in-note"},{"t":"type","target":"in-note","text":"고객 응답은 존댓말 + 사과를 먼저 한다"},{"t":"click","target":"btn-add"},{"t":"reveal","target":"done"},{"t":"caption","text":"⑤ 다음 이벨 실행에서 톤 점수를 재측정합니다"},{"t":"move","target":"done"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '56e99d82-0da6-a8cc-b4e9-80c477707e32', '19f0ca6f-ea55-6d88-3f4b-79a52c458312', 'ai-pm/build-it-yourself', 'build-it-yourself', '직접 만드는 힘 ②: 바이브 코딩으로 프로토타입',
  $aix$"문서 10장보다 동작하는 프로토타입 1개"가 2026년 PM의 설득 방식입니다. 코드를 몰라도 됩니다 — 의도를 말하면 앱이 나옵니다.

## 바이브 코딩이란

자연어로 의도를 설명하면 AI가 동작하는 앱을 만들어주는 방식입니다. Lovable, Bolt, v0, Replit 같은 도구가 대표적이며, 최근 조사에서는 **PM의 절반 이상이 AI·노코드 프로토타이핑 도구를 업무에 사용**하는 것으로 나타났습니다. 비개발자도 몇 시간이면 클릭 가능한 프로토타입을 만듭니다.

## PM에게 왜 무기인가

- **검증이 빨라집니다**: 아이디어를 회의가 아니라 유저 테스트로 판정합니다.
- **커뮤니케이션 비용이 급감합니다**: "이런 느낌"을 말로 설명하는 대신 만져보게 합니다.
- **요구사항이 정교해집니다**: 직접 만들어보면 엣지 케이스(드물지만 문제를 일으키는 예외 상황)가 미리 보입니다.

## 프로토타입의 규율

- 프로토타입은 **검증용**입니다 — 그대로 출시하는 것이 아니라, 배운 것을 스펙에 반영합니다.
- 검증 질문을 먼저 정하세요: "유저가 이 버튼을 찾는가?"처럼 **한 가지 가설**에 집중합니다.
- 실패한 프로토타입은 성공입니다 — 개발 착수 전에 배웠으니까요.

> 💡 **핵심**: 아이디어 검증의 단위가 **문서에서 동작물로** 바뀌었습니다. PM이 직접 만들 수 있으면 검증 속도가 곧 경쟁력이 됩니다.$aix$,
  $aix${"type":"steps","title":"바이브 코딩 검증 사이클 (반나절 코스)","steps":[{"label":"검증 질문 정하기","sublabel":"가설 1개로 좁히기","icon":"lightbulb"},{"label":"의도를 프롬프트로","sublabel":"화면·데이터·흐름을 말로 설명","icon":"message"},{"label":"프로토타입 생성","sublabel":"Lovable·Bolt·v0 등","icon":"wand"},{"label":"유저 5명에게 테스트","sublabel":"관찰하고 기록","icon":"users"},{"label":"배운 것을 스펙에","sublabel":"프로토타입은 버려도 됨","icon":"clipboard"}],"caption":"예전엔 몇 주짜리 사이클 — 지금은 반나절이면 한 바퀴 돕니다."}$aix$::jsonb, null, 6, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5a172f87-aaf1-a199-be5a-3a9e68642f9d', '19f0ca6f-ea55-6d88-3f4b-79a52c458312', 'ai-pm/data-literacy', 'data-literacy', '데이터 리터러시와 판단력 ③: AI 출력을 의심하는 법',
  $aix$AI가 분석까지 해주는 시대에 데이터 리터러시가 왜 더 중요해질까요? **AI의 분석 결과를 판정할 사람**이 필요하기 때문입니다.

## AI 분석 시대의 함정

- AI 요약은 매끄럽지만, **표본 편향**(예: 불만 있는 유저만 설문에 응답한 상황)은 알려주지 않습니다.
- 우연히 함께 움직인 두 수치(상관관계)를 원인과 결과(인과)처럼 서술하는 것은 AI 분석의 고질적 습관입니다.
- **오분류율**(잘못 분류된 비율)을 확인하지 않으면, 틀린 근거로 로드맵을 정하게 됩니다.

## PM의 검증 루틴 3가지

- **원본 표집**: AI가 분류한 결과에서 무작위 10건의 원문을 직접 읽어봅니다.
- **반대 질문**: "이 결론이 틀렸다면 어떤 데이터가 보여야 하지?"를 AI에게 묻습니다.
- **분모 확인**: 비율이 나오면 항상 분모(전체 몇 건 중인지)를 확인합니다.

## 판단력은 검증의 누적

데이터 리터러시는 통계 지식이 아니라 습관입니다. AI의 결과를 받으면 **믿기 전에 표본 하나를 원문으로 확인**하는 것 — 아래 데모의 흐름처럼요. 이 습관이 쌓이면 AI가 어디서 틀리는지에 대한 감각, 즉 판단력이 됩니다.

> 💡 **핵심**: AI가 분석을 대신할수록 필요한 것은 분석 기술이 아니라 **분석 결과를 의심하고 검증하는 판단력**입니다.$aix$,
  $aix${"type":"cycle","title":"AI 분석 검증 루프","center":"믿기 전에 확인","nodes":[{"label":"AI 분석 수신","sublabel":"분류·요약·리포트","icon":"bot"},{"label":"원본 표집","sublabel":"무작위 원문 10건 읽기","icon":"search"},{"label":"반례 탐색","sublabel":"틀렸다면 뭐가 보일까","icon":"alert"},{"label":"판단·수정","sublabel":"수용 / 재분류 / 재분석","icon":"check"}],"caption":"검증을 반복할수록 'AI가 어디서 틀리는지'에 대한 감각이 쌓입니다."}$aix$::jsonb, $aix${"title":"유저 피드백 자동 분류 확인 따라하기","app":{"kind":"chat-app","workspace":"제품팀 워크스페이스","composerId":"composer","channels":[{"id":"ch-feedback","name":"피드백-분류","active":true},{"id":"ch-product","name":"제품-일반"}],"messages":[{"id":"m1","author":"분류봇","bot":true,"time":"오전 9:00","text":"오늘 신규 피드백 47건 분류를 완료했습니다.","hidden":true},{"id":"m2","author":"분류봇","bot":true,"time":"오전 9:00","text":"🔴 버그 12건 · 🟡 기능 요청 23건 · 🟢 칭찬 12건","hidden":true},{"id":"m3","author":"분류봇","bot":true,"time":"오전 9:01","text":"최다 언급 요청: 'CSV 내보내기' 9건","hidden":true},{"id":"m4","author":"나 (PM)","time":"오전 9:12","text":"내보내기 요청 9건 원문 보여줘","hidden":true},{"id":"m5","author":"분류봇","bot":true,"time":"오전 9:12","text":"1) \"엑셀로 뽑고 싶어요\" 2) \"내보내기 눌러도 권한 오류가 떠요\" 3) \"권한이 없다고 나와요\" …","hidden":true},{"id":"m6","author":"나 (PM)","time":"오전 9:15","text":"2·3번은 기능 요청이 아니라 권한 버그야. 버그로 재분류해줘.","hidden":true},{"id":"m7","author":"분류봇","bot":true,"time":"오전 9:15","text":"재분류 완료 — 🔴 버그 14건 · 🟡 요청 21건. 분류 규칙에 '권한 오류' 패턴을 추가했습니다.","hidden":true}]},"actions":[{"t":"caption","text":"① 에이전트가 밤사이 피드백을 자동 분류했습니다"},{"t":"reveal","target":"m1"},{"t":"reveal","target":"m2"},{"t":"reveal","target":"m3"},{"t":"move","target":"m3"},{"t":"wait","ms":600},{"t":"caption","text":"② 요약을 믿기 전에 원문을 표집합니다"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"내보내기 요청 9건 원문 보여줘"},{"t":"reveal","target":"m4"},{"t":"reveal","target":"m5"},{"t":"move","target":"m5"},{"t":"wait","ms":700},{"t":"caption","text":"③ 원문을 읽으니 오분류가 보입니다 — 요청이 아니라 버그"},{"t":"click","target":"composer"},{"t":"type","target":"composer","text":"2·3번은 권한 버그야. 재분류해줘"},{"t":"reveal","target":"m6"},{"t":"reveal","target":"m7"},{"t":"move","target":"m7"},{"t":"caption","text":"④ 사람의 판정이 분류 규칙을 개선시킵니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5729d35f-b861-b573-7e48-4265d6c4d68b', '19f0ca6f-ea55-6d88-3f4b-79a52c458312', 'ai-pm/timeless-skills', 'timeless-skills', '변하지 않는 것 ④: 문제 정의, 고객 공감, 커뮤니케이션',
  $aix$역설적이게도, AI 시대에 가장 값이 오른 PM 역량은 새로운 기술이 아니라 **가장 오래된 기본기**입니다.

## 왜 기본기의 가치가 올랐나

- **문제 정의**: 실행이 빨라질수록, 잘못 정의된 문제는 "정교하게 틀린 결과물"을 더 빨리 만듭니다. AI는 시키는 것을 잘할 뿐, 무엇을 시킬지 정해주지 않습니다.
- **고객 공감**: AI는 데이터를 요약하지만, 고객의 말과 속마음의 간극(말로는 좋다며 안 쓰는 이유)은 현장에서 사람이 읽어야 합니다.
- **커뮤니케이션**: 이야기로 조직을 움직이는 힘(스토리텔링)과 신뢰 쌓기는 자동화되지 않습니다. 하드콜(어려운 결정)을 내리고 책임지는 것도요.

## 기본기 × AI = 증폭

기본기와 AI 역량은 경쟁 관계가 아니라 곱셈 관계입니다.

- 문제 정의가 좋은 PM이 바이브 코딩을 쓰면 → 옳은 가설을 하루 만에 검증
- 고객 공감이 깊은 PM이 이벨을 쓰면 → 고객이 실제로 느끼는 품질 차원을 측정
- 커뮤니케이션이 강한 PM이 AI 초안을 쓰면 → 설득의 밀도가 올라감

기본기가 0이면 AI를 곱해도 0입니다.

> 💡 **핵심**: AI 도구는 상향 평준화됩니다. 결국 차이를 만드는 것은 **문제를 고르는 눈, 고객을 읽는 마음, 조직을 움직이는 말**입니다.$aix$,
  $aix${"type":"stack","title":"AI 시대 PM 역량 스택","layers":[{"label":"AI 도구 활용","sublabel":"바이브 코딩 · 이벨 · 자동 분석 — 빠르게 배울 수 있음","icon":"sparkles","tone":"accent"},{"label":"데이터 리터러시·판단력","sublabel":"AI 출력을 검증하고 판정하는 습관","icon":"chart","tone":"primary"},{"label":"문제 정의 · 고객 공감 · 커뮤니케이션","sublabel":"모든 층을 떠받치는 기반 — 대체 불가","icon":"users","tone":"success"}],"caption":"위층은 도구와 함께 바뀌지만, 맨 아래층은 시대가 바뀌어도 그대로입니다."}$aix$::jsonb, null, 5, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'bc3a5eb3-6293-fc23-e7f4-acd9590e7fad', 'fe7b0f05-195d-4dcf-b8b9-0c3580b14766', 'ai-pm/accelerate-pm-work', 'accelerate-pm-work', 'AI로 PM 업무 가속: 인터뷰 분석·경쟁 분석·PRD 초안',
  $aix$이론은 충분합니다. 오늘 출근해서 바로 쓸 수 있는 세 가지 가속 지점을 봅니다. 원칙은 하나 — **초안은 AI, 판단은 사람**.

## ① 유저 인터뷰 분석

- 녹취록을 넣고 "반복되는 불만을 주제별로 묶고, 각 주제의 대표 인용문을 달아줘"라고 요청합니다.
- 규칙: AI가 뽑은 주제마다 **대표 인용문 원문을 직접 확인**합니다. 요약만 믿으면 뉘앙스가 사라집니다.

## ② 경쟁 분석

- 경쟁사의 릴리스 노트(업데이트 내역 공지)와 가격 페이지를 모아, 변경점 추적과 비교표 초안을 맡깁니다.
- 규칙: 수치·날짜는 **출처 링크로 재확인** — 모델은 그럴듯한 세부사항을 지어냅니다.

## ③ PRD 초안

- 문제·대상·제약을 입력하면 구조 잡힌 초안이 나옵니다. 백지에서 시작하지 않는 것만으로 시간이 크게 줍니다.
- 규칙: AI 초안의 **성공 지표는 거의 항상 재작성**이 필요합니다. 근거 없는 지표가 가장 흔한 허점입니다. 아래 데모에서 직접 고쳐봅니다.

## 공통 원칙

AI 산출물에는 "AI 초안 — 검토 전" 딱지를 붙이고, 사람 검토를 통과해야 떼어지게 하세요. 팀의 신뢰를 지키는 최소 장치입니다.

> 💡 **핵심**: 가속의 공식은 **AI가 80%의 초안, 사람이 20%의 판단** — 그리고 그 20%가 문서의 가치를 결정합니다.$aix$,
  $aix${"type":"grid","title":"PM 업무 가속 3지점과 사람의 몫","items":[{"label":"인터뷰 분석","sublabel":"AI: 주제 묶기 / 사람: 원문 확인","icon":"mic","tone":"primary"},{"label":"경쟁 분석","sublabel":"AI: 변경 추적 / 사람: 출처 검증","icon":"search","tone":"accent"},{"label":"PRD 초안","sublabel":"AI: 구조·초안 / 사람: 지표 재작성","icon":"file-text","tone":"success"},{"label":"공통 규칙","sublabel":"'검토 전' 딱지 → 사람 승인 후 해제","icon":"shield","tone":"warning"}],"caption":"모든 칸의 오른쪽 절반(사람의 몫)이 비면, 가속이 아니라 사고입니다."}$aix$::jsonb, $aix${"title":"AI와 PRD 초안 작성 따라하기","app":{"kind":"browser","url":"prd.our-product.ai/new","blocks":[{"id":"h1","type":"heading","label":"PRD 초안 생성기"},{"id":"in-idea","type":"input","label":"만들 기능을 한 줄로 설명하세요…"},{"id":"btn-gen","type":"button","label":"초안 생성"},{"id":"b-draft","type":"badge","label":"AI 초안 v1 — 검토 전","hidden":true},{"id":"c-problem","type":"card","label":"📄 문제: 팀 외부와 데이터를 공유하기 어렵다","hidden":true},{"id":"c-metric","type":"card","label":"🎯 성공 지표: 페이지뷰 +30% (근거 없음)","hidden":true},{"id":"c-eval","type":"card","label":"🧪 품질 기준: (비어 있음)","hidden":true},{"id":"in-edit","type":"input","label":"수정 지시 입력…"},{"id":"btn-apply","type":"button","label":"반영"},{"id":"c-metric2","type":"card","label":"🎯 성공 지표: 주간 내보내기 사용 활성 팀 25%","hidden":true},{"id":"c-eval2","type":"card","label":"🧪 품질 기준: 내보내기 성공률 99% · 3초 이내","hidden":true},{"id":"b-done","type":"badge","label":"✅ 사람 검토 완료 — v1.1","hidden":true}]},"actions":[{"t":"caption","text":"① 문제·대상·제약을 한 줄로 입력합니다"},{"t":"click","target":"in-idea"},{"t":"type","target":"in-idea","text":"외부 공유용 CSV 내보내기 기능"},{"t":"click","target":"btn-gen"},{"t":"reveal","target":"b-draft"},{"t":"reveal","target":"c-problem"},{"t":"reveal","target":"c-metric"},{"t":"reveal","target":"c-eval"},{"t":"wait","ms":600},{"t":"caption","text":"② 초안의 허점을 찾습니다 — 근거 없는 지표"},{"t":"dblclick","target":"c-metric"},{"t":"caption","text":"③ 사람이 지표와 품질 기준을 다시 씁니다"},{"t":"click","target":"in-edit"},{"t":"type","target":"in-edit","text":"지표를 활성 팀 25%로 교체, 품질 기준 추가"},{"t":"click","target":"btn-apply"},{"t":"hide","target":"c-metric"},{"t":"reveal","target":"c-metric2"},{"t":"hide","target":"c-eval"},{"t":"reveal","target":"c-eval2"},{"t":"wait","ms":500},{"t":"caption","text":"④ 검토를 마쳐야 '검토 전' 딱지가 떨어집니다"},{"t":"hide","target":"b-draft"},{"t":"reveal","target":"b-done"},{"t":"move","target":"b-done"},{"t":"wait","ms":800}]}$aix$::jsonb, 7, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '30902c76-8188-38be-272f-f1d35a3f6c3f', 'fe7b0f05-195d-4dcf-b8b9-0c3580b14766', 'ai-pm/spec-for-ai-features', 'spec-for-ai-features', 'AI 기능을 기획하는 법: 확률적 제품의 스펙',
  $aix$"버튼을 누르면 항상 X가 된다"는 스펙(무엇을 어떻게 만들지 적은 사양서) 문법은 AI 기능에서 무너집니다. AI는 같은 입력에도 다른 답을 낼 수 있기 때문입니다. 확률적으로 동작하는 제품에는 **다른 스펙 문법**이 필요합니다.

## 결정적 스펙 → 확률적 스펙

- 이전(항상 같은 결과): "요약은 100자 이내여야 한다"
- 이후(확률로 약속): "골든 데이터셋 기준, **95%의 케이스에서** 요약이 80~120자여야 한다"

수용 기준(acceptance criteria, "이걸 만족하면 완성"이라는 합격 조건)이 **평가 기준(evaluation criteria)**으로 바뀝니다. 기준선을 측정할 이벨 계획이 스펙의 일부가 됩니다.

## AI PRD에 반드시 들어갈 세 가지

- **이벨 기준**: 품질을 어떤 차원으로 나눠 무엇으로 측정하는가, 출시 합격선은 몇 점인가
- **실패 모드 카탈로그**: 모델이 틀리는 방식(지어냄, 톤 이탈, 무응답)을 예상 목록으로 만들고, 각각의 **감지 방법과 대응**을 정의합니다. 실무에서 AI 기능 실패의 다수는 모델 실패가 아니라 이 설계를 안 한 **설계 실패**입니다.
- **신뢰 설계**: 확신 낮은 출력의 처리 방식 — 표현 완화(소프트 폴백), 사람에게 넘기기(휴먼 핸드오프), 출처 표시. 신뢰는 한 번 무너지면 복구가 어렵습니다.

## PM의 새 문장들

"이 기능이 틀리면 유저는 무엇을 보게 되는가?"— 이 질문에 스펙이 답하지 못하면 아직 기획이 끝나지 않은 것입니다.

> 💡 **핵심**: AI 기능의 스펙은 **잘 될 때의 그림 + 틀릴 때의 각본**입니다. 이벨 기준·실패 모드·신뢰 설계가 빠진 AI PRD는 절반짜리입니다.$aix$,
  $aix${"type":"flow","title":"확률적 제품의 스펙 작성 흐름","nodes":[{"label":"품질 차원 정의","sublabel":"정확성·톤·정책 준수로 분해","icon":"layers","tone":"primary"},{"label":"이벨 기준·합격선","sublabel":"95% 케이스에서 기준 충족","icon":"gauge","tone":"accent"},{"label":"실패 모드 카탈로그","sublabel":"틀리는 방식 → 감지 → 대응","icon":"alert","tone":"warning"},{"label":"신뢰 설계","sublabel":"폴백 · 휴먼 핸드오프 · 출처","icon":"shield","tone":"success"}],"loopBack":{"from":3,"to":1,"label":"이벨 미달 시 기준 재조정"},"caption":"'틀릴 때의 각본'까지 써야 AI 기능의 스펙이 완성됩니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '23bb9714-f131-8d25-8df3-0cb676ae7006', 'fe7b0f05-195d-4dcf-b8b9-0c3580b14766', 'ai-pm/transition-roadmap', 'transition-roadmap', '전환 로드맵: 30-60-90일 학습 계획',
  $aix$"뭐부터 해야 하죠?"에 대한 답입니다. 거창한 자격증이 아니라, **90일간의 실전 반복**으로 전환합니다.

## 첫 30일: 도구를 몸에 붙이기

- AI 도구 2~3개를 골라 **실제 업무**에 씁니다 (PRD 초안, 피드백 분석 등)
- 같은 작업을 수동/AI로 각각 해보고 품질·시간을 비교합니다
- 매주 프롬프트 하나를 다듬어 재사용 템플릿으로 저장합니다

## 60일까지: 만들고 측정하기

- 바이브 코딩 도구로 **동작하는 프로토타입 1개**를 만들어 유저 5명에게 보여줍니다
- 자사(또는 가상) AI 기능의 **미니 이벨**을 만듭니다 — 케이스 20건, 품질 차원 3개면 충분합니다
- AI 산출물에서 오류를 잡아낸 사례를 기록하기 시작합니다

## 90일까지: 팀으로 확장하기

- 검증한 워크플로우(일하는 절차)를 팀의 공식 프로세스로 제안합니다 ("검토 전 딱지" 규칙 등)
- AI 기능 스펙(이벨 기준·실패 모드 포함)을 1건 작성해 리뷰받습니다

## 주니어 vs 시니어의 강조점

- **주니어**: 도구 숙련 + 기본기(문제 정의·고객 인터뷰)를 병행하세요. 도구만 배우면 시키는 일만 처리하는 오퍼레이터(단순 실행자)가 됩니다.
- **시니어**: 직접 만들기의 비중을 늘리세요. 위임에 익숙해진 손으로 프로토타입과 이벨을 한 번은 직접 만들어야 팀을 이끌 수 있습니다.

> 💡 **핵심**: 전환의 단위는 강의 수강이 아니라 **업무 1건을 AI로 다시 해보는 것**입니다. 90일 뒤, 여러분의 포트폴리오에는 프로토타입 1개와 이벨 1개가 있어야 합니다.$aix$,
  $aix${"type":"steps","title":"30-60-90일 전환 로드맵","steps":[{"label":"30일: 도구 체화","sublabel":"실무 2~3개 업무에 AI 적용 · 비교","icon":"wrench"},{"label":"60일: 만들고 측정","sublabel":"프로토타입 1개 + 미니 이벨 1개","icon":"rocket"},{"label":"90일: 팀으로 확장","sublabel":"워크플로우 제안 + AI 스펙 1건 리뷰","icon":"users"},{"label":"이후: 반복과 심화","sublabel":"판단 사례를 기록해 감각으로","icon":"repeat"}],"caption":"90일의 산출물은 수료증이 아니라 프로토타입 1개와 이벨 1개입니다."}$aix$::jsonb, null, 6, 10
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

-- 강의: AX 팀 만들기: AI 전환 조직 설계와 운영
insert into public.courses (id, slug, title, description, thumbnail_url, category, level, tags) values (
  '4e9e6c09-eecf-a289-4b68-01bf0151e534', 'ax-team', 'AX 팀 만들기: AI 전환 조직 설계와 운영', $aix$AI 도구를 사고 라이선스를 뿌리는 것만으로는 조직이 바뀌지 않습니다. 2025년 MIT 조사에서 기업 생성형 AI 파일럿의 약 95%가 손익에 측정 가능한 영향을 남기지 못했고, 원인의 대부분은 모델이 아니라 조직이었습니다. 이 강의는 AX(AI 전환) 전담 팀을 실제로 세우고 운영하는 사람을 위한 설계서입니다. 성숙도 진단, 5개 핵심 역할과 채용 순서, 허브앤스포크 운영 모델, 과제 인테이크와 스코어링, 90일 파일럿 설계, 채택률·개입률 중심의 성과 보고, 섀도우 AI를 막는 최소 거버넌스와 챔피언 네트워크까지 — 조직에 AI를 심는 순서를 다룹니다.$aix$,
  null, 'business', 'intermediate', array['AX', 'AI 전환', '조직 설계', 'CoE', '체인지 매니지먼트']::text[]
) on conflict (id) do update set
  title = excluded.title, description = excluded.description,
  category = excluded.category, level = excluded.level, tags = excluded.tags;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '7e166bda-67c2-32c1-2687-e0aeba6e2056', '4e9e6c09-eecf-a289-4b68-01bf0151e534', 'ax-foundation', 'AX의 정의와 진단', 0
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  'c7a2aaa0-8ae1-db0e-48d5-29bd96846348', '4e9e6c09-eecf-a289-4b68-01bf0151e534', 'team-design', '팀 설계: 자리와 운영 모델', 1
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.modules (id, course_id, slug, title, order_index) values (
  '7a82f1b8-1076-a8bf-4104-b271b38ee280', '4e9e6c09-eecf-a289-4b68-01bf0151e534', 'execution-scale', '실행: 발굴에서 확산까지', 2
) on conflict (id) do update set title = excluded.title, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '1bb822a6-150d-f33d-a6df-702e91fbf19e', '7e166bda-67c2-32c1-2687-e0aeba6e2056', 'ax-team/ax-vs-dx', 'ax-vs-dx', 'AX란 무엇인가: DX와 결정적으로 다른 점',
  $aix$많은 조직이 AX를 "DX 시즌 2"로 이해합니다. 그 오해가 첫 번째 실패의 원인입니다.

## DX는 프로세스를 옮겼고, AX는 판단을 옮깁니다

- DX는 종이와 전화로 하던 일을 시스템으로 옮기는 일이었습니다. 정답이 정해진 절차를 자동화하니, 결과가 **예측 가능**했습니다.
- AX는 사람이 **판단하던 일**의 일부를 AI에게 넘깁니다. 같은 입력에도 다른 출력이 나올 수 있는, 확률적인 전환입니다.
- 비유하면 이렇습니다. DX는 계단을 에스컬레이터로 바꾸는 일이고, AX는 길을 스스로 찾는 안내원을 채용하는 일입니다. 에스컬레이터는 점검만 하면 되지만, 안내원은 **교육하고 평가해야** 합니다.

## 그래서 팀의 일이 달라집니다

- DX 프로젝트는 "구축 후 이관"으로 끝났습니다. AX는 **출시 후가 시작**입니다 — 품질을 계속 재고 프롬프트와 데이터를 고쳐야 합니다.
- 필요한 자리도 다릅니다. 만드는 인력보다 **평가하고 운영하는 인력**의 비중이 커집니다.
- 성공 기준도 다릅니다. DX는 "가동되는가", AX는 **"사람들이 실제로 쓰는가, 결과가 쓸 만한가"**입니다.

## AX 팀이 실제로 파는 것

도구가 아니라 **일하는 방식의 변경**입니다. 도구 도입은 한 달이면 되지만, 방식 변경은 보통 1년이 걸립니다. 이 시간 차이를 경영진과 미리 합의하지 않으면 6개월 뒤에 "성과가 없다"는 평가를 받습니다.

> 💡 **핵심**: DX가 시스템을 바꾸는 일이라면, AX는 **판단의 주체를 바꾸는 일**입니다. 그래서 AX 팀 업무의 절반은 기술이 아니라 조직 설계입니다.$aix$,
  $aix${"type":"compare","title":"DX vs AX","columns":[{"title":"DX (디지털 전환)","icon":"monitor","tone":"muted","items":["정해진 절차를 시스템으로","결과가 예측 가능 (결정적)","구축 후 이관하면 끝","성공 기준: 정상 가동 여부","필요 인력: 구축·개발"]},{"title":"AX (AI 전환)","icon":"brain","tone":"primary","items":["사람의 판단 일부를 AI로","같은 입력에 다른 출력 (확률적)","출시 후가 진짜 시작","성공 기준: 채택률과 품질","필요 인력: 평가·운영·교육"]}],"caption":"에스컬레이터는 점검만 하면 되지만, 안내원은 교육하고 평가해야 합니다."}$aix$::jsonb, null, 5, 0
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '6f4eedd4-8104-5960-0825-f51a25ce0f13', '7e166bda-67c2-32c1-2687-e0aeba6e2056', 'ax-team/pilot-purgatory', 'pilot-purgatory', '파일럿 지옥: AX가 실패하는 5가지 패턴',
  $aix$2025년 MIT 연구팀(Project NANDA)의 조사에서, 기업 생성형 AI 파일럿의 약 **95%가 손익에 측정 가능한 영향을 주지 못했다**는 결과가 나왔습니다. 300여 개 공개 사례와 150여 명의 리더 설문에 기반한 예비 보고라 표본의 한계는 있지만, 실패의 이유가 모델 성능이 아니었다는 점은 여러 조사에서 반복 확인됩니다.

## 5가지 실패 패턴

1. **파일럿 지옥** — 시연은 성공하는데 프로덕션 진입은 0건. 파일럿의 성공 기준을 "시연"으로 잡았기 때문입니다.
2. **도구만 뿌리기** — 전사 라이선스를 배포하고 교육과 업무 재설계를 생략하면, 3개월 뒤 실사용률이 한 자릿수로 내려앉습니다.
3. **눈에 띄는 곳부터 손대기** — 같은 조사에서 예산의 절반가량이 세일즈·마케팅에 갔지만, 가장 분명한 수익은 지루한 백오피스 자동화에서 나왔습니다.
4. **사람 문제를 기술 문제로 착각** — Prosci가 실무자 1,107명을 조사한 결과, 어려움의 약 38%는 사용자 숙련도 문제였고 순수 기술 문제는 약 16%였습니다.
5. **측정 없는 확산** — PwC의 2026년 설문에서 CEO 56%가 AI로 재무적 수익이 전혀 없다고 답했습니다. 대부분 기준선을 재두지 않아 증명할 숫자가 없는 경우입니다.

## 공통 원인은 하나입니다

다섯 패턴 모두 **"끝까지 책임지는 자리가 없는 구조"**에서 나옵니다. 파일럿 담당자는 시연까지만 책임지고, 현업은 시간이 없고, IT는 리스크만 봅니다. 그 사이에서 과제가 멈춥니다.

AX 팀의 존재 이유가 바로 여기 있습니다. **발굴부터 정착까지를 한 팀이 끝까지 책임지는 것** — 이것이 도구 도입과 AX의 차이입니다.

> 💡 **핵심**: AX 실패는 모델이 약해서가 아니라 **끝까지 책임지는 자리가 없어서** 일어납니다. 조직도를 고치는 것이 첫 번째 기술 과제입니다.$aix$,
  $aix${"type":"grid","title":"AX 실패 5패턴과 처방","items":[{"label":"파일럿 지옥","sublabel":"시연은 성공, 프로덕션 진입 0건","icon":"repeat","tone":"warning"},{"label":"도구만 뿌리기","sublabel":"교육·업무 재설계 없는 라이선스 배포","icon":"download","tone":"warning"},{"label":"눈에 띄는 곳부터","sublabel":"예산은 마케팅, 수익은 백오피스","icon":"eye","tone":"warning"},{"label":"사람 문제를 기술로 착각","sublabel":"어려움의 38%는 숙련도 문제","icon":"users","tone":"warning"},{"label":"측정 없는 확산","sublabel":"기준선이 없어 증명할 숫자가 없음","icon":"chart","tone":"warning"},{"label":"처방: 끝까지 책임지는 팀","sublabel":"발굴 → 파일럿 → 이관까지 한 팀","icon":"target","tone":"primary"}],"caption":"다섯 패턴의 뿌리는 같습니다 — 과제를 끝까지 끌고 갈 주인이 없는 것."}$aix$::jsonb, null, 6, 1
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '18d70465-5154-7859-a2f0-f9d4e4a6938f', '7e166bda-67c2-32c1-2687-e0aeba6e2056', 'ax-team/maturity-diagnosis', 'maturity-diagnosis', '성숙도 진단: 우리 조직은 몇 단계인가',
  $aix$로드맵을 그리기 전에 현재 위치를 알아야 합니다. AX 성숙도는 업계에서 보통 5단계로 봅니다.

## 성숙도 5단계

1. **임시** — 개인이 각자 알아서 씁니다. 공식 전략도, 규정도 없습니다.
2. **실험** — PoC와 파일럿이 여기저기 생깁니다. 성과 측정은 아직 없습니다.
3. **운영화** — 몇 개 업무가 실제 운영에 들어가고, 볼 수 있는 지표가 생깁니다.
4. **전환** — 핵심 프로세스가 AI를 전제로 재설계됩니다.
5. **최적화** — 조직의 기본 작동 방식이 AI 우선입니다.

## 진단은 한 점수가 아니라 5개 축으로

전략·정렬 / 데이터·연동 / 기술·도구 / 인재·문화 / 거버넌스 — 이 다섯 축을 따로 매깁니다. 대부분 조직은 **들쭉날쭉**합니다. 도구는 3단계인데 거버넌스는 1단계인 경우가 가장 흔합니다.

## 진단의 실전 규칙 3가지

- 조직의 실제 단계는 평균이 아니라 **가장 낮은 축**이 결정합니다. 물통에 담기는 물의 높이는 가장 낮은 널이 정하죠.
- 다음 목표는 5단계가 아니라 **바로 다음 한 단계**입니다. 두 단계를 건너뛰려는 계획은 대부분 파일럿 지옥으로 갑니다.
- 진단은 설문이 아니라 **증거**로 합니다. "우리는 중급인 것 같다"가 아니라 "채택률 숫자를 댈 수 있는가", "AI 사용 규정 문서가 실제로 있는가"로 판정하세요.

## 진단 결과를 쓰는 법

가장 낮은 축 하나가 곧 다음 분기의 1순위 과제입니다. 아래 데모에서 실제 진단 시트를 채워보며, 낮은 축을 찾아 다음 목표로 옮기는 흐름을 따라가 보세요.

> 💡 **핵심**: 성숙도 진단의 목적은 점수를 매기는 게 아니라 **가장 낮은 축 하나를 찾는 것**입니다. 그 한 축이 다음 분기 로드맵입니다.$aix$,
  $aix${"type":"steps","title":"AX 성숙도 5단계","steps":[{"label":"1단계 · 임시","sublabel":"개인이 각자 사용 · 전략·규정 없음","icon":"user"},{"label":"2단계 · 실험","sublabel":"PoC·파일럿 산재 · 성과 측정 없음","icon":"test-tube"},{"label":"3단계 · 운영화","sublabel":"일부 업무 실제 운영 · 지표 생김","icon":"gauge"},{"label":"4단계 · 전환","sublabel":"핵심 프로세스를 AI 전제로 재설계","icon":"workflow"},{"label":"5단계 · 최적화","sublabel":"조직의 기본 작동 방식이 AI 우선","icon":"rocket"}],"caption":"조직의 단계는 평균이 아니라 가장 낮은 축이 결정합니다 — 목표는 항상 '다음 한 단계'."}$aix$::jsonb, $aix${"title":"성숙도 자가진단 시트 채워보기","app":{"kind":"browser","url":"ax.internal/maturity/2026-q3","blocks":[{"id":"b-head","type":"heading","label":"AX 성숙도 자가진단 — 2026년 3분기"},{"id":"b-hint","type":"text","label":"각 축을 1~5단계로 매기고, 근거가 되는 숫자나 문서명을 함께 적습니다"},{"id":"b-strategy","type":"card","label":"① 전략·정렬 — 경영진 스폰서 있음 · 연간 목표 문서 있음 → 3단계"},{"id":"b-data","type":"card","label":"② 데이터·연동 — 업무 데이터 접근 일부만 가능 → 2단계"},{"id":"b-tool","type":"card","label":"③ 기술·도구 — 승인 도구 2종 · 계정 관리 있음 → 3단계"},{"id":"b-people","type":"card","label":"④ 인재·문화 — 전사 교육 1회 · 부서 챔피언 없음 → 2단계"},{"id":"b-evidence","type":"input","label":"⑤ 거버넌스 축의 증거를 입력하세요…"},{"id":"b-gov","type":"card","label":"⑤ 거버넌스 — 사용 규정 문서 없음 · 사용 기록 수집 안 함 → 1단계","hidden":true},{"id":"b-submit","type":"button","label":"진단 결과 계산"},{"id":"b-result","type":"card","label":"종합 — 전략 3 · 데이터 2 · 도구 3 · 문화 2 · 거버넌스 1","hidden":true},{"id":"b-lowest","type":"badge","label":"실제 단계 = 가장 낮은 축 → 우리 조직은 1단계","hidden":true},{"id":"b-next","type":"card","label":"다음 목표는 '거버넌스 2단계' 하나 — 사용 규정 1장 + 도구 기록 수집","hidden":true},{"id":"b-anti","type":"badge","label":"함정: 5단계를 목표로 잡으면 어느 축도 오르지 않습니다","hidden":true}]},"actions":[{"t":"caption","text":"① 다섯 축을 각각 매깁니다 — 한 점수로 뭉치지 않습니다"},{"t":"move","target":"b-strategy"},{"t":"click"},{"t":"move","target":"b-data"},{"t":"move","target":"b-people"},{"t":"wait","ms":500},{"t":"caption","text":"② 판정은 느낌이 아니라 증거로 — 문서명·숫자를 적습니다"},{"t":"click","target":"b-evidence"},{"t":"type","target":"b-evidence","text":"사용 규정 문서 없음 / 사용 기록 수집 안 함"},{"t":"reveal","target":"b-gov"},{"t":"wait","ms":600},{"t":"caption","text":"③ 결과를 계산합니다"},{"t":"click","target":"b-submit"},{"t":"reveal","target":"b-result"},{"t":"wait","ms":500},{"t":"caption","text":"④ 평균이 아니라 가장 낮은 축이 조직의 실제 단계입니다"},{"t":"reveal","target":"b-lowest"},{"t":"move","target":"b-lowest"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ 다음 목표는 '5단계'가 아니라 낮은 축의 다음 한 단계"},{"t":"reveal","target":"b-next"},{"t":"reveal","target":"b-anti"},{"t":"move","target":"b-next"},{"t":"caption","text":"✅ 진단 결과 = 다음 분기 1순위 과제 한 줄"},{"t":"wait","ms":900}]}$aix$::jsonb, 6, 2
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '45ce74f2-1e21-d499-bf77-b014695d3fe9', 'c7a2aaa0-8ae1-db0e-48d5-29bd96846348', 'ax-team/five-roles', 'five-roles', 'AX 팀의 5개 자리와 채용 순서',
  $aix$"AX 팀을 만들라"는 지시를 받으면 가장 먼저 막히는 질문이 **"몇 명, 어떤 사람"**입니다. 2026년 실무에서 반복적으로 확인되는 구성은 5개 자리입니다.

## 반드시 있어야 하는 5개 자리

- **AX 리드** — 과제 선정과 우선순위의 최종 결정권을 가집니다. 겸직으로 두면 대개 실패합니다. 가장 먼저 채워야 하는 자리입니다.
- **AX 프로덕트 오너** — 현업 업무를 뜯어보고 어디를 AI에게 넘길지 설계합니다. 기술 지식보다 **도메인 지식**이 중요합니다.
- **AI 엔지니어** — 도구 연결, 사내 데이터 연동, 에이전트 구축을 맡습니다. RAG와 평가 파이프라인을 다룰 수 있어야 합니다.
- **평가·운영 담당(에이전트 옵스)** — 2026년에 새로 생긴 자리입니다. Deloitte는 올해 조직들이 에이전트를 감시·교육·통제하는 전담 팀을 두게 될 것으로 전망했습니다. 돌아가는 AI의 품질을 계속 재고 실패를 분류하는 역할입니다.
- **인케이블먼트 담당** — 교육, 사내 사례 문서, 챔피언 네트워크 운영. **채택률을 실제로 올리는 자리**이지만 가장 자주 생략됩니다.

## 채용 순서: 3명 → 5명 → 8명

- **3명(첫 6개월)**: 리드 + 프로덕트 오너 + AI 엔지니어. 과제 2~3개를 끝까지 밀어봅니다.
- **5명(운영화 진입)**: + 평가·운영 + 인케이블먼트. 돌아가는 것을 지키고 퍼뜨리는 인력이 이때 필요해집니다.
- **8명 이상**: 도메인별 스쿼드로 쪼갭니다. 한 팀이 모든 부서를 상대하면 대기열이 됩니다.

## 흔한 실수 두 가지

- **엔지니어부터 뽑기** — 만들 것을 고르는 사람이 없으면 결과물은 쌓이고 성과는 없습니다.
- **전원 신규 채용** — 최소 절반은 **현업 출신 내부 인력**이어야 합니다. 업무를 모르면 어디가 병목인지 찾지 못하고, 현업의 신뢰도 얻지 못합니다.

> 💡 **핵심**: 첫 채용은 엔지니어가 아니라 **결정권을 가진 리드**입니다. AX 팀의 병목은 대개 기술력이 아니라 의사결정 속도입니다.$aix$,
  $aix${"type":"grid","title":"AX 팀의 5개 자리 (+겸직 챔피언)","items":[{"label":"AX 리드","sublabel":"과제 선정·우선순위 최종 결정 · 1순위 채용","icon":"target","tone":"primary"},{"label":"AX 프로덕트 오너","sublabel":"업무 분해와 설계 · 도메인 지식 우선","icon":"clipboard","tone":"primary"},{"label":"AI 엔지니어","sublabel":"도구 연결·데이터 연동·에이전트 구축","icon":"code","tone":"accent"},{"label":"평가·운영 (에이전트 옵스)","sublabel":"품질 측정·실패 분류 · 2026년 신설 자리","icon":"gauge","tone":"accent"},{"label":"인케이블먼트","sublabel":"교육·사례 문서·챔피언 운영 → 채택률","icon":"graduation-cap","tone":"success"},{"label":"부서 챔피언 (겸직)","sublabel":"각 부서 1명 · 현장 확산의 마지막 1미터","icon":"users","tone":"muted"}],"caption":"3명(리드·PO·엔지니어)으로 시작해 운영화 시점에 평가·교육 인력을 더합니다."}$aix$::jsonb, null, 7, 3
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'b9d1a0a9-cfce-0543-a871-2f4cccb1af17', 'c7a2aaa0-8ae1-db0e-48d5-29bd96846348', 'ax-team/operating-models', 'operating-models', '운영 모델 3형태: 중앙집중 · 분산 · 허브앤스포크',
  $aix$팀을 조직도의 어디에 두는지가 성과를 크게 갈라놓습니다. 선택지는 사실상 세 가지입니다.

## 1. 중앙집중 — AX 팀이 모든 과제를 직접 수행

- 장점: 표준과 품질을 통제하기 쉽고, 초기 학습이 한곳에 쌓입니다.
- 단점: **AX 팀의 인원이 곧 조직의 한계**입니다. 요청 대기열이 밀리기 시작하면 AX 팀 자체가 병목이 됩니다.
- 적합: 성숙도 1~2단계, 시작 후 6~12개월.

## 2. 분산(임베디드) — 각 부서가 알아서 진행

- 장점: 현업에 밀착해 속도가 빠릅니다.
- 단점: 같은 것을 여러 부서가 중복 구축하고, 섀도우 AI와 품질 편차가 커집니다.
- 적합: 거버넌스와 플랫폼이 이미 서 있는 조직. 그 전에는 위험합니다.

## 3. 허브앤스포크 — 2026년 사실상의 표준

- **허브(AX 팀)**는 플랫폼·표준·거버넌스·측정을 소유하고, **스포크(각 부서)**는 자기 과제와 성과를 소유합니다.
- 결정적 차이: 허브가 **승인 게이트가 아니라 조력자**라는 점입니다. 허브가 결재 창구가 되면 다시 중앙집중의 병목으로 돌아갑니다.
- 개발을 스포크가 하기 때문에, 허브 인원 수가 조직이 굴릴 수 있는 과제 수를 제한하지 않습니다.

## 선택 기준

- 성숙도 1~2단계 → 중앙집중으로 시작
- 3단계 이상이고 부서에 실무 인력이 있음 → 허브앤스포크로 전환
- 순수 분산 → 규정과 플랫폼이 서기 전에는 선택하지 않습니다

> 💡 **핵심**: 대부분 조직은 **중앙집중으로 시작해 허브앤스포크로 진화**합니다. 허브의 성공 지표는 "우리가 만든 개수"가 아니라 **"부서가 스스로 만든 개수"**입니다.$aix$,
  $aix${"type":"compare","title":"운영 모델 3형태","columns":[{"title":"중앙집중","icon":"server","tone":"accent","items":["AX 팀이 직접 다 만듦","표준·품질 통제 쉬움","팀 인원 = 조직의 한계","적합: 성숙도 1~2단계"]},{"title":"분산 (임베디드)","icon":"git-branch","tone":"warning","items":["각 부서가 알아서 진행","현업 밀착·속도 빠름","중복 구축·섀도우 AI 위험","적합: 거버넌스 선행된 조직"]},{"title":"허브앤스포크","icon":"workflow","tone":"primary","items":["허브: 플랫폼·표준·측정","스포크: 과제와 성과 소유","허브는 게이트가 아닌 조력자","2026년 사실상의 표준"]}],"caption":"허브가 승인 창구가 되는 순간, 허브앤스포크는 중앙집중으로 되돌아갑니다."}$aix$::jsonb, null, 6, 4
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '5d59c560-54ef-1e7b-2641-7b511bb3d52c', 'c7a2aaa0-8ae1-db0e-48d5-29bd96846348', 'ax-team/charter-and-mandate', 'charter-and-mandate', '팀 차터: 권한과 경계를 문서로 못박기',
  $aix$AX 팀이 6개월 만에 소진되는 가장 흔한 이유는 실력 부족이 아니라 **권한 없이 책임만 받았기 때문**입니다. 출발할 때 한 장으로 정리해 두면 1년을 벌 수 있습니다.

## 차터에 반드시 들어갈 5줄

1. **미션** — 한 문장, 측정 가능하게. "AI를 도입한다"가 아니라 "2026년 안에 고객 응대 처리 시간을 30% 줄인다".
2. **결정 권한** — AX 팀이 단독으로 결정하는 것과 스폰서 승인이 필요한 것을 나눠 적습니다. 도구 선정·과제 우선순위는 보통 단독, 인력과 예산 변경은 승인.
3. **제외 범위** — 하지 않을 일. 예: "개인 PC의 AI 도구 사용 문의는 IT 헬프데스크로 보낸다".
4. **성공 기준과 기간** — 분기 단위 지표 2개. 3개 이상이면 아무것도 관리되지 않습니다.
5. **에스컬레이션 경로** — 현업이 시간을 내주지 않을 때 누구에게, 며칠 안에 올리는가.

## 경영진 스폰서가 실제로 해야 할 일

- 예산 승인이 아니라 **현업의 시간을 확보해 주는 것**입니다. 챔피언 프로그램이 90일을 못 넘기는 가장 큰 이유가 스폰서 부재라는 분석이 반복적으로 나옵니다.
- 분기 리뷰에 **직접 참석**하기. 스폰서가 빠지는 순간 AX는 곁가지 업무로 취급됩니다.

## 다섯 줄 중 가장 중요한 것은 제외 범위입니다

AX 팀은 "AI 관련 모든 것"의 창구가 되기 쉽습니다. 프린터 고장 문의까지 오는 조직도 있습니다. **하지 않을 일을 적어야 할 일을 할 수 있습니다.**

> 💡 **핵심**: 차터의 핵심은 멋진 미션 문장이 아니라 **제외 범위와 결정 권한**입니다. 이 두 줄이 없으면 AX 팀은 만능 헬프데스크가 됩니다.$aix$,
  $aix${"type":"stack","title":"권한 위임 스택","layers":[{"label":"경영진 스폰서","sublabel":"예산 + 현업의 시간 확보 · 분기 리뷰 직접 참석","icon":"shield","tone":"warning"},{"label":"AX 팀 차터","sublabel":"미션 · 결정 권한 · 제외 범위 · 지표 2개 · 에스컬레이션","icon":"clipboard","tone":"primary"},{"label":"부서 스쿼드 (스포크)","sublabel":"과제 실행과 성과 책임","icon":"users","tone":"accent"},{"label":"현업 챔피언","sublabel":"현장 확산과 피드백 수집","icon":"user","tone":"muted"}],"caption":"위층이 시간을 확보해 주지 않으면 아래층은 아무것도 실행하지 못합니다."}$aix$::jsonb, null, 5, 5
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '99a3d81a-9bdd-42ed-cc5b-b6e3f5f09225', '7a82f1b8-1076-a8bf-4104-b271b38ee280', 'ax-team/intake-pipeline', 'intake-pipeline', '과제 발굴과 우선순위: 인테이크 파이프라인',
  $aix$요청은 메신저, 메일, 복도, 회의에서 무작위로 들어옵니다. **창구를 하나로 만드는 것**이 AX 운영의 실질적인 시작입니다.

## 접수 창구를 하나로, 양식을 다섯 칸으로

사내 채널 하나를 정하고 다음 다섯 칸만 받습니다.

- 업무명 / 빈도(하루·주 몇 건) / 1건당 소요 시간 / 담당 인원 / 현재 처리 방식

양식의 목적은 거절이 아니라 **계산**입니다. 빈도 × 소요 시간 × 근무일 = 연간 절감 가능 시간이 자동으로 나옵니다. 이 숫자가 없으면 우선순위는 목소리 큰 순서로 정해집니다.

## 스코어링: 임팩트 × 실현 가능성

- **임팩트**: 연간 절감 시간, 또는 매출·비용에 미치는 영향
- **실현 가능성**: 데이터에 접근할 수 있는가 / 결과가 맞는지 판정할 수 있는가 / 틀렸을 때 비용이 낮은가

두 축으로 네 칸이 나옵니다.

- 임팩트 상 · 실현 상 → **즉시 파일럿**
- 임팩트 상 · 실현 하 → **데이터 준비 과제**로 분리 (AI 과제가 아직 아님)
- 임팩트 하 · 실현 상 → **셀프 서비스**로 안내 (부서 챔피언이 직접)
- 임팩트 하 · 실현 하 → **거절**, 단 사유를 회신

## 첫 파일럿은 지루한 곳에서 고르세요

MIT 조사에서 예산은 세일즈·마케팅에 쏠렸지만 분명한 수익은 백오피스 자동화에서 나왔습니다. 눈에 잘 띄는 과제보다 **반복적이고 정답 판정이 쉬운 업무**가 첫 파일럿의 성공률이 훨씬 높습니다.

## 동시 진행은 3~5개로 제한

포트폴리오 상한을 정해두지 않으면 10개가 동시에 돌다가 전부 시연 단계에서 멈춥니다. 상한을 넘긴 요청은 대기열에 넣고, 대기 중임을 요청자에게 알립니다.

> 💡 **핵심**: 좋은 과제는 발견되는 게 아니라 **계산됩니다**. 접수 양식과 스코어링 기준이 AX 팀의 가장 강력한 도구입니다.$aix$,
  $aix${"type":"flow","title":"과제 인테이크 파이프라인","nodes":[{"label":"단일 창구 접수","sublabel":"양식 5칸: 업무·빈도·소요시간·인원·현재방식","icon":"send","tone":"accent"},{"label":"절감 시간 계산","sublabel":"빈도 × 소요 시간 × 근무일","icon":"chart","tone":"primary","edgeLabel":"목소리 크기가 아니라 숫자로"},{"label":"임팩트 × 실현 가능성 스코어링","sublabel":"데이터 접근 · 판정 가능 · 실패 비용","icon":"filter","tone":"primary"},{"label":"4갈래 결정","sublabel":"파일럿 / 데이터 준비 / 셀프 서비스 / 거절","icon":"git-branch","tone":"success","edgeLabel":"동시 파일럿 3~5개 상한"}],"loopBack":{"from":3,"to":0,"label":"결정과 사유를 요청자에게 회신"},"caption":"거절도 회신합니다 — 사유 없는 침묵이 다음 요청을 음지로 보냅니다."}$aix$::jsonb, $aix${"title":"사내 채널에서 과제 접수·스코어링 따라하기","app":{"kind":"chat-app","workspace":"우리 회사 워크스페이스","composerId":"ax-composer","channels":[{"id":"ch-intake","name":"ax-요청","active":true},{"id":"ch-notice","name":"ax-공지"},{"id":"ch-champion","name":"ax-챔피언"}],"messages":[{"id":"m1","author":"박지연 (고객지원팀)","time":"오전 9:12","text":"AX 요청드립니다.\n업무: 환불 문의 1차 답변 초안 작성\n빈도: 하루 40건\n1건당 소요: 8분\n담당: 3명\n현재 방식: 템플릿 복사 후 손으로 수정","hidden":true},{"id":"m2","author":"AX봇","bot":true,"time":"오전 9:12","text":"접수 완료 — AX-2026-118\n연간 절감 가능 시간: 40건 × 8분 × 250일 ≈ 1,333시간","hidden":true},{"id":"m3","author":"나 (AX 리드)","time":"오전 9:30","text":"실현 가능성 점검: 과거 답변 데이터 있음 ✅ / 상담원이 정답 판정 가능 ✅ / 발송 전 사람 확인이라 실패 비용 낮음 ✅","hidden":true},{"id":"m4","author":"나 (AX 리드)","time":"오전 9:33","text":"임팩트 상 × 실현 상 → 6주 파일럿 진행. 중단 조건: 상담원 수정률 40% 초과가 2주 연속이면 접습니다.","hidden":true},{"id":"m5","author":"AX봇","bot":true,"time":"오전 9:33","text":"파일럿 큐 등록 — 진행 중 4/5건. 이후 요청은 대기열로 들어갑니다.","hidden":true},{"id":"m6","author":"김도현 (마케팅팀)","time":"오전 10:05","text":"AX 요청: 주간 회의록 요약 (주 2회, 1건 20분, 담당 1명)","hidden":true},{"id":"m7","author":"나 (AX 리드)","time":"오전 10:11","text":"임팩트 하 × 실현 상 → 파일럿 대신 셀프 서비스로 안내드립니다. 마케팅팀 챔피언이 사내 템플릿으로 30분 안에 세팅해 드릴 수 있어요.","hidden":true}]},"actions":[{"t":"caption","text":"① 요청은 정해진 다섯 칸 양식으로만 받습니다"},{"t":"move","target":"ch-intake"},{"t":"click"},{"t":"reveal","target":"m1"},{"t":"wait","ms":700},{"t":"caption","text":"② 절감 시간은 접수 즉시 자동 계산됩니다 — 우선순위의 근거"},{"t":"reveal","target":"m2"},{"t":"move","target":"m2"},{"t":"wait","ms":600},{"t":"caption","text":"③ 실현 가능성을 3가지 질문으로 점검합니다"},{"t":"click","target":"ax-composer"},{"t":"type","target":"ax-composer","text":"데이터 있음 / 판정 가능 / 실패 비용 낮음"},{"t":"reveal","target":"m3"},{"t":"wait","ms":500},{"t":"caption","text":"④ 결정할 때 중단 조건을 함께 적습니다 — 시작하는 날에"},{"t":"hide","target":"ax-composer"},{"t":"type","target":"ax-composer","text":"6주 파일럿 진행 · 중단 조건 명시"},{"t":"reveal","target":"m4"},{"t":"reveal","target":"m5"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ 임팩트가 낮으면 거절이 아니라 셀프 서비스로 넘깁니다"},{"t":"reveal","target":"m6"},{"t":"reveal","target":"m7"},{"t":"move","target":"m7"},{"t":"caption","text":"✅ 모든 요청에 결정과 사유가 회신됩니다 — 침묵이 섀도우 AI를 만듭니다"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 6
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  '0aeca14b-537c-f184-c569-9cf1dab3f26c', '7a82f1b8-1076-a8bf-4104-b271b38ee280', 'ax-team/pilot-to-production', 'pilot-to-production', '파일럿에서 프로덕션까지: 90일 설계',
  $aix$파일럿의 성공 기준을 "시연"으로 잡으면 조직은 영원히 시연만 합니다. 시작하는 날 **프로덕션 진입 조건**을 함께 적어야 파일럿 지옥을 벗어납니다.

## 시작 전에 정하는 3줄 (파일럿 계약)

- **판정 방법** — 무엇을 재서 성공을 판단하는가. 비교할 **기준선**을 첫 주에 반드시 측정해 둡니다.
- **기간과 표본** — 예: 6주, 실제 업무 200건. "될 때까지"는 기간이 아닙니다.
- **중단 조건** — 이 선 아래면 접는다. 예: 품질 기준 미달이 2주 연속.

## 90일 골격

- **1~30일**: 기준선 측정 + 현업 5명과 함께 AI 없이 수동으로 해봅니다. 이 과정에서 "무엇이 정답인지"의 판정 기준이 확정됩니다. 이 단계를 건너뛴 파일럿은 나중에 품질 논쟁으로 멈춥니다.
- **31~60일**: 좁은 범위에 실제 투입. 사람이 최종 확인하는 휴먼 인 더 루프 구조로 시작하고, 실패 사례를 모아 유형별로 분류합니다.
- **61~90일**: 확대 또는 중단 결정. 확대라면 **운영 주체·모니터링·예산을 현업에 이관**합니다.

## 프로덕션 진입 체크리스트

- 실패했을 때 사람이 개입하는 경로가 있는가
- 품질을 매주 확인할 수 있는 화면이 있는가
- 운영 담당자가 정해졌는가 (AX 팀이 영구 운영하면 다음 과제를 못 합니다)
- 사용자가 "왜 이렇게 나왔냐"고 물을 때 답할 근거와 기록이 있는가

## 중단도 성과로 세기

6주 만에 접은 파일럿은 실패가 아니라 **6주 만에 산 정보**입니다. 분기 보고에 중단 건수를 함께 적는 팀이 오래 갑니다. 중단이 0건인 팀은 대개 결정을 미루고 있는 팀입니다.

> 💡 **핵심**: 파일럿의 성공 기준은 시연이 아니라 **이관**입니다. 시작하는 날 중단 조건과 인수자를 함께 적으세요.$aix$,
  $aix${"type":"steps","title":"파일럿 90일 설계","steps":[{"label":"0일 · 파일럿 계약 3줄","sublabel":"판정 방법 · 기간과 표본 · 중단 조건","icon":"clipboard"},{"label":"1~30일 · 기준선과 판정 기준","sublabel":"현업 5명과 AI 없이 수동으로 먼저","icon":"gauge"},{"label":"31~60일 · 좁게 실투입","sublabel":"사람 최종 확인 + 실패 사례 분류","icon":"test-tube"},{"label":"61~90일 · 이관 또는 중단","sublabel":"운영 주체·모니터링·예산을 현업으로","icon":"check"}],"caption":"이관받을 사람 이름이 없는 파일럿은 확대가 아니라 AX 팀의 운영 부채가 됩니다."}$aix$::jsonb, null, 7, 7
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'e2d7a3b7-c35a-e91c-e632-8184d0996d43', '7a82f1b8-1076-a8bf-4104-b271b38ee280', 'ax-team/measure-and-report', 'measure-and-report', '성과 측정과 보고: 채택률에서 손익까지',
  $aix$"AI로 생산성이 올랐습니다"라는 보고는 다음 분기 예산을 지켜주지 않습니다. 숫자가 필요하고, 단계에 맞는 숫자가 따로 있습니다.

## 도입 초기(0~6개월)에 보는 지표

- **채택률** — 대상자 중 주 1회 이상 실제로 쓴 사람의 비율. 라이선스 발급 수는 성과가 아닙니다.
- **인간 개입률(오버라이드율)** — AI 결과를 사람이 고친 비율. 품질을 가장 정직하게 보여주는 지표입니다. 이 값이 내려가는 추세가 곧 학습의 증거입니다.
- **처리 시간 단축** — 가장 먼저 잡히는 프로세스 지표. 기준선과 비교해야 의미가 생깁니다.

## 확산 이후(6개월~)에 보는 지표

- 오류율, 의사결정 소요 시간, 그리고 **손익 영향**(매출, 전환율, 건당 처리 비용)
- 직원 만족도 같은 '소프트 ROI'에서 손익에 책임지는 '하드 ROI'로 옮겨가는 것이 2026년의 흐름입니다. PwC 설문에서 CEO 56%가 재무적 수익이 없다고 답한 배경에는, 애초에 손익으로 환산할 설계가 없었던 경우가 많습니다.

## 보고는 3단으로

1. **숫자 3개** — 채택률 / 절감 시간 / 손익 영향
2. **결정 목록** — 확대·유지·중단을 건별로
3. **막힌 것 하나와 필요한 지원** — 스폰서가 결정해 줄 것 딱 하나

## 측정의 두 가지 함정

- **사용량을 성과로 세기** — 호출 수나 대화 수는 활동량일 뿐입니다. 많이 쓰는 것과 잘 쓰는 것은 다릅니다.
- **기준선 없이 시작하기** — 파일럿 첫 주에 기존 방식의 시간과 품질을 재두지 않으면, 나중에 어떤 숫자도 증명할 수 없습니다. 이건 되돌릴 수 없는 실수입니다.

> 💡 **핵심**: 초기엔 **채택률과 개입률**, 확산 후엔 **손익**. 그리고 기준선은 파일럿 첫 주에 재두세요 — 나중에는 못 잽니다.$aix$,
  $aix${"type":"grid","title":"단계별 AX 성과 지표","items":[{"label":"채택률","sublabel":"대상자 중 주 1회 이상 사용 · 초기 1순위","icon":"users","tone":"primary"},{"label":"인간 개입률","sublabel":"사람이 고친 비율 · 품질의 정직한 신호","icon":"wrench","tone":"primary"},{"label":"처리 시간 단축","sublabel":"기준선 대비 % · 가장 먼저 잡히는 지표","icon":"clock","tone":"accent"},{"label":"오류율","sublabel":"확산 이후 · 재작업 비용과 연결","icon":"alert","tone":"accent"},{"label":"손익 영향","sublabel":"매출·전환율·건당 처리 비용","icon":"dollar","tone":"success"},{"label":"사용량 (함정)","sublabel":"호출 수는 활동량 · 성과로 세지 말 것","icon":"x","tone":"warning"}],"caption":"초기 6개월은 채택률·개입률, 그 이후는 손익 — 단계를 건너뛴 보고는 신뢰를 잃습니다."}$aix$::jsonb, $aix${"title":"분기 성과 대시보드 읽고 보고 만들기","app":{"kind":"browser","url":"ax.internal/dashboard/2026-q3","blocks":[{"id":"d-head","type":"heading","label":"AX 분기 성과 대시보드 — 2026년 3분기"},{"id":"d-adopt","type":"card","label":"채택률 — 대상 210명 중 주 1회 이상 128명 (61%)"},{"id":"d-override","type":"card","label":"인간 개입률 — 답변 초안 수정 34% (지난 분기 52%)"},{"id":"d-time","type":"card","label":"처리 시간 — 환불 문의 1건 8분 → 3분 (기준선 대비 −62%)"},{"id":"d-license","type":"badge","label":"⚠ 라이선스 발급 210건 — 이 숫자는 성과가 아닙니다"},{"id":"d-filter","type":"input","label":"기간·부서 필터를 입력하세요…"},{"id":"d-pl","type":"card","label":"손익 영향 — 건당 처리 비용 1,900원 → 780원 · 분기 환산 약 2,700만원","hidden":true},{"id":"d-stop","type":"card","label":"중단 1건 — 영업 제안서 자동 생성 (품질 기준 2주 연속 미달)","hidden":true},{"id":"d-ask","type":"card","label":"필요한 지원 — 부서 챔피언 겸직 시간 주 4시간 공식화 (스폰서 결정)","hidden":true},{"id":"d-report","type":"badge","label":"보고 3단 — 숫자 3개 / 결정 목록 / 막힌 것 1개","hidden":true},{"id":"d-export","type":"button","label":"분기 보고 3단으로 내보내기"}]},"actions":[{"t":"caption","text":"① 초기 지표부터 봅니다 — 채택률은 발급 수가 아니라 실사용 비율"},{"t":"move","target":"d-adopt"},{"t":"click"},{"t":"move","target":"d-license"},{"t":"wait","ms":600},{"t":"caption","text":"② 개입률의 '추세'가 품질 학습의 증거입니다 (52% → 34%)"},{"t":"move","target":"d-override"},{"t":"dblclick"},{"t":"wait","ms":500},{"t":"caption","text":"③ 처리 시간은 기준선과 비교해야 의미가 생깁니다"},{"t":"move","target":"d-time"},{"t":"click"},{"t":"caption","text":"④ 확산 단계 과제만 손익으로 환산해 봅니다"},{"t":"click","target":"d-filter"},{"t":"type","target":"d-filter","text":"고객지원팀 / 확산 단계 과제"},{"t":"reveal","target":"d-pl"},{"t":"wait","ms":600},{"t":"caption","text":"⑤ 중단한 파일럿도 성과로 함께 보고합니다"},{"t":"reveal","target":"d-stop"},{"t":"move","target":"d-stop"},{"t":"caption","text":"⑥ 마지막은 스폰서가 결정할 것 딱 하나"},{"t":"reveal","target":"d-ask"},{"t":"click","target":"d-export"},{"t":"reveal","target":"d-report"},{"t":"caption","text":"✅ 숫자 3개 · 결정 목록 · 지원 요청 1개로 마무리"},{"t":"wait","ms":900}]}$aix$::jsonb, 7, 8
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;
insert into public.lessons (id, module_id, key, slug, title, content_markdown, illustration, demo, minutes, order_index) values (
  'd4305ebd-5f91-7f4d-d54d-671e19ab162d', '7a82f1b8-1076-a8bf-4104-b271b38ee280', 'ax-team/governance-enablement', 'governance-enablement', '거버넌스와 확산: 섀도우 AI와 챔피언 네트워크',
  $aix$규정을 만들지 않으면 직원들은 이미 각자의 방법으로 AI를 쓰고 있습니다. 회사의 승인 없이 개인적으로 쓰는 이런 도구를 **섀도우 AI**라고 부릅니다.

## 지금 조직의 현실

- 여러 조사에서 AI 사용 규정을 갖춘 조직은 소수인데, 승인되지 않은 도구를 쓰는 직원의 비율은 훨씬 높게 나옵니다. IDC 조사에서는 유럽 기업의 57%가 최근 1년 안에 섀도우 AI 사례를 최소 한 건 발견했다고 답했습니다.
- 유럽에서 사업한다면 일정도 걸립니다. EU AI Act의 고위험 AI 관련 의무와 범용 AI·합성 미디어 투명성 의무가 **2026년 8월 2일부터** 적용됩니다(일부 독립형 고위험 시스템은 유예 기간이 있습니다). 규정을 만들 이유가 이미 규제로 존재합니다.

## 최소 거버넌스 3장

1. **허용 목록** — 승인된 도구와, 각 도구에 넣어도 되는 데이터 등급.
2. **금지 3줄** — 개인정보, 미공개 재무 정보, 고객 식별 정보는 승인되지 않은 도구에 넣지 않는다.
3. **기록** — 무엇을 쓰는지 보이게 합니다. 볼 수 없는 것은 통제할 수 없습니다.

중요한 것은 순서입니다. **금지만 있는 규정은 섀도우 AI를 늘립니다.** 막을 때는 반드시 "그럼 이걸 쓰세요"라는 안전한 길을 함께 줘야 합니다.

## 확산의 마지막 1미터는 챔피언이 만듭니다

- 각 부서에서 1명씩 겸직 챔피언을 둡니다(주 2~4시간). 외부 컨설턴트가 아니라 **동료**이기 때문에 신뢰가 생기고, 같은 불안을 알기 때문에 설득이 됩니다.
- 챔피언에게 줘야 하는 세 가지: 사례 템플릿, 월 1회 모임, 그리고 **인정**(평가에 반영되지 않는 겸직은 오래가지 않습니다).
- 저항의 실체는 대개 반감이 아니라 **불안**입니다. 최근 조사에서 직원 약 40%가 AI로 일자리를 잃을까 걱정한다고 답했습니다. "누가 대체되는가"에 대한 조직의 답을 먼저 정하지 않으면, 어떤 교육을 해도 채택률은 오르지 않습니다.

> 💡 **핵심**: 거버넌스는 금지 목록이 아니라 **안전한 사용 경로**입니다. 그리고 확산의 마지막 1미터는 AX 팀이 아니라 옆자리 동료가 만듭니다.$aix$,
  $aix${"type":"flow","title":"거버넌스에서 확산까지","nodes":[{"label":"섀도우 AI 현황 파악","sublabel":"지금 무엇을 쓰고 있는지 먼저 본다","icon":"search","tone":"warning"},{"label":"최소 거버넌스 3장","sublabel":"허용 목록 · 금지 3줄 · 사용 기록","icon":"shield","tone":"primary","edgeLabel":"금지만 있으면 음지로 갑니다"},{"label":"안전한 길 제공","sublabel":"승인 도구 + 교육 + 사례 템플릿","icon":"graduation-cap","tone":"accent"},{"label":"부서 챔피언 확산","sublabel":"동료가 옆자리에 퍼뜨리는 마지막 1미터","icon":"users","tone":"success","edgeLabel":"겸직 시간과 인정을 공식화"}],"loopBack":{"from":3,"to":0,"label":"새 도구 요청은 다시 검토 대기열로"},"caption":"규정과 확산은 한 사이클입니다 — 현장에서 올라온 새 도구 요청이 다음 허용 목록을 만듭니다."}$aix$::jsonb, null, 6, 9
) on conflict (id) do update set
  title = excluded.title, content_markdown = excluded.content_markdown,
  illustration = excluded.illustration, demo = excluded.demo,
  minutes = excluded.minutes, order_index = excluded.order_index;

commit;
