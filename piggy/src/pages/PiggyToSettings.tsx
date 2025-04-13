import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from '@mui/material';
import settings from '../assets/settings.png';

const PiggyToSettings = () => {
    const [clicked, setClicked] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (clicked) {
        navigate("/Settings"); // Redirect after state update
        }
    }, [clicked, navigate]);

    const handleClick = () => {
        setClicked(true); // Set state on click
    };

    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4" id="welcome" top='-15px' 
            sx={{ fontFamily:'Special Gothic Expanded One', fontSize:'48px', marginRight: '21px',}} >
               MONEY HOG
            </Typography>
            <img src={settings} id="settings" alt="Settings" onClick={handleClick}
             style={{
                height: '30px',
                cursor: 'pointer',
                width: '30px',
                marginLeft: "30px"
              }}/>
        </Box>

    );
};

export default PiggyToSettings