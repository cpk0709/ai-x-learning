import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * CommonMark 플랭킹 규칙 보정:
 * `**"텍스트"**를` 처럼 닫는 **가 따옴표 뒤·한글 앞에 오면 볼드가 풀립니다.
 * 따옴표를 볼드 바깥으로 옮기면(`"**텍스트**"를`) 규칙을 만족하며 시각적으로 동일합니다.
 */
function fixBoldQuotes(md: string): string {
  return md.replace(/\*\*"([^"*\n]+)"\*\*/g, '"**$1**"');
}

/**
 * 레슨 본문 마크다운 렌더러.
 * `> 💡 **핵심**:` 블록쿼트가 강조 콜아웃으로 보이도록 스타일링합니다.
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
        prose-blockquote:rounded-xl prose-blockquote:border prose-blockquote:border-violet-200 prose-blockquote:bg-violet-50/60 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-foreground dark:prose-blockquote:border-violet-500/30 dark:prose-blockquote:bg-violet-500/10
        [&_blockquote_p]:my-2
        [&_blockquote_p:first-of-type]:before:content-none
        [&_blockquote_p:last-of-type]:after:content-none"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {fixBoldQuotes(content)}
      </ReactMarkdown>
    </div>
  );
}
