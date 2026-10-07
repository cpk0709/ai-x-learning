# AI-X Learn

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React%2019-087EA4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)

**일러스트 기반 스텝바이스텝으로 배우는 종합 AI 활용 학습 플랫폼.**

유튜브·논문·블로그에 파편화된 AI 기술 정보를 큐레이션해, 한 화면에 하나의 개념씩 — 다이어그램·시뮬레이션 데모·용어 툴팁과 함께 초보자도 끝까지 따라갈 수 있게 만든 학습 서비스입니다. 환경변수 없이 `npm run dev` 한 번으로 전체 기능이 동작합니다.

## 주요 기능

- **강의 34개 / 레슨 420개 / 5개 카테고리** — 2026년 최신 기준, 전 강의 웹 검색 팩트체크 완료 (에이전틱 워크플로우, AI 하네스/Evals, MCP, RAG, AI 게임 개발, Runway·Veo·Kling, Figma AI, Suno·ElevenLabs, Make.com·n8n 자동화, AI 수익화, AI 시대의 PM, AX 팀 구축·운영, 생활 부동산 4단계, Docker·Kubernetes·Datadog 인프라 & DevOps 6단계, **공인중개사 자격시험 5과목 대비 6강의, **토큰 절약의 기술**)
- **핵심 UI**: 한 화면에 하나의 개념 — 좌측 텍스트 + 우측 일러스트 스플릿 뷰, [이전/다음 단계] 스텝 네비게이션 (키보드 ←/→ 지원)
- **일러스트 시스템**: 이미지 파일 대신 구조화된 데이터(flow/cycle/compare/stack/steps/grid/terminal/chat)를 커스텀 렌더러가 그려 420개 레슨 전체의 비주얼 일관성 보장
- **따라하기 데모 (시뮬레이션 스크린캐스트)**: 실무 도구 화면(코드 에디터·디자인 캔버스·Make 자동화·Slack·Gmail·브라우저)을 재현하고, 커서가 움직이며 클릭(물결 1회)·더블클릭(물결 2회)·타이핑·드래그를 시연 — 재생/일시정지/배속 지원
- **용어 툴팁**: 어려운 용어(700여 개)의 첫 등장에 자동으로 점선 밑줄 — 마우스를 올리면(모바일은 탭) 초보자 눈높이 설명 표시 (`src/content/glossary.ts`)
- **초보자 최적화 콘텐츠**: 전 레슨이 일상 비유·첫 등장 용어 풀이·구체적 따라하기 단계("여기서 막힌다면" 안내 포함)로 작성됨
- **진도 트래킹**: [다음 단계] 클릭 시 자동 저장, 이어보기, 코스별 진도율
- **게이미피케이션**: 배지 8종, 학습 잔디(최근 18주), 연속 학습 스트릭
- **이중 모드**: Supabase 없이 데모(게스트) 모드로 완전 동작 → 환경변수만 넣으면 인증 + DB 동기화 활성화
- 라이트/다크 모드, 모바일 반응형

## 기술 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Zustand · Supabase (PostgreSQL + Auth + RLS) · react-markdown

## 빠른 시작 (데모 모드)

```bash
npm install
npm run dev
```

http://localhost:3000 접속. **환경변수 없이 모든 기능이 동작**하며, 진도는 브라우저 localStorage에 저장됩니다.

## Supabase 연동 (선택)

