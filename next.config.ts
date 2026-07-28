import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 홈 디렉토리에 잘못 생성된 package-lock.json이 있어도 이 프로젝트를 루트로 고정
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
