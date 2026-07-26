import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import SignInView from "@/modules/auth/ui/views/sign-in-view";
import { redirect } from "next/navigation";

import { headers } from "next/headers";
export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }
  return <SignInView></SignInView>;
}
