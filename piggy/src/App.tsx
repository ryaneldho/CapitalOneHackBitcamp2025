import React from 'react';
import './css/App.css';
import TestDashboard from './components/TestDashboard';
import Piggy from './pages/Piggy';
import Transactions from './pages/Transactions';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const accountId = "67f9f6fb9683f20dd5194d5c"
const testMerchantIkea = "66ef43749683f20dd518a511"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Piggy />} />
          <Route path="/Transactions" element={<Transactions />} />
        </Routes>
        <Piggy/>
      </Router>
      {/* <TestDashboard userId = {accountId}/> */}
      {/*<Transactions/>*/}
    </div>
  );
}

export default App;
