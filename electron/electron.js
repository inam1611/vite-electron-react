// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const xlsx = require("xlsx");
// const { TRANSACTION_HEADERS } = require("../shared_config/transaction_config.js");

// // 🔑 File paths
// const transactionsFilePath = path.join(__dirname, "data", "transactions.xlsx");
// const summaryFilePath = path.join(__dirname, "data", "summary.xlsx");

// // ✅ Create browser window
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   win.loadURL("http://localhost:3000"); // dev mode
// }

// // ✅ Ensure Transactions Excel file exists
// function ensureExcelFile() {
//   const dirPath = path.dirname(transactionsFilePath);
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }

//   if (!fs.existsSync(transactionsFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([TRANSACTION_HEADERS]);
//     xlsx.utils.book_append_sheet(wb, ws, "Transactions");
//     xlsx.writeFile(wb, transactionsFilePath);
//   }
// }

// // ✅ Ensure Summary Excel file exists
// function ensureSummaryFile() {
//   const dirPath = path.dirname(summaryFilePath);
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }

//   if (!fs.existsSync(summaryFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([[
//       "Stock Ticker",
//       "Name",
//       "Industry",
//       "Last Price",
//       "Shares",
//       "Cumulative Cost",
//       "Cost per share",
//       "Yield on Cost",
//       "Unrealized Gain/Loss",
//       "Realized Gain/Loss",
//       "Dividend Income",
//       "Portfolio %"
//     ]]);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);
//   }
// }

// // ✅ App ready → create files and window
// app.whenReady().then(() => {
//   ensureExcelFile();
//   ensureSummaryFile();
//   createWindow();
// });

// // ✅ IPC: Read Transactions
// ipcMain.handle("read-transactions", () => {
//   try {
//     if (!fs.existsSync(transactionsFilePath)) return [];
//     const wb = xlsx.readFile(transactionsFilePath);
//     const ws = wb.Sheets["Transactions"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (err) {
//     console.error("❌ Error reading Transactions Excel:", err);
//     return [];
//   }
// });

// // ✅ IPC: Write Transaction
// ipcMain.handle("write-transaction", async (event, transaction) => {
//   try {
//     const workbook = xlsx.readFile(transactionsFilePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const formattedTransaction = {
//       "Date": transaction.date,
//       "Stock Symbol": transaction.stockName,
//       "Type": transaction.type,
//       "Number of Units": transaction.units,
//       "Price per Share": transaction.price,
//     };

//     jsonData.push(formattedTransaction);

//     const newWorksheet = xlsx.utils.json_to_sheet(jsonData, { header: TRANSACTION_HEADERS });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, transactionsFilePath);

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error writing transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Delete Transaction
// ipcMain.handle("delete-transaction", async (event, index) => {
//   try {
//     const workbook = xlsx.readFile(transactionsFilePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

//     if (index < 0 || index >= rows.length) return { success: false, error: "Invalid index" };

//     rows.splice(index, 1); // remove row
//     const newWorksheet = xlsx.utils.json_to_sheet(rows, { header: TRANSACTION_HEADERS });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, transactionsFilePath);

//     return rows; // send back updated rows
//   } catch (error) {
//     console.error("❌ Error deleting transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Write Summaries
// ipcMain.handle("write-summaries", async (event, summaries) => {
//   try {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(summaries);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);

//     return { success: true, path: summaryFilePath };
//   } catch (error) {
//     console.error("❌ Error writing summary:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Read Summaries (for Dashboard)
// ipcMain.handle("read-summaries", async () => {
//   try {
//     if (!fs.existsSync(summaryFilePath)) return [];
//     const wb = xlsx.readFile(summaryFilePath);
//     const ws = wb.Sheets["Summary"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (error) {
//     console.error("❌ Error reading summary:", error);
//     return [];
//   }
// });

// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const xlsx = require("xlsx");
// const { TRANSACTION_HEADERS } = require("../shared_config/transaction_config.js");

