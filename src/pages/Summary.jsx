// import React, { useState, useEffect } from "react";
// import SummaryTable from "../tables/SummaryTable";

// function Summary() {
//   const [summaries, setSummaries] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const rows = await window.electronAPI.readTransactions();

//       // Extract unique stock symbols
//       const symbols = rows
//         .map(txn => (txn["Stock Symbol"] || "").toUpperCase().trim())
//         .filter(symbol => symbol !== "");

//       const uniqueSymbols = [...new Set(symbols)];

//       // Fetch stock info from local API for each ticker
//       const summaryData = await Promise.all(
//         uniqueSymbols.map(async (symbol) => {
//           try {
//             const response = await fetch(`http://localhost:3001/api/stock-info/${symbol}`);
//             const data = await response.json();
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity", // placeholder
//               name: data.name || "",         // API returned name
//               xdxb: "",                      // placeholder
//               industry: data.industry || "", // API returned industry
//               portfolioPercent: 0            // placeholder
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               portfolioPercent: 0
//             };
//           }
//         })
//       );

//       setSummaries(summaryData);
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <div className="summary-page">
//       <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Summary</h1>
//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useState, useEffect } from "react";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import { styled } from "@mui/material/styles";
// import clsx from "clsx";
// import SummaryTable from "../tables/SummaryTable";
// import "../styles/SummaryTable.css";

// // Styled refresh icon with spin animation
// const RefreshIcon = styled(AutorenewIcon)(({ theme }) => ({
//   cursor: "pointer",
//   marginLeft: "1rem",
//   "&.spin": {
//     animation: "spin 1s linear",
//     pointerEvents: "none",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// }));

// function Summary() {
//   const [summaries, setSummaries] = useState([]);
//   const [spinning, setSpinning] = useState(false);

//   const fetchTransactions = async () => {
//     try {
//       setSpinning(true);

//       const rows = await window.electronAPI.readTransactions();

//       // Extract unique stock symbols
//       const symbols = rows
//         .map((txn) => (txn["Stock Symbol"] || "").toUpperCase().trim())
//         .filter((symbol) => symbol !== "");

//       const uniqueSymbols = [...new Set(symbols)];

//       // Fetch stock info for each ticker
//       const summaryData = await Promise.all(
//         uniqueSymbols.map(async (symbol) => {
//           try {
//             const response = await fetch(
//               `http://localhost:3001/api/stock-info/${symbol}`
//             );
//             const data = await response.json();
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: data.name || "",
//               xdxb: "",
//               industry: data.industry || "",
//               portfolioPercent: 0,
//             };
//           } catch (err) {
//             console.error(`❌ Error fetching stock info for ${symbol}:`, err);
//             return {
//               stockTicker: symbol,
//               investmentCategory: "Equity",
//               name: "",
//               xdxb: "",
//               industry: "",
//               portfolioPercent: 0,
//             };
//           }
//         })
//       );

//       setSummaries(summaryData);
//     } catch (err) {
//       console.error("❌ Failed to fetch transactions:", err);
//     } finally {
//       // stop spin after 1 second
//       setTimeout(() => setSpinning(false), 1000);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//         <RefreshIcon
//           className={clsx({ spin: spinning })}
//           onClick={fetchTransactions}
//           fontSize="medium"
//           titleAccess="Refresh"
//         />
//       </div>

//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;


// import React, { useEffect, useState } from "react";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import { styled } from "@mui/material/styles";
// import clsx from "clsx";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// // import "../styles/SummaryTable.css";
// import "../styles/Summary.css";
// import Draggable from "react-draggable";

// // Styled refresh icon with spin animation
// const RefreshIcon = styled(AutorenewIcon)(({ theme }) => ({
//   cursor: "pointer",
//   marginLeft: "1rem",
//   "&.spin": {
//     animation: "spin 1s linear",
//     pointerEvents: "none",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// }));

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();
//   const [spinning, setSpinning] = useState(false);

//   const handleRefresh = async () => {
//     setSpinning(true);
//     await fetchTransactions();
//     setTimeout(() => setSpinning(false), 1000);
//   };

//   // Fetch only once when summaries are empty
//   useEffect(() => {
//     if (summaries.length === 0) {
//       fetchTransactions();
//     }
//   }, []);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//         <button
//           className="refresh-button"
//           onClick={handleRefresh}
//           disabled={spinning}
//           title="Refresh"
//         >
//           <RefreshIcon className={clsx({ spin: spinning })} fontSize="medium" />
//         </button>
//       </div>

