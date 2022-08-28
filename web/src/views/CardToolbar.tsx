import React from 'react';

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityBar } from './ActivityBar';
import { SideBar } from './SideBar';
import { showActivity } from '../store/modals';
import { Activity } from '../store/modals/types';
import { RootState } from '../store';

export function CardToolbar() {
    const dispatch = useDispatch();
    const selectedActivity = useSelector((state: RootState) => state.modals.openActivity);

    const activityClicked = (clickedActivity: Activity) => {
        if (selectedActivity === clickedActivity) {
            // Deselect if clicked twice
            dispatch(showActivity(null));
        } else {
            dispatch(showActivity(clickedActivity));
        }
    };

    return (
        <Box className="CardToolbar">
            <ActivityBar
                onActivityClicked={activityClicked}
                selectedActivity={selectedActivity}
            />
            {selectedActivity && (<SideBar />)}
        </Box>
    );
}