// // 🔑 File paths
// const transactionsFilePath = path.join(__dirname, "data", "transactions.xlsx");
// const summaryFilePath = path.join(__dirname, "data", "summary.xlsx");

// // ✅ Create browser window
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   win.loadURL("http://localhost:3000"); // dev mode
// }

// // ✅ Ensure Transactions Excel file exists
// function ensureExcelFile() {
//   const dirPath = path.dirname(transactionsFilePath);
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }

//   if (!fs.existsSync(transactionsFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([TRANSACTION_HEADERS]);
//     xlsx.utils.book_append_sheet(wb, ws, "Transactions");
//     xlsx.writeFile(wb, transactionsFilePath);
//   }
// }

// // ✅ Ensure Summary Excel file exists
// function ensureSummaryFile() {
//   const dirPath = path.dirname(summaryFilePath);
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }

//   if (!fs.existsSync(summaryFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([[
//       "Stock Ticker",
//       "Name",
//       "Industry",
//       "Last Price",
//       "Shares",
//       "Cumulative Cost",
//       "Cost per share",
//       "Yield on Cost",
//       "Unrealized Gain/Loss",
//       "Realized Gain/Loss",
//       "Dividend Income",
//       "Portfolio %"
//     ]]);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);
//   }
// }

// // ✅ App ready → create files and window
// app.whenReady().then(() => {
//   ensureExcelFile();
//   ensureSummaryFile();
//   createWindow();
// });

// // ✅ IPC: Read Transactions
// ipcMain.handle("read-transactions", () => {
//   try {
//     if (!fs.existsSync(transactionsFilePath)) return [];
//     const wb = xlsx.readFile(transactionsFilePath);
//     const ws = wb.Sheets["Transactions"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (err) {
//     console.error("❌ Error reading Transactions Excel:", err);
//     return [];
//   }
// });

// // ✅ IPC: Write Transaction (push update)
// ipcMain.handle("write-transaction", async (event, transaction) => {
//   try {
//     const workbook = xlsx.readFile(transactionsFilePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const formattedTransaction = {
//       "Date": transaction.date,
//       "Stock Symbol": transaction.stockName,
//       "Type": transaction.type,
//       "Number of Units": transaction.units,
//       "Price per Share": transaction.price,
//     };

//     jsonData.push(formattedTransaction);

//     const newWorksheet = xlsx.utils.json_to_sheet(jsonData, { header: TRANSACTION_HEADERS });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, transactionsFilePath);

//     // 🔥 Push updated data to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win) win.webContents.send("transactions-updated", jsonData);

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error writing transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Delete Transaction (push update)
// ipcMain.handle("delete-transaction", async (event, index) => {
//   try {
//     const workbook = xlsx.readFile(transactionsFilePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

//     if (index < 0 || index >= rows.length) return { success: false, error: "Invalid index" };

//     rows.splice(index, 1); // remove row
//     const newWorksheet = xlsx.utils.json_to_sheet(rows, { header: TRANSACTION_HEADERS });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, transactionsFilePath);

//     // 🔥 Push updated rows to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win) win.webContents.send("transactions-updated", rows);

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error deleting transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Write Summaries (push update)
// ipcMain.handle("write-summaries", async (event, summaries) => {
//   try {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(summaries);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);

//     // 🔥 Push updated summaries to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win) win.webContents.send("summary-updated", summaries);

//     return { success: true, path: summaryFilePath };
//   } catch (error) {
//     console.error("❌ Error writing summary:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Read Summaries (for Dashboard)
// ipcMain.handle("read-summaries", async () => {
//   try {
//     if (!fs.existsSync(summaryFilePath)) return [];
//     const wb = xlsx.readFile(summaryFilePath);
//     const ws = wb.Sheets["Summary"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (error) {
//     console.error("❌ Error reading summary:", error);
//     return [];
//   }
// });

// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const xlsx = require("xlsx");
// const { TRANSACTION_HEADERS } = require("../shared_config/transaction_config.js");

// // 🔑 Data folder
// const dataDir = path.join(__dirname, "data");

// // 🔑 File paths
// const summaryFilePath = path.join(dataDir, "summary.xlsx");

