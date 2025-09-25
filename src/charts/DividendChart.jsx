import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DividendChart({ summaries }) {
  const chartData = summaries.map(item => ({
    name: item.stockTicker || item.name,
    dividend: parseFloat(item.dividendIncome) || 0
  }));

  if (!chartData.length) return <p>No dividend data</p>;

  return (
    <div className="chart-container">
  <h3 className="chart-title">Dividend Income (PKR)</h3>
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
      <YAxis />
      <Tooltip formatter={(val) => `Rs. ${val}`} />
      <Bar dataKey="dividend" name="Dividend" fill="#00C49F" />
      {/* Legend removed */}
    </BarChart>
  </ResponsiveContainer>
</div>

  );
}
