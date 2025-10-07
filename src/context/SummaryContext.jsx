// import React, { createContext, useState, useContext } from "react";
// import { extractNameAndXD, calculatePortfolio, calculateYieldOnCost } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   const [summaries, setSummaries] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const rows = await window.electronAPI.readTransactions();

//       // Group transactions by stock symbol
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // Prepare summary data
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           // Portfolio state (unrealized)
//           const { cumulativeUnits, cumulativeCost, avgCost } = calculatePortfolio(symbol, sorted);

//           // ✅ Calculate realized PnL (FIFO)
//           let realizedPnL = 0;
//           let buyQueue = []; // store { units, price }

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(txn["Price per Share"] || txn.pricePerShare || 0);
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;

//                 if (batch.units === 0) {
//                   buyQueue.shift();
//                 }
//               }
//             }
//           });

//           try {
//             const response = await fetch(`http://localhost:3001/api/stock-info/${symbol}`);
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0, // will calculate later
//               realizedPnL, // ✅ FIFO realized PnL
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // Calculate Portfolio % based on cumulativeCost
//       const totalInvested = summaryData.reduce((sum, item) => sum + (item.cumulativeCost || 0), 0);
//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent: totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       setSummaries(summaryData);
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//     }
//   };

//   return (
//     <SummaryContext.Provider value={{ summaries, fetchTransactions }}>
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);

// import React, { createContext, useState, useContext } from "react";
// import { extractNameAndXD, calculatePortfolio, calculateYieldOnCost } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   const [summaries, setSummaries] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const rows = await window.electronAPI.readTransactions();

//       // Group transactions by stock symbol
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // Prepare summary data
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           // Portfolio state (unrealized)
//           const { cumulativeUnits, cumulativeCost, avgCost } = calculatePortfolio(symbol, sorted);

//           // ✅ Calculate realized PnL (FIFO)
//           let realizedPnL = 0;
//           let dividendIncome = 0; // ✅ new
//           let buyQueue = [];

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(txn["Price per Share"] || txn.pricePerShare || 0);
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;
//                 if (batch.units === 0) {
//                   buyQueue.shift();
//                 }
//               }
//             } else if (type === "dividend") {
//               // Dividend payout = units * dividend per share (price field used for dividend/share)
//               dividendIncome += units * price - fees;
//             }
//           });

//           try {
//             const response = await fetch(`http://localhost:3001/api/stock-info/${symbol}`);
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0, // will calculate later
//               realizedPnL,
//               dividendIncome, // ✅ include in summary
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // Calculate Portfolio % based on cumulativeCost
//       const totalInvested = summaryData.reduce((sum, item) => sum + (item.cumulativeCost || 0), 0);
//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent: totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       setSummaries(summaryData);
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//     }
//   };

//   return (
//     <SummaryContext.Provider value={{ summaries, fetchTransactions }}>
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);


// import React, { createContext, useState, useContext } from "react";
// import { extractNameAndXD, calculatePortfolio, calculateYieldOnCost } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   // ✅ Store summaries separately
//   const [summaries, setSummaries] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });

//   // 🔹 Fetch transactions + build summary for one portfolio
//   const fetchTransactions = async (portfolioKey) => {
//     try {
//       const rows = await window.electronAPI.readTransactions(portfolioKey); // ✅ must be implemented in main

//       // Group transactions by stock symbol
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // Build summaries
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           const { cumulativeUnits, cumulativeCost, avgCost } = calculatePortfolio(symbol, sorted);

//           // FIFO PnL + dividends
//           let realizedPnL = 0;
//           let dividendIncome = 0;
//           let buyQueue = [];

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(txn["Price per Share"] || txn.pricePerShare || 0);
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;
//                 if (batch.units === 0) buyQueue.shift();
//               }
//             } else if (type === "dividend") {
//               dividendIncome += units * price - fees;
//             }
//           });

//           try {
//             const response = await fetch(`http://localhost:3001/api/stock-info/${symbol}`);
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // Add portfolio % allocation
//       const totalInvested = summaryData.reduce(
//         (sum, item) => sum + (item.cumulativeCost || 0),
//         0
//       );

//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent:
//           totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       // ✅ Update only one portfolio
//       setSummaries((prev) => ({
//         ...prev,
//         [portfolioKey]: summaryData,
//       }));
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//     }
//   };

//   return (
//     <SummaryContext.Provider value={{ summaries, fetchTransactions }}>
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);

