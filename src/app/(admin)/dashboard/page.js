"use client";
import Card from "@/components/CardGen";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import RevenueChart from "./components/RevenueChart";
import TransactionsChart from "./components/TransactionsChart";
import StatusDoughnut from "./components/UserDistributionChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14, family: "Inter, sans-serif" },
          boxWidth: 20,
          padding: 16,
        },
      },
      title: {
        display: true,
        color: "#111827",
        font: { size: 18, weight: "600", family: "Inter, sans-serif" },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(156,163,175,0.15)" },
        ticks: { color: "#4b5563" },
      },
      y: {
        grid: { color: "rgba(156,163,175,0.15)" },
        ticks: { color: "#4b5563" },
      },
    },
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "may", "jun"],
    datasets: [
      {
        label: "Revenue",
        data: [4000, 5000, 4500, 7000, 3200, 5200],
        borderColor: "#4f46e5",
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(79,70,229,0.3)");
          gradient.addColorStop(1, "rgba(79,70,229,0)");
          return gradient;
        },
        pointBackgroundColor: "#4f46e5",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const txData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Transactions",
        data: [200, 350, 300, 400, 703, 120],
        backgroundColor: "#388df9",
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const guardianData = {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [500, 50],
        backgroundColor: ["#155dfc",
          //  "#388df9",
            "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const patientData = {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [400, 20],
        backgroundColor: ["#155dfc", 
          // "#388df9", 
          "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const caretakerData = {
    labels: ["Active", 
      // "Pending",
       "Blocked"],
    datasets: [
      {
        data: [150, 10],
        backgroundColor: ["#155dfc", 
          // "#388df9",
           "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="my-10 min-h-[80vh] h-auto">
      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card
          title="Total Guardians"
          amount={1232}
          percentage={12}
          isIncrease={false}
          para="Parents Who Have Visited So Far"
        />
        <Card
          title="Total Patients"
          amount={980}
          percentage={8}
          isIncrease={true}
          para="Patients Registered Till Date"
        />
        <Card
          title="Total Caretakers"
          amount={320}
          percentage={5}
          isIncrease={true}
          para="Active Caretakers So Far"
        />
        <Card
          title="Total Revenue Generated"
          amount={45789}
          percentage={15}
          isIncrease={true}
          para="Overall Revenue Generated Till Now"
          isCurrency
        />
        <Card
          title="Total Transactions Processed"
          amount={12500}
          percentage={10}
          isIncrease={true}
          para="Successful Transactions Completed"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 my-10">
        <RevenueChart data={revenueData} baseOptions={baseOptions} />
        <TransactionsChart data={txData} baseOptions={baseOptions} />
      </div>
      <div className="grid gap-6 md:grid-cols-3 my-10">
        {/* <UserDistributionChart data={userData} baseOptions={baseOptions} /> */}
        <StatusDoughnut
          title="Guardians Status"
          chartData={guardianData}
          baseOptions={baseOptions}
        />
        <StatusDoughnut
          title="Patients Status"
          chartData={patientData}
          baseOptions={baseOptions}
        />
        <StatusDoughnut
          title="Caretakers Status"
          chartData={caretakerData}
          baseOptions={baseOptions}
        />
      </div>
    </div>
  );
}
