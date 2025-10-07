// // import React, { useState } from "react";
// // export default function Dashboard() {
// //   return (
// //     <div>
// //       <h2>Dashboard Page</h2>
// //     </div>
// //   );
// // }


// // import React, { useEffect, useState } from "react";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const data = await window.electronAPI.readSummaries(); // ✅ from Excel
// //       setSummaries(data);
// //     };
// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen">
// //       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

// //       {/* Later: Pass `summaries` to chart components */}
// //       <pre>{JSON.stringify(summaries, null, 2)}</pre>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const data = await window.electronAPI.readSummaries(); // ✅ fetch from Excel
// //       console.log("Summaries from Excel:", data);
// //       setSummaries(data);
// //     };
// //     fetchData();
// //   }, []);

// //   // 🔹 Prepare chart data (stock ticker + portfolioPercent)
// //   const chartData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.portfolioPercent) || 0,
// //   }));

// //   const COLORS = [
// //     "#0088FE",
// //     "#00C49F",
// //     "#FFBB28",
// //     "#FF8042",
// //     "#A28CFF",
// //     "#FF6B6B",
// //     "#4ECDC4",
// //     "#F7B801",
// //   ];

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         height: "100vh",
// //         width: "100%",
// //       }}
// //     >
// //       <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
// //         Dashboard
// //       </h2>

// //       {chartData.length > 0 ? (
// //         <div style={{ width: "100%", height: "400px" }}>
// //           <ResponsiveContainer>
// //             <PieChart>
// //               <Pie
// //                 data={chartData}
// //                 dataKey="value"
// //                 nameKey="name"
// //                 cx="50%"
// //                 cy="50%"
// //                 outerRadius={120}
// //                 label
// //               >
// //                 {chartData.map((entry, index) => (
// //                   <Cell
// //                     key={`cell-${index}`}
// //                     fill={COLORS[index % COLORS.length]}
// //                   />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>
// //       ) : (
// //         <p>No summary data available</p>
// //       )}
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// // } from "recharts";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const data = await window.electronAPI.readSummaries(); // ✅ from Excel
// //       console.log("📊 Summaries from Excel:", data);
// //       setSummaries(data);
// //     };
// //     fetchData();
// //   }, []);

// //   // 🔹 Prepare chart data
// //   const pieData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.portfolioPercent) || 0,
// //   }));

// //   const barData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.realizedPnL) || 0, // or compute unrealized
// //   }));

// //   const COLORS = [
// //     "#0088FE",
// //     "#00C49F",
// //     "#FFBB28",
// //     "#FF8042",
// //     "#A28CFF",
// //     "#FF6B6B",
// //     "#4ECDC4",
// //     "#F7B801",
// //   ];

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         width: "100%",
// //         height: "100vh",
// //         padding: "20px",
// //       }}
// //     >
// //       <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
// //         Dashboard
// //       </h2>

// //       {summaries.length > 0 ? (
// //         <div
// //           style={{
// //             display: "flex",
// //             gap: "20px",
// //             justifyContent: "center",
// //             width: "100%",
// //           }}
// //         >
// //           {/* Pie Chart */}
// //           <div style={{ flex: 1, height: "400px" }}>
// //             <ResponsiveContainer>
// //               <PieChart>
// //                 <Pie
// //                   data={pieData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={120}
// //                   label
// //                 >
// //                   {pieData.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={COLORS[index % COLORS.length]}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Bar Chart */}
// //           <div style={{ flex: 1, height: "400px" }}>
// //             <ResponsiveContainer>
// //               <BarChart data={barData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="value" fill="#8884d8" name="Realized PnL" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       ) : (
// //         <p>No summary data available</p>
// //       )}
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   LineChart,
// //   Line,
// // } from "recharts";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);
// //   const [transactions, setTransactions] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const summaryData = await window.electronAPI.readSummaries();
// //       const transactionData = await window.electronAPI.readTransactions();