// // SummaryContext.jsx
// import React, { createContext, useState, useContext, useRef } from "react";
// import {
//   extractNameAndXD,
//   calculatePortfolio,
//   calculateYieldOnCost,
// } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   // ✅ Store summaries separately
//   const [summaries, setSummaries] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });

//   // Keep last local save timestamps per portfolio to avoid reacting to our own writes
//   const lastLocalSaveTs = useRef({
//     portfolio1: 0,
//     portfolio2: 0,
//   });

//   // Utility to get last saved ts
//   const getLastSavedTimestamp = (portfolioKey) =>
//     lastLocalSaveTs.current[portfolioKey] || 0;

//   // Save summaries for a portfolio (centralized)
//   const saveSummariesForPortfolio = async (portfolioKey) => {
//     try {
//       const payload = summaries[portfolioKey] || [];
//       const res = await window.electronAPI.saveSummaries(payload, {
//         portfolio: portfolioKey,
//       });
//       if (res && res.success && res.timestamp) {
//         lastLocalSaveTs.current[portfolioKey] = res.timestamp;
//         console.log(
//           `✅ Saved summaries for ${portfolioKey} — ts=${res.timestamp}`
//         );
//       } else if (res && res.timestamp) {
//         // fallback if success flag missing
//         lastLocalSaveTs.current[portfolioKey] = res.timestamp;
//       }
//       return res;
//     } catch (err) {
//       console.error("❌ Error saving summaries via electronAPI:", err);
//       return null;
//     }
//   };

//   // 🔹 Fetch transactions + build summary for one portfolio
//   const fetchTransactions = async (portfolioKey) => {
//     try {
//       const rows = await window.electronAPI.readTransactions(portfolioKey); // ✅ must be implemented in main

//       // Group transactions by stock symbol
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // Build summaries
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           const { cumulativeUnits, cumulativeCost, avgCost } = calculatePortfolio(
//             symbol,
//             sorted
//           );

//           // FIFO PnL + dividends
//           let realizedPnL = 0;
//           let dividendIncome = 0;
//           let buyQueue = [];

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(
//               txn["Price per Share"] || txn.pricePerShare || 0
//             );
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;
//                 if (batch.units === 0) buyQueue.shift();
//               }
//             } else if (type === "dividend") {
//               dividendIncome += units * price - fees;
//             }
//           });

//           try {
//             const response = await fetch(
//               `http://localhost:3001/api/stock-info/${symbol}`
//             );
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // Add portfolio % allocation
//       const totalInvested = summaryData.reduce(
//         (sum, item) => sum + (item.cumulativeCost || 0),
//         0
//       );

//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent:
//           totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       // ✅ Update only one portfolio
//       setSummaries((prev) => ({
//         ...prev,
//         [portfolioKey]: summaryData,
//       }));
//       return summaryData;
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//       return [];
//     }
//   };

//   return (
//     <SummaryContext.Provider
//       value={{
//         summaries,
//         fetchTransactions,
//         saveSummariesForPortfolio,
//         getLastSavedTimestamp,
//       }}
//     >
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);

// // SummaryContext.jsx
// import React, { createContext, useState, useContext, useRef } from "react";
// import {
//   extractNameAndXD,
//   calculatePortfolio,
//   calculateYieldOnCost,
// } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   // ✅ Store summaries separately for each portfolio
//   const [summaries, setSummaries] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });

//   // ✅ Track last local save timestamps per portfolio
//   const lastLocalSaveTs = useRef({
//     portfolio1: 0,
//     portfolio2: 0,
//   });

//   // ✅ Helper — get last saved timestamp
//   const getLastSavedTimestamp = (portfolioKey) =>
//     lastLocalSaveTs.current[portfolioKey] || 0;

//   // ✅ Save summaries for a portfolio (to Excel via Electron)
//   const saveSummariesForPortfolio = async (portfolioKey) => {
//     try {
//       const payload = summaries[portfolioKey] || [];
//       const res = await window.electronAPI.saveSummaries(payload, {
//         portfolio: portfolioKey,
//       });
//       if (res && res.success && res.timestamp) {
//         lastLocalSaveTs.current[portfolioKey] = res.timestamp;
//         console.log(
//           `✅ Saved summaries for ${portfolioKey} — ts=${res.timestamp}`
//         );
//       }
//       return res;
//     } catch (err) {
//       console.error("❌ Error saving summaries via electronAPI:", err);
//       return null;
//     }
//   };

//   // ✅ Fetch transactions and build summaries for one portfolio
//   const fetchTransactions = async (portfolioKey) => {
//     try {
//       const rows = await window.electronAPI.readTransactions(portfolioKey);

//       // --- Group transactions by stock symbol ---
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // --- Build summaries for each stock ---
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           const { cumulativeUnits, cumulativeCost, avgCost } =
//             calculatePortfolio(symbol, sorted);

//           // FIFO PnL + dividends
//           let realizedPnL = 0;
//           let dividendIncome = 0;
//           let buyQueue = [];

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(
//               txn["Price per Share"] || txn.pricePerShare || 0
//             );
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;
//                 if (batch.units === 0) buyQueue.shift();
//               }
//             } else if (type === "dividend") {
//               dividendIncome += units * price - fees;
//             }
//           });

//           try {
//             // --- Fetch stock info from backend ---
//             const response = await fetch(
//               `http://localhost:3001/api/stock-info/${symbol}`
//             );
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // --- Calculate Portfolio % Allocation ---
//       const totalInvested = summaryData.reduce(
//         (sum, item) => sum + (item.cumulativeCost || 0),
//         0
//       );
//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent:
//           totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       // ✅ Update state for the current portfolio
//       setSummaries((prev) => ({
//         ...prev,
//         [portfolioKey]: summaryData,
//       }));

//       // ✅ Auto-save summary to Excel immediately
//       await saveSummariesForPortfolio(portfolioKey);

//       return summaryData;
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//       return [];
//     }
//   };

//   return (
//     <SummaryContext.Provider
//       value={{
//         summaries,
//         fetchTransactions,
//         saveSummariesForPortfolio,
//         getLastSavedTimestamp,
//       }}
//     >
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);

// SummaryContext.jsx
// import React, { createContext, useState, useContext, useRef } from "react";
// import {
//   extractNameAndXD,
//   calculatePortfolio,
//   calculateYieldOnCost,
// } from "../utils/SummaryUtils.jsx";

// const SummaryContext = createContext();

// export const SummaryProvider = ({ children }) => {
//   // ✅ Separate summaries for each portfolio
//   const [summaries, setSummaries] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });

//   // ✅ Track saving/loading states
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveMessage, setSaveMessage] = useState("");