// // ✅ Get portfolio file path dynamically
// function getPortfolioFilePath(portfolio) {
//   return path.join(dataDir, `${portfolio}.xlsx`);
// }

// // ✅ Ensure Portfolio Excel file exists
// function ensurePortfolioFile(portfolio) {
//   const filePath = getPortfolioFilePath(portfolio);
//   if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
//   }
//   if (!fs.existsSync(filePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([TRANSACTION_HEADERS]);
//     xlsx.utils.book_append_sheet(wb, ws, "Transactions");
//     xlsx.writeFile(wb, filePath);
//   }
// }

// // ✅ Ensure Summary Excel file exists
// function ensureSummaryFile() {
//   if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
//   }
//   if (!fs.existsSync(summaryFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([
//       [
//         "Stock Ticker",
//         "Name",
//         "Industry",
//         "Last Price",
//         "Shares",
//         "Cumulative Cost",
//         "Cost per share",
//         "Yield on Cost",
//         "Unrealized Gain/Loss",
//         "Realized Gain/Loss",
//         "Dividend Income",
//         "Portfolio %",
//       ],
//     ]);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);
//   }
// }

// // ✅ Create browser window
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   win.loadURL("http://localhost:3000"); // dev mode
// }

// // ✅ App ready → create files and window
// app.whenReady().then(() => {
//   ensurePortfolioFile("portfolio1");
//   ensurePortfolioFile("portfolio2");
//   ensureSummaryFile();
//   createWindow();
// });

// // ✅ IPC: Read Transactions
// ipcMain.handle("read-transactions", (event, portfolio) => {
//   try {
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const wb = xlsx.readFile(filePath);
//     const ws = wb.Sheets["Transactions"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (err) {
//     console.error("❌ Error reading Transactions Excel:", err);
//     return [];
//   }
// });

