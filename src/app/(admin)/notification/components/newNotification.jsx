
"use client";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import api from "@/lib/axiosClient";

export default function NewNotification({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("select");
  const [notificationType, setNotificationType] = useState("broadcast"); // "broadcast" ya "individual"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searching, setSearching] = useState(false);

  if (!isOpen) return null;

  // User search function
  const handleUserSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter search query", { id: "search-empty" });
      return;
    }

    if (audience === "select") {
      toast.error("Please select app type first", { id: "app-select" });
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem("token");

      // App type ke basis par search endpoint
      let searchUrl = "";
      switch (audience) {
        case "Patients":
          searchUrl = `/api/admins/searchAllPatientsByadmin?search=${searchQuery}`;
          break;
        case "Guardians":
          searchUrl = `/api/admins/searchguardianByadmin?search=${searchQuery}`;
          break;
        case "Caregivers":
          searchUrl = `/api/admins/searchcaregiverByadmin?search=${searchQuery}`;
          break;
        default:
          return;
      }

      const res = await api.get(searchUrl, {
        // params: { query: searchQuery },
        headers: { token },
      });
      console.log("API Response:", res.data);
      
      if (res.data.success) {
        let users = [];
        
        if (audience === "Caregivers") {
          users = res.data.result?.caretakers || [];
        } else if (audience === "Guardians") {
          users = res.data.result?.guardians || [];
        } else if (audience === "Patients") {
          users = res.data.result?.patients || [];
        }
        
        setSearchResults(users);
        
        if (users.length === 0) {
          toast.error("No users found", { id: "no-users" });
        }
      } else {
        toast.error("Search failed", { id: "search-failed" });
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to search users", { id: "search-error" });
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const cleanTitle = title.replace(/\s+/g, " ").trim();
    const cleanMessage = message.replace(/\s+/g, " ").trim();

    if (!cleanTitle || !cleanMessage) {
      toast.error("Title and message cannot be empty", { id: "spaces" });
      setLoading(false);
      return;
    }

    if (audience === "select") {
      toast.error("Please select an audience", { id: "audience" });
      setLoading(false);
      return;
    }

    // Individual notification ke liye user select karna zaroori hai
    if (notificationType === "individual" && !selectedUser) {
      toast.error("Please select a user", { id: "user-select" });
      setLoading(false);
      return;
    }

    let apiUrl = "";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);

    if (notificationType === "broadcast") {
      // Broadcast notification
      switch (audience) {
        case "All":
          apiUrl = "/api/notification/send-to-all-apps";
          break;
        case "Guardians":
          apiUrl = "/api/notification/send-to-guardian";
          break;
        case "Patients":
          apiUrl = "/api/notification/send-to-all-patients";
          break;
        case "Caregivers":
          apiUrl = "/api/notification/send-to-caretaker";
          break;
        default:
          setLoading(false);
          return;
      }
    } else {
      // Individual user notification
      // apiUrl = "/api/notification/send-to-user";
      // formData.append("userId", selectedUser._id);
      // formData.append("userType", audience.toLowerCase());

      switch (audience) {
        case "Guardians":
          apiUrl = "/api/notification/send-to-specific-guardian";
          formData.append("guardianId",selectedUser._id)
          break;
        case "Patients":
                    console.log(selectedUser)

          apiUrl = "/api/notifications/send-to-specific-patients";
          formData.append("patientId",selectedUser._id)
          break;
        case "Caregivers":
          apiUrl = "/api/notification/send-to-specific-caretaker";
          formData.append("caretakerId",selectedUser._id)
          break;
        default:
          setLoading(false);
          return;
      }
    }

    try {
      
      const token = localStorage.getItem("token");
      const res = await api.post(apiUrl, formData, {
        headers: { token },
      });
      console.log(res)

      if (res.data.success) {
        toast.success("Notification sent successfully", { id: "success" });
        resetForm();
        onClose?.();
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setAudience("select");
    setNotificationType("broadcast");
    setSearchQuery("");
    setSearchResults([]);
    setSelectedUser(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>New Notification</CardTitle>
          <CardDescription>
            {/* Send a notification to selected users. */}
            Send a notification to selected app users or individual users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notification Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Notification Type</label>
            <Select
              value={notificationType}
              onValueChange={(val) => {
                setNotificationType(val);
                setSearchResults([]);
                setSelectedUser(null);
                setSearchQuery("");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broadcast">Broadcast (All Users)</SelectItem>
                <SelectItem value="individual">Individual User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* App Selection */}
          <Select
            value={audience}
            onValueChange={(val) => {
              setAudience(val);
              setSearchResults([]);
              setSelectedUser(null);
              setSearchQuery("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select App Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">Please Select</SelectItem>
              {notificationType === "broadcast" && (
                <SelectItem value="All">All Apps</SelectItem>
              )}
              <SelectItem value="Guardians">Guardian App</SelectItem>
              <SelectItem value="Patients">Patient App</SelectItem>
              <SelectItem value="Caregivers">Caregiver App</SelectItem>
            </SelectContent>
          </Select>

          {/* Individual User Search */}
          {notificationType === "individual" &&
            audience !== "select" &&
            audience !== "All" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Search User</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter name, email or phone"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUserSearch()}
                  />
                  <Button
                    type="button"
                    onClick={handleUserSearch}
                    disabled={searching}
                    variant="secondary"
                  >
                    {searching ? "..." : "Search"}
                  </Button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border rounded-md max-h-32 overflow-y-auto">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => {
                          setSelectedUser(user);
                          setSearchResults([]);
                        }}
                        className={`p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 ${
                          selectedUser?._id === user._id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="font-medium text-sm">
                          {user.fullName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.mobileNumber || user.email}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected User Display */}
                {selectedUser && (
                  <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">
                          {selectedUser.fullName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {selectedUser.email || selectedUser.mobileNumber}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(null)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              onClose?.();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
