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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 35}}>
            <Typography variant="h5" id="welcome">
                Hello Ryan!
            </Typography>
            <img src={settings} id="settings" alt="Settings" onClick={handleClick}
             style={{
                height: '50px',
                cursor: 'pointer',
                width: '50px',
              }}/>
        </Box>

    );
};

export default PiggyToSettings