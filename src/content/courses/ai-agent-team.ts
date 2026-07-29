import type { Course } from "../types";

/**
 * 밤새 일하는 AI 팀 만들기 — 멀티 에이전트 실전 (2026)
 *
 * 스타일 기준: loop-engineering.ts (훅 → ## 소제목 → 불릿 → 💡 핵심 블록쿼트)
 * 포지션: loop-engineering의 orchestration-patterns 레슨을 실제 도구(Claude Code)로
 *         구현하는 실습편. ax-team.ts(사람 조직론)와는 완전히 다른 주제.
 *
 * 사실 검증(WebSearch 7회 + 공식 문서 WebFetch 2회, 2026-07):
 * - 서브에이전트: .claude/agents/*.md(프로젝트) / ~/.claude/agents/*.md(유저 레벨).
 *   frontmatter는 name·description 필수, tools·model 선택. tools는 허용 목록(생략 시 전체 상속).
 *   마크다운 본문 = 시스템 프롬프트. description을 보고 메인 에이전트가 자동 위임 판단.
 *   /agents는 목록·관리 화면(생성 마법사는 제거됨 — 파일 직접 작성으로 안내). (code.claude.com/docs/en/sub-agents)
 * - 에이전트 팀: 실험적. CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (환경변수 또는 settings.json env).
 *   리드 세션 + 팀원 세션, 공유 태스크 목록(pending→in progress→completed, 의존성 미해결 태스크는
 *   잠김·선행 완료 시 자동 언락), 팀원 간 다이렉트 메시지(SendMessage/mailbox).
 *   제약: 한 세션당 1팀, 팀원은 팀원 스폰 불가, 리드 고정. 팀원마다 독립 컨텍스트 → 토큰 비용이
 *   팀원 수에 비례해 증가. 팀원도 CLAUDE.md를 읽음. 권장 팀 규모 3~5명. (docs/en/agent-teams)
 * - 권한: --permission-mode default/acceptEdits/plan/bypassPermissions, Shift+Tab으로 전환.
 *   settings.json permissions.allow/deny — "Bash(npm run test:*)" 같은 접두사+:* 패턴, deny가 항상 우선.
 *   --dangerously-skip-permissions ≒ bypassPermissions, 격리 환경(컨테이너·VM) 전용 경고. (docs/en/permissions, permission-modes)
 * - 훅: settings.json hooks — PreToolUse는 종료 코드 2로 도구 실행 차단(+stderr가 모델에 전달),
 *   Stop(종료 코드 2면 계속 일함), SessionEnd·Notification은 정보성. matcher/type:command 구조 확인. (docs/en/hooks)
 * - headless: claude -p(--print) 비대화형 1회 실행, cron·스크립트 결합 표준 패턴. --output-format 존재.
 * - worktree: claude --worktree <이름>(-w)으로 격리 세션, 변경 없으면 자동 정리.
 *   서브에이전트 frontmatter isolation: worktree 지원. 파일만 격리(포트·DB는 공유). (docs/en/worktrees)
 * - 설치: curl -fsSL https://claude.ai/install.sh | bash (macOS/Linux/WSL),
 *   Windows PowerShell은 irm https://claude.ai/install.ps1 | iex. claude --version으로 확인. (docs/en/quickstart)
 *
 * 표기 주의:
 * - 용어사전의 "태스크"(Zapier 과금 단위)·"훅"(숏폼 도입부)과 동음이의 충돌 → 본문에서는
 *   "작업 보드/작업"과 "Hook"으로 표기해 잘못된 툴팁을 회피.
 * - 버전 번호는 본문에 쓰지 않음(버전 비의존 서술).
 */
