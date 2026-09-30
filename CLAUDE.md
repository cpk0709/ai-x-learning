@AGENTS.md

# AI-X Learn 개발 가이드

일러스트 기반 스텝바이스텝 AI 학습 플랫폼. 아키텍처 개요와 실행 방법은 `README.md`, 기획 원본은 `../AI_Mastery_Platform_PRD.md`, 시행착오 기록은 `docs/DEVLOG.md` 참고.

## 개발 방향 (변하지 않는 원칙)

1. **콘텐츠의 단일 소스는 코드** — 강의는 `src/content/courses/*.ts`가 원본이다. DB(Supabase)는 인증·진도 동기화 전용이며, 콘텐츠를 DB에서 읽도록 바꾸지 않는다. 콘텐츠 변경 후에는 반드시 `npm run seed:generate`로 시드를 재생성한다.
2. **일러스트는 데이터, 렌더링은 렌더러** — 레슨 비주얼은 8종 타입(flow/cycle/compare/stack/steps/grid/terminal/chat)의 구조화 데이터로만 정의한다. 개별 레슨용 커스텀 컴포넌트나 이미지 파일을 만들지 말 것. 새 비주얼이 필요하면 `illustration.tsx`에 타입을 추가해 전체가 일관되게 한다.
3. **데모 모드 우선** — 모든 기능은 Supabase 환경변수 없이 동작해야 한다. Supabase 의존 코드는 항상 null 체크 후 조용히 no-op (`src/lib/supabase/client.ts` 패턴).
4. **품질 기준은 loop-engineering.ts** — 새 강의를 쓰거나 에이전트에게 집필시킬 때 이 파일을 스타일 가이드로 참조시킨다 (톤·분량·마크다운 구조·일러스트 활용법).
5. 검증 파이프라인: `npx tsc --noEmit` → `npm run lint` → `npm run content:check` → `npm run build`. 전부 통과해야 커밋한다.
6. **따라하기 데모는 데이터 + 플레이어** — 레슨의 `demo` 필드(DemoScene)는 앱 템플릿 6종(code-editor/browser/design-canvas/automation-canvas/chat-app/email-app) 위에서 커서·클릭 물결·타이핑을 시연하는 시뮬레이션 스크린캐스트다. 실제 영상 파일을 쓰지 않는다. 새 도구 화면이 필요하면 `demo-apps.tsx`에 템플릿을 추가한다.

## 콘텐츠 작성 규칙 (실수 방지 — 근거는 DEVLOG 참고)

- **사실 검증**: 도구명·버전·파라미터·정책·수치는 반드시 웹 검색으로 검증 후 기술. 확인 못한 버전 번호는 쓰지 말고 버전 비의존적으로. 특정 서비스명을 강의 제목/태그에 넣을 때는 종료 리스크 고려 (Sora 사례 — DEVLOG v0.3).
- 콘텐츠 집필/수정 에이전트에게는 "WebSearch 최소 N회 + 중점 검증 대상"을 명시할 것.

