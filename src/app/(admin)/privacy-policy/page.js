"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button";

// ✅ Load editor only on client to avoid SSR errors
const CKEditorClient = dynamic(() => import("./components/CustomEditor"), {
  ssr: false,
});

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState("");

  const handleSave = async () => {
    await fetch("/api/privacy-policy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    alert("Policy saved!");
  };

  return (
    <div className="p-4  mx-auto my-10 bg-white rounded-md shadow ">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <CKEditorClient value={content} onChange={setContent} />
      <div className=" mt-4 flex justify-end">
        <Button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
