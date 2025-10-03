"use client";
import dynamic from "next/dynamic";

// Dynamically import User component with SSR disabled
const User = dynamic(() => import("./User"), { ssr: false });

export default function Page() {
  return <User />;
}
