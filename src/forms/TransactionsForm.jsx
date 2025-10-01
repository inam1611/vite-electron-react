// import React, { useState } from "react";
// import "../styles/TransactionsForm.css";

// function TransactionsForm({ addTransaction }) {
//   const [form, setForm] = useState({
//     date: "",
//     stockName: "",
//     units: "",
//     price: "",
//     type: "" // new field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addTransaction(form);
//     setForm({ date: "", stockName: "", units: "", price: "", type: "" });
//   };

//   return (
//     <div className="transactions-container">
//       <h2 className="form-heading">Transaction Form</h2>
//       <form className="transaction-form" onSubmit={handleSubmit}>
//         {/* Date */}
//         <div className="form-group">
//           <label>Date</label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Stock Name */}
//         <div className="form-group">
//           <label>Stock Name</label>
//           <input
//             type="text"
//             name="stockName"
//             value={form.stockName}
//             onChange={handleChange}
//             placeholder="e.g. MEBL"
//             required
//             style={{ textTransform: "uppercase" }}
//           />
//         </div>

//         {/* Units */}
//         <div className="form-group">
//           <label>No. of Units</label>
//           <input
//             type="number"
//             name="units"
//             value={form.units}
//             onChange={handleChange}
//             placeholder="e.g. 100"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div className="form-group">
//           <label>Price per Share</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="e.g. 250"
//             required
//           />
//         </div>

//         {/* Type */}
//         <div className="form-group">
//           <label>Type</label>
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select Type
//             </option>
//             <option value="Buy">Buy</option>
//             <option value="Sell">Sell</option>
//             <option value="Dividend">Dividend</option>
//           </select>
//         </div>

//         {/* Add Button */}
//         <button type="submit" className="add-btn">
//           Add Transaction
//         </button>
//       </form>
//     </div>
//   );
// }

// export default TransactionsForm;

import React, { useState } from "react";
import "../styles/TransactionsForm.css";

function TransactionsForm({ addTransaction }) {
  const [form, setForm] = useState({
    date: "",
    stockName: "",
    units: "",
    price: "",
    type: "",
    portfolio: "" // ✅ new field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(form);
    setForm({
      date: "",
      stockName: "",
      units: "",
      price: "",
      type: "",
      portfolio: ""
    });
  };

  return (
    <div className="transactions-container">
      <h2 className="form-heading">Transaction Form</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock Name */}
        <div className="form-group">
          <label>Stock Name</label>
          <input
            type="text"
            name="stockName"
            value={form.stockName}
            onChange={handleChange}
            placeholder="e.g. MEBL"
            required
            style={{ textTransform: "uppercase" }}
          />
        </div>

        {/* Units */}
        <div className="form-group">
          <label>No. of Units</label>
          <input
            type="number"
            name="units"
            value={form.units}
            onChange={handleChange}
            placeholder="e.g. 100"
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price per Share</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 250"
            required
          />
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Dividend">Dividend</option>
          </select>
        </div>

        {/* Portfolio */}
        <div className="form-group">
          <label>Portfolio</label>
          <select
            name="portfolio"
            value={form.portfolio || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Portfolio
            </option>
            <option value="portfolio1">Portfolio 1</option>
            <option value="portfolio2">Portfolio 2</option>
          </select>
        </div>
        
        {/* Add Button */}
        <button type="submit" className="add-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionsForm;
