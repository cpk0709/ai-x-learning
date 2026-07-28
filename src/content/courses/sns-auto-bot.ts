import type { Course } from "../types";

/**
 * SNS 자동 포스팅 봇 구축 — AI API + Make 기반 무인 콘텐츠 파이프라인
 *
 * 스타일은 loop-engineering.ts(품질 기준)를 따릅니다:
 * 훅 문장 → ## 소제목 2~3개 → 불릿 위주 → "> 💡 **핵심**:" 마무리.
 */
export const snsAutoBot: Course = {
  slug: "sns-auto-bot",
  title: "SNS 자동 포스팅 봇 구축: AI API + Make",
  subtitle: "매일 알아서 인스타그램과 블로그에 올라가는 콘텐츠 봇 만들기",
  description:
    "콘텐츠는 꾸준함이 전부인데, 사람의 꾸준함에는 한계가 있습니다. 이 강의에서는 AI API와 노코드 자동화 도구 Make를 연결해 주제 선정부터 카피·이미지 생성, 검수, 인스타그램·블로그 발행까지 스스로 돌아가는 포스팅 파이프라인을 만듭니다. 발행 데이터를 다시 주제 큐로 되돌리는 개선 루프와 계정을 지키는 정책 준수까지 — 하루 10분 관리로 매일 발행되는 시스템을 완성합니다.",
  category: "business",
  level: "intermediate",
  tags: ["Make", "SNS 자동화", "인스타그램 API", "AI 카피라이팅", "노코드"],
  gradient: ["#3b82f6", "#06b6d4"],
  icon: "send",
  outcomes: [
    "주제 큐 → 생성 → 검수 → 발행 → 환류로 이어지는 자동 포스팅 파이프라인을 설계할 수 있다",
    "브랜드 보이스를 유지하는 플랫폼별 카피를 AI API로 자동 생성할 수 있다",
    "인스타그램 그래프 API와 블로그 API를 Make 시나리오로 연결해 무인 발행을 구축할 수 있다",
    "금칙어·휴먼 승인 등 품질 가드와 성과 환류 루프로 계정을 안전하게 운영할 수 있다",
  ],
  modules: [
    {
      slug: "system-design",
      title: "설계: 자동 포스팅 시스템의 뼈대",
      description: "아키텍처, 주제 큐, 브랜드 보이스 프롬프트",
      lessons: [
        {
          slug: "auto-posting-architecture",
          title: "전체 아키텍처: 주제에서 발행까지의 파이프라인",
          minutes: 5,
          content: `"매일 올리자"는 다짐은 3주를 못 갑니다. 오래가는 계정은 의지가 아니라 **시스템** 위에서 돌아갑니다.

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

> 💡 **핵심**: 자동 포스팅 봇 = **큐 → 생성 → 검수 → 발행 → 환류**. 발행에서 끝나지 않고 데이터가 큐로 되돌아와야 '시스템'입니다.`,
          illustration: {
            type: "flow",
            title: "자동 포스팅 파이프라인",
            nodes: [
              {
                label: "주제 큐",
                sublabel: "스프레드시트 · 노션",
                icon: "calendar",
                tone: "muted",
              },
              {
                label: "AI 생성",
                sublabel: "카피 + 이미지",
                icon: "sparkles",
                tone: "primary",
              },
              {
                label: "검수 게이트",
                sublabel: "금칙어 · 형식 · 승인",
                icon: "shield",
                tone: "warning",
              },
              {
                label: "발행",
                sublabel: "인스타그램 · 블로그",
                icon: "send",
                tone: "accent",
              },
              {
                label: "성과 수집",
                sublabel: "도달 · 참여 데이터",
                icon: "chart",
                tone: "success",
              },
            ],
            loopBack: { from: 4, to: 0, label: "잘된 주제를 큐에 환류" },
            caption: "성과 데이터가 주제 큐로 되돌아오는 순간, 봇은 스스로 나아지기 시작합니다.",
          },
        },
        {
          slug: "content-calendar-queue",
          title: "콘텐츠 캘린더와 주제 큐 설계",
          minutes: 5,
          content: `봇이 매일 멈추지 않으려면 "오늘 뭘 올리지?"라는 질문이 시스템 안에서 이미 답해져 있어야 합니다. 그 답이 **주제 큐**입니다.

## 큐는 시트 한 장이면 충분합니다

구글 스프레드시트(또는 노션 데이터베이스)에 행 하나 = 포스트 하나로 관리합니다. 필수 컬럼은 5개뿐입니다.

- **주제** — 한 줄 소재 ("여름 휴가철 짐 싸기 체크리스트")
- **핵심 메시지** — AI에게 줄 방향 한 문장
- **발행일 / 플랫폼** — 언제, 어디에
- **상태** — \`대기 → 생성됨 → 승인 → 발행됨\` (Make가 이 값을 보고 움직입니다)
- **결과 링크** — 발행 후 봇이 채워 넣는 증거

## 큐를 마르지 않게 하는 법

- 콘텐츠 필러(pillar) 3~4개를 정하고 요일별로 배정합니다 — 월: 정보, 수: 후기, 금: 프로모션.
- 주 1회 30분, AI에게 필러별 주제 20개를 뽑게 해 큐를 채웁니다. 사람은 **고르기만** 합니다.
- 잔여 큐가 7개 미만이면 알림을 보내는 시나리오를 하나 더 둡니다.

> 💡 **핵심**: 상태 컬럼이 곧 봇의 신호등입니다. Make는 "상태 = 승인"인 행만 집어 발행하고, 끝나면 "발행됨"으로 바꿉니다.`,
          illustration: {
            type: "steps",
            title: "주제 큐 구축 4단계",
            steps: [
              {
                label: "필러 정하기",
                sublabel: "정보 · 후기 · 프로모션 등 3~4개",
                icon: "target",
              },
              {
                label: "큐 시트 만들기",
                sublabel: "주제 · 발행일 · 상태 · 결과 컬럼",
                icon: "clipboard",
              },
              {
                label: "AI로 대량 채우기",
                sublabel: "필러별 주제 20개 생성 → 사람이 선별",
                icon: "sparkles",
              },
              {
                label: "Make에 연결",
                sublabel: "상태 값 기준으로 행을 읽고 갱신",
                icon: "workflow",
              },
            ],
            caption: "사람은 주 1회 큐를 채우고, 나머지 6일은 봇이 큐를 소비합니다.",
          },
        },
        {
          slug: "brand-voice-copywriting",
          title: "AI 카피 생성: 브랜드 보이스와 플랫폼별 형식",
          minutes: 6,
          content: `AI 카피의 문제는 못 쓰는 게 아니라 **누가 써도 똑같다**는 것입니다. 해법은 브랜드 보이스를 프롬프트에 박제하는 것입니다.

## 브랜드 보이스 프롬프트의 3요소

시스템 프롬프트에 한 번 정의해두고 매 호출에 재사용합니다.

- **정체성** — 누구인가: "10년 차 여행 가이드가 친구에게 말하듯"
- **규칙** — 항상/절대: "항상 해요체, 이모지는 문단당 1개, 과장 표현('무조건','최고') 금지"
- **실제 예시 2~3개** — 잘 쓴 과거 포스트 원문. 형용사 열 개보다 예시 하나가 강합니다.

## 플랫폼별 형식은 출력 스펙으로

같은 주제라도 채널마다 완성형이 다르므로, 한 번의 호출에서 **JSON으로 두 벌**을 받습니다.

- **인스타그램**: 첫 문장 훅 + 본문 500자 이내 + 해시태그 10개 내외
- **블로그**: 검색 키워드가 든 제목 + 소제목 구조 + 1,500자 이상

\`\`\`text
출력은 JSON으로:
{ "instagram": { "caption", "hashtags" },
  "blog": { "title", "html_body" } }
\`\`\`

JSON으로 받아야 Make가 필드를 그대로 다음 모듈에 꽂을 수 있습니다.

> 💡 **핵심**: 보이스는 **시스템 프롬프트에 예시로**, 형식은 **JSON 출력 스펙으로**. 이 분리가 자동화 가능한 카피의 조건입니다.`,
          illustration: {
            type: "chat",
            title: "브랜드 보이스 프롬프트 실전",
            messages: [
              {
                role: "system",
                text: "10년 차 여행 가이드가 친구에게 말하듯. 해요체, 과장 금지, 이모지 문단당 1개. [예시 포스트 2건 첨부]",
              },
              {
                role: "user",
                text: "주제: 여름 휴가철 짐 싸기 체크리스트. 인스타 캡션과 블로그 글을 JSON으로.",
              },
              {
                role: "ai",
                text: '{ "instagram": { "caption": "캐리어 앞에서 30분째 고민 중이라면… ✈️ 이 5가지만 기억하세요.", "hashtags": ["#여름휴가", "#짐싸기꿀팁", …] }, "blog": { "title": "여름 휴가 짐 싸기 체크리스트 5가지", … } }',
              },
            ],
            caption: "같은 주제, 한 번의 호출로 플랫폼별 완성본 두 벌을 받습니다.",
          },
          demo: {
            title: "브랜드 보이스 카피 생성 따라하기",
            app: {
              kind: "browser",
              url: "playground.ai-studio.dev",
              blocks: [
                { id: "b-head", type: "heading", label: "AI 카피 스튜디오" },
                { id: "b-sys-label", type: "text", label: "시스템 프롬프트 (브랜드 보이스)" },
                { id: "b-sys-input", type: "input", label: "브랜드 보이스를 입력하세요…" },
                { id: "b-topic-input", type: "input", label: "오늘의 주제를 입력하세요…" },
                { id: "b-json-badge", type: "badge", label: "JSON 출력 모드" },
                { id: "b-gen-btn", type: "button", label: "카피 생성" },
                {
                  id: "b-card-insta",
                  type: "card",
                  label: "📸 Instagram — \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"",
                  hidden: true,
                },
                {
                  id: "b-card-tags",
                  type: "card",
                  label: "#여름휴가 #짐싸기꿀팁 #여행준비 외 7개",
                  hidden: true,
                },
                {
                  id: "b-card-blog",
                  type: "card",
                  label: "📝 Blog — 여름 휴가 짐 싸기 체크리스트 5가지 (1,800자)",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 브랜드 보이스를 시스템 프롬프트에 입력합니다" },
              { t: "move", target: "b-sys-input" },
              { t: "click" },
              { t: "type", target: "b-sys-input", text: "10년 차 여행 가이드처럼 해요체, 과장 금지" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 주제 큐에서 가져온 오늘의 소재를 붙여넣습니다" },
              { t: "click", target: "b-topic-input" },
              { t: "type", target: "b-topic-input", text: "여름 휴가철 짐 싸기 체크리스트" },
              { t: "caption", text: "③ JSON 출력 모드를 켜고 생성을 실행합니다" },
              { t: "move", target: "b-json-badge" },
              { t: "click" },
              { t: "move", target: "b-gen-btn" },
              { t: "click" },
              { t: "wait", ms: 700 },
              { t: "caption", text: "④ 인스타그램 캡션과 해시태그가 먼저 도착합니다" },
              { t: "reveal", target: "b-card-insta" },
              { t: "reveal", target: "b-card-tags" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 같은 호출에서 블로그 버전도 함께 받습니다" },
              { t: "reveal", target: "b-card-blog" },
              { t: "move", target: "b-card-blog" },
              { t: "caption", text: "✅ 한 번의 호출로 두 플랫폼 완성본 — Make가 필드를 그대로 씁니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
      ],
    },
    {
      slug: "build-pipeline",
      title: "구축: Make로 발행 라인 연결하기",
      description: "이미지 생성, 인스타그램 그래프 API, 블로그 API, 스케줄링",
      lessons: [
        {
          slug: "auto-image-generation",
          title: "이미지 자동 생성: 카드뉴스와 썸네일",
          minutes: 6,
          content: `인스타그램은 결국 이미지 플랫폼입니다. 텍스트 봇에서 멈추면 절반짜리 자동화입니다.

## 두 가지 전략, 용도가 다릅니다

- **AI 이미지 생성 API** — 매번 새로운 비주얼. 감성 컷·배경 이미지에 적합하지만 브랜드 일관성 유지가 어렵습니다.
- **템플릿 렌더링(Bannerbear·Placid 등)** — 디자이너가 만든 템플릿에 **텍스트·이미지 변수만 치환**. 카드뉴스·정보성 썸네일의 정석이며, 100장을 만들어도 톤이 같습니다.

실무 조합은 "배경은 AI 생성, 텍스트 레이어는 템플릿"입니다.

## Make에서의 연결

1. 카피 생성 결과에서 헤드라인을 추출합니다.
2. 템플릿 API에 \`headline\`, \`background_url\` 변수를 넘겨 렌더링합니다.
3. 결과 이미지 URL을 발행 모듈로 전달합니다.

## 규격을 처음부터 맞추세요

- 인스타그램 피드 1:1(1080×1080) 또는 4:5(1080×1350)
- 스토리·릴스 커버 9:16(1080×1920)
- 블로그 대표 이미지 16:9(1200×675)

템플릿을 규격별로 미리 만들어두면 리사이즈 단계가 통째로 사라집니다.

> 💡 **핵심**: 브랜드 일관성이 필요한 이미지는 **생성이 아니라 치환**입니다. AI는 소재를, 템플릿은 톤을 담당합니다.`,
          illustration: {
            type: "grid",
            title: "이미지 자동화 구성 요소",
            items: [
              {
                label: "AI 이미지 생성",
                sublabel: "새로운 비주얼 소재",
                icon: "wand",
                tone: "primary",
              },
              {
                label: "템플릿 렌더링",
                sublabel: "카드뉴스 · 변수 치환",
                icon: "palette",
                tone: "accent",
              },
              {
                label: "브랜드 에셋",
                sublabel: "로고 · 폰트 · 컬러 고정",
                icon: "layers",
                tone: "muted",
              },
              {
                label: "플랫폼 규격",
                sublabel: "1:1 · 4:5 · 9:16 · 16:9",
                icon: "image",
                tone: "muted",
              },
              {
                label: "이미지 URL 전달",
                sublabel: "발행 API가 URL로 수신",
                icon: "link",
                tone: "success",
              },
              {
                label: "대체 텍스트",
                sublabel: "접근성 + 검색 노출",
                icon: "file-text",
                tone: "muted",
              },
            ],
            caption: "여섯 조각이 모여 '사람이 만든 것 같은' 이미지 라인이 됩니다.",
          },
        },
        {
          slug: "instagram-graph-api",
          title: "인스타그램 그래프 API: 계정 연결과 제약",
          minutes: 7,
          content: `인스타그램 자동 발행의 관문은 코드가 아니라 **계정 설정**입니다. 여기서 90%가 막히니 순서대로 갑니다.

## 발행까지의 연결 사슬

1. 인스타그램 계정을 **프로페셔널(비즈니스) 계정**으로 전환합니다 — 개인 계정은 API 발행이 불가합니다.
2. 페이스북 페이지를 만들고 인스타그램 계정과 **연결**합니다.
3. Meta 개발자 앱을 만들고 \`instagram_content_publish\` 등 권한을 받습니다.
4. Make의 인스타그램 비즈니스 모듈에 로그인하면 토큰 갱신은 Make가 대신 처리합니다.

## 반드시 알아야 할 제약 (2026 기준)

- 발행은 **2단계**입니다: 미디어 컨테이너 생성 → 발행 확정. Make 모듈이 감싸주지만 실패 시 디버깅에 필요한 지식입니다.
- 이미지는 파일 업로드가 아니라 **공개 URL**로 전달합니다 — 앞 레슨에서 URL을 받아둔 이유입니다.
- API 발행은 **24시간당 계정별 상한**(수십 건 수준)이 있습니다. 하루 1~3회 발행 봇에는 충분합니다.
- 스토리·릴스 발행은 지원 범위와 형식 제약이 다르므로 피드부터 안정화하세요.

> 💡 **핵심**: 순서는 **비즈니스 계정 → 페이지 연결 → 권한 → Make 로그인**. 발행 실패의 대부분은 코드가 아니라 이 사슬의 어딘가가 끊긴 것입니다.`,
          illustration: {
            type: "stack",
            title: "인스타그램 발행의 연결 사슬",
            layers: [
              {
                label: "Make 시나리오",
                sublabel: "발행 모듈 · 토큰 자동 갱신",
                icon: "workflow",
                tone: "primary",
              },
              {
                label: "Meta 개발자 앱",
                sublabel: "instagram_content_publish 권한",
                icon: "key",
                tone: "accent",
              },
              {
                label: "페이스북 페이지",
                sublabel: "인스타그램 계정과 연결",
                icon: "link",
                tone: "muted",
              },
              {
                label: "인스타그램 비즈니스 계정",
                sublabel: "개인 계정은 API 발행 불가",
                icon: "camera",
                tone: "warning",
              },
            ],
            caption: "위에서 아래까지 한 층이라도 끊기면 발행은 실패합니다 — 아래층부터 점검하세요.",
          },
          demo: {
            title: "Make에서 발행 시나리오 조립 따라하기",
            app: {
              kind: "automation-canvas",
              windowTitle: "daily-post 시나리오 — Make",
              nodes: [
                {
                  id: "n-sheet",
                  icon: "clipboard",
                  label: "Google Sheets",
                  sublabel: "상태=승인 행 읽기",
                  tone: "accent",
                },
                {
                  id: "n-copy",
                  icon: "sparkles",
                  label: "AI 카피",
                  sublabel: "JSON 두 벌 생성",
                  tone: "primary",
                  hidden: true,
                },
                {
                  id: "n-image",
                  icon: "image",
                  label: "이미지 렌더링",
                  sublabel: "템플릿 변수 치환",
                  tone: "muted",
                  hidden: true,
                },
                {
                  id: "n-insta",
                  icon: "camera",
                  label: "Instagram 발행",
                  sublabel: "비즈니스 계정 · 공개 URL",
                  tone: "warning",
                  hidden: true,
                },
                {
                  id: "n-update",
                  icon: "refresh",
                  label: "시트 갱신",
                  sublabel: "상태=발행됨 기록",
                  tone: "success",
                  hidden: true,
                },
              ],
              runLog: [
                { id: "log-run", text: "▶ 시나리오 1회 실행 시작", tone: "out", hidden: true },
                { id: "log-sheet", text: "✓ 시트: 승인 상태 1건 로드", tone: "ok", hidden: true },
                {
                  id: "log-container",
                  text: "✓ 미디어 컨테이너 생성 — 2단계 발행 1/2",
                  tone: "ok",
                  hidden: true,
                },
                {
                  id: "log-publish",
                  text: "✓ 발행 확정 — 게시물 ID 1789… (2/2)",
                  tone: "ok",
                  hidden: true,
                },
                { id: "log-done", text: "✓ 시트 갱신: 상태=발행됨, 결과 링크 기록", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 주제 큐를 읽는 구글 시트 모듈부터 놓습니다" },
              { t: "move", target: "n-sheet" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 카피를 만드는 AI 모듈을 이어 붙입니다" },
              { t: "reveal", target: "n-copy" },
              { t: "move", target: "n-copy" },
              { t: "click" },
              { t: "caption", text: "③ 이미지 렌더링과 인스타그램 발행 모듈을 연결합니다" },
              { t: "reveal", target: "n-image" },
              { t: "reveal", target: "n-insta" },
              { t: "move", target: "n-insta" },
              { t: "click" },
              { t: "caption", text: "④ 마지막에 시트 상태를 갱신하는 모듈을 답니다" },
              { t: "reveal", target: "n-update" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 1회 실행으로 컨테이너 생성 → 발행 확정 2단계를 확인합니다" },
              { t: "reveal", target: "log-run" },
              { t: "reveal", target: "log-sheet" },
              { t: "reveal", target: "log-container" },
              { t: "reveal", target: "log-publish" },
              { t: "move", target: "log-publish" },
              { t: "reveal", target: "log-done" },
              { t: "caption", text: "✅ 큐에서 발행까지 무인 라인 완성 — 실패하면 로그의 단계부터 봅니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "blog-publishing",
          title: "블로그 발행 자동화: 워드프레스와 티스토리",
          minutes: 5,
          content: `블로그는 인스타그램과 반대로 **검색 유입의 저수지**입니다. 같은 파이프라인에서 긴 글 버전을 흘려보냅니다.

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

> 💡 **핵심**: 자동화 친화도는 플랫폼마다 다릅니다. **API가 열려 있는 곳에 본진**을 두고, 닫힌 곳은 반자동으로 타협하세요.`,
          illustration: {
            type: "compare",
            title: "워드프레스 vs 티스토리 자동화",
            columns: [
              {
                title: "워드프레스",
                icon: "globe",
                tone: "primary",
                items: [
                  "공식 REST API + Make 전용 모듈",
                  "예약 발행 · 카테고리 · 대표 이미지 제어",
                  "자체 도메인 — 정지 리스크 없음",
                  "완전 무인 발행 가능",
                ],
              },
              {
                title: "티스토리",
                icon: "alert",
                tone: "warning",
                items: [
                  "Open API 신규 발급 중단",
                  "반자동(원고 전달 → 수동 게시)이 현실적",
                  "브라우저 자동화는 차단 리스크",
                  "장기적으로 이전 검토 권장",
                ],
              },
            ],
            caption: "본진은 API가 열린 플랫폼에 — 자동화 가능성이 곧 플랫폼 선택 기준입니다.",
          },
        },
        {
          slug: "scheduling",
          title: "스케줄링과 최적 발행 시간",
          minutes: 5,
          content: `콘텐츠가 준비됐어도 **언제 올리느냐**로 도달이 갈립니다. 스케줄링은 봇의 심장 박동입니다.

## Make 스케줄링의 두 층

- **시나리오 트리거** — 시나리오 자체를 "매일 07:30 실행"처럼 예약합니다. 큐에서 오늘 날짜 행을 읽어 발행하는 가장 단순한 구조입니다.
- **행 단위 예약** — 큐 시트에 발행 시각 컬럼을 두고, 15분마다 도는 시나리오가 "지금 시각 ≤ 예약 시각인 승인 행"만 집어 발행합니다. 포스트마다 다른 시간을 줄 수 있습니다.

## 최적 시간은 정답이 아니라 실험값

- 출발점: 인스타그램은 출근길(7~9시)·점심(12시)·밤(20~22시), 블로그는 검색이 몰리는 오전.
- 단, **내 팔로워의 활동 시간**이 통계를 이깁니다. 인사이트의 활동 시간대를 매달 확인해 예약 규칙을 갱신하세요.
- 같은 필러를 두 시간대에 번갈아 발행해 4주간 도달을 비교하면 자체 데이터가 생깁니다.

## 운영 팁

- 발행 성공/실패를 슬랙·텔레그램으로 알림 받는 모듈을 끝에 붙이세요. 침묵하는 봇이 가장 위험합니다.

> 💡 **핵심**: 스케줄은 **고정값이 아니라 실험 변수**입니다. 시각 컬럼 하나로 발행 시간을 데이터로 관리하세요.`,
          illustration: {
            type: "terminal",
            windowTitle: "Make — 시나리오 실행 로그",
            lines: [
              { text: "[07:30:00] 시나리오 'daily-post' 시작", tone: "cmd" },
              { text: "큐 조회: 상태=승인, 예약시각≤07:30 → 1건", tone: "out" },
              { text: "AI 카피 로드 · 이미지 URL 확인 … OK", tone: "ok" },
              { text: "Instagram: 컨테이너 생성 → 발행 완료 (id: 1789…)", tone: "ok" },
              { text: "WordPress: 초안 → 공개 전환 완료", tone: "ok" },
              { text: "시트 갱신: 상태=발행됨, 결과 링크 기록", tone: "out" },
              { text: "# 실패 시: 텔레그램 알림 + 상태=오류", tone: "comment" },
              { text: "[07:30:41] 완료 — 다음 실행 07:45", tone: "dim" },
            ],
            caption: "15분 주기로 도는 시나리오가 예약 시각이 된 행만 집어 발행합니다.",
          },
        },
      ],
    },
    {
      slug: "safe-operations",
      title: "운영: 품질과 계정을 지키는 루프",
      description: "검수 게이트, 성과 환류, 플랫폼 정책 준수",
      lessons: [
        {
          slug: "quality-gate",
          title: "품질 가드: 발행 전 검수 게이트 만들기",
          minutes: 6,
          content: `자동화의 진짜 리스크는 오타가 아니라 **틀린 내용이 브랜드 이름으로 매일 나가는 것**입니다. 발행 앞에 게이트를 세웁니다.

## 3겹의 자동 검사

Make 시나리오에서 발행 모듈 **직전**에 필터를 겹칩니다.

- **금칙어 검사** — 과장·의료·금융 관련 위험 표현("100% 보장", "부작용 없음"), 경쟁사명, 비속어 목록과 대조합니다.
- **형식 검사** — 글자 수 상한, 해시태그 개수, 이미지 URL 응답 확인, 링크 유효성.
- **AI 교차 검수** — 생성과 **다른 모델·다른 프롬프트**로 "사실 오류·과장·보이스 이탈"을 채점하게 합니다. 자기가 쓴 글을 자기가 검사하게 하면 안 됩니다.

## 휴먼 승인은 옵션이 아니라 다이얼

- **초기(1~4주)**: 전수 승인 — 승인 요청을 텔레그램으로 받고, 버튼 한 번으로 상태를 "승인"으로 바꿉니다.
- **안정기**: 표본 승인 — 민감 필러(프로모션·시사)만 사람이 보고 나머지는 자동 통과.
- 반려된 포스트는 반려 사유와 함께 생성 단계로 되돌립니다. 이 반려 루프가 프롬프트 개선의 원료가 됩니다.

> 💡 **핵심**: 게이트는 **기계 검사 3겹 + 사람 승인 다이얼**. 신뢰가 쌓이는 만큼만 다이얼을 자동 쪽으로 돌리세요.`,
          illustration: {
            type: "flow",
            title: "발행 전 검수 게이트",
            nodes: [
              {
                label: "AI 생성 완료",
                sublabel: "카피 + 이미지",
                icon: "sparkles",
                tone: "muted",
              },
              {
                label: "자동 검사",
                sublabel: "금칙어 · 형식 · 링크",
                icon: "filter",
                tone: "accent",
              },
              {
                label: "AI 교차 검수",
                sublabel: "다른 모델이 사실·보이스 채점",
                icon: "eye",
                tone: "primary",
                edgeLabel: "자동 검사 통과 시",
              },
              {
                label: "휴먼 승인",
                sublabel: "텔레그램 버튼 승인 (다이얼 조절)",
                icon: "user",
                tone: "warning",
              },
              {
                label: "발행",
                sublabel: "인스타그램 · 블로그",
                icon: "send",
                tone: "success",
              },
            ],
            loopBack: { from: 3, to: 0, label: "반려 시 사유와 함께 재생성" },
            caption: "반려 사유가 생성 단계로 되돌아가는 루프가 품질을 누적시킵니다.",
          },
          demo: {
            title: "발행 전 검수 승인 따라하기",
            app: {
              kind: "chat-app",
              workspace: "브랜드 운영팀",
              channels: [
                { id: "ch-review", name: "포스팅-검수", active: true },
                { id: "ch-publish", name: "발행-알림" },
                { id: "ch-report", name: "성과-리포트" },
              ],
              composerId: "composer",
              messages: [
                {
                  id: "m-draft",
                  author: "포스팅봇",
                  bot: true,
                  time: "오후 6:02",
                  text: "내일 07:30 발행 예정 초안입니다.\n주제: 여름 휴가철 짐 싸기 체크리스트\n훅: \"캐리어 앞에서 30분째 고민 중이라면… ✈️\"",
                  hidden: true,
                },
                {
                  id: "m-auto-check",
                  author: "포스팅봇",
                  bot: true,
                  time: "오후 6:02",
                  text: "자동 검사 통과: 금칙어 0건 · 해시태그 9개 · 이미지 URL 정상",
                  hidden: true,
                },
                {
                  id: "m-cross-check",
                  author: "포스팅봇",
                  bot: true,
                  time: "오후 6:03",
                  text: "AI 교차 검수(다른 모델): 사실 오류 없음 · 과장 표현 없음 · 보이스 점수 9/10",
                  hidden: true,
                },
                {
                  id: "m-approve",
                  author: "나 (운영자)",
                  time: "오후 6:07",
                  text: "검수 결과 확인했습니다. 승인합니다 ✅",
                  hidden: true,
                },
                {
                  id: "m-scheduled",
                  author: "포스팅봇",
                  bot: true,
                  time: "오후 6:07",
                  text: "✅ 큐 시트 상태=승인 갱신 — 내일 07:30 인스타그램·블로그 발행 예약 완료",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 봇이 발행 전 초안과 자동 검사 결과를 올립니다" },
              { t: "reveal", target: "m-draft" },
              { t: "reveal", target: "m-auto-check" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 다른 모델의 교차 검수 점수까지 확인합니다" },
              { t: "reveal", target: "m-cross-check" },
              { t: "move", target: "m-cross-check" },
              { t: "click" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 사람은 판단만 — 승인 코멘트를 입력합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "검수 결과 확인했습니다. 승인합니다 ✅" },
              { t: "wait", ms: 400 },
              { t: "hide", target: "composer" },
              { t: "reveal", target: "composer" },
              { t: "reveal", target: "m-approve" },
              { t: "caption", text: "④ 승인 즉시 봇이 큐 상태를 갱신하고 발행을 예약합니다" },
              { t: "reveal", target: "m-scheduled" },
              { t: "move", target: "m-scheduled" },
              { t: "caption", text: "✅ 검수 게이트 통과 — 판단은 사람, 실행은 봇의 몫입니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "measure-improve",
          title: "성과 측정과 개선 루프: 데이터가 큐를 채운다",
          minutes: 5,
          content: `발행까지 자동화했다면 절반입니다. 나머지 절반은 **무엇이 통했는지를 시스템이 스스로 배우게** 하는 것입니다.

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

> 💡 **핵심**: 성과 데이터가 **주제 큐와 프롬프트 예시로 되돌아가는** 순간, 봇은 반복기가 아니라 학습기가 됩니다.`,
          illustration: {
            type: "cycle",
            title: "주간 개선 루프",
            center: "매주 1회 자동 순환",
            nodes: [
              { label: "발행", sublabel: "매일 자동 포스팅", icon: "send" },
              { label: "수집", sublabel: "도달 · 저장 · 검색 유입", icon: "chart" },
              { label: "분석", sublabel: "AI가 상·하위 패턴 요약", icon: "brain" },
              { label: "반영", sublabel: "큐 비중 · 프롬프트 예시 갱신", icon: "refresh" },
            ],
            caption: "이 사이클이 돌 때마다 다음 주 콘텐츠의 평균 성적이 올라갑니다.",
          },
        },
        {
          slug: "policy-and-account-safety",
          title: "플랫폼 정책 준수: 계정이 살아야 봇도 산다",
          minutes: 5,
          content: `자동화 봇 최악의 결말은 버그가 아니라 **계정 정지**입니다. 몇 년 키운 계정은 복구가 안 되니, 정책 준수는 기능이 아니라 전제입니다.

## 지켜야 할 선 (2026 기준)

- **공식 API만 사용** — 비공식 자동화 앱·계정 공유·매크로 앱은 탐지 즉시 제재 대상입니다. 그래프 API를 쓰는 것 자체가 최고의 방어입니다.
- **발행 빈도 절제** — API 상한과 별개로, 피드 기준 하루 1~2회가 안전선입니다. 갑작스러운 빈도 급증은 스팸 신호로 읽힙니다.
- **반복 콘텐츠 금지** — 같은 문구·해시태그 세트의 반복은 스팸 필터에 걸립니다. 해시태그 풀을 30개 이상 두고 회전시키세요.
- **자동 상호작용 금지** — 자동 팔로우·좋아요·DM·댓글은 발행 자동화와 전혀 다른 취급을 받습니다. 이 강의 범위 밖이며, 하지 마세요.

## 광고·출처 표기

- 협찬·제휴 콘텐츠는 \`#광고\` 등 표시 의무를 프롬프트와 검수 게이트 양쪽에 규칙으로 넣습니다.
- AI 생성 이미지에 실존 인물·브랜드가 연상되는 표현이 없는지 검수 항목에 포함하세요.

## 최후의 안전장치

토큰 만료·정책 변경 공지를 월 1회 점검하는 캘린더 반복 일정을 만드세요. 봇은 방치한 만큼 위험해집니다.

> 💡 **핵심**: 오래가는 봇의 조건은 기술이 아니라 **절제**입니다 — 공식 API, 사람 같은 빈도, 반복 없는 콘텐츠.`,
          illustration: {
            type: "compare",
            title: "정지당하는 봇 vs 오래가는 봇",
            columns: [
              {
                title: "정지당하는 봇",
                icon: "x",
                tone: "warning",
                items: [
                  "비공식 앱 · 매크로로 발행",
                  "하루 수십 건 폭탄 발행",
                  "같은 해시태그 세트 복붙",
                  "자동 팔로우 · 좋아요 · DM",
                ],
              },
              {
                title: "오래가는 봇",
                icon: "shield",
                tone: "success",
                items: [
                  "공식 그래프 API + Make",
                  "하루 1~2회, 일정한 리듬",
                  "해시태그 풀 30개 이상 회전",
                  "발행만 자동화, 소통은 사람이",
                ],
              },
            ],
            caption: "계정은 봇의 유일한 자산입니다 — 절제가 곧 수명입니다.",
          },
        },
      ],
    },
  ],
};
