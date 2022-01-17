import React from 'react';

import Box from '@material-ui/core/Box';
import { Activity } from './ActivityBar';
import { ActivityDebug } from './ActivityDebug';

interface SideBarProps {
    selectedActivity: Activity | null,
}

export function SideBar(props: SideBarProps) {
    return (
        <Box className="SideBar">
            {props.selectedActivity && activityComponent(props.selectedActivity)}
        </Box>
    );
}

const activityComponent = (activity: Activity) => {
    switch (activity) {
        case Activity.DEBUG:
            return (<ActivityDebug />);
        default:
            return (<div>{`Selected: ${activity}`}</div>);
    }
};
