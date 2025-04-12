import React, { useState } from 'react';
import './css/App.css';
import TestDashboard from './components/TestDashboard';
import Piggy from './pages/Piggy';
import Settings from './pages/Settings'
import Transactions from './pages/Transactions';
import { Console } from 'console';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const accountId = "67f9f6fb9683f20dd5194d5c"
const testMerchantIkea = "66ef43749683f20dd518a511"

type SwitchStates = {
  deposits: boolean;
  withdrawals: boolean;
  purchase: boolean;
  loans: boolean;
  transfers: boolean;
  bills: boolean;
};

function App() {
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    deposits: true,
    withdrawals: true,
    purchase: true,
    loans: true,
    transfers: true,
    bills: true,
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Piggy />} />
          <Route path="/Transactions" element={<Transactions userId={accountId}/>} />
        </Routes>
      </Router>
      {/* <TestDashboard userId = {accountId}/> */}
      {/* <Piggy></Piggy> */}
      {/* <Settings switchStates={switchStates} setSwitchStates={setSwitchStates} /> */}
      <Transactions userId={accountId}></Transactions>
    </div>
  );
}

export default App;
