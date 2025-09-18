"use client";
import { useState } from "react";
import Guardian from "./components/guardians";
import Caretakers from "./components/caretakers";
import Patients from "./components/patients";

export default function User() {
  const [activeTab, setActiveTab] = useState("Guardians");

  return (
    <div className=" min-h-[80vh] p-4  mx-auto my-10 bg-white rounded-md shadow">
      <div className="flex gap-4 border-b">
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
      </div>
    </div>
  );
}
