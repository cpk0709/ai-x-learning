import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "로그인",
  description: "이메일, Google, GitHub 계정으로 AI-X Learn에 로그인하세요.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo />
        <p className="text-sm text-muted-foreground">
          진도를 계정에 동기화하고 어디서든 이어서 학습하세요
        </p>
      </div>
      <div className="rounded-2xl border bg-card p-6 shadow-xs">
        <AuthForm />
      </div>
    </div>
  );
}