// //       console.log("📊 Summaries from Excel:", summaryData);
// //       console.log("📈 Transactions from Excel:", transactionData);

// //       setSummaries(summaryData);
// //       setTransactions(transactionData);
// //     };
// //     fetchData();
// //   }, []);

// //   // 🔹 Pie chart (portfolio %)
// //   const pieData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.portfolioPercent) || 0,
// //   }));

// //   // 🔹 Bar chart (PnL)
// //   const barData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.realizedPnL) || 0,
// //   }));

// //   // 🔹 Investment trend (Buy/Sell aggregated by date)
// //   const trendData = [];
// //   const investmentByDate = {};

// //   transactions.forEach((txn) => {
// //     const date = txn.Date;
// //     const units = parseFloat(txn["Number of Units"]) || 0;
// //     const price = parseFloat(txn["Price per Share"]) || 0;
// //     const type = txn.Type?.toLowerCase();

// //     if (type === "buy") {
// //       investmentByDate[date] =
// //         (investmentByDate[date] || 0) + units * price;
// //     } else if (type === "sell") {
// //       investmentByDate[date] =
// //         (investmentByDate[date] || 0) - units * price;
// //     }
// //     // dividends ignored for now
// //   });

// //   Object.keys(investmentByDate)
// //     .sort()
// //     .forEach((date) => {
// //       trendData.push({ date, amount: investmentByDate[date] });
// //     });

// //   const COLORS = [
// //     "#0088FE",
// //     "#00C49F",
// //     "#FFBB28",
// //     "#FF8042",
// //     "#A28CFF",
// //     "#FF6B6B",
// //     "#4ECDC4",
// //     "#F7B801",
// //   ];

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         width: "100%",
// //         height: "100vh",
// //         padding: "20px",
// //         overflow: "auto",
// //       }}
// //     >
// //       <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
// //         Dashboard
// //       </h2>

// //       {summaries.length > 0 ? (
// //         <div
// //           style={{
// //             display: "flex",
// //             gap: "20px",
// //             justifyContent: "center",
// //             width: "100%",
// //             marginBottom: "40px",
// //           }}
// //         >
// //           {/* Pie Chart */}
// //           <div style={{ flex: 1, height: "400px" }}>
// //             <ResponsiveContainer>
// //               <PieChart>
// //                 <Pie
// //                   data={pieData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={120}
// //                   label
// //                 >
// //                   {pieData.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={COLORS[index % COLORS.length]}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Bar Chart */}
// //           <div style={{ flex: 1, height: "400px" }}>
// //             <ResponsiveContainer>
// //               <BarChart data={barData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="value" fill="#8884d8" name="Realized PnL" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       ) : (
// //         <p>No summary data available</p>
// //       )}

// //       {/* Investment Trend Line Chart */}
// //       {trendData.length > 0 && (
// //         <div style={{ width: "100%", height: "400px" }}>
// //           <h3 style={{ textAlign: "center" }}>Investment Trend</h3>
// //           <ResponsiveContainer>
// //             <LineChart data={trendData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Invested Amount" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// // } from "recharts";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);
// //   const [transactions, setTransactions] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const summaryData = await window.electronAPI.readSummaries();
// //       const transactionData = await window.electronAPI.readTransactions();

// //       console.log("📊 Summaries:", summaryData);
// //       console.log("📈 Transactions:", transactionData);

// //       setSummaries(summaryData);
// //       setTransactions(transactionData);
// //     };
// //     fetchData();
// //   }, []);

// //   // -------------------------
// //   // Pie Chart Data (Portfolio %)
// //   // -------------------------
// //   const chartData = summaries.map((item) => ({
// //     name: item.stockTicker || item.name,
// //     value: parseFloat(item.portfolioPercent) || 0,
// //   }));