//   // ✅ Track last local save timestamps per portfolio
//   const lastLocalSaveTs = useRef({
//     portfolio1: 0,
//     portfolio2: 0,
//   });

//   // Helper to get timestamp
//   const getLastSavedTimestamp = (portfolioKey) =>
//     lastLocalSaveTs.current[portfolioKey] || 0;

//   // ✅ Save summaries for a portfolio (to Excel via Electron)
//   const saveSummariesForPortfolio = async (portfolioKey) => {
//     try {
//       setIsSaving(true);
//       setSaveMessage(`Saving ${portfolioKey} summary...`);

//       const payload = summaries[portfolioKey] || [];
//       const res = await window.electronAPI.saveSummaries(payload, {
//         portfolio: portfolioKey,
//       });

//       if (res && res.success && res.timestamp) {
//         lastLocalSaveTs.current[portfolioKey] = res.timestamp;
//         console.log(`✅ Saved summaries for ${portfolioKey} — ts=${res.timestamp}`);
//         setSaveMessage(`✅ Saved ${portfolioKey} successfully`);
//       } else {
//         setSaveMessage(`⚠️ Failed to save ${portfolioKey}`);
//       }

//       setTimeout(() => setSaveMessage(""), 2000); // hide message after 2s
//       return res;
//     } catch (err) {
//       console.error("❌ Error saving summaries via electronAPI:", err);
//       setSaveMessage("❌ Error saving summary");
//       setTimeout(() => setSaveMessage(""), 2000);
//       return null;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ✅ Fetch transactions and build summaries for one portfolio
//   const fetchTransactions = async (portfolioKey) => {
//     try {
//       setIsSaving(true);
//       setSaveMessage(`Fetching data for ${portfolioKey}...`);

//       const rows = await window.electronAPI.readTransactions(portfolioKey);

//       // --- Group transactions by stock symbol ---
//       const stockGroups = {};
//       rows.forEach((txn) => {
//         const symbol = (txn["Stock Symbol"] || txn.stockName || "")
//           .toUpperCase()
//           .trim();
//         if (!symbol) return;
//         if (!stockGroups[symbol]) stockGroups[symbol] = [];
//         stockGroups[symbol].push(txn);
//       });

//       // --- Build summaries for each stock ---
//       let summaryData = await Promise.all(
//         Object.entries(stockGroups).map(async ([symbol, txns]) => {
//           const sorted = txns.sort(
//             (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
//           );

