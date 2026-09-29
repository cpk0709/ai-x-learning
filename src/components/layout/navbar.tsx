"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, LogIn, LogOut, Menu, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useUser } from "@/hooks/use-user";
import { getSupabaseBrowser } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/courses", label: "강의 탐색" },
  { href: "/courses?category=dev", label: "AI 개발" },
  { href: "/courses?category=devops", label: "인프라·DevOps" },
  { href: "/courses?category=creative", label: "크리에이티브" },
  { href: "/courses?category=business", label: "비즈니스·커리어" },
  { href: "/courses?category=realestate", label: "부동산" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, configured } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signOut = async () => {
    await getSupabaseBrowser()?.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === link.href.split("?")[0] &&
                  link.href === "/courses" &&
                  "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />

          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              내 학습
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="계정 메뉴">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-violet-100 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                      {(user.email ?? "U").slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="size-4" /> 마이페이지
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="size-4" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : configured ? (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/login">
                <LogIn className="size-4" /> 로그인
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              <Link href="/login">
                <UserIcon className="size-4" /> 게스트 모드
              </Link>
            </Button>
          )}

          {/* 모바일 메뉴 */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="모바일 메뉴">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  내 학습
                </Link>
                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {configured ? "로그인" : "게스트 모드"}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