//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useEffect, useState } from "react";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import { styled } from "@mui/material/styles";
// import clsx from "clsx";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Summary.css";
// import Draggable from "react-draggable";

// // Styled refresh icon with spin animation
// const RefreshIcon = styled(AutorenewIcon)(({ theme }) => ({
//   cursor: "pointer",
//   marginLeft: "1rem",
//   "&.spin": {
//     animation: "spin 1s linear",
//     pointerEvents: "none",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// }));

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();
//   const [spinning, setSpinning] = useState(false);

//   const handleRefresh = async () => {
//     setSpinning(true);
//     await fetchTransactions();
//     setTimeout(() => setSpinning(false), 1000);
//   };

//   // Fetch only once when summaries are empty
//   useEffect(() => {
//     if (summaries.length === 0) {
//       fetchTransactions();
//     }
//   }, []);

//   // 🔹 Auto-save summaries to Excel after data loads
//   useEffect(() => {
//     if (summaries.length > 0) {
//       const timer = setTimeout(() => {
//         // Call Electron IPC to save summaries into summary.xlsx
//         window.electronAPI.saveSummaries(summaries);
//       }, 5000); // wait 3 seconds

//       return () => clearTimeout(timer);
//     }
//   }, [summaries]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//         <button
//           className="refresh-button"
//           onClick={handleRefresh}
//           disabled={spinning}
//           title="Refresh"
//         >
//           <RefreshIcon className={clsx({ spin: spinning })} fontSize="medium" />
//         </button>
//       </div>

//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useEffect, useState } from "react";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import { styled } from "@mui/material/styles";
// import clsx from "clsx";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Summary.css";
// import Draggable from "react-draggable";

// // Styled refresh icon with spin animation
// const RefreshIcon = styled(AutorenewIcon)(({ theme }) => ({
//   cursor: "pointer",
//   marginLeft: "1rem",
//   "&.spin": {
//     animation: "spin 1s linear",
//     pointerEvents: "none",
//   },
//   "@keyframes spin": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// }));

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();
//   const [spinning, setSpinning] = useState(false);

//   const handleRefresh = async () => {
//     setSpinning(true);
//     await fetchTransactions();

//     // 🔹 After fetching, update summary.xlsx with latest data
//     if (summaries.length > 0) {
//       window.electronAPI.saveSummaries(summaries);
//     }

//     setTimeout(() => setSpinning(false), 1000);
//   };

//   // Fetch only once when summaries are empty
//   useEffect(() => {
//     if (summaries.length === 0) {
//       fetchTransactions();
//     }
//   }, []);

//   // 🔹 Auto-save summaries when first loaded
//   useEffect(() => {
//     if (summaries.length > 0) {
//       const timer = setTimeout(() => {
//         window.electronAPI.saveSummaries(summaries);
//       }, 3000); // wait 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [summaries]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//         <button
//           className="refresh-button"
//           onClick={handleRefresh}
//           disabled={spinning}
//           title="Refresh"
//         >
//           <RefreshIcon className={clsx({ spin: spinning })} fontSize="medium" />
//         </button>
//       </div>

//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useEffect } from "react";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Summary.css";

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();

//   // Fetch only once when summaries are empty
//   useEffect(() => {
//     if (summaries.length === 0) {
//       fetchTransactions();
//     }
//   }, []);

//   // Auto-save summaries when first loaded
//   useEffect(() => {
//     if (summaries.length > 0) {
//       const timer = setTimeout(() => {
//         window.electronAPI.saveSummaries(summaries);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [summaries]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//       </div>

//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useEffect } from "react";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Summary.css";

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();

//   // Fetch once on first load if empty
//   useEffect(() => {
//     if (summaries.length === 0) {
//       fetchTransactions();
//     }
//   }, []);

//   // Auto-save summaries when they change
//   useEffect(() => {
//     if (summaries.length > 0) {
//       const timer = setTimeout(() => {
//         window.electronAPI.saveSummaries(summaries);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [summaries]);

//   // 🔹 Auto-refresh when main process pushes updates
//   useEffect(() => {
//     const handleTxnUpdate = () => {
//       console.log("🔄 Transactions updated → refreshing summary");
//       fetchTransactions();
//     };
//     const handleSummaryUpdate = () => {
//       console.log("🔄 Summary file updated → refreshing summary");
//       fetchTransactions();
//     };

