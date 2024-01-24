import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import React from "react";

export const runtime = "edge";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  return <div>{session.user?.name}</div>;
}
