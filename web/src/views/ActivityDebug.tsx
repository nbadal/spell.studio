import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
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
