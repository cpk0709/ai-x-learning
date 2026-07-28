# AI 활용 마스터리 플랫폼 (가칭: AI-X Learn) 프로젝트 기획서 및 요구사항 정의서

> **Claude Code를 위한 특별 지시사항 (System Instructions for Claude Code)**
> 본 문서는 AI 코딩 어시스턴트(Claude Code)가 처음부터 끝까지 풀스택 웹 서비스를 구축하기 위한 상세 기획서이자 PRD(Product Requirements Document)입니다. 이 문서의 Phase(개발 진행 단계)에 따라 프로젝트를 세팅하고, 제시된 기술 스택과 데이터베이스 스키마를 바탕으로 작동하는 웹 서비스를 개발해 주세요. 사용자가 쉽게 이해할 수 있는 '일러스트레이션 중심의 스텝바이스텝 UI'를 구현하는 것이 핵심입니다.

## 1. 프로젝트 개요
- **프로젝트명:** AI-X Learn (가칭)
- **목적:** 인터넷에 파편화된 AI 기술 정보(유튜브, 유데미, 인프런, 논문, 블로그, 스택오버플로우 등)를 큐레이션하여, 누구나 이해하기 쉽게 일러스트 기반의 스텝바이스텝(Step-by-Step) 형태로 제공하는 종합 AI 활용 학습 플랫폼.
- **타겟 유저:** AI를 활용해 개발, 디자인, 영상 제작, 업무 자동화, 수익 창출을 이루고자 하는 모든 일반인 및 실무자.
- **주요 가치:** 텍스트나 긴 영상에 지친 학습자들을 위해, 핵심만 짚어주는 직관적인 시각 자료(일러스트, 다이어그램)와 직접 따라 해볼 수 있는 단계별 실습 환경 제공.

## 2. 핵심 기능 요구사항 (Core Features)

### 2.1. 사용자 관리 및 마이페이지
- **회원가입/로그인:** 이메일 및 소셜 로그인 (Google, Github) 지원.
- **마이페이지(대시보드):** 
  - 수강 중인 강의 목록 및 시각적인 진도율(Progress Bar, %) 표시.
  - 최근 학습한 강의의 마지막 스텝으로 바로가는 '이어보기' 기능.
  - 학습 달성도에 따른 게이미피케이션 요소 (배지, 잔디 심기 등).

### 2.2. 강의 및 커리큘럼 시스템
- **강의 탐색 (LMS):** 카테고리별 강의 리스트, 매력적인 썸네일, 난이도, 수강평 제공.
- **스텝바이스텝 학습 뷰어 (Core UI):** 
  - 스크롤 방식이 아닌, 한 화면에 하나의 개념/실습을 보여주는 **슬라이드 또는 카드 뷰 형태**.
  - 텍스트는 최소화하고, 우측 또는 상단에 **이해하기 쉬운 일러스트/플로우차트** 고정 배치.
  - 하단에 [이전 단계] / [다음 단계로 넘어가기] 버튼 배치.
- **진도 트래킹:** [다음 단계] 클릭 시 자동으로 DB에 유저의 해당 레슨 완료 상태 저장.

## 3. 상세 커리큘럼 카테고리 (Content Tracks)
*플랫폼에 등록될 초기 강의 데이터베이스 구성안입니다.*

### Track 1: 최신 트렌드 AI 개발 (AI for Developers)
- **AI 하네스(Harness) 구성:** LLM 평가, 테스트 프레임워크 구축 및 프롬프트 버전 관리 방법.
- **루프 엔지니어링 (Loop Engineering):** Agentic Workflow 구축, AI가 스스로 코드를 수정하고 검증하게 만드는 피드백 루프 설계.
- **프롬프트 엔지니어링 심화:** CoT(Chain of Thought), RAG(검색 증강 생성) 기초 및 실무 아키텍처 다이어그램 학습.
- **AI 코딩 툴 실전:** GitHub Copilot, Cursor, Claude를 결합하여 개발 생산성을 300% 향상시키는 스텝별 실습.

### Track 2: 크리에이티브 아트 (Design & Video)
- **AI 디자인:** Midjourney, Stable Diffusion을 활용한 프롬프트 작성법, 컨트롤넷(ControlNet)을 이용한 일관된 캐릭터/일러스트 생성, 상업용 웹 디자인 에셋 만들기.
- **AI 영상 제작:** Runway Gen-2, Sora, Pika 등을 활용한 텍스트-비디오 생성 및 캡컷(Capcut)과 연동한 숏폼 자동화 로직.
- **AI 음향 및 더빙:** Suno AI로 BGM 만들기, ElevenLabs로 자연스러운 AI 더빙 입히기.

