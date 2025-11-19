"use client";
import { useState } from "react";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
// import toast from "react-hot-toast";

export default function NewNotification({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("select");

  if (!isOpen) return null;   // 👉 isOpen false hone par kuch bhi render na ho

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, message, audience });
    onClose?.(); // ✅ parent me showModal ko false karega
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>New Notification</CardTitle>
          <CardDescription>Send a notification to selected users.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Notification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Notification Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select">Please Select</SelectItem>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Guardians">Guardians</SelectItem>
                <SelectItem value="Patients">Patients</SelectItem>
                <SelectItem value="Caregivers">Caregivers</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
