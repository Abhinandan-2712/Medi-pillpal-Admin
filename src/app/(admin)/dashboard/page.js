

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
import { useRouter } from "next/navigation";
import api from "@/lib/axiosClient";
import { useEffect, useState } from "react";

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
  const router = useRouter();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardData,setCardData]=useState(0)

  useEffect(() => {
    async function fetchStats() {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/api/admins/user-piechart", {
          headers: { token },
        });
        console.log(res)
        if (res.data.success) {
          setStats(res.data.result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      try {
        // const res = await api.get("/api/admins/dashboard-piechart?range=year", {
        const res = await api.get("/api/admins/admin-dashboard-piechart?range=month", {
          headers: { token },
        });
        console.log(res.data.result)
        if (res.data.success) {
          setCardData(res.data.result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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

  // Only render charts when stats are available
  const guardianData = stats && {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [
          stats.totalActiveGuardians,
          // stats.totalPendingGuardians,
          stats.totalBlockedGuardians,
        ],
        backgroundColor: ["#155dfc", "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const patientData = stats && {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [
          stats.totalActivePatients,
          // stats.totalPendingPatients,
          stats.totalBlockedPatients,
        ],
        backgroundColor: ["#155dfc", "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const caretakerData = stats && {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [
          stats.totalActiveCaretakers,
          // stats.totalPendingCaretakers,
          stats.totalBlockedCaretakers,
        ],
        backgroundColor: ["#155dfc", "#1c408c"],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  if (loading) return <div className="text-center my-10">Loading...</div>;

  return (
    <div className="my-10 min-h-[80vh] h-auto">
      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card
          title="Total Guardians"
          amount={cardData?.cards[1].amount || 0}
          percentage={cardData?.cards[1].percentage || 0}
          isIncrease={cardData?.cards[1].isIncrease}
          para="Parents Who Have Visited So Far"
          onClick={() => router.push("/users?tab=Guardians")}
        />
        <Card
          title="Total Patients"
          amount={cardData?.cards[0].amount || 0}
          percentage={cardData?.cards[0].percentage || 0}
          isIncrease={cardData?.cards[0].isIncrease|| false}
          para="Patients Registered Till Date"
          onClick={() => router.push("/users?tab=Patients")}
        />
        <Card
          title="Total Caregivers"
          amount={cardData?.cards[2].amount || 0}
          percentage={cardData?.cards[2].percentage || 0}
          isIncrease={cardData?.cards[2].isIncrease}
          para="Active Caregivers So Far"
          onClick={() => router.push("/users?tab=Caregivers")}
        />
        <Card
          title="Total Revenue Generated"
          amount={stats?.totalRevenue || "54645"}
          percentage={stats?.revenueChange || 0}
          isIncrease={stats?.revenueChange >= 0}
          para="Overall Revenue Generated Till Now"
          isCurrency
        />
        <Card
          title="Total Transactions Processed"
          amount={stats?.totalTransactions || "296"}
          percentage={stats?.transactionChange || 0}
          isIncrease={stats?.transactionChange >= 0}
          para="Successful Transactions Completed"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 my-10">
        <RevenueChart data={revenueData} baseOptions={baseOptions} />
        <TransactionsChart data={txData} baseOptions={baseOptions} />
      </div>
      <div className="grid gap-6 md:grid-cols-3 my-10">
        {stats && (
          <>
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
              title="Caregivers Status"
              chartData={caretakerData}
              baseOptions={baseOptions}
            />
          </>
        )}
      </div>
    </div>
  );
}
