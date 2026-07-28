import type { Course } from "../types";

/**
 * AI 게임 개발: 에셋부터 NPC까지 (2026-07 기준 사실 검증 완료)
 *
 * 검증된 핵심 사실:
 * - Unity AI: Unity 6.2부터 정식 탑재. Muse는 은퇴, Assistant/Generators/Inference Engine(구 Sentis) 3축.
 * - Unreal: UE 5.8에 MCP 서버·AI Skills 탑재, UE6(2027년 말 얼리 액세스 목표)에서 Claude·Gemini 등 통합 예고.
 * - Meshy·Tripo: 텍스트/이미지→3D 상용화. Tripo Smart Mesh 쿼드 리토폴로지 등.
 * - Steam: 2026년 1월 고지 정책 개정 — "플레이어가 소비하는 콘텐츠" 중심, 코드 어시스턴트 등 효율 도구는 제외.
 * - 저작권: 2026년 3월 미 대법원 상고 기각으로 "순수 AI 저작물 등록 불가" 확정.
 */
export const aiGameDev: Course = {
  slug: "ai-game-dev",
  title: "AI 게임 개발: 에셋부터 NPC까지",
  subtitle: "유니티·언리얼 워크플로우에 AI를 결합해 1인 개발로 완성도 있는 게임 만들기",
  description:
    "아트팀도 QA팀도 없는 1인 개발자가 상용 수준의 게임을 완성하는 시대입니다. 이 강의에서는 기획·에셋·코드·QA로 이어지는 게임 제작 파이프라인의 각 단계에 AI를 결합하는 법을 다룹니다. 2D 스프라이트와 3D 모델 생성, LLM 기반 NPC 대화, AI 에이전트를 이용한 게임플레이 코드 작성과 플레이테스트 자동화, 그리고 Steam AI 고지 정책과 저작권 리스크 대응까지 — 2026년 기준으로 실제 동작하는 워크플로우만 담았습니다.",
  category: "dev",
  level: "intermediate",
  tags: ["Unity", "Unreal", "AI 에셋 생성", "LLM NPC", "1인 개발"],
  gradient: ["#f43f5e", "#8b5cf6"],
  icon: "play",
  outcomes: [
    "게임 파이프라인(기획·에셋·코드·QA)에서 AI가 강한 지점과 한계를 판단할 수 있다",
    "2D 스프라이트·3D 모델·사운드를 AI로 생성하고 게임에 맞게 최적화할 수 있다",
    "비용과 지연시간을 고려해 NPC용 LLM 연동 방식(온디바이스 vs API)을 선택할 수 있다",
    "AI 에이전트로 게임플레이 코드를 작성하고 검증 루프를 돌릴 수 있다",
    "Steam AI 콘텐츠 고지 정책과 저작권 리스크에 실무적으로 대응할 수 있다",
  ],
  modules: [
    {
      slug: "ai-gamedev-landscape",
      title: "AI 게임 개발 지형도",
      description: "파이프라인에서 AI가 바꾼 것, 엔진별 도구 현황, 1인 개발 스코프 설계",
      lessons: [
        {
          slug: "pipeline-shift",
          title: "게임 제작 파이프라인, AI가 바꾼 것과 못 바꾼 것",
          minutes: 4,
          content: `"팀이 없어서 못 만든다"는 말은 2026년에 절반만 사실입니다. 게임 제작의 어떤 단계는 AI가 10배 빨라졌고, 어떤 단계는 여전히 사람의 몫입니다.

## 파이프라인 4단계별 변화

- **기획**: 컨셉 브레인스토밍, 세계관 문서, 밸런스 시트 초안 — AI가 초안을 만들고 사람이 방향을 잡습니다.
- **에셋**: 가장 극적인 변화. 스프라이트·3D 모델·텍스처·사운드를 텍스트 한 줄로 생성합니다.
- **코드**: AI 에이전트가 엔진과 직접 연동(MCP)되어 스크립트를 쓰고 직접 테스트까지 돌립니다.
- **QA**: AI 봇이 수백 번 플레이하며 진행 불가 구간과 밸런스 붕괴를 찾아냅니다.

## 여전히 사람이 해야 하는 것

- **재미의 판단** — "이게 재밌는가"는 어떤 지표로도 대체되지 않습니다.
- **일관된 아트 디렉션** — 생성은 AI가 해도, 스타일의 기준을 세우는 건 사람입니다.
- **스코프 결정** — 무엇을 만들지 않을지 정하는 일이야말로 1인 개발의 핵심 기술입니다.

> 💡 **핵심**: AI는 "만드는 속도"를 바꿨지, "무엇을 만들지 판단하는 일"을 바꾸지 못했습니다. 이 강의는 그 둘을 결합하는 법을 다룹니다.`,
          illustration: {
            type: "grid",
            title: "파이프라인 단계별 AI 영향도",
            items: [
              {
                label: "기획",
                sublabel: "초안 생성 · 방향은 사람",
                icon: "lightbulb",
                tone: "accent",
              },
              {
                label: "에셋",
                sublabel: "가장 큰 변화 · 텍스트→에셋",
                icon: "image",
                tone: "primary",
              },
              {
                label: "코드",
                sublabel: "에이전트가 작성·검증",
                icon: "code",
                tone: "primary",
              },
              {
                label: "QA",
                sublabel: "봇이 수백 회 플레이",
                icon: "test-tube",
                tone: "accent",
              },
              {
                label: "재미의 판단",
                sublabel: "여전히 사람의 몫",
                icon: "user",
                tone: "warning",
              },
              {
                label: "아트 디렉션",
                sublabel: "스타일 기준은 사람이",
                icon: "palette",
                tone: "warning",
              },
            ],
            caption: "보라색은 AI가 강한 영역, 노란색은 사람이 지켜야 할 영역입니다.",
          },
        },
        {
          slug: "engine-ai-tools",
          title: "엔진별 AI 도구 현황: Unity AI vs Unreal",
          minutes: 6,
          content: `엔진을 고르기 전에 각 엔진의 AI 지원 현황을 알아야 합니다. 2026년 현재 두 엔진의 접근은 뚜렷하게 다릅니다.

## Unity: 에디터 안의 'Unity AI'

Unity 6.2부터 베타로 불리던 Muse가 은퇴하고 **Unity AI**가 에디터에 정식 탑재됐습니다.

- **Assistant** — 프로젝트 컨텍스트를 이해하는 에디터 내 어시스턴트. 질문 답변, 코드 리팩터링.
- **Generators** — 스프라이트·텍스처·머티리얼·애니메이션·사운드 생성 도구 모음.
- **Inference Engine** — 구 Sentis의 새 이름. 게임 안에서 AI 모델을 **로컬 추론**으로 돌립니다.

Muse와의 결정적 차이는 서드파티 모델(외부 AI)을 쓴다는 점입니다.

## Unreal: MCP로 여는 에이전트 통합

- **UE 5.8**에 MCP 서버와 AI 작업용 Skills가 탑재되어, 외부 AI 에이전트가 씬을 검사하고 조작할 수 있습니다.
- 2026년 State of Unreal에서 발표된 **UE6**(2027년 말 얼리 액세스 목표)는 Claude·Gemini 등 모델을 1급 시민으로 통합해 레벨 셋업, 리깅, 라이팅 조정 같은 반복 작업을 맡길 계획입니다.

## 선택 기준

- 에디터 안에서 통합된 생성 도구를 원하면 → Unity
- 외부 AI 에이전트와의 연동 자유도를 원하면 → Unreal (또는 Unity + 커뮤니티 MCP)

> 💡 **핵심**: 두 엔진 모두 방향은 같습니다 — "AI가 에디터를 직접 조작하되, 최종 편집권은 개발자에게". 도구 이름보다 이 구조를 기억하세요.`,
          illustration: {
            type: "compare",
            title: "Unity AI vs Unreal의 AI 전략",
            columns: [
              {
                title: "Unity (6.2+)",
                icon: "layers",
                tone: "primary",
                items: [
                  "Unity AI 정식 탑재 (Muse 은퇴)",
                  "Assistant: 에디터 내 어시스턴트",
                  "Generators: 에셋 생성 도구 모음",
                  "Inference Engine: 런타임 로컬 추론",
                ],
              },
              {
                title: "Unreal (5.8 → UE6)",
                icon: "rocket",
                tone: "accent",
                items: [
                  "UE 5.8: MCP 서버 · AI Skills",
                  "외부 에이전트가 씬 검사·조작",
                  "UE6: Claude·Gemini 통합 예고",
                  "얼리 액세스 2027년 말 목표",
                ],
              },
            ],
            caption: "통합 생성 도구의 Unity, 에이전트 개방의 Unreal — 방향은 같고 순서가 다릅니다.",
          },
        },
        {
          slug: "solo-dev-scope",
          title: "1인 개발의 현실적 스코프 설계",
          minutes: 5,
          content: `AI가 있으니 MMORPG도 혼자 만들 수 있을까요? 아니요. AI 시대의 1인 개발은 **스코프를 넓히는 게 아니라 완성도를 높이는** 방향으로 설계해야 합니다.

## AI가 시간을 줄여주는 곳 vs 아닌 곳

AI 코딩 도구가 강한 영역과 약한 영역은 명확히 갈립니다.

- **강함**: 싱글플레이 로직, 에디터 툴, UI, 표준적인 물리·상태머신, 에셋 파이프라인
- **약함**: 실시간 멀티플레이 넷코드, 프레임 단위 타이밍, 거대한 상태를 가진 RPG 시스템

약한 영역이 게임의 중심이면, AI 배수 효과가 사라집니다.

## 스코프 설계 3원칙

1. **AI가 강한 영역에 게임을 세우세요** — 싱글플레이 + 절차적 다양성 조합이 1인 개발의 스위트 스폿입니다.
2. **에셋 종류를 줄이고 스타일을 통일하세요** — 생성 자체보다 일관성 유지가 비용입니다 (모듈 2에서 다룹니다).
3. **수직 슬라이스를 먼저** — 1개 레벨을 출시 품질로 완성해 보면, 전체 스코프의 진짜 비용이 보입니다.

## 현실적인 목표선

"AAA를 혼자"가 아니라 **"과거 5인 팀 규모의 완성도를 혼자"**가 2026년의 현실적인 기준입니다.

> 💡 **핵심**: AI는 스코프의 상한을 올리는 도구가 아니라, 같은 스코프의 **완성도와 속도**를 올리는 도구입니다.`,
          illustration: {
            type: "steps",
            title: "1인 개발 스코프 설계 순서",
            steps: [
              {
                label: "장르를 AI 강점에 맞추기",
                sublabel: "싱글플레이 · 표준 메커닉 중심",
                icon: "target",
              },
              {
                label: "에셋 스타일 1개로 통일",
                sublabel: "종류를 줄이면 일관성 비용 감소",
                icon: "palette",
              },
              {
                label: "수직 슬라이스 제작",
                sublabel: "레벨 1개를 출시 품질로",
                icon: "scissors",
              },
              {
                label: "비용 측정 후 전체 계획",
                sublabel: "슬라이스 x 레벨 수 = 진짜 스코프",
                icon: "chart",
              },
            ],
            caption: "수직 슬라이스가 스코프 계산기입니다 — 계획은 그 다음입니다.",
          },
        },
      ],
    },
    {
      slug: "asset-content-generation",
      title: "에셋과 콘텐츠 생성",
      description: "2D·3D·오디오 에셋 생성 워크플로우와 LLM 기반 NPC 설계",
      lessons: [
        {
          slug: "2d-sprite-workflow",
          title: "2D 스프라이트·컨셉아트: 일관성이 전부다",
          minutes: 6,
          content: `이미지 생성 AI로 멋진 스프라이트 한 장을 만드는 건 쉽습니다. 어려운 것은 **100장을 같은 게임처럼 보이게** 만드는 일입니다.

## 일관성이 무너지는 지점

- 캐릭터가 컷마다 미묘하게 다르게 생김
- 아이템 아이콘마다 명암·선 굵기가 제각각
- 달리기·점프·공격 프레임 사이에서 디테일이 흔들림

## 일관성 유지 워크플로우

1. **스타일 바이블 먼저** — 대표 이미지 10~20장으로 색·선·명암 기준을 정합니다.
2. **커스텀 모델(LoRA) 학습** — Scenario 같은 도구는 내 아트로 LoRA를 학습시켜 모든 출력이 같은 스타일로 나오게 합니다. 2026년 2D 워크플로우의 표준입니다.
3. **베이스 스프라이트 → 애니메이션 분리** — AI는 단일 스프라이트에 강하고 프레임 간 일관성에 약합니다. 깨끗한 베이스 1장을 생성한 뒤, 리깅 도구나 프레임 보간으로 애니메이션을 만드는 게 실무 패턴입니다.
4. **후보정은 사람 손으로** — 최종 픽셀 정리와 팔레트 통일은 사람이 마무리합니다 (저작권 측면에서도 유리합니다 — 모듈 3 참고).

> 💡 **핵심**: 2D 에셋 생성의 성패는 프롬프트가 아니라 **커스텀 모델 학습 + 베이스/애니메이션 분리**라는 파이프라인 설계에 달려 있습니다.`,
          illustration: {
            type: "flow",
            title: "일관성 있는 2D 에셋 파이프라인",
            nodes: [
              {
                label: "스타일 바이블 확정",
                sublabel: "대표 이미지 10~20장",
                icon: "book",
                tone: "warning",
              },
              {
                label: "커스텀 모델(LoRA) 학습",
                sublabel: "내 아트 스타일로 고정",
                icon: "brain",
                tone: "primary",
              },
              {
                label: "베이스 스프라이트 생성",
                sublabel: "캐릭터·아이템·타일",
                icon: "image",
                tone: "accent",
              },
              {
                label: "리깅·보간으로 애니메이션",
                sublabel: "프레임 일관성은 도구로",
                icon: "repeat",
                tone: "accent",
              },
              {
                label: "사람 손 후보정 → 엔진 임포트",
                sublabel: "팔레트 통일 · 픽셀 정리",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "생성은 3단계일 뿐 — 앞의 기준 잡기와 뒤의 정리가 품질을 만듭니다.",
          },
          demo: {
            title: "생성한 스프라이트를 레벨에 배치 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "숲 스테이지 — 레벨 에디터",
              tools: [
                { id: "tool-select", icon: "target", label: "선택" },
                { id: "tool-asset", icon: "image", label: "에셋" },
                { id: "tool-play", icon: "play", label: "테스트" },
              ],
              objects: [
                { id: "level", shape: "frame", label: "Stage 1", x: 6, y: 8, w: 88, h: 84 },
                { id: "ground", shape: "rect", x: 8, y: 72, w: 84, h: 16, color: "#65a30d" },
                { id: "asset-tree", shape: "image", label: "🌲 나무", x: 10, y: 14, w: 12, h: 13 },
                { id: "asset-hero", shape: "image", label: "🦊 주인공", x: 24, y: 14, w: 12, h: 13 },
                { id: "tree1", shape: "image", label: "🌲", x: 16, y: 54, w: 11, h: 17, hidden: true },
                { id: "tree2", shape: "image", label: "🌲", x: 68, y: 54, w: 11, h: 17, hidden: true },
                { id: "hero1", shape: "image", label: "🦊", x: 42, y: 58, w: 9, h: 13, hidden: true },
                {
                  id: "check-ok",
                  shape: "text",
                  label: "✓ 배치 저장됨",
                  x: 66, y: 12, w: 24, h: 7,
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① AI로 생성한 스프라이트가 팔레트에 준비되어 있습니다" },
              { t: "move", target: "tool-asset" },
              { t: "click" },
              { t: "caption", text: "② 나무 스프라이트를 드래그해 지면 위에 배치합니다" },
              { t: "drag", from: "asset-tree", to: "tree1" },
              { t: "reveal", target: "tree1" },
              { t: "drag", from: "asset-tree", to: "tree2" },
              { t: "reveal", target: "tree2" },
              { t: "caption", text: "③ 주인공 캐릭터를 시작 지점에 배치합니다" },
              { t: "move", target: "asset-hero" },
              { t: "click" },
              { t: "drag", from: "asset-hero", to: "hero1" },
              { t: "reveal", target: "hero1" },
              { t: "caption", text: "④ 테스트 버튼으로 배치 결과를 확인합니다" },
              { t: "move", target: "tool-play" },
              { t: "click" },
              { t: "reveal", target: "check-ok" },
              { t: "move", target: "check-ok" },
              { t: "caption", text: "⑤ 같은 LoRA로 뽑은 에셋이라 장면 톤이 유지됩니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "3d-model-generation",
          title: "3D 모델 생성: 텍스트에서 게임 레디 메시까지",
          minutes: 7,
          content: `3D 모델링은 1인 개발자의 최대 병목이었습니다. 2026년에는 **Meshy·Tripo** 같은 도구가 텍스트나 이미지 한 장으로 텍스처 입힌 3D 모델을 1분 안에 만들어 줍니다.

## 두 대표 도구의 성격

- **Meshy** — PBR 텍스처 품질이 강점. 텍스트→3D, 이미지→3D 모두 지원하며 대화형 에이전트로 수정 지시가 가능합니다.
- **Tripo** — 생성 속도(평균 수 초)와 깨끗한 지오메트리가 강점. 쿼드 리토폴로지(Smart Mesh)를 자동으로 수행해 게임용 메시에 유리합니다.

## "생성됐다"와 "게임에 쓸 수 있다"는 다릅니다

생성 직후의 메시는 대부분 그대로 못 씁니다. 반드시 확인하세요.

- **폴리곤 수** — 생성 모델은 수만 폴리곤이 기본. 소품이면 수백~수천으로 **리토폴로지**가 필요합니다.
- **토폴로지 품질** — 애니메이션할 모델(캐릭터)은 변형에 견디는 쿼드 기반 와이어프레임이 필요해 수동 정리가 남습니다.
- **UV·텍스처** — 자동 UV는 심(seam)이 어색한 경우가 많아 텍스처 재베이크가 필요할 수 있습니다.
- **LOD** — 거리별 저폴리 버전을 만들어야 프레임이 삽니다.

## 실무 요령

주인공처럼 화면 중앙에 오래 보이는 모델은 여전히 수작업(또는 외주) 가치가 있고, **배경 소품부터 AI로** 채우는 것이 승률 높은 순서입니다.

> 💡 **핵심**: AI 3D 생성은 "모델링의 끝"이 아니라 **"블록아웃의 10배속"**입니다. 리토폴로지·LOD라는 마무리 공정을 예산에 넣으세요.`,
          illustration: {
            type: "steps",
            title: "텍스트→게임 레디 3D 에셋 공정",
            steps: [
              {
                label: "프롬프트/이미지로 생성",
                sublabel: "Meshy · Tripo — 1분 내 초안",
                icon: "wand",
              },
              {
                label: "후보 중 선택 + 텍스처",
                sublabel: "PBR 머티리얼 적용",
                icon: "palette",
              },
              {
                label: "리토폴로지·폴리곤 감량",
                sublabel: "소품 수백~수천 폴리곤 목표",
                icon: "scissors",
              },
              {
                label: "LOD 생성 후 엔진 임포트",
                sublabel: "FBX/glTF → 콜라이더 설정",
                icon: "download",
              },
            ],
            caption: "3~4단계(최적화)를 건너뛰면 프레임 드랍으로 되돌아옵니다.",
          },
          demo: {
            title: "텍스트→3D 모델 생성 따라하기",
            app: {
              kind: "browser",
              url: "app.meshy.ai",
              blocks: [
                { id: "b-head", type: "heading", label: "Text to 3D" },
                { id: "b-prompt", type: "input", label: "에셋을 텍스트로 설명하세요…" },
                { id: "b-gen", type: "button", label: "Generate" },
                { id: "b-draft", type: "card", label: "📦 초안 메시 4종 생성됨", hidden: true },
                { id: "b-refine", type: "button", label: "Refine & Texture", hidden: true },
                { id: "b-textured", type: "card", label: "✨ PBR 텍스처 적용 완료", hidden: true },
                { id: "b-polycount", type: "badge", label: "폴리곤 12,400 — 감량 필요", hidden: true },
                { id: "b-export", type: "button", label: "Export FBX", hidden: true },
                { id: "b-done", type: "card", label: "✓ chest.fbx 다운로드 완료", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 원하는 에셋을 텍스트로 설명합니다" },
              { t: "move", target: "b-prompt" },
              { t: "click" },
              { t: "type", target: "b-prompt", text: "low poly treasure chest, game asset" },
              { t: "caption", text: "② Generate로 초안 메시를 생성합니다" },
              { t: "move", target: "b-gen" },
              { t: "click" },
              { t: "wait", ms: 600 },
              { t: "reveal", target: "b-draft" },
              { t: "move", target: "b-draft" },
              { t: "caption", text: "③ 마음에 드는 초안을 골라 텍스처를 입힙니다" },
              { t: "click" },
              { t: "reveal", target: "b-refine" },
              { t: "move", target: "b-refine" },
              { t: "click" },
              { t: "reveal", target: "b-textured" },
              { t: "caption", text: "④ 폴리곤 수를 확인합니다 — 그대로 쓰면 무겁습니다" },
              { t: "reveal", target: "b-polycount" },
              { t: "move", target: "b-polycount" },
              { t: "caption", text: "⑤ FBX로 내보내 엔진에서 리토폴로지·LOD를 마무리합니다" },
              { t: "reveal", target: "b-export" },
              { t: "click", target: "b-export" },
              { t: "reveal", target: "b-done" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "texture-audio-generation",
          title: "텍스처·사운드·음악: 라이선스가 도구를 고른다",
          minutes: 5,
          content: `에셋 중 오디오는 AI 품질이 이미 상용 수준입니다. 단, 이 영역의 도구 선택 기준은 품질보다 **라이선스**입니다.

## 텍스처

- Unity 6.2의 **Generators**가 텍스처·머티리얼 생성을 에디터 안에서 지원합니다.
- 3D 생성 도구(Meshy 등)의 PBR 텍스처 기능으로 기존 모델에 새 텍스처만 입히는 것도 실무 패턴입니다.
- 타일링(이음새 없는 반복) 여부를 반드시 확인하세요.

## 효과음(SFX)

- ElevenLabs 등의 SFX 생성기가 "낡은 나무 문이 삐걱이는 소리" 수준의 텍스트 지시로 효과음을 만들어 줍니다.
- 타격감이 중요한 코어 사운드는 여러 개 생성해 레이어링하면 품질이 크게 오릅니다.

## 음악 — 라이선스를 먼저 보세요

- **ElevenLabs Music**: 라이선스 확보된 데이터로 학습한 "라이선스 클린" 모델. 상업 게임에 안전한 선택지입니다.
- **Stable Audio**: 상업 라이선스 명시, BGM·앰비언트에 강합니다.
- **Suno·Udio**: 출력 품질은 높지만 학습 데이터 소송이 진행 중(2026년 기준)이라 상업 게임 BGM으로는 리스크 검토가 필요합니다.

> 💡 **핵심**: 오디오 생성 도구는 "가장 좋은 소리"가 아니라 **"학습 데이터가 깨끗하고 상업 이용 조건이 명시된 도구"**부터 고르세요. 출시 후 문제가 되는 건 품질이 아니라 권리입니다.`,
          illustration: {
            type: "grid",
            title: "오디오·텍스처 생성 도구 지도",
            items: [
              {
                label: "텍스처·머티리얼",
                sublabel: "Unity Generators · Meshy",
                icon: "layers",
                tone: "accent",
              },
              {
                label: "효과음(SFX)",
                sublabel: "텍스트→효과음 · 레이어링",
                icon: "mic",
                tone: "accent",
              },
              {
                label: "BGM — 클린 라이선스",
                sublabel: "ElevenLabs Music · Stable Audio",
                icon: "music",
                tone: "success",
              },
              {
                label: "BGM — 소송 진행 중",
                sublabel: "Suno · Udio (리스크 검토)",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "체크 1: 상업 이용 조항",
                sublabel: "플랜별 허용 범위 확인",
                icon: "file-text",
                tone: "muted",
              },
              {
                label: "체크 2: 학습 데이터 출처",
                sublabel: "라이선스 확보 여부",
                icon: "shield",
                tone: "muted",
              },
            ],
            caption: "초록은 안전지대, 노랑은 출시 전 법무 검토가 필요한 영역입니다.",
          },
        },
        {
          slug: "llm-npc",
          title: "LLM으로 살아있는 NPC 만들기: 비용과 지연의 공학",
          minutes: 7,
          content: `"모든 NPC가 자유 대화를 한다"는 데모는 쉽고, 출시는 어렵습니다. 문제는 지능이 아니라 **지연시간과 비용**입니다.

## 두 개의 벽

- **지연**: 클라우드 LLM으로 2~3문장을 생성하면 0.8~2.5초가 걸립니다. 대화의 몰입이 깨지는 시간입니다.
- **비용**: NPC당·플레이어당 추론이 동시접속 수만큼 곱해집니다. 라이브 게임에서 감당 못 하는 청구서가 나옵니다.

## 온디바이스 vs API

- **온디바이스** — NVIDIA ACE처럼 플레이어의 GPU에서 소형 모델을 직접 추론. 지연·서버비가 없지만 최소 사양이 올라갑니다. Unity의 Inference Engine도 이 방식의 기반입니다.
- **API** — Inworld·Convai 같은 게임 특화 플랫폼이 캐릭터 페르소나·기억·안전 필터를 관리형으로 제공합니다. 품질 상한이 높지만 과금·오프라인 불가 문제가 있습니다.

## 실무 완화 기법

- **스트리밍 출력**: 첫 글자가 0.3초에 나오면 체감 지연이 사라집니다.
- **응답 사전 생성**: 플레이어 입력 중에 유력 응답 후보를 미리 만들어 둡니다.
- **계층 설계**: 핵심 스토리 대사는 사람이 쓰고, 잡담·반응만 LLM에 맡기면 비용이 급감합니다.

> 💡 **핵심**: LLM NPC 설계의 질문은 "무엇을 말하게 할까"가 아니라 **"어떤 대사를 굳이 실시간 생성해야 하는가"**입니다. 대부분의 대사는 사전 생성으로 충분합니다.`,
          illustration: {
            type: "compare",
            title: "NPC용 LLM 연동: 온디바이스 vs API",
            columns: [
              {
                title: "온디바이스 (로컬 추론)",
                icon: "cpu",
                tone: "primary",
                items: [
                  "플레이어 GPU에서 소형 모델 실행",
                  "지연 최소 · 서버 비용 0",
                  "오프라인 동작 가능",
                  "단점: 최소 사양 상승 · 품질 상한",
                ],
              },
              {
                title: "API (관리형 클라우드)",
                icon: "cloud",
                tone: "accent",
                items: [
                  "Inworld · Convai 등 특화 플랫폼",
                  "페르소나·기억·안전 필터 내장",
                  "품질 상한 높음 · 모델 교체 쉬움",
                  "단점: 동접 비례 과금 · 지연 0.8초+",
                ],
              },
            ],
            caption: "핵심 대사는 사전 제작, 잡담만 실시간 — 하이브리드가 2026년의 정석입니다.",
          },
        },
      ],
    },
    {
      slug: "code-qa-launch",
      title: "코드·QA·출시",
      description: "AI 에이전트 코딩, 플레이테스트 자동화, 스토어 정책과 저작권 대응",
      lessons: [
        {
          slug: "ai-gameplay-code",
          title: "AI 에이전트로 게임플레이 코드 작성하기",
          minutes: 7,
          content: `게임 코드는 "작성 → 에디터에서 확인"의 왕복이 잦아 AI에게 불리했습니다. 2026년에는 **MCP로 에이전트가 엔진을 직접 조작**하면서 이 왕복이 루프 안으로 들어왔습니다.

## 에디터 연동: Unity MCP

커뮤니티의 Unity-MCP 같은 브리지를 붙이면 Claude Code·Cursor 등의 에이전트가 다음을 직접 합니다.

- 씬의 게임오브젝트·컴포넌트 검사
- C# 스크립트 작성 후 **컴파일 에러를 직접 읽고 수정**
- 플레이 모드 실행으로 동작 검증

"코드 생성기"가 아니라 **작성→실행→관찰→수정 루프를 도는 개발자**가 되는 것입니다.

## 무엇을 맡기면 잘하나

- **물리 기반 이동**: \`Rigidbody2D\` 세팅과 이동 스크립트 (Unity 6는 \`velocity\` 대신 \`linearVelocity\`를 씁니다 — 최신 API 지식은 프로젝트 규칙 파일로 보강하세요)
- **상태머신**: Idle→Run→Jump→Attack 전이 로직과 애니메이터 연결
- **에디터 툴**: 레벨 검증 스크립트, 에셋 일괄 처리기 — 투자 대비 효과 최고

## 프롬프트 요령

목표만 주지 말고 검증 방법을 함께 주세요: "이동 스크립트를 작성하고, 컴파일 확인 후 플레이 모드에서 좌우 이동을 검증해."

> 💡 **핵심**: 게임 코드에서 AI의 가치는 자동완성이 아니라 **엔진과 연결된 검증 루프**에서 나옵니다. MCP 연동을 먼저 세팅하세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "claude + unity-mcp — 에이전트 세션",
            lines: [
              { text: "점프 기능을 PlayerMovement에 추가해 줘", tone: "cmd" },
              { text: "[mcp] 씬 검사: Player에 Rigidbody2D 확인", tone: "dim" },
              { text: "[edit] PlayerMovement.cs +12줄", tone: "out" },
              { text: "[mcp] 컴파일... error CS0103: 'isGrounded'", tone: "err" },
              { text: "# 에이전트: 접지 판정 변수 누락 — 수정", tone: "comment" },
              { text: "[edit] GroundCheck 레이캐스트 추가", tone: "out" },
              { text: "[mcp] 컴파일 성공 → 플레이 모드 테스트", tone: "ok" },
              { text: "✓ 점프 동작 확인 — 완료", tone: "ok" },
            ],
            caption: "에이전트가 컴파일 에러를 스스로 읽고 고치는 것이 MCP 연동의 가치입니다.",
          },
          demo: {
            title: "유니티 C# 이동 스크립트를 AI로 작성 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "PlayerMovement.cs — Unity + AI 에이전트",
              files: [
                { id: "f-move", name: "PlayerMovement.cs", active: true },
                { id: "f-input", name: "PlayerInput.cs" },
                { id: "f-scene", name: "Stage1.unity" },
              ],
              code: [
                { id: "c1", text: "public class PlayerMovement : MonoBehaviour {" },
                { id: "c2", text: "[SerializeField] float speed = 5f;", indent: 1 },
                { id: "c3", text: "Rigidbody2D rb;", indent: 1 },
                { id: "c4", text: "void Awake() { rb = GetComponent<Rigidbody2D>(); }", indent: 1 },
                { id: "c5", text: "void FixedUpdate() {", indent: 1, tone: "add", hidden: true },
                { id: "c6", text: "float x = Input.GetAxis(\"Horizontal\");", indent: 2, tone: "add", hidden: true },
                { id: "c7", text: "rb.linearVelocity = new Vector2(x * speed, rb.linearVelocity.y);", indent: 2, tone: "add", hidden: true },
                { id: "c8", text: "}", indent: 1, tone: "add", hidden: true },
                { id: "c9", text: "}" },
              ],
              terminal: [
                { id: "t1", text: "좌우 이동 스크립트를 작성해 줘", tone: "cmd", hidden: true },
                { id: "t2", text: "[mcp] Player 오브젝트에 Rigidbody2D 확인 — 작성 시작", tone: "out", hidden: true },
                { id: "t3", text: "플레이 모드로 이동을 검증해 줘", tone: "cmd", hidden: true },
                { id: "t4", text: "✓ 컴파일 성공 — 좌우 이동 동작 확인", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① AI 에이전트에게 목표를 자연어로 지시합니다" },
              { t: "type", target: "t1", text: "좌우 이동 스크립트를 작성해 줘" },
              { t: "reveal", target: "t2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 에이전트가 물리 기반 이동 코드를 작성합니다" },
              { t: "move", target: "c4" },
              { t: "click" },
              { t: "reveal", target: "c5" },
              { t: "type", target: "c6", text: "float x = Input.GetAxis(\"Horizontal\");" },
              { t: "reveal", target: "c7" },
              { t: "reveal", target: "c8" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ Unity 6에서는 velocity 대신 linearVelocity입니다" },
              { t: "dblclick", target: "c7" },
              { t: "caption", text: "④ 플레이 모드 검증까지가 한 루프입니다" },
              { t: "type", target: "t3", text: "플레이 모드로 이동을 검증해 줘" },
              { t: "reveal", target: "t4" },
              { t: "move", target: "t4" },
              { t: "caption", text: "⑤ 통과 — 실패 시 에러를 주고 다시 돌리면 됩니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "playtest-balancing",
          title: "플레이테스트와 밸런싱 자동화",
          minutes: 5,
          content: `1인 개발자의 진짜 결핍은 아트가 아니라 **테스터**입니다. 2026년에는 스튜디오의 절반 가까이가 QA·플레이테스트에 AI를 씁니다 — 혼자인 당신에게 더 절실한 도구입니다.

## AI 플레이테스트가 잡아주는 것

- **진행 불가 구간**: 봇 수백 대가 레벨을 돌며 끼임·낙사·소프트락을 기계적으로 발견합니다.
- **밸런스 붕괴**: 강화학습(RL) 에이전트끼리 수만 판을 시뮬레이션해 지배적인 무기·전략을 찾아냅니다.
- **난이도 곡선**: "신중한 탐험가", "공격적인 스피드러너" 같은 **플레이어 아키타입 봇**으로 유형별 이탈 지점을 측정합니다.

## 1인 개발자의 현실적 도입 순서

1. **스모크 테스트 봇** — "시작→클리어까지 무작위 입력으로 완주"만 자동화해도 빌드마다 큰 회귀를 잡습니다.
2. **밸런스 시뮬레이터** — 전투 공식을 코드로 분리하고, AI 에이전트에게 수천 번 시뮬레이션시켜 스탯 테이블을 튜닝합니다.
3. **AI 리뷰어** — 플레이 영상·로그를 멀티모달 모델에게 보여주고 "어디서 지루했나"를 물어봅니다.

## 한계

봇은 버그와 수치를 찾지, **재미를 느끼지 못합니다**. 사람 테스트를 대체하는 게 아니라, 사람의 시간을 재미 판단에만 쓰게 해주는 것입니다.

> 💡 **핵심**: AI 플레이테스트의 목적은 사람 테스터의 대체가 아니라 **"사람에게는 재미 질문만 남기기"**입니다.`,
          illustration: {
            type: "cycle",
            title: "자동 밸런싱 루프",
            center: "매 빌드마다 반복",
            nodes: [
              { label: "봇 플레이", sublabel: "아키타입별 수백 회", icon: "bot" },
              { label: "지표 수집", sublabel: "클리어율·사망 지점", icon: "chart" },
              { label: "붕괴 탐지", sublabel: "지배 전략·소프트락", icon: "search" },
              { label: "수치 조정", sublabel: "스탯 테이블 갱신", icon: "settings" },
            ],
            caption: "사람은 이 루프의 결과를 보고 '재미'만 판단하면 됩니다.",
          },
        },
        {
          slug: "store-ai-policy",
          title: "스토어 등록과 AI 콘텐츠 고지: Steam 정책 실전",
          minutes: 5,
          content: `열심히 만든 게임이 고지 누락으로 스토어에서 문제가 되면 억울합니다. 2026년 1월 개정된 Steam의 AI 고지 정책은 이전보다 명확해졌으니 정확히 알아두세요.

## 개정의 핵심: "플레이어가 소비하는 것"만

Valve는 고지 대상을 **게임에 실려 플레이어가 소비하는 AI 생성 콘텐츠**로 좁혔습니다. 개발 과정의 효율 도구 — AI 코드 어시스턴트, 내부 문서 작성 등 — 는 고지 대상이 아닙니다.

## 두 가지 카테고리

- **사전 생성(Pre-generated)**: 개발 중 AI로 만들어 게임에 포함한 에셋(이미지·오디오·텍스트). 등록 시 **서술형 텍스트로 상세히 기재**하며, 일반 콘텐츠와 같은 심사를 받습니다. 스토어 페이지·마케팅 이미지의 AI 사용도 포함됩니다.
- **라이브 생성(Live-generated)**: 실행 중에 AI가 콘텐츠를 만드는 경우(LLM NPC 대화 등). 체크박스 확인과 함께 **부적절·불법 콘텐츠를 막는 가드레일**을 설명해야 합니다.

## 고지 실무 팁

- 고지 내용은 스토어 페이지에 공개됩니다 — 숨기려다 커뮤니티에 발각되는 것이 최악의 시나리오입니다.
- LLM NPC를 쓴다면 모듈 2에서 다룬 안전 필터가 곧 가드레일 설명의 재료가 됩니다.
- 개발 로그를 남겨 두면(어떤 에셋을 어떤 도구로) 고지 작성이 10분 일거리가 됩니다.

> 💡 **핵심**: 기준은 하나 — **"플레이어가 보고 듣는 것 중 AI가 만든 게 있는가"**. 있으면 사전/라이브를 구분해 정직하게 쓰는 것이 가장 싼 보험입니다.`,
          illustration: {
            type: "flow",
            title: "Steam AI 고지 판단 플로우",
            nodes: [
              {
                label: "AI로 만든 것이 있는가?",
                sublabel: "에셋·대사·스토어 이미지 점검",
                icon: "search",
                tone: "primary",
              },
              {
                label: "플레이어가 소비하는가?",
                sublabel: "코드 어시스턴트 등 효율 도구는 제외",
                icon: "eye",
                tone: "accent",
                edgeLabel: "개발 도구만 썼다면 고지 불필요",
              },
              {
                label: "사전 생성 → 서술형 기재",
                sublabel: "포함된 AI 에셋을 상세히 설명",
                icon: "file-text",
                tone: "warning",
              },
              {
                label: "라이브 생성 → 가드레일 설명",
                sublabel: "부적절 콘텐츠 방지책 명시",
                icon: "shield",
                tone: "warning",
              },
              {
                label: "스토어 페이지에 공개",
                sublabel: "정직한 고지가 가장 싼 보험",
                icon: "check",
                tone: "success",
              },
            ],
            caption: "2026년 1월 개정 기준 — '플레이어가 소비하는 콘텐츠'가 유일한 기준선입니다.",
          },
        },
        {
          slug: "copyright-risk",
          title: "저작권 리스크 관리: 내 게임을 지키는 법",
          minutes: 5,
          content: `AI 에셋의 저작권 문제는 "소송당할 위험"보다 **"내 게임을 아무도 못 지키게 되는 위험"**이 먼저입니다.

## 확정된 법적 지형 (미국 기준)

- 2026년 3월 연방대법원이 관련 상고를 기각하면서, **순수 AI 생성물은 저작권 등록 불가**라는 원칙이 확정됐습니다.
- 반면 사람이 충분히 기여한 **인간+AI 협업 저작물은 등록 가능** — 이미 6,000건 이상 등록됐습니다. 단, AI 생성 부분은 명시하고 보호 범위에서 제외해야 하며, 숨기면 등록이 취소될 수 있습니다.

## 무엇이 "인간의 기여"인가

프롬프트를 잘 쓰고 첫 출력을 그대로 쓰는 것은 인정받기 어렵습니다. 인정되는 것은:

- AI 출력을 **실질적으로 편집·수정**한 것 (2D 후보정, 리토폴로지가 여기서도 효자입니다)
- 출력물들을 **선택·배치·결합**한 구성적 판단
- AI 요소와 직접 만든 요소의 결합

## 1인 개발자의 방어 체크리스트

1. 학습 데이터가 깨끗한(라이선스 클린) 도구를 우선 선택
2. 도구별 상업 이용 약관 확인 — 무료 플랜은 상업 금지인 경우가 많습니다
3. AI 원본과 수정본을 분리 보관 (기여 입증 자료)
4. 어떤 에셋을 어떤 도구로 만들었는지 기록 (Steam 고지와 등록 서류에 재사용)
5. 게임의 "얼굴"(주인공·키 비주얼·로고)은 사람 손의 비중을 높게

> 💡 **핵심**: AI 에셋을 쓰되 **사람의 편집·선택·결합을 기록으로 남기는 것** — 이것이 저작권 보호와 스토어 고지를 동시에 해결하는 한 가지 습관입니다.`,
          illustration: {
            type: "stack",
            title: "저작권 방어의 4층 구조",
            layers: [
              {
                label: "보호받는 최종 게임",
                sublabel: "인간+AI 협업 저작물로 등록",
                icon: "shield",
                tone: "success",
              },
              {
                label: "인간의 기여 층",
                sublabel: "편집·선택·배치·결합의 기록",
                icon: "user",
                tone: "primary",
              },
              {
                label: "도구·약관 층",
                sublabel: "라이선스 클린 도구 · 상업 조항 확인",
                icon: "file-text",
                tone: "accent",
              },
              {
                label: "AI 원시 출력",
                sublabel: "이 층만으로는 보호 불가 (등록 불가)",
                icon: "bot",
                tone: "muted",
              },
            ],
            caption: "맨 아래 층(AI 원시 출력)에 머무는 에셋이 많을수록 게임의 방어력이 약해집니다.",
          },
        },
      ],
    },
  ],
};
