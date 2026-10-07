import type { Course } from "../types";

/**
 * 사실 검증 메모 (2026-10 기준):
 * - Claude 단가(1M 토큰당 입력/출력): Fable 5.1 $10/$50, Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 4.5 $1/$5
 *   → 출력 = 입력의 5배. (platform.claude.com 요금 문서, 2026-09-25 캐시)
 * - Claude 프롬프트 캐싱: 읽기 0.1배(Opus 5.5 0.05배, Fable 5.1 0.025배), 쓰기 5분 TTL 1.25배·1시간 TTL 2배,
 *   읽을 때마다 TTL 무료 갱신, 최소 캐시 길이 Opus/Sonnet 5.5·Fable 5.1 512토큰, Haiku 4.5 4,096토큰,
 *   usage 필드 cache_creation_input_tokens / cache_read_input_tokens, 도구 정의·effort 변경 시 캐시 무효
 *   (platform.claude.com/docs/en/build-with-claude/prompt-caching)
 * - Claude Message Batches: 50% 할인, 대부분 1시간 내 완료·24시간 내 미완료 시 만료, 캐싱 할인과 중첩(배치 내 캐시는 best-effort),
 *   결과 29일 보관 (platform.claude.com/docs/en/build-with-claude/batch-processing)
 * - 비용 최적화 순서·완료 작업당 비용·모델 혼용 시 캐시 분리·count_tokens·effort: Anthropic 비용 최적화 가이드(집필 지침 4절)
 * - Claude Code (code.claude.com/docs/en/costs 직접 확인): /usage(세션 토큰·비용·캐시 통계), /context(컨텍스트 점유 확인),
 *   /clear(새 세션, 비용 0), /compact [지시문](요약 자체가 큰 요청), /model, /effort, /mcp, /hooks, /rewind,
 *   Shift+Tab 플랜 모드, CLAUDE.md 200줄 이하 권장·세부 지침은 skills로, 장황한 작업은 서브에이전트(작은 모델 지정 가능),
 *   hooks로 로그 전처리, CLI 도구가 MCP보다 컨텍스트 효율적, 캐시 수명 구독 1시간(usage credits 사용 중엔 5분)·API 키 기본 5분.
 *   /cost 명령은 해당 문서에 없어 본문에서 사용하지 않음.
 * - OpenAI: 1,024토큰 이상 접두사 자동 캐싱, 캐시 입력 약 0.1배, usage.input_tokens_details.cached_tokens,
 *   Batch 50%, Flex 배치 수준 할인 (developers.openai.com/api/docs/guides/prompt-caching)
 * - DeepSeek: 피크 = UTC 01:00~04:00, 06:00~10:00, 월~금(중국 공휴일 제외), 그 외(주말 포함) 오프피크 = 피크의 50%.
 *   캐시 히트 입력 = 미스의 약 2~3% (api-docs.deepseek.com/quick_start/pricing). 2026-08 피크 요금제 전환 보도(runtimewire.com 등).
 *   KST 환산: 피크 평일 10:00~13:00, 15:00~19:00.
 * - Gemini API 무료 티어: 입력·출력을 제품 개선에 사용, 사람 검토자 열람 가능, "민감·기밀·개인정보 넣지 말 것",
 *   유료 티어는 개선에 미사용 (ai.google.dev/gemini-api/terms). 컨텍스트 캐싱 할인율은 공식 문서에서 수치 미확인 → 본문 미기재.
 * - ChatGPT Free/Plus: 설정 > 데이터 제어 "Improve the model for everyone" 토글, 기본 켜짐 (help.openai.com/articles/7730893)
 * - Claude 개인 요금제(Free/Pro/Max): 모델 학습 사용 여부 선택, 허용 시 보관 5년·비허용 30일, 상용·API 제외
 *   (anthropic.com/news/updates-to-our-consumer-terms)
 * - 한국어 토큰: 같은 뜻의 영어보다 토큰이 더 나오는 경향, 배율은 토크나이저마다 크게 다름(측정값 약 1.3배~수 배까지 상이)
 *   → 본문엔 배율 숫자 미기재 (dev.to, jangwook.net, 고려대 ICICPE 2024 등 교차)
 * - 중국 모델: 서구 플래그십 대비 입력 단가 수 분의 1~수십 분의 1, 다수 오픈웨이트 → Together AI·Fireworks 등
 *   해외 호스팅, OpenRouter 경유, 로컬 실행 가능 (layer3labs.io, gmicloud.ai 등). 개별 단가는 미기재.
 * - 토큰맥싱: Uber 2026 AI 예산 4월 소진(CTO 발언 보도), Meta 성과 평가 토큰 기준 삭제·리더보드 철거 보도,
 *   Zapier 동료 대비 과다 사용 검토 대시보드, OpenAI 보고서상 직원당 매출-토큰 산출량 무상관 분석
 *   (CNBC·Forbes·Fast Company·aiweekly.co·leaddev.com 보도; 검수 재확인: thenextweb.com Uber CTO 발언, shopifreaks/aiweekly Meta 2026-09 공지,
 *   personalwirtschaft.de·plushcap Zapier '동료 대비 5~10배' 사용자 점검)
 * - 2025-02 딥시크 차단: 국방부·외교부·산업부 등 부처, 카카오(업무 사용 지양)·LG유플러스(사용 금지), 개인정보위 질의.
 *   사유: 데이터 중국 서버 저장·중국법 적용 조항 (newsis.com, v.daum.net, biz.sbs.co.kr)
 * - 구독: Claude 전 요금제 5시간 사용 창, 유료는 주간 한도, Max 약 $100/$200. ChatGPT Plus $20, 상위 Pro. 세부 한도 미기재.
 */
