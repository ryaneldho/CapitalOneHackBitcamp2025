import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box, LinearProgress } from '@mui/material';
import settings from '../assets/settings.png';
import piggyImage from '../assets/piggy.png';
import '../css/piggy.css';
import React, { useState } from 'react';
import PiggyToTransactions from '../pages/PiggyToTransactions';
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



export default function Piggy({whichStateEnabled, allTransactions, budget, selectedMonth, setSelectedMonth}: Props) {
  let earnings = 0;
  let spent = 0;


  const filteredTransactions = allTransactions.filter((transaction) => {
    const transactionType = transaction.type;
    return whichStateEnabled[typeToState[transactionType]];
  });

  const filteredByMonth = filteredTransactions.filter((transaction) => {
    const rawDate = transaction.transaction_date || transaction.purchase_date;
    if (!rawDate) return false;
    const txDate = new Date(rawDate);
    const monthName = txDate.toLocaleString('default', { month: 'long' });
    return monthName === selectedMonth;
  });

  filteredByMonth.forEach((transaction) => {
    const type = transaction.type
    if (['deposit', 'loan'].includes(type)) {
      earnings += transaction.amount;
    } else {
      spent += transaction.amount;
    }
  });

  console.log(budget);
  console.log(spent)
  console.log(earnings)
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
        <Typography variant="h1" id="budget" sx={{ fontFamily:'Special Gothic Expanded One', fontSize:'50px', textAlign: 'left',  marginLeft: '10px',}}>
          ${Number(budget).toFixed(2)}
        </Typography>

        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}      
          variant = 'standard'
          sx={{ fontSize: '2.0rem', ml: 1 }}
          defaultValue='Aptil'
          disableUnderline
          id="month"
        >
          {months.map((month, index) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Box>




      <Box className="container">
        <Summary earnings={earnings} spent={spent} budget={budget}/>
        <PiggyToTransactions />
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
        <Typography variant="subtitle1" id="earningsMade">
          Money In: <br />${earnings.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" id="moneySpent">
          Money Out: <br />${spent.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" id="netChange">
          Net Change: <br />${(earnings-spent).toFixed(2)}
        </Typography>
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
            backgroundColor: '#e5b438',
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