import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box, LinearProgress } from '@mui/material';
import settings from '../assets/settings.png';
import piggyImage from '../assets/piggy.png';
import '../css/piggy.css';
import React, { useState } from 'react';
import PiggyToTransactions from '../pages/PiggyToTransactions';
import PiggyToCards from "../pages/PiggyToCards"
import PiggyToSettings from './PiggyToSettings';
import {SwitchStates} from '../App'
import {Transaction} from '../hooks/useTransactions'

import '../css/App.css';

type Props = {
  whichStateEnabled: SwitchStates;
  allTransactions: Transaction[];
  budget: string;
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>
};

type SummaryProps = {
  earnings: number,
  spent: number,
  budget: string
}

const typeToState: Record<string, keyof SwitchStates> = {
  deposit: 'deposits',
  withdrawal: 'withdrawals',
  purchase: 'purchase',
  loan: 'loans',
  transfer: 'transfers',
  bill: 'bills',
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);



export default function Piggy({whichStateEnabled, allTransactions, budget, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear}: Props) {
  let earnings = 0;
  let spent = 0;


  const filteredTransactions = allTransactions.filter((transaction) => {
    const transactionType = transaction.type;
    return whichStateEnabled[typeToState[transactionType]];
  });
  console.log(filteredTransactions)

  // const filteredByMonth = filteredTransactions.filter((transaction) => {
  //   const rawDate = transaction.transaction_date || transaction.purchase_date;
  //   if (!rawDate) return false;
  //   const txDate = new Date(rawDate);
  //   const monthName = txDate.toLocaleString('default', { month: 'long' });
  //   return monthName === selectedMonth;
  // });

  // const filteredByYear = filteredTransactions.filter((transaction) => {
  //   const rawDate = transaction.transaction_date || transaction.purchase_date;
  //   if (!rawDate) return false;
  //   const txDate = new Date(rawDate);
  //   const yearName = txDate.toLocaleString('default', { year: 'numeric' });
  //   return yearName === selectedYear;
  // });

  const filteredByMonthAndYear = filteredTransactions.filter((transaction) => {
    const rawDate = transaction.transaction_date || transaction.purchase_date;
    if (!rawDate) return false;
  
    const txDate = new Date(rawDate);
  
    const monthMatch = txDate.toLocaleString('default', { month: 'long' }) == selectedMonth;
    console.log(txDate.getFullYear().toString())
    console.log(selectedYear)
    const yearMatch = txDate.getFullYear().toString() == selectedYear;
  
    return monthMatch && yearMatch;
  });
  console.log(filteredByMonthAndYear)
  filteredByMonthAndYear.forEach((transaction) => {
    const type = transaction.type
    if (['deposit', 'loan'].includes(type)) {
      earnings += transaction.amount;
    } else {
      spent += transaction.amount;
    }
  });
  
  let percent = (spent - earnings) / Number(budget)


  return (
    <Box className="border">
        <Header/>
        <SubHeader/>
      <ImageAndBar value={percent} />

      <Typography variant="subtitle1" sx={{fontSize:'20px',textAlign: 'left',  marginLeft: '16px',}}>
        Allocated Budget
      </Typography>

      <Box className="cashAndMonth">
        <Typography variant="h1" id="budget" sx={{ fontFamily:'Special Gothic Expanded One', fontSize:'40px', textAlign: 'left',  marginLeft: '-10px',}}>
          ${Number(budget).toFixed(2)}
        </Typography>

        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}      
          variant = 'standard'
          sx={{ fontSize: '1.5rem', ml: 1, marginLeft:"20px"  }}
          defaultValue='April'
          disableUnderline
          id="month"
        >
          {months.map((month, index) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}      
          variant = 'standard'
          sx={{ fontSize: '1.2rem', ml: 1 }}
          defaultValue='2025'
          disableUnderline
          id="year"
        >
          {years.map((year, index) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box className="container">
        <Summary earnings={earnings} spent={spent} budget={budget}/>
        <Box className="bottomBar">
          <PiggyToTransactions />
          <PiggyToCards/>
        </Box>
      </Box>
    </Box>
  );
}


function Header() {
  return (
    <Box className="header">
      <PiggyToSettings/>
    </Box>
  );
}

function SubHeader(){
  return (
    <Box className="subheader">
         <Typography variant="subtitle1" id="slogan" fontSize={"20px"}>
          A New Way to Budget
         </Typography>

         <Typography variant="subtitle1" id="welcome" fontSize={"20px"}>
         Hello Ryan!
         </Typography>
    </Box>
  );
}

function Summary({earnings, spent, budget}: SummaryProps) {
  return (
    <Box className="summary">
      <Box className="summaryDetails">
        <Box id="earningsMade">
          <Typography variant="subtitle1">
            <span>Money In</span>
            <br/>
            <span style={{ 
              color:'#a1ae74',
              fontFamily:'Special Gothic Expanded One'}}> ${earnings.toFixed(2)}</span>
          </Typography>
        </Box>
        <Box id="moneySpent">
          <Typography variant="subtitle1">
          <span>Money Out</span>
            <br/>
            <span style={{ 
              fontFamily:'Special Gothic Expanded One',
              color:'#ec6b69' }}> ${spent.toFixed(2)}</span>
          </Typography>
        </Box>
        <Box id="netChange">
          <Typography variant="subtitle1">
          <span>Money In</span>
            <br/>
            <span style={{
              fontFamily:'Special Gothic Expanded One',
              color: (earnings-spent) < 0 ? '#ec6b69': '#a1ae74'
              
              }}> ${(earnings-spent).toFixed(2)}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function ImageAndBar({ value }: { value: number }) {
  return (
    <Box className="piggy-container">
      <img src={piggyImage} id="piggyBank" alt="Piggy Bank" />
      {/* <div className="fill-bar" id="fillBar"></div> */}
      <FillBar value={value}></FillBar>
    </Box>
  );
}

function FillBar({ value }: { value: number }){
  value *= 100
  value = Math.max(value, 0)
  let fillBarValue = Math.min(100, value)
  fillBarValue = Math.max(0, fillBarValue)
  return (
    <Box sx={{ width: '150%', textAlign: 'center', mt: 2 }}>
      <Typography variant="subtitle1" sx={{fontSize:'20px',}}>
        Budget Usage: {value.toFixed(1)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={fillBarValue}
        // className="fill-bar"
        sx={{
          height: 25,
          alignContent: 'center',
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            backgroundColor: 
            fillBarValue < 25 ? '#a1ae74' :         // green if under 50%
            fillBarValue < 75 ? '#ffc664' :         // gold/yellow between 50%-80%
            '#ec6b69',                             // red if over 80%
          },
        }}
      />
    </Box>
  );
}

// function PiggyActions() {
//   const MyComponent = () => {
//     // Declare a state variable `buttonClicked` to track if the button is clicked
//     const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  
//     const handleClick = () => {
//       // Update the state to `true` when the button is clicked
//       setButtonClicked(true);
  
//       // After state is updated, navigate to the appropriate page
//       if (buttonClicked) {
//         window.location.href = "Transactions.tsx"; // Navigate to the `/another` page
//       }
//     }
  

//     return (
//       <Box className="buttons" display="flex" gap={3} justifyContent="center" mt={2}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: '#f6a91a', color: '#fff'}}
//         >
//           Calculate
//         </Button>
//         <Button variant="outlined" onClick={handleClick}>
//           Expand Transactions
//         </Button>
//       </Box>
//     );
//   };
//   export default MyComponent;

// }