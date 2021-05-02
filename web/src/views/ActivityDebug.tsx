import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { resetCards } from '../store/cards';

export const ActivityDebug = () => {
    const dispatch = useDispatch();

    const doReset = () => {
        dispatch(resetCards());
    };

    return (
        <Box>
            <Button onClick={doReset}>Full Reset</Button>
        </Box>
    );
};
