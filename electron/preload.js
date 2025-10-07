// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   // 🔹 Transactions
//   readTransactions: () => ipcRenderer.invoke("read-transactions"),
//   writeTransaction: (transaction) =>
//     ipcRenderer.invoke("write-transaction", transaction),
//   deleteTransaction: (index) =>
//     ipcRenderer.invoke("delete-transaction", index),

//   // 🔹 Summaries
//   saveSummaries: (summaries) =>
//     ipcRenderer.invoke("write-summaries", summaries),
//   readSummaries: () => ipcRenderer.invoke("read-summaries"), // ✅ Added for Dashboard
// });



// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   // 🔹 Transactions
//   readTransactions: () => ipcRenderer.invoke("read-transactions"),
//   writeTransaction: (transaction) =>
//     ipcRenderer.invoke("write-transaction", transaction),
//   deleteTransaction: (index) =>
//     ipcRenderer.invoke("delete-transaction", index),

//   // 🔹 Summaries
//   saveSummaries: (summaries) =>
//     ipcRenderer.invoke("write-summaries", summaries),
//   readSummaries: () => ipcRenderer.invoke("read-summaries"),

//   // 🔹 Event listeners (push updates from main process)
//   onTransactionsUpdated: (callback) =>
//     ipcRenderer.on("transactions-updated", callback),
//   removeTransactionsUpdated: (callback) =>
//     ipcRenderer.removeListener("transactions-updated", callback),

//   onSummaryUpdated: (callback) =>
//     ipcRenderer.on("summary-updated", callback),
//   removeSummaryUpdated: (callback) =>
//     ipcRenderer.removeListener("summary-updated", callback),
// });

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   // 🔹 Transactions (portfolio-aware)
//   readTransactions: (portfolio) =>
//     ipcRenderer.invoke("read-transactions", portfolio),

//   writeTransaction: (transaction) =>
//     ipcRenderer.invoke("write-transaction", transaction),

//   deleteTransaction: (index, portfolio) =>
//     ipcRenderer.invoke("delete-transaction", index, portfolio),

//   // 🔹 Summaries
//   saveSummaries: (summaries) =>
//     ipcRenderer.invoke("write-summaries", summaries),

//   readSummaries: () => ipcRenderer.invoke("read-summaries"),

//   // 🔹 Event listeners (push updates from main process)
//   onTransactionsUpdated: (callback) =>
//     ipcRenderer.on("transactions-updated", (event, payload) => callback(event, payload)),

//   removeTransactionsUpdated: (callback) =>
//     ipcRenderer.removeListener("transactions-updated", callback),

//   onSummaryUpdated: (callback) =>
//     ipcRenderer.on("summary-updated", callback),

//   removeSummaryUpdated: (callback) =>
//     ipcRenderer.removeListener("summary-updated", callback),
// });

// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // 🔹 Transactions (portfolio-aware)
  readTransactions: (portfolio) =>
    ipcRenderer.invoke("read-transactions", portfolio),

  writeTransaction: (transaction) =>
    ipcRenderer.invoke("write-transaction", transaction),

  deleteTransaction: (index, portfolio) =>
    ipcRenderer.invoke("delete-transaction", index, portfolio),

  // 🔹 Summaries
  // Accepts (summariesArray, options) where options may include { portfolio }
  saveSummaries: (summaries, options = {}) => {
    const meta = {
      source: "renderer",
      timestamp: Date.now(),
      ...(options.portfolio ? { portfolio: options.portfolio } : {}),
    };
    return ipcRenderer.invoke("write-summaries", { summaries, meta });
  },

  readSummaries: () => ipcRenderer.invoke("read-summaries"),

  // 🔹 Event listeners (push updates from main process)
  onTransactionsUpdated: (callback) =>
    ipcRenderer.on("transactions-updated", (event, payload) => callback(event, payload)),

  removeTransactionsUpdated: (callback) =>
    ipcRenderer.removeListener("transactions-updated", callback),

  onSummaryUpdated: (callback) =>
    ipcRenderer.on("summary-updated", (event, payload) => callback(event, payload)),

  removeSummaryUpdated: (callback) =>
    ipcRenderer.removeListener("summary-updated", callback),
});
