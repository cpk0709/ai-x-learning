import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            파편화된 AI 기술 정보를 큐레이션하여, 일러스트 기반의
            스텝바이스텝으로 배우는 종합 AI 활용 학습 플랫폼.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">학습 트랙</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" href="/courses?category=dev">AI 개발</Link></li>
            <li><Link className="hover:text-foreground" href="/courses?category=creative">크리에이티브</Link></li>
            <li><Link className="hover:text-foreground" href="/courses?category=business">비즈니스 & 커리어</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">바로가기</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" href="/courses">전체 강의</Link></li>
            <li><Link className="hover:text-foreground" href="/dashboard">내 학습</Link></li>
            <li><Link className="hover:text-foreground" href="/login">로그인</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © 2026 AI-X Learn. 학습용 데모 플랫폼입니다.
      </div>
    </footer>
  );
}
