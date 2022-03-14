import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { resetCards } from '../store/cards';
import { resetTemplate } from '../store/template';

export function ActivityDebug() {
    const dispatch = useDispatch();

    const doReset = () => {
        dispatch(resetCards());
        dispatch(resetTemplate());
    };
    const doResetTemplate = () => {
        dispatch(resetTemplate());
    };

    return (
        <Box>
            <Button variant="contained" color="secondary" startIcon={<RotateLeftIcon />} onClick={doReset}>Full Reset</Button>
            <Button variant="contained" color="secondary" startIcon={<RotateLeftIcon />} onClick={doResetTemplate}>Reload Template</Button>
        </Box>
    );
}