export const aiAgentTeam: Course = {
  slug: "ai-agent-team",
  title: "밤새 일하는 AI 팀 만들기: 멀티 에이전트 실전",
  subtitle:
    "지휘자·기획·개발·테스터·디자이너 — AI 팀원을 채용해 서로 일을 주고받게 만들고, 밤새 무인으로 돌리는 법",
  description:
    "AI에게 일을 시켜 본 사람은 압니다 — 한 명에게 전부 맡기면 뒤로 갈수록 흐트러진다는 것을. 기억은 넘치고, 자기가 짠 코드는 자기가 검사하니 관대해집니다. 이 강의는 Claude Code 위에 지휘자·기획자·개발자·테스터·디자이너로 구성된 AI 팀을 직접 꾸리는 실습입니다. 마크다운 파일 하나로 팀원을 채용하고, 역할 지시서와 도구 권한으로 품질을 조이고, 기획→개발→검증→반려로 일이 도는 릴레이를 눈으로 관찰합니다. 마지막에는 권한 설계와 Hook 안전장치를 갖춰 저녁에 브리핑을 남기고 아침에 결과를 받는 무인 운영까지 완성합니다. 터미널을 조금 써 봤다면 충분합니다 — 모든 실습은 파일 경로, 명령어, 입력할 프롬프트 전문까지 그대로 따라 할 수 있게 구성했습니다.",
  category: "dev",
  level: "beginner",
  tags: ["멀티 에이전트", "Claude Code", "서브에이전트", "오케스트레이션", "무인 자동화"],
  gradient: ["#1e1b4b", "#0891b2"],
  icon: "bot",
  outcomes: [
    "AI '한 명'이 아니라 '팀'이 필요한 이유를 컨텍스트·검증·역할 관점에서 설명할 수 있다",
    ".claude/agents/ 폴더에 역할별 AI 팀원을 마크다운 파일로 직접 채용할 수 있다",
    "역할 지시서의 4요소와 최소 권한 원칙으로 팀원의 품질과 안전을 설계할 수 있다",
    "서브에이전트 방식과 에이전트 팀 방식의 차이를 알고 상황에 맞게 고를 수 있다",
    "기획→개발→검증→반려로 일이 도는 릴레이를 프롬프트 하나로 가동할 수 있다",
    "권한 규칙·Hook·밤샘 브리핑으로 무인 야간 운영을 안전하게 돌리고 아침에 검수할 수 있다",
  ],
  modules: [
    {
      slug: "team-structure",
      title: "AI 팀은 어떻게 돌아가는가",
      description: "왜 팀인가, 다섯 역할의 분업, 일이 흐르는 구조",
      lessons: [
        {
          slug: "why-team",
          title: "왜 AI '한 명'이 아니라 '팀'인가",
          minutes: 4,
          content: `에이전트 하나에게 "기획부터 테스트까지 전부 해줘"라고 시켜 본 적이 있다면, 이미 답을 알고 있습니다 — 처음엔 잘하다가 뒤로 갈수록 흐트러집니다.

## 혼자 다 하는 AI의 3가지 한계

- **컨텍스트 포화** — 기획 메모, 코드, 에러 로그가 전부 하나의 컨텍스트 윈도우에 쌓입니다. 작업 후반이 되면 초반에 정한 요구사항을 잊기 시작합니다.
- **자기 검증의 한계** — 자기가 짠 코드를 자기가 검사하면 같은 편향으로 같은 실수를 그대로 통과시킵니다. 자기 글의 오타는 자기 눈에 잘 안 보이는 것과 같습니다.
- **역할 전환 비용** — "과감하게 만들어라"와 "의심하며 검사하라"는 상충하는 요구입니다. 한 에이전트가 두 모드를 오가면 어느 쪽도 어중간해집니다.

1인 식당을 떠올려 보세요. 주문받고, 요리하고, 서빙하고, 계산까지 혼자서도 손님 두세 팀까지는 됩니다. 하지만 주문이 밀리는 순간 전부 무너지죠. 그래서 식당은 주방·홀·계산대로 **분업**합니다.

## 팀으로 바꾸면 달라지는 것

- 역할마다 **독립된 컨텍스트** — 테스터는 테스트만 기억하면 되니 끝까지 선명합니다.
- **만든 사람 ≠ 검사하는 사람** — 그래서 "반려"라는 행위가 성립합니다.
- 역할 지시서가 고정되어 있어 **품질이 일정**합니다.

멀티 에이전트 패턴의 이론은 '루프 엔지니어링' 강의에서 다뤘습니다. 이 강의는 그 패턴을 Claude Code로 **직접 만들어 돌리는** 실습편입니다.

> 💡 **핵심**: 멀티 에이전트의 힘은 'AI가 여러 명'이 아니라 **독립된 컨텍스트 + 서로 견제하는 역할**에서 나옵니다.`,
          illustration: {
            type: "compare",
            title: "1인 AI vs AI 팀",
            columns: [
              {
                title: "혼자 다 하는 AI",
                icon: "user",
                tone: "muted",
                items: [
                  "기획·코드·로그가 한 기억에 뒤섞임",
                  "자기 코드를 자기가 검사 (관대해짐)",
                  "만들기·검사하기 모드를 오가며 흔들림",
                  "긴 작업일수록 품질 하락",
                ],
              },
              {
                title: "역할을 나눈 AI 팀",
                icon: "users",
                tone: "primary",
                items: [
                  "역할마다 독립된 컨텍스트",
                  "테스터가 개발자의 결과를 반려",
                  "역할 지시서가 고정되어 품질 일정",
                  "밤새 돌려도 구조가 유지됨",
                ],
              },
            ],
            caption: "1인 식당이 주방·홀·계산대로 분업하는 것과 같은 원리입니다.",
          },
        },
        {
          slug: "meet-the-team",
          title: "팀 소개: 지휘자와 4명의 전문가",
          minutes: 5,
          content: `이 강의에서 함께 꾸릴 팀은 다섯입니다. 각자를 소개하기 전에, 가장 중요한 규칙 하나부터 — **지휘자는 연주하지 않습니다.**

## 오케스트레이터: 일하지 않는 팀원

오케스트라 지휘자는 바이올린을 잡지 않습니다. 악보를 나누고, 타이밍을 맞추고, 전체 소리를 듣습니다. 오케스트레이터(팀을 지휘하는 메인 에이전트)도 똑같습니다.

- 하는 일: 목표를 작은 작업으로 **쪼개고**, 팀원에게 **분배하고**, 결과를 **취합**합니다.
- 하지 않는 일: 직접 코드를 짜지 않습니다. 지휘자가 연주를 시작하는 순간 합주가 무너지듯, 오케스트레이터가 구현에 뛰어들면 분업 구조가 무너집니다.

## 4명의 전문가: 무엇을 받아 무엇을 내놓는가

각 팀원은 **입력물 → 산출물**로 정의됩니다. 이 정의가 뒤에서 만들 역할 지시서의 뼈대가 됩니다.

- **기획자** — 입력: 목표 한 줄 / 산출: 요구사항 명세 파일 \`SPEC.md\`
- **개발자** — 입력: \`SPEC.md\` / 산출: 동작하는 코드 + 커밋
- **테스터** — 입력: 코드 / 산출: 검증 결과 \`TEST_REPORT.md\` (통과 또는 **반려**)
- **디자이너** — 입력: \`SPEC.md\` / 산출: 화면 구성과 스타일

## 왜 이 다섯인가

만드는 사람(기획·개발·디자인), 검사하는 사람(테스터), 지휘하는 사람 — 소프트웨어 팀의 최소 구성입니다. 프로젝트에 따라 문서 담당이나 리서처를 더해도 좋습니다. 뽑는 방법은 전부 같으니까요.

> 💡 **핵심**: 팀원 한 명 = "무엇을 받아(입력물) 무엇을 내놓는가(산출물)"의 정의. 지휘자만 예외 — **분배와 취합**이 산출물입니다.`,
          illustration: {
            type: "grid",
            title: "다섯 역할의 입력물 → 산출물",
            items: [
              {
                label: "오케스트레이터",
                sublabel: "일을 쪼개고 나누고 취합 — 직접 일하지 않음",
                icon: "brain",
                tone: "primary",
              },
              {
                label: "기획자",
                sublabel: "목표 한 줄 → SPEC.md",
                icon: "clipboard",
                tone: "accent",
              },
              {
                label: "개발자",
                sublabel: "SPEC.md → 코드 + 커밋",
                icon: "code",
                tone: "accent",
              },
              {
                label: "테스터",
                sublabel: "코드 → TEST_REPORT.md (통과/반려)",
                icon: "test-tube",
                tone: "warning",
              },
              {
                label: "디자이너",
                sublabel: "SPEC.md → 화면 구성·스타일",
                icon: "palette",
                tone: "accent",
              },
            ],
            caption: "만드는 셋 + 검사하는 하나 + 지휘하는 하나 — 소프트웨어 팀의 최소 구성입니다.",
          },
        },
        {
          slug: "how-work-flows",
          title: "일이 흐르는 구조: 작업 보드와 메시지",
          minutes: 5,
          content: `팀원을 만드는 법보다 먼저 알아야 할 것이 있습니다 — **일이 팀 안에서 어떻게 흐르는가**. 이 구조를 이해하면 나중에 어떤 문제가 생겨도 어디가 막혔는지 짚을 수 있습니다.

## 작업 보드: 주방의 주문서 걸이

바쁜 주방에는 주문서 걸이가 있습니다. 주문이 들어오면 걸리고, 요리사가 하나 집어 조리하고, 완성되면 빼냅니다. AI 팀의 **공유 작업 보드**도 똑같이 세 칸으로 움직입니다.

- **할 일** — 오케스트레이터가 등록한 작업이 대기하는 곳
- **진행 중** — 팀원이 집어 간 작업
- **완료** — 산출물과 함께 끝난 작업

누가 뭘 하는지 팀 전체가 이 보드 하나로 공유합니다. 말로 묻지 않아도 됩니다.

## 의존성: 순서가 필요한 일은 잠근다

명세가 없는데 개발부터 시작하면 엉뚱한 것을 만듭니다. 그래서 작업에는 **의존성**을 걸 수 있습니다.

- "구현" 작업은 "명세 작성" 완료 전까지 **잠겨** 있습니다.
- 기획자가 명세를 완료하는 순간, 잠겨 있던 구현 작업이 **자동으로 열립니다**.
- 릴레이 경주와 같습니다 — 바통을 받기 전에는 뛸 수 없습니다.

## 다이렉트 메시지: 반려의 통로

테스터가 버그를 찾으면? 팀원끼리 **직접 메시지**를 보내 개발자에게 반려합니다. 이 되돌아가는 화살표(반려 → 수정 → 재검증)가 팀 품질의 심장입니다. 방식에 따라 지휘자가 메시지를 중계하기도 하는데, 그 차이는 3모듈에서 다룹니다.

> 💡 **핵심**: 팀의 구조 = **보드**(무엇을) + **의존성**(어떤 순서로) + **메시지**(누구에게). 이 셋만 기억하면 어떤 멀티 에이전트 도구든 읽을 수 있습니다.`,
          illustration: {
            type: "flow",
            title: "일이 팀 안에서 흐르는 길",
            nodes: [
              {
                label: "오케스트레이터",
                sublabel: "목표를 작업으로 쪼개 보드에 등록",
                icon: "brain",
                tone: "primary",
              },
              {
                label: "공유 작업 보드",
                sublabel: "할 일 → 진행 중 → 완료 · 의존성으로 잠금",
                icon: "clipboard",
                tone: "accent",
              },
              {
                label: "팀원들이 작업 수행",
                sublabel: "기획 → 개발 → 테스트 릴레이",
                icon: "users",
                tone: "accent",
                edgeLabel: "선행 작업 완료 시 잠금 해제",
              },
              {
                label: "결과 취합·보고",
                sublabel: "산출물 정리 후 사람에게 보고",
                icon: "check",
                tone: "success",
                edgeLabel: "전부 완료되면",
              },
            ],
            loopBack: { from: 2, to: 1, label: "테스터 반려 → 수정 작업 재등록" },
            caption: "되돌아가는 반려 화살표가 팀 품질의 심장입니다.",
          },
        },
      ],
    },
    {
      slug: "hire-agents",
      title: "팀원 채용: 에이전트 만들고 설정하기",
      description: "설치부터 첫 채용, 역할 지시서와 도구 권한까지",
      lessons: [
        {
          slug: "setup",
          title: "준비물: Claude Code 설치와 사무실 개설",
          minutes: 5,
          content: `팀을 꾸리려면 먼저 사무실이 필요합니다. 이번 레슨에서 Claude Code를 설치하고, 팀이 일할 프로젝트 폴더를 만듭니다.

## 설치와 첫 실행

터미널을 열고 아래를 순서대로 입력합니다.

\`\`\`bash
# 1. 설치 (macOS·리눅스·WSL)
curl -fsSL https://claude.ai/install.sh | bash

# 2. 설치 확인 — 버전 번호가 나오면 성공
claude --version

# 3. 팀의 사무실(프로젝트 폴더) 만들기
mkdir my-ai-team && cd my-ai-team

# 4. 첫 실행 — 브라우저가 열리며 로그인 안내
claude
\`\`\`

- Windows라면 PowerShell에서 \`irm https://claude.ai/install.ps1 | iex\` 로 설치합니다.
- 로그인은 Claude 구독 계정 또는 Console 계정으로 진행합니다.

**여기서 막힌다면**: 설치 직후 \`claude\`를 찾을 수 없다고 나오면, 터미널을 완전히 닫고 새로 열어 다시 시도하세요. 설치가 등록한 경로를 새 터미널이 읽어옵니다.

## \`.claude/\` 폴더: 팀의 인사 서류함

프로젝트 안의 \`.claude/\` 폴더가 이 강의의 무대입니다. 회사의 서류함이라고 생각하세요.

- \`.claude/agents/\` — **팀원들의 인사 서류** (다음 레슨에서 채용 시작)
- \`.claude/settings.json\` — **사무실 규칙** (권한·안전장치, 4모듈에서)
- \`CLAUDE.md\` — **사무실 게시판** (팀 공통 규칙, 3모듈에서)

폴더가 아직 없어도 괜찮습니다. 필요할 때 직접 만들면 됩니다.

> 💡 **핵심**: 사무실 개설 = 설치 + 프로젝트 폴더 + \`.claude/\`. 앞으로 만들 모든 것이 이 폴더 안의 **파일**입니다 — 눈에 보이고, 고칠 수 있고, 팀과 공유할 수 있습니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "터미널 — 사무실 개설",
            lines: [
              { text: "curl -fsSL https://claude.ai/install.sh | bash", tone: "cmd" },
              { text: "✓ Claude Code 설치 완료", tone: "ok" },
              { text: "claude --version", tone: "cmd" },
              { text: "x.y.z (Claude Code)", tone: "out" },
              { text: "mkdir my-ai-team && cd my-ai-team", tone: "cmd" },
              { text: "claude", tone: "cmd" },
              { text: "브라우저에서 로그인을 완료하세요…", tone: "dim" },
              { text: "✓ 로그인 완료 — 무엇을 도와드릴까요?", tone: "ok" },
              { text: "# 다음 레슨: .claude/agents/ 에 첫 팀원 채용", tone: "comment" },
            ],
            caption: "명령 4개면 사무실이 열립니다. 막히면 터미널을 새로 열어 보세요.",
          },
        },
        {
          slug: "first-hire",
          title: "첫 채용: 테스터 에이전트 만들기",
          minutes: 6,
          content: `첫 팀원은 테스터입니다. 검사하는 사람부터 뽑아야 나머지 팀원의 결과물을 받아줄 수 있으니까요. 채용 절차는 단순합니다 — **마크다운 파일 하나를 쓰면 끝**입니다.

## 파일 하나 = 팀원 한 명

\`\`\`bash
mkdir -p .claude/agents
\`\`\`

이제 \`.claude/agents/tester.md\` 파일을 만들고 아래 내용을 넣습니다.

\`\`\`markdown
---
name: tester
description: 코드 구현이 끝나면 테스트를 실행해 검증하고 결과를 보고한다
tools: Read, Grep, Glob, Bash
---

# 테스터 업무 지시서

너는 이 팀의 테스터다.
- 테스트를 실행하고, 실패하면 파일·라인·원인을 정리해 TEST_REPORT.md에 기록하라.
- 구현 코드를 절대 고치지 말고, 문제를 발견하면 반려하라.
- 모든 테스트가 통과했을 때만 "검증 통과"라고 보고하라.
\`\`\`

## frontmatter 한 줄씩 뜯어보기

파일 맨 위 \`---\` 사이 구간이 frontmatter(파일의 설정 머리말)입니다. 팀원의 인사 카드라고 생각하세요.

- \`name\` — 팀원을 부르는 이름.
- \`description\` — **가장 중요한 줄.** 오케스트레이터가 이 설명을 읽고 "이 일은 tester에게 맡기자"라고 **스스로 판단**합니다. 채용 공고의 '담당 업무'처럼 언제 불려야 하는지가 드러나게 쓰세요.
- \`tools\` — 이 팀원이 만질 수 있는 도구 목록 (자세한 설계는 두 레슨 뒤에).
- \`model\` — 어떤 모델로 일할지. 생략하면 기본값을 따르니 지금은 비워 둡니다.

그리고 frontmatter 아래 **본문 전체가 이 팀원의 시스템 프롬프트**가 됩니다. 즉, 업무 지시서입니다.

## 채용 확인

\`claude\`를 실행하고 \`/agents\`를 입력하면 등록된 에이전트 목록에 tester가 보입니다.

**여기서 막힌다면**: 목록에 안 보이면 ① 파일이 프로젝트 루트 기준 \`.claude/agents/\` 안에 있는지, ② frontmatter의 \`---\`가 위아래로 정확히 닫혔는지 확인하고, 새 세션으로 다시 열어 보세요.

> 💡 **핵심**: 채용 = 마크다운 파일 1개. \`description\`은 **자동 위임의 열쇠**, 본문은 그 팀원의 **업무 지시서(시스템 프롬프트)**입니다.`,
          illustration: {
            type: "stack",
            title: "에이전트 파일 해부",
            layers: [
              {
                label: "name · description",
                sublabel: "누가, 언제 불려야 하나 — 자동 위임의 근거",
                icon: "key",
                tone: "primary",
              },
              {
                label: "tools · model",
                sublabel: "무엇을 만질 수 있고, 어떤 모델로 일하나",
                icon: "wrench",
                tone: "accent",
              },
              {
                label: "마크다운 본문",
                sublabel: "어떻게 일하나 — 시스템 프롬프트가 되는 업무 지시서",
                icon: "file-text",
                tone: "muted",
              },
            ],
            caption: "위 두 층은 frontmatter(인사 카드), 아래 층은 업무 지시서입니다.",
          },
          demo: {
            title: "테스터 에이전트 채용 따라하기",
            app: {
              kind: "code-editor",
              windowTitle: "tester.md — .claude/agents",
              files: [
                { id: "f-tester", name: "tester.md", active: true },
                { id: "f-claude", name: "CLAUDE.md" },
                { id: "f-app", name: "app.js" },
              ],
              code: [
                { id: "c1", text: "---" },
                { id: "c2", text: "name: tester", tone: "add", hidden: true },
                { id: "c3", text: "description: 구현이 끝나면 테스트를 실행해", tone: "add", hidden: true },
                { id: "c4", text: "  검증하고 결과를 보고한다", tone: "add", hidden: true },
                { id: "c5", text: "tools: Read, Grep, Glob, Bash", tone: "add", hidden: true },
                { id: "c6", text: "---", hidden: true },
                { id: "c7", text: "# 테스터 업무 지시서", tone: "comment", hidden: true },
                { id: "c8", text: "너는 이 팀의 테스터다.", hidden: true },
                { id: "c9", text: "테스트를 실행하고 결과를 보고하라.", hidden: true },
                { id: "c10", text: "구현 코드를 고치지 말고 반려하라.", hidden: true },
              ],
              terminal: [
                { id: "t1", text: "claude", tone: "cmd", hidden: true },
                { id: "t2", text: "/agents", tone: "cmd", hidden: true },
                { id: "t3", text: "프로젝트 에이전트 (.claude/agents)", tone: "out", hidden: true },
                { id: "t4", text: "✓ tester — 테스트 실행·검증 담당", tone: "ok", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① frontmatter — 팀원의 인사 카드부터 씁니다" },
              { t: "move", target: "c1" },
              { t: "click" },
              { t: "type", target: "c2", text: "name: tester" },
              { t: "type", target: "c3", text: "description: 구현이 끝나면 테스트를 실행해" },
              { t: "type", target: "c4", text: "  검증하고 결과를 보고한다" },
              { t: "type", target: "c5", text: "tools: Read, Grep, Glob, Bash" },
              { t: "reveal", target: "c6" },
              { t: "caption", text: "② 본문 — 이 내용이 시스템 프롬프트가 됩니다" },
              { t: "type", target: "c7", text: "# 테스터 업무 지시서" },
              { t: "type", target: "c8", text: "너는 이 팀의 테스터다." },
              { t: "type", target: "c9", text: "테스트를 실행하고 결과를 보고하라." },
              { t: "type", target: "c10", text: "구현 코드를 고치지 말고 반려하라." },
              { t: "wait", ms: 500 },
              { t: "caption", text: "③ Claude Code에서 채용됐는지 확인합니다" },
              { t: "type", target: "t1", text: "claude" },
              { t: "type", target: "t2", text: "/agents" },
              { t: "reveal", target: "t3" },
              { t: "reveal", target: "t4" },
              { t: "move", target: "t4" },
              { t: "caption", text: "✅ 채용 완료 — description을 보고 일이 자동 위임됩니다" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "role-prompts",
          title: "역할 지시서 쓰는 법: 4명분 완성",
          minutes: 6,
          content: `테스터를 뽑아 봤으니 이제 요령이 생겼습니다. 나머지 팀원도 같은 틀로 채용합니다. 좋은 역할 지시서에는 공통 구조가 있습니다 — **4요소**만 채우면 됩니다.

## 좋은 지시서의 4요소

1. **정체성** — "너는 이 팀의 ○○다." 역할을 한 문장으로 고정합니다.
2. **입력물** — 무엇을 받아서 일을 시작하는가. (예: "SPEC.md를 읽고 시작하라")
3. **산출물 형식** — 무엇을, 어떤 파일에, 어떤 형식으로 내놓는가.
4. **완료·반려 기준** — 언제 끝났다고 말할 수 있고, 언제 되돌려보내는가.

## 4명분 핵심 문구

각 파일을 \`.claude/agents/\`에 만들고, frontmatter는 테스터 때처럼 채웁니다. 본문의 핵심 문구는 이렇습니다.

\`\`\`markdown
# planner.md — 기획자
너는 이 팀의 기획자다. 목표를 받으면 요구사항을
SPEC.md에 번호 목록으로 정리하라. 각 항목은
"~하면 ~된다" 형식의 확인 가능한 문장으로 쓴다.
코드를 작성하지 마라 — 명세가 너의 산출물이다.
\`\`\`

\`\`\`markdown
# developer.md — 개발자
너는 이 팀의 개발자다. SPEC.md를 읽고 항목 순서대로
구현하라. SPEC에 없는 기능을 임의로 추가하지 마라.
항목 하나를 끝낼 때마다 커밋을 남겨라.
\`\`\`

\`\`\`markdown
# designer.md — 디자이너
너는 이 팀의 디자이너다. SPEC.md를 읽고 화면 구성과
스타일을 정리해 DESIGN.md에 기록하라. 색·간격·글꼴은
근거와 함께 제안하고, 구현 코드는 건드리지 마라.
\`\`\`

## 실전에서 배운 팁

- 테스터에게는 **"구현을 고치지 말고 반려하라"**를 반드시 명시하세요. 없으면 버그를 직접 고쳐 버려서 검증자의 의미가 사라집니다.
- 기획자의 "코드를 쓰지 마라", 개발자의 "SPEC에 없는 기능 금지"처럼 각 역할의 **하지 말 것**이 품질을 지킵니다.
- 산출물 파일명(\`SPEC.md\` 등)을 지시서에 **고정**하세요. 다음 주자가 어디서 바통을 받을지 알게 됩니다.

> 💡 **핵심**: 지시서 = 정체성 + 입력물 + 산출물 형식 + 완료·반려 기준. 그리고 각 역할의 **"하지 말 것" 한 줄**이 팀의 품질을 지킵니다.`,
          illustration: {
            type: "grid",
            title: "역할 지시서의 4요소",
            items: [
              {
                label: "① 정체성",
                sublabel: "너는 이 팀의 ○○다 — 역할 고정",
                icon: "user",
                tone: "primary",
              },
              {
                label: "② 입력물",
                sublabel: "무엇을 받아 시작하는가 (SPEC.md 등)",
                icon: "download",
                tone: "accent",
              },
              {
                label: "③ 산출물 형식",
                sublabel: "어떤 파일에 어떤 형식으로 내놓는가",
                icon: "upload",
                tone: "accent",
              },
              {
                label: "④ 완료·반려 기준",
                sublabel: "언제 끝인가, 언제 되돌리는가 + 하지 말 것",
                icon: "check",
                tone: "warning",
              },
            ],
            caption: "네 칸을 채우면 어떤 역할이든 지시서가 됩니다 — 빈 칸이 곧 사고 지점입니다.",
          },
        },
        {
          slug: "tool-permissions",
          title: "도구 권한: 누가 뭘 만질 수 있나",
          minutes: 5,
          content: `새 직원에게 첫날부터 사무실 전체의 마스터키를 주는 회사는 없습니다. 각자 필요한 방의 열쇠만 주죠. AI 팀원의 \`tools\` 필드가 바로 그 **열쇠 꾸러미**입니다.

## 최소 권한 원칙

\`tools\`는 허용 목록입니다 — 적힌 도구만 쓸 수 있고, **생략하면 전부 물려받습니다**. 그래서 역할마다 딱 필요한 만큼만 적어 줍니다.

- **기획자** — \`Read, Grep, Glob\` : 코드를 읽고 검색만. 명세를 쓰는 사람이 코드를 고칠 이유가 없습니다.
- **테스터** — \`Read, Grep, Glob, Bash\` : 읽기 + 테스트 실행. 편집 도구는 없습니다.
- **개발자** — 편집 도구 포함(또는 생략해 전체 상속) : 실제로 코드를 고치는 유일한 역할.

## 왜 테스터에게 편집 권한을 주면 안 되나

실패하는 테스트를 "통과"시키는 가장 쉬운 방법이 뭘까요? 버그를 고치는 게 아니라 **테스트를 고치는 것**입니다. 기대값을 실제 출력에 맞춰 바꾸면 순식간에 초록불이 되죠.

- 편집 권한이 있는 테스터는 이 유혹에 빠질 수 있습니다 — 지시서에 "고치지 마라"를 썼더라도요.
- \`tools\`에서 편집 도구를 빼면 **구조적으로 불가능**해집니다. 지시서는 약속이고, 권한은 잠금장치입니다.
- 검사자와 수정자가 분리되어야 "통과"라는 보고를 믿을 수 있습니다.

## 권한 설계가 곧 역할 설계

권한 목록을 보면 그 팀원의 역할이 보입니다. 반대로, 역할이 흐릿하면 권한도 못 정합니다. "이 팀원에게 이 열쇠가 왜 필요하지?"에 답할 수 없다면 빼는 게 정답입니다.

> 💡 **핵심**: 지시서는 **약속**, 권한은 **잠금장치**. "고치지 마라"라고 말하는 것보다 **못 고치게 만드는 것**이 확실합니다.`,
          illustration: {
            type: "compare",
            title: "권한 넉넉 vs 최소 권한",
            columns: [
              {
                title: "전원 마스터키",
                icon: "alert",
                tone: "warning",
                items: [
                  "tools 생략 → 모두 전체 도구 상속",
                  "테스터가 테스트를 고쳐 '통과' 조작 가능",
                  "기획자가 코드를 건드리는 사고",
                  "문제가 나도 누가 그랬는지 불분명",
                ],
              },
              {
                title: "필요한 열쇠만",
                icon: "lock",
                tone: "primary",
                items: [
                  "기획자: Read·Grep·Glob (읽기만)",
                  "테스터: 읽기 + Bash (실행만)",
                  "개발자만 편집 가능",
                  "'통과' 보고를 구조적으로 신뢰 가능",
                ],
              },
            ],
            caption: "권한 목록만 봐도 역할이 읽히는 팀이 좋은 팀입니다.",
          },
        },
      ],
    },
    {
      slug: "run-the-team",
      title: "팀 가동: 서로 일을 던지게 만들기",
      description: "두 가지 가동 방식, 실전 릴레이, 병렬 격리와 팀 규칙",
      lessons: [
        {
          slug: "two-ways",
          title: "팀을 돌리는 두 가지 방법",
          minutes: 5,
          content: `팀원 파일이 준비됐습니다. 이제 이들을 함께 일하게 만드는 방법이 두 가지 있습니다 — 안정적인 기본형과, 강력하지만 실험적인 확장형입니다.

## 방법 A: 서브에이전트 오케스트레이션 (기본 권장)

여러분이 대화하는 **메인 세션이 곧 오케스트레이터**가 되는 방식입니다.

- 메인 세션이 \`description\`을 보고 팀원(서브에이전트)에게 일을 맡기고, **결과 요약만** 돌려받습니다.
- 팀원끼리 직접 대화하지는 않습니다 — 모든 소통이 지휘자를 거칩니다.
- 결과만 취합하므로 토큰이 절약되고, 흐름이 단순해서 **안정적**입니다.
- 별도 설정 없이 \`.claude/agents/\` 파일만 있으면 바로 동작합니다.

## 방법 B: 에이전트 팀 (실험적)

팀원들이 **각자 독립된 세션**으로 살아나 서로 직접 협업하는 방식입니다. 실험적 기능이라 직접 켜야 합니다.

\`\`\`json
// .claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
\`\`\`

- 켠 뒤 "팀을 만들어 ○○를 진행해줘"라고 **자연어로 요청**하면 리드가 팀원들을 스폰합니다.
- 공유 작업 보드 + 팀원 간 다이렉트 메시지 — 3레슨에서 본 구조 그대로입니다.
- 주의: 팀원마다 독립 컨텍스트를 쓰므로 **토큰 비용이 팀원 수만큼 배**로 듭니다. 한 세션에 팀은 하나, 팀원이 또 팀원을 뽑을 수는 없습니다.

## 언제 뭘 쓰나

- 순차 릴레이, 결과만 필요한 작업 → **A**. 대부분의 일은 이걸로 충분합니다.
- 팀원끼리 토론·조율이 필요한 작업(여러 가설 디버깅, 다각도 리뷰) → **B**.
- 이 강의의 실습은 **A를 기본**으로 하되, 다음 레슨의 데모에서 B의 협업 모습을 관찰합니다.

> 💡 **핵심**: 먼저 **서브에이전트(A)로 시작**하세요. 팀원끼리 대화가 꼭 필요해질 때만 에이전트 팀(B)을 켭니다 — 비용은 팀원 수에 비례합니다.`,
          illustration: {
            type: "compare",
            title: "서브에이전트 vs 에이전트 팀",
            columns: [
              {
                title: "A. 서브에이전트 (기본)",
                icon: "workflow",
                tone: "primary",
                items: [
                  "메인 세션 = 오케스트레이터",
                  "팀원은 결과 요약만 보고",
                  "소통은 전부 지휘자 경유",
                  "설정 불필요 · 토큰 절약 · 안정적",
                ],
              },
              {
                title: "B. 에이전트 팀 (실험적)",
                icon: "users",
                tone: "accent",
                items: [
                  "팀원마다 독립 세션으로 가동",
                  "공유 작업 보드 + 직접 메시지",
                  "환경변수로 켜는 실험 기능",
                  "토큰 비용이 팀원 수만큼 배",
                ],
              },
            ],
            caption: "A로 시작해서, 팀원 간 '대화'가 필요해질 때만 B로 확장하세요.",
          },
        },
        {
          slug: "first-relay",
          title: "실전 릴레이: 기획→개발→테스트→반려→수정",
          minutes: 7,
          content: `드디어 팀을 가동합니다. 오케스트레이터에게 좋은 브리핑 하나만 주면, 일이 팀 안을 돌기 시작합니다.

## 오케스트레이터에게 줄 프롬프트 전문

\`claude\`를 실행하고 아래를 그대로 입력해 보세요 (목표는 원하는 것으로 바꿔도 됩니다).

\`\`\`text
브라우저에서 동작하는 할 일 앱을 만들어줘.

역할 분담 — 서브에이전트를 이 순서로 써라:
1. planner: 요구사항을 SPEC.md로 정리
2. developer: SPEC.md대로 구현하고 항목마다 커밋
3. tester: 테스트를 실행해 TEST_REPORT.md 작성

완료 기준: 모든 테스트 통과 + SPEC 항목 전부 구현.
반려 규칙: tester가 실패를 보고하면 실패 내용을
그대로 developer에게 전달해 수정시켜라. 최대 3회.
너는 직접 구현하지 마라 — 분배와 취합만 해라.
\`\`\`

브리핑의 뼈대는 넷입니다: **목표 + 역할 분담 + 완료 기준 + 반려 규칙**.

## 관찰 포인트

일이 도는 동안 이걸 지켜보세요. 구조가 눈에 들어옵니다.

- 오케스트레이터가 각 팀원의 \`description\`을 보고 **알아서 위임**하는가.
- 테스터의 실패 보고가 개발자에게 전달되고, 수정 후 **재검증**이 도는가 — 이 반려 루프가 릴레이의 심장입니다.
- "직접 구현하지 마라"가 없으면 지휘자가 혼자 다 해버리는 경우가 많습니다. 실무를 놓지 못하는 초보 관리자와 똑같습니다.
- "최대 3회"는 무한 반복을 막는 안전장치입니다 — 없으면 같은 반려가 끝없이 돌 수 있습니다.

**여기서 막힌다면**: 지휘자가 팀원을 부르지 않고 혼자 일한다면, "planner 서브에이전트에게 맡겨라"처럼 **이름을 콕 집어** 다시 지시하세요.

## 데모에서 릴레이를 눈으로

아래 데모는 에이전트 팀 방식으로 돌렸을 때의 협업 채널 모습입니다. 배정 → 명세 → 구현 → 반려 → 수정 → 통과 → 보고가 한눈에 보입니다.

> 💡 **핵심**: 좋은 브리핑 = **목표 + 역할 분담 + 완료 기준 + 반려 규칙**. 특히 "직접 하지 마라"와 "최대 N회"가 팀을 팀답게 만듭니다.`,
          illustration: {
            type: "chat",
            title: "오케스트레이터와의 대화",
            messages: [
              {
                role: "user",
                text: "할 일 앱을 만들어줘. planner → developer → tester 순서로, 실패하면 반려. 너는 분배와 취합만 해.",
              },
              {
                role: "ai",
                text: "작업 3개를 등록했습니다. planner에게 명세 작성을 맡깁니다.",
              },
              {
                role: "ai",
                text: "tester가 반려했습니다 — 빈 입력 버그. 실패 내용을 developer에게 전달해 수정시킵니다. (1/3회)",
              },
              {
                role: "ai",
                text: "재검증 통과 ✅ 산출물: SPEC.md · todo.js · TEST_REPORT.md — 최종 검수 부탁드립니다.",
              },
            ],
            caption: "지휘자는 분배·전달·취합만 합니다. 반려도 보고의 한 형태입니다.",
          },
          demo: {
            title: "팀 채널에서 릴레이 관찰하기",
            app: {
              kind: "chat-app",
              workspace: "AI 팀 — 할 일 앱 프로젝트",
              composerId: "composer",
              channels: [
                { id: "ch-team", name: "팀-작업-현황", active: true },
                { id: "ch-log", name: "빌드-로그" },
              ],
              messages: [
                {
                  id: "m1",
                  author: "지휘자",
                  bot: true,
                  time: "21:02",
                  text: "작업 보드 등록: ① 명세(기획자) ② 구현(개발자, ①에 의존) ③ 검증(테스터, ②에 의존)",
                  hidden: true,
                },
                {
                  id: "m2",
                  author: "기획자",
                  bot: true,
                  time: "21:07",
                  text: "SPEC.md 제출 — 할 일 추가·완료·삭제, 빈 입력은 거부. ① 명세 완료 ✅",
                  hidden: true,
                },
                {
                  id: "m3",
                  author: "개발자",
                  bot: true,
                  time: "21:26",
                  text: "todo.js 구현·커밋 완료. ② 완료 — ③ 검증 작업이 열렸습니다 → 테스터",
                  hidden: true,
                },
                {
                  id: "m4",
                  author: "테스터",
                  bot: true,
                  time: "21:31",
                  text: "12개 중 11개 통과. ❌ 빈 입력이 목록에 추가됨 (SPEC 3번 위반) — 개발자에게 반려합니다",
                  hidden: true,
                },
                {
                  id: "m5",
                  author: "개발자",
                  bot: true,
                  time: "21:38",
                  text: "빈 입력 검사를 추가하고 수정 커밋했습니다. 재검증 부탁합니다",
                  hidden: true,
                },
                {
                  id: "m6",
                  author: "테스터",
                  bot: true,
                  time: "21:42",
                  text: "✓ 12개 전부 통과 — ③ 검증 완료, TEST_REPORT.md 갱신",
                  hidden: true,
                },
                {
                  id: "m7",
                  author: "지휘자",
                  bot: true,
                  time: "21:44",
                  text: "모든 작업 완료. 산출물: SPEC.md · todo.js · TEST_REPORT.md — 최종 검수만 남았습니다",
                  hidden: true,
                },
              ],
            },
            actions: [
              { t: "caption", text: "① 지휘자에게 목표와 반려 규칙을 한 번에 줍니다" },
              { t: "click", target: "composer" },
              { t: "type", target: "composer", text: "할 일 앱 만들어줘. 기획→개발→검증, 실패는 반려해" },
              { t: "wait", ms: 400 },
              { t: "reveal", target: "m1" },
              { t: "move", target: "m1" },
              { t: "caption", text: "② 앞 작업이 끝나야 다음이 열립니다 — 릴레이 시작" },
              { t: "reveal", target: "m2" },
              { t: "reveal", target: "m3" },
              { t: "wait", ms: 600 },
              { t: "caption", text: "③ 테스터가 버그를 찾아 개발자에게 직접 반려합니다" },
              { t: "reveal", target: "m4" },
              { t: "move", target: "m4" },
              { t: "wait", ms: 500 },
              { t: "reveal", target: "m5" },
              { t: "reveal", target: "m6" },
              { t: "caption", text: "④ 지휘자는 취합·보고만 — 사람은 최종 검수만 합니다" },
              { t: "reveal", target: "m7" },
              { t: "move", target: "m7" },
              { t: "wait", ms: 900 },
            ],
          },
        },
        {
          slug: "parallel-worktree",
          title: "병렬 작업과 충돌 방지: 각자의 작업실",
          minutes: 5,
          content: `팀이 커지면 새로운 사고가 생깁니다 — 두 팀원이 **같은 파일**을 동시에 고치는 것. 원본 서류 한 장에 두 사람이 동시에 펜을 대는 셈입니다.

## 같은 파일을 만지면 생기는 일

- 나중에 저장한 쪽이 먼저 저장한 쪽의 수정을 **덮어씁니다**. 한 명의 밤샘 작업이 조용히 사라질 수 있습니다.
- 반쯤 고쳐진 파일을 다른 팀원이 읽고 **엉뚱한 판단**을 내리기도 합니다.
- 해결의 원리는 단순합니다: 원본을 **복사해서 각자 책상에서** 작업하고, 끝나면 취합한다.

## worktree: Git이 주는 독립 작업실

worktree(같은 저장소를 다른 폴더에 하나 더 펼쳐 놓는 Git 기능)를 쓰면 세션마다 독립된 작업 폴더가 생깁니다.

\`\`\`bash
# 터미널 1 — 로그인 기능 담당 세션
claude --worktree login-feature

# 터미널 2 — 다크 모드 담당 세션
claude --worktree dark-mode
\`\`\`

- 각 세션은 **자기 폴더와 자기 브랜치**에서만 일합니다. 서로의 파일을 건드릴 수 없습니다.
- 작업이 끝나면 브랜치를 검토하고 머지해서 취합합니다.
- 아무 변경 없이 끝난 worktree는 자동으로 정리됩니다.
- 서브에이전트에도 격리를 줄 수 있습니다 — 에이전트 파일 frontmatter에 \`isolation: worktree\`를 추가하면 그 팀원은 자기 작업실에서 일합니다.

## 격리의 한계도 알아두기

worktree가 격리하는 것은 **파일뿐**입니다. 두 세션이 같은 포트로 개발 서버를 띄우면 충돌하고, 같은 데이터베이스를 바라보면 서로의 데이터를 건드립니다.

> 💡 **핵심**: 병렬의 전제는 **격리**입니다. 일을 나눌 때 "파일이 겹치는가?"부터 확인하고, 겹칠 수 있으면 worktree로 책상을 분리하세요.`,
          illustration: {
            type: "steps",
            title: "충돌 없는 병렬 작업 절차",
            steps: [
              {
                label: "일을 파일 기준으로 쪼갠다",
                sublabel: "두 작업이 같은 파일을 만지지 않게 설계",
                icon: "scissors",
              },
              {
                label: "worktree로 세션 분리",
                sublabel: "claude --worktree 이름 — 독립 폴더+브랜치",
                icon: "git-branch",
              },
              {
                label: "각자 작업실에서 커밋",
                sublabel: "서로의 파일을 건드릴 수 없음",
                icon: "code",
              },
              {
                label: "검토 후 머지로 취합",
                sublabel: "변경 없는 작업실은 자동 정리",
                icon: "check",
              },
            ],
            caption: "원본 서류를 복사해 각자 책상에서 작업하고, 끝나면 한 서랍에 모으는 절차입니다.",
          },
        },
        {
          slug: "team-rules",
          title: "팀 규칙 문서화: CLAUDE.md와 산출물 규약",
          minutes: 5,
          content: `사람 팀도 "말 안 해도 알겠지"가 사고의 시작입니다. AI 팀은 더합니다 — **적히지 않은 규칙은 존재하지 않는 규칙**입니다.

## CLAUDE.md: 사무실 게시판

프로젝트 루트의 \`CLAUDE.md\`는 팀원 모두가 일을 시작할 때 자동으로 읽는 공통 문서입니다. 출근길에 반드시 지나치는 게시판인 셈이죠. 역할 지시서에 넣기엔 **모두에게 해당하는** 규칙을 여기 적습니다.

\`\`\`markdown
# 팀 공통 규칙
- 커밋 메시지는 "무엇을, 왜"를 한 줄로.
- 완료 보고는 3줄: 한 일 / 검증 결과 / 다음 사람에게.
- node_modules와 .env는 절대 수정 금지.
- 확신이 없으면 추측으로 진행하지 말고 질문을 남겨라.
\`\`\`

## 산출물 규약: 릴레이의 바통 규격

릴레이에서 앞 주자의 산출물은 다음 주자의 입력물입니다. 형식이 흔들리면 바통을 놓칩니다.

- **파일명 고정** — 명세는 \`SPEC.md\`, 검증은 \`TEST_REPORT.md\`, 디자인은 \`DESIGN.md\`. 어디서 받을지 모두가 압니다.
- **형식 고정** — SPEC은 번호 목록, TEST_REPORT는 "통과 n / 실패 n + 실패 상세" 같은 틀을 정합니다.
- 규약은 CLAUDE.md와 각 역할 지시서 **양쪽에** 적습니다. 주는 쪽과 받는 쪽이 같은 규격을 알아야 하니까요.

## 보고 형식이 릴레이 품질을 결정한다

"됐어요"라는 보고는 다음 주자에게 아무 정보가 없습니다. "SPEC 1~4번 구현, 테스트 12개 통과, 5번은 질문 있음"이라는 보고는 다음 행동을 바로 정해 줍니다. 보고 형식을 통일하는 것은 예의가 아니라 **성능**입니다.

> 💡 **핵심**: CLAUDE.md는 **전원이 읽는 게시판**, 산출물 규약은 **바통의 규격**. 릴레이 품질은 팀원의 실력보다 이 규격의 명확함이 결정합니다.`,
          illustration: {
            type: "stack",
            title: "팀 규칙의 층위",
            layers: [
              {
                label: "CLAUDE.md",
                sublabel: "전원이 자동으로 읽는 공통 규칙 (게시판)",
                icon: "book",
                tone: "primary",
              },
              {
                label: "역할 지시서 (.claude/agents/*.md)",
                sublabel: "팀원 개인의 업무 방식",
                icon: "user",
                tone: "accent",
              },
              {
                label: "산출물 규약 (SPEC.md · TEST_REPORT.md)",
                sublabel: "팀원 사이를 오가는 바통의 규격",
                icon: "file-text",
                tone: "accent",
              },
              {
                label: "작업 보드",
                sublabel: "지금 누가 무엇을 하는지의 실시간 상태",
                icon: "clipboard",
                tone: "muted",
              },
            ],
            caption: "위로 갈수록 오래 유지되는 규칙, 아래로 갈수록 실시간 상태입니다.",
          },
        },
      ],
    },
    {
      slug: "overnight",
      title: "밤새 돌리기: 무인 운영",
      description: "권한 설계, Hook 안전장치, 밤샘 브리핑과 아침 점검",
      lessons: [
        {
          slug: "night-permissions",
          title: "무인 모드의 조건: 권한 설계",
          minutes: 6,
          content: `낮에는 위험한 행동마다 여러분이 승인 버튼을 눌러 줍니다. 밤에는? **승인해 줄 사람이 없습니다.** 팀이 확인을 기다리며 아침까지 멈춰 있거나, 아무거나 하도록 풀어놓거나 — 둘 다 정답이 아닙니다.

## 권한 모드의 스펙트럼

Claude Code는 세션의 기본 태도를 권한 모드로 정합니다. \`claude --permission-mode acceptEdits\`처럼 시작하거나, 세션 중 Shift+Tab으로 전환합니다.

- **default** — 위험한 행동마다 물어봄. 낮에 옆에서 지켜볼 때의 모드.
- **acceptEdits** — 파일 편집은 자동 승인. 야간 운영의 현실적인 출발점.
- **plan (플랜 모드)** — 읽기만 하고 계획만 세움. 실행 전 검토용.
- **bypassPermissions** — 전부 자동 승인. 가장 위험한 모드입니다.

## allow와 deny: 목록으로 조인다

모드가 큰 방향이라면, \`.claude/settings.json\`의 규칙은 정밀 조준입니다.

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint:*)",
      "Bash(git commit:*)"
    ],
    "deny": [
      "Bash(rm:*)",
      "Bash(git push:*)"
    ]
  }
}
\`\`\`

- \`allow\` — 물어보지 않고 실행해도 되는 것. 테스트·린트·커밋처럼 **되돌릴 수 있는** 명령들.
- \`deny\` — 무슨 일이 있어도 금지. 삭제(\`rm\`)나 외부 반영(\`git push\`)처럼 **되돌리기 어려운** 명령들.
- 같은 명령이 양쪽에 걸리면 **deny가 항상 이깁니다**.

## bypassPermissions는 격리 환경 전용

\`--dangerously-skip-permissions\`(bypassPermissions와 같은 효과)라는 이름부터가 경고입니다. 내 컴퓨터에서 그대로 켜면 팀이 어떤 명령이든 실행할 수 있게 됩니다. 쓰려면 망가져도 되는 **격리된 컨테이너나 가상 머신 안**에서만 쓰세요.

> 💡 **핵심**: 무인 모드는 "전부 허용"이 아닙니다. **allow를 넓히고 deny를 단단히** — 되돌릴 수 있는 것은 풀고, 되돌리기 어려운 것은 잠급니다.`,
          illustration: {
            type: "grid",
            title: "권한 모드 스펙트럼",
            items: [
              {
                label: "default",
                sublabel: "행동마다 확인 — 낮에 지켜볼 때",
                icon: "message",
                tone: "muted",
              },
              {
                label: "plan (플랜 모드)",
                sublabel: "읽기와 계획만 — 실행 전 검토",
                icon: "eye",
                tone: "accent",
              },
              {
                label: "acceptEdits",
                sublabel: "파일 편집 자동 승인 — 야간의 출발점",
                icon: "check",
                tone: "primary",
              },
              {
                label: "bypassPermissions",
                sublabel: "전부 자동 — 격리된 컨테이너 전용",
                icon: "alert",
                tone: "warning",
              },
            ],
            caption: "모드로 큰 방향을 정하고, allow/deny 목록으로 정밀하게 조입니다.",
          },
        },
        {
          slug: "night-guardrails",
          title: "야간 가드레일: Hook과 안전장치",
          minutes: 5,
          content: `권한이 문단속이라면, Hook은 **밤새 순찰하는 경비원**입니다. Hook(특정 순간마다 자동 실행되는 스크립트)은 팀원의 행동 사이사이에 끼어들어 기계적으로 규칙을 강제합니다.

## PreToolUse: 실행 직전의 검문소

PreToolUse Hook은 팀원이 도구를 실행하기 **직전**에 내 스크립트를 먼저 돌립니다. 스크립트가 종료 코드 2로 끝나면 그 행동은 **차단**되고, 차단 사유가 에이전트에게 전달되어 다른 방법을 찾게 됩니다.

\`\`\`json
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "./check-danger.sh" }
        ]
      }
    ]
  }
}
\`\`\`

\`check-danger.sh\`는 실행될 명령을 검사해 위험 패턴(예: \`rm\`이 포함된 명령)이면 종료 코드 2로 끝나는 짧은 스크립트입니다. deny 규칙과 겹쳐 두면 **이중 잠금**이 됩니다.

## 끝났을 때 알리기

- **Stop** — 에이전트가 응답을 마칠 때 실행. 작업 완료 알림을 보내기 좋습니다.
- **SessionEnd** — 세션이 종료될 때 실행. "밤샘 근무 종료" 신호로 쓸 수 있습니다.
- **Notification** — 확인이 필요해 멈췄을 때 실행. 밤중에 팀이 조용히 멈춰 있는 걸 아침에야 발견하는 사태를 막아 줍니다.

## 상한과 예산 감각

'루프 엔지니어링'의 가드레일이 **프롬프트 속 약속**이었다면, Hook은 **시스템이 강제하는 규칙**입니다. 사람이 없는 밤에는 약속보다 강제가 필요합니다.

- 반복 상한("최대 3회")은 브리핑 프롬프트에 명시합니다.
- 팀원 수는 곧 토큰 배수입니다 — 밤샘 팀은 3~5명 규모로 시작하세요.

> 💡 **핵심**: 밤의 안전장치는 3중입니다 — **deny(잠금) + PreToolUse(검문) + 알림 Hook(보고)**. 약속(프롬프트)이 아니라 구조(설정)로 지킵니다.`,
          illustration: {
            type: "flow",
            title: "Hook이 지키는 야간 작업 흐름",
            nodes: [
              {
                label: "팀원이 명령 실행 시도",
                sublabel: "예: 빌드, 파일 정리, 커밋",
                icon: "bot",
                tone: "primary",
              },
              {
                label: "PreToolUse 검문",
                sublabel: "위험 패턴이면 종료 코드 2 → 차단",
                icon: "shield",
                tone: "warning",
              },
              {
                label: "실행 및 작업 계속",
                sublabel: "통과한 명령만 실제로 실행",
                icon: "zap",
                tone: "accent",
                edgeLabel: "검문 통과 시",
              },
              {
                label: "Stop · SessionEnd 알림",
                sublabel: "작업 종료를 사람에게 보고",
                icon: "send",
                tone: "success",
              },
            ],
            loopBack: { from: 1, to: 0, label: "차단 — 사유가 전달되고 다른 방법 모색" },
            caption: "검문에 걸리면 멈추는 게 아니라, 사유를 듣고 안전한 경로로 다시 시도합니다.",
          },
        },
        {
          slug: "night-shift",
          title: "밤샘 근무 지시서: 저녁에 시키고 아침에 받기",
          minutes: 6,
          content: `퇴근하는 매니저가 야간 근무자에게 남기는 인수인계 메모를 떠올려 보세요. 좋은 메모에는 할 일만이 아니라 **막혔을 때의 행동 요령**까지 적혀 있습니다. 밤샘 브리핑도 똑같습니다.

## 밤샘 브리핑의 5요소

프로젝트에 \`night-briefing.md\`를 만들고 다섯 가지를 채웁니다.

\`\`\`text
[목표] TODO.md의 작업을 위에서부터 처리한다.
[우선순위] 1) 실패 테스트 수정 2) 로그인 기능 3) 리팩토링
[완료 기준] npm run test 전부 통과한 것만 완료로 표시.
[막혔을 때] 같은 에러 3회 반복이면 그 작업은 건너뛰고
  BLOCKED.md에 상황을 기록한 뒤 다음 작업으로 넘어가라.
[아침 보고] MORNING_REPORT.md에 완료/보류/막힌 것 정리.
  작업 하나 끝날 때마다 git 커밋을 남겨라.
\`\`\`

특히 **[막혔을 때]**가 무인 운영의 핵심입니다. 이 규칙이 없으면 팀은 새벽 1시에 만난 에러 하나를 아침까지 붙잡고 있습니다.

## headless로 실행하기

\`claude -p\`는 대화 화면 없이 프롬프트 하나를 받아 끝까지 수행하고 종료하는 **headless(비대화형) 실행**입니다. 스크립트와 예약 실행의 재료죠.

\`\`\`bash
# 저녁에 한 번 실행하고 퇴근
claude -p "night-briefing.md를 읽고 그대로 수행하라" \\
  --permission-mode acceptEdits

# cron(정해진 시각에 명령을 자동 실행하는 예약 도구)에
# 등록하면 매일 밤 10시에 자동 출근합니다
\`\`\`

앞 레슨의 allow/deny와 Hook이 설정된 상태라는 전제입니다 — 브리핑은 그 안전망 **위에서** 도는 겁니다.

## 중간 저장은 커밋으로

"작업 하나 끝날 때마다 커밋"이라는 한 줄이 밤샘 운영의 블랙박스를 만듭니다.

- 아침에 커밋 로그만 훑어도 밤새 무슨 일이 있었는지 재구성됩니다.
- 마지막에 뭔가 잘못됐어도, 커밋 단위로 **되돌릴 수** 있습니다.

> 💡 **핵심**: 밤샘 브리핑 = 목표 + 우선순위 + 완료 기준 + **막혔을 때 규칙** + 아침 보고 형식. 그리고 \`claude -p\`로 맡기고 퇴근합니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "밤샘 근무 세션 로그",
            lines: [
              { text: "claude -p \"night-briefing.md를 읽고 수행하라\" --permission-mode acceptEdits", tone: "cmd" },
              { text: "22:05 브리핑 확인 — 작업 3건 접수", tone: "dim" },
              { text: "23:12 ✓ 실패 테스트 3건 수정 — 커밋", tone: "ok" },
              { text: "01:40 ✓ 로그인 기능 구현, 테스트 통과 — 커밋", tone: "ok" },
              { text: "03:05 ✕ DB 설정 변경 3회 실패", tone: "err" },
              { text: "03:06 규칙에 따라 건너뜀 — BLOCKED.md 기록", tone: "dim" },
              { text: "05:58 ✓ MORNING_REPORT.md 작성 완료", tone: "ok" },
              { text: "# 아침의 나에게: 완료 2 / 막힘 1 (상세는 보고서)", tone: "comment" },
            ],
            caption: "막혔을 때 규칙 덕분에 팀이 에러 하나에 밤을 새우지 않았습니다.",
          },
        },
        {
          slug: "morning-review",
          title: "아침 점검 루틴과 팀 개선",
          minutes: 5,
          content: `아침에 커피를 들고 자리에 앉으면, 밤새 일한 팀의 보고가 기다리고 있습니다. 무인 운영의 마지막 조각은 **사람의 검수** — 그리고 검수에서 배운 것을 팀에 되돌려 넣는 습관입니다.

## 아침에 볼 것 3가지 (순서대로)

1. **커밋 로그** — \`git log --oneline\`으로 밤새 작업의 큰 그림부터. 커밋이 없다면 팀이 일찍 멈췄다는 신호입니다.
2. **테스트 결과** — \`TEST_REPORT.md\`를 읽고, 테스트를 직접 한 번 다시 돌려 봅니다. 보고서와 실제가 다르면 그게 첫 번째 조사 대상입니다.
3. **잔여 작업** — \`MORNING_REPORT.md\`와 \`BLOCKED.md\`에서 보류·막힌 항목을 확인하고 오늘 계획에 반영합니다.

## 검수와 반려

결과물이 마음에 안 들면 사람도 반려하면 됩니다. 요령은 팀 내부의 반려와 같습니다 — **구체적으로**.

- 나쁜 반려: "로그인이 좀 이상해요"
- 좋은 반려: "로그인 실패 시 에러 문구가 안 보임. SPEC 4번 기준으로 수정하고 테스트 추가해줘"

## 팀도 루프처럼 개선한다

같은 실패가 반복되면 그건 팀원의 실수가 아니라 **지시서의 구멍**입니다.

- 테스터가 빈 입력 버그를 놓쳤다 → tester.md에 "빈 입력·아주 긴 입력을 반드시 확인하라" 추가.
- 개발자가 명세에 없는 기능을 만들었다 → developer.md의 금지 조항을 더 구체적으로.
- 사용량도 주기적으로 확인하세요. 팀원 수만큼 토큰이 배로 들어가니, 며칠 지켜보고 **일이 없는 역할은 줄이는 것**도 개선입니다.

이 사이클이 돌기 시작하면, 팀은 매일 밤 조금씩 더 좋아집니다. 여러분이 자는 동안에도요.

> 💡 **핵심**: 아침 루틴 = **커밋 로그 → 테스트 → 잔여 확인**, 그리고 실패 원인을 **역할 지시서에 반영**. 팀을 개선하는 것도 결국 하나의 루프입니다.`,
          illustration: {
            type: "cycle",
            title: "매일 도는 팀 개선 루프",
            center: "팀이 매일 밤 좋아진다",
            nodes: [
              { label: "저녁: 브리핑 작성", sublabel: "목표·기준·막힘 규칙", icon: "clipboard" },
              { label: "밤: 무인 실행", sublabel: "claude -p + 안전장치", icon: "clock" },
              { label: "아침: 점검·검수", sublabel: "커밋 → 테스트 → 잔여", icon: "eye" },
              { label: "개선: 지시서 반영", sublabel: "실패 원인을 규칙으로", icon: "wrench" },
            ],
            caption: "검수에서 배운 것을 지시서에 되돌려 넣는 순간, 운영이 성장으로 바뀝니다.",
          },
        },
      ],
    },
  ],
};
