// import React, { useState, useMemo } from "react";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";
// import {
//   calculateDerivedColumns,
//   derivedColumnFormats,
//   withCumulativeData,
// } from "../utils/transactionUtils";
// import "../styles/TransactionTable.css";

// function TransactionTable({ transactions, onDelete }) {
//   const [filters, setFilters] = useState({});
//   const [activeDropdown, setActiveDropdown] = useState(null); // track open column

//   const getTypeClass = (type) => {
//     switch (type) {
//       case "Sell":
//         return "type-sell";
//       case "Buy":
//       case "Dividend":
//         return "type-buy";
//       default:
//         return "";
//     }
//   };

//   const processedTransactions = withCumulativeData(transactions);

//   const derivedColumns = [
//     ...Object.keys(calculateDerivedColumns),
//     "Cumulative Units",
//     "Cumulative Cost",
//     "Cumulative Avg Cost/Unit",
//   ];

//   const allColumns = [...TRANSACTION_HEADERS, ...derivedColumns, "Action"];

//   const filteredTransactions = useMemo(() => {
//     return processedTransactions.filter((txn) => {
//       return Object.entries(filters).every(([col, allowedValues]) => {
//         if (!allowedValues || allowedValues.length === 0) return true;
//         let value;
//         if (TRANSACTION_HEADERS.includes(col)) {
//           value = txn[col] ?? txn[col.toLowerCase()] ?? "";
//           if (col === "Stock Symbol") value = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//         } else {
//           value = txn[col];
//         }
//         return allowedValues.includes(value);
//       });
//     });
//   }, [processedTransactions, filters]);

//   const getUniqueValues = (col) => {
//     const values = processedTransactions.map((txn) => {
//       if (col === "Stock Symbol") return (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//       if (derivedColumns.includes(col)) {
//         const hasCalc = typeof calculateDerivedColumns[col] === "function";
//         return hasCalc ? calculateDerivedColumns[col](txn) : txn[col];
//       }
//       return txn[col] ?? txn[col.toLowerCase()] ?? "";
//     });
//     return Array.from(new Set(values));
//   };

//   const toggleFilterValue = (col, value) => {
//     setFilters((prev) => {
//       const current = prev[col] || [];
//       const newValues = current.includes(value)
//         ? current.filter((v) => v !== value)
//         : [...current, value];
//       return { ...prev, [col]: newValues };
//     });
//   };

//   const toggleDropdown = (col) => {
//     setActiveDropdown(activeDropdown === col ? null : col);
//   };

//   const selectAll = (col) => {
//     const allValues = getUniqueValues(col);
//     const current = filters[col] || [];
//     const newValues = current.length === allValues.length ? [] : allValues;
//     setFilters((prev) => ({ ...prev, [col]: newValues }));
//   };

