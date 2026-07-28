import { Footer } from "@/components/layout/footer";

/** 일반 페이지 그룹 — 푸터 포함. /learn(몰입형 뷰어)은 이 그룹 밖에 있어 푸터가 없습니다. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
