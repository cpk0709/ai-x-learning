"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.9h5.35c-.5 2.5-2.6 3.9-5.35 3.9a5.9 5.9 0 1 1 0-11.8c1.5 0 2.85.55 3.9 1.45l2.15-2.15A8.9 8.9 0 1 0 12 21c4.6 0 8.85-3.35 8.85-8.9 0-.35-.05-.7-.1-1Z"
      />
    </svg>
  );
}

export function AuthForm() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  if (!configured) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-8 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
          <Sparkles className="size-6" />
        </span>
        <div>
          <h2 className="font-bold">지금은 게스트 모드입니다</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            로그인 없이도 모든 강의를 학습할 수 있고, 진도는 이 브라우저에
            저장됩니다. 계정 동기화(이메일·Google·GitHub 로그인)를 켜려면{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>에
            Supabase 환경변수를 설정하세요 (README 참고).
          </p>
        </div>
        <Button asChild>
          <Link href="/courses">강의 보러 가기</Link>
        </Button>
      </div>
    );
  }

  const oauth = async (provider: "google" | "github") => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    setPending(provider);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}${basePath}/auth/callback` },
    });
    if (error) {
      toast.error(`로그인 실패: ${error.message}`);
      setPending(null);
    }
  };

  const submit = async (mode: "signin" | "signup") => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    if (!email || !password) {
      toast.error("이메일과 비밀번호를 입력해 주세요.");
      return;
    }
    setPending(mode);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("로그인되었습니다.");
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("가입 확인 메일을 확인해 주세요.");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "요청에 실패했습니다.");
    } finally {
      setPending(null);
    }
  };

  const fields = (mode: "signin" | "signup") => (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(mode);
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${mode}-email`}>이메일</Label>
        <Input
          id={`${mode}-email`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${mode}-password`}>비밀번호</Label>
        <Input
          id={`${mode}-password`}
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          placeholder="8자 이상"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={pending !== null}>
        {pending === mode ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Mail className="size-4" />
        )}
        {mode === "signin" ? "이메일로 로그인" : "이메일로 가입하기"}
      </Button>
    </form>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => oauth("google")}
          disabled={pending !== null}
        >
          {pending === "google" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GoogleIcon className="size-4" />
          )}
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => oauth("github")}
          disabled={pending !== null}
        >
          {pending === "github" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <GithubIcon className="size-4" />
          )}
          GitHub
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">또는 이메일로</span>
        <Separator className="flex-1" />
      </div>

      <Tabs defaultValue="signin">
        <TabsList className="w-full">
          <TabsTrigger value="signin" className="flex-1">
            로그인
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex-1">
            회원가입
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="mt-4">
          {fields("signin")}
        </TabsContent>
        <TabsContent value="signup" className="mt-4">
          {fields("signup")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
