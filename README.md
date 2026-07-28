# AI-X Learn

일러스트 기반 스텝바이스텝으로 배우는 종합 AI 활용 학습 플랫폼.

- **강의 10개 / 레슨 103개** — 2026년 최신 트렌드 기준 (에이전틱 워크플로우, AI 하네스/Evals, MCP, RAG, Sora·Runway, Suno·ElevenLabs, Make.com 자동화, AI 수익화)
- **핵심 UI**: 한 화면에 하나의 개념 — 좌측 텍스트 + 우측 일러스트 스플릿 뷰, [이전/다음 단계] 스텝 네비게이션 (키보드 ←/→ 지원)
- **일러스트 시스템**: 이미지 파일 대신 구조화된 데이터(flow/cycle/compare/stack/steps/grid/terminal/chat)를 커스텀 렌더러가 그려 103개 레슨 전체의 비주얼 일관성 보장
- **따라하기 데모 (시뮬레이션 스크린캐스트)**: 실무 도구 화면(코드 에디터·디자인 캔버스·Make 자동화·Slack·Gmail·브라우저)을 재현하고, 커서가 움직이며 클릭(물결 1회)·더블클릭(물결 2회)·타이핑·드래그를 시연 — 재생/일시정지/배속 지원
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

- 앱은 이 데이터를 직접 읽어 103개 레슨 페이지를 **정적 생성(SSG)** 합니다 — 콘텐츠 조회에 DB 왕복이 없습니다.
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
│   └── courses/*.ts         # 강의 10개
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

## 배포 (Vercel)

1. GitHub에 푸시 후 Vercel에서 Import
2. (Supabase 사용 시) 환경변수 2개 추가
3. Deploy — 121개 페이지가 정적 생성됩니다

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (타입체크 포함) |
| `npm run seed:generate` | 콘텐츠 → `supabase/seed.sql` 재생성 |
| `npm run content:check` | 콘텐츠 무결성 검증 (데모 target 참조, 슬러그 중복 등) |
| `npm run lint` | ESLint |
