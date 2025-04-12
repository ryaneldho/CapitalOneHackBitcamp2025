import React from 'react';
import './css/App.css';
import TestDashboard from './components/TestDashboard';
import Piggy from './pages/Piggy';

const accountId = "67f9f6fb9683f20dd5194d5c"
const testMerchantIkea = "66ef43749683f20dd518a511"

function App() {
  return (
    <div className="App">
      {/* <TestDashboard userId = {accountId}/> */}
      <Piggy/>
    </div>
  );
}

export default App;