// //   const COLORS = [
// //     "#0088FE",
// //     "#00C49F",
// //     "#FFBB28",
// //     "#FF8042",
// //     "#A28CFF",
// //     "#FF6B6B",
// //     "#4ECDC4",
// //     "#F7B801",
// //   ];

// //   // -------------------------
// //   // Monthly Flow + Cumulative
// //   // -------------------------
// //   const monthlyFlow = {};

// //   transactions.forEach((txn) => {
// //     const date = txn.Date;
// //     if (!date) return;

// //     const month = date.slice(0, 7); // YYYY-MM
// //     const units = parseFloat(txn["Number of Units"]) || 0;
// //     const price = parseFloat(txn["Price per Share"]) || 0;
// //     const type = txn.Type?.toLowerCase();

// //     if (!monthlyFlow[month]) monthlyFlow[month] = 0;

// //     if (type === "buy") {
// //       monthlyFlow[month] += units * price;
// //     } else if (type === "sell") {
// //       monthlyFlow[month] -= units * price;
// //     }
// //     // Dividends ignored for now
// //   });

// //   const trendData = [];
// //   const cumulativeData = [];
// //   let runningTotal = 0;

// //   Object.keys(monthlyFlow)
// //     .sort()
// //     .forEach((month) => {
// //       const flow = monthlyFlow[month];
// //       runningTotal += flow;

// //       trendData.push({ month, flow });
// //       cumulativeData.push({ month, total: runningTotal });
// //     });

// //   // -------------------------
// //   // Render
// //   // -------------------------
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         padding: "20px",
// //         width: "100%",
// //       }}
// //     >
// //       <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
// //         Dashboard
// //       </h2>

// //       {/* Row 1: Pie Chart */}
// //       <div style={{ display: "flex", width: "100%", marginBottom: "40px" }}>
// //         {chartData.length > 0 ? (
// //           <div style={{ flex: 1, height: "400px" }}>
// //             <h3 style={{ textAlign: "center" }}>Portfolio Distribution</h3>
// //             <ResponsiveContainer>
// //               <PieChart>
// //                 <Pie
// //                   data={chartData}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={120}
// //                   label
// //                 >
// //                   {chartData.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={COLORS[index % COLORS.length]}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         ) : (
// //           <p>No summary data available</p>
// //         )}
// //       </div>

// //       {/* Row 2: Monthly Flow + Cumulative */}
// //       <div
// //         style={{
// //           display: "flex",
// //           width: "100%",
// //           gap: "20px",
// //         }}
// //       >
// //         {/* Monthly Flow */}
// //         <div style={{ flex: 1, height: "400px" }}>
// //           <h3 style={{ textAlign: "center" }}>Monthly Net Flow</h3>
// //           <ResponsiveContainer>
// //             <LineChart data={trendData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="month" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 type="monotone"
// //                 dataKey="flow"
// //                 stroke="#8884d8"
// //                 name="Monthly Flow"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         {/* Cumulative Invested */}
// //         <div style={{ flex: 1, height: "400px" }}>
// //           <h3 style={{ textAlign: "center" }}>Cumulative Invested</h3>
// //           <ResponsiveContainer>
// //             <LineChart data={cumulativeData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="month" />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 type="monotone"
// //                 dataKey="total"
// //                 stroke="#82ca9d"
// //                 name="Cumulative Total"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // import React, { useEffect, useState } from "react";
// // import SummaryCharts from "../charts/SummaryCharts";
// // import TransactionCharts from "../charts/TransactionCharts";
// // import "../styles/dashboard.css";

// // export default function Dashboard() {
// //   const [summaries, setSummaries] = useState([]);
// //   const [transactions, setTransactions] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const summaryData = await window.electronAPI.readSummaries();
// //       const transactionData = await window.electronAPI.readTransactions();
// //       setSummaries(summaryData);
// //       setTransactions(transactionData);
// //     };
// //     fetchData();
// //   }, []);

