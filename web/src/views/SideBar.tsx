import React from 'react';

import Box from '@mui/material/Box';
import { Activity } from './ActivityBar';
import { ActivityDebug } from './ActivityDebug';
import { ActivityLayout } from './ActivityLayout';

interface SideBarProps {
    selectedActivity: Activity | null,
}

export function SideBar(props: SideBarProps) {
    return (
        <Box
            sx={{
                width: '256px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {props.selectedActivity && activityComponent(props.selectedActivity)}
        </Box>
    );
}

const activityComponent = (activity: Activity) => {
    switch (activity) {
        case Activity.DEBUG:
            return (<ActivityDebug />);
        case Activity.LAYOUT:
            return (<ActivityLayout />);
        default:
            return (<div>{`Selected: ${activity}`}</div>);
    }
};
