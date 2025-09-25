// // import React from "react";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   Cell,
// // } from "recharts";

// // export default function GainLossChart({ summaries }) {
// //   const chartData = summaries.map((item) => {
// //     const lastPrice = parseFloat(item.lastPrice) || 0;
// //     const avgCost = parseFloat(item.avgCost) || 0;
// //     const shares = parseFloat(item.shares) || 0;
// //     const unrealized = (lastPrice - avgCost) * shares;

// //     return {
// //       name: item.stockTicker || item.name,
// //       unrealized: parseFloat(unrealized.toFixed(2)),
// //     };
// //   });

// //   if (!chartData.length) return <p>No data for Gain/Loss</p>;

// //   return (
// //     <div className="chart-container">
// //       <h3 className="chart-title">Unrealized Gain/Loss (PKR)</h3>
// //       <ResponsiveContainer width="100%" height={400}>
// //         <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
// //           <YAxis />
// //           <Tooltip formatter={(val) => `Rs. ${val}`} />
// //           <Legend />
// //           <Bar dataKey="unrealized" name="Unrealized P/L">
// //             {chartData.map((entry, index) => (
// //               <Cell
// //                 key={`cell-${index}`}
// //                 fill={entry.unrealized >= 0 ? "#4CAF50" : "#F44336"}
// //               />
// //             ))}
// //           </Bar>
// //         </BarChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// export default function GainLossChart({ summaries }) {
//   const [view, setView] = useState("pkr"); // "pkr" or "percent"

//   // Prepare both datasets
//   const chartDataPKR = summaries.map((item) => {
//     const lastPrice = parseFloat(item.lastPrice) || 0;
//     const avgCost = parseFloat(item.avgCost) || 0;
//     const shares = parseFloat(item.shares) || 0;
//     const unrealized = (lastPrice - avgCost) * shares;

//     return {
//       name: item.stockTicker || item.name,
//       value: parseFloat(unrealized.toFixed(2)),
//     };
//   });

//   const chartDataPercent = summaries.map((item) => {
//     const lastPrice = parseFloat(item.lastPrice) || 0;
//     const avgCost = parseFloat(item.avgCost) || 0;
//     const unrealizedPercent = avgCost !== 0 ? ((lastPrice - avgCost) / avgCost) * 100 : 0;

//     return {
//       name: item.stockTicker || item.name,
//       value: parseFloat(unrealizedPercent.toFixed(2)),
//     };
//   });

//   const data = view === "pkr" ? chartDataPKR : chartDataPercent;

//   if (!data.length) return <p>No data for Gain/Loss</p>;

//   return (
//     <div className="chart-container">
//       <h3 className="chart-title">Unrealized Gain/Loss ({view === "pkr" ? "PKR" : "%"})</h3>

//       {/* Tab buttons */}
//       <div style={{ marginBottom: "10px", textAlign: "center" }}>
//         <button
//           onClick={() => setView("pkr")}
//           style={{
//             marginRight: "10px",
//             padding: "6px 12px",
//             background: view === "pkr" ? "#4CAF50" : "#ccc",
//             color: view === "pkr" ? "#fff" : "#000",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           PKR
//         </button>
//         <button
//           onClick={() => setView("percent")}
//           style={{
//             padding: "6px 12px",
//             background: view === "percent" ? "#4CAF50" : "#ccc",
//             color: view === "percent" ? "#fff" : "#000",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           %
//         </button>
//       </div>

//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
//           <YAxis
//             tickFormatter={(val) =>
//               view === "pkr" ? `Rs. ${val}` : `${val.toFixed(1)}%`
//             }
//           />
//           <Tooltip
//             formatter={(val) =>
//               view === "pkr" ? `Rs. ${val}` : `${val.toFixed(2)}%`
//             }
//           />
//           <Legend />
//           <Bar dataKey="value" name="Unrealized P/L">
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={entry.value >= 0 ? "#4CAF50" : "#F44336"}
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function GainLossChart({ summaries }) {
  const [mode, setMode] = useState("PKR"); // PKR or PERCENT

  const chartData = summaries.map((item) => {
    const lastPrice = parseFloat(item.lastPrice) || 0;
    const avgCost = parseFloat(item.avgCost) || 0;
    const shares = parseFloat(item.shares) || 0;
    const unrealizedPKR = (lastPrice - avgCost) * shares;
    const unrealizedPercent = ((lastPrice - avgCost) / avgCost) * 100;

    return {
      name: item.stockTicker || item.name,
      unrealizedPKR: parseFloat(unrealizedPKR.toFixed(2)),
      unrealizedPercent: parseFloat(unrealizedPercent.toFixed(2)),
    };
  });

  if (!chartData.length) return <p>No data for Gain/Loss</p>;

  const dataKey = mode === "PKR" ? "unrealizedPKR" : "unrealizedPercent";
  const tooltipFormatter = (val) =>
    mode === "PKR" ? `Rs. ${val}` : `${val.toFixed(2)}%`;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Unrealized Gain/Loss ({mode})</h3>

      {/* Tabs */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <button
          onClick={() => setMode("PKR")}
          style={{
            marginRight: 10,
            padding: "5px 10px",
            background: mode === "PKR" ? "#8884d8" : "#eee",
            color: mode === "PKR" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          PKR
        </button>
        <button
          onClick={() => setMode("PERCENT")}
          style={{
            padding: "5px 10px",
            background: mode === "PERCENT" ? "#8884d8" : "#eee",
            color: mode === "PERCENT" ? "#fff" : "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          %
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          <Bar dataKey={dataKey} name="Unrealized P/L">
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry[dataKey] >= 0 ? "#4CAF50" : "#F44336"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