export const tokenSaving: Course = {
  slug: "token-saving",
  title: "토큰 절약의 기술: 같은 결과를 더 적은 비용으로",
  subtitle: "캐싱·배치·라우팅부터 구독 활용과 저렴한 모델까지, 토큰당 성과를 높이는 실전 전략",
  description:
    "AI를 '많이 쓰는 사람'보다 '같은 성과를 적은 토큰으로 내는 사람'이 인정받는 시대입니다. 이 강의는 토큰이 어떻게 과금되고 어디서 새는지부터 시작해, 매일 쓰는 채팅·구독 서비스에서 아끼는 습관, 프롬프트 캐싱·배치 API·오프피크·모델 라우팅·코딩 에이전트 관리 같은 개발자용 기법, 그리고 저렴한 중국 모델과 로컬 LLM을 안전하게 쓰는 법까지 다룹니다. 마지막으로 약관 안의 영리한 최적화와 계정 정지를 부르는 꼼수의 경계선을 정리하고, 나만의 토큰 예산표를 만듭니다.",
  category: "dev",
  level: "intermediate",
  tags: ["토큰 절약", "프롬프트 캐싱", "배치 API", "모델 라우팅", "코딩 에이전트", "AI 비용"],
  gradient: ["#14b8a6", "#0f766e"],
  icon: "gauge",
  outcomes: [
    "입력·출력·추론 토큰의 과금 구조를 이해하고 완료 작업당 비용으로 측정할 수 있다",
    "대화 위생·프롬프트 다이어트·구독 한도 관리로 채팅 사용량을 줄일 수 있다",
    "프롬프트 캐싱·배치 API·오프피크·모델 라우팅을 조합해 API 비용을 설계할 수 있다",
    "코딩 에이전트의 컨텍스트를 /clear·/compact·CLAUDE.md 다이어트로 관리할 수 있다",
    "저렴한 모델과 로컬 LLM을 보안 기준에 맞게 고르고, 약관 위반 꼼수를 가려낼 수 있다",
  ],
  modules: [
    /* ============================== M1 ============================== */
    {
      slug: "token-economics",
      title: "토큰 경제 이해",
      description: "돈이 어디서 나가고 어디서 새는지, 그리고 재는 법",
      lessons: [
        {
          slug: "why-token-efficiency",
          title: "왜 지금 '토큰 효율'이 실력인가",
          minutes: 5,
          content: `같은 보고서를 두 사람이 AI로 만들었습니다. 한 명은 토큰 200만 개, 다른 한 명은 60만 개를 썼습니다. 이제 회사는 누구를 더 높이 평가할까요?

## '많이 쓰는 사람'에서 '적게 쓰고 잘하는 사람'으로

- 2025~2026년 일부 기업이 AI 사용량을 성과 지표로 삼았습니다. 그러자 숫자를 부풀리려고 필요 없는 일에도 토큰을 쓰는 **토큰맥싱**이 나타났습니다.
- Uber는 사내 사용량 리더보드를 운영한 뒤 2026년 AI 예산을 4월에 모두 썼다고 보도됐습니다. Meta는 2026년 성과 평가에서 토큰 사용량 기준을 뺐다고 보도됐습니다.
- Zapier는 개인별 토큰 대시보드를 두고, 동료보다 지나치게 많이 쓰면 이유를 살펴본다고 알려졌습니다.

흐름은 분명합니다. 실력의 기준이 **같은 성과를 더 적은 토큰으로 내는 능력**으로 옮겨 가고 있습니다. 자동차로 치면 최고 속도보다 **연비**를 따지는 시대가 된 셈입니다.

## 계산해 보기

두 사람의 결과물 품질이 같다고 가정합니다.

- 절약률 = (200만 − 60만) ÷ 200만 = **70%**
- 같은 예산이면 두 번째 사람이 약 3.3배 많은 일을 합니다 (200 ÷ 60 ≈ 3.3).

## 이 강의의 지도

1. **토큰 경제** — 돈이 어디서 새는지 보고, 재는 법
2. **채팅과 구독** — 매일 쓰는 ChatGPT·Claude에서 아끼는 습관
3. **개발자 기법** — 캐싱·배치·라우팅·코딩 에이전트 관리
4. **저렴한 모델과 경계선** — 중국 모델, 보안, 그리고 꼼수의 선

앞 강의에서 배운 프롬프트 구조는 그대로 씁니다. 여기서는 그 위에 "얼마나 적게 써서 같은 결과를 내는가"라는 기준을 하나 더 얹습니다.

> 💡 **핵심**: 토큰 효율은 무작정 덜 쓰는 기술이 아니라 **토큰당 성과를 높이는 기술**입니다.`,
          illustration: {
            type: "compare",
            title: "평가 기준의 이동",
            columns: [
              {
                title: "토큰맥싱 시대",
                icon: "trending-up",
                tone: "muted",
                items: [
                  "사용량 리더보드 경쟁",
                  "많이 쓸수록 '열심히' 보임",
                  "예산 조기 소진",
                  "성과와 사용량은 따로 놂",
                ],
              },
              {
                title: "토큰당 성과 시대",
                icon: "gauge",
                tone: "primary",
                items: [
                  "같은 결과를 적은 토큰으로",
                  "완료 작업당 비용으로 평가",
                  "과다 사용은 원인 점검",
                  "아낀 예산으로 더 많은 일",
                ],
              },
            ],
            caption: "숫자가 큰 사람이 아니라, 토큰 한 개로 더 많은 일을 끝내는 사람이 인정받습니다.",
          },
        },
        {
          slug: "how-billing-works",
          title: "과금의 구조: 입력·출력·추론 토큰",
          minutes: 5,
          content: `AI 요금 고지서를 처음 보면 "입력", "출력"이 따로 적혀 있습니다. 이 둘의 값이 몇 배나 다르다는 것을 알면 절약의 방향이 바로 보입니다.

## 세 가지 토큰

- **입력 토큰** — 내가 보낸 모든 것. 질문, 첨부 파일, 지난 대화가 다 포함됩니다.
- **출력 토큰** — AI가 써 준 답변.
- **추론 토큰** — reasoning 모델이 답하기 전에 생각하는 데 쓴 분량. 화면에 다 보이지 않아도 출력으로 과금됩니다.

## 출력이 비싼 이유

Claude의 현재 요금표에서는 모든 모델이 **출력 단가 = 입력 단가의 5배**입니다. 입력은 한꺼번에 병렬로 읽어 들일 수 있지만, 출력은 한 토큰씩 차례로 만들어야 해서 같은 장비로 처리할 수 있는 양이 훨씬 적기 때문입니다.

식당에 비유하면 이렇습니다. 주문서를 읽는 일(입력)은 금방 끝나지만, 요리를 한 접시씩 만드는 일(출력)은 시간과 재료가 많이 듭니다.

**계산해 보기**

가정: 입력 2,000토큰, 출력 1,000토큰, 출력 단가는 입력의 5배.

- 비용 단위 = 2,000×1 + 1,000×5 = **7,000** (출력이 약 71%)
- 답을 500토큰으로 줄이면 = 2,000 + 2,500 = **4,500**
- 절약률 = 2,500 ÷ 7,000 ≈ **36%**

입력을 똑같이 500토큰 줄였다면 절약은 500 ÷ 7,000 ≈ 7%에 그칩니다. **같은 양이면 출력을 줄이는 쪽이 5배 효과적**입니다.

## 한국어와 토큰

토크나이저는 영어 위주로 설계된 경우가 많아, 같은 뜻의 한국어 문장이 영어보다 토큰이 **더 많이** 나오는 경향이 있습니다. 차이가 얼마인지는 토크나이저마다 크게 달라 한마디로 말할 수 없습니다. 그러니 "한국어는 몇 배"라는 소문을 믿지 말고, 다음 레슨처럼 직접 재 보세요.

> 💡 **핵심**: 비용은 **입력 × 1 + 출력 × 5**로 생각하세요. 답이 길어질수록 돈이 빠르게 나갑니다.`,
          illustration: {
            type: "stack",
            title: "한 번의 요청에 담긴 토큰",
            layers: [
              {
                label: "출력 토큰",
                sublabel: "AI의 답변 · 입력의 5배 단가",
                icon: "file-text",
                tone: "warning",
              },
              {
                label: "추론 토큰",
                sublabel: "보이지 않는 생각 · 출력으로 과금",
                icon: "brain",
                tone: "accent",
              },
              {
                label: "입력 토큰",
                sublabel: "질문 + 첨부 + 지난 대화",
                icon: "message",
                tone: "primary",
              },
            ],
            caption: "위로 갈수록 비쌉니다 — 답변과 생각의 길이가 비용의 대부분을 차지합니다.",
          },
        },
        {
          slug: "hidden-token-costs",
          title: "보이지 않는 토큰: 매 턴 다시 보내는 것들",
          minutes: 5,
          content: `"짧게 한 줄만 물어봤는데 왜 사용량이 이렇게 많지?" 대부분은 여러분 눈에 보이지 않는 토큰 때문입니다.

## AI는 대화를 기억하지 않는다

모델은 이전 대화를 기억하지 못합니다. 그래서 채팅 앱은 새 메시지를 보낼 때마다 **지금까지의 대화 전체를 처음부터 다시 보냅니다.** 택배로 치면, 편지 한 장을 더 넣을 때마다 지금까지 쌓인 상자 전체를 다시 부치는 셈입니다.

여기에 함께 실려 가는 것들이 있습니다.

- **지난 대화 기록** — 질문과 답이 쌓일수록 매 턴 커집니다.
- **시스템 프롬프트** — 서비스나 앱이 미리 넣어 둔 지침. 매번 맨 앞에 붙습니다.
- **첨부 파일** — 한 번 올린 PDF는 대화가 끝날 때까지 매 턴 함께 읽힙니다.
- **도구 정의** — MCP나 플러그인을 켜 두면 "쓸 수 있는 도구 목록"도 입력에 들어갑니다.

## 계산해 보기

가정: 시스템 프롬프트 1,000토큰, 한 번 묻고 답할 때마다 대화가 500토큰씩 늘어남.

- 20번째 메시지의 입력 = 1,000 + 500×19 = **10,500토큰**
- 그중 새로 쓴 질문은 약 500토큰뿐
- 보이지 않는 토큰 비율 = 10,000 ÷ 10,500 ≈ **95%**

즉 긴 대화의 끝에서 보내는 한 줄짜리 질문은, 사실 **책 한 권 분량을 다시 읽히는 일**입니다.

## 그래서 무엇을 봐야 하나

- 대화가 길어질수록 같은 질문도 점점 비싸집니다.
- 쓰지 않는 파일과 도구는 켜 둔 것만으로 비용이 듭니다.
- 같은 PDF를 여러 대화에 반복해서 올리면, 대화마다 그만큼의 입력이 새로 붙습니다.
- 절약의 첫 단계는 질문을 줄이는 것이 아니라 **함께 실려 가는 짐을 줄이는 것**입니다.

> 💡 **핵심**: 내가 친 글자 수가 아니라 **매 턴 다시 실려 가는 전체 분량**이 비용입니다.`,
          illustration: {
            type: "flow",
            title: "메시지 한 줄이 실제로 보내는 것",
            nodes: [
              { label: "시스템 프롬프트", sublabel: "매번 맨 앞에", icon: "settings", tone: "muted" },
              { label: "도구 정의", sublabel: "켜 둔 MCP·플러그인 목록", icon: "wrench", tone: "muted" },
              { label: "첨부 파일", sublabel: "대화 내내 함께 읽힘", icon: "file-text", tone: "muted" },
              { label: "지난 대화 전체", sublabel: "턴마다 커짐", icon: "layers", tone: "warning" },
              { label: "새 질문 한 줄", sublabel: "실제로 친 부분", icon: "message", tone: "primary", edgeLabel: "맨 끝에 붙음" },
            ],
            caption: "보이는 건 마지막 한 줄이지만, 과금은 위의 모든 층에 붙습니다.",
          },
        },
        {
          slug: "measure-first",
          title: "측정이 먼저다: 토크나이저·대시보드·완료당 비용",
          minutes: 6,
          content: `다이어트를 시작할 때 체중계부터 사듯, 토큰 절약도 **재는 것**부터 시작합니다. 재지 않고 줄인 것은 줄었는지 알 수 없습니다.

## 세 가지 측정 도구

- **토크나이저 페이지** — 문장을 붙여 넣으면 토큰 수를 보여 줍니다. 단, 모델마다 쪼개는 방식이 달라 다른 회사 모델에는 참고용입니다.
- **공식 토큰 계산 API** — Claude는 \`count_tokens\` API로 보내기 전에 정확한 입력 토큰 수를 셉니다. 대충 맞추는 추정 라이브러리보다 이쪽을 믿으세요.
- **사용량 대시보드** — 각 회사 콘솔의 Usage 화면에서 날짜·모델별 사용량을 봅니다. Claude Code에서는 \`/usage\` 명령으로 현재 세션의 토큰과 캐시 통계를 봅니다.

## 요청당 비용이 아니라 완료당 비용

진짜 지표는 **일 하나를 끝내는 데 든 총비용**입니다. 싼 도구도 재시도가 많으면 비싸집니다.

가정: 도구 A는 요청 1번에 1, 평균 3번 시도해야 끝남. 도구 B는 요청 1번에 2, 평균 1.2번이면 끝남.

- A의 완료당 비용 = 1 × 3 = **3**
- B의 완료당 비용 = 2 × 1.2 = **2.4**
- B가 요청당 2배 비싸 보여도 완료당은 (3 − 2.4) ÷ 3 = **20% 절약**

아래 데모에서 같은 문장을 한국어와 영어로 재 보고, 대시보드를 확인하는 흐름을 따라가 보세요.

## 여기서 막힌다면

- **토큰 수가 사이트마다 다르게 나와요** → 정상입니다. 실제로 쓸 모델의 공식 도구로 다시 재세요.
- **대시보드에 오늘 사용량이 안 보여요** → 집계가 늦게 반영되기도 합니다. 시간을 두고 다시 확인하세요.
- **시도 횟수를 어떻게 세죠?** → 일주일만 "작업명 / 시도 횟수"를 메모장에 적어 보면 충분합니다.

> 💡 **핵심**: 체중계 없이는 다이어트도 없습니다. **완료당 비용**을 기준선으로 먼저 적어 두세요.`,
          illustration: {
            type: "steps",
            title: "측정 3단계",
            steps: [
              { label: "토큰 수 재기", sublabel: "토크나이저·count_tokens", icon: "search" },
              { label: "사용량 확인", sublabel: "콘솔 Usage · /usage", icon: "chart" },
              { label: "시도 횟수 기록", sublabel: "작업별 재시도 메모", icon: "clipboard" },
              { label: "완료당 비용 계산", sublabel: "요청당 비용 × 시도 횟수", icon: "receipt" },
            ],
            caption: "기준선이 있어야 다음 레슨들의 절약 효과를 숫자로 확인할 수 있습니다.",
          },
          demo: {
            title: "토크나이저로 한국어·영어 토큰 비교하기",
            app: {
              kind: "browser",
              url: "platform.openai.com/tokenizer",
              blocks: [
                { id: "b-head", type: "heading", label: "Tokenizer — 토큰 수 세기" },
                { id: "b-input", type: "input", label: "텍스트를 붙여 넣으세요…" },
                { id: "b-count", type: "button", label: "토큰 수 보기" },
                { id: "b-ko", type: "card", label: "🔢 한국어 문장 → 토큰 수 표시", hidden: true },
                { id: "b-en", type: "card", label: "🔢 영어 문장 → 토큰 수 표시", hidden: true },
                { id: "b-diff", type: "badge", label: "같은 뜻인데 한국어 쪽 토큰이 더 많음 (배율은 토크나이저마다 다름)", hidden: true },
                { id: "b-usage-head", type: "heading", label: "Usage 대시보드 (콘솔의 사용량 메뉴)", hidden: true },
                { id: "b-usage", type: "card", label: "📊 날짜·모델별 입력/출력 토큰 그래프", hidden: true },
                { id: "b-note", type: "text", label: "기준선 메모: 작업명 / 토큰 / 시도 횟수", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 토크나이저 입력창에 한국어 문장을 붙여 넣습니다" },
              { t: "move", target: "b-input" },
              { t: "click" },
              { t: "type", target: "b-input", text: "회의 자료를 세 줄로 요약해 주세요" },
              { t: "click", target: "b-count" },
              { t: "reveal", target: "b-ko" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 같은 뜻의 영어 문장으로 다시 재 봅니다" },
              { t: "hide", target: "b-input" },
              { t: "reveal", target: "b-input" },
              { t: "click", target: "b-input" },
              { t: "type", target: "b-input", text: "Summarize the meeting notes in 3 lines" },
              { t: "click", target: "b-count" },
              { t: "reveal", target: "b-en" },
              { t: "caption", text: "③ 두 결과를 비교합니다 — 숫자는 모델마다 달라요" },
              { t: "reveal", target: "b-diff" },
              { t: "move", target: "b-diff" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "④ 콘솔의 사용량 대시보드에서 실제 소비를 확인합니다" },
              { t: "reveal", target: "b-usage-head" },
              { t: "reveal", target: "b-usage" },
              { t: "move", target: "b-usage" },
              { t: "reveal", target: "b-note" },
              { t: "caption", text: "✅ 기준선 확보 — 이제 줄인 만큼 숫자로 보입니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    /* ============================== M2 ============================== */
    {
      slug: "chat-and-subscription",
      title: "채팅과 구독에서 아끼기",
      description: "매일 쓰는 ChatGPT·Claude에서 바로 쓰는 절약 습관",
      lessons: [
        {
          slug: "prompt-diet",
          title: "프롬프트 다이어트: 군더더기 빼고 형식 정하기",
          minutes: 5,
          content: `옛날 전보는 글자 수대로 돈을 냈습니다. 그래서 사람들은 "모친위독 급래" 같은 짧은 문장으로도 뜻을 정확히 전했습니다. 프롬프트도 마찬가지입니다. 다만 AI 요금에서 진짜 비싼 쪽은 **답변**입니다.

## 줄일 곳 세 군데

- **군더더기 입력** — 인사말, 같은 부탁의 반복, 쓰지 않을 배경 설명. 앞 강의의 4요소(역할·맥락·작업·형식)는 지키되, 각 요소를 한두 줄로 씁니다.
- **출력 길이와 형식** — 가장 효과가 큽니다. "3줄로", "표 5행 이내", "코드만, 설명 생략", "바뀐 부분만"처럼 **끝을 정해 주세요.** 정하지 않으면 AI는 친절하게 길게 씁니다.
- **나눠 묻기** — 같은 자료에 질문을 세 번 나눠 보내면 자료가 세 번 실려 갑니다. 한 메시지에 번호를 붙여 묶어 물으세요.

\`\`\`text
아래 회의록에 대해 세 가지를 답해 줘. 각 답은 2줄 이내.
1) 결정된 사항  2) 담당자별 할 일  3) 남은 쟁점
[회의록 붙여넣기]
\`\`\`

## 계산해 보기

가정: 출력 단가는 입력의 5배. 다이어트 전 입력 600·출력 1,500토큰, 다이어트 후 입력 400·출력 500토큰.

- 전 = 600 + 1,500×5 = **8,100**
- 후 = 400 + 500×5 = **2,900**
- 절약률 = 5,200 ÷ 8,100 ≈ **64%**

입력 200토큰을 줄인 몫은 그중 일부일 뿐이고, 대부분은 **출력 형식을 정한 덕분**입니다.

## 주의할 점

너무 짧게 깎아서 맥락이 빠지면 답이 틀리고, 결국 다시 물어야 합니다. 재질문 한 번이면 아낀 토큰이 사라집니다. 기준은 늘 **완료당 비용**입니다.

- 깎아도 되는 것: 인사말, 반복된 부탁, 이번 작업과 무관한 배경
- 깎으면 안 되는 것: 숫자·조건·예외 같은 판단 근거, 원하는 결과물의 형식
- 답을 고칠 때는 "전체 다시" 대신 "2번 항목만 고쳐 줘"처럼 범위를 좁히세요.

> 💡 **핵심**: 입력은 다듬고, **출력은 끝을 정하고**, 질문은 묶어서 보내세요.`,
          illustration: {
            type: "chat",
            title: "같은 요청, 다른 출력 길이",
            messages: [
              { role: "user", text: "이 회의록 정리해줘" },
              { role: "ai", text: "네! 회의 개요부터 말씀드리면… (배경 설명, 참석자 소개, 안건별 상세 정리가 길게 이어짐)" },
              { role: "user", text: "결정사항·할 일·쟁점을 각 2줄 이내로. 설명은 생략해 줘" },
              { role: "ai", text: "결정: 출시일 11/3 확정 / 할 일: 김-QA, 이-공지 / 쟁점: 가격 정책 미정" },
            ],
            caption: "끝을 정해 준 두 번째 요청은 출력 토큰이 크게 줄고, 읽기도 더 빠릅니다.",
          },
        },
        {
          slug: "conversation-hygiene",
          title: "대화 위생: 새 대화로 갈아타는 타이밍",
          minutes: 5,
          content: `한 대화창에서 일주일째 이것저것 묻고 있다면, 그 대화는 이미 꽤 비싸졌습니다. 앞에서 봤듯이 매 턴 지난 대화 전체가 다시 실려 가기 때문입니다.

## 갈아탈 타이밍

수업이 끝나면 칠판을 지우고 새로 쓰듯, 대화도 지울 때가 있습니다.

- **주제가 바뀔 때** — 보고서를 쓰다가 엑셀 수식을 묻는다면 새 대화로 가세요.
- **AI가 같은 실수를 반복할 때** — 틀린 시도가 쌓이면 오히려 답이 흐려집니다.
- **대화가 아주 길어졌을 때** — 서비스에 따라 오래된 내용을 자동으로 요약하거나 잊기도 합니다.

## 요약 후 이어가기

1. 현재 대화에 "지금까지 결정된 내용과 남은 할 일을 10줄로 요약해 줘"라고 요청합니다.
2. 새 대화를 열고 그 요약을 맨 위에 붙여 넣습니다.
3. 이어서 다음 질문을 합니다.

파일도 같은 원리입니다. 100쪽 PDF 전체 대신 **필요한 장이나 표만** 복사해 넣으세요.

**계산해 보기**

가정: 시스템 프롬프트 1,000토큰, 한 번 묻고 답할 때마다 500토큰씩 늘어남, 총 20번 질문.

- 한 대화로 20번: 1,000×20 + 500×(0+1+…+19) = 20,000 + 95,000 = **115,000**
- 10번씩 두 대화로: [1,000×10 + 500×(0+…+9)] × 2 = 32,500 × 2 = **65,000**
- 절약률 = 50,000 ÷ 115,000 ≈ **43%**

요약본을 붙이는 비용(수백 토큰)을 더해도 절약 폭은 거의 그대로입니다.

## 여기서 막힌다면

- **요약하면 중요한 게 빠질까 걱정돼요** → 요약 요청에 "숫자·고유명사·결정사항은 빠짐없이"를 붙이세요.
- **예전 대화를 다시 찾기 어려워요** → 대화 제목을 "프로젝트명-주제"로 바꿔 두면 검색이 쉬워집니다.

> 💡 **핵심**: 대화가 길어지면 **요약하고 새로 시작**하세요. 칠판을 지워야 새로 쓸 자리가 생깁니다.`,
          illustration: {
            type: "cycle",
            title: "대화 위생 사이클",
            center: "필요한 것만 들고 이동",
            nodes: [
              { label: "한 주제로 대화", sublabel: "질문은 묶어서", icon: "message" },
              { label: "길어짐 감지", sublabel: "주제 전환·반복 실수", icon: "alert" },
              { label: "요약 요청", sublabel: "결정·할 일 10줄", icon: "scissors" },
              { label: "새 대화 시작", sublabel: "요약만 붙여 넣기", icon: "refresh" },
            ],
            caption: "길어진 대화는 버리는 게 아니라 '요약본'으로 갈아타는 것입니다.",
          },
        },
        {
          slug: "subscription-vs-api",
          title: "구독 vs API: 언제 무엇이 이득인가",
          minutes: 6,
          content: `월 정액 구독과 쓴 만큼 내는 API, 둘 중 무엇이 싼지는 **얼마나, 어떻게 쓰는지**에 따라 정반대가 됩니다.

## 두 방식의 차이

시간제 뷔페와 단품 메뉴를 떠올려 보세요. 뷔페는 많이 먹을수록 이득이지만 이용 시간이 정해져 있고, 단품은 먹은 만큼만 냅니다.

| 구분 | 구독 (정액) | API (종량) |
|---|---|---|
| 요금 | 매달 고정 | 쓴 토큰만큼 |
| 한도 | 사용량 한도 | 레이트 리밋 |
| 맞는 사람 | 매일 꾸준히 많이 | 가끔, 또는 자동화 |
| 쓰는 방식 | 앱·웹·공식 도구 | 내 프로그램에서 호출 |

- **Claude**: 모든 요금제에 5시간 단위 사용 창이 있고, 유료 요금제에는 주간 한도도 있습니다. Pro 위로 Max(약 $100 / $200) 단계가 있습니다.
- **ChatGPT**: Plus($20)와 상위 Pro 단계가 있습니다.
- 메시지 개수 같은 세부 한도는 자주 바뀝니다. 각 서비스의 공식 안내에서 확인하세요.

## 한도를 영리하게 쓰는 법

- **창이 열리는 시점을 활용** — 무거운 작업은 사용 창 초반에 몰고, 한도가 차면 가벼운 정리 작업으로 넘어갑니다.
- **리셋 시각 확인** — 한도에 걸리면 안내 메시지에 리셋 시각이 나옵니다. 그때까지는 앞 레슨의 대화 위생으로 사용량을 아낍니다.
- **구독 계정을 API처럼 끌어다 쓰는 비공식 도구는 금지** — 이유는 마지막 레슨에서 다룹니다.

## 계산해 보기

가정: 월 구독료를 100으로 놓고, 내 한 달 사용량을 API 단가로 환산합니다.

- 환산 40인 사람 → API가 (100 − 40) ÷ 100 = **60% 절약**
- 환산 250인 사람 → 구독이 (250 − 100) ÷ 250 = **60% 절약**

같은 60%라도 방향이 반대입니다. 4강의 대시보드로 한 달 사용량을 재 보고 고르세요.

> 💡 **핵심**: 꾸준히 많이 쓰면 **구독**, 가끔 쓰거나 자동화하면 **API**. 판단 근거는 감이 아니라 측정값입니다.`,
          illustration: {
            type: "compare",
            title: "구독 vs API",
            columns: [
              {
                title: "구독 (시간제 뷔페)",
                icon: "calendar",
                tone: "primary",
                items: [
                  "매달 고정 요금",
                  "5시간 창 · 주간 한도",
                  "앱·웹·공식 도구에서 사용",
                  "매일 많이 쓰면 이득",
                ],
              },
              {
                title: "API (단품 주문)",
                icon: "receipt",
                tone: "accent",
                items: [
                  "쓴 토큰만큼 과금",
                  "레이트 리밋 적용",
                  "내 프로그램·자동화에 연결",
                  "가끔 쓰거나 대량 자동화에 이득",
                ],
              },
            ],
            caption: "어느 쪽이 싼지는 사용 패턴이 정합니다 — 한 달 사용량부터 재 보세요.",
          },
        },
        {
          slug: "free-tiers-and-credits",
          title: "무료 티어·크레딧: 정당하게 쓰는 법과 함정",
          minutes: 5,
          content: `무료 티어는 실제로 쓸 만합니다. 다만 마트 시식 코너처럼, 공짜에도 조건이 붙습니다. 그 조건 중 가장 중요한 것이 **내 데이터가 학습에 쓰이는가**입니다.

## 주요 서비스의 데이터 조건 (2026년 10월 기준)

- **Gemini API 무료 티어** — Google 약관상 무료 사용분의 입력과 출력은 제품 개선에 쓰이고, 사람 검토자가 읽을 수도 있습니다. 약관에 "민감·기밀·개인정보를 넣지 말라"고 적혀 있습니다. 유료 사용분은 개선에 쓰지 않습니다.
- **ChatGPT Free·Plus** — 설정 > 데이터 제어의 "Improve the model for everyone" 항목이 기본으로 켜져 있습니다. 끄면 새 대화는 학습에 쓰이지 않습니다.
- **Claude Free·Pro·Max** — 개인정보 설정에서 학습 사용 여부를 직접 고릅니다. 허용하면 데이터 보관 기간이 5년, 허용하지 않으면 30일입니다.

API와 기업용 요금제는 보통 기본값이 다릅니다. 회사 업무라면 회사가 계약한 경로를 쓰세요.

## 정당하게 쓰는 법

- **공개 정보 기반 작업**에 씁니다 — 공부, 초안, 번역 연습, 공개 문서 요약.
- 무료 한도와 제공 모델은 **수시로 바뀝니다**. 중요한 업무 흐름을 무료 티어에만 걸지 마세요.
- 신규 가입 크레딧이 있다면 **한 계정으로** 테스트와 측정에 씁니다.

**계산해 보기**

가정: 하루 AI 요청 중 40%가 공개 정보로 하는 초안·학습 작업.

- 이 몫을 무료 티어로 옮기면 유료 사용량 = 100 − 40 = 60
- 유료 비용 절약률 = **40%**
- 단, 회사 자료·고객 정보가 섞인 요청은 이 40%에 넣지 않습니다.

## 함정

크레딧을 더 받으려고 계정을 여러 개 만드는 것은 대부분의 약관 위반입니다. 들키면 모든 계정이 막힐 수 있습니다.

> 💡 **핵심**: 무료 티어는 **공개해도 괜찮은 일**에만. 학습 설정을 확인하는 것까지가 무료 사용법입니다.`,
          illustration: {
            type: "grid",
            title: "무료 티어 사용 전 확인할 것",
            items: [
              { label: "학습 사용 여부", sublabel: "설정에서 켜짐·꺼짐 확인", icon: "eye", tone: "warning" },
              { label: "사람 검토 가능성", sublabel: "약관의 검토자 조항", icon: "users", tone: "warning" },
              { label: "한도 변동", sublabel: "모델·횟수 수시 변경", icon: "refresh", tone: "muted" },
              { label: "공개 정보만", sublabel: "초안·학습·공개 문서", icon: "globe", tone: "success" },
              { label: "한 계정 원칙", sublabel: "다계정은 약관 위반", icon: "user", tone: "primary" },
              { label: "업무는 회사 경로", sublabel: "계약된 요금제 사용", icon: "building", tone: "accent" },
            ],
            caption: "공짜의 대가는 대개 데이터입니다 — 무엇을 넣는지가 곧 비용입니다.",
          },
        },
      ],
    },
    /* ============================== M3 ============================== */
    {
      slug: "developer-techniques",
      title: "개발자의 토큰 엔지니어링",
      description: "캐싱·배치·라우팅·코딩 에이전트로 API 비용 설계하기",
      lessons: [
        {
          slug: "prompt-caching",
          title: "프롬프트 캐싱: 90% 할인의 원리와 캐시를 깨는 실수",
          minutes: 7,
          content: `단골 카페에서 "늘 마시던 걸로요" 한마디면 주문이 끝나듯, 매번 똑같이 보내는 앞부분은 서버가 기억해 두고 싸게 처리해 줍니다. 이것이 프롬프트 캐싱입니다.

## 할인의 크기

- **Claude** — 캐시에서 읽은 토큰은 기본 입력가의 약 0.1배입니다(Opus 5.5는 0.05배). 대신 처음 저장할 때 5분 보관은 1.25배, 1시간 보관은 2배를 냅니다.
- **본전 계산** — 5분 보관이면 같은 앞부분을 2번만 써도 이득입니다(1.25 + 0.1 = 1.35 < 2). 5분 안에 다시 읽으면 보관 시간이 다시 늘어납니다.
- **OpenAI** — 1,024토큰 이상인 앞부분은 자동으로 캐싱되고, 캐시된 입력은 약 10% 가격입니다.

## 캐시를 깨는 실수

캐시는 **앞에서부터 글자 그대로 같아야** 맞습니다. 앞쪽 한 글자만 바뀌어도 그 뒤 전부가 캐시 히트에 실패합니다.

- 시스템 프롬프트에 **현재 시각**이나 요청 번호를 넣기 (가장 흔한 실수)
- 요청마다 도구 정의나 예시의 순서를 바꾸기
- 모델별 최소 길이보다 짧은 프롬프트 (오류 없이 조용히 캐싱이 안 됨)

규칙은 하나입니다. **변하지 않는 것은 앞에, 변하는 것은 뒤에.**

\`\`\`python
print(res.usage)
# cache_creation_input_tokens  → 이번에 저장한 양 (1.25배)
# cache_read_input_tokens      → 캐시에서 읽은 양 (0.1배)
\`\`\`

**계산해 보기**

가정: 10,000토큰 매뉴얼 + 200토큰 질문, 5분 안에 20번 요청, 읽기 0.1배.

- 캐싱 없음 = 10,200 × 20 = **204,000**
- 캐싱 = 첫 회 12,500 + 200, 이후 19회 × (1,000 + 200) = 12,700 + 22,800 = **35,500**
- 입력 비용 절약률 = 168,500 ÷ 204,000 ≈ **83%**

## 여기서 막힌다면

- **cache_read가 계속 0이에요** → 앞부분에 매번 바뀌는 값이 있는지, 최소 길이를 넘는지 확인하세요.
- **가끔만 히트해요** → 요청 간격이 5분을 넘는다면 1시간 보관을 검토하세요.

> 💡 **핵심**: 캐싱은 **접두사 게임**입니다. 고정된 것은 앞에, 바뀌는 것은 맨 뒤에 두세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "python ask.py — usage 비교",
            lines: [
              { text: "# 시스템 프롬프트에 현재 시각이 들어간 상태", tone: "comment" },
              { text: "python ask.py", tone: "cmd" },
              { text: "cache_read_input_tokens=0", tone: "err" },
              { text: "python ask.py", tone: "cmd" },
              { text: "cache_read_input_tokens=0   ← 시각이 바뀌어 접두사 불일치", tone: "err" },
              { text: "# 시각을 질문 쪽(맨 뒤)으로 옮긴 뒤", tone: "comment" },
              { text: "python ask.py", tone: "cmd" },
              { text: "cache_creation_input_tokens=10240", tone: "out" },
              { text: "python ask.py", tone: "cmd" },
              { text: "cache_read_input_tokens=10240  ✓ 캐시 히트", tone: "ok" },
            ],
            caption: "숫자는 예시입니다 — 바뀌는 값을 뒤로 옮기는 것만으로 cache_read가 살아납니다.",
          },
          demo: {
            title: "캐시를 깨는 현재 시각 찾아 고치기",
            app: {
              kind: "code-editor",
              windowTitle: "ask.py — 사내 매뉴얼 Q&A 봇",
              files: [
                { id: "f-ask", name: "ask.py", active: true },
                { id: "f-manual", name: "manual.md" },
                { id: "f-env", name: ".env" },
              ],
              code: [
                { id: "c1", text: "SYSTEM = [{" },
                { id: "c2", text: "\"type\": \"text\",", indent: 1 },
                { id: "c3", text: "\"text\": f\"현재 시각: {datetime.now()}\\n\" + MANUAL,", indent: 1, tone: "del" },
                { id: "c4", text: "\"text\": MANUAL,  # 매번 똑같은 앞부분", indent: 1, tone: "add", hidden: true },
                { id: "c5", text: "\"cache_control\": {\"type\": \"ephemeral\"},", indent: 1 },
                { id: "c6", text: "}]" },
                { id: "c7", text: "q = f\"[{datetime.now():%H:%M}] \" + user_input  # 바뀌는 값은 뒤로", tone: "add", hidden: true },
                { id: "c8", text: "res = client.messages.create(model=MODEL, system=SYSTEM, messages=[...])" },
                { id: "c9", text: "print(res.usage)" },
              ],
              terminal: [
                { id: "t1", text: "python ask.py", tone: "cmd", hidden: true },
                { id: "t2", text: "cache_creation_input_tokens=10240  cache_read_input_tokens=0", tone: "out", hidden: true },
                { id: "t3", text: "python ask.py", tone: "cmd", hidden: true },
                { id: "t4", text: "cache_read_input_tokens=0  ← 매번 새로 저장 중", tone: "err", hidden: true },
                { id: "t5", text: "python ask.py", tone: "cmd", hidden: true },
                { id: "t6", text: "cache_creation_input_tokens=10240 (첫 저장)", tone: "out", hidden: true },
                { id: "t7", text: "python ask.py", tone: "cmd", hidden: true },
                { id: "t8", text: "cache_read_input_tokens=10240 ✓ 캐시 히트", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 같은 질문을 두 번 실행해 usage를 확인합니다" },
              { t: "type", target: "t1", text: "python ask.py" },
              { t: "reveal", target: "t2" },
              { t: "type", target: "t3", text: "python ask.py" },
              { t: "reveal", target: "t4" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② cache_read가 0 — 앞부분에서 바뀌는 값을 찾습니다" },
              { t: "move", target: "c3" },
              { t: "dblclick", target: "c3" },
              { t: "caption", text: "③ 현재 시각을 빼고 고정된 매뉴얼만 남깁니다" },
              { t: "type", target: "c4", text: "\"text\": MANUAL," },
              { t: "caption", text: "④ 바뀌는 시각은 질문 쪽, 즉 맨 뒤로 옮깁니다" },
              { t: "move", target: "c7" },
              { t: "reveal", target: "c7" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 다시 두 번 실행합니다" },
              { t: "type", target: "t5", text: "python ask.py" },
              { t: "reveal", target: "t6" },
              { t: "type", target: "t7", text: "python ask.py" },
              { t: "reveal", target: "t8" },
              { t: "move", target: "t8" },
              { t: "caption", text: "✅ 두 번째부터 캐시 히트 — 앞부분 입력이 0.1배로" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "batch-and-off-peak",
          title: "배치 API 50%와 오프피크 할인: 기다릴 수 있는 일은 싸게",
          minutes: 6,
          content: `세탁소에 "내일 찾으러 올게요"라고 하면 급행보다 싸게 맡길 수 있습니다. AI API에도 똑같은 원리의 할인이 두 가지 있습니다.

## 배치 API: 모아서 맡기면 반값

- **Claude** — Message Batches로 요청을 묶어 보내면 모든 토큰이 50% 할인됩니다. 대부분 1시간 안에 끝나지만, 24시간 안에 끝나지 않은 요청은 만료됩니다. 프롬프트 캐싱 할인과 함께 받을 수 있습니다(배치 안의 캐시 히트는 보장되지 않음).
- **OpenAI** — Batch API가 50% 할인이고, 응답이 조금 느려도 되는 요청용 Flex 처리도 배치 수준의 할인을 줍니다.
- **맞는 일** — 밤사이 리뷰 1만 건 분류, 문서 일괄 요약, 테스트 데이터 생성, 모델 평가. 사람이 기다리는 채팅에는 맞지 않습니다.

## 오프피크: 한가한 시간에 반값

DeepSeek API는 피크 시간대에 두 배 요금을 받고, 나머지 오프피크 시간은 그 절반입니다(2026년 10월 기준). 공식 기준은 UTC인데, 한국 시간으로 바꾸면 회사 근무 시간 대부분이 피크입니다.

| 구분 | 한국 시간 (KST) |
|---|---|
| 피크 | 평일 10:00~13:00, 15:00~19:00 |
| 오프피크 | 평일 그 외 시간, 주말 전체 |

중국 공휴일은 오프피크로 칩니다. 시간대와 단가는 바뀔 수 있으니 쓰기 전에 api-docs.deepseek.com 요금 페이지를 확인하세요.

**계산해 보기**

가정: 하루 API 작업 중 60%가 몇 시간 기다려도 되는 일이고, 그 몫에 50% 할인을 적용.

- 새 비용 = 40 + 60 × 0.5 = **70**
- 절약률 = **30%**
- 여기에 캐싱까지 더하면 할인은 곱해져 더 커집니다.

## 실무 팁

급한 일과 기다려도 되는 일을 **큐(대기열)** 두 개로 나누세요. 기다려도 되는 큐는 배치로 보내거나 오프피크 시간에 돌리면 됩니다.

> 💡 **핵심**: "지금 당장"이 아니어도 되는 일은 **배치나 오프피크**로 보내세요. 기다림이 곧 할인입니다.`,
          illustration: {
            type: "grid",
            title: "기다림을 할인으로 바꾸는 방법",
            items: [
              { label: "Claude Message Batches", sublabel: "50% · 대부분 1시간 내", icon: "boxes", tone: "primary" },
              { label: "OpenAI Batch", sublabel: "50% 할인", icon: "package", tone: "primary" },
              { label: "OpenAI Flex", sublabel: "느린 응답 · 배치 수준 할인", icon: "hourglass", tone: "accent" },
              { label: "DeepSeek 오프피크", sublabel: "피크의 절반 · KST 저녁·주말", icon: "clock", tone: "accent" },
              { label: "캐싱과 중첩", sublabel: "할인끼리 곱해짐", icon: "layers", tone: "success" },
              { label: "실시간 채팅", sublabel: "배치에 부적합", icon: "x", tone: "muted" },
            ],
            caption: "급한 큐와 기다리는 큐를 나누는 것만으로 할인을 받을 자리가 생깁니다.",
          },
        },
        {
          slug: "model-routing-and-effort",
          title: "모델 라우팅과 effort: 완료당 비용으로 판단하기",
          minutes: 6,
          content: `감기는 동네 의원에서, 큰 수술은 대학병원에서 받습니다. 모델 라우팅도 같은 발상입니다. 하지만 잘못 보내 다시 진료받게 되면 오히려 더 비쌉니다.

## Anthropic이 권하는 순서

Anthropic의 비용 최적화 가이드는 **공짜로 얻는 이득부터** 챙기라고 권합니다.

1. 품질 손해 없는 것: 캐싱 → 입력 정리 → 에이전트 루프 정리 → 출력 정리 → 배치
2. 품질과 맞바꾸는 것: effort 낮추기, 토큰 예산 걸기
3. 마지막: 모델 교체

**effort**는 모델이 얼마나 깊이 생각할지 정하는 설정(low~max)입니다. 낮출수록 추론 토큰이 줄어듭니다.

## 모델을 섞기 전에 알아야 할 것

- **캐시가 모델별로 따로** 쌓입니다. 모델을 오가면 앞 레슨의 캐시 할인을 잃습니다.
- 싼 모델이 실패해서 비싼 모델로 다시 돌리면 **두 번 낸 셈**입니다.
- 그래서 먼저 **"좋은 모델 + 낮은 effort"** 조합을 측정해 보라고 권합니다. 모델 교체는 그다음입니다.

**계산해 보기**

가정: 요청의 70%가 쉬운 일. 작은 모델은 큰 모델의 절반 가격(예: Haiku 4.5와 Sonnet 5.5). 전부 큰 모델로 처리하면 100.

- 라우팅 = 30 + 70 × 0.5 = **65** → 35% 절약
- 그런데 작은 모델로 보낸 일의 20%가 실패해 큰 모델로 다시 돌린다면: 65 + 70 × 0.2 × 1 = **79**
- 실제 절약률 = **21%** (35%가 아님)

실패율이 더 높으면 절약이 0이 되거나 손해가 납니다. 그래서 판단 기준은 요청당 가격이 아니라 **완료당 비용**입니다.

## 실무 순서

1. 지금 쓰는 모델로 effort만 낮춰서 품질과 비용을 잽니다.
2. 쉬운 작업 묶음(분류·추출 등)에서만 작은 모델을 시험합니다.
3. 재시도율까지 넣어 완료당 비용이 실제로 내려갔는지 확인합니다.

> 💡 **핵심**: 라우팅의 성패는 **재시도율**이 결정합니다. 모델을 바꾸기 전에 effort부터 낮춰 보세요.`,
          illustration: {
            type: "flow",
            title: "비용 최적화 순서",
            nodes: [
              { label: "공짜 이득", sublabel: "캐싱·입력·루프·출력 정리·배치", icon: "check", tone: "success" },
              { label: "품질과 맞바꾸기", sublabel: "effort 낮추기 · 토큰 예산", icon: "gauge", tone: "accent", edgeLabel: "그래도 부족하면" },
              { label: "모델 교체·라우팅", sublabel: "쉬운 일만 작은 모델로", icon: "route", tone: "warning", edgeLabel: "마지막 수단" },
              { label: "완료당 비용 재측정", sublabel: "재시도율까지 포함", icon: "chart", tone: "primary" },
            ],
            loopBack: { from: 3, to: 1, label: "비용이 오히려 늘면 되돌리기" },
            caption: "모델 교체는 마지막 — 재측정 결과가 나쁘면 한 단계 뒤로 돌아갑니다.",
          },
        },
        {
          slug: "coding-agent-savings",
          title: "코딩 에이전트 절약법: /clear·/compact·CLAUDE.md 다이어트",
          minutes: 7,
          content: `코딩 에이전트는 파일 내용과 도구 결과를 매 턴 함께 보내서, 디버깅 한 번에 채팅 하루치를 쓰기도 합니다. Claude Code 공식 문서의 절약법을 정리합니다.

## 컨텍스트 확인과 정리

- \`/context\` — 컨텍스트 윈도우를 무엇이 차지하는지 봅니다.
- \`/usage\` — 세션 토큰과 캐시 통계를 봅니다.
- \`/clear\` — 다른 작업으로 넘어갈 때 새로 시작합니다. 비용 0입니다.
- \`/compact\` — 대화를 요약해 압축합니다. 뒤에 남길 내용을 지시할 수 있습니다. 요약 자체가 큰 요청이라, 이어갈 일이 없으면 \`/clear\`가 낫습니다.

## 짐 줄이기

등산 배낭에서 안 쓸 장비를 빼듯, 처음부터 실리는 짐을 줄입니다.

- **CLAUDE.md는 200줄 이하** — 세션마다 통째로 실립니다. 특정 작업 지침은 필요할 때만 불러오는 skills로 옮깁니다.
- **서브에이전트에 위임** — 출력이 긴 테스트 실행 등은 서브에이전트가 처리하고 요약만 받습니다. 작은 모델도 지정 가능합니다.
- **hooks로 전처리** — 긴 로그 대신 에러 줄만 걸러 넘깁니다.
- **도구 정리** — \`/mcp\`로 안 쓰는 서버를 끄고, CLI 도구를 우선합니다.
- **모델·생각 깊이** — \`/model\`과 \`/effort\`로 일에 맞게 고릅니다.

**계산해 보기**

가정: 작업 A의 기록 40,000토큰을 남긴 채 작업 B를 10턴 진행, B 자체 컨텍스트는 평균 10,000토큰.

- 그대로 진행 = 50,000 × 10 = **500,000**
- \`/clear\` 후 진행 = 10,000 × 10 = **100,000**
- 처리 입력 절약률 = **80%** (캐시 읽기도 사용량에 잡힘)

## 여기서 막힌다면

- **/compact 후 맥락을 잃었어요** → 압축 지시에 남길 것을 적거나, CLAUDE.md에 압축 지침을 넣으세요.
- **쉬고 온 뒤 첫 메시지가 비싸요** → 캐시 수명(구독 1시간, API 키는 기본 5분)이 지나 전체를 다시 처리한 것입니다.

> 💡 **핵심**: 작업이 바뀌면 \`/clear\`, 이어가야 하면 \`/compact\`. 매번 실리는 CLAUDE.md는 **200줄 안으로** 줄이세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "claude — 컨텍스트 관리",
            lines: [
              { text: "/context", tone: "cmd" },
              { text: "Messages 큰 비중 · Memory files · MCP tools · Free space 적음", tone: "out" },
              { text: "# 같은 작업을 이어가야 하니 요약 압축", tone: "comment" },
              { text: "/compact 테스트 결과와 변경 파일 위주로", tone: "cmd" },
              { text: "대화가 요약으로 압축되었습니다", tone: "ok" },
              { text: "/context", tone: "cmd" },
              { text: "Messages 비중 감소 · Free space 회복", tone: "ok" },
              { text: "# 다른 작업으로 넘어갈 땐 /clear (비용 0)", tone: "comment" },
            ],
            caption: "출력 형태는 단순화한 예시입니다 — 실제 화면에서는 항목별 점유량이 표시됩니다.",
          },
          demo: {
            title: "Claude Code에서 컨텍스트 확인 → 압축 → 재확인",
            app: {
              kind: "code-editor",
              windowTitle: "CLAUDE.md — my-shop (Claude Code 세션)",
              files: [
                { id: "f-claude", name: "CLAUDE.md", active: true },
                { id: "f-skill", name: ".claude/skills/pr-review/SKILL.md" },
                { id: "f-src", name: "src/cart.ts" },
              ],
              code: [
                { id: "c1", text: "# my-shop 프로젝트 규칙" },
                { id: "c2", text: "- 테스트: npm test / 타입체크: npx tsc --noEmit" },
                { id: "c3", text: "## PR 리뷰 절차 (180줄…)", tone: "del" },
                { id: "c4", text: "→ PR 리뷰 절차는 skills/pr-review로 이동", tone: "add", hidden: true },
                { id: "c5", text: "# Compact instructions" },
                { id: "c6", text: "압축 시 테스트 결과와 변경 파일을 남길 것", tone: "comment" },
              ],
              terminal: [
                { id: "t1", text: "/context", tone: "cmd", hidden: true },
                { id: "t2", text: "Messages ███████ 큰 비중 · Free space 적음", tone: "out", hidden: true },
                { id: "t3", text: "/compact 테스트 결과와 변경 파일 위주로", tone: "cmd", hidden: true },
                { id: "t4", text: "✓ 대화를 요약으로 압축했습니다", tone: "ok", hidden: true },
                { id: "t5", text: "/context", tone: "cmd", hidden: true },
                { id: "t6", text: "Messages █ 비중 감소 · Free space 회복", tone: "ok", hidden: true },
                { id: "t7", text: "/usage", tone: "cmd", hidden: true },
                { id: "t8", text: "Prompt cache (main): 캐시 사용 비율 표시", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① /context로 컨텍스트를 무엇이 차지하는지 봅니다" },
              { t: "type", target: "t1", text: "/context" },
              { t: "reveal", target: "t2" },
              { t: "move", target: "t2" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 같은 작업을 이어가야 하니 /compact로 압축합니다" },
              { t: "type", target: "t3", text: "/compact 테스트 결과와 변경 파일 위주로" },
              { t: "reveal", target: "t4" },
              { t: "caption", text: "③ 다시 /context — 대화 비중이 줄었습니다" },
              { t: "type", target: "t5", text: "/context" },
              { t: "reveal", target: "t6" },
              { t: "move", target: "t6" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 매번 실리는 CLAUDE.md의 긴 절차를 skills로 옮깁니다" },
              { t: "move", target: "c3" },
              { t: "dblclick", target: "c3" },
              { t: "type", target: "c4", text: "→ PR 리뷰 절차는 skills/pr-review로 이동" },
              { t: "caption", text: "⑤ /usage로 세션 사용량과 캐시 통계를 확인합니다" },
              { t: "type", target: "t7", text: "/usage" },
              { t: "reveal", target: "t8" },
              { t: "caption", text: "✅ 확인 → 압축 → 짐 줄이기 — 매 턴이 가벼워집니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "context-and-output-diet",
          title: "컨텍스트·출력 다이어트: 필요한 부분만 넣고 받기",
          minutes: 6,
          content: `도서관 사서에게 질문하면 책 백 권을 통째로 건네지 않고, 필요한 쪽만 복사해 줍니다. AI 앱을 만들 때도 모델에게 그렇게 건네야 합니다.

## 입력 다이어트: 필요한 부분만

- **RAG로 골라 넣기** — 300쪽 매뉴얼 전체를 매번 넣지 말고, 질문과 관련된 조각 몇 개만 검색해서 넣습니다. 앞 강의에서 배운 청킹과 검색 품질이 곧 비용 절감으로 이어집니다.
- **도구 결과 줄이기** — API 응답 JSON 전체 대신 필요한 필드만, 로그 1만 줄 대신 에러 줄만, 목록은 페이지 단위로 돌려줍니다.
- **오래된 도구 결과 지우기** — 긴 에이전트 루프에서는 이미 쓴 검색 결과를 요약하거나 빼서 컨텍스트를 가볍게 유지합니다.

\`\`\`python
def search_orders(q):
    rows = db.search(q)
    # 전체 레코드 대신 판단에 필요한 필드만, 최대 10건
    return [{"id": r.id, "status": r.status} for r in rows[:10]]
\`\`\`

## 출력 다이어트: 필요한 만큼만

- **최대 출력 길이 지정** — API의 \`max_tokens\`로 상한을 겁니다. 너무 낮으면 답이 중간에 끊기니 여유를 두세요.
- **구조화된 출력** — 필요한 필드만 담은 JSON 형식을 정해 주면 장황한 설명이 사라집니다.
- **바뀐 부분만** — 코드 수정은 파일 전체가 아니라 변경된 부분(diff)만 받습니다.

## 계산해 보기

가정: 매뉴얼 전체 50,000토큰을 넣던 것을, 관련 조각 5개(각 500토큰)만 넣도록 변경.

- 전 = **50,000토큰**, 후 = 5 × 500 = **2,500토큰**
- 입력 절약률 = 47,500 ÷ 50,000 = **95%**
- 덤으로 관련 없는 내용이 줄어 답의 정확도도 오르는 경우가 많습니다.

단, 검색이 엉뚱한 조각을 가져오면 답이 틀리고 재질문이 늘어납니다. 조각 수를 줄이기 전에 검색이 정답 조각을 찾아오는지부터 확인하세요. 아낀 입력보다 재시도 비용이 커지면 의미가 없습니다.

> 💡 **핵심**: 모델에게는 **판단에 필요한 만큼만** 주고, 받을 때도 **쓸 만큼만** 받으세요.`,
          illustration: {
            type: "stack",
            title: "컨텍스트 다이어트 3층",
            layers: [
              { label: "출력", sublabel: "max_tokens · JSON 형식 · diff만", icon: "file-text", tone: "warning" },
              { label: "도구 결과", sublabel: "필요 필드만 · 에러 줄만 · 페이지 단위", icon: "filter", tone: "accent" },
              { label: "참고 자료", sublabel: "RAG로 관련 조각만 검색", icon: "search", tone: "primary" },
              { label: "고정 지침", sublabel: "짧게 유지 · 캐싱 대상", icon: "lock", tone: "muted" },
            ],
            caption: "각 층에서 '판단에 필요한 만큼만' 남기면 입력과 출력이 함께 줄어듭니다.",
          },
        },
      ],
    },
    /* ============================== M4 ============================== */
    {
      slug: "cheap-models-and-boundaries",
      title: "저렴한 모델과 경계선",
      description: "중국 모델·로컬 LLM을 안전하게 고르고, 꼼수의 선을 긋기",
      lessons: [
        {
          slug: "chinese-ai-models",
          title: "중국 AI 활용: 가격대·강점·쓰는 경로",
          minutes: 6,
          content: `같은 작업을 수 분의 1 가격에 처리할 수 있다면 눈길이 갈 수밖에 없습니다. 중국 AI 모델은 2026년 현재 가격 대비 성능으로 가장 주목받는 선택지 중 하나입니다.

## 주요 모델 계열

- **DeepSeek**(DeepSeek), **Qwen**(알리바바), **Kimi**(Moonshot AI), **GLM**(Zhipu AI), **MiniMax**(MiniMax)
- 2026년 중반 비교 사이트들을 보면, 상당수가 서구 플래그십 모델보다 입력 단가가 **대략 수 분의 1에서 수십 분의 1** 수준입니다. 정확한 단가는 사이트와 버전마다 달라 공식 요금 페이지에서 확인해야 합니다.
- 코딩·에이전트 작업에서도 상위권 성적을 내는 버전이 많고, 상당수가 **오픈웨이트**로 공개되어 있습니다.

## 쓰는 경로는 세 가지

해외 직구를 떠올려 보세요. 같은 물건도 판매처와 배송 경로에 따라 위험이 다릅니다.

| 경로 | 장점 | 확인할 것 |
|---|---|---|
| 개발사 공식 API·앱 | 최신 모델, 최저가 | 데이터가 저장되는 국가와 약관 |
| OpenRouter 등 중개 | 키 하나로 비교·교체 | 실제로 처리하는 업체 |
| 해외 호스팅 업체 | 미국·유럽 서버에서 실행 | 업체 약관, 단가 차이 |
| 로컬 실행 | 데이터가 밖으로 안 나감 | 장비 성능과 관리 |

오픈웨이트 모델은 Together AI, Fireworks 같은 미국 호스팅 업체에서도 돌릴 수 있고, 장비가 되면 내 컴퓨터에서도 돌릴 수 있습니다. 같은 모델이라도 **어느 경로로 쓰느냐에 따라 위험이 완전히 달라진다**는 점이 핵심입니다.

## 계산해 보기

가정: 같은 작업에서 저렴한 모델의 단가가 기존 모델의 1/10, 대신 재시도가 늘어 평균 시도 횟수가 1.5배.

- 새 비용 = 0.1 × 1.5 = 기존의 **0.15**
- 절약률 = **85%**
- 단, 시도 횟수가 10배를 넘으면 오히려 손해입니다. 완료당 비용으로 꼭 다시 재세요.

> 💡 **핵심**: 중국 모델은 **가격**으로 고르고 **경로**로 지킵니다. 다음 레슨의 체크리스트를 통과한 뒤에 쓰세요.`,
          illustration: {
            type: "compare",
            title: "같은 모델, 세 가지 경로",
            columns: [
              {
                title: "공식 API·앱",
                icon: "globe",
                tone: "warning",
                items: ["가장 싸고 최신", "데이터 저장 국가 확인 필수", "사내 정책상 금지일 수 있음"],
              },
              {
                title: "중개·해외 호스팅",
                icon: "cloud",
                tone: "accent",
                items: ["OpenRouter·미국 호스팅", "처리 업체·약관 확인", "모델 비교·교체가 쉬움"],
              },
              {
                title: "로컬 실행",
                icon: "hard-drive",
                tone: "success",
                items: ["오픈웨이트를 내 장비에서", "데이터가 밖으로 안 나감", "장비·전기·관리 비용"],
              },
            ],
            caption: "모델이 같아도 데이터가 어디로 가는지는 경로가 정합니다.",
          },
        },
        {
          slug: "security-and-compliance",
          title: "쓰기 전 체크리스트: 데이터 주권과 대안",
          minutes: 6,
          content: `싼 모델을 찾았다고 바로 회사 자료를 넣으면 안 됩니다. 2025년 한국에서 실제로 벌어진 일이 그 이유를 보여 줍니다.

## 2025년 2월, 딥시크 차단 사례

- 국방부·외교부·산업통상자원부 등 여러 정부 부처가 업무용 PC에서 딥시크 접속을 막거나 사용 자제를 당부했습니다.
- 카카오는 업무 목적 사용을 지양한다고 공지했고, LG유플러스는 사용을 금지했습니다. 개인정보보호위원회도 딥시크 측에 질의했습니다.
- 사용자 데이터가 중국 서버에 저장되고 분쟁 시 중국 법이 적용된다는 약관 조항이 주된 우려였습니다.

은행 금고에 비유하면, 금고가 튼튼한지만큼 **그 금고가 어느 나라에 있는지**가 중요하다는 뜻입니다. 이것이 데이터 주권입니다.

## 위험은 '모델'이 아니라 '경로'에 따라 다르다

- **앱·웹 서비스에 직접 입력** → 입력한 내용이 그 회사 서버로 갑니다. 위 사례가 문제 삼은 것이 바로 이 경로입니다.
- **오픈웨이트를 해외 호스팅이나 로컬에서 실행** → 데이터가 개발사로 가지 않습니다. 다만 모델 라이선스와 출력 품질은 따로 점검해야 합니다.

## 쓰기 전 체크리스트

1. 넣을 데이터가 공개 정보인가, 사내 기밀·개인정보인가?
2. 회사 보안 정책에 허용된 서비스인가? (가장 먼저, 반드시 확인)
3. 서버 위치, 적용 법률, 학습 사용 여부가 약관에 어떻게 적혀 있나?
4. 민감한 일은 로컬 LLM이나 회사가 계약한 경로로 대체할 수 있나?

로컬 대안으로는 Ollama 같은 도구로 양자화된 오픈웨이트 모델을 내 컴퓨터에서 돌릴 수 있습니다.

**계산해 보기**

가정: 전체 작업의 30%가 민감 데이터라 로컬 LLM으로 옮김.

- API 토큰 비용 = 100 − 30 = 70 → **30% 절약**
- 대신 장비·전기·관리 비용이 새로 생깁니다. 이 비용이 아낀 30%보다 크면 보안을 위한 지출로 보고 판단하세요.

> 💡 **핵심**: 싼 모델을 쓰기 전 질문은 하나입니다. **"이 데이터가 어디로 가는가?"** 답이 불분명하면 넣지 마세요.`,
          illustration: {
            type: "steps",
            title: "저렴한 모델 도입 체크리스트",
            steps: [
              { label: "데이터 분류", sublabel: "공개 / 기밀 / 개인정보", icon: "filter" },
              { label: "사내 정책 확인", sublabel: "허용된 서비스인가", icon: "shield" },
              { label: "약관 확인", sublabel: "서버 위치·준거법·학습 사용", icon: "scroll-text" },
              { label: "경로 선택", sublabel: "공식 API / 해외 호스팅 / 로컬", icon: "route" },
              { label: "대안 준비", sublabel: "민감 작업은 로컬 LLM", icon: "hard-drive" },
            ],
            caption: "2번(사내 정책)에서 막히면 그 뒤는 볼 필요가 없습니다.",
          },
        },
        {
          slug: "smart-hacks-vs-violations",
          title: "꼼수의 경계선: 영리한 최적화 vs 약관 위반",
          minutes: 6,
          content: `"토큰을 아끼는 꼼수"라는 말에는 두 가지가 섞여 있습니다. 하나는 실력이고, 다른 하나는 계정 정지로 가는 지름길입니다.

## 적극적으로 쓸 영리한 최적화

- 프롬프트 캐싱, 배치 API, 오프피크 시간 활용
- 모델 라우팅과 effort 조절, 완료당 비용 측정
- 무료 티어를 약관대로 한 계정으로 사용
- 오픈웨이트 모델을 로컬이나 해외 호스팅에서 실행
- 대화 위생과 컨텍스트 다이어트, 구독 한도의 리셋 주기 활용

## 하면 안 되는 것 — 그리고 그 이유

아래 행동은 방법이 아니라 **결과**만 알아 두면 됩니다.

- **계정 공유·판매, 무료 체험용 다계정 생성** → 대부분의 약관 위반입니다. 연결된 계정까지 함께 정지될 수 있습니다.
- **구독 계정을 API처럼 쓰는 비공식 프록시·리셀러** → 약관 위반으로 계정이 막힐 수 있고, 내 대화와 로그인 정보가 제3자 서버를 거칩니다.
- **남의 API 키 사용, 레이트 리밋 회피용 우회** → 계정 정지는 물론, 무단 사용으로 법적 책임이 생길 수 있습니다.
- **회사 기밀을 개인 무료 계정에 입력** → 회사 보안 규정 위반입니다. 징계나 손해배상으로 이어질 수 있습니다.

같은 "절약"이라도 하나는 평가에서 점수가 되고, 다른 하나는 사고 보고서에 오릅니다. **이 둘을 가려내는 판단 자체가 평가받는 실력**입니다.

## 나만의 토큰 예산표

\`\`\`text
월 예산: 100   |  측정 기준: 완료 작업당 비용
1) 캐싱 적용      → -30%  (100 → 70)
2) 대화·컨텍스트 정리 → -20%  (70 → 56)
3) 절반을 배치로    → -25%  (56 → 42)
\`\`\`

순서대로 적용하면 100 × 0.7 × 0.8 × 0.75 = **42**, 총 **58% 절약**입니다. 할인은 더하는 게 아니라 곱해집니다(30+20+25=75%가 아님). 여러분의 측정값을 넣어 다시 계산해 보세요.

**다음 단계** — 아낀 토큰으로 무엇을 할까요? AI가 스스로 계획하고 검증하는 루프를 설계하는 **"루프 엔지니어링: 에이전틱 워크플로우 설계"** 강의로 이어가세요.

> 💡 **핵심**: 약관 안에서는 **최대한 영리하게**, 약관 밖으로는 **한 걸음도** 나가지 마세요.`,
          illustration: {
            type: "cycle",
            title: "토큰 예산 운영 사이클",
            center: "약관 안에서 반복",
            nodes: [
              { label: "측정", sublabel: "완료당 비용 기준선", icon: "chart" },
              { label: "공짜 이득 적용", sublabel: "캐싱·정리·배치", icon: "check" },
              { label: "레버 조정", sublabel: "effort·라우팅", icon: "gauge" },
              { label: "경계 점검", sublabel: "약관·사내 정책", icon: "shield" },
              { label: "재측정", sublabel: "예산표 갱신", icon: "refresh" },
            ],
            caption: "절약은 한 번의 꼼수가 아니라, 경계선 안에서 도는 측정 루프입니다.",
          },
        },
      ],
    },
  ],
};
