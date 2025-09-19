"use client";
import { Button } from "@/components/ui/button";
import Button1 from "@/components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function DeleteFaq({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    // 👉 Yahan API call ya delete logic add karein
    onDelete?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete FAQ</CardTitle>
          <CardDescription>
            Are you sure you want to delete this FAQ? This action cannot be undone.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-end gap-2 rounded-2xl">
          <Button variant="outline" onClick={onClose} className=" rounded-2xl" >
            Cancel
          </Button>
          <Button1 variant="destructive" onClick={handleDelete}>
            Delete
          </Button1>
        </CardFooter>
      </Card>
    </div>
  );
}
