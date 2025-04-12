import React, { useState } from 'react';
import '../css/settings.css';
import { Typography, Button, Box, FormGroup, Switch, FormControlLabel } from '@mui/material';

interface SettingsProps {
  switchStates: SwitchStates;
  setSwitchStates: React.Dispatch<React.SetStateAction<SwitchStates>>;
}

interface OptionsProps {
  switchStates: SwitchStates;
  setSwitchStates: React.Dispatch<React.SetStateAction<SwitchStates>>;
}

type SwitchStates = {
  deposits: boolean;
  withdrawals: boolean;
  purchase: boolean;
  loans: boolean;
  transfers: boolean;
  bills: boolean;
};


function Settings({ switchStates, setSwitchStates }: SettingsProps) {
  // return (
  //   <div className="Settings">
      
  //   </div>
  // );

  const depositsCheck = switchStates.deposits;
  const loansCheck = switchStates.loans;
  const transfersCheck = switchStates.transfers;
  
  return (
    <Box className="border">
      <Header/>
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
