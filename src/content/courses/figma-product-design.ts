import type { Course } from "../types";

/**
 * AI 프로덕트 디자인: Figma 실전 워크플로우 (2026년 기준)
 *
 * 아이디어 → UI 초안 → 디자인 시스템 정리 → 동작 프로토타입 → 코드 핸드오프 → UX 리서치까지,
 * AI와 함께 일하는 프로덕트 디자이너의 새 워크플로우를 다룹니다.
 * (ai-design.ts는 Midjourney/SD 이미지 생성 중심 — 이 강의는 프로덕트/UX 디자인 워크플로우 중심)
 */
export const figmaProductDesign: Course = {
  slug: "figma-product-design",
  title: "AI 프로덕트 디자인: Figma 실전 워크플로우",
  subtitle: "아이디어에서 프로토타입, 코드 핸드오프까지 — AI와 함께 일하는 새 워크플로우",
  description:
    "2026년의 프로덕트 디자인은 와이어프레임을 그리는 일이 아니라, AI가 만든 초안을 판단하고 시스템으로 다듬는 일이 됐습니다. 이 강의에서는 Figma의 AI 에이전트·Figma Make·Dev Mode MCP 서버 같은 최신 기능으로 아이디어에서 동작 프로토타입까지 직행하는 워크플로우를 익히고, 디자인 시스템 정리·네이밍·문서화 자동화, 디자인→코드 핸드오프 도구들의 현실적 품질, 그리고 인터뷰 전사·태깅·사용성 분석까지 — 프로덕트 디자이너의 하루 전체를 AI와 함께 재설계합니다.",
  category: "creative",
  level: "intermediate",
  tags: ["Figma", "프로덕트 디자인", "디자인 시스템", "UX 리서치", "코드 핸드오프"],
  gradient: ["#d946ef", "#f43f5e"],
  icon: "wand",
  outcomes: [
    "프롬프트로 UI 초안을 만들고 디자인 시스템에 맞게 정리하는 워크플로우를 몸에 익힌다",
    "컴포넌트 정리·네이밍·문서화를 AI로 자동화해 '기계가 읽는 디자인 시스템'을 만들 수 있다",
    "Dev Mode MCP 서버와 Code Connect 기반 디자인→코드 핸드오프를 현실적으로 활용할 수 있다",
    "인터뷰 전사·태깅·사용성 분석에 AI를 쓰되, 편향을 걸러내고 원문으로 검증할 수 있다",
  ],
  modules: [
    {
      slug: "workflow-shift",
      title: "디자인 워크플로우의 변화",
      description: "와이어프레임에서 동작 프로토타입 직행으로 — 무엇이 왜 바뀌었나",
      lessons: [
        {
          slug: "ai-design-cycle",
          title: "와이어프레임 건너뛰기: 짧아진 디자인 사이클",
          minutes: 4,
          content: `와이어프레임 2주, 목업 2주, 프로토타입 1주 — 이 직렬 공정이 무너지고 있습니다. 2026년의 디자이너는 **아이디어에서 '동작하는 프로토타입'으로 직행**합니다.

## 무엇이 달라졌나

- 예전: 저해상도 와이어프레임 → 고해상도 목업 → 클릭 프로토타입 → 개발 전달. 각 단계가 '다시 그리기'였습니다.
- 지금: 프롬프트로 화면 초안을 몇 분 만에 뽑고, 곧바로 **실제로 동작하는 프로토타입**으로 만들어 사용자 앞에 놓습니다.

## 왜 이게 큰 변화인가

- 검증이 빨라집니다 — "이 흐름이 맞나?"를 그림이 아니라 **동작**으로 확인합니다.
- 버리는 비용이 싸집니다 — 초안 10개를 만들고 9개를 버려도 반나절입니다.
- 대신 **판단의 밀도**가 올라갑니다. 10개 중 어느 것이 사용자 문제를 푸는지 고르는 눈이 디자이너의 핵심 역량이 됐습니다.

## 사라지지 않는 것

문제 정의, 정보 구조, 디자인 시스템, 그리고 취향 — AI는 화면을 그려주지만 **무엇을 만들지는 정해주지 않습니다**.

> 💡 **핵심**: 사이클이 짧아진 만큼 디자이너의 무게중심은 '그리기'에서 **'판단하고 다듬기'**로 이동했습니다. 이 강의 전체가 그 새 무게중심을 다룹니다.`,
          illustration: {
            type: "compare",
            title: "기존 사이클 vs AI 사이클",
            columns: [
              {
                title: "기존 (직렬 공정)",
                icon: "clock",
                tone: "muted",
                items: [
                  "와이어프레임 → 목업 → 프로토타입",
                  "단계마다 다시 그리기",
                  "검증까지 몇 주 소요",
                  "초안을 버리는 비용이 큼",
                ],
              },
              {
                title: "AI 사이클 (직행)",
                icon: "zap",
                tone: "primary",
                items: [
                  "프롬프트 → 동작 프로토타입 직행",
                  "초안 10개 생성, 9개 폐기",
                  "당일 사용자 검증 가능",
                  "판단·다듬기에 시간 집중",
                ],
              },
            ],
            caption: "그리는 시간이 줄어든 자리를 '판단하는 시간'이 채웁니다.",
          },
        },
        {
          slug: "figma-ai-landscape",
          title: "Figma AI 지형도: 무엇이 어디까지 되는가",
          minutes: 5,
          content: `도구의 지도를 정확히 그려야 과대평가도 과소평가도 하지 않습니다. 2026년 중반 기준 Figma의 AI 기능을 정리합니다.

## 캔버스 안의 AI

- **First Draft** — 텍스트 설명으로 화면 레이아웃을 생성합니다. 연결된 디자인 시스템이 있으면 그 컴포넌트를 사용합니다. 2026년 5월부터는 **AI 에이전트가 First Draft의 새 진입점**이 됐습니다.
- **Figma AI 에이전트 (베타)** — 2026년 5월 20일 베타 공개. 자연어로 디자인을 생성·수정하고 반복 작업을 자동화합니다. 컴포넌트와 레이아웃을 이해하는 **컴포넌트 인지형 편집**이 특징입니다.
- **Make an image / 이미지 편집** — 캔버스 안에서 이미지 생성·교체.

## 캔버스 밖으로

- **Figma Make** — 프롬프트로 **동작하는 앱/프로토타입**을 생성합니다 (2025년 Config 공개). 팀 라이브러리를 연결하면 우리 시스템의 색·타이포·컴포넌트가 적용됩니다.
- **Dev Mode MCP 서버** — 디자인의 구조화 데이터(레이어 트리·토큰·컴포넌트명)를 AI 코딩 도구에 직접 전달합니다.
- **Code Connect** — 디자인 컴포넌트와 실제 코드 컴포넌트를 연결합니다.

> 💡 **핵심**: "초안 생성(에이전트) → 동작 프로토타입(Make) → 코드 전달(MCP·Code Connect)" — 이 세 축이 이후 모든 레슨의 뼈대입니다.`,
          illustration: {
            type: "grid",
            title: "Figma AI 기능 지도 (2026)",
            items: [
              {
                label: "AI 에이전트",
                sublabel: "자연어 생성·수정 (2026.5 베타)",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "First Draft",
                sublabel: "텍스트 → 화면 레이아웃",
                icon: "sparkles",
                tone: "primary",
              },
              {
                label: "Figma Make",
                sublabel: "프롬프트 → 동작 프로토타입",
                icon: "play",
                tone: "accent",
              },
              {
                label: "Dev Mode MCP 서버",
                sublabel: "디자인 데이터 → AI 코딩 도구",
                icon: "link",
                tone: "success",
              },
              {
                label: "Code Connect",
                sublabel: "디자인 ↔ 실제 코드 연결",
                icon: "code",
                tone: "success",
              },
              {
                label: "이미지 생성·편집",
                sublabel: "캔버스 안 에셋 작업",
                icon: "image",
                tone: "muted",
              },
            ],
            caption: "초안 생성 → 동작 프로토타입 → 코드 전달, 세 축으로 기억하세요.",
          },
        },
        {
          slug: "prompt-ui-limits",
          title: "프롬프트로 UI 초안 만들기, 그리고 그 한계",
          minutes: 6,
          content: `프롬프트 한 줄로 화면이 나옵니다. 하지만 그 화면을 **그대로 쓰면 안 되는 이유**를 아는 것이 중급 디자이너의 출발점입니다.

## 좋은 UI 프롬프트의 구조

- **화면의 목적** — "운동 앱의 주간 리포트 화면"
- **필수 요소** — "주간 걸음 수 차트, 최근 운동 리스트, 목표 달성 배지"
- **맥락과 톤** — "모바일, 미니멀, 우리 라이브러리 컴포넌트 사용"

요소를 나열하면 나열할수록 초안의 쓸모가 올라갑니다. "예쁜 대시보드 만들어줘"는 예쁜 쓰레기를 만듭니다.

## AI 초안의 전형적인 한계

- **시스템 이탈** — 라이브러리를 연결하지 않으면 범용 컴포넌트로 채워집니다. 색·간격·버튼이 우리 제품과 미묘하게 다릅니다.
- **평균의 함정** — 학습된 '무난한 패턴'으로 수렴합니다. 차별화된 인터랙션은 나오지 않습니다.
- **접근성·엣지 케이스 누락** — 빈 상태, 에러 상태, 긴 텍스트는 사람이 챙겨야 합니다.

## 그래서 워크플로우는

**생성은 AI, 선별과 시스템 정합은 사람.** 초안을 받으면 우리 디자인 시스템의 컴포넌트로 교체하고 간격·타이포를 토큰에 맞춥니다 — 아래 데모에서 직접 해봅니다.

> 💡 **핵심**: AI 초안은 주니어가 잡아준 러프 스케치입니다. **취향과 시스템은 여전히 사람의 몫**입니다.`,
          illustration: {
            type: "chat",
            title: "나쁜 프롬프트 vs 좋은 프롬프트",
            messages: [
              { role: "user", text: "예쁜 대시보드 만들어줘" },
              {
                role: "ai",
                text: "(어디서 본 듯한 범용 대시보드 — 우리 제품과 무관한 색과 컴포넌트)",
              },
              {
                role: "user",
                text: "운동 앱 주간 리포트 화면. 주간 걸음 수 차트, 최근 운동 리스트, 목표 배지 포함. 모바일, 우리 라이브러리 컴포넌트 사용",
              },
              {
                role: "ai",
                text: "(요소·맥락이 반영된 초안 — 이제 사람이 시스템에 맞게 다듬을 차례)",
              },
            ],
            caption: "목적 + 필수 요소 + 맥락. 초안의 품질은 프롬프트의 구체성에 비례합니다.",
          },
          demo: {
            title: "AI 초안을 디자인 시스템에 맞게 정리 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "체크아웃 화면 초안 — Figma",
              tools: [
                { id: "tool-select", icon: "target", label: "선택" },
                { id: "tool-frame", icon: "layers", label: "프레임" },
                { id: "tool-text", icon: "file-text", label: "텍스트" },
                { id: "tool-ai", icon: "sparkles", label: "AI" },
              ],
              objects: [
                {
                  id: "frame-draft",
                  shape: "frame",
                  label: "Checkout — AI 초안",
                  x: 6,
                  y: 8,
                  w: 56,
                  h: 84,
                },
                { id: "txt-title", shape: "text", label: "주문 확인", x: 10, y: 14, w: 28, h: 6 },
                { id: "rect-form", shape: "rect", x: 10, y: 24, w: 48, h: 26, color: "#e5e7eb" },
                {
                  id: "rect-form2",
                  shape: "rect",
                  x: 10,
                  y: 24,
                  w: 48,
                  h: 26,
                  color: "#fae8ff",
                  hidden: true,
                },
                {
                  id: "btn-generic",
                  shape: "rect",
                  label: "결제하기",
                  x: 10,
                  y: 58,
                  w: 48,
                  h: 10,
                  color: "#94a3b8",
                },
                {
                  id: "btn-brand",
                  shape: "rect",
                  label: "결제하기",
                  x: 10,
                  y: 58,
                  w: 48,
                  h: 10,
                  color: "#d946ef",
                  hidden: true,
                },
                {
                  id: "frame-lib",
                  shape: "frame",
                  label: "우리 디자인 시스템",
                  x: 68,
                  y: 8,
                  w: 26,
                  h: 84,
                },
                {
                  id: "lib-btn",
                  shape: "rect",
                  label: "Button/Primary",
                  x: 71,
                  y: 16,
                  w: 20,
                  h: 8,
                  color: "#d946ef",
                },
                {
                  id: "lib-input",
                  shape: "rect",
                  label: "Input/Default",
                  x: 71,
                  y: 30,
                  w: 20,
                  h: 8,
                  color: "#fae8ff",
                },
                {
                  id: "txt-done",
                  shape: "text",
                  label: "✓ 시스템 컴포넌트로 교체 완료",
                  x: 10,
                  y: 74,
                  w: 44,
                  h: 6,
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① AI가 생성한 체크아웃 초안을 살펴봅니다" },
              { t: "move", target: "frame-draft" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 회색 기본 버튼은 우리 브랜드가 아닙니다" },
              { t: "move", target: "btn-generic" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ 라이브러리의 Button/Primary로 교체합니다" },
              { t: "drag", from: "lib-btn", to: "btn-generic" },
              { t: "hide", target: "btn-generic" },
              { t: "reveal", target: "btn-brand" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 입력 필드도 Input/Default로 바꿉니다" },
              { t: "drag", from: "lib-input", to: "rect-form" },
              { t: "hide", target: "rect-form" },
              { t: "reveal", target: "rect-form2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 초안이 우리 시스템의 언어로 정리됐습니다" },
              { t: "reveal", target: "txt-done" },
              { t: "move", target: "txt-done" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "hands-on-workflow",
      title: "실전 워크플로우",
      description: "디자인 시스템 자동화, 에셋 생성, 프로토타이핑, 코드 핸드오프",
      lessons: [
        {
          slug: "design-system-ai",
          title: "디자인 시스템과 AI: 정리·네이밍·문서화 자동화",
          minutes: 6,
          content: `AI 시대에 디자인 시스템의 역할이 하나 늘었습니다. 사람이 보는 규칙집을 넘어 **AI가 읽는 컨텍스트**가 된 것입니다.

## 왜 정리가 먼저인가

First Draft도, Figma Make도, 코드 생성 도구도 결국 **여러분의 라이브러리를 읽고** 결과를 만듭니다. "Rectangle 47", "btn_final_v2" 같은 이름의 라이브러리는 AI에게 노이즈만 줍니다. 정리된 시스템 = 좋은 프롬프트입니다.

## AI로 자동화할 수 있는 정리 작업

- **네이밍 정규화** — 흩어진 레이어·컴포넌트 이름을 \`Button/Primary\` 같은 규칙으로 일괄 변경. Figma AI 에이전트가 컴포넌트 구조를 이해하고 반복 작업을 대신합니다.
- **설명(description) 초안** — 컴포넌트 용도·사용 규칙 문서의 초안을 AI가 작성하고 사람이 다듬습니다. 이 설명은 Dev Mode와 MCP를 통해 **모델의 프롬프트 컨텍스트**로도 쓰입니다.
- **중복·이탈 감지** — 비슷한 컴포넌트 변형, 토큰을 벗어난 색 사용을 찾아 목록화합니다.

## 사람이 정하는 것

네이밍 컨벤션 자체, 변형(variant)의 축, 무엇을 시스템에 편입할지 — **규칙은 사람이, 적용은 AI가**.

> 💡 **핵심**: 이제 디자인 시스템 문서는 사람과 AI가 함께 읽는 문서입니다. **정리가 잘된 시스템일수록 모든 AI 기능의 출력 품질이 올라갑니다.**`,
          illustration: {
            type: "stack",
            title: "디자인 시스템 = AI의 컨텍스트",
            layers: [
              {
                label: "AI 도구들",
                sublabel: "First Draft · Make · 코드 생성",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "Code Connect · MCP",
                sublabel: "디자인 데이터를 코드 세계로 전달",
                icon: "link",
                tone: "accent",
              },
              {
                label: "설명·문서·토큰",
                sublabel: "컴포넌트 description이 곧 프롬프트",
                icon: "file-text",
                tone: "accent",
              },
              {
                label: "정리된 컴포넌트와 네이밍",
                sublabel: "Button/Primary — 모든 것의 기반",
                icon: "layers",
                tone: "muted",
              },
            ],
            caption: "아래층이 부실하면 위층의 모든 AI 출력이 흔들립니다.",
          },
          demo: {
            title: "디자인 시스템 컴포넌트 정리 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "컴포넌트 라이브러리 정리 — Figma",
              tools: [
                { id: "tool-select2", icon: "target", label: "선택" },
                { id: "tool-layers2", icon: "layers", label: "레이어" },
                { id: "tool-doc2", icon: "file-text", label: "문서" },
                { id: "tool-ai2", icon: "sparkles", label: "AI" },
              ],
              objects: [
                {
                  id: "frame-comp",
                  shape: "frame",
                  label: "Components",
                  x: 6,
                  y: 8,
                  w: 88,
                  h: 84,
                },
                {
                  id: "comp-a",
                  shape: "rect",
                  label: "Rectangle 47",
                  x: 12,
                  y: 20,
                  w: 24,
                  h: 12,
                  color: "#a5b4fc",
                },
                {
                  id: "comp-b",
                  shape: "rect",
                  label: "btn_final_v2",
                  x: 52,
                  y: 38,
                  w: 24,
                  h: 12,
                  color: "#a5b4fc",
                },
                {
                  id: "comp-c",
                  shape: "ellipse",
                  label: "타원 3",
                  x: 30,
                  y: 62,
                  w: 14,
                  h: 12,
                  color: "#f9a8d4",
                },
                {
                  id: "comp-a2",
                  shape: "rect",
                  label: "Card/Default",
                  x: 12,
                  y: 20,
                  w: 24,
                  h: 12,
                  color: "#818cf8",
                  hidden: true,
                },
                {
                  id: "comp-b2",
                  shape: "rect",
                  label: "Button/Primary",
                  x: 12,
                  y: 38,
                  w: 24,
                  h: 12,
                  color: "#818cf8",
                  hidden: true,
                },
                {
                  id: "comp-c2",
                  shape: "ellipse",
                  label: "Avatar/Large",
                  x: 12,
                  y: 56,
                  w: 14,
                  h: 12,
                  color: "#f472b6",
                  hidden: true,
                },
                {
                  id: "txt-report",
                  shape: "text",
                  label: "✓ 3개 이름 정규화 · 설명 초안 3건 생성",
                  x: 44,
                  y: 74,
                  w: 46,
                  h: 6,
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 이름이 제각각인 컴포넌트 3개를 확인합니다" },
              { t: "move", target: "comp-a" },
              { t: "click" },
              { t: "move", target: "comp-b" },
              { t: "click" },
              { t: "move", target: "comp-c" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② AI에게 네이밍 규칙 적용을 요청합니다" },
              { t: "move", target: "tool-ai2" },
              { t: "click" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 규칙에 맞는 이름으로 정규화되고 정렬됩니다" },
              { t: "hide", target: "comp-a" },
              { t: "reveal", target: "comp-a2" },
              { t: "hide", target: "comp-b" },
              { t: "reveal", target: "comp-b2" },
              { t: "hide", target: "comp-c" },
              { t: "reveal", target: "comp-c2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 설명 문서 초안까지 자동 생성됩니다" },
              { t: "reveal", target: "txt-report" },
              { t: "move", target: "txt-report" },
              { t: "caption", text: "⑤ 컨벤션은 사람이 정하고 적용은 AI가 합니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "consistent-ui-assets",
          title: "일관된 UI 에셋: 아이콘·일러스트를 시스템에 맞게",
          minutes: 5,
          content: `이미지 생성 AI로 아이콘 하나는 쉽게 뽑습니다. 어려운 것은 **30개를 뽑아도 한 세트로 보이게** 만드는 일입니다.

## 낱개 생성이 실패하는 이유

그때그때 프롬프트로 뽑은 에셋은 선 굵기, 코너 반경, 색, 시점이 조금씩 다릅니다. 화면에 올리는 순간 "어디서 주워온 티"가 납니다. 프로덕트 에셋의 생명은 화려함이 아니라 **일관성**입니다.

## 시스템에 맞추는 4단계

1. **스타일 명세를 프롬프트로** — "2px 스트로크, 라운드 캡, 24px 그리드, 단색" 같은 우리 아이콘 가이드를 프롬프트 앞부분에 고정합니다.
2. **기준 에셋을 레퍼런스로** — 기존 아이콘 3~4개를 참조 이미지로 주고 같은 세트의 신규 멤버를 요청합니다.
3. **일괄 생성 후 컬링** — 후보를 넉넉히 뽑고, 세트에서 튀는 것을 탈락시킵니다.
4. **토큰·컴포넌트로 편입** — 통과한 에셋만 라이브러리에 등록합니다. 등록 전까지는 '초안'입니다.

## 일러스트도 같은 원리

일러스트는 팔레트·인물 비례·질감을 명세로 고정합니다. 명세 없는 생성은 매번 다른 작가를 고용하는 것과 같습니다.

> 💡 **핵심**: 에셋 생성의 프롬프트는 "무엇을"보다 **"우리 스타일 명세"**가 먼저입니다. 명세 → 레퍼런스 → 컬링 → 라이브러리 편입, 이 관문을 지키세요.`,
          illustration: {
            type: "steps",
            title: "시스템에 맞는 에셋 생성 4단계",
            steps: [
              {
                label: "스타일 명세 고정",
                sublabel: "스트로크·그리드·팔레트를 프롬프트로",
                icon: "palette",
              },
              {
                label: "기준 에셋 레퍼런스",
                sublabel: "기존 세트 3~4개를 참조로 제공",
                icon: "image",
              },
              {
                label: "일괄 생성 → 컬링",
                sublabel: "넉넉히 뽑고 튀는 것 탈락",
                icon: "filter",
              },
              {
                label: "라이브러리 편입",
                sublabel: "통과한 것만 컴포넌트로 등록",
                icon: "layers",
              },
            ],
            caption: "편입 관문을 지키면 30개를 뽑아도 한 세트로 보입니다.",
          },
        },
        {
          slug: "prototype-feedback",
          title: "동작 프로토타입과 AI 피드백 루프",
          minutes: 5,
          content: `클릭 몇 개 연결한 프로토타입과 **실제로 동작하는 프로토타입**은 검증의 질이 다릅니다. Figma Make가 이 간극을 메웁니다.

## 프롬프트 → 동작 프로토타입

Figma Make는 자연어 설명으로 로직·상태·데이터가 있는 프로토타입을 생성합니다. 디자인 파일의 프레임을 첨부하거나 팀 라이브러리를 연결하면 **우리 컴포넌트와 스타일이 반영된** 결과가 나옵니다. "탭을 누르면 목록이 필터링되고, 항목을 누르면 상세로" — 이런 동작이 클릭 연결 없이 만들어집니다.

## AI 피드백으로 다듬기

만들고 끝이 아니라 **루프**를 돌립니다.

- 프로토타입을 AI에게 보여주고 휴리스틱 점검을 요청합니다 — 대비 부족, 터치 타깃 크기, 흐름의 막다른 길.
- "이 화면에서 사용자가 헤맬 지점은?"처럼 **관점을 지정해** 물으면 답의 해상도가 올라갑니다.
- 지적을 반영하고 다시 점검 — 사용자 테스트 전에 싼 비용으로 몇 바퀴 돕니다.

## AI 피드백의 위치

AI 점검은 사용자 테스트의 **대체가 아니라 전처리**입니다. 뻔한 결함을 미리 걷어내 진짜 테스트에서 깊은 발견에 집중하게 해줍니다.

> 💡 **핵심**: 만들기 → AI 점검 → 수정 → 사용자 테스트. **AI 피드백은 테스트 전 결함 필터**로 쓸 때 가장 값집니다.`,
          illustration: {
            type: "cycle",
            title: "프로토타입 개선 루프",
            center: "사용자 테스트 전 반복",
            nodes: [
              { label: "생성", sublabel: "프롬프트 → 동작 프로토타입", icon: "play" },
              { label: "AI 점검", sublabel: "휴리스틱·접근성 지적", icon: "search" },
              { label: "수정", sublabel: "지적 반영해 다듬기", icon: "wrench" },
              { label: "재확인", sublabel: "흐름 다시 점검", icon: "eye" },
            ],
            caption: "이 루프를 몇 바퀴 돈 뒤 사용자 테스트에 들어가면 발견의 질이 달라집니다.",
          },
        },
        {
          slug: "design-to-code-handoff",
          title: "디자인 → 코드 핸드오프: 도구의 현실적 품질",
          minutes: 6,
          content: `"디자인하면 코드가 나온다"는 말은 절반만 사실입니다. 2026년 기준, **어디까지 되고 어디부터 사람이 하는지**를 정확히 알아야 합니다.

## 파이프라인의 부품들

- **Dev Mode MCP 서버** — Figma 디자인의 레이어 트리·토큰·컴포넌트명을 Claude Code 같은 AI 코딩 도구에 구조화 데이터로 전달합니다. 스크린샷 붙여넣기와는 정보량이 다릅니다. 2026년에는 코드를 캔버스로 되가져오는 **양방향(Code to Canvas)** 흐름까지 열렸습니다.
- **Code Connect** — 디자인 컴포넌트를 실제 코드 컴포넌트에 매핑해, 생성 코드가 범용 div 더미 대신 **우리 팀의 실제 컴포넌트**를 쓰게 합니다.
- **전문 변환 도구** — Builder.io Visual Copilot, Anima, Locofy 등. 기존 컴포넌트 라이브러리와 연결할 수 있는 도구일수록 실전 가치가 높습니다.

## 현실적 품질 (2026)

- 프런트엔드 초기 작업 시간을 30~60% 줄여줍니다.
- 그러나 산출물은 **20~40%의 수동 정리**가 필요합니다 — 접근성, 시맨틱, 성능, 유지보수성.
- 변환 품질은 **디자인 파일의 규율에 비례**합니다. 오토 레이아웃과 정돈된 네이밍 없이는 어떤 도구도 좋은 코드를 못 만듭니다.

> 💡 **핵심**: 핸드오프 자동화의 성패는 도구가 아니라 **연결(Code Connect)과 파일 규율**이 결정합니다. "그리는 대로 코드가 된다"가 아니라 "정리한 만큼 코드가 된다"입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "claude — Figma MCP 핸드오프",
            lines: [
              { text: "선택한 결제 화면을 React로 구현해 줘", tone: "cmd" },
              { text: "Figma MCP: 레이어 트리·토큰·컴포넌트명 수신", tone: "out" },
              { text: "Code Connect 매핑 발견: Button/Primary → <Button>", tone: "ok" },
              { text: "CheckoutForm.tsx 생성 (우리 컴포넌트 사용)", tone: "ok" },
              { text: "# 사람: 접근성 라벨·에러 상태·긴 텍스트 보완", tone: "comment" },
              { text: "npm run check", tone: "cmd" },
              { text: "✓ lint · type · test 통과", tone: "ok" },
              { text: "# 초기 구현 60% 단축, 정리 30%는 사람 몫", tone: "comment" },
            ],
            caption: "구조화 데이터 + 컴포넌트 매핑 + 사람의 마무리 — 2026년 핸드오프의 실제 모습입니다.",
          },
        },
      ],
    },
    {
      slug: "ux-research-collab",
      title: "UX 리서치와 협업",
      description: "리서치 자동화의 활용과 함정, 그리고 디자이너의 새 역할",
      lessons: [
        {
          slug: "ai-user-research",
          title: "유저 리서치에 AI: 전사·태깅·인사이트 추출",
          minutes: 6,
          content: `인터뷰 6건을 분석하는 데 일주일 걸리던 일이 하루로 줄었습니다. 단, **줄어든 것은 시간이지 판단 책임이 아닙니다**.

## AI가 잘하는 것 (2026 기준)

- **전사** — 음성→텍스트 정확도 95~98%, 화자 분리까지 자동입니다. 이 단계는 안심하고 맡기세요.
- **태깅·클러스터링** — Dovetail의 Magic Cluster처럼 하이라이트를 주제별로 자동 그룹화합니다. 테마 추출은 전문가 코더와 80~85% 일치 수준 — 쓸 만하지만 **맹신할 수준은 아닙니다**.
- **질의 응답** — "가입 중 이탈 신호가 나온 순간은?"처럼 전사본 전체에 질문을 던져 근거 발췌를 받습니다.

## 반드시 지킬 편향 가드

- **원문 대조** — AI 요약의 모든 인사이트는 원문 인용으로 역추적합니다. 인용 없는 인사이트는 채택하지 않습니다.
- **확증 편향 경계** — "사용자들이 X를 싫어하지?"라고 물으면 AI는 싫어한 증거만 모아줍니다. 중립형 질문으로 물으세요.
- **소수 의견 확인** — 클러스터링은 다수 패턴을 키우고 소수 신호를 묻습니다. 어느 클러스터에도 속하지 않은 발언을 일부러 훑어보세요.

> 💡 **핵심**: 전사는 맡기고, 태깅은 검토하고, 인사이트는 **원문 인용으로 검증**합니다. AI는 리서치의 손을 대신하지, 판단을 대신하지 않습니다.`,
          illustration: {
            type: "flow",
            title: "AI 리서치 분석 파이프라인",
            nodes: [
              {
                label: "녹음 업로드 → 자동 전사",
                sublabel: "정확도 95~98% · 화자 분리",
                icon: "mic",
                tone: "primary",
              },
              {
                label: "AI 태깅·클러스터링",
                sublabel: "전문가와 80~85% 일치 — 검토 필요",
                icon: "brain",
                tone: "accent",
              },
              {
                label: "원문 대조 검증",
                sublabel: "인용 없는 인사이트는 폐기",
                icon: "search",
                tone: "warning",
                edgeLabel: "사람의 관문",
              },
              {
                label: "인사이트 확정·공유",
                sublabel: "근거 인용과 함께 문서화",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "세 번째 관문(원문 대조)을 건너뛰는 순간 리서치가 아니라 소설이 됩니다.",
          },
          demo: {
            title: "인터뷰 녹취 AI 분석 따라하기",
            app: {
              kind: "browser",
              url: "app.dovetail.com/projects/onboarding",
              blocks: [
                { id: "b-head", type: "heading", label: "온보딩 리서치 — 인터뷰 6건" },
                { id: "b-upload", type: "button", label: "녹음 파일 업로드" },
                {
                  id: "b-file",
                  type: "card",
                  label: "🎙 interview-03.mp3 (42분)",
                  hidden: true,
                },
                {
                  id: "b-transcribed",
                  type: "badge",
                  label: "전사 완료 — 화자 2명 분리",
                  hidden: true,
                },
                { id: "b-cluster", type: "button", label: "테마 자동 클러스터링" },
                {
                  id: "b-theme1",
                  type: "card",
                  label: "테마 1: 가입 단계가 너무 길다 (5/6명)",
                  hidden: true,
                },
                {
                  id: "b-theme2",
                  type: "card",
                  label: "테마 2: 요금제 용어가 어렵다 (3/6명)",
                  hidden: true,
                },
                {
                  id: "b-quote",
                  type: "text",
                  label: "원문 인용: \"세 번째 화면에서 포기할 뻔했어요\"",
                  hidden: true,
                },
                { id: "b-ask", type: "input", label: "전사본에 질문하기…" },
                {
                  id: "b-verify",
                  type: "badge",
                  label: "⚠ 원문 대조 후 인사이트 확정",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 인터뷰 녹음을 업로드해 자동 전사합니다" },
              { t: "move", target: "b-upload" },
              { t: "click" },
              { t: "reveal", target: "b-file" },
              { t: "reveal", target: "b-transcribed" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 테마 자동 클러스터링을 실행합니다" },
              { t: "move", target: "b-cluster" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "reveal", target: "b-theme1" },
              { t: "reveal", target: "b-theme2" },
              { t: "caption", text: "③ 테마의 근거를 원문 인용으로 확인합니다" },
              { t: "move", target: "b-theme1" },
              { t: "click" },
              { t: "reveal", target: "b-quote" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ 중립형 질문으로 데이터를 파고듭니다" },
              { t: "click", target: "b-ask" },
              { t: "type", target: "b-ask", text: "가입 중 이탈 신호가 나온 순간은?" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "⑤ 요약은 초안 — 원문 대조로 사람이 확정합니다" },
              { t: "reveal", target: "b-verify" },
              { t: "move", target: "b-verify" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "usability-analysis",
          title: "사용성 테스트 분석 자동화, 그리고 편향 주의보",
          minutes: 5,
          content: `사용성 테스트의 병목은 진행이 아니라 **분석**이었습니다 — 세션 영상 수십 시간을 돌려보는 일. 2026년의 도구들은 이 병목을 정면으로 공략합니다.

## 자동화되는 것들

- **세션 요약** — Maze, UserTesting 등이 세션별 요약과 태스크 성공률·이탈 지점을 자동 산출합니다.
- **AI 모더레이터** — 미리 정한 가이드에 따라 비대면 세션을 진행하고 후속 질문까지 던집니다. 사람 모더레이터의 즉흥적 유도 발언이 없어 오히려 **일관성**이 좋습니다.
- **편향 질문 감지** — 스터디 설계 단계에서 유도 질문("이 버튼이 편하시죠?")을 자동으로 지적해줍니다.

## 그래도 남는 함정

- AI 요약은 **말한 것**을 잘 잡고 **말하지 않은 것**(머뭇거림, 표정, 어긋난 클릭)을 놓칩니다. 실패 태스크의 영상은 직접 보세요.
- 요약이 매끄러울수록 검증 없이 믿게 되는 **자동화 편향**이 생깁니다. 결정에 쓰이는 발견은 반드시 세션 원본으로 재확인합니다.
- 참가자 모집 편향은 AI가 못 잡습니다 — 표본 설계는 여전히 사람 일입니다.

> 💡 **핵심**: 분석 자동화의 올바른 용도는 "볼 영상을 줄이는 것"이지 "영상을 안 보는 것"이 아닙니다. **AI가 골라준 결정적 순간을 사람이 봅니다.**`,
          illustration: {
            type: "compare",
            title: "분석 자동화: 잘 맡긴 팀 vs 잘못 맡긴 팀",
            columns: [
              {
                title: "잘못 맡긴 팀",
                icon: "alert",
                tone: "warning",
                items: [
                  "AI 요약만 읽고 결정",
                  "유도 질문을 그대로 사용",
                  "머뭇거림·비언어 신호 놓침",
                  "매끄러운 요약을 맹신",
                ],
              },
              {
                title: "잘 맡긴 팀",
                icon: "check",
                tone: "primary",
                items: [
                  "AI가 지목한 순간만 영상 확인",
                  "편향 질문 감지로 설계 보정",
                  "실패 태스크는 원본 시청",
                  "결정용 발견은 재검증",
                ],
              },
            ],
            caption: "같은 도구, 다른 결과 — 차이는 '원본 확인 관문'의 유무입니다.",
          },
        },
        {
          slug: "new-designer-role",
          title: "흐려지는 경계: 개발자·PM과 일하는 새 방식",
          minutes: 5,
          content: `AI가 협업을 줄여줄 것 같지만, 현실은 반대입니다. **모두가 빨라진 만큼 맞춰야 할 접점이 늘었습니다.**

## 무슨 일이 벌어지고 있나

- 디자이너의 65%가 프로덕트·엔지니어링 업무를 더 맡게 됐다고 답했고, 엔지니어와 PM도 40%가 디자인 작업에 더 참여합니다. **역할 경계가 실제로 흐려지고 있습니다.**
- PM이 Figma Make로 프로토타입을 만들어 오고, 개발자가 Code to Canvas로 구현 변형을 디자인 파일에 밀어 넣는 시대 — 디자인 파일은 더 이상 디자이너만의 공간이 아닙니다.

## 디자이너의 새 포지션

- **품질 기준의 소유자** — 누구나 화면을 만들 수 있으니, "무엇이 좋은 화면인가"의 기준을 세우고 지키는 사람이 필요합니다.
- **시스템의 관리자** — 모두가 쓰는 라이브러리·토큰·가이드가 곧 제품 일관성입니다. 시스템 관리가 곧 디자인 리더십입니다.
- **구현 감각의 통역자** — HTML/CSS와 컴포넌트 구조를 이해하면 핸드오프가 깨끗해지고, AI가 만든 코드 초안에 대한 대화가 가능해집니다.

## 실무 팁

PM의 AI 프로토타입을 무시하지도, 그대로 받지도 마세요. **"의도는 접수, 완성도는 시스템으로"** — 초안으로 존중하고 시스템으로 재해석하는 것이 새 협업 예절입니다.

> 💡 **핵심**: AI 시대의 디자이너는 화면의 생산자에서 **기준과 시스템의 소유자**로 이동합니다. 경계가 흐려질수록 기준을 쥔 사람이 중심이 됩니다.`,
          illustration: {
            type: "grid",
            title: "디자이너의 새 포지션 4가지",
            items: [
              {
                label: "품질 기준의 소유자",
                sublabel: "무엇이 좋은 화면인지 정의",
                icon: "target",
                tone: "primary",
              },
              {
                label: "시스템 관리자",
                sublabel: "라이브러리·토큰이 곧 일관성",
                icon: "layers",
                tone: "accent",
              },
              {
                label: "구현 통역자",
                sublabel: "코드 구조를 아는 핸드오프",
                icon: "code",
                tone: "success",
              },
              {
                label: "판단하는 눈",
                sublabel: "AI 초안 10개 중 정답 고르기",
                icon: "eye",
                tone: "warning",
              },
            ],
            caption: "PM도 개발자도 화면을 만드는 시대 — 기준을 쥔 사람이 디자이너입니다.",
          },
        },
        {
          slug: "portfolio-career",
          title: "AI 시대의 포트폴리오: 결과물이 아니라 판단을 보여라",
          minutes: 5,
          content: `누구나 그럴듯한 화면을 만드는 시대에, 그럴듯한 화면만 모은 포트폴리오는 **아무것도 증명하지 못합니다**.

## 채용하는 쪽이 이제 보는 것

- 최종 화면이 아니라 **과정의 판단** — 왜 이 방향을 골랐고, 무엇을 버렸는가.
- AI를 **어떻게 부렸는가** — 어떤 단계를 자동화했고, 어디에 사람의 손을 남겼는가.
- **시스템 사고** — 화면 한 장이 아니라 컴포넌트·토큰·가이드로 사고한 흔적.

## 포트폴리오에 넣을 새 재료

1. **비포/애프터 스토리** — AI 초안 vs 시스템에 맞게 다듬은 결과를 나란히. "이 간극이 내 일"이라는 가장 강한 증명입니다.
2. **폐기한 옵션의 이유** — 생성한 10개 중 9개를 버린 기준을 한 단락으로.
3. **리서치→결정의 연결** — 인터뷰 인용이 어떻게 디자인 결정으로 이어졌는지 근거 사슬을 보여줍니다.
4. **워크플로우 자체** — 내가 설계한 AI 협업 프로세스(도구·관문·검증)를 다이어그램으로.

## 차별화의 방향

"AI를 안 쓴다"도 "AI가 다 했다"도 아닙니다. **AI를 팀원처럼 부리되 품질의 최종 서명은 내가 한다** — 이것이 2026년 시니어의 서사입니다.

> 💡 **핵심**: 포트폴리오의 질문이 바뀌었습니다. "무엇을 만들었나"가 아니라 **"무엇을 판단했나"**. 판단의 기록을 남기는 습관이 곧 커리어 자산입니다.`,
          illustration: {
            type: "steps",
            title: "AI 시대 포트폴리오 재구성 4단계",
            steps: [
              {
                label: "비포/애프터 배치",
                sublabel: "AI 초안 vs 내가 다듬은 결과",
                icon: "image",
              },
              {
                label: "폐기의 이유 기록",
                sublabel: "버린 9개의 판단 기준",
                icon: "filter",
              },
              {
                label: "근거 사슬 연결",
                sublabel: "리서치 인용 → 디자인 결정",
                icon: "link",
              },
              {
                label: "워크플로우 공개",
                sublabel: "도구·관문·검증 다이어그램",
                icon: "workflow",
              },
            ],
            caption: "결과물은 흔해졌습니다 — 판단의 기록이 여러분의 서명입니다.",
          },
        },
      ],
    },
  ],
};
