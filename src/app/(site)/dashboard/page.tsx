import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "내 학습",
  description: "수강 중인 강의, 진도율, 학습 잔디와 배지를 확인하세요.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <DashboardView />
    </div>
  );
}