### Track 3: 비즈니스 자동화 및 수익 창출 (Monetization & Automation)
- **자동 플로우 생성 (No-code Automation):** Zapier, Make.com의 노드(Node) 연결 일러스트를 통한 시각적 파이프라인 교육.
- **자동 SNS 업로드 시스템:** ChatGPT API + Make를 활용하여 매일 자동으로 인스타그램/블로그에 포스팅하는 봇 구축 가이드.
- **수익 창출 (Passive Income):** AI로 전자책 작성 및 자동 포맷팅, 스톡 이미지 대량 생성 및 판매 파이프라인.

## 4. 추천 기술 스택 (Tech Stack)
*Claude Code가 가장 빠르고 안정적으로 구축할 수 있는 모던 풀스택 환경입니다.*
- **Frontend:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (깔끔하고 모던한 UI 컴포넌트)
- **Backend & Database:** Supabase (PostgreSQL, Authentication, Row Level Security)
- **State Management:** Zustand (클라이언트 상태), TanStack Query (서버 상태)
- **Content Parsing:** `react-markdown` 또는 `MDX` (강의 내용 렌더링용)
- **Deployment:** Vercel

## 5. 데이터베이스 스키마 설계 (DB Schema)
Supabase (PostgreSQL) 기준으로 다음 테이블들을 생성합니다.

1. **`users`**
   - `id` (UUID, Primary Key, Auth 연동)
   - `email` (String)
   - `name` (String)
   - `created_at` (Timestamp)
2. **`courses`** (강의 대분류)
   - `id` (UUID, Primary Key)
   - `title` (String)
   - `description` (Text)
   - `thumbnail_url` (String)
   - `category` (String - 개발, 디자인, 수익창출 등)
3. **`modules`** (강의 내 챕터)
   - `id` (UUID, Primary Key)
   - `course_id` (UUID, Foreign Key)
   - `title` (String)
   - `order_index` (Integer)
4. **`lessons`** (상세 스텝/강의 내용)
   - `id` (UUID, Primary Key)
   - `module_id` (UUID, Foreign Key)
   - `title` (String)
   - `content_markdown` (Text - 일러스트 이미지 URL 및 마크다운 콘텐츠)
   - `illustration_url` (String - 우측/상단에 고정될 일러스트 이미지)
   - `order_index` (Integer)
5. **`user_progress`** (진도율 트래킹)
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key)
   - `lesson_id` (UUID, Foreign Key)
   - `completed` (Boolean, default: false)
   - `completed_at` (Timestamp)

## 6. 개발 진행 단계 (Implementation Phases)

- **Phase 1: 프로젝트 초기화 및 레이아웃 (Day 1)**
  - Next.js 프로젝트 생성, Tailwind 및 shadcn/ui 세팅.
  - 글로벌 네비게이션 바(GNB), 푸터 제작.
  - 플랫폼의 메인 랜딩 페이지(Hero 섹션, 카테고리별 강의 소개) UI 퍼블리싱.
- **Phase 2: 인증 및 DB 세팅 (Day 2)**
  - Supabase 연동 및 소셜/이메일 로그인 구현.
  - 제시된 5개의 테이블 스키마 생성 및 더미 데이터(Seed) 삽입.
- **Phase 3: 핵심 기능 - 스텝바이스텝 학습 뷰어 구현 (Day 3)**
  - 강의 목록(Course List) 및 상세 페이지 구현.
  - **[중요]** Lesson 화면 구현: 좌측은 텍스트(마크다운), 우측은 큰 일러스트가 배치되는 스플릿 뷰(Split View) UI 개발.
  - 다음 스텝으로 넘어가는 인터랙션 구현.
- **Phase 4: 학습 진도 트래킹 및 마이페이지 (Day 4)**
  - 사용자가 [다음 단계 완료] 버튼 클릭 시 `user_progress` 테이블에 업데이트하는 로직 구현.
  - 마이페이지 대시보드에 사용자의 수강 목록과 전체 진도율(%) 계산하여 Progress Bar로 표시.
- **Phase 5: 최적화 및 배포 (Day 5)**
  - 모바일 기기에서도 일러스트와 텍스트가 잘 보이도록 반응형(Responsive) 디자인 적용.
  - Vercel을 통한 배포 및 최종 테스트.