1. [supabase.com](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 순서대로 실행:
   - `supabase/migrations/0001_init.sql` — 5개 테이블(users/courses/modules/lessons/user_progress) + RLS 정책
   - `supabase/migrations/0002_category_check.sql` — 카테고리 확장(부동산·인프라 & DevOps) check 제약 갱신
   - `supabase/seed.sql` — 강의 콘텐츠 시드 (자동 생성 파일)
3. `.env.example`을 `.env.local`로 복사하고 프로젝트의 URL/anon key 입력:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

4. (소셜 로그인) Supabase 대시보드 > Authentication > Providers에서 Google/GitHub 활성화, Redirect URL에 `{배포주소}/auth/callback` 추가

로그인하면 레슨 완료 이벤트가 `user_progress` 테이블에 upsert되고, 다른 기기에서 로그인 시 원격 진도가 로컬과 병합됩니다.

## 아키텍처 노트

**콘텐츠의 단일 소스는 코드입니다** (`src/content/courses/*.ts`).

- 앱은 이 데이터를 직접 읽어 420개 레슨 페이지를 **정적 생성(SSG)** 합니다 — 콘텐츠 조회에 DB 왕복이 없습니다.
- `npm run seed:generate` 가 동일 데이터를 `supabase/seed.sql`로 변환합니다 (슬러그 기반 결정적 UUID → 재실행해도 안전한 upsert).
- DB는 인증과 진도(user_progress) 동기화에 사용합니다. PRD의 `user_progress.lesson_id` 대신 안정적인 `lesson_key`("코스슬러그/레슨슬러그", `lessons.key` 참조)로 매칭합니다 — 콘텐츠 재시드에도 진도가 유지됩니다.

## 새 강의 추가하기

1. `src/content/courses/새강의.ts` 생성 — `Course` 타입(`src/content/types.ts`)을 따르고, 스타일은 `loop-engineering.ts`(품질 기준)를 참고
2. `src/content/index.ts`의 `COURSES` 배열에 등록
3. `npm run seed:generate`로 시드 갱신

일러스트는 8가지 타입(flow/cycle/compare/stack/steps/grid/terminal/chat)의 구조화 데이터로 정의하면 `src/components/illustrations/illustration.tsx`의 렌더러가 그립니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── (site)/              # 푸터 있는 일반 페이지 (홈·탐색·상세·대시보드·로그인)
│   ├── learn/[courseSlug]/[lessonSlug]/   # 몰입형 스텝 뷰어 (푸터 없음)
│   └── auth/callback/       # OAuth 콜백
├── content/                 # ★ 강의 콘텐츠 (단일 소스)
│   ├── types.ts             # Course/Lesson/Illustration 타입
│   └── courses/*.ts         # 강의 34개
├── components/
│   ├── illustrations/       # 일러스트 렌더러 (8종)
│   ├── learn/               # 스텝 뷰어, 마크다운 렌더러
│   ├── course/              # 카드·탐색기·커리큘럼·CTA
│   ├── dashboard/           # 대시보드, 잔디 그래프
│   └── layout/, auth/, ui/  # GNB·푸터, 로그인 폼, shadcn/ui
├── store/progress.ts        # Zustand 진도 스토어 (localStorage 영속)
├── lib/                     # supabase 클라이언트, 진도 동기화, 게이미피케이션
└── hooks/use-user.ts        # 인증 상태 훅
supabase/
├── migrations/0001_init.sql # 스키마 + RLS
└── seed.sql                 # 자동 생성 시드 (직접 수정 금지)
scripts/generate-seed.ts     # 콘텐츠 → 시드 SQL 변환기
```

## 배포

### GitHub Pages (기본 — 자동 배포 중)

`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/deploy-pages.yml`)가 정적 내보내기(`GITHUB_PAGES=true npm run build` → `out/`)를 빌드해 자동 배포합니다.

- **배포 주소**: https://cpk0709.github.io/ai-x-learning/
- 데모(게스트) 모드로 완전 동작 — 진도는 브라우저에 저장됩니다
- 정적 호스팅 특성상 basePath(`/ai-x-learning`)와 trailingSlash가 적용됩니다 (로컬 개발에는 영향 없음)

### Vercel (Supabase 연동 시 권장)

1. Vercel에서 이 저장소 Import
2. (Supabase 사용 시) 환경변수 2개 추가
3. Deploy — 레슨·강의·정적 페이지 460여 개가 정적 생성됩니다

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (타입체크 포함) |
| `npm run seed:generate` | 콘텐츠 → `supabase/seed.sql` 재생성 |
| `npm run content:check` | 콘텐츠 무결성 검증 (데모 target 참조, 슬러그 중복 등) |
| `npm run lint` | ESLint |

## 문서

- [`docs/DEVLOG.md`](docs/DEVLOG.md) — 개발 과정의 시행착오·버그·해결 기록과 아키텍처 결정(ADR). 버전별(v0.1 초기 구축 → v0.2 데모 시스템 → v0.3 팩트체크·강의 확충 → v0.4 초보자 눈높이·용어 툴팁 → v0.5~0.7 강의 확충·부동산 카테고리 → v0.8 인프라 & DevOps 카테고리 → v0.9 공인중개사 자격시험 과정 → v0.10 토큰 절약 강의) 히스토리 포함
- [`CLAUDE.md`](CLAUDE.md) — 개발 원칙, 콘텐츠 작성 규칙, 기술 스택 주의사항 (AI 어시스턴트와 협업 시 자동 로드)
- [`docs/PRD.md`](docs/PRD.md) — 최초 기획서 (제품 요구사항 정의서)

## 라이선스

학습·데모 목적의 프로젝트입니다. 강의 콘텐츠에 언급된 서비스·상표는 각 소유자의 자산입니다.
