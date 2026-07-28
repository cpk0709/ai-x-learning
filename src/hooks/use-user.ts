"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";
import { pullCompletions } from "@/lib/progress-sync";
import { useProgressStore } from "@/store/progress";

/**
 * 현재 로그인 사용자 훅.
 * - Supabase 미설정: { configured: false, user: null } — 데모(게스트) 모드
 * - 로그인 감지 시 원격 진도를 한 번 내려받아 로컬과 병합
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const mergeRemote = useProgressStore((s) => s.mergeRemote);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    let synced = false;
    const syncOnce = () => {
      if (synced) return;
      synced = true;
      void pullCompletions().then((rows) => {
        if (rows.length) mergeRemote(rows);
      });
    };

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
      if (data.user) syncOnce();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) syncOnce();
    });
    return () => subscription.unsubscribe();
  }, [mergeRemote]);

  return { user, loading, configured: isSupabaseConfigured() };
}
