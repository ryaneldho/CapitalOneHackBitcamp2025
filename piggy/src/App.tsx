import React, { useState } from 'react';
import './css/App.css';
import TestDashboard from './components/TestDashboard';
import Piggy from './pages/Piggy';
import Settings from './pages/Settings'
import Transactions from './pages/Transactions';
import { Console } from 'console';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTransactions } from './hooks/useTransactions';
import { Transaction } from './hooks/useTransactions'


const accountId = "67fb4a069683f20dd51955e3"
const testMerchantIkea = "66ef43749683f20dd518a511"

export interface SwitchStates {
  deposits: boolean;
  withdrawals: boolean;
  purchase: boolean;
  loans: boolean;
  transfers: boolean;
  bills: boolean;
};


function App() {
  const { deposits, loans, purchases, withdrawals, transfers, bills } = useTransactions(accountId);

  const allTransactions: Transaction[] = [
    ...deposits,
    ...loans,
    ...purchases,
    ...withdrawals,
    ...transfers,
    ...bills
  ]
  const sortedTransactions = allTransactions.sort((x, y) => {
    const dateX = new Date(x.transaction_date || x.purchase_date || "").getTime()
    const dateY = new Date(y.transaction_date || y.purchase_date || "").getTime()
    return dateY - dateX
  })
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    deposits: true,
    withdrawals: true,
    purchase: true,
    loans: true,
    transfers: true,
    bills: true,
  });

  const [budgetValue, setBudgetValue] = useState('10');

  const [selectedMonth, setSelectedMonth] = useState("April");

  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Piggy whichStateEnabled={switchStates} allTransactions={allTransactions} budget={budgetValue} 
          selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>} />
          <Route path="/Transactions" element={<Transactions sortedTransactions={sortedTransactions} selectedMonth = {selectedMonth} selectedYear={selectedYear}/>} />
          <Route path="/Settings" element={<Settings switchStates={switchStates} setSwitchStates={setSwitchStates}
            budgetValue={budgetValue} setBudgetValue={setBudgetValue} />} />
        </Routes>
      </Router>
      {/* <TestDashboard userId = {accountId}/> */}
      {/* <Piggy></Piggy> */}
      {/* <Settings switchStates={switchStates} setSwitchStates={setSwitchStates} /> */}
      {/* <Transactions userId={accountId}></Transactions> */}
    </div>
  );
}

export default App;
