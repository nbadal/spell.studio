import React from 'react';

import '../css/AddCard.css';
import AddIcon from '@material-ui/icons/Add';
import { grey } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { showModal } from '../store/modals';

export function AddCard() {
    const dispatch = useDispatch();
    return (
        <Box className="AddCard" onClick={() => dispatch(showModal('add-card'))}>
            <AddIcon fontSize="inherit" style={{ color: grey[500] }} />
        </Box>
    );
}