//           const { cumulativeUnits, cumulativeCost, avgCost } =
//             calculatePortfolio(symbol, sorted);

//           // FIFO PnL + dividends
//           let realizedPnL = 0;
//           let dividendIncome = 0;
//           let buyQueue = [];

//           sorted.forEach((txn) => {
//             const type = (txn.Type || txn.type || "").toLowerCase();
//             const units = Number(txn["Number of Units"] || txn.units || 0);
//             const price = Number(
//               txn["Price per Share"] || txn.pricePerShare || 0
//             );
//             const fees = Number(txn.fees) || 0;

//             if (type === "buy") {
//               buyQueue.push({ units, price });
//             } else if (type === "sell") {
//               let unitsToSell = units;
//               while (unitsToSell > 0 && buyQueue.length > 0) {
//                 const batch = buyQueue[0];
//                 const sellQty = Math.min(unitsToSell, batch.units);
//                 realizedPnL += (price - batch.price) * sellQty - fees;

//                 batch.units -= sellQty;
//                 unitsToSell -= sellQty;
//                 if (batch.units === 0) buyQueue.shift();
//               }
//             } else if (type === "dividend") {
//               dividendIncome += units * price - fees;
//             }
//           });

//           try {
//             // --- Fetch stock info from backend ---
//             const response = await fetch(
//               `http://localhost:3001/api/stock-info/${symbol}`
//             );
//             const data = await response.json();
//             const { name, xdxb } = extractNameAndXD(data.name);

//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name,
//               xdxb,
//               industry: data.industry || "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: data.closingPrice,
//               changeValue: data.changeValue,
//               changePercent: data.changePercent,
//               yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: data,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               shares: cumulativeUnits,
//               cumulativeCost,
//               avgCost,
//               lastPrice: null,
//               changeValue: null,
//               changePercent: "",
//               yieldOnCost: null,
//               portfolioPercent: 0,
//               realizedPnL,
//               dividendIncome,
//               rawJson: {},
//             };
//           }
//         })
//       );

//       // --- Portfolio % allocation ---
//       const totalInvested = summaryData.reduce(
//         (sum, item) => sum + (item.cumulativeCost || 0),
//         0
//       );
//       summaryData = summaryData.map((item) => ({
//         ...item,
//         portfolioPercent:
//           totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
//       }));

//       // ✅ Update current portfolio
//       setSummaries((prev) => ({
//         ...prev,
//         [portfolioKey]: summaryData,
//       }));

//       // ✅ Auto-save to Excel
//       setSaveMessage(`💾 Auto-saving ${portfolioKey}...`);
//       await saveSummariesForPortfolio(portfolioKey);

//       setSaveMessage(`✅ ${portfolioKey} updated`);
//       setTimeout(() => setSaveMessage(""), 2500);

//       return summaryData;
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//       setSaveMessage("❌ Fetch failed");
//       setTimeout(() => setSaveMessage(""), 2000);
//       return [];
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <SummaryContext.Provider
//       value={{
//         summaries,
//         fetchTransactions,
//         saveSummariesForPortfolio,
//         getLastSavedTimestamp,
//         isSaving,
//         saveMessage,
//       }}
//     >
//       {children}
//     </SummaryContext.Provider>
//   );
// };

// export const useSummary = () => useContext(SummaryContext);

import React, { createContext, useState, useContext, useRef } from "react";
import {
  extractNameAndXD,
  calculatePortfolio,
  calculateYieldOnCost,
} from "../utils/SummaryUtils.jsx";

