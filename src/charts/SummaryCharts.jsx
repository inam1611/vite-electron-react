// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#A28CFF",
//   "#FF6B6B",
//   "#4ECDC4",
//   "#F7B801",
// ];

// export default function SummaryCharts({ summaries }) {
//   const chartData = summaries.map((item) => ({
//     name: item.stockTicker || item.name,
//     value: parseFloat(item.portfolioPercent) || 0, // ✅ already percentage
//   }));

//   if (!chartData.length) return <p>No summary data available</p>;

//   return (
//     <div className="chart-container">
//       <h3 className="chart-title">Portfolio Distribution</h3>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             label={({ name, value }) => `${name}: ${value.toFixed(2)}%`} // ✅ format %
//           >
//             {chartData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip formatter={(val) => `${parseFloat(val).toFixed(2)}%`} /> {/* ✅ show % */}
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#A28CFF","#FF6B6B","#4ECDC4","#F7B801"];

// export default function SummaryCharts({ summaries }) {
//   const chartData = summaries.map(item => ({
//     name: item.stockTicker || item.name,
//     value: parseFloat(item.portfolioPercent) || 0
//   }));

//   if (!chartData.length) return <p>No summary data</p>;

//   return (
//     <div className="chart-container">
//       <h3 className="chart-title">Portfolio Distribution</h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={val => `${parseFloat(val).toFixed(2)}%`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#A28CFF","#FF6B6B","#4ECDC4","#F7B801"];

export default function SummaryCharts({ summaries }) {
  const chartData = summaries.map(item => ({
    name: item.stockTicker || item.name,
    value: parseFloat(item.portfolioPercent) || 0
  }));

  if (!chartData.length) return <p>No summary data</p>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Portfolio Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={false} // hide connecting lines
            label={({ name, value }) => value >= 5 ? `${name}: ${value.toFixed(2)}%` : ''} // only show if >=5%
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={val => `${parseFloat(val).toFixed(2)}%`} /> {/* tooltip for all */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