//   return (
//     <div className="transaction-table-container">
//       <table className="transaction-table">
//         <thead>
//           <tr>
//             {allColumns.map((col) => (
//               <th key={col} style={{ position: "relative" }}>
//                 {col}
//                 {col !== "Action" && (
//                   <div className="filter-dropdown">
//                     <button className="filter-btn" onClick={() => toggleDropdown(col)}>
//                       ▼
//                     </button>
//                     {activeDropdown === col && (
//                       <div className="filter-menu">
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={filters[col]?.length === getUniqueValues(col).length}
//                             onChange={() => selectAll(col)}
//                           />
//                           Select All
//                         </label>
//                         {getUniqueValues(col).map((value, idx) => (
//                           <label key={idx}>
//                             <input
//                               type="checkbox"
//                               checked={filters[col]?.includes(value) || false}
//                               onChange={() => toggleFilterValue(col, value)}
//                             />
//                             {value}
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTransactions.length > 0 ? (
//             filteredTransactions.map((txn, index) => {
//               const stock = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//               const type = txn.Type || txn.type || "";

//               return (
//                 <tr key={index}>
//                   {TRANSACTION_HEADERS.map((col) => {
//                     let value = txn[col] || txn[col.toLowerCase()] || "";
//                     if (col === "Stock Symbol") value = stock;
//                     if (col === "Type")
//                       return (
//                         <td key={col} className={getTypeClass(type)}>
//                           {type}
//                         </td>
//                       );
//                     return <td key={col}>{value}</td>;
//                   })}

//                   {derivedColumns.map((col) => {
//                     const hasCalc = typeof calculateDerivedColumns[col] === "function";
//                     const rawValue = hasCalc ? calculateDerivedColumns[col](txn) : txn[col];

//                     const format = derivedColumnFormats[col] || "currency";
//                     let displayValue;

//                     if (format === "currency") {
//                       const v = Number(rawValue || 0);
//                       displayValue = `Rs. ${v.toLocaleString(undefined, {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}`;
//                     } else if (format === "percentage") {
//                       const v = Number(rawValue || 0);
//                       displayValue = `${v.toFixed(2)} %`;
//                     } else if (format === "number") {
//                       const v = Number(rawValue || 0);
//                       displayValue = v.toLocaleString(undefined, { maximumFractionDigits: 4 });
//                     } else {
//                       displayValue = rawValue ?? "";
//                     }

//                     return <td key={col}>{displayValue}</td>;
//                   })}

//                   <td>
//                     <button className="delete-btn" onClick={() => onDelete(index)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={allColumns.length} style={{ textAlign: "center", padding: "1rem" }}>
//                 No transactions added yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TransactionTable;

// import React, { useState, useMemo } from "react";
// import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";
// import {
//   calculateDerivedColumns,
//   derivedColumnFormats,
//   withCumulativeData,
// } from "../utils/transactionUtils";
// import "../styles/TransactionTable.css";

// function TransactionTable({ transactions, portfolio, onDelete }) {
//   const [filters, setFilters] = useState({});
//   const [activeDropdown, setActiveDropdown] = useState(null); // track open column

//   const getTypeClass = (type) => {
//     switch (type) {
//       case "Sell":
//         return "type-sell";
//       case "Buy":
//       case "Dividend":
//         return "type-buy";
//       default:
//         return "";
//     }
//   };

//   // 🔹 Add cumulative / derived data
//   const processedTransactions = withCumulativeData(transactions);

//   const derivedColumns = [
//     ...Object.keys(calculateDerivedColumns),
//     "Cumulative Units",
//     "Cumulative Cost",
//     "Cumulative Avg Cost/Unit",
//   ];

//   const allColumns = [...TRANSACTION_HEADERS, ...derivedColumns, "Action"];

//   // 🔹 Filters apply to current portfolio only
//   const filteredTransactions = useMemo(() => {
//     return processedTransactions.filter((txn) => {
//       return Object.entries(filters).every(([col, allowedValues]) => {
//         if (!allowedValues || allowedValues.length === 0) return true;
//         let value;
//         if (TRANSACTION_HEADERS.includes(col)) {
//           value = txn[col] ?? txn[col.toLowerCase()] ?? "";
//           if (col === "Stock Symbol")
//             value = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//         } else {
//           value = txn[col];
//         }
//         return allowedValues.includes(value);
//       });
//     });
//   }, [processedTransactions, filters]);

//   const getUniqueValues = (col) => {
//     const values = processedTransactions.map((txn) => {
//       if (col === "Stock Symbol")
//         return (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//       if (derivedColumns.includes(col)) {
//         const hasCalc = typeof calculateDerivedColumns[col] === "function";
//         return hasCalc ? calculateDerivedColumns[col](txn) : txn[col];
//       }
//       return txn[col] ?? txn[col.toLowerCase()] ?? "";
//     });
//     return Array.from(new Set(values));
//   };

//   const toggleFilterValue = (col, value) => {
//     setFilters((prev) => {
//       const current = prev[col] || [];
//       const newValues = current.includes(value)
//         ? current.filter((v) => v !== value)
//         : [...current, value];
//       return { ...prev, [col]: newValues };
//     });
//   };

//   const toggleDropdown = (col) => {
//     setActiveDropdown(activeDropdown === col ? null : col);
//   };

//   const selectAll = (col) => {
//     const allValues = getUniqueValues(col);
//     const current = filters[col] || [];
//     const newValues = current.length === allValues.length ? [] : allValues;
//     setFilters((prev) => ({ ...prev, [col]: newValues }));
//   };

//   return (
//     <div className="transaction-table-container">
//       <h3 style={{ marginBottom: "0.5rem" }}>
//         {portfolio === "portfolio1" ? "📊 Portfolio 1" : "📊 Portfolio 2"}
//       </h3>
//       <table className="transaction-table">
//         <thead>
//           <tr>
//             {allColumns.map((col) => (
//               <th key={col} style={{ position: "relative" }}>
//                 {col}
//                 {col !== "Action" && (
//                   <div className="filter-dropdown">
//                     <button
//                       className="filter-btn"
//                       onClick={() => toggleDropdown(col)}
//                     >
//                       ▼
//                     </button>
//                     {activeDropdown === col && (
//                       <div className="filter-menu">
//                         <label>
//                           <input
//                             type="checkbox"
//                             checked={
//                               filters[col]?.length === getUniqueValues(col).length
//                             }
//                             onChange={() => selectAll(col)}
//                           />
//                           Select All
//                         </label>
//                         {getUniqueValues(col).map((value, idx) => (
//                           <label key={idx}>
//                             <input
//                               type="checkbox"
//                               checked={filters[col]?.includes(value) || false}
//                               onChange={() => toggleFilterValue(col, value)}
//                             />
//                             {value}
//                           </label>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTransactions.length > 0 ? (
//             filteredTransactions.map((txn, index) => {
//               const stock = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
//               const type = txn.Type || txn.type || "";

//               return (
//                 <tr key={index}>
//                   {TRANSACTION_HEADERS.map((col) => {
//                     let value = txn[col] || txn[col.toLowerCase()] || "";
//                     if (col === "Stock Symbol") value = stock;
//                     if (col === "Type")
//                       return (
//                         <td key={col} className={getTypeClass(type)}>
//                           {type}
//                         </td>
//                       );
//                     return <td key={col}>{value}</td>;
//                   })}

//                   {derivedColumns.map((col) => {
//                     const hasCalc = typeof calculateDerivedColumns[col] === "function";
//                     const rawValue = hasCalc
//                       ? calculateDerivedColumns[col](txn)
//                       : txn[col];

//                     const format = derivedColumnFormats[col] || "currency";
//                     let displayValue;

//                     if (format === "currency") {
//                       const v = Number(rawValue || 0);
//                       displayValue = `Rs. ${v.toLocaleString(undefined, {
//                         minimumFractionDigits: 2,
//                         maximumFractionDigits: 2,
//                       })}`;
//                     } else if (format === "percentage") {
//                       const v = Number(rawValue || 0);
//                       displayValue = `${v.toFixed(2)} %`;
//                     } else if (format === "number") {
//                       const v = Number(rawValue || 0);
//                       displayValue = v.toLocaleString(undefined, {
//                         maximumFractionDigits: 4,
//                       });
//                     } else {
//                       displayValue = rawValue ?? "";
//                     }

//                     return <td key={col}>{displayValue}</td>;
//                   })}

//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => onDelete(index, portfolio)} // 🔹 pass portfolio
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td
//                 colSpan={allColumns.length}
//                 style={{ textAlign: "center", padding: "1rem" }}
//               >
//                 No transactions added yet
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TransactionTable;


import React, { useState, useMemo } from "react";
import { TRANSACTION_HEADERS } from "../../shared_config/transaction_config.js";
import {
  calculateDerivedColumns,
  derivedColumnFormats,
  withCumulativeData,
} from "../utils/transactionUtils";
import "../styles/TransactionTable.css";

function TransactionTable({ transactions, portfolio, onDelete }) {
  const [filters, setFilters] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  const getTypeClass = (type) => {
    switch (type) {
      case "Sell":
        return "type-sell";
      case "Buy":
      case "Dividend":
        return "type-buy";
      default:
        return "";
    }
  };

  // 🔹 Add cumulative / derived data
  const processedTransactions = withCumulativeData(transactions);

  const derivedColumns = [
    ...Object.keys(calculateDerivedColumns),
    "Cumulative Units",
    "Cumulative Cost",
    "Cumulative Avg Cost/Unit",
  ];

  const allColumns = [...TRANSACTION_HEADERS, ...derivedColumns, "Action"];

  // 🔹 Filters apply to current portfolio only
  const filteredTransactions = useMemo(() => {
    return processedTransactions.filter((txn) => {
      return Object.entries(filters).every(([col, allowedValues]) => {
        if (!allowedValues || allowedValues.length === 0) return true;
        let value;
        if (TRANSACTION_HEADERS.includes(col)) {
          value = txn[col] ?? txn[col.toLowerCase()] ?? "";
          if (col === "Stock Symbol")
            value = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
        } else {
          value = txn[col];
        }
        return allowedValues.includes(value);
      });
    });
  }, [processedTransactions, filters]);

  const getUniqueValues = (col) => {
    const values = processedTransactions.map((txn) => {
      if (col === "Stock Symbol")
        return (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
      if (derivedColumns.includes(col)) {
        const hasCalc = typeof calculateDerivedColumns[col] === "function";
        return hasCalc ? calculateDerivedColumns[col](txn) : txn[col];
      }
      return txn[col] ?? txn[col.toLowerCase()] ?? "";
    });
    return Array.from(new Set(values));
  };

  const toggleFilterValue = (col, value) => {
    setFilters((prev) => {
      const current = prev[col] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [col]: newValues };
    });
  };

  const toggleDropdown = (col) => {
    setActiveDropdown(activeDropdown === col ? null : col);
  };

  const selectAll = (col) => {
    const allValues = getUniqueValues(col);
    const current = filters[col] || [];
    const newValues = current.length === allValues.length ? [] : allValues;
    setFilters((prev) => ({ ...prev, [col]: newValues }));
  };

  return (
    <div className="transaction-table-container">
      <h3 style={{ marginBottom: "0.5rem" }}>
        {portfolio === "portfolio1" ? "📊 Portfolio 1" : "📊 Portfolio 2"}
      </h3>
      <table className="transaction-table">
        <thead>
          <tr>
            {allColumns.map((col) => (
              <th key={col} style={{ position: "relative" }}>
                {col}
                {col !== "Action" && (
                  <div className="filter-dropdown">
                    <button
                      className="filter-btn"
                      onClick={() => toggleDropdown(col)}
                    >
                      ▼
                    </button>
                    {activeDropdown === col && (
                      <div className="filter-menu">
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              filters[col]?.length === getUniqueValues(col).length
                            }
                            onChange={() => selectAll(col)}
                          />
                          Select All
                        </label>
                        {getUniqueValues(col).map((value, idx) => (
                          <label key={idx}>
                            <input
                              type="checkbox"
                              checked={filters[col]?.includes(value) || false}
                              onChange={() => toggleFilterValue(col, value)}
                            />
                            {value}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn, index) => {
              const stock = (txn["Stock Symbol"] || txn.stockName || "").toUpperCase();
              const type = txn.Type || txn.type || "";

              return (
                <tr key={index}>
                  {TRANSACTION_HEADERS.map((col) => {
                    let value = txn[col] || txn[col.toLowerCase()] || "";
                    if (col === "Stock Symbol") value = stock;
                    if (col === "Type")
                      return (
                        <td key={col} className={getTypeClass(type)}>
                          {type}
                        </td>
                      );
                    return <td key={col}>{value}</td>;
                  })}

                  {derivedColumns.map((col) => {
                    const hasCalc = typeof calculateDerivedColumns[col] === "function";
                    const rawValue = hasCalc
                      ? calculateDerivedColumns[col](txn)
                      : txn[col];

                    const format = derivedColumnFormats[col] || "currency";
                    let displayValue;

                    if (format === "currency") {
                      const v = Number(rawValue || 0);
                      displayValue = `Rs. ${v.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`;
                    } else if (format === "percentage") {
                      const v = Number(rawValue || 0);
                      displayValue = `${v.toFixed(2)} %`;
                    } else if (format === "number") {
                      const v = Number(rawValue || 0);
                      displayValue = v.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      });
                    } else {
                      displayValue = rawValue ?? "";
                    }

                    return <td key={col}>{displayValue}</td>;
                  })}

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(index, portfolio)} // ✅ pass portfolio back
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={allColumns.length}
                style={{ textAlign: "center", padding: "1rem" }}
              >
                No transactions added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
