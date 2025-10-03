
"use client";
import { Suspense } from "react";
import User from "./User";

export default function ClientWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <User />
    </Suspense>
  );
}