- 레슨 `content`는 TS 템플릿 리터럴이다. **본문 안의 모든 백틱은 `\`` 로 이스케이프** (코드펜스 ```` \`\`\` ````, 인라인 코드 모두). 미이스케이프 시 파일 전체가 구문 에러.
- 마크다운에서 `**"따옴표 포함 볼드"**한글`, `**괄호(설명)**한글`처럼 볼드 끝이 문장부호이고 바로 뒤에 조사가 붙는 패턴은 CommonMark 규칙상 볼드가 풀리지만, 렌더러(`lesson-markdown.tsx`의 `fixBoldQuotes`)가 문장부호를 볼드 밖으로 옮겨 자동 보정하므로 콘텐츠는 자연스럽게 쓰면 된다. 단, 이 전처리를 제거하지 말 것.
- `IconKey`는 `src/content/types.ts`에 정의된 값만 사용. lucide 아이콘을 임의로 추가하려면 `icon-map.tsx`에 먼저 등록.
- 강의 추가 절차: ① `courses/새강의.ts` 작성 → ② `src/content/index.ts` COURSES에 등록 → ③ `npm run seed:generate` → ④ 빌드 확인.
- **카테고리 추가 시 갱신할 곳(6곳)**: ① `types.ts`의 `Category` 유니온 + `CATEGORY_META` ② `course-explorer.tsx` TABS ③ `navbar.tsx` ④ `footer.tsx` ⑤ **`app/(site)/page.tsx`의 `CATEGORIES` 배열(홈 섹션 — 빠뜨리면 홈에 노출되지 않음, 부동산 카테고리가 실제로 누락됐던 사례)** ⑥ `supabase/migrations/`에 category check 제약을 넓히는 새 마이그레이션 추가(0002 참고).
- **용어사전 추가 시**: 한글 키는 앞쪽 한글 경계만 검사하므로(뒤 조사는 허용, 영문은 양쪽 단어 경계) "나지 않는다"의 "나지"처럼 문장 속 우연한 2글자 일치는 여전히 걸린다. 그런 키는 등록하지 말고, "태그"·"볼륨"·"차트"·"이미지"·"에이전트"처럼 다른 도메인에서 다른 뜻으로 쓰이는 일반 명사는 단독 등록하지 말고 "이미지 태그"·"Docker 볼륨"·"Helm 차트"·"Datadog Agent"처럼 한정어를 붙여 등록하고, 콘텐츠도 그 표기로 쓴다. 동음이의어가 불가피하면 기존 정의에 병합(노드·오케스트레이션·트레이스 사례).
- **데모 작성 시**: 액션의 target은 반드시 앱 요소 id와 일치해야 한다 (오타는 타입체크로 못 잡고 데모가 조용히 깨짐) — 작성 후 `npm run content:check`로 검증 필수. 스타일 기준은 loop-engineering.ts의 demo 2곳 (caption ①②③ 단계 안내, 액션 15~25개, type 텍스트 40자 이내).
- **초보자 눈높이**: 긴 문장은 쪼개고, 핵심 개념엔 일상 비유 1개, 실습은 버튼 위치까지 구체적으로 + "여기서 막힌다면" 안내. `src/content/glossary.ts`에 등재된 용어는 자동 툴팁이 뜨므로 본문에서 재설명하지 말 것. 등재 안 된 어려운 용어는 첫 등장에 괄호 한 줄 풀이. **본문 표기와 용어사전 표기를 일치**시켜야 툴팁이 걸린다 (예: '환각' 대신 '할루시네이션').

## 기술 스택 주의사항

- **Next.js 16**: `params`/`searchParams`는 Promise — 반드시 `await`. 새 페이지 작성 시 기존 페이지 패턴을 복사할 것.
- **shadcn CLI**: `-b` 옵션은 base color가 아니라 컴포넌트 라이브러리(radix/base/aria). 컴포넌트 추가는 `npx shadcn@latest add <name>`.
- **lucide-react**: 브랜드 아이콘(Github 등)이 제거됨 — 필요하면 인라인 SVG로 (auth-form.tsx 패턴).
- **개발/프로덕션 서버 재시작**: `pkill -f "next start"`는 프로세스를 못 잡는 경우가 있다. 반드시 `lsof -ti :포트 | xargs kill -9`로 포트 기준으로 정리할 것. 죽지 않은 옛 서버가 새 빌드의 CSS 해시와 어긋나 스타일이 통째로 깨진 것처럼 보인다.
- `next.config.ts`의 `turbopack.root` 고정은 홈 디렉토리의 잘못된 package-lock.json 때문 — 제거하지 말 것.

## 히스토리 관리

- 시행착오·버그의 원인과 해결은 `docs/DEVLOG.md`에 누적 기록한다 (날짜, 증상, 원인, 해결, 교훈).
- 같은 실수가 반복되지 않도록, DEVLOG에 기록한 교훈 중 "규칙화할 것"은 이 파일(CLAUDE.md)에도 승격시킨다.
- 커밋 메시지는 상세하게: 무엇을/왜 변경했는지, 관련 시행착오가 있으면 언급.
