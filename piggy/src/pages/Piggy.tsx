import { Typography, Button, Box } from '@mui/material';
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
};

type SummaryProps = {
  earnings: number,
  spent: number
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


export default function Piggy({whichStateEnabled, allTransactions, budget}: Props) {
  let earnings = 0;
  let spent = 0;

  const filteredTransactions = allTransactions.filter((transaction) => {
    const transactionType = transaction.type.toLowerCase();
    return whichStateEnabled[typeToState[transactionType]];
  });

  filteredTransactions.forEach((transaction) => {
    const type = transaction.type
    if (['deposit', 'loan'].includes(type)) {
      earnings += transaction.amount;
    } else {
      spent += transaction.amount;
    }
  });


  return (
    <Box className="border">
      <Header/>
      <Typography variant="h4" id="summaryTitle" >
        Summary for April
      </Typography>

      <Box className="container">
        <Summary earnings={earnings} spent={spent} budget={budget}/>
        <ImageAndBar />
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

function Summary({earnings, spent, budget}: SummaryProps) {
  return (
    <Box className="summary">
      <Box className="summaryDetails">
        <Typography variant="subtitle1" id="earningsMade">
          Earnings: <br />${earnings.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" id="moneySpent">
          Spent: <br />${spent.toFixed(2)}
        </Typography>
      </Box>
      <Box className="summaryDetails">
        <Typography variant="subtitle1" id="budget">
          Budget: <br />${Number(budget).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" id="netChange">
          Change: <br />${(earnings-spent).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

function ImageAndBar() {
  return (
    <Box className="piggy-container">
      <img src={piggyImage} id="piggyBank" alt="Piggy Bank" />
      <div className="fill-bar" id="fillBar"></div>
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