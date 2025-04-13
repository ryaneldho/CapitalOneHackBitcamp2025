import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from '@mui/material';

const PiggyToCards = () => {
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

    return(
        <Box className="buttons" display="flex" gap={3} justifyContent="center" mt={2}
                sx={{textAlign: 'left',  marginLeft: '-240px'}}>
                <Button variant="outlined" onClick={handleClick}>
                  Monthly Challenges
                </Button>
        </Box>
    );
};

export default PiggyToCards