import type { Element, ElementContent, Root } from "hast";
import { GLOSSARY_TERMS } from "@/content/glossary";

/**
 * 본문에서 용어사전 단어의 첫 등장을 찾아 <glossary-term term="..."> 요소로 감싸는
 * rehype 플러그인. 렌더링은 lesson-markdown.tsx의 components 매핑이 담당합니다.
 *
 * 왜 플러그인인가 (DEVLOG #11): 이전 구현은 p/li 컴포넌트 렌더 중에 공유 Set을
 * 변이시켜 "첫 등장" 판정이 렌더 횟수에 의존했고, Strict Mode 이중 렌더에서
 * 서버와 다른 위치에 툴팁이 붙어 hydration mismatch를 냈습니다.
 * 플러그인은 마크다운 처리 단계에서 문서 순서대로 1회에 판정하므로
 * 서버/클라이언트/이중 렌더 모두 같은 트리를 만듭니다.
 *
 * - 긴 용어 우선 매칭 ("시스템 프롬프트"가 "프롬프트"보다 먼저)
 * - 영문 용어는 단어 경계 검사 ("PR"이 "PRD" 안에서 매칭되지 않음)
 * - 한글 용어는 앞쪽 한글 경계 검사 ("프로그램" 안의 "로그"가 매칭되지 않음, 뒤의 조사는 허용)
 * - 레슨당 용어별 첫 등장 1회만 표시 (밑줄 남발 방지)
 * - p/li 내부 텍스트만 대상 (기존 동작 유지), 코드/링크 내부는 건드리지 않음
 */

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const TERM_REGEX = new RegExp(
  GLOSSARY_TERMS.map((t) => {
    // 영문·숫자 키: 양쪽 단어 경계. 한글 키: 앞쪽만 한글 경계 —
    // "프로그램" 안의 "로그", "나머지" 안의 "머지", "선택지" 안의 "택지"처럼
    // 다른 단어 속에 묻힌 매칭을 막되, 뒤에 붙는 조사("파드가")는 허용한다.
    const pre = /^[A-Za-z0-9]/.test(t)
      ? "(?<![A-Za-z0-9])"
      : /^[가-힣]/.test(t)
        ? "(?<![가-힣])"
        : "";
    const post = /[A-Za-z0-9]$/.test(t) ? "(?![A-Za-z0-9])" : "";
    return pre + escapeRegExp(t) + post;
  }).join("|"),
  "g"
);

const SKIP_TAGS = new Set(["code", "pre", "a", "kbd", "glossary-term"]);
/** 이 태그의 하위 텍스트만 용어 처리 대상 (헤딩·표 등은 제외 — 기존 동작 유지) */
const SCOPE_TAGS = new Set(["p", "li"]);

function splitTextNode(
  text: string,
  used: Set<string>
): ElementContent[] | null {
  TERM_REGEX.lastIndex = 0;
  if (!TERM_REGEX.test(text)) return null;
  TERM_REGEX.lastIndex = 0;

  const parts: ElementContent[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = TERM_REGEX.exec(text)) !== null) {
    const term = match[0];
    if (used.has(term)) continue;
    used.add(term);
    if (match.index > cursor) {
      parts.push({ type: "text", value: text.slice(cursor, match.index) });
    }
    parts.push({
      type: "element",
      tagName: "glossary-term",
      properties: { term },
      children: [{ type: "text", value: term }],
    });
    cursor = match.index + term.length;
  }
  if (parts.length === 0) return null;
  if (cursor < text.length) {
    parts.push({ type: "text", value: text.slice(cursor) });
  }
  return parts;
}

function walkElement(node: Element, inScope: boolean, used: Set<string>) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === "element") {
      if (!SKIP_TAGS.has(child.tagName)) {
        walkElement(child, inScope || SCOPE_TAGS.has(child.tagName), used);
      }
    } else if (child.type === "text" && inScope) {
      const parts = splitTextNode(child.value, used);
      if (parts) {
        node.children.splice(i, 1, ...parts);
        i += parts.length - 1;
      }
    }
  }
}

export function rehypeGlossary() {
  return (tree: Root) => {
    const used = new Set<string>();
    for (const child of tree.children) {
      if (child.type === "element") {
        walkElement(child, SCOPE_TAGS.has(child.tagName), used);
      }
    }
  };
}
