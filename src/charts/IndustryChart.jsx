// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#A28CFF","#FF6B6B","#4ECDC4","#F7B801"];

// export default function IndustryChart({ summaries }) {
//   // Group by industry and sum portfolio %
//   const industryMap = {};
//   summaries.forEach(item => {
//     const industry = item.industry || "Others";
//     const value = parseFloat(item.portfolioPercent) || 0;
//     if (!industryMap[industry]) industryMap[industry] = 0;
//     industryMap[industry] += value;
//   });

//   const chartData = Object.keys(industryMap).map(key => ({
//     name: key,
//     value: industryMap[key]
//   }));

//   if (!chartData.length) return <p>No data for industry</p>;

//   return (
//     <div className="chart-container">
//       <h3 className="chart-title">Industry Distribution</h3>
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

export default function IndustryChart({ summaries }) {
  // Group by industry and sum portfolio %
  const industryMap = {};
  summaries.forEach(item => {
    const industry = item.industry || "Others";
    const value = parseFloat(item.portfolioPercent) || 0;
    if (!industryMap[industry]) industryMap[industry] = 0;
    industryMap[industry] += value;
  });

  // Convert to array and sort descending
  const chartData = Object.keys(industryMap)
    .map(key => ({ name: key, value: industryMap[key] }))
    .sort((a, b) => b.value - a.value);

  if (!chartData.length) return <p>No data for industry</p>;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Industry Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={false} // hide label lines
            label={({ name, value }) => value >= 5 ? `${name}: ${value.toFixed(2)}%` : ''} // only show labels for >=5%
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `${parseFloat(val).toFixed(2)}%`} /> {/* tooltip for all slices */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