// // ✅ IPC: Write Transaction (push update)
// ipcMain.handle("write-transaction", async (event, transaction) => {
//   try {
//     const { portfolio } = transaction;
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const workbook = xlsx.readFile(filePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const formattedTransaction = {
//       Date: transaction.date,
//       "Stock Symbol": transaction.stockName,
//       Type: transaction.type,
//       "Number of Units": transaction.units,
//       "Price per Share": transaction.price,
//     };

//     jsonData.push(formattedTransaction);

//     const newWorksheet = xlsx.utils.json_to_sheet(jsonData, {
//       header: TRANSACTION_HEADERS,
//     });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, filePath);

//     // 🔥 Push updated data to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win)
//       win.webContents.send("transactions-updated", {
//         portfolio,
//         rows: jsonData,
//       });

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error writing transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Delete Transaction (push update)
// ipcMain.handle("delete-transaction", async (event, index, portfolio) => {
//   try {
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const workbook = xlsx.readFile(filePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

//     if (index < 0 || index >= rows.length)
//       return { success: false, error: "Invalid index" };

//     rows.splice(index, 1); // remove row
//     const newWorksheet = xlsx.utils.json_to_sheet(rows, {
//       header: TRANSACTION_HEADERS,
//     });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, filePath);

//     // 🔥 Push updated rows to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win)
//       win.webContents.send("transactions-updated", { portfolio, rows });

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error deleting transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Write Summaries (push update)
// ipcMain.handle("write-summaries", async (event, summaries) => {
//   try {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(summaries);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);

//     // 🔥 Push updated summaries to frontend
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win) win.webContents.send("summary-updated", summaries);

//     return { success: true, path: summaryFilePath };
//   } catch (error) {
//     console.error("❌ Error writing summary:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Read Summaries (for Dashboard)
// ipcMain.handle("read-summaries", async () => {
//   try {
//     if (!fs.existsSync(summaryFilePath)) return [];
//     const wb = xlsx.readFile(summaryFilePath);
//     const ws = wb.Sheets["Summary"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (error) {
//     console.error("❌ Error reading summary:", error);
//     return [];
//   }
// });

// // main.js
// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const fs = require("fs");
// const xlsx = require("xlsx");
// const { TRANSACTION_HEADERS } = require("../shared_config/transaction_config.js");

// // 🔑 Data folder
// const dataDir = path.join(__dirname, "data");

// // 🔑 File paths
// const summaryFilePath = path.join(dataDir, "summary.xlsx");

// // ✅ Get portfolio file path dynamically
// function getPortfolioFilePath(portfolio) {
//   return path.join(dataDir, `${portfolio}.xlsx`);
// }

// // ✅ Ensure Portfolio Excel file exists
// function ensurePortfolioFile(portfolio) {
//   const filePath = getPortfolioFilePath(portfolio);
//   if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
//   }
//   if (!fs.existsSync(filePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([TRANSACTION_HEADERS]);
//     xlsx.utils.book_append_sheet(wb, ws, "Transactions");
//     xlsx.writeFile(wb, filePath);
//   }
// }

// // ✅ Ensure Summary Excel file exists
// function ensureSummaryFile() {
//   if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir, { recursive: true });
//   }
//   if (!fs.existsSync(summaryFilePath)) {
//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.aoa_to_sheet([
//       [
//         "Stock Ticker",
//         "Name",
//         "Industry",
//         "Last Price",
//         "Shares",
//         "Cumulative Cost",
//         "Cost per share",
//         "Yield on Cost",
//         "Unrealized Gain/Loss",
//         "Realized Gain/Loss",
//         "Dividend Income",
//         "Portfolio %",
//       ],
//     ]);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);
//   }
// }

// // ✅ Create browser window
// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   win.loadURL("http://localhost:3000"); // dev mode
// }

// // ✅ App ready → create files and window
// app.whenReady().then(() => {
//   ensurePortfolioFile("portfolio1");
//   ensurePortfolioFile("portfolio2");
//   ensureSummaryFile();
//   createWindow();
// });

// // ✅ IPC: Read Transactions
// ipcMain.handle("read-transactions", (event, portfolio) => {
//   try {
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const wb = xlsx.readFile(filePath);
//     const ws = wb.Sheets["Transactions"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (err) {
//     console.error("❌ Error reading Transactions Excel:", err);
//     return [];
//   }
// });

// // ✅ IPC: Write Transaction (push update)
// ipcMain.handle("write-transaction", async (event, transaction) => {
//   try {
//     const { portfolio } = transaction;
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const workbook = xlsx.readFile(filePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

//     const formattedTransaction = {
//       Date: transaction.date,
//       "Stock Symbol": transaction.stockName,
//       Type: transaction.type,
//       "Number of Units": transaction.units,
//       "Price per Share": transaction.price,
//     };

//     jsonData.push(formattedTransaction);

//     const newWorksheet = xlsx.utils.json_to_sheet(jsonData, {
//       header: TRANSACTION_HEADERS,
//     });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, filePath);

//     // 🔥 Push updated data to frontend (include timestamp & source)
//     const win = BrowserWindow.getAllWindows()[0];
//     const timestamp = Date.now();
//     if (win)
//       win.webContents.send("transactions-updated", {
//         portfolio,
//         rows: jsonData,
//         timestamp,
//         source: "main",
//       });

//     return { success: true, timestamp };
//   } catch (error) {
//     console.error("❌ Error writing transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Delete Transaction (push update)
// ipcMain.handle("delete-transaction", async (event, index, portfolio) => {
//   try {
//     const filePath = getPortfolioFilePath(portfolio);
//     ensurePortfolioFile(portfolio);

//     const workbook = xlsx.readFile(filePath);
//     const worksheet = workbook.Sheets["Transactions"];
//     const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

//     if (index < 0 || index >= rows.length)
//       return { success: false, error: "Invalid index" };

//     rows.splice(index, 1); // remove row
//     const newWorksheet = xlsx.utils.json_to_sheet(rows, {
//       header: TRANSACTION_HEADERS,
//     });
//     workbook.Sheets["Transactions"] = newWorksheet;
//     xlsx.writeFile(workbook, filePath);

//     // 🔥 Push updated rows to frontend (include timestamp & source)
//     const win = BrowserWindow.getAllWindows()[0];
//     const timestamp = Date.now();
//     if (win)
//       win.webContents.send("transactions-updated", {
//         portfolio,
//         rows,
//         timestamp,
//         source: "main",
//       });

//     return { success: true };
//   } catch (error) {
//     console.error("❌ Error deleting transaction:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Write Summaries (push update) — accepts either legacy array OR { summaries, meta }
// ipcMain.handle("write-summaries", async (event, payload) => {
//   try {
//     // Backwards-compatible handling: payload may be array (legacy) or object { summaries, meta }
//     let summariesArray = [];
//     let meta = {};
//     if (Array.isArray(payload)) {
//       summariesArray = payload;
//     } else if (payload && typeof payload === "object") {
//       summariesArray = payload.summaries || [];
//       meta = payload.meta || {};
//     }

//     const timestamp = meta.timestamp || Date.now();

//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(summariesArray);
//     xlsx.utils.book_append_sheet(wb, ws, "Summary");
//     xlsx.writeFile(wb, summaryFilePath);

//     // 🔥 Push updated summaries to frontend — include portfolio (if provided), timestamp, and source
//     const win = BrowserWindow.getAllWindows()[0];
//     if (win)
//       win.webContents.send("summary-updated", {
//         portfolio: meta.portfolio || null,
//         timestamp,
//         source: meta.source || "main",
//       });

//     return { success: true, path: summaryFilePath, timestamp };
//   } catch (error) {
//     console.error("❌ Error writing summary:", error);
//     return { success: false, error };
//   }
// });

// // ✅ IPC: Read Summaries (for Dashboard)
// ipcMain.handle("read-summaries", async () => {
//   try {
//     if (!fs.existsSync(summaryFilePath)) return [];
//     const wb = xlsx.readFile(summaryFilePath);
//     const ws = wb.Sheets["Summary"];
//     if (!ws) return [];
//     return xlsx.utils.sheet_to_json(ws, { defval: "" });
//   } catch (error) {
//     console.error("❌ Error reading summary:", error);
//     return [];
//   }
// });

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");
const { TRANSACTION_HEADERS } = require("../shared_config/transaction_config.js");

// 🔑 Data folder
const dataDir = path.join(__dirname, "data");

// ✅ Portfolio file path helper
function getPortfolioFilePath(portfolio) {
  return path.join(dataDir, `${portfolio}.xlsx`);
}

// ✅ Summary file path helper
function getSummaryFilePath(portfolio) {
  return path.join(dataDir, `summary_${portfolio}.xlsx`);
}

// ✅ Ensure folder and Excel file
function ensurePortfolioFile(portfolio) {
  const filePath = getPortfolioFilePath(portfolio);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([TRANSACTION_HEADERS]);
    xlsx.utils.book_append_sheet(wb, ws, "Transactions");
    xlsx.writeFile(wb, filePath);
  }
}

function ensureSummaryFile(portfolio) {
  const filePath = getSummaryFilePath(portfolio);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([[
      "Stock Ticker", "Name", "Industry", "Last Price", "Shares",
      "Cumulative Cost", "Cost per share", "Yield on Cost",
      "Unrealized Gain/Loss", "Realized Gain/Loss",
      "Dividend Income", "Portfolio %"
    ]]);
    xlsx.utils.book_append_sheet(wb, ws, "Summary");
    xlsx.writeFile(wb, filePath);
  }
}

// ✅ Create window
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });
  win.loadURL("http://localhost:3000");
}

