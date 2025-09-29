"use client";
import { useState } from "react";
import FaqTable from "./components/faqTable";


export default function FAQ() {
  const [activeTab, setActiveTab] = useState("Guardians");

  return (
    <div className="my-10 min-h-[80vh] p-4  mx-auto  bg-white rounded-md shadow ">
      <FaqTable/>
      {/* hhtt */}
    </div>
  );
}
