// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Navbar.css";

// function Navbar({ theme, toggleTheme }) {
//   return (
//     <div className="navbar">
//       {/* Left side: Logo */}
//       <div className="nav-left">
//         <div className="logo-text">MyApp</div>
//       </div>

//       {/* Center: Navigation links */}
//       <div className="nav-center">
//         <div className="nav-links">
//           <NavLink to="/" end>
//             Dashboard
//           </NavLink>
//           <NavLink to="/summary">Summary</NavLink>
//           <NavLink to="/transactions">Transactions</NavLink>
//           <NavLink to="/counter">Counter</NavLink>
//         </div>
//       </div>

//       {/* Right side: Theme toggle */}
//       <button className="theme-toggle" onClick={toggleTheme}>
//         Switch to {theme === "light" ? "Dark" : "Light"} Theme
//       </button>
//     </div>
//   );
// }

// export default Navbar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Navbar.css";

// function Navbar({ theme, toggleTheme }) {
//   return (
//     <div className="navbar">
//       {/* Left side: Logo */}
//       <div className="nav-left">
//         <div className="logo-text">MyApp</div>
//       </div>

//       {/* Center nav links */}
//       <div className="nav-center">
//         <div className="nav-links">
//           <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
//             Dashboard
//           </NavLink>
//           <NavLink to="/summary" className={({ isActive }) => (isActive ? "active" : "")}>
//             Summary
//           </NavLink>
//           <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
//             Transactions
//           </NavLink>
//           <NavLink to="/counter" className={({ isActive }) => (isActive ? "active" : "")}>
//             Counter
//           </NavLink>
//         </div>
//       </div>

//       {/* Right side: Theme toggle */}
//       <button className="theme-toggle" onClick={toggleTheme}>
//         Switch to {theme === "light" ? "Dark" : "Light"} Theme
//       </button>
//     </div>
//   );
// }

// export default Navbar;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import { styled } from "@mui/material/styles";
// import clsx from "clsx";
// import { useSummary } from "../context/SummaryContext";
// import "../styles/Navbar.css";

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

// function Navbar({ theme, toggleTheme }) {
//   const { summaries, fetchTransactions } = useSummary();
//   const [spinning, setSpinning] = useState(false);

//   const handleRefresh = async () => {
//     setSpinning(true);
//     await fetchTransactions();

//     // 🔹 Save updated summaries
//     if (summaries.length > 0) {
//       window.electronAPI.saveSummaries(summaries);
//     }

//     setTimeout(() => setSpinning(false), 1000);
//   };

//   return (
//     <div className="navbar">
//       {/* Left side: Logo */}
//       <div className="nav-left">
//         <div className="logo-text">MyApp</div>
//       </div>

//       {/* Center nav links */}
//       <div className="nav-center">
//         <div className="nav-links">
//           <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
//             Dashboard
//           </NavLink>
//           <NavLink to="/summary" className={({ isActive }) => (isActive ? "active" : "")}>
//             Summary
//           </NavLink>
//           <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
//             Transactions
//           </NavLink>
//           <NavLink to="/counter" className={({ isActive }) => (isActive ? "active" : "")}>
//             Counter
//           </NavLink>
//         </div>
//       </div>

//       {/* Right side: Theme toggle + Refresh */}
//       <div className="nav-right">
//         <button className="theme-toggle" onClick={toggleTheme}>
//           Switch to {theme === "light" ? "Dark" : "Light"} Theme
//         </button>

//         {/* 🔄 Refresh icon */}
//         <button
//           className="refresh-button"
//           onClick={handleRefresh}
//           disabled={spinning}
//           title="Refresh Data"
//         >
//           <RefreshIcon className={clsx({ spin: spinning })} fontSize="medium" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { useSummary } from "../context/SummaryContext";
import "../styles/Navbar.css";

// 🔹 Styled refresh icon with spin animation
const RefreshIcon = styled(AutorenewIcon)(({ theme }) => ({
  cursor: "pointer",
  marginLeft: "1rem",
  "&.spin": {
    animation: "spin 1s linear",
    pointerEvents: "none",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

function Navbar({ theme, toggleTheme }) {
  const { summaries, fetchTransactions } = useSummary();
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = async () => {
    setSpinning(true);
    await fetchTransactions();

    // 🔹 Save updated summaries to summary.xlsx
    if (summaries.length > 0) {
      window.electronAPI.saveSummaries(summaries);
    }

    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <div className="navbar">
      {/* Left side: Logo */}
      <div className="nav-left">
        <div className="logo-text">MyApp</div>
      </div>

      {/* Center nav links */}
      <div className="nav-center">
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/summary" className={({ isActive }) => (isActive ? "active" : "")}>
            Summary
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => (isActive ? "active" : "")}>
            Transactions
          </NavLink>
          <NavLink to="/counter" className={({ isActive }) => (isActive ? "active" : "")}>
            Counter
          </NavLink>
        </div>
      </div>

      {/* Right side: Refresh + Theme toggle */}
      <div className="nav-right">
        <button
          className="refresh-button"
          onClick={handleRefresh}
          disabled={spinning}
          title="Refresh Data"
        >
          <RefreshIcon className={clsx({ spin: spinning })} fontSize="medium" />
        </button>

        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
    </div>
  );
}

export default Navbar;