// //   return (
// //     <div className="dashboard-page">
// //       <h2 className="dashboard-title">Dashboard</h2>

// //       <div className="charts-row">
// //         <SummaryCharts summaries={summaries} />
// //       </div>

// //       <div className="charts-row">
// //         <TransactionCharts transactions={transactions} />
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import GainLossChart from "../charts/GainLossChart";
// import TransactionCharts from "../charts/TransactionCharts";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const [summaries, setSummaries] = useState([]);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const summaryData = await window.electronAPI.readSummaries();
//       const transactionData = await window.electronAPI.readTransactions();
//       setSummaries(summaryData);
//       setTransactions(transactionData);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">Dashboard</h2>

//       {/* Summary Charts Row */}
//       <div className="charts-row">
//         <SummaryCharts summaries={summaries} />
//         <GainLossChart summaries={summaries} />
//       </div>

//       {/* Transaction Charts Row */}
//       <div className="charts-row">
//         <TransactionCharts transactions={transactions} />
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import IndustryChart from "../charts/IndustryChart";
// import GainLossChart from "../charts/GainLossChart";
// import DividendChart from "../charts/DividendChart";
// import PriceChangeChart from "../charts/PriceChangeChart";
// import InvestmentTrendChart from "../charts/InvestmentTrendChart";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const [summaries, setSummaries] = useState([]);
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const summaryData = await window.electronAPI.readSummaries();
//       const transactionData = await window.electronAPI.readTransactions();
//       setSummaries(summaryData);
//       setTransactions(transactionData);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">Dashboard</h2>

//       {/* Top Row */}
//       <div className="charts-row">
//         <SummaryCharts summaries={summaries} />
//         <IndustryChart summaries={summaries} />
//       </div>

//       {/* Middle Row */}
//       <div className="charts-row">
//         <GainLossChart summaries={summaries} />
//         <DividendChart summaries={summaries} />
//       </div>

//       {/* Bottom Row */}
//       <div className="charts-row">
//         <PriceChangeChart summaries={summaries} />
//         <InvestmentTrendChart transactions={transactions} />
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import IndustryChart from "../charts/IndustryChart";
// import GainLossChart from "../charts/GainLossChart";
// import DividendChart from "../charts/DividendChart";
// import PriceChangeChart from "../charts/PriceChangeChart";
// import InvestmentTrendChart from "../charts/InvestmentTrendChart";
// import { usePortfolio } from "../context/PortfolioContext";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const { activePortfolio } = usePortfolio();
//   const [summaries, setSummaries] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (portfolioKey) => {
//     try {
//       setLoading(true);

//       // ✅ Ensure summaries are up-to-date
//       if (window.electronAPI.refreshSummaries) {
//         await window.electronAPI.refreshSummaries(portfolioKey);
//       }

//       const summaryData = await window.electronAPI.readSummaries(portfolioKey);
//       const transactionData = await window.electronAPI.readTransactions(portfolioKey);

//       setSummaries(summaryData || []);
//       setTransactions(transactionData || []);
//     } catch (err) {
//       console.error("❌ Error loading dashboard data:", err);
//       setSummaries([]);
//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activePortfolio) {
//       fetchData(activePortfolio);
//     }
//   }, [activePortfolio]);

//   useEffect(() => {
//     // ✅ Listen for IPC updates when summaries are refreshed elsewhere
//     const handleUpdate = () => {
//       console.log("📢 Summaries updated — refreshing dashboard...");
//       fetchData(activePortfolio);
//     };

//     if (window.electronAPI.onSummariesUpdated) {
//       window.electronAPI.onSummariesUpdated(handleUpdate);
//     }

//     return () => {
//       if (window.electronAPI.removeSummariesUpdated) {
//         window.electronAPI.removeSummariesUpdated(handleUpdate);
//       }
//     };
//   }, [activePortfolio]);

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">
//         Dashboard — {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//       </h2>

