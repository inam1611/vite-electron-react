// import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// import Navbar from "./components/Navbar";

// function App() {
//   const [count, setCount] = useState(0);
//   const [theme, setTheme] = useState("dark"); // default dark

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   // Apply theme to body
//   useEffect(() => {
//     document.body.className = theme; 
//   }, [theme]);

//   return (
//     <>
//       {/* Navbar */}
//       <Navbar theme={theme} toggleTheme={toggleTheme} />

//       {/* Main content */}
//       {/* <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div> */}
//       {/* <h1>Vite + React</h1> */}
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Summary from "./pages/Summary";
// import Transactions from "./pages/Transactions";

// function App() {
//   const [count, setCount] = useState(0);
//   const [theme, setTheme] = useState("dark"); // default dark

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // Apply theme to body
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <Router>
//       {/* Navbar stays visible on all pages */}
//       <Navbar theme={theme} toggleTheme={toggleTheme} />

//       {/* Main content changes by route */}
//       <div className="page-container">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/summary" element={<Summary />} />
//           <Route path="/transactions" element={<Transactions />} />

//           {/* Example: keep your counter page */}
//           <Route
//             path="/counter"
//             element={
//               <div className="card">
//                 <button onClick={() => setCount((c) => c + 1)}>
//                   count is {count}
//                 </button>
//                 <p>
//                   Edit <code>src/App.jsx</code> and save to test HMR
//                 </p>
//               </div>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Summary from "./pages/Summary";
// import Transactions from "./pages/Transactions";
// import { SummaryProvider } from "./context/SummaryContext.jsx";

// function App() {
//   const [count, setCount] = useState(0);
//   const [theme, setTheme] = useState("dark"); // default dark

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // Apply theme to body
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <Router>
//       {/* Navbar stays visible on all pages */}
//       <Navbar theme={theme} toggleTheme={toggleTheme} />

//       {/* Wrap all pages with provider so data persists */}
//       <SummaryProvider>
//         <div className="page-container">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/summary" element={<Summary />} />
//             <Route path="/transactions" element={<Transactions />} />

//             {/* Example: keep your counter page */}
//             <Route
//               path="/counter"
//               element={
//                 <div className="card">
//                   <button onClick={() => setCount((c) => c + 1)}>
//                     count is {count}
//                   </button>
//                   <p>
//                     Edit <code>src/App.jsx</code> and save to test HMR
//                   </p>
//                 </div>
//               }
//             />
//           </Routes>
//         </div>
//       </SummaryProvider>
//     </Router>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import Transactions from "./pages/Transactions";
import { SummaryProvider } from "./context/SummaryContext.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("dark"); // default dark theme

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      {/* Wrap EVERYTHING that needs context with SummaryProvider */}
      <SummaryProvider>
        {/* Navbar now has access to context */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/transactions" element={<Transactions />} />

            {/* Example counter page */}
            <Route
              path="/counter"
              element={
                <div className="card">
                  <button onClick={() => setCount((c) => c + 1)}>
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </SummaryProvider>
    </Router>
  );
}

export default App;
