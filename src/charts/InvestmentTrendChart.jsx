// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function TransactionCharts({ transactions }) {
//   // Group by month
//   const monthlyFlow = {};
//   transactions.forEach((txn) => {
//     const date = txn.Date;
//     if (!date) return;

//     const month = date.slice(0, 7); // YYYY-MM
//     const units = parseFloat(txn["Number of Units"]) || 0;
//     const price = parseFloat(txn["Price per Share"]) || 0;
//     const type = txn.Type?.toLowerCase();

//     if (!monthlyFlow[month]) monthlyFlow[month] = 0;

//     if (type === "buy") {
//       monthlyFlow[month] += units * price;
//     } else if (type === "sell") {
//       monthlyFlow[month] -= units * price;
//     }
//   });

//   const trendData = [];
//   const cumulativeData = [];
//   let runningTotal = 0;

//   Object.keys(monthlyFlow)
//     .sort()
//     .forEach((month) => {
//       const flow = monthlyFlow[month];
//       runningTotal += flow;

//       trendData.push({ month, flow });
//       cumulativeData.push({ month, total: runningTotal });
//     });

//   return (
//     <div className="transaction-charts">
//       <div className="chart-container">
//         <h3 className="chart-title">Monthly Cash Inflow</h3>
//         <ResponsiveContainer>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="flow"
//               stroke="#8884d8"
//               name="Monthly Flow"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="chart-container">
//         <h3 className="chart-title">Cumulative Investment</h3>
//         <ResponsiveContainer>
//           <LineChart data={cumulativeData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="total"
//               stroke="#82ca9d"
//               name="Cumulative Total"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function InvestmentTrendChart({ transactions }) {
  // Aggregate monthly invested amount
  const monthlyFlow = {};
  transactions.forEach(txn => {
    const date = txn.Date;
    if (!date) return;
    const month = date.slice(0, 7); // YYYY-MM
    const units = parseFloat(txn["Number of Units"]) || 0;
    const price = parseFloat(txn["Price per Share"]) || 0;
    const type = txn.Type?.toLowerCase();

    if (!monthlyFlow[month]) monthlyFlow[month] = 0;
    if (type === "buy") monthlyFlow[month] += units * price;
    else if (type === "sell") monthlyFlow[month] -= units * price;
  });

  const trendData = [];
  let cumulativeTotal = 0;
  Object.keys(monthlyFlow).sort().forEach(month => {
    const flow = monthlyFlow[month];
    cumulativeTotal += flow;
    trendData.push({ month, monthlyFlow: flow, cumulative: cumulativeTotal });
  });

  if (!trendData.length) return <p>No transaction data</p>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Investment Trend (Monthly)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={val => `Rs. ${val}`} />
          <Legend />
          <Line type="monotone" dataKey="monthlyFlow" stroke="#8884d8" name="Monthly Investment" />
          <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" name="Cumulative Investment" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
