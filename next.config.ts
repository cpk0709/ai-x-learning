import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true 로 빌드하면 GitHub Pages용 정적 내보내기 모드:
 * - output: "export" → out/ 폴더에 순수 정적 사이트 생성
 * - basePath: 프로젝트 페이지 URL(https://<user>.github.io/ai-x-learning) 대응
 * 로컬 개발과 Vercel 배포는 영향 없음.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/ai-x-learning" : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: basePath || undefined,
  // 딥링크/새로고침 시 폴더/index.html로 확실히 응답하도록
  trailingSlash: isGithubPages ? true : undefined,
  images: isGithubPages ? { unoptimized: true } : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // 홈 디렉토리에 잘못 생성된 package-lock.json이 있어도 이 프로젝트를 루트로 고정
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
