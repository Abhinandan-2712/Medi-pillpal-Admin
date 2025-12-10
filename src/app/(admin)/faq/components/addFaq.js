"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/axiosClient";

export default function AddFaq({ isOpen, onClose, onAdded }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast.error("Question and Answer cannot be blank.", { id: "blank" });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Prepare FormData (Axios sets correct Content-Type automatically)
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      // ✅ Use the custom axios instance
      const response = await api.post("/api/faq/create", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("FAQ added successfully!", { id: "success" });
        setQuestion("");
        setAnswer("");
        onClose?.();
        onAdded?.(); // Refresh the FAQ list in parent component
      } else {
        toast.error(response.data.message || "Failed to add FAQ.", {
          id: "error",
        });
      }
    } catch (err) {
      console.error("Failed to add FAQ:", err);
      toast.error("Failed to add FAQ. Please try again.", { id: "error" });
      // 401 errors (token expired) are handled globally in axiosClient.js
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add FAQ</CardTitle>
          <CardDescription>
            Create a new frequently asked question.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <Textarea
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuestion("");
                setAnswer("");
                onClose?.();
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
