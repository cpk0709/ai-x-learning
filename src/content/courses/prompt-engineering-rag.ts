import type { Course } from "../types";

/**
 * 프롬프트 엔지니어링 심화 & RAG 아키텍처
 *
 * loop-engineering.ts의 스타일 가이드를 따릅니다:
 * - 훅 문장 → ## 소제목 2~3개 → 불릿 위주 → "> 💡 **핵심**:" 요약
 * - 일러스트는 본문을 복사하지 않고 구조를 시각화
 */
export const promptEngineeringRag: Course = {
  slug: "prompt-engineering-rag",
  title: "프롬프트 엔지니어링 심화 & RAG 아키텍처",
  subtitle:
    "CoT부터 Agentic RAG까지, 실무 아키텍처 다이어그램으로 배우는 프롬프트와 검색 증강 생성",
  description:
    "프롬프트는 감이 아니라 구조입니다. 이 강의에서는 역할·맥락·작업·형식으로 프롬프트를 설계하는 법부터, reasoning 모델 시대에 달라진 CoT, Few-shot 예시 설계, 구조화된 출력까지 프롬프트 엔지니어링을 심화합니다. 이어서 임베딩·청킹·벡터 검색으로 기본 RAG 파이프라인을 세우고, 하이브리드 검색과 리랭킹, 에이전트가 검색을 도구로 쓰는 Agentic RAG, 검색과 생성을 분리해 측정하는 평가까지 — 2026년 프로덕션 기준의 검색 증강 생성을 아키텍처 다이어그램과 함께 익힙니다.",
  category: "dev",
  level: "intermediate",
  tags: ["프롬프트 엔지니어링", "CoT", "RAG", "임베딩", "벡터 DB"],
  gradient: ["#8b5cf6", "#d946ef"],
  icon: "brain",
  outcomes: [
    "역할·맥락·작업·형식 4요소로 재현 가능한 프롬프트를 설계할 수 있다",
    "reasoning 모델 시대에 맞는 CoT·Few-shot·구조화된 출력 전략을 선택할 수 있다",
    "수집→임베딩→저장→검색→생성으로 이어지는 RAG 파이프라인을 설계할 수 있다",
    "하이브리드 검색·리랭킹·Agentic RAG로 검색 품질을 끌어올릴 수 있다",
    "검색 품질과 생성 품질을 분리 측정하는 RAG 평가 체계를 만들 수 있다",
  ],
  modules: [
    {
      slug: "prompt-engineering-deep",
      title: "프롬프트 엔지니어링 심화",
      description: "감으로 쓰는 프롬프트에서 구조로 설계하는 프롬프트로",
      lessons: [
        {
          slug: "prompt-anatomy",
          title: "프롬프트의 구조: 역할·맥락·작업·형식",
          minutes: 5,
          content: `좋은 프롬프트는 길거나 정중한 프롬프트가 아닙니다. **구조가 있는 프롬프트**입니다. 배달 앱 요청사항에 "맛있게 해주세요"라고만 쓰면 주방장이 추측할 수밖에 없듯이, 모델도 빠진 정보를 추측으로 채웁니다. 아래 4가지 요소만 채우면 결과의 들쭉날쭉함이 크게 줄어듭니다.

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

> 💡 **핵심**: 프롬프트를 보내기 전에 자문하세요 — "역할·맥락·작업·형식 중 빠진 것은 무엇인가?"`,
          illustration: {
            type: "chat",
            title: "나쁜 프롬프트 vs 좋은 프롬프트",
            messages: [
              { role: "user", text: "이 함수 좀 고쳐줘" },
              {
                role: "ai",
                text: "어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)",
              },
              {
                role: "user",
                text: "[역할] 시니어 TS 개발자로서 [맥락] 아래 함수는 빈 배열 입력 시 NaN을 반환합니다 [작업] 빈 배열이면 0을 반환하도록 수정하고 [형식] 수정 코드 + 한 줄 설명으로 답해줘",
              },
              {
                role: "ai",
                text: "빈 배열 가드를 추가했습니다: `if (items.length === 0) return 0;` — reduce 전에 예외 케이스를 차단합니다.",
              },
            ],
            caption:
              "같은 모델, 같은 함수 — 4요소가 채워지자 답변이 '추측'에서 '해결'로 바뀝니다.",
          },
          demo: {
            title: "플레이그라운드에서 프롬프트 개선 따라하기",
            app: {
              kind: "browser",
              url: "console.anthropic.com/playground",
              blocks: [
                { id: "b-head", type: "heading", label: "AI 플레이그라운드" },
                { id: "b-input", type: "input", label: "프롬프트를 입력하세요…" },
                { id: "b-run", type: "button", label: "실행" },
                {
                  id: "b-bad",
                  type: "card",
                  label: "🤖 어떤 부분이 문제인지 알려주시면… (추측으로 아무 곳이나 수정)",
                  hidden: true,
                },
                { id: "b-badge-bad", type: "badge", label: "모호한 응답 — 맥락 누락", hidden: true },
                {
                  id: "b-good",
                  type: "card",
                  label: "🤖 빈 배열 가드를 추가했습니다: if (items.length === 0) return 0;",
                  hidden: true,
                },
                { id: "b-badge-good", type: "badge", label: "✓ 정확한 해결 — 4요소 충족", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 먼저 4요소 없이 프롬프트를 입력해 봅니다" },
              { t: "move", target: "b-input" },
              { t: "click" },
              { t: "type", target: "b-input", text: "이 함수 좀 고쳐줘" },
              { t: "click", target: "b-run" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 모델이 맥락이 없어 추측성 응답을 내놓습니다" },
              { t: "reveal", target: "b-bad" },
              { t: "reveal", target: "b-badge-bad" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "③ 역할·맥락·작업·형식을 채워 다시 입력합니다" },
              { t: "hide", target: "b-input" },
              { t: "reveal", target: "b-input" },
              { t: "click", target: "b-input" },
              { t: "type", target: "b-input", text: "[역할]시니어 TS [맥락]빈 배열→NaN [작업]0 반환 [형식]코드" },
              { t: "click", target: "b-run" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 추측이 사라지고 근거 있는 해결책이 나옵니다" },
              { t: "reveal", target: "b-good" },
              { t: "reveal", target: "b-badge-good" },
              { t: "move", target: "b-badge-good" },
              { t: "caption", text: "✅ 같은 모델 — 프롬프트의 구조가 품질을 바꿉니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "cot-reasoning",
          title: "CoT와 사고 유도: reasoning 모델 시대의 변화",
          minutes: 6,
          content: `"단계별로 생각해 봐(step by step)" 한 줄이 정답률을 끌어올리던 시절이 있었습니다. 하지만 **reasoning 모델이 표준이 된 2026년, 이 주문의 효과는 달라졌습니다.** 무엇이 바뀌었는지 알아야 헛수고를 피할 수 있습니다.

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

> 💡 **핵심**: 2026년의 CoT는 "생각해 봐"라고 시키는 게 아니라, **생각할 재료(조건·기준)와 예산을 설계**하는 일입니다.`,
          illustration: {
            type: "compare",
            title: "고전 CoT vs reasoning 모델 시대",
            columns: [
              {
                title: "고전 CoT (수동 유도)",
                icon: "message",
                tone: "muted",
                items: [
                  "\"step by step\" 주문을 직접 삽입",
                  "풀이 과정 포함 Few-shot 예시",
                  "추론이 답변 텍스트에 노출",
                  "일반 모델에서 정답률 상승",
                ],
              },
              {
                title: "reasoning 모델 (내장 사고)",
                icon: "brain",
                tone: "primary",
                items: [
                  "모델이 내부에서 먼저 사고",
                  "사고 예산(budget)으로 깊이 조절",
                  "제약·성공 기준이 사고의 재료",
                  "수동 CoT 지시는 효과 미미·역효과도",
                ],
              },
            ],
            caption:
              "주문을 외우는 시대에서, 사고의 재료와 예산을 설계하는 시대로.",
          },
        },
        {
          slug: "few-shot-design",
          title: "Few-shot 예시 설계: 말보다 보여주기",
          minutes: 5,
          content: `백 마디 설명보다 **잘 고른 예시 2~3개**가 결과물을 더 확실하게 통제합니다. 신입사원에게 두꺼운 규정집을 읽히는 것보다 잘 쓴 보고서 샘플 하나를 건네는 편이 빠른 것과 같습니다. 단, 예시는 아무거나 넣는 게 아니라 골라서 설계하는 것입니다.

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

> 💡 **핵심**: Few-shot은 "예시를 몇 개 넣는 것"이 아니라 **대표성·경계·형식·순서를 설계하는 것**입니다.`,
          illustration: {
            type: "steps",
            title: "Few-shot 예시 설계 절차",
            steps: [
              {
                label: "대표 케이스 선정",
                sublabel: "실제 입력 분포의 전형적 사례",
                icon: "target",
              },
              {
                label: "경계 케이스 추가",
                sublabel: "빈 입력·애매한 분류 1개",
                icon: "alert",
              },
              {
                label: "형식 통일",
                sublabel: "입력/출력 구조를 완전히 동일하게",
                icon: "layers",
              },
              {
                label: "순서·개수 검증",
                sublabel: "2~5개, 실데이터로 테스트",
                icon: "test-tube",
              },
            ],
            caption: "모델은 예시의 내용이 아니라 패턴을 복사합니다.",
          },
        },
        {
          slug: "structured-output",
          title: "구조화된 출력: JSON Schema와 도구 호출",
          minutes: 6,
          content: `프롬프트의 결과를 사람이 아니라 코드가 받아서 쓴다면, "JSON으로 답해줘"라는 부탁만으로는 부족합니다. 2026년의 표준은 **스키마로 강제하는 것**입니다. 자유롭게 쓰게 두는 대신, 정해진 서식지의 빈칸만 채우게 하는 방식입니다.

## 왜 '부탁'으로는 안 되는가

- 모델은 가끔 JSON 앞뒤에 설명을 붙이거나, 필드명을 바꾸거나, 따옴표를 빼먹습니다.
- 사람이라면 "아, 대충 이 뜻이구나" 하고 넘어가지만, 코드가 결과를 읽어 들이는 파싱 단계는 쉼표 하나만 어긋나도 실패합니다.
- 실패율이 1%뿐이어도 하루 1만 건을 처리하는 파이프라인에선 매일 100건의 장애입니다.

## 스키마로 강제하는 2가지 방법

여기서 스키마란 "출력에 어떤 필드가 어떤 형태로 들어가야 하는지"를 적은 명세서입니다.

- **Structured Outputs** — API 요청에 JSON 스키마를 첨부하면, 모델이 글자를 만들어 내는 단계에서부터 **스키마에 맞는 출력만** 나오도록 제한됩니다. 주요 API가 모두 지원합니다.
- **도구 호출 (Tool Use)** — 원하는 출력 구조를 도구의 파라미터 스키마로 정의하고, 모델이 그 도구를 "호출"하게 합니다. 추출·분류 작업에서 오래 검증된 견고한 패턴입니다.

## 스키마 설계 팁

- 필드마다 \`description\`(설명문)을 다세요 — 스키마의 설명문이 곧 프롬프트 역할을 합니다.
- 자유 문자열보다 **enum**(정해진 선택지 목록)으로 답을 제한하면 뒤처리가 사라집니다.
- 확신도(confidence)나 근거(evidence) 필드를 추가하면 품질 낮은 출력을 걸러낼 수 있습니다.
- 처음에는 필드 2~3개짜리 작은 스키마로 시작해, 결과를 보며 필드를 늘려 가는 것이 안전합니다.

> 💡 **핵심**: 코드가 소비하는 출력은 프롬프트로 부탁하지 말고 **스키마로 계약**하세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "structured-output.ts — 리뷰 분류 파이프라인",
            lines: [
              { text: "# 출력 스키마: sentiment는 enum으로 제한", tone: "comment" },
              {
                text: '{ "sentiment": { "enum": ["positive", "negative", "neutral"] },',
                tone: "dim",
              },
              {
                text: '  "keywords": { "type": "array" }, "confidence": { "type": "number" } }',
                tone: "dim",
              },
              { text: "npx tsx classify.ts --input reviews.jsonl", tone: "cmd" },
              {
                text: '{"sentiment":"negative","keywords":["배송 지연"],"confidence":0.94}',
                tone: "out",
              },
              {
                text: '{"sentiment":"positive","keywords":["재구매"],"confidence":0.98}',
                tone: "out",
              },
              { text: "✓ 10,000건 파싱 실패 0건 — 스키마 강제 덕분", tone: "ok" },
            ],
            caption:
              "스키마가 디코딩을 제약하므로 '설명 붙은 JSON' 같은 파싱 장애가 원천 차단됩니다.",
          },
          demo: {
            title: "에디터에서 스키마 강제 출력 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "schema.ts — 리뷰 분류 파이프라인",
              files: [
                { id: "f-schema", name: "schema.ts", active: true },
                { id: "f-classify", name: "classify.ts" },
                { id: "f-reviews", name: "reviews.jsonl" },
              ],
              code: [
                { id: "s1", text: "// 리뷰 분류 출력 스키마 (Structured Outputs)", tone: "comment" },
                { id: "s2", text: "export const reviewSchema = {" },
                {
                  id: "s3",
                  text: 'sentiment: { enum: ["positive", "negative", "neutral"] },',
                  indent: 1,
                },
                { id: "s4", text: 'keywords: { type: "array", items: { type: "string" } },', indent: 1 },
                {
                  id: "s5",
                  text: 'confidence: { type: "number" },',
                  indent: 1,
                  tone: "add",
                  hidden: true,
                },
                { id: "s6", text: "};" },
              ],
              terminal: [
                { id: "t1", text: "npx tsx classify.ts reviews.jsonl", tone: "cmd", hidden: true },
                {
                  id: "t2",
                  text: '{"sentiment":"negative","keywords":["배송 지연"],"confidence":0.94}',
                  tone: "out",
                  hidden: true,
                },
                {
                  id: "t3",
                  text: '{"sentiment":"positive","keywords":["재구매"],"confidence":0.98}',
                  tone: "out",
                  hidden: true,
                },
                { id: "t4", text: "✓ 10,000건 처리 — 파싱 실패 0건", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 자유 문자열 대신 enum으로 선택지를 제한합니다" },
              { t: "move", target: "s3" },
              { t: "dblclick", target: "s3" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② confidence 필드를 추가해 저품질 출력을 거릅니다" },
              { t: "move", target: "s4" },
              { t: "click" },
              { t: "type", target: "s5", text: 'confidence: { type: "number" },' },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 스키마를 첨부해 분류 파이프라인을 실행합니다" },
              { t: "type", target: "t1", text: "npx tsx classify.ts reviews.jsonl" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 1만 건을 처리해도 파싱 실패가 0건입니다" },
              { t: "reveal", target: "t4" },
              { t: "move", target: "t4" },
              { t: "caption", text: "✅ 부탁이 아닌 스키마 계약 — 코드가 안심하고 소비합니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "rag-basics",
      title: "RAG의 기초",
      description: "모델 밖의 지식을 검색해 답변에 주입하는 구조",
      lessons: [
        {
          slug: "why-rag",
          title: "왜 RAG인가: 할루시네이션과 최신성",
          minutes: 4,
          content: `아무리 좋은 모델도 **배운 적 없는 것은 모릅니다.** 진짜 문제는 모른다고 말하는 대신 그럴듯하게 지어낸다는 점입니다. RAG는 이 한계를 구조로 푸는 방법입니다. 비유하자면, 모든 걸 외운 천재에게 기억에만 의존해 답하게 두는 대신 **도서관 사서를 붙여 주는 것**입니다.

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

> 💡 **핵심**: RAG는 모델을 똑똑하게 만드는 기술이 아니라, **모델에게 정답이 담긴 근거를 쥐여주는** 아키텍처입니다.`,
          illustration: {
            type: "grid",
            title: "LLM 단독 사용의 4가지 벽",
            items: [
              {
                label: "할루시네이션",
                sublabel: "모르면 지어냄",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "최신성",
                sublabel: "지식이 cutoff에 정지",
                icon: "clock",
                tone: "warning",
              },
              {
                label: "사내 지식",
                sublabel: "위키·문서·DB 미학습",
                icon: "lock",
                tone: "muted",
              },
              {
                label: "출처 부재",
                sublabel: "근거 확인 불가",
                icon: "eye",
                tone: "muted",
              },
              {
                label: "RAG",
                sublabel: "검색된 근거를 프롬프트에 주입",
                icon: "search",
                tone: "primary",
              },
              {
                label: "결과",
                sublabel: "갱신 가능 · 출처 표시 · 권한 관리",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "네 가지 벽을 하나의 아키텍처(RAG)가 동시에 해결합니다.",
          },
        },
        {
          slug: "embeddings-vector-search",
          title: "임베딩과 벡터 검색의 원리",
          minutes: 6,
          content: `"환불 규정"으로 검색했는데 문서에는 "반품 정책"이라고 적혀 있다면? 단어를 그대로 맞춰 보는 키워드 검색은 실패합니다. 하지만 **벡터 검색은 찾아냅니다.** 그 비밀이 임베딩입니다.

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

> 💡 **핵심**: 벡터 검색 = 질문과 문서를 **같은 의미 공간의 좌표**로 바꾼 뒤, 가장 가까운 이웃을 찾는 것입니다.`,
          illustration: {
            type: "flow",
            title: "벡터 검색의 흐름",
            nodes: [
              {
                label: "질문",
                sublabel: "\"환불 규정 알려줘\"",
                icon: "message",
                tone: "primary",
              },
              {
                label: "임베딩 모델",
                sublabel: "텍스트 → 수백~수천 차원 벡터",
                icon: "cpu",
                tone: "accent",
                edgeLabel: "문서와 같은 모델 사용",
              },
              {
                label: "벡터 DB (ANN 인덱스)",
                sublabel: "미리 임베딩된 문서 벡터들",
                icon: "database",
                tone: "muted",
              },
              {
                label: "최근접 이웃 top-k",
                sublabel: "\"반품 정책\" 문서 발견",
                icon: "target",
                tone: "success",
                edgeLabel: "코사인 유사도 순 정렬",
              },
            ],
            caption:
              "단어가 아니라 좌표가 가까운 문서를 찾으므로, 표현이 달라도 의미로 매칭됩니다.",
          },
        },
        {
          slug: "chunking-strategies",
          title: "청킹 전략: 크기·오버랩·구조",
          minutes: 6,
          content: `RAG 품질 문제의 절반은 모델이 아니라 **문서를 자르는 방식**에서 옵니다. 도서관에 비유하면, 책을 통째로 한 칸에 욱여넣으면 원하는 대목을 못 찾고, 낱장으로 찢어 놓으면 앞뒤 맥락을 잃습니다. 알맞은 단위로 나누는 일이 청킹입니다.

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

> 💡 **핵심**: 청킹의 목표는 "적당히 자르기"가 아니라 **각 청크가 홀로 읽혀도 의미가 통하는 단위**를 만드는 것입니다.`,
          illustration: {
            type: "compare",
            title: "청킹 전략 3가지",
            columns: [
              {
                title: "작은 고정 크기",
                icon: "scissors",
                tone: "muted",
                items: [
                  "토큰 ~200, 기계적 분할",
                  "검색은 정밀",
                  "맥락 단절 위험",
                  "문장이 중간에 끊김",
                ],
              },
              {
                title: "큰 고정 크기",
                icon: "file-text",
                tone: "muted",
                items: [
                  "토큰 ~800 이상",
                  "맥락은 풍부",
                  "여러 주제가 섞여 검색 흐림",
                  "프롬프트 비용 증가",
                ],
              },
              {
                title: "구조 기반 + 오버랩",
                icon: "layers",
                tone: "primary",
                items: [
                  "헤딩·문단·함수 단위로 분할",
                  "10~20% 오버랩으로 경계 보완",
                  "청크 단독으로 의미가 통함",
                  "2026년 실무 기본값",
                ],
              },
            ],
            caption: "고정 크기에서 시작하되, 프로덕션은 문서 구조를 따라 자릅니다.",
          },
        },
        {
          slug: "rag-pipeline",
          title: "기본 RAG 파이프라인 아키텍처",
          minutes: 5,
          content: `배운 조각들을 하나의 시스템으로 조립할 차례입니다. 모든 RAG는 **두 개의 흐름**으로 이루어집니다. 도서관에 비유하면, 개관 전에 책을 분류해 서가에 꽂아 두는 **수집(Ingestion)**과, 손님의 질문을 받아 그 자리에서 책을 찾아 주는 **질의(Query)**입니다.

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

> 💡 **핵심**: RAG = 오프라인 수집 파이프라인 + 온라인 질의 파이프라인. **두 흐름의 신선도와 품질을 각각 관리**하는 것이 운영의 전부입니다.`,
          illustration: {
            type: "stack",
            title: "RAG 시스템의 레이어",
            layers: [
              {
                label: "애플리케이션",
                sublabel: "질문 입력 · 출처 표시된 답변",
                icon: "message",
                tone: "primary",
              },
              {
                label: "생성 레이어",
                sublabel: "LLM + \"근거 기반으로만 답하라\" 프롬프트",
                icon: "sparkles",
                tone: "accent",
              },
              {
                label: "검색 레이어",
                sublabel: "질문 임베딩 → top-k 청크",
                icon: "search",
                tone: "accent",
              },
              {
                label: "저장 레이어",
                sublabel: "벡터 DB: 벡터 + 원문 + 메타데이터",
                icon: "database",
                tone: "muted",
              },
              {
                label: "수집 파이프라인",
                sublabel: "문서 수집 → 청킹 → 임베딩 (배치 갱신)",
                icon: "upload",
                tone: "muted",
              },
            ],
            caption:
              "아래 두 층(오프라인)이 신선해야 위 세 층(온라인)이 정확합니다.",
          },
          demo: {
            title: "RAG 수집 파이프라인 구축 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "ingest.ts — RAG 수집 파이프라인",
              files: [
                { id: "f-ingest", name: "ingest.ts", active: true },
                { id: "f-query", name: "query.ts" },
                { id: "f-docs", name: "docs/" },
              ],
              code: [
                { id: "i1", text: "// 수집: 문서 → 청킹 → 임베딩 → 저장 (오프라인)", tone: "comment" },
                { id: "i2", text: 'const docs = await loadDocs("./docs");' },
                { id: "i3", text: "const chunks = splitByHeading(docs, {" },
                { id: "i4", text: "maxTokens: 512, overlap: 64,", indent: 1 },
                { id: "i5", text: "});" },
                {
                  id: "i6",
                  text: "const vectors = await embed(chunks);",
                  tone: "add",
                  hidden: true,
                },
                {
                  id: "i7",
                  text: "await db.upsert(vectors, {meta:true});",
                  tone: "add",
                  hidden: true,
                },
              ],
              terminal: [
                { id: "t1", text: "npx tsx ingest.ts", tone: "cmd", hidden: true },
                { id: "t2", text: "→ 문서 128건 로드, 청크 1,842개 생성", tone: "out", hidden: true },
                { id: "t3", text: "→ 임베딩 1,842건 완료 (배치 8회)", tone: "out", hidden: true },
                {
                  id: "t4",
                  text: "✓ 벡터 DB 인덱싱 완료 — 신선도 2026-07-28",
                  tone: "ok",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 구조 기반 청킹에 크기와 오버랩을 설정합니다" },
              { t: "move", target: "i3" },
              { t: "click" },
              { t: "move", target: "i4" },
              { t: "dblclick", target: "i4" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 각 청크를 벡터로 변환하는 임베딩을 추가합니다" },
              { t: "type", target: "i6", text: "const vectors = await embed(chunks);" },
              { t: "wait", ms: 300 },
              { t: "caption", text: "③ 벡터·원문·메타데이터를 함께 저장합니다" },
              { t: "type", target: "i7", text: "await db.upsert(vectors, {meta:true});" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ 수집 파이프라인을 실행해 인덱싱합니다" },
              { t: "type", target: "t1", text: "npx tsx ingest.ts" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "t4" },
              { t: "move", target: "t4" },
              { t: "caption", text: "✅ 오프라인 수집 완료 — 이제 질의가 신선한 근거를 찾습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "production-rag",
      title: "프로덕션 RAG",
      description: "데모를 넘어 실서비스 품질로: 하이브리드 검색, 에이전트, 평가",
      lessons: [
        {
          slug: "hybrid-search-reranking",
          title: "하이브리드 검색과 리랭킹",
          minutes: 6,
          content: `벡터 검색만 쓰는 RAG는 실서비스에서 반드시 구멍이 납니다. **"ERR-4042" 같은 에러 코드, 제품명, 고유명사**는 의미가 비슷한 이웃이 없어서, 의미 공간에서 길을 잃기 때문입니다.

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

> 💡 **핵심**: 프로덕션(실서비스) 검색 = **하이브리드로 넓게 건지고, 리랭커로 좁게 고른다.** 이 2단계가 표준입니다.`,
          illustration: {
            type: "flow",
            title: "하이브리드 검색 + 리랭킹 파이프라인",
            nodes: [
              {
                label: "질문",
                sublabel: "\"ERR-4042 환불 처리 방법\"",
                icon: "message",
                tone: "primary",
              },
              {
                label: "키워드 검색 ∥ 벡터 검색",
                sublabel: "BM25는 코드를, 벡터는 의미를 잡음",
                icon: "search",
                tone: "accent",
                edgeLabel: "두 검색을 병렬 실행",
              },
              {
                label: "RRF 병합",
                sublabel: "순위 기반 융합 → 후보 100개",
                icon: "git-branch",
                tone: "accent",
              },
              {
                label: "리랭커",
                sublabel: "cross-encoder 정밀 채점",
                icon: "filter",
                tone: "warning",
                edgeLabel: "넓게 건진 후보를",
              },
              {
                label: "top-5 → 생성",
                sublabel: "정밀 선별된 근거만 프롬프트에",
                icon: "sparkles",
                tone: "success",
                edgeLabel: "좁게 고른다",
              },
            ],
            caption: "recall은 하이브리드가, precision은 리랭커가 책임집니다.",
          },
        },
        {
          slug: "agentic-rag",
          title: "Agentic RAG: 검색을 도구로 쓰는 에이전트",
          minutes: 7,
          content: `정해진 "검색 1번 → 생성 1번" 파이프라인은 복잡한 질문 앞에서 무너집니다. 2026년의 답은 **에이전트가 검색을 도구로 쥐고, 필요한 만큼 반복 검색하는** Agentic RAG입니다. 시키는 대로 한 번만 찾고 마는 아르바이트생 대신, 스스로 판단하며 서가를 오가는 베테랑 사서를 두는 것입니다.

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

> 💡 **핵심**: Agentic RAG = 에이전트 루프의 도구 자리에 검색을 꽂은 것. 긴 컨텍스트는 RAG를 대체하는 게 아니라 **검색 후 읽는 분량을 늘려줄** 뿐입니다.`,
          illustration: {
            type: "cycle",
            title: "Agentic RAG 루프",
            center: "충분한 근거를 얻을 때까지",
            nodes: [
              {
                label: "질문 분석",
                sublabel: "분해 · 쿼리 재작성",
                icon: "brain",
              },
              {
                label: "검색 실행",
                sublabel: "벡터 DB · SQL · 웹 중 선택",
                icon: "search",
              },
              {
                label: "결과 평가",
                sublabel: "근거가 충분한가?",
                icon: "eye",
              },
              {
                label: "답변 생성",
                sublabel: "출처와 함께 · 부족하면 재검색",
                icon: "sparkles",
              },
            ],
            caption:
              "검색 1번으로 끝나지 않습니다 — 에이전트가 근거가 모일 때까지 루프를 돕니다.",
          },
        },
        {
          slug: "rag-evaluation",
          title: "RAG 평가: 검색과 생성을 분리해서 측정",
          minutes: 6,
          content: `"답변이 이상해요"라는 신고만으로는 아무것도 고칠 수 없습니다. RAG의 실패에는 전혀 다른 두 가지 병이 있기 때문입니다. **사서가 엉뚱한 책을 가져온 경우(검색 실패)**와, **맞는 책을 받고도 엉뚱하게 읽고 답한 경우(생성 실패)**입니다. 반드시 나눠서 재야 합니다.

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

> 💡 **핵심**: RAG 평가의 첫 질문은 "답이 좋은가"가 아니라 **"검색이 실패했는가, 생성이 실패했는가"**입니다.`,
          illustration: {
            type: "compare",
            title: "검색 평가 vs 생성 평가",
            columns: [
              {
                title: "검색 품질",
                icon: "search",
                tone: "primary",
                items: [
                  "질문: 정답 근거가 top-k에 있나",
                  "Recall@k · Precision@k · MRR",
                  "골든 데이터셋(질문↔정답 청크)으로 측정",
                  "낮으면: 청킹·임베딩·하이브리드 수정",
                ],
              },
              {
                title: "생성 품질",
                icon: "sparkles",
                tone: "accent",
                items: [
                  "질문: 근거를 충실히 썼나",
                  "충실성 · 답변 관련성",
                  "LLM-as-judge로 자동 채점",
                  "낮으면: 프롬프트·모델·근거 배치 수정",
                ],
              },
            ],
            caption:
              "두 지표를 분리하면 '어디를 고칠지'가 즉시 드러납니다 — 진단 없는 치료는 없습니다.",
          },
        },
      ],
    },
  ],
};