//     window.electronAPI.onTransactionsUpdated(handleTxnUpdate);
//     window.electronAPI.onSummaryUpdated(handleSummaryUpdate);

//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handleTxnUpdate);
//       window.electronAPI.removeSummaryUpdated(handleSummaryUpdate);
//     };
//   }, []);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">Summary</h1>
//       </div>
//       <SummaryTable summaries={summaries} />
//     </div>
//   );
// }

// export default Summary;

// import React, { useEffect, useState } from "react";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Summary.css";

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();
//   const [activePortfolio, setActivePortfolio] = useState("portfolio1"); // ✅ default

//   // 🔹 Fetch on load + when portfolio changes
//   useEffect(() => {
//     fetchTransactions(activePortfolio);
//   }, [activePortfolio, fetchTransactions]);

//   // 🔹 Auto-refresh and save when main process pushes updates
//   useEffect(() => {
//     const handleTxnUpdate = async (_event, { portfolio }) => {
//       console.log("🔄 Transactions updated → refreshing summary", portfolio);
//       await fetchTransactions(portfolio || activePortfolio);

//       if (summaries[portfolio || activePortfolio]?.length > 0) {
//         window.electronAPI.saveSummaries(summaries[portfolio || activePortfolio]);
//       }
//     };

//     const handleSummaryUpdate = async (_event, { portfolio }) => {
//       console.log("🔄 Summary file updated → refreshing summary", portfolio);
//       await fetchTransactions(portfolio || activePortfolio);
//     };

//     window.electronAPI.onTransactionsUpdated(handleTxnUpdate);
//     window.electronAPI.onSummaryUpdated(handleSummaryUpdate);

//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handleTxnUpdate);
//       window.electronAPI.removeSummaryUpdated(handleSummaryUpdate);
//     };
//   }, [summaries, activePortfolio, fetchTransactions]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">
//           📊 Summary – {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//         </h1>

//         {/* 🔹 Portfolio Switcher */}
//         <div className="portfolio-selector">
//           <label>Select Portfolio: </label>
//           <select
//             value={activePortfolio}
//             onChange={(e) => setActivePortfolio(e.target.value)}
//           >
//             <option value="portfolio1">Portfolio 1</option>
//             <option value="portfolio2">Portfolio 2</option>
//           </select>
//         </div>
//       </div>

//       {/* 🔹 Show only active portfolio’s summary */}
//       <SummaryTable summaries={summaries[activePortfolio] || []} />
//     </div>
//   );
// }

// export default Summary;


// import React, { useEffect } from "react";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import { usePortfolio } from "../context/PortfolioContext";
// import "../styles/Summary.css";

// function Summary() {
//   const { summaries, fetchTransactions } = useSummary();
//   const { activePortfolio } = usePortfolio();

//   // Fetch when portfolio changes
//   useEffect(() => {
//     fetchTransactions(activePortfolio);
//   }, [activePortfolio, fetchTransactions]);

//   // Auto-refresh hooks
//   useEffect(() => {
//     const handleTxnUpdate = async (_event, { portfolio }) => {
//       const target = portfolio || activePortfolio;
//       console.log("🔄 Transactions updated → refreshing summary", target);
//       await fetchTransactions(target);

//       if (summaries[target]?.length > 0) {
//         window.electronAPI.saveSummaries(summaries[target]);
//       }
//     };

//     const handleSummaryUpdate = async (_event, { portfolio }) => {
//       console.log("🔄 Summary file updated → refreshing summary", portfolio);
//       await fetchTransactions(portfolio || activePortfolio);
//     };

//     window.electronAPI.onTransactionsUpdated(handleTxnUpdate);
//     window.electronAPI.onSummaryUpdated(handleSummaryUpdate);

//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handleTxnUpdate);
//       window.electronAPI.removeSummaryUpdated(handleSummaryUpdate);
//     };
//   }, [summaries, activePortfolio, fetchTransactions]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">
//           📊 Summary – {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//         </h1>
//       </div>

//       <SummaryTable summaries={summaries[activePortfolio] || []} />
//     </div>
//   );
// }

// export default Summary;

