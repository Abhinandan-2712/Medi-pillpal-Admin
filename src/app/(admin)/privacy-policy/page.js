"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import { toast } from "react-hot-toast";
import api from "@/lib/axiosClient";

// ✅ Client-side load for CKEditor
const CKEditorClient = dynamic(() => import("./components/CustomEditor"), {
  ssr: false,
});

export default function TermsConditionPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // 🔹 Component mount par existing content fetch karna
  useEffect(() => {
    const fetchContent = async () => {
      try {
        toast.dismiss();
        setFetching(true);
        const token = localStorage.getItem("token");

        const response = await api.get("/api/privacyPolicy/get", {
          headers: { token },
        });
        // console.log(response.data);

        if (response.data?.success) {
          setContent(response.data.result.content);
          // console.log(response.data.result.content)
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch privacy policy", { id: "error" });
      } finally {
        setFetching(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Please add some content", { id: "content" });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("content", content);

      const response = await api.post("/api/privacyPolicy/create", formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response)
      if (response.data.success) {
        toast.success(response.data?.message || "Policy saved successfully!", {
          id: "success",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!", {
        id: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mx-auto my-10 bg-white rounded-md shadow">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

      {fetching ? (
        <p>Loading...</p>
      ) : (
        <CKEditorClient value={content} onChange={setContent} />
      )}

      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
