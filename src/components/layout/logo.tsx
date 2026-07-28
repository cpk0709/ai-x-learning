import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-bold tracking-tight", className)}
      aria-label="AI-X Learn 홈으로"
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
        <Sparkles className="size-4" aria-hidden />
      </span>
      <span className="text-base">
        AI-X <span className="text-violet-600 dark:text-violet-400">Learn</span>
      </span>
    </Link>
  );
}
