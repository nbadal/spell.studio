import React from 'react';

import '../css/AddCard.css';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { showActivity } from '../store/modals';
import { Activity } from '../store/modals/types';

export function AddCard() {
    const dispatch = useDispatch();
    return (
        <Box className="AddCard" onClick={() => dispatch(showActivity(Activity.SEARCH))}>
            <AddIcon fontSize="inherit" style={{ color: grey[500] }} />
        </Box>
    );
}
