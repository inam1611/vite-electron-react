// import React, { useState } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   const addTransaction = (transaction) => {
//     setTransactions([...transactions, transaction]);
//   };

//   const handleDelete = (index) => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this transaction?"
//   );
//   if (confirmDelete) {
//     setTransactions(transactions.filter((_, i) => i !== index));
//   }
// };


//   return (
//     <>
//       <TransactionsForm addTransaction={addTransaction} />
//       {/* Pass the delete handler to the table */}
//       <TransactionTable transactions={transactions} onDelete={handleDelete} />
//     </>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   // ✅ Define fetchTransactions once, so we can reuse
//   const fetchTransactions = async () => {
//     console.log("🔄 Fetching transactions from Excel...");
//     try {
//       const rows = await window.electronAPI.readTransactions();
//       console.log("📊 Transactions loaded:", rows);
//       setTransactions(rows);
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//     }
//   };

//   // Load data on first render
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // Add transaction + reload
//   const addTransaction = async (transaction) => {
//     console.log("➕ Adding transaction:", transaction);
//     try {
//       await window.electronAPI.writeTransaction(transaction);
//       await fetchTransactions(); // reload after saving
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   // Delete transaction (frontend only for now)
//   const handleDelete = (index) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this transaction?"
//     );
//     if (confirmDelete) {
//       console.log("🗑️ Deleting transaction at index:", index);
//       setTransactions(transactions.filter((_, i) => i !== index));
//     }
//   };

//   console.log("📦 Transactions state before render:", transactions);

//   return (
//     <>
//       <TransactionsForm addTransaction={addTransaction} />
//       <TransactionTable transactions={transactions} onDelete={handleDelete} />
//     </>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";
// import { TRANSACTION_HEADERS } from "../../shared/transaction_config.js";




// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   const fetchTransactions = async () => {
//     console.log("🔄 Fetching transactions from Excel...");
//     try {
//       const rows = await window.electronAPI.readTransactions();
//       console.log("📊 Transactions loaded:", rows);
//       setTransactions(rows);
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const addTransaction = async (transaction) => {
//     console.log("➕ Adding transaction:", transaction);
//     try {
//       await window.electronAPI.writeTransaction(transaction);
//       await fetchTransactions();
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       console.log("🗑️ Deleting transaction at index:", index);
//       setTransactions(transactions.filter((_, i) => i !== index));
//     }
//   };

//   console.log("📦 Transactions state before render:", transactions);

//   return (
//     <>
//       <TransactionsForm addTransaction={addTransaction} />
//       <TransactionTable
//         headers={TRANSACTION_HEADERS}   // ✅ pass headers
//         transactions={transactions}
//         onDelete={handleDelete}
//       />
//     </>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const rows = await window.electronAPI.readTransactions();
//       setTransactions(rows);
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const addTransaction = async (transaction) => {
//     try {
//       await window.electronAPI.writeTransaction(transaction);
//       await fetchTransactions();
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   const handleDelete = async (index) => {
//   if (!window.confirm("Are you sure you want to delete this transaction?")) return;

//   try {
//     const updatedRows = await window.electronAPI.deleteTransaction(index);

//     // If the IPC returned {success: false}, log error
//     if (!Array.isArray(updatedRows)) {
//       console.error("❌ Failed to delete transaction:", updatedRows.error);
//       return;
//     }

//     // ✅ Update frontend state
//     setTransactions(updatedRows);
//   } catch (err) {
//     console.error("❌ Error deleting transaction:", err);
//   }
// };


//   return (
//     <>
//       <TransactionsForm addTransaction={addTransaction} />
//       <TransactionTable
//         headers={TRANSACTION_HEADERS}
//         transactions={transactions}
//         onDelete={handleDelete}
//       />
//     </>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   // ✅ Initial load
//   const fetchTransactions = async () => {
//     try {
//       const rows = await window.electronAPI.readTransactions();
//       setTransactions(rows);
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();

//     // ✅ Listen for push updates from Electron main
//     const handler = (event, updatedRows) => {
//       setTransactions(updatedRows);
//     };

//     window.electronAPI.onTransactionsUpdated(handler);

//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handler);
//     };
//   }, []);

//   // ✅ Add transaction (main process will push update automatically)
//   const addTransaction = async (transaction) => {
//     try {
//       await window.electronAPI.writeTransaction(transaction);
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   // ✅ Delete transaction (main process will push update automatically)
//   const handleDelete = async (index) => {
//     if (!window.confirm("Are you sure you want to delete this transaction?")) return;

//     try {
//       await window.electronAPI.deleteTransaction(index);
//     } catch (err) {
//       console.error("❌ Error deleting transaction:", err);
//     }
//   };

//   return (
//     <>
//       <TransactionsForm addTransaction={addTransaction} />
//       <TransactionTable
//         headers={TRANSACTION_HEADERS}
//         transactions={transactions}
//         onDelete={handleDelete}
//       />
//     </>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect, useCallback } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";

// function Transactions() {
//   const [transactionsByPortfolio, setTransactionsByPortfolio] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });
//   const [activePortfolio, setActivePortfolio] = useState("portfolio1"); // ✅ default

//   // ✅ Load transactions for selected portfolio
//   const fetchTransactions = useCallback(async (portfolio) => {
//     try {
//       const rows = await window.electronAPI.readTransactions(portfolio);
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: Array.isArray(rows) ? rows : [],
//       }));
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: [],
//       }));
//     }
//   }, []);

//   // ✅ Attach listener ONCE
//   useEffect(() => {
//     const handler = (event, { portfolio, data }) => {
//       if (!portfolio) return;
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: Array.isArray(data) ? data : [],
//       }));
//     };

//     window.electronAPI.onTransactionsUpdated(handler);
//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handler);
//     };
//   }, []);

//   // ✅ Fetch when portfolio changes
//   useEffect(() => {
//     if (activePortfolio) {
//       fetchTransactions(activePortfolio);
//     }
//   }, [activePortfolio, fetchTransactions]);

//   // ✅ Add transaction (refresh immediately after write)
//   const addTransaction = async (transaction) => {
//     try {
//       await window.electronAPI.writeTransaction({
//         ...transaction,
//         portfolio: activePortfolio,
//       });
//       await fetchTransactions(activePortfolio); // 🔹 refresh immediately
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   // ✅ Delete transaction (refresh immediately after delete)
//   const handleDelete = async (index) => {
//     if (!window.confirm("Are you sure you want to delete this transaction?")) return;
//     try {
//       await window.electronAPI.deleteTransaction(index, activePortfolio);
//       await fetchTransactions(activePortfolio); // 🔹 refresh immediately
//     } catch (err) {
//       console.error("❌ Error deleting transaction:", err);
//     }
//   };

//   const currentTransactions = transactionsByPortfolio[activePortfolio] || [];

//   return (
//     <div>
//       <h2>
//         Transactions –{" "}
//         {activePortfolio === "portfolio1" ? "Portfolio 1" : "Portfolio 2"}
//       </h2>

//       {/* 🔹 Portfolio Switcher */}
//       <div style={{ marginBottom: "1rem" }}>
//         <label>Select Portfolio: </label>
//         <select
//           value={activePortfolio}
//           onChange={(e) => setActivePortfolio(e.target.value)}
//         >
//           <option value="portfolio1">Portfolio 1</option>
//           <option value="portfolio2">Portfolio 2</option>
//         </select>
//       </div>

//       {/* 🔹 Form and Table */}
//       <TransactionsForm addTransaction={addTransaction} />
//       {currentTransactions.length > 0 ? (
//         <TransactionTable
//           headers={TRANSACTION_HEADERS}
//           transactions={currentTransactions}
//           onDelete={handleDelete}
//         />
//       ) : (
//         <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
//           No transactions in this portfolio yet.
//         </p>
//       )}
//     </div>
//   );
// }

// export default Transactions;

// import React, { useState, useEffect, useCallback } from "react";
// import TransactionsForm from "../forms/TransactionsForm";
// import TransactionTable from "../tables/TransactionTable";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";
// import "../styles/Transactions.css";
// function Transactions() {
//   const [transactionsByPortfolio, setTransactionsByPortfolio] = useState({
//     portfolio1: [],
//     portfolio2: [],
//   });
//   const [activePortfolio, setActivePortfolio] = useState("portfolio1");

//   // 🔹 Helper → sort oldest → newest
//   const sortByDateAsc = (rows) => {
//     return [...rows].sort((a, b) => {
//       const da = new Date(a.Date || a.date);
//       const db = new Date(b.Date || b.date);
//       return da - db;
//     });
//   };

//   const fetchTransactions = useCallback(async (portfolio) => {
//     try {
//       const rows = await window.electronAPI.readTransactions(portfolio);
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: Array.isArray(rows) ? sortByDateAsc(rows) : [],
//       }));
//     } catch (error) {
//       console.error("❌ Error fetching transactions:", error);
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: [],
//       }));
//     }
//   }, []);

//   useEffect(() => {
//     const handler = (event, { portfolio, data }) => {
//       if (!portfolio) return;
//       setTransactionsByPortfolio((prev) => ({
//         ...prev,
//         [portfolio]: Array.isArray(data) ? sortByDateAsc(data) : [],
//       }));
//     };

//     window.electronAPI.onTransactionsUpdated(handler);
//     return () => {
//       window.electronAPI.removeTransactionsUpdated(handler);
//     };
//   }, []);

//   useEffect(() => {
//     if (activePortfolio) {
//       fetchTransactions(activePortfolio);
//     }
//   }, [activePortfolio, fetchTransactions]);

//   const addTransaction = async (transaction) => {
//     try {
//       await window.electronAPI.writeTransaction({
//         ...transaction,
//         portfolio: activePortfolio,
//       });
//       await fetchTransactions(activePortfolio);
//     } catch (err) {
//       console.error("❌ Failed to add transaction:", err);
//     }
//   };

//   const handleDelete = async (index) => {
//     if (!window.confirm("Are you sure you want to delete this transaction?")) return;
//     try {
//       await window.electronAPI.deleteTransaction(index, activePortfolio);
//       await fetchTransactions(activePortfolio);
//     } catch (err) {
//       console.error("❌ Error deleting transaction:", err);
//     }
//   };

//   const currentTransactions = transactionsByPortfolio[activePortfolio] || [];

//   return (
//     <div className="transactions-header">
//     <div className="portfolio-selector">
//       <label>Select Portfolio:</label>
//       <select
//         value={activePortfolio}
//         onChange={(e) => setActivePortfolio(e.target.value)}
//       >
//         <option value="portfolio1">Portfolio 1</option>
//         <option value="portfolio2">Portfolio 2</option>
//       </select>
//     </div>
//       <TransactionsForm addTransaction={addTransaction} />
//       {currentTransactions.length > 0 ? (
//         <TransactionTable
//           headers={TRANSACTION_HEADERS}
//           transactions={currentTransactions}
//           portfolio={activePortfolio}  // ✅ pass portfolio down
//           onDelete={handleDelete}
//         />
//       ) : (
//         <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
//           No transactions in this portfolio yet.
//         </p>
//       )}
//     </div>
//   );
// }

// export default Transactions;

import React, { useState, useEffect, useCallback } from "react";
import TransactionsForm from "../forms/TransactionsForm";
import TransactionTable from "../tables/TransactionTable";
import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";
import { usePortfolio } from "../context/PortfolioContext"; // ✅ use global context
import "../styles/Transactions.css";

function Transactions() {
  const { activePortfolio } = usePortfolio(); // ✅ use global state
  const [transactionsByPortfolio, setTransactionsByPortfolio] = useState({
    portfolio1: [],
    portfolio2: [],
  });

  // 🔹 Helper → sort oldest → newest
  const sortByDateAsc = (rows) => {
    return [...rows].sort((a, b) => {
      const da = new Date(a.Date || a.date);
      const db = new Date(b.Date || b.date);
      return da - db;
    });
  };

  const fetchTransactions = useCallback(async (portfolio) => {
    try {
      const rows = await window.electronAPI.readTransactions(portfolio);
      setTransactionsByPortfolio((prev) => ({
        ...prev,
        [portfolio]: Array.isArray(rows) ? sortByDateAsc(rows) : [],
      }));
    } catch (error) {
      console.error("❌ Error fetching transactions:", error);
      setTransactionsByPortfolio((prev) => ({
        ...prev,
        [portfolio]: [],
      }));
    }
  }, []);

  // 🔹 Listen for updates from main process
  useEffect(() => {
    const handler = (event, { portfolio, data }) => {
      if (!portfolio) return;
      setTransactionsByPortfolio((prev) => ({
        ...prev,
        [portfolio]: Array.isArray(data) ? sortByDateAsc(data) : [],
      }));
    };

    window.electronAPI.onTransactionsUpdated(handler);
    return () => {
      window.electronAPI.removeTransactionsUpdated(handler);
    };
  }, []);

  // 🔹 Fetch when portfolio changes
  useEffect(() => {
    if (activePortfolio) {
      fetchTransactions(activePortfolio);
    }
  }, [activePortfolio, fetchTransactions]);

  const addTransaction = async (transaction) => {
    try {
      await window.electronAPI.writeTransaction({
        ...transaction,
        portfolio: activePortfolio,
      });
      await fetchTransactions(activePortfolio);
    } catch (err) {
      console.error("❌ Failed to add transaction:", err);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await window.electronAPI.deleteTransaction(index, activePortfolio);
      await fetchTransactions(activePortfolio);
    } catch (err) {
      console.error("❌ Error deleting transaction:", err);
    }
  };

  const currentTransactions = transactionsByPortfolio[activePortfolio] || [];

  return (
    <div className="transactions-page">
      {/* 🔹 No portfolio selector here — handled globally in Navbar */}
      <TransactionsForm addTransaction={addTransaction} />

      {currentTransactions.length > 0 ? (
        <TransactionTable
          headers={TRANSACTION_HEADERS}
          transactions={currentTransactions}
          portfolio={activePortfolio}
          onDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          No transactions in this portfolio yet.
        </p>
      )}
    </div>
  );
}

export default Transactions;