// ✅ App ready
app.whenReady().then(() => {
  ensurePortfolioFile("portfolio1");
  ensurePortfolioFile("portfolio2");
  ensureSummaryFile("portfolio1");
  ensureSummaryFile("portfolio2");
  createWindow();
});

// ✅ IPC: Read Transactions
ipcMain.handle("read-transactions", (event, portfolio) => {
  try {
    const filePath = getPortfolioFilePath(portfolio);
    ensurePortfolioFile(portfolio);
    const wb = xlsx.readFile(filePath);
    const ws = wb.Sheets["Transactions"];
    return ws ? xlsx.utils.sheet_to_json(ws, { defval: "" }) : [];
  } catch (err) {
    console.error("❌ Error reading transactions:", err);
    return [];
  }
});

// ✅ IPC: Write Transaction
ipcMain.handle("write-transaction", async (event, transaction) => {
  try {
    const { portfolio } = transaction;
    const filePath = getPortfolioFilePath(portfolio);
    ensurePortfolioFile(portfolio);

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Transactions"];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const formattedTransaction = {
      Date: transaction.date,
      "Stock Symbol": transaction.stockName,
      Type: transaction.type,
      "Number of Units": transaction.units,
      "Price per Share": transaction.price,
    };
    jsonData.push(formattedTransaction);

    const newWorksheet = xlsx.utils.json_to_sheet(jsonData, {
      header: TRANSACTION_HEADERS,
    });
    workbook.Sheets["Transactions"] = newWorksheet;
    xlsx.writeFile(workbook, filePath);

    const win = BrowserWindow.getAllWindows()[0];
    const timestamp = Date.now();
    if (win)
      win.webContents.send("transactions-updated", {
        portfolio,
        rows: jsonData,
        timestamp,
        source: "main",
      });
    return { success: true, timestamp };
  } catch (err) {
    console.error("❌ Error writing transaction:", err);
    return { success: false, err };
  }
});

