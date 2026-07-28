import type { Course } from "../types";

/**
 * AI 영상 제작 강의 — 텍스트-투-비디오 생성부터 숏폼 자동화까지.
 * 스타일 가이드는 loop-engineering.ts를 따릅니다.
 */
export const aiVideo: Course = {
  slug: "ai-video",
  title: "AI 영상 제작: Runway · Veo · Kling과 숏폼 자동화",
  subtitle: "텍스트 한 줄로 영상을 만들고, 숏폼 채널을 자동으로 굴리는 파이프라인",
  description:
    "2026년 영상 제작의 진입 장벽은 카메라가 아니라 '설계'입니다. 이 강의에서는 Sora, Runway, Google Veo 같은 텍스트-투-비디오 도구의 원리와 한계를 이해하고, 시네마토그래피 언어로 프롬프트를 쓰는 법을 익힙니다. 이어서 스토리보드→클립 생성→캡컷 편집으로 이어지는 제작 워크플로우를 완성하고, 대본→음성→클립→자막을 자동으로 이어붙여 릴스·쇼츠·틱톡에 배포하는 숏폼 자동화 파이프라인까지 설계합니다.",
  category: "creative",
  level: "intermediate",
  tags: ["Runway", "Google Veo", "Kling", "숏폼 자동화", "CapCut"],
  gradient: ["#ec4899", "#8b5cf6"],
  icon: "video",
  outcomes: [
    "영상 생성 AI의 원리와 한계(물리 일관성·길이 제한)를 이해하고 우회 전략을 세울 수 있다",
    "Sora·Runway·Veo·Pika·Kling을 목적에 맞게 골라 쓰는 선택 기준을 갖는다",
    "샷·카메라 움직임·조명 언어로 감독처럼 영상 프롬프트를 쓸 수 있다",
    "스토리보드→클립 생성→캡컷 편집으로 이어지는 제작 파이프라인을 운영할 수 있다",
    "대본→음성→클립→자막 자동화 로직을 설계하고 플랫폼별로 최적화해 배포할 수 있다",
  ],
  modules: [
    {
      slug: "text-to-video-basics",
      title: "텍스트-투-비디오의 이해",
      description: "영상 생성 AI의 원리와 한계, 2026년 도구 지형도, 프롬프트의 시네마토그래피",
      lessons: [
        {
          slug: "how-video-ai-works",
          title: "영상 생성 AI의 원리와 한계",
          minutes: 5,
          content: `텍스트 한 줄이 영상이 되는 마법의 정체는 **노이즈에서 그림을 깎아내는 확산(Diffusion) 모델**입니다. 원리를 알면 무엇이 잘 되고 무엇이 안 되는지, 그리고 우회하는 법까지 보입니다.

## 어떻게 만들어지는가

- 모델은 옛날 TV가 지지직거릴 때 같은 **무작위 점 노이즈**에서 시작합니다. 프롬프트를 참고해 수십 단계에 걸쳐 노이즈를 조금씩 걷어내며 프레임(영상을 이루는 낱장 사진)을 완성합니다. 대리석에서 조각상을 깎아내는 과정과 비슷합니다.
- 2026년 주력 모델들은 **디퓨전 트랜스포머(DiT)**라는 구조를 씁니다. 프레임을 한 장씩 그리지 않고 시간의 흐름까지 한 덩어리로 학습해서, 프레임 사이의 움직임이 자연스럽습니다.
- Veo를 비롯한 최신 모델들은 **영상에 딱 맞는 오디오**(대사·효과음)까지 함께 생성합니다.

## 여전히 남은 두 가지 한계

- **물리 일관성** — 모델은 물리 법칙을 '계산'하지 않고 '흉내' 냅니다. 그래서 손가락 개수, 물이 흐르는 모양, 화면 밖으로 나갔다 돌아온 물체의 생김새가 자주 무너집니다.
- **길이 제한** — 한 번에 만들 수 있는 클립(몇 초짜리 짧은 영상 조각)은 보통 **10초 안팎**, 길어야 수십 초입니다. 긴 영상을 만들려면 여러 클립을 이어 붙여야 하고, 그래서 '편집'이 반드시 필요합니다.

## 실무 감각

한계는 이기려 들지 말고 피해서 설계하세요. 물리가 무너지기 쉬운 장면(손 클로즈업, 많은 군중)은 처음부터 빼고, 긴 이야기는 짧은 클립 여러 개의 합으로 쪼갭니다. 처음 연습할 때는 '노을 지는 바다'처럼 물리가 단순한 풍경부터 만들어 보세요. 성공 경험을 쌓은 뒤 인물 장면으로 넘어가면 시행착오가 훨씬 줄어듭니다.

> 💡 **핵심**: 영상 생성 AI는 "물리 시뮬레이터"가 아니라 "그럴듯함 생성기"입니다. 한계를 아는 사람이 한계 안에서 완성도를 만듭니다.`,
          illustration: {
            type: "flow",
            title: "텍스트가 영상이 되기까지",
            nodes: [
              {
                label: "프롬프트 이해",
                sublabel: "장면·피사체·카메라 해석",
                icon: "file-text",
                tone: "primary",
              },
              {
                label: "무작위 노이즈",
                sublabel: "지지직거리는 점에서 시작",
                icon: "sparkles",
                tone: "muted",
              },
              {
                label: "노이즈 걷어내기",
                sublabel: "수십 단계 반복으로 프레임 완성",
                icon: "wand",
                tone: "accent",
                edgeLabel: "시간 흐름까지 한 덩어리로",
              },
              {
                label: "클립 완성 (10초 안팎)",
                sublabel: "오디오 동시 생성 모델도 등장",
                icon: "video",
                tone: "success",
              },
            ],
            caption: "물리 법칙은 '계산'이 아니라 '흉내' — 그래서 손·액체·군중이 약점입니다.",
          },
        },
        {
          slug: "tool-landscape-2026",
          title: "2026 도구 지형도: Sora · Runway · Veo · Pika · Kling",
          minutes: 6,
          content: `도구가 너무 많아서 못 고르겠다는 말은 이제 핑계입니다. 2026년의 도구들은 **용도별로 뚜렷하게 갈라져** 있어서, 내 목적만 정하면 답이 나옵니다.

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

> 💡 **핵심**: 2026년의 정답은 단일 도구가 아니라 **조합**입니다 — 연출은 Runway, 완성형은 Veo, 물량은 Kling/Pika.`,
          illustration: {
            type: "grid",
            title: "2026 텍스트-투-비디오 지형도",
            items: [
              {
                label: "Sora",
                sublabel: "복잡한 연출 · 서비스 종료 수순",
                icon: "sparkles",
                tone: "primary",
              },
              {
                label: "Runway",
                sublabel: "연출 통제력 · 편집 도구 성숙",
                icon: "camera",
                tone: "primary",
              },
              {
                label: "Google Veo",
                sublabel: "네이티브 오디오 · 프롬프트 충실",
                icon: "music",
                tone: "accent",
              },
              {
                label: "Pika",
                sublabel: "밈 · 이펙트 특화",
                icon: "zap",
                tone: "muted",
              },
              {
                label: "Kling",
                sublabel: "가성비 · 인물 동작",
                icon: "users",
                tone: "muted",
              },
              {
                label: "선택 기준",
                sublabel: "통제력 / 오디오 / 단가",
                icon: "target",
                tone: "warning",
              },
            ],
            caption: "하나의 최고 도구가 아니라, 제작 단계별로 도구를 조합해 고릅니다.",
          },
        },
        {
          slug: "cinematography-prompts",
          title: "프롬프트의 시네마토그래피: 감독의 언어로 쓰기",
          minutes: 6,
          content: `"예쁜 노을 영상"이라고 쓰면 모델은 어디서 본 듯한 평범한 영상을 줍니다. 모델이 학습한 것은 **영화 제작 현장의 언어**이기 때문에, 감독처럼 써야 감독의 결과물이 나옵니다. 용어가 낯설어도 괜찮습니다 — 아래 단어들을 재료처럼 골라 끼우면 됩니다.

## 프롬프트에 넣을 4가지 재료

- **샷 종류** — 샷은 카메라가 한 번에 담는 화면 단위입니다. 와이드 샷(멀리서 넓게) / 미디엄 샷(허리 위쯤) / 클로즈업(얼굴이나 사물을 크게) / 오버 더 숄더(한 사람의 어깨 너머로 상대를 보는 구도). 화면에 무엇이 얼마나 담길지를 결정합니다.
- **카메라 움직임** — 돌리 인(피사체 쪽으로 다가가기), 팬(좌우로 돌리기), 틸트(위아래로 돌리기), 트래킹 샷(움직이는 대상을 따라가기), 핸드헬드(손으로 든 듯 흔들리게). "천천히(slow)" 같은 속도 표현을 붙이면 결과가 안정됩니다.
- **조명** — 골든 아워(해 뜨고 질 무렵의 따뜻한 빛), 백라이트(역광), 소프트 라이트(부드러운 빛), 네온, 로우키(어둡고 그림자 짙게). 분위기의 8할은 조명 언어가 만듭니다.
- **렌즈·질감** — 35mm 필름 룩(옛 필름 카메라 느낌), 얕은 심도(주인공만 선명하고 배경은 흐릿하게) 등.

## 쓰는 순서

**[샷] + [피사체와 행동] + [배경] + [카메라 움직임] + [조명·질감]** 순으로 한 문장씩 씁니다. 한 클립에는 **하나의 샷, 하나의 움직임**만 담으세요. 두 개를 섞으면 둘 다 어정쩡해집니다.

## 피해야 할 것

"아름다운, 멋진" 같은 감상 형용사는 자리만 차지합니다. 그 자리에 조명과 렌즈 단어를 넣으세요.

> 💡 **핵심**: 좋은 영상 프롬프트는 소설이 아니라 **콘티 지문**(장면 지시문)입니다 — 샷·움직임·조명을 기술 용어로 지정하세요.`,
          illustration: {
            type: "chat",
            title: "감상 프롬프트 vs 시네마토그래피 프롬프트",
            messages: [
              {
                role: "user",
                text: "바닷가에서 달리는 강아지의 아름답고 감동적인 영상",
              },
              {
                role: "ai",
                text: "→ 평범한 스톡 영상 느낌의 결과물 (연출 정보 없음)",
              },
              {
                role: "user",
                text: "트래킹 샷: 골든 리트리버가 해질녘 해변을 달린다. 로우 앵글, 느린 트래킹, 골든 아워 역광, 얕은 심도, 35mm 필름 룩",
              },
              {
                role: "ai",
                text: "→ 카메라가 함께 달리는 영화적 장면 (샷·움직임·조명이 모두 지정됨)",
              },
            ],
            caption: "감상 형용사를 빼고 그 자리에 샷·카메라·조명 용어를 넣으세요.",
          },
          demo: {
            title: "Runway에서 시네마토그래피 프롬프트 따라하기",
            app: {
              kind: "browser",
              url: "app.runwayml.com/generate",
              blocks: [
                { id: "b-head", type: "heading", label: "Generate Video — Runway" },
                { id: "b-prompt", type: "input", label: "샷·피사체·배경 프롬프트 입력…" },
                { id: "b-style", type: "input", label: "카메라·조명·질감 옵션 입력…" },
                { id: "b-ratio", type: "badge", label: "9:16 · 10초 · Gen 시리즈" },
                { id: "b-generate", type: "button", label: "Generate" },
                { id: "b-progress", type: "badge", label: "생성 중… 디노이징 45%", hidden: true },
                { id: "b-clip1", type: "card", label: "🎬 beach-run_v1.mp4 · 10초", hidden: true },
                { id: "b-clip2", type: "card", label: "🎬 beach-run_v2.mp4 · 10초", hidden: true },
                { id: "b-play", type: "button", label: "▶ 미리보기 재생", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 샷 종류와 피사체·행동을 먼저 지정합니다" },
              { t: "move", target: "b-prompt" },
              { t: "click" },
              { t: "type", target: "b-prompt", text: "트래킹 샷: 해질녘 해변을 달리는 리트리버" },
              { t: "caption", text: "② 감상 형용사 대신 조명·렌즈 언어를 넣습니다" },
              { t: "click", target: "b-style" },
              { t: "type", target: "b-style", text: "골든 아워 역광, 얕은 심도, 35mm 필름 룩" },
              { t: "caption", text: "③ 비율과 길이를 확인하고 생성을 시작합니다" },
              { t: "move", target: "b-ratio" },
              { t: "click", target: "b-generate" },
              { t: "reveal", target: "b-progress" },
              { t: "wait", ms: 900 },
              { t: "hide", target: "b-progress" },
              { t: "caption", text: "④ 변형 2개를 비교해 베스트를 고릅니다" },
              { t: "reveal", target: "b-clip1" },
              { t: "reveal", target: "b-clip2" },
              { t: "move", target: "b-clip1" },
              { t: "dblclick" },
              { t: "caption", text: "⑤ 재생하며 손·물체가 이상한 장면이 없는지 확인합니다" },
              { t: "reveal", target: "b-play" },
              { t: "click", target: "b-play" },
              { t: "wait", ms: 900 },
            ],
          },
        },
      ],
    },
    {
      slug: "production-workflow",
      title: "제작 워크플로우",
      description: "스토리보드에서 클립 생성, 캡컷 편집까지 — 실제로 완성하는 파이프라인",
      lessons: [
        {
          slug: "storyboard-pipeline",
          title: "스토리보드→클립→편집: 파이프라인으로 만들기",
          minutes: 5,
          content: `클립 한 개는 누구나 뽑습니다. 차이는 **여러 클립을 하나의 영상으로 완성하는 파이프라인**(재료가 순서대로 흘러가는 조립 라인 같은 작업 흐름)에서 갈립니다. 클립 길이가 10초 안팎으로 제한되는 한, 편집 없는 AI 영상은 없습니다.

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

> 💡 **핵심**: AI 영상 제작은 "생성"이 아니라 **"기획→생성→편집" 파이프라인 운영**입니다. 스토리보드 표가 그 파이프라인의 설계도입니다.`,
          illustration: {
            type: "steps",
            title: "AI 영상 제작 파이프라인",
            steps: [
              {
                label: "대본 작성",
                sublabel: "씬 단위로 분할 (씬 = 클립)",
                icon: "file-text",
              },
              {
                label: "스토리보드 표",
                sublabel: "씬별 샷·카메라·조명 프롬프트",
                icon: "clipboard",
              },
              {
                label: "클립 생성",
                sublabel: "씬당 2~4개 변형 → 베스트 선택",
                icon: "video",
              },
              {
                label: "편집·검수",
                sublabel: "이어붙이기 + 이상한 프레임 걸러내기",
                icon: "scissors",
              },
            ],
            caption: "표로 관리하면 실패한 씬만 골라 재생성할 수 있습니다.",
          },
        },
        {
          slug: "image-to-video-consistency",
          title: "이미지-투-비디오: 일관성을 지키는 기술",
          minutes: 6,
          content: `클립을 이어 붙였더니 주인공 얼굴이 씬마다 다르다면, 시청자는 3초 안에 떠납니다. 이 일관성 문제의 표준 해법이 **이미지-투-비디오(I2V)** — 글 대신 **이미지 한 장을 출발점으로 영상을 만드는 방식**입니다.

## 텍스트에서 바로 뽑으면 안 되는 이유

텍스트-투-비디오는 매번 **복권 추첨**입니다. 같은 프롬프트를 넣어도 인물·소품·색감이 생성할 때마다 달라집니다. 반면 I2V는 **첫 화면(시작 프레임)을 이미지로 고정**하므로, 그 안의 얼굴과 소품이 클립 끝까지 유지됩니다.

## 일관성 워크플로우 3단계

1. **캐릭터 시트 확보** — 이미지 생성 AI로 주인공의 기준 이미지를 만듭니다. 그다음 레퍼런스 기능(만든 캐릭터를 기억시켜 고정하는 기능)으로 다양한 각도·의상 버전을 뽑아 둡니다. 메뉴가 안 보이면 도구마다 이름이 다르니 'reference'나 'character' 메뉴를 찾아보세요.
2. **씬별 키프레임 생성** — 스토리보드의 각 씬을 먼저 **정지 이미지**(키프레임: 그 장면의 기준이 되는 한 장)로 만듭니다. 이미지는 영상보다 싸고 빠르니, 이 단계에서 마음에 들 때까지 충분히 고릅니다.
3. **키프레임 → I2V 변환** — 확정된 이미지를 시작 프레임으로 넣고, 프롬프트에는 **움직임만** 씁니다("카메라가 천천히 다가간다" 등). Runway·Kling·Veo 모두 시작 프레임 입력을 지원하고, Kling·Veo는 끝 프레임 지정까지 가능합니다.

## 보너스: 끝 프레임 연결

앞 클립의 마지막 프레임을 다음 클립의 시작 프레임으로 쓰면, 클립과 클립의 경계가 자연스럽게 이어집니다.

> 💡 **핵심**: 일관성은 프롬프트가 아니라 **이미지로 고정**합니다. "이미지에서 정체성, 프롬프트에서 움직임" — 이 분업이 I2V의 공식입니다.`,
          illustration: {
            type: "flow",
            title: "일관성을 지키는 I2V 워크플로우",
            nodes: [
              {
                label: "캐릭터 시트",
                sublabel: "기준 이미지 + 각도·의상 변형",
                icon: "user",
                tone: "primary",
              },
              {
                label: "씬별 키프레임",
                sublabel: "정지 이미지로 먼저 확정 (싸고 빠름)",
                icon: "image",
                tone: "accent",
                edgeLabel: "레퍼런스로 캐릭터 고정",
              },
              {
                label: "I2V 변환",
                sublabel: "이미지 = 정체성, 프롬프트 = 움직임",
                icon: "play",
                tone: "primary",
                edgeLabel: "시작 프레임으로 입력",
              },
              {
                label: "클립 연결",
                sublabel: "끝 프레임 → 다음 클립 시작 프레임",
                icon: "link",
                tone: "success",
              },
            ],
            loopBack: { from: 3, to: 1, label: "다음 씬 반복" },
            caption: "텍스트-투-비디오는 복권, 이미지-투-비디오는 설계입니다.",
          },
        },
        {
          slug: "capcut-editing",
          title: "캡컷 연동 편집: 자막·템포·트랜지션",
          minutes: 5,
          content: `생성된 클립은 재료일 뿐, 시청자가 끝까지 보게 만드는 것은 **편집**입니다. 숏폼 편집의 사실상 표준인 캡컷(CapCut)에서 챙길 것은 딱 세 가지입니다.

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

> 💡 **핵심**: 편집의 우선순위는 **자막 > 템포 > 트랜지션**입니다. 화려함이 아니라 리듬이 완주율(끝까지 본 비율)을 만듭니다.`,
          illustration: {
            type: "grid",
            title: "캡컷 편집 체크리스트",
            items: [
              {
                label: "자동 캡션",
                sublabel: "무음 시청 대비 · 키워드만 강조",
                icon: "message",
                tone: "primary",
              },
              {
                label: "컷 템포",
                sublabel: "컷 길이 2~4초 유지",
                icon: "scissors",
                tone: "accent",
              },
              {
                label: "비트 싱크",
                sublabel: "음악 박자에 맞춰 컷 전환",
                icon: "music",
                tone: "accent",
              },
              {
                label: "하드 컷 기본",
                sublabel: "전환 효과는 씬 전환에만",
                icon: "zap",
                tone: "muted",
              },
              {
                label: "배속 조절",
                sublabel: "늘어지는 구간 1.2~1.5배속",
                icon: "gauge",
                tone: "muted",
              },
              {
                label: "템플릿 저장",
                sublabel: "자막·인트로 재사용",
                icon: "layers",
                tone: "success",
              },
            ],
            caption: "우선순위는 자막 > 템포 > 트랜지션 — 리듬이 완주율을 만듭니다.",
          },
          demo: {
            title: "캡컷 타임라인 편집 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "숏폼 시퀀스 편집 — CapCut",
              tools: [
                { id: "tool-select", icon: "target", label: "선택" },
                { id: "tool-cut", icon: "scissors", label: "분할" },
                { id: "tool-text", icon: "file-text", label: "텍스트" },
                { id: "tool-music", icon: "music", label: "오디오" },
              ],
              objects: [
                { id: "preview", shape: "frame", label: "미리보기 (9:16)", x: 8, y: 8, w: 34, h: 44 },
                { id: "sub-text", shape: "text", label: "3가지만 기억하세요", x: 12, y: 40, w: 26, h: 6, hidden: true },
                { id: "sub-style", shape: "text", label: "강조: 키워드만 노랑 · 120%", x: 12, y: 14, w: 26, h: 6, color: "#f59e0b", hidden: true },
                { id: "timeline", shape: "frame", label: "타임라인", x: 8, y: 58, w: 84, h: 34 },
                { id: "clip-hook", shape: "rect", label: "훅 3초", x: 10, y: 66, w: 16, h: 12, color: "#ec4899" },
                { id: "clip-cta", shape: "rect", label: "CTA 4초", x: 28, y: 66, w: 16, h: 12, color: "#f59e0b" },
                { id: "clip-body", shape: "rect", label: "전개 8초", x: 46, y: 66, w: 26, h: 12, color: "#8b5cf6" },
                { id: "clip-cta-end", shape: "rect", label: "CTA 4초", x: 74, y: 66, w: 16, h: 12, color: "#f59e0b", hidden: true },
                { id: "cut-mark", shape: "ellipse", x: 58, y: 63, w: 3, h: 3, color: "#22d3ee", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 생성한 클립들을 타임라인에서 확인합니다" },
              { t: "move", target: "clip-hook" },
              { t: "click" },
              { t: "move", target: "clip-body" },
              { t: "caption", text: "② 순서가 어긋난 CTA(행동 유도) 클립을 맨 뒤로 옮깁니다" },
              { t: "click", target: "clip-cta" },
              { t: "drag", from: "clip-cta", to: "clip-cta-end", ms: 1000 },
              { t: "hide", target: "clip-cta" },
              { t: "reveal", target: "clip-cta-end" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 텍스트 도구로 훅 자막을 얹습니다" },
              { t: "click", target: "tool-text" },
              { t: "click", target: "preview" },
              { t: "type", target: "sub-text", text: "3가지만 기억하세요" },
              { t: "caption", text: "④ 문장 전체가 아니라 키워드만 강조합니다" },
              { t: "dblclick", target: "sub-text" },
              { t: "reveal", target: "sub-style" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 분할 도구로 비트에 맞춰 컷을 나눕니다" },
              { t: "click", target: "tool-cut" },
              { t: "move", target: "clip-body" },
              { t: "click" },
              { t: "reveal", target: "cut-mark" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "shortform-automation",
      title: "숏폼 자동화",
      description: "숏폼 공식, 자동화 파이프라인 설계, 플랫폼별 최적화와 운영 사이클",
      lessons: [
        {
          slug: "shortform-formula",
          title: "숏폼의 공식: 훅 3초와 구조 설계",
          minutes: 5,
          content: `숏폼은 시청자가 골라서 '선택'하는 매체가 아니라, 알고리즘이 피드에 '배달'해 주는 매체입니다. 그래서 승부는 **스크롤을 멈추게 하는 첫 3초**에서 끝납니다.

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

> 💡 **핵심**: 숏폼은 창의력 승부이기 전에 **구조 승부**입니다. 훅→전개→반전→CTA 구조를 고정하면, 나머지는 자동화할 수 있습니다.`,
          illustration: {
            type: "stack",
            title: "숏폼 60초의 구조 (위 = 시작)",
            layers: [
              {
                label: "훅 (0~3초)",
                sublabel: "질문 · 결과 선공개 · 패턴 파괴",
                icon: "zap",
                tone: "warning",
              },
              {
                label: "전개 (3~25초)",
                sublabel: "빠른 템포 · 5~7초마다 화면 변화",
                icon: "play",
                tone: "primary",
              },
              {
                label: "반전·클라이맥스 (25~40초)",
                sublabel: "완주할 이유 제공",
                icon: "sparkles",
                tone: "accent",
              },
              {
                label: "CTA·루프 (마지막 5초)",
                sublabel: "팔로우 유도 또는 처음으로 연결",
                icon: "repeat",
                tone: "success",
              },
            ],
            caption: "첫 3초 이탈률이 전체 노출량을 결정합니다 — 훅에 예산의 절반을 쓰세요.",
          },
        },
        {
          slug: "automation-pipeline",
          title: "자동화 파이프라인: 대본→음성→클립→자막",
          minutes: 7,
          content: `매일 1개씩 올리는 채널을 손으로 운영하면 반드시 지칩니다. 숏폼 제작을 **4단계 자동 파이프라인**으로 옮기면, 사람은 기획과 검수만 하면 됩니다.

## 파이프라인 4단계

1. **대본 생성** — LLM API에 주제를 주고 "훅→전개→반전→CTA" 구조의 대본을 JSON으로 받습니다. 이때 씬별 영상 프롬프트까지 함께 만들어 달라고 시킵니다.
2. **음성 합성(TTS)** — ElevenLabs 등으로 대본을 내레이션 음성으로 바꿉니다. 음성 길이가 정해지면 **씬마다 필요한 클립 길이도 저절로 정해집니다**.
3. **클립 생성** — 씬별 프롬프트를 영상 생성 API(Runway·Kling 등)에 병렬로(한 번에 여러 개 동시에) 요청합니다. 대량 생산에는 단가가 중요하므로 도구 선택이 여기서 갈립니다.
4. **조립과 자막** — FFmpeg(명령어로 영상을 자르고 붙이는 무료 도구) 또는 캡컷으로 클립과 음성을 합치고, STT(음성을 글자로 받아쓰는 기술)가 주는 시간 정보로 자막을 얹습니다.

## 설계의 핵심 원칙

- **중간 결과물을 파일로 저장** — 대본 JSON, 음성 mp3, 클립 mp4를 단계마다 남겨 두세요. 그러면 3단계에서 실패해도 1~2단계를 다시 돌릴 필요 없이, 실패한 단계만 재실행하면 됩니다.
- **사람의 검수 관문은 두 곳** — 대본이 나온 직후(방향이 맞는지)와 업로드 직전(품질이 괜찮은지). 사람이 전혀 보지 않는 완전 자동화는 채널 품질을 무너뜨립니다.
- **코드가 부담스러우면 노코드로** — Make 같은 노코드 도구에서 노드를 이어 붙여도 같은 구조를 만들 수 있습니다. 아래 데모에서 직접 확인해 보세요.

> 💡 **핵심**: 자동화의 목표는 "사람 제거"가 아니라 **반복 노동 제거**입니다. 기획과 검수에만 사람을 남기고, 나머지는 파이프라인에 맡기세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "shortform-pipeline — 1회 실행 로그",
            lines: [
              { text: "python pipeline.py --topic '우주에서 가장 추운 곳'", tone: "cmd" },
              { text: "[1/4] 대본 생성 (LLM) ... script.json 저장", tone: "out" },
              { text: "      훅/전개/반전/CTA · 씬 6개 · 프롬프트 포함", tone: "dim" },
              { text: "# 사람 검수: 대본 방향 승인", tone: "comment" },
              { text: "[2/4] TTS 합성 ... voice.mp3 (42.3초)", tone: "out" },
              { text: "[3/4] 클립 생성 6건 병렬 요청 ...", tone: "out" },
              { text: "      scene_04 실패 → 해당 씬만 재시도 ✓", tone: "dim" },
              { text: "[4/4] FFmpeg 조립 + STT 자막 ... final.mp4", tone: "out" },
              { text: "✓ 완료 (총 11분) — 업로드 전 품질 검수 대기", tone: "ok" },
            ],
            caption: "중간 산출물을 파일로 남기면 실패한 단계만 재실행할 수 있습니다.",
          },
          demo: {
            title: "Make에서 숏폼 자동화 시나리오 따라하기",
            app: {
              kind: "automation-canvas",
              windowTitle: "숏폼 자동 제작 파이프라인 — Make",
              nodes: [
                { id: "n-script", icon: "file-text", label: "대본 생성", sublabel: "LLM · 훅→전개→CTA", tone: "accent" },
                { id: "n-tts", icon: "mic", label: "음성 합성", sublabel: "ElevenLabs TTS", hidden: true },
                { id: "n-clip", icon: "video", label: "클립 생성", sublabel: "Runway · 씬별 병렬", hidden: true },
                { id: "n-caption", icon: "message", label: "조립·자막", sublabel: "FFmpeg + STT", hidden: true },
                { id: "n-review", icon: "eye", label: "품질 검수", sublabel: "사람 관문", tone: "warning", hidden: true },
                { id: "n-upload", icon: "upload", label: "예약 업로드", sublabel: "릴스·쇼츠·틱톡", tone: "success", hidden: true },
              ],
              runLog: [
                { id: "log1", text: "▶ 시나리오 실행 — 주제: 우주에서 가장 추운 곳", tone: "out", hidden: true },
                { id: "log2", text: "✓ 대본 script.json 저장 (씬 6개)", tone: "ok", hidden: true },
                { id: "log3", text: "✓ 음성 voice.mp3 합성 (42.3초)", tone: "ok", hidden: true },
                { id: "log4", text: "✓ 클립 6건 생성 — scene_04 재시도 성공", tone: "ok", hidden: true },
                { id: "log5", text: "✓ final.mp4 조립 완료 — 품질 검수 대기", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 시작 노드는 LLM 대본 생성입니다" },
              { t: "move", target: "n-script" },
              { t: "click" },
              { t: "caption", text: "② 음성→클립→자막 노드를 차례로 잇습니다" },
              { t: "reveal", target: "n-tts" },
              { t: "move", target: "n-tts" },
              { t: "reveal", target: "n-clip" },
              { t: "move", target: "n-clip" },
              { t: "reveal", target: "n-caption" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ 업로드 직전에 사람 검수 관문을 둡니다" },
              { t: "reveal", target: "n-review" },
              { t: "move", target: "n-review" },
              { t: "click" },
              { t: "reveal", target: "n-upload" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 시나리오를 실행해 단계별 로그를 확인합니다" },
              { t: "reveal", target: "log1" },
              { t: "reveal", target: "log2" },
              { t: "reveal", target: "log3" },
              { t: "reveal", target: "log4" },
              { t: "caption", text: "⑤ 검수만 통과하면 3개 플랫폼에 자동 배포됩니다" },
              { t: "reveal", target: "log5" },
              { t: "move", target: "n-upload" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "platform-optimization",
          title: "플랫폼별 최적화: 릴스 · 쇼츠 · 틱톡",
          minutes: 5,
          content: `같은 영상을 세 플랫폼에 그대로 복사해 올리면 세 곳 모두에서 어중간해집니다. 플랫폼마다 알고리즘과 시청 문화가 다르기 때문에, **배포 단계에서 플랫폼에 맞게 조금씩 바꿔야** 합니다.

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

> 💡 **핵심**: "하나 만들어 셋에 뿌리기"가 아니라 **"하나의 마스터, 셋의 변형"**입니다. 바꿀 것은 제목·해시태그·커버·사운드 네 가지입니다.`,
          illustration: {
            type: "compare",
            title: "3대 숏폼 플랫폼 비교",
            columns: [
              {
                title: "틱톡",
                icon: "music",
                tone: "primary",
                items: [
                  "트렌드 반응 속도가 생명",
                  "유행 사운드·챌린지 결합",
                  "날것의 감성 선호",
                ],
              },
              {
                title: "유튜브 쇼츠",
                icon: "play",
                tone: "accent",
                items: [
                  "검색·구독 자산으로 축적",
                  "제목·해시태그 키워드 중요",
                  "롱폼 유입 구조 설계 가능",
                ],
              },
              {
                title: "인스타 릴스",
                icon: "camera",
                tone: "success",
                items: [
                  "비주얼 완성도·톤 일관성",
                  "커버 이미지가 그리드 자산",
                  "공유(DM)를 부르는 콘텐츠",
                ],
              },
            ],
            caption: "마스터 영상은 하나, 제목·해시태그·커버·사운드만 플랫폼별로 바꿉니다.",
          },
        },
        {
          slug: "operate-and-improve",
          title: "운영 사이클: 데이터로 다음 영상을 만들기",
          minutes: 5,
          content: `자동화 파이프라인의 진짜 힘은 '많이 만드는 것'이 아니라 **빨리 배우는 것**입니다. 업로드는 끝이 아니라, 다음 영상을 더 잘 만들기 위한 데이터 수집의 시작입니다.

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

> 💡 **핵심**: 숏폼 채널 운영은 기획→생성→배포→분석의 **루프**(반복 고리)입니다. 자동화는 이 루프의 회전 속도를 높이는 장치입니다.`,
          illustration: {
            type: "cycle",
            title: "숏폼 운영 사이클",
            center: "주 단위로 회전",
            nodes: [
              {
                label: "기획",
                sublabel: "상위 20% 영상의 공통점 추출",
                icon: "lightbulb",
              },
              {
                label: "대량 생성",
                sublabel: "파이프라인 · 훅 A/B 변형",
                icon: "workflow",
              },
              {
                label: "배포",
                sublabel: "예약 업로드 · 주기 유지",
                icon: "upload",
              },
              {
                label: "분석",
                sublabel: "3초 유지율 · 완주율",
                icon: "chart",
              },
            ],
            caption: "조회수가 아니라 3초 유지율과 완주율이 다음 영상의 설계도입니다.",
          },
        },
      ],
    },
  ],
};
