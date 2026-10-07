import type { Category, Course } from "./types";
import { aiHarness } from "./courses/ai-harness";
import { loopEngineering } from "./courses/loop-engineering";
import { aiAgentTeam } from "./courses/ai-agent-team";
import { promptEngineeringRag } from "./courses/prompt-engineering-rag";
import { tokenSaving } from "./courses/token-saving";
import { aiCodingTools } from "./courses/ai-coding-tools";
import { aiGameDev } from "./courses/ai-game-dev";
import { aiDesign } from "./courses/ai-design";
import { aiVideo } from "./courses/ai-video";
import { aiAudio } from "./courses/ai-audio";
import { figmaProductDesign } from "./courses/figma-product-design";
import { nocodeAutomation } from "./courses/nocode-automation";
import { n8nAutomation } from "./courses/n8n-automation";
import { snsAutoBot } from "./courses/sns-auto-bot";
import { aiPassiveIncome } from "./courses/ai-passive-income";
import { aiPm } from "./courses/ai-pm";
import { axTeam } from "./courses/ax-team";
import { genAiOfficeBasics } from "./courses/gen-ai-office-basics";
import { dockerBasics } from "./courses/docker-basics";
import { dockerProduction } from "./courses/docker-production";
import { kubernetesBasics } from "./courses/kubernetes-basics";
import { kubernetesProduction } from "./courses/kubernetes-production";
import { datadogBasics } from "./courses/datadog-basics";
import { datadogAdvanced } from "./courses/datadog-advanced";
import { realEstateBasics } from "./courses/real-estate-basics";
import { realEstateFirstHome } from "./courses/real-estate-first-home";
import { realEstateMarketTax } from "./courses/real-estate-market-tax";
import { realEstateAdvanced } from "./courses/real-estate-advanced";
import { realtorExamRoadmap } from "./courses/realtor-exam-roadmap";
import { realtorRealEstateTheory } from "./courses/realtor-real-estate-theory";
import { realtorCivilLaw } from "./courses/realtor-civil-law";
import { realtorBrokerageLaw } from "./courses/realtor-brokerage-law";
import { realtorPublicLaw } from "./courses/realtor-public-law";
import { realtorRegistrationAndTax } from "./courses/realtor-registration-and-tax";

/**
 * 강의 레지스트리 — 카테고리 내 표시 순서대로 나열합니다.
 * 새 강의를 추가하려면 courses/ 에 파일을 만들고 여기에 등록하세요.
 */
export const COURSES: Course[] = [
  // Track 1: AI 개발 — 학습 순서(입문 → 심화)대로 나열
  aiCodingTools, // beginner: AI 코딩 도구 첫걸음
  aiAgentTeam, // beginner: 도구에 익숙해진 뒤 멀티 에이전트 입문
  promptEngineeringRag, // intermediate: 프롬프트 설계 원리와 RAG
  tokenSaving, // intermediate: 프롬프트 다음 단계 — 같은 결과를 더 적은 토큰으로
  loopEngineering, // intermediate: 프롬프트 위에 에이전틱 워크플로우 설계
  aiGameDev, // intermediate: 응용 프로젝트
  aiHarness, // advanced: 평가·테스트 프레임워크
  // Track 1.5: 인프라 & DevOps — 학습 순서(입문 → 심화)대로 나열
  dockerBasics, // beginner: 컨테이너 개념과 Docker 기본기
  dockerProduction, // intermediate: 이미지 최적화·보안·CI
  kubernetesBasics, // intermediate: 오케스트레이션 입문
  datadogBasics, // intermediate: 관측가능성과 모니터링 시작
  kubernetesProduction, // advanced: 프로덕션 클러스터 운영
  datadogAdvanced, // advanced: APM·SLO·인시던트
  // Track 2: 크리에이티브 — 학습 순서(입문 → 심화)대로 나열
  aiDesign, // beginner: 이미지 생성 기초
  aiAudio, // beginner: 음악·더빙
  aiVideo, // intermediate: 이미지 다음 단계인 영상 제작
  figmaProductDesign, // intermediate: 프로덕트 디자인 전문 워크플로우
  // Track 3: 비즈니스 & 커리어 — 학습 순서(입문 → 심화)대로 나열
  genAiOfficeBasics, // beginner: 생성형 AI 첫 강의 (플랫폼 진입점)
  nocodeAutomation, // beginner: 자동화 기초 도구
  aiPassiveIncome, // beginner: 자동화를 활용한 수익화
  aiPm, // beginner: 개념 중심 커리어 강의
  snsAutoBot, // intermediate: Make 위에 AI API 결합
  n8nAutomation, // intermediate: 셀프호스팅 자동화 심화
  axTeam, // intermediate: 조직 단위 AI 전환
  // Track 4: 부동산 — 학습 순서(입문 → 초보 → 중급 → 고급)대로 나열
  realEstateBasics, // beginner(입문): 전월세·계약·보증금 지키기
  realEstateFirstHome, // beginner(초보): 청약·대출·매매 내 집 마련
  realEstateMarketTax, // intermediate(중급): 시장 분석과 세금 설계
  realEstateAdvanced, // advanced(고급): 경매·재개발·절세 전략
  // Track 4-2: 공인중개사 자격시험 시리즈 — 같은 카테고리지만 별도 시리즈라 생활 부동산 뒤에 묶어 두고, 시리즈 안에서 난이도(시험 과목 순)대로 나열
  realtorExamRoadmap, // beginner: 시험 제도·전략 (시리즈 진입점)
  realtorRealEstateTheory, // intermediate: 1차 부동산학개론
  realtorCivilLaw, // intermediate: 1차 민법 및 민사특별법
  realtorBrokerageLaw, // intermediate: 2차 공인중개사법령 및 중개실무
  realtorPublicLaw, // advanced: 2차 부동산공법
  realtorRegistrationAndTax, // advanced: 2차 부동산공시법 및 부동산세법
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: Category): Course[] {
  return COURSES.filter((c) => c.category === category);
}