// // Summary.jsx
// import React, { useEffect, useRef } from "react";
// import SummaryTable from "../tables/SummaryTable";
// import { useSummary } from "../context/SummaryContext";
// import { usePortfolio } from "../context/PortfolioContext";
// import "../styles/Summary.css";

// function Summary() {
//   const { summaries, fetchTransactions, saveSummariesForPortfolio, getLastSavedTimestamp } =
//     useSummary();
//   const { activePortfolio } = usePortfolio();

//   // Keep debounce timers per portfolio
//   const debounceTimersRef = useRef({});

//   const debounceFetch = (portfolio, delay = 300) => {
//     if (debounceTimersRef.current[portfolio]) {
//       clearTimeout(debounceTimersRef.current[portfolio]);
//     }
//     debounceTimersRef.current[portfolio] = setTimeout(async () => {
//       await fetchTransactions(portfolio);
//     }, delay);
//   };

//   // Fetch when portfolio changes (initial load / user switch)
//   useEffect(() => {
//     fetchTransactions(activePortfolio);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activePortfolio]);

//   // Auto-refresh hooks: listen to main process events but debounce & ignore self-originated writes
//   useEffect(() => {
//     const handleTxnUpdate = async (_event, payload) => {
//       const target = payload?.portfolio || activePortfolio;
//       // Debounce quick bursts
//       debounceFetch(target, 250);

//       // After a small delay (allow fetch to complete), save the new summary (use centralized save)
//       setTimeout(async () => {
//         const summaryForTarget = summaries[target] || [];
//         if (summaryForTarget.length > 0) {
//           await saveSummariesForPortfolio(target);
//         }
//       }, 700); // 700ms gives enough time for fetchTransactions to complete in most cases
//     };

//     const handleSummaryUpdate = async (_event, payload) => {
//       const portfolio = payload?.portfolio || activePortfolio;
//       const ts = payload?.timestamp || 0;
//       const lastLocalTs = getLastSavedTimestamp(portfolio) || 0;

//       // If timestamp is close to our last local save, it's likely our own write — ignore
//       const delta = Math.abs(ts - lastLocalTs);
//       if (ts && lastLocalTs && delta < 2000) {
//         // ignore events caused by ourselves
//         console.log(`Ignored summary-updated for ${portfolio} (local write, Δ=${delta}ms)`);
//         return;
//       }

//       // Otherwise, we should refresh (debounced)
//       debounceFetch(portfolio, 250);
//     };

//     // Register handlers
//     window.electronAPI.onTransactionsUpdated(handleTxnUpdate);
//     window.electronAPI.onSummaryUpdated(handleSummaryUpdate);

//     // Cleanup
//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handleTxnUpdate);
//       window.electronAPI.removeSummaryUpdated(handleSummaryUpdate);

//       // clear any pending timers
//       Object.values(debounceTimersRef.current).forEach((t) => clearTimeout(t));
//       debounceTimersRef.current = {};
//     };
//   }, [activePortfolio, fetchTransactions, summaries, saveSummariesForPortfolio, getLastSavedTimestamp]);

//   return (
//     <div className="summary-page">
//       <div className="summary-header">
//         <h1 className="summary-title">
//           📊 Summary – {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//         </h1>
//       </div>

//       <SummaryTable summaries={summaries[activePortfolio] || []} />
//     </div>
//   );
// }

// export default Summary;

import React, { useEffect, useState } from "react";
import SummaryTable from "../tables/SummaryTable";
import { useSummary } from "../context/SummaryContext";
import { usePortfolio } from "../context/PortfolioContext";
import "../styles/Summary.css";

function Summary() {
  const { activePortfolio } = usePortfolio();
  const { summaries, fetchTransactions, isSaving, saveMessage } = useSummary();
  const [isLoading, setIsLoading] = useState(false);

  // Load summaries when portfolio changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchTransactions(activePortfolio); // context updates summaries automatically
      } finally {
        setIsLoading(false);
      }
    };

    if (activePortfolio) loadData();
  }, [activePortfolio, fetchTransactions]);

  const summaryData = summaries[activePortfolio] || [];

  return (
    <div className="summary-page">
      <div className="summary-header">
        <h1 className="summary-title">
          📊 Summary – {activePortfolio === "portfolio1" ? "K Trade Portfolio" : "JS Global Portfolio"}
        </h1>
      </div>

      <SummaryTable summaries={summaryData} />
    </div>
  );
}

export default Summary;
