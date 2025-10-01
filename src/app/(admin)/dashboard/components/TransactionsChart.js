"use client";
import { Bar } from "react-chartjs-2";

export default function TransactionsChart({ data, baseOptions }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow h-72 md:h-96">
      <Bar
        data={data}
        options={{
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            title: { ...baseOptions.plugins.title, text: "Transactions Per Month" },
          },
        }}
      />
    </div>
  );
}