//       {loading && (
//         <div className="dashboard-status">
//           Refreshing {activePortfolio} data…
//         </div>
//       )}

//       {!loading && (
//         <>
//           <div className="charts-row">
//             <SummaryCharts summaries={summaries} />
//             <IndustryChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <GainLossChart summaries={summaries} />
//             <DividendChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <PriceChangeChart summaries={summaries} />
//             <InvestmentTrendChart transactions={transactions} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import IndustryChart from "../charts/IndustryChart";
// import GainLossChart from "../charts/GainLossChart";
// import DividendChart from "../charts/DividendChart";
// import PriceChangeChart from "../charts/PriceChangeChart";
// import InvestmentTrendChart from "../charts/InvestmentTrendChart";
// import { usePortfolio } from "../context/PortfolioContext";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const { activePortfolio } = usePortfolio();
//   const [summaries, setSummaries] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch summaries + transactions from files
//   const fetchData = async (portfolioKey, showLoader = true) => {
//     try {
//       if (showLoader) setLoading(true);

//       const summaryData = await window.electronAPI.readSummaries(portfolioKey);
//       const transactionData = await window.electronAPI.readTransactions(portfolioKey);

//       setSummaries(summaryData || []);
//       setTransactions(transactionData || []);
//     } catch (err) {
//       console.error("❌ Error loading dashboard data:", err);
//       setSummaries([]);
//       setTransactions([]);
//     } finally {
//       if (showLoader) setLoading(false);
//     }
//   };

//   // ✅ Load immediately when Dashboard mounts
//   useEffect(() => {
//     if (activePortfolio) {
//       console.log(`📊 Initializing dashboard for ${activePortfolio}`);
//       fetchData(activePortfolio);
//     }
//   }, [activePortfolio]);

//   // ✅ Refresh when summaries are updated elsewhere
//   useEffect(() => {
//     const handleSummaryUpdated = (_event, payload) => {
//       if (payload?.portfolio === activePortfolio) {
//         console.log(`📢 Summary updated for ${payload.portfolio}, reloading dashboard`);
//         fetchData(activePortfolio, false); // no loader flash
//       }
//     };

//     const handleTransactionsUpdated = (_event, payload) => {
//       if (payload?.portfolio === activePortfolio) {
//         console.log(`📢 Transactions updated for ${payload.portfolio}, refreshing charts`);
//         fetchData(activePortfolio, false);
//       }
//     };

//     window.electronAPI?.onSummaryUpdated?.(handleSummaryUpdated);
//     window.electronAPI?.onTransactionsUpdated?.(handleTransactionsUpdated);

//     return () => {
//       window.electronAPI?.removeSummaryUpdated?.(handleSummaryUpdated);
//       window.electronAPI?.removeTransactionsUpdated?.(handleTransactionsUpdated);
//     };
//   }, [activePortfolio]);

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">
//         Dashboard — {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//       </h2>

//       {loading ? (
//         <div className="dashboard-status">
//           Loading {activePortfolio} data…
//         </div>
//       ) : (
//         <>
//           <div className="charts-row">
//             <SummaryCharts summaries={summaries} />
//             <IndustryChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <GainLossChart summaries={summaries} />
//             <DividendChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <PriceChangeChart summaries={summaries} />
//             <InvestmentTrendChart transactions={transactions} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import IndustryChart from "../charts/IndustryChart";
// import GainLossChart from "../charts/GainLossChart";
// import DividendChart from "../charts/DividendChart";
// import PriceChangeChart from "../charts/PriceChangeChart";
// import InvestmentTrendChart from "../charts/InvestmentTrendChart";
// import { usePortfolio } from "../context/PortfolioContext";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const { activePortfolio } = usePortfolio();
//   const [summaries, setSummaries] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // === Load summaries & transactions ===
//   const fetchData = async (portfolioKey, showLoader = true) => {
//     try {
//       if (showLoader) setLoading(true);
//       const [summaryData, transactionData] = await Promise.all([
//         window.electronAPI.readSummaries(portfolioKey),
//         window.electronAPI.readTransactions(portfolioKey),
//       ]);
//       setSummaries(summaryData || []);
//       setTransactions(transactionData || []);
//     } catch (err) {
//       console.error("❌ Error loading dashboard data:", err);
//       setSummaries([]);
//       setTransactions([]);
//     } finally {
//       if (showLoader) setLoading(false);
//     }
//   };

