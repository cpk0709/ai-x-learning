import type { Category, Course } from "./types";
import { aiHarness } from "./courses/ai-harness";
import { loopEngineering } from "./courses/loop-engineering";
import { promptEngineeringRag } from "./courses/prompt-engineering-rag";
import { aiCodingTools } from "./courses/ai-coding-tools";
import { aiDesign } from "./courses/ai-design";
import { aiVideo } from "./courses/ai-video";
import { aiAudio } from "./courses/ai-audio";
import { nocodeAutomation } from "./courses/nocode-automation";
import { snsAutoBot } from "./courses/sns-auto-bot";
import { aiPassiveIncome } from "./courses/ai-passive-income";

/**
 * 강의 레지스트리 — 카테고리 내 표시 순서대로 나열합니다.
 * 새 강의를 추가하려면 courses/ 에 파일을 만들고 여기에 등록하세요.
 */
export const COURSES: Course[] = [
  // Track 1: AI 개발
  loopEngineering,
  aiHarness,
  promptEngineeringRag,
  aiCodingTools,
  // Track 2: 크리에이티브
  aiDesign,
  aiVideo,
  aiAudio,
  // Track 3: 비즈니스 자동화
  nocodeAutomation,
  snsAutoBot,
  aiPassiveIncome,
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: Category): Course[] {
  return COURSES.filter((c) => c.category === category);
}
