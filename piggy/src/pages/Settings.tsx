import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/settings.css';
import { Typography, Button, Box, FormGroup, Switch, FormControlLabel, TextField } from '@mui/material';

interface SettingsProps {
  switchStates: SwitchStates;
  setSwitchStates: React.Dispatch<React.SetStateAction<SwitchStates>>;
  budgetValue: string;
  setBudgetValue: React.Dispatch<React.SetStateAction<string>>;
}

interface OptionsProps {
  switchStates: SwitchStates;
  setSwitchStates: React.Dispatch<React.SetStateAction<SwitchStates>>;
}

interface BudgetProps {
  budgetValue: string;
  setBudgetValue: React.Dispatch<React.SetStateAction<string>>;
}

type SwitchStates = {
  deposits: boolean;
  withdrawals: boolean;
  purchase: boolean;
  loans: boolean;
  transfers: boolean;
  bills: boolean;
};


function Settings({ switchStates, setSwitchStates, budgetValue, setBudgetValue }: SettingsProps) {
  // return (
  //   <div className="Settings">
      
  //   </div>
  // );

  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (clicked) {
        setClicked(false)
        navigate("/"); // Redirect after state update
      }
    }, [clicked, navigate]);
  
  return (
    <Box className="border">
      <Box className="header">
        <Typography variant="h4" id="title">
          Settings
        </Typography>
          <Button variant="outlined" color="error" sx={{ mb: 2 }} onClick={() => setClicked(true)}>
                GO BACK
          </Button>
      </Box>
      <Box>
        <Budget budgetValue={budgetValue} setBudgetValue={setBudgetValue}/>
      </Box>   
      <Options switchStates={switchStates} setSwitchStates={setSwitchStates} />
    
    </Box>)
}

function Header() {
  return (
    <Box className="header">
      <Typography variant="h4" id="title">
        Settings
      </Typography>
      <Button variant="outlined" color="error" sx={{mb:2}}>
        GO BACK
      </Button>
    </Box>
  );
}

function Budget({ budgetValue, setBudgetValue }: BudgetProps){

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudgetValue(event.target.value);
  };

  return (
    <TextField id="budget" required label="Enter your budget" variant="outlined" value={budgetValue}
    onChange={handleChange} type="number" sx={{transform: 'scale(1.5)', margin: 1}} />
  );
}


function Options({ switchStates, setSwitchStates }: OptionsProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setSwitchStates(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const {
    deposits: depositsEnabled,
    withdrawals: withdrawalsEnabled,
    purchase: purchaseEnabled,
    loans: loansEnabled,
    transfers: transfersEnabled,
    bills: billsEnabled,
  } = switchStates;

  return (
  <FormGroup className="options">
    <FormControlLabel id="deposits" control={<Switch defaultChecked id="deposits" checked={switchStates.deposits} onChange={handleChange} size="medium" 
     sx={{transform: 'scale(1.5)', margin: 1}}/>} 
    label="Deposits" />
    <br/>
    <FormControlLabel id="withdrawals" control={<Switch defaultChecked id="withdrawals" checked={switchStates.withdrawals} onChange={handleChange} size="medium"  
    sx={{transform: 'scale(1.5)', margin: 1}} />}
    label="Withdrawals" />
     <br/>
    <FormControlLabel id="purchase" control={<Switch defaultChecked id="purchase" checked={switchStates.purchase} onChange={handleChange} size="medium" 
     sx={{transform: 'scale(1.5)', margin: 1}}/>}
    label="Purchase" />
     <br/>
    <FormControlLabel id="loans" control={<Switch defaultChecked id="loans" checked={switchStates.loans} onChange={handleChange} size="medium" 
     sx={{transform: 'scale(1.5)', margin: 1}}/>}
    label="Loans" />
     <br/>
    <FormControlLabel id="transfers" control={<Switch defaultChecked id="transfers" checked={switchStates.transfers} onChange={handleChange} size="medium" 
     sx={{transform: 'scale(1.5)', margin: 1}}/>}
    label="Transfers" />
     <br/>
    <FormControlLabel id="bills" control={<Switch defaultChecked id="bills" checked={switchStates.transfers} onChange={handleChange} size="medium" 
     sx={{transform: 'scale(1.5)', margin: 1}}/>}
    label="Bills" />
</FormGroup>
  )
}

export default Settings;
