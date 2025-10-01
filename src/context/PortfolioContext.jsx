// context/PortfolioContext.jsx
import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [activePortfolio, setActivePortfolio] = useState("portfolio1"); // default

  return (
    <PortfolioContext.Provider value={{ activePortfolio, setActivePortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
