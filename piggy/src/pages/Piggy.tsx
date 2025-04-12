import { Typography, Button, Box } from '@mui/material';
import settings from '../assets/settings.png';
import piggyImage from '../assets/piggy.png';
import '../css/piggy.css';
import '../css/App.css';

export default function Piggy() {
  return (
    <Box className="border">
      <Header />
      <Typography variant="h4" id="summaryTitle" >
        Summary for April
      </Typography>

      <Box className="container">
        <Summary />
        <ImageAndBar />
        <PiggyActions />
      </Box>
    </Box>
  );
}


function Header() {
  return (
    <Box className="header">
      <Typography variant="h5" id="welcome">
        Hello Ryan
      </Typography>
      <img src={settings} id="settings" alt="Settings" />
    </Box>
  );
}

function Summary() {
  return (
    <Box className="summary">
      <Box className="summaryDetails">
        <Typography variant="subtitle1" id="earningsMade">
          Earnings: <br /> $0.00
        </Typography>
        <Typography variant="subtitle1" id="moneySpent">
          Spent: <br /> $500.00
        </Typography>
      </Box>
      <Box className="summaryDetails">
        <Typography variant="subtitle1" id="budget">
          Budget: <br /> $1000.00
        </Typography>
        <Typography variant="subtitle1" id="netChange">
          Change: <br /> -$500.00
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

function PiggyActions() {
  return (
    <Box className="buttons" display="flex" gap={3} justifyContent="center" mt={2}>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#f6a91a', color: '#fff'}}
      >
        Calculate
      </Button>
      <Button variant="outlined">
        Expand Transactions
      </Button>
    </Box>
  );
}