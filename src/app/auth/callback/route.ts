import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/** OAuth / 매직링크 콜백 — 코드를 세션으로 교환한 뒤 대시보드로 이동 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await getSupabaseServer();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login`);
}
