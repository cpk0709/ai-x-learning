import type { Course } from "../types";

/**
 * 노코드 자동화 강의 — 스타일 가이드는 loop-engineering.ts를 따릅니다.
 */
export const nocodeAutomation: Course = {
  slug: "nocode-automation",
  title: "노코드 자동화: Make.com & Zapier 마스터",
  subtitle: "노드 연결 시각화로 배우는 업무 자동화 파이프라인 구축의 모든 것",
  description:
    "복사-붙여넣기로 하루를 보내는 반복 업무, 2026년에는 코드 한 줄 없이 자동화할 수 있습니다. 이 강의에서는 트리거·액션·노드라는 자동화의 기본 문법부터 라우터 분기, 데이터 변환, 웹훅 연동, 그리고 AI 모듈을 결합한 지능형 파이프라인까지 — Make.com과 Zapier를 중심으로 실무에 바로 쓰는 자동화 설계법을 노드 다이어그램과 함께 익힙니다.",
  category: "business",
  level: "beginner",
  tags: ["Make.com", "Zapier", "노코드", "업무 자동화", "AI 워크플로우"],
  gradient: ["#f97316", "#f59e0b"],
  icon: "workflow",
  outcomes: [
    "트리거·액션·노드로 이루어진 자동화 시나리오의 구조를 설계할 수 있다",
    "Make·Zapier·n8n 중 내 업무에 맞는 도구를 근거를 갖고 선택할 수 있다",
    "라우터·필터·데이터 변환·웹훅으로 중급 파이프라인을 구축할 수 있다",
    "AI 모듈을 결합해 분류·요약·초안 작성이 들어간 지능형 자동화를 만들 수 있다",
    "실행 로그와 오퍼레이션 비용을 관리하며 자동화를 안정적으로 운영할 수 있다",
  ],
  modules: [
    {
      slug: "automation-basics",
      title: "자동화의 기본 문법",
      description: "트리거·액션·노드 — 모든 자동화가 공유하는 세 가지 부품",
      lessons: [
        {
          slug: "trigger-action-node",
          title: "자동화의 3요소: 트리거, 액션, 노드",
          minutes: 4,
          content: `세상의 모든 업무 자동화는 한 문장으로 요약됩니다. **"무언가 일어나면(트리거), 무언가를 한다(액션)."** 초인종이 울리면(트리거) 문을 열러 나가는(액션) 것과 같은 구조입니다.

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

> 💡 **핵심**: 자동화 설계 = "무슨 사건이(트리거) → 어떤 데이터가 흘러서(노드 연결) → 무슨 일이 일어나는가(액션)"를 그리는 일입니다.`,
          illustration: {
            type: "flow",
            title: "자동화 시나리오의 뼈대",
            nodes: [
              {
                label: "트리거",
                sublabel: "폼 응답 도착",
                icon: "zap",
                tone: "warning",
              },
              {
                label: "액션 노드 1",
                sublabel: "스프레드시트에 행 추가",
                icon: "database",
                tone: "primary",
                edgeLabel: "응답 데이터",
              },
              {
                label: "액션 노드 2",
                sublabel: "팀 채널에 알림 발송",
                icon: "send",
                tone: "accent",
                edgeLabel: "저장 완료",
              },
            ],
            caption: "노드 사이를 흐르는 것은 데이터 — 앞 노드의 출력이 뒷 노드의 입력입니다.",
          },
          demo: {
            title: "Gmail 트리거가 울리는 순간 따라하기",
            app: {
              kind: "email-app",
              folders: [
                { id: "fd-inbox", name: "받은편지함", count: 2, active: true },
                { id: "fd-sent", name: "보낸편지함" },
                { id: "fd-auto", name: "자동화/처리됨" },
              ],
              emails: [
                {
                  id: "e-old",
                  from: "주간 뉴스레터",
                  subject: "7월 넷째 주 업계 소식",
                  preview: "이번 주 하이라이트를 전해드립니다…",
                },
                {
                  id: "e-new",
                  from: "고객 김민준",
                  subject: "Pro 플랜 신청 문의드립니다",
                  preview: "안녕하세요, 신청 절차가 궁금해서 연락드립니다…",
                  unread: true,
                  hidden: true,
                },
              ],
              compose: {
                id: "cp",
                toId: "cp-to",
                subjectId: "cp-subj",
                bodyId: "cp-body",
                sendId: "cp-send",
              },
            },
            actions: [
              { t: "caption", text: "① 받은편지함에 새 메일 도착 — 이 사건이 트리거입니다" },
              { t: "reveal", target: "e-new" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 사람은 메일을 클릭해 확인만 합니다" },
              { t: "move", target: "e-new" },
              { t: "click" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 트리거가 울리면 자동화가 액션(자동 회신)을 시작합니다" },
              { t: "reveal", target: "cp" },
              { t: "type", target: "cp-to", text: "minjun.kim@example.com" },
              { t: "type", target: "cp-subj", text: "문의 접수 안내 (자동 회신)" },
              { t: "type", target: "cp-body", text: "접수되었습니다. 1영업일 내 답변드립니다." },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ 발송 버튼까지 자동화가 누릅니다 — 액션 완료" },
              { t: "move", target: "cp-send" },
              { t: "click" },
              { t: "hide", target: "cp" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 처리된 메일은 전용 폴더로 정리됩니다" },
              { t: "move", target: "fd-auto" },
              { t: "click" },
              { t: "hide", target: "e-new" },
              { t: "caption", text: "✅ 트리거 1번 = 액션 자동 실행 — 이것이 자동화입니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "make-vs-zapier-vs-n8n",
          title: "Make vs Zapier vs n8n: 무엇으로 시작할까",
          minutes: 6,
          content: `도구 선택으로 일주일을 고민하는 분이 많습니다. 하지만 2026년 기준, 세 도구의 성격만 알면 10분 안에 결정할 수 있습니다.

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

> 💡 **핵심**: 도구보다 **개념(트리거·노드·데이터 흐름)**이 자산입니다. 일단 하나로 시작하세요 — 이 강의에서는 Make입니다.`,
          illustration: {
            type: "compare",
            title: "2026년 자동화 도구 3파전",
            columns: [
              {
                title: "Zapier",
                icon: "zap",
                tone: "accent",
                items: [
                  "연동 앱 8,000개+ 최다",
                  "직선형 Zap, 가장 쉬움",
                  "Zapier Agents (AI)",
                  "태스크당 비용은 높은 편",
                ],
              },
              {
                title: "Make.com",
                icon: "workflow",
                tone: "primary",
                items: [
                  "시각적 캔버스 · 분기 강함",
                  "오퍼레이션 단가 저렴",
                  "AI Agents 내장",
                  "이 강의의 기준 도구",
                ],
              },
              {
                title: "n8n",
                icon: "server",
                tone: "muted",
                items: [
                  "페어코드 · 셀프호스팅",
                  "실행량 과금 없음(자체 서버)",
                  "코드·AI 노드 확장성 최고",
                  "서버 관리 부담 있음",
                ],
              },
            ],
            caption: "쉬움 → Zapier, 복잡·대량 → Make, 보안·확장 → n8n.",
          },
        },
        {
          slug: "first-scenario",
          title: "실습: 첫 시나리오 — 폼 응답을 시트와 알림으로",
          minutes: 7,
          content: `백문이 불여일런(run) — 백 번 듣기보다 한 번 실행이 낫습니다. 가장 보편적인 자동화 — **폼 응답 → 스프레드시트 저장 → 팀 알림** — 을 Make에서 직접 만들어 봅니다.

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

> 💡 **핵심**: 트리거 연결 직후 **반드시 한 번 실행해 실제 데이터를 확보**하세요. 매핑은 언제나 진짜 데이터 위에서 합니다.`,
          illustration: {
            type: "steps",
            title: "첫 시나리오 5단계",
            steps: [
              {
                label: "트리거 배치",
                sublabel: "Google Forms · Watch Responses",
                icon: "zap",
              },
              {
                label: "테스트 실행",
                sublabel: "Run once로 실데이터 확보",
                icon: "play",
              },
              {
                label: "시트 노드 연결",
                sublabel: "응답 필드를 열에 매핑",
                icon: "database",
              },
              {
                label: "슬랙 노드 연결",
                sublabel: "알림 문구에 필드 삽입",
                icon: "send",
              },
              {
                label: "스케줄 활성화",
                sublabel: "토글 ON — 자동 운행 시작",
                icon: "check",
              },
            ],
            caption: "5단계, 약 15분 — 여러분의 첫 자동화가 돌기 시작합니다.",
          },
          demo: {
            title: "Make 캔버스에서 첫 시나리오 조립 따라하기",
            app: {
              kind: "automation-canvas",
              windowTitle: "폼 응답 알림 시나리오 — Make",
              nodes: [
                {
                  id: "n-forms",
                  icon: "zap",
                  label: "Google Forms",
                  sublabel: "Watch Responses",
                  tone: "warning",
                  hidden: true,
                },
                {
                  id: "n-sheets",
                  icon: "database",
                  label: "Google Sheets",
                  sublabel: "Add a Row",
                  tone: "primary",
                  hidden: true,
                },
                {
                  id: "n-slack",
                  icon: "send",
                  label: "Slack",
                  sublabel: "Create a Message",
                  tone: "accent",
                  hidden: true,
                },
              ],
              runLog: [
                { id: "log-run", text: "▶ Run once — 테스트 실행", tone: "out", hidden: true },
                {
                  id: "log-forms",
                  text: "✓ Google Forms: 응답 1건 수신 (김민준)",
                  tone: "ok",
                  hidden: true,
                },
                {
                  id: "log-sheets",
                  text: "✓ Google Sheets: 3행에 기록 완료",
                  tone: "ok",
                  hidden: true,
                },
                {
                  id: "log-slack",
                  text: "✓ Slack: #신청-알림 채널 발송 — 시나리오 성공",
                  tone: "ok",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 트리거 슬롯을 클릭해 Google Forms를 배치합니다" },
              { t: "move", target: "n-forms" },
              { t: "click" },
              { t: "reveal", target: "n-forms" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② Run once로 실제 응답 데이터를 확보합니다" },
              { t: "reveal", target: "log-run" },
              { t: "reveal", target: "log-forms" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 시트 노드를 연결하고 이름·이메일 필드를 매핑합니다" },
              { t: "move", target: "n-sheets" },
              { t: "click" },
              { t: "reveal", target: "n-sheets" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 슬랙 노드를 붙여 알림 문구에 필드를 끼워 넣습니다" },
              { t: "move", target: "n-slack" },
              { t: "click" },
              { t: "reveal", target: "n-slack" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "⑤ 전체 실행 — 세 노드가 차례로 초록 불이 됩니다" },
              { t: "reveal", target: "log-sheets" },
              { t: "reveal", target: "log-slack" },
              { t: "move", target: "log-slack" },
              { t: "caption", text: "✅ 첫 시나리오 완성 — 토글을 켜면 자동 운행됩니다" },
              { t: "wait", ms: 900 },
            ],
          },
        },
      ],
    },
    {
      slug: "pipeline-design",
      title: "중급 파이프라인 설계",
      description: "분기, 변환, 웹훅, 에러 처리 — 직선을 파이프라인으로 키우는 기술",
      lessons: [
        {
          slug: "routers-and-filters",
          title: "라우터와 필터: 조건에 따라 길을 나누기",
          minutes: 5,
          content: `실무의 자동화는 직선이 아닙니다. "VIP 문의는 매니저에게, 일반 문의는 시트에만" — 이렇게 조건에 따라 길을 나누는 **분기**가 필요합니다. 분기를 만드는 부품이 라우터와 필터입니다.

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

> 💡 **핵심**: 필터는 "통과/차단", 라우터는 "갈림길". 그리고 **폴백 경로 없는 라우터는 데이터를 흘립니다** — 반드시 기본 경로를 두세요.`,
          illustration: {
            type: "flow",
            title: "라우터 분기 파이프라인",
            nodes: [
              {
                label: "트리거: 문의 접수",
                icon: "mail",
                tone: "warning",
              },
              {
                label: "라우터",
                sublabel: "문의 유형으로 경로 결정",
                icon: "git-branch",
                tone: "primary",
              },
              {
                label: "환불 경로 → CS팀 배정",
                icon: "users",
                tone: "accent",
                edgeLabel: "유형 = 환불",
              },
              {
                label: "폴백 경로 → 기본 시트 기록",
                icon: "database",
                tone: "muted",
                edgeLabel: "그 외 전부",
              },
            ],
            caption: "각 경로의 필터 조건은 겹치지 않게, 폴백은 반드시 하나.",
          },
        },
        {
          slug: "data-transformation",
          title: "데이터 변환: 매핑, 포매터, 집계",
          minutes: 5,
          content: `자동화가 깨지는 원인 1위는 연결이 아니라 **데이터 모양**입니다. 앞 노드가 주는 형태와 뒷 노드가 원하는 형태가 다르면 흐름이 멈춥니다. 이 둘을 맞추는 기술이 데이터 변환 — 규격이 다른 플러그 사이에 끼우는 '어댑터'입니다.

## 매핑(Mapping): 필드 이어 붙이기

- 앞 노드의 출력 필드를 뒷 노드의 입력 칸에 끌어다 놓는 것입니다.
- 고정 텍스트와 필드를 섞어 쓸 수 있습니다: \`신규 신청: {이름} ({이메일})\`

## 포매터(Formatter): 형태 바꾸기

- **날짜**: \`2026-07-28T09:00:00Z\` → \`2026년 7월 28일\` (타임존, 즉 나라별 기준 시각에 주의!)
- **텍스트**: 대소문자 바꾸기, 공백 제거, 분리(split), 치환(replace)
- **숫자**: 통화 표기, 반올림. Zapier는 Formatter 스텝을 쓰고, Make는 내장 함수(\`formatDate\`, \`replace\` 등)를 매핑 칸 안에서 바로 씁니다.

## 집계(Aggregator): 여러 개를 하나로

- 행 10개를 받아 **요약 하나**로 묶습니다. 예: 오늘 주문 목록 → 한 통의 일일 리포트 메일.
- 반대 방향은 **이터레이터(Iterator)** — 묶음 하나를 낱개로 풀어 하나씩 반복 처리합니다.

## 초보자가 자주 겪는 장면

시트에 날짜가 이상하게 적히거나 저장이 실패한다면, 대부분 앞 노드의 날짜 형식이 시트가 기대하는 형식과 다른 경우입니다. 이때 연결을 의심하지 말고, 두 노드 사이에 포매터(변환)를 끼워 넣으면 해결됩니다.

> 💡 **핵심**: 노드 연결이 뼈대라면 변환은 관절입니다. 막히면 항상 **"앞 노드의 출력 데이터가 실제로 어떤 모양인지"**부터 확인하세요.`,
          illustration: {
            type: "grid",
            title: "데이터 변환 도구 상자",
            items: [
              {
                label: "매핑",
                sublabel: "필드 ↔ 칸 연결",
                icon: "link",
                tone: "primary",
              },
              {
                label: "날짜 포매터",
                sublabel: "형식·타임존 변환",
                icon: "calendar",
                tone: "accent",
              },
              {
                label: "텍스트 포매터",
                sublabel: "분리·치환·정리",
                icon: "scissors",
                tone: "accent",
              },
              {
                label: "숫자 포매터",
                sublabel: "통화·반올림",
                icon: "dollar",
                tone: "accent",
              },
              {
                label: "집계 (Aggregator)",
                sublabel: "여러 행 → 하나로",
                icon: "layers",
                tone: "success",
              },
              {
                label: "이터레이터",
                sublabel: "배열 → 낱개 반복",
                icon: "repeat",
                tone: "warning",
              },
            ],
            caption: "막히면 변환 도구부터 — 연결 문제의 대부분은 데이터 모양 문제입니다.",
          },
        },
        {
          slug: "webhooks",
          title: "웹훅: 목록에 없는 서비스도 연결하기",
          minutes: 6,
          content: `"우리 사내 시스템은 연동 목록에 없는데요?" — 괜찮습니다. **웹훅(Webhook)**을 알면 HTTP(웹에서 데이터를 주고받는 통신 방식)를 쓰는 어떤 서비스든 연결할 수 있습니다.

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

> 💡 **핵심**: 연동 목록은 편의일 뿐, 본질은 HTTP입니다. **웹훅(받기) + HTTP 모듈(보내기)**만 있으면 사실상 모든 서비스가 연결 대상입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "terminal — 웹훅 테스트",
            lines: [
              { text: "# Make에서 발급받은 웹훅 URL로 테스트 데이터 전송", tone: "comment" },
              { text: "curl -X POST https://hook.eu1.make.com/abc123 \\", tone: "cmd" },
              { text: "  -H 'Content-Type: application/json' \\", tone: "cmd" },
              { text: "  -d '{\"name\":\"김민준\",\"plan\":\"pro\",\"amount\":29000}'", tone: "cmd" },
              { text: "Accepted", tone: "ok" },
              { text: "# Make 캔버스: 웹훅 노드에 초록 불 — 시나리오 즉시 실행", tone: "comment" },
              { text: "# name/plan/amount 필드가 다음 노드에서 매핑 가능해짐", tone: "dim" },
            ],
            caption: "curl 한 줄이면 웹훅의 동작 원리가 눈앞에서 확인됩니다.",
          },
        },
        {
          slug: "error-handling",
          title: "에러 처리와 재시도: 무너지지 않는 파이프라인",
          minutes: 5,
          content: `자동화는 만들 때가 아니라 **한 달 뒤 조용히 실패할 때** 진짜 실력이 드러납니다. 에러 처리 없는 시나리오는 언젠가 반드시 데이터를 흘립니다.

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

> 💡 **핵심**: 설계 질문은 "실패하면 어쩌지?"가 아니라 **"일시적 실패는 재시도, 영구적 실패는 누구에게 어떻게 알릴 것인가"**입니다.`,
          illustration: {
            type: "flow",
            title: "에러 처리 표준 패턴",
            nodes: [
              {
                label: "외부 API 호출",
                icon: "cloud",
                tone: "primary",
              },
              {
                label: "실패 감지",
                sublabel: "일시적? 영구적?",
                icon: "alert",
                tone: "warning",
                edgeLabel: "에러 발생 시",
              },
              {
                label: "재시도 (Break)",
                sublabel: "15분 간격 · 최대 3회",
                icon: "refresh",
                tone: "accent",
                edgeLabel: "일시적 에러",
              },
              {
                label: "사람에게 알림 + 실행 보관",
                sublabel: "슬랙 보고 · 수정 후 재실행",
                icon: "shield",
                tone: "success",
                edgeLabel: "3회 초과 또는 영구적 에러",
              },
            ],
            loopBack: { from: 2, to: 0, label: "재시도 (최대 3회)" },
            caption: "재시도로 풀리는 실패는 기계가, 안 풀리는 실패는 사람이.",
          },
        },
      ],
    },
    {
      slug: "ai-automation",
      title: "AI 결합 자동화",
      description: "판단이 필요한 자리에 AI 노드를 — 규칙 기반을 넘어서는 파이프라인",
      lessons: [
        {
          slug: "ai-modules",
          title: "시나리오에 AI 모듈 넣기: 분류·요약·생성",
          minutes: 5,
          content: `라우터의 조건식으로는 "이 문의가 화가 난 고객인지"를 판별할 수 없습니다. **규칙으로 못 가르는 것을 대신 갈라 주는 노드**, 그것이 AI 모듈입니다.

## AI 노드가 잘하는 세 가지

- **분류** — 자유롭게 쓴 글에 라벨 붙이기. "이 문의는 환불/배송/제휴 중 무엇인가?"
- **요약** — 긴 이메일·회의록을 알림에 넣을 3줄로 압축.
- **생성** — 답변 초안, 제목, SNS 문구 등 사람이 다듬을 초안 만들기.

## 연결 방법

- Make·Zapier 모두 **Claude, OpenAI 등 AI 모듈을 기본 제공**합니다. API 키를 연결하고, 프롬프트 칸에 앞 노드의 필드를 매핑해 넣으면 끝입니다.
- 2026년에는 한 단계 더 나아간 **AI 에이전트 노드**(Make AI Agents, Zapier Agents)가 도구 선택까지 스스로 합니다. 다만 시작은 단일 AI 노드로 충분합니다.

## 프롬프트 설계의 철칙: 출력 형식 고정

AI의 출력은 사람이 아니라 **다음 노드가 기계적으로 읽습니다**. 그래서 "환불, 배송, 제휴, 기타 중 한 단어로만 답하라"처럼 답의 형식을 고정해야 합니다. 라우터 필터가 그 단어를 보고 분기합니다. 형식을 고정하지 않으면 AI가 "이 문의는 환불 요청으로 보입니다"처럼 문장으로 답해, 뒷 노드의 필터가 아무것도 못 잡습니다. 연결 후에는 실제 문의 몇 건으로 **먼저 테스트 실행**을 해서 답이 정말 한 단어로 오는지 확인하세요.

> 💡 **핵심**: 자동화 속 AI는 수다쟁이가 아니라 부품입니다. **출력 형식을 한 단어/JSON으로 고정**해야 뒷 노드와 맞물립니다.`,
          illustration: {
            type: "chat",
            title: "AI 분류 노드의 프롬프트 설계",
            messages: [
              {
                role: "system",
                text: "너는 고객 문의 분류기다. 반드시 환불/배송/제휴/기타 중 한 단어로만 답하라.",
              },
              {
                role: "user",
                text: "{문의 내용 필드} ← 앞 노드에서 매핑: \"주문한 지 2주가 지났는데 아직도 안 왔어요. 취소하고 싶습니다.\"",
              },
              { role: "ai", text: "환불" },
            ],
            caption: "출력이 한 단어로 고정되어야 라우터가 기계적으로 분기할 수 있습니다.",
          },
        },
        {
          slug: "ai-inquiry-pipeline",
          title: "실전: 고객 문의 분류 → 답변 초안 → 담당자 배정",
          minutes: 7,
          content: `배운 것을 전부 조립할 시간입니다. 실제 회사에서 가장 수요가 많은 파이프라인 — **문의 접수부터 담당자 배정까지** — 를 만들어 봅니다.

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

> 💡 **핵심**: AI 자동화의 정석은 **판단(분류)과 초안은 AI, 최종 발송은 사람**. 신뢰가 데이터로 쌓인 뒤에 자동화 범위를 넓히세요.`,
          illustration: {
            type: "flow",
            title: "고객 문의 AI 파이프라인",
            nodes: [
              {
                label: "문의 수신",
                sublabel: "이메일 · 폼 · 웹훅",
                icon: "mail",
                tone: "warning",
              },
              {
                label: "AI 분류",
                sublabel: "유형 + 긴급도 → JSON",
                icon: "brain",
                tone: "primary",
                edgeLabel: "문의 원문",
              },
              {
                label: "AI 답변 초안",
                sublabel: "사람이 검토할 초안 생성",
                icon: "sparkles",
                tone: "accent",
                edgeLabel: "분류 결과",
              },
              {
                label: "라우터 → 담당팀 배정",
                sublabel: "긴급도 상 = 매니저 멘션",
                icon: "users",
                tone: "success",
                edgeLabel: "유형별 분기",
              },
              {
                label: "전 건 시트/CRM 기록",
                sublabel: "분류 정확도 검수용 데이터",
                icon: "database",
                tone: "muted",
              },
            ],
            caption: "AI는 분류와 초안까지, 고객에게 보내는 마지막 클릭은 사람이.",
          },
          demo: {
            title: "Slack에서 AI 분류 알림 받기 따라하기",
            app: {
              kind: "chat-app",
              workspace: "우리 회사 워크스페이스",
              channels: [
                { id: "ch-refund", name: "cs-환불", active: true },
                { id: "ch-ship", name: "cs-배송" },
                { id: "ch-biz", name: "제휴-문의" },
              ],
              composerId: "composer",
              messages: [
                {
                  id: "m-notice",
                  author: "자동화봇",
                  bot: true,
                  time: "오전 10:12",
                  text: "새 문의 도착 — AI 분류: 환불 / 긴급도: 상",
                  hidden: true,
                },
                {
                  id: "m-summary",
                  author: "자동화봇",
                  bot: true,
                  time: "오전 10:12",
                  text: "요약: 주문 2주째 미도착, 취소 요청. 긴급도 상 → @매니저 확인 바랍니다.",
                  hidden: true,
                },
                {
                  id: "m-draft",
                  author: "자동화봇",
                  bot: true,
                  time: "오전 10:12",
                  text: "답변 초안: \"배송 지연으로 불편을 드려 죄송합니다. 요청하신 환불 절차를 바로 안내드리겠습니다…\"",
                  hidden: true,
                },
                {
                  id: "m-human",
                  author: "나 (CS 담당)",
                  time: "오전 10:15",
                  text: "초안 확인했습니다. 다듬어서 발송할게요 ✅",
                  hidden: true,
                },
                {
                  id: "m-done",
                  author: "자동화봇",
                  bot: true,
                  time: "오전 10:15",
                  text: "✓ 전 건 시트에 기록 완료 — 분류 정확도 검수 데이터로 적재했습니다.",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① AI가 문의를 분류해 담당 채널로 알림을 보냅니다" },
              { t: "reveal", target: "m-notice" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "② 긴급도 '상' — 요약과 매니저 멘션이 붙습니다" },
              { t: "reveal", target: "m-summary" },
              { t: "move", target: "m-summary" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ AI가 만든 답변 초안까지 함께 도착합니다" },
              { t: "reveal", target: "m-draft" },
              { t: "move", target: "m-draft" },
              { t: "click" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 최종 발송은 사람 — 담당자가 초안을 검토합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "초안 확인했습니다. 다듬어서 발송할게요 ✅" },
              { t: "wait", ms: 400 },
              { t: "hide", target: "composer" },
              { t: "reveal", target: "composer" },
              { t: "reveal", target: "m-human" },
              { t: "caption", text: "⑤ 전 과정이 시트에 쌓여 AI 검수 데이터가 됩니다" },
              { t: "reveal", target: "m-done" },
              { t: "move", target: "m-done" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "operations-and-cost",
          title: "운영 관리: 실행 로그, 비용, 오퍼레이션 최적화",
          minutes: 5,
          content: `만든 자동화가 10개를 넘는 순간, 여러분의 역할은 제작자에서 **운영자**로 바뀝니다. 운영의 핵심은 로그와 비용, 두 개의 숫자를 읽는 일입니다.

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

> 💡 **핵심**: 운영 = **로그(건강)와 오퍼레이션(비용)** 두 계기판 읽기. 필터는 앞으로, 폴링은 웹훅으로, AI 입력은 가볍게.`,
          illustration: {
            type: "cycle",
            title: "자동화 운영 사이클",
            center: "매주 반복",
            nodes: [
              {
                label: "로그 점검",
                sublabel: "History · 실패 건 확인",
                icon: "eye",
              },
              {
                label: "비용 분석",
                sublabel: "오퍼레이션 · AI 토큰",
                icon: "chart",
              },
              {
                label: "최적화",
                sublabel: "필터 전진 · 웹훅화",
                icon: "wrench",
              },
              {
                label: "재배포",
                sublabel: "수정 후 다시 활성화",
                icon: "rocket",
              },
            ],
            caption: "만들고 끝이 아닙니다 — 점검·분석·최적화가 매주 도는 운영 루프입니다.",
          },
        },
      ],
    },
  ],
};
