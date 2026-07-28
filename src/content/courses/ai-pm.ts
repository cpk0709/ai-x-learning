import type { Course } from "../types";

/**
 * AI 시대의 PM — 실행 병목이 사라진 시대의 프로덕트 매니지먼트 (2026)
 *
 * 스타일 기준: loop-engineering.ts (훅 → ## 소제목 → 불릿 → 💡 핵심 블록쿼트)
 */
export const aiPm: Course = {
  slug: "ai-pm",
  title: "AI 시대의 PM: 새로운 역할과 핵심 역량",
  subtitle: "실행이 값싸진 시대, PM의 무기는 판단력입니다 — 역할 재정의부터 커리어 전환 로드맵까지",
  description:
    "AI가 코드를 짜고, 디자인을 그리고, 문서를 쓰는 2026년 — 제품 개발의 병목은 더 이상 '만드는 것'이 아닙니다. 무엇을 만들지 판단하는 사람, 즉 PM에게 무게중심이 옮겨왔습니다. 이 강의는 AI 이전/이후 제품 개발 사이클이 어떻게 달라졌는지, PM의 역할이 백로그 관리자에서 제품 방향 결정자로 어떻게 재정의됐는지 짚고, AI 제품 감각(이벨 읽기), 바이브 코딩 프로토타이핑, 데이터 리터러시 같은 새 역량과 함께 30-60-90일 전환 로드맵까지 제시합니다.",
  category: "business",
  level: "beginner",
  tags: ["AI PM", "프로덕트 매니지먼트", "이벨(Evals)", "바이브 코딩", "커리어 전환"],
  gradient: ["#0891b2", "#2563eb"],
  icon: "target",
  outcomes: [
    "실행 비용 급감이 PM의 역할을 어떻게 바꿨는지 구조적으로 설명할 수 있다",
    "이벨(Evals) 리포트를 읽고 AI 기능의 품질 기준을 스펙에 쓸 수 있다",
    "바이브 코딩 도구로 아이디어를 문서가 아닌 동작하는 프로토타입으로 검증할 수 있다",
    "확률적 AI 제품의 스펙(이벨 기준·실패 모드·신뢰 설계)을 작성할 수 있다",
    "주니어/시니어 상황에 맞는 30-60-90일 AI 역량 전환 계획을 세울 수 있다",
  ],
  modules: [
    {
      slug: "what-changed",
      title: "무엇이 달라졌나",
      description: "실행 비용의 붕괴, PM 역할의 재정의, 팀 구조의 변화",
      lessons: [
        {
          slug: "execution-cost-collapse",
          title: "실행 비용의 붕괴: 병목이 옮겨간 자리",
          minutes: 5,
          content: `"만들 사람이 없어서 못 한다"는 말이 사라지고 있습니다. 2026년 제품 개발의 병목은 실행이 아니라 **판단**입니다.

## AI 이전의 개발 사이클

- 아이디어 하나를 검증하려면 **기획서 → 설득 → 개발 착수 → 몇 주 대기**가 필요했습니다.
- 실행이 비쌌기 때문에, PM의 일은 "무엇을 만들지 아주 신중하게 고르고 문서로 정당화하는 것"이었습니다.
- 틀린 선택의 비용이 커서, 회의와 문서가 늘어났습니다.

## AI 이후의 개발 사이클

- AI 코딩 도구와 에이전트 덕분에 프로토타입이 **몇 주가 아니라 몇 시간** 만에 나옵니다.
- 만들 수 있는 것이 폭증하자, 병목은 "만들기"에서 **"무엇을 만들지, 만든 게 좋은지 판단하기"**로 이동했습니다.
- 앤드류 응은 이를 "프로덕트 매니지먼트가 새로운 병목이 되고 있다"고 표현했습니다.

## PM에게 의미하는 것

- 결정의 **횟수**가 늘어납니다 — 같은 시간에 더 많은 판단을 내려야 합니다.
- 좋은 것과 그럴듯한 것을 가르는 **취향과 판단력**이 희소 자원이 됩니다.

> 💡 **핵심**: 실행이 값싸지면 판단이 비싸집니다. AI 시대 PM의 경쟁력은 "많이 만들게 하는 힘"이 아니라 **"무엇을 만들지 고르는 힘"**입니다.`,
          illustration: {
            type: "compare",
            title: "AI 이전 vs 이후의 제품 개발 사이클",
            columns: [
              {
                title: "AI 이전 (실행이 병목)",
                icon: "clock",
                tone: "muted",
                items: [
                  "아이디어 → 문서 → 설득 → 개발 대기",
                  "프로토타입 1개에 몇 주",
                  "틀린 선택의 비용이 큼",
                  "PM = 신중한 선별자",
                ],
              },
              {
                title: "AI 이후 (판단이 병목)",
                icon: "zap",
                tone: "primary",
                items: [
                  "아이디어 → 프로토타입 → 즉시 검증",
                  "프로토타입 1개에 몇 시간",
                  "선택지가 폭증 — 고르기가 문제",
                  "PM = 빠른 판단자",
                ],
              },
            ],
            caption: "실행 비용이 급감하자 병목이 '만들기'에서 '판단하기'로 이동했습니다.",
          },
        },
        {
          slug: "pm-role-redefined",
          title: "PM 역할의 재정의: 백로그 관리자에서 방향 결정자로",
          minutes: 5,
          content: `티켓을 정리하고 회의록을 요약하는 PM은 AI가 이미 더 잘합니다. 그렇다면 사람 PM의 일은 무엇으로 남을까요?

## 대체되는 것: 정보의 포장과 전달

- 고객 피드백 요약, 회의록 정리, 티켓 작성, 진행 상황 보고 — **"정보를 옮기는 일"**은 에이전트가 대신합니다.
- 백로그를 관리하는 것 자체는 더 이상 PM의 존재 이유가 아닙니다.

## 남고 커지는 것: 방향의 결정

- **문제 선택**: 수많은 가능한 것 중에 "지금 풀 가치가 있는 문제"를 고르는 일
- **품질 판정**: AI가 만든 결과물이 출시 기준을 넘는지 가르는 일
- **정렬(Alignment)**: 엔지니어링·디자인·경영진이 한 방향을 보게 만드는 스토리텔링

## 새로운 하루의 모습

2026년의 PM은 문서를 쓰는 시간이 줄고, **AI가 만든 초안·프로토타입·분석을 검토하고 판단하는 시간**이 늘었습니다. 실행을 지시하는 사람이 아니라, 실행 결과를 심사하는 **에디터**에 가깝습니다.

> 💡 **핵심**: PM의 정의가 바뀌었습니다 — "백로그를 관리하는 사람"에서 **"제품의 방향을 결정하고 품질을 판정하는 사람"**으로.`,
          illustration: {
            type: "flow",
            title: "방향 결정자의 업무 루프",
            nodes: [
              {
                label: "문제 선택",
                sublabel: "지금 풀 가치가 있는가",
                icon: "target",
                tone: "primary",
              },
              {
                label: "AI에게 실행 위임",
                sublabel: "초안·프로토타입·분석 생성",
                icon: "bot",
                tone: "accent",
              },
              {
                label: "결과 심사",
                sublabel: "좋은가, 그럴듯하기만 한가",
                icon: "eye",
                tone: "warning",
              },
              {
                label: "방향 결정·팀 정렬",
                sublabel: "출시 / 수정 / 폐기",
                icon: "check",
                tone: "success",
              },
            ],
            loopBack: { from: 2, to: 1, label: "기준 미달이면 다시 위임" },
            caption: "PM은 실행자가 아니라 에디터 — 위임하고, 심사하고, 결정합니다.",
          },
        },
        {
          slug: "team-structure-shift",
          title: "팀 구조의 변화: 소수 정예 + 에이전트",
          minutes: 4,
          content: `"팀이 커야 큰 제품을 만든다"는 공식이 깨지고 있습니다. 2026년의 제품 팀은 작아졌고, 그 자리를 AI 에이전트가 채웁니다.

## 팀은 작아지고, 산출량은 늘었다

- 8~12명이던 제품 팀이 **3~5명 규모**로 재편되는 흐름이 보고됩니다. 한 사람이 AI 도구로 더 많이 만들기 때문입니다.
- 초기 스타트업에서는 5명이 에이전트(고객지원·리서치·운영)를 붙여 **예전 20명 몫**을 처리하는 사례가 나옵니다.

## PM 대 엔지니어 비율의 변화

- 전통적 비율은 PM 1명당 엔지니어 6~8명이었습니다.
- 엔지니어 1인의 산출량이 커지자, **판단할 것(스펙·우선순위·품질 기준)이 폭증** — 같은 인원의 엔지니어에게 더 많은 PM 판단이 필요해지는 방향으로 압력이 걸립니다.
- 동시에 "정보 전달만 하는 PM" 수요는 줄어 — PM 역할이 **양극화**됩니다.

## PM에게 의미하는 것

- 작은 팀에서는 역할 경계가 흐려집니다. PM도 프로토타입을 만들고, 엔지니어도 고객을 만납니다.
- "누가 무엇을 하느냐"보다 **"누가 판단에 책임지느냐"**가 팀 설계의 중심이 됩니다.

> 💡 **핵심**: 팀은 작아지고 에이전트가 늘어납니다. 이 구조에서 PM의 가치는 머릿수 관리가 아니라 **판단의 밀도**에서 나옵니다.`,
          illustration: {
            type: "grid",
            title: "2026년 소수 정예 제품 팀의 구성",
            items: [
              {
                label: "PM 1",
                sublabel: "방향 결정·품질 판정",
                icon: "target",
                tone: "primary",
              },
              {
                label: "엔지니어 2~3",
                sublabel: "AI 도구로 산출량 수 배",
                icon: "code",
                tone: "accent",
              },
              {
                label: "디자이너 1",
                sublabel: "취향과 경험의 기준",
                icon: "palette",
                tone: "accent",
              },
              {
                label: "리서치 에이전트",
                sublabel: "인터뷰 분석·경쟁 조사",
                icon: "search",
                tone: "muted",
              },
              {
                label: "코딩 에이전트",
                sublabel: "프로토타입·마이그레이션",
                icon: "bot",
                tone: "muted",
              },
              {
                label: "운영 에이전트",
                sublabel: "티켓 분류·리포트 생성",
                icon: "workflow",
                tone: "muted",
              },
            ],
            caption: "사람은 판단에, 에이전트는 실행에 — 작은 팀이 큰 팀의 산출량을 냅니다.",
          },
        },
        {
          slug: "fading-vs-rising",
          title: "사라지는 업무 vs 더 중요해지는 업무",
          minutes: 5,
          content: `"PM이 사라진다"는 공포와 "PM 전성시대"라는 낙관이 동시에 들립니다. 둘 다 절반만 맞습니다 — **업무 단위로 갈라지기** 때문입니다.

## 사라지거나 자동화되는 업무

- 회의록 요약, 상태 보고서 작성, 티켓 정리
- 유저 피드백의 1차 분류와 요약
- 경쟁사 기능 변경 추적, 시장 자료 1차 조사
- 표준적인 PRD·유저 스토리의 **초안 작성**

공통점: 입력과 출력이 명확한 **정보 가공** 작업입니다.

## 더 중요해지는 업무

- **문제 정의**: 애매한 신호에서 "진짜 문제"를 골라내는 일
- **품질 기준 수립**: AI 산출물의 합격선을 정의하는 일 (이벨의 출발점)
- **트레이드오프 결정**: 데이터가 답을 주지 않는 지점에서의 선택
- **이해관계자 정렬**: 조직이 한 방향으로 움직이게 만드는 설득

공통점: 정답이 없고, **책임**이 따르는 판단 작업입니다.

## 갈림길

정보 가공이 업무의 대부분이었던 PM은 위기를, 판단과 정렬이 중심이었던 PM은 기회를 맞습니다. 준비는 이 격차를 좁히는 일입니다.

> 💡 **핵심**: AI는 PM을 대체하지 않습니다. **정보 가공형 업무를 대체하고, 판단형 업무의 가치를 끌어올립니다.** 여러분의 시간표를 후자로 옮기세요.`,
          illustration: {
            type: "compare",
            title: "PM 업무의 양극화",
            columns: [
              {
                title: "자동화되는 업무",
                icon: "bot",
                tone: "muted",
                items: [
                  "회의록·보고서 작성",
                  "피드백 1차 분류·요약",
                  "경쟁사 변경 추적",
                  "PRD·스토리 초안",
                ],
              },
              {
                title: "가치가 커지는 업무",
                icon: "trending-up",
                tone: "primary",
                items: [
                  "문제 정의와 선택",
                  "품질 기준(이벨) 수립",
                  "트레이드오프 결정",
                  "이해관계자 정렬·설득",
                ],
              },
            ],
            caption: "왼쪽에 시간을 쓰던 PM일수록, 오른쪽으로의 이동이 시급합니다.",
          },
        },
      ],
    },
    {
      slug: "core-skills",
      title: "AI 시대 필수 역량",
      description: "AI 제품 감각, 직접 만드는 힘, 데이터 리터러시 — 그리고 변하지 않는 것",
      lessons: [
        {
          slug: "ai-product-sense",
          title: "AI 제품 감각 ①: 프롬프트·이벨·모델의 한계",
          minutes: 7,
          content: `AI 기능을 기획하려면 모델을 만들 줄은 몰라도 됩니다. 하지만 **모델이 어디서 틀리는지, 품질을 어떻게 측정하는지**는 알아야 합니다.

## PM이 알아야 할 모델의 성질

- **확률적**: 같은 입력에도 답이 달라질 수 있습니다. "항상 정확히"라는 스펙은 성립하지 않습니다.
- **그럴듯한 오류**: 모델은 자신 있게 틀립니다 — 지어낸 통계, 근거 없는 확신이 대표적 실패 유형입니다.
- **프롬프트 = 사양서**: 프롬프트에 없는 규칙(예: 존댓말, 사과 우선)은 지켜지지 않습니다.

## 이벨(Evals): AI 제품의 품질 계기판

이벨은 대표 케이스 수백 건에 대해 AI 출력을 채점한 결과입니다. 2026년 실무에서 **이벨은 PM 요구사항과 엔지니어링을 잇는 다리**이며, 성공 기준을 정의하는 주체는 PM입니다.

- "좋다"를 **차원별로 분해**합니다: 정확성·간결성·톤·정책 준수를 각각 점수화
- 점수만 보지 말고 **실패 사례 원문**을 읽습니다 — 패턴은 항상 원문에 있습니다
- 발견한 패턴을 **스펙의 품질 기준**으로 되돌려 씁니다

## PM의 실무 루틴

이벨 리포트를 읽고 → 하락한 차원의 실패 사례를 읽고 → 품질 기준을 한 줄 추가하는 것. 아래 데모에서 이 흐름을 그대로 따라 해봅니다.

> 💡 **핵심**: AI 제품 감각 = **이벨을 읽고, 실패 사례에서 패턴을 찾고, 그것을 스펙의 품질 기준으로 쓰는 능력**입니다.`,
          illustration: {
            type: "chat",
            title: "모델은 자신 있게 틀립니다",
            messages: [
              {
                role: "user",
                text: "우리 앱 이탈률이 업계 평균 대비 어떤지 알려줘",
              },
              {
                role: "ai",
                text: "업계 평균 이탈률은 23.7%로, 귀사는 이보다 5.2%p 낮습니다.",
              },
              {
                role: "system",
                text: "⚠️ 출처 없는 수치 — 모델이 지어낸 통계일 수 있습니다. PM은 이런 실패 유형을 알고 검증 절차를 설계해야 합니다.",
              },
            ],
            caption: "그럴듯한 오류를 잡아내는 눈 — 이것이 AI 제품 감각의 출발점입니다.",
          },
          demo: {
            title: "이벨 대시보드 읽기 따라하기",
            app: {
              kind: "browser",
              url: "evals.our-product.ai/reports/summary-v2",
              blocks: [
                { id: "h1", type: "heading", label: "요약 어시스턴트 v2 — 이벨 리포트" },
                { id: "b-run", type: "badge", label: "테스트 케이스 200건 · 오늘 실행" },
                { id: "c-acc", type: "card", label: "정확성 94% (▲3)" },
                { id: "c-brev", type: "card", label: "간결성 89% (—)" },
                { id: "c-tone", type: "card", label: "톤 준수 72% (▼9)" },
                { id: "btn-fail", type: "button", label: "실패 사례 보기" },
                {
                  id: "f1",
                  type: "card",
                  label: "사례 #117: 고객 응답에 반말 사용",
                  hidden: true,
                },
                {
                  id: "f2",
                  type: "card",
                  label: "사례 #142: 사과 없이 환불 거절 통보",
                  hidden: true,
                },
                {
                  id: "b-cause",
                  type: "badge",
                  label: "공통 패턴: 톤 가이드가 프롬프트에 없음",
                  hidden: true,
                },
                { id: "in-note", type: "input", label: "스펙에 추가할 품질 기준 입력…" },
                { id: "btn-add", type: "button", label: "품질 기준으로 저장" },
                { id: "done", type: "badge", label: "✅ 스펙 v2.1에 반영됨", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 점수를 훑고 하락한 차원을 찾습니다" },
              { t: "move", target: "c-acc" },
              { t: "move", target: "c-tone" },
              { t: "click", target: "c-tone" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 점수가 아니라 실패 사례 원문을 읽습니다" },
              { t: "click", target: "btn-fail" },
              { t: "reveal", target: "f1" },
              { t: "reveal", target: "f2" },
              { t: "move", target: "f2" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 실패의 공통 패턴을 확인합니다" },
              { t: "reveal", target: "b-cause" },
              { t: "move", target: "b-cause" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 발견을 스펙의 품질 기준으로 되돌려 씁니다" },
              { t: "click", target: "in-note" },
              { t: "type", target: "in-note", text: "고객 응답은 존댓말 + 사과를 먼저 한다" },
              { t: "click", target: "btn-add" },
              { t: "reveal", target: "done" },
              { t: "caption", text: "⑤ 다음 이벨 실행에서 톤 점수를 재측정합니다" },
              { t: "move", target: "done" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "build-it-yourself",
          title: "직접 만드는 힘 ②: 바이브 코딩으로 프로토타입",
          minutes: 6,
          content: `"문서 10장보다 동작하는 프로토타입 1개"가 2026년 PM의 설득 방식입니다. 코드를 몰라도 됩니다 — 의도를 말하면 앱이 나옵니다.

## 바이브 코딩이란

자연어로 의도를 설명하면 AI가 동작하는 앱을 만들어주는 방식입니다. Lovable, Bolt, v0, Replit 같은 도구가 대표적이며, 최근 조사에서는 **PM의 절반 이상이 AI·노코드 프로토타이핑 도구를 업무에 사용**하는 것으로 나타났습니다. 비개발자도 몇 시간이면 클릭 가능한 프로토타입을 만듭니다.

## PM에게 왜 무기인가

- **검증이 빨라집니다**: 아이디어를 회의가 아니라 유저 테스트로 판정합니다.
- **커뮤니케이션 비용이 급감합니다**: "이런 느낌"을 말로 설명하는 대신 만져보게 합니다.
- **요구사항이 정교해집니다**: 직접 만들어보면 엣지 케이스가 미리 보입니다.

## 프로토타입의 규율

- 프로토타입은 **검증용**입니다 — 그대로 출시하는 것이 아니라, 배운 것을 스펙에 반영합니다.
- 검증 질문을 먼저 정하세요: "유저가 이 버튼을 찾는가?"처럼 **한 가지 가설**에 집중합니다.
- 실패한 프로토타입은 성공입니다 — 개발 착수 전에 배웠으니까요.

> 💡 **핵심**: 아이디어 검증의 단위가 **문서에서 동작물로** 바뀌었습니다. PM이 직접 만들 수 있으면 검증 속도가 곧 경쟁력이 됩니다.`,
          illustration: {
            type: "steps",
            title: "바이브 코딩 검증 사이클 (반나절 코스)",
            steps: [
              {
                label: "검증 질문 정하기",
                sublabel: "가설 1개로 좁히기",
                icon: "lightbulb",
              },
              {
                label: "의도를 프롬프트로",
                sublabel: "화면·데이터·흐름을 말로 설명",
                icon: "message",
              },
              {
                label: "프로토타입 생성",
                sublabel: "Lovable·Bolt·v0 등",
                icon: "wand",
              },
              {
                label: "유저 5명에게 테스트",
                sublabel: "관찰하고 기록",
                icon: "users",
              },
              {
                label: "배운 것을 스펙에",
                sublabel: "프로토타입은 버려도 됨",
                icon: "clipboard",
              },
            ],
            caption: "예전엔 몇 주짜리 사이클 — 지금은 반나절이면 한 바퀴 돕니다.",
          },
        },
        {
          slug: "data-literacy",
          title: "데이터 리터러시와 판단력 ③: AI 출력을 의심하는 법",
          minutes: 6,
          content: `AI가 분석까지 해주는 시대에 데이터 리터러시가 왜 더 중요해질까요? **AI의 분석 결과를 판정할 사람**이 필요하기 때문입니다.

## AI 분석 시대의 함정

- AI 요약은 매끄럽지만, **표본 편향**(불만 유저만 응답)은 알려주지 않습니다.
- 상관관계를 인과처럼 서술하는 것은 AI 분석의 고질적 습관입니다.
- 분류·요약 결과의 **오분류율**을 확인하지 않으면, 틀린 근거로 로드맵을 정하게 됩니다.

## PM의 검증 루틴 3가지

- **원본 표집**: AI가 분류한 결과에서 무작위 10건의 원문을 직접 읽어봅니다.
- **반대 질문**: "이 결론이 틀렸다면 어떤 데이터가 보여야 하지?"를 AI에게 묻습니다.
- **분모 확인**: 비율이 나오면 항상 분모(전체 몇 건 중인지)를 확인합니다.

## 판단력은 검증의 누적

데이터 리터러시는 통계 지식이 아니라 습관입니다. AI의 결과를 받으면 **믿기 전에 표본 하나를 원문으로 확인**하는 것 — 아래 데모의 흐름처럼요. 이 습관이 쌓이면 AI가 어디서 틀리는지에 대한 감각, 즉 판단력이 됩니다.

> 💡 **핵심**: AI가 분석을 대신할수록 필요한 것은 분석 기술이 아니라 **분석 결과를 의심하고 검증하는 판단력**입니다.`,
          illustration: {
            type: "cycle",
            title: "AI 분석 검증 루프",
            center: "믿기 전에 확인",
            nodes: [
              { label: "AI 분석 수신", sublabel: "분류·요약·리포트", icon: "bot" },
              { label: "원본 표집", sublabel: "무작위 원문 10건 읽기", icon: "search" },
              { label: "반례 탐색", sublabel: "틀렸다면 뭐가 보일까", icon: "alert" },
              { label: "판단·수정", sublabel: "수용 / 재분류 / 재분석", icon: "check" },
            ],
            caption: "검증을 반복할수록 'AI가 어디서 틀리는지'에 대한 감각이 쌓입니다.",
          },
          demo: {
            title: "유저 피드백 자동 분류 확인 따라하기",
            app: {
              kind: "chat-app",
              workspace: "제품팀 워크스페이스",
              composerId: "composer",
              channels: [
                { id: "ch-feedback", name: "피드백-분류", active: true },
                { id: "ch-product", name: "제품-일반" },
              ],
              messages: [
                {
                  id: "m1",
                  author: "분류봇",
                  bot: true,
                  time: "오전 9:00",
                  text: "오늘 신규 피드백 47건 분류를 완료했습니다.",
                  hidden: true,
                },
                {
                  id: "m2",
                  author: "분류봇",
                  bot: true,
                  time: "오전 9:00",
                  text: "🔴 버그 12건 · 🟡 기능 요청 23건 · 🟢 칭찬 12건",
                  hidden: true,
                },
                {
                  id: "m3",
                  author: "분류봇",
                  bot: true,
                  time: "오전 9:01",
                  text: "최다 언급 요청: 'CSV 내보내기' 9건",
                  hidden: true,
                },
                {
                  id: "m4",
                  author: "나 (PM)",
                  time: "오전 9:12",
                  text: "내보내기 요청 9건 원문 보여줘",
                  hidden: true,
                },
                {
                  id: "m5",
                  author: "분류봇",
                  bot: true,
                  time: "오전 9:12",
                  text: "1) \"엑셀로 뽑고 싶어요\" 2) \"내보내기 눌러도 권한 오류가 떠요\" 3) \"권한이 없다고 나와요\" …",
                  hidden: true,
                },
                {
                  id: "m6",
                  author: "나 (PM)",
                  time: "오전 9:15",
                  text: "2·3번은 기능 요청이 아니라 권한 버그야. 버그로 재분류해줘.",
                  hidden: true,
                },
                {
                  id: "m7",
                  author: "분류봇",
                  bot: true,
                  time: "오전 9:15",
                  text: "재분류 완료 — 🔴 버그 14건 · 🟡 요청 21건. 분류 규칙에 '권한 오류' 패턴을 추가했습니다.",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 에이전트가 밤사이 피드백을 자동 분류했습니다" },
              { t: "reveal", target: "m1" },
              { t: "reveal", target: "m2" },
              { t: "reveal", target: "m3" },
              { t: "move", target: "m3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 요약을 믿기 전에 원문을 표집합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "내보내기 요청 9건 원문 보여줘" },
              { t: "reveal", target: "m4" },
              { t: "reveal", target: "m5" },
              { t: "move", target: "m5" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "③ 원문을 읽으니 오분류가 보입니다 — 요청이 아니라 버그" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "2·3번은 권한 버그야. 재분류해줘" },
              { t: "reveal", target: "m6" },
              { t: "reveal", target: "m7" },
              { t: "move", target: "m7" },
              { t: "caption", text: "④ 사람의 판정이 분류 규칙을 개선시킵니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "timeless-skills",
          title: "변하지 않는 것 ④: 문제 정의, 고객 공감, 커뮤니케이션",
          minutes: 5,
          content: `역설적이게도, AI 시대에 가장 값이 오른 PM 역량은 새로운 기술이 아니라 **가장 오래된 기본기**입니다.

## 왜 기본기의 가치가 올랐나

- **문제 정의**: 실행이 빨라질수록, 잘못 정의된 문제는 "정교하게 틀린 결과물"을 더 빨리 만듭니다. AI는 시키는 것을 잘할 뿐, 무엇을 시킬지 정해주지 않습니다.
- **고객 공감**: AI는 데이터를 요약하지만, 고객의 말과 속마음의 간극(말로는 좋다며 안 쓰는 이유)은 현장에서 사람이 읽어야 합니다.
- **커뮤니케이션**: 조직을 움직이는 스토리텔링과 신뢰 구축은 자동화되지 않습니다. 하드콜(어려운 결정)을 내리고 책임지는 것도요.

## 기본기 × AI = 증폭

기본기와 AI 역량은 경쟁 관계가 아니라 곱셈 관계입니다.

- 문제 정의가 좋은 PM이 바이브 코딩을 쓰면 → 옳은 가설을 하루 만에 검증
- 고객 공감이 깊은 PM이 이벨을 쓰면 → 고객이 실제로 느끼는 품질 차원을 측정
- 커뮤니케이션이 강한 PM이 AI 초안을 쓰면 → 설득의 밀도가 올라감

기본기가 0이면 AI를 곱해도 0입니다.

> 💡 **핵심**: AI 도구는 상향 평준화됩니다. 결국 차이를 만드는 것은 **문제를 고르는 눈, 고객을 읽는 마음, 조직을 움직이는 말**입니다.`,
          illustration: {
            type: "stack",
            title: "AI 시대 PM 역량 스택",
            layers: [
              {
                label: "AI 도구 활용",
                sublabel: "바이브 코딩 · 이벨 · 자동 분석 — 빠르게 배울 수 있음",
                icon: "sparkles",
                tone: "accent",
              },
              {
                label: "데이터 리터러시·판단력",
                sublabel: "AI 출력을 검증하고 판정하는 습관",
                icon: "chart",
                tone: "primary",
              },
              {
                label: "문제 정의 · 고객 공감 · 커뮤니케이션",
                sublabel: "모든 층을 떠받치는 기반 — 대체 불가",
                icon: "users",
                tone: "success",
              },
            ],
            caption: "위층은 도구와 함께 바뀌지만, 맨 아래층은 시대가 바뀌어도 그대로입니다.",
          },
        },
      ],
    },
    {
      slug: "practice-career",
      title: "실무 적용과 커리어 전환",
      description: "오늘부터 쓰는 AI 업무 가속, AI 기능 기획법, 30-60-90일 로드맵",
      lessons: [
        {
          slug: "accelerate-pm-work",
          title: "AI로 PM 업무 가속: 인터뷰 분석·경쟁 분석·PRD 초안",
          minutes: 7,
          content: `이론은 충분합니다. 오늘 출근해서 바로 쓸 수 있는 세 가지 가속 지점을 봅니다. 원칙은 하나 — **초안은 AI, 판단은 사람**.

## ① 유저 인터뷰 분석

- 녹취록을 넣고 "반복되는 불만을 주제별로 묶고, 각 주제의 대표 인용문을 달아줘"라고 요청합니다.
- 규칙: AI가 뽑은 주제마다 **대표 인용문 원문을 직접 확인**합니다. 요약만 믿으면 뉘앙스가 사라집니다.

## ② 경쟁 분석

- 경쟁사 릴리스 노트·가격 페이지를 모아 변경점 추적과 비교표 초안을 맡깁니다.
- 규칙: 수치·날짜는 **출처 링크로 재확인** — 모델은 그럴듯한 세부사항을 지어냅니다.

## ③ PRD 초안

- 문제·대상·제약을 입력하면 구조 잡힌 초안이 나옵니다. 백지에서 시작하지 않는 것만으로 시간이 크게 줍니다.
- 규칙: AI 초안의 **성공 지표는 거의 항상 재작성**이 필요합니다. 근거 없는 지표가 가장 흔한 허점입니다. 아래 데모에서 직접 고쳐봅니다.

## 공통 원칙

AI 산출물에는 "AI 초안 — 검토 전" 딱지를 붙이고, 사람 검토를 통과해야 떼어지게 하세요. 팀의 신뢰를 지키는 최소 장치입니다.

> 💡 **핵심**: 가속의 공식은 **AI가 80%의 초안, 사람이 20%의 판단** — 그리고 그 20%가 문서의 가치를 결정합니다.`,
          illustration: {
            type: "grid",
            title: "PM 업무 가속 3지점과 사람의 몫",
            items: [
              {
                label: "인터뷰 분석",
                sublabel: "AI: 주제 묶기 / 사람: 원문 확인",
                icon: "mic",
                tone: "primary",
              },
              {
                label: "경쟁 분석",
                sublabel: "AI: 변경 추적 / 사람: 출처 검증",
                icon: "search",
                tone: "accent",
              },
              {
                label: "PRD 초안",
                sublabel: "AI: 구조·초안 / 사람: 지표 재작성",
                icon: "file-text",
                tone: "success",
              },
              {
                label: "공통 규칙",
                sublabel: "'검토 전' 딱지 → 사람 승인 후 해제",
                icon: "shield",
                tone: "warning",
              },
            ],
            caption: "모든 칸의 오른쪽 절반(사람의 몫)이 비면, 가속이 아니라 사고입니다.",
          },
          demo: {
            title: "AI와 PRD 초안 작성 따라하기",
            app: {
              kind: "browser",
              url: "prd.our-product.ai/new",
              blocks: [
                { id: "h1", type: "heading", label: "PRD 초안 생성기" },
                { id: "in-idea", type: "input", label: "만들 기능을 한 줄로 설명하세요…" },
                { id: "btn-gen", type: "button", label: "초안 생성" },
                { id: "b-draft", type: "badge", label: "AI 초안 v1 — 검토 전", hidden: true },
                {
                  id: "c-problem",
                  type: "card",
                  label: "📄 문제: 팀 외부와 데이터를 공유하기 어렵다",
                  hidden: true,
                },
                {
                  id: "c-metric",
                  type: "card",
                  label: "🎯 성공 지표: 페이지뷰 +30% (근거 없음)",
                  hidden: true,
                },
                {
                  id: "c-eval",
                  type: "card",
                  label: "🧪 품질 기준: (비어 있음)",
                  hidden: true,
                },
                { id: "in-edit", type: "input", label: "수정 지시 입력…" },
                { id: "btn-apply", type: "button", label: "반영" },
                {
                  id: "c-metric2",
                  type: "card",
                  label: "🎯 성공 지표: 주간 내보내기 사용 활성 팀 25%",
                  hidden: true,
                },
                {
                  id: "c-eval2",
                  type: "card",
                  label: "🧪 품질 기준: 내보내기 성공률 99% · 3초 이내",
                  hidden: true,
                },
                { id: "b-done", type: "badge", label: "✅ 사람 검토 완료 — v1.1", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 문제·대상·제약을 한 줄로 입력합니다" },
              { t: "click", target: "in-idea" },
              { t: "type", target: "in-idea", text: "외부 공유용 CSV 내보내기 기능" },
              { t: "click", target: "btn-gen" },
              { t: "reveal", target: "b-draft" },
              { t: "reveal", target: "c-problem" },
              { t: "reveal", target: "c-metric" },
              { t: "reveal", target: "c-eval" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 초안의 허점을 찾습니다 — 근거 없는 지표" },
              { t: "dblclick", target: "c-metric" },
              { t: "caption", text: "③ 사람이 지표와 품질 기준을 다시 씁니다" },
              { t: "click", target: "in-edit" },
              { t: "type", target: "in-edit", text: "지표를 활성 팀 25%로 교체, 품질 기준 추가" },
              { t: "click", target: "btn-apply" },
              { t: "hide", target: "c-metric" },
              { t: "reveal", target: "c-metric2" },
              { t: "hide", target: "c-eval" },
              { t: "reveal", target: "c-eval2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 검토를 마쳐야 '검토 전' 딱지가 떨어집니다" },
              { t: "hide", target: "b-draft" },
              { t: "reveal", target: "b-done" },
              { t: "move", target: "b-done" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "spec-for-ai-features",
          title: "AI 기능을 기획하는 법: 확률적 제품의 스펙",
          minutes: 6,
          content: `"버튼을 누르면 항상 X가 된다"는 스펙 문법은 AI 기능에서 무너집니다. 확률적으로 동작하는 제품에는 **다른 스펙 문법**이 필요합니다.

## 결정적 스펙 → 확률적 스펙

- 이전: "요약은 100자 이내여야 한다"
- 이후: "골든 데이터셋 기준, **95%의 케이스에서** 요약이 80~120자여야 한다"

수용 기준(acceptance criteria)이 **평가 기준(evaluation criteria)**으로 바뀝니다. 기준선을 측정할 이벨 계획이 스펙의 일부가 됩니다.

## AI PRD에 반드시 들어갈 세 가지

- **이벨 기준**: 품질을 어떤 차원으로 나눠 무엇으로 측정하는가, 출시 합격선은 몇 점인가
- **실패 모드 카탈로그**: 모델이 틀리는 방식(지어냄, 톤 이탈, 무응답)을 예상 목록으로 만들고, 각각의 **감지 방법과 대응**을 정의합니다. 실무에서 AI 기능 실패의 다수는 모델 실패가 아니라 이 설계를 안 한 **설계 실패**입니다.
- **신뢰 설계**: 확신 낮은 출력의 처리 방식 — 표현 완화(소프트 폴백), 사람에게 넘기기(휴먼 핸드오프), 출처 표시. 신뢰는 한 번 무너지면 복구가 어렵습니다.

## PM의 새 문장들

"이 기능이 틀리면 유저는 무엇을 보게 되는가?"— 이 질문에 스펙이 답하지 못하면 아직 기획이 끝나지 않은 것입니다.

> 💡 **핵심**: AI 기능의 스펙은 **잘 될 때의 그림 + 틀릴 때의 각본**입니다. 이벨 기준·실패 모드·신뢰 설계가 빠진 AI PRD는 절반짜리입니다.`,
          illustration: {
            type: "flow",
            title: "확률적 제품의 스펙 작성 흐름",
            nodes: [
              {
                label: "품질 차원 정의",
                sublabel: "정확성·톤·정책 준수로 분해",
                icon: "layers",
                tone: "primary",
              },
              {
                label: "이벨 기준·합격선",
                sublabel: "95% 케이스에서 기준 충족",
                icon: "gauge",
                tone: "accent",
              },
              {
                label: "실패 모드 카탈로그",
                sublabel: "틀리는 방식 → 감지 → 대응",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "신뢰 설계",
                sublabel: "폴백 · 휴먼 핸드오프 · 출처",
                icon: "shield",
                tone: "success",
              },
            ],
            loopBack: { from: 3, to: 1, label: "이벨 미달 시 기준 재조정" },
            caption: "'틀릴 때의 각본'까지 써야 AI 기능의 스펙이 완성됩니다.",
          },
        },
        {
          slug: "transition-roadmap",
          title: "전환 로드맵: 30-60-90일 학습 계획",
          minutes: 6,
          content: `"뭐부터 해야 하죠?"에 대한 답입니다. 거창한 자격증이 아니라, **90일간의 실전 반복**으로 전환합니다.

## 첫 30일: 도구를 몸에 붙이기

- AI 도구 2~3개를 골라 **실제 업무**에 씁니다 (PRD 초안, 피드백 분석 등)
- 같은 작업을 수동/AI로 각각 해보고 품질·시간을 비교합니다
- 매주 프롬프트 하나를 다듬어 재사용 템플릿으로 저장합니다

## 60일까지: 만들고 측정하기

- 바이브 코딩 도구로 **동작하는 프로토타입 1개**를 만들어 유저 5명에게 보여줍니다
- 자사(또는 가상) AI 기능의 **미니 이벨**을 만듭니다 — 케이스 20건, 품질 차원 3개면 충분합니다
- AI 산출물에서 오류를 잡아낸 사례를 기록하기 시작합니다

## 90일까지: 팀으로 확장하기

- 검증한 워크플로우를 팀 프로세스로 제안합니다 ("검토 전 딱지" 규칙 등)
- AI 기능 스펙(이벨 기준·실패 모드 포함)을 1건 작성해 리뷰받습니다

## 주니어 vs 시니어의 강조점

- **주니어**: 도구 숙련 + 기본기(문제 정의·고객 인터뷰)를 병행하세요. 도구만 배우면 판단력 없는 오퍼레이터가 됩니다.
- **시니어**: 직접 만들기의 비중을 늘리세요. 위임에 익숙해진 손으로 프로토타입과 이벨을 한 번은 직접 만들어야 팀을 이끌 수 있습니다.

> 💡 **핵심**: 전환의 단위는 강의 수강이 아니라 **업무 1건을 AI로 다시 해보는 것**입니다. 90일 뒤, 여러분의 포트폴리오에는 프로토타입 1개와 이벨 1개가 있어야 합니다.`,
          illustration: {
            type: "steps",
            title: "30-60-90일 전환 로드맵",
            steps: [
              {
                label: "30일: 도구 체화",
                sublabel: "실무 2~3개 업무에 AI 적용 · 비교",
                icon: "wrench",
              },
              {
                label: "60일: 만들고 측정",
                sublabel: "프로토타입 1개 + 미니 이벨 1개",
                icon: "rocket",
              },
              {
                label: "90일: 팀으로 확장",
                sublabel: "워크플로우 제안 + AI 스펙 1건 리뷰",
                icon: "users",
              },
              {
                label: "이후: 반복과 심화",
                sublabel: "판단 사례를 기록해 감각으로",
                icon: "repeat",
              },
            ],
            caption: "90일의 산출물은 수료증이 아니라 프로토타입 1개와 이벨 1개입니다.",
          },
        },
      ],
    },
  ],
};
