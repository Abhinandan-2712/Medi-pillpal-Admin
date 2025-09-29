
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Button1 from "@/components/Button";
import { toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import api from "@/lib/axiosClient"; 

export default function DeleteFaq({ isOpen, onClose, faqId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!faqId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/api/faq/delete/${faqId}`,
        {},
        { headers: { token: token } }
      );
      if (response?.data?.success) {
        toast.success("FAQ deleted successfully!", { id: "success" });
        onDeleted?.(); // callback to refresh FAQ list
        onClose?.(); // close modal
      }
      else{
        toast.error(response?.data?.message|| "Delete failed.", { id: "error" })
      }
    } catch (err) {
      console.error("Failed to delete FAQ:", err);
      toast.error("Failed to delete FAQ. Please try again.", { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete FAQ</CardTitle>
          <CardDescription>
            Are you sure you want to delete this FAQ? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-end gap-2 rounded-2xl">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-2xl"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button1
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button1>
        </CardFooter>
      </Card>
    </div>
  );
}
