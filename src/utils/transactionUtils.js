// Base transaction calculations
export const derivedColumnFormats = {
  "Fees": "currency",
  "Net Value": "currency",
  "Cumulative Units": "number",
  "Cumulative Cost": "currency",
  "Cumulative Avg Cost/Unit": "currency"
};

export const calculateDerivedColumns = {
  "Fees": (txn) => {
    const units = Number(txn["Number of Units"] || txn.units || 0);
    const price = Number(txn["Price per Share"] || txn.price || 0);
    const type = (txn.Type || txn.type || "").toLowerCase();
    let fees = 0;

    if (type === "buy" || type === "sell") {
      const commission = price < 20 ? units * 0.03 : units * price * 0.0015;
      const salesTax = commission * 0.15;
      const cdcCharges = units * 0.005;
      fees = commission + salesTax + cdcCharges;
    } else if (type === "dividend") {
      // 15% withholding tax
      fees = units * price * 0.15;
    }

    return fees;
  },

  "Net Value": (txn) => {
    const units = Number(txn["Number of Units"] || txn.units || 0);
    const price = Number(txn["Price per Share"] || txn.price || 0);
    const type = (txn.Type || txn.type || "").toLowerCase();
    const totalValue = units * price;
    const fees = calculateDerivedColumns["Fees"](txn);

    if (type === "buy") {
      return totalValue + fees; // cost basis increases
    } else if (type === "sell") {
      return totalValue - fees; // proceeds reduced
    } else if (type === "dividend") {
      return totalValue - fees; // payout reduced by withholding
    }
    return totalValue;
  },
};


// 🔹 Add cumulative units + cost processor
export function withCumulativeData(transactions) {
  const totalsByStock = {}; // { symbol: { units, cost } }

  return transactions.map((txn) => {
    const symbol = (txn["Stock Symbol"] || txn.stock || "").toUpperCase().trim();
    const units = Number(txn["Number of Units"] || txn.units || 0);
    const type = txn.Type || txn.type || "";

    if (!totalsByStock[symbol]) {
      totalsByStock[symbol] = { units: 0, cost: 0 };
    }

    const netValue = calculateDerivedColumns["Net Value"](txn);

    if (type === "Buy") {
      totalsByStock[symbol].units += units;
      totalsByStock[symbol].cost += netValue;
    } else if (type === "Sell") {
      // proportional cost reduction
      const avgCostPerUnit =
        totalsByStock[symbol].units > 0
          ? totalsByStock[symbol].cost / totalsByStock[symbol].units
          : 0;

      totalsByStock[symbol].units -= units;
      totalsByStock[symbol].cost -= avgCostPerUnit * units;
    }
    // Dividends don’t change units or cost

    const cumulativeUnits = totalsByStock[symbol].units;
    const cumulativeCost = totalsByStock[symbol].cost;
    const avgCost =
      cumulativeUnits > 0 ? cumulativeCost / cumulativeUnits : 0;

    return {
      ...txn,
      "Cumulative Units": cumulativeUnits,
      "Cumulative Cost": cumulativeCost,
      "Cumulative Avg Cost/Unit": avgCost,
    };
  });
}

