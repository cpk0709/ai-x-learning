import type { Course } from "../types";

/**
 * AI 디자인 마스터 — Midjourney & Stable Diffusion (2026년 기준)
 *
 * 프롬프트 문법 → 일관성 제어(ControlNet·캐릭터) → 상업용 에셋 제작까지,
 * 이미지 생성 AI를 '운'이 아닌 '설계'로 다루는 법을 배웁니다.
 */
export const aiDesign: Course = {
  slug: "ai-design",
  title: "AI 디자인 마스터: Midjourney & Stable Diffusion",
  subtitle: "프롬프트 문법부터 일관된 캐릭터, 상업용 웹 에셋 제작까지",
  description:
    "2026년의 이미지 생성 AI는 '뽑기'가 아니라 '설계'의 도구입니다. 이 강의에서는 주제·스타일·구도·조명·파라미터로 이루어진 프롬프트의 문법을 익히고, Midjourney의 스타일·옴니 레퍼런스와 Stable Diffusion의 ControlNet으로 결과물을 정밀하게 통제합니다. 나아가 일관된 캐릭터 제작, 업스케일 파이프라인, 히어로 이미지·아이콘 같은 상업용 웹 에셋 워크플로우와 2026년 기준 라이선스·저작권 이슈까지 — 실무에 바로 쓰는 순서로 배웁니다.",
  category: "creative",
  level: "beginner",
  tags: ["Midjourney", "Stable Diffusion", "ControlNet", "프롬프트", "웹 디자인 에셋"],
  gradient: ["#f59e0b", "#ef4444"],
  icon: "palette",
  outcomes: [
    "주제·스타일·구도·조명·파라미터 5요소로 프롬프트를 설계할 수 있다",
    "--ar, --stylize, --sref 등 Midjourney 파라미터로 결과를 통제할 수 있다",
    "ControlNet과 레퍼런스 기법으로 일관된 캐릭터·구도를 유지할 수 있다",
    "브랜드 일관성을 지키는 상업용 웹 에셋을 라이선스 문제없이 제작할 수 있다",
  ],
  modules: [
    {
      slug: "prompt-grammar",
      title: "이미지 프롬프트의 문법",
      description: "운에 맡기는 뽑기에서 설계하는 프롬프트로",
      lessons: [
        {
          slug: "prompt-anatomy",
          title: "프롬프트의 5요소: 주제·스타일·구도·조명·파라미터",
          minutes: 5,
          content: `"예쁜 그림 그려줘"로는 예쁜 그림이 나오지 않습니다. AI는 우리가 말하지 않은 부분을 전부 제멋대로 채우기 때문입니다. 그래서 좋은 이미지 프롬프트는 **문장이 아니라 설계도**입니다.

## 프롬프트를 이루는 5개의 층

- **주제(Subject)** — 무엇을 그릴 것인가. 인물·사물·장면을 구체적으로 씁니다.
- **스타일(Style)** — 어떤 그림체인가. 사진처럼/일러스트/3D, 시대의 분위기.
- **구도(Composition)** — 카메라가 어디에 있는가. 얼굴만 크게(클로즈업), 위에서 내려다보기(부감), 넓게 담기(광각), 여백 두기.
- **조명(Lighting)** — 빛이 어디서 오는가. 해질 무렵의 노을빛(골든아워), 스튜디오 조명, 네온, 역광.
- **파라미터(Parameters)** — \`--ar\` 같은 짧은 코드. 비율·화풍 강도를 조절하는 다이얼로, 다음다음 레슨에서 자세히 다룹니다.

## 왜 층을 나눠 쓰는가

- 모델은 **앞에 쓴 단어를 더 중요하게** 여깁니다. 가장 중요한 주제를 맨 앞에 두세요.
- 층을 나눠 두면 결과가 마음에 안 들 때 **어느 층 하나만** 고치면 됩니다. 건물 설계도가 층별로 나뉘어 있어 "2층 창문만 수정"이 가능한 것과 같습니다.
- "조명만 바꿔서 4장 더" 같은 변주 실험이 가능해집니다 — 이것이 디자이너의 실제 작업 방식입니다.

## 처음이라면 이렇게

영어가 부담되면 한국어로 5요소를 먼저 쓰고, 챗봇에게 "이미지 프롬프트용 영어로 바꿔줘"라고 부탁하세요. 요소별 키워드는 쉼표로 구분해 나열하면 됩니다. 유창한 영어보다 **요소를 빠뜨리지 않는 것**이 훨씬 중요합니다.

> 💡 **핵심**: 프롬프트는 한 문장이 아니라 **주제→스타일→구도→조명→파라미터의 5층 설계도**입니다. 층을 나누는 순간 결과를 통제할 수 있게 됩니다.`,
          illustration: {
            type: "stack",
            title: "프롬프트 5층 설계도",
            layers: [
              {
                label: "주제 (Subject)",
                sublabel: "무엇을 — 가장 앞, 가장 구체적으로",
                icon: "target",
                tone: "primary",
              },
              {
                label: "스타일 (Style)",
                sublabel: "화풍·매체·시대의 무드",
                icon: "palette",
                tone: "accent",
              },
              {
                label: "구도 (Composition)",
                sublabel: "카메라 위치·앵글·여백",
                icon: "camera",
                tone: "accent",
              },
              {
                label: "조명 (Lighting)",
                sublabel: "빛의 방향·시간대·분위기",
                icon: "sparkles",
                tone: "accent",
              },
              {
                label: "파라미터 (Parameters)",
                sublabel: "--ar, --stylize 등 숫자 명령",
                icon: "settings",
                tone: "muted",
              },
            ],
            caption: "결과가 아쉬우면 전체를 다시 쓰지 말고, 문제가 있는 층 하나만 고치세요.",
          },
        },
        {
          slug: "bad-vs-good-prompt",
          title: "나쁜 프롬프트 vs 좋은 프롬프트",
          minutes: 5,
          content: `같은 모델, 같은 요금제를 쓰는데도 결과가 하늘과 땅 차이인 이유는 단 하나 — **프롬프트에 담긴 정보량**입니다.

## 나쁜 프롬프트의 3가지 습관

- **모호한 형용사**: "예쁜", "멋진", "고퀄리티" — 사람마다 기준이 다르듯 모델마다 해석이 제각각입니다.
- **정보 없는 요청**: 주제만 있고 스타일·구도·조명이 없으면, 빠진 부분은 전부 운에 맡겨집니다.
- **한 번에 다 넣기**: 서로 충돌하는 키워드를 20개씩 나열하면 모델은 어중간한 평균을 내버립니다.

## 좋은 프롬프트로 고치는 법

- 형용사를 **시각적 사실**(눈에 보이는 그대로의 묘사)로 바꿉니다. "예쁜 카페" → "통유리창으로 오후 햇살이 드는 미니멀 카페".
- 5요소 체크: 주제 → 스타일 → 구도 → 조명 → 파라미터 순으로 빠진 층을 채웁니다.
- **빼기의 기술**: 원치 않는 요소는 "빼 달라"고 명시합니다. \`--no text, watermark\`라고 쓰면 글자와 워터마크가 빠집니다. AI는 시키지 않아도 글자를 그려 넣는 일이 잦아, 이 둘은 습관처럼 붙입니다.

## 실무 감각

프롬프트를 "주문서"라고 생각하세요. 카페에서 "맛있는 거 주세요"라고 하면 무엇이 나올지 모르지만, "아이스 라떼, 샷 추가, 얼음 적게"는 항상 같은 결과가 나옵니다.

## 직접 고쳐보기

"멋진 강아지 그림"을 5요소로 고쳐볼까요. 주제(골든리트리버 강아지), 스타일(수채화 일러스트), 구도(전신이 보이는 정면), 조명(부드러운 아침 햇살)을 채우면 — "골든리트리버 강아지, 수채화 일러스트, 전신 정면 구도, 부드러운 아침 햇살"이 됩니다. 이 습관이 들면 어떤 주제든 같은 방식으로 주문할 수 있습니다.

> 💡 **핵심**: 좋은 프롬프트 = 모호한 형용사를 **시각적 사실**로 바꾸고, 5요소의 빈칸을 채운 주문서입니다.`,
          illustration: {
            type: "chat",
            title: "같은 요청, 다른 결과",
            messages: [
              { role: "user", text: "예쁜 카페 그림 고퀄리티로 그려줘" },
              {
                role: "ai",
                text: "(랜덤 스타일의 평범한 카페 4장 — 매번 다른 결과)",
              },
              {
                role: "user",
                text: "미니멀 인테리어의 카페, 통유리창으로 드는 오후 햇살, 광각 인테리어 사진, 필름 톤 --ar 16:9 --no people, text",
              },
              {
                role: "ai",
                text: "(의도한 무드·구도·비율이 재현된 4장 — 다시 뽑아도 방향 유지)",
              },
            ],
            caption: "모호한 형용사를 시각적 사실로 바꾸는 것이 프롬프트 개선의 90%입니다.",
          },
        },
        {
          slug: "midjourney-parameters",
          title: "Midjourney 핵심 파라미터: --ar, --stylize, --sref",
          minutes: 6,
          content: `\`--ar 16:9\` 같은 코드를 처음 보면 암호처럼 느껴집니다. 하지만 정체는 단순합니다 — 각각이 **결과물의 한 가지 성질만 돌려서 조절하는 다이얼**입니다. 프롬프트가 '무엇을' 그릴지라면 파라미터는 '어떤 모양·강도로' 뽑을지이고, 항상 프롬프트 맨 뒤에 붙여 씁니다. 최신 Midjourney(V7 이후)에서 실무에 쓰는 다이얼은 몇 개 안 됩니다.

## 반드시 쓰는 3개

- \`--ar 16:9\` — **화면 비율(aspect ratio) 다이얼**. 가로:세로 모양을 정합니다. 웹 히어로는 16:9~21:9(TV처럼 넓게), SNS는 1:1(정사각형), 포스터는 2:3(세로).
- \`--stylize 0~1000\`(줄여서 \`--s\`) — **Midjourney가 멋을 부리는 정도**. 낮추면 쓴 대로 충실하게, 높이면 알아서 예술적으로 해석합니다. 기본값 100.
- \`--sref [이미지 URL]\` — **스타일 레퍼런스**. "이 이미지 느낌으로"라며 견본을 보여주는 것. 색감·질감·무드만 가져오고 내용은 프롬프트를 따릅니다. \`--sw\`로 반영 강도를 조절합니다.

## 상황별로 쓰는 것

- \`--oref\` — 옴니 레퍼런스(V7+). 특정 인물·캐릭터·사물을 새 장면에 등장시킵니다. 구버전의 \`--cref\`를 대체했습니다.
- \`--seed\` — 주사위 눈 고정. AI는 매번 다른 주사위를 굴리는데, 같은 시드 + 같은 프롬프트면 비슷한 결과가 다시 나옵니다.
- \`--chaos\`, \`--weird\` — 함께 나오는 4장이 서로 얼마나 다르고 엉뚱할지. 아이디어 탐색 단계에서만.
- \`--raw\` — 멋 부림을 끈 절제 모드. 사진·제품컷에 유리합니다.

> 💡 **핵심**: 탐색할 때는 \`--chaos\`를 올리고, 확정할 때는 \`--seed\`와 \`--sref\`로 고정하세요. **탐색과 고정의 다이얼은 다릅니다.**`,
          illustration: {
            type: "terminal",
            windowTitle: "Midjourney — /imagine",
            lines: [
              { text: "/imagine minimal cafe interior, afternoon light", tone: "cmd" },
              { text: "  --ar 16:9 --stylize 200", tone: "cmd" },
              { text: "4장 생성 완료 — 무드 탐색", tone: "ok" },
              { text: "# 2번 이미지의 스타일이 마음에 듦 → 고정", tone: "comment" },
              { text: "/imagine cozy bookstore interior", tone: "cmd" },
              { text: "  --sref https://.../cafe-2.png --sw 300 --ar 16:9", tone: "cmd" },
              { text: "같은 색감·무드의 서점 4장 생성", tone: "ok" },
              { text: "# 내용은 바뀌고 스타일은 유지됨", tone: "comment" },
            ],
            caption: "--sref는 '내용'이 아니라 '스타일'만 이식합니다 — 시리즈 작업의 핵심 무기입니다.",
          },
          demo: {
            title: "Midjourney 웹에서 생성과 업스케일 따라하기",
            app: {
              kind: "browser",
              url: "midjourney.com/imagine",
              blocks: [
                { id: "mj-head", type: "heading", label: "Imagine" },
                { id: "mj-prompt", type: "input", label: "프롬프트를 입력하세요…" },
                { id: "mj-generate", type: "button", label: "Generate" },
                { id: "mj-loading", type: "badge", label: "생성 중… 4장", hidden: true },
                { id: "mj-img1", type: "card", label: "🖼 cafe-01 — 창가 구도", hidden: true },
                { id: "mj-img2", type: "card", label: "🖼 cafe-02 — 필름 톤 ✓", hidden: true },
                { id: "mj-img3", type: "card", label: "🖼 cafe-03 — 광각", hidden: true },
                { id: "mj-img4", type: "card", label: "🖼 cafe-04 — 클로즈업", hidden: true },
                { id: "mj-upscale", type: "button", label: "Upscale (Subtle)", hidden: true },
                {
                  id: "mj-final",
                  type: "card",
                  label: "✨ cafe-02-4K.png — 업스케일 완료",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 프롬프트 입력창을 클릭합니다" },
              { t: "move", target: "mj-prompt" },
              { t: "click" },
              { t: "caption", text: "② 주제를 먼저 쓰고 파라미터는 뒤에 붙입니다" },
              { t: "type", target: "mj-prompt", text: "minimal cafe interior --ar 16:9 --s 200" },
              { t: "caption", text: "③ Generate를 눌러 4장을 생성합니다" },
              { t: "move", target: "mj-generate" },
              { t: "click" },
              { t: "reveal", target: "mj-loading" },
              { t: "wait", ms: 700 },
              { t: "hide", target: "mj-loading" },
              { t: "reveal", target: "mj-img1" },
              { t: "reveal", target: "mj-img2" },
              { t: "reveal", target: "mj-img3" },
              { t: "reveal", target: "mj-img4" },
              { t: "caption", text: "④ 무드가 잡힌 2번 컷을 선택합니다" },
              { t: "move", target: "mj-img2" },
              { t: "click" },
              { t: "reveal", target: "mj-upscale" },
              { t: "caption", text: "⑤ 충실형 업스케일로 4K 납품본을 만듭니다" },
              { t: "move", target: "mj-upscale" },
              { t: "click" },
              { t: "reveal", target: "mj-final" },
              { t: "move", target: "mj-final" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "style-reference-moodboard",
          title: "무드보드에서 스타일 레퍼런스로",
          minutes: 5,
          content: `디자이너는 프롬프트를 쓰기 전에 무드보드부터 만듭니다. 2026년의 무드보드는 벽에 붙여 놓고 감상하는 콜라주가 아니라 **AI에게 직접 먹이는 입력값**입니다.

## 무드보드 → 프롬프트 워크플로우

1. **수집** — 원하는 느낌의 이미지를 10~20장 모읍니다. 핀터레스트, 예전 작업물, AI 생성물 어디서 가져와도 좋습니다.
2. **선별** — 색감·질감·조명이 서로 닮은 3~5장으로 좁힙니다. 이 단계에서 무드가 결정됩니다.
3. **언어화** — 남긴 이미지들의 공통점을 5요소의 말로 적어봅니다. 예: "저채도 파스텔, 필름 그레인(필름 사진 특유의 자글자글한 입자), 자연광".
4. **레퍼런스 연결** — \`--sref\`에 이미지를 걸고, 언어화한 키워드를 프롬프트에 함께 씁니다.

## 왜 이미지와 언어를 둘 다 쓰는가

- \`--sref\`만 쓰면 스타일은 잡히지만 **왜 그 스타일인지** 팀원에게 설명할 수 없습니다.
- 말로 정리한 키워드는 다른 도구(Stable Diffusion 등)로 옮길 때 그대로 들고 갈 수 있는 **이식 가능한 자산**이 됩니다.
- 무드보드 이미지 여러 장을 \`--sref\`로 섞어 나만의 스타일 코드를 만들 수도 있습니다.

## 초보가 막히기 쉬운 지점

- \`--sref\`에는 인터넷에서 접근 가능한 이미지 주소(URL)가 필요합니다. 내 컴퓨터의 파일은 Midjourney 웹 화면에 끌어다 놓으면 업로드되며 주소가 생깁니다.
- 견본들의 무드가 서로 다르면 결과도 이도 저도 아니게 섞입니다. 선별 단계에서 과감히 버리는 것이 요령입니다.
- 결과가 견본과 너무 똑같이 나오면 \`--sw\` 값을 낮춰 반영 강도를 줄이세요.

> 💡 **핵심**: 무드보드는 감상용 콜라주가 아니라 **수집→선별→언어화→레퍼런스 연결**로 이어지는 스타일 파이프라인의 첫 단계입니다.`,
          illustration: {
            type: "steps",
            title: "무드보드 → 스타일 레퍼런스 4단계",
            steps: [
              {
                label: "수집",
                sublabel: "무드에 맞는 이미지 10~20장",
                icon: "search",
              },
              {
                label: "선별",
                sublabel: "색감·질감이 일관된 3~5장",
                icon: "filter",
              },
              {
                label: "언어화",
                sublabel: "공통점을 5요소 키워드로",
                icon: "file-text",
              },
              {
                label: "레퍼런스 연결",
                sublabel: "--sref + 키워드로 생성",
                icon: "wand",
              },
            ],
            caption: "언어화 단계를 건너뛰면 스타일을 다른 도구·팀원에게 이식할 수 없습니다.",
          },
        },
      ],
    },
    {
      slug: "consistency-craft",
      title: "일관성의 기술",
      description: "한 장의 행운을 반복 가능한 시스템으로 — ControlNet과 캐릭터 고정",
      lessons: [
        {
          slug: "controlnet-basics",
          title: "ControlNet: 포즈와 구도를 못 박는 법",
          minutes: 6,
          content: `프롬프트만으로는 "왼손을 든 캐릭터"를 정확히 만들 수 없습니다. 포즈나 구도를 말로 1mm 단위까지 지시할 수는 없기 때문입니다. **구조를 통제하려면 구조를 그림으로 입력**해야 합니다 — 그것이 ControlNet입니다.

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

> 💡 **핵심**: 프롬프트는 '내용'을, ControlNet은 '구조'를 담당합니다. 이 분업을 이해하면 우연이 아니라 **설계로** 그림을 만들 수 있습니다.`,
          illustration: {
            type: "flow",
            title: "ControlNet 파이프라인",
            nodes: [
              {
                label: "레퍼런스 이미지",
                sublabel: "원하는 포즈·구도의 사진",
                icon: "image",
                tone: "muted",
              },
              {
                label: "전처리기",
                sublabel: "OpenPose · Depth · Canny",
                icon: "scissors",
                tone: "accent",
                edgeLabel: "구조만 추출",
              },
              {
                label: "ControlNet + 프롬프트",
                sublabel: "구조는 조건으로, 내용은 텍스트로",
                icon: "layers",
                tone: "primary",
                edgeLabel: "조건 주입",
              },
              {
                label: "결과 이미지",
                sublabel: "포즈 고정 + 새로운 화풍",
                icon: "sparkles",
                tone: "success",
              },
            ],
            caption: "구조(뼈대)와 내용(살)을 분리해서 입력하는 것이 ControlNet의 전부입니다.",
          },
          demo: {
            title: "ControlNet 포즈 고정 생성 따라하기",
            app: {
              kind: "browser",
              url: "localhost:8188/controlnet",
              blocks: [
                {
                  id: "cn-head",
                  type: "heading",
                  label: "ControlNet — 구조는 이미지로, 내용은 텍스트로",
                },
                { id: "cn-upload", type: "button", label: "📤 포즈 레퍼런스 업로드" },
                {
                  id: "cn-pose",
                  type: "card",
                  label: "🧍 pose-ref.jpg — 왼손을 든 포즈",
                  hidden: true,
                },
                { id: "cn-prep", type: "button", label: "전처리기: OpenPose" },
                {
                  id: "cn-skeleton",
                  type: "card",
                  label: "🦴 skeleton.png — 뼈대만 추출됨",
                  hidden: true,
                },
                { id: "cn-prompt", type: "input", label: "프롬프트를 입력하세요…" },
                { id: "cn-generate", type: "button", label: "Generate" },
                {
                  id: "cn-result",
                  type: "card",
                  label: "🎨 결과 — 수채화 기사, 포즈는 그대로",
                  hidden: true,
                },
                {
                  id: "cn-badge",
                  type: "badge",
                  label: "✓ 구조 일치 — 포즈 고정 성공",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 원하는 포즈의 레퍼런스를 업로드합니다" },
              { t: "move", target: "cn-upload" },
              { t: "click" },
              { t: "reveal", target: "cn-pose" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② OpenPose 전처리기로 뼈대만 추출합니다" },
              { t: "move", target: "cn-prep" },
              { t: "click" },
              { t: "reveal", target: "cn-skeleton" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 내용은 프롬프트로 씁니다 — 화풍과 주제" },
              { t: "move", target: "cn-prompt" },
              { t: "click" },
              { t: "type", target: "cn-prompt", text: "watercolor knight, dramatic light" },
              { t: "caption", text: "④ 생성합니다 — 구조는 조건, 내용은 텍스트" },
              { t: "move", target: "cn-generate" },
              { t: "click" },
              { t: "reveal", target: "cn-result" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "cn-badge" },
              { t: "caption", text: "⑤ 포즈는 그대로, 화풍만 바뀌었습니다" },
              { t: "move", target: "cn-result" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "consistent-character",
          title: "일관된 캐릭터 만들기: 시트·시드·레퍼런스",
          minutes: 7,
          content: `웹툰, 브랜드 마스코트, 게임 일러스트의 공통 난제 — "다음 컷에서도 같은 얼굴"입니다. AI는 매번 처음부터 새로 그리기 때문에, 그냥 두면 얼굴이 계속 바뀝니다. 한 장의 행운을 **반복 가능한 시스템**으로 바꿔봅니다.

## 캐릭터 일관성 루프

1. **베이스 생성** — 외모를 말로 빠짐없이 적습니다(머리색, 눈, 의상, 체형). 이 서술문이 캐릭터의 '주민등록증'입니다.
2. **베스트 컷 선별** — 생성된 이미지 중 캐릭터다움이 가장 잘 드러난 1장을 고릅니다. 여러 장을 나란히 놓고 비교하면 고르기 쉽습니다.
3. **캐릭터 시트 제작** — 그 이미지를 참고로 정면·측면·표정 변화를 한 화면에 뽑습니다. 프롬프트에 character sheet, multiple views를 씁니다.
4. **레퍼런스 등록 후 재생성** — Midjourney는 \`--oref\`(옴니 레퍼런스)에 시트를 걸고, Stable Diffusion은 IP-Adapter(참고 이미지를 조건으로 꽂아 주는 장치)나 캐릭터 LoRA를 학습시켜 새 장면을 만듭니다.

새 장면에서 잘 나온 컷은 다시 시트에 추가합니다 — 돌수록 캐릭터가 단단해지는 루프입니다. 웹툰처럼 컷이 많은 작업일수록 이 루프의 효과가 큽니다.

## 보조 장치

- **시드 고정**: 같은 \`--seed\`를 쓰면 "의상만 바꾸기"처럼 한 가지 변수만 바꾸는 실험이 가능해집니다.
- **서술문 재사용**: 레퍼런스 이미지가 있어도 외모 서술문은 항상 함께 씁니다. 이미지와 텍스트가 서로를 보강합니다.
- **시트 배경 비우기**: 시트의 배경은 단색으로 둡니다. 배경이 복잡하면 레퍼런스가 캐릭터만이 아니라 배경까지 따라 하려고 합니다.

> 💡 **핵심**: 캐릭터 일관성은 한 번의 프롬프트가 아니라 **생성→선별→시트화→레퍼런스 재투입**을 반복하는 루프에서 나옵니다.`,
          illustration: {
            type: "cycle",
            title: "캐릭터 일관성 루프",
            center: "돌수록 캐릭터가 단단해짐",
            nodes: [
              { label: "베이스 생성", sublabel: "외모를 완전히 언어화", icon: "user" },
              { label: "베스트 컷 선별", sublabel: "정체성이 가장 또렷한 1장", icon: "eye" },
              { label: "캐릭터 시트화", sublabel: "정면·측면·표정 모음", icon: "clipboard" },
              { label: "레퍼런스 재투입", sublabel: "--oref · LoRA로 새 장면", icon: "refresh" },
            ],
            caption: "새 장면의 좋은 컷을 다시 시트에 추가하면 일관성이 누적됩니다.",
          },
        },
        {
          slug: "upscale-pipeline",
          title: "업스케일과 후보정: 뽑고 끝이 아니다",
          minutes: 5,
          content: `AI가 처음 내놓는 이미지는 '시안'(검토용 초안)일 뿐입니다. 촬영을 마쳤다고 사진이 완성되는 게 아니듯, 상업용 퀄리티는 **생성 이후의 파이프라인**에서 만들어집니다. 생성의 몇 초보다 후보정의 몇 분이 프로와 아마추어를 가릅니다.

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

> 💡 **핵심**: 생성은 시작일 뿐입니다. **수리→업스케일→톤 통일→포맷 최적화**까지 마쳐야 상업용 결과물입니다.`,
          illustration: {
            type: "flow",
            title: "생성 이후 후보정 파이프라인",
            nodes: [
              {
                label: "원본 생성물",
                sublabel: "1~2K 시안",
                icon: "image",
                tone: "muted",
              },
              {
                label: "인페인팅 수리",
                sublabel: "손·눈·디테일만 부분 재생성",
                icon: "wrench",
                tone: "accent",
              },
              {
                label: "업스케일",
                sublabel: "충실형 vs 창작형 선택",
                icon: "trending-up",
                tone: "primary",
              },
              {
                label: "톤 통일 + 포맷 최적화",
                sublabel: "시리즈 프리셋 · WebP/AVIF",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "인물은 충실형, 배경·일러스트는 창작형 업스케일러가 기본 선택입니다.",
          },
        },
      ],
    },
    {
      slug: "commercial-assets",
      title: "상업용 에셋 제작",
      description: "포트폴리오가 아니라 납품 — 웹 에셋 워크플로우와 법적 안전장치",
      lessons: [
        {
          slug: "web-asset-workflow",
          title: "웹 디자인 에셋 제작: 히어로·아이콘·배경",
          minutes: 6,
          content: `실무에서 AI 디자인의 최대 수요처는 웹사이트입니다. 에셋 종류마다 **쓰이는 자리와 요구 조건이 다르므로, 프롬프트 전략도 달라야** 합니다.

## 에셋별 제작 전략

- **히어로 이미지**(사이트 첫 화면의 큰 대표 이미지) — \`--ar 21:9\` 같은 와이드 비율로 생성하고, **글자가 올라갈 빈 공간**(negative space)을 프롬프트에 명시합니다. 피사체는 한쪽에 치우치게 둡니다.
- **아이콘 세트** — 한 장에 한 아이콘씩, 같은 \`--sref\`(또는 시드)로 시리즈를 뽑아 스타일을 통일합니다. 작게 줄여도 알아볼 수 있는 단순한 형태가 유리합니다.
- **배경/패턴** — \`tile\` 옵션이나 반복 패턴 프롬프트로, 벽지처럼 이어 붙여도 이음새가 안 보이는(seamless) 텍스처를 만듭니다. 색 대비를 낮게 뽑아야 위에 올라갈 글·버튼을 방해하지 않습니다.
- **일러스트 스팟** — "아직 데이터가 없어요" 같은 빈 화면이나 온보딩 안내용 삽화. 캐릭터 레퍼런스로 시리즈 일관성을 유지합니다.

처음이라면 히어로 이미지부터 연습하세요. 한 장으로 결과가 바로 보이고, 프롬프트에 "empty space on the right side"처럼 빈 공간의 위치까지 적는 감각을 가장 빨리 익힐 수 있습니다.

## 납품 전 체크

- 실제 페이지에 얹어 보고 **글자가 잘 읽히는지** 확인합니다. 어두운 화면(다크 모드)에서도 한 번 봐 두면 좋습니다.
- 모바일 세로 화면으로 잘렸을 때도 괜찮은지 봅니다 — 중요한 피사체가 잘리면 안 됩니다.
- 파일은 용도별 해상도 + WebP/AVIF로 정리합니다.

> 💡 **핵심**: 웹 에셋은 '예쁜 그림'이 아니라 **글자 여백, 축소해도 버티는 형태, 낮은 대비, 모바일 크롭**이라는 제약 조건을 통과한 그림입니다.`,
          illustration: {
            type: "grid",
            title: "웹 에셋 4종과 핵심 제약",
            items: [
              {
                label: "히어로 이미지",
                sublabel: "와이드 비율 + 텍스트 여백",
                icon: "monitor",
                tone: "primary",
              },
              {
                label: "아이콘 세트",
                sublabel: "같은 sref로 시리즈 통일",
                icon: "zap",
                tone: "accent",
              },
              {
                label: "배경·패턴",
                sublabel: "이음새 없음 + 저대비",
                icon: "layers",
                tone: "muted",
              },
              {
                label: "스팟 일러스트",
                sublabel: "캐릭터 레퍼런스로 일관성",
                icon: "smartphone",
                tone: "success",
              },
            ],
            caption: "에셋 종류가 바뀌면 비율·대비·여백 등 제약 조건부터 다시 정의하세요.",
          },
          demo: {
            title: "디자인 에디터에서 히어로 섹션 조립 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "landing-hero — Figma",
              tools: [
                { id: "tool-frame", icon: "layers", label: "프레임" },
                { id: "tool-image", icon: "image", label: "이미지" },
                { id: "tool-text", icon: "file-text", label: "텍스트" },
                { id: "tool-rect", icon: "target", label: "사각형" },
              ],
              objects: [
                { id: "frame-hero", shape: "frame", label: "Hero 1440×600", x: 6, y: 8, w: 88, h: 58 },
                {
                  id: "img-hero",
                  shape: "image",
                  label: "AI 히어로 이미지 (21:9 생성물)",
                  x: 9,
                  y: 13,
                  w: 42,
                  h: 48,
                  hidden: true,
                },
                {
                  id: "text-head",
                  shape: "text",
                  label: "AI로 디자인을 10배 빠르게",
                  x: 56,
                  y: 18,
                  w: 34,
                  h: 10,
                  hidden: true,
                },
                {
                  id: "text-sub",
                  shape: "text",
                  label: "프롬프트 템플릿으로 팀 톤 유지",
                  x: 56,
                  y: 32,
                  w: 32,
                  h: 8,
                  hidden: true,
                },
                {
                  id: "btn-cta",
                  shape: "rect",
                  label: "시작하기",
                  x: 56,
                  y: 46,
                  w: 16,
                  h: 9,
                  color: "#f59e0b",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 21:9 와이드 히어로 프레임을 확인합니다" },
              { t: "move", target: "frame-hero" },
              { t: "click" },
              { t: "caption", text: "② 이미지 툴로 AI 생성 히어로를 배치합니다" },
              { t: "move", target: "tool-image" },
              { t: "click" },
              { t: "drag", from: "frame-hero", to: "img-hero" },
              { t: "reveal", target: "img-hero" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 비워둔 여백에 헤드라인을 올립니다" },
              { t: "move", target: "tool-text" },
              { t: "click" },
              { t: "type", target: "text-head", text: "AI로 디자인을 10배 빠르게" },
              { t: "type", target: "text-sub", text: "프롬프트 템플릿으로 팀 톤 유지" },
              { t: "caption", text: "④ 사각형 툴로 CTA 버튼을 그립니다" },
              { t: "move", target: "tool-rect" },
              { t: "click" },
              { t: "drag", from: "text-sub", to: "btn-cta" },
              { t: "reveal", target: "btn-cta" },
              { t: "caption", text: "⑤ 텍스트 가독성과 여백 균형을 확인합니다" },
              { t: "move", target: "img-hero" },
              { t: "move", target: "text-head" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "brand-consistency",
          title: "브랜드 일관성: 스타일 시스템으로 굳히기",
          minutes: 5,
          content: `에셋 하나하나가 훌륭해도 서로 따로 놀면 브랜드가 무너집니다. 프랜차이즈 카페가 어느 지점에서나 같은 맛을 내는 비결이 개인의 손맛이 아니라 레시피이듯, 해법은 재능이 아니라 **시스템**입니다.

## 브랜드 스타일 시스템의 3요소

- **스타일 코드** — 확정된 무드보드 이미지들을 \`--sref\`용 고정 레퍼런스로 저장합니다. 새로 만드는 모든 에셋은 이 레퍼런스를 거쳐야 합니다.
- **프롬프트 템플릿** — 브랜드 공통 키워드(색감·질감·조명)를 템플릿으로 만들고, 에셋마다 주제만 갈아 끼웁니다. 팀원 누가 뽑아도 같은 톤이 나옵니다.
- **컬러 후처리 프리셋** — 생성 후 브랜드 색으로 보정하는 프리셋(저장해 둔 보정값)을 팀에 공유합니다. AI가 내는 색은 매번 미세하게 흔들리므로, 마지막은 항상 후처리로 잠급니다.

## 운영 규칙

- 템플릿과 레퍼런스에 **버전 번호**를 붙여 관리합니다 — "v3 스타일로 뽑아주세요" 같은 대화가 가능해집니다.
- 새 스타일 실험은 별도 폴더로 분리해 두고, 확정된 것만 템플릿에 반영합니다.
- 분기마다 전체 에셋을 한 화면에 모아 놓고 튀는 것이 없는지 **일관성 점검**을 합니다. 튀는 에셋은 템플릿으로 다시 뽑아 교체합니다.

## 1인 팀이라도 필요합니다

혼자 작업해도 석 달 뒤의 나는 남입니다. 오늘 쓴 프롬프트와 레퍼런스를 문서 하나에 정리해 두면, 다음에 에셋을 추가할 때 그 문서가 팀 역할을 합니다. 템플릿 예시: "[주제], 따뜻한 베이지 톤, 부드러운 자연광, 미니멀 일러스트" — 대괄호 부분만 갈아 끼우면 됩니다. 이 문서 한 장이 곧 우리 브랜드의 레시피입니다.

> 💡 **핵심**: 브랜드 일관성 = **고정 레퍼런스 + 프롬프트 템플릿 + 후처리 프리셋**. 개인의 감각을 팀의 시스템으로 바꾸는 것이 프로의 방식입니다.`,
          illustration: {
            type: "compare",
            title: "그때그때 생성 vs 스타일 시스템",
            columns: [
              {
                title: "그때그때 생성",
                icon: "alert",
                tone: "warning",
                items: [
                  "에셋마다 프롬프트를 새로 작성",
                  "담당자마다 다른 톤",
                  "색감이 페이지마다 미묘하게 다름",
                  "리뉴얼 때 전부 다시 제작",
                ],
              },
              {
                title: "스타일 시스템",
                icon: "layers",
                tone: "primary",
                items: [
                  "고정 sref + 프롬프트 템플릿",
                  "누가 뽑아도 같은 브랜드 톤",
                  "후처리 프리셋으로 색을 잠금",
                  "템플릿 버전만 올리면 갱신 끝",
                ],
              },
            ],
            caption: "감각은 사람에게, 일관성은 시스템에 맡기세요.",
          },
        },
        {
          slug: "license-and-copyright",
          title: "상업적 이용: 라이선스와 저작권 (2026년 기준)",
          minutes: 6,
          content: `상업 프로젝트에서 가장 비싼 실수는 그림 실력이 아니라 **법적 검토 누락**에서 나옵니다. 어렵게 느껴져도 체크리스트로 만들면 어렵지 않습니다. 2026년 기준으로 반드시 확인할 것들을 정리합니다.

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

> 💡 **핵심**: "생성 가능"과 "상업적으로 안전"은 다릅니다. **플랜·모델 라이선스 확인 + 인간 기여 + 표시 의무 + 기록 보관**이 2026년의 4대 안전장치입니다.`,
          illustration: {
            type: "grid",
            title: "상업 이용 전 4대 체크포인트",
            items: [
              {
                label: "플랜·모델 라이선스",
                sublabel: "유료 플랜 조건 · 모델별 확인",
                icon: "key",
                tone: "primary",
              },
              {
                label: "인간의 창작적 기여",
                sublabel: "편집·합성 없인 저작권 없음",
                icon: "user",
                tone: "accent",
              },
              {
                label: "AI 생성물 표시",
                sublabel: "EU AI Act · 한국 AI 기본법",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "기록 보관",
                sublabel: "프롬프트·모델·일시 증빙",
                icon: "clipboard",
                tone: "success",
              },
              {
                label: "타인 IP 배제",
                sublabel: "작가명·캐릭터·로고 금지",
                icon: "shield",
                tone: "warning",
              },
              {
                label: "계약서 명시",
                sublabel: "클라이언트에 AI 사용 고지",
                icon: "file-text",
                tone: "muted",
              },
            ],
            caption: "네 가지 안전장치에 'IP 배제'와 '고지'까지 더하면 실무 체크리스트가 완성됩니다.",
          },
        },
      ],
    },
  ],
};
