"use client";
import { useTRPC } from "@/trpc/client";

export default function HomeView() {
  const trpc = useTRPC();

  return <div>Home View</div>;
}
