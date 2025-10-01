

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
//   const [theme, setTheme] = useState("dark"); // default dark theme

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   // Apply theme class to body
//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <Router>
//       {/* Wrap EVERYTHING that needs context with SummaryProvider */}
//       <SummaryProvider>
//         {/* Navbar now has access to context */}
//         <Navbar theme={theme} toggleTheme={toggleTheme} />

//         <div className="page-container">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/summary" element={<Summary />} />
//             <Route path="/transactions" element={<Transactions />} />

//             {/* Example counter page */}
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
import { PortfolioProvider } from "./context/PortfolioContext.jsx";

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
      <PortfolioProvider>
        <SummaryProvider>
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
      </PortfolioProvider>
    </Router>
  );
}

export default App;
