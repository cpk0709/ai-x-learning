"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/**
 * OAuth 콜백 — 정적 배포(GitHub Pages) 호환을 위해 클라이언트에서 처리합니다.
 * Supabase 브라우저 클라이언트가 URL의 인증 코드를 자동으로 세션으로 교환하며
 * (PKCE, detectSessionInUrl), 로그인이 확인되면 대시보드로 이동합니다.
 */
export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      router.replace("/login");
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        router.replace("/dashboard");
      }
    });

    // 이미 세션이 준비된 경우 즉시 이동
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/dashboard");
    });

    // 교환 실패 등으로 세션이 끝내 안 생기면 로그인 페이지로
    const timeout = setTimeout(() => router.replace("/login"), 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" aria-hidden />
      <p className="text-sm">로그인 처리 중입니다…</p>
    </div>
  );
}
