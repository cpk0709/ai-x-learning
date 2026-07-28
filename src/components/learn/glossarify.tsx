import React, { cloneElement, isValidElement } from "react";
import { GLOSSARY, GLOSSARY_TERMS } from "@/content/glossary";
import { GlossaryTerm } from "./glossary-term";

/**
 * 본문 텍스트에서 용어사전 단어를 찾아 <GlossaryTerm> 툴팁으로 감쌉니다.
 * - 긴 용어 우선 매칭 ("시스템 프롬프트"가 "프롬프트"보다 먼저)
 * - 영문 용어는 단어 경계 검사 ("PR"이 "PRD" 안에서 매칭되지 않음)
 * - 레슨당 용어별 첫 등장 1회만 표시 (밑줄 남발 방지) — used Set으로 추적
 * - 코드/링크 내부는 건드리지 않음
 */

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const TERM_REGEX = new RegExp(
  GLOSSARY_TERMS.map((t) => {
    const pre = /^[A-Za-z0-9]/.test(t) ? "(?<![A-Za-z0-9])" : "";
    const post = /[A-Za-z0-9]$/.test(t) ? "(?![A-Za-z0-9])" : "";
    return pre + escapeRegExp(t) + post;
  }).join("|"),
  "g"
);

const SKIP_TAGS = new Set(["code", "pre", "a", "kbd"]);

function glossarifyString(
  text: string,
  used: Set<string>,
  keyPrefix: string
): React.ReactNode {
  TERM_REGEX.lastIndex = 0;
  if (!TERM_REGEX.test(text)) return text;
  TERM_REGEX.lastIndex = 0;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = TERM_REGEX.exec(text)) !== null) {
    const term = match[0];
    if (used.has(term)) continue;
    used.add(term);
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    parts.push(
      <GlossaryTerm
        key={`${keyPrefix}-${i++}`}
        term={term}
        definition={GLOSSARY[term]}
      >
        {term}
      </GlossaryTerm>
    );
    cursor = match.index + term.length;
  }
  if (parts.length === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function glossarify(
  node: React.ReactNode,
  used: Set<string>,
  keyPrefix = "g"
): React.ReactNode {
  if (typeof node === "string") {
    return glossarifyString(node, used, keyPrefix);
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => glossarify(child, used, `${keyPrefix}-${i}`));
  }
  if (isValidElement(node)) {
    if (typeof node.type === "string" && SKIP_TAGS.has(node.type)) return node;
    // 이미 감싼 용어(GlossaryTerm) 내부는 다시 처리하지 않음
    if (node.type === GlossaryTerm) return node;
    const props = node.props as { children?: React.ReactNode };
    if (props.children == null) return node;
    return cloneElement(
      node,
      undefined,
      glossarify(props.children, used, `${keyPrefix}-c`)
    );
  }
  return node;
}
