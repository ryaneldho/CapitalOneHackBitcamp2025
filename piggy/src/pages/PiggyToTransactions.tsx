import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from '@mui/material';

const PiggyToTransactions = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (clicked) {
        navigate("/Transactions"); // Redirect after state update
        }
    }, [clicked, navigate]);

    const handleClick = () => {
        setClicked(true); // Set state on click
    };
  

    return (
      <Box className="buttons" display="flex" gap={3} justifyContent="center" mt={2}>
        <Button variant="outlined" onClick={handleClick}>
          Expand Transactions
        </Button>
      </Box>
    );
  };
  export default PiggyToTransactions;