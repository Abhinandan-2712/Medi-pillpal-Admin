
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

export default function BlockUserModal({
  isOpen,
  onClose,
  patients,
  userType = "Patients",
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);
//   console.log(patients)

  if (!isOpen || !patients) return null;

  const isBlocking = patients.status === "Active"; // Active = Block action
  const actionText = isBlocking ? "Block" : "Unblock";

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      let response;

      // 👉 If user is Active ⇒ Call BLOCK API
      if (isBlocking) {
        response = await api.post(
          `/api/admins/block-patient-byadmin/${patients._id}`,
          {},
          { headers: { token } }
        );
      }

      // 👉 If user is Blocked ⇒ Call UNBLOCK API
      else {
        response = await api.post(
          `/api/admins/unblock-patient/${patients._id}`,
          {},
          { headers: { token } }
        );
      }
      console.log(response)

      if (response?.data?.success) {
        toast.success(
          `${userType} ${isBlocking ? "blocked" : "unblocked"} successfully!`
        );
        onClose?.();
        onUpdated?.();
      } else {
        toast.error(response?.data?.message || "Operation failed.");
      }
    } catch (err) {
      console.error("Status update failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {actionText} {userType}
          </CardTitle>
          <CardDescription>
            Are you sure you want to {actionText.toLowerCase()} this {userType}?
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
            variant={isBlocking ? "destructive" : "default"}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? `${actionText}ing...` : `${actionText} ${userType}`}
          </Button1>
        </CardFooter>
      </Card>
    </div>
  );
}
