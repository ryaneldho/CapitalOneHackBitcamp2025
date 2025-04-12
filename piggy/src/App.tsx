import React from 'react';
import './App.css';
import TestDashboard from './components/TestDashboard';

const accountId = "67f9f6fb9683f20dd5194d5c"
const testMerchantIkea = "66ef43749683f20dd518a511"

function App() {
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <TestDashboard userId = {accountId}/>
    </div>
  );
}

export default App;
