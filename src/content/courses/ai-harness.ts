import type { Course } from "../types";

/**
 * AI 하네스 구축 — LLM 앱의 품질을 '감'이 아니라 '측정'으로 관리하는 법.
 * 스타일은 loop-engineering.ts(품질 기준)를 따릅니다.
 */
export const aiHarness: Course = {
  slug: "ai-harness",
  title: "AI 하네스 구축: LLM 평가와 테스트 프레임워크",
  subtitle: "이벨(Evals)과 테스트 하네스로 LLM 앱 품질을 측정하고 개선하는 법",
  description:
    "프롬프트를 바꿨는데 좋아졌는지 나빠졌는지 아무도 모른다면, 그 팀은 감으로 개발하고 있는 것입니다. 이 강의에서는 골든 데이터셋과 채점기(정확 일치·코드 채점·LLM-as-Judge)로 이벨(Evals)을 설계하고, promptfoo 스타일 하네스를 CI에 연결해 회귀를 자동으로 잡아냅니다. 나아가 프로덕션 실패 사례를 다시 이벨로 환류시키는 개선 루프와 A/B 테스트까지 — 2026년 LLM 품질 관리의 전 과정을 다이어그램과 함께 익힙니다.",
  category: "dev",
  level: "advanced",
  tags: ["Evals", "LLM Testing", "LLM-as-Judge", "프롬프트 버전 관리", "CI/CD"],
  gradient: ["#0ea5e9", "#6366f1"],
  icon: "test-tube",
  outcomes: [
    "바이브 체크를 대체하는 골든 데이터셋과 이벨(Evals)을 설계할 수 있다",
    "정확 일치·코드 채점·LLM-as-Judge 등 채점 방식을 작업 특성에 맞게 고를 수 있다",
    "promptfoo 스타일 하네스를 CI에 연결해 프롬프트 회귀를 자동으로 잡을 수 있다",
    "프로덕션 실패 사례를 이벨로 환류시키는 지속 개선 루프를 운영할 수 있다",
  ],
  modules: [
    {
      slug: "evals-foundations",
      title: "이벨(Evals)의 기초",
      description: "바이브 체크의 한계, 골든 데이터셋, 채점 방식 3종",
      lessons: [
        {
          slug: "why-harness",
          title: "왜 하네스인가: 바이브 체크의 한계",
          minutes: 4,
          content: `"프롬프트를 고쳤더니 더 좋아진 것 같아요" — 이 문장이 팀 채팅에 올라오는 순간, 여러분에게는 하네스가 필요합니다. "좋아진 것 같다"는 느낌만으로는 아무것도 증명할 수 없기 때문입니다.

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

> 💡 **핵심**: 바이브 체크는 폐기물이 아니라 출발점입니다 — 감으로 발견한 기준을 **하네스에 옮겨 적는 순간** 품질 관리가 시작됩니다.`,
          illustration: {
            type: "compare",
            title: "바이브 체크 vs 이벨 하네스",
            columns: [
              {
                title: "바이브 체크",
                icon: "eye",
                tone: "muted",
                items: [
                  "떠오른 예시 3~4개로 판단",
                  "케이스 B의 회귀를 놓침",
                  "\"좋아 보였다\"는 기억뿐",
                  "논쟁으로 의사결정",
                ],
              },
              {
                title: "이벨 하네스",
                icon: "test-tube",
                tone: "primary",
                items: [
                  "대표 케이스 수백 개 일괄 실행",
                  "전체 점수로 회귀 즉시 감지",
                  "언제든 같은 기준으로 재측정",
                  "숫자로 의사결정",
                ],
              },
            ],
            caption: "같은 프롬프트 변경도 하네스가 있으면 '실험'이 되고, 없으면 '도박'이 됩니다.",
          },
        },
        {
          slug: "golden-dataset",
          title: "골든 데이터셋 만들기",
          minutes: 5,
          content: `이벨의 품질은 채점기가 아니라 **데이터셋**이 결정합니다. 시험이 공정하려면 채점 방식보다 먼저 문제가 좋아야 하는 것과 같습니다. 대표성 없는 100문항보다 잘 고른 30문항이 낫습니다. '골든(golden)'이라는 이름은 "정답이 확정된 기준 데이터"라는 뜻입니다.

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

> 💡 **핵심**: 골든 데이터셋은 한 번 만들고 끝나는 산출물이 아니라 **실패할 때마다 자라는 살아있는 자산**입니다.`,
          illustration: {
            type: "steps",
            title: "골든 데이터셋 구축 절차",
            steps: [
              {
                label: "실사용 로그 발굴",
                sublabel: "실제 입력에서 대표 케이스 추출",
                icon: "search",
              },
              {
                label: "실패·엣지 케이스 수록",
                sublabel: "버그 리포트, 경계 조건, 인젝션",
                icon: "alert",
              },
              {
                label: "기대 결과·채점 기준 작성",
                sublabel: "input · expected · assertion",
                icon: "clipboard",
              },
              {
                label: "검수 후 버전 관리",
                sublabel: "20~50개로 시작, git에 커밋",
                icon: "git-branch",
              },
            ],
            caption: "완벽한 100개를 기다리지 말고, 대표적인 30개로 오늘 시작하세요.",
          },
        },
        {
          slug: "grading-methods",
          title: "채점 방식 3종: 정확 일치·코드 채점·LLM-as-Judge",
          minutes: 6,
          content: `출력을 어떻게 채점할지 정하는 일이 이벨 설계의 절반입니다. 2026년 실무에서 쓰는 채점기는 크게 세 계열이고, 각각 쓰임새가 다릅니다.

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

> 💡 **핵심**: 채점기는 섞어 씁니다 — 형식은 코드로, 품질은 Judge로. 한 케이스에 assertion(채점 기준)이 여러 개 달리는 것이 정상입니다.`,
          illustration: {
            type: "grid",
            title: "채점 방식 3종 비교",
            items: [
              {
                label: "정확 일치",
                sublabel: "분류·JSON 값 · 공짜·결정적",
                icon: "check",
                tone: "success",
              },
              {
                label: "코드 채점",
                sublabel: "스키마·실행 검증 · 결정적",
                icon: "code",
                tone: "primary",
              },
              {
                label: "LLM-as-Judge",
                sublabel: "톤·충실성 · 유연하지만 비쌈",
                icon: "brain",
                tone: "accent",
              },
              {
                label: "사람 평가",
                sublabel: "최종 보정 · Judge 검증용",
                icon: "user",
                tone: "warning",
              },
            ],
            caption: "왼쪽 위(싸고 결정적)부터 소진하고, 남는 것만 오른쪽(비싸고 유연)으로 보냅니다.",
          },
        },
      ],
    },
    {
      slug: "building-harness",
      title: "테스트 하네스 구축",
      description: "promptfoo 세팅, Judge 설계, 프롬프트 버전 관리, CI 연동",
      lessons: [
        {
          slug: "harness-setup",
          title: "실습: promptfoo로 하네스 세팅하기",
          minutes: 6,
          content: `이론은 충분합니다. 이번에는 promptfoo라는 오픈소스 도구로 10분 만에 첫 하네스를 직접 세워 봅니다.

## 하네스의 3요소를 파일 하나에

promptfoo는 설정 파일 하나에 이벨의 3요소를 선언합니다. 파일 형식은 YAML입니다(들여쓰기로 구조를 표현하는, 사람이 읽기 쉬운 설정 파일 형식).

- **prompts**: 테스트할 프롬프트 (파일 경로를 적거나 직접 써넣음)
- **providers**: 실행할 모델 (여러 개 적으면 자동으로 나란히 비교)
- **tests**: 골든 데이터셋 — 입력 변수와 assertion(채점 기준) 목록

\`\`\`yaml
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
\`\`\`

## 실행과 리포트

터미널을 열고 프로젝트 폴더에서 아래 명령을 입력하세요.

- \`npx promptfoo eval\` — 전체 케이스를 실행하고 터미널에 합격률을 출력합니다.
- \`npx promptfoo view\` — 케이스별 출력과 점수를 브라우저 화면에서 나란히 비교합니다.

## 첫 실행에서 볼 것

합격률 숫자 자체보다 **실패한 케이스의 출력**을 직접 읽으세요. 채점 기준이 너무 빡빡하거나 헐거운 곳이 반드시 발견됩니다. 그것을 고치는 과정이 곧 이벨 튜닝입니다.

> 💡 **핵심**: 하네스 세팅의 완성 기준은 "명령 한 줄로 전체 데이터셋이 돌고 합격률이 나오는가"입니다. 그 한 줄이 이후 모든 자동화의 기반이 됩니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "promptfoo — 첫 이벨 실행",
            lines: [
              { text: "npx promptfoo eval", tone: "cmd" },
              { text: "Running 42 test cases across 1 provider...", tone: "dim" },
              { text: "✓ [contains] 환불은 며칠 걸리나요?", tone: "ok" },
              { text: "✓ [llm-rubric] 배송 조회 방법 알려줘", tone: "ok" },
              { text: "✕ [contains] 해외 배송도 되나요?", tone: "err" },
              { text: "  expected \"관세\" in output", tone: "dim" },
              { text: "─────────────────────────────", tone: "dim" },
              { text: "Pass rate: 36/42 (85.7%)", tone: "out" },
              { text: "npx promptfoo view  # 웹 UI로 실패 케이스 확인", tone: "comment" },
            ],
            caption: "명령 한 줄 = 데이터셋 전체 실행 + 자동 채점 + 합격률. 이것이 하네스입니다.",
          },
          demo: {
            title: "promptfoo로 첫 이벨 실행 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "promptfooconfig.yaml — 이벨 하네스",
              files: [
                { id: "f-config", name: "promptfooconfig.yaml", active: true },
                { id: "f-prompt", name: "prompts/support-agent.txt" },
                { id: "f-pkg", name: "package.json" },
              ],
              code: [
                { id: "y1", text: "prompts: [file://prompts/support-agent.txt]" },
                { id: "y2", text: "providers: [anthropic:claude-sonnet-5]" },
                { id: "y3", text: "tests:" },
                { id: "y4", text: "- vars: { question: \"해외 배송도 되나요?\" }", indent: 1 },
                { id: "y5", text: "assert:", indent: 2 },
                { id: "y6", text: "- type: contains", indent: 3 },
                { id: "y7", text: "value: \"관세\" # ← 너무 빡빡한 기준", indent: 4, tone: "del" },
                { id: "y8", text: "value: \"해외 배송\"", indent: 4, tone: "add", hidden: true },
                { id: "y9", text: "- type: llm-rubric", indent: 3, hidden: true },
                { id: "y10", text: "value: \"배송 가능 여부를 정확히 안내\"", indent: 4, hidden: true },
              ],
              terminal: [
                { id: "t1", text: "npx promptfoo eval", tone: "cmd", hidden: true },
                { id: "t2", text: "✕ [contains] 해외 배송도 되나요?", tone: "err", hidden: true },
                { id: "t3", text: "  expected \"관세\" in output", tone: "out", hidden: true },
                { id: "t4", text: "Pass rate: 36/42 (85.7%)", tone: "out", hidden: true },
                { id: "t5", text: "npx promptfoo eval", tone: "cmd", hidden: true },
                { id: "t6", text: "✓ [contains] 해외 배송도 되나요?", tone: "ok", hidden: true },
                { id: "t7", text: "Pass rate: 42/42 (100%)", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 설정 파일의 3요소(프롬프트·모델·테스트)를 확인합니다" },
              { t: "move", target: "y1" },
              { t: "move", target: "y3" },
              { t: "caption", text: "② 명령 한 줄로 전체 데이터셋을 실행합니다" },
              { t: "type", target: "t1", text: "npx promptfoo eval" },
              { t: "reveal", target: "t2" },
              { t: "reveal", target: "t3" },
              { t: "reveal", target: "t4" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 실패 케이스를 읽고 너무 빡빡한 assertion을 찾습니다" },
              { t: "move", target: "y7" },
              { t: "dblclick", target: "y7" },
              { t: "caption", text: "④ assertion을 실제 기준에 맞게 고칩니다" },
              { t: "type", target: "y8", text: "value: \"해외 배송\"" },
              { t: "reveal", target: "y9" },
              { t: "reveal", target: "y10" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 같은 명령으로 재실행해 합격률 변화를 확인합니다" },
              { t: "type", target: "t5", text: "npx promptfoo eval" },
              { t: "reveal", target: "t6" },
              { t: "reveal", target: "t7" },
              { t: "move", target: "t7" },
              { t: "caption", text: "✅ 합격률 100% — 첫 하네스 세팅 완료입니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "llm-as-judge-design",
          title: "LLM-as-Judge 설계와 함정",
          minutes: 6,
          content: `Judge는 강력하지만, 검증하지 않은 Judge는 **눈금이 틀린 자로 재는 것**과 같습니다. Judge를 채점 아르바이트생이라고 생각해 보세요 — 기준표 없이 맡기면 사람마다, 날마다 점수가 달라집니다. 잘 만드는 원칙과 알려진 편향을 하나씩 짚습니다.

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

> 💡 **핵심**: Judge는 "설계 → 사람 라벨과 대조 → 루브릭 수정"을 거친 뒤에만 신뢰하세요. **채점기를 채점하는 단계**를 건너뛰면 안 됩니다.`,
          illustration: {
            type: "chat",
            title: "Judge 프롬프트 설계 예시",
            messages: [
              {
                role: "system",
                text: "루브릭: ① 원문에 없는 사실 포함? ② 핵심 수치 누락? ③ 3문장 초과? 각각 예/아니오로. 길이는 평가하지 마세요. 근거를 먼저 쓰고 결론을 내리세요.",
              },
              {
                role: "user",
                text: "[원문]과 [요약]을 채점하세요.",
              },
              {
                role: "ai",
                text: "근거: 요약의 \"전년 대비 30% 성장\"은 원문에 없음(원문은 13%). → ① 예 ② 아니오 ③ 아니오 — 판정: FAIL (환각)",
              },
            ],
            caption: "점수 대신 예/아니오 체크리스트, 결론 전에 근거 — Judge 일관성의 핵심 두 가지입니다.",
          },
          demo: {
            title: "LLM-as-Judge 채점과 검증 따라하기",
            app: {
              kind: "browser",
              url: "evals.ourteam.dev/judge",
              blocks: [
                { id: "b-head", type: "heading", label: "LLM-as-Judge 채점 대시보드" },
                {
                  id: "b-rubric",
                  type: "text",
                  label: "루브릭: ① 원문에 없는 사실? ② 핵심 수치 누락? ③ 3문장 초과? — 각각 예/아니오, 길이는 평가하지 않음",
                },
                { id: "b-input", type: "input", label: "채점할 요약을 붙여넣으세요…" },
                { id: "b-run", type: "button", label: "Judge 채점 실행" },
                {
                  id: "b-reason",
                  type: "card",
                  label: "근거: 요약의 \"30% 성장\"은 원문에 없음 (원문은 13%)",
                  hidden: true,
                },
                { id: "b-check", type: "card", label: "체크: ① 예 · ② 아니오 · ③ 아니오", hidden: true },
                { id: "b-verdict", type: "badge", label: "판정: FAIL (환각)", hidden: true },
                { id: "b-verify", type: "button", label: "사람 라벨 50건과 대조" },
                { id: "b-agree", type: "card", label: "사람 라벨 일치율: 46/50 (92%) — 신뢰 가능", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 루브릭을 예/아니오 체크리스트로 명시합니다" },
              { t: "move", target: "b-rubric" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 채점할 요약을 입력합니다" },
              { t: "click", target: "b-input" },
              { t: "type", target: "b-input", text: "3분기 매출이 전년 대비 30% 성장했다." },
              { t: "caption", text: "③ Judge를 실행합니다 — 근거를 먼저 쓰게 합니다" },
              { t: "move", target: "b-run" },
              { t: "click" },
              { t: "wait", ms: 600 },
              { t: "reveal", target: "b-reason" },
              { t: "reveal", target: "b-check" },
              { t: "reveal", target: "b-verdict" },
              { t: "move", target: "b-verdict" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ Judge 자체를 사람 라벨과 대조해 검증합니다" },
              { t: "move", target: "b-verify" },
              { t: "click" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "b-agree" },
              { t: "move", target: "b-agree" },
              { t: "caption", text: "✅ 일치율 92% — 이제 이 Judge를 신뢰할 수 있습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "prompt-versioning",
          title: "프롬프트 버전 관리: git으로 diff 남기기",
          minutes: 5,
          content: `프롬프트는 코드입니다. 노션 페이지나 채팅창에 흩어진 프롬프트는 "어제는 됐는데 오늘은 안 되는" 미스터리의 근원입니다. 누가, 언제, 왜 바꿨는지 아무도 모르기 때문입니다. 코드처럼 Git으로 관리하면 이 미스터리가 사라집니다.

## 프롬프트를 저장소로

- 프롬프트를 **별도 파일**(\`prompts/*.txt\`, \`.yaml\`)로 분리해 git에 커밋합니다.
- 코드 안에 문자열로 직접 박아 넣으면(하드코딩) 프롬프트 변경이 코드 변경에 묻혀 찾기 어렵습니다 — 파일 분리가 핵심입니다.
- 모델명이나 온도(답변의 무작위성을 조절하는 파라미터) 같은 설정값도 파일로 함께 버전 관리합니다.

지금 프롬프트가 코드 문자열 안에 박혀 있다면, 오늘 파일 하나로 꺼내는 것부터 시작하세요.

## diff + 이벨 점수 = 완전한 기록

git이 "무엇이 바뀌었나"를, 이벨이 "그래서 얼마나 좋아졌나"를 기록합니다. 둘을 합치면 프롬프트 변경 하나하나가 결과가 딸린 실험 기록이 됩니다.

- 커밋 메시지에 이벨 결과를 남깁니다: \`refine tone guide (eval: 85.7% → 92.9%)\`
- PR 리뷰에서 프롬프트 diff와 점수 변화를 함께 봅니다 — 프롬프트 리뷰가 코드 리뷰와 똑같아집니다.

## 되돌리기(롤백)가 공짜가 됩니다

프로덕션(실제 사용자가 쓰는 서비스 환경)에서 품질 문제가 터지면 \`git revert\` 명령 한 번으로 직전 프롬프트로 복귀합니다. 배포된 프롬프트에는 커밋 해시(커밋마다 붙는 고유 번호)를 태그로 남겨, **"지금 서비스에 어떤 버전이 돌고 있는가"**에 항상 답할 수 있게 하세요.

> 💡 **핵심**: 프롬프트 변경 이력 = **git diff(무엇을) + 이벨 점수(얼마나)**. 이 둘이 쌓이면 팀의 프롬프트 노하우가 자산이 됩니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "git — 프롬프트 diff와 이벨 기록",
            lines: [
              { text: "git diff prompts/support-agent.txt", tone: "cmd" },
              { text: "- 고객 질문에 답변하세요.", tone: "err" },
              { text: "+ 고객 질문에 답변하세요. 반드시 정책 문서의", tone: "ok" },
              { text: "+ 근거 조항을 인용하고, 모르면 모른다고 답하세요.", tone: "ok" },
              { text: "npx promptfoo eval", tone: "cmd" },
              { text: "Pass rate: 39/42 (92.9%)  # 이전 85.7%", tone: "out" },
              { text: "git commit -am \"support: 근거 인용 규칙 추가 (eval 85.7%→92.9%)\"", tone: "cmd" },
              { text: "[main a3f9c21] support: 근거 인용 규칙 추가", tone: "dim" },
            ],
            caption: "diff가 '무엇을 바꿨나', 이벨 점수가 '그래서 좋아졌나'를 증명합니다.",
          },
          demo: {
            title: "프롬프트 diff + 이벨 점수 커밋 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "support-agent.txt — 프롬프트 버전 관리",
              files: [
                { id: "f-agent", name: "prompts/support-agent.txt", active: true },
                { id: "f-cfg", name: "promptfooconfig.yaml" },
              ],
              code: [
                { id: "p1", text: "당신은 우리 쇼핑몰의 고객 지원 상담원입니다." },
                { id: "p2", text: "고객 질문에 답변하세요.", tone: "del" },
                { id: "p3", text: "고객 질문에 답변하세요. 반드시 정책 문서의", tone: "add", hidden: true },
                { id: "p4", text: "근거 조항을 인용하고, 모르면 모른다고 답하세요.", tone: "add", hidden: true },
              ],
              terminal: [
                { id: "g1", text: "git diff prompts/support-agent.txt", tone: "cmd", hidden: true },
                { id: "g2", text: "- 고객 질문에 답변하세요.", tone: "err", hidden: true },
                { id: "g3", text: "+ …근거 조항을 인용하고, 모르면 모른다고", tone: "ok", hidden: true },
                { id: "g4", text: "npx promptfoo eval", tone: "cmd", hidden: true },
                { id: "g5", text: "Pass rate: 39/42 (92.9%)  # 이전 85.7%", tone: "ok", hidden: true },
                { id: "g6", text: "git commit -am \"eval 85.7%→92.9%\"", tone: "cmd", hidden: true },
                { id: "g7", text: "[main a3f9c21] support: 근거 인용 규칙 추가", tone: "out", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 프롬프트 파일에서 고칠 줄을 찾습니다" },
              { t: "move", target: "p2" },
              { t: "dblclick", target: "p2" },
              { t: "caption", text: "② 근거 인용 규칙을 추가합니다" },
              { t: "type", target: "p3", text: "고객 질문에 답변하세요. 반드시 정책 문서의" },
              { t: "type", target: "p4", text: "근거 조항을 인용하고, 모르면 모른다고 답하세요." },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ git diff로 무엇이 바뀌었는지 확인합니다" },
              { t: "type", target: "g1", text: "git diff prompts/support-agent.txt" },
              { t: "reveal", target: "g2" },
              { t: "reveal", target: "g3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 이벨을 돌려 점수 변화를 확인합니다" },
              { t: "type", target: "g4", text: "npx promptfoo eval" },
              { t: "reveal", target: "g5" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "⑤ diff와 점수를 함께 커밋 메시지에 남깁니다" },
              { t: "type", target: "g6", text: "git commit -am \"eval 85.7%→92.9%\"" },
              { t: "reveal", target: "g7" },
              { t: "move", target: "g7" },
              { t: "caption", text: "✅ 무엇을(diff) + 얼마나(점수)가 함께 기록되었습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "regression-ci",
          title: "회귀 테스트와 CI 연동",
          minutes: 5,
          content: `하네스의 진짜 힘은 **자동으로 돌 때** 나옵니다. 프롬프트를 고치는 PR이 올라올 때마다 이벨이 자동으로 돌고, 점수가 떨어지면 머지(변경을 팀의 본 코드에 합치는 것)가 막히는 구조를 만듭니다. 공항 검색대처럼, 통과 못 하면 아예 들어갈 수 없게 하는 것입니다.

## CI 파이프라인 설계

CI는 코드가 올라올 때마다 정해진 검사를 자동으로 실행해 주는 시스템입니다. 이벨을 그 검사 목록에 추가합니다.

- **시작 조건**: \`prompts/\` 폴더 변경이 포함된 PR이 올라오면 자동 실행
- **실행**: 골든 데이터셋 전체로 이벨 실행 (promptfoo는 GitHub Actions 연동을 기본 제공합니다)
- **게이트**: 합격률이 기준선(예: main 브랜치의 현재 점수) 아래로 떨어지면 검사 실패 → 머지 차단
- **리포트**: PR 코멘트에 케이스별 변화 요약을 자동으로 게시해 리뷰어가 한눈에 봅니다

## 비용과 속도 관리

- LLM 호출이 들어간 이벨은 일반 테스트보다 느리고 비쌉니다 — **캐시**(같은 프롬프트+입력의 결과를 저장해 두고 재사용)가 필수입니다.
- PR에서는 핵심만 추린 축소판(스모크 세트)을 돌리고, main에 합쳐진 뒤 전체 세트를 돌리는 2단 구성도 실용적입니다.
- Judge는 같은 답에 다른 판정을 내릴 수 있습니다 — 애매한 케이스는 여러 번 채점해 다수결로 판정합니다.

## 기준선(Baseline)의 규율

기준선 점수를 낮추는 머지는 반드시 팀의 **명시적 합의**를 거치게 하세요. "급하니까 이번만 예외"가 몇 번 쌓이면 하네스는 아무도 안 보는 장식이 됩니다.

> 💡 **핵심**: "프롬프트 PR → 이벨 자동 실행 → 점수 하락 시 머지 차단" — 이 게이트 하나가 팀 전체의 품질 하한선을 지킵니다.`,
          illustration: {
            type: "flow",
            title: "이벨 CI 게이트",
            nodes: [
              {
                label: "프롬프트 수정 PR",
                sublabel: "prompts/ 디렉토리 변경",
                icon: "git-branch",
                tone: "primary",
              },
              {
                label: "이벨 자동 실행",
                sublabel: "골든 데이터셋 전체 채점",
                icon: "test-tube",
                tone: "accent",
                edgeLabel: "CI 트리거",
              },
              {
                label: "기준선 비교",
                sublabel: "main 브랜치 점수와 대조",
                icon: "gauge",
                tone: "warning",
              },
              {
                label: "머지 승인",
                sublabel: "점수 유지·상승 시에만",
                icon: "check",
                tone: "success",
                edgeLabel: "기준선 이상",
              },
            ],
            loopBack: { from: 2, to: 0, label: "점수 하락 → 머지 차단, 프롬프트 재수정" },
            caption: "점수가 떨어지면 머지가 막히고 수정으로 되돌아갑니다 — 회귀가 프로덕션에 못 들어갑니다.",
          },
        },
      ],
    },
    {
      slug: "production-quality",
      title: "프로덕션 품질 관리",
      description: "모니터링, 실패 환류 루프, A/B 테스트",
      lessons: [
        {
          slug: "production-monitoring",
          title: "프로덕션 모니터링과 실사용 데이터 수집",
          minutes: 5,
          content: `배포 전 이벨을 아무리 촘촘히 짜도, 실제 사용자의 입력은 항상 예상을 벗어납니다. 그래서 프로덕션(실서비스 환경)은 위험 지대인 동시에 **가장 큰 이벨 데이터셋의 원천**입니다. 매장을 열었으면 CCTV와 고객의 소리함이 필요한 것처럼, LLM 앱에도 기록과 피드백 장치가 필요합니다.

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

> 💡 **핵심**: 프로덕션 로깅의 목적은 관찰 자체가 아니라 **다음 이벨 케이스의 채굴**입니다. 트레이스 없는 LLM 앱은 안이 안 보이는 블랙박스입니다.`,
          illustration: {
            type: "stack",
            title: "LLM 관측(Observability) 스택",
            layers: [
              {
                label: "알림·대시보드",
                sublabel: "점수 급락·👎 스파이크 감지",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "온라인 이벨",
                sublabel: "표본 5%를 Judge로 실시간 채점",
                icon: "gauge",
                tone: "accent",
              },
              {
                label: "피드백 수집",
                sublabel: "👍/👎 · 재질문 · 이탈 신호",
                icon: "users",
                tone: "primary",
              },
              {
                label: "트레이스 로깅",
                sublabel: "입력→중간 단계→출력 전 과정 기록",
                icon: "database",
                tone: "muted",
              },
            ],
            caption: "아래층(기록)이 없으면 위층(감지·개선)은 성립하지 않습니다.",
          },
        },
        {
          slug: "failure-to-eval-loop",
          title: "개선 루프: 실패 사례를 이벨로 환류시키기",
          minutes: 5,
          content: `모니터링으로 실패를 발견했다면, 그 실패가 **두 번 다시 조용히 재발하지 못하게** 만들어야 합니다. 그 장치가 환류(Feedback) 루프 — 실패 사례를 다시 이벨로 되돌려 보내는 순환 구조입니다. 수험생의 오답노트와 같습니다. 틀린 문제를 노트에 적어 두고 매번 다시 풀어보면, 같은 문제로 다시 틀리는 일이 사라집니다.

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

> 💡 **핵심**: 버그 수정의 완료 조건은 "동작한다"가 아니라 **"그 실패가 골든 데이터셋에 들어갔다"**입니다.`,
          illustration: {
            type: "cycle",
            title: "실패 → 이벨 환류 루프",
            center: "데이터셋이 계속 자란다",
            nodes: [
              { label: "발견", sublabel: "👎·온라인 이벨·CS 티켓", icon: "search" },
              { label: "분류", sublabel: "실패 유형 태깅", icon: "filter" },
              { label: "케이스화", sublabel: "골든 데이터셋에 추가", icon: "clipboard" },
              { label: "수정·검증", sublabel: "이벨 통과 확인", icon: "wrench" },
              { label: "배포", sublabel: "CI 게이트 통과", icon: "rocket" },
            ],
            caption: "한 바퀴 돌 때마다 같은 실패의 재발 가능성이 영구히 차단됩니다.",
          },
        },
        {
          slug: "ab-testing",
          title: "A/B 테스트: 모델·프롬프트 교체 검증",
          minutes: 5,
          content: `새 모델이 이벨에서 이겼다고 바로 전부 교체하는 것은 위험합니다. 이벨은 배포 전에 치르는 **오프라인 모의고사**일 뿐이고, 최종 판정은 실사용자가 내리기 때문입니다.

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

> 💡 **핵심**: 교체 결정 공식은 **"오프라인 이벨로 후보 선별 → 온라인 A/B로 최종 판정"**. 이벨은 필터, A/B는 심판입니다.`,
          illustration: {
            type: "compare",
            title: "챔피언 vs 챌린저",
            columns: [
              {
                title: "A: 챔피언 (현행)",
                icon: "shield",
                tone: "muted",
                items: [
                  "트래픽 90% 유지",
                  "온라인 이벨 91.2%",
                  "👍 비율 87% · 응답 1.8초",
                  "검증된 기준선 역할",
                ],
              },
              {
                title: "B: 챌린저 (신규 모델)",
                icon: "rocket",
                tone: "primary",
                items: [
                  "트래픽 10%로 시작",
                  "온라인 이벨 93.5%",
                  "👍 비율 89% · 비용 -30%",
                  "승자 확정 시 점진 확대",
                ],
              },
            ],
            caption: "오프라인 이벨을 통과한 후보만 링에 오르고, 실사용 지표가 최종 판정합니다.",
          },
        },
      ],
    },
  ],
};
