import React from 'react';

import '../css/AddCard.css';
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { showModal } from '../store/modals';

export function AddCard() {
    const dispatch = useDispatch();
    return (
        <Box className="AddCard" onClick={() => dispatch(showModal('add-card'))}>
            <AddIcon fontSize="inherit" style={{ color: grey[500] }} />
        </Box>
    );
}
