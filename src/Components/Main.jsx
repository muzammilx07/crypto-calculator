import React, { useState, useEffect } from "react";
import "../App.css";

const Main = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState("Short Term");
  const [annualIncome, setAnnualIncome] = useState("$0 - $18,200");
  const [capitalGains, setCapitalGains] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxToPay, setTaxToPay] = useState(0);
  const [taxRate, setTaxRate] = useState("0%");

useEffect(() => {
  let gains = salePrice - purchasePrice - expenses;
  let discountAmount = 0;

  if (investmentType === "Long Term") {
    gains = capitalGains;
    if (gains > 0) {
      discountAmount = gains * 0.5; 
    }
  }

  const netCapitalGains = gains;
  setDiscount(discountAmount);
  setNetCapitalGains(netCapitalGains);

  let taxRateValue = 0;
  let baseTax = 0;

  switch (annualIncome) {
    case "$0 - $18,200":
      taxRateValue = 0;
      break;
    case "$18,201 - $45,000":
      taxRateValue = 0.19;
      break;
    case "$45,001 - $120,000":
      taxRateValue = 0.325;
      baseTax = 5092;
      break;
    case "$120,001 - $180,000":
      taxRateValue = 0.37;
      baseTax = 29467;
      break;
    case "$180,001+":
      taxRateValue = 0.45;
      baseTax = 51667;
      break;
    default:
      taxRateValue = 0;
  }

  const calculatedTax = netCapitalGains * taxRateValue; 
  setTaxToPay(calculatedTax);

  const calculateTaxRateDescription = (incomeRange) => {
    switch (incomeRange) {
      case "$0 - $18,200":
        return "0%";
      case "$18,201 - $45,000":
        return "Nil + 19% of the excess over A$18,200";
      case "$45,001 - $120,000":
        return "A$5,092 + 32.5% of the excess over A$45,000";
      case "$120,001 - $180,000":
        return "A$29,467 + 37% of the excess over A$120,000";
      case "$180,001+":
        return "A$51,667 + 45% of the excess over A$180,000";
      default:
        return "";
    }
  };

  setTaxRate(calculateTaxRateDescription(annualIncome));
}, [
  purchasePrice,
  salePrice,
  expenses,
  investmentType,
  annualIncome,
  capitalGains,
  discount,
  netCapitalGains,
]);


  return (
    <div className="h-full max-w-full rounded m-10 bg-white flex justify-center overflow-x-hidden">
      <div className="container mx-auto p-4 max-w-full overflow-x-hidden">
        <h1 className="text-2xl font-bold text-center mb-6">
          Free Crypto Tax Calculator - Australia
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-end gap-3">
            <label
              htmlFor="financialYear"
              className="block text-gray-700 font-bold mb-2 flex-shrink-0"
            >
              Financial Year
            </label>
            <select
              id="financialYear"
              className="shadow appearance-none border rounded h-12 py-2 px-3 text-gray-700 outline-none focus:border-2 focus:border-blue-500 bg-slate-100 border-slate-300 flex-grow"
            >
              <option value="FY 2023-24">FY 2023-24</option>
            </select>
          </div>
          <div className="flex items-end gap-3">
            <label
              htmlFor="country"
              className="block text-gray-700 font-bold mb-2 flex-shrink-0"
            >
              Country
            </label>
            <select
              id="country"
              className="shadow appearance-none border rounded h-12 py-2 px-3 text-gray-700 outline-none focus:border-2 focus:border-blue-500 bg-slate-100 border-slate-300 flex-grow"
            >
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>
        <hr className="my-10 mx-4 h-0.5 bg-slate-300 border-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden">
          <div>
            <label
              htmlFor="purchasePrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter purchase price of Crypto
            </label>
            <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
              <span className="px-3 text-black text-2xl">A$</span>
              <input
                type="number"
                id="purchasePrice"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(parseFloat(e.target.value))}
                className="no-spinner flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="salePrice"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter sale price of Crypto
            </label>
            <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
              <span className="px-3 text-black text-2xl">A$</span>
              <input
                type="number"
                id="salePrice"
                value={salePrice}
                onChange={(e) => setSalePrice(parseFloat(e.target.value))}
                min="0"
                step="any"
                className="no-spinner flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="expenses"
              className="block text-gray-700 font-bold mb-2"
            >
              Enter your Expenses
            </label>
            <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
              <span className="px-3 text-black text-2xl">A$</span>
              <input
                type="number"
                id="expenses"
                value={expenses}
                onChange={(e) => setExpenses(parseFloat(e.target.value))}
                className="no-spinner flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="investmentType"
              className="block text-gray-700 font-bold mb-2"
            >
              Investment Type
            </label>
            <div className="flex flex-row space-x-4 overflow-hidden">
              <div className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  id="shortTerm"
                  name="investmentType"
                  value="Short Term"
                  onClick={() => setInvestmentType("Short Term")}
                  className={`py-2 px-4 rounded shadow-md border w-full ${
                    investmentType === "Short Term"
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-600 text-gray-700"
                  }`}
                >
                  Short Term
                  {investmentType === "Short Term" && (
                    <span className="ml-2 text-blue-500">✓</span>
                  )}
                </button>
                <p className="text-gray-600 text-sm mt-2">&lt; 12 months</p>
              </div>
              <div className="flex flex-col items-center flex-1">
                <button
                  type="button"
                  id="longTerm"
                  name="investmentType"
                  value="Long Term"
                  onClick={() => setInvestmentType("Long Term")}
                  className={`py-2 px-4 rounded shadow-md border w-full ${
                    investmentType === "Long Term"
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-600 text-gray-700"
                  }`}
                >
                  Long Term
                  {investmentType === "Long Term" && (
                    <span className="ml-2 text-blue-500">✓</span>
                  )}
                </button>
                <p className="text-gray-600 text-sm mt-2">&gt; 12 months</p>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="annualIncome"
              className="block text-gray-700 font-bold mb-2"
            >
              Annual Income
            </label>
            <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
              <select
                id="annualIncome"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
              >
                <option value="$0 - $18,200">$0 - $18,200</option>
                <option value="$18,201 - $45,000">$18,201 - $45,000</option>
                <option value="$45,001 - $120,000">$45,001 - $120,000</option>
                <option value="$120,001 - $180,000">$120,001 - $180,000</option>
                <option value="$180,001+">$180,001+</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-col flex-1 py-2 px-4 rounded shadow-md border h-16 mt-4 bg-slate-100 overflow-hidden">
              <label htmlFor="taxRate" className="text-sm text-gray-600">
                Tax Rate
              </label>
              <div className="text-black">{taxRate}</div>
            </div>
          </div>

          {investmentType === "Long Term" && (
            <>
              <div>
                <label
                  htmlFor="capitalGains"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Capital Gains Amount
                </label>
                <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
                  <span className="px-3 text-black text-2xl">A$</span>
                  <input
                    type="number"
                    id="capitalGains"
                    value={capitalGains}
                    onChange={(e) =>
                      setCapitalGains(parseFloat(e.target.value))
                    }
                    className="no-spinner flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="discount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Discount for Long Term Gains
                </label>
                <div className="flex items-center border rounded shadow h-12 bg-slate-100 border-slate-300 overflow-hidden">
                  <span className="px-3 text-black text-2xl">%</span>
                  <input
                    type="number"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    className="no-spinner flex-grow py-2 px-3 text-gray-700 border-none bg-slate-100 outline-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>{" "}
        <div className="mt-6 flex flex-col items-center overflow-hidden p-4">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="flex flex-wrap gap-4 overflow-hidden w-full">
            <div className="flex-1 min-w-[200px]">
              <button className="w-full bg-green-200 font-bold rounded p-4 shadow-md">
                <div className="text-sm mb-1">Net Capital Gains Amount</div>
                <div className="text-2xl text-green-500">
                  ${netCapitalGains.toFixed(2)}
                </div>
              </button>
            </div>
            <div className="flex-1 min-w-[200px]">
              <button className="w-full bg-blue-200 font-bold rounded p-4 shadow-md">
                <div className="text-sm mb-1">Tax to Pay</div>
                <div className="text-2xl text-blue-500">
                  A${taxToPay.toFixed(2)}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