//   // === Load on mount or portfolio switch ===
//   useEffect(() => {
//     if (activePortfolio) {
//       console.log(`📊 Loading dashboard for ${activePortfolio}`);
//       fetchData(activePortfolio);
//     }
//   }, [activePortfolio]);

//   // === Listen for backend updates ===
//   useEffect(() => {
//     const handleSummaryUpdated = (_e, payload) => {
//       if (payload?.portfolio === activePortfolio) {
//         console.log(`📢 Summary updated — refreshing ${activePortfolio}`);
//         fetchData(activePortfolio, false);
//       }
//     };

//     const handleTransactionsUpdated = (_e, payload) => {
//       if (payload?.portfolio === activePortfolio) {
//         console.log(`📢 Transactions updated — refreshing ${activePortfolio}`);
//         fetchData(activePortfolio, false);
//       }
//     };

//     window.electronAPI?.onSummaryUpdated?.(handleSummaryUpdated);
//     window.electronAPI?.onTransactionsUpdated?.(handleTransactionsUpdated);

//     return () => {
//       window.electronAPI?.removeSummaryUpdated?.(handleSummaryUpdated);
//       window.electronAPI?.removeTransactionsUpdated?.(handleTransactionsUpdated);
//     };
//   }, [activePortfolio]);

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">
//         Dashboard — {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//       </h2>

//       {loading ? (
//         <div className="dashboard-status">Loading {activePortfolio} data…</div>
//       ) : (
//         <>
//           <div className="charts-row">
//             <SummaryCharts summaries={summaries} />
//             <IndustryChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <GainLossChart summaries={summaries} />
//             <DividendChart summaries={summaries} />
//           </div>

//           <div className="charts-row">
//             <PriceChangeChart summaries={summaries} />
//             <InvestmentTrendChart transactions={transactions} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import SummaryCharts from "../charts/SummaryCharts";
// import IndustryChart from "../charts/IndustryChart";
// import GainLossChart from "../charts/GainLossChart";
// import DividendChart from "../charts/DividendChart";
// import PriceChangeChart from "../charts/PriceChangeChart";
// import InvestmentTrendChart from "../charts/InvestmentTrendChart";
// import { usePortfolio } from "../context/PortfolioContext";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/dashboard.css";

// export default function Dashboard() {
//   const { activePortfolio } = usePortfolio();
//   const { summaries } = useSummary(); // ✅ use live summaries from context
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // === Load transactions from file ===
//   const fetchTransactions = async (portfolioKey, showLoader = true) => {
//     try {
//       if (showLoader) setLoading(true);
//       const data = await window.electronAPI.readTransactions(portfolioKey);
//       setTransactions(data || []);
//     } catch (err) {
//       console.error("❌ Error reading transactions:", err);
//       setTransactions([]);
//     } finally {
//       if (showLoader) setLoading(false);
//     }
//   };

//   // === Load transactions whenever portfolio changes ===
//   useEffect(() => {
//     if (activePortfolio) {
//       console.log(`📊 Loading dashboard for ${activePortfolio}`);
//       fetchTransactions(activePortfolio);
//     }
//   }, [activePortfolio]);

//   // === Auto-refresh when transactions are updated ===
//   useEffect(() => {
//     const handleTransactionsUpdated = (_e, payload) => {
//       if (payload?.portfolio === activePortfolio) {
//         console.log(`📢 Transactions updated — refreshing charts`);
//         fetchTransactions(activePortfolio, false);
//       }
//     };

