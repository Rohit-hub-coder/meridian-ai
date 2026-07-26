"use client";

import { ErrorState } from "@/components/error-state";

export default function ErrorPage() {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"></ErrorState>
  );
}
