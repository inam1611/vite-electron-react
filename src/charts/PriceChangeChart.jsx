import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function PriceChangeChart({ summaries }) {
  const chartData = summaries.map(item => ({
    name: item.stockTicker || item.name,
    change: parseFloat(item.changeValue) || 0
  }));

  if (!chartData.length) return <p>No price change data</p>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Price Change (PKR)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip formatter={val => `Rs. ${val}`} />
          <Legend />
          <Bar dataKey="change" name="Price Change">
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.change >= 0 ? "#4CAF50" : "#F44336"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