// ✅ IPC: Delete Transaction
ipcMain.handle("delete-transaction", async (event, index, portfolio) => {
  try {
    const filePath = getPortfolioFilePath(portfolio);
    ensurePortfolioFile(portfolio);

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Transactions"];
    const rows = xlsx.utils.sheet_to_json(worksheet, { defval: "" });

    if (index < 0 || index >= rows.length)
      return { success: false, error: "Invalid index" };

    rows.splice(index, 1);
    const newWorksheet = xlsx.utils.json_to_sheet(rows, {
      header: TRANSACTION_HEADERS,
    });
    workbook.Sheets["Transactions"] = newWorksheet;
    xlsx.writeFile(workbook, filePath);

    const win = BrowserWindow.getAllWindows()[0];
    const timestamp = Date.now();
    if (win)
      win.webContents.send("transactions-updated", {
        portfolio,
        rows,
        timestamp,
        source: "main",
      });
    return { success: true };
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
    return { success: false, err };
  }
});

// ✅ IPC: Write Summaries — portfolio-specific
ipcMain.handle("write-summaries", async (event, payload) => {
  try {
    let summariesArray = [];
    let meta = {};
    if (Array.isArray(payload)) {
      summariesArray = payload;
    } else if (payload && typeof payload === "object") {
      summariesArray = payload.summaries || [];
      meta = payload.meta || {};
    }

    const portfolio = meta.portfolio || "portfolio1";
    const filePath = getSummaryFilePath(portfolio);
    ensureSummaryFile(portfolio);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(summariesArray);
    xlsx.utils.book_append_sheet(wb, ws, "Summary");
    xlsx.writeFile(wb, filePath);

    const win = BrowserWindow.getAllWindows()[0];
    const timestamp = Date.now();
    if (win)
      win.webContents.send("summary-updated", {
        portfolio,
        timestamp,
        source: "main",
      });

    return { success: true, path: filePath, timestamp };
  } catch (err) {
    console.error("❌ Error writing summary:", err);
    return { success: false, err };
  }
});

// ✅ IPC: Read Summaries — portfolio-specific
ipcMain.handle("read-summaries", async (event, portfolio) => {
  try {
    const filePath = getSummaryFilePath(portfolio);
    ensureSummaryFile(portfolio);
    const wb = xlsx.readFile(filePath);
    const ws = wb.Sheets["Summary"];
    return ws ? xlsx.utils.sheet_to_json(ws, { defval: "" }) : [];
  } catch (err) {
    console.error("❌ Error reading summary:", err);
    return [];
  }
});
