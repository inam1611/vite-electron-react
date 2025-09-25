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



const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // 🔹 Transactions
  readTransactions: () => ipcRenderer.invoke("read-transactions"),
  writeTransaction: (transaction) =>
    ipcRenderer.invoke("write-transaction", transaction),
  deleteTransaction: (index) =>
    ipcRenderer.invoke("delete-transaction", index),

  // 🔹 Summaries
  saveSummaries: (summaries) =>
    ipcRenderer.invoke("write-summaries", summaries),
  readSummaries: () => ipcRenderer.invoke("read-summaries"),

  // 🔹 Event listeners (push updates from main process)
  onTransactionsUpdated: (callback) =>
    ipcRenderer.on("transactions-updated", callback),
  removeTransactionsUpdated: (callback) =>
    ipcRenderer.removeListener("transactions-updated", callback),

  onSummaryUpdated: (callback) =>
    ipcRenderer.on("summary-updated", callback),
  removeSummaryUpdated: (callback) =>
    ipcRenderer.removeListener("summary-updated", callback),
});

