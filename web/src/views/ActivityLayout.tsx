import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import {
    disableBleed, disableCornerRadius, resetLayout, setBleed, setCornerRadius,
} from '../store/layout';

export function ActivityLayout() {
    const dispatch = useDispatch();

    const doReset = () => {
        dispatch(resetLayout());
    };

    const applyCorners = () => {
        dispatch(setCornerRadius(0.125));
    };
    const removeCorners = () => {
        dispatch(disableCornerRadius());
    };

    const applyBleed = () => {
        dispatch(setBleed(0.125));
    };
    const removeBleed = () => {
        dispatch(disableBleed());
    };

    return (
        <Box>
            <Button variant="contained" onClick={applyCorners}>Add corners</Button>
            <Button variant="contained" onClick={removeCorners}>Remove corners</Button>
            <br />
            <br />
            <Button variant="contained" onClick={applyBleed}>Add bleed</Button>
            <Button variant="contained" onClick={removeBleed}>Remove bleed</Button>
            <br />
            <br />
            <Button variant="contained" onClick={doReset}>Reset Layout</Button>
        </Box>
    );
}
