import React from 'react';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { ActivityDebug } from './ActivityDebug';
import { ActivityLayout } from './ActivityLayout';
import { ActivitySearch } from './ActivitySearch';
import { Activity } from '../store/modals/types';
import { RootState } from '../store';

export function SideBar() {
    const selectedActivity = useSelector((state: RootState) => state.modals.openActivity);
    return (
        <Box
            sx={{
                width: '256px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {selectedActivity && activityComponent(selectedActivity)}
        </Box>
    );
}

const activityComponent = (activity: Activity) => {
    switch (activity) {
        case Activity.SEARCH:
            return <ActivitySearch />;
        case Activity.DEBUG:
            return (<ActivityDebug />);
        case Activity.LAYOUT:
            return (<ActivityLayout />);
        default:
            return (<div>{`Selected: ${activity}`}</div>);
    }
};
