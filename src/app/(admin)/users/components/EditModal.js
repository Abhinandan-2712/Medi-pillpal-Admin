"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Button1 from "@/components/Button";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/lib/axiosClient";

export default function EditCaretakerModal({
  isOpen,
  onClose,
  caretakers,
  userType,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  // ---------------- Form States ----------------
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    mobileNumber: "",
  });

  // Fill old values when modal opens
  useEffect(() => {
    if (caretakers) {
      setFormData({
        fullName: caretakers?.fullName || "",
        gender: caretakers?.gender || "",
        mobileNumber: caretakers?.mobileNumber || "",
      });
    }
  }, [caretakers]);

  if (!isOpen || !caretakers) return null;

  // ---------------- Name Validation ----------------
  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // only alphabets (NO space, NO special chars)

  // const handleNameChange = (e) => {
  //   const value = e.target.value;

  //   if (value === "" || nameRegex.test(value)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       fullName: value,
  //     }));
  //   } else {
  //     toast.error("Only alphabets allowed (no spaces or special characters)", {
  //       id: "name-validation",
  //     });
  //   }
  // };
  const handleNameChange = (e) => {
    let value = e.target.value;

    // Limit to 50 characters
    if (value.length > 50) {
      return; // Stop typing beyond 50 chars
    }

    // Remove multiple spaces
    value = value.replace(/\s+/g, " ");

    // Remove starting space
    value = value.replace(/^ /, "");

    setFormData((prev) => ({
      ...prev,
      fullName: value,
    }));
  };

  // ---------------- API Call ----------------
  const handleEdit = async () => {
    if (!nameRegex.test(formData.fullName)) {
      return toast.error("Invalid name format!", { id: "invalid-name" });
    }
    if (formData.fullName.length > 50) {
      toast.error("Maximum 50 characters allowed");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // console.log(userType);
      let apiUrl = "";

      if (userType === "Guardian") {
        apiUrl = `/api/admins/edit-guardian-profile/${caretakers._id}`;
      } else if (userType === "Patient") {
        apiUrl = `/api/admins/admin-edit-patient/${caretakers._id}`;
      } else if (
        userType === "Caretaker" ||
        userType === "Caregivers" ||
        userType === "Caregiver"
      ) {
        apiUrl = `/api/admins/admin-edit-caretaker-profile/${caretakers._id}`;
      } else {
        toast.error("Invalid user type!");
        return;
      }

      const response = await api.post(apiUrl, formData, {
        headers: { token },
      });
      // console.log(response);

      if (response?.data?.success) {
        toast.success(`${userType} updated successfully!`, { id: "success" });
        onClose?.();
        onUpdated?.();
      } else {
        toast.error(response?.data?.message || "Update failed.", {
          id: "failed",
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong.", { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Edit {userType}</CardTitle>
          <CardDescription>Update the details below.</CardDescription>
        </CardHeader>

        {/* ---------- FORM INPUTS ----------- */}
        <div className="px-6 flex flex-col gap-3">
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleNameChange}
            placeholder="Enter name"
          />

          <Input
            name="mobileNumber"
            value={formData.mobileNumber}
            disabled
            className="cursor-not-allowed opacity-60"
          />

          {/* <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger className="border rounded px-3 py-2 text-sm w-full">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* ----------- BUTTONS ------------ */}
        <CardFooter className="flex justify-end gap-2 mt-4 rounded-2xl">
          {/* <Button
            variant="outline"
            onClick={onClose}
            className="rounded-2xl"
            disabled={loading}
          >
            Cancel
          </Button> */}
          <Button
            variant="outline"
            onClick={() => {
              // ✅ Reset form values to original caretaker data
              setFormData({
                fullName: caretakers?.fullName || "",
                gender: caretakers?.gender || "",
                mobileNumber: caretakers?.mobileNumber || "",
              });
              onClose?.();
            }}
            className="rounded-2xl"
            disabled={loading}
          >
            Cancel
          </Button>

          <Button1
            onClick={handleEdit}
            disabled={loading}
            className="rounded-2xl"
          >
            {loading ? "Saving..." : `Update ${userType}`}
          </Button1>
        </CardFooter>
      </Card>
    </div>
  );
}
