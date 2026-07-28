import type { Course } from "../types";

/**
 * n8n 마스터 — 셀프호스팅 AI 에이전트 자동화 (중급)
 *
 * nocode-automation(입문, Make/Zapier 중심)과의 차별점:
 * - 도구를 '빌리는' 자동화가 아니라 '소유하는' 자동화 — 셀프호스팅·데이터 주권·실행 단위 과금
 * - n8n 고유 기능 심화: AI Agent 노드(LangChain 기반), RAG 벡터 스토어, 큐 모드, 에러 워크플로우
 * - 사례도 겹치지 않게: 리드 스코어링, 사내 지식봇, 승인 관문 (고객 문의 분류는 다루지 않음)
 */
export const n8nAutomation: Course = {
  slug: "n8n-automation",
  title: "n8n 마스터: 셀프호스팅 AI 에이전트 자동화",
  subtitle: "오픈소스 n8n으로 비용 걱정 없이 AI 에이전트 워크플로우를 소유하는 법",
  description:
    "Zapier의 태스크 요금 청구서가 무서워지기 시작했다면, n8n으로 넘어올 때입니다. n8n은 소스가 공개된 fair-code 자동화 플랫폼으로, 내 서버에 직접 설치하면 실행량 과금 없이 무제한으로 돌릴 수 있습니다. 이 강의는 Docker 셀프호스팅부터 LangChain 기반 AI Agent 노드, 자체 데이터 RAG 챗봇, 사람 승인 관문, 그리고 에러 워크플로우·큐 모드 같은 프로덕션 운영 기술까지 — 2026년 기준 n8n의 실전 기능을 처음부터 끝까지 다룹니다.",
  category: "business",
  level: "intermediate",
  tags: ["n8n", "셀프호스팅", "AI Agent", "RAG", "워크플로우 자동화"],
  gradient: ["#ea580c", "#db2777"],
  icon: "zap",
  outcomes: [
    "Docker Compose로 n8n을 셀프호스팅하고 안전하게 운영할 수 있다",
    "실행 단위 과금 구조를 이해하고 Make/Zapier 대비 비용을 설계할 수 있다",
    "AI Agent 노드에 모델·메모리·도구를 조립해 스스로 판단하는 에이전트를 만들 수 있다",
    "벡터 스토어를 연동해 자체 문서 기반 RAG 지식봇을 구축할 수 있다",
    "에러 워크플로우·환경 분리·큐 모드로 프로덕션급 자동화를 운영할 수 있다",
  ],
  modules: [
    {
      slug: "n8n-foundation",
      title: "n8n 시작하기",
      description: "왜 소유하는 자동화인가 — 설치부터 첫 워크플로우까지",
      lessons: [
        {
          slug: "why-n8n",
          title: "왜 n8n인가: 빌리는 자동화 vs 소유하는 자동화",
          minutes: 5,
          content: `자동화가 커질수록 Zapier·Make 청구서도 커집니다. 이유는 하나 — **스텝마다 돈을 내는 구조**이기 때문입니다.

## 과금 구조가 모든 것을 가른다

- **Zapier**는 태스크(액션 1회), **Make**는 오퍼레이션(모듈 1회) 단위로 과금합니다. 10단계 워크플로우가 1만 번 돌면 **최대 10만 단위**가 청구됩니다.
- **n8n**은 워크플로우 **실행(execution) 1회 = 1단위**입니다. 같은 작업이 1만 실행으로 끝나고, 워크플로우 안의 스텝 수는 요금과 무관합니다.
- 셀프호스팅하면 실행 자체가 **무제한 무료** — 서버비만 남습니다. 클라우드가 편하면 n8n Cloud(스타터 월 24유로~)도 있습니다.

## 돈 말고도 남는 것: 데이터 주권

- 고객 데이터가 외부 SaaS를 경유하지 않고 **내 서버 안에서만** 흐릅니다. 보안 심사가 있는 조직엔 결정적입니다.
- n8n은 **Sustainable Use License(fair-code)** — 소스가 공개되고 사내 업무용은 무료지만, n8n 자체를 재판매하는 것은 제한됩니다. OSI 기준의 '오픈소스'는 아니라는 점만 정확히 알아두세요.
- Code 노드로 JavaScript/Python을 직접 쓸 수 있어, 노코드의 한계에 막히지 않습니다.

> 💡 **핵심**: n8n의 본질은 "무료 Zapier"가 아니라 **실행 단위 과금 + 셀프호스팅으로 자동화를 자산으로 소유하는 것**입니다.`,
          illustration: {
            type: "compare",
            title: "과금·소유 구조: SaaS vs n8n",
            columns: [
              {
                title: "Zapier · Make",
                icon: "cloud",
                tone: "muted",
                items: [
                  "태스크/오퍼레이션(스텝) 단위 과금",
                  "스텝이 늘수록 요금 급증",
                  "데이터가 외부 서버를 경유",
                  "플랫폼 정책 변경에 종속",
                ],
              },
              {
                title: "n8n",
                icon: "zap",
                tone: "primary",
                items: [
                  "워크플로우 실행 단위 과금",
                  "셀프호스팅 시 실행 무제한",
                  "데이터가 내 서버에만 머묾",
                  "소스 공개 — 직접 확장 가능",
                ],
              },
            ],
            caption:
              "10단계 × 1만 회 = Zapier·Make는 최대 10만 과금 단위, n8n은 1만 실행입니다.",
          },
        },
        {
          slug: "self-hosting-docker",
          title: "설치와 셀프호스팅: Docker 컨테이너 한 방",
          minutes: 6,
          content: `n8n 셀프호스팅의 표준은 **Docker**입니다. Compose 파일 하나면 데이터베이스까지 포함해 한 시간 안에 운영 가능한 인스턴스가 뜹니다.

## 준비물과 사양

- **2 vCPU / 4GB RAM** VPS면 소규모 팀 운영에 충분합니다.
- 기본 저장소는 SQLite지만, 운영 환경은 **PostgreSQL**을 함께 띄우는 것이 표준입니다.

\`\`\`bash
mkdir n8n && cd n8n
# docker-compose.yml 작성 후
docker compose up -d
\`\`\`

## 반드시 챙길 설정 3가지

- **\`N8N_ENCRYPTION_KEY\`** — 크레덴셜을 암호화하는 키. 이 키를 잃으면 저장된 모든 인증 정보를 복구할 수 없습니다. 반드시 백업하세요.
- **볼륨 마운트** — \`/home/node/.n8n\`을 볼륨으로 잡아야 컨테이너를 갈아치워도 데이터가 남습니다.
- **HTTPS** — 웹훅을 외부에서 받으려면 Caddy/Traefik 같은 리버스 프록시로 도메인 + TLS를 붙입니다.

## 다른 선택지

- **n8n Cloud**: 설치·업데이트를 맡기고 바로 시작 (실행량 기반 요금)
- **PaaS 배포**: Railway, Render, Hetzner 등에 원클릭 템플릿 다수
- 업데이트는 이미지 태그를 올리고 \`docker compose up -d\` 재실행이 전부입니다.

> 💡 **핵심**: Docker + Postgres + 암호화 키 백업. 이 세 가지가 갖춰진 순간부터 여러분의 자동화는 '내 인프라'가 됩니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "server — docker compose",
            lines: [
              { text: "docker compose up -d", tone: "cmd" },
              { text: "✔ Container n8n-postgres  Started", tone: "ok" },
              { text: "✔ Container n8n  Started", tone: "ok" },
              { text: "docker compose logs n8n | tail -2", tone: "cmd" },
              { text: "Editor is now accessible via:", tone: "out" },
              { text: "http://localhost:5678", tone: "out" },
              { text: "# 볼륨 + 암호화 키 설정 확인 완료", tone: "comment" },
              { text: "✓ 관리자 계정 생성 후 바로 사용 가능", tone: "ok" },
            ],
            caption: "Compose 파일 하나로 n8n과 Postgres가 함께 뜹니다.",
          },
          demo: {
            title: "Docker로 n8n 설치 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "docker-compose.yml — 내 서버",
              files: [
                { id: "f-compose", name: "docker-compose.yml", active: true },
                { id: "f-env", name: ".env" },
              ],
              code: [
                { id: "d1", text: "services:" },
                { id: "d2", text: "n8n:", indent: 1 },
                { id: "d3", text: "image: docker.n8n.io/n8nio/n8n", indent: 2 },
                { id: "d4", text: 'ports: ["5678:5678"]', indent: 2 },
                { id: "d5", text: "environment:", indent: 2 },
                {
                  id: "d6",
                  text: "- N8N_ENCRYPTION_KEY=${KEY}",
                  indent: 3,
                  tone: "add",
                  hidden: true,
                },
                { id: "d7", text: "volumes:", indent: 2 },
                { id: "d8", text: "- n8n_data:/home/node/.n8n", indent: 3 },
              ],
              terminal: [
                { id: "t1", text: "docker compose up -d", tone: "cmd", hidden: true },
                { id: "t2", text: "✔ Container n8n  Started", tone: "ok", hidden: true },
                { id: "t3", text: "docker compose logs n8n", tone: "cmd", hidden: true },
                {
                  id: "t4",
                  text: "Editor is now accessible via: http://localhost:5678",
                  tone: "out",
                  hidden: true,
                },
                {
                  id: "t5",
                  text: "✓ 브라우저에서 관리자 계정 생성 완료",
                  tone: "ok",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① Compose 파일에서 이미지와 포트를 확인합니다" },
              { t: "move", target: "d3" },
              { t: "click" },
              { t: "move", target: "d4" },
              { t: "caption", text: "② 크레덴셜 암호화 키를 환경변수로 추가합니다" },
              { t: "move", target: "d5" },
              { t: "click" },
              { t: "type", target: "d6", text: "- N8N_ENCRYPTION_KEY=${KEY}" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ 컨테이너를 백그라운드로 시작합니다" },
              { t: "type", target: "t1", text: "docker compose up -d" },
              { t: "reveal", target: "t2" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 로그에서 에디터 접속 주소를 확인합니다" },
              { t: "type", target: "t3", text: "docker compose logs n8n" },
              { t: "reveal", target: "t4" },
              { t: "move", target: "t4" },
              { t: "reveal", target: "t5" },
              { t: "caption", text: "✅ 내 서버에서 n8n이 실행 중입니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "first-workflow",
          title: "기본기와 첫 워크플로우: 웹훅 → 가공 → 알림",
          minutes: 7,
          content: `n8n의 화면은 Make와 닮았지만, 데이터를 다루는 방식은 훨씬 개발자 친화적입니다. 기본기 세 가지를 익히고 바로 첫 워크플로우를 만듭니다.

## 3가지 기본기

- **노드** — 트리거 노드(Webhook, Schedule), 앱 노드(Slack, Sheets), 코어 노드(IF, Edit Fields, Code)로 나뉩니다. Code 노드에선 JS가 그대로 돌아갑니다.
- **크레덴셜** — API 키·토큰은 워크플로우와 **분리 저장**되고 암호화됩니다. 워크플로우를 공유해도 비밀은 새지 않습니다.
- **데이터 흐름** — 노드 사이를 흐르는 것은 **JSON 아이템 배열**입니다. 각 노드의 출력 패널에서 실제 JSON을 눈으로 확인하며 만듭니다.

## 첫 워크플로우: 리드 수집 알림

랜딩 페이지 폼에서 리드가 들어오면 영업 채널에 알리는 흐름입니다.

1. **Webhook 트리거** — 폼이 POST하는 URL 생성 (테스트 URL과 운영 URL이 따로 있습니다)
2. **Edit Fields** — 이름·이메일·회사만 남기고 정리
3. **IF** — 회사 도메인 이메일만 통과 (gmail 등 무료 메일은 제외)
4. **Slack** — #영업 채널에 리드 카드 전송

테스트 실행으로 실제 데이터를 흘려보고, **핀(Pin) 기능**으로 샘플 데이터를 고정하면 매번 폼을 다시 제출하지 않고 뒷단을 다듬을 수 있습니다. 완성되면 우측 상단 토글로 **활성화**합니다.

> 💡 **핵심**: n8n 실력 = JSON 흐름을 읽는 능력입니다. 노드마다 출력 데이터를 확인하는 습관이 디버깅 시간을 90% 줄입니다.`,
          illustration: {
            type: "flow",
            title: "첫 워크플로우: 리드 수집 알림",
            nodes: [
              {
                label: "Webhook 트리거",
                sublabel: "폼에서 새 리드 POST 수신",
                icon: "globe",
                tone: "accent",
              },
              {
                label: "Edit Fields",
                sublabel: "이름·이메일·회사 정리",
                icon: "wrench",
              },
              {
                label: "IF 필터",
                sublabel: "회사 이메일만 통과",
                icon: "filter",
                tone: "warning",
                edgeLabel: "무료 메일은 여기서 종료",
              },
              {
                label: "Slack 알림",
                sublabel: "#영업 채널에 리드 카드",
                icon: "message",
                tone: "success",
              },
            ],
            caption: "노드 사이를 흐르는 것은 항상 JSON 아이템 — 각 단계의 출력을 눈으로 확인하세요.",
          },
        },
      ],
    },
    {
      slug: "ai-agent-workflows",
      title: "AI 에이전트 워크플로우",
      description: "LangChain 기반 AI 노드로 판단하고 검색하고 승인받는 자동화",
      lessons: [
        {
          slug: "ai-node-system",
          title: "n8n의 AI 노드 체계: 루트 노드와 서브 노드",
          minutes: 5,
          content: `n8n이 Make·Zapier와 결정적으로 갈라지는 지점이 AI입니다. 단순 "AI 모듈 하나"가 아니라, **LangChain을 내장한 70여 개의 AI 노드**가 체계를 이룹니다.

## 클러스터 구조: 루트 + 서브

AI 노드는 일반 노드와 연결 방식이 다릅니다.

- **루트 노드** — 워크플로우 본선에 놓이는 노드. **AI Agent**(판단·도구 사용)와 **Basic LLM Chain**(단발 호출)이 대표입니다.
- **서브 노드** — 루트 노드 아래에 꽂는 부품. 어떤 부품을 꽂느냐로 능력이 결정됩니다:
  - **Chat Model**: OpenAI, Anthropic, Google, 그리고 **Ollama로 로컬 모델**까지
  - **Memory**: Window Buffer(최근 N개), Postgres/Redis(세션 영속)
  - **Tool**: HTTP Request, 다른 워크플로우 호출, 벡터 스토어 검색
  - **Output Parser**: 응답을 JSON 스키마로 강제

## 대화의 입구: Chat Trigger

**Chat Trigger** 노드를 붙이면 워크플로우가 즉시 챗 인터페이스를 갖습니다. 임베드 위젯으로 사내 포털에 붙일 수도 있습니다.

셀프호스팅 + Ollama 조합이면 **모델 호출까지 내 서버 안에서** 끝나는 완전 폐쇄망 AI 자동화도 가능합니다.

> 💡 **핵심**: n8n의 AI는 "노드 하나"가 아니라 **조립식 클러스터**입니다. 루트 노드에 무엇을 꽂는지가 곧 설계입니다.`,
          illustration: {
            type: "stack",
            title: "AI Agent 노드의 클러스터 구조",
            layers: [
              {
                label: "AI Agent (루트 노드)",
                sublabel: "판단 · 도구 선택 · 반복 실행",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "Chat Model",
                sublabel: "OpenAI · Anthropic · Ollama(로컬)",
                icon: "brain",
                tone: "accent",
              },
              {
                label: "Memory",
                sublabel: "Window Buffer · Postgres · Redis",
                icon: "layers",
                tone: "accent",
              },
              {
                label: "Tools + Output Parser",
                sublabel: "HTTP Request · 벡터 검색 · JSON 강제",
                icon: "wrench",
                tone: "muted",
              },
            ],
            caption: "루트 노드에 서브 노드를 꽂아 조립합니다 — LangChain 기반 70여 개 AI 노드.",
          },
        },
        {
          slug: "build-tool-agent",
          title: "AI Agent 노드: 도구를 쓰는 에이전트 만들기",
          minutes: 7,
          content: `분기(IF)를 사람이 다 설계하는 자동화에는 한계가 있습니다. **AI Agent 노드**는 상황을 보고 스스로 도구를 골라 쓰는 에이전트를 캔버스 위에서 조립하게 해줍니다.

## 실전 사례: 리드 스코어링 에이전트

폼으로 들어온 리드를 에이전트가 조사하고 등급을 매겨 CRM에 기록합니다.

1. **Webhook** — 새 리드 수신
2. **AI Agent** — 시스템 메시지에 평가 기준 명시: "직원 수, 업종, 기존 거래 여부로 0~100점"
3. 도구 연결: **HTTP Request Tool**(회사 정보 조회), **CRM 조회 Tool**(기존 고객 여부)
4. **Structured Output Parser** — \`{ score, grade, reason }\` JSON 강제
5. **CRM 업데이트** — 점수·등급 기록

에이전트는 리드마다 필요한 도구만 골라 씁니다. 기존 고객이면 조회 한 번으로 끝내고, 처음 보는 회사면 외부 조사를 추가하는 식입니다.

## 품질을 가르는 3가지

- **도구 설명(description)이 프롬프트입니다** — "회사 도메인으로 직원 수·업종을 조회한다"처럼 언제 쓰는 도구인지 명확히.
- **Max Iterations** 로 반복 상한을 걸어 폭주를 방지합니다.
- 출력은 반드시 **Output Parser로 JSON 강제** — 뒷단 노드가 안정적으로 파싱합니다.

> 💡 **핵심**: IF 노드는 여러분이 정한 길을 가고, AI Agent는 **도구 목록 안에서 스스로 길을 찾습니다**. 좋은 도구 설명이 좋은 에이전트를 만듭니다.`,
          illustration: {
            type: "cycle",
            title: "AI Agent의 실행 사이클",
            center: "목표: 리드 등급 판정",
            nodes: [
              { label: "판단", sublabel: "어떤 도구가 필요한가", icon: "brain" },
              { label: "도구 호출", sublabel: "회사 조회 · CRM 검색", icon: "wrench" },
              { label: "관찰", sublabel: "도구 응답 읽기", icon: "eye" },
              { label: "확정", sublabel: "점수·등급 JSON 출력", icon: "check" },
            ],
            caption: "AI Agent 노드가 이 사이클을 자동으로 돕니다 — Max Iterations로 상한은 필수.",
          },
          demo: {
            title: "AI Agent 노드 워크플로우 조립 따라하기",
            app: {
              kind: "automation-canvas",
              windowTitle: "리드 스코어링 에이전트 — n8n",
              nodes: [
                {
                  id: "n-webhook",
                  icon: "globe",
                  label: "Webhook",
                  sublabel: "새 리드 수신",
                  tone: "accent",
                },
                {
                  id: "n-agent",
                  icon: "bot",
                  label: "AI Agent",
                  sublabel: "평가 기준: 시스템 메시지",
                  tone: "primary",
                  hidden: true,
                },
                {
                  id: "n-model",
                  icon: "brain",
                  label: "Chat Model",
                  sublabel: "서브 노드 연결",
                  hidden: true,
                },
                {
                  id: "n-tool1",
                  icon: "search",
                  label: "HTTP Request Tool",
                  sublabel: "회사 정보 조회",
                  hidden: true,
                },
                {
                  id: "n-tool2",
                  icon: "database",
                  label: "CRM 조회 Tool",
                  sublabel: "기존 고객 여부",
                  hidden: true,
                },
                {
                  id: "n-crm",
                  icon: "trending-up",
                  label: "CRM 업데이트",
                  sublabel: "점수·등급 기록",
                  tone: "success",
                  hidden: true,
                },
              ],
              runLog: [
                {
                  id: "lg1",
                  text: "▶ 테스트 리드: kim@acme.io (Acme Corp)",
                  tone: "out",
                  hidden: true,
                },
                {
                  id: "lg2",
                  text: "AI Agent: 도구 2회 호출 → 스코어 87점 (A등급)",
                  tone: "out",
                  hidden: true,
                },
                {
                  id: "lg3",
                  text: "✓ CRM에 A등급 리드로 기록 완료",
                  tone: "ok",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 웹훅 트리거 뒤에 AI Agent 노드를 추가합니다" },
              { t: "move", target: "n-webhook" },
              { t: "click" },
              { t: "reveal", target: "n-agent" },
              { t: "caption", text: "② 서브 노드로 Chat Model을 연결합니다" },
              { t: "move", target: "n-agent" },
              { t: "click" },
              { t: "reveal", target: "n-model" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ 에이전트가 쓸 도구 2개를 꽂습니다" },
              { t: "reveal", target: "n-tool1" },
              { t: "reveal", target: "n-tool2" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "④ 평가 결과를 기록할 CRM 노드를 붙입니다" },
              { t: "reveal", target: "n-crm" },
              { t: "move", target: "n-crm" },
              { t: "caption", text: "⑤ 테스트 리드를 흘려보내 실행을 확인합니다" },
              { t: "reveal", target: "lg1" },
              { t: "reveal", target: "lg2" },
              { t: "reveal", target: "lg3" },
              { t: "move", target: "lg3" },
              { t: "caption", text: "✅ 에이전트가 스스로 도구를 골라 리드를 평가했습니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "rag-knowledge-bot",
          title: "자체 데이터 RAG: 사내 지식봇 만들기",
          minutes: 7,
          content: `"우리 회사 규정은 모델이 모른다"는 문제의 정답이 **RAG**입니다. n8n은 벡터 스토어 노드를 내장하고 있어, 코드 없이 캔버스에서 RAG 파이프라인을 완성할 수 있습니다.

## 파이프라인은 두 개입니다

**① 적재(Ingestion)** — 문서를 검색 가능한 형태로 저장:

- 문서 로더(Google Drive·Notion·PDF) → **Text Splitter**로 청크 분할 → **Embeddings** 노드로 벡터화 → **Vector Store**에 insert

**② 질의(Query)** — 질문이 오면 근거를 찾아 답변:

- **Chat Trigger** → **AI Agent** + **Vector Store Tool** → 유사 청크 검색 → 근거를 붙여 답변 생성

## 벡터 스토어 선택 가이드

- **Simple Vector Store**(인메모리): 설정 0초, 청킹 전략 실험용 — 재시작하면 사라집니다
- **Qdrant / PGVector**: 셀프호스팅 철학 그대로 — 내 서버에서 함께 운영
- **Pinecone / Supabase**: 관리형이 편할 때

## 실패를 막는 2가지 규칙

- 적재와 질의에 **같은 임베딩 모델**을 써야 합니다. 다르면 검색이 조용히 망가집니다.
- 시스템 메시지에 "**문서에 근거가 없으면 모른다고 답하라**"를 명시하고, 답변에 출처(문서명·섹션)를 붙이세요. 이것이 사내 지식봇의 신뢰를 만듭니다.

> 💡 **핵심**: RAG의 품질은 모델이 아니라 **청킹과 임베딩 일관성**에서 결정됩니다. 인메모리로 실험하고, Qdrant로 운영하세요.`,
          illustration: {
            type: "flow",
            title: "사내 지식봇 RAG 파이프라인",
            nodes: [
              {
                label: "문서 로더",
                sublabel: "Drive · Notion · PDF",
                icon: "file-text",
              },
              {
                label: "Text Splitter",
                sublabel: "청크로 분할",
                icon: "scissors",
              },
              {
                label: "Embeddings → Vector Store",
                sublabel: "Qdrant/PGVector에 저장",
                icon: "database",
                tone: "accent",
              },
              {
                label: "Vector Store Tool 검색",
                sublabel: "질문과 유사한 청크 회수",
                icon: "search",
                tone: "primary",
                edgeLabel: "사용자 질문 도착 시",
              },
              {
                label: "AI Agent 답변",
                sublabel: "근거 + 출처 표기",
                icon: "bot",
                tone: "success",
              },
            ],
            caption: "적재와 질의에 반드시 같은 임베딩 모델을 사용해야 검색이 맞습니다.",
          },
          demo: {
            title: "사내 지식봇 응답 확인 따라하기",
            app: {
              kind: "chat-app",
              workspace: "우리 회사",
              channels: [
                { id: "ch-kb", name: "사내-지식봇", active: true },
                { id: "ch-general", name: "일반" },
              ],
              composerId: "composer",
              messages: [
                {
                  id: "q1",
                  author: "나",
                  time: "오전 10:02",
                  text: "연차는 이월되나요? 최대 며칠까지?",
                  hidden: true,
                },
                {
                  id: "a1",
                  author: "지식봇",
                  bot: true,
                  time: "오전 10:02",
                  text: "연차는 다음 해로 최대 5일까지 이월할 수 있습니다.\n출처: 인사규정 v3 · 7.2절 '연차 이월'",
                  hidden: true,
                },
                {
                  id: "q2",
                  author: "나",
                  time: "오전 10:04",
                  text: "우리 회사 주차 지원 정책은?",
                  hidden: true,
                },
                {
                  id: "a2",
                  author: "지식봇",
                  bot: true,
                  time: "오전 10:04",
                  text: "적재된 문서에서 근거를 찾지 못했습니다.\n추측 대신 인사팀(#hr) 문의를 권장합니다.",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 사내 규정 문서는 이미 벡터 스토어에 적재돼 있습니다" },
              { t: "wait", ms: 500 },
              { t: "caption", text: "② 지식봇 채널에 질문을 입력합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "연차는 이월되나요? 최대 며칠까지?" },
              { t: "wait", ms: 400 },
              { t: "hide", target: "composer" },
              { t: "reveal", target: "composer" },
              { t: "reveal", target: "q1" },
              { t: "caption", text: "③ 봇이 벡터 검색으로 근거를 찾아 답합니다" },
              { t: "reveal", target: "a1" },
              { t: "move", target: "a1" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "④ 문서에 없는 질문으로 환각 방지를 시험합니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "우리 회사 주차 지원 정책은?" },
              { t: "hide", target: "composer" },
              { t: "reveal", target: "composer" },
              { t: "reveal", target: "q2" },
              { t: "reveal", target: "a2" },
              { t: "move", target: "a2" },
              { t: "caption", text: "✅ 근거가 없으면 모른다고 답합니다 — 신뢰의 조건" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "human-approval",
          title: "사람 승인 스텝: 멈추고, 묻고, 이어간다",
          minutes: 5,
          content: `AI가 쓴 메일이 고객에게 바로 나간다면? 아찔합니다. n8n은 **워크플로우를 일시 정지하고 사람의 응답을 기다리는** 휴먼 인 더 루프를 기본 기능으로 제공합니다.

## Send and Wait for Response

Slack·Gmail·Teams 등 주요 메신저 노드에는 **"Send and Wait for Response"** 오퍼레이션이 있습니다.

- 메시지와 함께 **승인/거절 버튼**(또는 커스텀 폼)을 보냅니다
- 워크플로우는 그 지점에서 **멈춘 채 대기** — 서버 자원은 거의 쓰지 않습니다
- 응답이 오면 결과(approved/declined)를 들고 다음 노드로 진행합니다

## 실전 사례: AI 답장 승인 관문

리드에게 보낼 답장을 AI가 초안 작성 → Slack으로 담당자에게 초안 + 승인 버튼 전송 → 승인 시 발송, 거절 시 수정 큐로.

## 설계 포인트

- **타임아웃 필수** — 응답 제한 시간을 설정해 실행이 무한 대기하지 않게 합니다. 타임아웃 시의 기본 동작(중단/에스컬레이션)도 정하세요.
- **판단 재료를 함께** — 초안 전문, AI의 확신도, 원본 링크를 메시지에 포함해 담당자가 이동 없이 판단하게 합니다.
- AI Agent의 **도구 호출 자체에 승인**을 거는 패턴(Human-in-the-loop for tools)도 지원됩니다 — "발송 도구를 쓰기 전 허락받기".

> 💡 **핵심**: 자동화의 신뢰는 "전부 자동"이 아니라 **되돌리기 어려운 지점 직전의 승인 관문**에서 나옵니다.`,
          illustration: {
            type: "chat",
            title: "Slack 승인 관문 (Send and Wait)",
            messages: [
              {
                role: "ai",
                text: "리드 답장 초안: '요청하신 견적서를 첨부합니다…' 발송을 승인하시겠어요? [승인] [거절]",
              },
              {
                role: "system",
                text: "워크플로우 일시 정지 — 응답 대기 중 (타임아웃 2시간)",
              },
              { role: "user", text: "승인" },
              { role: "ai", text: "✅ 발송 완료. 다음 노드로 실행을 이어갑니다." },
            ],
            caption: "응답이 올 때까지 실행이 멈춥니다 — 자원은 거의 쓰지 않습니다.",
          },
        },
      ],
    },
    {
      slug: "production-ops",
      title: "프로덕션 운영",
      description: "무너지지 않고, 롤백되고, 대량 실행을 버티는 운영 체계",
      lessons: [
        {
          slug: "error-workflows",
          title: "에러 워크플로우와 재시도 설계",
          minutes: 6,
          content: `자동화는 만들 때가 아니라 **조용히 실패할 때** 사고가 납니다. n8n의 에러 처리는 이중 방어선으로 설계합니다.

## 1차 방어선: 노드 재시도

- 노드 설정의 **Retry on Fail** — 최대 횟수(2~3회)와 재시도 간격을 지정합니다. API 타임아웃 같은 일시 오류의 대부분이 여기서 해소됩니다.
- **On Error 설정** — 실패 시 워크플로우를 멈출지, 에러 출력 브랜치로 계속 갈지 노드별로 선택합니다. "이 스텝은 실패해도 전체는 계속"이 가능해집니다.

## 2차 방어선: 전역 에러 워크플로우

**Error Trigger** 노드로 시작하는 워크플로우를 하나 만들고, 각 워크플로우의 Settings에서 error workflow로 지정합니다.

- 실패 시 자동 실행되며 **워크플로우 이름·에러 메시지·실행 URL**이 페이로드로 들어옵니다
- 표준 구성: Slack #장애 채널 알림 + 실행 링크 → 담당자가 클릭 한 번으로 실패 지점 확인
- 단, Error Trigger는 수동 테스트 실행으로는 발화하지 않습니다 — 운영 실행 실패에만 반응합니다

## 재실행 안전성 (멱등성)

실패한 실행은 화면에서 **부분 재실행**할 수 있습니다. 이때 "CRM에 두 번 기록"이 나지 않도록, 쓰기 작업은 **업서트(있으면 갱신)** 패턴으로 설계하세요.

> 💡 **핵심**: 노드엔 Retry, 전체엔 Error Trigger. 그리고 모든 쓰기 작업은 **두 번 실행돼도 안전하게**.`,
          illustration: {
            type: "flow",
            title: "에러 처리 이중 방어선",
            nodes: [
              { label: "노드 실행", icon: "zap", tone: "primary" },
              {
                label: "Retry on Fail",
                sublabel: "최대 3회 · 간격 5초",
                icon: "repeat",
                tone: "accent",
                edgeLabel: "일시 오류 발생 시",
              },
              {
                label: "Error Trigger 워크플로우",
                sublabel: "전역 에러 캐치",
                icon: "alert",
                tone: "warning",
                edgeLabel: "재시도 소진 시",
              },
              {
                label: "Slack 보고 + 실행 링크",
                sublabel: "클릭 한 번으로 실패 지점 확인",
                icon: "message",
                tone: "success",
              },
            ],
            loopBack: { from: 1, to: 0, label: "재시도 (최대 3회)" },
            caption: "1차는 노드 재시도, 2차는 전역 에러 워크플로우 — 두 겹이 표준입니다.",
          },
        },
        {
          slug: "environments-backup",
          title: "환경 분리·버전 관리·백업",
          minutes: 5,
          content: `운영 중인 워크플로우를 캔버스에서 직접 고치는 것은 프로덕션 코드를 라이브로 수정하는 것과 같습니다. 성장한 팀은 **환경을 나눕니다**.

## 환경 분리: dev와 prod

- 인스턴스를 두 개 운영합니다 — 개발용(dev)에서 만들고 검증한 뒤 운영(prod)으로 승격합니다.
- n8n의 **Source Control 기능**(유료 플랜)은 인스턴스를 Git 브랜치에 연결합니다: dev에서 **push** → 리뷰 → prod에서 **pull**.
- 주의: pull은 **덮어쓰기**입니다(병합 아님). prod에서 직접 수정하는 습관을 끊는 것이 전제입니다.
- 크레덴셜은 Git에 **스텁(이름만)** 으로 올라갑니다 — 비밀값은 환경마다 따로 등록합니다.

## 백업: 커뮤니티 에디션의 정석

Source Control 없이도 백업은 가능합니다.

\`\`\`bash
n8n export:workflow --all --output=backup/
n8n export:credentials --all --decrypted
\`\`\`

- 더 우아한 방법: **n8n이 n8n을 백업** — Schedule 트리거로 매일 밤 자체 API에서 전체 워크플로우 JSON을 받아 Git에 커밋하는 워크플로우를 만듭니다.
- **\`N8N_ENCRYPTION_KEY\` 백업은 별도로** — 이 키가 없으면 DB를 복구해도 크레덴셜은 전부 무용지물입니다.

> 💡 **핵심**: "dev에서 만들고 Git으로 승격, prod는 손대지 않는다" — 워크플로우도 코드처럼 다루는 순간 운영 사고가 사라집니다.`,
          illustration: {
            type: "steps",
            title: "운영 표준: 환경·버전·백업",
            steps: [
              {
                label: "dev / prod 인스턴스 분리",
                sublabel: "개발과 운영을 물리적으로 격리",
                icon: "server",
              },
              {
                label: "Git Source Control 연동",
                sublabel: "dev push → 리뷰 → prod pull",
                icon: "git-branch",
              },
              {
                label: "야간 자동 백업",
                sublabel: "CLI export 또는 API 백업 워크플로우",
                icon: "download",
              },
              {
                label: "암호화 키 별도 보관",
                sublabel: "키 분실 = 크레덴셜 전손",
                icon: "key",
              },
            ],
            caption: "pull은 병합이 아니라 덮어쓰기 — prod 직접 수정 습관부터 끊으세요.",
          },
        },
        {
          slug: "queue-mode",
          title: "성능과 큐 모드: 대량 실행 버티기",
          minutes: 6,
          content: `단일 컨테이너 n8n은 UI·스케줄·실행을 한 프로세스가 다 합니다. 실행량이 몰리면 에디터까지 함께 느려지죠. 해답은 **큐 모드**입니다.

## 큐 모드 아키텍처

\`EXECUTIONS_MODE=queue\` 설정으로 역할을 분리합니다.

- **메인 인스턴스** — UI, 스케줄, 웹훅 접수만 담당. 실행 작업을 **Redis 큐**에 넣습니다.
- **워커** — \`n8n worker\` 명령으로 띄우는 실행 전담 프로세스. 큐에서 작업을 꺼내 처리하고 결과를 DB에 기록합니다.
- **필수 조건**: Redis + **PostgreSQL** (큐 모드에서 SQLite는 지원되지 않습니다)

## 확장은 수평으로

- 처리량이 부족하면 **워커 컨테이너를 늘립니다** — \`docker compose up -d --scale worker=4\`
- 워커당 **동시 실행 수(concurrency)** 도 조절 가능합니다
- 웹훅이 초당 수백 건이라면 **웹훅 프로세서**를 별도로 두어 접수 계층까지 확장합니다

## 큐 모드 전에 챙길 성능 기본기

- **실행 로그 정리** — 실행 기록을 무한 보관하면 DB가 비대해집니다. 보관 기간 프루닝을 켜세요.
- 대량 아이템은 **Split In Batches(Loop)** 로 나눠 처리해 메모리 폭발을 막습니다.

> 💡 **핵심**: 트래픽이 늘면 서버를 키우지 말고 **역할을 나누세요**. 메인은 접수, 워커는 실행 — 이것이 n8n 스케일링의 정석입니다.`,
          illustration: {
            type: "stack",
            title: "큐 모드 아키텍처",
            layers: [
              {
                label: "메인 인스턴스",
                sublabel: "UI · 스케줄 · 웹훅 접수",
                icon: "monitor",
                tone: "primary",
              },
              {
                label: "Redis 큐",
                sublabel: "실행 대기열",
                icon: "layers",
                tone: "accent",
              },
              {
                label: "워커 × N",
                sublabel: "n8n worker — 수평 확장",
                icon: "cpu",
                tone: "accent",
              },
              {
                label: "PostgreSQL",
                sublabel: "실행 기록 저장 (SQLite 불가)",
                icon: "database",
                tone: "muted",
              },
            ],
            caption: "접수와 실행을 분리하면 워커만 늘려서 대량 트래픽을 버팁니다.",
          },
        },
        {
          slug: "migration-strategy",
          title: "Make/Zapier에서 n8n으로 이전하는 전략",
          minutes: 5,
          content: `이전은 "전부 옮기기"가 아니라 **ROI 순서대로 옮기기**입니다. 자동 변환 도구에 기대기보다, 이 5단계가 안전합니다.

## 이전 5단계

1. **인벤토리** — 운영 중인 시나리오/잽을 전수 조사: 실행량, 스텝 수, 실패율, 담당자
2. **ROI 순위** — **실행량이 많고 스텝이 긴 것부터**. 과금 단위 차이(스텝당 → 실행당) 덕에 절감 폭이 가장 큽니다. 거의 안 도는 자동화는 굳이 옮기지 않아도 됩니다.
3. **재구축** — 모듈→노드로 다시 조립합니다. 지원 앱이 없다면? **HTTP Request 노드**로 대부분의 API를 직접 호출할 수 있고, **커뮤니티 노드**(Settings → Community Nodes, npm 설치)로 메꿉니다.
4. **병행 운영** — 같은 트리거를 양쪽에 걸고 1~2주간 결과를 대조합니다. n8n 쪽 알림에 태그를 붙여 구분하면 편합니다.
5. **컷오버** — 기존 쪽을 끄고, 첫 달은 에러 워크플로우 알림을 집중 모니터링. 그다음 구독을 정리합니다.

## 커뮤니티 노드 주의점

npm 생태계라 자유롭지만, 2026년 초 악성 패키지 공급망 공격 사례가 보고됐습니다. **Verified 배지가 있는 노드** 위주로 쓰고, 미검증 패키지는 코드를 확인한 뒤 설치하세요.

> 💡 **핵심**: 실행량 × 스텝 수가 큰 워크플로우부터 옮기고, **반드시 병행 운영으로 검증 후 컷오버** — 절감액이 이전 비용을 첫 달에 회수해 줍니다.`,
          illustration: {
            type: "steps",
            title: "Make/Zapier → n8n 이전 5단계",
            steps: [
              {
                label: "인벤토리",
                sublabel: "실행량 · 스텝 수 · 실패율 조사",
                icon: "clipboard",
              },
              {
                label: "ROI 순위",
                sublabel: "실행량 많고 스텝 긴 것부터",
                icon: "chart",
              },
              {
                label: "재구축",
                sublabel: "없는 앱은 HTTP Request · 커뮤니티 노드",
                icon: "workflow",
              },
              {
                label: "병행 운영",
                sublabel: "1~2주 양쪽 결과 대조",
                icon: "repeat",
              },
              {
                label: "컷오버",
                sublabel: "구독 정리 · 집중 모니터링",
                icon: "check",
              },
            ],
            caption: "자동 변환보다 ROI 순서의 수동 재구축이 결과적으로 빠르고 안전합니다.",
          },
        },
      ],
    },
  ],
};