const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const [summaries, setSummaries] = useState({
    portfolio1: [],
    portfolio2: [],
  });

  // Track local save timestamps to prevent unnecessary reloads
  const lastLocalSaveTs = useRef({
    portfolio1: 0,
    portfolio2: 0,
  });

  const getLastSavedTimestamp = (portfolioKey) =>
    lastLocalSaveTs.current[portfolioKey] || 0;

  // 🔹 Read summaries for one portfolio (from file)
  const loadSummariesForPortfolio = async (portfolioKey) => {
    try {
      const data = await window.electronAPI.readSummaries(portfolioKey);
      setSummaries((prev) => ({
        ...prev,
        [portfolioKey]: data || [],
      }));
      return data;
    } catch (err) {
      console.error(`❌ Error reading summaries for ${portfolioKey}:`, err);
      return [];
    }
  };

  // 🔹 Save summaries for one portfolio
  const saveSummariesForPortfolio = async (portfolioKey) => {
    try {
      const payload = summaries[portfolioKey] || [];
      const res = await window.electronAPI.saveSummaries(payload, {
        portfolio: portfolioKey,
      });
      if (res?.success && res.timestamp) {
        lastLocalSaveTs.current[portfolioKey] = res.timestamp;
        console.log(`✅ Saved summaries for ${portfolioKey} — ts=${res.timestamp}`);
      }
      return res;
    } catch (err) {
      console.error("❌ Error saving summaries via electronAPI:", err);
      return null;
    }
  };

  // 🔹 Build summary from transactions (per portfolio)
  const fetchTransactions = async (portfolioKey) => {
    try {
      const rows = await window.electronAPI.readTransactions(portfolioKey);
      if (!rows || rows.length === 0) {
        console.warn(`⚠️ No transactions found for ${portfolioKey}`);
        return [];
      }

      // Group by stock symbol
      const stockGroups = {};
      rows.forEach((txn) => {
        const symbol = (txn["Stock Symbol"] || txn.stockName || "")
          .toUpperCase()
          .trim();
        if (!symbol) return;
        if (!stockGroups[symbol]) stockGroups[symbol] = [];
        stockGroups[symbol].push(txn);
      });

      // Build summary items
      let summaryData = await Promise.all(
        Object.entries(stockGroups).map(async ([symbol, txns]) => {
          const sorted = txns.sort(
            (a, b) => new Date(a.Date || a.date) - new Date(b.Date || b.date)
          );
          const { cumulativeUnits, cumulativeCost, avgCost } = calculatePortfolio(
            symbol,
            sorted
          );

          let realizedPnL = 0;
          let dividendIncome = 0;
          const buyQueue = [];

          sorted.forEach((txn) => {
            const type = (txn.Type || txn.type || "").toLowerCase();
            const units = Number(txn["Number of Units"] || txn.units || 0);
            const price = Number(txn["Price per Share"] || txn.pricePerShare || 0);
            const fees = Number(txn.fees) || 0;

            if (type === "buy") {
              buyQueue.push({ units, price });
            } else if (type === "sell") {
              let unitsToSell = units;
              while (unitsToSell > 0 && buyQueue.length > 0) {
                const batch = buyQueue[0];
                const sellQty = Math.min(unitsToSell, batch.units);
                realizedPnL += (price - batch.price) * sellQty - fees;

                batch.units -= sellQty;
                unitsToSell -= sellQty;
                if (batch.units === 0) buyQueue.shift();
              }
            } else if (type === "dividend") {
              dividendIncome += units * price - fees;
            }
          });

          try {
            const response = await fetch(`http://localhost:3001/api/stock-info/${symbol}`);
            const data = await response.json();
            const { name, xdxb } = extractNameAndXD(data.name);

            return {
              stockTicker: symbol,
              investmentCategory: "Equity",
              name,
              xdxb,
              industry: data.industry || "",
              shares: cumulativeUnits,
              cumulativeCost,
              avgCost,
              lastPrice: data.closingPrice,
              changeValue: data.changeValue,
              changePercent: data.changePercent,
              yieldOnCost: calculateYieldOnCost(data.closingPrice, avgCost),
              portfolioPercent: 0,
              realizedPnL,
              dividendIncome,
            };
          } catch (err) {
            console.error(`❌ Error fetching stock info for ${symbol}:`, err);
            return {
              stockTicker: symbol,
              name: "",
              industry: "",
              shares: cumulativeUnits,
              cumulativeCost,
              avgCost,
              lastPrice: null,
              changeValue: null,
              changePercent: "",
              yieldOnCost: null,
              portfolioPercent: 0,
              realizedPnL,
              dividendIncome,
            };
          }
        })
      );

      const totalInvested = summaryData.reduce(
        (sum, item) => sum + (item.cumulativeCost || 0),
        0
      );

      summaryData = summaryData.map((item) => ({
        ...item,
        portfolioPercent:
          totalInvested > 0 ? (item.cumulativeCost / totalInvested) * 100 : 0,
      }));

      // Update state
      setSummaries((prev) => ({
        ...prev,
        [portfolioKey]: summaryData,
      }));

      // Save after build
      await saveSummariesForPortfolio(portfolioKey);
      return summaryData;
    } catch (err) {
      console.error("❌ Failed to fetch transactions:", err);
      return [];
    }
  };

  return (
    <SummaryContext.Provider
      value={{
        summaries,
        fetchTransactions,
        loadSummariesForPortfolio,
        saveSummariesForPortfolio,
        getLastSavedTimestamp,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => useContext(SummaryContext);

