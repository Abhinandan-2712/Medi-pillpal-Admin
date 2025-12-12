
"use client";
import { useState, useEffect } from "react";
// import axios from "axios";
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

export default function EditFaq({ isOpen, onClose, faq, onUpdated }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

 const cleanText = (text) => {
  // multiple spaces -> single space
  text = text.replace(/\s\s+/g, " ");

  // starting space remove
  text = text.replace(/^\s/, "");

  return text;
};



  // Pre-fill fields when faq changes
  useEffect(() => {
    if (faq) {
      setQuestion(faq.question || "");
      setAnswer(faq.answer || "");
    }
  }, [faq]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faq?._id || !question || !answer) return;

     if (!question.trim() || !answer.trim()) {
      toast.error("Question and Answer cannot be blank.", { id: "blank" });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Use FormData for API
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);

      const response = await api.post(
        `/api/faq/edit/${faq._id}`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      if (response?.data?.success) {
        toast.success("FAQ updated successfully!",{id:"success"});
        onUpdated?.();
        onClose?.();
      }
      else if(!response?.data?.success){
         toast.error(response?.data?.message,{id:"success"});
      }
    } catch (err) {
      console.error("Failed to update FAQ:", err);
      toast.error("Failed to update FAQ. Please try again.",{id:"error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit FAQ</CardTitle>
          <CardDescription>Update the selected FAQ details.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Question"
              value={question}
              // onChange={(e) => setQuestion(e.target.value)}
              onChange={(e) => setQuestion(cleanText(e.target.value))}

              required
            />
            <Textarea
              placeholder="Answer"
              value={answer}
              // onChange={(e) => setAnswer(e.target.value)}
              onChange={(e) => setAnswer(cleanText(e.target.value))}

              required
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
