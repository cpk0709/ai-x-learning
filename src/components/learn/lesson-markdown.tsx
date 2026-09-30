import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { GLOSSARY } from "@/content/glossary";
import { rehypeGlossary } from "./rehype-glossary";
import { GlossaryTerm } from "./glossary-term";

/**
 * CommonMark 플랭킹 규칙 보정:
 * `**"텍스트"**를` 처럼 닫는 **가 따옴표 뒤·한글 앞에 오면 볼드가 풀립니다.
 * 따옴표를 볼드 바깥으로 옮기면(`"**텍스트**"를`) 규칙을 만족하며 시각적으로 동일합니다.
 */
/**
 * CommonMark 플랭킹 규칙 보정 (DEVLOG v0.1 #2, v0.9).
 * 한국어는 볼드 바로 뒤에 조사가 붙어 `**X)**하고`, `**"X"**를` 같은 패턴이 흔한데,
 * 닫는 `**` 앞이 문장부호이고 뒤가 글자면 right-flanking이 성립하지 않아 `**`가 그대로 노출된다.
 * 여는 쪽도 마찬가지(`글자**(X**`). 문장부호를 볼드 밖으로 옮겨 의미는 그대로 두고 규칙만 만족시킨다.
 * 코드펜스 내부는 건드리지 않는다.
 */
function fixBoldQuotes(md: string): string {
  const TRAIL = /^(.*?)([)\]」』.,:;!?%~"']+)$/;
  const LEAD = /^([(\[「『"']+)(.*)$/;
  const isWord = (ch: string) => /[가-힣A-Za-z0-9]/.test(ch);
  return md
    .split(/(```[\s\S]*?```)/g)
    .map((seg, i) => {
      if (i % 2 === 1) return seg; // 코드펜스는 그대로
      // 볼드 스팬 하나를 통째로 잡아(안에 *가 없는 최소 매칭) 앞뒤 글자를 보고 문장부호만 밖으로 뺀다.
      return seg.replace(/\*\*([^*\n]+?)\*\*/g, (whole, rawInner: string, offset: number, str: string) => {
        let inner = rawInner;
        // 따옴표는 양쪽 모두 밖으로: **"X"** → "**X**"
        if (/^"[^"]+"$/.test(inner)) return `"**${inner.slice(1, -1)}**"`;
        // 인라인 코드만 감싼 볼드(**`x`**한글)는 닫는 ** 앞이 백틱이라 깨진다 — 코드 자체가 강조이므로 볼드를 뗀다.
        if (/^`[^`]+`$/.test(inner)) return inner;
        const before = str[offset - 1] ?? " ";
        const after = str[offset + whole.length] ?? " ";
        let lead = "";
        let trail = "";
        const t = inner.match(TRAIL);
        if (t && isWord(after)) {
          inner = t[1];
          trail = t[2];
        }
        const l = inner.match(LEAD);
        if (l && isWord(before)) {
          lead = l[1];
          inner = l[2];
        }
        if (!inner.trim()) return whole;
        return `${lead}**${inner}**${trail}`;
      });
    })
    .join("");
}

/** rehype-glossary가 삽입한 <glossary-term term="..."> 요소를 툴팁으로 렌더링 */
function GlossaryTermElement({
  term,
  children,
}: {
  term?: string;
  children?: React.ReactNode;
}) {
  if (!term || !GLOSSARY[term]) return <>{children}</>;
  return (
    <GlossaryTerm term={term} definition={GLOSSARY[term]}>
      {children}
    </GlossaryTerm>
  );
}

const components = {
  "glossary-term": GlossaryTermElement,
} as Components;

/**
 * 레슨 본문 마크다운 렌더러.
 * - `> 💡 **핵심**:` 블록쿼트가 강조 콜아웃으로 보이도록 스타일링
 * - 용어사전 단어의 첫 등장을 rehype 단계에서 감지해 호버 설명 툴팁 부착
 *   (렌더 중 상태 변이 금지 — hydration mismatch 원인이었음, DEVLOG #11)
 */
export function LessonMarkdown({ content }: { content: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none dark:prose-invert
        prose-headings:tracking-tight prose-headings:font-bold
        prose-h2:mt-7 prose-h2:mb-3 prose-h2:text-lg
        prose-p:leading-relaxed prose-p:text-[15px]
        prose-li:text-[15px] prose-li:leading-relaxed prose-li:my-1
        prose-strong:text-foreground
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-xl prose-pre:border prose-pre:bg-zinc-950 prose-pre:text-[13px] dark:prose-pre:bg-zinc-900
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-normal [&_pre_code]:text-zinc-200
        prose-blockquote:rounded-xl prose-blockquote:border prose-blockquote:border-violet-200 prose-blockquote:bg-violet-50/60 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-foreground dark:prose-blockquote:border-violet-500/30 dark:prose-blockquote:bg-violet-500/10
        [&_blockquote_p]:my-2
        [&_blockquote_p:first-of-type]:before:content-none
        [&_blockquote_p:last-of-type]:after:content-none"
    >
      <ReactMarkdown
        // singleTilde:false — GFM 기본값은 물결표 하나(~)도 취소선으로 해석해 "2~3곳", "0~5%" 같은
        // 한국어 범위 표기가 지워졌다(DEVLOG v0.9). 취소선은 ~~두 개~~만 허용.
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeGlossary]}
        components={components}
      >
        {fixBoldQuotes(content)}
      </ReactMarkdown>
    </div>
  );
}