//     window.electronAPI?.onTransactionsUpdated?.(handleTransactionsUpdated);
//     return () => {
//       window.electronAPI?.removeTransactionsUpdated?.(handleTransactionsUpdated);
//     };
//   }, [activePortfolio]);

//   // === Get current summary data from context ===
//   const currentSummary =
//     summaries[activePortfolio] && summaries[activePortfolio].length > 0
//       ? summaries[activePortfolio]
//       : [];

//   return (
//     <div className="dashboard-page">
//       <h2 className="dashboard-title">
//         Dashboard —{" "}
//         {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//       </h2>

//       {loading ? (
//         <div className="dashboard-status">
//           Loading {activePortfolio} data…
//         </div>
//       ) : (
//         <>
//           <div className="charts-row">
//             <SummaryCharts summaries={currentSummary} />
//             <IndustryChart summaries={currentSummary} />
//           </div>

//           <div className="charts-row">
//             <GainLossChart summaries={currentSummary} />
//             <DividendChart summaries={currentSummary} />
//           </div>

//           <div className="charts-row">
//             <PriceChangeChart summaries={currentSummary} />
//             <InvestmentTrendChart transactions={transactions} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import SummaryCharts from "../charts/SummaryCharts";
import IndustryChart from "../charts/IndustryChart";
import GainLossChart from "../charts/GainLossChart";
import DividendChart from "../charts/DividendChart";
import PriceChangeChart from "../charts/PriceChangeChart";
import InvestmentTrendChart from "../charts/InvestmentTrendChart";
import { usePortfolio } from "../context/PortfolioContext";
import { useSummary } from "../context/SummaryContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { activePortfolio } = usePortfolio();
  const { summaries, fetchTransactions, isSaving, saveMessage } = useSummary();

  const [transactions, setTransactions] = useState([]);

  // === 🔹 Load transactions only once at mount or when portfolio changes ===
  useEffect(() => {
    const loadTransactions = async () => {
      const txns = await window.electronAPI.readTransactions(activePortfolio);
      setTransactions(txns || []);
    };

    if (activePortfolio) loadTransactions();
  }, [activePortfolio]);

  // === 🔹 Update only when transactions change via Electron trigger ===
  useEffect(() => {
    const handleTransactionsUpdated = async (_e, payload) => {
      if (payload?.portfolio === activePortfolio) {
        console.log(`🔁 Transactions updated for ${activePortfolio}`);
        await fetchTransactions(activePortfolio); // updates summaries in context
        const txns = await window.electronAPI.readTransactions(activePortfolio);
        setTransactions(txns || []);
      }
    };

    window.electronAPI?.onTransactionsUpdated?.(handleTransactionsUpdated);
    return () => {
      window.electronAPI?.removeTransactionsUpdated?.(handleTransactionsUpdated);
    };
  }, [activePortfolio, fetchTransactions]);

  const summaryData = summaries[activePortfolio] || [];

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">
        Dashboard — {activePortfolio === "portfolio1" ? "K Trade Portfolio" : "JS Global Portfolio"}
      </h2>

      {isSaving && (
        <div className="dashboard-status">
          {saveMessage || "Saving..."}
        </div>
      )}

      {summaryData.length === 0 ? (
        <div className="dashboard-status">
          No data available for {activePortfolio}
        </div>
      ) : (
        <>
          <div className="charts-row">
            <SummaryCharts summaries={summaryData} />
            <IndustryChart summaries={summaryData} />
          </div>

          <div className="charts-row">
            <GainLossChart summaries={summaryData} />
            <DividendChart summaries={summaryData} />
          </div>

          <div className="charts-row">
            <PriceChangeChart summaries={summaryData} />
            <InvestmentTrendChart transactions={transactions} />
          </div>
        </>
      )}
    </div>
  );
}
