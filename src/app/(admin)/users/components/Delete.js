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

export default function DeleteCaretakerModal({
  isOpen,
  onClose,
  caretakers,
  userType,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !caretakers) return null;
    const TOAST_ID = "user-status-toast"; 


  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let apiUrl = "";

      if (userType === "Guardian") {
        apiUrl = `/api/guardian/delete-guardian-byadmin/${caretakers._id}`;
      } else if (userType === "Patient") {
        apiUrl = `/api/patient/delete-patient-byadmin/${caretakers._id}`;
      } else if (userType === "Caretaker" || userType === "Caregiver") {
        apiUrl = `/api/caretaker/delete-caretaker-byadmin/${caretakers._id}`;
      } else {
        toast.error("Invalid user type!");
        return;
      }
      // console.log("fghdrg",caretakers)
      const response = await api.post(
        apiUrl,
        {},
        { headers: { token } }
      );
      console.log(response);

      if (response?.data?.success) {
        toast.success(`${userType} deleted successfully!`,{id:TOAST_ID});
        onClose?.();
        onUpdated?.();
      } else {
        toast.error(response?.data?.message || "Delete failed.",{id:TOAST_ID});
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Something went wrong.",{id:TOAST_ID});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Delete {userType}</CardTitle>
          <CardDescription>
            Are you sure you want to permanently delete this {userType}? This
            action cannot be undone.
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
            {loading ? "Deleting..." : `Delete ${userType}`}
          </Button1>
        </CardFooter>
      </Card>
    </div>
  );
}
