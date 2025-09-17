"use client";
import { useState } from "react";
import Notification from "./components/notificationTable";


export default function User() {
  const [activeTab, setActiveTab] = useState("Guardians");

  return (
    <div className="my-10 min-h-[80vh] space-y-6">
      {/* <div className="flex gap-4 border-b">
        {["Guardians", "Patients", "Caretakers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent font-medium"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "Guardians" && <Guardian />}
        {activeTab === "Patients" && <Patients />}
        {activeTab === "Caretakers" && <Caretakers />}
      </div> */}
      <Notification/>
    </div>
  );
}
